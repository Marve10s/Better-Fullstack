import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.md")({
  server: {
    handlers: {
      GET: async () => {
        const [
          { getAllPages },
          { getAllGuidePages },
          { getAllBlogPosts },
          { generateMarkdownSitemap },
          { getPublishedStackPageSummaries },
        ] = await Promise.all([
          import("@/lib/docs/source"),
          import("@/lib/guides/source"),
          import("@/lib/blog/source"),
          import("@/lib/llms"),
          import("@/lib/stack-pages/source"),
        ]);
        return new Response(
          generateMarkdownSitemap({
            docsPages: getAllPages(),
            guidePages: getAllGuidePages(),
            blogPages: getAllBlogPosts(),
            stackPages: getPublishedStackPageSummaries(),
          }),
          {
            headers: {
              "content-type": "text/markdown; charset=utf-8",
              "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
            },
          },
        );
      },
    },
  },
});
