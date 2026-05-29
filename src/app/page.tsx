"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
import { translations, type Locale, type Translations } from "@/lib/i18n";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { TextRotate } from "@/components/ui/text-rotate";
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

function scrollToSection(href: string, dropdownAdjust = 0) {
  const el = document.querySelector(href)
  if (!el) return
  const target = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 8 - dropdownAdjust
  const start = window.scrollY
  const distance = target - start
  const duration = 420
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

  const close = () => setOpen(false)

  const NAV_LINKS: [string, string][] = [
    ["#how",      t.nav.how],
    ["#features", t.nav.features],
    ["#track",    t.nav.track],
    ["#faq",      t.nav.faq],
    ["#contact",  t.nav.contact],
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const dropdownEl = document.querySelector('[data-nav-dropdown]')
    const dropdownAdjust = dropdownEl ? (dropdownEl as HTMLElement).scrollHeight : 0
    close()
    scrollToSection(href, dropdownAdjust)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); close() }} className="font-serif text-[22px] tracking-tight">
          <span className="text-[var(--color-blue)] font-bold">vn</span><em>buildr</em>
        </Link>

        {/* Desktop right */}
        <div className="hidden md:flex mobile-landscape:hidden items-center gap-4">
          <a href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page" target="_blank" rel="noopener noreferrer" className="whatsapp-glow text-sm font-medium bg-[#25D366] text-white px-5 py-2.5 rounded-full hover:opacity-85 transition-opacity">
            {t.nav.getInTouch}
          </a>
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
        </div>

        {/* Mobile right: CTA + burger */}
        <div className="flex md:hidden mobile-landscape:flex items-center gap-2">
          <a href="https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page" target="_blank" rel="noopener noreferrer" className="whatsapp-glow text-sm mobile-landscape:text-xs font-medium bg-[#25D366] text-white px-4 mobile-landscape:px-3 py-2 mobile-landscape:py-1.5 rounded-full hover:opacity-85 transition-opacity">
            <span className="mobile-landscape:hidden">{t.nav.getInTouch}</span>
            <span className="hidden mobile-landscape:inline">{t.nav.chat}</span>
          </a>
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
        </div>
      </div>

      {/* Nav dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-menu"
            data-nav-dropdown=""
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white border-b border-[var(--color-border)]"
          >
            <div className="px-6 py-4 mobile-landscape:py-2 flex flex-col mobile-landscape:grid mobile-landscape:grid-cols-2 mobile-landscape:gap-x-4 mobile-landscape:max-h-[calc(100vh-60px)] mobile-landscape:overflow-y-auto">
              {NAV_LINKS.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={e => handleNavClick(e, href)}
                  className="text-[15px] mobile-landscape:text-[13px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] py-3 mobile-landscape:py-2 border-b border-[var(--color-border)] transition-colors"
                >
                  {label}
                </a>
              ))}
              <Link href="/portfolio" onClick={close} className="text-[15px] mobile-landscape:text-[13px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] py-3 mobile-landscape:py-2 border-b border-[var(--color-border)] transition-colors">
                {t.nav.portfolio}
              </Link>
              <div className="pt-4 mobile-landscape:pt-2 mobile-landscape:col-span-2 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[var(--color-ink-muted)] uppercase tracking-wide">{t.nav.animation}</span>
                <AnimToggle on={on} set={set} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const floatingIcons = [
  { icon: Code2,          label: "Clean code",      delay: 0.5,  rotate: "-rotate-[6deg]",  bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: PenTool,        label: "Vector design",   delay: 0.65, rotate: "rotate-[4deg]",   bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { icon: Layers,         label: "Layouts",         delay: 0.8,  rotate: "-rotate-[3deg]",  bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: Type,           label: "Typography",      delay: 0.95, rotate: "rotate-[5deg]",   bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { icon: Palette,        label: "Brand colours",   delay: 1.1,  rotate: "-rotate-[5deg]",  bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: MousePointer2,  label: "UX / CRO",        delay: 1.2,  rotate: "rotate-[3deg]",   bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { icon: LayoutTemplate, label: "Responsive",      delay: 0.7,  rotate: "rotate-[6deg]",   bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: Zap,            label: "Fast delivery",   delay: 0.9,  rotate: "-rotate-[4deg]",  bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { icon: Smartphone,     label: "Mobile-first",    delay: 1.05, rotate: "rotate-[7deg]",   bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { icon: Globe,          label: "Ready to launch", delay: 1.15, rotate: "-rotate-[3deg]",  bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
];

const floatingSymbols = [
  { symbol: ";",   label: "Semicolon",  delay: 0.55, rotate: "rotate-[5deg]",   bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { symbol: "{ }", label: "Block",      delay: 0.72, rotate: "-rotate-[4deg]",  bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { symbol: "( )", label: "Params",     delay: 0.88, rotate: "rotate-[3deg]",   bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { symbol: "==",  label: "Compare",    delay: 0.62, rotate: "-rotate-[5deg]",  bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
  { symbol: "!=",  label: "Not equal",  delay: 0.92, rotate: "rotate-[6deg]",   bg: "bg-[#eef3ff]", color: "text-[var(--color-blue)]" },
  { symbol: '""',  label: "String",     delay: 1.05, rotate: "-rotate-[3deg]",  bg: "bg-[#f0ede8]", color: "text-[var(--color-ink)]"  },
];

function IconPill({ icon: Icon, label, rotate, bg, color }: Omit<typeof floatingIcons[0], "delay">) {
  return (
    <div className={`flex items-center gap-2 ${bg} ${rotate} px-3 py-2 rounded-xl shadow-md border border-[var(--color-border)] cursor-default select-none`}>
      <Icon size={16} className={`${color} shrink-0`} />
      <span className={`text-[12px] font-medium ${color} whitespace-nowrap`}>{label}</span>
    </div>
  );
}

function SymbolPill({ symbol, label, rotate, bg, color }: Omit<typeof floatingSymbols[0], "delay">) {
  return (
    <div className={`flex items-center gap-2 ${bg} ${rotate} px-3 py-2 rounded-xl shadow-md border border-[var(--color-border)] cursor-default select-none`}>
      <span className={`text-[13px] font-mono font-bold ${color} shrink-0 min-w-[18px] text-center leading-none`}>{symbol}</span>
      <span className={`text-[12px] font-medium ${color} whitespace-nowrap`}>{label}</span>
    </div>
  );
}

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
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
    <section className="relative w-full min-h-[calc(100vh-60px)] mobile-landscape:min-h-0 mobile-landscape:py-8 overflow-hidden flex flex-col items-center justify-center">
      {/* Mouse-follow parallax elements — toggled via AnimContext */}
      <AnimatePresence>
        {on && (
          <motion.div
            key="parallax"
            className="absolute inset-0 pointer-events-none hidden md:block mobile-landscape:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Floating sensitivity={0.8} easingFactor={0.04}>
              {/* Top-left cluster */}
              <FloatingElement depth={2}  className="top-[8%]  left-[3%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.40, type:"spring", stiffness:300, damping:26 }}><IconPill   {...floatingIcons[0]}   /></motion.div></FloatingElement>
              <FloatingElement depth={1}  className="top-[22%] left-[6%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.52, type:"spring", stiffness:300, damping:26 }}><SymbolPill {...floatingSymbols[0]} /></motion.div></FloatingElement>
              <FloatingElement depth={3}  className="top-[38%] left-[2%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.65, type:"spring", stiffness:300, damping:26 }}><IconPill   {...floatingIcons[4]}   /></motion.div></FloatingElement>
              <FloatingElement depth={1.5}className="top-[55%] left-[5%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.73, type:"spring", stiffness:300, damping:26 }}><SymbolPill {...floatingSymbols[3]} /></motion.div></FloatingElement>

              {/* Top-right cluster */}
              <FloatingElement depth={2}  className="top-[6%]  right-[4%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.44, type:"spring", stiffness:300, damping:26 }}><IconPill   {...floatingIcons[1]}   /></motion.div></FloatingElement>
              <FloatingElement depth={1}  className="top-[20%] right-[7%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.56, type:"spring", stiffness:300, damping:26 }}><SymbolPill {...floatingSymbols[1]} /></motion.div></FloatingElement>
              <FloatingElement depth={2.5}className="top-[35%] right-[3%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.68, type:"spring", stiffness:300, damping:26 }}><IconPill   {...floatingIcons[6]}   /></motion.div></FloatingElement>
              <FloatingElement depth={1}  className="top-[52%] right-[6%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.77, type:"spring", stiffness:300, damping:26 }}><SymbolPill {...floatingSymbols[4]} /></motion.div></FloatingElement>

              {/* Bottom-left cluster */}
              <FloatingElement depth={1.5}className="bottom-[22%] left-[4%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.60, type:"spring", stiffness:300, damping:26 }}><IconPill   {...floatingIcons[2]}   /></motion.div></FloatingElement>
              <FloatingElement depth={2}  className="bottom-[10%] left-[7%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.70, type:"spring", stiffness:300, damping:26 }}><SymbolPill {...floatingSymbols[2]} /></motion.div></FloatingElement>
              <FloatingElement depth={1}  className="bottom-[8%]  left-[20%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.80, type:"spring", stiffness:300, damping:26 }}><IconPill   {...floatingIcons[8]}   /></motion.div></FloatingElement>

              {/* Bottom-right cluster */}
              <FloatingElement depth={2}  className="bottom-[20%] right-[5%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.62, type:"spring", stiffness:300, damping:26 }}><IconPill   {...floatingIcons[3]}   /></motion.div></FloatingElement>
              <FloatingElement depth={1.5}className="bottom-[9%]  right-[8%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.72, type:"spring", stiffness:300, damping:26 }}><IconPill   {...floatingIcons[7]}   /></motion.div></FloatingElement>
              <FloatingElement depth={1}  className="bottom-[7%]  right-[20%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.82, type:"spring", stiffness:300, damping:26 }}><SymbolPill {...floatingSymbols[5]} /></motion.div></FloatingElement>
              <FloatingElement depth={3}  className="bottom-[18%] right-[22%]"><motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.48, type:"spring", stiffness:300, damping:26 }}><IconPill   {...floatingIcons[9]}   /></motion.div></FloatingElement>
            </Floating>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centre content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-[680px] pointer-events-auto">
        <motion.h1
          className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-5 mobile-landscape:mb-2"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {headline ?? t.hero.label}
        </motion.h1>

        <motion.p
          className="font-serif text-[clamp(38px,6vw,72px)] mobile-landscape:text-[clamp(22px,4vw,36px)] font-normal leading-[1.08] tracking-tight mb-6 mobile-landscape:mb-2"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {subheadline ?? t.hero.subheadline}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
          <a
            href="#how"
            className="inline-flex items-center text-[15px] font-medium px-6 py-3 rounded-full border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors"
          >
            {t.hero.secondaryCta}
          </a>
        </motion.div>

        <motion.p
          className="text-[13px] text-[var(--color-ink-muted)]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.54, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.trustLine}
        </motion.p>

        {/* Mode explanation pill — hidden on phone landscape to save vertical space */}
        <div className="mobile-landscape:hidden w-full flex justify-center">
        <AnimatePresence mode="wait">
          {on ? (
            <motion.div
              key="react-mode"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-5 flex flex-wrap items-center gap-2 px-4 py-2 bg-[#eef3ff] border-2 border-[var(--color-blue)] shadow-[3px_3px_0_var(--color-blue)] rounded text-[12px] font-semibold text-[var(--color-blue)]"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="flex items-center"
              >
                <Zap size={12} className="fill-current shrink-0" />
              </motion.span>
              <span>{t.hero.reactMode}</span>
            </motion.div>
          ) : (
            <motion.div
              key="static-mode"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-5 flex flex-wrap items-center gap-2 px-4 py-2 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)] rounded text-[12px] font-semibold text-[var(--color-ink-muted)]"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-ink-muted)] shrink-0" />
              <span>{t.hero.staticMode}</span>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const t = useT()
  const steps = t.how.steps

  return (
    <section id="how" className="py-16 md:py-24 px-6 bg-[var(--color-surface)]">
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
              transition={{ type: "spring", stiffness: 320, damping: 26, delay: i * 0.06 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 26 } }}
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
    <section id="features" className="py-16 md:py-24 px-6 bg-white">
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
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 26 } }}
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
    <section className="py-16 md:py-24 px-6 bg-white">
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
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 26 } }}
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

