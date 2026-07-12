const NAV_HEIGHT = 60

export function scrollToSection(href: string) {
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
