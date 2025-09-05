import type { Metadata } from "next"

function derivePostIdFromLink(link: string) {
  try {
    const u = new URL(link)
   const path = u.pathname.replace(/^\/|\/$/g, "")
    return path.split("/").join("-")
  } catch {
    return link
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase()
  }
}

type FeedItem = {
  title: string
  link: string
  description?: string
  image?: string
}

async function getMediumFeed(): Promise<FeedItem[]> {
  const res = await fetch("https://medium.com/feed/@vishalthakur2463", {
    next: { revalidate: 900 },
  })
  const xml = await res.text()

  const items: FeedItem[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match: RegExpExecArray | null
  while ((match = itemRegex.exec(xml))) {
    const block = match[1]
    const title =
      (block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
        block.match(/<title>([\s\S]*?)<\/title>/))?.[1]?.trim() || "Post"
    const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() || ""
    const description =
      (block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
        block.match(/<description>([\s\S]*?)<\/description>/))?.[1]
        ?.replace(/<[^>]+>/g, "")
        .trim() || ""
    const contentBlock =
      (block.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) || [null, ""])[1] || ""
    const firstImg =
      (contentBlock.match(/<img[^>]+src="([^"]+)"/i) ||
        (description ? description.match(/https?:\/\/[^"'\s>]+\.(?:png|jpe?g|gif|webp)/i) : null))?.[1] || ""

    items.push({
      title,
      link,
      description,
      image: firstImg,
    })
  }
  return items
}

async function incrementClick(id: string) {
  try {
    const url = process.env.KV_REST_API_URL
    const token = process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_READ_ONLY_TOKEN
    if (!url || !process.env.KV_REST_API_TOKEN) {
      return
    }
    await fetch(`${url}/incr/blog:clicks:${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: "1",
      cache: "no-store",
    })
  } catch {
    // ignore metric errors
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const id = params.id
  const items = await getMediumFeed()
  const post = items.find((p) => derivePostIdFromLink(p.link) === id)

  incrementClick(id)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const shareUrl = `${siteUrl}/blog/${encodeURIComponent(id)}`
  const targetUrl = `${siteUrl}/?post=${encodeURIComponent(id)}#blog`

  const title = post?.title || "Blog post"
  const description = (post?.description && post.description.slice(0, 200)) || "Read this post on my portfolio."
  const image = post?.image || "/blog-cover-placeholder.png"

  return {
    title,
    description,
    alternates: {
      canonical: shareUrl,
    },
    openGraph: {
      type: "article",
      url: shareUrl,
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    other: {
      "og:see_also": targetUrl,
    },
  }
}