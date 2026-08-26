import {
  formatStackPartSpec,
  getCapabilityInventory,
  legacyProjectConfigToStackParts,
  validateStackParts,
  type BetterTStackConfig,
} from "@better-fullstack/types";
import fs from "fs-extra";
import path from "node:path";

import { readRecipeRecords } from "@/recipes/records";
import { readBtsConfig } from "@/config/bts-config";
import { getCurrentLifecycleVersions } from "@/lifecycle/scaffold-manifest";
import { getProjectUpdateSupport } from "@/lifecycle/update-support";

export const PROJECT_CONTEXT_SCHEMA_VERSION = 1 as const;

const PRIMARY_ROLES = new Set(["frontend", "backend", "mobile", "database"]);
const VERSION_FILES = [
  "package.json",
  "bun.lock",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "Cargo.toml",
  "Cargo.lock",
  "go.mod",
  "go.sum",
  "pyproject.toml",
  "uv.lock",
  "pom.xml",
  "build.gradle",
  "build.gradle.kts",
  "mix.exs",
  "mix.lock",
] as const;

export type ProjectContextDocument = Awaited<ReturnType<typeof getProjectContext>>;

function selectedParts(config: BetterTStackConfig) {
  return config.stackParts ?? legacyProjectConfigToStackParts(config);
}

function safeTargetPath(value: string | undefined): string | null {
  if (!value) return null;
  const normalized = path.posix.normalize(value.replaceAll("\\", "/"));
  if (
    normalized === "." ||
    normalized === ".." ||
    normalized.startsWith("../") ||
    path.posix.isAbsolute(normalized)
  ) {
    return null;
  }
  return normalized;
}

function shellPath(value: string): string {
  return /^[A-Za-z0-9_./-]+$/.test(value) ? value : `'${value.replaceAll("'", "'\\''")}'`;
}

function commandProjectPath(projectDir: string): string {
  const relative = path.relative(process.cwd(), projectDir);
  if (!relative) return ".";
  const safeRelative = safeTargetPath(relative);
  if (safeRelative) return shellPath(`./${safeRelative}`);
  return shellPath(projectDir);
}

async function installedVersionReferences(
  projectDir: string,
  targetPaths: readonly (string | undefined)[],
): Promise<string[]> {
  const roots = [
    ".",
    ...targetPaths.map(safeTargetPath).filter((entry): entry is string => entry !== null),
  ];
  const candidates = new Set<string>(["bts.jsonc"]);
  for (const root of roots) {
    for (const file of VERSION_FILES) {
      candidates.add(root === "." ? file : `${root}/${file}`);
    }
  }
  const present: string[] = [];
  for (const candidate of [...candidates].sort()) {
    const stats = await fs.lstat(path.join(projectDir, candidate)).catch(() => null);
    if (stats?.isFile() && !stats.isSymbolicLink()) present.push(candidate);
  }
  return present.slice(0, 64);
}

