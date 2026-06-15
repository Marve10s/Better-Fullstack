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

import type { BlogPost } from "./source";

type JsonLdMeta = {
  "script:ld+json": Record<string, unknown>;
};

function postTitle(post: Pick<BlogPost, "frontmatter">) {
  return post.frontmatter.title
    ? `${post.frontmatter.title} | ${SITE_NAME}`
    : `${m.navBlog()} | ${SITE_NAME}`;
}

function postDescription(post: Pick<BlogPost, "frontmatter">) {
  return post.frontmatter.description ?? getDefaultDescription();
}

function postImage(post: Pick<BlogPost, "frontmatter">) {
  const image = post.frontmatter.image;
  if (!image) return DEFAULT_OG_IMAGE_URL;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return canonicalUrl(image);
}

function postJsonLd(post: Pick<BlogPost, "url" | "frontmatter">) {
  const url = canonicalUrl(post.url);
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title ?? SITE_NAME,
    description: postDescription(post),
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
    image: postImage(post),
    audience: {
      "@type": "Audience",
      audienceType: "Software developers",
    },
    about: post.frontmatter.tags?.length ? post.frontmatter.tags : undefined,
  };

  if (post.frontmatter.date) {
    article.datePublished = post.frontmatter.date;
    article.dateModified = post.frontmatter.date;
  }

  if (post.frontmatter.authors?.length) {
    article.author = post.frontmatter.authors.map((name) => ({
      "@type": "Person",
      name,
    }));
  }

  if (post.frontmatter.keywords?.length) {
    article.keywords = post.frontmatter.keywords.join(", ");
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
        name: m.navBlog(),
        item: canonicalUrl("/blog"),
      },
      ...(post.frontmatter.title
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: post.frontmatter.title,
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

export function blogPostHead(post: Pick<BlogPost, "url" | "frontmatter">) {
  const title = postTitle(post);
  const description = postDescription(post);
  const url = canonicalUrl(post.url);
  const image = postImage(post);
  const twitterImage = image === DEFAULT_OG_IMAGE_URL ? DEFAULT_X_IMAGE_URL : image;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: DEFAULT_ROBOTS },
      ...(post.frontmatter.keywords?.length
        ? [{ name: "keywords", content: post.frontmatter.keywords.join(", ") }]
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
      { "script:ld+json": postJsonLd(post) } satisfies JsonLdMeta,
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function blogIndexHead() {
  const title = `${m.navBlog()} | ${SITE_NAME}`;
  const description = m.blogDescription();
  const url = canonicalUrl("/blog");

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
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
