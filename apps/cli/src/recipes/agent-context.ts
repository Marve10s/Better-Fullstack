import fs from "fs-extra";
import path from "node:path";

import type { RecipeRecord } from "./records";
import type { RecipeAdapterPlan, RecipePlannedFile } from "./types";

import { hashContent } from "../utils/scaffold-manifest";
import { replaceMarkdownManagedRegion } from "./managed-region";

const AGENT_DOCS = ["AGENTS.md", "CLAUDE.md"] as const;

type RecipeSummary = Pick<
  RecipeRecord,
  "adapterId" | "maintenanceOwner" | "name" | "ownerPartSpec" | "persistent" | "recipeId"
> & { paths: string[] };

function summarizeRecord(record: RecipeRecord): RecipeSummary {
  return {
    recipeId: record.recipeId,
    name: record.name,
    adapterId: record.adapterId,
    maintenanceOwner: record.maintenanceOwner,
    persistent: record.persistent,
    ownerPartSpec: record.ownerPartSpec,
    paths: [...new Set(record.ownedArtifacts.map((artifact) => artifact.path))].sort(),
  };
}

function summarizePlan(plan: RecipeAdapterPlan): RecipeSummary {
  return {
    recipeId: plan.recipeId,
    name: plan.name,
    adapterId: plan.adapterId,
    maintenanceOwner: plan.maintenanceOwner,
    persistent: plan.persistent,
    ownerPartSpec: plan.ownerPartId,
    paths: [...new Set(plan.ownedArtifacts.map((artifact) => artifact.path))].sort(),
  };
}

function recipeContextBody(records: readonly RecipeRecord[], plan: RecipeAdapterPlan): string {
  const summaries = [
    ...records.filter((record) => record.recipeId !== plan.recipeId).map(summarizeRecord),
    summarizePlan(plan),
  ].sort((left, right) => left.recipeId.localeCompare(right.recipeId));
  const recipes = summaries.flatMap((recipe) => [
    `### ${recipe.recipeId}`,
    "",
    `- Adapter: \`${recipe.adapterId}\``,
    `- Verification maintainer: ${recipe.maintenanceOwner}`,
    `- Persistence: ${recipe.persistent ? "persistent" : "in-memory"}`,
    `- Owning Stack Part: \`${recipe.ownerPartSpec ?? "unresolved"}\``,
    `- Owned paths: ${recipe.paths.map((ownedPath) => `\`${ownedPath}\``).join(", ")}`,
    "",
  ]);
  return [
    "## Better Fullstack recipe context",
    "",
    "Treat `bts.jsonc` and `.better-fullstack/recipes/*.json` as the local, installed-version context. Package manifests and the lockfile define dependency versions. Do not replace those values with documentation for a newer release.",
    "",
    "Use `create-better-fullstack context --json` for roles, capabilities, evidence, owning Stack Parts, and safe next actions. Use `create-better-fullstack recipes check` before editing recipe-owned files and `create-better-fullstack recipes history` to find recovery points.",
    "",
    "Regeneration is a lifecycle mutation. Create a plan, review every owned file and managed-region entry, then apply the exact review token. User code outside managed regions is not recipe-owned.",
    "",
    ...recipes,
  ]
    .join("\n")
    .trimEnd();
}

export async function planRecipeAgentContext(
  projectDir: string,
  records: readonly RecipeRecord[],
  plan: RecipeAdapterPlan,
): Promise<RecipePlannedFile[]> {
  const body = recipeContextBody(records, plan);
  const files: RecipePlannedFile[] = [];
  for (const relativePath of AGENT_DOCS) {
    const target = path.join(projectDir, relativePath);
    const stats = await fs.lstat(target).catch(() => null);
    if (!stats) continue;
    if (!stats.isFile() || stats.isSymbolicLink()) {
      throw new Error(`${relativePath} is not a safe regular agent instruction file.`);
    }
    const original = await fs.readFile(target, "utf-8");
    const updated = replaceMarkdownManagedRegion(original, "recipes", body);
    if (!updated.success) throw new Error(updated.reason);
    if (!updated.changed) continue;
    files.push({
      path: relativePath,
      action: "update",
      content: updated.content,
      preimageSha256: hashContent(original),
      postimageSha256: hashContent(updated.content),
    });
  }
  return files;
}
