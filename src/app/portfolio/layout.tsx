import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio — vnbuildr | Landing Page Design Malaysia",
  description:
    "Landing pages hand-coded for startups and SMEs in Malaysia. Browse real client work — clean, fast, mobile-first pages built by vnbuildr.",
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com/portfolio",
  },
  robots: {
    index: true,
    follow: false,
    googleBot: {
      index: true,
      follow: false,
    },
  },
  openGraph: {
    title: "Portfolio — vnbuildr",
    description:
      "Selected works by vnbuildr. Hand-coded landing pages and websites built for modern brands.",
    url: "https://vnbuildr.com/portfolio",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vnbuildr.com" },
    { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://vnbuildr.com/portfolio" },
  ],
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
