import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/changelog.md")({
  server: {
    handlers: {
      GET: async () => {
        const [{ rawChangelogPages }, { markdownResponse }] = await Promise.all([
          import("virtual:changelog-raw"),
          import("@/lib/content/markdown-response"),
        ]);
        return markdownResponse(rawChangelogPages[""], "/changelog");
      },
    },
  },
});
