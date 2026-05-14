import { describe, expect, it } from "bun:test";

import { docsPageHead } from "../src/lib/docs/seo";
import { generateLlmsTxt } from "../src/lib/llms";
import { OPTION_COUNT_LABEL } from "../src/lib/project-stats";
import { NOINDEX_ROBOTS } from "../src/lib/robots";
import { canonicalUrl } from "../src/lib/seo";
import {
  generateSitemapXmlFromEntries,
  getSitemapEntriesFromPages,
} from "../src/lib/sitemap-core";

describe("SEO contracts", () => {
  it("includes docs, guides, and MCP in the dynamic sitemap", () => {
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
    });
    const xml = generateSitemapXmlFromEntries(entries);
    const paths = new Set(entries.map((entry) => entry.path));

    expect(paths).toContain("/docs/cli/create");
    expect(paths).toContain("/guides/typescript/create-tanstack-start-project");
    expect(paths).toContain("/mcp");
    expect(xml).toContain(canonicalUrl("/docs/cli/create"));
    expect(xml).toContain(canonicalUrl("/guides/typescript/create-tanstack-start-project"));
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
    });

    expect(llms).toContain(`${OPTION_COUNT_LABEL} options`);
    expect(llms).toContain("https://better-fullstack.dev/guides/typescript/create-tanstack-start-project");
    expect(llms).toContain("https://better-fullstack.dev/docs/ai/mcp-tools");
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
