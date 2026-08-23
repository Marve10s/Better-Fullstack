import { createFileRoute } from "@tanstack/react-router";

import { fetchPublicVerificationReport } from "@/lib/docs/release-verification";
import { verifiedCombinationsBadgePayload } from "@/lib/docs/verified-combinations-badge";
import { NOINDEX_ROBOTS } from "@/lib/robots";

export const Route = createFileRoute("/api/verified-combinations")({
  server: {
    handlers: {
      GET: async () => {
        const verification = await fetchPublicVerificationReport(__BFS_DEPLOYED_GIT_HEAD__);
        return Response.json(verifiedCombinationsBadgePayload(verification), {
          headers: {
            "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=1800",
            "Content-Type": "application/json",
            "X-Robots-Tag": NOINDEX_ROBOTS,
          },
        });
      },
    },
  },
});