// ─── Dev Tracks ───────────────────────────────────────────────────────────────
function DevTracks() {
  const t = useT()
  const tracks = t.tracks.options.map((o, i) => ({ ...o, featured: i === 0 }))

  return (
    <section id="track" className="py-16 md:py-24 px-6 bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto">
        <FadeUp className="text-center mb-14">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] mb-4">
            {t.tracks.label}
          </p>
          <h2 className="font-serif text-[clamp(30px,4vw,46px)] font-normal tracking-tight leading-[1.1] mb-4">
            {t.tracks.heading.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className="text-[16px] text-[var(--color-ink-muted)] max-w-[540px] mx-auto leading-[1.65]">
            {t.tracks.subheading}
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {tracks.map(({ badge, name, experience, bestFor, bestForLabel, perksLabel, perks, deliveryLabel, delivery, featured }, idx) => (
            <FadeUp key={name} delay={idx * 0.12} className="flex flex-col">
            <motion.div
              className={`bg-white flex flex-col h-full overflow-hidden ${featured ? "neo-card-blue" : "neo-card"}`}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 26 } }}
            >
              {/* Header */}
              <div className={`px-5 pt-6 pb-4 md:px-8 md:pt-8 md:pb-6 border-b ${featured ? "border-[var(--color-blue)]/20" : "border-[var(--color-ink)]/12"}`}>
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full mb-4 ${
                    featured
                      ? "bg-[#eef3ff] text-[var(--color-blue)]"
                      : "bg-[var(--color-surface)] text-[var(--color-ink-muted)]"
                  }`}
                >
                  {featured && (
                    <motion.span
                      animate={{ scale: [1, 1.25, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center"
                    >
                      <Zap size={11} className="shrink-0 fill-current" />
                    </motion.span>
                  )}
                  {badge}
                </span>
                <h3 className="font-serif text-[22px] font-normal tracking-tight mb-2">{name}</h3>
                <p className="text-[13px] italic text-[var(--color-ink-muted)] leading-[1.65]">{experience}</p>
              </div>

              {/* Body */}
              <div className="px-5 py-5 md:px-8 md:py-7 space-y-6 flex-1">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-ink-muted)] mb-2">{bestForLabel}</p>
                  <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.65]">{bestFor}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-ink-muted)] mb-3">{perksLabel}</p>
                  <div className="space-y-4">
                    {perks.map(({ title, body }) => (
                      <div key={title} className="flex gap-3">
                        <span
                          className={`mt-2 shrink-0 w-1.5 h-1.5 rounded-full ${
                            featured ? "bg-[var(--color-blue)]" : "bg-[var(--color-ink-muted)]"
                          }`}
                        />
                        <div>
                          <p className="text-[14px] font-semibold text-[var(--color-ink)] mb-0.5">{title}</p>
                          <p className="text-[13px] text-[var(--color-ink-muted)] leading-[1.65]">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                className={`px-5 py-4 md:px-8 md:py-5 border-t flex items-center justify-between ${
                  featured
                    ? "border-[var(--color-blue)]/20 bg-[#f5f8ff]"
                    : "border-[var(--color-ink)]/12 bg-[var(--color-surface)]"
                }`}
              >
                <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--color-ink-muted)]">
                  {deliveryLabel}
                </p>
                <span
                  className={`text-[15px] font-bold tracking-tight ${
                    featured ? "text-[var(--color-blue)]" : "text-[var(--color-ink)]"
                  }`}
                >
                  {delivery}
                </span>
              </div>
            </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact form ─────────────────────────────────────────────────────────────
interface FormData {
  name: string; email: string; business: string
  scope: string; track: string
  assets: string[]
  budget: string; deadline: string; notes: string
}

const FIELD = "w-full bg-white/[0.08] border-2 border-white/20 rounded px-4 py-3 text-white text-[14px] placeholder:text-white/30 outline-none focus:border-white/50 transition-colors shadow-[3px_3px_0_rgba(255,255,255,0.1)]"
const LABEL = "block text-[13px] font-medium text-white/55 mb-2"

function RadioCard({ label, sub, checked, onClick }: { label: string; sub?: string; checked: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full flex items-start gap-3 p-4 rounded border-2 text-left transition-all duration-150 ${checked ? "border-white/35 bg-white/[0.10] shadow-[3px_3px_0_rgba(255,255,255,0.15)]" : "border-white/15 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/25"}`}>
      <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? "border-[#25D366]" : "border-white/25"}`}>
        {checked && <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />}
      </span>
      <span>
        <span className="block text-[14px] font-medium text-white leading-snug">{label}</span>
        {sub && <span className="block text-[12px] text-white/40 mt-0.5 leading-relaxed">{sub}</span>}
      </span>
    </button>
  )
}

function CheckCard({ label, sub, checked, onClick }: { label: string; sub?: string; checked: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full flex items-start gap-3 p-4 rounded border-2 text-left transition-all duration-150 ${checked ? "border-white/35 bg-white/[0.10] shadow-[3px_3px_0_rgba(255,255,255,0.15)]" : "border-white/15 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/25"}`}>
      <span className={`mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all ${checked ? "border-[#25D366] bg-[#25D366]" : "border-white/25 bg-transparent"}`}>
        {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <span>
        <span className="block text-[14px] font-medium text-white leading-snug">{label}</span>
        {sub && <span className="block text-[12px] text-white/40 mt-0.5 leading-relaxed">{sub}</span>}
      </span>
    </button>
  )
}

