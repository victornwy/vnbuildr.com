import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#141413",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle blue glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top: logo */}
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ color: "#2563eb", fontWeight: 900, fontSize: 36, letterSpacing: -0.5 }}>vn</span>
          <span style={{ color: "rgba(255,255,255,0.9)", fontStyle: "italic", fontSize: 36, letterSpacing: -0.5 }}>buildr</span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Custom Landing Pages · Malaysia
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                color: "#ffffff",
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -3,
              }}
            >
              Built to convert.
            </span>
            <span
              style={{
                color: "#2563eb",
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -3,
              }}
            >
              Designed to impress.
            </span>
          </div>
        </div>

        {/* Bottom: tagline + badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 22 }}>
              Hand-coded for startups &amp; SMEs
            </span>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 20 }}>
              vnbuildr.com
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#25D366",
              borderRadius: 100,
              padding: "16px 32px",
              color: "white",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Delivered in 7 days
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
