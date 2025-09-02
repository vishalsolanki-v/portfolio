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
    // Optional: reduce motion if user prefers reduced motion
    if (typeof window !== "undefined") {
      document.body.classList.toggle("motion-safe", !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }
  }, [])

  return (
    <main className="min-h-dvh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
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
