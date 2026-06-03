import { createFileRoute } from "@tanstack/react-router";

import { StackBuilderPage } from "@/components/stack-builder/stack-builder-page";
import { canonicalUrl, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/stack")({
  head: () => ({
    meta: [
      { title: `Shared Stack | ${SITE_NAME}` },
      {
        name: "description",
        content: "Open a shared Better Fullstack builder configuration.",
      },
      { property: "og:title", content: `Shared Stack | ${SITE_NAME}` },
      {
        property: "og:description",
        content: "Open a shared Better Fullstack builder configuration.",
      },
      { property: "og:url", content: canonicalUrl("/stack") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/stack") }],
  }),
  component: StackBuilderPage,
});
