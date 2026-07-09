"use client"

import Link from "next/link"
import { motion } from "motion/react"
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

const plans = [
  {
    name: "Landing Page", type: "Single-page Website", price: "RM999",
    blurb: "One page, one goal.",
    specs: { Timeline: "1–2 weeks", Pages: "1", "Revision rounds": "3", "Business emails": "1" },
    cta: "Get started", waMsg: "Hi, I'm interested in the Landing Page package", featured: false,
  },
  {
    name: "Business Website", type: "Multi-page Website", price: "From RM2,899",
    blurb: "Multi-page, lead gen & brand authority.",
    specs: { Timeline: "2–5 weeks", Pages: "5–10+", "Revision rounds": "4–5", "Business emails": "2–3" },
    cta: "Get started", waMsg: "Hi, I'm interested in the Business Website package", featured: true,
  },
  {
    name: "E-Commerce", type: "Online Store", price: "RM9,999",
    blurb: "Full online store.",
    specs: { Timeline: "4–8 weeks", Pages: "Custom", "Revision rounds": "6", "Business emails": "3" },
    cta: "Chat with us", waMsg: "Hi, I'm interested in the E-Commerce Website package", featured: false,
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

const maintenance = [
  { plan: "Landing Page",     annual: "RM899",   monthly: "RM75/mo",  waMsg: "Hi, I'd like to add the Landing Page maintenance plan", cta: "Add this plan" },
  { plan: "Business Website", annual: "RM1,399", monthly: "RM117/mo", waMsg: "Hi, I'd like to add the Business Website maintenance plan", featured: true, cta: "Add this plan" },
  { plan: "E-Commerce",       annual: "RM1,799", monthly: "RM150/mo", waMsg: "Hi, I'd like to add the E-Commerce maintenance plan", cta: "Add this plan" },
]

export default function PricingPage() {
  return (
    <>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
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
            className="whatsapp-glow text-sm font-medium bg-[#25D366] text-white px-[18px] py-[9px] rounded-full hover:opacity-85 transition-opacity"
          >
            Get started
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="py-14 md:py-20 px-6 text-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
              Build From Scratch
            </p>
            <h1 className="font-serif text-[clamp(32px,4.5vw,54px)] font-normal tracking-tight leading-[1.1] mb-5">
              Pick your scope.
              <br />
              <span className="text-[var(--color-blue)]">Full pricing, no surprises.</span>
            </h1>
            <p className="text-[16px] text-[var(--color-ink-muted)] max-w-[460px] mx-auto leading-[1.65]">
              Every package below includes what&apos;s listed further down this page. Pick what fits your business, or chat with us if you&apos;re not sure.
            </p>
          </motion.div>
        </section>

        <section className="pb-16 md:pb-24 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">

            {/* Scope cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-5">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 34 } }}
                  className={`neo-card overflow-hidden flex flex-col ${plan.featured ? "md:-translate-y-2" : ""}`}
                >
                  <div className={`px-6 py-6 ${plan.featured ? "bg-[var(--color-blue)]" : "bg-white"}`}>
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
                      <div key={label} className="flex items-center justify-between py-2.5 text-[13px]">
                        <span className="text-[var(--color-ink-muted)]">{label}</span>
                        <span className="font-medium text-[var(--color-ink)]">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 pb-6 pt-4 bg-[var(--color-surface)]">
                    <motion.a
                      href={`https://wa.me/60199195314?text=${encodeURIComponent(plan.waMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                      className={`inline-flex items-center justify-center gap-1.5 w-full text-[13px] font-medium py-3 rounded-full ${
                        plan.featured ? "bg-[var(--color-blue)] text-white" : "bg-[var(--color-ink)] text-white"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Custom — full-width banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="neo-card bg-white"
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 34 } }}
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-6 p-6 md:p-8 items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-[11px] font-bold tracking-[0.06em] uppercase bg-[var(--color-surface)] text-[var(--color-ink-muted)] px-2.5 py-1 rounded-full border border-[var(--color-border)]">Custom / Complex</span>
                    <span className="font-serif text-[26px] font-normal tracking-tight">Custom Quote</span>
                    <span className="text-[12px] text-[var(--color-ink-muted)] italic">Est. 6–12 weeks</span>
                  </div>
                  <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.7] max-w-[560px]">
                    Bespoke builds for complex requirements — membership portals, booking systems, API integrations, and multi-language platforms. Scoped and priced individually based on your needs.
                  </p>
                </div>
                <motion.a
                  href={`https://wa.me/60199195314?text=${encodeURIComponent("Hi, I'd like to discuss a Custom / Complex website")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  className="inline-flex items-center gap-2 text-[14px] font-medium bg-[var(--color-ink)] text-white px-6 py-3 rounded-full whitespace-nowrap shrink-0"
                >
                  Let&apos;s discuss
                  <ArrowRight />
                </motion.a>
              </div>
            </motion.div>

            {/* All-plans inclusions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 px-5 py-4 rounded-lg border border-[var(--color-border)] bg-white"
            >
              <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-ink-muted)] mb-3">Included in all packages</p>
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

            {/* Monthly Maintenance */}
            <div className="mt-10">
              <div className="text-center mb-6">
                <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-3">Optional add-on</p>
                <h2 className="font-serif text-[clamp(22px,3vw,36px)] font-normal tracking-tight leading-[1.1]">
                  Monthly maintenance,
                  <br />
                  <span className="text-[var(--color-blue)]">billed annually.</span>
                </h2>
                <p className="text-[14px] text-[var(--color-ink-muted)] mt-3 max-w-[440px] mx-auto leading-[1.65]">
                  Email hosting, domain renewals, and minor updates — handled for you. Pay once a year, no monthly invoices.
                </p>
              </div>

              <div className="neo-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-[var(--color-border)]">
                  {maintenance.map(({ plan, annual, monthly, waMsg, featured, cta }) => (
                    <div key={plan} className={`flex flex-col p-4 md:p-7 ${featured ? "bg-[var(--color-surface)]" : "bg-white"}`}>
                      <p className="text-[10px] md:text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-ink-muted)] mb-2">{plan}</p>
                      <p className="font-serif text-[26px] md:text-[34px] font-normal tracking-tight leading-none">{annual}</p>
                      <p className="text-[11px] text-[var(--color-ink-muted)] mt-1 mb-5">{monthly}</p>
                      <ul className="space-y-2 mb-6 flex-1">
                        {[
                          "Business email hosting",
                          "Domain renewal mgmt",
                          "Minor updates (2×/mo)",
                          "Uptime monitoring",
                        ].map(item => (
                          <li key={item} className="flex items-start gap-1.5 text-[11px] md:text-[12px] text-[var(--color-ink-muted)]">
                            <svg className="mt-[2px] shrink-0 text-[var(--color-blue)]" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <motion.a
                        href={`https://wa.me/60199195314?text=${encodeURIComponent(waMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 380, damping: 22 }}
                        className="inline-flex items-center justify-center gap-1.5 text-[11px] md:text-[13px] font-medium py-2.5 rounded-full bg-[var(--color-ink)] text-white whitespace-nowrap"
                      >
                        {cta}
                        <ArrowRight />
                      </motion.a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <FooterSection />
    </>
  )
}
