import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing — vnbuildr | Website & Landing Page Packages Malaysia",
  description:
    "Full pricing breakdown for vnbuildr's Build From Scratch packages — Landing Page, Business Website, and E-Commerce — plus what's included and optional maintenance plans.",
  metadataBase: new URL("https://vnbuildr.com"),
  alternates: {
    canonical: "https://vnbuildr.com/pricing",
  },
  openGraph: {
    title: "Pricing — vnbuildr",
    description:
      "Full pricing breakdown for vnbuildr's website packages — Landing Page, Business Website, and E-Commerce — plus what's included and optional maintenance plans.",
    url: "https://vnbuildr.com/pricing",
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
