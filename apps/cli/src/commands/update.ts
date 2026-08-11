import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import {
  applyScaffoldUpgrade,
  getUpgradePlanDigest,
  planScaffoldUpgrade,
  recordUpgradeBaseline,
  type UpgradePlan,
} from "../helpers/core/scaffold-upgrade";
import { trackCommand } from "../utils/analytics";
import { readBtsConfig } from "../utils/bts-config";
import { handleError } from "../utils/errors";
import { getLatestCLIVersion } from "../utils/get-latest-cli-version";
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
};

export function getUpdateApplyAuthorizationError(input: UpdateCommandInput): string | null {
  if (!input.apply) return null;
  if (!input.reviewToken) {
    return "`--review-token` is required with `--apply`. Review the categorized paths and plan, then pass its exact token.";
  }
  if (input.acknowledgeUnprovenManifestV1 !== true) {
    return "`--acknowledge-unproven-manifest-v1` is required with `--apply`: manifest v1 lineage is unproven, apply is destructive, and no backup/recovery exists.";
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
        ? `Manifest v1 baseline (release lineage unproven): bts.lock.json${
            plan.baselineCreatedAt ? ` (recorded ${plan.baselineCreatedAt})` : ""
          }`
        : "Baseline: none — `update --record-baseline` manually adopts current bytes but does not prove generator lineage",
    ),
  );
  if (plan.manifestState === "invalid") {
    log.warn(
      pc.yellow(
        `bts.lock.json is malformed and was ignored for this plan: ${plan.manifestError ?? "validation failed"}. ` +
          "Apply is blocked until the manifest is fixed or re-recorded with `update --record-baseline`.",
      ),
    );
  }
  log.message("");
  if (plan.hasBaseline && plan.manifestVersion === "1") {
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
      plan.hasBaseline && plan.manifestVersion === "1" ? getUpgradePlanDigest(plan) : undefined,
    guarantee: "unproven-manifest-v1-plan-only",
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
  };
}

export function quotePosixShellArgument(value: string): string {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

export function quotePowerShellArgument(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

export function getUpdateApplyCommandFlavor(
  platform: NodeJS.Platform = process.platform,
): "POSIX shell" | "PowerShell" {
  return platform === "win32" ? "PowerShell" : "POSIX shell";
}

function packageExecPrefix(packageManager: string | undefined): string {
  if (packageManager === "bun") return "bunx";
  if (packageManager === "pnpm") return "pnpm dlx";
  if (packageManager === "yarn") return "yarn dlx";
  return "npx --yes";
}

export function getUpdateApplyCommand(
  plan: UpgradePlan,
  platform: NodeJS.Platform = process.platform,
  packageManager?: string,
): string | null {
  if (!plan.hasBaseline || plan.manifestVersion !== "1") return null;
  const quoteArgument = platform === "win32" ? quotePowerShellArgument : quotePosixShellArgument;
  return (
    `${packageExecPrefix(packageManager)} create-better-fullstack@${getLatestCLIVersion()} update ${quoteArgument(plan.projectDir)} --apply ` +
    `--review-token ${getUpgradePlanDigest(plan)} ` +
    "--acknowledge-unproven-manifest-v1"
  );
}

export async function updateCommand(input: UpdateCommandInput): Promise<void> {
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const json = input.json ?? false;
  const apply = input.apply ?? false;
  const check = input.check ?? false;
  const dryRun = input.dryRun ?? false;
  const recordBaseline = input.recordBaseline ?? false;
  const acknowledgeUnprovenManifestV1 = input.acknowledgeUnprovenManifestV1 ?? false;
  const reviewToken = input.reviewToken;

  if (dryRun && apply) {
    return failUpdate(projectDir, "`--dry-run` cannot be combined with `--apply`.", json);
  }
  if (dryRun && recordBaseline) {
    return failUpdate(projectDir, "`--dry-run` cannot be combined with `--record-baseline`.", json);
  }
  if (check && apply) {
    return failUpdate(projectDir, "`--check` cannot be combined with `--apply`.", json);
  }
  if (check && recordBaseline) {
    return failUpdate(projectDir, "`--check` cannot be combined with `--record-baseline`.", json);
  }
  if (apply && recordBaseline) {
    return failUpdate(projectDir, "`--apply` cannot be combined with `--record-baseline`.", json);
  }
  const authorizationError = getUpdateApplyAuthorizationError(input);
  if (authorizationError) return failUpdate(projectDir, authorizationError, json);

  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    const message = `No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`;
    if (json) {
      console.log(JSON.stringify({ projectDir, ok: false, error: message }, null, 2));
      process.exit(1);
    }
    handleError(message);
  }

  if (recordBaseline) {
    const manifest = await recordUpgradeBaseline(projectDir);
    await trackCommand(
      "update",
      manifest ? "succeeded" : "failed",
      {
        source: "cli-flags",
        mode: "record-baseline",
        fileCount: manifest ? Object.keys(manifest.hashes).length : 0,
      },
      { ecosystem: btsConfig.ecosystem },
    );
    if (json) {
      console.log(
        JSON.stringify(
          {
            projectDir,
            ok: manifest !== null,
            recordedBaseline: manifest !== null,
            files: manifest ? Object.keys(manifest.hashes).length : 0,
          },
          null,
          2,
        ),
      );
      if (!manifest) process.exit(1);
      return;
    }
    renderTitle();
    intro(pc.magenta("Record scaffold baseline"));
    if (!manifest) {
      handleError(`Failed to record a baseline for ${projectDir}.`);
    }
    log.success(
      pc.green(
        `Recorded bts.lock.json with ${formatCount(Object.keys(manifest.hashes).length, "file")}.`,
      ),
    );
    outro(
      pc.magenta(
        "Manual-adoption baseline recorded. It does not prove generator lineage; destructive apply still requires exact review and has no built-in recovery.",
      ),
    );
    return;
  }

  let plan: UpgradePlan;
  let applied: { patched: string[]; added: string[]; merged: string[] } | undefined;
  if (apply) {
    const result = await applyScaffoldUpgrade(projectDir, {
      expectedPlanDigest: reviewToken,
      acknowledgeUnprovenManifestV1,
    });
    if (!result.success) return failUpdate(projectDir, result.error, json);
    plan = result;
    applied = result.applied;
  } else {
    const result = await planScaffoldUpgrade(projectDir);
    if (!result.success) return failUpdate(projectDir, result.error, json);
    plan = result;
    applied = undefined;
  }

  await trackCommand(
    "update",
    check && plan.actionable.length > 0 ? "failed" : "succeeded",
    {
      source: "cli-flags",
      mode: apply ? "apply" : check ? "check" : "dry-run",
      changedFileCount:
        (applied?.patched.length ?? 0) +
        (applied?.added.length ?? 0) +
        (applied?.merged.length ?? 0),
      conflictCount: plan.conflicts.length,
      manualReviewCount: plan.manual.length,
      issueCount: plan.actionable.length,
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
            : "Record and review a manifest-v1 baseline before applying"
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
