import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides.md")({
  server: {
    handlers: {
      GET: async () => {
        const [{ rawGuidePages }, { markdownResponse }] = await Promise.all([
          import("virtual:guides-raw"),
          import("@/lib/content/markdown-response"),
        ]);
        return markdownResponse(rawGuidePages[""], "/guides");
      },
    },
  },
});
