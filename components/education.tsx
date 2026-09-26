"use client"

import { motion } from "framer-motion"

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    period: "2023 – 2025",
    institution: "Hi-Tech Institute of Engineering & Technology",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2022",
    institution: "CCS University",
  },
]

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
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {education.map((item) => (
          <div key={item.degree} className="relative rounded-xl border border-black/5 bg-white/60 p-5 backdrop-blur dark:border-white/10 dark:bg-slate-900/50">
            <div className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-600" aria-hidden />
              <div>
                <h3 className="text-base font-semibold">{item.degree}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.institution}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.period}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
