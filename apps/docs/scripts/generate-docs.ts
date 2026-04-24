import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createCliDefaultProjectConfigBase,
  ECOSYSTEM_VALUES,
  OPTION_CATEGORY_METADATA,
  type Ecosystem,
  type OptionCategory,
  type OptionCategoryMetadata,
} from "../../../packages/types/src/index.ts";

type EcosystemDoc = {
  id: Ecosystem;
  title: string;
  description: string;
  prerequisites: string[];
  categories: OptionCategory[];
  example: string;
};

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = resolve(rootDir, "src/content/docs");
const publicDir = resolve(rootDir, "public");
const webLibDir = resolve(rootDir, "../web/src/lib");

const sharedCategories: OptionCategory[] = [
  "packageManager",
  "aiDocs",
  "examples",
  "codeQuality",
  "documentation",
  "appPlatforms",
  "webDeploy",
  "serverDeploy",
];

const ecosystemDocs: EcosystemDoc[] = [
  {
    id: "typescript",
    title: "TypeScript",
    description:
      "Fullstack web, mobile, desktop, API, and worker projects with the broadest set of integrations.",
    prerequisites: ["Node.js 20+", "npm, pnpm, Yarn, or Bun", "Git"],
    categories: [
      "webFrontend",
      "nativeFrontend",
      "backend",
      "runtime",
      "database",
      "orm",
      "dbSetup",
      "api",
      "auth",
      "payments",
      "email",
      "fileUpload",
      "ai",
      "stateManagement",
      "forms",
      "validation",
      "testing",
      "realtime",
      "jobQueue",
      "logging",
      "observability",
      "featureFlags",
      "analytics",
      "cms",
      "caching",
      "i18n",
      "search",
      "fileStorage",
      "animation",
      "cssFramework",
      "uiLibrary",
      ...sharedCategories,
    ],
    example: [
      "npm create better-fullstack@latest my-app -- \\",
      "  --frontend tanstack-router \\",
      "  --backend hono \\",
      "  --runtime node \\",
      "  --database sqlite \\",
      "  --orm drizzle \\",
      "  --api orpc \\",
      "  --auth better-auth \\",
      "  --package-manager npm \\",
      "  --addons turborepo \\",
      "  --no-install",
    ].join("\n"),
  },
  {
    id: "rust",
    title: "Rust",
    description:
      "Backend, CLI, WebAssembly frontend, GraphQL, gRPC, database, logging, caching, and auth scaffolds.",
    prerequisites: ["Rust toolchain", "Cargo", "Git"],
    categories: [
      "rustWebFramework",
      "rustFrontend",
      "rustOrm",
      "rustApi",
      "rustCli",
      "rustLibraries",
      "rustLogging",
      "rustErrorHandling",
      "rustCaching",
      "rustAuth",
      ...sharedCategories,
    ],
    example: [
      "npm create better-fullstack@latest my-rust-api -- \\",
      "  --ecosystem rust \\",
      "  --rust-web-framework axum \\",
      "  --rust-orm sea-orm \\",
      "  --rust-libraries serde validator \\",
      "  --no-install",
    ].join("\n"),
  },
  {
    id: "python",
    title: "Python",
    description:
      "API and AI-oriented projects with web frameworks, ORMs, validation, task queues, GraphQL, and quality tooling.",
    prerequisites: ["Python", "uv", "Git"],
    categories: [
      "pythonWebFramework",
      "pythonOrm",
      "pythonValidation",
      "pythonAi",
      "pythonAuth",
      "pythonTaskQueue",
      "pythonGraphql",
      "pythonQuality",
      ...sharedCategories,
    ],
    example: [
      "npm create better-fullstack@latest my-python-api -- \\",
      "  --ecosystem python \\",
      "  --python-web-framework fastapi \\",
      "  --python-orm sqlalchemy \\",
      "  --python-validation pydantic \\",
      "  --python-quality ruff \\",
      "  --no-install",
    ].join("\n"),
  },
  {
    id: "go",
    title: "Go",
    description:
      "API, service, and CLI projects with web frameworks, ORMs, gRPC, command-line tools, logging, and auth helpers.",
    prerequisites: ["Go toolchain", "Git"],
    categories: [
      "goWebFramework",
      "goOrm",
      "goApi",
      "goCli",
      "goLogging",
      "goAuth",
      "auth",
      ...sharedCategories,
    ],
    example: [
      "npm create better-fullstack@latest my-go-api -- \\",
      "  --ecosystem go \\",
      "  --go-web-framework gin \\",
      "  --go-orm gorm \\",
      "  --go-logging zap \\",
      "  --no-install",
    ].join("\n"),
  },
  {
    id: "java",
    title: "Java",
    description:
      "Spring Boot and plain Java projects with Maven or Gradle wrappers, ORM, auth, application libraries, and testing libraries.",
    prerequisites: ["Java 21", "Git"],
    categories: [
      "javaWebFramework",
      "javaBuildTool",
      "javaOrm",
      "javaAuth",
      "javaLibraries",
      "javaTestingLibraries",
      ...sharedCategories,
    ],
    example: [
      "npm create better-fullstack@latest my-java-api -- \\",
      "  --ecosystem java \\",
      "  --java-web-framework spring-boot \\",
      "  --java-build-tool maven \\",
      "  --java-orm spring-data-jpa \\",
      "  --java-auth spring-security \\",
      "  --java-libraries spring-actuator flyway springdoc-openapi \\",
      "  --java-testing-libraries junit5 mockito testcontainers \\",
      "  --no-install",
    ].join("\n"),
  },
];

