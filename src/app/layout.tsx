import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "vnbuildr — Landing Pages, Ready in Days",
  description:
    "Done-for-you landing pages built fast. No delays, no bloated agencies. Just clean, converting pages delivered in days.",
  metadataBase: new URL("https://vnbuildr.com"),
  openGraph: {
    title: "vnbuildr — Landing Pages, Ready in Days",
    description:
      "Done-for-you landing pages built fast. No delays, no bloated agencies. Just clean, converting pages delivered in days.",
    url: "https://vnbuildr.com",
    siteName: "vnbuildr",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "vnbuildr — Landing Pages, Ready in Days",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vnbuildr — Landing Pages, Ready in Days",
    description:
      "Done-for-you landing pages built fast. No delays, no bloated agencies. Just clean, converting pages delivered in days.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
