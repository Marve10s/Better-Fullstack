import type { CrystalWebFramework } from "@/types";
import { CrystalWebFrameworkSchema } from "@/types";
import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import { createStaticSinglePromptResolution } from "@/prompts/core/prompt-contract";

export function resolveCrystalWebFrameworkPrompt(value?: string) {
  const selected = value === undefined ? undefined : CrystalWebFrameworkSchema.parse(value);
  return createStaticSinglePromptResolution([{ value: "kemal" as const, label: "Kemal", hint: "Experimental native HTTP service" }, { value: "none" as const, label: "None" }], "kemal", selected);
}

export async function getCrystalWebFrameworkChoice(value?: CrystalWebFramework) {
  const resolution = resolveCrystalWebFrameworkPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "kemal";
  const response = await navigableSelect<CrystalWebFramework>({ message: "Select Crystal HTTP framework", options: resolution.options, initialValue: resolution.initialValue });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