function Phase1({ d, s }: { d: FormData; s: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-4">
      <div><label className={LABEL}>Your name</label>
        <input type="text" placeholder="First & last name" value={d.name} onChange={e => s(f => ({ ...f, name: e.target.value }))} className={FIELD} /></div>
      <div><label className={LABEL}>Email address</label>
        <input type="email" placeholder="Where I'll send quotes and code reviews" value={d.email} onChange={e => s(f => ({ ...f, email: e.target.value }))} className={FIELD} /></div>
      <div><label className={LABEL}>Business or project name</label>
        <input type="text" placeholder="Your company or project" value={d.business} onChange={e => s(f => ({ ...f, business: e.target.value }))} className={FIELD} /></div>
    </div>
  )
}

function Phase2({ d, s }: { d: FormData; s: React.Dispatch<React.SetStateAction<FormData>> }) {
  const scopes = [
    { v: "Single-Page Landing Page", sub: "Maps to quick-build options" },
    { v: "Multi-Page Static Website (2–5 pages)", sub: undefined },
    { v: "Advanced App-Ready Web Ecosystem", sub: undefined },
  ]
  const tracks = [
    { v: "React High-Motion Experience", sub: "Fluid transitions, animated components, premium layout interactions — like this site." },
    { v: "Pure HTML & CSS Launch", sub: "Ultra-lightweight raw code, near-instant loading speeds, zero maintenance overhead." },
  ]
  return (
    <div className="space-y-6">
      <div>
        <label className={LABEL}>Primary project scope</label>
        <div className="space-y-2.5">{scopes.map(({ v, sub }) => <RadioCard key={v} label={v} sub={sub} checked={d.scope === v} onClick={() => s(f => ({ ...f, scope: v }))} />)}</div>
      </div>
      <div>
        <label className={LABEL}>Development track</label>
        <div className="space-y-2.5">{tracks.map(({ v, sub }) => <RadioCard key={v} label={v} sub={sub} checked={d.track === v} onClick={() => s(f => ({ ...f, track: v }))} />)}</div>
      </div>
    </div>
  )
}

