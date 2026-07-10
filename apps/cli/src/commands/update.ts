import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import {
  applyScaffoldUpgrade,
  planScaffoldUpgrade,
  recordUpgradeBaseline,
  type UpgradePlan,
} from "../helpers/core/scaffold-upgrade";
import { readBtsConfig } from "../utils/bts-config";
import { handleError } from "../utils/errors";
import { renderTitle } from "../utils/render-title";

export type UpdateCommandInput = {
  projectDir?: string;
  dryRun?: boolean;
  apply?: boolean;
  check?: boolean;
  json?: boolean;
  recordBaseline?: boolean;
};

function formatCount(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function failUpdate(projectDir: string, error: string, json: boolean): never {
  if (json) {
    console.log(JSON.stringify({ projectDir, ok: false, error }, null, 2));
    // Exit synchronously: trpc-cli calls process.exit(0) after the handler
    // resolves, which would otherwise mask the failure for CI gates.
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
        ? `Baseline: bts.lock.json${
            plan.baselineCreatedAt ? ` (recorded ${plan.baselineCreatedAt})` : ""
          }`
        : "Baseline: none — run `update --record-baseline` to enable safe auto-patching",
    ),
  );
  log.message("");

  reportGroup("Template drift (safe to patch)", "~", plan.drift);
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

function toJsonPlan(plan: UpgradePlan) {
  return {
    projectDir: plan.projectDir,
    hasBaseline: plan.hasBaseline,
    baselineCreatedAt: plan.baselineCreatedAt,
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
  };
}

export async function updateCommand(input: UpdateCommandInput): Promise<void> {
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const json = input.json ?? false;
  const apply = input.apply ?? false;
  const check = input.check ?? false;
  const dryRun = input.dryRun ?? false;
  const recordBaseline = input.recordBaseline ?? false;

  if (dryRun && apply) {
    return failUpdate(projectDir, "`--dry-run` cannot be combined with `--apply`.", json);
  }
  if (dryRun && recordBaseline) {
    return failUpdate(
      projectDir,
      "`--dry-run` cannot be combined with `--record-baseline`.",
      json,
    );
  }
  if (check && apply) {
    return failUpdate(projectDir, "`--check` cannot be combined with `--apply`.", json);
  }
  if (check && recordBaseline) {
    return failUpdate(
      projectDir,
      "`--check` cannot be combined with `--record-baseline`.",
      json,
    );
  }
  if (apply && recordBaseline) {
    return failUpdate(
      projectDir,
      "`--apply` cannot be combined with `--record-baseline`.",
      json,
    );
  }

  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    const message = `No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`;
    if (json) {
      console.log(JSON.stringify({ projectDir, ok: false, error: message }, null, 2));
      // Exit synchronously: trpc-cli calls process.exit(0) after the handler
      // resolves, which would otherwise mask the failure for CI gates.
      process.exit(1);
    }
    handleError(message);
  }

  if (recordBaseline) {
    const manifest = await recordUpgradeBaseline(projectDir);
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
      pc.magenta("Baseline recorded. Future `bfs update` runs can now auto-patch template drift."),
    );
    return;
  }

  let plan: UpgradePlan;
  let applied: { patched: string[]; added: string[]; merged: string[] } | undefined;
  if (apply) {
    const result = await applyScaffoldUpgrade(projectDir);
    if (!result.success) return failUpdate(projectDir, result.error, json);
    plan = result;
    applied = result.applied;
  } else {
    const result = await planScaffoldUpgrade(projectDir);
    if (!result.success) return failUpdate(projectDir, result.error, json);
    plan = result;
    applied = undefined;
  }

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
    log.info(
      pc.cyan(
        `Run \`bfs update --apply\` to patch ${formatCount(plan.drift.length, "drift file")}, ` +
          `apply ${formatCount(plan.merged.length, "structured merge")}, and add ${formatCount(
            plan.newFiles.length,
            "new file",
          )}.`,
      ),
    );
  }
  outro(pc.magenta(apply ? "Update complete." : "Dry run — no files were written."));

  // CI gate: exit non-zero when there is actionable drift to apply.
  if (check && plan.actionable.length > 0) {
    process.exit(1);
  }
}
