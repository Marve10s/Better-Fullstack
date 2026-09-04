import { ECOSYSTEM_COUNT_LABEL, ECOSYSTEM_NAMES, OPTION_COUNT_LABEL } from "@/lib/project/project-stats";
import { SITE_NAME, SITE_URL, canonicalUrl } from "@/lib/seo/seo";

type LlmsPage = {
  url: string;
  slug: string[];
  frontmatter: {
    title?: string;
    description?: string;
    updated?: string;
  };
};

type LlmsStackPage = {
  slug: string;
  title: string;
  description: string;
  ecosystem: string;
};

function pageLine(title: string | undefined, url: string, description?: string) {
  const label = title ?? url;
  const suffix = description ? ` - ${description}` : "";
  return `- [${label}](${canonicalUrl(url)})${suffix}`;
}

export function generateLlmsTxt({
  docsPages,
  guidePages,
  blogPages = [],
  stackPages = [],
}: {
  docsPages: LlmsPage[];
  guidePages: LlmsPage[];
  blogPages?: LlmsPage[];
  stackPages?: LlmsStackPage[];
}) {
  const visibleGuidePages = guidePages.filter((page) => page.slug.length > 0);
  const featuredDocs = docsPages.filter((page) =>
    [
      "/docs",
      "/docs/getting-started/lifecycle",
      "/docs/cli/create",
      "/docs/cli/add",
      "/docs/cli/update",
      "/docs/cli/experimental",
      "/docs/ai/overview",
      "/docs/ai/mcp",
      "/docs/ecosystems",
      "/docs/ecosystems/multi-ecosystem",
      "/docs/ecosystems/native-apps",
      "/docs/builder",
      "/docs/choosing-a-stack",
    ].includes(page.url),
  );
  const stackPagesByEcosystem = new Map<string, LlmsStackPage[]>();
  for (const page of stackPages) {
    const ecosystemPages = stackPagesByEcosystem.get(page.ecosystem);
    if (ecosystemPages) ecosystemPages.push(page);
    else stackPagesByEcosystem.set(page.ecosystem, [page]);
  }
  const stackTemplateLines: string[] = [];
  for (const [ecosystem, pages] of stackPagesByEcosystem) {
    stackTemplateLines.push(
      `### ${ecosystem === "typescript" ? "TypeScript" : ecosystem[0].toUpperCase() + ecosystem.slice(1)}`,
      "",
      ...pages.map((page) => pageLine(page.title, `/stack/${page.slug}`, page.description)),
      "",
    );
  }

  return [
    `# ${SITE_NAME}`,
    "",
    `> Scaffold configurable fullstack projects. Pick your stack from ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_NAMES.join(", ")}, then inspect the generated result and its evidence.`,
    "",
    `${SITE_NAME} is an open-source CLI tool and visual web builder for generating configured fullstack applications. It supports ${ECOSYSTEM_COUNT_LABEL} language ecosystems and helps developers combine frontend frameworks, backend frameworks, databases, ORMs, authentication, payments, AI integrations, deployment targets, and project tooling.`,
    "",
    "## Key Facts",
    "",
    "- Package: `create-better-fullstack` on npm",
    "- Install: `bun create better-fullstack@latest`",
    "- Also supports npm, pnpm, and yarn create flows",
    "- License: MIT",
    "- Repository: https://github.com/Marve10s/Better-Fullstack",
    `- Website: ${SITE_URL}/`,
    `- Stack Builder: ${canonicalUrl("/new")}`,
    "",
    "## Supported Ecosystems",
    "",
    ...ECOSYSTEM_NAMES.map((ecosystem) => `- ${ecosystem}`),
    "",
    "## Primary Pages",
    "",
    pageLine("Homepage", "/", "Product overview and primary CLI install path"),
    pageLine("Stack Builder", "/new", "Visual compatible stack builder and command generator"),
    pageLine(
      "Starter Templates",
      "/templates",
      "Crawlable catalog of compatibility-checked generated stack selections",
    ),
    pageLine("Compare", "/compare", "Comparison against other scaffolders and starter kits"),
    pageLine("MCP", "/mcp", "AI agent integration overview"),
    pageLine("Docs", "/docs", "Documentation index"),
    pageLine("Docs index for agents", "/docs/llms.txt", "Every documentation page"),
    pageLine("Full documentation corpus", "/llms-full.txt", "Product docs, guides, and blog text"),
    pageLine("Markdown sitemap", "/sitemap.md", "Semantic index of public content"),
    pageLine("Guides", "/guides", "Stack-specific starter guides"),
    pageLine("Blog", "/blog", "Engineering write-ups"),
    "",
    "## Important Docs",
    "",
    ...featuredDocs.map((page) =>
      pageLine(page.frontmatter.title, page.url, page.frontmatter.description),
    ),
    "",
    "## Stack Guides",
    "",
    ...visibleGuidePages.map((page) =>
      pageLine(page.frontmatter.title, page.url, page.frontmatter.description),
    ),
    "",
    ...(stackPages.length ? ["## Stack Templates", "", ...stackTemplateLines] : []),
    ...(blogPages.length
      ? [
          "## Blog",
          "",
          ...blogPages.map((page) =>
            pageLine(page.frontmatter.title, page.url, page.frontmatter.description),
          ),
          "",
        ]
      : []),
    "## Common Questions",
    "",
    "### What is Better Fullstack?",
    "",
    `Better Fullstack is a CLI and web-based stack builder that scaffolds configurable fullstack projects with ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_COUNT_LABEL} language ecosystems.`,
    "",
    "### How is it different from create-t3-app?",
    "",
    "create-t3-app focuses on the T3 Stack. Better Fullstack supports multiple language ecosystems, many frontend and backend frameworks, mobile and desktop targets, payments, AI integrations, deployment options, and a visual builder.",
    "",
    "### How is it different from create-next-app?",
    "",
    "create-next-app scaffolds Next.js projects. Better Fullstack scaffolds fullstack applications with selectable frontend, backend, database, ORM, auth, payments, AI, deployment, and tooling choices.",
    "",
    "### Is it free?",
    "",
    "Yes. Better Fullstack is open-source under the MIT license.",
    "",
  ].join("\n");
}

