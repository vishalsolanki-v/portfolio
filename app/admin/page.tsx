import { fetchMediumFeed } from "@/lib/medium"
import { getJSON, getNumber, get } from "@/lib/redis"
import AdminClient from "./admin-client"

export default async function AdminPage({ searchParams }: { searchParams: { key?: string } }) {
  const adminKey = searchParams.key || ""
  const ok = adminKey === (process.env.ADMIN_SECRET || "")

  if (!ok) {
    return (
      <main className="container mx-auto max-w-md px-4 py-12">
        <div className="rounded-lg border bg-card p-6">
          <h1 className="text-2xl font-semibold">Admin Access</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your admin secret to continue</p>
          <form className="mt-6">
            <label className="block text-sm font-medium">
              Secret Key
              <input
                name="key"
                type="password"
                className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter admin secret"
              />
            </label>
            <button className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Access Dashboard
            </button>
          </form>
        </div>
      </main>
    )
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

  const countingDisabled = (await get("admin:disable-counting")) === "true"

  const initialStats = {
    posts: rows,
    totalShares,
    totalViews,
    totalClaps,
    totalComments,
  }

  return <AdminClient initialStats={initialStats} initialCountingDisabled={countingDisabled} adminKey={adminKey} />
}