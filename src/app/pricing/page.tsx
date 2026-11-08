"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { track } from "@vercel/analytics"
import { FooterSection } from "@/components/ui/footer-section"

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface ScopePlan {
  name: string; type: string; price: string; blurb: string
  specs: Record<string, string>
  featured: boolean
}

const plans: ScopePlan[] = [
  {
    name: "Landing Page", type: "Starter", price: "RM1,299",
    blurb: "Get online quickly with a clear path to enquire.",
    specs: { "Best for": "One offer, campaign, or new business", Timeline: "5–7 working days", Scope: "1 page", "Revision rounds": "2" },
    featured: false,
  },
  {
    name: "Business Website", type: "Business", price: "RM3,499",
    blurb: "Build trust and give customers a clear path to contact you.",
    specs: { "Best for": "Established SMEs that need trust and enquiries", Timeline: "2–3 weeks", Scope: "Up to 5 core pages", "Revision rounds": "2" },
    featured: true,
  },
  {
    name: "Website + Automation", type: "Growth", price: "RM5,999+",
    blurb: "Capture, organise, and follow up with leads more efficiently.",
    specs: { "Best for": "Businesses that need organised lead follow-up", "Example flow": "Enquiry saved → alert sent → follow-up prepared", Timeline: "3–4 weeks", Scope: "Up to 5 pages + 1 workflow", "Revision rounds": "2" },
    featured: false,
  },
]