const documentedEcosystems = new Set(ecosystemDocs.map((doc) => doc.id));
for (const ecosystem of ECOSYSTEM_VALUES) {
  if (!documentedEcosystems.has(ecosystem)) {
    throw new Error(`Missing docs generator config for ${ecosystem}`);
  }
}

const categoryDescriptions: Partial<Record<OptionCategory, string>> = {
  webFrontend: "Browser-facing frontend frameworks and app routers.",
  nativeFrontend: "React Native and Expo targets.",
  backend: "Server frameworks and fullstack self-backend modes.",
  runtime: "JavaScript runtime selection for generated TypeScript services.",
  database: "Database engines used by generated app templates.",
  orm: "Database access libraries and ORMs.",
  dbSetup: "Optional database provisioning helpers.",
  api: "API layers and type-safe transport choices.",
  auth: "Authentication providers and auth libraries.",
  aiDocs: "Project-local documentation files for AI coding agents.",
  codeQuality: "Linting, formatting, hooks, and code-quality tooling.",
  documentation: "Documentation-site addons.",
  appPlatforms: "Platform, monorepo, MCP, skills, desktop, PWA, and UI data addons.",
  javaLibraries: "Java application libraries emitted into Maven and Gradle templates.",
  javaTestingLibraries: "Java testing libraries emitted into Maven and Gradle templates.",
};

function categoryTitle(category: OptionCategory): string {
  return category
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace("Api", "API")
    .replace("Orm", "ORM")
    .replace("Ai", "AI")
    .replace("Cli", "CLI")
    .replace("Db", "DB");
}

function codeFence(content: string, language = "bash"): string {
  return `\`\`\`${language}\n${content}\n\`\`\``;
}

function escapeTableCell(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function categoryTable(
  category: OptionCategory,
  metadata: OptionCategoryMetadata,
  headingLevel = 3,
): string {
  const rows = metadata.options.map((option) => {
    const aliases = option.aliases.length > 0 ? option.aliases.join(", ") : "—";
    return `| \`${escapeTableCell(option.id)}\` | ${escapeTableCell(option.label)} | \`${escapeTableCell(option.cliValue)}\` | ${escapeTableCell(aliases)} |`;
  });

  return [
    `${"#".repeat(headingLevel)} ${categoryTitle(category)}`,
    "",
    categoryDescriptions[category] ? `${categoryDescriptions[category]}\n` : "",
    `Selection: **${metadata.selectionMode}**`,
    "",
    "| Option | Label | CLI value | Aliases |",
    "| --- | --- | --- | --- |",
    ...rows,
    "",
  ].join("\n");
}

function optionCount(categories: OptionCategory[]): number {
  return categories.reduce((sum, category) => {
    return sum + OPTION_CATEGORY_METADATA[category].options.length;
  }, 0);
}

async function writeGenerated(relativePath: string, content: string): Promise<void> {
  const filePath = resolve(docsDir, relativePath);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content);
}

