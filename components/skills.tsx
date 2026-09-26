"use client"

import { motion } from "framer-motion"

const groups = [
  {
    title: "Programming",
    items: [
      { name: "JavaScript", level: 9 },
      { name: "TypeScript", level: 8 },
      { name: "HTML5", level: 8 },
      { name: "CSS3", level: 8 },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "React.js", level: 9 },
      { name: "Next.js", level: 9 },
      { name: "Node.js", level: 8 },
      { name: "Express.js", level: 7 },
    ],
  },
  {
    title: "State Management",
    items: [
      { name: "Redux", level: 9 },
      { name: "Redux Toolkit", level: 9 },
      { name: "RTK Query", level: 8 },
      { name: "Context API", level: 9 },
    ],
  },
  {
    title: "Styling",
    items: [
      { name: "Tailwind CSS", level: 9 },
      { name: "ShadCN/UI", level: 8 },
      { name: "Bootstrap", level: 7 },
      { name: "Responsive Design", level: 8 },
      { name: "Accessibility", level: 8 },
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "REST APIs", level: 9 },
      { name: "REST API Development", level: 9 },
      { name: "Next.js Server Actions", level: 8 },
      { name: "Authentication & Authorization", level: 8 },
      { name: "JWT", level: 7 },
      { name: "OAuth", level: 6 },
      { name: "Zod", level: 7 },
      { name: "WebSockets", level: 7 },
      { name: "GraphQL", level: 7 },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL", level: 7 },
      { name: "MongoDB", level: 7 },
      { name: "Data Modeling", level: 7 },
      { name: "SQL", level: 7 },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 8 },
      { name: "AWS Amplify", level: 7 },
      { name: "AWS Lambda", level: 6 },
      { name: "Docker", level: 7 },
      { name: "Vercel", level: 9 },
      { name: "CI/CD", level: 7 },
      { name: "GitHub", level: 9 },
      { name: "Bitbucket", level: 8 },
    ],
  },
  {
    title: "Testing & Tools",
    items: [
      { name: "Git", level: 9 },
      { name: "Postman", level: 9 },
      { name: "Jest", level: 6 },
      { name: "Chrome DevTools", level: 8 },
    ],
  },
  {
    title: "Engineering",
    items: [
      { name: "Performance Optimization", level: 8 },
      { name: "Core Web Vitals", level: 8 },
      { name: "SEO", level: 7 },
      { name: "Technical SEO", level: 7 },
      { name: "Caching", level: 7 },
      { name: "Web Accessibility", level: 8 },
      { name: "Agile Development", level: 8 },
      { name: "Code Review", level: 8 },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { name: "Claude Code", level: 8 },
      { name: "GitHub Copilot", level: 8 },
      { name: "Codex", level: 8 },
    ],
  },
]


export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        className="text-balance text-2xl font-semibold md:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h2>

      <motion.div
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {groups.map((g) => (
          <motion.div
            key={g.title}
            className="rounded-xl border border-black/5 bg-white/60 p-5 backdrop-blur dark:border-white/10 dark:bg-slate-900/50"
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{g.title}</h3>
            <ul className="mt-3 space-y-2">
              {g.items.map((item) => {
                const progress = (item.level / 10) * 100

                return (
                  <li key={item.name} className="text-sm text-slate-700 dark:text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Lvl {item.level}/10
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                      <motion.div
                        className="h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-orange-200 hover:to-orange-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Profile Skills ${item.name}`}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
