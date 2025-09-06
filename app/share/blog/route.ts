// This route is the share target: /share/blog?post=<safeId>
// It increments a counter in Upstash (if configured) and redirects to "/share/blog/<safeId>"
export async function GET(req: Request) {
  const url = new URL(req.url)
  const post = url.searchParams.get("post")

  if (!post) {
    return new Response("Missing 'post' query param", { status: 400 })
  }

  // Try to increment click count via Upstash KV if available.
  try {
    const kvUrl = process.env.KV_REST_API_URL
    const kvToken = process.env.KV_REST_API_TOKEN
    if (kvUrl && kvToken) {
      // Key format: blog:clicks:<postId>
      const key = `blog:clicks:${post}`
      await fetch(`${kvUrl}/incr/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
        },
        cache: "no-store",
      })
    }
  } catch (err) {
    console.log(" Upstash increment error:", (err as Error).message)
  }

  // Previously: redirected to "/?post=<id>#blog", which doesn't expose per-post meta to crawlers.
  // Now: redirect to path-based page with correct OG/Twitter metadata; that page then client-redirects to home.
  const dest = new URL(`/share/blog/${encodeURIComponent(post)}`, req.url)
  return Response.redirect(dest.toString(), 302)
}