import pc from "picocolors";

import type { Ecosystem, ProjectConfig } from "../types";

import { getDefaultConfig } from "../constants";
import { exitCancelled } from "../utils/errors";
import { isCancel, isGoBack, navigableMultiselect, navigableSelect } from "./navigable";

export type ConfigScope = "core" | "full" | "custom";

export type ConfigPromptKey = Exclude<
  keyof ProjectConfig,
  | "projectName"
  | "projectDir"
  | "relativePath"
  | "versionChannel"
  | "stackParts"
  | "template"
  | "shadcnBase"
  | "shadcnStyle"
  | "shadcnIconLibrary"
  | "shadcnColorTheme"
  | "shadcnBaseColor"
  | "shadcnFont"
  | "shadcnRadius"
> | "astroIntegration" | "shadcnOptions";

export type ConfigSection = {
  id: string;
  label: string;
  promptKeys: ConfigPromptKey[];
};

export type EcosystemScopeRegistry = {
  core: ConfigPromptKey[];
  sections: ConfigSection[];
};

export const CONFIG_SCOPE_ALWAYS_KEYS = [
  "aiDocs",
  "git",
  "workspaceShape",
  "packageManager",
  "install",
] as const satisfies ConfigPromptKey[];

const sharedServiceSection = {
  id: "shared-services",
  label: "Shared Services",
  promptKeys: ["email", "caching", "search", "observability"],
} as const satisfies ConfigSection;

const typescriptSections = [
  {
    id: "ui-styling",
    label: "UI & Styling",
    promptKeys: ["uiLibrary", "shadcnOptions", "cssFramework"],
  },
  {
    id: "state-forms",
    label: "State, Forms & Animation",
    promptKeys: ["stateManagement", "forms", "animation"],
  },
  {
    id: "type-safety",
    label: "Validation & Effect",
    promptKeys: ["validation", "effect"],
  },
  {
    id: "payments-email",
    label: "Payments & Email",
    promptKeys: ["payments", "email"],
  },
  {
    id: "ai",
    label: "AI & Vector DB",
    promptKeys: ["ai", "vectorDb"],
  },
  {
    id: "data-storage",
    label: "Data & Storage",
    promptKeys: ["caching", "search", "fileStorage", "fileUpload"],
  },
  {
    id: "backend-extras",
    label: "Jobs, Realtime & Rate Limiting",
    promptKeys: ["jobQueue", "realtime", "rateLimit"],
  },
  {
    id: "quality",
    label: "Testing & Observability",
    promptKeys: ["testing", "logging", "observability"],
  },
  {
    id: "content",
    label: "Content, Analytics & i18n",
    promptKeys: ["cms", "analytics", "i18n", "featureFlags"],
  },
  {
    id: "deploy",
    label: "Deployment",
    promptKeys: ["webDeploy", "serverDeploy"],
  },
  {
    id: "addons-examples",
    label: "Addons & Examples",
    promptKeys: ["addons", "examples"],
  },
] as const satisfies ConfigSection[];

