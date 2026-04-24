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
    prerequisites: ["Node.js 20+", "Bun, npm, pnpm, or Yarn", "Git"],
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
      "bun create better-fullstack@latest my-app \\",
      "  --frontend tanstack-router \\",
      "  --backend hono \\",
      "  --runtime bun \\",
      "  --database sqlite \\",
      "  --orm drizzle \\",
      "  --api orpc \\",
      "  --auth better-auth \\",
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
      "bun create better-fullstack@latest my-rust-api \\",
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
      "bun create better-fullstack@latest my-python-api \\",
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
      "bun create better-fullstack@latest my-go-api \\",
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
      "bun create better-fullstack@latest my-java-api \\",
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

function categoryTable(category: OptionCategory, metadata: OptionCategoryMetadata): string {
  const rows = metadata.options.map((option) => {
    const aliases = option.aliases.length > 0 ? option.aliases.join(", ") : "—";
    return `| \`${escapeTableCell(option.id)}\` | ${escapeTableCell(option.label)} | \`${escapeTableCell(option.cliValue)}\` | ${escapeTableCell(aliases)} |`;
  });

  return [
    `### ${categoryTitle(category)}`,
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
    "The default project configuration is generated from the shared default config.",
    "",
    codeFence(JSON.stringify(createCliDefaultProjectConfigBase("bun"), null, 2), "json"),
  ].join("\n");
}

function buildOptionsReference(): string {
  const entries = Object.entries(OPTION_CATEGORY_METADATA) as Array<
    [OptionCategory, OptionCategoryMetadata]
  >;
  const total = entries.reduce((sum, [, metadata]) => sum + metadata.options.length, 0);

  return [
    "---",
    "title: Options",
    "description: Generated reference for Better Fullstack stack options.",
    "---",
    "",
    generatedBanner(),
    "",
    `This reference is generated from \`packages/types/src/option-metadata.ts\`. It currently includes **${total} option entries** across **${entries.length} categories**.`,
    "",
    "Use CLI values in commands and MCP payloads. Some builder-only labels normalize to the same CLI value.",
    "",
    ...entries.map(([category, metadata]) => categoryTable(category, metadata)),
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

await writeGenerated("ecosystems/index.mdx", buildEcosystemOverview());
await Promise.all(
  ecosystemDocs.map((doc) => writeGenerated(`ecosystems/${doc.id}.mdx`, buildEcosystemPage(doc))),
);
await writeGenerated("reference/options.mdx", buildOptionsReference());
await writePublic("llms.txt", buildLlmsTxt());
await writeWebGenerated("project-stats.generated.ts", buildWebProjectStats());

console.log(`Generated docs for ${ecosystemDocs.length} ecosystems.`);
