import { intro, log } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import { trackCommand } from "../utils/analytics";
import { handleError } from "../utils/errors";
import {
  inspectProject,
  type ProjectCheckStatus,
  type ProjectStatusResult,
} from "../utils/project-status";
import { renderTitle } from "../utils/render-title";

export type DoctorCommandInput = {
  projectDir?: string;
  skipChecks?: boolean;
  runChecks?: boolean;
  json?: boolean;
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

export async function doctorCommand(input: DoctorCommandInput): Promise<void> {
  const startedAt = Date.now();
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const json = input.json ?? false;
  const commandName = input.commandName ?? "check";

  if (!json) {
    renderTitle();
    intro(pc.magenta(`Diagnosing ${pc.cyan(path.basename(projectDir))}`));
    log.info(pc.dim(`Path: ${projectDir}`));
  }

  const runChecks = json ? input.runChecks === true && !input.skipChecks : !input.skipChecks;
  await trackCommand(commandName, "started", {
    source: "cli-flags",
    mode: runChecks ? "full" : "config-only",
  });
  const result = await inspectProject(projectDir, {
    runChecks,
    generatedChecks: { output: json ? "ignore" : "inherit" },
  });

  if (!result.success) {
    await trackCommand(commandName, "failed", {
      source: "cli-flags",
      mode: runChecks ? "full" : "config-only",
      durationMs: Date.now() - startedAt,
      errorName: "ProjectStatusError",
      issueCount: 1,
    });
    if (json) {
      console.log(JSON.stringify(result, null, 2));
      process.exit(1);
    }
    handleError(`${result.error} Project path: ${projectDir}`);
  }

  if (json && !runChecks && !input.skipChecks) {
    result.checks.push({
      label: "generated verification",
      status: "warn",
      detail: "Ecosystem checks are skipped in --json mode. Pass --run-checks to execute them.",
    });
    result.summary.warn += 1;
  }

  if (!json) {
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

  if (json) console.log(JSON.stringify(result, null, 2));
  else renderResult(result);

  if (!result.ok) process.exit(1);
}
