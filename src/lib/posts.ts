import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  keywords: string[]
  author: string
}

export interface Post extends PostMeta {
  html: string
}

function readFiles(): { slug: string; data: Record<string, unknown>; content: string }[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
      const { data, content } = matter(raw)
      const slug = typeof data.slug === "string" ? data.slug : file.replace(/\.md$/, "")
      return { slug, data, content }
    })
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    keywords: Array.isArray(data.keywords) ? (data.keywords as string[]) : [],
    author: String(data.author ?? "vnbuildr"),
  }
}

export function getAllPosts(): PostMeta[] {
  return readFiles()
    .map(({ slug, data }) => toMeta(slug, data))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const match = readFiles().find((file) => file.slug === slug)
  if (!match) return null

  return {
    ...toMeta(match.slug, match.data),
    html: marked.parse(match.content, { async: false }) as string,
  }
}
