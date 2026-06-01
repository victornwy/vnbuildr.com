"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
import { translations, type Locale, type Translations } from "@/lib/i18n";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { TextRotate } from "@/components/ui/text-rotate";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FooterSection } from "@/components/ui/footer-section";
import {
  Code2, PenTool, Layers, Type, Palette,
  MousePointer2, LayoutTemplate, Zap, Smartphone, Globe,
  FileText, Target, RefreshCw,
} from "lucide-react";

// ─── Animation toggle context ─────────────────────────────────────────────────
const AnimContext = createContext<{ on: boolean; set: (v: boolean) => void }>({
  on: true,
  set: () => {},
})

// ─── Locale context ───────────────────────────────────────────────────────────
const LocaleCtx = createContext<{ t: Translations; locale: Locale }>({
  t: translations.en, locale: "en",
})
const useT = () => useContext(LocaleCtx).t
const useLocale = () => useContext(LocaleCtx).locale

function AnimToggle({ on, set }: { on: boolean; set: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-3 py-1.5">
      <span className={`text-[11px] font-semibold tracking-wide transition-colors duration-200 ${!on ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]"}`}>Static</span>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => set(!on)}
        className={`relative inline-flex items-center w-10 h-[22px] shrink-0 rounded-full border-2 border-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] cursor-pointer transition-colors duration-200 ${on ? "bg-[var(--color-ink)]" : "bg-white"}`}
        aria-label={on ? "Switch to static mode" : "Switch to React mode"}
      >
        <span className={`block h-[14px] w-[14px] rounded-full border border-[var(--color-ink)] transition-transform duration-200 ${on ? "translate-x-[19px] bg-white" : "translate-x-[1px] bg-[var(--color-ink)]"}`} />
      </button>
      <span className={`text-[11px] font-semibold tracking-wide transition-colors duration-200 ${on ? "text-[var(--color-blue)]" : "text-[var(--color-ink-muted)]"}`}>React</span>
    </div>
  )
}

const NAV_HEIGHT = 60

