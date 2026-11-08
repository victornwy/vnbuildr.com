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
  title: "Custom Websites, Landing Pages & Automation | vnbuildr",
  description:
    "Clear, professional websites that help small businesses build trust and generate enquiries. Based in Kuala Lumpur, working locally and worldwide.",
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
    "website automation Malaysia",
    "small business web designer",
    "custom business website",
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
    title: "Custom Websites, Landing Pages & Automation | vnbuildr",
    description:
      "Clear, professional websites that help small businesses build trust and generate enquiries — locally and worldwide.",
    url: "https://vnbuildr.com",
    siteName: "vnbuildr",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "vnbuildr — Custom websites & landing pages for small businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Websites, Landing Pages & Automation | vnbuildr",
    description:
      "Clear, professional websites that help small businesses build trust and generate enquiries — locally and worldwide.",
    images: ["/og-image.jpg"],
  },
};

const businessId = "https://vnbuildr.com/#business"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": businessId,
      "name": "vnbuildr",
      "url": "https://vnbuildr.com",
      "logo": "https://vnbuildr.com/icon.png",
      "image": "https://vnbuildr.com/og-image.jpg",
      "telephone": "+60199195314",
      "email": "hello@vnbuildr.com",
      "description": "Custom landing pages, business websites, and website automation for small businesses in Malaysia and worldwide.",
      "priceRange": "RM1,299 – RM5,999+",
      "currenciesAccepted": "MYR, USD",
      "knowsLanguage": ["English"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kuala Lumpur",
        "addressCountry": "MY"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+60199195314",
        "email": "hello@vnbuildr.com",
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://www.instagram.com/vnbuildr/",
        "https://www.facebook.com/profile.php?id=61590036136359",
        "https://xhslink.com/m/3wQseBxD3r1"
      ],
      "areaServed": [
        { "@type": "Country", "name": "Malaysia" },
        { "@type": "Place", "name": "Worldwide" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Website Design Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "price": "1299",
            "priceCurrency": "MYR",
            "itemOffered": {
              "@type": "Service",
              "name": "Landing Page",
              "description": "One focused, mobile-friendly page designed to generate enquiries, delivered in 5–7 working days."
            }
          },
          {
            "@type": "Offer",
            "price": "3499",
            "priceCurrency": "MYR",
            "itemOffered": {
              "@type": "Service",
              "name": "Business Website",
              "description": "A complete business website with up to five core pages, delivered in 2–3 weeks."
            }
          },
          {
            "@type": "Offer",
            "price": "5999",
            "priceCurrency": "MYR",
            "itemOffered": {
              "@type": "Service",
              "name": "Website and Automation",
              "description": "A business website with one enquiry capture and follow-up workflow, delivered in 3–4 weeks."
            }
          },
          {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "MYR",
            "itemOffered": {
              "@type": "Service",
              "name": "Five-Point Website Review",
              "description": "Five practical recommendations to improve an existing website, delivered within two working days."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-Commerce and Custom Website",
              "description": "Custom-scoped websites for online stores, booking systems, multilingual content, and complex workflows."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://vnbuildr.com/#website",
      "url": "https://vnbuildr.com",
      "name": "vnbuildr",
      "description": "Custom websites, landing pages, and website automation for small businesses.",
      "inLanguage": "en",
      "publisher": { "@id": businessId }
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
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
