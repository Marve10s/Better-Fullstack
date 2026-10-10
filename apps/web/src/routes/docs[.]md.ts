import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs.md")({
  server: {
    handlers: {
      GET: async () => {
        const [{ rawDocsPages }, { markdownResponse }] = await Promise.all([
          import("virtual:docs-raw"),
          import("@/lib/content/markdown-response"),
        ]);
        return markdownResponse(rawDocsPages[""], "/docs");
      },
    },
  },
});
