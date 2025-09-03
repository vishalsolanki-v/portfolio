"use client"

import { useEffect } from "react"

export default function ClientRedirect({ id }: { id: string }) {
  useEffect(() => {
    const nextUrl = `/?post=${encodeURIComponent(id)}#blog`
    const t = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.replace(nextUrl)
      }
    }, 600)
    return () => clearTimeout(t)
  }, [id])

  const target = `/?post=${encodeURIComponent(id)}#blog`

  return (
    <main className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-lg font-semibold">Loading post…</h1>
        <p className="text-sm text-muted-foreground">
          We’re taking you to the post on the homepage. If nothing happens,{" "}
          <a className="text-primary underline" href={target}>
            click here
          </a>
          .
        </p>
        <noscript>
          <p>
            JavaScript is disabled. Please{" "}
            <a className="text-primary underline" href={target}>
              continue to the post
            </a>
            .
          </p>
        </noscript>
      </div>
    </main>
  )
}