import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website Design Portfolio | vnbuildr",
  description:
    "Explore landing pages, business websites, and online stores created by vnbuildr for businesses locally and worldwide.",
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com/portfolio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Portfolio — vnbuildr",
    description:
      "Selected landing pages, business websites, and online stores created by vnbuildr.",
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
