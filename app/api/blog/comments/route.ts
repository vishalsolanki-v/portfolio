import { NextResponse } from "next/server"
import { getJSON, setJSON } from "@/lib/redis"

type CommentNode = {
  id: string
  parentId?: string | null
  email: string
  content: string
  createdAt: string
  children?: CommentNode[]
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function insertComment(tree: CommentNode[], node: CommentNode) {
  if (!node.parentId) return [node, ...tree]
  const stack = [...tree]
  while (stack.length) {
    const cur = stack.pop()!
    if (cur.id === node.parentId) {
      cur.children = cur.children || []
      cur.children.unshift(node)
      return tree
    }
    if (cur.children) stack.push(...cur.children)
  }
  return [node, ...tree]
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  const comments = await getJSON<CommentNode[]>(`blog:comments:${id}`, [])
  return NextResponse.json({ comments })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, parentId, email, content } = body || {}
    if (!id || !email || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }
    const node: CommentNode = {
      id: uid(),
      parentId: parentId || null,
      email: String(email).trim(),
      content: String(content).trim(),
      createdAt: new Date().toISOString(),
      children: [],
    }
    const key = `blog:comments:${id}`
    const tree = await getJSON<CommentNode[]>(key, [])
    const updated = insertComment(tree, node)
    await setJSON(key, updated)
    return NextResponse.json({ ok: true, comment: node })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}