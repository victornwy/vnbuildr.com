"use client"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps {
  className?: string
  showRadialGradient?: boolean
}

export function AuroraBackground({
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          `[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
          [--aurora:repeating-linear-gradient(100deg,var(--aurora-blue)_10%,var(--aurora-indigo)_15%,var(--aurora-sky)_20%,var(--aurora-violet)_25%,var(--aurora-cyan)_30%)]
          [background-image:var(--white-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[10px] invert
          after:content-[''] after:absolute after:inset-0
          after:[background-image:var(--white-gradient),var(--aurora)]
          after:[background-size:200%,_100%]
          after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
          absolute -inset-[10px] opacity-40 will-change-transform animate-aurora`,
          showRadialGradient &&
            "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
        )}
      />
    </div>
  )
}
