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
    "Freelance web designer in Kuala Lumpur. Landing pages, business websites, and website automation for Malaysian SMEs — from RM1,299.",
  keywords: [
    "landing page design Malaysia",
    "web designer KL",
    "freelance web designer Malaysia",
    "affordable website design Malaysia",
    "small business website Malaysia",
    "custom website design Malaysia for small business",
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
      "Landing pages, business websites, and website automation for Malaysian SMEs — from RM1,299.",
    url: "https://vnbuildr.com",
    siteName: "vnbuildr",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "vnbuildr — Custom websites & landing pages for small businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "vnbuildr — Custom Website & Landing Page Design | Malaysia",
    description:
      "Landing pages, business websites, and website automation for Malaysian SMEs — from RM1,299.",
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
  "description": "Freelance web designer in Kuala Lumpur specialising in landing pages, business websites, and website automation for Malaysian SMEs. From RM1,299.",
  "priceRange": "RM1,299 – RM5,999+",
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
          "name": "Landing Page",
          "description": "A focused, mobile-friendly page for a business or offer. RM1,299, delivered in 5–7 working days."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Website",
          "description": "Up to five core pages designed to build trust and generate enquiries. RM3,499, delivered in 2–3 weeks."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website and Automation",
          "description": "A business website with one defined lead-capture and follow-up workflow. From RM5,999, delivered in 3–4 weeks."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Redesign Review",
          "description": "A free review for businesses that want to understand whether their existing website needs improvement."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-Commerce and Custom Website",
          "description": "Custom-scoped websites for online stores, bookings, memberships, multilingual content, and complex integrations."
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
