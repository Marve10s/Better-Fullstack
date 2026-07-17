import type { StepResult } from "@/types";

const TRANSIENT_NETWORK_PATTERNS = [
  /\bEAI_AGAIN\b/i,
  /\bENOTFOUND\b/i,
  /\bETIMEDOUT\b/i,
  /\bECONNRESET\b/i,
  /(?:\bHTTP(?:\/\d(?:\.\d)?)?\s*)?\b429\b|too many requests/i,
  /TLS (?:handshake|connection).*?(?:failed|error|timeout)|handshake failure/i,
] as const;

const REGISTRY =
  /registry\.npmjs\.org|registry\.yarnpkg\.com|crates\.io|pypi\.org|files\.pythonhosted\.org|proxy\.golang\.org|nuget\.org|repo(?:1)?\.maven\.org|hex\.pm/i;
const HTTP_5XX = /(?:HTTP(?:\/\d(?:\.\d)?)?\s*)?\b5\d\d\b/;

export function validationStepText(step: Pick<StepResult, "stdoutTail" | "stderrTail">) {
  return `${step.stdoutTail ?? ""}\n${step.stderrTail ?? ""}`;
}

/** Narrow transient set; a registry 404/nonexistent version deliberately misses. */
export function hasTransientNetworkSignature(step: Pick<StepResult, "stdoutTail" | "stderrTail">) {
  const text = validationStepText(step);
  if (/\b404\b|not found in (?:the )?registry|no matching version|does not exist/i.test(text)) {
    return false;
  }
  return (
    TRANSIENT_NETWORK_PATTERNS.some((pattern) => pattern.test(text)) ||
    (REGISTRY.test(text) && HTTP_5XX.test(text))
  );
}

export function isInstallClassStep(stepName: string) {
  const base = stepName.slice(stepName.lastIndexOf(":") + 1).toLowerCase();
  return /install|restore|download|deps(?:get)?|sync/.test(base);
}

export function isRecurringTransientFailure(name: string, step: StepResult) {
  return (
    step.exitCode !== 0 &&
    isInstallClassStep(name) &&
    (step.transientNetwork === true || hasTransientNetworkSignature(step))
  );
}
