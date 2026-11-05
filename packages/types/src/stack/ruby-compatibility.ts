import type { ProjectConfig, StackPart } from "@/config/types";

import { getToolingCapability, isToolingOverlayOnly } from "@/capabilities/tooling-capabilities";

export const RUBY_RECIPE_EXTENSION_REASON =
  "The experimental Ruby recipe provides Sinatra, Rails, Roda, or Grape JSON HTTP, an optional SQLite ORM selected with rubyOrm, optional authentication selected with rubyAuth, Minitest, RSpec, or Test::Unit request tests selected with rubyTesting, request validation selected with rubyValidation, a Redis, Memcached, or in-process cache selected with rubyCache, Sidekiq, Resque, or Solid Queue background jobs selected with rubyJobQueue, Mail, Action Mailer, or Resend email selected with rubyEmail, Ruby Logger, Semantic Logger, Ougai, or Lograge request logging selected with rubyLogging, and a Faraday, HTTParty, or HTTPX upstream client selected with rubyHttpClient. Shared database, authentication, deployment, and other service adapters are not generated.";
export const RUBY_RECIPE_FRAMEWORK_REASON =
  "The Ruby HTTP recipe requires a web framework. Use rubyWebFramework=sinatra, rails, roda, or grape, or remove the Ruby backend.";

export const RUBY_OWNED_ROLES = ["orm", "auth", "testing", "validation", "caching", "jobQueue", "email", "logging", "httpClient"] as const satisfies readonly StackPart["role"][];

export const RUBY_OPTION_CATEGORIES = [
  "rubyOrm",
  "rubyAuth",
  "rubyTesting",
  "rubyValidation",
  "rubyCache",
  "rubyJobQueue",
  "rubyEmail",
  "rubyLogging",
  "rubyHttpClient",
] as const satisfies readonly (keyof ProjectConfig)[];

export function isRubyOwnedRole(role: StackPart["role"]): boolean {
  return RUBY_OWNED_ROLES.some((entry) => entry === role);
}

type RubyOptionCategory = (typeof RUBY_OPTION_CATEGORIES)[number];
type RubyOptionRule = { label: string; frameworks: readonly string[]; orms?: readonly string[] };

const RUBY_FRAMEWORK_LABELS: Record<string, string> = {
  sinatra: "Sinatra",
  rails: "Rails",
  roda: "Roda",
  grape: "Grape",
};
const RUBY_ORM_LABELS: Record<string, string> = {
  "active-record": "Active Record",
  sequel: "Sequel",
  rom: "ROM",
};

export const RUBY_OPTION_RULES: Partial<
  Record<RubyOptionCategory, { role: StackPart["role"]; options: Record<string, RubyOptionRule> }>
> = {
  rubyJobQueue: {
    role: "jobQueue",
    options: {
      resque: { label: "Resque", frameworks: ["sinatra", "rails", "roda"] },
      "solid-queue": { label: "Solid Queue", frameworks: ["rails"], orms: ["active-record"] },
    },
  },
  rubyEmail: {
    role: "email",
    options: {
      "action-mailer": { label: "Action Mailer", frameworks: ["rails"] },
    },
  },
  rubyLogging: {
    role: "logging",
    options: {
      lograge: { label: "Lograge", frameworks: ["rails"] },
    },
  },
};

export function getRubyOptionIssue(
  category: string,
  optionId: string | undefined,
  framework: string | undefined,
  orm: string | undefined,
): string | null {
  const options: Record<string, RubyOptionRule> | undefined =
    RUBY_OPTION_RULES[category as RubyOptionCategory]?.options;
  const rule = optionId ? options?.[optionId] : undefined;
  if (!rule) return null;
  if (!rule.frameworks.includes(framework ?? "none")) {
    const names = rule.frameworks.map((id) => RUBY_FRAMEWORK_LABELS[id] ?? id);
    const frameworks =
      names.length > 1 ? `${names.slice(0, -1).join(", ")} or ${names.at(-1)}` : names[0];
    return `${rule.label} requires Ruby ${frameworks}.`;
  }
  if (rule.orms && !rule.orms.includes(orm ?? "none")) {
    const orms = rule.orms.map((id) => RUBY_ORM_LABELS[id] ?? id).join(" or ");
    return `${rule.label} requires the ${orms} ORM.`;
  }
  return null;
}

export function getRubyOwnedToolIssue(
  role: StackPart["role"],
  toolId: string,
  framework: string | undefined,
  orm: string | undefined,
): string | null {
  const category = Object.entries(RUBY_OPTION_RULES).find(([, rule]) => rule.role === role)?.[0];
  return category ? getRubyOptionIssue(category, toolId, framework, orm) : null;
}

function getRubyOwnedPartIssue(
  parts: readonly StackPart[],
  backend: Pick<StackPart, "id" | "toolId">,
): string | null {
  const owned = parts.filter((part) => part.ownerPartId === backend.id && part.ecosystem === "ruby");
  const orm = owned.find((part) => part.role === "orm")?.toolId;
  for (const [category, { role }] of Object.entries(RUBY_OPTION_RULES)) {
    const part = owned.find((entry) => entry.role === role);
    const issue = getRubyOptionIssue(category, part?.toolId, backend.toolId, orm);
    if (issue) return issue;
  }
  return null;
}

