import type { Ecosystem } from "@better-fullstack/types";

import {
  getCategoryDisplayName,
  hasReactNativeApp,
  isMultiEcosystemMobileCategory,
  isReactNativeOnlyCategory,
} from "@better-fullstack/types";

import type { StackState } from "@/lib/stack/stack-defaults";
import type { TechCategory } from "@/lib/stack/types";

export type BuilderSectionDef = {
  key: string;
  fallbackName: string;
  categories: readonly TechCategory[];
  defaultCollapsed?: boolean;
};

const section = (
  key: string,
  fallbackName: string,
  categories: readonly TechCategory[],
  defaultCollapsed = false,
): BuilderSectionDef => ({ key, fallbackName, categories, defaultCollapsed });

// Conditional categories rendered inside another category's subsection rather
// than as their own section.
export const SECTION_EMBEDDED_CATEGORIES = new Set<TechCategory>([
  "astroIntegration",
  "shadcnBase",
  "shadcnStyle",
  "shadcnIconLibrary",
  "shadcnColorTheme",
  "shadcnBaseColor",
  "shadcnFont",
  "shadcnRadius",
]);

const TYPESCRIPT_SECTIONS: readonly BuilderSectionDef[] = [
  section("frontend", "Frontend", ["webFrontend", "cssFramework", "uiLibrary", "appShells"]),
  section(
    "frontendLibraries",
    "Frontend Libraries",
    [
      "stateManagement",
      "forms",
      "animation",
      "dataClient",
      "frontendUtilities",
      "httpClientTool",
      "i18n",
    ],
    true,
  ),
  section("backendApi", "Backend & API", [
    "backend",
    "runtime",
    "api",
    "validation",
    "backendLibraries",
    "backendUtilitiesTool",
    "codeGeneration",
  ]),
  section("data", "Data & Storage", [
    "database",
    "orm",
    "dbSetup",
    "caching",
    "search",
    "vectorDb",
    "fileStorage",
  ]),
  section("authSecurity", "Auth & Security", ["auth", "botProtection", "rateLimit"]),
  section(
    "product",
    "Product Features",
    ["payments", "ecommerce", "email", "fileUpload", "integrations", "cms"],
    true,
  ),
  section("realtimeJobs", "Realtime & Jobs", ["realtime", "jobQueue"], true),
  section("ai", "AI", ["ai", "aiTooling", "aiDocs"], true),
  section(
    "observability",
    "Observability & Analytics",
    ["logging", "observability", "analytics", "featureFlags"],
    true,
  ),
  section(
    "qualityTesting",
    "Quality & Testing",
    [
      "testing",
      "testingTools",
      "codeQualityProfile",
      "gitHooks",
      "staticAnalysis",
      "documentation",
    ],
    true,
  ),
  section("workspaceTooling", "Workspace & Tooling", [
    "workspaceShape",
    "toolchainProfile",
    "workspaceRunner",
    "packageManager",
    "developerEnvironment",
    "containerOrchestration",
    "apiGateway",
    "continuousIntegration",
  ]),
  section("deployScaffold", "Deploy & Scaffold", [
    "webDeploy",
    "serverDeploy",
    "examples",
    "versionChannel",
    "git",
    "install",
  ]),
];

/**
 * React Native's own categories stay hidden until a React Native app is
 * selected, and the other mobile platforms never appear in the section list
 * (the multi-ecosystem composer renders those itself), so a React Native stack
 * is never offered Kotlin or Swift options.
 *
 * Yolo skips compatibility normalization, so an Expo selection survives losing
 * its app. Keep those categories visible there or the values stay in the
 * generated command with no control left to clear them.
 */
export function isHiddenMobilePlatformCategory(
  stack: Pick<StackState, "nativeFrontend" | "yolo">,
  category: string,
): boolean {
  if (isMultiEcosystemMobileCategory(category)) return true;
  if (stack.yolo === "true") return false;
  return isReactNativeOnlyCategory(category) && !hasReactNativeApp(stack);
}