export const CONFIG_SCOPE_REGISTRY = {
  typescript: {
    core: [
      "frontend",
      "astroIntegration",
      "backend",
      "runtime",
      "database",
      "orm",
      "api",
      "auth",
      "dbSetup",
    ],
    sections: typescriptSections,
  },
  "react-native": {
    core: ["frontend", "mobileNavigation", "backend", "runtime", "database", "orm", "api", "auth", "dbSetup"],
    sections: [
      {
        id: "mobile-experience",
        label: "Mobile Experience",
        promptKeys: ["mobileUI", "mobileStorage", "mobileDeepLinking"],
      },
      {
        id: "mobile-delivery",
        label: "Mobile Delivery",
        promptKeys: ["mobilePush", "mobileOTA", "mobileTesting"],
      },
      {
        id: "commerce",
        label: "Payments",
        promptKeys: ["payments"],
      },
      {
        id: "extras",
        label: "Data & Discovery",
        promptKeys: ["caching", "search", "observability"],
      },
    ],
  },
  rust: {
    core: ["rustWebFramework", "rustFrontend", "database", "dbSetup", "rustOrm", "rustApi", "rustAuth"],
    sections: [
      sharedServiceSection,
      {
        id: "cli-libraries",
        label: "CLI & Libraries",
        promptKeys: ["rustCli", "rustLibraries", "rustTemplating"],
      },
      {
        id: "quality",
        label: "Logging & Error Handling",
        promptKeys: ["rustLogging", "rustErrorHandling"],
      },
      {
        id: "backend-extras",
        label: "Caching, Realtime & Queues",
        promptKeys: ["rustCaching", "rustRealtime", "rustMessageQueue"],
      },
      {
        id: "observability",
        label: "Observability",
        promptKeys: ["rustObservability"],
      },
    ],
  },
  python: {
    core: ["pythonWebFramework", "database", "dbSetup", "pythonOrm", "pythonAuth", "pythonApi"],
    sections: [
      sharedServiceSection,
      {
        id: "type-safety-ai",
        label: "Validation & AI",
        promptKeys: ["pythonValidation", "pythonAi"],
      },
      {
        id: "api-jobs",
        label: "GraphQL, Tasks & CLI",
        promptKeys: ["pythonGraphql", "pythonTaskQueue", "pythonCli"],
      },
      {
        id: "data-realtime",
        label: "Caching & Realtime",
        promptKeys: ["pythonCaching", "pythonRealtime"],
      },
      {
        id: "quality",
        label: "Quality, Testing & Observability",
        promptKeys: ["pythonQuality", "pythonTesting", "pythonObservability"],
      },
    ],
  },
  go: {
    core: ["goWebFramework", "database", "dbSetup", "goOrm", "goApi", "goAuth"],
    sections: [
      sharedServiceSection,
      {
        id: "cli-config",
        label: "CLI, Config & Logging",
        promptKeys: ["goCli", "goConfig", "goLogging"],
      },
      {
        id: "backend-extras",
        label: "Realtime, Queues & Caching",
        promptKeys: ["goRealtime", "goMessageQueue", "goCaching"],
      },
      {
        id: "quality",
        label: "Testing & Observability",
        promptKeys: ["goTesting", "goObservability"],
      },
    ],
  },
  java: {
    core: ["javaWebFramework", "javaLanguage", "javaBuildTool", "database", "dbSetup", "javaOrm", "javaAuth", "javaApi"],
    sections: [
      sharedServiceSection,
      {
        id: "libraries",
        label: "Libraries",
        promptKeys: ["javaLibraries"],
      },
      {
        id: "quality",
        label: "Logging & Testing",
        promptKeys: ["javaLogging", "javaTestingLibraries"],
      },
    ],
  },
  dotnet: {
    core: ["dotnetWebFramework", "database", "dbSetup", "dotnetOrm", "dotnetAuth", "dotnetApi"],
    sections: [
      sharedServiceSection,
      {
        id: "quality",
        label: "Testing & Observability",
        promptKeys: ["dotnetTesting", "dotnetObservability"],
      },
      {
        id: "backend-extras",
        label: "Jobs, Realtime & Caching",
        promptKeys: ["dotnetJobQueue", "dotnetRealtime", "dotnetCaching"],
      },
      {
        id: "validation-deploy",
        label: "Validation & Deployment",
        promptKeys: ["dotnetValidation", "dotnetDeploy"],
      },
    ],
  },
  elixir: {
    core: ["elixirWebFramework", "database", "dbSetup", "elixirOrm", "elixirAuth", "elixirApi"],
    sections: [
      {
        id: "backend-extras",
        label: "Realtime & Jobs",
        promptKeys: ["elixirRealtime", "elixirJobs"],
      },
      {
        id: "type-safety-http",
        label: "Validation, HTTP & JSON",
        promptKeys: ["elixirValidation", "elixirHttp", "elixirJson"],
      },
      {
        id: "data-email",
        label: "Email & Caching",
        promptKeys: ["elixirEmail", "elixirCaching"],
      },
      {
        id: "quality",
        label: "Testing, Quality & Observability",
        promptKeys: ["elixirTesting", "elixirQuality", "elixirObservability"],
      },
      {
        id: "deploy-libraries",
        label: "Deployment & Libraries",
        promptKeys: ["elixirDeploy", "elixirLibraries"],
      },
    ],
  },
} as const satisfies Record<Ecosystem, EcosystemScopeRegistry>;

