'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
// Social brand SVGs (lucide-react doesn't include brand icons)
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconRedNote({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5H9.5v-2H11V8h2v1.5h1.5v2H13v5z"/>
    </svg>
  );
}

interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    label: 'Services',
    links: [
      { title: 'Starter Landing Page', href: '/#pricing' },
      { title: 'Business Website',     href: '/#pricing' },
      { title: 'Pro Website',          href: '/#pricing' },
      { title: 'Custom Website',       href: '/#pricing' },
    ],
  },
  {
    label: 'Quick Links',
    links: [
      { title: 'Portfolio',    href: '/portfolio' },
      { title: 'How It Works', href: '/#how' },
      { title: 'Pricing',      href: '/#pricing' },
      { title: 'FAQ',          href: '/#faq' },
    ],
  },
  {
    label: 'Contact',
    links: [
      {
        title:    'WhatsApp',
        href:     'https://wa.me/60199195314?text=Hi%2C%20I%27m%20interested%20in%20a%20landing%20page',
        external: true,
      },
      {
        title:    'hello@vnbuildr.com',
        href:     'mailto:hello@vnbuildr.com',
        external: true,
      },
    ],
  },
  {
    label: 'Follow',
    links: [
      // Replace # with your actual social URLs when ready
      { title: 'Instagram', href: 'https://www.instagram.com/vnbuildr/',                          external: true, icon: IconInstagram },
      { title: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61590036136359',       external: true, icon: IconFacebook  },
      { title: 'RedNote',   href: 'https://xhslink.com/m/3wQseBxD3r1',                            external: true, icon: IconRedNote   },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="relative w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 lg:py-16">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-12">

          {/* Brand + tagline */}
          <AnimatedContainer className="space-y-3">
            <Link
              href="/"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-serif text-[20px] text-[var(--color-ink)] inline-block"
            >
              <span className="text-[var(--color-blue)] font-bold">vn</span>
              <em>buildr</em>
            </Link>
            <p className="text-[13px] text-[var(--color-ink-muted)] leading-relaxed max-w-[220px]">
              Custom websites &amp; landing pages for small businesses.
            </p>
            <p className="text-[12px] text-[var(--color-ink-muted)]/60 pt-2">
              © {new Date().getFullYear()} vnbuildr. All rights reserved.
            </p>
          </AnimatedContainer>

          {/* Link columns */}
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerSections.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.08}>
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-muted)]">
                    {section.label}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {section.links.map(link => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-200"
                        >
                          {link.icon && <link.icon className="size-3.5 shrink-0" />}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}

// ─── Animation wrapper ────────────────────────────────────────────────────────
type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