export async function getProjectContext(projectDirInput: string) {
  const projectDir = path.resolve(projectDirInput);
  const config = await readBtsConfig(projectDir);
  if (!config) {
    throw new Error(
      `No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`,
    );
  }
  const parts = selectedParts(config);
  const inventory = getCapabilityInventory();
  const evidenceByOption = new Map(
    inventory.map((record) => [`${record.ecosystem}:${record.optionId}`, record]),
  );
  const stackParts = parts
    .filter((part) => part.toolId !== "none")
    .map((part) => {
      const owner = part.ownerPartId
        ? parts.find((candidate) => candidate.id === part.ownerPartId)
        : undefined;
      const evidence =
        evidenceByOption.get(`${part.ecosystem}:${part.toolId}`) ??
        inventory.find((record) => record.optionId === part.toolId);
      return {
        id: part.id,
        spec: formatStackPartSpec(part, parts),
        role: part.role,
        ecosystem: part.ecosystem,
        toolId: part.toolId,
        source: part.source,
        ownerPartId: part.ownerPartId ?? null,
        ownerPartSpec: owner ? formatStackPartSpec(owner, parts) : null,
        targetPath: safeTargetPath(part.targetPath),
        evidence: evidence
          ? {
              level: evidence.evidenceLevel,
              declaredLevel: evidence.declaredEvidenceLevel,
              maturity: evidence.maturity,
              freshness: evidence.freshness,
              maintenanceOwner: evidence.maintenanceOwner,
              limitation: evidence.limitation,
              recipeIds: [...evidence.recipeIds],
            }
          : null,
      };
    })
    .sort((left, right) => left.spec.localeCompare(right.spec));
  const validation = validateStackParts(parts);
  const versions = getCurrentLifecycleVersions();
  const updateSupport = await getProjectUpdateSupport(projectDir, config.version, versions.cli);
  const recipeRecords = await readRecipeRecords(projectDir);
  const projectPath = commandProjectPath(projectDir);
  const roles = stackParts.filter(
    (part) => !part.ownerPartId && part.source !== "provided" && PRIMARY_ROLES.has(part.role),
  );
  const capabilities = stackParts.filter((part) => !roles.includes(part));
  const commands = [
    {
      id: "context",
      command: `create-better-fullstack context ${projectPath} --json`,
      mutates: false,
    },
    {
      id: "status",
      command: `create-better-fullstack status ${projectPath} --json`,
      mutates: false,
    },
    {
      id: "doctor",
      command: `create-better-fullstack doctor ${projectPath} --json`,
      mutates: false,
    },
    {
      id: "project-check",
      command: `create-better-fullstack check ${projectPath} --json`,
      mutates: false,
    },
    {
      id: "update-check",
      command: `create-better-fullstack update ${projectPath} --check --json`,
      mutates: false,
    },
    {
      id: "recipe-check",
      command: `create-better-fullstack recipes check --dir ${projectPath} --json`,
      mutates: false,
    },
    {
      id: "recipe-history",
      command: `create-better-fullstack recipes history --dir ${projectPath} --json`,
      mutates: false,
    },
  ];
  const nextActions = [
    ...(validation.issues.length > 0
      ? [
          {
            id: "review-compatibility",
            command: `create-better-fullstack doctor ${projectPath} --json`,
            reason: "Review Stack Graph compatibility issues before planning a mutation.",
          },
        ]
      : []),
    ...(recipeRecords.length > 0
      ? [
          {
            id: "check-recipes",
            command: `create-better-fullstack recipes check --dir ${projectPath} --json`,
            reason: "Verify recipe-owned files and managed entries before editing them.",
          },
        ]
      : []),
    {
      id: "check-project",
      command: `create-better-fullstack check ${projectPath} --json`,
      reason: "Inspect project health without running target toolchains.",
    },
    {
      id: "review-update",
      command: `create-better-fullstack update ${projectPath} --check --json`,
      reason: updateSupport.reason,
    },
  ];

  return {
    schemaVersion: PROJECT_CONTEXT_SCHEMA_VERSION,
    documentType: "better-fullstack/project-context" as const,
    project: {
      configVersion: config.version,
      currentCliVersion: versions.cli,
      ecosystem: config.ecosystem,
      packageManager: config.packageManager,
      workspaceShape: config.workspaceShape ?? "monorepo",
      versionChannel: config.versionChannel,
      installedVersionReferences: await installedVersionReferences(
        projectDir,
        stackParts.map((part) => part.targetPath ?? undefined),
      ),
    },
    roles,
    capabilities,
    compatibility: {
      valid: validation.issues.length === 0,
      issues: validation.issues.map((issue) => ({
        code: issue.code,
        message: issue.message,
        partId: issue.partId ?? null,
        role: issue.role ?? null,
        toolId: issue.toolId ?? null,
        alternatives: issue.alternatives ?? [],
      })),
    },
    evidence: {
      inventorySchemaVersion: 1,
      selected: stackParts.map((part) => ({
        partId: part.id,
        evidence: part.evidence,
      })),
    },
    recipes: recipeRecords.map((record) => ({
      recipeId: record.recipeId,
      adapterId: record.adapterId,
      adapterVersion: record.adapterVersion,
      maintenanceOwner: record.maintenanceOwner,
      persistent: record.persistent,
      ownerPartId: record.ownerPartId,
      ownerPartSpec: record.ownerPartSpec,
      ownedPaths: [...new Set(record.ownedArtifacts.map((artifact) => artifact.path))].sort(),
      checks: record.checks,
    })),
    updateSupport,
    commands,
    safeNextActions: nextActions,
  };
}
