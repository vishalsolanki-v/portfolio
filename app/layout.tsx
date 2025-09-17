import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Vishal Solanki | Web Developer",
  description: "Experienced Front End Developer specializing in React.js and Next.js with over 2 years of hands-on expertise. Proven track record of crafting responsive, user-friendly interfaces and implementing modern web technologies. Passionate about creating seamless user experiences through clean and efficient code. Strong problem-solving skills and adept at collaborating with cross-functional teams to deliver high-quality projects.",
  generator:"Next.js",
  icons: {
    icon: "/favicon.ico", // for browsers
    shortcut: "/favicon.ico",
    apple: "/download.png",
  },
  openGraph: {
    title: "HeyVishal",
    description: "Developer portfolio and blogs.",
    url: "https://heyvishal.vercel.app",
    siteName: "HeyVishal",
    images: [
      {
        url: "/og-image.png", // add in public/ folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: "-x-z65WiQHbM2SsvwSdM8l6NLfD5WWmf_j8wGG4t2_g", // paste the code from GSC here
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
