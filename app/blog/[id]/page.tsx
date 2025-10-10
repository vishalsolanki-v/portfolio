import Link from "next/link"
import { getPostById, type MediumPost } from "@/lib/medium"
import { getNumber } from "@/lib/redis"
import ClapButton from "@/components/clap-button"
import CommentsSection from "@/components/comments"
import { getBlogById as getDBBlog } from "@/lib/blog-db"

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  const db = await getDBBlog(params.id)
  const { post } = await getPostById(params.id)
  const site = process.env.NEXT_PUBLIC_SITE_URL || ""
  const title = db ? db.title : post?.title || "Blog"
  const desc =
    (db ? (db.excerpt || "").slice(0, 160) : (post?.description || "").replace(/<[^>]+>/g, "").slice(0, 160)) ||
    "Read this blog"
  const image =
    db && db.cover_image
      ? db.cover_image.startsWith("http")
        ? db.cover_image
        : `${site}${db.cover_image}`
      : post?.image
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
  const db = await getDBBlog(id)

  let others: MediumPost[] = []

  if (!db) {
    const { posts } = await getPostById(id)
    others = (posts || []).filter((p) => p.id !== id).slice(0, 4)
  }

  if (db) {
    const [shares, views, claps] = await Promise.all([
      getNumber(`blog:share:${id}`),
      getNumber(`blog:view:${id}`),
      getNumber(`blog:claps:${id}`),
    ])
    const site = process.env.NEXT_PUBLIC_SITE_URL || ""
    const title = db.title
    const desc = (db.excerpt || "").slice(0, 160) || "Read this blog"
    const image = db.cover_image
      ? db.cover_image.startsWith("http")
        ? db.cover_image
        : `${site}${db.cover_image}`
      : `${site}/blog-social-card.jpg`
    const hasContent = (db.content_html || "").trim().length > 0

    return (
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <article>
          <header className="mb-6">
            <h1 className="text-pretty text-3xl font-semibold">{db.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {db.iso_date ? new Date(db.iso_date).toLocaleDateString() : ""} • {views} views • {shares} shares
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
          <section className="prose prose-slate dark:prose-invert max-w-none">
            {hasContent ? (
              <div dangerouslySetInnerHTML={{ __html: db.content_html || "" }} />
            ) : db.medium_url ? (
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                Full content unavailable here.{" "}
                <Link
                  href={db.medium_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Read on Medium
                </Link>
                .
              </div>
            ) : (
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                Full content is not available for this post.
              </div>
            )}
          </section>

          <div className="mt-8 flex items-center gap-4">
            <ClapButton postId={id} initialCount={claps} />
            {db.medium_url ? (
              <Link
                href={db.medium_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:underline"
              >
                Read on Medium
              </Link>
            ) : null}
          </div>
        </article>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">Comments</h2>
          <CommentsSection postId={id} />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">Other Blogs</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* DB-backed view: show none or consider fetching latest via /api/blogs if desired */}
          </div>
        </section>
      </main>
    )
  }

  // Fallback to RSS
  const { post } = await getPostById(id)
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

  const [shares, views, claps] = await Promise.all([
    getNumber(`blog:share:${id}`),
    getNumber(`blog:view:${id}`),
    getNumber(`blog:claps:${id}`),
  ])

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
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
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.contentHTML || "" }} />
        </section>

        <div className="mt-8 flex items-center gap-4">
          <ClapButton postId={id} initialCount={claps} />
          <Link
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:underline"
          >
            Read on Medium
          </Link>
        </div>
      </article>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentsSection postId={id} />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Other Blogs</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((p: MediumPost) => (
            <Link key={p.id} href={`/blog/${p.id}`} className="rounded-lg border p-4 hover:bg-accent">
              <h3 className="font-medium">{p.title}</h3>
              {/* eslint-disable-next-line react/no-danger */}
              <p
                className="mt-2 line-clamp-2 text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: p.description || "" }}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}