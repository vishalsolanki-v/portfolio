"use client"

import { useEffect, useRef } from "react"

export function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const targetCanvas = canvas
    const context = ctx

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005,
      r: Math.random() * 1.2 + 0.3,
    }))

    function resize() {
      targetCanvas.width = Math.floor(targetCanvas.clientWidth * dpr)
      targetCanvas.height = Math.floor(targetCanvas.clientHeight * dpr)
    }

    function step() {
      context.clearRect(0, 0, targetCanvas.width, targetCanvas.height)
      context.globalAlpha = 0.9
      const w = targetCanvas.width
      const h = targetCanvas.height
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1

        const px = p.x * w
        const py = p.y * h
        context.beginPath()
        context.fillStyle = "#6366f1" // indigo-500
        context.arc(px, py, p.r * dpr * 2, 0, Math.PI * 2)
        context.fill()
      }
      raf = requestAnimationFrame(step)
    }

    const onResize = () => {
      resize()
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(step)
    }
    resize()
    raf = requestAnimationFrame(step)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <canvas ref={ref} className="h-full w-full opacity-70 dark:opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent dark:from-slate-950/70" />
    </div>
  )
}
