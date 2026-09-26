"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SceneCanvas } from "./three/scene-canvas"
import { FloatingShapes } from "./three/floating-shapes"
import { Particles } from "./three/particles"
import Link from "next/link"
import { ArrowDownRight } from "lucide-react"

const words = ["Hi", "👋", "I'm", "Vishal", "Solanki"]

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
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-500/15 dark:text-emerald-300"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to work
          <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.a>
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
          Software Engineer | Full Stack Development | React.js | Next.js | Node.js | TypeScript
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.5 }}
          className="mt-3 max-w-3xl text-pretty text-sm text-foreground/75 md:text-base"
        >
          I build and optimize production-ready web applications across frontend and backend, with a focus on performance, secure APIs, scalable architecture, and great user experiences.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          <Button className="group bg-[#6365f1ed] text-white hover:bg-[#5558e6]" asChild>
            <Link href={`${process.env.NEXT_PUBLIC_RESUME_URL}`} target="_blank" rel="noreferrer" download={true}>
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
          <Button
            variant="outline"
            className="group border-emerald-500/40 bg-emerald-500/10 text-foreground hover:bg-emerald-500/20 hover:text-foreground"
            asChild
          >
            <a href="#contact">
              Talk to me <span className="ml-2" aria-hidden="true">😊</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
