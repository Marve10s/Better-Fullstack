import type { ProjectConfig, StackPart } from "@/config/types";

import { isToolingOverlayOnly } from "@/capabilities/tooling-capabilities";

export const CRYSTAL_PROJECT_DEFAULTS = {
  crystalWebFramework: "kemal",
  frontend: ["none"],
  backend: "none",
  runtime: "none",
  database: "none",
  dbSetup: "none",
  orm: "none",
  api: "none",
  auth: "none",
  cssFramework: "none",
  uiLibrary: "none",
  forms: "none",
  validation: "none",
  testing: "none",
  stateManagement: "none",
  addons: [],
  examples: [],
} satisfies Partial<ProjectConfig>;

export const CRYSTAL_UNSUPPORTED_FIELDS = [
  "backend",
  "runtime",
  "database",
  "dbSetup",
  "orm",
  "api",
  "auth",
  "payments",
  "email",
  "fileUpload",
  "effect",
  "webDeploy",
  "serverDeploy",
  "ai",
  "stateManagement",
  "forms",
  "testing",
  "cssFramework",
  "uiLibrary",
  "validation",
  "realtime",
  "jobQueue",
  "animation",
  "logging",
  "observability",
  "featureFlags",
  "integrations",
  "ecommerce",
  "analytics",
  "webMcp",
  "cms",
  "caching",
  "rateLimit",
  "botProtection",
  "i18n",
  "search",
  "vectorDb",
  "fileStorage",
  "mobileNavigation",
  "mobileUI",
  "mobileStorage",
  "mobileTesting",
  "mobilePush",
  "mobileOTA",
  "mobileDeepLinking",
  "mobileLibraries",
  "examples",
] as const satisfies readonly (keyof ProjectConfig)[];

function selected(value: unknown): boolean {
  return Array.isArray(value)
    ? value.some(selected)
    : typeof value === "string" && value !== "none" && value !== "";
}

export function getCrystalDatabaseSelectionIssue(
  parts: readonly (Pick<StackPart, "role" | "ecosystem" | "toolId"> &
    Partial<Pick<StackPart, "source">>)[],
): string | null {
  const backends = parts.filter(
    (part) => part.role === "backend" && part.toolId !== "none" && part.source !== "provided",
  );
  const hasCrystal = backends.some((part) => part.ecosystem === "crystal");
  const hasOtherBackend = backends.some((part) => part.ecosystem !== "crystal");
  const hasDatabase = parts.some(
    (part) => part.role === "database" && part.toolId !== "none" && part.source !== "provided",
  );
  return hasCrystal && !hasOtherBackend && hasDatabase
    ? "Crystal does not generate a database adapter. Select none or add an independently owned backend."
    : null;
}

export function getCrystalSelectionIssue(config: Partial<ProjectConfig>): string | null {
  const parts = config.stackParts ?? [];
  const usesGraph = parts.length > 0 && !isToolingOverlayOnly(parts);
  if (usesGraph) {
    const backends = parts.filter(
      (part) =>
        part.role === "backend" && part.ecosystem === "crystal" && part.source !== "provided",
    );
    if (backends.length === 0) return null;
    const collision = backends.find(
      (backend) =>
        backend.targetPath &&
        parts.some(
          (part) =>
            part.id !== backend.id &&
            !part.ownerPartId &&
            part.source !== "provided" &&
            part.targetPath === backend.targetPath,
        ),
    );
    if (collision)
      return `Crystal service target path is shared by another application: ${collision.targetPath}.`;
    const backendIds = new Set(backends.map((part) => part.id));
    const unsupported = parts.find(
      (part) => part.source !== "provided" && backendIds.has(part.ownerPartId ?? ""),
    );
    if (unsupported)
      return `Crystal Kemal does not support the owned '${unsupported.toolId}' selection.`;
    const databaseIssue = getCrystalDatabaseSelectionIssue(parts);
    if (databaseIssue) return databaseIssue;
    const hasOtherApplication = parts.some(
      (part) =>
        !part.ownerPartId &&
        part.source !== "provided" &&
        part.toolId !== "none" &&
        part.ecosystem !== "crystal" &&
        ["frontend", "backend", "mobile"].includes(part.role),
    );
    if (!hasOtherApplication) {
      const overlay = parts.find((part) => part.source !== "provided" && !backendIds.has(part.id));
      if (overlay)
        return `Crystal-only projects do not support '${overlay.toolId}' overlays or databases.`;
      if ((config.addons ?? []).some(selected))
        return "Crystal-only projects do not support addons.";
    }
    return null;
  }
  if (config.ecosystem !== "crystal") return null;
  const field = CRYSTAL_UNSUPPORTED_FIELDS.find((key) => selected(config[key]));
  if (field)
    return `Crystal does not support '${field}'. Select none or use an explicit mixed graph with a separate owner.`;
  if ((config.frontend ?? []).some(selected))
    return "Use an explicit mixed graph to combine a frontend with Crystal.";
  if ((config.addons ?? []).some(selected) || parts.some((part) => part.source !== "provided"))
    return "Crystal-only projects do not support tooling overlays or addons.";
  return null;
}

export function getCrystalRequestedIssue(
  config: Partial<ProjectConfig>,
  parts: readonly StackPart[],
): string | null {
  const applications = parts.filter(
    (part) =>
      !part.ownerPartId &&
      part.source !== "provided" &&
      part.toolId !== "none" &&
      ["backend", "frontend", "mobile"].includes(part.role),
  );
  if (
    applications.length === 0 ||
    !applications.every((part) => part.role === "backend" && part.ecosystem === "crystal")
  )
    return null;
  return getCrystalSelectionIssue({ ...config, ecosystem: "crystal", stackParts: undefined });
}
