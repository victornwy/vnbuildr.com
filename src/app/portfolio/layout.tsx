import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio — vnbuildr",
  description:
    "Selected works by vnbuildr. Hand-coded landing pages and websites built for modern brands.",
  metadataBase: new URL("https://vnbuildr.com"),
  openGraph: {
    title: "Portfolio — vnbuildr",
    description:
      "Selected works by vnbuildr. Hand-coded landing pages and websites built for modern brands.",
    url: "https://vnbuildr.com/portfolio",
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
