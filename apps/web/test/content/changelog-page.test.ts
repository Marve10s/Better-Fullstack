import { describe, expect, it } from "bun:test";

import { changelogHead } from "@/lib/changelog/seo";
import { generateLlmsFullTxt, generateLlmsTxt, generateMarkdownSitemap } from "@/lib/content/llms";
import { canonicalUrl, SITE_NAME } from "@/lib/seo/seo";
import { generateSitemapXmlFromEntries, getSitemapEntriesFromPages } from "@/lib/seo/sitemap-core";
import { normalizeReleaseNotes, renderChangelog } from "@scripts/generate-changelog";

const changelogPage = {
  url: "/changelog",
  slug: [],
  frontmatter: {
    title: "Changelog",
    description: "Release notes for every published Better Fullstack version.",
    updated: "2026-10-02",
  },
};

const EM_DASH = String.fromCodePoint(0x2014);
const RELEASE_HEADING = /^## (v\d+\.\d+\.\d+)\n\nReleased (.+) · \[GitHub release\]\((.+)\)$/gm;

describe("changelog page contract", () => {
  it("renders canonical, social, and structured metadata without alternate-language links", () => {
    const head = changelogHead(changelogPage);
    const canonical = canonicalUrl("/changelog");
    const title = `Changelog | ${SITE_NAME}`;

    expect(head.meta).toContainEqual({ title });
    expect(head.links).toContainEqual({ rel: "canonical", href: canonical });
    expect(head.links).toContainEqual({
      rel: "alternate",
      type: "text/markdown",
      href: `${canonical}.md`,
    });
    expect(head.links.some((link) => "hreflang" in link)).toBe(false);
    expect(head.meta).toContainEqual({ property: "og:title", content: title });
    expect(head.meta).toContainEqual({ property: "og:url", content: canonical });
    expect(head.meta).toContainEqual({ property: "og:type", content: "website" });
    expect(head.meta).toContainEqual({ property: "og:image", content: expect.any(String) });

    const structuredData = head.meta.find((meta) => "script:ld+json" in meta) as {
      "script:ld+json": { "@graph": Array<Record<string, unknown>> };
    };
    expect(structuredData["script:ld+json"]["@graph"]).toContainEqual(
      expect.objectContaining({
        "@type": "CollectionPage",
        url: canonical,
        dateModified: "2026-10-02",
      }),
    );
  });

  it("lists the changelog in sitemap.xml, sitemap.md, llms.txt, and llms-full.txt", () => {
    const entries = getSitemapEntriesFromPages({
      docsPages: [],
      guidePages: [],
      changelogPages: [changelogPage],
    });
    const xml = generateSitemapXmlFromEntries(entries);
    const llms = generateLlmsTxt({ docsPages: [], guidePages: [] });
    const full = generateLlmsFullTxt({
      docsPages: [],
      guidePages: [],
      blogPages: [],
      changelogPages: [changelogPage],
      rawDocsPages: {},
      rawGuidePages: {},
      rawBlogPosts: {},
      rawChangelogPages: { "": "---\ntitle: Changelog\n---\n\n## v2.7.0\n\nRelease body." },
    });
    const markdownSitemap = generateMarkdownSitemap({
      docsPages: [],
      guidePages: [],
      blogPages: [],
      changelogPages: [changelogPage],
    });

    expect(entries).toContainEqual(
      expect.objectContaining({ path: "/changelog", lastmod: "2026-10-02" }),
    );
    expect(xml).toContain(`<loc>${canonicalUrl("/changelog")}</loc>`);
    expect(llms).toContain(`(${canonicalUrl("/changelog")})`);
    expect(full).toContain(`Source: ${canonicalUrl("/changelog.md")}`);
    expect(full).toContain("Release body.");
    expect(full).not.toContain("title: Changelog");
    expect(markdownSitemap).toContain(`(${canonicalUrl("/changelog.md")})`);
  });

  it("registers only /changelog and its Markdown copy, so other sub-paths fall through to 404", async () => {
    const generated = await Bun.file("src/routeTree.gen.ts").text();
    const changelogPaths = [...generated.matchAll(/path: '(\/changelog[^']*)'/g)].map(
      (match) => match[1],
    );

    expect(new Set(changelogPaths)).toEqual(new Set(["/changelog", "/changelog.md"]));
  });

  it("keeps the generated changelog newest first with a GitHub link and anchor per version", async () => {
    const source = await Bun.file("content/changelog/index.mdx").text();
    const releases = [...source.matchAll(RELEASE_HEADING)].map((match) => ({
      version: match[1],
      date: Date.parse(`${match[2]} UTC`),
      href: match[3],
    }));
    const headings = source.match(/^#{1,6} /gm) ?? [];

    expect(releases.length).toBeGreaterThan(0);
    expect(headings).toHaveLength(releases.length);
    expect(new Set(releases.map((release) => release.version)).size).toBe(releases.length);
    for (const release of releases) {
      expect(release.href).toBe(
        `https://github.com/Marve10s/Better-Fullstack/releases/tag/${release.version}`,
      );
    }
    expect(releases.map((release) => release.date)).toEqual(
      releases.map((release) => release.date).sort((a, b) => b - a),
    );
    expect(source).toContain(
      `updated: "${new Date(releases[0].date).toISOString().slice(0, 10)}"`,
    );
    expect(source).not.toContain(EM_DASH);
  });

  it("normalizes GitHub release notes into MDX-safe Markdown", () => {
    const notes = normalizeReleaseNotes(
      [
        "<!-- generated -->",
        "### &nbsp;&nbsp;🚀 Features",
        "- Add pages at /stack/<slug> for {name} &nbsp;-&nbsp; by @dev [<samp>(abc12)</samp>](https://example.com)",
        "- Keep `Record<string, {a: 1}>` in code " + EM_DASH + " unchanged",
        "```ts",
        "const value = <T,>(input: T) => input;",
        "```",
      ].join("\n"),
    );

    expect(notes).toBe(
      [
        "**🚀 Features**",
        "",
        "- Add pages at /stack/\\<slug> for \\{name\\} - by @dev [(abc12)](https://example.com)",
        "- Keep `Record<string, {a: 1}>` in code - unchanged",
        "```ts",
        "const value = <T,>(input: T) => input;",
        "```",
      ].join("\n"),
    );
  });

  it("skips drafts and prereleases and orders releases by publish date", () => {
    const output = renderChangelog([
      {
        tag_name: "v1.0.0",
        html_url: "https://github.com/Marve10s/Better-Fullstack/releases/tag/v1.0.0",
        body: "First",
        draft: false,
        prerelease: false,
        published_at: "2026-01-01T00:00:00Z",
      },
      {
        tag_name: "v1.2.0",
        html_url: "https://github.com/Marve10s/Better-Fullstack/releases/tag/v1.2.0",
        body: "Draft",
        draft: true,
        prerelease: false,
        published_at: null,
      },
      {
        tag_name: "v1.1.0",
        html_url: "https://github.com/Marve10s/Better-Fullstack/releases/tag/v1.1.0",
        body: "Second",
        draft: false,
        prerelease: false,
        published_at: "2026-02-01T00:00:00Z",
      },
    ]);

    expect(output).toContain('updated: "2026-02-01"');
    expect(output.indexOf("## v1.1.0")).toBeLessThan(output.indexOf("## v1.0.0"));
    expect(output).not.toContain("v1.2.0");
  });
});
