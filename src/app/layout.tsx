import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "vnbuildr — Custom Website & Landing Page Design | Malaysia",
  description:
    "Freelance web designer in Kuala Lumpur. Funnel design, website redesigns, and custom-built websites for Malaysian SMEs — from RM999, mobile-first, delivered in as little as 1 week.",
  keywords: [
    "landing page design Malaysia",
    "web designer KL",
    "freelance web designer Malaysia",
    "affordable website design Malaysia",
    "small business website Malaysia",
    "website design price Malaysia",
    "custom landing page Malaysia",
    "web development Kuala Lumpur",
    "website designer Kuala Lumpur",
    "SME website Malaysia",
    "landing page cost Malaysia",
    "business website Malaysia",
    "sales funnel design Malaysia",
    "funnel design Malaysia",
    "website redesign Malaysia",
    "website revamp Malaysia",
    "ecommerce website Malaysia",
    "website designer Malaysia",
  ],
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com",
  },
  openGraph: {
    title: "vnbuildr — Custom Website & Landing Page Design | Malaysia",
    description:
      "Freelance web designer in Kuala Lumpur. Funnel design, website redesigns, and custom-built websites for Malaysian SMEs — from RM999, mobile-first, delivered in as little as 1 week.",
    url: "https://vnbuildr.com",
    siteName: "vnbuildr",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "vnbuildr — Custom websites & landing pages for small businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "vnbuildr — Custom Website & Landing Page Design | Malaysia",
    description:
      "Freelance web designer in Kuala Lumpur. Funnel design, website redesigns, and custom-built websites for Malaysian SMEs — from RM999, mobile-first, delivered in as little as 1 week.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "name": "vnbuildr",
  "url": "https://vnbuildr.com",
  "telephone": "+60199195314",
  "email": "hello@vnbuildr.com",
  "description": "Freelance web designer in Kuala Lumpur specialising in funnel design, website redesigns, and custom-built websites for Malaysian SMEs. From RM999, delivered in 1–12 weeks depending on scope.",
  "priceRange": "RM999 – RM9,999+",
  "currenciesAccepted": "MYR, USD",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kuala Lumpur",
    "addressCountry": "MY"
  },
  "sameAs": [
    "https://www.instagram.com/vnbuildr/",
    "https://www.facebook.com/profile.php?id=61590036136359",
    "https://xhslink.com/m/3wQseBxD3r1"
  ],
  "areaServed": [
    { "@type": "Country", "name": "Malaysia" },
    { "@type": "AdministrativeArea", "name": "Southeast Asia" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Website Design Services Malaysia",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Funnel Design",
          "description": "Multi-step sales funnel — offer page, lead capture, thank-you/upsell — for Malaysian businesses. From RM2,499."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Redesign & Enhancement",
          "description": "Redesign and enhancement for an existing website — new design, faster load times, UX fixes. From RM1,499."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Landing Page (Build From Scratch)",
          "description": "Single-page landing page for Malaysian businesses. Mobile-first. RM999, delivered in 1–2 weeks."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Website (Build From Scratch)",
          "description": "5–10+ page business website for Malaysian SMEs. Mobile-first. From RM2,899, delivered in 2–5 weeks."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-Commerce Website (Build From Scratch)",
          "description": "Full online store for Malaysian businesses. RM9,999, delivered in 4–8 weeks."
        }
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-MY" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
