import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import {
  applyScaffoldUpgrade,
  getUpgradePlanDigest,
  planScaffoldUpgrade,
  type UpgradePlan,
} from "../helpers/core/scaffold-upgrade";
import { flushTelemetry, trackCommand } from "../utils/analytics";
import { readBtsConfig } from "../utils/bts-config";
import { handleError } from "../utils/errors";
import { getLatestCLIVersion } from "../utils/get-latest-cli-version";
import {
  getProjectRecoveryCommand,
  getPackageExecPrefix,
  quotePosixShellArgument,
  quotePowerShellArgument,
} from "../utils/lifecycle-command";
import { lifecycleResult } from "../utils/lifecycle-contract";
import { recoverProjectTransaction } from "../utils/project-transaction";
import { renderTitle } from "../utils/render-title";

export type UpdateCommandInput = {
  projectDir?: string;
  dryRun?: boolean;
  apply?: boolean;
  check?: boolean;
  json?: boolean;
  recordBaseline?: boolean;
  acknowledgeUnprovenManifestV1?: boolean;
  reviewToken?: string;
  recover?: string;
};

export function getUpdateApplyAuthorizationError(input: UpdateCommandInput): string | null {
  if (!input.apply) return null;
  if (!input.reviewToken) {
    return "`--review-token` is required with `--apply`. Review the categorized paths and plan, then pass its exact token.";
  }
  return null;
}

