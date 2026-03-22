import type { ProjectConfig } from "@better-fullstack/types";
import { Array as Arr, Data, Option, pipe } from "effect";

export class PreflightWarning extends Data.Class<{
  readonly ruleId: string;
  readonly featureDisplayName: string;
  readonly featureKey: keyof ProjectConfig;
  readonly selectedValue: string | string[];
  readonly reason: string;
  readonly suggestions: readonly string[];
}> {}

export class PreflightResult extends Data.Class<{
  readonly warnings: readonly PreflightWarning[];
}> {
  get hasWarnings(): boolean {
    return this.warnings.length > 0;
  }
}

interface PreflightRule {
  readonly id: string;
  readonly featureKey: keyof ProjectConfig;
  readonly displayName: string;
  readonly willSkip: (config: ProjectConfig) => boolean;
  readonly reason: string;
  readonly suggestions: readonly string[];
}

const REACT_FRONTENDS = new Set([
  "tanstack-router",
  "react-router",
  "react-vite",
  "tanstack-start",
  "next",
]);

const SOLID_FRONTENDS = new Set(["solid", "solid-start"]);

const hasReact = (f: readonly string[]) => f.some((x) => REACT_FRONTENDS.has(x));
const hasSvelte = (f: readonly string[]) => f.includes("svelte");
const hasNuxt = (f: readonly string[]) => f.includes("nuxt");
const hasSolid = (f: readonly string[]) => f.some((x) => SOLID_FRONTENDS.has(x));
const hasAnyWebFrontend = (f: readonly string[]) =>
  hasReact(f) || hasSvelte(f) || hasNuxt(f) || hasSolid(f);

const needsStandaloneServer = (backend: string) =>
  backend === "convex" || backend === "none" || backend === "self";

const needsAnyServer = (backend: string) =>
  backend === "convex" || backend === "none";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const serverFeature = (
  id: string,
  featureKey: keyof ProjectConfig,
  displayName: string,
): PreflightRule => ({
  id,
  featureKey,
  displayName,
  willSkip: (c) => (c[featureKey] as string) !== "none" && needsStandaloneServer(c.backend),
  reason: `${displayName} requires a standalone server backend (e.g., Hono, Express).`,
  suggestions: ["Switch to a standalone backend like Hono", `Remove ${displayName.toLowerCase()}`],
});

const backendFeature = (
  id: string,
  featureKey: keyof ProjectConfig,
  displayName: string,
): PreflightRule => ({
  id,
  featureKey,
  displayName,
  willSkip: (c) => (c[featureKey] as string) !== "none" && needsAnyServer(c.backend),
  reason: `${displayName} requires a backend server. Convex and no-backend modes are not supported.`,
  suggestions: ["Switch to a server backend like Hono or a fullstack framework", `Remove ${displayName.toLowerCase()}`],
});

const PREFLIGHT_RULES: readonly PreflightRule[] = [
  serverFeature("search-no-server", "search", "Search"),
  serverFeature("file-storage-no-server", "fileStorage", "File Storage"),
  serverFeature("job-queue-no-server", "jobQueue", "Job Queue"),

  backendFeature("email-no-backend", "email", "Email"),
  backendFeature("logging-no-backend", "logging", "Logging"),
  backendFeature("observability-no-backend", "observability", "Observability"),

  ...["payload", "sanity", "strapi", "tinacms"].map(
    (name): PreflightRule => ({
      id: `cms-${name}-requires-nextjs`,
      featureKey: "cms",
      displayName: `CMS (${capitalize(name)})`,
      willSkip: (c) => c.cms === name && !c.frontend.includes("next"),
      reason: `${capitalize(name)} CMS currently requires Next.js.`,
      suggestions: ["Add Next.js as your frontend", "Remove CMS"],
    }),
  ),

  {
    id: "payments-skipped-convex",
    featureKey: "payments",
    displayName: "Payments",
    willSkip: (c) => c.payments !== "none" && c.backend === "convex",
    reason: "Payments is not supported with the Convex backend.",
    suggestions: ["Switch to a standalone backend like Hono", "Remove payments"],
  },

  {
    id: "analytics-no-frontend",
    featureKey: "analytics",
    displayName: "Analytics",
    willSkip: (c) => c.analytics !== "none" && !hasAnyWebFrontend(c.frontend),
    reason: "Analytics requires a React, Svelte, Nuxt, or Solid frontend.",
    suggestions: ["Add a supported web frontend", "Remove analytics"],
  },

  {
    id: "feature-flags-fully-skipped",
    featureKey: "featureFlags",
    displayName: "Feature Flags",
    willSkip: (c) => {
      if (c.featureFlags === "none") return false;
      const react = hasReact(c.frontend);
      const standalone = !needsStandaloneServer(c.backend);
      const selfReact = c.backend === "self" && react;
      return !react && !standalone && !selfReact;
    },
    reason: "Feature Flags require a React frontend or standalone server backend.",
    suggestions: ["Add a React frontend", "Switch to a standalone backend", "Remove feature flags"],
  },

  {
    id: "api-skipped-convex",
    featureKey: "api",
    displayName: "API Layer",
    willSkip: (c) => c.api !== "none" && c.backend === "convex",
    reason: "Convex provides its own API layer.",
    suggestions: ["Switch to a standalone backend for a custom API layer", "Remove API selection"],
  },

  {
    id: "database-no-orm",
    featureKey: "database",
    displayName: "Database",
    willSkip: (c) =>
      c.database !== "none" &&
      c.database !== "edgedb" &&
      c.database !== "redis" &&
      c.backend !== "convex" &&
      c.orm === "none",
    reason: "This database requires an ORM to generate setup templates. EdgeDB and Redis work without one.",
    suggestions: ["Select an ORM like Drizzle or Prisma", "Use EdgeDB or Redis instead", "Remove database"],
  },
];

const isFeatureSelected = (value: unknown): boolean => {
  if (value === "none" || value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0 && value[0] !== "none";
  return true;
};

const evaluateRule = (config: ProjectConfig) => (rule: PreflightRule): Option.Option<PreflightWarning> => {
  const value = config[rule.featureKey];
  if (!isFeatureSelected(value)) return Option.none();
  if (!rule.willSkip(config)) return Option.none();

  return Option.some(
    new PreflightWarning({
      ruleId: rule.id,
      featureDisplayName: rule.displayName,
      featureKey: rule.featureKey,
      selectedValue: value as string | string[],
      reason: rule.reason,
      suggestions: rule.suggestions,
    }),
  );
};

export const validatePreflightConfig = (config: ProjectConfig): PreflightResult =>
  pipe(
    PREFLIGHT_RULES,
    Arr.filterMap(evaluateRule(config)),
    (warnings) => new PreflightResult({ warnings }),
  );
