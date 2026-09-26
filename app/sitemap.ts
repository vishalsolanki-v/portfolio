import { hashPostId } from "@/lib/utils"
import type { MetadataRoute } from "next"

type Post = {
  link: string
  updatedAt?: string
  publishedAt?: string | null
}

async function getPosts(): Promise<Post[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://heyvishal.vercel.app"
    const res = await fetch(`${baseUrl}/api/medium`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error("Failed to fetch Medium posts")
    const data = (await res.json()) as { posts?: Post[] }

    return data.posts || []
  } catch (error) {
    console.error("Sitemap fetch error:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://heyvishal.vercel.app").replace(/\/$/, "")
  const posts = await getPosts()

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...posts.map((post) => {
      const id = hashPostId(post.link)
      const updatedAt = post.updatedAt || post.publishedAt

      return {
        url: `${baseUrl}/blog/${encodeURIComponent(id)}`,
        lastModified: updatedAt ? new Date(updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }
    }),
  ]
}
