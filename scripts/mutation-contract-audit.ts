import fs from "node:fs/promises";
import path from "node:path";

export const MUTATION_AUDIT_SCHEMA_VERSION = 1 as const;

export type MutationAuditRow = {
  command: "add" | "remove" | "update" | "gen" | "registry add";
  planner: string;
  approval: string;
  preimages: string;
  writeEngine: string;
  history: string;
  recovery: string;
  externalSideEffects: string;
  auditedGap: string | null;
  resolution: string;
  evidence: Array<{ file: string; marker: string }>;
};

export const MUTATION_CONTRACT_AUDIT: readonly MutationAuditRow[] = [
  {
    command: "add",
    planner: "stack-update planner; --dry-run exposes the plan",
    approval:
      "the explicit add command approves ordinary changes; architecture swaps require acknowledgement",
    preimages: "shared stack-update preimages bind every transaction target",
    writeEngine: "stack-update",
    history: "scaffold manifest history and recovery metadata",
    recovery: "shared project transaction with automatic rollback",
    externalSideEffects:
      "optional package-manager install runs after the filesystem commit and is reported separately",
    auditedGap: "package-manager output and lockfiles cannot join the filesystem transaction",
    resolution:
      "contract v2 records the side effect and its compensating action without claiming atomicity",
    evidence: [
      { file: "apps/cli/src/helpers/core/add-handler.ts", marker: "runStackUpdateAdd" },
      { file: "apps/cli/src/helpers/core/stack-update.ts", marker: "beginProjectTransaction" },
    ],
  },
  {
    command: "remove",
    planner: "part-removal adapter over stack-update",
    approval: "exact detached review token; architecture swaps require acknowledgement",
    preimages: "shared stack-update preimages",
    writeEngine: "stack-update",
    history: "scaffold manifest history and recovery metadata",
    recovery: "shared project transaction with automatic rollback",
    externalSideEffects: "dependency installation remains a reported manual action",
    auditedGap: null,
    resolution: "retain the adapter because it already shares the safe engine",
    evidence: [
      { file: "apps/cli/src/helpers/core/remove-handler.ts", marker: "getStackUpdatePlanDigest" },
      { file: "apps/cli/src/helpers/core/remove-handler.ts", marker: "applyStackUpdate" },
    ],
  },
  {
    command: "update",
    planner: "scaffold-update and stack-update remain separate domain planners",
    approval: "exact detached review tokens",
    preimages: "both planners bind exact preimages before apply",
    writeEngine: "shared project transaction beneath separate update engines",
    history: "scaffold manifest history and recovery metadata",
    recovery: "shared project transaction with automatic rollback",
    externalSideEffects: "dependency installation is not part of template update",
    auditedGap: "plan-token hashing was duplicated between the two planners",
    resolution:
      "both planners use the shared review-token helper while retaining their domain logic",
    evidence: [
      { file: "apps/cli/src/helpers/core/scaffold-upgrade.ts", marker: "createReviewToken" },
      { file: "apps/cli/src/helpers/core/stack-update.ts", marker: "createReviewToken" },
    ],
  },
  {
    command: "gen",
    planner: "gen plan returns both exact file bodies and hashes",
    approval: "exact detached review token",
    preimages: "resource absence and router-index bytes are hash-bound",
    writeEngine: "shared project transaction",
    history: "recovery metadata records the operation and outputs",
    recovery: "automatic rollback and explicit recovery point",
    externalSideEffects: "none",
    auditedGap:
      "the original command wrote the resource before it knew whether router wiring could succeed",
    resolution:
      "stale anchors now block planning, and both writes apply in one reviewed transaction",
    evidence: [
      { file: "apps/cli/src/commands/gen.ts", marker: "planGen" },
      { file: "apps/cli/src/commands/gen.ts", marker: "applyGen" },
    ],
  },
  {
    command: "registry add",
    planner:
      "local pack plan returns files, dependency manifests, environment edits, and metadata merges",
    approval: "exact detached review token",
    preimages: "every planned output is hash-bound",
    writeEngine: "shared project transaction",
    history: "recovery metadata records the operation and outputs",
    recovery: "automatic rollback and explicit recovery point",
    externalSideEffects:
      "package-manager execution is never implicit; the contract reports the manual install action",
    auditedGap:
      "the original local installer wrote pack, package, environment, lock, and config files directly",
    resolution:
      "all local writes now apply through one reviewed transaction; remote sources remain rejected",
    evidence: [
      { file: "apps/cli/src/helpers/core/registry-handler.ts", marker: "planPackInstall" },
      { file: "apps/cli/src/helpers/core/registry-handler.ts", marker: "applyPackInstall" },
    ],
  },
] as const;

export async function validateMutationContractAudit(rootDir = process.cwd()): Promise<void> {
  const commands = new Set<string>();
  for (const row of MUTATION_CONTRACT_AUDIT) {
    if (commands.has(row.command)) throw new Error(`Duplicate mutation audit row: ${row.command}`);
    commands.add(row.command);
    for (const evidence of row.evidence) {
      const source = await fs.readFile(path.join(rootDir, evidence.file), "utf-8");
      if (!source.includes(evidence.marker)) {
        throw new Error(
          `${row.command} audit evidence is stale: ${evidence.file} lacks ${evidence.marker}`,
        );
      }
    }
  }
  const expected = ["add", "remove", "update", "gen", "registry add"];
  if (expected.some((command) => !commands.has(command))) {
    throw new Error("Mutation audit does not cover every Phase 2 lifecycle command.");
  }

  const documentation = await fs.readFile(
    path.join(rootDir, "docs/reference/existing-project-mutation-audit.md"),
    "utf-8",
  );
  for (const command of expected) {
    if (!documentation.includes(`\`${command}\``)) {
      throw new Error(`Mutation audit documentation omits ${command}.`);
    }
  }
  if (!documentation.includes('`contractVersion: "2"`')) {
    throw new Error("Mutation audit documentation does not state the lifecycle contract version.");
  }
}

if (import.meta.main) {
  await validateMutationContractAudit();
  console.log("Mutation contract audit is current.");
}
