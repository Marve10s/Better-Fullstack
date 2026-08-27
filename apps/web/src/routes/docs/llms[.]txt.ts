import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const [{ getAllPages }, { generateDocsLlmsTxt }] = await Promise.all([
          import("@/lib/docs/source"),
          import("@/lib/content/llms"),
        ]);
        return new Response(
          generateDocsLlmsTxt(getAllPages(), {
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
