"use client";

import Link from "next/link";
import { ParticleCanvas } from "@/components/ui/particle-canvas-1";

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link href="/" className="font-serif text-[22px] tracking-tight">
          vn<em>buildr</em>
        </Link>
        <ul className="hidden md:flex items-center gap-8 list-none">
          {(
            [
              ["#how", "How it works"],
              ["#features", "What you get"],
              ["#testimonials", "Results"],
            ] as [string, string][]
          ).map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="text-sm font-medium bg-[var(--color-ink)] text-white px-[18px] py-[9px] rounded-full hover:opacity-85 transition-opacity"
        >
          Book a free call
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden flex flex-col items-center text-center px-6 pt-20 pb-24">
      <ParticleCanvas maxParticles={600} particleSizeMin={2} particleSizeMax={4} speedScale={2} />

      <div className="relative z-10 flex flex-col items-center">
        <span className="inline-flex items-center gap-1.5 bg-[var(--color-tag-bg)] text-[var(--color-ink-muted)] text-[13px] font-medium px-3 py-1 rounded-full mb-7 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#5c9e6e]">
          Taking new clients
        </span>

        <h1 className="font-serif text-[clamp(44px,7vw,80px)] font-normal leading-[1.05] tracking-tight max-w-[820px] mb-6">
          Your landing page,{" "}
          <em className="text-[var(--color-ink-muted)]">ready in days.</em>
        </h1>

        <p className="text-[clamp(16px,2.2vw,19px)] text-[var(--color-ink-muted)] max-w-[540px] mb-10 leading-[1.65]">
          Done-for-you landing pages designed to convert. No bloated agencies, no endless revisions.
          Just a page that works — fast.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[var(--color-ink)] text-white text-[15px] font-medium px-6 py-3 rounded-full hover:opacity-85 hover:-translate-y-px transition-all"
          >
            Book a free call
            <ArrowRight />
          </a>
          <a
            href="#how"
            className="inline-flex items-center text-[15px] font-medium px-6 py-3 rounded-full border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors"
          >
            See how it works
          </a>
        </div>

        <p className="text-[13px] text-[var(--color-ink-muted)]">
          Free 30-min strategy call · No commitment required
        </p>
      </div>
    </section>
  );
}

