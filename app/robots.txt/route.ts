import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse(
    `User-agent: *
Allow: /

Sitemap: https://heyvishal.vercel.app/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
