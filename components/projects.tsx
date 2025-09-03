"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    title: "Stack Overflow Clone",
    desc: "Optimized UI/UX, tagging system, Tailwind, ShadCN components.",
    tech: ["Next.js", "React", "Tailwind", "ShadCN"],
    live: "https://vishaldevflow.vercel.app/",
    code: "https://github.com/vishalsolanki-v/stackNext",
    image: "/stack-overflow-clone-ui.webp",
  },
  {
    title: "Commercial Business Application",
    desc: "Auth, SSR, dynamic rendering for scalability.",
    tech: ["Next.js", "SSR", "Auth"],
    live: "https://mytyles.com",
    code: "company",
    image: "/commercial-business-app.webp",
  },
  {
    title: "HR Management System",
    desc: "React + Redux + Context API for robust state management.",
    tech: ["React", "Redux", "Context API"],
    live: "https://clovehr.com/register",
    code: "company",
    image: "/hr-management-system.webp",
  },
  {
    title: "Influencer Marketing Platform",
    desc: "Real-time messaging (WebSockets) and AI-powered search.",
    tech: ["WebSockets", "AI Search", "Next.js"],
    live: "https://app.inflyx.co/login",
    code: "company",
    image: "/influencer-marketing-platform.webp",
  },
]

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        className="text-balance text-2xl font-semibold md:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      <motion.div
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {projects.map((p) => (
          <motion.article
            key={p.title}
            className="group relative overflow-hidden rounded-xl border border-black/5 bg-white/60 backdrop-blur transition-all hover:shadow-lg dark:border-white/10 dark:bg-slate-900/50"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          >
            {/* <img src={p.image || "/placeholder.svg"} alt={`${p.title} preview`} className="h-40 w-full object-cover" /> */}
            <Image
  src={p.image || "/placeholder.svg"}
  alt={`${p.title} preview`}
  // width={600}
  // height={400}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  className="h-40 w-full object-cover"
/>
            <div className="p-5">
              <h3 className="text-base font-semibold">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-indigo-600/10 px-2 py-0.5 text-xs text-indigo-700 dark:text-indigo-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={p.live} target="_blank" rel="noreferrer"
                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-indigo-700"
                >
                  View Live
                </a>
                <a
                  href={p.code}
                  target="_blank" rel="noreferrer"
                  className="rounded-md border border-slate-300/70 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-900 backdrop-blur hover:shadow dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100"
                >
                  {p.code==="company"? "Company Owned" : "View Code"}
                </a>
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-10"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-blue-500" />
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
