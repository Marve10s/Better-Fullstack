import {
  getProjectRecoveryPoint,
  listProjectRecoveryPoints,
  type RecoveryPointSummary,
} from "@better-fullstack/project-lifecycle/transaction";
import {
  formatStackPartSpec,
  getCapabilityInventory,
  legacyProjectConfigToStackParts,
  type BetterTStackConfig,
} from "@better-fullstack/types";
import fs from "fs-extra";
import path from "node:path";
import { z } from "zod";

import type { RecipeAdapterPlan, RecipePlannedFile } from "@/recipes/types";

import { hashContent } from "@/lifecycle/scaffold-manifest";
import { getManagedRegionBody, getManagedRegionHash } from "@/recipes/managed-region";

export const RECIPE_RECORD_ROOT = ".better-fullstack/recipes";
export const RECIPE_RECORD_SCHEMA_VERSION = 1 as const;

const RecipeOwnedArtifactSchema = z.object({
  path: z.string().min(1),
  ownership: z.enum(["full", "managed-region"]),
  regionId: z.string().min(1).optional(),
  entry: z.string().min(1).optional(),
  sha256: z.string().regex(/^[0-9a-f]{64}$/),
});

export const RecipeRecordSchema = z.object({
  schemaVersion: z.literal(RECIPE_RECORD_SCHEMA_VERSION),
  recipeId: z.string().min(1),
  adapterId: z.string().min(1),
  adapterVersion: z.number().int().positive(),
  maintenanceOwner: z.string().min(1),
  name: z.string().min(1),
  generatorVersion: z.string().min(1),
  persistent: z.boolean(),
  ownerPartId: z.string().nullable(),
  ownerPartSpec: z.string().nullable(),
  evidence: z.array(
    z.object({
      part: z.string(),
      level: z.string(),
      maturity: z.string(),
      freshness: z.string(),
    }),
  ),
  ownedArtifacts: z.array(RecipeOwnedArtifactSchema),
  checks: z.array(
    z.object({ id: z.string(), command: z.string().optional(), description: z.string() }),
  ),
  migrationGuidance: z.array(z.string()),
});

export type RecipeRecord = z.infer<typeof RecipeRecordSchema>;

export type RecipeCheck = {
  recipeId: string;
  adapterId: string;
  ok: boolean;
  checks: Array<{
    id: string;
    status: "pass" | "fail";
    path?: string;
    message: string;
  }>;
};

export type RecipeHistoryEntry = {
  recipeId: string;
  name: string;
  adapterId: string;
  persistent: boolean;
  recoveryPoints: RecoveryPointSummary[];
};

function recordPath(name: string): string {
  return `${RECIPE_RECORD_ROOT}/${name}.json`;
}

function fileForPath(files: readonly RecipePlannedFile[], filePath: string): RecipePlannedFile {
  const file = files.find((candidate) => candidate.path === filePath);
  if (!file) throw new Error(`Recipe ownership references an unplanned file: ${filePath}`);
  return file;
}

function evidenceForConfig(config: BetterTStackConfig) {
  const parts = config.stackParts ?? legacyProjectConfigToStackParts(config);
  const inventory = getCapabilityInventory();
  return parts
    .filter((part) => part.source !== "provided" && part.toolId !== "none")
    .map((part) => {
      const evidence =
        inventory.find(
          (record) => record.ecosystem === part.ecosystem && record.optionId === part.toolId,
        ) ?? inventory.find((record) => record.optionId === part.toolId);
      return {
        part: formatStackPartSpec(part, parts),
        level: evidence?.evidenceLevel ?? "listed",
        maturity: evidence?.maturity ?? "experimental",
        freshness: evidence?.freshness ?? "unverified",
      };
    });
}

export function createRecipeRecordFile(
  plan: RecipeAdapterPlan,
  config: BetterTStackConfig,
): RecipePlannedFile {
  const parts = config.stackParts ?? legacyProjectConfigToStackParts(config);
  const owner = plan.ownerPartId ? parts.find((part) => part.id === plan.ownerPartId) : undefined;
  const ownedArtifacts = plan.ownedArtifacts.map((artifact) => {
    const file = fileForPath(plan.files, artifact.path);
    const regionBody =
      artifact.ownership === "managed-region" && artifact.regionId
        ? getManagedRegionBody(file.content, artifact.regionId)
        : null;
    const sha256 = artifact.entry
      ? regionBody?.split(/\r?\n/).includes(artifact.entry)
        ? hashContent(artifact.entry)
        : null
      : artifact.ownership === "full"
        ? file.postimageSha256
        : artifact.regionId
          ? getManagedRegionHash(file.content, artifact.regionId)
          : null;
    if (!sha256) {
      throw new Error(
        `Recipe managed region '${artifact.regionId ?? "unknown"}' is missing from ${artifact.path}.`,
      );
    }
    return { ...artifact, sha256 };
  });
  const record: RecipeRecord = {
    schemaVersion: RECIPE_RECORD_SCHEMA_VERSION,
    recipeId: plan.recipeId,
    adapterId: plan.adapterId,
    adapterVersion: plan.adapterVersion,
    maintenanceOwner: plan.maintenanceOwner,
    name: plan.name,
    generatorVersion: config.version,
    persistent: plan.persistent,
    ownerPartId: plan.ownerPartId,
    ownerPartSpec: owner ? formatStackPartSpec(owner, parts) : null,
    evidence: evidenceForConfig(config),
    ownedArtifacts,
    checks: plan.checks,
    migrationGuidance: plan.migrationGuidance,
  };
  const content = `${JSON.stringify(record, null, 2)}\n`;
  return {
    path: recordPath(plan.name),
    action: "create",
    content,
    preimageSha256: null,
    postimageSha256: hashContent(content),
  };
}

