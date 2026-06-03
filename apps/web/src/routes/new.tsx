import { createFileRoute } from "@tanstack/react-router";

import { StackBuilderPage } from "@/components/stack-builder/stack-builder-page";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  SITE_NAME,
  canonicalUrl,
} from "@/lib/seo";

export const Route = createFileRoute("/new")({
  head: () => ({
    meta: [
      { title: `Stack Builder | ${SITE_NAME}` },
      {
        name: "description",
        content:
          "Build and share custom fullstack combinations with the Better Fullstack visual stack builder.",
      },
      { name: "robots", content: DEFAULT_ROBOTS },
      { property: "og:title", content: `Stack Builder | ${SITE_NAME}` },
      {
        property: "og:description",
        content:
          "Build and share custom fullstack combinations with the Better Fullstack visual stack builder.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/new") },
      {
        property: "og:image",
        content: DEFAULT_OG_IMAGE_URL,
      },
      { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Stack Builder | ${SITE_NAME}` },
      {
        name: "twitter:description",
        content:
          "Build and share custom fullstack combinations with the Better Fullstack visual stack builder.",
      },
      {
        name: "twitter:image",
        content: DEFAULT_X_IMAGE_URL,
      },
      { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/new") }],
  }),
  component: StackBuilderPage,
});
