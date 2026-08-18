import {
  CATEGORY_ORDER,
  getCategoryOrderForEcosystem,
  getToolingSelectionOptions,
  parseStackPartSpecs,
  type ToolingCategoryId,
} from "@better-fullstack/types";
import {
  createStackSelectionSearchParams as createStackSearchParams,
  generateStackSelectionCommand,
  type StackSelectionInput,
} from "@better-fullstack/types/stack-translation";

import type { TechCategory } from "@/lib/types";

import { TECH_OPTIONS } from "@/lib/constant";
import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";

export function getStackKeyForCategory(category: TechCategory): keyof StackState {
  if (category === "ai") return "aiSdk";
  if (category === "documentation") return "documentation";
  if (
    category === "codeQualityProfile" ||
    category === "gitHooks" ||
    category === "staticAnalysis"
  ) {
    return "codeQuality";
  }
  if (getToolingCategoryForUi(category)) return "appPlatforms";
  return category as keyof StackState;
}

const TOOLING_CATEGORY_BY_UI: Partial<Record<TechCategory, ToolingCategoryId>> = {
  toolchainProfile: "toolchain",
  workspaceRunner: "workspaceRunner",
  codeQualityProfile: "codeQuality",
  gitHooks: "gitHooks",
  staticAnalysis: "staticAnalysis",
  aiTooling: "aiTooling",
  documentation: "documentation",
  appShells: "appPlatforms",
  testingTools: "testingTools",
  dataClient: "dataClient",
  frontendUtilities: "frontendUtilities",
  httpClientTool: "httpClient",
  codeGeneration: "codeGeneration",
  developerEnvironment: "developerEnvironment",
  containerOrchestration: "containerOrchestration",
  apiGateway: "apiGateway",
  continuousIntegration: "continuousIntegration",
  backendUtilitiesTool: "backendUtilities",
};

export function getToolingCategoryForUi(category: TechCategory) {
  return TOOLING_CATEGORY_BY_UI[category];
}

export function getToolingOptionForUi(category: TechCategory, optionId: string) {
  const toolingCategory = getToolingCategoryForUi(category);
  return toolingCategory
    ? getToolingSelectionOptions(toolingCategory).find((selection) => selection.id === optionId)
    : undefined;
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

function summarizeStackParts(stack: StackState) {
  const labels = parseStackPartSpecs(stack.stackPartSpecs, "selected")
    .filter((part) => part.toolId !== "none")
    .map((part) => {
      const categories =
        part.ecosystem === "universal"
          ? CATEGORY_ORDER
          : part.ecosystem === "kotlin"
            ? (["kotlinMobile"] as const)
            : part.ecosystem === "swift"
              ? (["swiftMobile"] as const)
              : part.ecosystem === "dart"
                ? (["dartMobile"] as const)
                : getCategoryOrderForEcosystem(part.ecosystem);
      for (const category of categories) {
        const option = TECH_OPTIONS[category]?.find((candidate) => candidate.id === part.toolId);
        if (option) return option.name;
      }
      return part.toolId
        .split("-")
        .filter(Boolean)
        .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
        .join(" ");
    });

  return [...new Set(labels)].join(" • ") || "Custom stack";
}

/**
 * Summary restricted to the categories that belong to the stack's own
 * ecosystem, so a Python/Rust/Go stack is never described by the TypeScript
 * defaults its state still carries.
 */
export function summarizeStackForEcosystem(stack: StackState) {
  if (stack.stackMode === "multi" && stack.stackPartSpecs.length > 0) {
    return summarizeStackParts(stack);
  }
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
