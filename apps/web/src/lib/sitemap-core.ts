import { canonicalUrl } from "@/lib/seo";

type SitemapEntry = {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly";
  lastmod?: string;
  priority?: number;
};

type SitemapContentPage = {
  slug: string[];
  frontmatter: {
    updated?: string;
  };
};

const staticSitemapEntries: SitemapEntry[] = [
  { path: "/", changefreq: "daily", priority: 1 },
  { path: "/new", changefreq: "daily", priority: 0.9 },
  { path: "/compare", changefreq: "weekly", priority: 0.8 },
  { path: "/mcp", changefreq: "weekly", priority: 0.7 },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function docsPath(slug: string[]) {
  return slug.length ? `/docs/${slug.join("/")}` : "/docs";
}

function guidesPath(slug: string[]) {
  return slug.length ? `/guides/${slug.join("/")}` : "/guides";
}

export function getSitemapEntriesFromPages({
  docsPages,
  guidePages,
}: {
  docsPages: SitemapContentPage[];
  guidePages: SitemapContentPage[];
}): SitemapEntry[] {
  const docsEntries = docsPages.map((page): SitemapEntry => {
    return {
      path: docsPath(page.slug),
      changefreq: "weekly",
      lastmod: page.frontmatter.updated,
      priority: page.slug.length === 0 ? 0.75 : 0.65,
    };
  });

  const guideEntries = guidePages.map((page): SitemapEntry => {
    return {
      path: guidesPath(page.slug),
      changefreq: "weekly",
      lastmod: page.frontmatter.updated,
      priority: page.slug.length === 0 ? 0.85 : 0.7,
    };
  });

  const entriesByUrl = new Map<string, SitemapEntry>();
  for (const entry of [...staticSitemapEntries, ...docsEntries, ...guideEntries]) {
    entriesByUrl.set(canonicalUrl(entry.path), entry);
  }

  return Array.from(entriesByUrl.values()).sort((a, b) =>
    canonicalUrl(a.path).localeCompare(canonicalUrl(b.path)),
  );
}

export function generateSitemapXmlFromEntries(entries: SitemapEntry[]) {
  const urls = entries
    .map((entry) => {
      const lines = [
        "  <url>",
        `    <loc>${escapeXml(canonicalUrl(entry.path))}</loc>`,
      ];

      if (entry.changefreq) {
        lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      }

      if (entry.lastmod) {
        lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
      }

      if (entry.priority !== undefined) {
        lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }

      lines.push("  </url>");
      return lines.join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}
