import type { CompatibilityAnalysisResult, CompatibilityCategory } from "@better-fullstack/types";

import {
  analyzeStackCompatibility as analyzeStackCompatibilityShared,
  formatCompatibilityDecision,
  getCategoryOrderForEcosystem,
  getCategoryDisplayName,
  getCompatibilityDecision,
  getToolingCategory,
  getToolingSelectionOptions,
  getCodeQualitySelectionIssue,
  updateCodeQualitySelection,
  hasPWACompatibleFrontend,
  hasTauriCompatibleFrontend,
  isKotlinIncompatibleOption,
  isOptionCompatible as isOptionCompatibleShared,
  KOTLIN_HIDDEN_SHARED_CATEGORIES,
  validateProjectName,
} from "@better-fullstack/types";

import type { StackState, TECH_OPTIONS } from "@/lib/stack/constant";

import { OPTION_DISPLAY_ORDER } from "@/lib/stack/option-order";
import {
  getStackKeyForCategory,
  getToolingCategoryForUi,
  getToolingOptionForUi,
} from "@/lib/stack/stack-utils";

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
    getToolingCategory(toolingCategory)?.selectionMode === "single" ||
    toolingCategory === "codeQuality"
      ? [toolingCategory]
      : [];
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

  if (toolingCategory === "codeQuality") {
    compatibilityStack.codeQuality = updateCodeQualitySelection(
      currentStack.codeQuality,
      selection.toolIds,
    );
    const reason = getCodeQualitySelectionIssue(compatibilityStack.codeQuality);
    if (reason) return reason;
  }

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

const OPT_OUT_IDS: ReadonlySet<string> = new Set(["none", "false"]);

/**
 * Shows a category's default first, then the rest most popular first. Unranked ids keep their
 * place at the end; a "None" default stays where it is.
 */
function sortByDisplayOrder<T extends { id: string; default?: boolean }>(
  category: string,
  options: readonly T[],
): T[] {
  const order = OPTION_DISPLAY_ORDER[category] ?? [];
  const rank = new Map(order.map((id, index) => [id, index]));
  const leadsList = (option: T) => option.default === true && !OPT_OUT_IDS.has(option.id);
  return [...options].sort(
    (a, b) =>
      Number(leadsList(b)) - Number(leadsList(a)) ||
      (rank.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.id) ?? Number.MAX_SAFE_INTEGER),
  );
}

export const getVisibleOptions = (
  currentStack: StackState,
  category: keyof typeof TECH_OPTIONS,
  options: (typeof TECH_OPTIONS)[keyof typeof TECH_OPTIONS],
) => sortByDisplayOrder(category, filterVisibleOptions(currentStack, category, options));

const filterVisibleOptions = (
  currentStack: StackState,
  category: keyof typeof TECH_OPTIONS,
  options: (typeof TECH_OPTIONS)[keyof typeof TECH_OPTIONS],
) => {
  const isKotlin = currentStack.ecosystem === "java" && currentStack.javaLanguage === "kotlin";

  if (isKotlin) {
    if (KOTLIN_HIDDEN_SHARED_CATEGORIES.has(category as string)) {
      return options.filter((option) => option.id === "none");
    }
    if (
      category === "javaWebFramework" ||
      category === "javaBuildTool" ||
      category === "javaOrm" ||
      category === "javaApi" ||
      category === "javaLibraries" ||
      category === "javaTestingLibraries"
    ) {
      return options.filter((option) => !isKotlinIncompatibleOption(category, option.id));
    }
  }

  // shadcn-svelte only means something next to Svelte, so other frontends never see it.
  if (category === "uiLibrary") {
    return options.filter(
      (option) =>
        option.id !== "shadcn-svelte" ||
        currentStack.uiLibrary === "shadcn-svelte" ||
        isOptionCompatible(currentStack, category, option.id),
    );
  }

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

/** The stack fields that mean something for a language; the rest are another language's defaults. */
export function getRelevantStackKeys(
  ecosystem: StackState["ecosystem"],
): readonly (keyof StackState)[] {
  return [
    "ecosystem",
    "projectName",
    ...getCategoryOrderForEcosystem(ecosystem).map(getStackKeyForCategory),
    "yolo",
  ];
}
