import { createFileRoute } from "@tanstack/react-router";

/**
 * Serve a post's raw MDX source at /blog/<slug>.md - a "view source" for
 * readers and LLMs (linked from the post's share actions and as a
 * `rel="alternate"` in the post head). Sources come from the
 * `virtual:blog-raw` module (an `?raw` glob would be transformed by the MDX
 * plugin first, and content/ isn't shipped to the server bundle).
 */
export const Route = createFileRoute("/blog/{$post}.md")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const [{ rawBlogPosts }, { markdownResponse }] = await Promise.all([
          import("virtual:blog-raw"),
          import("@/lib/content/markdown-response"),
        ]);
        return markdownResponse(rawBlogPosts[params.post], `/blog/${params.post}`);
      },
    },
  },
});