async function writePublic(relativePath: string, content: string): Promise<void> {
  const filePath = resolve(publicDir, relativePath);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content);
}

async function writeWebGenerated(relativePath: string, content: string): Promise<void> {
  const filePath = resolve(webLibDir, relativePath);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content);
}

function generatedBanner(): string {
  return "{/* Generated by apps/docs/scripts/generate-docs.ts. Do not edit by hand. */}";
}

function buildEcosystemPage(doc: EcosystemDoc): string {
  const categories = doc.categories.filter((category, index, all) => all.indexOf(category) === index);

  return [
    "---",
    `title: ${doc.title}`,
    `description: ${doc.description}`,
    "---",
    "",
    generatedBanner(),
    "",
    doc.description,
    "",
    `This page is generated from the shared option metadata. It currently includes **${optionCount(categories)} options** across **${categories.length} categories**.`,
    "",
    "## Prerequisites",
    "",
    ...doc.prerequisites.map((item) => `- ${item}`),
    "",
    "## Create command",
    "",
    codeFence(doc.example),
    "",
    "## Categories",
    "",
    ...categories.map((category) => categoryTable(category, OPTION_CATEGORY_METADATA[category])),
  ].join("\n");
}

function buildEcosystemOverview(): string {
  const rows = ecosystemDocs.map((doc) => {
    return `| [${doc.title}](/docs/ecosystems/${doc.id}/) | ${escapeTableCell(doc.description)} | ${optionCount(doc.categories)} |`;
  });

  return [
    "---",
    "title: Ecosystems",
    "description: Supported language ecosystems and their generated option groups.",
    "---",
    "",
    generatedBanner(),
    "",
    "Better Fullstack supports multiple language ecosystems from the same CLI and builder workflow.",
    "",
    "| Ecosystem | Scope | Options |",
    "| --- | --- | --- |",
    ...rows,
    "",
    "## Default CLI baseline",
    "",
    "The default project configuration below is generated from the shared default config with `npm` as the package manager. Runtime and package manager are separate choices; select `runtime: \"node\"` when you do not want a Bun runtime project.",
    "",
    codeFence(JSON.stringify(createCliDefaultProjectConfigBase("npm"), null, 2), "json"),
  ].join("\n");
}

type OptionsSection = {
  slug: string;
  title: string;
  description: string;
  blurb: string;
  categories: OptionCategory[];
};

