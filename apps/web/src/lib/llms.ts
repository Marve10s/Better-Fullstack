import { ECOSYSTEM_COUNT_LABEL, ECOSYSTEM_NAMES, OPTION_COUNT_LABEL } from "@/lib/project-stats";
import { SITE_NAME, SITE_URL, canonicalUrl } from "@/lib/seo";

export type LlmsPage = {
  url: string;
  slug: string[];
  frontmatter: {
    title?: string;
    description?: string;
  };
};

function pageLine(title: string | undefined, url: string, description?: string) {
  const label = title ?? url;
  const suffix = description ? ` - ${description}` : "";
  return `- [${label}](${canonicalUrl(url)})${suffix}`;
}

export function generateLlmsTxt({
  docsPages,
  guidePages,
}: {
  docsPages: LlmsPage[];
  guidePages: LlmsPage[];
}) {
  const visibleGuidePages = guidePages.filter((page) => page.slug.length > 0);
  const featuredDocs = docsPages.filter((page) =>
    [
      "/docs",
      "/docs/cli/create",
      "/docs/reference/compatibility",
      "/docs/reference/options",
      "/docs/ai/overview",
      "/docs/ai/mcp",
      "/docs/ai/mcp-tools",
      "/docs/ecosystems/typescript",
      "/docs/ecosystems/rust",
      "/docs/ecosystems/python",
      "/docs/ecosystems/go",
      "/docs/ecosystems/java",
    ].includes(page.url),
  );

  return [
    `# ${SITE_NAME}`,
    "",
    `> Scaffold production-ready fullstack apps in seconds. Pick your stack from ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_NAMES.join(", ")}.`,
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
    pageLine("Compare", "/compare", "Comparison against other scaffolders and starter kits"),
    pageLine("MCP", "/mcp", "AI agent integration overview"),
    pageLine("Docs", "/docs", "Documentation index"),
    pageLine("Guides", "/guides", "Stack-specific starter guides"),
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
    "## Common Questions",
    "",
    "### What is Better Fullstack?",
    "",
    `Better Fullstack is a CLI and web-based stack builder that scaffolds production-ready fullstack applications with ${OPTION_COUNT_LABEL} configurable options across ${ECOSYSTEM_COUNT_LABEL} language ecosystems.`,
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
