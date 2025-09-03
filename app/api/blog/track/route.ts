import { NextResponse } from "next/server"
import { incr, getNumber } from "@/lib/redis"

export async function POST(req: Request) {
  try {
    const { id, type, amount } = await req.json()
    if (!id || !["share", "view", "clap", "claps"].includes(type)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }
    const key = type === "clap" || type === "claps" ? `blog:claps:${id}` : `blog:${type}:${id}`
    const by = typeof amount === "number" && amount > 0 ? amount : 1
    await incr(key, by)

    const [share, view, claps] = await Promise.all([
      getNumber(`blog:share:${id}`),
      getNumber(`blog:view:${id}`),
      getNumber(`blog:claps:${id}`),
    ])
    return NextResponse.json({ ok: true, counts: { share, view, claps } })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}