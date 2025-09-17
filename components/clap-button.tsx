"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

export default function ClapButton({ postId, initialCount = 0 }: { postId: string; initialCount?: number }) {
  const [count, setCount] = useState<number>(initialCount)
  const [mine, setMine] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([])
  const limit = 50

  useEffect(() => {
    const v = Number(localStorage.getItem(`claps:${postId}`) || 0)
    setMine(Number.isFinite(v) ? v : 0)
  }, [postId])

  async function clap() {
    if (mine >= limit || isAnimating) return

    setIsAnimating(true)
    const nextMine = Math.min(mine + 1, limit)
    setMine(nextMine)
    localStorage.setItem(`claps:${postId}`, String(nextMine))
    setCount((c) => c + 1)

    // Create particle burst
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
    }))
    setParticles(newParticles)

    // Clear particles after animation
    setTimeout(() => setParticles([]), 1000)
    setTimeout(() => setIsAnimating(false), 200)

    try {
      await fetch("/api/blog/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, type: "clap", amount: 1 }),
      })
    } catch {}
  }

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={clap}
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
        aria-label="Clap for this post"
        title={`Clap (${mine}/${limit})`}
        disabled={mine >= limit}
        whileTap={{ scale: 0.95 }}
        animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.2 }}
      >
        <motion.div animate={isAnimating ? { rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.3 }}>
          <Heart className={`h-4 w-4 ${mine > 0 ? "fill-red-500 text-red-500" : ""}`} />
        </motion.div>
        <motion.span
          className="font-medium"
          animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          {count}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full pointer-events-none"
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              x: particle.x,
              y: particle.y,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}