import type { Effect } from "@/types";

import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";

export async function getEffectChoice(effect?: Effect) {
  if (effect !== undefined) return effect;

  const effectOptions = [
    {
      value: "effect" as const,
      label: "Effect Core",
      hint: "Add Effect services and layers to the selected stack",
    },
    {
      value: "effect-full" as const,
      label: "Effect Platform + SQL",
      hint: "Core plus Platform, browser/server adapters, SQL, and Vitest integration",
    },
    {
      value: "none" as const,
      label: "None",
      hint: "No additional Effect services",
    },
  ];

  const response = await navigableSelect<Effect>({
    message: "Select Effect services",
    options: effectOptions,
    initialValue: "none",
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
