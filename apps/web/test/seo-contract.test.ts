import { OPTION_CATEGORY_METADATA } from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import { blogPostHead } from "../src/lib/blog/seo";
import { docsPageHead } from "../src/lib/docs/seo";
import { guidePageHead } from "../src/lib/guides/seo";
import { generateLlmsTxt } from "../src/lib/llms";
import { OPTION_COUNT_LABEL } from "../src/lib/project-stats";
import { NOINDEX_ROBOTS } from "../src/lib/robots";
import { buildPageHead, canonicalUrl, getSiteJsonLd, SITE_NAME } from "../src/lib/seo";
import {
  generateSitemapXmlFromEntries,
  getSitemapEntriesFromPages,
} from "../src/lib/sitemap-core";

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

    expect(config.redirects).toContainEqual({
      source: "/:path*",
      has: [{ type: "host", value: "better-fullstack-web.vercel.app" }],
      destination: "https://better-fullstack.dev/:path*",
      permanent: true,
    });
  });

  it("includes docs, guides, stack pages, MCP, and the benchmark runner in the dynamic sitemap", () => {
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
    expect(paths).toContain("/run");
    expect(paths).toContain("/templates");
    expect(paths).not.toContain("/stack");
    expect(paths).toContain("/stack/nextjs-hono-drizzle-better-auth");
    expect(paths).not.toContain("/analytics");
    expect(xml).toContain(canonicalUrl("/docs/cli/create"));
    expect(xml).toContain(canonicalUrl("/guides/typescript/create-tanstack-start-project"));
    expect(xml).toContain(canonicalUrl("/stack/nextjs-hono-drizzle-better-auth"));
    expect(xml).not.toContain(canonicalUrl("/analytics"));
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
        title: `ScaffBench 2 | ${SITE_NAME}`,
        url: "/blog/scaffbench-2",
        head: blogPostHead({
          url: "/blog/scaffbench-2",
          frontmatter: {
            title: "ScaffBench 2",
            description: "Benchmarking fullstack scaffolding agents.",
            date: "2026-06-26",
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
    expect(head.meta).toContainEqual({
      property: "og:url",
      content: canonicalUrl("/docs/cli/create"),
    });
  });

  it("generates llms.txt from current source data", () => {
    const llms = generateLlmsTxt({
      docsPages: [
        {
          url: "/docs/ai/mcp-tools",
          slug: ["ai", "mcp-tools"],
          frontmatter: {
            title: "MCP Tools Reference",
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
    expect(llms).toContain("https://better-fullstack.dev/guides/typescript/create-tanstack-start-project");
    expect(llms).toContain("https://better-fullstack.dev/docs/ai/mcp-tools");
    expect(llms).toContain("## Stack Templates");
    expect(llms).toContain("https://better-fullstack.dev/stack/nextjs-hono-drizzle-better-auth");
  });

  it("uses existing manifest icon paths", async () => {
    const manifest = (await Bun.file("public/favicon/site.webmanifest").json()) as {
      icons: Array<{ src: string }>;
    };

    const iconExists = await Promise.all(
      manifest.icons.map((icon) => Bun.file(`public${icon.src}`).exists()),
    );

    expect(iconExists).toEqual(manifest.icons.map(() => true));
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
