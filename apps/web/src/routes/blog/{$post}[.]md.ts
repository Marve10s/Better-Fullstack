import { createFileRoute } from "@tanstack/react-router";

/**
 * Serve a post's raw MDX source at /blog/<slug>.md — a "view source" for
 * readers and LLMs (linked from the post's share actions and as a
 * `rel="alternate"` in the post head). Sources come from the
 * `virtual:blog-raw` module (an `?raw` glob would be transformed by the MDX
 * plugin first, and content/ isn't shipped to the server bundle).
 */
export const Route = createFileRoute("/blog/{$post}.md")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { rawBlogPosts } = await import("virtual:blog-raw");
        const source = rawBlogPosts[params.post];
        if (!source) return new Response("Not found", { status: 404 });
        return new Response(source, {
          headers: {
            "content-type": "text/markdown; charset=utf-8",
            "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
          },
        });
      },
    },
  },
});
