import { NextResponse } from "next/server"
import { fetchMediumFeed, hashPostId } from "@/lib/medium"
import { getBlogById, upsertBlog, mergeUpdateBlog } from "@/lib/blog-db"

function isAdmin(body?: any, headers?: Headers) {
  const key = body?.key || headers?.get("x-admin-key") || ""
  return key && key === (process.env.ADMIN_SECRET || "")
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  if (!isAdmin(body, req.headers)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const feed = await fetchMediumFeed()
  let inserted = 0
  let updated = 0
  const skipped = 0

  for (const p of feed) {
    const id = hashPostId(p.link || p.title)
    const existing = await getBlogById(id)
    const patch = {
      id,
      title: p.title,
      excerpt: p.description,
      content_html: p.contentHTML || null,
      cover_image: p.image || null,
      medium_url: p.link || null,
      iso_date: p.isoDate || p.date || null,
      author: p.author || null,
      tags: [],
      is_premium: false,
    }
    if (!existing) {
      await upsertBlog(patch as any)
      inserted++
    } else {
      // merge update: only overwrite with non-empty fields
      await mergeUpdateBlog(id, patch as any)
      updated++
    }
  }

  return NextResponse.json({ ok: true, inserted, updated, skipped })
}