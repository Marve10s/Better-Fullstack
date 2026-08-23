import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import {
  applyPrimaryRoleReplacement,
  planPrimaryRoleReplacement,
  type PrimaryRoleReplacementResult,
} from "../helpers/core/primary-role-replacement";
import { CLIError } from "../utils/errors";
import { getLatestCLIVersion } from "../utils/get-latest-cli-version";
import {
  getPackageExecPrefix,
  getProjectRecoveryCommand,
  quotePosixShellArgument,
  quotePowerShellArgument,
} from "../utils/lifecycle-command";
import { renderTitle } from "../utils/render-title";

export type ReplaceCommandInput = {
  target: string;
  replacement: string;
  projectDir?: string;
  apply?: boolean;
  reviewToken?: string;
  acknowledgeArchitectureChange?: boolean;
  json?: boolean;
};

export function getPrimaryRoleReplacementApplyCommand(
  result: Extract<PrimaryRoleReplacementResult, { success: true }>,
  platform: NodeJS.Platform = process.platform,
): string | null {
  if (!result.applyAllowed || !result.reviewToken) return null;
  const quoteArgument = platform === "win32" ? quotePowerShellArgument : quotePosixShellArgument;
  const acknowledgement = result.requiresArchitectureAck
    ? " --acknowledge-architecture-change"
    : "";
  return (
    `${getPackageExecPrefix(result.proposedConfig.packageManager)} ` +
    `create-better-fullstack@${getLatestCLIVersion()} replace ` +
    `${quoteArgument(result.primaryReplacement.target)} ` +
    `${quoteArgument(result.primaryReplacement.replacement)} ` +
    `--project-dir ${quoteArgument(result.projectDir)} --apply ` +
    `--review-token ${result.reviewToken}${acknowledgement}`
  );
}

export async function replaceCommand(
  input: ReplaceCommandInput,
): Promise<PrimaryRoleReplacementResult> {
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const result = input.apply
    ? await applyPrimaryRoleReplacement(
        projectDir,
        input.target,
        input.replacement,
        input.reviewToken,
        input.acknowledgeArchitectureChange,
      )
    : await planPrimaryRoleReplacement(projectDir, input.target, input.replacement);

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
        ? `Replacing ${pc.cyan(result.primaryReplacement.before)}`
        : `Replacement plan for ${pc.cyan(result.primaryReplacement.before)}`,
    ),
  );
  log.info(pc.dim(`Replacement: ${result.primaryReplacement.after}`));
  log.info(pc.dim(`Config: ${result.primaryReplacement.configKeys.join(", ") || "graph only"}`));
  if (result.primaryReplacement.rewiredDependentParts.length > 0) {
    log.info(
      pc.dim(`Rewired owner scope: ${result.primaryReplacement.rewiredDependentParts.join(", ")}`),
    );
  }
  log.info(
    pc.dim(
      `Files: ${result.filesToAdd.length} add, ${result.filesToPatch.length} update, ` +
        `${result.filesToRemove.length} remove, ${result.manualReviewBlockers.length} manual review`,
    ),
  );
  for (const filePath of result.filesToAdd) log.info(pc.dim(`  + ${filePath}`));
  for (const filePath of result.filesToPatch) log.info(pc.dim(`  ~ ${filePath}`));
  for (const filePath of result.filesToRemove) log.info(pc.dim(`  - ${filePath}`));
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
    outro(pc.magenta("Primary Role replaced with transactional recovery available."));
  } else {
    const applyCommand = getPrimaryRoleReplacementApplyCommand(result);
    if (!applyCommand) {
      outro(pc.yellow("Resolve manual-review blockers before applying."));
      return result;
    }
    log.message("");
    log.info(`Review token: ${pc.cyan(result.reviewToken)}`);
    log.info(pc.dim(`Apply with: ${applyCommand}`));
    outro(pc.magenta("Plan complete. No files were written."));
  }
  return result;
}