const REACT_NATIVE_SECTIONS: readonly BuilderSectionDef[] = [
  section("mobileFrameworks", "Mobile Frameworks", [
    "nativeFrontend",
    "kotlinMobile",
    "kotlinMobileLibraries",
    "swiftMobile",
    "dartMobile",
  ]),
  section("appExperience", "App Experience", [
    "mobileNavigation",
    "mobileUI",
    "mobileStorage",
    "mobileDeepLinking",
    "mobileLibraries",
  ]),
  section("testingDelivery", "Testing & Delivery", ["mobileTesting", "mobilePush", "mobileOTA"]),
  section("authPayments", "Auth & Payments", ["auth", "payments"]),
  section("deployScaffold", "Deploy & Scaffold", ["packageManager", "aiDocs", "git", "install"]),
];

const RUST_SECTIONS: readonly BuilderSectionDef[] = [
  section("webApi", "Web & API", ["rustWebFramework", "rustFrontend", "rustApi", "rustTemplating"]),
  section("data", "Data & Storage", ["rustOrm", "rustCaching", "caching", "search"]),
  section("services", "Auth & Services", ["rustAuth", "rustRealtime", "rustMessageQueue", "email"]),
  section("coreTooling", "Core & Tooling", ["rustCli", "rustLibraries", "rustErrorHandling"]),
  section("observability", "Observability & Analytics", [
    "rustLogging",
    "rustObservability",
    "observability",
  ]),
  section("deployScaffold", "Deploy & Scaffold", ["aiDocs", "git", "install"]),
];

const PYTHON_SECTIONS: readonly BuilderSectionDef[] = [
  section("webApi", "Web & API", [
    "pythonWebFramework",
    "pythonApi",
    "pythonGraphql",
    "pythonServer",
  ]),
  section("data", "Data & Storage", ["pythonOrm", "pythonCaching", "caching", "search"]),
  section("aiData", "AI & Data Science", ["pythonAi", "pythonData", "pythonMedia"]),
  section("services", "Auth & Services", [
    "pythonAuth",
    "pythonTaskQueue",
    "pythonRealtime",
    "pythonMessageQueue",
    "email",
  ]),
  section("qualityTesting", "Quality & Testing", [
    "pythonQuality",
    "pythonTesting",
    "pythonValidation",
  ]),
  section("observability", "Observability & Analytics", ["pythonObservability", "observability"]),
  section("coreTooling", "Core & Tooling", [
    "pythonCli",
    "pythonCloudSdk",
    "pythonHttpClient",
    "pythonPackageManager",
  ]),
  section("deployScaffold", "Deploy & Scaffold", ["aiDocs", "git", "install"]),
];

const GO_SECTIONS: readonly BuilderSectionDef[] = [
  section("webApi", "Web & API", ["goWebFramework", "goApi", "goTemplating", "goProtoTooling"]),
  section("data", "Data & Storage", ["goOrm", "goMigrations", "goCaching", "caching", "search"]),
  // "auth" is claimed here but rendered merged into goAuth (see shouldSkipCategory).
  section("services", "Auth & Services", [
    "goAuth",
    "auth",
    "goRealtime",
    "goMessageQueue",
    "email",
  ]),
  section("coreTooling", "Core & Tooling", ["goCli", "goConfig", "goDI", "goValidation"]),
  section("qualityTesting", "Quality & Testing", ["goTesting", "goQuality"]),
  section("observability", "Observability & Analytics", [
    "goLogging",
    "goObservability",
    "observability",
  ]),
  section("deployScaffold", "Deploy & Scaffold", ["aiDocs", "git", "install"]),
];

