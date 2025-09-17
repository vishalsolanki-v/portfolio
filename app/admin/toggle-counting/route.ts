import { NextResponse } from "next/server"
import { set, get } from "@/lib/redis"

export async function POST(req: Request) {
  try {
    console.log("[v0] POST /api/admin/toggle-counting called")

    const body = await req.json()
    console.log("[v0] Request body:", body)

    const { key } = body
    if (key !== process.env.ADMIN_SECRET) {
      console.log("[v0] Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const current = await get("admin:disable-counting")
    console.log("[v0] Current counting status:", current)

    const newValue = current === "true" ? "false" : "true"
    await set("admin:disable-counting", newValue)

    console.log("[v0] New counting status:", newValue)

    return NextResponse.json({ disabled: newValue === "true" })
  } catch (error) {
    console.error("[v0] Server error in toggle-counting:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}