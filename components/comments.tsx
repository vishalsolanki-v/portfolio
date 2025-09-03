"use client"

import { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import { MessageSquarePlus, Reply } from "lucide-react"

type CommentNode = {
  id: string
  parentId?: string | null
  email: string
  content: string
  createdAt: string
  children?: CommentNode[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function CommentsSection({ postId }: { postId: string }) {
  const { data } = useSWR<{ comments: CommentNode[] }>(`/api/blog/comments?id=${postId}`, fetcher, {
    revalidateOnFocus: false,
  })
  const comments = data?.comments || []
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [parentId, setParentId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const saved = localStorage.getItem("commenter:email")
    if (saved) setEmail(saved)
  }, [])

  async function submit() {
    if (!email || !content) return
    try {
      localStorage.setItem("commenter:email", email)
      await fetch("/api/blog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, parentId, email, content }),
      })
      setContent("")
      setParentId(undefined)
      setModalOpen(false)
      mutate(`/api/blog/comments?id=${postId}`)
    } catch {}
  }

  function openNewComment() {
    setParentId(undefined)
    setModalOpen(true)
  }
  function openReply(id: string) {
    setParentId(id)
    setModalOpen(true)
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={openNewComment}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
      >
        <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
        Add Comment
      </button>

      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <CommentItem key={c.id} node={c} onReply={openReply} depth={0} />
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-background p-4 shadow-lg">
            <h3 className="text-lg font-medium">{parentId ? "Reply" : "Add Comment"}</h3>
            <div className="mt-3 space-y-3">
              <label className="block text-sm">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block text-sm">
                Comment
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  rows={4}
                  placeholder="Share your thoughts…"
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-md border px-3 py-1.5 text-sm"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
                onClick={submit}
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CommentItem({ node, onReply }: { node: CommentNode; onReply: (id: string) => void }) {
  const children = node.children || []
  return (
    <div className="rounded-md border p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {node.email} • {new Date(node.createdAt).toLocaleString()}
        </span>
        <button
          className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline"
          onClick={() => onReply(node.id)}
        >
          <Reply className="h-3 w-3" aria-hidden="true" />
          Reply
        </button>
      </div>
      <p className="mt-2 text-sm">{node.content}</p>
      {children.length > 0 && (
        <div className="mt-3 space-y-3 border-l pl-3">
          {children.map((c) => (
            <CommentItem key={c.id} node={c} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  )
}