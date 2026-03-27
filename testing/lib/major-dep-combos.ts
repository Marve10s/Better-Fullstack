import * as path from "node:path";
import type { ProjectConfig } from "@better-fullstack/types";

import { buildHistoryFingerprint, fingerprintToKey } from "./generate-combos/fingerprint";
import { buildCommand } from "./generate-combos/render";
import type { ComboCandidate } from "./generate-combos/types";
import { makeBaseConfig } from "./presets";

// ── Types ───────────────────────────────────────────────────────────────

type PackageComboRule = {
  /** Packages that trigger this rule (any match suffices). Supports `*` glob suffix. */
  packages: string[];
  /** Partial ProjectConfig merged onto makeBaseConfig() */
  configOverrides: Partial<ProjectConfig>;
  /** Human-readable combo label */
  label: string;
  /** Higher = more important (1-10) */
  priority: number;
};

export type MajorDepInfo = {
  name: string;
  oldMajor: number;
  newMajor: number;
};

// ── Mapping Table ───────────────────────────────────────────────────────

const MAX_COMBOS = 15;

const PACKAGE_COMBO_RULES: PackageComboRule[] = [
  {
    packages: ["astro", "@astrojs/*"],
    label: "astro-react",
    priority: 9,
    configOverrides: {
      frontend: ["astro"],
      astroIntegration: "react",
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      cssFramework: "tailwind",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["@angular/*"],
    label: "angular",
    priority: 8,
    configOverrides: {
      frontend: ["angular"],
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["vitest", "@vitest/*"],
    label: "vitest-react",
    priority: 8,
    configOverrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      testing: "vitest",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["storybook", "@storybook/*"],
    label: "storybook-react",
    priority: 7,
    configOverrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      addons: ["storybook"],
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["stripe", "@stripe/*"],
    label: "stripe-next",
    priority: 7,
    configOverrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      payments: "stripe",
      database: "sqlite",
      orm: "drizzle",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["mongoose"],
    label: "mongoose-next",
    priority: 7,
    configOverrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      database: "mongodb",
      orm: "mongoose",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["@clerk/*"],
    label: "clerk-next",
    priority: 8,
    configOverrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      auth: "clerk",
      database: "sqlite",
      orm: "drizzle",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["sanity", "next-sanity", "@sanity/*"],
    label: "sanity-next",
    priority: 6,
    configOverrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      cms: "sanity",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["streamdown"],
    label: "streamdown-ai",
    priority: 6,
    configOverrides: {
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      ai: "vercel-ai",
      examples: ["ai"],
      database: "sqlite",
      orm: "drizzle",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["langchain", "@langchain/*"],
    label: "langchain-hono",
    priority: 6,
    configOverrides: {
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      ai: "langchain",
      database: "sqlite",
      orm: "drizzle",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["resend"],
    label: "resend-email",
    priority: 5,
    configOverrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      email: "resend",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["nodemailer", "@types/nodemailer"],
    label: "nodemailer-email",
    priority: 5,
    configOverrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      email: "nodemailer",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["pino", "pino-http"],
    label: "pino-logging",
    priority: 5,
    configOverrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      logging: "pino",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["@sentry/*"],
    label: "sentry-obs",
    priority: 6,
    configOverrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      observability: "sentry",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["inngest"],
    label: "inngest-jobs",
    priority: 5,
    configOverrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      jobQueue: "inngest",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["@mikro-orm/*"],
    label: "mikroorm-hono",
    priority: 6,
    configOverrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "node",
      database: "sqlite",
      orm: "mikroorm",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["nanostores", "@nanostores/*"],
    label: "nanostores-react",
    priority: 4,
    configOverrides: {
      frontend: ["react-vite"],
      stateManagement: "nanostores",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["cypress"],
    label: "cypress-test",
    priority: 5,
    configOverrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      testing: "cypress",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["@paddle/*"],
    label: "paddle-next",
    priority: 5,
    configOverrides: {
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      payments: "paddle",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["mailgun.js"],
    label: "mailgun-email",
    priority: 4,
    configOverrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      email: "mailgun",
    } as Partial<ProjectConfig>,
  },
  {
    packages: ["posthog-node", "posthog-js"],
    label: "posthog-analytics",
    priority: 4,
    configOverrides: {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      featureFlags: "posthog",
    } as Partial<ProjectConfig>,
  },
];

// ── Diff Parsing ────────────────────────────────────────────────────────

/**
 * Parse a git diff of add-deps.ts and return packages whose major version increased.
 *
 * Looks for paired `-` / `+` lines like:
 *   -  ai: "^6.0.3",
 *   +  ai: "^7.0.0",
 */
export function parseMajorUpdatesFromDiff(diffText: string): MajorDepInfo[] {
  const removedVersions = new Map<string, number>();
  const results: MajorDepInfo[] = [];

  // Match lines like:  -  "package": "^1.2.3",  or  -  package: "^1.2.3",
  const lineRegex = /^\s*[-+]\s*"?([^":\s]+)"?\s*:\s*"[\^~]?(\d+)\./gm;

  for (const match of diffText.matchAll(lineRegex)) {
    const fullLine = match[0];
    const pkg = match[1]!;
    const major = Number.parseInt(match[2]!, 10);

    if (fullLine.trimStart().startsWith("-")) {
      removedVersions.set(pkg, major);
    } else if (fullLine.trimStart().startsWith("+")) {
      const oldMajor = removedVersions.get(pkg);
      if (oldMajor !== undefined && major > oldMajor) {
        results.push({ name: pkg, oldMajor, newMajor: major });
      }
    }
  }

  return results;
}

// ── Combo Builder ───────────────────────────────────────────────────────

function packageMatchesRule(packageName: string, rulePattern: string): boolean {
  if (rulePattern.endsWith("/*")) {
    const prefix = rulePattern.slice(0, -2);
    return packageName.startsWith(prefix + "/") || packageName === prefix;
  }
  return packageName === rulePattern;
}

function ruleMatchesMajorPackages(rule: PackageComboRule, majorPackageNames: string[]): boolean {
  return rule.packages.some((pattern) =>
    majorPackageNames.some((pkg) => packageMatchesRule(pkg, pattern)),
  );
}

/**
 * Build the minimal set of ComboCandidate[] that cover the given major-update packages.
 */
export function buildMajorDepCombos(majorPackages: string[]): ComboCandidate[] {
  const majorNames = majorPackages.map((p) => (typeof p === "string" ? p : ""));

  const matchedRules = PACKAGE_COMBO_RULES.filter((rule) =>
    ruleMatchesMajorPackages(rule, majorNames),
  );

  // Sort by priority descending, cap at MAX_COMBOS
  matchedRules.sort((a, b) => b.priority - a.priority);
  const selected = matchedRules.slice(0, MAX_COMBOS);

  return selected.map((rule) => {
    const name = `major-${rule.label}`;
    const base = makeBaseConfig(name, "typescript");
    const config = {
      ...base,
      ...rule.configOverrides,
      projectName: name,
      projectDir: path.resolve(process.cwd(), name),
      relativePath: name,
    } as ProjectConfig;

    const fingerprint = buildHistoryFingerprint(config);
    const fingerprintKey = fingerprintToKey(fingerprint);

    return {
      ecosystem: "typescript" as const,
      name,
      config,
      fingerprint,
      fingerprintKey,
      command: buildCommand(name, config),
    };
  });
}

/**
 * Convenience: parse diff + build combos in one call.
 */
export function buildMajorDepCombosFromDiff(diffText: string): {
  packages: MajorDepInfo[];
  combos: ComboCandidate[];
} {
  const packages = parseMajorUpdatesFromDiff(diffText);
  const combos = buildMajorDepCombos(packages.map((p) => p.name));
  return { packages, combos };
}
