"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        className="text-balance text-2xl font-semibold md:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <motion.div
          className="rounded-xl border border-black/5 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/50"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <p className="text-slate-700 dark:text-slate-300">
            Results-driven Frontend Developer with 3+ years of experience specializing in React.js, Next.js, and
            TypeScript. Skilled in performance optimization, reusable UI components, and creating seamless user
            experiences.
          </p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="group relative">
            {/* <img
              src="/download.png"
              alt="Profile photo placeholder"
              className="h-48 w-48 rounded-full object-cover transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 md:h-60 md:w-60"
            /> */}
            <div className="h-48 w-48 rounded-full  md:h-60 md:w-60">
            <Image
  src="/download.webp"
  alt="Profile photo of Vishal Solanki"
  // width={240}
  // height={240}
  sizes="(max-width: 768px) 120px, 240px"
  // className="rounded-full object-cover"
  className="rounded-full object-cover transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
/>

            </div>

            <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-transparent transition " />
          </div>
        </motion.div>

        <motion.ul
          className="space-y-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {[
            "React, Next.js, TypeScript",
            "Performance optimization & Core Web Vitals",
            "Reusable, accessible UI components",
            "State management: Redux Toolkit, RTK Query, Context",
          ].map((t) => (
            <motion.li
              key={t}
              className="rounded-lg border border-black/5 bg-white/60 px-4 py-3 text-sm text-slate-700 backdrop-blur dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300"
              variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
            >
              {t}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
