import { NextResponse } from "next/server";

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://heyvishal.vercel.app";

  return new NextResponse(
    `User-agent: *
Allow: /

Sitemap: ${baseUrl.replace(/\/$/, "")}/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
