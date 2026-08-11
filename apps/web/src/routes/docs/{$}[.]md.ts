import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/{$}.md")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { rawDocsPages } = await import("virtual:docs-raw");
        return markdownResponse(rawDocsPages[params._splat ?? ""]);
      },
    },
  },
});

function markdownResponse(source: string | undefined): Response {
  if (!source) return new Response("Not found", { status: 404 });
  return new Response(source, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
