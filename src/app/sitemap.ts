import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"

// Update lastModified when a page's content actually changes — don't regenerate on every build.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  return [
    {
      url: "https://vnbuildr.com",
      lastModified: "2026-07-12",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://vnbuildr.com/pricing",
      lastModified: "2026-07-10",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://vnbuildr.com/portfolio",
      lastModified: "2026-07-10",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://vnbuildr.com/blog",
      lastModified: posts[0]?.date || "2026-07-12",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `https://vnbuildr.com/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
