import type { Validation } from "../types";

import { exitCancelled } from "../utils/errors";
import {
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const VALIDATION_PROMPT_OPTIONS: PromptOption<Validation>[] = [
  {
    value: "zod",
    label: "Zod",
    hint: "TypeScript-first schema validation (recommended)",
  },
  {
    value: "valibot",
    label: "Valibot",
    hint: "Smaller bundle alternative to Zod (~1KB)",
  },
  {
    value: "arktype",
    label: "ArkType",
    hint: "TypeScript-first validation, 2-4x faster than Zod",
  },
  {
    value: "typebox",
    label: "TypeBox",
    hint: "JSON Schema type builder for TypeScript",
  },
  {
    value: "typia",
    label: "Typia",
    hint: "Super-fast validation via compile-time transform",
  },
  {
    value: "runtypes",
    label: "Runtypes",
    hint: "Runtime type validation with composable validators",
  },
  {
    value: "effect-schema",
    label: "@effect/schema",
    hint: "Effect ecosystem schema validation with powerful transformations",
  },
  {
    value: "none",
    label: "None",
    hint: "Use Zod internally only (no additional library)",
  },
];

export function resolveValidationPrompt(validation?: Validation) {
  return createStaticSinglePromptResolution(VALIDATION_PROMPT_OPTIONS, "zod", validation);
}

export async function getValidationChoice(validation?: Validation) {
  const resolution = resolveValidationPrompt(validation);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Validation>({
    message: "Select validation library",
    options: resolution.options,
    initialValue: resolution.initialValue as Validation,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
