import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing — vnbuildr | Funnel, Redesign & Website Packages Malaysia",
  description:
    "Full pricing for vnbuildr's services — Funnel Design from RM2,499, Website Redesign & Enhancement from RM1,499, and Build From Scratch packages (Landing Page, Business Website, E-Commerce) from RM999 — plus what's included and optional maintenance plans.",
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com/pricing",
  },
  openGraph: {
    title: "Pricing — vnbuildr",
    description:
      "Full pricing for vnbuildr's Funnel Design, Website Redesign & Enhancement, and Build From Scratch packages — Landing Page, Business Website, and E-Commerce.",
    url: "https://vnbuildr.com/pricing",
    siteName: "vnbuildr",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "vnbuildr — Pricing for funnel design, website redesigns, and custom-built websites" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — vnbuildr",
    description:
      "Full pricing for vnbuildr's Funnel Design, Website Redesign & Enhancement, and Build From Scratch packages.",
    images: ["/og-image.jpg"],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vnbuildr.com" },
    { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://vnbuildr.com/pricing" },
  ],
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
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
