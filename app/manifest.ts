import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vishal Solanki | Software Engineer",
    short_name: "Vishal Solanki",
    description: "Software Engineer portfolio and technical writing.",
    start_url: "/",
    display: "browser",
    background_color: "#0b1720",
    theme_color: "#0b1720",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}