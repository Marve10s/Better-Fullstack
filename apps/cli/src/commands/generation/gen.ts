import { log } from "@clack/prompts";
import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

import type {
  RecipeAdapterContext,
  RecipeKind,
  RecipePlannedFile,
  RecipeVerificationCheck,
} from "@/recipes/types";
import type { LifecyclePlan, LifecycleResult } from "@better-fullstack/project-lifecycle/contracts";
import type { ProjectTransaction } from "@better-fullstack/project-lifecycle/transaction";

import { planRecipeAgentContext } from "@/recipes/agent-context";
import { createRecipeRecordFile, readRecipeRecords } from "@/recipes/records";
import { resolveRecipeAdapter, validateRecipeAdapterRegistry } from "@/recipes/registry";
import { readBtsConfig } from "@/config/bts-config";
import { getProjectRecoveryCommand } from "@/lifecycle/lifecycle-command";
import { lifecyclePlan, lifecycleResult } from "@better-fullstack/project-lifecycle/contracts";
import {
  beginProjectTransaction,
  commitProjectTransaction,
  rollbackProjectTransaction,
  writeProjectTransactionFile,
} from "@better-fullstack/project-lifecycle/transaction";
import { createReviewToken } from "@better-fullstack/project-lifecycle/review-token";
import { getCurrentLifecycleVersions, hashContent } from "@/lifecycle/scaffold-manifest";

export type GenKind = RecipeKind;

export type GenCommandInput = {
  kind: GenKind;
  name: string;
  dir?: string;
  dryRun?: boolean;
  apply?: boolean;
  reviewToken?: string;
  json?: boolean;
};

export type GenStatus =
  | "planned"
  | "created"
  | "blocked"
  | "unsupported"
  | "rolled-back"
  | "failed";

export type GenPlannedFile = RecipePlannedFile;

export type GenResult = {
  success: boolean;
  status: GenStatus;
  message: string;
  projectDir?: string;
  recipeId?: string;
  adapterId?: string;
  adapterVersion?: number;
  maintenanceOwner?: string;
  persistent?: boolean;
  resourceFile?: string;
  routerIndexFile?: string;
  registered?: boolean;
  files?: GenPlannedFile[];
  checks?: RecipeVerificationCheck[];
  migrationGuidance?: string[];
  reviewToken?: string;
  operationPlan?: LifecyclePlan;
  lifecycle?: LifecycleResult;
  recoveryId?: string;
};

export type GenApplyOptions = {
  beforeTransactionSnapshot?: () => void | Promise<void>;
  beforeMutation?: () => void | Promise<void>;
  afterWrite?: (file: GenPlannedFile, index: number) => void | Promise<void>;
  writeFile?: (target: string, content: string) => void | Promise<void>;
};

