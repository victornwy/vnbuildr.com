import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { FooterSection } from "@/components/ui/footer-section"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

type Props = { params: Promise<{ slug: string }> }

function stripBrand(title: string) {
  return title.replace(/\s*\|\s*vnbuildr\s*$/i, "")
}

function formatDate(iso: string) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-MY", { year: "numeric", month: "long", day: "numeric" })
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `https://vnbuildr.com/blog/${post.slug}`

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    metadataBase: new URL("https://vnbuildr.com"),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "vnbuildr",
      type: "article",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: stripBrand(post.title) }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.jpg"],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const url = `https://vnbuildr.com/blog/${post.slug}`
  const headline = stripBrand(post.title)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": headline,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": { "@type": "Person", "name": post.author },
    "publisher": { "@type": "Organization", "name": "vnbuildr", "url": "https://vnbuildr.com" },
    "mainEntityOfPage": url,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vnbuildr.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://vnbuildr.com/blog" },
      { "@type": "ListItem", "position": 3, "name": headline, "item": url },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
          <Link href="/" className="font-serif text-[22px] tracking-tight">
            <span className="text-[var(--color-blue)] font-bold">vn</span><em>buildr</em>
          </Link>
          <Link
            href="/blog"
            className="hidden sm:flex text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors items-center gap-1.5"
          >
            <ChevronLeft /> Back to blog
          </Link>
          <WhatsAppLink
            href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20website"
            location="nav_blog_post"
            className="whatsapp-glow text-sm font-medium bg-[#25D366] text-white px-[18px] py-[9px] rounded-full hover:opacity-85 transition-opacity"
          >
            Get started
          </WhatsAppLink>
        </div>
      </nav>

      <main className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
        <p className="text-[12px] text-[var(--color-ink-muted)] mb-8">{formatDate(post.date)}</p>
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>

      <FooterSection />
    </>
  )
}
