import { createFileRoute, notFound } from "@tanstack/react-router";

import { NOINDEX_ROBOTS } from "@/lib/seo/robots";

export const Route = createFileRoute("/run")({
  beforeLoad: () => {
    throw notFound();
  },
  head: () => ({ meta: [{ name: "robots", content: NOINDEX_ROBOTS }] }),
});
