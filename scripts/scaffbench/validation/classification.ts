import type { StepResult } from "@/types";

const TRANSIENT_NETWORK_PATTERNS = [
  /\bEAI_AGAIN\b/i,
  /\bENOTFOUND\b/i,
  /\bETIMEDOUT\b/i,
  /\bECONNRESET\b/i,
  /TLS (?:handshake|connection).*?(?:failed|error|timeout)|handshake failure/i,
] as const;

const REGISTRY =
  /registry\.npmjs\.org|registry\.yarnpkg\.com|crates\.io|pypi\.org|files\.pythonhosted\.org|proxy\.golang\.org|nuget\.org|repo(?:1)?\.maven\.org|hex\.pm/i;
const HTTP_TRANSIENT_STATUS =
  /(?:\bHTTP(?:\/\d(?:\.\d)?)?|\bstatus(?:\s+code)?|\berror)\D{0,10}(?:429|5\d\d)\b/i;
const PACKAGE_FETCH =
  /\b(?:npm|bun|yarn|pnpm|cargo|crates?|pip|uv|poetry|pypi|golang|nuget|dotnet|maven|gradle|hex|mix)\b[^\n]{0,80}\b(?:fetch|download|registry|package|dependenc(?:y|ies)|install|request)|\b(?:fetch|download|registry|package|dependenc(?:y|ies)|install|request)\b[^\n]{0,80}\b(?:npm|bun|yarn|pnpm|cargo|crates?|pip|uv|poetry|pypi|golang|nuget|dotnet|maven|gradle|hex|mix)\b/i;
const MODEL_OWNED_NOT_FOUND =
  /\b404\b|not found in (?:the )?registry|no matching version|does not exist/i;

export function validationStepText(step: Pick<StepResult, "stdoutTail" | "stderrTail">) {
  return `${step.stdoutTail ?? ""}\n${step.stderrTail ?? ""}`;
}

/** Narrow transient set; a registry 404/nonexistent version deliberately misses. */
export function hasTransientNetworkSignature(step: Pick<StepResult, "stdoutTail" | "stderrTail">) {
  const lines = validationStepText(step).split(/\r?\n/);
  const modelOwnedLines = new Set<number>();
  const transientLines = new Set<number>();
  for (const [index, line] of lines.entries()) {
    if (MODEL_OWNED_NOT_FOUND.test(line)) modelOwnedLines.add(index);
    const fetchContext = REGISTRY.test(line) || PACKAGE_FETCH.test(line);
    if (
      TRANSIENT_NETWORK_PATTERNS.some((pattern) => pattern.test(line)) ||
      (fetchContext && (HTTP_TRANSIENT_STATUS.test(line) || /too many requests/i.test(line)))
    ) {
      transientLines.add(index);
    }
  }
  // A missing package/version remains model-owned unless a distinct diagnostic
  // line proves a separate transient failure (for example 404 followed by 503).
  return [...transientLines].some((index) => !modelOwnedLines.has(index));
}

export function isInstallClassStep(stepName: string) {
  const base = stepName.slice(stepName.lastIndexOf(":") + 1).toLowerCase();
  return /install|restore|download|deps(?:get)?|sync/.test(base);
}

export function isRecurringTransientFailure(name: string, step: StepResult) {
  return (
    step.exitCode !== 0 &&
    isInstallClassStep(name) &&
    (step.retryCount ?? 0) > 0 &&
    step.transientNetwork === true
  );
}
