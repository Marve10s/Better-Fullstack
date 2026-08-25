import { intro, log, outro } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import { CLIError } from "@/presentation/errors";
import {
  manageProjectRecovery,
  type RecoveryManagementAction,
  type RecoveryManagementResult,
} from "@better-fullstack/project-lifecycle/recovery";
import { renderTitle } from "@/presentation/render-title";

export type RecoveryCommandInput = {
  action: RecoveryManagementAction;
  transactionId?: string;
  projectDir?: string;
  olderThanDays?: number;
  keep?: number;
  apply?: boolean;
  json?: boolean;
};

function renderRecoveryResult(result: RecoveryManagementResult): void {
  renderTitle();
  intro(pc.magenta(`Recovery ${result.action}`));
  if (result.points) {
    if (result.points.length === 0) log.info(pc.dim("No recovery points found."));
    for (const point of result.points) {
      const state = point.valid
        ? point.recoverable
          ? pc.green("recoverable")
          : pc.yellow(point.status ?? "not recoverable")
        : pc.red("invalid");
      log.message(`${point.id} · ${point.operation ?? "unknown"} · ${state}`);
      for (const error of point.errors) log.warn(pc.yellow(error));
    }
  }
  if (result.verification) {
    const point = result.verification;
    log.message(`Transaction: ${point.id}`);
    log.message(`Integrity: ${point.valid ? pc.green("valid") : pc.red("invalid")}`);
    log.message(
      `Restore safety: ${point.recoverable ? pc.green("recoverable") : pc.yellow("not recoverable")}`,
    );
    if (point.metadata) {
      log.message(
        `Operation: ${point.metadata.operation} · status: ${point.metadata.status} · files: ${point.metadata.files.length}`,
      );
    }
    for (const error of point.errors) log.warn(pc.yellow(error));
  }
  if (result.prune) {
    const prune = result.prune;
    log.message(
      `${prune.applied ? "Pruned" : "Would prune"}: ${
        prune.applied ? prune.pruned.length : prune.candidates.length
      } recovery points`,
    );
    for (const id of prune.applied ? prune.pruned : prune.candidates) log.info(pc.dim(id));
    if (!prune.applied && prune.candidates.length > 0) {
      log.info(pc.dim("Review the candidates, then repeat with --apply."));
    }
    if (prune.invalid.length > 0) {
      log.warn(pc.yellow(`${prune.invalid.length} invalid entries were retained.`));
    }
  }
  if (result.transaction) {
    log.success(pc.green(`Recovered ${result.transaction.files.length} bound file states.`));
  }
  outro(pc.magenta("Recovery operation complete."));
}

export async function recoveryCommand(
  input: RecoveryCommandInput,
): Promise<RecoveryManagementResult> {
  const result = await manageProjectRecovery({
    action: input.action,
    transactionId: input.transactionId,
    projectDir: path.resolve(input.projectDir || process.cwd()),
    olderThanDays: input.olderThanDays,
    keep: input.keep,
    applyPrune: input.apply,
  });
  if (input.json) {
    console.log(JSON.stringify(result, null, 2));
  }
  if (!result.success) throw new CLIError(result.error ?? "Recovery operation failed.");
  if (!input.json) renderRecoveryResult(result);
  return result;
}