export const RUBY_UNSUPPORTED_CONFIG_KEYS = [
  "database",
  "dbSetup",
  "orm",
  "auth",
  "api",
  "backend",
  "runtime",
  "payments",
  "email",
  "fileUpload",
  "logging",
  "observability",
  "featureFlags",
  "integrations",
  "ecommerce",
  "analytics",
  "webMcp",
  "ai",
  "stateManagement",
  "forms",
  "testing",
  "validation",
  "realtime",
  "jobQueue",
  "animation",
  "cms",
  "caching",
  "rateLimit",
  "botProtection",
  "i18n",
  "search",
  "vectorDb",
  "fileStorage",
  "webDeploy",
  "serverDeploy",
  "cssFramework",
  "uiLibrary",
  "effect",
  "mobileNavigation",
  "mobileUI",
  "mobileStorage",
  "mobileTesting",
  "mobilePush",
  "mobileOTA",
  "mobileDeepLinking",
  "mobileLibraries",
  "frontend",
  "addons",
  "examples",
] as const satisfies readonly (keyof ProjectConfig)[];

export function getRubyDatabaseSelectionIssue(
  parts: readonly (Pick<StackPart, "role" | "ecosystem" | "toolId"> &
    Partial<Pick<StackPart, "source">>)[],
): string | null {
  const backends = parts.filter((part) => part.role === "backend" && part.toolId !== "none");
  const hasRubyBackend = backends.some(
    (part) => part.ecosystem === "ruby" && part.source !== "provided",
  );
  const hasOtherBackend = backends.some(
    (part) => !["ruby", "php", "crystal"].includes(part.ecosystem),
  );
  const hasSelectedDatabase = parts.some(
    (part) => part.role === "database" && part.toolId !== "none" && part.source !== "provided",
  );
  return hasRubyBackend && !hasOtherBackend && hasSelectedDatabase
    ? RUBY_RECIPE_EXTENSION_REASON
    : null;
}

export function getRubyRecipeIssue(config: Partial<ProjectConfig>): string | null {
  if (config.stackParts?.length && !isToolingOverlayOnly(config.stackParts)) {
    const databaseIssue = getRubyDatabaseSelectionIssue(config.stackParts);
    if (databaseIssue) return databaseIssue;
    const rubyBackends = config.stackParts.filter(
      (part) => part.role === "backend" && part.ecosystem === "ruby" && part.source !== "provided",
    );
    const rubyIds = new Set(rubyBackends.map((part) => part.id));
    if (rubyBackends.some((part) => part.toolId === "none")) return RUBY_RECIPE_FRAMEWORK_REASON;
    for (const backend of rubyBackends) {
      const issue = getRubyOwnedPartIssue(config.stackParts, backend);
      if (issue) return issue;
    }
    if (
      config.stackParts.some(
        (part) =>
          part.source !== "provided" &&
          !(
            part.ecosystem === "ruby" &&
            isRubyOwnedRole(part.role) &&
            (!part.ownerPartId || rubyIds.has(part.ownerPartId))
          ) &&
          ((part.ownerPartId && rubyIds.has(part.ownerPartId)) ||
            (part.ecosystem === "ruby" && part.role !== "backend")),
      )
    )
      return RUBY_RECIPE_EXTENSION_REASON;
    const hasJavaScriptApplication = config.stackParts.some(
      (part) =>
        !part.ownerPartId &&
        part.toolId !== "none" &&
        ["frontend", "backend", "mobile"].includes(part.role) &&
        ["typescript", "react-native"].includes(part.ecosystem) &&
        part.source !== "provided",
    );
    if (
      rubyBackends.length > 0 &&
      !hasJavaScriptApplication &&
      config.stackParts.some(
        (part) => part.source !== "provided" && getToolingCapability(part.toolId),
      )
    )
      return RUBY_RECIPE_EXTENSION_REASON;
    return null;
  }
  if (config.ecosystem !== "ruby") return null;
  if (config.stackParts?.some((part) => part.source !== "provided"))
    return RUBY_RECIPE_EXTENSION_REASON;
  if (config.rubyWebFramework === "none") return RUBY_RECIPE_FRAMEWORK_REASON;
  for (const key of RUBY_UNSUPPORTED_CONFIG_KEYS) {
    const value = config[key];
    if (
      Array.isArray(value)
        ? value.some((entry) => entry !== "none")
        : value !== undefined && value !== "none"
    )
      return RUBY_RECIPE_EXTENSION_REASON;
  }
  for (const category of RUBY_OPTION_CATEGORIES) {
    const issue = getRubyOptionIssue(category, config[category], config.rubyWebFramework, config.rubyOrm);
    if (issue) return issue;
  }
  return null;
}

export function createRubyProjectConfigDefaults(): Partial<ProjectConfig> {
  return Object.fromEntries(
    RUBY_UNSUPPORTED_CONFIG_KEYS.map((key) => [
      key,
      ["frontend", "addons", "examples", "mobileLibraries"].includes(key) ? [] : "none",
    ]).concat([
      ["rubyWebFramework", "sinatra"],
      ["rubyOrm", "none"],
      ["rubyAuth", "none"],
      ["rubyTesting", "minitest"],
      ["rubyValidation", "none"],
      ["rubyCache", "none"],
      ["rubyJobQueue", "none"],
      ["rubyEmail", "none"],
      ["rubyLogging", "logger"],
      ["rubyHttpClient", "none"],
    ]),
  );
}
