import { isCancel, log, select, type Option } from "@clack/prompts";

import { isSilent } from "../../utils/context";
import { exitCancelled } from "../../utils/errors";

type AddonSelectParams<T extends string> = {
  addonName: string;
  message: string;
  options: Option<T>[];
  defaultValue: T;
};

type PromptEnvironment = {
  silent?: boolean;
  stdinIsTTY?: boolean;
  stdoutIsTTY?: boolean;
  ci?: string | undefined;
};

function resolveCiValue(environment?: PromptEnvironment): string | undefined {
  if (environment && Object.prototype.hasOwnProperty.call(environment, "ci")) {
    return environment.ci;
  }

  return process.env.CI;
}

function isCiEnvironment(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  const normalizedValue = value.trim().toLowerCase();
  return normalizedValue !== "" && normalizedValue !== "0" && normalizedValue !== "false";
}

export function shouldPromptForAddonSelection(environment: PromptEnvironment = {}): boolean {
  const silent = environment.silent ?? isSilent();
  const stdinIsTTY = environment.stdinIsTTY ?? (process.stdin.isTTY === true);
  const stdoutIsTTY = environment.stdoutIsTTY ?? (process.stdout.isTTY === true);
  const ci = resolveCiValue(environment);

  return !silent && stdinIsTTY && stdoutIsTTY && !isCiEnvironment(ci);
}

export async function selectAddonOptionOrDefault<T extends string>({
  addonName,
  message,
  options,
  defaultValue,
}: AddonSelectParams<T>): Promise<T> {
  if (!shouldPromptForAddonSelection()) {
    const fallback = options.find((option) => option.value === defaultValue);
    if (!isSilent() && fallback) {
      log.info(`Using default ${addonName} template: ${fallback.label}`);
    }
    return defaultValue;
  }

  const selection = await select<T>({
    message,
    options,
    initialValue: defaultValue,
  });

  if (isCancel(selection)) {
    return exitCancelled("Operation cancelled");
  }

  return selection;
}
