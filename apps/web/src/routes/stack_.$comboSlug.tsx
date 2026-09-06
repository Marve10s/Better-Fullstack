import { createFileRoute, notFound } from "@tanstack/react-router";

import type { GeneratedStackPage } from "@/lib/stack-pages/types";

import { StackCombinationPage } from "@/components/stack-pages/stack-combination-page";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  SITE_NAME,
  SITE_URL,
  canonicalUrl,
  getEcosystemOgImage,
} from "@/lib/seo/seo";

function stackPageJsonLd(page: GeneratedStackPage) {
  const url = canonicalUrl(`/stack/${page.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url,
        dateModified: page.updated,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        about: page.canonicalParts.filter((part) => part.id !== "none").map((part) => part.label),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Templates",
            item: canonicalUrl("/templates"),
          },
          { "@type": "ListItem", position: 3, name: page.title, item: url },
        ],
      },
    ],
  };
}

export const Route = createFileRoute("/stack_/$comboSlug")({
  loader: async ({ params }) => {
    const { getStackPage } = await import("@/lib/stack-pages/source");
    const page = getStackPage(params.comboSlug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.title} | ${SITE_NAME}`;
    const url = canonicalUrl(`/stack/${loaderData.slug}`);
    const ecosystemImage = getEcosystemOgImage(loaderData.ecosystem);
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { name: "robots", content: DEFAULT_ROBOTS },
        {
          name: "keywords",
          content: [loaderData.primaryKeyword, ...loaderData.keywordAliases].join(", "),
        },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ecosystemImage },
        { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
        { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
        { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: loaderData.description },
        { name: "twitter:image", content: ecosystemImage },
        { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
        { "script:ld+json": stackPageJsonLd(loaderData) },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: StackCombinationRoute,
});

function StackCombinationRoute() {
  return <StackCombinationPage page={Route.useLoaderData()} />;
}