function Phase3({ d, s }: { d: FormData; s: React.Dispatch<React.SetStateAction<FormData>> }) {
  const opts = [
    { v: "Final Written Content / Copy", sub: "The exact wording, headlines, and text for the page." },
    { v: "Brand Identity", sub: "High-resolution logos, brand fonts, and primary colors." },
    { v: "Media Assets", sub: "Team photos, product screenshots, or graphics." },
    { v: "Figma Layout Design", sub: "Complete static page blueprints (if hiring strictly as a developer)." },
    { v: "None yet — I need help structuring my layout strategy", sub: undefined },
  ]
  const toggle = (v: string) => s(f => ({ ...f, assets: f.assets.includes(v) ? f.assets.filter(a => a !== v) : [...f.assets, v] }))
  return (
    <div>
      <label className={LABEL}>Which assets do you have ready? <span className="text-white/30 font-normal">Select all that apply</span></label>
      <div className="space-y-2.5 mt-2">{opts.map(({ v, sub }) => <CheckCard key={v} label={v} sub={sub} checked={d.assets.includes(v)} onClick={() => toggle(v)} />)}</div>
    </div>
  )
}

function Phase4({ d, s }: { d: FormData; s: React.Dispatch<React.SetStateAction<FormData>> }) {
  const budgets = [
    { v: "$300 – $600 USD", sub: "Static Single Page" },
    { v: "$700 – $1,200 USD", sub: "Static Multi-Page" },
    { v: "$1,200 – $1,800 USD", sub: "Premium React Single Page" },
    { v: "$2,500+ USD", sub: "Advanced Next.js Architecture" },
  ]
  return (
    <div className="space-y-6">
      <div>
        <label className={LABEL}>Target budget range</label>
        <div className="space-y-2.5">{budgets.map(({ v, sub }) => <RadioCard key={v} label={v} sub={sub} checked={d.budget === v} onClick={() => s(f => ({ ...f, budget: v }))} />)}</div>
      </div>
      <div><label className={LABEL}>Target launch date <span className="text-white/30 font-normal">(optional)</span></label>
        <input type="text" placeholder="e.g. End of July 2025" value={d.deadline} onChange={e => s(f => ({ ...f, deadline: e.target.value }))} className={FIELD} /></div>
      <div><label className={LABEL}>Anything else I should know? <span className="text-white/30 font-normal">(optional)</span></label>
        <textarea placeholder="Specific integrations, custom features, or context…" value={d.notes} onChange={e => s(f => ({ ...f, notes: e.target.value }))} className={`${FIELD} resize-none`} rows={3} /></div>
    </div>
  )
}