function formatCount(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function failUpdate(projectDir: string, error: string, json: boolean): never {
  if (json) {
    console.log(JSON.stringify({ projectDir, ok: false, error }, null, 2));
    process.exit(1);
  }
  handleError(error);
}

function reportGroup(title: string, marker: string, entries: string[]): void {
  if (entries.length === 0) return;
  log.message(`${title} (${entries.length}):`);
  for (const entry of entries) {
    log.message(pc.dim(`  ${marker} ${entry}`));
  }
}

function reportManual(entries: UpgradePlan["manual"]): void {
  if (entries.length === 0) return;
  log.message(`Needs manual review (${entries.length}):`);
  for (const entry of entries) {
    log.message(pc.dim(`  ! ${entry.path}${entry.reason ? ` — ${entry.reason}` : ""}`));
  }
}

function reportMerged(plan: UpgradePlan): void {
  const merged = plan.files.filter((file) => file.category === "merged");
  if (merged.length === 0) return;
  log.message(`Structured merges (template changes folded into your file) (${merged.length}):`);
  for (const entry of merged) {
    log.message(pc.dim(`  ± ${entry.path}${entry.reason ? ` — ${entry.reason}` : ""}`));
  }
}

function reportRemoved(plan: UpgradePlan): void {
  const removed = plan.files.filter((file) => file.category === "removed");
  if (removed.length === 0) return;
  log.message(`Removed by templates (${removed.length}):`);
  for (const entry of removed) {
    log.message(pc.dim(`  - ${entry.path}${entry.reason ? ` — ${entry.reason}` : ""}`));
  }
}

function renderPlan(plan: UpgradePlan): void {
  log.info(pc.dim(`Path: ${plan.projectDir}`));
  log.info(
    pc.dim(
      plan.hasBaseline
        ? `Manifest v${plan.manifestVersion ?? "unknown"} baseline (${plan.lifecycle.provenance.verified ? "verified lineage" : "unverified origin"}): bts.lock.json${
            plan.baselineCreatedAt ? ` (recorded ${plan.baselineCreatedAt})` : ""
          }`
        : "Baseline: none. Run `adopt` to inspect likely Stack Parts and obtain a confirmation token.",
    ),
  );
  if (plan.manifestState === "invalid") {
    log.warn(
      pc.yellow(
        `bts.lock.json is malformed and was ignored for this plan: ${plan.manifestError ?? "validation failed"}. ` +
          "Apply is blocked until the manifest is fixed. Adoption never replaces a malformed manifest.",
      ),
    );
  }
  log.message("");
  if (plan.hasBaseline && plan.manifestVersion === "2") {
    log.info(pc.dim(`Review token: ${getUpgradePlanDigest(plan)}`));
    log.message("");
  }

  reportGroup("Template drift (requires destructive acknowledgement)", "~", plan.drift);
  reportMerged(plan);
  reportGroup("New files from templates", "+", plan.newFiles);
  reportGroup("Locally edited (kept as-is)", "*", plan.userEdited);
  reportGroup("Conflicts (template + local both changed)", "!", plan.conflicts);
  reportManual(plan.manual);
  reportRemoved(plan);

  log.message("");
  log.message(
    pc.dim(
      `${plan.unchanged.length} up to date · ${plan.drift.length} drift · ${plan.merged.length} merge · ` +
        `${plan.newFiles.length} new · ${plan.userEdited.length} local · ${plan.conflicts.length} conflict · ` +
        `${plan.manual.length} manual`,
    ),
  );
}

export function toJsonPlan(plan: UpgradePlan) {
  return {
    projectDir: plan.projectDir,
    hasBaseline: plan.hasBaseline,
    manifestState: plan.manifestState,
    manifestError: plan.manifestError,
    baselineCreatedAt: plan.baselineCreatedAt,
    reviewToken:
      plan.hasBaseline && plan.manifestVersion === "2" ? getUpgradePlanDigest(plan) : undefined,
    guarantee: plan.lifecycle.provenance.verified
      ? "verified-manifest-v2-recoverable"
      : "unverified-origin-recoverable",
    summary: {
      unchanged: plan.unchanged.length,
      drift: plan.drift.length,
      merged: plan.merged.length,
      newFiles: plan.newFiles.length,
      userEdited: plan.userEdited.length,
      conflicts: plan.conflicts.length,
      manual: plan.manual.length,
      removed: plan.removed.length,
    },
    drift: plan.drift,
    merged: plan.files
      .filter((file) => file.category === "merged")
      .map(({ path: filePath, reason }) => ({ path: filePath, reason })),
    newFiles: plan.newFiles,
    userEdited: plan.userEdited,
    conflicts: plan.conflicts,
    manual: plan.manual.map(({ path: filePath, reason }) => ({ path: filePath, reason })),
    removed: plan.removed,
    actionable: plan.actionable,
    actionableHashes: plan.actionableHashes,
    actionablePreimages: plan.actionablePreimages,
    files: plan.files,
    lifecycle: plan.lifecycle,
  };
}

export { quotePosixShellArgument, quotePowerShellArgument };

export function getUpdateApplyCommandFlavor(
  platform: NodeJS.Platform = process.platform,
): "POSIX shell" | "PowerShell" {
  return platform === "win32" ? "PowerShell" : "POSIX shell";
}

export function getUpdateApplyCommand(
  plan: UpgradePlan,
  platform: NodeJS.Platform = process.platform,
  packageManager?: string,
): string | null {
  if (!plan.hasBaseline || plan.manifestVersion !== "2") return null;
  const quoteArgument = platform === "win32" ? quotePowerShellArgument : quotePosixShellArgument;
  const acknowledgement = plan.lifecycle.provenance.verified
    ? ""
    : " --acknowledge-unproven-manifest-v1";
  return (
    `${getPackageExecPrefix(packageManager)} create-better-fullstack@${getLatestCLIVersion()} update ${quoteArgument(plan.projectDir)} --apply ` +
    `--review-token ${getUpgradePlanDigest(plan)}` +
    acknowledgement
  );
}

export async function updateCommand(input: UpdateCommandInput): Promise<void> {
  const startedAt = Date.now();
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const json = input.json ?? false;
  const apply = input.apply ?? false;
  const check = input.check ?? false;
  const dryRun = input.dryRun ?? false;
  const recordBaseline = input.recordBaseline ?? false;
  const acknowledgeUnprovenManifestV1 = input.acknowledgeUnprovenManifestV1 ?? false;
  const reviewToken = input.reviewToken;
  const recover = input.recover;
  const mode = recover
    ? "recover"
    : recordBaseline
      ? "record-baseline"
      : apply
        ? "apply"
        : check
          ? "check"
          : "dry-run";

  await trackCommand("update", "started", { source: "cli-flags", mode });
  const fail = async (error: string): Promise<never> => {
    await trackCommand("update", "failed", {
      source: "cli-flags",
      mode,
      durationMs: Date.now() - startedAt,
      errorName: "UpdateError",
      issueCount: 1,
    });
    await flushTelemetry();
    return failUpdate(projectDir, error, json);
  };

  if (recover) {
    if (apply || check || dryRun || recordBaseline || reviewToken) {
      return fail(
        "`--recover` cannot be combined with planning, apply, check, baseline, or review-token flags.",
      );
    }
    try {
      const metadata = await recoverProjectTransaction(projectDir, recover);
      const lifecycle = lifecycleResult({
        operation: "recover",
        status: "recovered",
        projectDir,
        changes: { patched: metadata.files.length },
        provenance: { source: null, target: null, verified: false },
        recovery: { available: false, transactionId: metadata.id },
        nextActions: ["Run `create-better-fullstack check` to verify every generated target."],
      });
      await trackCommand("update", "succeeded", {
        source: "cli-flags",
        mode,
        changedFileCount: metadata.files.length,
        durationMs: Date.now() - startedAt,
      });
      if (json) {
        console.log(JSON.stringify({ ok: true, transaction: metadata, lifecycle }, null, 2));
        return;
      }
      renderTitle();
      intro(pc.magenta("Recover lifecycle transaction"));
      log.success(
        pc.green(`Recovered ${formatCount(metadata.files.length, "file")} from ${metadata.id}.`),
      );
      outro(pc.magenta("Recovery complete. Run `create-better-fullstack check` next."));
      return;
    } catch (error) {
      return fail(error instanceof Error ? error.message : String(error));
    }
  }

  if (dryRun && apply) {
    return fail("`--dry-run` cannot be combined with `--apply`.");
  }
  if (dryRun && recordBaseline) {
    return fail("`--dry-run` cannot be combined with `--record-baseline`.");
  }
  if (check && apply) {
    return fail("`--check` cannot be combined with `--apply`.");
  }
  if (check && recordBaseline) {
    return fail("`--check` cannot be combined with `--record-baseline`.");
  }
  if (apply && recordBaseline) {
    return fail("`--apply` cannot be combined with `--record-baseline`.");
  }
  const authorizationError = getUpdateApplyAuthorizationError(input);
  if (authorizationError) return fail(authorizationError);

  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    const message = `No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`;
    return fail(message);
  }

  if (recordBaseline) {
    return fail(
      "`--record-baseline` no longer writes a baseline directly. Run the read-only `adopt` command, review its inferred Stack Parts and uncertainty, then pass its exact confirmation token.",
    );
  }

  let plan: UpgradePlan;
  let applied: { patched: string[]; added: string[]; merged: string[] } | undefined;
  let recoveryId: string | undefined;
  if (apply) {
    const result = await applyScaffoldUpgrade(projectDir, {
      expectedPlanDigest: reviewToken,
      acknowledgeUnprovenManifestV1,
    });
    if (!result.success) return fail(result.error);
    plan = result;
    applied = result.applied;
    recoveryId = result.recoveryId;
  } else {
    const result = await planScaffoldUpgrade(projectDir);
    if (!result.success) return fail(result.error);
    plan = result;
    applied = undefined;
  }

  await trackCommand(
    "update",
    check && plan.actionable.length > 0 ? "failed" : "succeeded",
    {
      source: "cli-flags",
      mode,
      changedFileCount:
        (applied?.patched.length ?? 0) +
        (applied?.added.length ?? 0) +
        (applied?.merged.length ?? 0),
      conflictCount: plan.conflicts.length,
      manualReviewCount: plan.manual.length,
      issueCount: plan.actionable.length,
      durationMs: Date.now() - startedAt,
    },
    { ecosystem: btsConfig.ecosystem, hasBaseline: plan.hasBaseline },
  );

  if (json) {
    console.log(
      JSON.stringify(
        {
          ...toJsonPlan(plan),
          ok: true,
          mode: apply ? "apply" : check ? "check" : "dry-run",
          applied,
          recoveryId,
        },
        null,
        2,
      ),
    );
    if (check && plan.actionable.length > 0) process.exit(1);
    return;
  }

  renderTitle();
  intro(
    pc.magenta(
      apply
        ? `Updating ${pc.cyan(path.basename(projectDir))} to current templates`
        : `Update plan for ${pc.cyan(path.basename(projectDir))}`,
    ),
  );
  renderPlan(plan);
  log.message("");

  if (applied) {
    const total = applied.patched.length + applied.added.length + applied.merged.length;
    if (total === 0) {
      log.success(pc.green("Already up to date. No template-drift patches to apply."));
    } else {
      log.success(
        pc.green(
          `Applied ${formatCount(applied.patched.length, "patch")}, ${formatCount(
            applied.merged.length,
            "structured merge",
          )}, and added ${formatCount(applied.added.length, "file")}.`,
        ),
      );
    }
    const leftover = plan.conflicts.length + plan.manual.length;
    if (leftover > 0) {
      log.warn(
        pc.yellow(
          `${formatCount(leftover, "file")} still need manual review (conflicts + lockfiles/manual files).`,
        ),
      );
    }
    if (recoveryId) {
      log.info(
        pc.cyan(
          `Recovery point: ${recoveryId}. Restore it with \`${getProjectRecoveryCommand(projectDir, recoveryId, process.platform, btsConfig?.packageManager)}\`.`,
        ),
      );
    }
    outro(pc.magenta("Update complete."));
    return;
  }

  if (plan.actionable.length === 0) {
    log.success(pc.green("Up to date with the current templates."));
  } else {
    const applyCommand = getUpdateApplyCommand(
      plan,
      process.platform,
      (await readBtsConfig(projectDir))?.packageManager,
    );
    const commandFlavor = getUpdateApplyCommandFlavor();
    log.info(
      pc.cyan(
        `${
          applyCommand
            ? `After creating a recovery point, run this ${commandFlavor} command: \`${applyCommand}\``
            : "Record and review a manifest-v2 baseline before applying"
        } to patch ${formatCount(plan.drift.length, "drift file")}, ` +
          `apply ${formatCount(plan.merged.length, "structured merge")}, and add ${formatCount(
            plan.newFiles.length,
            "new file",
          )}.`,
      ),
    );
  }
  outro(pc.magenta(apply ? "Update complete." : "Dry run — no files were written."));

  if (check && plan.actionable.length > 0) {
    process.exit(1);
  }
}
