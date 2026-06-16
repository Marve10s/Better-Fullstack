import type { DocPage } from "./source";
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

type JsonLdMeta = {
  "script:ld+json": Record<string, unknown>;
};

function docsPageTitle(page: Pick<DocPage, "frontmatter">) {
  return page.frontmatter.title
    ? `${page.frontmatter.title} | ${SITE_NAME}`
    : `${m.navDocs()} | ${SITE_NAME}`;
}

function docsPageDescription(page: Pick<DocPage, "frontmatter">) {
  return page.frontmatter.description ?? getDefaultDescription();
}

function docsPageImage(page: Pick<DocPage, "frontmatter">) {
  const image = page.frontmatter.image;
  if (!image) return DEFAULT_OG_IMAGE_URL;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return canonicalUrl(image);
}

export function docsPageJsonLd(page: Pick<DocPage, "url" | "frontmatter">) {
  const url = canonicalUrl(page.url);
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.frontmatter.title ?? SITE_NAME,
    description: docsPageDescription(page),
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
    image: docsPageImage(page),
  };

  if (page.frontmatter.updated) {
    jsonLd.dateModified = page.frontmatter.updated;
  }

  return jsonLd;
}

export function docsPageHead(page: Pick<DocPage, "url" | "frontmatter">) {
  const title = docsPageTitle(page);
  const description = docsPageDescription(page);
  const url = canonicalUrl(page.url);
  const image = docsPageImage(page);
  const twitterImage = image === DEFAULT_OG_IMAGE_URL ? DEFAULT_X_IMAGE_URL : image;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: DEFAULT_ROBOTS },
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
      { "script:ld+json": docsPageJsonLd(page) } satisfies JsonLdMeta,
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
