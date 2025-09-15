"use client"

import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, ExternalLink, ArrowUpRight, Share2 } from "lucide-react"
import { cn, hashPostId } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

type Post = {
  title: string
  link: string
  image?: string
  publishedAt?: string | null
  author?: string
  excerpt?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

// function hashPostId(input: string) {
//   let hash = 5381
//   for (let i = 0; i < input.length; i++) {
//     hash = (hash * 33) ^ input.charCodeAt(i)
//   }
//   return (hash >>> 0).toString(36)
// }

export function BlogSection() {
  const { data, error, isLoading } = useSWR<{ posts: Post[] }>("/api/medium", fetcher, {
    revalidateOnFocus: false,
  })

  const didScrollRef = useRef(false)
  useEffect(() => {
    if (didScrollRef.current) return
    if (!data?.posts?.length) return
    const params = new URLSearchParams(window.location.search)
    const target = params.get("post")
    if (!target) return
    const el = document.getElementById(`post-${target}`)
    if (el) {
      didScrollRef.current = true
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      const url = new URL(window.location.href)
      url.searchParams.delete("post")
      window.history.replaceState({}, "", url.pathname + url.hash)
    }
  }, [data])

  return (
    <section id="blog" className="py-16 md:py-24 scroll-mt-28 md:scroll-mt-32" aria-busy={isLoading ? "true" : "false"}>
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8 md:mb-12">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight md:text-4xl">Latest from Medium</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Fresh posts from my Medium publication, fetched automatically.
          </p>
        </header>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3" role="status" aria-live="polite">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-lg border border-slate-200 bg-slate-100/40 dark:border-slate-800 dark:bg-slate-900/40"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
            <p className="text-sm text-red-600 dark:text-red-400">
              Unable to load Medium posts right now. Please try again later.
            </p>
          </div>
        )}

        {data?.posts?.length ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.posts.map((post) => {
              const id = hashPostId(post.link)
              return (
                <li key={post.link} id={`post-${id}`} className="scroll-mt-28 md:scroll-mt-32">
                  <ArticleCard post={post} postId={id} />
                </li>
              )
            })}
          </ul>
        ) : !isLoading && !error ? (
          <div className="rounded-lg border border-slate-200 p-6 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
            No posts found yet. Check back soon!
          </div>
        ) : null}

        <div className="mt-10 flex">
          <Link
            href="https://medium.com/@vishalthakur2463"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm",
              "hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors",
            )}
            aria-label="View all posts on Medium (opens in a new tab)"
          >
            View all on Medium
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ArticleCard({ post, postId }: { post: Post; postId: string }) {
  const dateLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  const [copied, setCopied] = useState(false)

  async function onShare() {
    try {
      const url = `${window.location.origin}/blog/${encodeURIComponent(postId)}`
      const canNativeShare =
        typeof navigator !== "undefined" && "share" in navigator && (navigator as any).canShare?.({ url })
      if (canNativeShare) {
        await (navigator as any).share({ title: post.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (e) {
      console.error("Share failed:", (e as Error).message)
    }
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {post.image ? (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title || "Medium article image"}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-slate-100 dark:bg-slate-800">
          <ArrowUpRight className="h-6 w-6 text-slate-500" aria-hidden="true" />
          <span className="sr-only">Article thumbnail placeholder</span>
        </div>
      )}

      <div className="flex grow flex-col p-4">
        <h3 className="line-clamp-2 text-lg font-medium tracking-tight">{post.title}</h3>
        {dateLabel ? (
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <span>{dateLabel}</span>
          </div>
        ) : null}
        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
        ) : null}

        <div className="mt-4 flex items-center flex-row justify-between w-full">
          <Link
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            aria-label={`Read '${post.title}' on Medium (opens in a new tab)`}
          >
            Read on Medium
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href={`/blog/${encodeURIComponent(postId)}`}
             target="_blank"
            className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            aria-label={`Read '${post.title}' on this site`}
          >
            Read on site
          </Link>

          <button
            type="button"
            onClick={onShare}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm transition-colors relative",
              "hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
            )}
            aria-label={`Share '${post.title}' link`}
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
          <span
            className={cn("text-xs text-slate-500 transition-opacity absolute top-[-10px] left-0 right-0", copied ? "opacity-100" : "opacity-0")}
            aria-live="polite"
          >
            Copied!
          </span>
          </button>

        </div>
      </div>
    </article>
  )
}