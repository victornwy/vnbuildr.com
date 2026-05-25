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
  title: "vnbuildr — Custom Landing Page Design & Web Development | Malaysia",
  description:
    "High-converting, lightning-fast landing pages engineered for startups, SMEs and scaling brands. Hand-coded in Malaysia. Delivered in 7 days.",
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com",
  },
  openGraph: {
    title: "vnbuildr — Custom Landing Page Design & Web Development | Malaysia",
    description:
      "High-converting, lightning-fast landing pages engineered for startups, SMEs and scaling brands. Hand-coded in Malaysia. Delivered in 7 days.",
    url: "https://vnbuildr.com",
    siteName: "vnbuildr",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "vnbuildr — Custom Landing Page Design & Web Development",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vnbuildr — Custom Landing Page Design & Web Development | Malaysia",
    description:
      "High-converting, lightning-fast landing pages engineered for startups, SMEs and scaling brands. Hand-coded in Malaysia. Delivered in 7 days.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "name": "vnbuildr",
  "url": "https://vnbuildr.com",
  "telephone": "+60199195314",
  "email": "hello@vnbuildr.com",
  "description": "Custom landing page design and web development services for startups, SMEs and scaling brands in Malaysia.",
  "priceRange": "$$",
  "currenciesAccepted": "MYR, USD",
  "areaServed": [
    { "@type": "Country", "name": "Malaysia" },
    { "@type": "AdministrativeArea", "name": "Southeast Asia" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Design Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Landing Page Design",
          "description": "High-converting, hand-coded landing pages built from scratch for startups and SMEs."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development",
          "description": "Fast, mobile-first web development delivered in 7 days."
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
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
