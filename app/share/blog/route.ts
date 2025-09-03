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
    console.log("Upstash increment error:", (err as Error).message)
  }

  const dest = new URL("/", req.url)
  dest.searchParams.set("post", post)

  // Redirect to home with the "post" param, the client code will scroll once and clear it.
  return Response.redirect(dest.toString(), 302)
}