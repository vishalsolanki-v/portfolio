import { createClient } from "@/lib/supabase/server"
import { hashPostId } from "@/lib/medium"

export type DatabaseBlog = {
  id: string
  title: string
  excerpt?: string | null
  content_html?: string | null
  cover_image?: string | null
  medium_url?: string | null
  iso_date?: string | null
  author?: string | null
  tags?: any
  is_premium: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

async function supa() {
  return await createClient()
}

export async function listBlogs(): Promise<DatabaseBlog[]> {
  const supabase = await supa()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("iso_date", { ascending: false })
    .order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getAllBlogs(): Promise<DatabaseBlog[]> {
  return listBlogs()
}

export async function getBlogById(id: string): Promise<DatabaseBlog | null> {
  const supabase = await supa()
  const { data } = await supabase.from("blogs").select("*").eq("id", id).eq("is_published", true).single()
  return data || null
}

export async function getBlogByIdAdmin(id: string): Promise<DatabaseBlog | null> {
  const supabase = await supa()
  const { data } = await supabase.from("blogs").select("*").eq("id", id).single()
  return data || null
}

export async function getAllBlogsAdmin(): Promise<DatabaseBlog[]> {
  const supabase = await supa()
  const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function createBlog(blog: Omit<DatabaseBlog, "id" | "created_at" | "updated_at">): Promise<DatabaseBlog> {
  const supabase = await supa()
  const id = hashPostId(blog.medium_url || blog.title)
  const payload = {
    id,
    title: blog.title,
    excerpt: blog.excerpt || null,
    content_html: blog.content_html || null,
    cover_image: blog.cover_image || null,
    medium_url: blog.medium_url || null,
    iso_date: blog.iso_date || new Date().toISOString(),
    author: blog.author || null,
    tags: blog.tags ?? [],
    is_premium: !!blog.is_premium,
    is_published: blog.is_published ?? true,
  }
  const { data, error } = await supabase.from("blogs").insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateBlog(id: string, updates: Partial<DatabaseBlog>): Promise<DatabaseBlog> {
  const supabase = await supa()
  const { data, error } = await supabase
    .from("blogs")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteBlog(id: string): Promise<void> {
  const supabase = await supa()
  const { error } = await supabase.from("blogs").delete().eq("id", id)
  if (error) throw error
}

export async function upsertBlog(blog: Partial<DatabaseBlog> & { id: string }): Promise<DatabaseBlog> {
  const supabase = await supa()
  const payload = {
    ...blog,
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await supabase.from("blogs").upsert(payload, { onConflict: "id" }).select().single()
  if (error) throw error
  return data
}

export async function mergeUpdateBlog(id: string, patch: Partial<DatabaseBlog>): Promise<DatabaseBlog | null> {
  const supabase = await supa()
  const { data: existing } = await supabase.from("blogs").select("*").eq("id", id).single()
  if (!existing) return null

  const isFilled = (v: any) => !(v === undefined || v === null || (typeof v === "string" && v.trim() === ""))

  const merged: Partial<DatabaseBlog> = {
    title: isFilled(patch.title) ? patch.title! : existing.title,
    excerpt: isFilled(patch.excerpt) ? patch.excerpt! : existing.excerpt,
    content_html: isFilled(patch.content_html) ? patch.content_html! : existing.content_html,
    cover_image: isFilled(patch.cover_image) ? patch.cover_image! : existing.cover_image,
    medium_url: isFilled(patch.medium_url) ? patch.medium_url! : existing.medium_url,
    iso_date: isFilled(patch.iso_date) ? patch.iso_date! : existing.iso_date,
    author: isFilled(patch.author) ? patch.author! : existing.author,
    tags: isFilled(patch.tags) ? patch.tags! : existing.tags,
    is_premium: isFilled(patch.is_premium) ? !!patch.is_premium : existing.is_premium,
    is_published: isFilled(patch.is_published) ? !!patch.is_published : existing.is_published,
  }

  return await updateBlog(id, merged)
}

export async function getBlogByMediumId(mediumId: string): Promise<DatabaseBlog | null> {
  const supabase = await supa()
  // 1) Strict match on stored Medium URL
  let { data } = await supabase.from("blogs").select("*").eq("medium_url", mediumId).single()
  if (data) return data as DatabaseBlog

  // 2) Try hashed id derived from the input (works if a Medium URL was passed)
  const hashed = hashPostId(mediumId)
  ;({ data } = await supabase.from("blogs").select("*").eq("id", hashed).single())
  if (data)
    return data as DatabaseBlog

    // 3) Fallback: direct id match in case caller passed the canonical id
  ;({ data } = await supabase.from("blogs").select("*").eq("id", mediumId).single())
  return (data as DatabaseBlog) || null
}