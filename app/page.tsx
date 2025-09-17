"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Achievements } from "@/components/achievements"
import { Education } from "@/components/education"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { BlogSection } from "@/components/blog"

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("motion-safe", !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }
  }, [])
  useEffect(() => {
    if (typeof window === "undefined") return
    const url = new URL(window.location.href)
    const postId = url.searchParams.get("post")
    if (!postId) return
    const targetId = `post-${postId}`
    let tries = 0
    const maxTries = 30
    const timer = setInterval(() => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        url.searchParams.delete("post")
        const newUrl = url.pathname + (url.search ? `?${url.searchParams.toString()}` : "") + (url.hash || "")
        window.history.replaceState({}, "", newUrl)
        clearInterval(timer)
      } else if (++tries >= maxTries) {
        clearInterval(timer)
      }
    }, 150)
    return () => clearInterval(timer)
  }, [])
  return (
    <main className="min-h-dvh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar showOtherLinks={true}/>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Education />
      <BlogSection />
      <Contact />
      <Footer />
    </main>
  )
}
