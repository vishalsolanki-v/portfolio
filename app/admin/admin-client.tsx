"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Download,
  RefreshCw,
} from "lucide-react"

interface PostStats {
  id: string
  title: string
  share: number
  view: number
  claps: number
  commentsCount: number
}

interface AdminStats {
  posts: PostStats[]
  totalShares: number
  totalViews: number
  totalClaps: number
  totalComments: number
}

interface AdminClientProps {
  initialStats: AdminStats
  initialCountingDisabled: boolean
  adminKey: string
}

export default function AdminClient({ initialStats, initialCountingDisabled, adminKey }: AdminClientProps) {
  const [stats, setStats] = useState<AdminStats>(initialStats)
  const [countingDisabled, setCountingDisabled] = useState(initialCountingDisabled)
  const [loading, setLoading] = useState(false)

  async function fetchStats() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/stats?key=${adminKey}`)
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
    setLoading(false)
  }

  async function toggleCounting() {
    try {
      console.log("[v0] Toggling counting, making POST request to /api/admin/toggle-counting")
      console.log("[v0] Request body:", { key: adminKey })

      const res = await fetch("/api/admin/toggle-counting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey }),
      })

      console.log("[v0] Response status:", res.status)
      console.log("[v0] Response ok:", res.ok)

      if (res.ok) {
        const data = await res.json()
        console.log("[v0] Response data:", data)
        setCountingDisabled(data.disabled)
      } else {
        const errorText = await res.text()
        console.error("[v0] Error response:", errorText)
      }
    } catch (error) {
      console.error("[v0] Failed to toggle counting:", error)
    }
  }

  async function clearCounter(postId: string, type: string) {
    if (!confirm(`Clear ${type} counter for this post?`)) return

    try {
      const res = await fetch("/api/admin/clear-counter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey, postId, type }),
      })
      if (res.ok) {
        fetchStats()
      }
    } catch (error) {
      console.error("Failed to clear counter:", error)
    }
  }

  function exportData() {
    const data = {
      exported: new Date().toISOString(),
      summary: {
        totalPosts: stats.posts.length,
        totalShares: stats.totalShares,
        totalViews: stats.totalViews,
        totalClaps: stats.totalClaps,
        totalComments: stats.totalComments,
      },
      posts: stats.posts,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `blog-stats-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Monitor blog engagement and manage settings</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportData}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"
            >
              <Download className="h-4 w-4" />
              Export Data
            </button>
            <button
              onClick={fetchStats}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Admin Controls */}
        <div className="mt-8 rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold">Admin Controls</h2>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Disable Counting</p>
              <p className="text-sm text-muted-foreground">Stop tracking views, shares, and claps (for testing)</p>
            </div>
            <button
              onClick={toggleCounting}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              {countingDisabled ? (
                <>
                  <ToggleRight className="h-5 w-5 text-red-500" />
                  Disabled
                </>
              ) : (
                <>
                  <ToggleLeft className="h-5 w-5" />
                  Enabled
                </>
              )}
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6"
          >
            <div className="flex items-center gap-3">
              <Share2 className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalShares}</p>
                <p className="text-sm text-muted-foreground">Total Shares</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6"
          >
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border bg-card p-6"
          >
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalClaps}</p>
                <p className="text-sm text-muted-foreground">Total Claps</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border bg-card p-6"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalComments}</p>
                <p className="text-sm text-muted-foreground">Total Comments</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Posts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 overflow-hidden rounded-lg border bg-card"
        >
          <div className="border-b bg-muted/50 px-6 py-4">
            <h2 className="text-lg font-semibold">Post Analytics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Title</th>
                  <th className="px-3 py-3 text-center font-medium">Shares</th>
                  <th className="px-3 py-3 text-center font-medium">Views</th>
                  <th className="px-3 py-3 text-center font-medium">Claps</th>
                  <th className="px-3 py-3 text-center font-medium">Comments</th>
                  <th className="px-6 py-3 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.posts.map((post, index) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-t hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate font-medium">{post.title}</div>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span>{post.share}</span>
                        <button
                          onClick={() => clearCounter(post.id, "share")}
                          className="text-muted-foreground hover:text-red-500"
                          title="Clear shares"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span>{post.view}</span>
                        <button
                          onClick={() => clearCounter(post.id, "view")}
                          className="text-muted-foreground hover:text-red-500"
                          title="Clear views"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span>{post.claps}</span>
                        <button
                          onClick={() => clearCounter(post.id, "claps")}
                          className="text-muted-foreground hover:text-red-500"
                          title="Clear claps"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span>{post.commentsCount}</span>
                        <button
                          onClick={() => clearCounter(post.id, "comments")}
                          className="text-muted-foreground hover:text-red-500"
                          title="Clear comments"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
                      >
                        <BarChart3 className="h-4 w-4" />
                        View Post
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}