const STEPS = [
  { n: 1, label: "Contact" },
  { n: 2, label: "Scope" },
  { n: 3, label: "Assets" },
  { n: 4, label: "Budget" },
] as const

function ContactForm() {
  const [step, setStep] = useState(1)
  const [dir,  setDir]  = useState(1)
  const [data, setData] = useState<FormData>({ name: "", email: "", business: "", scope: "", track: "", assets: [], budget: "", deadline: "", notes: "" })

  const canNext = () => {
    if (step === 1) return !!(data.name.trim() && data.email.trim() && data.business.trim())
    if (step === 2) return !!(data.scope && data.track)
    if (step === 3) return true
    return !!data.budget
  }

  const go = (n: number) => { setDir(n > step ? 1 : -1); setStep(n) }

  const submit = () => {
    const assets = data.assets.length ? data.assets.map(a => `  • ${a}`).join("\n") : "  • None ready yet"
    const msg = [
      "New Project Inquiry — vnbuildr",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Business: ${data.business}`,
      "",
      `Scope: ${data.scope}`,
      `Track: ${data.track}`,
      "",
      "Assets ready:",
      assets,
      "",
      `Budget: ${data.budget}`,
      data.deadline ? `Launch date: ${data.deadline}` : null,
      data.notes    ? `Notes: ${data.notes}`          : null,
    ].filter(Boolean).join("\n")
    window.open(`https://wa.me/60199195314?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const variants = {
    enter:  (d: number) => ({ x: d * 28, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d * -28, opacity: 0 }),
  }

  return (
    <div className="mt-10 text-left">
      {/* Stepper */}
      <div className="flex items-center mb-8">
        {STEPS.map((p, i) => (
          <div key={p.n} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
            <div className="flex items-center gap-2 shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${step > p.n ? "bg-[#25D366] text-white" : step === p.n ? "bg-white text-[var(--color-ink)]" : "bg-white/10 text-white/30"}`}>
                {step > p.n
                  ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : p.n}
              </div>
              <span className={`text-[12px] font-medium hidden sm:block transition-colors duration-300 ${step >= p.n ? "text-white/65" : "text-white/25"}`}>{p.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 mx-3 h-px transition-all duration-500 ${step > p.n ? "bg-[#25D366]/50" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}>
          {step === 1 && <Phase1 d={data} s={setData} />}
          {step === 2 && <Phase2 d={data} s={setData} />}
          {step === 3 && <Phase3 d={data} s={setData} />}
          {step === 4 && <Phase4 d={data} s={setData} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
        {step > 1
          ? <button type="button" onClick={() => go(step - 1)} className="text-[13px] text-white/40 hover:text-white/70 transition-colors">← Back</button>
          : <div />}
        {step < 4
          ? <button type="button" onClick={() => canNext() && go(step + 1)} disabled={!canNext()}
              className="px-6 py-2.5 rounded-full bg-white text-[var(--color-ink)] text-[13px] font-semibold hover:opacity-85 transition-all disabled:opacity-25 disabled:cursor-not-allowed">
              Continue →
            </button>
          : <button type="button" onClick={() => canNext() && submit()} disabled={!canNext()}
              className="px-6 py-2.5 rounded-full bg-[#25D366] text-white text-[13px] font-semibold hover:opacity-85 transition-all disabled:opacity-25 disabled:cursor-not-allowed">
              Send via WhatsApp →
            </button>}
      </div>
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

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const t = useT()
  return (
    <footer className="bg-[var(--color-ink)] border-t border-white/[0.08] py-8 px-6">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-4 text-center md:text-left">
        <Link href="/" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }} className="font-serif text-[18px] text-white/90">
          <span className="text-[var(--color-blue)] font-bold">vn</span><em>buildr</em>
        </Link>
        <p className="text-[13px] text-white/30 text-center">{t.footer.copyright}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none justify-center md:justify-end">
          {(
            [
              ["https://wa.me/60199195314", t.footer.links.whatsapp],
              ["mailto:hello@vnbuildr.com", t.footer.links.email],
              ["#how", t.footer.links.how],
            ] as [string, string][]
          ).map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[13px] text-white/35 hover:text-white/75 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/portfolio" className="text-[13px] text-white/35 hover:text-white/75 transition-colors">
              {t.footer.links.portfolio}
            </Link>
          </li>
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

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const t = useT()
  return (
    <section className="py-16 md:py-24 px-6 bg-white">
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
    q: "How long does it take to complete a website?",
    a: (
      <span className="flex flex-col gap-3">
        <span>· Pure HTML &amp; CSS Track: <strong>48 hours</strong></span>
        <span>· React High-Motion Track: <strong>3 to 5 days</strong></span>
        <span>· Advanced Web Ecosystems: <strong>5 to 7 days</strong></span>
        <span className="mt-2 opacity-70">These timelines require your final copy and brand assets to be ready at kickoff.</span>
      </span>
    ),
  },
  {
    q: "What materials do I need to provide before we start?",
    a: "Copywriting is included — I write the page copy for you. What helps most is having your high-resolution logo, primary brand colors, and any product photos or graphics ready to share. The more brand context you can give me upfront, the faster we hit the launch timeline.",
  },
  {
    q: 'What is the difference between the "React High-Motion" and "Static HTML/CSS" tracks?',
    a: "The React Track is built for modern brands that want to make an unforgettable visual impression — fluid scroll animations, interactive layout grids, and premium motion components. (This website is built on this exact track!) The Static Track is built for raw performance, absolute simplicity, and local services. It uses zero heavy scripts, meaning your page will load instantly even on weak mobile connections, with absolutely zero monthly software maintenance.",
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
    <section id="faq" className="py-16 md:py-24 px-6 bg-[var(--color-surface)]">
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
      "name": "How long does it take to complete a website?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pure HTML & CSS Track: 48 hours. React High-Motion Track: 3 to 5 days. Advanced Web Ecosystems: 5 to 7 days. These timelines require your final copy and brand assets to be ready at kickoff." },
    },
    {
      "@type": "Question",
      "name": "What materials do I need to provide before we start?",
      "acceptedAnswer": { "@type": "Answer", "text": "Copywriting is included — I write the page copy for you. What helps most is having your high-resolution logo, primary brand colors, and any product photos or graphics ready to share. The more brand context you can give me upfront, the faster we hit the launch timeline." },
    },
    {
      "@type": "Question",
      "name": "What is the difference between the React High-Motion and Static HTML/CSS tracks?",
      "acceptedAnswer": { "@type": "Answer", "text": "The React Track is built for modern brands that want to make an unforgettable visual impression — fluid scroll animations, interactive layout grids, and premium motion components. The Static Track is built for raw performance, absolute simplicity, and local services. It uses zero heavy scripts, meaning your page will load instantly even on weak mobile connections, with absolutely zero monthly software maintenance." },
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
          <HowItWorks />
          <Features />
          <Testimonials />
          <DevTracks />
          <FAQ />
          <About />
          <CtaSection />
        </main>
        <Footer />
      </AnimContext.Provider>
    </LocaleCtx.Provider>
  );
}
