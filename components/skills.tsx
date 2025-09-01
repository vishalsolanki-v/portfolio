"use client"

import { motion } from "framer-motion"

const groups = [
  { title: "Programming", items: ["JavaScript", "TypeScript"] },
  { title: "Frameworks", items: ["React.js", "Next.js"] },
  { title: "State Management", items: ["Redux", "Redux Toolkit", "RTK Query", "Context API"] },
  { title: "Styling", items: ["Tailwind", "Bootstrap", "CSS3"] },
  { title: "APIs", items: ["REST", "GraphQL"] },
  { title: "Tools", items: ["Git", "Bitbucket", "Jest"] },
  { title: "Others", items: ["WebSockets", "Agile"] },
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
              {/* {g.items.map((i, idx) => (
                <li key={i} className="text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>{i}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Lvl {Math.min(5, 4 + ((idx % 4) as number))}/5
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500"
                      style={{ width: `${70 + (idx % 4) * 10}%` }}
                    />
                  </div>
                </li>
              ))} */}
              {g.items.map((item, idx) => {
  // Calculate level between 1–5
  const level = Math.min(10,8+(idx % 5));

  // Map level to percentage (1/5 → 20%, 5/5 → 100%)
  const progress = (level / 10) * 100;

  return (
    <li
      key={`${item}-${idx}`}
      className="text-sm text-slate-700 dark:text-slate-300"
    >
      <div className="flex items-center justify-between">
        <span>{item}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Lvl {level}/10
        </span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
        {/* <div
          className="h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-orange-200 hover:to-orange-600 transition-all duration-700 ease-out"
          style={{ width: progress ? `${progress}%` : 0 }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          
        /> */}
             <motion.div
        className="h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-orange-200 hover:to-orange-600"
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true, amount: 0.6 }} // runs once when 60% visible
        transition={{ duration: 0.8, ease: "easeOut" }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      </div>
    </li>
  );
})}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
