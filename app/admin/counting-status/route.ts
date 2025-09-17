import { NextResponse } from "next/server"
import { get } from "@/lib/redis"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get("key")

    if (key !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const disabled = await get("admin:disable-counting")
    return NextResponse.json({ disabled: disabled === "true" })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}