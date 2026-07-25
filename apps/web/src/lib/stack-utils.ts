import { CATEGORY_ORDER, getCategoryOrderForEcosystem } from "@better-fullstack/types";

import {
  createStackSelectionSearchParams as createStackSearchParams,
  generateStackSelectionCommand,
  type StackSelectionInput,
} from "@better-fullstack/types/stack-translation";

import { TECH_OPTIONS } from "@/lib/constant";
import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";
import type { TechCategory } from "@/lib/types";

export function getStackKeyForCategory(category: TechCategory): keyof StackState {
  if (category === "ai") return "aiSdk";
  // appShells is a UI-only split of the addons grab-bag; both sections share
  // the appPlatforms state key so old share links keep working.
  if (category === "appShells") return "appPlatforms";
  return category as keyof StackState;
}

/**
 * Human-readable list of a stack's selected technologies.
 *
 * `categories` defaults to the global CATEGORY_ORDER, which starts with the
 * TypeScript web categories. A non-TypeScript stack still carries default
 * webFrontend/backend/runtime values in its state, so callers that describe the
 * stack to a user (rather than dump every field) should pass the active
 * ecosystem's order — see summarizeStackForEcosystem.
 */
export function generateStackSummary(
  stack: StackState,
  categories: readonly TechCategory[] = CATEGORY_ORDER,
) {
  const selectedTechs = categories.flatMap((category) => {
    const options = TECH_OPTIONS[category];
    const selectedValue = stack[getStackKeyForCategory(category)];

    if (!options) return [];

    const getTechNames = (value: string | string[]) => {
      const values = Array.isArray(value) ? value : [value];
      return values
        .filter(
          (id) =>
            id !== "none" &&
            id !== "false" &&
            !(category === "versionChannel" && id === DEFAULT_STACK.versionChannel) &&
            !(["git", "install", "auth"].includes(category) && id === "true"),
        )
        .map((id) => options.find((opt) => opt.id === id)?.name)
        .filter(Boolean) as string[];
    };

    return selectedValue ? getTechNames(selectedValue) : [];
  });

  return selectedTechs.length > 0 ? selectedTechs.join(" • ") : "Custom stack";
}

/**
 * Summary restricted to the categories that belong to the stack's own
 * ecosystem, so a Python/Rust/Go stack is never described by the TypeScript
 * defaults its state still carries.
 */
export function summarizeStackForEcosystem(stack: StackState) {
  return generateStackSummary(
    stack,
    getCategoryOrderForEcosystem(stack.ecosystem) as readonly TechCategory[],
  );
}

export function generateStackCommand(stack: StackState) {
  return generateStackSelectionCommand(stack as StackSelectionInput);
}

export function generateStackUrlFromState(stack: StackState, baseUrl?: string) {
  const origin = baseUrl || "https://better-fullstack.dev";

  const stackParams = createStackSearchParams(stack, { includeDefaults: true });
  const searchString = stackParams.toString();
  return `${origin}/new${searchString ? `?${searchString}` : ""}`;
}

export function generateStackSharingUrl(stack: StackState, baseUrl?: string) {
  const origin = baseUrl || "https://better-fullstack.dev";

  const stackParams = createStackSearchParams(stack);
  const searchString = stackParams.toString();
  return `${origin}/stack${searchString ? `?${searchString}` : ""}`;
}
