"use client"

import { motion } from "framer-motion"

const awards = [
  { title: "Shining Star of the Year", meta: "Devstringx - 2023" },
  { title: "Star of the Month", meta: "Multiple times, 2022–2024" },
]

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        className="text-balance text-2xl font-semibold md:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Achievements
      </motion.h2>

      <motion.div
        className="mt-6 flex flex-wrap gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {awards.map((a) => (
          <motion.div
            key={a.title}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm text-slate-800 backdrop-blur dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100"
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
          >
            <span aria-hidden>⭐</span>
            <span className="font-medium">{a.title}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">({a.meta})</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