const included = [
  { title: "SSL secure connection",  icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><rect x="2.5" y="6.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { title: "Mobile-first design",    icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><rect x="3.5" y="1" width="8" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="7.5" cy="11.5" r="0.75" fill="currentColor"/></svg> },
  { title: "Online inquiry form",    icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><rect x="1" y="3" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M1 4l6.5 5L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title: "WhatsApp support",       icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M1.5 2C1.5 1.7 1.7 1.5 2 1.5h11c.3 0 .5.2.5.5v8c0 .3-.2.5-.5.5H5l-3.5 3.5V2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title: "Google Maps embed",      icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M7.5 1C5 1 3 3 3 5.5 3 9 7.5 14 7.5 14S12 9 12 5.5C12 3 10 1 7.5 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
  { title: "Speed optimisation",     icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M8.5 1L3 8.5h4.5L6.5 14 12 6.5H7.5L8.5 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title: "Google Analytics setup", icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M2.5 12V7M6.5 12V4M10.5 12V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M1 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { title: "Basic SEO setup",        icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
]

const otherServices = [
  {
    name: "Website Redesign", price: "Free 5-point website review", timeline: "Within 2 working days",
    desc: "I’ll review your mobile experience, message clarity, trust signals, enquiry journey, and usability, then recommend whether a redesign is actually needed. No sales call required.",
    waMsg: "Hi, I'd like a free review of my current website", trackLocation: "free_review_pricing", cta: "Get my free review", id: "free-review",
  },
  {
    name: "E-Commerce & Custom", price: "Custom quote", timeline: "Scoped individually",
    desc: "For online stores, bookings, memberships, multilingual websites, or more complex integrations and workflows.",
    waMsg: "Hi, I'd like to discuss an e-commerce or custom website project", trackLocation: "pricing_custom", cta: "Discuss my project", id: undefined,
  },
]

const maintenance = [
  { plan: "Essential", price: "RM99/mo", description: "Updates, backups, and uptime monitoring.", features: ["Routine update checks", "Website backups", "Uptime monitoring"] },
  { plan: "Care", price: "RM199/mo", description: "Essential care plus small monthly content changes.", features: ["Everything in Essential", "30 minutes of minor edits", "Priority email support"], featured: true },
  { plan: "Growth", price: "RM399/mo", description: "Ongoing care for businesses that update their site regularly.", features: ["Everything in Care", "Basic monthly report", "Up to 2 hours of updates"] },
]

function ScopeGrid({ items }: { items: ScopePlan[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-5 mb-5">
      {items.map(plan => (
        <motion.div
          key={plan.name}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 34 } }}
          className="neo-card overflow-hidden flex h-full flex-col"
        >
          <div className={`px-6 py-6 md:min-h-[236px] ${plan.featured ? "bg-[var(--color-blue)]" : "bg-white"}`}>
            {plan.featured ? (
              <span className="inline-flex items-center text-[10px] font-bold tracking-[0.06em] uppercase bg-white/20 text-white px-2.5 py-1 rounded-full mb-3">
                Most Popular
              </span>
            ) : (
              <span className="inline-block h-[22px] mb-3" aria-hidden="true" />
            )}
            <p className={`font-serif text-[22px] font-normal tracking-tight mb-0.5 ${plan.featured ? "text-white" : ""}`}>{plan.name}</p>
            <p className={`text-[10px] font-semibold tracking-[0.05em] uppercase mb-4 ${plan.featured ? "text-white/60" : "text-[var(--color-ink-muted)]"}`}>{plan.type}</p>
            <p className={`font-serif text-[36px] font-normal tracking-tight leading-none mb-2 ${plan.featured ? "text-white" : ""}`}>{plan.price}</p>
            <p className={`text-[13px] ${plan.featured ? "text-white/75" : "text-[var(--color-ink-muted)]"}`}>{plan.blurb}</p>
          </div>
          <div className="px-6 py-4 divide-y divide-[var(--color-border)] bg-[var(--color-surface)] flex-1">
            {Object.entries(plan.specs).map(([label, value]) => (
              <div key={label} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] items-start gap-4 py-2.5 text-[13px]">
                <span className="text-[var(--color-ink-muted)] leading-[1.45]">{label}</span>
                <span className="font-medium text-right text-[var(--color-ink)] leading-[1.45]">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <div className="text-center mb-6">
      {eyebrow ? (
        <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-3">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-[clamp(22px,3vw,36px)] font-normal tracking-tight leading-[1.1]">
        {title}
        <br />
        <span className="text-[var(--color-blue)]">{accent}</span>
      </h2>
    </div>
  )
}

export default function PricingPage() {
  return (
    <>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
          <Link href="/" className="font-serif text-[22px] tracking-tight">
            <span className="text-[var(--color-blue)] font-bold">vn</span><em>buildr</em>
          </Link>
          <Link
            href="/"
            className="hidden sm:flex text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors items-center gap-1.5"
          >
            <ChevronLeft /> Back to home
          </Link>
          <a
            href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20website"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "nav_pricing" })}
            className="whatsapp-glow text-sm font-medium bg-[#25D366] text-white px-[18px] py-[9px] rounded-full hover:opacity-85 transition-opacity"
          >
            Get started
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="pt-12 pb-8 md:pt-16 md:pb-10 px-6 text-center bg-white">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
              Pricing
            </p>
            <h1 className="font-serif text-[clamp(32px,4.5vw,54px)] font-normal tracking-tight leading-[1.1] mb-5">
              Choose what your business
              <br />
              <span className="text-[var(--color-blue)]">needs right now.</span>
            </h1>
          </div>
        </section>

        <section className="pb-16 md:pb-24 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">

            {/* Core packages */}
            <SectionHeading eyebrow="" title="What do you need" accent="your website to do?" />
            <ScopeGrid items={plans} />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
              <a
                href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20not%20sure%20which%20website%20package%20fits%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "package_help_pricing" })}
                className="inline-flex items-center justify-center gap-2 text-[13px] font-medium bg-[var(--color-ink)] text-white px-5 py-2.5 rounded-full"
              >
                Help me choose <ArrowRight />
              </a>
              <a
                href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20ready%20to%20start%20a%20website%20project"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "package_start_pricing" })}
                className="inline-flex items-center justify-center gap-2 text-[13px] font-medium border-2 border-[var(--color-ink)] text-[var(--color-ink)] px-5 py-2 rounded-full"
              >
                Start a project
              </a>
            </div>

            {/* All-plans inclusions */}
            <motion.div
              className="mt-5 px-5 py-4 rounded-lg border border-[var(--color-border)] bg-white"
            >
              <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-ink-muted)] mb-3">Included in every website package</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {included.map(({ title, icon }) => (
                  <div key={title} className="flex items-center gap-1.5">
                    <span className="text-[var(--color-blue)] shrink-0">{icon}</span>
                    <span className="text-[12px] text-[var(--color-ink)]">{title}</span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-[var(--color-ink-muted)] mt-4 pt-3 border-t border-[var(--color-border)]">
                * Domain and hosting are not included. These are separate costs paid to your chosen provider.
              </p>
            </motion.div>

            {/* Website Care Plans */}
            <div className="mt-10 mb-16">
              <SectionHeading eyebrow="After launch" title="Website Care Plans" accent="for ongoing support." />
              <p className="text-[14px] text-[var(--color-ink-muted)] -mt-3 mb-6 max-w-[440px] mx-auto leading-[1.65] text-center">
                Choose how much ongoing help you need. New pages, redesigns, paid tools, and hosting are quoted separately.
              </p>

              <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-[var(--color-border)]">
                  {maintenance.map(({ plan, price, description, features, featured }) => (
                    <div key={plan} className={`flex flex-col p-4 md:p-7 ${featured ? "bg-[var(--color-surface)]" : "bg-white"}`}>
                      <p className="text-[10px] md:text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-ink-muted)] mb-2">{plan}</p>
                      <p className="font-serif text-[26px] md:text-[34px] font-normal tracking-tight leading-none mb-3">{price}</p>
                      <p className="text-[12px] text-[var(--color-ink-muted)] leading-[1.6] mb-5">{description}</p>
                      <ul className="space-y-2 mb-6 flex-1">
                        {features.map(item => (
                          <li key={item} className="flex items-start gap-1.5 text-[11px] md:text-[12px] text-[var(--color-ink-muted)]">
                            <svg className="mt-[2px] shrink-0 text-[var(--color-blue)]" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center mt-6">
                <a
                  href="https://wa.me/60199195314?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20a%20Website%20Care%20Plan"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { location: "website_care_pricing" })}
                  className="inline-flex items-center gap-2 text-[13px] font-medium bg-[var(--color-ink)] text-white px-5 py-2.5 rounded-full"
                >
                  Ask about website care <ArrowRight />
                </a>
              </div>
            </div>

            {/* Other Services */}
            <SectionHeading eyebrow="Other services" title="Already have a site," accent="or need more than a build?" />
            <div className="mb-16 rounded-lg border border-[var(--color-border)] overflow-hidden bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
                {otherServices.map(service => (
                  <motion.div
                    key={service.name}
                    id={service.id}
                    className="p-6 md:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-serif text-[22px] font-normal tracking-tight">{service.name}</span>
                      <span className="text-[12px] text-[var(--color-ink-muted)] italic">{service.timeline}</span>
                    </div>
                    <p className="font-serif text-[24px] font-normal tracking-tight mb-3">{service.price}</p>
                    <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.7] mb-5">
                      {service.desc}
                    </p>
                    <motion.a
                      href={`https://wa.me/60199195314?text=${encodeURIComponent(service.waMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("whatsapp_click", { location: service.trackLocation, package: service.name })}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                      className="inline-flex items-center gap-2 text-[13px] font-medium bg-[var(--color-ink)] text-white px-5 py-2.5 rounded-full whitespace-nowrap"
                    >
                      {service.cta}
                      <ArrowRight />
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <FooterSection />
    </>
  )
}
