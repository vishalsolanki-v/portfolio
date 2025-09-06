import { MetadataRoute } from "next";
type Post = {
  id: any;
  updatedAt: any;
  title: string
  link: string
  image?: string
  publishedAt?: string | null
  author?: string
  excerpt?: string
}
async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://heyvishal.vercel.app/api/medium", {
      next: { revalidate: 60 }, // refresh every 60s
    });

    if (!res.ok) throw new Error("Failed to fetch Medium posts");
    const data = await res.json();

    return data.posts || [];
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    return [];
  }
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts();
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...posts?.map((post) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${encodeURIComponent(post.id)}`,
      lastModified: post.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
