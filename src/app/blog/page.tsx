import Link from "next/link"
import type { Metadata } from "next"
import { getAllPosts } from "@/lib/posts"
import { FooterSection } from "@/components/ui/footer-section"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

export const metadata: Metadata = {
  title: "Blog — vnbuildr | Website Design & SEO for Malaysian SMEs",
  description:
    "Practical guides on website design, SEO, speed, and security for small businesses in Malaysia — written by vnbuildr.",
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com/blog",
  },
  openGraph: {
    title: "Blog — vnbuildr",
    description:
      "Practical guides on website design, SEO, speed, and security for small businesses in Malaysia.",
    url: "https://vnbuildr.com/blog",
    siteName: "vnbuildr",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "vnbuildr — Blog" }],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vnbuildr.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://vnbuildr.com/blog" },
  ],
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function formatDate(iso: string) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-MY", { year: "numeric", month: "long", day: "numeric" })
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
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
            href="/"
            className="hidden sm:flex text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors items-center gap-1.5"
          >
            <ChevronLeft /> Back to home
          </Link>
          <WhatsAppLink
            href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20website"
            location="nav_blog"
            className="whatsapp-glow text-sm font-medium bg-[#25D366] text-white px-[18px] py-[9px] rounded-full hover:opacity-85 transition-opacity"
          >
            Get started
          </WhatsAppLink>
        </div>
      </nav>

      <main className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
        <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
          Blog
        </p>
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-normal tracking-tight leading-[1.1] mb-14">
          Website design &amp; SEO guides for Malaysian SMEs
        </h1>

        {posts.length === 0 ? (
          <p className="text-[15px] text-[var(--color-ink-muted)]">No posts yet — check back soon.</p>
        ) : (
          <div className="flex flex-col divide-y divide-[var(--color-border)]">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group py-8 first:pt-0">
                <p className="text-[12px] text-[var(--color-ink-muted)] mb-2">{formatDate(post.date)}</p>
                <h2 className="font-serif text-[22px] md:text-[26px] font-normal tracking-tight mb-2 group-hover:text-[var(--color-blue)] transition-colors">
                  {post.title.replace(/\s*\|\s*vnbuildr\s*$/i, "")}
                </h2>
                <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.7]">{post.description}</p>
              </Link>
            ))}
          </div>
        )}
      </main>

      <FooterSection />
    </>
  )
}
