import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookie = cookies().get("admin-session")?.value
  const ok = !!cookie && cookie === process.env.ADMIN_SECRET
  return NextResponse.json({ admin: ok })
}