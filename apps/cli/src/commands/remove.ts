import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import {
  applyPartRemoval,
  planPartRemoval,
  type PartRemovalResult,
} from "../helpers/core/remove-handler";
import { CLIError } from "../utils/errors";
import { getLatestCLIVersion } from "../utils/get-latest-cli-version";
import {
  getPackageExecPrefix,
  getProjectRecoveryCommand,
  quotePosixShellArgument,
  quotePowerShellArgument,
} from "../utils/lifecycle-command";
import { renderTitle } from "../utils/render-title";

export type RemoveCommandInput = {
  target: string;
  projectDir?: string;
  apply?: boolean;
  reviewToken?: string;
  acknowledgeArchitectureChange?: boolean;
  json?: boolean;
};

export function getPartRemovalApplyCommand(
  result: Extract<PartRemovalResult, { success: true }>,
  platform: NodeJS.Platform = process.platform,
): string | null {
  if (!result.applyAllowed || !result.reviewToken) return null;
  const quoteArgument = platform === "win32" ? quotePowerShellArgument : quotePosixShellArgument;
  const acknowledgement = result.requiresArchitectureAck
    ? " --acknowledge-architecture-change"
    : "";
  return (
    `${getPackageExecPrefix(result.proposedConfig.packageManager)} ` +
    `create-better-fullstack@${getLatestCLIVersion()} remove ` +
    `${quoteArgument(result.removal.target)} --project-dir ${quoteArgument(result.projectDir)} ` +
    `--apply --review-token ${result.reviewToken}${acknowledgement}`
  );
}

export async function removeCommand(input: RemoveCommandInput): Promise<PartRemovalResult> {
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const result = input.apply
    ? await applyPartRemoval(
        projectDir,
        input.target,
        input.reviewToken,
        input.acknowledgeArchitectureChange,
      )
    : await planPartRemoval(projectDir, input.target);

  if (!result.success) {
    if (input.json) console.log(JSON.stringify(result, null, 2));
    throw new CLIError(result.error);
  }
  if (input.json) {
    console.log(JSON.stringify(result, null, 2));
    return result;
  }

  renderTitle();
  intro(
    pc.magenta(
      input.apply
        ? `Removing ${pc.cyan(result.removal.selectedPart)}`
        : `Removal plan for ${pc.cyan(result.removal.selectedPart)}`,
    ),
  );
  log.info(pc.dim(`Config: ${result.removal.configKeys.join(", ")}`));
  log.info(
    pc.dim(
      `Files: ${result.filesToAdd.length} add · ${result.filesToPatch.length} update · ` +
        `${result.filesToRemove.length} remove · ${result.manualReviewBlockers.length} manual review`,
    ),
  );
  for (const filePath of result.filesToAdd) log.info(pc.dim(`  + ${filePath}`));
  for (const filePath of result.filesToPatch) log.info(pc.dim(`  ~ ${filePath}`));
  for (const filePath of result.filesToRemove) log.info(pc.dim(`  - ${filePath}`));
  for (const adjustment of result.compatibilityAdjustments) {
    log.info(pc.dim(`Adjusted: ${adjustment}`));
  }
  for (const blocker of result.manualReviewBlockers) log.warn(pc.yellow(blocker));
  for (const step of result.migrationSteps) log.warn(pc.yellow(step));

  if (input.apply) {
    if (result.recoveryId) {
      log.info(pc.dim(`Recovery point: ${result.recoveryId}`));
      log.info(
        pc.dim(
          `Restore with: ${getProjectRecoveryCommand(
            projectDir,
            result.recoveryId,
            process.platform,
            result.proposedConfig.packageManager,
          )}`,
        ),
      );
    }
    log.info(pc.dim(`Install dependencies with: ${result.installCommand}`));
    outro(pc.magenta("Capability removed with transactional recovery available."));
  } else {
    const applyCommand = getPartRemovalApplyCommand(result);
    if (!applyCommand) {
      outro(pc.yellow("Dry run — resolve manual-review blockers before applying."));
      return result;
    }
    log.message("");
    log.info(`Review token: ${pc.cyan(result.reviewToken)}`);
    log.info(pc.dim(`Apply with: ${applyCommand}`));
    outro(pc.magenta("Dry run — no files were written."));
  }
  return result;
}
