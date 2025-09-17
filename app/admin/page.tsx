import Link from "next/link"
import { fetchMediumFeed } from "@/lib/medium"
import { getJSON, getNumber } from "@/lib/redis"

export default async function AdminPage({ searchParams }: { searchParams: { key?: string } }) {
  const ok = (searchParams.key || "") === (process.env.ADMIN_SECRET || "")
  if (!ok) {
    return (
      <main className="container mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <form className="mt-6">
          <label className="block text-sm">
            Secret key
            <input
              name="key"
              type="password"
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="Enter secret"
            />
          </label>
          <button className="mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700">
            Enter
          </button>
        </form>
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

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Counts and latest comments by post.</p>
      <div className="mt-6 overflow-x-auto rounded-md border">
        <table className="min-w-full text-sm">
          <thead className="bg-accent">
            <tr>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Shares</th>
              <th className="px-3 py-2 text-left">Views</th>
              <th className="px-3 py-2 text-left">Claps</th>
              <th className="px-3 py-2 text-left">Comments</th>
              <th className="px-3 py-2 text-left">Open</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2">{r.title}</td>
                <td className="px-3 py-2">{r.share}</td>
                <td className="px-3 py-2">{r.view}</td>
                <td className="px-3 py-2">{r.claps}</td>
                <td className="px-3 py-2">{r.commentsCount}</td>
                <td className="px-3 py-2">
                  <Link href={`/blog/${r.id}`} className="text-indigo-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}