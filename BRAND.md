# vnbuildr — Brand Kit

## Logo

Text mark only. No icon.

```
vn buildr
^^         ← blue (#2563eb)
   ^^^^^^  ← italic, ink color
```

- "vn" in blue (`#2563eb`), regular weight
- "buildr" in italic (`<em>`), near-black (`#141413`)
- Font: serif (display)
- Always lowercase

**Usage in code:**
```tsx
<span className="text-[var(--color-blue)]">vn</span><em>buildr</em>
```

---

## Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / headings | Serif (Instrument Serif or similar) | Normal (400) | Used for H1, H2, logo |
| Body / UI | Inter | 400 / 600 | All body text, labels, buttons |

**Type scale:**

| Element | Size |
|---|---|
| Hero H1 | `clamp(44px, 7vw, 80px)` |
| Section H2 | `clamp(30px, 4vw, 46px)` |
| Large H2 (CTA) | `clamp(36px, 5.5vw, 64px)` |
| Body large | `clamp(16px, 2.2vw, 19px)` |
| Body | 16–17px |
| Body small | 14–15px |
| Label / meta | 12–13px, uppercase, `tracking-[0.1em]` |

**Line heights:** `1.05` for headings · `1.65` for body

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background |
| `--color-surface` | `#f7f6f4` | Card / section backgrounds |
| `--color-border` | `#e8e6e1` | All borders and dividers |
| `--color-ink` | `#141413` | Primary text, buttons |
| `--color-ink-muted` | `#7a7872` | Secondary text, placeholders |
| `--color-accent` | `#141413` | CTA buttons (same as ink) |
| `--color-accent-fg` | `#ffffff` | Text on dark buttons |
| `--color-tag-bg` | `#f0ede8` | Pill / tag backgrounds |
| `--color-blue` | `#2563eb` | Blue accent — "vn" in logo |
| Gold (stars) | `#d4a72c` | Rating stars |
| Green (status) | `#5c9e6e` | "Taking new clients" dot |

**Palette feel:** Warm neutrals. Off-white, not pure white. Near-black, not pure black.

---

## Buttons

| Type | Style |
|---|---|
| Primary | Dark fill (`--color-ink`), white text, `rounded-full`, `px-6 py-3` |
| Secondary | Transparent, border, `rounded-full`, `px-6 py-3` |
| Hover | `opacity-85` + `-translate-y-px` on primary |

---

## Contact

| Channel | Value |
|---|---|
| WhatsApp | +6011-1217 3995 · `wa.me/601112173995` |
| Email | hello@vnbuildr.com |

---

## Voice & Tone

- Direct, no fluff
- Confident but not pushy
- Short sentences
- No lorem ipsum, no agency buzzwords
- "I" not "we" — this is a solo service
