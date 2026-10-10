import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/{$}.md")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { docsMarkdownResponse } = await import("@/lib/docs/markdown.server");
        return docsMarkdownResponse(params._splat ?? "");
      },
    },
  },
});
