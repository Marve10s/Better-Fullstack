import { intro, log } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import { flushTelemetry, trackCommand } from "../utils/analytics";
import {
  applyConfigDriftRepair,
  planConfigDriftRepair,
  type ConfigDriftRepairResult,
} from "../utils/config-drift-repair";
import { handleError } from "../utils/errors";
import { getLatestCLIVersion } from "../utils/get-latest-cli-version";
import {
  getPackageExecPrefix,
  quotePosixShellArgument,
  quotePowerShellArgument,
} from "../utils/lifecycle-command";
import {
  inspectProject,
  type ProjectCheckStatus,
  type ProjectStatusResult,
} from "../utils/project-status";
import { renderTitle } from "../utils/render-title";
import { buildSupportBundle } from "../utils/support-bundle";

export type DoctorCommandInput = {
  projectDir?: string;
  skipChecks?: boolean;
  runChecks?: boolean;
  json?: boolean;
  supportBundle?: boolean;
  fix?: boolean;
  apply?: boolean;
  reviewToken?: string;
  commandName?: "check" | "doctor";
};

function statusIcon(status: ProjectCheckStatus): string {
  switch (status) {
    case "pass":
      return pc.green("✓");
    case "warn":
      return pc.yellow("!");
    case "fail":
      return pc.red("✗");
  }
}

function renderResult(result: ProjectStatusResult): void {
  for (const check of result.checks) {
    log.message(
      `${statusIcon(check.status)} ${check.label}${
        check.detail ? pc.dim(` — ${check.detail}`) : ""
      }`,
    );
  }
  log.message("");
  const summaryLine = `${pc.green(`${result.summary.pass} passed`)}, ${pc.yellow(
    `${result.summary.warn} warnings`,
  )}, ${pc.red(`${result.summary.fail} failed`)}`;
  if (!result.ok) {
    log.error(`Diagnosis complete: ${summaryLine}`);
  } else if (result.summary.warn > 0) {
    log.warn(`Diagnosis complete: ${summaryLine}`);
  } else {
    log.success(`Diagnosis complete: ${summaryLine}`);
  }
}

function renderFixResult(result: Extract<ConfigDriftRepairResult, { success: true }>): void {
  log.message("");
  if (!result.changed) {
    log.success("Graph and config projections are already canonical.");
    return;
  }
  log.info(result.mode === "applied" ? "Config drift repaired:" : "Config drift repair plan:");
  for (const change of result.changes) {
    const marker = change.action === "add" ? "+" : change.action === "remove" ? "-" : "~";
    log.message(`${marker} ${change.path}: ${change.reason}`);
  }
  if (result.mode === "applied") {
    if (result.recoveryId) log.info(pc.dim(`Recovery point: ${result.recoveryId}`));
    return;
  }
  if (result.reviewToken) {
    log.info(`Review token: ${pc.cyan(result.reviewToken)}`);
    log.info(pc.dim(`Apply with: ${getDoctorFixApplyCommand(result)}`));
  }
  log.info(pc.dim("No files were written."));
}

export function getDoctorFixApplyCommand(
  result: Extract<ConfigDriftRepairResult, { success: true }>,
  platform: NodeJS.Platform = process.platform,
): string | null {
  if (!result.changed || !result.reviewToken) return null;
  const quoteArgument = platform === "win32" ? quotePowerShellArgument : quotePosixShellArgument;
  return (
    `${getPackageExecPrefix(undefined)} create-better-fullstack@${getLatestCLIVersion()} doctor ` +
    `${quoteArgument(result.projectDir)} --fix --apply --review-token ${result.reviewToken}`
  );
}

export async function doctorCommand(input: DoctorCommandInput): Promise<void> {
  const startedAt = Date.now();
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const json = input.json ?? false;
  const supportBundle = input.supportBundle ?? false;
  const structuredOutput = json || supportBundle;
  const commandName = input.commandName ?? "check";
  const fix = input.fix ?? false;

  if (commandName !== "doctor" && (fix || input.apply || input.reviewToken)) {
    handleError("Config repair flags are available only through `doctor`.");
  }
  if (input.apply && !fix) {
    handleError("`--apply` requires `--fix`.");
  }
  if (supportBundle && fix) {
    handleError("`--support-bundle` cannot be combined with `--fix`.");
  }

  let fixResult: ConfigDriftRepairResult | undefined;
  if (fix) {
    fixResult = input.apply
      ? await applyConfigDriftRepair(projectDir, input.reviewToken)
      : await planConfigDriftRepair(projectDir);
    if (!fixResult.success) {
      await trackCommand(commandName, "failed", {
        source: "cli-flags",
        mode: input.apply ? "fix-apply" : "fix-plan",
        durationMs: Date.now() - startedAt,
        errorName: "ConfigDriftRepairError",
        issueCount: 1,
      });
      await flushTelemetry();
      if (structuredOutput) {
        console.log(JSON.stringify({ success: false, fix: fixResult }, null, 2));
        process.exit(1);
      }
      handleError(fixResult.error);
    }
  }

  if (!structuredOutput) {
    renderTitle();
    intro(pc.magenta(`Diagnosing ${pc.cyan(path.basename(projectDir))}`));
    log.info(pc.dim(`Path: ${projectDir}`));
  }

  const runChecks = structuredOutput
    ? input.runChecks === true && !input.skipChecks
    : !input.skipChecks;
  await trackCommand(commandName, "started", {
    source: "cli-flags",
    mode: runChecks ? "full" : "config-only",
  });
  const result = await inspectProject(projectDir, {
    runChecks,
    generatedChecks: { output: structuredOutput ? "ignore" : "inherit" },
  });

  if (!result.success) {
    await trackCommand(commandName, "failed", {
      source: "cli-flags",
      mode: runChecks ? "full" : "config-only",
      durationMs: Date.now() - startedAt,
      errorName: "ProjectStatusError",
      issueCount: 1,
    });
    await flushTelemetry();
    if (structuredOutput) {
      const output = supportBundle ? await buildSupportBundle(projectDir, result) : result;
      console.log(JSON.stringify(output, null, 2));
      process.exit(1);
    }
    handleError(`${result.error} Project path: ${projectDir}`);
  }

  if (structuredOutput && !runChecks && !input.skipChecks) {
    result.checks.push({
      label: "generated verification",
      status: "warn",
      detail: "Ecosystem checks are skipped in --json mode. Pass --run-checks to execute them.",
    });
    result.summary.warn += 1;
  }

  if (!structuredOutput) {
    log.info(pc.dim(`Ecosystem: ${result.ecosystem}`));
    if (result.graphSummary) log.info(pc.dim(`Stack: ${result.graphSummary}`));
    log.message("");
  }

  await trackCommand(
    commandName,
    result.ok ? "succeeded" : "failed",
    {
      source: "cli-flags",
      mode: runChecks ? "full" : "config-only",
      issueCount: result.summary.fail,
      warningCount: result.summary.warn,
      durationMs: Date.now() - startedAt,
    },
    { ecosystem: result.ecosystem },
  );

  if (supportBundle) {
    console.log(JSON.stringify(await buildSupportBundle(projectDir, result), null, 2));
  } else if (json) {
    console.log(JSON.stringify(fixResult ? { ...result, fix: fixResult } : result, null, 2));
  } else {
    renderResult(result);
    if (fixResult?.success) renderFixResult(fixResult);
  }

  if (!result.ok) {
    await flushTelemetry();
    process.exit(1);
  }
}
