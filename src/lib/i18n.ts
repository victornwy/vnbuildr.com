export interface FaqItem { q: string; a: string }

export interface Translations {
  nav: {
    faq: string; contact: string; portfolio: string; pricing: string; blog: string
    getInTouch: string; chat: string
    animation: string
  }
  hero: {
    label: string; line1: string
    rotatePrefix: string; rotateSuffix: string; rotatingWords: string[]
    subheadline: string; primaryCta: string; secondaryCta: string
    trustLine: string; reactMode: string; staticMode: string
  }
  how: {
    label: string; heading: string; subheading: string
    steps: { num: string; title: string; body: string; time: string }[]
  }
  features: {
    label: string; heading: string; subheading: string
    cards: { title: string; body: string; bestFor: string }[]
  }
  testimonials: {
    label: string; heading: string
    items: { quote: string; role: string; initials: string }[]
  }
  faq: {
    label: string; heading: string
    items: FaqItem[]
  }
  cta: { available: string; heading: string; subheading: string }
  about: {
    label: string; heading: string; bio1: string; bio2: string
    location: string; role: string; tags: string[]
  }
  footer: {
    copyright: string
    links: { whatsapp: string; email: string; how: string; portfolio: string }
  }
}

// ─── English ──────────────────────────────────────────────────────────────────
export const translations: Translations = {
  nav: {
    faq: "FAQ", contact: "Contact", portfolio: "View Our Works", pricing: "Pricing", blog: "Blog",
    getInTouch: "Get started", chat: "Chat",
    animation: "Animation",
  },
  hero: {
    label: "Custom websites, landing pages & automation",
    line1: "Turn more visitors",
    rotatePrefix: "into ", rotateSuffix: "",
    rotatingWords: ["enquiries.", "opportunities.", "growth."],
    subheadline: "Clear, professional websites that build trust and make it easier for customers to contact you.",
    primaryCta: "Discuss my website", secondaryCta: "See how it works",
    trustLine: "Tell me about your business · Get a recommendation within 24 hours",
    reactMode: "React mode — fluid animations, premium motion components",
    staticMode: "Static HTML mode — no animations, instant load, zero dependencies",
  },
  how: {
    label: "The process",
    heading: "From brief to live\nin three steps",
    subheading: "A clear process from the first message to launch.",
    steps: [
      { num: "01", title: "Share your business", body: "Tell me what you offer and what the website needs to achieve.", time: "Day 1" },
      { num: "02", title: "I design & build", body: "I handle the website copy, design, and build.", time: "Day 2 onward" },
      { num: "03", title: "Review & launch", body: "You review the finished website before it goes live.", time: "From 1 week" },
    ],
  },
  features: {
    label: "Website Packages",
    heading: "Choose what fits\nyour business today",
    subheading: "Three clear options based on the result you need.",
    cards: [
      { title: "Landing Page", body: "One focused page for your business, service, campaign, or offer—built to turn visitors into enquiries.", bestFor: "Best for: getting online quickly" },
      { title: "Business Website", body: "A complete company website that builds trust and gives customers a clear path to contact you.", bestFor: "Best for: established SMEs" },
      { title: "Website + Automation", body: "A business website connected to a simple workflow that captures, organises, and follows up with leads.", bestFor: "Best for: growing businesses" },
    ],
  },
  testimonials: {
    label: "Client results", heading: "What clients say",
    items: [
      { quote: "As a freelance accounting firm, we needed a page that looks professional and gets clients to reach out. vnbuildr delivered exactly that — clean layout, clear messaging, and it was live within the week.", role: "Founder, AN Account", initials: "AA" },
      { quote: "The animated hero was exactly what we had in mind — modern, fast, and it actually explains the product clearly. They structured the whole page around our core value prop without us having to spell it out.", role: "Head of Product, TopSpace", initials: "TS" },
      { quote: "Our firm needed a site that looked premium and communicated authority instantly. vnbuildr nailed it. Sharp copy, clean visual hierarchy, and it was live well within the week.", role: "Managing Partner, Meridian", initials: "M" },
    ],
  },
  faq: {
    label: "FAQ", heading: "Common questions",
    items: [], // FAQ uses the full ReactNode array in page.tsx
  },
  cta: {
    available: "Currently available",
    heading: "Start your project",
    subheading: "Tell me about your business. I'll reply within 24 hours with a recommendation and the next available project date.",
  },
  about: {
    label: "About", heading: "Work directly with me",
    bio1: "I'm V, the founder of vnbuildr in Kuala Lumpur. I work directly with businesses locally and worldwide, from the first conversation through to launch.",
    bio2: "",
    location: "Kuala Lumpur, Malaysia", role: "Founder, vnbuildr",
    tags: ["Based in KL", "Local & worldwide", "Direct communication"],
  },
  footer: {
    copyright: "© 2026 vnbuildr. All rights reserved.",
    links: { whatsapp: "WhatsApp", email: "Email", how: "How it works", portfolio: "Portfolio" },
  },
}
