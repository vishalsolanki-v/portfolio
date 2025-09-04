import Link from "next/link"
import { getPostById, type MediumPost } from "@/lib/medium"
import { getNumber } from "@/lib/redis"
import ClapButton from "@/components/clap-button"
import CommentsSection from "@/components/comments"
import { ArrowUpRight, CalendarDays, ExternalLink, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Image from "next/image"
import './blog.css'
type Props = { params: { id: string } }
type Post = {
  title: string
  link: string
  image?: string
  publishedAt?: string | null
  author?: string
  excerpt?: string
}
export async function generateMetadata({ params }: Props) {
  const { post } = await getPostById(params.id)
  const site = process.env.NEXT_PUBLIC_SITE_URL || ""
  const title = post?.title || "Blog"
  const desc = (post?.description || "").replace(/<[^>]+>/g, "").slice(0, 160) || "Read this blog"
  const image = post?.image
    ? post.image.startsWith("http")
      ? post.image
      : `${site}${post.image}`
    : `${site}/blog-social-card.jpg`
  const url = `${site}/blog/${params.id}`

  return {
    title,
    description: desc,
    openGraph: { title, description: desc, type: "article", url, images: [{ url: image }] },
    twitter: { card: "summary_large_image", title, description: desc, images: [image] },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = params
  const { post, posts } = await getPostById(id)
  console.log(post,'postpost')
  if (!post) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <Link href="/#blog" className="mt-4 inline-block text-indigo-600 hover:underline">
          Back to Blogs
        </Link>
      </main>
    )
  }
function hashPostId(input: string) {
  let hash = 5381
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i)
  }
  return (hash >>> 0).toString(36)
}
  const [shares, views, claps] = await Promise.all([
    getNumber(`blog:share:${id}`),
    getNumber(`blog:view:${id}`),
    getNumber(`blog:claps:${id}`),
  ])
  const others = (posts || []).filter((p) => p.id !== id).slice(0, 4)

  return (
    <main className="min-h-dvh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
     <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <article>
        <header className="mb-6">
          <h1 className="text-pretty text-3xl font-semibold">{post.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {post.isoDate ? new Date(post.isoDate).toLocaleDateString() : ""} • {views} views • {shares} shares
          </p>
        </header>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try{
                  var k='viewed:${id}';
                  if(!sessionStorage.getItem(k)){
                    sessionStorage.setItem(k,'1');
                    fetch('/api/blog/track',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:'${id}',type:'view'})});
                  }
                }catch(e){}
              })();
            `,
          }}
        />

        <section className="medium-article">
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: post.contentHTML || "" }} />
        </section>

        <div className="mt-8 flex items-center gap-4">
          <ClapButton postId={id} initialCount={claps} />
          {/* <Link
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:underline"
          >
            Read on Medium

          </Link> */}
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
        </div>
      </article>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentsSection postId={id} />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Readers Also Enjoyed</h2>
        {/* <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((p: MediumPost) => (
            <Link key={p.id} href={`/blog/${p.id}`} className="rounded-lg border p-4 hover:bg-accent">
              <h3 className="font-medium">{p.title}</h3>
              <p
                className="mt-2 line-clamp-2 text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: p.description || "" }}
              />
            </Link>
          ))}


        </div> */}
        {others?.length ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((post) => {
              const id = hashPostId(post.link);
              return (
                <li key={post.link} id={`post-${id}`} className="scroll-mt-28 md:scroll-mt-32">
                  <ArticleCard post={post} postId={id} />
                </li>
              )
            })}
          </ul>
        ) : null}
      </section>
     </section>
    </main>
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

  // const [copied, setCopied] = useState(false)

  async function onShare() {
    try {
      const url = `${window.location.origin}/share/blog/${encodeURIComponent(postId)}`
      const canNativeShare =
        typeof navigator !== "undefined" && "share" in navigator && (navigator as any).canShare?.({ url })
      if (canNativeShare) {
        await (navigator as any).share({ title: post.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        // setCopied(true)
        // setTimeout(() => setCopied(false), 2000)
      }
    } catch (e) {
      console.error("[v0] Share failed:", (e as Error).message)
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

          {/* <button
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
          </button> */}

        </div>
      </div>
    </article>
  )
}