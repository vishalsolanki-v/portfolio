import { type NextRequest, NextResponse } from "next/server"
import { updateBlog, deleteBlog } from "@/lib/blog-db"

async function checkAdminAuth(request: NextRequest) {
  const adminSecret = request.headers.get("x-admin-secret")
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return false
  }
  return true
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = params
    const updates = await request.json()
    const blog = await updateBlog(id, updates)
    return NextResponse.json({ blog })
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = params
    await deleteBlog(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}