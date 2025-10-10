"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, Upload, Save, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type DatabaseBlog = {
  id: string
  title: string
  excerpt?: string
  content_html?: string
  cover_image?: string
  medium_url?: string
  iso_date?: string
  author?: string
  tags?: any
  is_premium: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

type BlogFormData = Omit<DatabaseBlog, "id" | "created_at" | "updated_at">

interface BlogManagementProps {
  adminKey: string
}

export default function BlogManagement({ adminKey }: BlogManagementProps) {
  const [blogs, setBlogs] = useState<DatabaseBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBlog, setEditingBlog] = useState<DatabaseBlog | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showImportForm, setShowImportForm] = useState(false)
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    excerpt: "",
    content_html: "",
    cover_image: "",
    medium_url: "",
    iso_date: "",
    author: "",
    tags: [],
    is_premium: false,
    is_published: true,
  })
  const [importData, setImportData] = useState({
    title: "",
    htmlContent: "",
    overwrite: false,
    medium_url: "",
    cover_image: "",
    excerpt: "",
    iso_date: "",
    author: "",
  })

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs", {
        headers: { "x-admin-secret": adminKey },
      })
      if (response.ok) {
        const data = await response.json()
        setBlogs(data.blogs)
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [adminKey])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingBlog ? `/api/admin/blogs/${editingBlog.id}` : "/api/admin/blogs"
      const method = editingBlog ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminKey,
        },
        body: JSON.stringify({
          ...formData,
          iso_date: formData.iso_date || new Date().toISOString(),
        }),
      })

      if (response.ok) {
        await fetchBlogs()
        resetForm()
      } else {
        const err = await response.text()
        console.error("Save failed", err)
      }
    } catch (error) {
      console.error("Error saving blog:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": adminKey },
      })

      if (response.ok) {
        await fetchBlogs()
      }
    } catch (error) {
      console.error("Error deleting blog:", error)
    }
  }

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/import-medium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminKey,
        },
        body: JSON.stringify(importData),
      })

      const result = await response.json()
      if (response.ok) {
        await fetchBlogs()
        setImportData({
          title: "",
          htmlContent: "",
          overwrite: false,
          medium_url: "",
          cover_image: "",
          excerpt: "",
          iso_date: "",
          author: "",
        })
        setShowImportForm(false)
      } else if (response.status === 409) {
        alert(`Blog already exists. Enable "Overwrite existing" to update it.`)
      } else {
        alert(result.error || "Failed to import")
      }
    } catch (error) {
      console.error("Error importing blog:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content_html: "",
      cover_image: "",
      medium_url: "",
      iso_date: "",
      author: "",
      tags: [],
      is_premium: false,
      is_published: true,
    })
    setEditingBlog(null)
    setShowAddForm(false)
  }

  const startEdit = (blog: DatabaseBlog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content_html: blog.content_html || "",
      cover_image: blog.cover_image || "",
      medium_url: blog.medium_url || "",
      iso_date: blog.iso_date || "",
      author: blog.author || "",
      tags: blog.tags ?? [],
      is_premium: blog.is_premium,
      is_published: blog.is_published,
    })
    setEditingBlog(blog)
    setShowAddForm(true)
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading blogs...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowImportForm(true)} variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Medium
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </div>
      </div>

      {/* Import Form */}
      <AnimatePresence>
        {showImportForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Import Medium Content
                  <Button variant="ghost" size="sm" onClick={() => setShowImportForm(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleImport} className="space-y-4">
                  <div>
                    <Label htmlFor="import-title">Title</Label>
                    <Input
                      id="import-title"
                      value={importData.title}
                      onChange={(e) => setImportData({ ...importData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="import-content">HTML Content</Label>
                    <Textarea
                      id="import-content"
                      value={importData.htmlContent}
                      onChange={(e) => setImportData({ ...importData, htmlContent: e.target.value })}
                      rows={10}
                      placeholder="Paste your Medium export HTML content here..."
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="medium-url">Medium URL</Label>
                      <Input
                        id="medium-url"
                        value={importData.medium_url}
                        onChange={(e) => setImportData({ ...importData, medium_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cover-image">Cover Image URL</Label>
                      <Input
                        id="cover-image"
                        value={importData.cover_image}
                        onChange={(e) => setImportData({ ...importData, cover_image: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="import-excerpt">Excerpt</Label>
                    <Textarea
                      id="import-excerpt"
                      value={importData.excerpt}
                      onChange={(e) => setImportData({ ...importData, excerpt: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="overwrite"
                      checked={importData.overwrite}
                      onCheckedChange={(checked) => setImportData({ ...importData, overwrite: checked })}
                    />
                    <Label htmlFor="overwrite">Overwrite existing blog if found</Label>
                  </div>
                  <Button type="submit">Import Blog</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {editingBlog ? "Edit Blog" : "Add New Blog"}
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="medium-url">Medium URL</Label>
                      <Input
                        id="medium-url"
                        value={formData.medium_url}
                        onChange={(e) => setFormData({ ...formData, medium_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cover-image">Cover Image URL</Label>
                      <Input
                        id="cover-image"
                        value={formData.cover_image}
                        onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="content">Content HTML</Label>
                    <Textarea
                      id="content"
                      value={formData.content_html}
                      onChange={(e) => setFormData({ ...formData, content_html: e.target.value })}
                      rows={8}
                    />
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="premium"
                        checked={formData.is_premium}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_premium: checked })}
                      />
                      <Label htmlFor="premium">Premium Content</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.is_published}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  </div>

                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    {editingBlog ? "Update Blog" : "Create Blog"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog List */}
      <div className="grid gap-4">
        {blogs.map((blog) => (
          <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} layout>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{blog.title}</h3>
                      {blog.is_premium && <Badge variant="secondary">Premium</Badge>}
                      {!blog.is_published && <Badge variant="destructive">Draft</Badge>}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{blog.excerpt}</p>
                    <div className="text-xs text-muted-foreground">
                      {blog.author && <span>By {blog.author} • </span>}
                      <span>Created: {new Date(blog.created_at).toLocaleDateString()}</span>
                      {blog.updated_at !== blog.created_at && (
                        <span> • Updated: {new Date(blog.updated_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(blog)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(blog.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {blogs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No blogs found. Create your first blog or import from Medium.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}