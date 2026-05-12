import {
  generateStackSelectionCommand,
  type StackSelectionInput,
} from "@better-fullstack/types/stack-translation";

import { TECH_OPTIONS } from "@/lib/constant";
import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";
import { createStackSearchParams } from "@/lib/stack-url-state.shared";

// TypeScript ecosystem category order
const TYPESCRIPT_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "webFrontend",
  "nativeFrontend",
  "astroIntegration",
  "cssFramework",
  "uiLibrary",
  "shadcnBase",
  "shadcnStyle",
  "shadcnIconLibrary",
  "shadcnColorTheme",
  "shadcnBaseColor",
  "shadcnFont",
  "shadcnRadius",
  "backend",
  "backendLibraries",
  "runtime",
  "api",
  "database",
  "orm",
  "dbSetup",
  "webDeploy",
  "serverDeploy",
  "auth",
  "payments",
  "email",
  "fileUpload",
  "logging",
  "observability",
  "featureFlags",
  "analytics",
  "ai",
  "stateManagement",
  "forms",
  "validation",
  "testing",
  "realtime",
  "jobQueue",
  "caching",
  "i18n",
  "search",
  "fileStorage",
  "animation",
  "cms",
  "codeQuality",
  "documentation",
  "appPlatforms",
  "packageManager",
  "examples",
  "aiDocs",
  "versionChannel",
  "git",
  "install",
];

// Rust ecosystem category order
const RUST_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustCli",
  "rustLibraries",
  "rustLogging",
  "rustErrorHandling",
  "rustCaching",
  "rustAuth",
  "email",
  "observability",
  "caching",
  "search",
  "aiDocs",
  "git",
  "install",
];

// Python ecosystem category order
const PYTHON_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "pythonWebFramework",
  "pythonOrm",
  "pythonValidation",
  "pythonAi",
  "pythonAuth",
  "pythonApi",
  "pythonTaskQueue",
  "pythonGraphql",
  "pythonQuality",
  "email",
  "observability",
  "caching",
  "search",
  "aiDocs",
  "git",
  "install",
];

// Go ecosystem category order
const GO_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "goWebFramework",
  "goOrm",
  "goApi",
  "goCli",
  "goLogging",
  "goAuth",
  "auth",
  "email",
  "observability",
  "caching",
  "search",
  "aiDocs",
  "git",
  "install",
];

// Java ecosystem category order
const JAVA_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "javaWebFramework",
  "javaBuildTool",
  "javaOrm",
  "javaAuth",
  "javaLibraries",
  "javaTestingLibraries",
  "email",
  "observability",
  "caching",
  "search",
  "aiDocs",
  "git",
  "install",
];

// Combined category order for backwards compatibility
const CATEGORY_ORDER = [
  ...new Set([
    ...TYPESCRIPT_CATEGORY_ORDER,
    ...RUST_CATEGORY_ORDER,
    ...PYTHON_CATEGORY_ORDER,
    ...GO_CATEGORY_ORDER,
    ...JAVA_CATEGORY_ORDER,
  ]),
] as Array<keyof typeof TECH_OPTIONS>;

export function generateStackSummary(stack: StackState) {
  const selectedTechs = CATEGORY_ORDER.flatMap((category) => {
    const options = TECH_OPTIONS[category];
    const selectedValue = stack[category as keyof StackState];

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

export function generateStackCommand(stack: StackState) {
  return generateStackSelectionCommand(stack as StackSelectionInput);
}

export function generateStackUrlFromState(stack: StackState, baseUrl?: string) {
  const origin = baseUrl || "https://better-fullstack-web.vercel.app";

  const stackParams = createStackSearchParams(stack, { includeDefaults: true });
  const searchString = stackParams.toString();
  return `${origin}/new${searchString ? `?${searchString}` : ""}`;
}

export function generateStackSharingUrl(stack: StackState, baseUrl?: string) {
  const origin = baseUrl || "https://better-fullstack-web.vercel.app";

  const stackParams = createStackSearchParams(stack, { includeDefaults: true });
  const searchString = stackParams.toString();
  return `${origin}/stack${searchString ? `?${searchString}` : ""}`;
}

export {
  CATEGORY_ORDER,
  TYPESCRIPT_CATEGORY_ORDER,
  RUST_CATEGORY_ORDER,
  PYTHON_CATEGORY_ORDER,
  GO_CATEGORY_ORDER,
  JAVA_CATEGORY_ORDER,
};
