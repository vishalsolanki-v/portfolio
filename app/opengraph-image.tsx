import { ImageResponse } from "next/og"

export const alt = "Vishal Solanki - Software Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f8fafc",
          background: "linear-gradient(135deg, #0b1720 0%, #142b35 58%, #173d3a 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#a7f3d0", fontSize: 22 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#34d399" }} />
          SOFTWARE ENGINEER | NOIDA, INDIA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Vishal Solanki</div>
          <div style={{ fontSize: 34, color: "#d1d5db" }}>Full Stack Engineer</div>
          <div style={{ fontSize: 25, color: "#a7f3d0" }}>
            React.js · Next.js · TypeScript · Node.js · AWS
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#d1d5db" }}>heyvishal.vercel.app</div>
      </div>
    ),
    size,
  )
}