import { NextResponse } from "next/server"
import { del } from "@/lib/redis"

export async function POST(req: Request) {
  try {
    const { key, postId, type } = await req.json()
    if (key !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!postId || !["share", "view", "claps", "comments"].includes(type)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const redisKey = type === "comments" ? `blog:comments:${postId}` : `blog:${type}:${postId}`
    await del(redisKey)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}