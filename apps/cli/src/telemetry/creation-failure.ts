import type { TELEMETRY_FAILURE_STAGES } from "@better-fullstack/types/telemetry";

import { CLIError } from "@/presentation/errors";

export type CreationStage = (typeof TELEMETRY_FAILURE_STAGES)[number];

export class ProjectCreationError extends CLIError {
  constructor(
    message: string,
    readonly failureStage: CreationStage,
    cause?: unknown,
    readonly failureReason?: "target-not-empty",
  ) {
    super(message);
    this.cause = cause;
  }
}

// Match structured codes only. Error messages may contain paths and secrets.
const systemReasons = new Map([
  ["EACCES", "permission"],
  ["EPERM", "permission"],
  ["ENOSPC", "disk-space"],
  ["ENAMETOOLONG", "path-too-long"],
  ["ENOMEM", "out-of-memory"],
  ["ETIMEDOUT", "timeout"],
  ["ECONNREFUSED", "network"],
  ["ECONNRESET", "network"],
  ["ENOTFOUND", "network"],
  ["EAI_AGAIN", "network"],
]);

export function projectCreationFailure(error: unknown, fallbackStage: CreationStage) {
  const failureStage = error instanceof ProjectCreationError ? error.failureStage : fallbackStage;
  const explicitReason = error instanceof ProjectCreationError ? error.failureReason : undefined;
  let original = error;
  // Bound cause traversal, including cyclic or hostile error objects.
  for (let depth = 0; depth < 5; depth++) {
    if (!(original instanceof Error) || !(original.cause instanceof Error)) break;
    original = original.cause;
  }
  const code = original instanceof Error && "code" in original ? original.code : undefined;
  const reason = typeof code === "string" ? systemReasons.get(code) : undefined;
  let failureReason = explicitReason ?? reason;
  if (!failureReason) {
    if (original instanceof TypeError) failureReason = "type-error";
    else if (original instanceof ReferenceError) failureReason = "reference-error";
    else if (failureStage === "generation") failureReason = "generation_failed";
    else if (failureStage === "verification") failureReason = "verification_failed";
    else failureReason = "unknown";
  }
  return {
    failureStage,
    failureReason,
    errorName: original instanceof Error ? original.name : "UnknownError",
  };
}
