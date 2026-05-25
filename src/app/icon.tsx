import { ImageResponse } from "next/og"

export const size = { width: 96, height: 96 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#2563eb",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "white",
          fontSize: 42,
        }}
      >
        vn
      </div>
    ),
    { ...size }
  )
}
