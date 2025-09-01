export const dynamic = "force-static"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("[v0] Contact form submission:", body)
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
