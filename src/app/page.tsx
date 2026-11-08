"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
import { track } from "@vercel/analytics";
import { translations } from "@/lib/i18n";
import { scrollToSection } from "@/lib/scroll";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { TextRotate } from "@/components/ui/text-rotate";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FooterSection } from "@/components/ui/footer-section";
import {
  Code2, PenTool, Layers, Type, Palette,
  MousePointer2, LayoutTemplate, Zap, Smartphone, Globe,
} from "lucide-react";

// ─── Animation toggle context ─────────────────────────────────────────────────
const AnimContext = createContext<{ on: boolean; set: (v: boolean) => void }>({
  on: true,
  set: () => {},
})

const useT = () => translations

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
    ["/pricing",  t.nav.pricing],
    ["/blog",     t.nav.blog],
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
          <a href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page" target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "nav_desktop" })} className="whatsapp-glow text-sm font-medium bg-[#25D366] text-white px-5 py-2.5 rounded-full hover:opacity-85 transition-opacity">
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
                      href.startsWith("#") ? (
                        <a key={href} href={href} onClick={e => handleNavClick(e, href)}
                          className="block text-[14px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] px-4 py-2.5 transition-colors">
                          {label}
                        </a>
                      ) : (
                        <Link key={href} href={href} onClick={close}
                          className="block text-[14px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] px-4 py-2.5 transition-colors">
                          {label}
                        </Link>
                      )
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
          <a href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page" target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "nav_mobile" })} className="whatsapp-glow text-sm mobile-landscape:text-xs font-medium bg-[#25D366] text-white px-4 mobile-landscape:px-3 py-2 mobile-landscape:py-1.5 rounded-full hover:opacity-85 transition-opacity">
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
                      href.startsWith("#") ? (
                        <a key={href} href={href} onClick={e => handleNavClick(e, href)}
                          className="block text-[14px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] px-4 py-2.5 transition-colors">
                          {label}
                        </a>
                      ) : (
                        <Link key={href} href={href} onClick={close}
                          className="block text-[14px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] px-4 py-2.5 transition-colors">
                          {label}
                        </Link>
                      )
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
  headline?: React.ReactNode
  subheadline?: string
}

function Hero({
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

        <motion.div
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
        </motion.div>

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
            onClick={() => track("whatsapp_click", { location: "hero_primary" })}
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
      text: "Explain what you offer",
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><polyline points="2,14 6,9 10,12 16,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="12,4 16,4 16,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      text: "Build customer trust",
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/></svg>,
    },
    {
      text: "Look professional on mobile",
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 1.5L2.5 5v4.5C2.5 13.5 5.5 16 9 17c3.5-1 6.5-3.5 6.5-7.5V5L9 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      text: "Guide visitors towards an enquiry",
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5.5V9l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
  ]

  return (
    <section className="py-16 md:py-20 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto">

        {/* Centered header */}
        <FadeUp className="text-center mb-10">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            A clearer online presence
          </p>
          <h2 className="font-serif text-[clamp(30px,4vw,48px)] font-normal tracking-tight leading-[1.1] mb-5">
            Make your business easy to understand
            <br />
            <span className="text-[var(--color-blue)]">and easy to contact.</span>
          </h2>
          <p className="text-[16px] text-[var(--color-ink-muted)] leading-[1.75] max-w-[520px] mx-auto">
            A clear website helps customers understand your value, trust your business, and know what to do next.
          </p>
        </FadeUp>

        {/* 2×2 bullet grid */}
        <FadeUp delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-4">
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
        </FadeUp>

      </div>
    </section>
  )
}

function WhyVnbuildr() {
  const reasons = [
    "Direct communication",
    "Clear pricing",
    "Fast delivery",
    "Full ownership",
  ]

  return (
    <section className="py-16 md:py-20 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp className="text-center mb-10">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">Why vnbuildr</p>
          <h2 className="font-serif text-[clamp(30px,4vw,48px)] font-normal tracking-tight leading-[1.1] mb-4">
            A simpler way to
            <br />
            <span className="text-[var(--color-blue)]">build your website.</span>
          </h2>
          <p className="text-[16px] text-[var(--color-ink-muted)] leading-[1.7] max-w-[540px] mx-auto">
            Work directly with the person designing and building your website.
          </p>
        </FadeUp>
        <FadeUp delay={0.08} className="neo-card bg-white grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
          {reasons.map((reason, i) => (
            <div key={reason} className="flex items-center gap-3 px-5 py-5">
              <span className="text-[11px] font-bold text-[var(--color-blue)]">0{i + 1}</span>
              <span className="text-[14px] font-semibold text-[var(--color-ink)]">{reason}</span>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const packages = [
    {
      tier: "Starter",
      name: "Landing Page",
      price: "RM1,299",
      timeline: "5–7 working days",
      bestFor: "Best for one offer, campaign, or new business.",
      outcome: "One focused page designed to generate enquiries.",
      highlights: ["One focused page", "WhatsApp and enquiry form", "Basic Google setup"],
    },
    {
      tier: "Business · Most Popular",
      name: "Business Website",
      price: "RM3,499",
      timeline: "2–3 weeks",
      bestFor: "Best for established SMEs that need trust and enquiries.",
      outcome: "A complete company website that builds trust.",
      highlights: ["Up to 5 core pages", "Quotation enquiry form", "Analytics and Google setup"],
      featured: true,
    },
    {
      tier: "Growth",
      name: "Website + Automation",
      price: "RM5,999+",
      timeline: "3–4 weeks",
      bestFor: "Best for businesses that need organised lead follow-up.",
      outcome: "A website with a simple enquiry follow-up system.",
      highlights: ["Up to 5 core pages", "Enquiry saved → alert sent → follow-up prepared", "Simple customer record setup"],
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-20 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">

        <FadeUp className="text-center mb-10">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">Pricing</p>
          <h2 className="font-serif text-[clamp(30px,4vw,48px)] font-normal tracking-tight leading-[1.1] mb-4">
            What does your business
            <br />
            <span className="text-[var(--color-blue)]">need right now?</span>
          </h2>
          <p className="text-[16px] text-[var(--color-ink-muted)] leading-[1.65] max-w-[520px] mx-auto">
            Start with the outcome you need. You can compare the full scope before making any commitment.
          </p>
        </FadeUp>

        {/* Outcome-led package cards */}
        <FadeUp delay={0.04} className="mb-12">
          <div className="grid md:grid-cols-3 gap-5">
            {packages.map(({ tier, name, price, timeline, bestFor, outcome, highlights, featured }, i) => (
              <motion.div
                key={name}
                className="neo-card overflow-hidden flex h-full flex-col"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 34 } }}
              >
                <div className={`p-6 md:p-7 md:min-h-[194px] ${featured ? "bg-[var(--color-blue)] text-white" : "bg-white"}`}>
                  <p className={`text-[10px] font-bold tracking-[0.08em] uppercase mb-3 ${featured ? "text-white/70" : "text-[var(--color-ink-muted)]"}`}>{tier}</p>
                  <h3 className="font-serif text-[23px] font-normal tracking-tight mb-1">{name}</h3>
                  <p className="font-serif text-[32px] font-normal tracking-tight leading-none mb-2">{price}</p>
                  <p className={`text-[12px] ${featured ? "text-white/70" : "text-[var(--color-ink-muted)]"}`}>{timeline}</p>
                </div>
                <div className="p-6 md:p-7 bg-[var(--color-surface)] flex flex-col flex-1">
                  <p className="text-[12px] font-semibold text-[var(--color-blue)] leading-[1.5] mb-3 md:min-h-[36px]">{bestFor}</p>
                  <p className="text-[14px] font-semibold text-[var(--color-ink)] leading-[1.55] mb-5 md:min-h-[44px]">{outcome}</p>
                  <ul className="space-y-2.5 mt-auto">
                    {highlights.map(item => (
                      <li key={item} className="flex items-start gap-2 text-[12px] text-[var(--color-ink-muted)]">
                        <span className="text-[var(--color-blue)] mt-[1px]" aria-hidden="true">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.12} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 text-[14px] font-medium bg-[var(--color-ink)] text-white px-6 py-3 rounded-full"
          >
            Compare full package details
            <ArrowRight />
          </Link>
          <a
            href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20not%20sure%20which%20website%20package%20fits%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "package_help_home" })}
            className="inline-flex items-center justify-center gap-2 text-[14px] font-medium border-2 border-[var(--color-ink)] text-[var(--color-ink)] px-6 py-[10px] rounded-full"
          >
            Help me choose
          </a>
        </FadeUp>

      </div>
    </section>
  )
}

function OtherNeeds() {
  return (
    <section className="py-16 md:py-20 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[900px] mx-auto">
        <FadeUp className="text-center mb-10">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">Need something different?</p>
          <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-normal tracking-tight leading-[1.1]">
            Already have a website,
            <br />
            <span className="text-[var(--color-blue)]">or need something custom?</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <div className="grid md:grid-cols-2 rounded-lg border border-[var(--color-border)] bg-white overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
            <div id="free-review" className="p-6 md:p-8 flex h-full flex-col">
              <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-blue)] mb-2">My current website needs improvement</p>
              <h3 className="font-serif text-[24px] tracking-tight mb-3">Get a free 5-point website review</h3>
              <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.7] mb-5">Get five practical recommendations to improve your current website within 2 working days.</p>
              <a
                href="https://wa.me/60199195314?text=Hi%2C%20I%27d%20like%20a%20free%20review%20of%20my%20current%20website"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "free_review_home" })}
                className="mt-auto self-start inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-blue)] hover:underline"
              >
                Get my free review <ArrowRight />
              </a>
            </div>
            <div className="p-6 md:p-8 flex h-full flex-col">
              <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-blue)] mb-2">E-commerce or custom requirements</p>
              <h3 className="font-serif text-[24px] tracking-tight mb-3">Request a custom quote</h3>
              <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.7] mb-5">For online stores, booking systems, multilingual websites, and custom requirements.</p>
              <a
                href={`https://wa.me/60199195314?text=${encodeURIComponent("Hi, I'd like to discuss a custom website project")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "custom_quote_home" })}
                className="mt-auto self-start inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-blue)] hover:underline"
              >
                Discuss my project <ArrowRight />
              </a>
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
    <section id="how" className="py-16 md:py-20 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp className="text-center mb-10">
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
              className="neo-card bg-white p-6 md:p-10 flex h-full flex-col"
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
              <div className="mt-auto pt-5 text-[12px] font-semibold text-[var(--color-ink-muted)] tracking-widest uppercase flex items-center gap-2">
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

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const t = useT()
  return (
    <section className="py-16 md:py-20 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp className="mb-10">
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
                <Link href="/portfolio" className="text-[12px] font-semibold text-[var(--color-blue)] hover:underline">
                  View project →
                </Link>
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

  const packages = ["Landing Page", "Business Website", "Website + Automation", "Free Website Review / Redesign", "E-Commerce / Custom", "Not sure yet"]
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
    track("whatsapp_click", { location: "contact_form", package: pkg || "not_specified" })
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
    <section id="contact" className="py-16 md:py-20 px-6 bg-[var(--color-ink)]">
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
    <section className="py-16 md:py-20 px-6 bg-[var(--color-surface)]">
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
                  {t.about.bio2 ? (
                    <p className="text-[15px] text-[var(--color-ink-muted)] leading-[1.75]">{t.about.bio2}</p>
                  ) : null}
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
    q: "Which package should I choose?",
    a: "Choose a Landing Page when you have one clear offer or campaign. Choose a Business Website when customers need several pages to understand and trust your company. Choose Website + Automation when you also need enquiries organised and followed up. If you're unsure, message me and I'll recommend the simplest option that fits.",
  },
  {
    q: "How long does it take to complete a website?",
    a: (
      <span className="flex flex-col gap-3">
        <span>· Landing Page: <strong>5–7 working days</strong></span>
        <span>· Business Website: <strong>2–3 weeks</strong></span>
        <span>· Website + Automation: <strong>3–4 weeks</strong></span>
        <span>· E-Commerce / Custom: <strong>Scoped individually</strong></span>
        <span className="mt-2 opacity-70">These timelines require your content and brand assets to be ready at kickoff.</span>
      </span>
    ),
  },
  {
    q: "What do I need to provide before we start?",
    a: "Your logo, brand colours, product or business photos, and a short explanation of what you offer are enough to begin. I write the core website copy for you and guide you through anything else needed.",
  },
  {
    q: "Is copywriting included?",
    a: "Yes. I write the core headlines, section copy, and calls to action needed for your website. Blog articles, full brand strategy, professional photography, advertising, and ongoing marketing are not included, so you will need to provide these or arrange them with a specialist if required.",
  },
  {
    q: "What happens after my website launches?",
    a: "Every project includes 14 days of post-launch support for unexpected bugs or display issues. If you need regular updates after that, monthly Website Care Plans start from RM99.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": typeof a === "string"
        ? a
        : "Landing Page: 5–7 working days. Business Website: 2–3 weeks. Website + Automation: 3–4 weeks. E-Commerce and custom projects are scoped individually. These timelines require your content and brand assets to be ready at kickoff.",
    },
  })),
}

function FAQ() {
  const t = useT()
  const faqItems = faqs
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-20 px-6 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[720px] mx-auto">
        <FadeUp className="text-center mb-10">
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

// ─── Page root ────────────────────────────────────────────────────────────────
export default function Home() {
  const [animOn, setAnimOn] = useState(true)

  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimContext.Provider value={{ on: animOn, set: setAnimOn }}>
      <Nav />
      <main>
        <Hero />
        <WhyWebsite />
        <HowItWorks />
        <WhyVnbuildr />
        <Pricing />
        <OtherNeeds />
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
  );
}
