import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const [{ getAllPages }, { getAllGuidePages }, { generateLlmsTxt }] = await Promise.all([
          import("@/lib/docs/source"),
          import("@/lib/guides/source"),
          import("@/lib/llms"),
        ]);

        return new Response(
          generateLlmsTxt({
            docsPages: getAllPages(),
            guidePages: getAllGuidePages(),
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
