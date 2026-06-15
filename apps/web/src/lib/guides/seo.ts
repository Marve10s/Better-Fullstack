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
} from "@/lib/seo";
import { m } from "@/paraglide/messages.js";

import type { GuidePage } from "./source";

type JsonLdMeta = {
  "script:ld+json": Record<string, unknown>;
};

function guideTitle(page: Pick<GuidePage, "frontmatter">) {
  return page.frontmatter.title
    ? `${page.frontmatter.title} | ${SITE_NAME}`
    : `${m.navGuides()} | ${SITE_NAME}`;
}

function guideDescription(page: Pick<GuidePage, "frontmatter">) {
  return page.frontmatter.description ?? getDefaultDescription();
}

function guideImage(page: Pick<GuidePage, "frontmatter">) {
  const image = page.frontmatter.image;
  if (!image) return DEFAULT_OG_IMAGE_URL;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return canonicalUrl(image);
}

function guideJsonLd(page: Pick<GuidePage, "url" | "frontmatter">) {
  const url = canonicalUrl(page.url);
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.frontmatter.title ?? SITE_NAME,
    description: guideDescription(page),
    url,
    mainEntityOfPage: url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: guideImage(page),
    audience: {
      "@type": "Audience",
      audienceType: "Software developers",
    },
    about: page.frontmatter.tags?.length ? page.frontmatter.tags : undefined,
  };

  if (page.frontmatter.updated) {
    article.datePublished = page.frontmatter.updated;
    article.dateModified = page.frontmatter.updated;
  }

  if (page.frontmatter.keywords?.length) {
    article.keywords = page.frontmatter.keywords.join(", ");
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: m.navGuides(),
        item: canonicalUrl("/guides"),
      },
      ...(page.frontmatter.title
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: page.frontmatter.title,
              item: url,
            },
          ]
        : []),
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [article, breadcrumbs],
  };
}

export function guidePageHead(page: Pick<GuidePage, "url" | "frontmatter">) {
  const title = guideTitle(page);
  const description = guideDescription(page);
  const url = canonicalUrl(page.url);
  const image = guideImage(page);
  const twitterImage = image === DEFAULT_OG_IMAGE_URL ? DEFAULT_X_IMAGE_URL : image;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: DEFAULT_ROBOTS },
      ...(page.frontmatter.keywords?.length
        ? [{ name: "keywords", content: page.frontmatter.keywords.join(", ") }]
        : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: twitterImage },
      { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { "script:ld+json": guideJsonLd(page) } satisfies JsonLdMeta,
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