// ─── Logo strip ───────────────────────────────────────────────────────────────
function Logos() {
  const industries = ["SaaS", "eCommerce", "Agencies", "Freelancers", "Startups"];
  return (
    <div className="py-10 px-6 border-t border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <p className="text-center text-[13px] text-[var(--color-ink-muted)] font-medium mb-6">
        Trusted by founders and teams in
      </p>
      <div className="flex flex-wrap items-center justify-center gap-10">
        {industries.map((name) => (
          <span
            key={name}
            className="text-[15px] font-semibold text-[var(--color-ink-muted)] opacity-55 tracking-tight"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "You share the brief",
      body: "We hop on a free 30-minute call. You tell me about your product, audience, and goal. That's all I need.",
      time: "Day 1",
    },
    {
      num: "02",
      title: "I design & build",
      body: "I write the copy, design the layout, and code a fast, mobile-first page — all tailored to your brand.",
      time: "Days 2–4",
    },
    {
      num: "03",
      title: "You review & launch",
      body: "You get a review round for tweaks. Once you're happy, it's ready to go live — handed off clean and ready to deploy.",
      time: "Day 5–7",
    },
  ];

  return (
    <section id="how" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            The process
          </p>
          <h2 className="font-serif text-[clamp(32px,4.5vw,50px)] font-normal tracking-tight mb-4">
            From brief to live
            <br />
            in three steps
          </h2>
          <p className="text-[17px] text-[var(--color-ink-muted)] max-w-[440px] mx-auto">
            No handoffs. No project managers. Just direct, focused work with someone who ships.
          </p>
        </div>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
          {steps.map(({ num, title, body, time }) => (
            <div key={num} className="bg-white p-10">
              <div className="w-9 h-9 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[13px] font-semibold text-[var(--color-ink-muted)] mb-5">
                {num}
              </div>
              <h3 className="text-[18px] font-semibold tracking-tight mb-2">{title}</h3>
              <p className="text-[15px] text-[var(--color-ink-muted)] leading-[1.65]">{body}</p>
              <div className="mt-5 text-[12px] font-semibold text-[var(--color-ink-muted)] tracking-widest uppercase flex items-center gap-2">
                <span className="block w-4 h-px bg-current" />
                {time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const cards = [
    {
      icon: "⚡",
      title: "Fast delivery",
      body: "Most projects are done in 5–7 days. No agency timelines, no waiting weeks for a first draft.",
    },
    {
      icon: "✍️",
      title: "Copywriting included",
      body: "Conversion-focused copy written from scratch. You don't need to hand over a brief full of buzzwords.",
    },
    {
      icon: "📱",
      title: "Mobile-first, always",
      body: "Every page is built mobile-first and tested across devices. More than half your traffic is on a phone — it shows.",
    },
    {
      icon: "🧹",
      title: "Clean, handoff-ready code",
      body: "Production-ready HTML/CSS you or your developer can maintain and extend. No lock-in.",
    },
    {
      icon: "🎯",
      title: "CRO-informed design",
      body: "Clear CTAs, social proof placement, and a visual hierarchy built around one goal: getting visitors to act.",
    },
    {
      icon: "🔄",
      title: "One revision round",
      body: "A structured feedback round so you can fine-tune the result — without endless back-and-forth.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-14">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            What you get
          </p>
          <h2 className="font-serif text-[clamp(30px,4vw,46px)] font-normal tracking-tight leading-[1.1] mb-4">
            Everything a high-converting
            <br />
            page needs
          </h2>
          <p className="text-[16px] text-[var(--color-ink-muted)] leading-[1.65] max-w-[440px]">
            Not just a pretty design. A page engineered to turn visitors into leads.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 border border-[var(--color-border)] rounded-2xl overflow-hidden">
          {cards.map(({ icon, title, body }, i) => (
            <div
              key={title}
              className={`bg-white p-9 border-[var(--color-border)] ${
                i < cards.length - 1 ? "border-b md:border-b-0" : ""
              } ${i % 3 !== 2 ? "md:border-r" : ""} ${
                i < 3 ? "md:border-b" : ""
              }`}
            >
              <div className="w-[42px] h-[42px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md flex items-center justify-center text-xl mb-5">
                {icon}
              </div>
              <h3 className="text-[16px] font-semibold tracking-tight mb-2">{title}</h3>
              <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.65]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const items = [
    {
      quote:
        "I'd been putting off rebuilding our landing page for months. vnbuildr had a draft to me in 3 days. It looked better than anything we'd built internally and we launched it the same week.",
      name: "James K.",
      role: "Founder, B2B SaaS",
      initials: "JK",
    },
    {
      quote:
        "The copy was the biggest surprise. I didn't have to write anything — it came back already sounding like us, just sharper. Our demo requests went up 40% in the first month.",
      name: "Sarah R.",
      role: "Head of Marketing, eComm brand",
      initials: "SR",
    },
    {
      quote:
        "Other designers gave me 3-week timelines and a $5k quote. vnbuildr delivered in a week, the code was clean, and I could deploy it myself. Highly recommend.",
      name: "Marcus L.",
      role: "Freelance consultant",
      initials: "ML",
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            Client results
          </p>
          <h2 className="font-serif text-[clamp(30px,4vw,46px)] font-normal tracking-tight">
            What clients say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {items.map(({ quote, name, role, initials }) => (
            <div
              key={name}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-7"
            >
              <div className="text-[#d4a72c] text-[13px] tracking-widest mb-3">★★★★★</div>
              <p className="text-[15px] leading-[1.7] mb-6">{quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[14px] font-semibold text-[var(--color-ink-muted)] shrink-0">
                  {initials}
                </div>
                <div>
                  <div className="text-[14px] font-semibold">{name}</div>
                  <div className="text-[13px] text-[var(--color-ink-muted)]">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-[var(--color-ink)] text-center">
      <div className="max-w-[1100px] mx-auto">
        <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/55 text-[13px] font-medium px-3 py-1 rounded-full mb-7 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#5c9e6e]">
          Currently available
        </span>

        <h2 className="font-serif text-[clamp(36px,5.5vw,64px)] font-normal text-white tracking-tight leading-[1.05] max-w-[720px] mx-auto mb-6">
          Ready to launch{" "}
          <em className="text-white/45">the right page?</em>
        </h2>

        <p className="text-[17px] text-white/55 max-w-[440px] mx-auto mb-10">
          Book a free 30-minute call. We&apos;ll figure out exactly what your page needs — no
          pressure, no pitch.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <a
            href="mailto:hello@vnbuildr.com"
            className="inline-flex items-center gap-2 bg-white text-[var(--color-ink)] text-[15px] font-medium px-6 py-3 rounded-full hover:opacity-85 hover:-translate-y-px transition-all"
          >
            Book a free call
            <ArrowRight />
          </a>
          <a
            href="mailto:hello@vnbuildr.com"
            className="inline-flex items-center text-[15px] font-medium px-6 py-3 rounded-full border border-white/25 text-white/65 hover:border-white/60 hover:text-white transition-all"
          >
            Send me a message
          </a>
        </div>

        <p className="text-[13px] text-white/35">
          Replies within 24 hours · Free strategy call included
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] border-t border-white/[0.08] py-8 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="font-serif text-[18px] text-white/90">
          vn<em>buildr</em>
        </Link>
        <p className="text-[13px] text-white/30">© 2026 vnbuildr. All rights reserved.</p>
        <ul className="flex gap-6 list-none">
          {(
            [
              ["mailto:hello@vnbuildr.com", "Contact"],
              ["#how", "How it works"],
              ["#features", "Services"],
            ] as [string, string][]
          ).map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="text-[13px] text-white/35 hover:text-white/75 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Logos />
        <HowItWorks />
        <Features />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