// Grouped into smaller pages so each rendered HTML stays well under the
// dev-server static-file buffer limit (~64KB). The original single-page
// reference was ~176KB HTML and triggered a Nitro dev-server bug that
// concatenated a truncated second copy of the page into the response,
// producing a visible duplicate "On this page" TOC. Splitting into
// focused sub-pages also improves navigability for the 82-category set.
const optionsSections: OptionsSection[] = [
  {
    slug: "stack",
    title: "Core Stack",
    description: "Framework, runtime, database, ORM, API, and auth options.",
    blurb: "Pick the frontend, backend, data, and auth building blocks for a TypeScript project.",
    categories: [
      "api",
      "webFrontend",
      "nativeFrontend",
      "astroIntegration",
      "runtime",
      "backend",
      "database",
      "orm",
      "dbSetup",
      "auth",
    ],
  },
  {
    slug: "services",
    title: "Services & Integrations",
    description: "Payments, email, file upload, realtime, jobs, search, CMS, AI, analytics.",
    blurb: "Third-party capabilities that get wired into the generated project.",
    categories: [
      "payments",
      "email",
      "fileUpload",
      "fileStorage",
      "realtime",
      "jobQueue",
      "caching",
      "i18n",
      "search",
      "cms",
      "ai",
      "analytics",
      "featureFlags",
    ],
  },
  {
    slug: "ui",
    title: "UI, Forms & State",
    description: "CSS frameworks, UI libraries, state management, forms, validation, animation.",
    blurb: "Frontend layer choices for styling, interaction, and data flow.",
    categories: [
      "stateManagement",
      "forms",
      "validation",
      "animation",
      "cssFramework",
      "uiLibrary",
      "backendLibraries",
      "effect",
      "shadcnBase",
      "shadcnStyle",
      "shadcnIconLibrary",
      "shadcnColorTheme",
      "shadcnBaseColor",
      "shadcnFont",
      "shadcnRadius",
    ],
  },
  {
    slug: "tooling",
    title: "Tooling, Deploy & Ops",
    description: "Testing, logging, observability, code quality, deploy targets, package manager.",
    blurb: "Everything around the app: CI, deploy, logs, docs, and workflow helpers.",
    categories: [
      "webDeploy",
      "serverDeploy",
      "logging",
      "observability",
      "testing",
      "codeQuality",
      "documentation",
      "appPlatforms",
      "packageManager",
      "versionChannel",
      "examples",
      "aiDocs",
      "git",
      "install",
    ],
  },
  {
    slug: "rust",
    title: "Rust Options",
    description: "Rust-ecosystem categories: web framework, ORM, API, CLI, libraries, auth.",
    blurb: "Categories applied when scaffolding a Rust project.",
    categories: [
      "rustWebFramework",
      "rustFrontend",
      "rustOrm",
      "rustApi",
      "rustCli",
      "rustLibraries",
      "rustLogging",
      "rustErrorHandling",
      "rustCaching",
      "rustAuth",
    ],
  },
  {
    slug: "python",
    title: "Python Options",
    description: "Python-ecosystem categories: web framework, ORM, validation, AI, quality.",
    blurb: "Categories applied when scaffolding a Python project.",
    categories: [
      "pythonWebFramework",
      "pythonOrm",
      "pythonValidation",
      "pythonAi",
      "pythonAuth",
      "pythonTaskQueue",
      "pythonGraphql",
      "pythonQuality",
    ],
  },
  {
    slug: "go",
    title: "Go Options",
    description: "Go-ecosystem categories: web framework, ORM, API, CLI, logging, auth.",
    blurb: "Categories applied when scaffolding a Go project.",
    categories: ["goWebFramework", "goOrm", "goApi", "goCli", "goLogging", "goAuth"],
  },
  {
    slug: "java",
    title: "Java Options",
    description: "Java-ecosystem categories: web framework, build tool, ORM, auth, libraries.",
    blurb: "Categories applied when scaffolding a Java project.",
    categories: [
      "javaWebFramework",
      "javaBuildTool",
      "javaOrm",
      "javaAuth",
      "javaLibraries",
      "javaTestingLibraries",
    ],
  },
];

function yamlString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function buildOptionsSectionPage(section: OptionsSection): string {
  const tables = section.categories.map((category) =>
    categoryTable(category, OPTION_CATEGORY_METADATA[category], 2),
  );
  const count = optionCount(section.categories);

  return [
    "---",
    `title: ${yamlString(section.title)}`,
    `description: ${yamlString(section.description)}`,
    "---",
    "",
    generatedBanner(),
    "",
    section.blurb,
    "",
    `This page covers **${count} options** across **${section.categories.length} categories**.`,
    "",
    "Use CLI values in commands and MCP payloads.",
    "",
    ...tables,
  ].join("\n");
}

