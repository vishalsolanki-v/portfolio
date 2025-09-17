export async function GET(req: Request) {
  const url = new URL(req.url)
  const post = url.searchParams.get("post")

  if (!post) {
    return new Response("Missing 'post' query param", { status: 400 })
  }

  try {
    const kvUrl = process.env.KV_REST_API_URL
    const kvToken = process.env.KV_REST_API_TOKEN
    if (kvUrl && kvToken) {
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
    console.log("Upstash increment error:", (err as Error).message)
  }

  const dest = new URL(`/blog/${encodeURIComponent(post)}`, req.url)
  return Response.redirect(dest.toString(), 302)
}