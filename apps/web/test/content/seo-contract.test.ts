import { OPTION_CATEGORY_METADATA } from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import { blogPostHead } from "@/lib/blog/seo";
import {
  generateDocsLlmsTxt,
  generateLlmsFullTxt,
  generateLlmsTxt,
  generateMarkdownSitemap,
} from "@/lib/content/llms";
import { docsPageHead } from "@/lib/docs/seo";
import { guidePageHead } from "@/lib/guides/seo";
import { OPTION_COUNT_LABEL } from "@/lib/project/project-stats";
import { NOINDEX_ROBOTS } from "@/lib/seo/robots";
import { buildPageHead, canonicalUrl, getSiteJsonLd, SITE_NAME } from "@/lib/seo/seo";
import { generateSitemapXmlFromEntries, getSitemapEntriesFromPages } from "@/lib/seo/sitemap-core";

function countUniqueOptions(categoryMatches: (category: string) => boolean) {
  const optionIds = new Set<string>();

  for (const [category, metadata] of Object.entries(OPTION_CATEGORY_METADATA)) {
    if (!categoryMatches(category)) continue;
    for (const option of metadata.options) {
      if (option.id !== "none") optionIds.add(option.id);
    }
  }

  return optionIds.size;
}

function matchesCategoryFamily(category: string, family: string) {
  const suffix = `${family.charAt(0).toUpperCase()}${family.slice(1)}`;
  return category === family || category.endsWith(suffix);
}

