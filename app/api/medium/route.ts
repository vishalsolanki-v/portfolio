import clientPromise from "@/lib/mongodb"
import { hashPostId } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const feedUrl = "https://medium.com/feed/@vishalthakur2463"
    const res = await fetch(feedUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; v0-Medium-Fetch/1.0; +https://v0.dev)",
        Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch Medium feed" }, { status: res.status })
    }

    const xml = await res.text()
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1])
    const posts = items.slice(0, 6).map((item) => {
      const get = (tag: string) => {
        const r = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`)
        const m = item.match(r)
        return m ? decodeHTMLEntities(stripCDATA(m[1].trim())) : ""
      }

      const title = get("title")
      const link = get("link")
      const pubDate = get("pubDate")
      const creator = get("dc:creator") || ""
      const description = get("description")
      const content = get("content:encoded") || description

      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i)
      const image = imgMatch ? imgMatch[1] : ""
      const publishedAt = pubDate ? new Date(pubDate).toISOString() : null

      return {
        title,
        link,
        image,
        publishedAt,
        author: creator,
        excerpt: stripHTML(content).slice(0, 200),
      }
    })
    const client = await clientPromise
    const db = client.db("vishaldevflow")
    const collection = db.collection("portfolio-medium-blogs")
    const bulkOps = posts.map((p) => ({
      updateOne: {
        filter: { _id: hashPostId(p.link) }, // unique identity
        update: {
          $set: {
            title: p.title,
            link: p.link, // store for convenience
            image: p.image,
            publishedAt: p.publishedAt ? new Date(p.publishedAt) : undefined,
            author: p.author,
            excerpt: p.excerpt,
          },
          $setOnInsert: {
          },
        },
        upsert: true,
      },
    }));
    if (bulkOps.length > 0) {
      await collection.bulkWrite(bulkOps)
    }
    return NextResponse.json({ posts }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Unexpected error fetching Medium feed" }, { status: 500 })
  }
}

function stripCDATA(s: string) {
  return s.replace("<![CDATA[", "").replace("]]>", "")
}

function decodeHTMLEntities(text: string) {
  const map: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
  }
  return text.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, (m) => map[m] || m)
}

function stripHTML(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
}