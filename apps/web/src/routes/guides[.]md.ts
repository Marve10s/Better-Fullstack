import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides.md")({
  server: {
    handlers: {
      GET: async () => {
        const { rawGuidePages } = await import("virtual:guides-raw");
        return markdownResponse(rawGuidePages[""]);
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
