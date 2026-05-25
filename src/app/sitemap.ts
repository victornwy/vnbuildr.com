import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vnbuildr.com",
      lastModified: new Date("2026-05-26"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://vnbuildr.com/portfolio",
      lastModified: new Date("2026-05-26"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
