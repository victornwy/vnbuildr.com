"use client"

import type { ReactNode } from "react"
import { track } from "@vercel/analytics"

export function WhatsAppLink({
  href,
  location,
  className,
  children,
}: {
  href: string
  location: string
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location })}
      className={className}
    >
      {children}
    </a>
  )
}
