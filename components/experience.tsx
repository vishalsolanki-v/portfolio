"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image";
import { useRef } from "react";

const experiences = [
  {
    company: "Anagram Media Labs",
    period: "Mar 2025 – Present",
    summary: "Focus on React, Redux Toolkit, WebSockets, AI-powered search.",
    logo: "/anagram-media-labs-logo.webp",
    achievements: ["Real-time messaging via WebSockets", "Optimized Redux data flows", "Built AI-driven search UX"],
  },
  {
    company: "Devstringx Technologies",
    period: "May 2022 – March 2025",
    summary: "Built responsive apps, improved performance by 65%, reusable components.",
    logo: "/devstringx-technologies-logo.webp",
    achievements: ["65% performance improvement", "Reusable component library", "Core Web Vitals enhancements"],
  },
]

export function Experience() {
    const ref = useRef<HTMLDivElement>(null);

  // Get scroll progress of parent div (0 → 1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end","start start",], // 0 when top hits, 1 when bottom hits
  });

  // Convert progress → height %
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        className="text-balance text-2xl font-semibold md:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Work Experience
      </motion.h2>

      <div className="relative mt-8"  ref={ref}>
        {/* <div
          className="absolute left-4 top-0 h-full w-px bg-slate-200 dark:bg-slate-800 md:left-1/2"
          aria-hidden="true"
        /> */}
         <div
        className="absolute left-4 top-0 h-full rounded-3xl w-0.5 bg-slate-300 dark:bg-slate-700 md:left-1/2"
        aria-hidden="true"
      />
         <motion.div
        className="absolute left-4 top-0 w-0.5 rounded-3xl bg-indigo-600 dark:bg-indigo-400 md:left-1/2"
        style={{ height }}
        aria-hidden="true"
      />
        <div className="space-y-10">
          {experiences.map((e, idx) => (
            <motion.div
              key={e.company}
              className={`relative grid items-start gap-4 md:grid-cols-2 ${
                idx % 2 === 1 ? "md:[&>*:first-child]:order-1" : ""
              }`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className={idx % 2 === 1 ?"md:pl-8" : "md:pr-8"}>
                <div className="relative rounded-xl border border-black/5 bg-white/60 p-5 backdrop-blur dark:border-white/10 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    {/* <img
                      src={e.logo || "/placeholder.svg"}
                      alt={`${e.company} logo`}
                      className="h-10 w-10 rounded-md"
                    /> */}
                    <Image
 src={e.logo || "/placeholder.svg"}
                      alt={`${e.company} logo`}
  width={40}
  height={40}
  className="h-10 w-10 rounded-md"
  sizes="40px"
/>
                    <div>
                      <h3 className="text-base font-semibold">{e.company}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{e.period}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{e.summary}</p>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    {e.achievements.map((a) => (
                      <div
                        key={a}
                        className="rounded-md border border-black/5 bg-white/70 px-3 py-2 text-xs text-slate-700 backdrop-blur dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300"
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                  <div
                    className="absolute left-2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900 md:left-auto md:right-1/2"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
