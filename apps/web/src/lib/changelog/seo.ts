import type { ChangelogPage } from "@/lib/changelog/source";

import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
  canonicalUrl,
  getDefaultDescription,
} from "@/lib/seo/seo";

function changelogJsonLd(page: ChangelogPage, name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name,
        description,
        url,
        ...(page.frontmatter.updated ? { dateModified: page.frontmatter.updated } : {}),
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#software` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
    ],
  };
}

export function changelogHead(page: ChangelogPage) {
  const name = page.frontmatter.title ?? "Changelog";
  const title = `${name} | ${SITE_NAME}`;
  const description = page.frontmatter.description ?? getDefaultDescription();
  const url = canonicalUrl(page.url);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: DEFAULT_ROBOTS },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
      { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
      { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { "script:ld+json": changelogJsonLd(page, name, description, url) },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", type: "text/markdown", href: `${url}.md` },
    ],
  };
}
