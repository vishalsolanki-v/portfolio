import { NextResponse } from "next/server"
import { set, get } from "@/lib/redis"

export async function POST(req: Request) {
  try {
    const { key } = await req.json()
    if (key !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const current = await get("admin:disable-counting")
    const newValue = current === "true" ? "false" : "true"
    await set("admin:disable-counting", newValue)

    return NextResponse.json({ disabled: newValue === "true" })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}