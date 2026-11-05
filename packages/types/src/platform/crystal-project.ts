import type { ProjectConfig, StackPart } from "@/config/types";

import { isToolingOverlayOnly } from "@/capabilities/tooling-capabilities";

export const CRYSTAL_PROJECT_DEFAULTS = {
  crystalWebFramework: "kemal",
  crystalOrm: "none",
  crystalAuth: "none",
  crystalTesting: "spec",
  crystalValidation: "none",
  crystalCache: "none",
  crystalJobs: "none",
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

const CRYSTAL_FRAMEWORK_LABELS: Record<string, string> = {
  kemal: "Kemal",
  lucky: "Lucky",
  athena: "Athena",
  marten: "Marten",
};

const CRYSTAL_HTTP_FRAMEWORKS = ["kemal", "lucky", "athena", "marten"];

type CrystalOptionRule = {
  label: string;
  frameworks: readonly string[];
  orms?: readonly string[];
  excludedCaches?: { values: readonly string[]; reason: string };
};

export type CrystalSelection = {
  crystalWebFramework?: string;
  crystalOrm?: string;
  crystalAuth?: string;
  crystalTesting?: string;
  crystalValidation?: string;
  crystalCache?: string;
  crystalJobs?: string;
};

const CRYSTAL_ORM_LABELS: Record<string, string> = { "marten-orm": "Marten ORM" };

export const CRYSTAL_OPTION_RULES = {
  crystalOrm: {
    role: "orm",
    options: {
      "crystal-db": { label: "crystal-db", frameworks: CRYSTAL_HTTP_FRAMEWORKS },
      avram: { label: "Avram", frameworks: ["lucky"] },
      "marten-orm": { label: "Marten ORM", frameworks: ["marten"] },
    },
  },
  crystalAuth: {
    role: "auth",
    options: {
      jwt: { label: "JWT", frameworks: CRYSTAL_HTTP_FRAMEWORKS },
      "kemal-session": { label: "Kemal Session", frameworks: ["kemal"] },
      "marten-auth": { label: "Marten Auth", frameworks: ["marten"], orms: ["marten-orm"] },
    },
  },
  crystalTesting: {
    role: "testing",
    options: {
      "spec-kemal": { label: "spec-kemal", frameworks: ["kemal"] },
    },
  },
  crystalValidation: {
    role: "validation",
    options: {
      "marten-schema": { label: "Marten Schema", frameworks: ["marten"] },
    },
  },
  crystalCache: {
    role: "caching",
    options: {
      memory: { label: "Memory cache", frameworks: CRYSTAL_HTTP_FRAMEWORKS },
      file: { label: "File cache", frameworks: CRYSTAL_HTTP_FRAMEWORKS },
      redis: { label: "Redis cache", frameworks: CRYSTAL_HTTP_FRAMEWORKS },
    },
  },
  crystalJobs: {
    role: "jobQueue",
    options: {
      sidekiq: {
        label: "Sidekiq.cr",
        frameworks: CRYSTAL_HTTP_FRAMEWORKS,
        excludedCaches: {
          values: ["redis"],
          reason: "Sidekiq.cr and the Redis cache depend on different shards named redis.",
        },
      },
      mosquito: { label: "Mosquito", frameworks: CRYSTAL_HTTP_FRAMEWORKS },
      tasker: { label: "Tasker", frameworks: CRYSTAL_HTTP_FRAMEWORKS },
    },
  },
} as const satisfies Record<
  string,
  { role: StackPart["role"]; options: Record<string, CrystalOptionRule> }
>;

export type CrystalOptionCategory = keyof typeof CRYSTAL_OPTION_RULES;

export const CRYSTAL_OPTION_CATEGORIES = Object.keys(CRYSTAL_OPTION_RULES) as CrystalOptionCategory[];

export function isCrystalOptionCategory(category: string): category is CrystalOptionCategory {
  return category in CRYSTAL_OPTION_RULES;
}

export function getCrystalOptionIssue(
  category: CrystalOptionCategory,
  optionId: string | undefined,
  selection: CrystalSelection,
): string | null {
  const options: Record<string, CrystalOptionRule> = CRYSTAL_OPTION_RULES[category].options;
  const rule = optionId ? options[optionId] : undefined;
  if (!rule) return null;
  if (!rule.frameworks.includes(selection.crystalWebFramework ?? "none")) {
    const frameworks = rule.frameworks.map((id) => CRYSTAL_FRAMEWORK_LABELS[id] ?? id).join(" or ");
    return `${rule.label} requires Crystal ${frameworks}.`;
  }
  if (rule.orms && !rule.orms.includes(selection.crystalOrm ?? "none")) {
    return `${rule.label} requires ${rule.orms.map((id) => CRYSTAL_ORM_LABELS[id] ?? id).join(" or ")}.`;
  }
  if (rule.excludedCaches?.values.includes(selection.crystalCache ?? "none")) return rule.excludedCaches.reason;
  return null;
}

function getCrystalOwnedPartIssue(
  part: StackPart,
  owner: StackPart,
  parts: readonly StackPart[],
): string | null {
  const category = CRYSTAL_OPTION_CATEGORIES.find(
    (candidate) => CRYSTAL_OPTION_RULES[candidate].role === part.role,
  );
  if (!category || part.ecosystem !== "crystal") {
    const name = `${owner.toolId.charAt(0).toUpperCase()}${owner.toolId.slice(1)}`;
    return `Crystal ${name} does not support the owned '${part.toolId}' selection.`;
  }
  const ownedTool = (role: StackPart["role"]) =>
    parts.find((candidate) => candidate.ownerPartId === owner.id && candidate.role === role)?.toolId;
  return getCrystalOptionIssue(category, part.toolId, {
    crystalWebFramework: owner.toolId,
    crystalOrm: ownedTool("orm"),
    crystalCache: ownedTool("caching"),
  });
}

export function getCrystalCompilerFlags(framework: string | undefined): string[] {
  return framework === "athena" ? ["-Dwithout_libmagic"] : [];
}

const CRYSTAL_MIGRATION_COMMANDS: Record<string, string> = {
  avram: "crystal run scripts/db_migrate.cr",
  "marten-orm": "crystal run manage.cr -- migrate",
};

export function getCrystalCommands(selection: CrystalSelection) {
  const framework = selection.crystalWebFramework;
  const flags = getCrystalCompilerFlags(framework).map((flag) => ` ${flag}`).join("");
  return {
    migrate: selection.crystalOrm ? CRYSTAL_MIGRATION_COMMANDS[selection.crystalOrm] : undefined,
    seed:
      selection.crystalAuth === "marten-auth"
        ? "AUTH_PASSWORD=change-me crystal run manage.cr -- seed"
        : undefined,
    build: `shards build --release${flags}`,
    test: selection.crystalTesting === "none" ? undefined : `crystal spec${flags}`,
    run: `crystal run src/server.cr${flags}`,
    proof: framework && framework !== "none" ? "crystal run scripts/http_proof.cr" : undefined,
  };
}

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
  const hasOtherBackend = backends.some(
    (part) => !["crystal", "ruby", "php"].includes(part.ecosystem),
  );
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
    const backendsById = new Map(backends.map((part) => [part.id, part]));
    const ownedParts = parts.filter(
      (part) =>
        part.source !== "provided" &&
        part.toolId !== "none" &&
        backendsById.has(part.ownerPartId ?? ""),
    );
    for (const part of ownedParts) {
      const owner = backendsById.get(part.ownerPartId ?? "");
      const issue = owner ? getCrystalOwnedPartIssue(part, owner, ownedParts) : null;
      if (issue) return issue;
    }
    const crystalPartIds = new Set([...backendsById.keys(), ...ownedParts.map((part) => part.id)]);
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
      const overlay = parts.find(
        (part) =>
          part.source !== "provided" && part.toolId !== "none" && !crystalPartIds.has(part.id),
      );
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
  for (const category of CRYSTAL_OPTION_CATEGORIES) {
    const issue = getCrystalOptionIssue(category, config[category], config);
    if (issue) return issue;
  }
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
  const [backend] = applications;
  const ownedSelection = Object.fromEntries(
    CRYSTAL_OPTION_CATEGORIES.flatMap((category) => {
      const toolId = parts.find(
        (part) =>
          part.ownerPartId === backend.id && part.role === CRYSTAL_OPTION_RULES[category].role,
      )?.toolId;
      return toolId ? [[category, toolId]] : [];
    }),
  );
  return getCrystalSelectionIssue({
    ...config,
    ...ownedSelection,
    crystalWebFramework: backend.toolId,
    ecosystem: "crystal",
    stackParts: undefined,
  } as Partial<ProjectConfig>);
}