export const SCOPED_CONFIG_PROMPT_KEYS = [
  ...new Set(
    Object.values(CONFIG_SCOPE_REGISTRY).flatMap((registry) => [
      ...registry.core,
      ...registry.sections.flatMap((section) => section.promptKeys),
      ...CONFIG_SCOPE_ALWAYS_KEYS,
    ]),
  ),
].sort();

export function getConfigScopePromptKeys(
  ecosystem: Ecosystem,
  scope: ConfigScope,
  selectedSectionIds: string[] = [],
): Set<ConfigPromptKey> {
  const registry = CONFIG_SCOPE_REGISTRY[ecosystem];
  const keys = new Set<ConfigPromptKey>([...registry.core, ...CONFIG_SCOPE_ALWAYS_KEYS]);

  if (scope === "full") {
    for (const section of registry.sections) {
      for (const key of section.promptKeys) keys.add(key);
    }
  }

  if (scope === "custom") {
    const selected = new Set(selectedSectionIds);
    for (const section of registry.sections) {
      if (!selected.has(section.id)) continue;
      for (const key of section.promptKeys) keys.add(key);
    }
  }

  return keys;
}

export function shouldAskConfigPromptKey(
  ecosystem: Ecosystem | undefined,
  key: ConfigPromptKey,
  scope: ConfigScope | undefined,
  selectedSectionIds: string[] | undefined,
): boolean {
  if (!ecosystem || !scope || scope === "full") return true;
  const registry = CONFIG_SCOPE_REGISTRY[ecosystem];
  const known = new Set<ConfigPromptKey>([
    ...registry.core,
    ...registry.sections.flatMap((section) => section.promptKeys),
    ...CONFIG_SCOPE_ALWAYS_KEYS,
  ]);
  // Keys outside this ecosystem's registry (e.g. rust* prompts while
  // configuring typescript) must run their own ecosystem guard, which resolves
  // them to the correct "not applicable" value without showing UI. Substituting
  // getDefaultConfig() values here would leak cross-ecosystem defaults.
  if (!known.has(key)) return true;
  return getConfigScopePromptKeys(ecosystem, scope, selectedSectionIds).has(key);
}

export function getDefaultPromptValue(key: ConfigPromptKey): unknown {
  if (key === "astroIntegration") return undefined;
  const defaults = getDefaultConfig();
  if (key === "shadcnOptions") {
    // uiLibrary defaults to shadcn-ui, so a skipped shadcn prompt must carry
    // the default options instead of leaving the config fields undefined.
    return {
      shadcnBase: defaults.shadcnBase,
      shadcnStyle: defaults.shadcnStyle,
      shadcnIconLibrary: defaults.shadcnIconLibrary,
      shadcnColorTheme: defaults.shadcnColorTheme,
      shadcnBaseColor: defaults.shadcnBaseColor,
      shadcnFont: defaults.shadcnFont,
      shadcnRadius: defaults.shadcnRadius,
    };
  }
  return defaults[key as keyof ProjectConfig];
}

export async function getConfigScopeChoice(): Promise<ConfigScope | symbol> {
  const response = await navigableSelect<ConfigScope>({
    message: "How much do you want to configure?",
    options: [
      {
        value: "core",
        label: "Core",
        hint: "essentials only — framework, database, auth, API; sensible defaults for everything else",
      },
      {
        value: "full",
        label: "Full",
        hint: "walk through every option",
      },
      {
        value: "custom",
        label: "Custom",
        hint: "pick which sections to configure",
      },
    ],
    initialValue: "core",
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export async function getConfigSectionsChoice(
  ecosystem: Ecosystem,
  initialValues: string[] = [],
  availableSectionIds?: string[],
): Promise<string[] | symbol> {
  const sections = CONFIG_SCOPE_REGISTRY[ecosystem].sections.filter(
    (section) => !availableSectionIds || availableSectionIds.includes(section.id),
  );
  const response = await navigableMultiselect<string>({
    message: `Which sections do you want to configure? ${pc.dim("(essentials are always included)")}`,
    options: sections.map((section) => ({
      value: section.id,
      label: section.label,
    })),
    initialValues,
    required: false,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");
  if (isGoBack(response)) return response;
  return response;
}
