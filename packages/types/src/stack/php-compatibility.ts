import type { ProjectConfig } from "@/config/types";

export const PHP_RECIPE_REASONS = {
  framework:
    "The PHP recipe requires a web framework. Use --php-web-framework slim, laravel or symfony, or select another ecosystem.",
  database:
    "The PHP recipe does not generate database or migration integration. Use --database none.",
  capability:
    "The PHP recipe provides REST, Composer, ORM, auth, test runner, validation, cache, background job, email, logging and HTTP client choices; additional backend capabilities are not implemented.",
  owner: "PHP capabilities must belong to a PHP backend.",
} as const;

export const PHP_UNSUPPORTED_BACKEND_FIELDS = [
  "auth",
  "orm",
  "api",
  "email",
  "caching",
  "search",
  "observability",
  "jobQueue",
  "realtime",
  "payments",
  "serverDeploy",
  "dbSetup",
  "integrations",
  "vectorDb",
  "fileStorage",
  "fileUpload",
  "logging",
  "ai",
  "featureFlags",
  "rateLimit",
  "botProtection",
  "ecommerce",
] as const;

const PHP_FRAMEWORK_LABELS: Record<string, string> = {
  slim: "Slim",
  laravel: "Laravel",
  symfony: "Symfony",
};

const PHP_CAPABILITY_FRAMEWORKS: Record<string, Record<string, readonly string[]>> = {
  orm: {
    eloquent: ["slim", "laravel"],
    doctrine: ["slim", "symfony"],
    cycle: ["slim"],
  },
  auth: {
    "firebase-jwt": ["slim", "laravel", "symfony"],
    "lcobucci-jwt": ["slim", "laravel", "symfony"],
    "symfony-security": ["symfony"],
  },
  testing: {
    phpunit: ["slim", "laravel", "symfony"],
    pest: ["slim", "laravel", "symfony"],
    codeception: ["slim", "laravel", "symfony"],
  },
  validation: {
    "symfony-validator": ["slim", "laravel", "symfony"],
    "respect-validation": ["slim", "laravel", "symfony"],
    "laravel-validation": ["laravel"],
  },
  caching: {
    "symfony-cache": ["slim", "laravel", "symfony"],
    "laminas-cache": ["slim", "laravel", "symfony"],
    predis: ["slim", "laravel", "symfony"],
    "laravel-cache": ["laravel"],
  },
  jobQueue: {
    "symfony-messenger": ["slim", "laravel", "symfony"],
    "enqueue-fs": ["slim", "laravel", "symfony"],
    "laravel-queue": ["laravel"],
  },
  email: {
    "symfony-mailer": ["slim", "laravel", "symfony"],
    phpmailer: ["slim", "laravel", "symfony"],
    "laravel-mail": ["laravel"],
  },
  logging: {
    monolog: ["slim"],
    "laravel-log": ["laravel"],
    "symfony-monolog": ["symfony"],
  },
  httpClient: {
    guzzle: ["slim", "laravel", "symfony"],
    "symfony-http-client": ["slim", "laravel", "symfony"],
    "httplug-curl": ["slim", "laravel", "symfony"],
  },
};

export const PHP_CAPABILITY_CATEGORIES = {
  phpOrm: { role: "orm", label: "PHP ORM" },
  phpAuth: { role: "auth", label: "PHP auth" },
  phpValidation: { role: "validation", label: "PHP validation" },
  phpCache: { role: "caching", label: "PHP cache" },
  phpJobQueue: { role: "jobQueue", label: "PHP background jobs" },
  phpEmail: { role: "email", label: "PHP email" },
  phpLogging: { role: "logging", label: "PHP logging" },
  phpHttpClient: { role: "httpClient", label: "PHP HTTP client" },
} as const;

export type PhpCapabilityCategory = keyof typeof PHP_CAPABILITY_CATEGORIES;

export function isPhpCapabilityCategory(category: string): category is PhpCapabilityCategory {
  return category in PHP_CAPABILITY_CATEGORIES;
}

const PHP_CAPABILITY_LABELS: Record<string, string> = {
  eloquent: "Eloquent",
  doctrine: "Doctrine ORM",
  cycle: "Cycle ORM",
  "symfony-security": "Symfony Security",
  "laravel-validation": "Laravel Validation",
  "laravel-cache": "Laravel Cache",
  "laravel-queue": "Laravel Queue",
  "laravel-mail": "Laravel Mail",
  monolog: "Monolog",
  "laravel-log": "Laravel logging",
  "symfony-monolog": "Symfony MonologBundle",
};

export function isPhpCapabilityRole(role: string): boolean {
  return role in PHP_CAPABILITY_FRAMEWORKS;
}

export function getPhpCapabilityIssue(
  framework: string | undefined,
  role: string,
  toolId: string | undefined,
): string | undefined {
  if (!toolId || !framework) return undefined;
  const frameworks = PHP_CAPABILITY_FRAMEWORKS[role]?.[toolId];
  if (!frameworks || frameworks.includes(framework)) return undefined;
  const supported = frameworks.map((id) => PHP_FRAMEWORK_LABELS[id] ?? id).join(" or ");
  return `${PHP_CAPABILITY_LABELS[toolId] ?? toolId} is generated for ${supported}, not ${PHP_FRAMEWORK_LABELS[framework] ?? framework}.`;
}

export function getPhpRecipeIssue(config: Partial<ProjectConfig>): string | undefined {
  if (
    config.ecosystem !== "php" ||
    config.stackParts?.some(
      (part) =>
        !part.ownerPartId && ["frontend", "backend", "mobile", "database"].includes(part.role),
    )
  )
    return undefined;
  if (config.phpWebFramework === "none") return PHP_RECIPE_REASONS.framework;
  if (config.stackParts?.some((part) => part.source !== "provided"))
    return PHP_RECIPE_REASONS.capability;
  if (config.database && config.database !== "none") return PHP_RECIPE_REASONS.database;
  for (const [category, { role }] of Object.entries(PHP_CAPABILITY_CATEGORIES)) {
    const issue = getPhpCapabilityIssue(
      config.phpWebFramework,
      role,
      config[category as PhpCapabilityCategory],
    );
    if (issue) return issue;
  }
  for (const key of PHP_UNSUPPORTED_BACKEND_FIELDS) {
    if (config[key] && config[key] !== "none") return PHP_RECIPE_REASONS.capability;
  }
  if (
    config.addons?.some((addon) => addon !== "none") ||
    config.examples?.some((example) => example !== "none")
  )
    return PHP_RECIPE_REASONS.capability;
  return undefined;
}
