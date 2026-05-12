import { createFileRoute } from "@tanstack/react-router";

import { generateSitemapXml } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        return new Response(generateSitemapXml(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
          },
        });
      },
    },
  },
});
