import { NextResponse } from "next/server"
import { fetchMediumFeed } from "@/lib/medium"
import { getJSON, getNumber } from "@/lib/redis"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get("key")

    if (key !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const posts = await fetchMediumFeed()
    const rows = await Promise.all(
      posts.map(async (p) => {
        const [share, view, claps, comments] = await Promise.all([
          getNumber(`blog:share:${p.id}`),
          getNumber(`blog:view:${p.id}`),
          getNumber(`blog:claps:${p.id}`),
          getJSON<any[]>(`blog:comments:${p.id}`, []),
        ])
        return { id: p.id, title: p.title, share, view, claps, commentsCount: comments.length }
      }),
    )

    const totalShares = rows.reduce((sum, row) => sum + row.share, 0)
    const totalViews = rows.reduce((sum, row) => sum + row.view, 0)
    const totalClaps = rows.reduce((sum, row) => sum + row.claps, 0)
    const totalComments = rows.reduce((sum, row) => sum + row.commentsCount, 0)

    return NextResponse.json({
      posts: rows,
      totalShares,
      totalViews,
      totalClaps,
      totalComments,
    })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}