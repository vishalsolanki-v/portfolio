import { listBlogs } from "@/lib/blog-db"

export default async function sitemap() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const staticRoutes = ["", "/#about", "/#projects", "/#blog"].map((p) => ({
    url: `${site}${p}`,
    lastModified: new Date(),
  }))
  const blogs = await listBlogs().catch(() => [])
  const blogRoutes = blogs.map((b) => ({
    url: `${site}/blog/${b.id}`,
    lastModified: b.updated_at ? new Date(b.updated_at) : new Date(),
  }))
  return [...staticRoutes, ...blogRoutes]
}