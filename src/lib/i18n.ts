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
    label: "Custom Landing Page Design & Web Development",
    line1: "Your landing page,",
    rotatePrefix: "ready in ", rotateSuffix: "",
    rotatingWords: ["a week.", "no time.", "fast."],
    subheadline: "A website that turns visitors into enquiries — so you stop chasing leads and start growing on autopilot.",
    primaryCta: "Chat on WhatsApp", secondaryCta: "See how it works",
    trustLine: "Reply within 24 hours · No commitment required",
    reactMode: "React mode — fluid animations, premium motion components",
    staticMode: "Static HTML mode — no animations, instant load, zero dependencies",
  },
  how: {
    label: "The process",
    heading: "From brief to live\nin three steps",
    subheading: "No handoffs. No project managers. Just direct, focused work with someone who ships.",
    steps: [
      { num: "01", title: "You share the brief", body: "Message me on WhatsApp or email. Tell me about your product, audience, and goal. That's all I need to get started.", time: "Day 1" },
      { num: "02", title: "I design & build", body: "I write the copy, design the layout, and code a fast, mobile-first page — all tailored to your brand.", time: "Day 2 onward" },
      { num: "03", title: "You review & launch", body: "You get revision rounds for tweaks. Once you're happy, it's ready to go live — handed off clean and ready to deploy.", time: "From 1 week" },
    ],
  },
  features: {
    label: "Services",
    heading: "What I can build\nfor you",
    subheading: "Three ways to work together, depending on where you're starting from.",
    cards: [
      { title: "Build From Scratch", body: "A professional online presence that brings in enquiries from day one. I handle everything — design, writing, setup — so you're not stitching it together yourself or waiting months to launch.", bestFor: "Best for: new businesses, no site yet" },
      { title: "Website Redesign & Enhancement", body: "The enquiries your traffic should already be bringing you. If your site looks outdated, loads slow, or visitors leave without contacting you, I fix what's costing you leads — without tearing down what you've already built.", bestFor: "Best for: rebrands, slow sites, low enquiries" },
      { title: "Funnel Design", body: "A steady stream of enquiries instead of one-off visits. I build the path from ad click to paying customer — offer page, signup step, thank-you page — so leads keep coming in without you chasing them.", bestFor: "Best for: businesses running ads" },
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
    subheading: "Fill in your details below and I'll respond within 24 hours.",
  },
  about: {
    label: "About", heading: "The person behind the code",
    bio1: "I'm V — a self-taught developer based in Kuala Lumpur. I started vnbuildr because I kept seeing the same frustration: businesses were either paying agency prices for slow, bloated work, or settling for DIY builders that looked cheap and converted poorly.",
    bio2: "vnbuildr is the alternative. Clean, hand-coded landing pages built fast — at a fraction of the cost. Every project gets my direct attention from brief to launch. No junior handoffs, no account managers, no markup.",
    location: "Kuala Lumpur, Malaysia", role: "Founder, vnbuildr",
    tags: ["Self-taught", "Based in KL", "Works globally", "Direct communication", "No agency markup"],
  },
  footer: {
    copyright: "© 2026 vnbuildr. All rights reserved.",
    links: { whatsapp: "WhatsApp", email: "Email", how: "How it works", portfolio: "Portfolio" },
  },
}
