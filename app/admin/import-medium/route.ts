import { NextResponse } from "next/server"
import { hashPostId } from "@/lib/medium"
import { createBlog, getBlogByIdAdmin, mergeUpdateBlog } from "@/lib/blog-db"

function isAdmin(req: Request, body?: any) {
  const header = req.headers.get("x-admin-secret") || ""
  const key = body?.key || ""
  const admin = process.env.ADMIN_SECRET || ""
  return header === admin || key === admin
}

function sanitizeHtml(html?: string): string {
  if (!html) return ""
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/href=["']javascript:[^"']*["']/gi, 'href="#"')
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  if (!isAdmin(req, body)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const {
    title,
    htmlContent,
    overwrite = false,
    medium_url = "",
    cover_image = "",
    excerpt = "",
    iso_date = "",
    author = "",
    tags = [],
    is_premium = false,
    is_published = true,
  } = body || {}

  if (!title || !htmlContent) {
    return NextResponse.json({ error: "Missing title or htmlContent" }, { status: 400 })
  }

  const id = hashPostId(medium_url || title)
  const exists = await getBlogByIdAdmin(id)

  const payload = {
    id,
    title,
    content_html: sanitizeHtml(htmlContent),
    medium_url: medium_url || null,
    cover_image: cover_image || null,
    excerpt: excerpt || null,
    iso_date: iso_date || new Date().toISOString(),
    author: author || null,
    tags: tags ?? [],
    is_premium: !!is_premium,
    is_published: !!is_published,
  }

  if (!exists) {
    const created = await createBlog({
      ...payload,
      // createBlog generates id internally from title/medium_url as well:
      title: payload.title,
      excerpt: payload.excerpt || undefined,
      content_html: payload.content_html || undefined,
      cover_image: payload.cover_image || undefined,
      medium_url: payload.medium_url || undefined,
      iso_date: payload.iso_date,
      author: payload.author || undefined,
      tags: payload.tags,
      is_premium: payload.is_premium,
      is_published: payload.is_published,
    } as any)
    return NextResponse.json({ ok: true, blog: created, action: "created" })
  }

  if (!overwrite) {
    return NextResponse.json({ error: "Blog exists", id, action: "exists" }, { status: 409 })
  }

  const updated = await mergeUpdateBlog(id, payload as any)
  return NextResponse.json({ ok: true, blog: updated, action: "updated" })
}