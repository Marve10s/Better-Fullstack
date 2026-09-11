import type { ProjectConfig, StackPartEcosystem } from "@better-fullstack/types";

import { stackGraphToLegacyProjectConfigForEcosystem } from "@better-fullstack/types";

import {
  TEMPLATE_FAMILY_LOADERS,
  type TemplateFamily,
} from "@/template-families.generated";

type ProjectEcosystem = ProjectConfig["ecosystem"];

const PROJECT_ECOSYSTEMS = new Set<ProjectEcosystem>([
  "typescript",
  "react-native",
  "rust",
  "python",
  "go",
  "java",
  "elixir",
  "dotnet",
]);

const ECOSYSTEM_TEMPLATE_FAMILY: Partial<Record<StackPartEcosystem, TemplateFamily>> = {
  rust: "rust-base",
  python: "python-base",
  go: "go-base",
  java: "java-base",
  elixir: "elixir-base",
  dotnet: "dotnet-base",
};

function hasSelection(value: unknown): boolean {
  if (Array.isArray(value)) return value.some((entry) => entry !== "none");
  return value !== undefined && value !== null && value !== "none";
}

function addLegacyTemplateFamilies(families: Set<TemplateFamily>, config: ProjectConfig): void {
  // Workspace add-ons are graph-global and are merged into each ecosystem
  // projection by the generator. Preserve them even when the raw config's
  // legacy ecosystem is native.
  if (hasSelection(config.addons)) families.add("addons");

  const usesJavaScriptTemplates =
    config.ecosystem === "typescript" || config.ecosystem === "react-native";
  if (!usesJavaScriptTemplates) {
    const ecosystemFamily = ECOSYSTEM_TEMPLATE_FAMILY[config.ecosystem];
    if (ecosystemFamily) families.add(ecosystemFamily);
    if (config.ecosystem === "java" && config.javaWebFramework === "ktor") {
      families.add("kotlin-ktor");
    }
    return;
  }

  families.add("base");
  families.add("packages");
  families.add("extras");

  if (hasSelection(config.frontend)) families.add("frontend");
  if (hasSelection(config.backend)) families.add("backend");
  if (hasSelection(config.database) && config.backend !== "convex") {
    families.add("db");
    if (config.dbSetup === "docker") families.add("db-setup");
  }
  if (hasSelection(config.api) && config.backend !== "convex") families.add("api");
  if (hasSelection(config.auth)) families.add("auth");
  if (hasSelection(config.payments)) families.add("payments");
  if (hasSelection(config.email)) families.add("email");
  if (hasSelection(config.examples)) families.add("examples");
  if (hasSelection(config.webDeploy) || hasSelection(config.serverDeploy)) families.add("deploy");
  if (hasSelection(config.logging)) families.add("logging");
  if (hasSelection(config.observability)) families.add("observability");
  if (hasSelection(config.rateLimit)) families.add("rate-limit");
  if (hasSelection(config.featureFlags)) families.add("feature-flags");
  if (hasSelection(config.integrations)) families.add("integrations");
  if (hasSelection(config.ecommerce)) families.add("ecommerce");
  if (hasSelection(config.analytics)) families.add("analytics");
  if (hasSelection(config.webMcp)) families.add("web-mcp");
  if (hasSelection(config.ai)) families.add("ai");
  if (hasSelection(config.realtime)) families.add("realtime");
  if (hasSelection(config.jobQueue)) families.add("job-queue");
  if (hasSelection(config.cms)) families.add("cms");
  if (hasSelection(config.i18n)) families.add("i18n");
  if (hasSelection(config.search)) families.add("search");
  if (hasSelection(config.vectorDb)) families.add("vector-db");
  if (hasSelection(config.fileStorage) || hasSelection(config.fileUpload)) {
    families.add("file-storage");
  }
  if (hasSelection(config.testing) || hasSelection(config.mobileTesting)) families.add("testing");
}

function isProjectEcosystem(ecosystem: StackPartEcosystem): ecosystem is ProjectEcosystem {
  return PROJECT_ECOSYSTEMS.has(ecosystem as ProjectEcosystem);
}

export function getRequiredTemplateFamilies(config: ProjectConfig): TemplateFamily[] {
  const families = new Set<TemplateFamily>();
  addLegacyTemplateFamilies(families, config);

  if (!config.stackParts?.length) return [...families].sort();

  // Graph generation always creates a TypeScript projection first, even for a
  // native-only graph, then removes the temporary JavaScript root. Loading from
  // the projection also captures capabilities owned by every TypeScript part.
  addLegacyTemplateFamilies(
    families,
    stackGraphToLegacyProjectConfigForEcosystem(config, "typescript"),
  );

  const graphEcosystems = new Set(config.stackParts.map((part) => part.ecosystem));
  if (
    config.stackParts.some(
      (part) =>
        !part.ownerPartId &&
        part.source !== "provided" &&
        (part.role === "frontend" || part.role === "mobile"),
    )
  ) {
    families.add("frontend");
  }
  for (const ecosystem of graphEcosystems) {
    const ecosystemFamily = ECOSYSTEM_TEMPLATE_FAMILY[ecosystem];
    if (ecosystemFamily) families.add(ecosystemFamily);

    if (ecosystem === "kotlin") {
      families.add("frontend");
      families.add("java-base");
      families.add("kotlin-ktor");
    } else if (ecosystem === "swift" || ecosystem === "dart") {
      families.add("frontend");
    }

    if (isProjectEcosystem(ecosystem)) {
      addLegacyTemplateFamilies(
        families,
        stackGraphToLegacyProjectConfigForEcosystem(config, ecosystem),
      );
    }
  }

  return [...families].sort();
}

export async function loadTemplatesForConfig(config: ProjectConfig): Promise<Map<string, string>> {
  const families = getRequiredTemplateFamilies(config);
  const loadedFamilies = await Promise.all(
    families.map((family) => TEMPLATE_FAMILY_LOADERS[family]()),
  );

  const templates = new Map<string, string>();
  for (const family of loadedFamilies) {
    for (const [path, content] of family) templates.set(path, content);
  }
  return templates;
}
