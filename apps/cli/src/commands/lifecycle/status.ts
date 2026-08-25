import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import { CLIError } from "@/presentation/errors";
import { getProjectReport, type ProjectReportResult } from "@/project/project-report";
import { renderTitle } from "@/presentation/render-title";

export type StatusCommandInput = {
  projectDir?: string;
  json?: boolean;
};

export async function statusCommand(input: StatusCommandInput): Promise<ProjectReportResult> {
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const result = await getProjectReport(projectDir);
  if (!result.success) {
    if (input.json) console.log(JSON.stringify(result, null, 2));
    throw new CLIError(result.error);
  }

  if (input.json) {
    console.log(JSON.stringify(result, null, 2));
    return result;
  }

  renderTitle();
  intro(pc.magenta(`Project status for ${pc.cyan(path.basename(projectDir))}`));
  log.info(pc.dim(`Ecosystem: ${result.ecosystem}`));
  if (result.graphSummary) log.info(pc.dim(`Stack: ${result.graphSummary}`));
  log.message(
    `Health: ${result.ok ? pc.green("ready") : pc.red("needs attention")} · ` +
      `${result.summary.fail} failed · ${result.summary.warn} warnings`,
  );
  log.message(
    `Lifecycle: ${result.prerequisites.wave1.generatorProvenance} provenance · ` +
      `${result.prerequisites.wave1.recovery} recovery`,
  );
  const supportWindow =
    result.updateSupport.supportedFrom && result.updateSupport.supportedTo
      ? `${result.updateSupport.supportedFrom} to ${result.updateSupport.supportedTo}`
      : "not yet qualified";
  log.message(`Update support: ${result.updateSupport.eligibility} · window ${supportWindow}`);
  if (result.updateSupport.requiresManualReview) {
    log.warn(pc.yellow(result.updateSupport.reason));
  }

  if (result.upgrade.available) {
    const summary = result.upgrade.summary;
    const actionable =
      summary.drift + summary.merged + summary.newFiles + summary.conflicts + summary.manualReview;
    const reviewItems = actionable + summary.removedByTemplate;
    log.message(
      `Upgrade: ${reviewItems === 0 ? pc.green("current") : pc.yellow(`${reviewItems} actionable`)} · ` +
        `${summary.localEdits} local edits preserved`,
    );
    for (const blocker of result.upgrade.blockers) log.warn(pc.yellow(blocker));
  } else {
    log.warn(pc.yellow(`Upgrade report unavailable: ${result.upgrade.error}`));
  }

  outro(pc.magenta("Use `check` for executable target verification and `update` for full review."));
  return result;
}
