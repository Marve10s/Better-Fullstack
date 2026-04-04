import { log } from "@clack/prompts";
import pc from "picocolors";

type RetryOptions = {
  description: string;
  run: () => Promise<void>;
  maxAttempts?: number;
  initialDelayMs?: number;
  sleep?: (ms: number) => Promise<void>;
};

const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_INITIAL_DELAY_MS = 750;
const RETRY_BACKOFF_MULTIPLIER = 2;

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatDelay(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(ms % 1000 === 0 ? 0 : 1)}s` : `${ms}ms`;
}

export async function runInstallWithRetries({
  description,
  run,
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
  initialDelayMs = DEFAULT_INITIAL_DELAY_MS,
  sleep = defaultSleep,
}: RetryOptions): Promise<boolean> {
  let delayMs = initialDelayMs;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await run();
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (attempt === maxAttempts) {
        log.warn(pc.yellow(`Warning: Could not ${description} after ${maxAttempts} attempts: ${message}`));
        return false;
      }

      log.warn(
        pc.yellow(
          `Warning: Failed to ${description} (attempt ${attempt}/${maxAttempts}): ${message}. Retrying in ${formatDelay(delayMs)}...`,
        ),
      );
      await sleep(delayMs);
      delayMs *= RETRY_BACKOFF_MULTIPLIER;
    }
  }

  return false;
}
