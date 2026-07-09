import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio — vnbuildr | Landing Page Design Malaysia",
  description:
    "Landing pages hand-coded for startups and SMEs in Malaysia. Browse real client work — clean, fast, mobile-first pages built by vnbuildr.",
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com/portfolio",
  },
  openGraph: {
    title: "Portfolio — vnbuildr",
    description:
      "Selected works by vnbuildr. Hand-coded landing pages and websites built for modern brands.",
    url: "https://vnbuildr.com/portfolio",
  },
}

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "vnbuildr Portfolio — Selected Works",
  "description": "Hand-coded landing pages built for startups and SMEs in Malaysia.",
  "url": "https://vnbuildr.com/portfolio",
  "numberOfItems": 9,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "CarGo Garage — Automotive Workshop Landing Page" },
    { "@type": "ListItem", "position": 2, "name": "AN Account — Consulting Landing Page" },
    { "@type": "ListItem", "position": 3, "name": "Everbest Link — Engineering Services Landing Page" },
    { "@type": "ListItem", "position": 4, "name": "TopSpace Limited — Industrial Shelving Landing Page" },
    { "@type": "ListItem", "position": 5, "name": "Meridian Securities Limited — Finance Advisory Landing Page" },
    { "@type": "ListItem", "position": 6, "name": "NovaDax Limited — Crypto Exchange Landing Page" },
    { "@type": "ListItem", "position": 7, "name": "Ember & Oak Cafe — F&B Reservation Landing Page" },
    { "@type": "ListItem", "position": 8, "name": "Lumora — Digital Products Marketplace Landing Page" },
    { "@type": "ListItem", "position": 9, "name": "Ryan Lim — Real Estate Agent Personal Brand Site" },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
