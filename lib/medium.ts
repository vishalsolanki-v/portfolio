export type MediumPost = {
  id: string
  title: string
  link: string
  description: string
  image?: string | null
  date: string
  author?: string | null
  contentHTML?: string
  isoDate?: string
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

function sanitizeHtml(html?: string): string {
  if (!html) return ""
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/href=["']javascript:[^"']*["']/gi, 'href="#"')
}

export async function fetchMediumFeedXML(username: string) {
  const res = await fetch(`https://medium.com/feed/@${username}`, {
    headers: { Accept: "application/rss+xml" },
    next: { revalidate: 900 },
  })
  if (!res.ok) throw new Error(`Failed to fetch Medium feed: ${res.status}`)
  return await res.text()
}

// Re-export a posts-level fetcher expected by admin and other pages
const DEFAULT_MEDIUM_USERNAME = process.env.MEDIUM_USER_NAME || "vishalthakur2463"

export async function fetchMediumFeed(username: string = DEFAULT_MEDIUM_USERNAME): Promise<MediumPost[]> {
  const xml = await fetchMediumFeedXML(username)
  return parseMediumFeed(xml)
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
    const contentHTML = sanitizeHtml(contentEncoded || "")

    return {
      id: hashPostId(link || title),
      title: title || "(Untitled)",
      link,
      description,
      image,
      date: pubDate,
      isoDate: pubDate,
      author: null,
      contentHTML,
    }
  })
}

export async function getPostById(
  id: string,
  username: string = DEFAULT_MEDIUM_USERNAME,
): Promise<{
  post?: MediumPost
  posts: MediumPost[]
}> {
  const posts = await fetchMediumFeed(username)
  const post = posts.find((p) => p.id === id)
  return { post, posts }
}