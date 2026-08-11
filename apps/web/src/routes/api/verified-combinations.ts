import { createFileRoute } from "@tanstack/react-router";

import { verifiedCombinationsBadgePayload } from "@/lib/docs/verified-combinations-badge";
import { verifiedCombinationsSummary } from "@/lib/docs/verified-combinations-data";
import { NOINDEX_ROBOTS } from "@/lib/robots";

export const Route = createFileRoute("/api/verified-combinations")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(verifiedCombinationsBadgePayload(verifiedCombinationsSummary), {
          headers: {
            "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=1800",
            "Content-Type": "application/json",
            "X-Robots-Tag": NOINDEX_ROBOTS,
          },
        }),
    },
  },
});
