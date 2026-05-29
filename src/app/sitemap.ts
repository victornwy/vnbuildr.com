import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vnbuildr.com",
      lastModified: new Date("2026-05-29"),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "en": "https://vnbuildr.com",
          "zh-Hans": "https://vnbuildr.com/zh",
          "x-default": "https://vnbuildr.com",
        },
      },
    },
    {
      url: "https://vnbuildr.com/zh",
      lastModified: new Date("2026-05-29"),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "en": "https://vnbuildr.com",
          "zh-Hans": "https://vnbuildr.com/zh",
          "x-default": "https://vnbuildr.com",
        },
      },
    },
    {
      url: "https://vnbuildr.com/portfolio",
      lastModified: new Date("2026-05-29"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
