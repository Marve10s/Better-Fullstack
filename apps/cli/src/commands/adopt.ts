import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import { flushTelemetry, trackCommand } from "../utils/analytics";
import { readBtsConfig } from "../utils/bts-config";
import { handleError } from "../utils/errors";
import { getLatestCLIVersion } from "../utils/get-latest-cli-version";
import {
  getPackageExecPrefix,
  quotePosixShellArgument,
  quotePowerShellArgument,
} from "../utils/lifecycle-command";
import {
  confirmProjectAdoption,
  type ConfirmedProjectAdoption,
  planProjectAdoption,
  type ProjectAdoptionFailure,
  type ProjectAdoptionPlan,
} from "../utils/project-adoption";
import { renderTitle } from "../utils/render-title";

export type AdoptCommandInput = {
  projectDir?: string;
  confirmToken?: string;
  json?: boolean;
};

function failAdoption(result: ProjectAdoptionFailure, json: boolean): never {
  if (json) {
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }
  handleError(result.error);
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

async function confirmationCommand(plan: ProjectAdoptionPlan): Promise<string> {
  const packageManager = (await readBtsConfig(plan.projectDir))?.packageManager;
  const quoteArgument =
    process.platform === "win32" ? quotePowerShellArgument : quotePosixShellArgument;
  return (
    `${getPackageExecPrefix(packageManager)} create-better-fullstack@${getLatestCLIVersion()} adopt ` +
    `${quoteArgument(plan.projectDir)} --confirm-token ${plan.confirmationToken}`
  );
}

function renderAdoptionPlan(plan: ProjectAdoptionPlan | ConfirmedProjectAdoption): void {
  log.info(pc.dim(`Path: ${plan.projectDir}`));
  log.info(
    pc.dim(
      `Current-template evidence: ${plan.templateEvidence.exactMatches}/${plan.templateEvidence.expectedFiles} exact (${formatPercent(plan.templateEvidence.exactMatchRatio)}), ` +
        `${plan.templateEvidence.divergentFiles} divergent, ${plan.templateEvidence.missingFiles} missing, ${plan.templateEvidence.extraFiles} extra.`,
    ),
  );
  log.message("");
  log.message(`Likely Stack Parts (${plan.likelyStackParts.length}):`);
  for (const part of plan.likelyStackParts) {
    log.message(pc.dim(`  ? ${part.spec} [${part.confidence}; ${part.basis}]`));
  }
  log.message("");
  log.warn(pc.yellow("Uncertainty:"));
  for (const uncertainty of plan.uncertainty) log.message(pc.dim(`  ! ${uncertainty}`));
}

export async function adoptCommand(input: AdoptCommandInput): Promise<void> {
  const startedAt = Date.now();
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const json = input.json ?? false;
  const mode = input.confirmToken ? "confirm" : "plan";
  await trackCommand("adopt", "started", { source: "cli-flags", mode });

  const result = input.confirmToken
    ? await confirmProjectAdoption(projectDir, input.confirmToken)
    : await planProjectAdoption(projectDir);
  await trackCommand(
    "adopt",
    result.success ? "succeeded" : "failed",
    {
      source: "cli-flags",
      mode,
      durationMs: Date.now() - startedAt,
      fileCount: result.success && result.mode === "adopted" ? result.manifest.fileCount : 0,
      capabilityCount: result.success ? result.likelyStackParts.length : 0,
      issueCount: result.success ? result.uncertainty.length : 1,
      errorName: result.success ? undefined : "AdoptionError",
    },
    result.success ? { ecosystem: result.likelyStackParts[0]?.ecosystem } : {},
  );
  await flushTelemetry();

  if (!result.success) return failAdoption(result, json);
  if (json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  renderTitle();
  intro(
    pc.magenta(
      result.mode === "adopted"
        ? `Adopt ${pc.cyan(path.basename(projectDir))}`
        : `Adoption plan for ${pc.cyan(path.basename(projectDir))}`,
    ),
  );
  renderAdoptionPlan(result);
  log.message("");
  if (result.mode === "adopted") {
    log.success(
      pc.green(
        `Created bts.lock.json for ${result.manifest.fileCount} files with unverified lineage.`,
      ),
    );
    outro(
      pc.magenta(
        "Adoption complete. Future update apply still requires explicit acknowledgement of unverified origin.",
      ),
    );
    return;
  }

  log.info(pc.dim("No files were written."));
  log.message("Confirm this exact project state with:");
  log.message(pc.cyan(await confirmationCommand(result)));
  outro(pc.magenta("Review the detected Stack Parts and uncertainty before confirmation."));
}
