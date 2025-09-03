export type MediumPost = {
  id: string
  title: string
  link: string
  description: string
  image?: string | null
  date: string
  author?: string | null
}

// Stable, short ID based on the canonical link (same on server & client)
export function hashPostId(link: string): string {
  let h = 5381
  for (let i = 0; i < link.length; i++) h = (h * 33) ^ link.charCodeAt(i)
  return (h >>> 0).toString(36)
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function extractFirstImage(html?: string): string | null {
  if (!html) return null
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return m ? m[1] : null
}

function decodeEntities(text: string): string {
  if (!text) return text
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

export async function fetchMediumFeed(username: string) {
  const res = await fetch(`https://medium.com/feed/@${username}`, {
    headers: { Accept: "application/rss+xml" },
    next: { revalidate: 900 },
  })
  if (!res.ok) throw new Error(`Failed to fetch Medium feed: ${res.status}`)
  return await res.text()
}

export function parseMediumFeed(xml: string): MediumPost[] {
  const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g))
  return items.map((m) => {
    const chunk = m[1]
    const get = (tag: string) => {
      const mm = chunk.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"))
      return mm ? mm[1].trim() : ""
    }
    const title = decodeEntities(get("title"))
    const link = decodeEntities(get("link"))
    const pubDate = decodeEntities(get("pubDate"))
    const descRaw = get("description")
    const description = stripHtml(decodeEntities(descRaw))
    const contentEncoded = get("content:encoded")
    const image = extractFirstImage(contentEncoded || descRaw)

    return {
      id: hashPostId(link || title),
      title: title || "(Untitled)",
      link,
      description,
      image,
      date: pubDate,
      author: null,
    }
  })
}