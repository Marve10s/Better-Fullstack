import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import {
  applyPartRemoval,
  planPartRemoval,
  type PartRemovalResult,
} from "../helpers/core/remove-handler";
import { CLIError } from "../utils/errors";
import { renderTitle } from "../utils/render-title";

export type RemoveCommandInput = {
  target: string;
  projectDir?: string;
  apply?: boolean;
  reviewToken?: string;
  acknowledgeArchitectureChange?: boolean;
  json?: boolean;
};

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
  for (const adjustment of result.compatibilityAdjustments) {
    log.info(pc.dim(`Adjusted: ${adjustment}`));
  }
  for (const blocker of result.manualReviewBlockers) log.warn(pc.yellow(blocker));
  for (const step of result.migrationSteps) log.warn(pc.yellow(step));

  if (input.apply) {
    outro(pc.magenta("Capability removed with transactional recovery available."));
  } else {
    log.message("");
    log.info(`Review token: ${pc.cyan(result.reviewToken)}`);
    log.info(
      pc.dim(
        `Apply with: create-better-fullstack remove ${JSON.stringify(result.removal.selectedPart)} --apply --review-token ${result.reviewToken}`,
      ),
    );
    outro(pc.magenta("Dry run — no files were written."));
  }
  return result;
}
