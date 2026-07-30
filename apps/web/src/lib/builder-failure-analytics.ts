export type BuilderRunFailureStage =
  | "generation"
  | "browser_support"
  | "runtime_boot"
  | "project_mount"
  | "source_sync"
  | "dependency_install"
  | "server_start"
  | "server_timeout"
  | "server_exit";

export type BuilderRunFailureReason =
  | "generation_failed"
  | "browser_runtime_unsupported"
  | "runtime_boot_failed"
  | "project_mount_failed"
  | "source_sync_failed"
  | "dependency_install_failed"
  | "dependency_install_exit"
  | "server_start_failed"
  | "server_ready_timeout"
  | "server_process_exit";

export type BuilderZipFailureStage = "archive_generation" | "browser_download";

export type BuilderZipFailureReason =
  | "archive_generation_failed"
  | "browser_download_failed";

export interface BuilderRunFailure {
  stage: BuilderRunFailureStage;
  reason: BuilderRunFailureReason;
  durationMs: number;
  rerun: boolean;
}

export interface BuilderZipFailure {
  stage: BuilderZipFailureStage;
  reason: BuilderZipFailureReason;
  durationMs: number;
}

export interface BuilderZipAttemptState {
  stackSignature: string;
  attemptCount: number;
}

type BrowserRuntimeFailureCode =
  | "dependency_install_exit"
  | "server_ready_timeout"
  | "server_process_exit";

function runtimeFailureCode(error: unknown): BrowserRuntimeFailureCode | null {
  if (!error || typeof error !== "object" || !("code" in error)) return null;

  const code = (error as { code?: unknown }).code;
  if (
    code === "dependency_install_exit" ||
    code === "server_ready_timeout" ||
    code === "server_process_exit"
  ) {
    return code;
  }

  return null;
}

/**
 * Turns an internal failure into a deliberately small analytics vocabulary.
 * Error messages, stack traces, generated source, and runtime output never
 * leave this boundary.
 */
export function classifyBuilderRunFailure(
  stage: BuilderRunFailureStage,
  error?: unknown,
): Pick<BuilderRunFailure, "stage" | "reason"> {
  const runtimeCode = runtimeFailureCode(error);

  if (runtimeCode === "dependency_install_exit") {
    return { stage: "dependency_install", reason: runtimeCode };
  }
  if (runtimeCode === "server_ready_timeout") {
    return { stage: "server_timeout", reason: runtimeCode };
  }
  if (runtimeCode === "server_process_exit") {
    return { stage: "server_exit", reason: runtimeCode };
  }

  switch (stage) {
    case "generation":
      return { stage, reason: "generation_failed" };
    case "browser_support":
      return { stage, reason: "browser_runtime_unsupported" };
    case "runtime_boot":
      return { stage, reason: "runtime_boot_failed" };
    case "project_mount":
      return { stage, reason: "project_mount_failed" };
    case "source_sync":
      return { stage, reason: "source_sync_failed" };
    case "dependency_install":
      return { stage, reason: "dependency_install_failed" };
    case "server_timeout":
      return { stage, reason: "server_ready_timeout" };
    case "server_exit":
      return { stage, reason: "server_process_exit" };
    case "server_start":
      return { stage, reason: "server_start_failed" };
  }
}

export function classifyBuilderZipFailure(
  stage: BuilderZipFailureStage,
): Pick<BuilderZipFailure, "stage" | "reason"> {
  return {
    stage,
    reason: stage === "archive_generation" ? "archive_generation_failed" : "browser_download_failed",
  };
}

export function beginBuilderZipAttempt(
  state: BuilderZipAttemptState,
  stackSignature: string,
): { isRetry: boolean; nextState: BuilderZipAttemptState } {
  const attemptCount = state.stackSignature === stackSignature ? state.attemptCount : 0;
  return {
    isRetry: attemptCount > 0,
    nextState: { stackSignature, attemptCount: attemptCount + 1 },
  };
}

export function failureDurationMs(startedAt: number, endedAt = Date.now()): number {
  if (!Number.isFinite(startedAt) || !Number.isFinite(endedAt)) return 0;
  return Math.max(0, Math.round(endedAt - startedAt));
}

export function shouldReportBuilderRunFailure(
  activeRunId: number,
  failedRunId: number,
  lastReportedRunId: number,
): boolean {
  return activeRunId === failedRunId && lastReportedRunId !== failedRunId;
}
