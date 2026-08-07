import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () => {
        const [
          { getAllPages },
          { getAllGuidePages },
          { getAllBlogPosts },
          { generateLlmsFullTxt },
          { rawDocsPages },
          { rawGuidePages },
          { rawBlogPosts },
        ] = await Promise.all([
          import("@/lib/docs/source"),
          import("@/lib/guides/source"),
          import("@/lib/blog/source"),
          import("@/lib/llms"),
          import("virtual:docs-raw"),
          import("virtual:guides-raw"),
          import("virtual:blog-raw"),
        ]);

        return new Response(
          generateLlmsFullTxt({
            docsPages: getAllPages(),
            guidePages: getAllGuidePages(),
            blogPages: getAllBlogPosts(),
            rawDocsPages,
            rawGuidePages,
            rawBlogPosts,
            cliVersion: __BFS_CLI_VERSION__,
            generatedAt: __BFS_BUILD_DATE__,
          }),
          {
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
            },
          },
        );
      },
    },
  },
});
