import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/{$}.md")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const [{ rawDocsPages }, { markdownResponse }] = await Promise.all([
          import("virtual:docs-raw"),
          import("@/lib/content/markdown-response"),
        ]);
        const slug = params._splat ?? "";
        return markdownResponse(rawDocsPages[slug], slug ? `/docs/${slug}` : "/docs");
      },
    },
  },
});
