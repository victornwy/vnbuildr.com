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
    <svg className={className} viewBox="1667 1667 5000 5000" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}>
      <path d="M5645.833,6666.667l-2958.333,0c-563.792,0 -1020.833,-457.042 -1020.833,-1020.833l0,-2958.333c0,-563.792 457.042,-1020.833 1020.833,-1020.833l2958.333,0c563.792,0 1020.833,457.041 1020.833,1020.833l0,2958.333c0,563.792 -457.041,1020.833 -1020.833,1020.833Z" fill="#ef3e52"/>
      <path d="M3549.025,4624.208l-103.821,262.792l428.271,0l97.334,-253.083l-272.537,-6.458l-149.246,-3.25Zm-454.221,-807.879c0,135.492 25.846,274.209 38.933,408.796c18.429,189.583 31.788,360.208 136.267,525.625l38.933,0l116.8,-292l-58.4,-642.421l-272.533,0Zm-895.471,0l-58.404,642.421l116.804,311.458l133.021,-233.625l81.112,-720.255l-272.533,0Zm3873.875,-6.487c25.083,-6.271 56.667,-15.93 74.625,-35.688c158,-173.787 -158.75,-343.129 -223.875,-133.025c-16.542,53.367 -6.459,119.875 -6.459,175.2c51,0 105.875,5.975 155.708,-6.487Zm-1421.083,6.487l155.75,0l0,-272.533l-603.458,0l0,272.533l155.709,0l0,817.588l-246.563,9.75l-103.821,243.333l895.467,0l0,-253.083l-253.083,0l0,-817.588Zm953.875,233.617l-175.208,0l0,-233.625l175.208,0l0,233.625Zm584,467.179c0,-181.083 29.083,-404.763 -194.667,-460.721c-38.083,-9.5 -77.916,-6.458 -116.792,-6.458c0,-199.417 19,-428.417 -214.125,-499.667c-69.875,-21.333 -161.041,-6.5 -233.625,-6.5l0,-97.333l-272.542,0l0,97.333l-175.167,0l0,272.542l175.167,0l0,233.625l-272.5,0l0,272.512l272.5,0l0,564.542l272.542,0l0,-564.542l292,0c41.167,0 98.583,-10.208 136.292,9.75c71.125,37.667 95.708,258.292 35.666,314.708c-50.917,47.875 -166.375,25.958 -230.333,25.958c10.709,58.292 33.292,167.625 84.333,204.417c27.334,19.667 78.959,9.708 110.334,9.708c100.917,0 215.5,11.75 285.5,-77.833c63.542,-81.375 45.417,-195.542 45.417,-292.042Zm-3273.641,-1031.729c-19.475,-53.996 -202.896,-60.65 -246.579,-29.2c-53.113,38.242 -22.712,222.05 -22.712,282.271l0,642.408c0,66.375 24.704,194.709 -9.733,253.042c-32.367,54.875 -111.921,38.958 -165.467,38.958c10.617,50.417 41.271,172.083 84.354,204.375c97.917,73.458 295.042,-11.708 337.425,-107.042c44.433,-99.958 25.954,-224.208 25.954,-330.958l0,-622.921c0,-94.171 28.629,-242.558 -3.241,-330.933Zm996.05,798.15l194.667,-467.217l-233.6,0l136.267,-369.866c-80.142,-6.325 -194.304,-42.617 -269.292,9.734c-53.408,37.283 -82.563,165.058 -107.067,223.866c-34.896,83.754 -203.334,327.179 -51.913,382.846c40.4,14.854 93.921,6.492 136.267,6.492c-18.379,87.296 -65.271,171.058 -100.575,253.058c-16.896,39.254 -46.779,93.375 -25.959,136.292c45.396,93.542 216.871,58.375 301.733,58.375c37.504,0 81.558,7.25 110.313,-22.708c39.25,-40.875 65.125,-139.208 84.358,-191.417l-175.2,-19.454Z" fill="white"/>
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