describe("SEO contracts", () => {
  it("redirects the public Vercel alias to the canonical domain", async () => {
    const config = (await Bun.file("vercel.json").json()) as {
      redirects?: Array<{
        source: string;
        destination: string;
        permanent?: boolean;
        has?: Array<{ type: string; value?: string }>;
      }>;
    };

    expect(config.redirects?.some((redirect) => redirect.destination === "/benchmark")).toBe(false);
    expect(config.redirects).toContainEqual({
      source: "/:path*",
      has: [{ type: "host", value: "better-fullstack-web.vercel.app" }],
      destination: "https://better-fullstack.dev/:path*",
      permanent: true,
    });
  });

  it("includes product pages and excludes retired benchmark pages from the dynamic sitemap", () => {
    const entries = getSitemapEntriesFromPages({
      docsPages: [
        { slug: [], frontmatter: { updated: "2026-05-12" } },
        { slug: ["cli", "create"], frontmatter: { updated: "2026-05-12" } },
      ],
      guidePages: [
        { slug: [], frontmatter: { updated: "2026-05-12" } },
        {
          slug: ["typescript", "create-tanstack-start-project"],
          frontmatter: { updated: "2026-05-12" },
        },
      ],
      stackPages: [
        {
          slug: "nextjs-hono-drizzle-better-auth",
          updated: "2026-07-17",
        },
      ],
    });
    const xml = generateSitemapXmlFromEntries(entries);
    const paths = new Set(entries.map((entry) => entry.path));

    expect(paths).toContain("/docs/cli/create");
    expect(paths).toContain("/guides/typescript/create-tanstack-start-project");
    expect(paths).toContain("/mcp");
    expect(paths).not.toContain("/run");
    expect(paths).not.toContain("/benchmark");
    expect(paths).toContain("/templates");
    expect(paths).not.toContain("/stack");
    expect(paths).toContain("/stack/nextjs-hono-drizzle-better-auth");
    expect(paths).not.toContain("/analytics");
    expect(paths).not.toContain("/telemetry");
    expect(xml).toContain(canonicalUrl("/docs/cli/create"));
    expect(xml).toContain(canonicalUrl("/guides/typescript/create-tanstack-start-project"));
    expect(xml).toContain(canonicalUrl("/stack/nextjs-hono-drizzle-better-auth"));
    expect(xml).not.toContain(canonicalUrl("/analytics"));
    expect(xml).not.toContain(canonicalUrl("/telemetry"));
  });

  it("adds video discovery metadata when content declares an MP4", () => {
    const videoPath = "/search-media/tanstack-start-fullstack-1200x630.mp4";
    const head = guidePageHead({
      url: "/guides/typescript/tanstack-start-postgres-drizzle",
      frontmatter: {
        title: "TanStack Start with PostgreSQL and Drizzle",
        description: "A compatibility-checked TanStack Start guide.",
        updated: "2026-07-30",
        image: "/search-media/tanstack-start-fullstack-1200x630.png",
        video: videoPath,
      },
    });

    expect(head.meta).toContainEqual({
      property: "og:video",
      content: canonicalUrl(videoPath),
    });
    const structuredData = head.meta.find((meta) => "script:ld+json" in meta) as {
      "script:ld+json": { "@graph": Array<{ "@type": string }> };
    };
    expect(structuredData["script:ld+json"]["@graph"]).toContainEqual(
      expect.objectContaining({ "@type": "VideoObject" }),
    );
  });

  it("builds complete page heads with matching canonical and social metadata", () => {
    const head = buildPageHead({
      title: `Shared Stack | ${SITE_NAME}`,
      description: "Open a shared Better Fullstack builder configuration.",
      path: "/stack",
    });

    expect(head.links).toContainEqual({ rel: "canonical", href: canonicalUrl("/stack") });
    expect(head.meta).toContainEqual({ name: "robots", content: expect.any(String) });
    expect(head.meta).toContainEqual({ property: "og:type", content: "website" });
    expect(head.meta).toContainEqual({ property: "og:image", content: expect.any(String) });
    expect(head.meta).toContainEqual({ name: "twitter:card", content: "summary_large_image" });
    expect(head.meta).toContainEqual({ name: "twitter:image", content: expect.any(String) });
  });

  it("keeps render failures out of search results and provides a stable site name", async () => {
    const website = getSiteJsonLd()["@graph"].find((entry) => entry["@type"] === "WebSite");
    const rootRouteSource = await Bun.file("src/routes/__root.tsx").text();
    const navbarSource = await Bun.file("src/components/navbar.tsx").text();

    expect(website).toEqual(
      expect.objectContaining({
        name: SITE_NAME,
        alternateName: "Better-Fullstack",
      }),
    );
    expect(rootRouteSource).toContain("errorComponent: RootErrorComponent");
    expect(rootRouteSource).toContain('<meta name="robots" content={NOINDEX_ROBOTS} />');
    expect(rootRouteSource).toContain("<title>{ERROR_PAGE_TITLE}</title>");
    expect(navbarSource).toContain('data-brand-short="b/f"');
    expect(navbarSource).toContain('data-brand-full="better/fullstack"');
    expect(navbarSource).not.toContain('<span className="sm:hidden">');
  });

  it("keeps every SoftwareApplication feature count derived from option metadata", () => {
    const expectedCounts = {
      "frontend frameworks": countUniqueOptions((category) => category.endsWith("Frontend")),
      "backend frameworks": countUniqueOptions(
        (category) => category === "backend" || category.endsWith("WebFramework"),
      ),
      databases: countUniqueOptions((category) => category === "database"),
      ORMs: countUniqueOptions((category) => matchesCategoryFamily(category, "orm")),
      "auth providers": countUniqueOptions((category) => matchesCategoryFamily(category, "auth")),
      "payment integrations": countUniqueOptions((category) => category === "payments"),
      "AI integrations": countUniqueOptions((category) => matchesCategoryFamily(category, "ai")),
      "type-safe API options": countUniqueOptions((category) =>
        matchesCategoryFamily(category, "api"),
      ),
      "deployment targets": countUniqueOptions((category) => category.endsWith("Deploy")),
    };
    const softwareApplication = getSiteJsonLd()["@graph"].find(
      (entry) => entry["@type"] === "SoftwareApplication",
    ) as { featureList: string[] };
    const renderedCounts = Object.fromEntries(
      softwareApplication.featureList.flatMap((feature) => {
        const match = /^(\d+) (.+)$/.exec(feature);
        return match ? [[match[2], Number(match[1])]] : [];
      }),
    );

    expect(renderedCounts).toEqual(expectedCounts);
  });

  it("renders complete metadata and JSON-LD for docs, guides, and blog posts", () => {
    const pages = [
      {
        title: `Create Command | ${SITE_NAME}`,
        url: "/docs/cli/create",
        head: docsPageHead({
          url: "/docs/cli/create",
          frontmatter: {
            title: "Create Command",
            description: "Full reference for create-better-fullstack flags.",
          },
        }),
      },
      {
        title: `Create a TanStack Start Project | ${SITE_NAME}`,
        url: "/guides/typescript/create-tanstack-start-project",
        head: guidePageHead({
          url: "/guides/typescript/create-tanstack-start-project",
          frontmatter: {
            title: "Create a TanStack Start Project",
            description: "Create a TanStack Start app with Better Fullstack.",
          },
        }),
      },
      {
        title: `Drizzle vs Prisma for a fullstack starter | ${SITE_NAME}`,
        url: "/blog/drizzle-vs-prisma",
        head: blogPostHead({
          url: "/blog/drizzle-vs-prisma",
          frontmatter: {
            title: "Drizzle vs Prisma for a fullstack starter",
            description:
              "Choose Drizzle or Prisma by schema ownership, query style, migration workflow, deployment constraints, and team habits, not by a generic winner.",
            date: "2026-07-30",
          },
        }),
      },
    ];

    for (const page of pages) {
      const canonical = canonicalUrl(page.url);

      expect(page.head.meta).toContainEqual({ title: page.title });
      expect(page.head.links).toContainEqual({ rel: "canonical", href: canonical });
      expect(page.head.meta).toContainEqual({ property: "og:title", content: page.title });
      expect(page.head.meta).toContainEqual({ property: "og:url", content: canonical });
      expect(page.head.meta).toContainEqual({ property: "og:image", content: expect.any(String) });
      expect(page.head.meta.some((meta) => "script:ld+json" in meta)).toBe(true);
    }
  });

  it("keeps docs canonical URLs page-specific", () => {
    const head = docsPageHead({
      url: "/docs/cli/create",
      frontmatter: {
        title: "Create Command",
        description: "Full reference for create-better-fullstack flags.",
      },
    });

    expect(head.links).toContainEqual({
      rel: "canonical",
      href: canonicalUrl("/docs/cli/create"),
    });
    expect(head.links).toContainEqual({
      rel: "alternate",
      type: "text/markdown",
      href: canonicalUrl("/docs/cli/create.md"),
    });
    expect(head.meta).toContainEqual({
      property: "og:url",
      content: canonicalUrl("/docs/cli/create"),
    });
  });

  it("generates llms.txt from current source data", () => {
    const llms = generateLlmsTxt({
      docsPages: [
        {
          url: "/docs/ai/mcp",
          slug: ["ai", "mcp"],
          frontmatter: {
            title: "MCP Server",
            description: "Detailed reference for Better Fullstack MCP tools.",
          },
        },
      ],
      guidePages: [
        {
          url: "/guides/typescript/create-tanstack-start-project",
          slug: ["typescript", "create-tanstack-start-project"],
          frontmatter: {
            title: "Create a TanStack Start Project",
            description: "Create a TanStack Start fullstack app with Better Fullstack.",
          },
        },
      ],
      stackPages: [
        {
          slug: "nextjs-hono-drizzle-better-auth",
          title: "Next.js + Hono + Drizzle + Better Auth Starter",
          description: "Compatibility-checked generated stack.",
          ecosystem: "typescript",
        },
      ],
    });

    expect(llms).toContain(`${OPTION_COUNT_LABEL} options`);
    expect(llms).toContain(
      "https://better-fullstack.dev/guides/typescript/create-tanstack-start-project",
    );
    expect(llms).toContain("https://better-fullstack.dev/docs/ai/mcp");
    expect(llms).toContain("## Stack Templates");
    expect(llms).toContain("https://better-fullstack.dev/stack/nextjs-hono-drizzle-better-auth");
  });

  it("generates scoped, full-corpus, and semantic Markdown indexes", () => {
    const docsPages = [
      {
        url: "/docs/cli/update",
        slug: ["cli", "update"],
        frontmatter: {
          title: "Update Projects",
          description: "Safely update a generated project.",
          updated: "2026-08-07",
        },
      },
    ];
    const guidePages = [
      {
        url: "/guides/typescript/example",
        slug: ["typescript", "example"],
        frontmatter: { title: "Example Guide", description: "A complete guide." },
      },
    ];
    const blogPages = [
      {
        url: "/blog/example",
        slug: ["example"],
        frontmatter: { title: "Example Article", description: "An engineering article." },
      },
    ];

    const scoped = generateDocsLlmsTxt(docsPages, {
      cliVersion: "9.9.9",
      generatedAt: "Aug 7, 2026",
    });
    const full = generateLlmsFullTxt({
      docsPages,
      guidePages,
      blogPages,
      rawDocsPages: {
        "cli/update": "---\ntitle: Update Projects\n---\n\nUpdate body.",
      },
      rawGuidePages: { "typescript/example": "Guide body." },
      rawBlogPosts: { example: "Article body." },
    });
    const sitemap = generateMarkdownSitemap({ docsPages, guidePages, blogPages });

    expect(scoped).toContain("CLI version: 9.9.9");
    expect(scoped).toContain("/docs/cli/update.md");
    expect(full).toContain("Update body.");
    expect(full).toContain("Guide body.");
    expect(full).toContain("Article body.");
    expect(full).not.toContain("title: Update Projects");
    expect(sitemap).toContain("/docs/cli/update.md");
    expect(sitemap).toContain("/guides/typescript/example.md");
    expect(sitemap).toContain("/llms-full.txt");
  });

  it("uses existing manifest icon paths", async () => {
    const manifest = (await Bun.file("public/favicon/site.webmanifest").json()) as {
      theme_color: string;
      background_color: string;
      icons: Array<{ src: string }>;
    };

    const iconExists = await Promise.all(
      manifest.icons.map((icon) => Bun.file(`public${icon.src}`).exists()),
    );

    expect(iconExists).toEqual(manifest.icons.map(() => true));
    expect(manifest.theme_color).toBe("#0e0e10");
    expect(manifest.background_color).toBe("#0e0e10");

    const faviconFiles = [
      "public/favicon.ico",
      "public/favicon/favicon.svg",
      "public/favicon/favicon-16x16.png",
      "public/favicon/favicon-32x32.png",
      "public/favicon/favicon-48x48.png",
      "public/favicon/favicon-96x96.png",
      "public/favicon/apple-touch-icon.png",
    ];
    expect(await Promise.all(faviconFiles.map((path) => Bun.file(path).exists()))).toEqual(
      faviconFiles.map(() => true),
    );

    const faviconSvg = await Bun.file("public/favicon/favicon.svg").text();
    expect(faviconSvg).toContain("#0E0E10");
    expect(faviconSvg).toContain("#F2EEEE");
    expect(faviconSvg).toContain("#C6E853");
  });

  it("keeps non-content API responses out of search indexes", async () => {
    const apiRoutes = ["src/routes/api/stats.ts", "src/routes/api/preview.ts"];
    const routeSources = await Promise.all(apiRoutes.map((route) => Bun.file(route).text()));

    expect(NOINDEX_ROBOTS).toBe("noindex, nofollow, noarchive");
    for (const source of routeSources) {
      expect(source).toContain('"X-Robots-Tag"');
      expect(source).toContain("NOINDEX_ROBOTS");
    }
  });
});