const JAVA_SECTIONS: readonly BuilderSectionDef[] = [
  section("frameworkBuild", "Framework & Build", [
    "javaWebFramework",
    "javaLanguage",
    "javaBuildTool",
  ]),
  section("data", "Data & Storage", ["javaOrm", "caching", "search"]),
  section("services", "Auth & Services", ["javaAuth", "javaApi", "email"]),
  section("libraries", "Libraries & Utilities", ["javaLibraries", "javaTestingLibraries"]),
  section("observability", "Observability & Analytics", ["javaLogging", "observability"]),
  section("deployScaffold", "Deploy & Scaffold", ["aiDocs", "git", "install"]),
];

const DOTNET_SECTIONS: readonly BuilderSectionDef[] = [
  section("frameworkBuild", "Framework & Build", ["dotnetFrontend", "dotnetWebFramework"]),
  section("data", "Data & Storage", ["dotnetOrm", "dotnetCaching"]),
  section("services", "Auth & Services", [
    "dotnetAuth",
    "dotnetApi",
    "dotnetJobQueue",
    "dotnetRealtime",
  ]),
  section("qualityTesting", "Quality & Testing", ["dotnetTesting", "dotnetValidation"]),
  section("libraries", "Libraries & Utilities", ["dotnetLibraries"]),
  section("observability", "Observability & Analytics", ["dotnetObservability"]),
  section("deployScaffold", "Deploy & Scaffold", ["dotnetDeploy", "aiDocs", "git", "install"]),
];

const ELIXIR_SECTIONS: readonly BuilderSectionDef[] = [
  section("frameworkBuild", "Framework & Build", [
    "elixirWebFramework",
    "elixirApplicationFramework",
    "elixirHttpServer",
  ]),
  section("data", "Data & Storage", ["elixirOrm", "elixirCaching"]),
  section("services", "Auth & Services", [
    "elixirAuth",
    "elixirApi",
    "elixirRealtime",
    "elixirJobs",
    "elixirEmail",
    "elixirClustering",
  ]),
  section("libraries", "Libraries & Utilities", [
    "elixirValidation",
    "elixirHttp",
    "elixirJson",
    "elixirI18n",
    "elixirLibraries",
  ]),
  section("qualityTesting", "Quality & Testing", [
    "elixirTesting",
    "elixirQuality",
    "elixirDocumentation",
  ]),
  section("observability", "Observability & Analytics", ["elixirObservability"]),
  section("deployScaffold", "Deploy & Scaffold", ["elixirDeploy", "aiDocs", "git", "install"]),
];

export const SECTIONS_BY_ECOSYSTEM: Record<Ecosystem, readonly BuilderSectionDef[]> = {
  typescript: TYPESCRIPT_SECTIONS,
  "react-native": REACT_NATIVE_SECTIONS,
  rust: RUST_SECTIONS,
  python: PYTHON_SECTIONS,
  go: GO_SECTIONS,
  java: JAVA_SECTIONS,
  dotnet: DOTNET_SECTIONS,
  elixir: ELIXIR_SECTIONS,
};

/**
 * Resolves the rendered sections for an ecosystem: each section keeps only the
 * categories present in `order`, and categories in `order` that no section
 * claims fall back to a single-category section so new categories never
 * silently disappear from the builder.
 */
export function getBuilderSections(
  ecosystem: Ecosystem,
  order: readonly TechCategory[],
): BuilderSectionDef[] {
  const defs = SECTIONS_BY_ECOSYSTEM[ecosystem];
  const orderSet = new Set(order);
  const claimed = new Set<TechCategory>(SECTION_EMBEDDED_CATEGORIES);

  const sections = defs.flatMap<BuilderSectionDef>((def) => {
    const categories = def.categories.filter(
      (category) => orderSet.has(category) && !claimed.has(category),
    );
    for (const category of categories) {
      claimed.add(category);
    }
    return categories.length > 0 ? [{ ...def, categories }] : [];
  });

  const unclaimed = order.filter((category) => !claimed.has(category));
  for (const category of unclaimed) {
    sections.push(section(category, getCategoryDisplayName(category), [category]));
  }

  return sections;
}
