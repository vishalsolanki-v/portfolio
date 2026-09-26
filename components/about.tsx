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
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>
              Software Engineer with 3.5+ years of experience building and optimizing production web applications using React.js, Next.js, TypeScript, Node.js, MySQL, and MongoDB.
            </p>
            <p>
              I work across both frontend and backend, with hands-on experience building secure APIs, server-side workflows, authentication systems, caching solutions, and responsive user interfaces.
            </p>
            <p>
              My experience also includes performance optimization, Core Web Vitals, SEO, accessibility, AWS, Docker, and CI/CD workflows. I enjoy improving existing systems, solving production problems, and turning complex requirements into reliable, maintainable software.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="group relative">
            <Image
              src="/download.webp"
              alt="Profile photo of Vishal Solanki"
              width={240}
              height={240}
              sizes="(max-width: 768px) 120px, 240px"
              className="object-cover transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 h-48 w-48 rounded-full  md:h-60 md:w-60"
            />

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
            "Full-stack development with React.js, Next.js, TypeScript, and Node.js",
            "Production APIs with Node.js, Express.js, REST, Server Actions, and authentication",
            "Performance optimization, Core Web Vitals, caching, and bundle optimization",
            "Secure server-side workflows and protection of sensitive client-side operations",
            "Reusable and accessible UI components with Tailwind CSS and ShadCN/UI",
            "State management with Redux Toolkit, RTK Query, and Context API",
            "MySQL and MongoDB with practical data modeling experience",
            "AWS, Docker, Vercel, and CI/CD deployment workflows",
            "SEO, technical SEO, indexing, GA4, and Google Tag Manager",
            "AI-assisted development using Claude Code and GitHub Copilot",
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