function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (!el) return
  const target = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 8
  const start = window.scrollY
  const distance = target - start
  const duration = 620
  let startTime: number | null = null

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function step(ts: number) {
    if (!startTime) startTime = ts
    const progress = Math.min((ts - startTime) / duration, 1)
    window.scrollTo(0, start + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

function Nav() {
  const { on, set } = useContext(AnimContext)
  const t = useT()
  const [open, setOpen] = useState(false)
  const [navScrollY, setNavScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setNavScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navBgOpacity = Math.min(navScrollY / 100, 1)

  const close = () => setOpen(false)

  const NAV_LINKS: [string, string][] = [
    ["#pricing",  t.nav.pricing],
    ["#faq",      t.nav.faq],
    ["#contact",  t.nav.contact],
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    close()
    scrollToSection(href)
  }

  return (
    <nav className="fixed top-0 z-50 w-full">
      <div
        className="absolute inset-0 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)] pointer-events-none"
        style={{ opacity: navBgOpacity }}
      />
      <div className="relative max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); close() }} className="font-serif text-[22px] tracking-tight">
          <span className="text-[var(--color-blue)] font-bold">vn</span><em>buildr</em>
        </Link>

        {/* Desktop right */}
        <div className="hidden md:flex mobile-landscape:hidden items-center gap-4">
          <a href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page" target="_blank" rel="noopener noreferrer" className="whatsapp-glow text-sm font-medium bg-[#25D366] text-white px-5 py-2.5 rounded-full hover:opacity-85 transition-opacity">
            {t.nav.getInTouch}
          </a>
          <div className="relative">
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded border-2 border-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] bg-white shrink-0"
            >
              <motion.span animate={open ? { rotate: 45, y: 7 }  : { rotate: 0, y: 0 }}  transition={{ duration: 0.2 }} className="block w-[15px] h-[1.5px] bg-[var(--color-ink)] rounded-full origin-center" />
              <motion.span animate={open ? { opacity: 0 }        : { opacity: 1 }}        transition={{ duration: 0.15 }} className="block w-[15px] h-[1.5px] bg-[var(--color-ink)] rounded-full" />
              <motion.span animate={open ? { rotate: -45, y: -7 }: { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="block w-[15px] h-[1.5px] bg-[var(--color-ink)] rounded-full origin-center" />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  key="nav-menu-desktop"
                  initial={{ opacity: 0, scale: 0.96, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-[calc(100%+8px)] right-0 w-52 bg-white neo-card overflow-hidden z-[60]"
                >
                  <div className="py-1.5">
                    {NAV_LINKS.map(([href, label]) => (
                      <a key={href} href={href} onClick={e => handleNavClick(e, href)}
                        className="block text-[14px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] px-4 py-2.5 transition-colors">
                        {label}
                      </a>
                    ))}
                    <Link href="/portfolio" onClick={close}
                      className="block text-[14px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] px-4 py-2.5 transition-colors">
                      {t.nav.portfolio}
                    </Link>
                    <div className="border-t border-[var(--color-border)] mt-1 px-4 pt-2.5 pb-3">
                      <span className="text-[10px] font-semibold text-[var(--color-ink-muted)] uppercase tracking-wider block mb-2">{t.nav.animation}</span>
                      <AnimToggle on={on} set={set} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile right: CTA + burger */}
        <div className="flex md:hidden mobile-landscape:flex items-center gap-2">
          <a href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page" target="_blank" rel="noopener noreferrer" className="whatsapp-glow text-sm mobile-landscape:text-xs font-medium bg-[#25D366] text-white px-4 mobile-landscape:px-3 py-2 mobile-landscape:py-1.5 rounded-full hover:opacity-85 transition-opacity">
            <span className="mobile-landscape:hidden">{t.nav.getInTouch}</span>
            <span className="hidden mobile-landscape:inline">{t.nav.chat}</span>
          </a>
          <div className="relative">
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded border-2 border-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] bg-white shrink-0"
            >
              <motion.span animate={open ? { rotate: 45, y: 7 }  : { rotate: 0, y: 0 }}  transition={{ duration: 0.2 }} className="block w-[15px] h-[1.5px] bg-[var(--color-ink)] rounded-full origin-center" />
              <motion.span animate={open ? { opacity: 0 }        : { opacity: 1 }}        transition={{ duration: 0.15 }} className="block w-[15px] h-[1.5px] bg-[var(--color-ink)] rounded-full" />
              <motion.span animate={open ? { rotate: -45, y: -7 }: { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="block w-[15px] h-[1.5px] bg-[var(--color-ink)] rounded-full origin-center" />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  key="nav-menu-mobile"
                  initial={{ opacity: 0, scale: 0.96, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-[calc(100%+8px)] right-0 w-52 bg-white neo-card overflow-hidden z-[60]"
                >
                  <div className="py-1.5">
                    {NAV_LINKS.map(([href, label]) => (
                      <a key={href} href={href} onClick={e => handleNavClick(e, href)}
                        className="block text-[14px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] px-4 py-2.5 transition-colors">
                        {label}
                      </a>
                    ))}
                    <Link href="/portfolio" onClick={close}
                      className="block text-[14px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] px-4 py-2.5 transition-colors">
                      {t.nav.portfolio}
                    </Link>
                    <div className="border-t border-[var(--color-border)] mt-1 px-4 pt-2.5 pb-3">
                      <span className="text-[10px] font-semibold text-[var(--color-ink-muted)] uppercase tracking-wider block mb-2">{t.nav.animation}</span>
                      <AnimToggle on={on} set={set} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}

const floatingIcons = [
  { icon: Code2,          label: "Clean code",      delay: 0.5,  rotate: "-rotate-[11deg]", bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: PenTool,        label: "Vector design",   delay: 0.65, rotate: "rotate-[14deg]",  bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { icon: Layers,         label: "Layouts",         delay: 0.8,  rotate: "-rotate-[3deg]",  bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: Type,           label: "Typography",      delay: 0.95, rotate: "rotate-[17deg]",  bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { icon: Palette,        label: "Brand colours",   delay: 1.1,  rotate: "-rotate-[8deg]",  bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: MousePointer2,  label: "UX / CRO",        delay: 1.2,  rotate: "rotate-[5deg]",   bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { icon: LayoutTemplate, label: "Responsive",      delay: 0.7,  rotate: "-rotate-[16deg]", bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: Zap,            label: "Fast delivery",   delay: 0.9,  rotate: "rotate-[9deg]",   bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { icon: Smartphone,     label: "Mobile-first",    delay: 1.05, rotate: "-rotate-[4deg]",  bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: Globe,          label: "Ready to launch", delay: 1.15, rotate: "rotate-[12deg]",  bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
];

const floatingSymbols = [
  { symbol: ";",   label: "Semicolon",  delay: 0.55, rotate: "-rotate-[13deg]", bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { symbol: "{ }", label: "Block",      delay: 0.72, rotate: "rotate-[8deg]",   bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { symbol: "( )", label: "Params",     delay: 0.88, rotate: "-rotate-[6deg]",  bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { symbol: "==",  label: "Compare",    delay: 0.62, rotate: "rotate-[15deg]",  bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { symbol: "!=",  label: "Not equal",  delay: 0.92, rotate: "-rotate-[10deg]", bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { symbol: '""',  label: "String",     delay: 1.05, rotate: "rotate-[18deg]",  bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
];

function IconPill({ icon: Icon, rotate, bg, color }: Omit<typeof floatingIcons[0], "delay" | "label">) {
  return (
    <div className={`flex items-center justify-center ${bg} ${rotate} p-2.5 rounded-xl shadow-md border border-[var(--color-border)] cursor-default select-none`}>
      <Icon size={16} className={`${color} shrink-0`} />
    </div>
  );
}

function SymbolPill({ symbol, rotate, bg, color }: Omit<typeof floatingSymbols[0], "delay" | "label">) {
  return (
    <div className={`flex items-center justify-center ${bg} ${rotate} p-2.5 rounded-xl shadow-md border border-[var(--color-border)] cursor-default select-none`}>
      <span className={`text-[13px] font-mono font-bold ${color} leading-none`}>{symbol}</span>
    </div>
  );
}

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
interface HeroProps {
  turnaroundTime?: string
  headline?: React.ReactNode
  subheadline?: string
}

function Hero({
  turnaroundTime: _turnaroundTime = "7 days",
  headline,
  subheadline,
}: HeroProps) {
  const { on } = useContext(AnimContext)
  const t = useT()
  return (
    <section className="relative w-full min-h-screen pt-[60px] mobile-landscape:min-h-0 mobile-landscape:py-8 overflow-hidden flex flex-col items-center justify-center">
      <AuroraBackground />
      {/* Mouse-follow parallax elements — toggled via AnimContext */}
      <AnimatePresence>
        {on && (
          <motion.div
            key="parallax"
            className="absolute inset-0 pointer-events-none hidden md:block mobile-landscape:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Floating sensitivity={0.8} easingFactor={0.04}>
              {/* Left side — uneven vertical spread, not mirrored */}
              <FloatingElement depth={2.5} className="top-[5%]   left-[15%]"><motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.38, type:"spring", stiffness:220, damping:32 }}><IconPill   {...floatingIcons[0]}   /></motion.div></FloatingElement>
              <FloatingElement depth={1}   className="top-[21%]  left-[7%]"> <motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.55, type:"spring", stiffness:220, damping:32 }}><SymbolPill {...floatingSymbols[0]} /></motion.div></FloatingElement>
              <FloatingElement depth={3}   className="top-[51%]  left-[11%]"><motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.71, type:"spring", stiffness:220, damping:32 }}><IconPill   {...floatingIcons[4]}   /></motion.div></FloatingElement>
              <FloatingElement depth={1.5} className="top-[68%]  left-[5%]"> <motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.63, type:"spring", stiffness:220, damping:32 }}><IconPill   {...floatingIcons[6]}   /></motion.div></FloatingElement>
              <FloatingElement depth={2}   className="bottom-[5%] left-[18%]"><motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.80, type:"spring", stiffness:220, damping:32 }}><SymbolPill {...floatingSymbols[2]} /></motion.div></FloatingElement>

              {/* Right side — different rhythm from left */}
              <FloatingElement depth={1.5} className="top-[13%]  right-[9%]"> <motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.44, type:"spring", stiffness:220, damping:32 }}><IconPill   {...floatingIcons[1]}   /></motion.div></FloatingElement>
              <FloatingElement depth={3}   className="top-[34%]  right-[15%]"><motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.60, type:"spring", stiffness:220, damping:32 }}><SymbolPill {...floatingSymbols[1]} /></motion.div></FloatingElement>
              <FloatingElement depth={1}   className="top-[56%]  right-[7%]"> <motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.48, type:"spring", stiffness:220, damping:32 }}><IconPill   {...floatingIcons[3]}   /></motion.div></FloatingElement>
              <FloatingElement depth={2.5} className="top-[74%]  right-[13%]"><motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.74, type:"spring", stiffness:220, damping:32 }}><SymbolPill {...floatingSymbols[5]} /></motion.div></FloatingElement>
              <FloatingElement depth={1.5} className="bottom-[4%] right-[8%]"> <motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.87, type:"spring", stiffness:220, damping:32 }}><IconPill   {...floatingIcons[5]}   /></motion.div></FloatingElement>
              <FloatingElement depth={2}   className="bottom-[18%] right-[4%]"><motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.67, type:"spring", stiffness:220, damping:32 }}><IconPill   {...floatingIcons[9]}   /></motion.div></FloatingElement>
            </Floating>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centre content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-[680px] pointer-events-auto">
        <motion.h1
          className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-5 mobile-landscape:mb-2"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {headline ?? t.hero.label}
        </motion.h1>

        <motion.p
          className="font-serif text-[clamp(38px,6vw,72px)] mobile-landscape:text-[clamp(22px,4vw,36px)] font-normal leading-[1.08] tracking-tight mb-6 mobile-landscape:mb-2"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{t.hero.line1}</span>
          <br />
          <LayoutGroup>
            <motion.span layout className="inline-flex items-baseline gap-2 whitespace-pre">
              {t.hero.rotatePrefix && (
                <motion.span layout transition={{ type: "spring", damping: 30, stiffness: 400 }}>
                  {t.hero.rotatePrefix}
                </motion.span>
              )}
              <TextRotate
                texts={t.hero.rotatingWords}
                mainClassName="overflow-hidden text-[var(--color-blue)] py-0 pb-1"
                staggerDuration={0.04}
                staggerFrom="last"
                rotationInterval={2800}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
              {t.hero.rotateSuffix && (
                <motion.span layout transition={{ type: "spring", damping: 30, stiffness: 400 }}>
                  {t.hero.rotateSuffix}
                </motion.span>
              )}
            </motion.span>
          </LayoutGroup>
        </motion.p>

        <motion.p
          className="text-[clamp(15px,1.8vw,18px)] text-[var(--color-ink-muted)] max-w-[520px] mb-10 mobile-landscape:mb-4 leading-[1.65]"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {subheadline ?? t.hero.subheadline}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-glow inline-flex items-center gap-2 bg-[#25D366] text-white text-[15px] font-medium px-6 py-3 rounded-full hover:opacity-85 hover:-translate-y-px transition-all"
          >
            {t.hero.primaryCta}
            <ArrowRight />
          </a>
          <Link
            href="/portfolio"
            className="inline-flex items-center text-[15px] font-medium px-6 py-3 rounded-full border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors"
          >
            View our works
          </Link>
        </motion.div>

        <motion.p
          className="text-[13px] text-[var(--color-ink-muted)]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.54, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.trustLine}
        </motion.p>

      </div>
    </section>
  );
}

// ─── Why Website ──────────────────────────────────────────────────────────────
function WhyWebsite() {
  const bullets = [
    {
      text: "Build SEO authority. Social profiles rarely do.",
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><polyline points="2,14 6,9 10,12 16,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="12,4 16,4 16,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      text: "Collect leads without paying per click.",
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/></svg>,
    },
    {
      text: "Your data. Your rules. Your brand.",
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 1.5L2.5 5v4.5C2.5 13.5 5.5 16 9 17c3.5-1 6.5-3.5 6.5-7.5V5L9 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      text: "Works 24/7 — no feed, no algorithm.",
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5.5V9l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
  ]

  return (
    <section className="py-16 md:py-24 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto">

        {/* Centered header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            Posting everyday, still no enquiries?
          </p>
          <h2 className="font-serif text-[clamp(30px,4vw,48px)] font-normal tracking-tight leading-[1.1] mb-5">
            10,000 followers. Zero leads.
            <br />
            <span className="text-[var(--color-blue)]">Sound familiar?</span>
          </h2>
          <p className="text-[16px] text-[var(--color-ink-muted)] leading-[1.75] max-w-[520px] mx-auto">
            Social media is designed to keep people scrolling — not to send them to you. You can post every day and still get no enquiries, because the platform decides who sees your content. A website puts you in control: your leads, your data, your brand, on your own terms.
          </p>
        </FadeUp>

        {/* 2×2 bullet grid */}
        <FadeUp delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {bullets.map(({ text, icon }, i) => (
              <motion.div
                key={i}
                className="neo-card bg-[var(--color-surface)] flex items-center gap-4 px-6 py-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.06 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 34 } }}
              >
                <span className="text-[var(--color-blue)] shrink-0">{icon}</span>
                <p className="text-[15px] font-medium text-[var(--color-ink)] leading-snug">{text}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.75] border-t border-[var(--color-border)] pt-7 italic text-center max-w-[560px] mx-auto">
            Social brings the eyeballs. Your website converts them into customers.
          </p>
        </FadeUp>

      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  const colBg = (j: number) =>
    plans[j].featured
      ? hoveredPlan === j ? "bg-[#d4e4ff]" : "bg-[#eef3ff]"
      : hoveredPlan === j ? "bg-[#f4f7ff]" : "bg-white"

  const plans = [
    { name: "Starter",  type: "Landing Page",      price: "RM1,299", cta: "Get started",  waMsg: "Hi, I'm interested in the Starter package",  featured: false },
    { name: "Business", type: "Multi-page Website", price: "RM2,899", cta: "Get started",  waMsg: "Hi, I'm interested in the Business package", featured: true  },
    { name: "Pro",      type: "Multi-page Website", price: "RM3,799", cta: "Chat with us", waMsg: "Hi, I'm interested in the Pro package",      featured: false },
  ]

  const rows = [
    { label: "Pages",           values: ["1",        "5",        "10"]       },
    { label: "Delivery",        values: ["2–3 days", "3–7 days", "4–8 days"] },
    { label: "Revision rounds", values: ["3",        "4",        "5"]        },
    { label: "Business emails", values: ["1",        "1",        "2"]        },
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

  return (
    <section id="pricing" className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">

        <FadeUp className="text-center mb-10">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">Packages</p>
          <h2 className="font-serif text-[clamp(30px,4vw,48px)] font-normal tracking-tight leading-[1.1] mb-4">
            Simple, transparent pricing.
            <br />
            <span className="text-[var(--color-blue)]">No hidden fees.</span>
          </h2>
        </FadeUp>

        {/* Swipe hint — mobile only */}
        <div className="flex items-center justify-center gap-1.5 mb-2 md:hidden">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-ink-muted)]">
            <path d="M5 9l-3 3 3 3"/><path d="M19 9l3 3-3 3"/><line x1="2" y1="12" x2="22" y2="12"/>
          </svg>
          <span className="text-[11px] text-[var(--color-ink-muted)]">Swipe to compare plans</span>
        </div>

        {/* Unified pricing table */}
        <FadeUp delay={0.06}>
          <div className="neo-card overflow-hidden mb-5 relative">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px]">

                {/* Header */}
                <thead>
                  <tr className="border-b-2 border-[var(--color-ink)]">
                    <th className="px-3 py-4 md:px-6 md:py-6 text-left align-middle w-[22%] border-r border-[var(--color-border)] bg-[var(--color-surface)]">
                      <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[var(--color-ink-muted)] mb-2 hidden md:block">What&apos;s the difference?</p>
                      <p className="text-[12px] text-[var(--color-ink-muted)] leading-[1.75] hidden md:block">
                        <span className="font-semibold text-[var(--color-ink)]">Landing page</span> — one focused page for one goal.<br />
                        <span className="font-semibold text-[var(--color-ink)]">Website</span> — multiple pages for your full business.
                      </p>
                    </th>
                    {plans.map(({ name, type, price, featured }, i) => (
                      <th
                        key={name}
                        className={`px-3 py-4 md:px-5 md:py-6 text-center align-middle cursor-default transition-colors duration-300 ${i < plans.length - 1 ? "border-r border-[var(--color-border)]" : ""} ${featured ? "bg-[var(--color-blue)]" : hoveredPlan === i ? "bg-[#f4f7ff]" : "bg-white"}`}
                        onMouseEnter={() => setHoveredPlan(i)}
                        onMouseLeave={() => setHoveredPlan(null)}
                      >
                        {featured && (
                          <span className="inline-flex items-center text-[10px] font-bold tracking-[0.06em] uppercase bg-white/20 text-white px-2.5 py-1 rounded-full mb-2">
                            Most Popular
                          </span>
                        )}
                        <p className={`font-serif text-[15px] md:text-[20px] font-normal tracking-tight mb-0.5 ${featured ? "text-white" : ""}`}>{name}</p>
                        <p className={`text-[9px] md:text-[10px] font-semibold tracking-[0.05em] uppercase mb-2 md:mb-3 ${featured ? "text-white/60" : "text-[var(--color-ink-muted)]"}`}>{type}</p>
                        <p className={`font-serif text-[26px] md:text-[38px] font-normal tracking-tight leading-none ${featured ? "text-white" : ""}`}>{price}</p>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Data rows */}
                <tbody>
                  {rows.map(({ label, values }, i) => (
                    <motion.tr
                      key={label}
                      className="border-b border-[var(--color-border)]"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <td className="px-3 py-3 md:px-6 md:py-4 text-[11px] md:text-[13px] text-[var(--color-ink-muted)] border-r border-[var(--color-border)] bg-[var(--color-surface)]">{label}</td>
                      {values.map((v, j) => (
                        <td
                          key={j}
                          className={`text-center px-2 py-3 md:px-5 md:py-4 text-[12px] md:text-[14px] transition-colors duration-300 ${j < values.length - 1 ? "border-r border-[var(--color-border)]" : ""} ${plans[j].featured ? `${colBg(j)} text-[var(--color-blue)] font-semibold` : `${colBg(j)} text-[var(--color-ink)]`}`}
                          onMouseEnter={() => setHoveredPlan(j)}
                          onMouseLeave={() => setHoveredPlan(null)}
                        >
                          {v}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>

                {/* CTA row */}
                <tfoot>
                  <tr>
                    <td className="px-3 py-4 md:px-6 md:py-5 border-r border-[var(--color-border)] bg-[var(--color-surface)]" />
                    {plans.map(({ name, cta, waMsg, featured }, i) => (
                      <td
                        key={name}
                        className={`px-2 py-4 md:px-4 md:py-5 text-center transition-colors duration-300 ${i < plans.length - 1 ? "border-r border-[var(--color-border)]" : ""} ${colBg(i)}`}
                        onMouseEnter={() => setHoveredPlan(i)}
                        onMouseLeave={() => setHoveredPlan(null)}
                      >
                        <motion.a
                          href={`https://wa.me/60199195314?text=${encodeURIComponent(waMsg)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 380, damping: 22 }}
                          className={`inline-flex items-center justify-center gap-1.5 w-full text-[11px] md:text-[13px] font-medium py-2.5 md:py-3 rounded-full ${
                            featured ? "bg-[var(--color-blue)] text-white" : "bg-[var(--color-ink)] text-white"
                          }`}
                        >
                          {cta}
                          <ArrowRight />
                        </motion.a>
                      </td>
                    ))}
                  </tr>
                </tfoot>

              </table>
            </div>
            {/* Right-edge fade — signals more content to scroll on mobile */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/90 to-transparent md:hidden" />
          </div>
        </FadeUp>

        {/* Custom — full-width banner */}
        <FadeUp delay={0.12}>
          <motion.div
            className="neo-card bg-white"
            whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 34 } }}
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-6 p-6 md:p-8 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-[11px] font-bold tracking-[0.06em] uppercase bg-[var(--color-surface)] text-[var(--color-ink-muted)] px-2.5 py-1 rounded-full border border-[var(--color-border)]">Custom</span>
                  <span className="font-serif text-[26px] font-normal tracking-tight">From RM3,999</span>
                </div>
                <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.7] max-w-[560px]">
                  Need something bigger? We build fully custom websites with 10–25 pages, unique design from scratch, 5 business emails, and up to 7 revision rounds. Delivery in 8–15 working days.
                </p>
              </div>
              <motion.a
                href={`https://wa.me/60199195314?text=${encodeURIComponent("Hi, I'd like to discuss a Custom website")}`}
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
        </FadeUp>

        {/* All-plans inclusions */}
        <FadeUp delay={0.16}>
          <div className="mt-5 px-5 py-4 rounded-lg border border-[var(--color-border)] bg-white">
            <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-ink-muted)] mb-3">Included in all packages</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
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
          </div>
        </FadeUp>

        {/* Monthly Maintenance */}
        <FadeUp delay={0.20}>
          <div className="mt-10">
            <div className="text-center mb-6">
              <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-3">Optional add-on</p>
              <h3 className="font-serif text-[clamp(22px,3vw,36px)] font-normal tracking-tight leading-[1.1]">
                Monthly maintenance,
                <br />
                <span className="text-[var(--color-blue)]">billed annually.</span>
              </h3>
              <p className="text-[14px] text-[var(--color-ink-muted)] mt-3 max-w-[440px] mx-auto leading-[1.65]">
                Email hosting, domain renewals, and minor updates — handled for you. Pay once a year, no monthly invoices.
              </p>
            </div>

            <div className="neo-card overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-[var(--color-border)]">
                {[
                  { plan: "Starter",  annual: "RM899",   monthly: "RM75/mo",  waMsg: "Hi, I'd like to add the Starter maintenance plan" },
                  { plan: "Business", annual: "RM1,399", monthly: "RM117/mo", waMsg: "Hi, I'd like to add the Business maintenance plan", featured: true },
                  { plan: "Pro",      annual: "RM1,799", monthly: "RM150/mo", waMsg: "Hi, I'd like to add the Pro maintenance plan" },
                ].map(({ plan, annual, monthly, waMsg, featured }) => (
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
                      className="inline-flex items-center justify-center gap-1.5 text-[11px] md:text-[13px] font-medium py-2.5 rounded-full bg-[var(--color-ink)] text-white"
                    >
                      Add to {plan}
                      <ArrowRight />
                    </motion.a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const t = useT()
  const steps = t.how.steps

  return (
    <section id="how" className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            {t.how.label}
          </p>
          <h2 className="font-serif text-[clamp(32px,4.5vw,50px)] font-normal tracking-tight mb-4">
            {t.how.heading.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className="text-[17px] text-[var(--color-ink-muted)] max-w-[440px] mx-auto">
            {t.how.subheading}
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map(({ num, title, body, time }, i) => (
            <motion.div
              key={num}
              className="neo-card bg-white p-6 md:p-10"
              initial={{ opacity: 0, x: i === 0 ? -48 : i === 2 ? 48 : 0, y: i === 1 ? 36 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 260, damping: 32, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 34 } }}
            >
              <div className="w-9 h-9 rounded bg-[var(--color-surface)] border-2 border-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] flex items-center justify-center text-[13px] font-semibold text-[var(--color-ink)] mb-5">
                {num}
              </div>
              <h3 className="text-[18px] font-semibold tracking-tight mb-2">{title}</h3>
              <p className="text-[15px] text-[var(--color-ink-muted)] leading-[1.65]">{body}</p>
              <div className="mt-5 text-[12px] font-semibold text-[var(--color-ink-muted)] tracking-widest uppercase flex items-center gap-2">
                <span className="block w-4 h-px bg-current" />
                {time}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const t = useT()
  const icons = [
    <Zap key="zap" size={18} strokeWidth={1.5} />,
    <FileText key="filetext" size={18} strokeWidth={1.5} />,
    <Smartphone key="smartphone" size={18} strokeWidth={1.5} />,
    <Code2 key="code2" size={18} strokeWidth={1.5} />,
    <Target key="target" size={18} strokeWidth={1.5} />,
    <RefreshCw key="refreshcw" size={18} strokeWidth={1.5} />,
  ]
  const cards = t.features.cards.map((c, i) => ({ ...c, icon: icons[i] }))

  return (
    <section id="features" className="py-16 md:py-24 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp className="mb-14">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            {t.features.label}
          </p>
          <h2 className="font-serif text-[clamp(30px,4vw,46px)] font-normal tracking-tight leading-[1.1] mb-4">
            {t.features.heading.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className="text-[16px] text-[var(--color-ink-muted)] leading-[1.65] max-w-[440px]">
            {t.features.subheading}
          </p>
        </FadeUp>

        <FadeUp delay={0.12}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {cards.map(({ icon, title, body }) => (
            <motion.div
              key={title}
              className="neo-card bg-white p-6 md:p-9"
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 34 } }}
            >
              <div className="w-[42px] h-[42px] bg-[var(--color-surface)] border-2 border-[var(--color-ink)] shadow-[2px_2px_0_var(--color-ink)] rounded flex items-center justify-center text-[var(--color-ink)] mb-5">
                {icon}
              </div>
              <h3 className="text-[16px] font-semibold tracking-tight mb-2">{title}</h3>
              <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.65]">{body}</p>
            </motion.div>
          ))}
        </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const t = useT()
  return (
    <section className="py-16 md:py-24 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp className="mb-14">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            {t.testimonials.label}
          </p>
          <h2 className="font-serif text-[clamp(30px,4vw,46px)] font-normal tracking-tight leading-[1.1]">
            {t.testimonials.heading}
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {t.testimonials.items.map(({ quote, role, initials }) => (
              <motion.div key={role} className="neo-card bg-white p-6 md:p-8 flex flex-col gap-5"
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 34 } }}
              >
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
                  <path d="M0 20V12.4C0 9.06667 0.8 6.2 2.4 3.8C4.06667 1.4 6.46667 0.2 9.6 0.2L10.6 2C8.6 2.53333 7 3.66667 5.8 5.4C4.66667 7.06667 4.1 8.93333 4.1 11H9.6V20H0ZM18 20V12.4C18 9.06667 18.8 6.2 20.4 3.8C22.0667 1.4 24.4667 0.2 27.6 0.2L28 2C26 2.53333 24.4 3.66667 23.2 5.4C22.0667 7.06667 21.5 8.93333 21.5 11H27V20H18Z" fill="var(--color-blue)" opacity="0.25"/>
                </svg>
                <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.8] flex-1">{quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                  <div className="w-9 h-9 rounded-full bg-[#eef3ff] border-2 border-[var(--color-blue)] flex items-center justify-center text-[11px] font-bold text-[var(--color-blue)] shrink-0">
                    {initials}
                  </div>
                  <p className="text-[13px] font-semibold text-[var(--color-ink)]">{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Contact form ─────────────────────────────────────────────────────────────
const FIELD = "w-full bg-white/[0.08] border-2 border-white/20 rounded px-4 py-3 text-white text-[14px] placeholder:text-white/30 outline-none focus:border-white/50 transition-colors"
const LABEL = "block text-[13px] font-medium text-white/55 mb-2"

function ContactForm() {
  const [name,     setName]     = useState("")
  const [phone,    setPhone]    = useState("")
  const [business, setBusiness] = useState("")
  const [pkg,      setPkg]      = useState("")
  const [message,  setMessage]  = useState("")

  const packages = ["Starter", "Business", "Pro", "Custom", "Not sure yet"]
  const canSubmit = name.trim() && phone.trim() && business.trim()

  const submit = () => {
    const lines = [
      "Hi, I'd like to start a project with vnbuildr.",
      "",
      `Name: ${name}`,
      `WhatsApp: ${phone}`,
      `Business: ${business}`,
      pkg     ? `Package: ${pkg}`       : null,
      message ? `Message: ${message}`   : null,
    ].filter(Boolean).join("\n")
    window.open(`https://wa.me/60199195314?text=${encodeURIComponent(lines)}`, "_blank")
  }

  return (
    <div className="mt-10 space-y-5 text-left">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={LABEL}>Your name</label>
          <input type="text" placeholder="First & last name" value={name} onChange={e => setName(e.target.value)} className={FIELD} />
        </div>
        <div>
          <label className={LABEL}>WhatsApp number</label>
          <input type="tel" placeholder="+60 12-345 6789" value={phone} onChange={e => setPhone(e.target.value)} className={FIELD} />
        </div>
      </div>

      <div>
        <label className={LABEL}>Business name</label>
        <input type="text" placeholder="Your company or project" value={business} onChange={e => setBusiness(e.target.value)} className={FIELD} />
      </div>

      <div>
        <label className={LABEL}>Which package are you interested in? <span className="text-white/30 font-normal">(optional)</span></label>
        <div className="flex flex-wrap gap-2 mt-1">
          {packages.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPkg(pkg === p ? "" : p)}
              className={`text-[13px] font-medium px-4 py-2 rounded-full border-2 transition-all duration-150 ${
                pkg === p
                  ? "bg-white text-[var(--color-ink)] border-white"
                  : "bg-transparent text-white/55 border-white/20 hover:border-white/40 hover:text-white/80"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={LABEL}>Anything you&apos;d like to share? <span className="text-white/30 font-normal">(optional)</span></label>
        <textarea
          placeholder="Tell me about your business, what you need, or any questions…"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={`${FIELD} resize-none`}
          rows={3}
        />
      </div>

      <button
        type="button"
        onClick={() => canSubmit && submit()}
        disabled={!canSubmit}
        className="w-full whatsapp-glow flex items-center justify-center gap-2 bg-[#25D366] text-white text-[15px] font-semibold py-3.5 rounded-full hover:opacity-85 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
      >
        Send via WhatsApp
        <ArrowRight />
      </button>

      <p className="text-[12px] text-white/25 text-center pt-1">
        I&apos;ll reply within 24 hours · No commitment required
      </p>
    </div>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function CtaSection() {
  const t = useT()
  return (
    <section id="contact" className="py-16 md:py-24 px-6 bg-[var(--color-ink)]">
      <div className="max-w-[600px] mx-auto">
        <FadeUp className="text-center mb-2">
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/55 text-[13px] font-medium px-3 py-1 rounded-full mb-6 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#5c9e6e]">
            {t.cta.available}
          </span>
          <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] font-normal text-white tracking-tight leading-[1.05] mb-3">
            {t.cta.heading}
          </h2>
          <p className="text-[15px] text-white/45">
            {t.cta.subheading}
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
        <ContactForm />
        </FadeUp>
      </div>
    </section>
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

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const t = useT()
  return (
    <section className="py-16 md:py-24 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp>
          <div className="neo-card bg-white overflow-hidden">
            <div className="grid md:grid-cols-[300px_1fr]">

              {/* Left: avatar panel */}
              <div className="bg-[var(--color-surface)] p-10 flex flex-col items-center justify-center gap-5 border-b md:border-b-0 md:border-r border-[var(--color-border)]">
                <div className="w-44 h-44 rounded-full bg-white border-2 border-[var(--color-ink)] shadow-[4px_4px_0_var(--color-ink)] overflow-hidden flex items-center justify-center">
                  <Image
                    src="/avatar.png"
                    alt="V — founder of vnbuildr"
                    width={576}
                    height={576}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="text-center">
                  <p className="font-serif text-[22px] font-normal tracking-tight">V</p>
                  <p className="text-[13px] text-[var(--color-ink-muted)] mt-1">{t.about.role}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-ink-muted)] bg-white border border-[var(--color-border)] px-3 py-1.5 rounded-full">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                    <path d="M5 0C3.07 0 1.5 1.57 1.5 3.5c0 2.625 3.5 7 3.5 7s3.5-4.375 3.5-7C8.5 1.57 6.93 0 5 0zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill="currentColor"/>
                  </svg>
                  {t.about.location}
                </div>
              </div>

              {/* Right: copy */}
              <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-3">
                    {t.about.label}
                  </p>
                  <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-normal tracking-tight leading-[1.15] mb-5">
                    {t.about.heading}
                  </h2>
                  <p className="text-[15px] text-[var(--color-ink-muted)] leading-[1.75] mb-3">
                    {t.about.bio1}
                  </p>
                  <p className="text-[15px] text-[var(--color-ink-muted)] leading-[1.75]">
                    {t.about.bio2}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {t.about.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 rounded text-[var(--color-ink-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "How can you build and deploy a custom website so quickly?",
    a: "Traditional web agencies spend weeks manually drawing static layouts in Figma before rewriting them from scratch. I work differently — by pairing deep frontend engineering expertise with the world's leading UI design systems, I write clean, production-ready code from day one. This allows me to deliver beautiful, functional websites in days rather than months.",
  },
  {
    q: "How much does a website cost in Malaysia?",
    a: "Website design in Malaysia typically ranges from RM1,000 to RM10,000+ depending on scope and the provider. At vnbuildr, packages start at RM1,299 for a single-page landing page (Starter), RM2,899 for a 5-page business website (Business), RM3,799 for a 10-page site (Pro), and from RM3,999 for fully custom builds. Domain registration and hosting are separate costs — typically RM50–RM300 per year depending on your provider.",
  },
  {
    q: "What is a landing page? Is it the same as a website?",
    a: "A landing page is a single, focused web page built around one goal — usually to capture a lead, promote an offer, or get someone to contact you. A full website has multiple pages (Home, About, Services, Portfolio, Contact, etc.) and covers your entire business. A landing page is faster to build, more affordable, and more effective when you have one clear message. Many businesses start with a landing page and grow into a full website over time. At vnbuildr, our Starter package is a polished single-page site, while Business and Pro packages cover multi-page websites.",
  },
  {
    q: "How long does it take to complete a website?",
    a: (
      <span className="flex flex-col gap-3">
        <span>· Starter (1 page): <strong>2–3 working days</strong></span>
        <span>· Business (5 pages): <strong>3–7 working days</strong></span>
        <span>· Pro (10 pages): <strong>4–8 working days</strong></span>
        <span>· Custom (10–25 pages): <strong>8–15 working days</strong></span>
        <span className="mt-2 opacity-70">These timelines require your content and brand assets to be ready at kickoff.</span>
      </span>
    ),
  },
  {
    q: "What materials do I need to provide before we start?",
    a: "Copywriting is included — I write the page copy for you. What helps most is having your high-resolution logo, primary brand colors, and any product photos or graphics ready to share. The more brand context you can give me upfront, the faster we hit the launch timeline.",
  },
  {
    q: "Can I provide my own design?",
    a: "Yes! If you already have a complete mockup or a Figma blueprint, I can act strictly as your developer. I will translate your static design files into pixel-perfect, clean React/Tailwind or static HTML/CSS code in record time.",
  },
  {
    q: "Will my website be mobile-friendly?",
    a: "Yes, 100%. Every block I build is engineered to be responsive from the ground up. Your website will adapt fluidly and look premium on smartphones, tablets, and large desktop screens alike.",
  },
  {
    q: "What is your payment term?",
    a: "I operate on a straightforward 50/50 payment schedule. A 50% non-refundable deposit is required upfront to secure your development window. The remaining 50% balance is due upon project completion, right after you approve the staging link and before final code handover or domain transfer.",
  },
  {
    q: "Can I request a refund?",
    a: "The initial 50% deposit is non-refundable as it locks in your slot on my calendar and covers the intensive development labor during kickoff. Once coding has commenced, resources are fully committed to your project.",
  },
  {
    q: "Can I remove any design or attribution branding?",
    a: "No. A small 'Built by vnbuildr' credit is included in the footer of every project. This is a standard part of the agreement and helps support the work. It is subtle, unobtrusive, and does not interfere with your brand — but it is non-negotiable.",
  },
  {
    q: "Can I download the source code or use it to DIY my website later?",
    a: "Yes. You receive the full source code upon project completion and final payment. You're free to host it anywhere, modify it, or hand it off to another developer — no lock-in.",
  },
  {
    q: "If I cancel my hosting or contract, do I keep my domain and data?",
    a: "Yes. You have complete ownership. Because I write raw, native code instead of locking you into a proprietary website builder subscription, you own your source files. Your domain and repository data can be hosted absolutely anywhere, anytime, completely independent of me.",
  },
  {
    q: "Do you provide after-sales support?",
    a: "Every project includes a standard 14-day post-launch support window to fix any unexpected bugs or display glitches. If you need ongoing maintenance, text edits, or periodic updates after that, I offer a predictable monthly support retainer based on your needs.",
  },
  {
    q: "Do you use templates like WordPress, Wix, or Squarespace?",
    a: "No. Every page is hand-crafted using clean, lightweight code frameworks. This ensures your site loads instantly on mobile devices, stays entirely customizable, and never suffers from heavy, broken plugin updates.",
  },
  {
    q: "Do you handle marketing or SEO campaigns?",
    a: "Basic page copywriting is included — I write the headlines, section copy, and CTAs for your landing page as part of every project. What I don't offer is broader marketing strategy, paid ad management, or ongoing SEO campaigns. If you need those, have them planned out before kickoff and I'll make sure the page is built to support them.",
  },
];

function FAQ() {
  const t = useT()
  const locale = useLocale()
  const faqItems = locale === "zh" ? t.faq.items : faqs
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-[720px] mx-auto">
        <FadeUp className="text-center mb-14">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            {t.faq.label}
          </p>
          <h2 className="font-serif text-[clamp(30px,4vw,46px)] font-normal tracking-tight leading-[1.1]">
            {t.faq.heading}
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
        <div className="neo-card overflow-hidden divide-y divide-[var(--color-ink)]/10">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className="bg-white">
              <button
                className="w-full flex items-start justify-between gap-4 px-5 py-4 md:px-8 md:py-5 text-left hover:bg-[var(--color-surface)] transition-colors group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-[15px] font-semibold tracking-tight leading-relaxed">{q}</span>
                <span
                  className="shrink-0 mt-0.5 w-6 h-6 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-5 pt-3 pb-6 md:px-8 md:pt-4 md:pb-8 text-[14px] text-[var(--color-ink-muted)] leading-[1.85]">
                  {a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── FAQ schema ───────────────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can you build and deploy a custom website so quickly?",
      "acceptedAnswer": { "@type": "Answer", "text": "Traditional web agencies spend weeks manually drawing static layouts in Figma before rewriting them from scratch. I work differently — by pairing deep frontend engineering expertise with the world's leading UI design systems, I write clean, production-ready code from day one. This allows me to deliver beautiful, functional websites in days rather than months." },
    },
    {
      "@type": "Question",
      "name": "How much does a website cost in Malaysia?",
      "acceptedAnswer": { "@type": "Answer", "text": "Website design in Malaysia typically ranges from RM1,000 to RM10,000+ depending on scope. At vnbuildr, packages start at RM1,299 for a single-page landing page (Starter), RM2,899 for a 5-page business website (Business), RM3,799 for a 10-page site (Pro), and from RM3,999 for fully custom builds. Domain and hosting are separate costs." },
    },
    {
      "@type": "Question",
      "name": "What is a landing page? Is it the same as a website?",
      "acceptedAnswer": { "@type": "Answer", "text": "A landing page is a single, focused web page built around one goal — usually to capture a lead, promote an offer, or get someone to contact you. A full website has multiple pages covering your entire business. A landing page is faster to build, more affordable, and more effective when you have one clear message. Many businesses start with a landing page and grow into a full website over time." },
    },
    {
      "@type": "Question",
      "name": "How long does it take to complete a website?",
      "acceptedAnswer": { "@type": "Answer", "text": "Starter (1 page): 2–3 working days. Business (5 pages): 3–7 working days. Pro (10 pages): 4–8 working days. Custom (10–25 pages): 8–15 working days. These timelines require your content and brand assets to be ready at kickoff." },
    },
    {
      "@type": "Question",
      "name": "What materials do I need to provide before we start?",
      "acceptedAnswer": { "@type": "Answer", "text": "Copywriting is included — I write the page copy for you. What helps most is having your high-resolution logo, primary brand colors, and any product photos or graphics ready to share. The more brand context you can give me upfront, the faster we hit the launch timeline." },
    },
    {
      "@type": "Question",
      "name": "Can I provide my own design?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes! If you already have a complete mockup or a Figma blueprint, I can act strictly as your developer. I will translate your static design files into pixel-perfect, clean React/Tailwind or static HTML/CSS code in record time." },
    },
    {
      "@type": "Question",
      "name": "Will my website be mobile-friendly?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100%. Every block I build is engineered to be responsive from the ground up. Your website will adapt fluidly and look premium on smartphones, tablets, and large desktop screens alike." },
    },
    {
      "@type": "Question",
      "name": "What is your payment term?",
      "acceptedAnswer": { "@type": "Answer", "text": "I operate on a straightforward 50/50 payment schedule. A 50% non-refundable deposit is required upfront to secure your development window. The remaining 50% balance is due upon project completion, right after you approve the staging link and before final code handover or domain transfer." },
    },
    {
      "@type": "Question",
      "name": "Can I request a refund?",
      "acceptedAnswer": { "@type": "Answer", "text": "The initial 50% deposit is non-refundable as it locks in your slot on my calendar and covers the intensive development labor during kickoff. Once coding has commenced, resources are fully committed to your project." },
    },
    {
      "@type": "Question",
      "name": "Can I remove any design or attribution branding?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. A small 'Built by vnbuildr' credit is included in the footer of every project. This is a standard part of the agreement and helps support the work. It is subtle, unobtrusive, and does not interfere with your brand — but it is non-negotiable." },
    },
    {
      "@type": "Question",
      "name": "Can I download the source code or use it to DIY my website later?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. You receive the full source code upon project completion and final payment. You're free to host it anywhere, modify it, or hand it off to another developer — no lock-in." },
    },
    {
      "@type": "Question",
      "name": "If I cancel my hosting or contract, do I keep my domain and data?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. You have complete ownership. Because I write raw, native code instead of locking you into a proprietary website builder subscription, you own your source files. Your domain and repository can be hosted absolutely anywhere, anytime, completely independent of me." },
    },
    {
      "@type": "Question",
      "name": "Do you provide after-sales support?",
      "acceptedAnswer": { "@type": "Answer", "text": "Every project includes a standard 14-day post-launch support window to fix any unexpected bugs or display glitches. If you need ongoing maintenance, text edits, or periodic updates after that, I offer a predictable monthly support retainer based on your needs." },
    },
    {
      "@type": "Question",
      "name": "Do you use templates like WordPress, Wix, or Squarespace?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Every page is hand-crafted using clean, lightweight code frameworks. This ensures your site loads instantly on mobile devices, stays entirely customizable, and never suffers from heavy, broken plugin updates." },
    },
    {
      "@type": "Question",
      "name": "Do you handle marketing or SEO campaigns?",
      "acceptedAnswer": { "@type": "Answer", "text": "Basic page copywriting is included — I write the headlines, section copy, and CTAs for your landing page as part of every project. What I don't offer is broader marketing strategy, paid ad management, or ongoing SEO campaigns. If you need those, have them planned out before kickoff and I'll make sure the page is built to support them." },
    },
  ],
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function Home() {
  const [animOn, setAnimOn] = useState(true)
  const pathname = usePathname()
  const locale: Locale = pathname.startsWith("/zh") ? "zh" : "en"
  const t = translations[locale]

  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <LocaleCtx.Provider value={{ t, locale }}>
      <AnimContext.Provider value={{ on: animOn, set: setAnimOn }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <Nav />
        <main>
          <Hero />
          <WhyWebsite />
          <HowItWorks />
          <Features />
          <Pricing />
          <Testimonials />
          <About />
          <FAQ />
          <CtaSection />
        </main>
        <AnimatePresence>
          {showTop && (
            <motion.button
              key="back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              initial={{ opacity: 0, scale: 0.8, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              aria-label="Back to top"
              className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-[var(--color-ink)] text-white border-2 border-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)] rounded-full"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        <FooterSection />
      </AnimContext.Provider>
    </LocaleCtx.Provider>
  );
}