function buildOptionsOverview(): string {
  const entries = Object.entries(OPTION_CATEGORY_METADATA) as Array<
    [OptionCategory, OptionCategoryMetadata]
  >;
  const total = entries.reduce((sum, [, metadata]) => sum + metadata.options.length, 0);

  // Ensure every OPTION_CATEGORY_METADATA key is covered by exactly one section.
  const assigned = new Set<OptionCategory>();
  for (const section of optionsSections) {
    for (const category of section.categories) {
      if (assigned.has(category)) {
        throw new Error(`Options category ${category} is assigned to multiple reference sections.`);
      }
      assigned.add(category);
    }
  }
  const allCategories = new Set<OptionCategory>(entries.map(([cat]) => cat));
  for (const category of allCategories) {
    if (!assigned.has(category)) {
      throw new Error(`Options category ${category} is not assigned to any reference section.`);
    }
  }

  const rows = optionsSections.map((section) => {
    const sectionCount = optionCount(section.categories);
    return `| [${section.title}](/docs/reference/options/${section.slug}/) | ${escapeTableCell(
      section.description,
    )} | ${section.categories.length} | ${sectionCount} |`;
  });

  return [
    "---",
    "title: Options",
    "description: Generated reference for Better Fullstack stack options.",
    "---",
    "",
    generatedBanner(),
    "",
    `This reference is generated from \`packages/types/src/option-metadata.ts\`. It currently includes **${total} option entries** across **${entries.length} categories**, grouped into focused sub-pages.`,
    "",
    "Use CLI values in commands and MCP payloads. Some builder-only labels normalize to the same CLI value.",
    "",
    "| Section | Scope | Categories | Options |",
    "| --- | --- | --- | --- |",
    ...rows,
    "",
  ].join("\n");
}

function buildLlmsTxt(): string {
  const totalOptions = Object.values(OPTION_CATEGORY_METADATA).reduce(
    (sum, metadata) => sum + metadata.options.length,
    0,
  );
  const ecosystemList = ecosystemDocs.map((doc) => doc.title).join(", ");

  return [
    "# Better Fullstack Docs",
    "",
    `Better Fullstack scaffolds production-ready projects across ${ecosystemList}.`,
    "",
    `Generated option reference: ${totalOptions} option entries from shared metadata.`,
    "",
    "Important pages:",
    "- Docs home: https://better-fullstack.dev/docs/",
    "- Installation: https://better-fullstack.dev/docs/getting-started/installation/",
    "- CLI create command: https://better-fullstack.dev/docs/cli/create/",
    "- Ecosystems: https://better-fullstack.dev/docs/ecosystems/",
    "- AI agents: https://better-fullstack.dev/docs/ai/overview/",
    "- MCP: https://better-fullstack.dev/docs/ai/mcp/",
    "- Options reference: https://better-fullstack.dev/docs/reference/options/",
    "",
    "Recommended AI-agent workflow:",
    "1. Determine the ecosystem first.",
    "2. Inspect schema/options.",
    "3. Validate compatibility.",
    "4. Dry-run or plan the project.",
    "5. Scaffold with dependency installation disabled.",
    "6. Tell the user the exact install, test, and run commands.",
  ].join("\n");
}

function buildWebProjectStats(): string {
  const totalOptions = Object.values(OPTION_CATEGORY_METADATA).reduce(
    (sum, metadata) => sum + metadata.options.length,
    0,
  );

  return [
    "// Generated by apps/docs/scripts/generate-docs.ts. Do not edit by hand.",
    "",
    `export const OPTION_ENTRY_COUNT = ${totalOptions};`,
    `export const ECOSYSTEM_COUNT = ${ecosystemDocs.length};`,
    `export const ECOSYSTEM_NAMES = ${JSON.stringify(ecosystemDocs.map((doc) => doc.title))} as const;`,
    "",
  ].join("\n");
}

import { rm } from "node:fs/promises";

await writeGenerated("ecosystems/index.mdx", buildEcosystemOverview());
await Promise.all(
  ecosystemDocs.map((doc) => writeGenerated(`ecosystems/${doc.id}.mdx`, buildEcosystemPage(doc))),
);

// Remove the legacy single-file options reference if it's still present.
// The reference now lives under `reference/options/` (an index + sub-pages).
await rm(resolve(docsDir, "reference/options.mdx"), { force: true });
await writeGenerated("reference/options/index.mdx", buildOptionsOverview());
await Promise.all(
  optionsSections.map((section) =>
    writeGenerated(`reference/options/${section.slug}.mdx`, buildOptionsSectionPage(section)),
  ),
);

await writePublic("llms.txt", buildLlmsTxt());
await writeWebGenerated("project-stats.generated.ts", buildWebProjectStats());

console.log(`Generated docs for ${ecosystemDocs.length} ecosystems.`);
