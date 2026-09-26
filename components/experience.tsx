"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image";
import { useRef } from "react";

const experiences = [
  {
    company: "Ambak",
    role: "Software Engineer",
    period: "Jan 2026 – Present",
    logo: "/placeholder.svg",
    achievements: [
      "Built and maintained full-stack features for ambak.com using Next.js, React, TypeScript, Node.js, MySQL, AWS, and Docker.",
      "Developed APIs and server-side workflows for customer onboarding, home-loan discovery, CIBIL workflows, and financial products.",
      "Moved sensitive client-side operations to server-side workflows using secure cookies and Next.js Server Actions.",
      "Reduced the production JavaScript bundle by approximately 50%, improving responsiveness and Core Web Vitals on low-end devices.",
      "Implemented in-memory caching for GET and POST requests to reduce redundant API calls and improve responsiveness.",
      "Investigated indexing issues and GA4/GTM regressions affecting SEO and conversion tracking.",
      "Implemented responsive interfaces for financial-product discovery, filters, home-loan offers, and customer workflows.",
      "Worked with Figma design systems and design tokens, and documented CMS workflows for non-technical users.",
      "Used Claude Code and GitHub Copilot for development, debugging, testing, code review, and workflow acceleration.",
    ],
  },
  {
    company: "Devstringx Technologies",
    role: "React JS Frontend Developer",
    period: "May 2022 – Feb 2025",
    logo: "/devstringx-technologies-logo.webp",
    achievements: [
      "Developed production React.js and Next.js applications for enterprise clients, focusing on performance, accessibility, maintainability, and reusable frontend architecture.",
      "Built reusable UI components and shared design patterns that improved consistency and reduced duplicated implementation effort.",
      "Implemented application state management using Redux Toolkit, RTK Query, and Context API.",
      "Integrated REST APIs and developed authentication workflows for responsive web applications.",
      "Improved performance using code splitting, lazy loading, image optimization, caching, and rendering optimizations.",
      "Worked on Core Web Vitals and frontend performance improvements across production applications.",
      "Participated in Agile development, code reviews, technical discussions, debugging, and feature delivery.",
    ],
  },
]

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start",],
  });

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

      <div className="relative mt-8" ref={ref}>
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
              className={`relative grid items-start gap-4 md:grid-cols-2 ${idx % 2 === 1 ? "md:[&>*:first-child]:order-1" : ""
                }`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className={idx % 2 === 1 ? "md:pl-8" : "md:pr-8"}>
                <div className="relative rounded-xl border border-black/5 bg-white/60 p-5 backdrop-blur dark:border-white/10 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
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
                      <p className="text-sm text-slate-700 dark:text-slate-300">{e.role}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{e.period}</p>
                    </div>
                  </div>
                  <ul className="mt-3 grid gap-2 md:grid-cols-2">
                    {e.achievements.map((a) => (
                      <li
                        key={a}
                        className="rounded-md border border-black/5 bg-white/70 px-3 py-2 text-xs text-slate-700 backdrop-blur dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
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
