"use client"

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

const subscribeToNothing = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribeToNothing, getClientSnapshot, getServerSnapshot)
  if (!mounted) return null

  const current = theme === "system" ? systemTheme : theme
  const isDark = current === "dark"

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-md border border-slate-300/70 bg-white/70 px-3 py-1.5 text-xs text-slate-900 backdrop-blur transition hover:shadow dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  )
}
