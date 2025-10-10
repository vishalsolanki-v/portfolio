import { NextResponse } from "next/server"
import { listBlogs } from "@/lib/blog-db"
import { fetchMediumFeed, hashPostId } from "@/lib/medium"

export async function GET() {
  try {
    const [dbRows, feed] = await Promise.all([listBlogs(), fetchMediumFeed()])
    const seen = new Set<string>()
    const dbMapped = dbRows.map((b) => {
      const link = b.medium_url || ""
      const id = link ? hashPostId(link) : b.id
      seen.add(id)
      return {
        id,
        title: b.title,
        link: link,
        image: b.cover_image || undefined,
        publishedAt: b.iso_date || null,
        author: b.author || undefined,
        excerpt: b.excerpt || undefined,
      }
    })
    const feedMapped = feed
      .filter((p) => {
        const id = hashPostId(p.link || p.title)
        if (seen.has(id)) return false
        seen.add(id)
        return true
      })
      .map((p) => ({
        id: p.id,
        title: p.title,
        link: p.link,
        image: p.image || undefined,
        publishedAt: p.isoDate || p.date || null,
        author: p.author || undefined,
        excerpt: p.description,
      }))

    const posts = [...dbMapped, ...feedMapped].sort((a, b) => {
      const ad = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const bd = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return bd - ad
    })

    return NextResponse.json({ posts })
  } catch (e) {
    return NextResponse.json({ posts: [] }, { status: 200 })
  }
}