function splitWords(raw: string): string[] {
  return raw
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function toCamelCase(raw: string): string {
  return splitWords(raw)
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
}

function toPascalCase(raw: string): string {
  const camel = toCamelCase(raw);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

async function getProjectName(projectDir: string): Promise<string> {
  const dbPackage = await fs
    .readJson(path.join(projectDir, "packages/db/package.json"))
    .catch(() => null);
  if (
    dbPackage &&
    typeof dbPackage === "object" &&
    "name" in dbPackage &&
    typeof dbPackage.name === "string"
  ) {
    const match = /^@([^/]+)\/db$/.exec(dbPackage.name);
    if (match?.[1]) return match[1];
  }
  return path.basename(projectDir);
}

function unsupportedGenResult(projectDir: string, message: string): GenResult {
  return { success: false, status: "unsupported", projectDir, message };
}

function blockedGenResult(projectDir: string, message: string): GenResult {
  const versions = getCurrentLifecycleVersions();
  return {
    success: false,
    status: "blocked",
    projectDir,
    message,
    lifecycle: lifecycleResult({
      operation: "gen",
      status: "blocked",
      projectDir,
      changes: { manual: 1 },
      blockers: [message],
      provenance: { source: versions, target: versions, verified: true },
      recovery: { available: false },
      checks: [{ id: "recipe-plan", status: "fail", message }],
      sideEffects: [{ kind: "filesystem", status: "not-run", description: "No files written." }],
    }),
  };
}

function findPlannedPath(files: readonly GenPlannedFile[], suffix: string): string | undefined {
  return files.find((file) => file.path.endsWith(suffix))?.path;
}

export async function planGen(input: GenCommandInput): Promise<GenResult> {
  const requestedProjectDir = path.resolve(input.dir || process.cwd());
  const projectDir = await fs.realpath(requestedProjectDir).catch(() => requestedProjectDir);
  const config = await readBtsConfig(projectDir);
  if (!config) {
    throw new Error(
      `No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`,
    );
  }

  const registryErrors = validateRecipeAdapterRegistry();
  if (registryErrors.length > 0) {
    return blockedGenResult(projectDir, `Recipe registry is invalid: ${registryErrors.join(" ")}`);
  }

  const name = toCamelCase(input.name);
  const typeName = toPascalCase(input.name);
  if (!name || !/^[a-z]/i.test(name)) {
    throw new Error(
      `Invalid resource name "${input.name}". Use a name that starts with a letter, for example "post".`,
    );
  }

  const context: RecipeAdapterContext = {
    projectDir,
    config,
    kind: input.kind,
    requestedName: input.name,
    projectName: await getProjectName(projectDir),
    name,
    typeName,
  };
  const resolution = resolveRecipeAdapter(context);
  if (!resolution.adapter) {
    return unsupportedGenResult(
      projectDir,
      `Generation is not yet supported for this Stack Graph. ${resolution.reasons.join(" ")}`,
    );
  }

  const existingRecords = await readRecipeRecords(projectDir);
  if (existingRecords.some((record) => record.recipeId === `typescript-resource:${name}`)) {
    throw new Error(`Recipe '${name}' already exists.`);
  }

  let adapterPlan;
  try {
    adapterPlan = await resolution.adapter.plan(context);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    if (/already exists/.test(reason)) throw error;
    return blockedGenResult(projectDir, `Generation is blocked before writes: ${reason}`);
  }

  let files: GenPlannedFile[];
  try {
    const agentDocs = await planRecipeAgentContext(projectDir, existingRecords, adapterPlan);
    const planWithDocs = { ...adapterPlan, files: [...adapterPlan.files, ...agentDocs] };
    const record = createRecipeRecordFile(planWithDocs, config);
    files = [...planWithDocs.files, record];
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return blockedGenResult(projectDir, `Generation is blocked before writes: ${reason}`);
  }

  const reviewToken = createReviewToken("gen", {
    projectDir,
    kind: input.kind,
    recipeId: adapterPlan.recipeId,
    adapterId: adapterPlan.adapterId,
    adapterVersion: adapterPlan.adapterVersion,
    files: files.map(({ path: filePath, action, preimageSha256, postimageSha256 }) => ({
      path: filePath,
      action,
      preimageSha256,
      postimageSha256,
    })),
  });
  const versions = getCurrentLifecycleVersions();
  const operationPlan = lifecyclePlan({
    operation: "gen",
    status: "planned",
    projectDir,
    changes: {
      added: files.filter((file) => file.action === "create").length,
      patched: files.filter((file) => file.action === "update").length,
    },
    provenance: { source: versions, target: versions, verified: true },
    recovery: { available: true, automaticRollback: true },
    affected: {
      stackParts: adapterPlan.ownerPartId ? [adapterPlan.ownerPartId] : [],
      files: files.map((file) => ({ path: file.path, action: file.action })),
      dependencies: [],
    },
    checks: [
      { id: "project-config", status: "pass" },
      { id: "recipe-adapter", status: "pass", message: adapterPlan.adapterId },
      ...adapterPlan.checks.map((check) => ({
        id: check.id,
        status: "pending" as const,
        message: check.command ?? check.description,
      })),
    ],
    sideEffects: [
      {
        kind: "filesystem",
        status: "planned",
        description: "Write the complete recipe through one recovery transaction.",
      },
    ],
    review: { required: true, token: reviewToken },
    preconditions: files.map((file) => ({
      id: `preimage:${file.path}`,
      status: "pass" as const,
      message: file.preimageSha256 ? "Existing file is hash-bound." : "Target is absent.",
    })),
    nextActions: ["Review every file, then apply with the exact review token."],
  });
  const resourceFile = findPlannedPath(files, `/routers/${name}.ts`);
  const routerIndexFile = findPlannedPath(files, "/routers/index.ts");

  return {
    success: true,
    status: "planned",
    projectDir,
    recipeId: adapterPlan.recipeId,
    adapterId: adapterPlan.adapterId,
    adapterVersion: adapterPlan.adapterVersion,
    maintenanceOwner: adapterPlan.maintenanceOwner,
    persistent: adapterPlan.persistent,
    resourceFile: resourceFile ? path.join(projectDir, resourceFile) : undefined,
    routerIndexFile: routerIndexFile ? path.join(projectDir, routerIndexFile) : undefined,
    registered: Boolean(routerIndexFile),
    files,
    checks: adapterPlan.checks,
    migrationGuidance: adapterPlan.migrationGuidance,
    reviewToken,
    operationPlan,
    lifecycle: lifecycleResult({ ...operationPlan, status: "planned" }),
    message: `${adapterPlan.summary} The plan contains ${files.length} reviewed file changes.`,
  };
}

async function currentPreimage(projectDir: string, file: GenPlannedFile): Promise<string | null> {
  const absolutePath = path.join(projectDir, file.path);
  if (!(await fs.pathExists(absolutePath))) return null;
  return hashContent(await fs.readFile(absolutePath));
}

export async function applyGen(
  input: GenCommandInput,
  reviewToken: string | undefined,
  options: GenApplyOptions = {},
): Promise<GenResult> {
  const reviewed = await planGen({ ...input, apply: false, reviewToken: undefined });
  if (!reviewed.success || reviewed.status !== "planned" || !reviewed.files) return reviewed;
  if (!reviewToken || reviewed.reviewToken !== reviewToken) {
    return {
      ...reviewed,
      success: false,
      status: "blocked",
      message: "The gen review token is missing or stale. Create and review a new plan.",
      lifecycle: lifecycleResult({
        ...(reviewed.lifecycle as LifecycleResult),
        status: "blocked",
        blockers: ["The gen review token is missing or stale."],
        checks: [{ id: "review-token", status: "fail" }],
      }),
    };
  }

  let transaction: ProjectTransaction;
  try {
    await options.beforeTransactionSnapshot?.();
    transaction = await beginProjectTransaction(
      reviewed.projectDir as string,
      "gen",
      reviewed.files.map((file) => file.path),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ...reviewed,
      success: false,
      status: "failed",
      message: `Could not create the recovery snapshot: ${message}`,
      lifecycle: lifecycleResult({
        ...(reviewed.lifecycle as LifecycleResult),
        status: "failed",
        blockers: [message],
        sideEffects: [{ kind: "filesystem", status: "not-run", description: message }],
      }),
    };
  }

  try {
    await options.beforeMutation?.();
    for (const file of reviewed.files) {
      if ((await currentPreimage(reviewed.projectDir as string, file)) !== file.preimageSha256) {
        throw new Error(`Reviewed preimage changed before apply: ${file.path}`);
      }
    }
    for (const [index, file] of reviewed.files.entries()) {
      await writeProjectTransactionFile(transaction, file.path, file.content, {
        expectedSha256: file.postimageSha256,
        ...(options.writeFile
          ? { writeFile: (target) => options.writeFile?.(target, file.content) }
          : {}),
      });
      await options.afterWrite?.(file, index);
    }
    await commitProjectTransaction(transaction);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    try {
      await rollbackProjectTransaction(transaction);
    } catch (rollbackError) {
      const rollbackReason =
        rollbackError instanceof Error ? rollbackError.message : String(rollbackError);
      return {
        ...reviewed,
        success: false,
        status: "failed",
        recoveryId: transaction.id,
        message: `${reason}. Automatic rollback failed: ${rollbackReason}.`,
        lifecycle: lifecycleResult({
          ...(reviewed.lifecycle as LifecycleResult),
          status: "failed",
          recovery: {
            available: true,
            transactionId: transaction.id,
            command: getProjectRecoveryCommand(
              reviewed.projectDir as string,
              transaction.id,
              process.platform,
              undefined,
            ),
          },
          sideEffects: [
            {
              kind: "filesystem",
              status: "failed",
              description: reason,
              compensatingAction: "Run the reported recovery command.",
            },
          ],
        }),
      };
    }
    return {
      ...reviewed,
      success: false,
      status: "rolled-back",
      recoveryId: transaction.id,
      message: `${reason}. Every gen preimage was restored.`,
      lifecycle: lifecycleResult({
        ...(reviewed.lifecycle as LifecycleResult),
        status: "rolled-back",
        recovery: { available: true, transactionId: transaction.id, automaticRollback: true },
        history: { recorded: true, recoveryId: transaction.id },
        sideEffects: [
          {
            kind: "filesystem",
            status: "restored",
            description: "Every gen preimage was restored.",
          },
        ],
      }),
    };
  }

  return {
    ...reviewed,
    status: "created",
    recoveryId: transaction.id,
    message: `Applied ${reviewed.recipeId} as one recoverable recipe transaction.`,
    lifecycle: lifecycleResult({
      ...(reviewed.lifecycle as LifecycleResult),
      status: "applied",
      recovery: {
        available: true,
        transactionId: transaction.id,
        command: getProjectRecoveryCommand(
          reviewed.projectDir as string,
          transaction.id,
          process.platform,
          undefined,
        ),
        automaticRollback: true,
      },
      history: { recorded: true, recoveryId: transaction.id },
      sideEffects: [
        {
          kind: "filesystem",
          status: "applied",
          description: "Applied every reviewed recipe file and managed entry.",
        },
      ],
      nextActions: ["Run the declared recipe checks, then review migration guidance."],
    }),
  };
}

function reportGenResult(result: GenResult): void {
  if (result.status === "planned") {
    log.info(pc.cyan(result.message));
    for (const file of result.files ?? []) {
      log.message(pc.dim(`  ${file.action === "create" ? "+" : "~"} ${file.path}`));
    }
    if (result.reviewToken) log.info(`Review token: ${pc.cyan(result.reviewToken)}`);
    return;
  }
  if (result.status === "created") {
    log.success(pc.green(result.message));
    if (result.lifecycle?.recovery.command) {
      log.info(pc.dim(`Recovery: ${result.lifecycle.recovery.command}`));
    }
    return;
  }
  log.warn(pc.yellow(result.message));
}

export async function genCommand(input: GenCommandInput): Promise<GenResult> {
  let result: GenResult;
  if (input.dryRun && input.apply) {
    result = {
      success: false,
      status: "blocked",
      message: "--dry-run and --apply cannot be used together.",
    };
  } else if (input.apply) {
    result = await applyGen(input, input.reviewToken);
  } else {
    result = await planGen(input);
  }

  if (input.json) console.log(JSON.stringify(result, null, 2));
  else reportGenResult(result);
  return result;
}
