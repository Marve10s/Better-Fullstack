import { isCancel, log, select, type Option } from "@clack/prompts";

import { isSilent } from "@/presentation/context";
import { exitCancelled } from "@/presentation/errors";
import { canPromptInteractively, type PromptEnvironment } from "@/presentation/prompt-environment";

type AddonSelectParams<T extends string> = {
  addonName: string;
  message: string;
  options: Option<T>[];
  defaultValue: T;
};

export function shouldPromptForAddonSelection(environment: PromptEnvironment = {}): boolean {
  return canPromptInteractively(environment);
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
