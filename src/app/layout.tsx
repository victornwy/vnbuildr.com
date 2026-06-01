import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "vnbuildr — Custom Website & Landing Page Design | Malaysia",
  description:
    "Freelance web designer in Kuala Lumpur. Custom landing pages and business websites for Malaysian SMEs — from RM1,299, hand-coded, mobile-first, delivered in as little as 2 working days.",
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
  ],
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com",
  },
  openGraph: {
    title: "vnbuildr — Custom Website & Landing Page Design | Malaysia",
    description:
      "Freelance web designer in Kuala Lumpur. Custom landing pages and business websites for Malaysian SMEs — from RM1,299, hand-coded, mobile-first, delivered in as little as 2 working days.",
    url: "https://vnbuildr.com",
    siteName: "vnbuildr",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "vnbuildr — Custom websites & landing pages for small businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "vnbuildr — Custom Website & Landing Page Design | Malaysia",
    description:
      "Freelance web designer in Kuala Lumpur. Custom landing pages and business websites for Malaysian SMEs — from RM1,299, hand-coded, mobile-first, delivered in as little as 2 working days.",
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
  "description": "Freelance web designer in Kuala Lumpur specialising in custom landing pages and business websites for Malaysian SMEs. Packages from RM1,299, delivered in 2–15 working days.",
  "priceRange": "RM1,299 – RM3,999+",
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
          "name": "Starter Landing Page",
          "description": "Single-page landing page for Malaysian businesses. Hand-coded, mobile-first. RM1,299, delivered in 2–3 working days."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Website",
          "description": "5-page business website for Malaysian SMEs. Hand-coded, mobile-first. RM2,899, delivered in 3–7 working days."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pro Website",
          "description": "10-page professional website for established Malaysian businesses. RM3,799, delivered in 4–8 working days."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Website",
          "description": "Fully custom websites with 10–25 pages for Malaysian businesses. From RM3,999, delivered in 8–15 working days."
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
