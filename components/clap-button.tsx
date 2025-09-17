"use client"

import { useEffect, useState } from "react"

export default function ClapButton({ postId, initialCount = 0 }: { postId: string; initialCount?: number }) {
  const [count, setCount] = useState<number>(initialCount)
  const [mine, setMine] = useState<number>(0)
  const limit = 50

  useEffect(() => {
    const v = Number(localStorage.getItem(`claps:${postId}`) || 0)
    setMine(Number.isFinite(v) ? v : 0)
  }, [postId])

  async function clap() {
    if (mine >= limit) return
    const nextMine = Math.min(mine + 1, limit)
    setMine(nextMine)
    localStorage.setItem(`claps:${postId}`, String(nextMine))
    setCount((c) => c + 1)
    try {
      await fetch("/api/blog/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, type: "clap", amount: 1 }),
      })
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={clap}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-accent"
      aria-label="Clap for this post"
      title="Clap"
    >
      <span className="font-medium">{count}</span>
      <span className="text-muted-foreground">Claps</span>
    </button>
  )
}