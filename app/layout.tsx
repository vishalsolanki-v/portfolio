import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"

const siteUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://heyvishal.vercel.app").replace(/\/$/, "")

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vishal Solanki",
  url: siteUrl,
  jobTitle: "Software Engineer",
  description:
    "Software Engineer with 3.5+ years of experience building production web applications with React.js, Next.js, TypeScript, Node.js, MySQL, AWS, and Docker.",
  sameAs: [
    "https://linkedin.com/in/vishal-solanki2000",
    "https://github.com/vishalsolanki-v",
    "https://medium.com/@vishalthakur2463",
  ],
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MySQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Core Web Vitals",
    "SEO",
    "Performance Optimization",
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "Vishal Solanki | Software Engineer | Full Stack Developer",
  description:
    "Software Engineer with 3.5+ years of experience building production web applications with React.js, Next.js, TypeScript, Node.js, MySQL, AWS, and Docker. Experienced in full-stack development, secure APIs, performance optimization, Core Web Vitals, SEO, and scalable web architecture.",
  keywords: [
    "Vishal Solanki",
    "Software Engineer",
    "Full Stack Engineer",
    "Full Stack Developer",
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AWS",
    "MySQL",
    "Docker",
    "Core Web Vitals",
    "SEO",
  ],
  authors: [{ name: "Vishal Solanki", url: "https://heyvishal.vercel.app" }],
  creator: "Vishal Solanki",
  generator: "Next.js",
  icons: {
    icon: "/favicon.ico", // for browsers
    shortcut: "/favicon.ico",
    apple: "/apple-icon",
  },
  openGraph: {
    title: "Vishal Solanki | Software Engineer | Full Stack Developer",
    description:
      "Software Engineer with 3.5+ years of experience building full-stack web applications with React.js, Next.js, TypeScript, Node.js, AWS, and modern web technologies.",
    url: siteUrl,
    siteName: "Vishal Solanki",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vishal Solanki - Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Solanki | Software Engineer",
    description:
      "Software Engineer | Full Stack | React.js | Next.js | TypeScript | Node.js | AWS",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
