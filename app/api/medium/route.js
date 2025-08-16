import Parser from "rss-parser";

export async function GET() {
  const { MEDIUM_USER_NAME } = process.env;

  // Custom fetch with headers
  const customFetcher = async (url) => {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    const text = await res.text();
    return text;
  };

  const parser = new Parser({
    customFetch: customFetcher, // <-- this is the trick
  });

  try {
    const feed = await parser.parseURL(
      `https://medium.com/feed/@${MEDIUM_USER_NAME}`
    );

    return new Response(JSON.stringify(feed?.items), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Medium feed error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Medium feed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
