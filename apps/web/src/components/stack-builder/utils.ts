import type { CompatibilityAnalysisResult, CompatibilityCategory } from "@better-fullstack/types";

import {
  analyzeStackCompatibility as analyzeStackCompatibilityShared,
  formatCompatibilityDecision,
  getCategoryDisplayName,
  getCompatibilityDecision,
  getToolingCategory,
  getToolingSelectionOptions,
  hasPWACompatibleFrontend,
  hasTauriCompatibleFrontend,
  isOptionCompatible as isOptionCompatibleShared,
  validateProjectName,
} from "@better-fullstack/types";

import type { StackState, TECH_OPTIONS } from "@/lib/stack/constant";

import { getToolingCategoryForUi, getToolingOptionForUi } from "@/lib/stack/stack-utils";

export {
  getCategoryDisplayName,
  hasPWACompatibleFrontend,
  hasTauriCompatibleFrontend,
  validateProjectName,
};

export type CompatibilityResult = CompatibilityAnalysisResult;

export const GRAPH_COMMON_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "toolchainProfile",
  "workspaceRunner",
  "codeQualityProfile",
  "gitHooks",
  "staticAnalysis",
  "aiTooling",
  "documentation",
  "appShells",
  "testingTools",
  "dataClient",
  "frontendUtilities",
  "httpClientTool",
  "codeGeneration",
  "developerEnvironment",
  "containerOrchestration",
  "apiGateway",
  "continuousIntegration",
  "backendUtilitiesTool",
  "workspaceShape",
  "examples",
  "packageManager",
  "aiDocs",
  "versionChannel",
  "git",
  "install",
];

export const analyzeStackCompatibility = (stack: StackState): CompatibilityResult => {
  return analyzeStackCompatibilityShared(stack);
};

const toCompatibilityCategory = (category: keyof typeof TECH_OPTIONS): CompatibilityCategory => {
  if (
    category === "codeQualityProfile" ||
    category === "gitHooks" ||
    category === "staticAnalysis"
  ) {
    return "codeQuality";
  }
  if (getToolingCategoryForUi(category)) return "appPlatforms";
  return category as CompatibilityCategory;
};

export const getDisabledReason = (
  currentStack: StackState,
  category: keyof typeof TECH_OPTIONS,
  optionId: string,
): string | null => {
  const toolingCategory = getToolingCategoryForUi(category);
  const selection = getToolingOptionForUi(category, optionId);
  if (!toolingCategory || !selection) {
    return formatCompatibilityDecision(
      getCompatibilityDecision(currentStack, toCompatibilityCategory(category), optionId),
    );
  }

  const replacementCategories =
    getToolingCategory(toolingCategory)?.selectionMode === "single" ? [toolingCategory] : [];
  if (toolingCategory === "toolchain" && optionId === "vite-plus") {
    replacementCategories.push("workspaceRunner", "codeQuality", "gitHooks");
  }
  const replacedToolIds = new Set(
    replacementCategories.flatMap((replacementCategory) =>
      getToolingSelectionOptions(replacementCategory).flatMap((option) => option.toolIds),
    ),
  );
  const compatibilityStack = {
    ...currentStack,
    appPlatforms: currentStack.appPlatforms.filter((toolId) => !replacedToolIds.has(toolId)),
    codeQuality: currentStack.codeQuality.filter((toolId) => !replacedToolIds.has(toolId)),
    documentation: currentStack.documentation.filter((toolId) => !replacedToolIds.has(toolId)),
  };

  if (
    currentStack.appPlatforms.includes("vite-plus") &&
    ((toolingCategory === "workspaceRunner" && optionId !== "none") ||
      (toolingCategory === "codeQuality" && optionId !== "none") ||
      (toolingCategory === "gitHooks" && optionId !== "none"))
  ) {
    return "Vite+ owns workspace tasks, code quality, and commit hooks for this toolchain profile";
  }

  for (const toolId of selection.toolIds) {
    const compatibilityCategory =
      toolingCategory === "codeQuality" ||
      toolingCategory === "gitHooks" ||
      toolingCategory === "staticAnalysis"
        ? "codeQuality"
        : toolingCategory === "documentation"
          ? "documentation"
          : "appPlatforms";
    const reason = formatCompatibilityDecision(
      getCompatibilityDecision(compatibilityStack, compatibilityCategory, toolId),
    );
    if (reason) return reason;
  }
  return null;
};

export const isOptionCompatible = (
  currentStack: StackState,
  category: keyof typeof TECH_OPTIONS,
  optionId: string,
): boolean => {
  if (getToolingCategoryForUi(category)) {
    return getDisabledReason(currentStack, category, optionId) === null;
  }
  return isOptionCompatibleShared(currentStack, toCompatibilityCategory(category), optionId);
};

export const getVisibleOptions = (
  currentStack: StackState,
  category: keyof typeof TECH_OPTIONS,
  options: (typeof TECH_OPTIONS)[keyof typeof TECH_OPTIONS],
) => {
  if (category !== "auth") return options;

  switch (currentStack.ecosystem) {
    case "go":
      return options.filter((option) => option.id === "go-better-auth" || option.id === "none");
    case "typescript":
      return options.filter((option) => option.id !== "go-better-auth");
    default:
      return options.filter((option) => option.id === "none");
  }
};
