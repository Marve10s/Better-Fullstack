#!/usr/bin/env bun

import { execFileSync } from "node:child_process";
import { relative, resolve } from "node:path";

const VERSION_MAP_PATH = "packages/template-generator/src/utils/add-deps.ts";
const TEMPLATE_ROOT = "packages/template-generator/templates";
const SOURCE_ROOT = "packages/template-generator/src";
const MAX_FORCED_CATEGORIES = 8;

const SELECTABLE_CATEGORIES = new Set([
  "addons",
  "ai",
  "analytics",
  "animation",
  "api",
  "astroIntegration",
  "auth",
  "backend",
  "caching",
  "cms",
  "cssFramework",
  "database",
  "dbSetup",
  "ecommerce",
  "effect",
  "email",
  "examples",
  "featureFlags",
  "fileStorage",
  "fileUpload",
  "forms",
  "frontend",
  "i18n",
  "integrations",
  "jobQueue",
  "logging",
  "observability",
  "orm",
  "payments",
  "rateLimit",
  "realtime",
  "runtime",
  "search",
  "serverDeploy",
  "stateManagement",
  "testing",
  "uiLibrary",
  "validation",
  "webDeploy",
]);

const TEMPLATE_CATEGORY_KEYS: Record<string, readonly string[]> = {
  addons: ["addons"],
  ai: ["ai"],
  analytics: ["analytics"],
  api: ["api"],
  auth: ["auth"],
  backend: ["backend"],
  caching: ["caching"],
  cms: ["cms"],
  "db-setup": ["dbSetup"],
  ecommerce: ["ecommerce"],
  email: ["email"],
  examples: ["examples"],
  "feature-flags": ["featureFlags"],
  "file-storage": ["fileStorage"],
  frontend: ["frontend"],
  i18n: ["i18n"],
  integrations: ["integrations"],
  "job-queue": ["jobQueue"],
  logging: ["logging"],
  observability: ["observability"],
  payments: ["payments"],
  "rate-limit": ["rateLimit"],
  realtime: ["realtime"],
  search: ["search"],
  testing: ["testing"],
};

const ORM_TEMPLATE_OPTIONS = new Set([
  "drizzle",
  "kysely",
  "mikroorm",
  "mongoose",
  "prisma",
  "sequelize",
  "typeorm",
]);

const SOURCE_FILE_CATEGORY_KEYS: Record<string, readonly string[]> = {
  addons: ["addons"],
  ai: ["ai"],
  analytics: ["analytics"],
  animation: ["animation"],
  api: ["api"],
  auth: ["auth"],
  backend: ["backend"],
  caching: ["caching"],
  cms: ["cms"],
  "css-ui": ["cssFramework", "uiLibrary"],
  db: ["database", "orm"],
  ecommerce: ["ecommerce"],
  effect: ["effect"],
  email: ["email"],
  examples: ["examples"],
  "feature-flags": ["featureFlags"],
  "file-storage": ["fileStorage"],
  "file-upload": ["fileUpload"],
  forms: ["forms"],
  i18n: ["i18n"],
  integrations: ["integrations"],
  "job-queue": ["jobQueue"],
  logging: ["logging"],
  observability: ["observability"],
  payments: ["payments"],
  "rate-limit": ["rateLimit"],
  realtime: ["realtime"],
  search: ["search"],
  "state-management": ["stateManagement"],
  testing: ["testing"],
  validation: ["validation"],
};

interface PackageMapping {
  categories: Set<string>;
  templateOptions: Set<string>;
  sourceFiles: Set<string>;
}

function extractChangedPackages(diff: string): string[] {
  const packages = new Set<string>();

  for (const line of diff.split("\n")) {
    if (line.startsWith("+++") || line.startsWith("---")) continue;
    const match = line.match(/^[+-]\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z_$][\w$]*))\s*:/);
    const packageName = match?.[1] ?? match?.[2] ?? match?.[3];
    if (packageName) packages.add(packageName);
  }

  return [...packages].sort();
}

function categoriesForTemplatePath(path: string): string[] {
  const [templateCategory, optionId] = path.split("/");
  if (!templateCategory || !optionId) return [];

  if (templateCategory === "db") {
    return ORM_TEMPLATE_OPTIONS.has(optionId) ? ["orm"] : ["database"];
  }
  if (templateCategory === "deploy") return ["webDeploy", "serverDeploy"];

  return [...(TEMPLATE_CATEGORY_KEYS[templateCategory] ?? [])];
}

function sourceCategories(
  path: string,
  content: string,
  index: number,
  optionIds: ReadonlySet<string>,
): string[] {
  const categories = new Set<string>();
  const basename =
    path
      .split("/")
      .at(-1)
      ?.replace(/\.ts$/, "")
      .replace(/-deps$/, "") ?? "";
  for (const category of SOURCE_FILE_CATEGORY_KEYS[basename] ?? []) categories.add(category);

  const start = Math.max(0, index - 1_500);
  const end = Math.min(content.length, index + 1_500);
  const nearby = content.slice(start, end);
  for (const match of nearby.matchAll(/ProjectConfig\["([A-Za-z][A-Za-z0-9]*)"\]/g)) {
    const category = match[1];
    if (category && SELECTABLE_CATEGORIES.has(category)) categories.add(category);
  }
  for (const match of nearby.matchAll(
    /config\.([A-Za-z][A-Za-z0-9]*)\s*(?:===|!==)\s*["']([^"']+)["']/g,
  )) {
    const category = match[1];
    const optionId = match[2];
    if (category && optionId && optionIds.has(optionId) && SELECTABLE_CATEGORIES.has(category)) {
      categories.add(category);
    }
  }

  return [...categories];
}