function pageMarkdownUrl(url: string): string {
  if (url === "/docs") return "/docs.md";
  if (url === "/guides") return "/guides.md";
  return `${url}.md`;
}

function sourceBody(source: string | undefined): string {
  if (!source) return "_Source unavailable._";
  return source.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
}

export function generateDocsLlmsTxt(
  docsPages: LlmsPage[],
  build?: { cliVersion?: string; generatedAt?: string },
): string {
  const pages = [...docsPages].sort((a, b) => a.url.localeCompare(b.url));
  return [
    `# ${SITE_NAME} Documentation`,
    "",
    "> Complete index of the canonical English product documentation.",
    "",
    ...(build?.cliVersion ? [`- CLI version: ${build.cliVersion}`] : []),
    ...(build?.generatedAt ? [`- Generated: ${build.generatedAt}`] : []),
    `- Full corpus: ${canonicalUrl("/llms-full.txt")}`,
    `- Semantic sitemap: ${canonicalUrl("/sitemap.md")}`,
    "",
    "## Pages",
    "",
    ...pages.map((page) =>
      pageLine(
        page.frontmatter.title,
        pageMarkdownUrl(page.url),
        [
          page.frontmatter.description,
          page.frontmatter.updated && `updated ${page.frontmatter.updated}`,
        ]
          .filter(Boolean)
          .join("; "),
      ),
    ),
    "",
  ].join("\n");
}

type RawContent = Record<string, string>;

function fullPageSection(kind: string, page: LlmsPage, rawBySlug: RawContent): string[] {
  const slug = page.slug.join("/");
  return [
    `## ${kind}: ${page.frontmatter.title ?? page.url}`,
    "",
    `Source: ${canonicalUrl(pageMarkdownUrl(page.url))}`,
    ...(page.frontmatter.updated ? [`Updated: ${page.frontmatter.updated}`] : []),
    "",
    sourceBody(rawBySlug[slug]),
    "",
  ];
}

export function generateLlmsFullTxt({
  docsPages,
  guidePages,
  blogPages,
  rawDocsPages,
  rawGuidePages,
  rawBlogPosts,
  cliVersion,
  generatedAt,
}: {
  docsPages: LlmsPage[];
  guidePages: LlmsPage[];
  blogPages: LlmsPage[];
  rawDocsPages: RawContent;
  rawGuidePages: RawContent;
  rawBlogPosts: RawContent;
  cliVersion?: string;
  generatedAt?: string;
}): string {
  return [
    `# ${SITE_NAME}: Full Documentation`,
    "",
    "> Canonical English product documentation, guides, and engineering articles in one corpus.",
    "",
    ...(cliVersion ? [`CLI version: ${cliVersion}`, ""] : []),
    ...(generatedAt ? [`Generated: ${generatedAt}`, ""] : []),
    ...docsPages.flatMap((page) => fullPageSection("Documentation", page, rawDocsPages)),
    ...guidePages.flatMap((page) => fullPageSection("Guide", page, rawGuidePages)),
    ...blogPages.flatMap((page) => fullPageSection("Article", page, rawBlogPosts)),
  ].join("\n");
}

export function generateMarkdownSitemap({
  docsPages,
  guidePages,
  blogPages,
  stackPages = [],
}: {
  docsPages: LlmsPage[];
  guidePages: LlmsPage[];
  blogPages: LlmsPage[];
  stackPages?: LlmsStackPage[];
}): string {
  const sections = [
    ["Documentation", docsPages] as const,
    ["Guides", guidePages] as const,
    ["Articles", blogPages] as const,
  ];
  return [
    `# ${SITE_NAME} Sitemap`,
    "",
    "> A semantic Markdown index for people, crawlers, and coding agents.",
    "",
    `- [Compact agent index](${canonicalUrl("/llms.txt")})`,
    `- [Full documentation corpus](${canonicalUrl("/llms-full.txt")})`,
    `- [XML sitemap](${canonicalUrl("/sitemap.xml")})`,
    "",
    ...sections.flatMap(([title, pages]) => [
      `## ${title}`,
      "",
      ...pages.map((page) =>
        pageLine(page.frontmatter.title, pageMarkdownUrl(page.url), page.frontmatter.description),
      ),
      "",
    ]),
    ...(stackPages.length
      ? [
          "## Generated Stack Pages",
          "",
          ...stackPages.map((page) =>
            pageLine(page.title, `/stack/${page.slug}`, page.description),
          ),
          "",
        ]
      : []),
  ].join("\n");
}
