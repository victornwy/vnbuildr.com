"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    name: "AN Account",
    category: "Corporate B2C",
    description: "Professional landing page for a freelance accounting firm, built around credibility signals and client lead generation.",
    image: "/portfolio-mockups/an-accounts.png",
  },
  {
    id: 2,
    name: "Everbest Link",
    category: "Corporate B2B",
    description: "Product and services showcase for a precision wirecut CNC machining firm, built to generate B2B enquiries.",
    image: "/portfolio-mockups/everbestlink.png",
  },
  {
    id: 3,
    name: "TopSpace Limited",
    category: "Corporate B2B",
    description: "Commercial shelving solutions showcase for a boltless racking and gondola supplier, designed to drive trade enquiries.",
    image: "/portfolio-mockups/topspace.png",
  },
  {
    id: 4,
    name: "Meridian Securities",
    category: "Corporate B2B",
    description: "Trust-first landing page for a securities advisory firm, built around regulatory credibility and direct client acquisition CTAs.",
    image: "/portfolio-mockups/meridian.png",
  },
  {
    id: 5,
    name: "NovaDax Limited",
    category: "Corporate B2C",
    description: "Crypto exchange landing page designed for aggressive user acquisition with trust-building elements.",
    image: "/portfolio-mockups/novadax.png",
  },
  {
    id: 6,
    name: "Ember & Oak Cafe",
    category: "Restaurant and Cafe",
    description: "Specialty coffee café site built to drive dine-in reservations and online orders, with a warm editorial aesthetic.",
    image: "/portfolio-mockups/emberoak.png",
  },
  {
    id: 7,
    name: "Lumora",
    category: "Online Store",
    description: "Digital creative marketplace for courses, presets, templates and wallpapers — designed for instant downloads.",
    image: "/portfolio-mockups/lumora.png",
  },
  {
    id: 8,
    name: "Ryan Lim",
    category: "Personal Brand",
    description: "Personal brand site for a KL & Selangor property agent, showcasing past projects and converting buyers into leads.",
    image: "/portfolio-mockups/ryanlim.png",
  },
]

const ALL = "All"
const categories = [ALL, ...Array.from(new Set(projects.map(p => p.category)))]

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({ project, priority = false }: { project: typeof projects[0]; priority?: boolean }) {
  return (
    <motion.div
      layout
      className="neo-card bg-white flex flex-col overflow-hidden group"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 24 } }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-10" onContextMenu={e => e.preventDefault()} />
        <Image
          src={project.image}
          alt={`${project.name} ${project.category} landing page — vnbuildr web development portfolio`}
          width={1080}
          height={1440}
          className="w-full h-auto object-cover select-none transition-transform duration-500 group-hover:scale-[1.03]"
          draggable={false}
          onContextMenu={e => e.preventDefault()}
          priority={priority}
          sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 275px"
        />
      </div>

      {/* Info */}
      <div className="p-4 md:p-5 border-t border-[var(--color-border)]">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-[15px] font-normal tracking-tight leading-snug">{project.name}</h3>
          <span className="text-[8px] font-bold tracking-[0.05em] uppercase px-1.5 py-0.5 rounded border border-[var(--color-ink)] text-[var(--color-ink)] leading-tight text-center">
            {project.category}
          </span>
        </div>
        <p className="text-[12px] text-[var(--color-ink-muted)] leading-[1.6] line-clamp-2">{project.description}</p>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState(ALL)
  const filtered = activeFilter === ALL ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
          <Link
            href="/"
            onClick={e => { e.preventDefault(); window.location.href = "/" }}
            className="font-serif text-[22px] tracking-tight"
          >
            <span className="text-[var(--color-blue)] font-bold">vn</span><em>buildr</em>
          </Link>
          <Link
            href="/"
            className="hidden sm:flex text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors items-center gap-1.5"
          >
            <ChevronLeft /> Back to home
          </Link>
          <a
            href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page"
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

        {/* Grid */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-[var(--color-surface)]">
          <div className="max-w-[1200px] mx-auto">

            {/* Filter buttons */}
            <motion.div
              className="flex flex-wrap gap-2 mb-8 justify-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-[12px] font-semibold tracking-wide px-3.5 py-1.5 rounded border-2 transition-all duration-150 ${
                    activeFilter === cat
                      ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
                      : "bg-white text-[var(--color-ink-muted)] border-[var(--color-border)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Project grid */}
            <motion.div layout className="grid grid-cols-2 mobile-landscape:grid-cols-4 md:grid-cols-4 gap-5 md:gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map(project => (
                  <ProjectCard key={project.id} project={project} priority={project.id <= 4} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            <AnimatePresence>
              {filtered.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-[var(--color-ink-muted)] text-[14px] py-16"
                >
                  No projects in this category yet.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 px-6 bg-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
              Want one of these?
            </p>
            <h2 className="font-serif text-[clamp(28px,4vw,50px)] font-normal tracking-tight mb-6">
              Let&apos;s build your page next.
            </h2>
            <a
              href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-glow inline-flex items-center gap-2 bg-[#25D366] text-white text-[15px] font-medium px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-ink)] border-t border-white/[0.08] py-8 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-4 text-center md:text-left">
          <Link href="/" className="font-serif text-[18px] text-white/90">
            <span className="text-[var(--color-blue)] font-bold">vn</span><em>buildr</em>
          </Link>
          <p className="text-[13px] text-white/30 text-center">© 2026 vnbuildr. All rights reserved.</p>
          <div className="flex gap-6 justify-center md:justify-end">
            <Link href="/" className="text-[13px] text-white/35 hover:text-white/75 transition-colors">Home</Link>
            <a href="https://wa.me/60199195314" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/35 hover:text-white/75 transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  )
}