export async function readRecipeRecords(projectDir: string): Promise<RecipeRecord[]> {
  const root = path.join(projectDir, RECIPE_RECORD_ROOT);
  const rootStats = await fs.lstat(root).catch(() => null);
  if (!rootStats) return [];
  if (!rootStats.isDirectory() || rootStats.isSymbolicLink()) {
    throw new Error(`${RECIPE_RECORD_ROOT} is not a safe recipe record directory.`);
  }
  const records: RecipeRecord[] = [];
  for (const name of (await fs.readdir(root)).filter((entry) => entry.endsWith(".json")).sort()) {
    const target = path.join(root, name);
    const stats = await fs.lstat(target).catch(() => null);
    if (!stats?.isFile() || stats.isSymbolicLink()) {
      throw new Error(`Recipe record '${name}' is not a regular file.`);
    }
    const parsed = RecipeRecordSchema.safeParse(await fs.readJson(target).catch(() => null));
    if (!parsed.success) throw new Error(`Recipe record '${name}' is invalid.`);
    records.push(parsed.data);
  }
  return records;
}

export async function checkRecipeRecords(
  projectDir: string,
  recipeName?: string,
): Promise<RecipeCheck[]> {
  const records = (await readRecipeRecords(projectDir)).filter(
    (record) => !recipeName || record.name === recipeName || record.recipeId === recipeName,
  );
  return Promise.all(
    records.map(async (record): Promise<RecipeCheck> => {
      const checks: RecipeCheck["checks"] = [];
      for (const artifact of record.ownedArtifacts) {
        const target = path.join(projectDir, artifact.path);
        const stats = await fs.lstat(target).catch(() => null);
        if (!stats?.isFile() || stats.isSymbolicLink()) {
          checks.push({
            id: `owned:${artifact.path}`,
            status: "fail",
            path: artifact.path,
            message: "Owned artifact is missing or is not a regular file.",
          });
          continue;
        }
        const content = await fs.readFile(target, "utf-8");
        const regionBody =
          artifact.ownership === "managed-region" && artifact.regionId
            ? getManagedRegionBody(content, artifact.regionId)
            : null;
        const currentHash = artifact.entry
          ? regionBody?.split(/\r?\n/).includes(artifact.entry)
            ? hashContent(artifact.entry)
            : null
          : artifact.ownership === "full"
            ? hashContent(content)
            : artifact.regionId
              ? getManagedRegionHash(content, artifact.regionId)
              : null;
        checks.push({
          id: `owned:${artifact.path}${artifact.regionId ? `#${artifact.regionId}` : ""}`,
          status: currentHash === artifact.sha256 ? "pass" : "fail",
          path: artifact.path,
          message:
            currentHash === artifact.sha256
              ? "Owned content matches the reviewed recipe output."
              : "Owned content changed after recipe apply.",
        });
      }
      return {
        recipeId: record.recipeId,
        adapterId: record.adapterId,
        ok: checks.every((check) => check.status === "pass"),
        checks,
      };
    }),
  );
}

export async function getRecipeHistory(projectDir: string): Promise<RecipeHistoryEntry[]> {
  const records = await readRecipeRecords(projectDir);
  const summaries = (await listProjectRecoveryPoints(projectDir)).filter(
    (point) => point.operation === "gen",
  );
  const transactions = await Promise.all(
    summaries.map(async (summary) => ({
      summary,
      point: summary.valid ? await getProjectRecoveryPoint(projectDir, summary.id) : null,
    })),
  );
  return records.map((record) => ({
    recipeId: record.recipeId,
    name: record.name,
    adapterId: record.adapterId,
    persistent: record.persistent,
    recoveryPoints: transactions
      .filter(({ point }) =>
        point?.metadata?.files.some((file) => file.path === recordPath(record.name)),
      )
      .map(({ summary }) => summary),
  }));
}
