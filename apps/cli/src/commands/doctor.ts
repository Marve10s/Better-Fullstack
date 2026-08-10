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
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const json = input.json ?? false;

  if (!json) {
    renderTitle();
    intro(pc.magenta(`Diagnosing ${pc.cyan(path.basename(projectDir))}`));
    log.info(pc.dim(`Path: ${projectDir}`));
  }

  // JSON changes presentation only. It executes the exact same target checks
  // with output captured, so machine-readable mode cannot report false green.
  const result = await inspectProject(projectDir, {
    runChecks: !input.skipChecks,
    generatedChecks: { output: json ? "ignore" : "inherit" },
  });

  if (!result.success) {
    if (json) {
      console.log(JSON.stringify(result, null, 2));
      process.exit(1);
    }
    handleError(`${result.error} Project path: ${projectDir}`);
  }

  if (!json) {
    log.info(pc.dim(`Ecosystem: ${result.ecosystem}`));
    if (result.graphSummary) log.info(pc.dim(`Stack: ${result.graphSummary}`));
    log.message("");
  }

  await trackCommand(
    input.commandName ?? "check",
    result.ok ? "succeeded" : "failed",
    {
      source: "cli-flags",
      mode: input.skipChecks ? "config-only" : "full",
      issueCount: result.summary.fail,
      warningCount: result.summary.warn,
    },
    { ecosystem: result.ecosystem },
  );

  if (json) console.log(JSON.stringify(result, null, 2));
  else renderResult(result);

  // trpc-cli exits zero after resolved handlers, so a failed gate must exit
  // synchronously. Pure callers (including MCP) use inspectProject directly.
  if (!result.ok) process.exit(1);
}
