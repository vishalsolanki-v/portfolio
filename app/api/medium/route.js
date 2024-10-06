// pages/api/fetchMediumPosts.js
import Parser from "rss-parser";

export async function GET(request) {
  const parser = new Parser();
  const { MEDIUM_USER_NAME } = process.env;
  const feed = await parser.parseURL(
    `https://medium.com/feed/@${MEDIUM_USER_NAME}`
  );
  try {
    return new Response(JSON.stringify(feed?.items), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
