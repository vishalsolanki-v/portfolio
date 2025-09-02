"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      })
      setStatus(res.ok ? "success" : "error")
      if (res.ok) form.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <motion.h2
        className="text-balance text-2xl font-semibold md:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Contact
      </motion.h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <motion.form
          onSubmit={onSubmit}
          className="rounded-xl border border-black/5 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-slate-900/50"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-1 w-full rounded-md border border-slate-300/70 bg-white/80 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-slate-300/70 bg-white/80 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="mt-1 w-full rounded-md border border-slate-300/70 bg-white/80 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100"
                placeholder="How can I help you?"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-indigo-700 disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-sm text-green-600 dark:text-green-400">Message sent! I will get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>
            )}
          </div>
        </motion.form>

        <motion.div
          className="rounded-xl border border-black/5 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-slate-900/50"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Connect</h3>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <a className="hover:underline" href="mailto:vishalthakur2463@gmail.com" target="_blank" rel="noreferrer">
                📧 Email: vishalthakur2463@gmail.com
              </a>
            </li>
            <li className="text-slate-700 dark:text-slate-300">📍 Noida, India</li>
            <li>
              <a
                className="hover:underline"
                href="https://linkedin.com/in/vishal-solanki2000"
                target="_blank"
                rel="noreferrer"
              >
                🔗 LinkedIn: linkedin.com/in/vishal-solanki2000
              </a>
            </li>
            <li>
              <a className="hover:underline" href="https://github.com/vishalsolanki-v" target="_blank" rel="noreferrer">
                💻 GitHub: github.com/vishalsolanki-v
              </a>
            </li>
             <li>
              <a className="hover:underline" href="https://medium.com/@vishalthakur2463" target="_blank" rel="noreferrer">
                🔗 Medium: medium.com/@vishalthakur2463
              </a>
            </li>
            <li className="text-slate-700 dark:text-slate-300">📱 Phone: +91 8920380522</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
