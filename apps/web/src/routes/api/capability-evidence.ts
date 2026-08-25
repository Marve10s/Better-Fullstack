import { createFileRoute } from "@tanstack/react-router";

import { fetchPublicCapabilityEvidenceReport } from "@/lib/docs/release-verification";
import { NOINDEX_ROBOTS } from "@/lib/seo/robots";

export const Route = createFileRoute("/api/capability-evidence")({
  server: {
    handlers: {
      GET: async () => {
        const report = await fetchPublicCapabilityEvidenceReport(__BFS_DEPLOYED_GIT_HEAD__);
        return Response.json(report, {
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
