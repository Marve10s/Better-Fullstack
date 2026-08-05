import {
  DEFAULT_STACK_SELECTION,
  ProjectConfigSchema,
  STACK_SELECTION_OPTION_CATEGORY_BY_KEY,
  analyzeStackCompatibility,
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  getDisabledReason,
  legacyProjectConfigToStackParts,
  normalizeStackSelection,
  stackSelectionToProjectConfig,
  validateStackParts,
  type OptionCategory,
  type StackPart,
  type StackSelectionKey,
  type StackSelectionState,
} from "@better-fullstack/types";
import {
  EMBEDDED_TEMPLATES,
  generateVirtualProject,
  type VirtualDirectory,
} from "@better-fullstack/template-generator";

import {
  architectureLabel,
  deriveArchitecture,
  deriveCanonicalParts,
  deriveCompatibilityConstraints,
} from "../src/lib/stack-pages/facts";
import { PUBLISHED_STACK_SEEDS } from "../src/lib/stack-pages/seeds";
import type {
  GeneratedStackPage,
  PublishedStackSeed,
} from "../src/lib/stack-pages/types";

const OUTPUT_URL = new URL("../src/lib/stack-pages/generated.ts", import.meta.url);
const TYPES_PACKAGE_URL = new URL("../../../packages/types/package.json", import.meta.url);

function stackSelection(seed: PublishedStackSeed): StackSelectionState {
  return normalizeStackSelection({
    ...DEFAULT_STACK_SELECTION,
    ...seed.selection,
  } as StackSelectionState);
}

function selectedOptionIssues(selection: StackSelectionState, seed: PublishedStackSeed): string[] {
  const issues: string[] = [];
  const categoryByKey = STACK_SELECTION_OPTION_CATEGORY_BY_KEY as Partial<
    Record<StackSelectionKey, OptionCategory>
  >;

  for (const key of Object.keys(seed.selection) as StackSelectionKey[]) {
    const category = categoryByKey[key];
    if (!category) continue;
    const value = selection[key];
    const values = Array.isArray(value) ? value : [value];
    for (const optionId of values) {
      if (typeof optionId !== "string" || optionId.length === 0) continue;
      const reason = getDisabledReason(selection, category, optionId);
      if (reason) issues.push(`${category}=${optionId}: ${reason}`);
    }
  }

  return issues;
}

function compatibilityAdjustedSelection(
  selection: StackSelectionState,
  seed: PublishedStackSeed,
): StackSelectionState {
  const analysis = analyzeStackCompatibility(selection);
  if (!analysis.adjustedStack) return selection;

  for (const key of Object.keys(seed.selection) as StackSelectionKey[]) {
    const before = selection[key];
    const after = analysis.adjustedStack[key as keyof typeof analysis.adjustedStack];
    if (after !== undefined && JSON.stringify(before) !== JSON.stringify(after)) {
      throw new Error(
        `${seed.slug}: compatibility analysis changed published field '${key}' from ${JSON.stringify(before)} to ${JSON.stringify(after)}`,
      );
    }
  }

  return normalizeStackSelection({
    ...selection,
    ...analysis.adjustedStack,
  } as StackSelectionState);
}

/**
 * Legacy flat conversion retains inert defaults from other ecosystems. Keep
 * generated page facts and output scoped to the selected ecosystem even though
 * the ownership-aware graph can now validate those dormant defaults safely.
 */
export function filterStackPartsForSelectedEcosystem(
  parts: readonly StackPart[],
  ecosystem: StackSelectionState["ecosystem"],
): StackPart[] {
  return parts.filter(
    (part) => part.ecosystem === ecosystem || part.ecosystem === "universal",
  );
}

function collectFiles(directory: VirtualDirectory): string[] {
  return directory.children.flatMap((node) =>
    node.type === "file" ? [node.path] : collectFiles(node),
  );
}

function representativeFiles(files: readonly string[]): string[] {
  const preferredNames = [
    "README.md",
    "package.json",
    "Cargo.toml",
    "pyproject.toml",
    "go.mod",
    "bts.jsonc",
  ];
  const preferred = preferredNames.flatMap((name) =>
    files.filter((file) => file === name || file.endsWith(`/${name}`)),
  );
  const sourceFiles = files.filter((file) =>
    /(^|\/)(src|app|apps|server|frontend|backend)\//.test(file),
  );
  return [...new Set([...preferred, ...sourceFiles, ...files])].slice(0, 8);
}

function fingerprint(parts: readonly StackPart[]): string[] {
  return parts
    .filter((part) => part.source !== "provided")
    .map((part) => `${part.role}:${part.ecosystem}:${part.toolId}`)
    .sort();
}

function stackDistance(left: readonly string[], right: readonly string[]): number {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  let distance = 0;
  for (const value of leftSet) if (!rightSet.has(value)) distance += 1;
  for (const value of rightSet) if (!leftSet.has(value)) distance += 1;
  return distance;
}

function contentHash(value: unknown): string {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(JSON.stringify(value));
  return hasher.digest("hex");
}

