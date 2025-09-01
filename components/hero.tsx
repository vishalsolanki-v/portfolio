"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SceneCanvas } from "./three/scene-canvas"
import { FloatingShapes } from "./three/floating-shapes"
import { Particles } from "./three/particles"
import Link from "next/link"

const words = ["Hi", "👋", "I’m", "Vishal", "Solanki","🚀"]

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <SceneCanvas className="absolute inset-0">
          <Particles count={240} />
          <FloatingShapes />
        </SceneCanvas>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,.25),transparent_60%)]" />
      </div>

      <div className="mx-auto flex min-h-[80svh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
<motion.h1
  initial="hidden"
  animate="show"
  variants={{
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  }}
  className="text-balance text-4xl font-bold leading-tight md:text-6xl"
>
  {words.map((w, i) => {
    const isEmoji = /\p{Emoji}/u.test(w); // detect emoji
    return (
      <motion.span
        key={i}
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 18, stiffness: 220 },
          },
        }}
        className={
          isEmoji
            ? "mr-2 inline-block" // normal emoji, no gradient
            : "mr-2 inline-block bg-clip-text text-transparent [background-image:linear-gradient(90deg,#6366f1,#8b5cf6,#3b82f6)]"
        }
      >
        {w}
      </motion.span>
    );
  })}
</motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 text-pretty text-foreground/80 md:text-lg"
        >
          ⚡ Frontend Developer | React | Next.js | TypeScript ⚡
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          <Button className="group bg-[#6366f1] text-white hover:bg-[#5558e6]" asChild>
            <Link href="https://drive.google.com/file/d/1-vBArNuSQrOEBtY9KRm6A4aUlKM88NT0/view" target="_blank" rel="noreferrer" download={true}>
              <span className="md:mr-2 mr-1">📜</span> Download Resume
              <span className="md:ml-2 ml-1 transition group-hover:translate-x-0.5">✨</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="group border-[#3b82f6]/40 bg-white/5 text-foreground hover:bg-[#3b82f6]/20 hover:text-foreground"
            asChild
          >
            <a href="#projects">
              <span className="md:mr-2 mr-1">👀</span> View Projects
              <span className="md:ml-2 ml-1 transition group-hover:translate-x-0.5">🚀</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
