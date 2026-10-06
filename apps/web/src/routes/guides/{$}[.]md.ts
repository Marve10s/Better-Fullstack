import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides/{$}.md")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const [{ rawGuidePages }, { markdownResponse }] = await Promise.all([
          import("virtual:guides-raw"),
          import("@/lib/content/markdown-response"),
        ]);
        const slug = params._splat ?? "";
        return markdownResponse(rawGuidePages[slug], slug ? `/guides/${slug}` : "/guides");
      },
    },
  },
});
