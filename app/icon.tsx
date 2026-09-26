import { ImageResponse } from "next/og"

export const size = { width: 512, height: 512 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 112,
          background: "linear-gradient(145deg, #0b1720, #173d3a)",
          color: "#a7f3d0",
          fontSize: 210,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
        }}
      >
        VS
      </div>
    ),
    size,
  )
}