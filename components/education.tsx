"use client"

import { motion } from "framer-motion"

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        className="text-balance text-2xl font-semibold md:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Education
      </motion.h2>
      <div className="mt-6">
        <div className="relative rounded-xl border border-black/5 bg-white/60 p-5 backdrop-blur dark:border-white/10 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-indigo-600" aria-hidden />
            <div>
              <h3 className="text-base font-semibold">Bachelor of Computer Applications</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">CCS University</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