async function generateBasePage(
  seed: PublishedStackSeed,
  typesPackageVersion: string,
): Promise<{ page: GeneratedStackPage; fingerprint: string[] }> {
  const normalizedSelection = stackSelection(seed);
  const optionIssues = selectedOptionIssues(normalizedSelection, seed);
  if (optionIssues.length) {
    throw new Error(`${seed.slug}: explicitly selected options are disabled:\n${optionIssues.join("\n")}`);
  }

  const effectiveSelection = compatibilityAdjustedSelection(normalizedSelection, seed);
  const projectName = effectiveSelection.projectName ?? "my-app";
  const config = ProjectConfigSchema.parse(
    stackSelectionToProjectConfig(effectiveSelection, {
      projectDir: `/virtual/${projectName}`,
      relativePath: projectName,
      install: true,
    }),
  );
  const legacyParts = legacyProjectConfigToStackParts(config);
  const ecosystemParts = filterStackPartsForSelectedEcosystem(
    legacyParts,
    effectiveSelection.ecosystem,
  );
  const graphValidation = validateStackParts(ecosystemParts);
  if (graphValidation.issues.length) {
    throw new Error(
      `${seed.slug}: stack graph validation failed:\n${graphValidation.issues.map((issue) => issue.message).join("\n")}`,
    );
  }

  const generated = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  if (!generated.success || !generated.tree) {
    throw new Error(`${seed.slug}: virtual project generation failed: ${generated.error ?? "unknown error"}`);
  }

  const canonicalParts = deriveCanonicalParts(
    effectiveSelection,
    ecosystemParts,
    seed,
  );
  const architecture = deriveArchitecture(
    effectiveSelection,
    canonicalParts,
    ecosystemParts,
  );
  const params = createStackSelectionSearchParams(effectiveSelection);
  const files = collectFiles(generated.tree.root).sort();
  const topLevelEntries = generated.tree.root.children.map((node) => node.name).sort();
  const labels = canonicalParts
    .filter((part) => part.id !== "none")
    .map((part) => part.label)
    .slice(0, 6);
  const description = `Better Fullstack scaffolds this compatibility-checked ${architectureLabel(architecture.shape)} with ${new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(labels)}.`;

  const page: GeneratedStackPage = {
    slug: seed.slug,
    status: seed.status,
    priority: seed.priority,
    primaryKeyword: seed.primaryKeyword,
    keywordAliases: [...seed.keywordAliases],
    ecosystem: effectiveSelection.ecosystem,
    title: seed.primaryKeyword,
    description,
    selection: effectiveSelection,
    canonicalParts,
    architecture,
    command: generateStackSelectionCommand(effectiveSelection),
    builderUrl: `/new?${params.toString()}`,
    meaningfulParameters: [...params.entries()].map(([key, value]) => ({ key, value })),
    output: {
      fileCount: generated.tree.fileCount,
      directoryCount: generated.tree.directoryCount,
      layout:
        topLevelEntries.includes("apps") || topLevelEntries.includes("packages")
          ? "workspace"
          : "single-directory",
      topLevelEntries,
      representativeFiles: representativeFiles(files),
    },
    compatibility: {
      graphIssueCount: 0,
      selectedOptionIssueCount: 0,
      typesPackageVersion,
      constraints: deriveCompatibilityConstraints(effectiveSelection, seed),
      runtimeVerified: false,
    },
    relatedSlugs: [],
    guideUrl: seed.guideUrl,
    contentHash: "",
    updated: seed.updated,
  };

  return { page, fingerprint: fingerprint(ecosystemParts) };
}

async function main() {
  const typesPackage = (await Bun.file(TYPES_PACKAGE_URL).json()) as { version: string };
  const generated = await Promise.all(
    PUBLISHED_STACK_SEEDS.map((seed) => generateBasePage(seed, typesPackage.version)),
  );

  const pages = generated.map(({ page }, index) => {
    const nearest = generated
      .map((candidate, candidateIndex) => ({
        slug: candidate.page.slug,
        priority: candidate.page.priority,
        index: candidateIndex,
        distance: stackDistance(generated[index].fingerprint, candidate.fingerprint),
      }))
      .filter((candidate) => candidate.index !== index)
      .sort((a, b) => a.distance - b.distance || b.priority - a.priority || a.slug.localeCompare(b.slug))
      .slice(0, 3)
      .map((candidate) => candidate.slug);
    page.relatedSlugs = nearest;
    page.contentHash = contentHash(page);
    return page;
  });

  const source = [
    "/* This file is generated by scripts/generate-stack-pages.ts. Do not edit. */",
    'import type { GeneratedStackPage } from "./types";',
    "",
    `export const GENERATED_STACK_PAGES = ${JSON.stringify(pages)} as const satisfies readonly GeneratedStackPage[];`,
    "",
  ].join("\n");
  await Bun.write(OUTPUT_URL, source);
  console.log(`Generated ${pages.length} stack pages at ${OUTPUT_URL.pathname}`);
}

if (import.meta.main) {
  await main();
}