async function mapPackages(packages: readonly string[]): Promise<Map<string, PackageMapping>> {
  const mappings = new Map<string, PackageMapping>();
  for (const packageName of packages) {
    mappings.set(packageName, {
      categories: new Set(),
      templateOptions: new Set(),
      sourceFiles: new Set(),
    });
  }

  const templateGlob = new Bun.Glob("**/*");
  for await (const path of templateGlob.scan({ cwd: TEMPLATE_ROOT, onlyFiles: true })) {
    const content = await Bun.file(resolve(TEMPLATE_ROOT, path)).text();
    for (const packageName of packages) {
      if (!content.includes(packageName)) continue;
      const [templateCategory, optionId] = path.split("/");
      if (templateCategory && optionId) {
        mappings.get(packageName)?.templateOptions.add(`${templateCategory}/${optionId}`);
      }
      for (const category of categoriesForTemplatePath(path)) {
        mappings.get(packageName)?.categories.add(category);
      }
    }
  }

  const sourceGlob = new Bun.Glob("**/*.ts");
  for await (const path of sourceGlob.scan({ cwd: SOURCE_ROOT, onlyFiles: true })) {
    if (path === relative(SOURCE_ROOT, VERSION_MAP_PATH) || path === "templates.generated.ts") {
      continue;
    }
    const content = await Bun.file(resolve(SOURCE_ROOT, path)).text();
    for (const packageName of packages) {
      let index = content.indexOf(packageName);
      while (index !== -1) {
        const mapping = mappings.get(packageName);
        mapping?.sourceFiles.add(path);
        const optionIds = new Set(
          [...(mapping?.templateOptions ?? [])]
            .map((templatePath) => templatePath.split("/")[1])
            .filter((optionId): optionId is string => optionId !== undefined),
        );
        for (const category of sourceCategories(path, content, index, optionIds)) {
          mapping?.categories.add(category);
        }
        index = content.indexOf(packageName, index + packageName.length);
      }
    }
  }

  return mappings;
}

async function deriveForceFlags(diff: string): Promise<string> {
  const packages = extractChangedPackages(diff);
  if (packages.length === 0) return "";

  const mappings = await mapPackages(packages);
  const optionsByCategory = new Map<string, Set<string>>();

  for (const [packageName, mapping] of mappings) {
    for (const category of mapping.categories) {
      const bucket = optionsByCategory.get(category) ?? new Set<string>();
      for (const entry of mapping.templateOptions) {
        const [templateCategory, optionId] = entry.split("/");
        if (templateCategory === category && optionId) bucket.add(optionId);
      }
      optionsByCategory.set(category, bucket);
    }
    const evidence = [
      mapping.templateOptions.size > 0
        ? `templates: ${[...mapping.templateOptions].sort().join(", ")}`
        : "",
      mapping.sourceFiles.size > 0 ? `source: ${[...mapping.sourceFiles].sort().join(", ")}` : "",
    ].filter(Boolean);
    console.error(
      `${packageName}: ${[...mapping.categories].sort().join(", ") || "no category"}${evidence.length > 0 ? ` (${evidence.join("; ")})` : ""}`,
    );
  }

  const selected = [...optionsByCategory.keys()].sort().slice(0, MAX_FORCED_CATEGORIES);
  if (selected.length === 0) return "";

  // A category whose changed packages point at exactly one option gets pinned to
  // that option; anything broader falls back to "any non-none option".
  const exactFlags: string[] = [];
  const nonNoneCategories: string[] = [];
  for (const category of selected) {
    const options = optionsByCategory.get(category) ?? new Set<string>();
    if (options.size === 1) {
      exactFlags.push(`--force-option ${category}=${[...options][0]}`);
    } else {
      nonNoneCategories.push(category);
    }
  }

  const parts = [...exactFlags];
  if (nonNoneCategories.length > 0) {
    parts.push(`--force-non-none ${nonNoneCategories.join(",")}`);
  }
  return parts.join(" ");
}

function readDiff(base: string): string {
  return execFileSync("git", ["diff", "--unified=0", base, "--", VERSION_MAP_PATH], {
    encoding: "utf8",
  });
}

const args = process.argv.slice(2);
if (args.includes("--test")) {
  const syntheticDiff = `diff --git a/${VERSION_MAP_PATH} b/${VERSION_MAP_PATH}
--- a/${VERSION_MAP_PATH}
+++ b/${VERSION_MAP_PATH}
@@ -857 +857 @@
-  "@nangohq/node": "^0.71.3",
+  "@nangohq/node": "^0.72.0",
@@ -860 +860 @@
-  "@medusajs/js-sdk": "^2.18.0",
+  "@medusajs/js-sdk": "^2.19.0",
`;
  const flags = await deriveForceFlags(syntheticDiff);
  const expected = "--force-option ecommerce=medusa --force-option integrations=nango";
  if (flags !== expected) throw new Error(`Expected ${expected}, received ${flags || "<empty>"}`);
  console.log(flags);
} else {
  const baseIndex = args.indexOf("--base");
  const base = baseIndex >= 0 && args[baseIndex + 1] ? args[baseIndex + 1] : "origin/main";
  console.log(await deriveForceFlags(readDiff(base)));
}
