import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website Packages & Pricing | vnbuildr",
  description:
    "Compare clear website packages for small businesses: Landing Page RM1,299, Business Website RM3,499, and Website + Automation from RM5,999.",
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com/pricing",
  },
  openGraph: {
    title: "Pricing — vnbuildr",
    description:
      "Compare Landing Page, Business Website, and Website + Automation packages for small businesses.",
    url: "https://vnbuildr.com/pricing",
    siteName: "vnbuildr",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "vnbuildr website packages and pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — vnbuildr",
    description:
      "Clear pricing for Landing Page, Business Website, and Website + Automation packages.",
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
