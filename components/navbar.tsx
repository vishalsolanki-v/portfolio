"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
const onSmoothClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (el) {
    e.preventDefault()
    el.scrollIntoView({
      behavior: "smooth", 
      block: "start", 
      inline: "nearest"
    })
  }
}


  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/50 border-b border-black/5 dark:border-white/10"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="font-semibold tracking-tight text-indigo-600 dark:text-indigo-400" aria-label="Home">
          Vishal Solanki
        </a>
        <div className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => onSmoothClick(e, l.href)}
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
