import { normalizeOptionId, type OptionCategory } from "@better-fullstack/types";

import type { StackState } from "@/lib/stack-defaults";
import {
  STACK_STATE_OPTION_CATEGORY_BY_KEY,
  usesVirtualNoneSelection,
} from "@/lib/stack-contract";

export function normalizeStackOptionValue<K extends keyof StackState>(
  key: K,
  value: StackState[K],
): StackState[K] {
  const category = STACK_STATE_OPTION_CATEGORY_BY_KEY[
    key as keyof typeof STACK_STATE_OPTION_CATEGORY_BY_KEY
  ] as OptionCategory | undefined;
  if (!category) return value;

  if (Array.isArray(value)) {
    const normalizedValues = [...new Set(value.map((entry) => normalizeOptionId(category, entry)))];
    const filteredValues =
      normalizedValues.length > 1
        ? normalizedValues.filter((entry) => entry !== "none")
        : normalizedValues;

    if (usesVirtualNoneSelection(key)) {
      if (filteredValues.length === 0) return [] as unknown as StackState[K];
      if (filteredValues.length === 1 && filteredValues[0] === "none") {
        return [] as unknown as StackState[K];
      }
      return filteredValues.filter((entry) => entry !== "none") as StackState[K];
    }

    return filteredValues as StackState[K];
  }

  if (typeof value === "string") {
    return normalizeOptionId(category, value) as StackState[K];
  }

  return value;
}

export function normalizeStackStateSelections(stack: StackState): StackState {
  const normalized: Record<string, unknown> = { ...stack };

  for (const key of Object.keys(STACK_STATE_OPTION_CATEGORY_BY_KEY) as Array<keyof StackState>) {
    normalized[key] = normalizeStackOptionValue(
      key,
      normalized[key] as string | string[] | null,
    );
  }

  return normalized as StackState;
}
