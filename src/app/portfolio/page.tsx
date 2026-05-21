"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    name: "AN Account",
    category: "Consulting",
    description:
      "High-converting landing page for a digital banking platform, built around trust signals and lead generation.",
    tags: ["React", "Landing Page"],
    macbook: "/portfolio-mockups/an-accounts-macbook.png",
    iphone: "/portfolio-mockups/an-accounts-iphone.png",
  },
  {
    id: 2,
    name: "Everbest",
    category: "Engineering",
    description:
      "Clean product showcase page engineered for brand elevation and maximum sales conversion.",
    tags: ["Static HTML", "E-commerce"],
    macbook: "/portfolio-mockups/everbest-macbook.png",
    iphone: "/portfolio-mockups/everbest-iphone.png",
  },
  {
    id: 3,
    name: "TopSpace",
    category: "Industrial",
    description:
      "Modern SaaS landing page with an animated hero section and a conversion-focused content hierarchy.",
    tags: ["React", "SaaS"],
    macbook: "/portfolio-mockups/top-space-macbook.png",
    iphone: "/portfolio-mockups/topspace-iphone.png",
  },
  {
    id: 4,
    name: "Meridian",
    category: "Consulting",
    description:
      "Premium consulting firm website built for credibility, with structured copy and direct CTAs.",
    tags: ["React", "Consulting"],
    macbook: "/portfolio-mockups/meridian-macbook.png",
    iphone: "/portfolio-mockups/meridian-iphone.png",
  },
  {
    id: 5,
    name: "NovaDax",
    category: "Finance",
    description:
      "Crypto exchange landing page designed for aggressive user acquisition with trust-building elements.",
    tags: ["Static HTML", "Finance"],
    macbook: "/portfolio-mockups/novadax-macbook.png",
    iphone: "/portfolio-mockups/novadax-iphone.png",
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Portfolio page ───────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "55%" : "-55%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "-55%" : "55%", opacity: 0 }),
}

export default function PortfolioPage() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const [dragStart, setDragStart] = useState<number | null>(null)

  const navigate = useCallback((to: number, dir: number) => {
    setDirection(dir)
    setCurrent(to)
  }, [])

  const next = useCallback(() => navigate((current + 1) % projects.length, 1), [current, navigate])
  const prev = useCallback(() => navigate((current - 1 + projects.length) % projects.length, -1), [current, navigate])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 4500)
    return () => clearInterval(t)
  }, [paused, next])

  return (
    <>
      {/* ─── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
          <Link
            href="/"
            onClick={e => { e.preventDefault(); window.location.href = "/" }}
            className="font-serif text-[22px] tracking-tight"
          >
            <span className="text-[var(--color-blue)] font-bold">vn</span><em>buildr</em>
          </Link>

          <Link
            href="/"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft /> Back to home
          </Link>

          <a
            href="https://wa.me/601112173995?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-glow text-sm font-medium bg-[#25D366] text-white px-[18px] py-[9px] rounded-full hover:opacity-85 transition-opacity"
          >
            Get in touch
          </a>
        </div>
      </nav>

      <main>
        {/* ─── Hero ────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 text-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
              Selected works
            </p>
            <h1 className="font-serif text-[clamp(36px,5vw,66px)] font-normal tracking-tight leading-[1.08] mb-5">
              Built to convert.
              <br />
              <span className="text-[var(--color-blue)]">Designed to impress.</span>
            </h1>
            <p className="text-[17px] text-[var(--color-ink-muted)] max-w-[460px] mx-auto leading-[1.65]">
              Every project is hand-coded from scratch — no templates, no bloat.
              Just clean, fast, converting pages.
            </p>
          </motion.div>
        </section>

        {/* ─── Carousel ────────────────────────────────────────────────────── */}
        <section className="py-16 px-6 bg-[var(--color-surface)]">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative neo-card bg-white p-6 md:p-10 overflow-hidden"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* Prev arrow */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 neo-card bg-white flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft />
                </button>

                {/* Next arrow */}
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 neo-card bg-white flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight />
                </button>

                {/* Slide */}
                <div
                  className="overflow-hidden mx-8 cursor-grab active:cursor-grabbing"
                  onPointerDown={e => { setPaused(true); setDragStart(e.clientX) }}
                  onPointerUp={e => {
                    if (dragStart === null) return
                    const delta = dragStart - e.clientX
                    if (delta > 60) next()
                    else if (delta < -60) prev()
                    setDragStart(null)
                    setPaused(false)
                  }}
                  onPointerLeave={() => setDragStart(null)}
                >
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={current}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "tween", duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
                        opacity: { duration: 0.18 },
                      }}
                      className="flex items-end justify-center gap-6 md:gap-10 py-4 px-4"
                      style={{ willChange: "transform, opacity" }}
                    >
                      <div className="w-[55%] max-w-[460px]">
                        <img
                          src={projects[current].macbook}
                          alt={`${projects[current].name} desktop`}
                          className="w-full h-auto object-contain select-none"
                          draggable={false}
                        />
                      </div>
                      <div className="hidden sm:block w-[13%] max-w-[110px] mb-4">
                        <img
                          src={projects[current].iphone}
                          alt={`${projects[current].name} mobile`}
                          className="w-full h-auto object-contain select-none"
                          draggable={false}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Project info */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="text-center mt-8"
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <h2 className="font-serif text-[26px] font-normal tracking-tight">
                        {projects[current].name}
                      </h2>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase border-2 border-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] px-2.5 py-0.5 rounded">
                        {projects[current].category}
                      </span>
                    </div>
                    <p className="text-[14px] text-[var(--color-ink-muted)] max-w-[460px] mx-auto mb-4 leading-[1.65]">
                      {projects[current].description}
                    </p>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {projects[current].tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 rounded text-[var(--color-ink-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-2.5 mt-8">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`transition-all duration-300 rounded-full border-2 border-[var(--color-ink)] ${
                        i === current
                          ? "w-6 h-2.5 bg-[var(--color-ink)]"
                          : "w-2.5 h-2.5 bg-transparent hover:bg-[var(--color-ink)]/20"
                      }`}
                      aria-label={`Go to ${projects[i].name}`}
                    />
                  ))}
                </div>

                {/* Auto-play progress bar */}
                {!paused && (
                  <motion.div
                    key={`${current}-bar`}
                    className="absolute bottom-0 left-0 h-[3px] bg-[var(--color-ink)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.5, ease: "linear" }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ─────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
              Want one of these?
            </p>
            <h2 className="font-serif text-[clamp(28px,4vw,50px)] font-normal tracking-tight mb-6">
              Let&apos;s build your page next.
            </h2>
            <a
              href="https://wa.me/601112173995?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-glow inline-flex items-center gap-2 bg-[#25D366] text-white text-[15px] font-medium px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </section>
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[var(--color-ink)] border-t border-white/[0.08] py-8 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-3 items-center gap-4">
          <Link href="/" className="font-serif text-[18px] text-white/90">
            <span className="text-[var(--color-blue)] font-bold">vn</span><em>buildr</em>
          </Link>
          <p className="text-[13px] text-white/30 text-center">© 2026 vnbuildr. All rights reserved.</p>
          <div className="flex gap-6 justify-end">
            <Link href="/" className="text-[13px] text-white/35 hover:text-white/75 transition-colors">
              Home
            </Link>
            <a
              href="https://wa.me/601112173995"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-white/35 hover:text-white/75 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
