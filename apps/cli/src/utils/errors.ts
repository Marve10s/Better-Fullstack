import { cancel } from "@clack/prompts";
import consola from "consola";
import pc from "picocolors";

import { isSilent } from "./context";

export class UserCancelledError extends Error {
  constructor(message = "Operation cancelled") {
    super(message);
    this.name = "UserCancelledError";
  }
}

export class CLIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CLIError";
  }
}

const REPORTED = "__btsReported";

/** Whether the message was already printed, so the top level must not repeat it. */
export function isReportedError(error: unknown): boolean {
  return error instanceof Error && REPORTED in error;
}

/**
 * Fail the command by throwing rather than by killing the process. Exiting here
 * skipped the shutdown flush in `cli.ts`, so the command's own `failed` /
 * `cancelled` telemetry never left the machine.
 */
function failAfterReporting<E extends Error>(error: E): never {
  Object.defineProperty(error, REPORTED, { value: true, enumerable: false });
  throw error;
}

export function exitWithError(message: string): never {
  if (isSilent()) {
    throw new CLIError(message);
  }
  consola.error(pc.red(message));
  return failAfterReporting(new CLIError(message));
}

export function exitCancelled(message = "Operation cancelled"): never {
  if (isSilent()) {
    throw new UserCancelledError(message);
  }
  cancel(pc.red(message));
  return failAfterReporting(new UserCancelledError(message));
}

export function handleError(error: unknown, fallbackMessage?: string): never {
  const message = error instanceof Error ? error.message : fallbackMessage || String(error);
  if (isSilent()) {
    throw error instanceof Error ? error : new Error(message);
  }
  consola.error(pc.red(message));
  return failAfterReporting(error instanceof Error ? error : new Error(message));
}
