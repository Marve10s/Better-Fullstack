import { describe, expect, test } from "bun:test";
import type { ProjectConfig } from "@better-fullstack/types";
import { validatePreflightConfig } from "@better-fullstack/template-generator";

const BASE_CONFIG: ProjectConfig = {
  projectName: "test-app",
  projectDir: "/tmp/test-app",
  relativePath: "test-app",
  ecosystem: "typescript",
  frontend: ["tanstack-router"],
  backend: "hono",
  runtime: "bun",
  database: "sqlite",
  orm: "drizzle",
  api: "trpc",
  auth: "better-auth",
  payments: "none",
  email: "none",
  fileUpload: "none",
  effect: "none",
  stateManagement: "none",
  validation: "zod",
  forms: "react-hook-form",
  testing: "vitest",
  ai: "none",
  realtime: "none",
  jobQueue: "none",
  caching: "none",
  search: "none",
  fileStorage: "none",
  animation: "none",
  logging: "none",
  observability: "none",
  featureFlags: "none",
  analytics: "none",
  cms: "none",
  addons: ["turborepo"],
  examples: [],
  git: true,
  install: true,
  dbSetup: "none",
  webDeploy: "none",
  serverDeploy: "none",
  cssFramework: "tailwind",
  uiLibrary: "shadcn-ui",
  shadcnBase: "radix",
  shadcnStyle: "nova",
  shadcnIconLibrary: "lucide",
  shadcnColorTheme: "neutral",
  shadcnBaseColor: "neutral",
  shadcnFont: "inter",
  shadcnRadius: "default",
  packageManager: "bun",
  rustWebFramework: "none",
  rustFrontend: "none",
  rustOrm: "none",
  rustApi: "none",
  rustCli: "none",
  rustLibraries: [],
  pythonWebFramework: "fastapi",
  pythonOrm: "sqlalchemy",
  pythonValidation: "pydantic",
  pythonAi: [],
  pythonTaskQueue: "none",
  pythonQuality: "ruff",
  goWebFramework: "gin",
  goOrm: "gorm",
  goApi: "none",
  goCli: "none",
  goLogging: "none",
  aiDocs: ["claude-md"],
};

const config = (overrides: Partial<ProjectConfig>): ProjectConfig => ({
  ...BASE_CONFIG,
  ...overrides,
});

const ruleIds = (c: ProjectConfig) =>
  validatePreflightConfig(c).warnings.map((w) => w.ruleId);

describe("preflight validation", () => {
  test("valid default config produces no warnings", () => {
    const result = validatePreflightConfig(BASE_CONFIG);
    expect(result.hasWarnings).toBe(false);
    expect(result.warnings).toHaveLength(0);
  });

  describe("standalone server features (search, file storage, job queue)", () => {
    const features = [
      { key: "search", value: "meilisearch", ruleId: "search-no-server" },
      { key: "fileStorage", value: "s3", ruleId: "file-storage-no-server" },
      { key: "jobQueue", value: "bullmq", ruleId: "job-queue-no-server" },
    ] as const;

    for (const { key, value, ruleId } of features) {
      test(`${key} warns with convex backend`, () => {
        expect(ruleIds(config({ [key]: value, backend: "convex" }))).toContain(ruleId);
      });

      test(`${key} warns with self backend`, () => {
        expect(ruleIds(config({ [key]: value, backend: "self" }))).toContain(ruleId);
      });

      test(`${key} warns with no backend`, () => {
        expect(ruleIds(config({ [key]: value, backend: "none" }))).toContain(ruleId);
      });

      test(`${key} passes with hono backend`, () => {
        expect(ruleIds(config({ [key]: value, backend: "hono" }))).not.toContain(ruleId);
      });

      test(`${key}=none produces no warning`, () => {
        expect(ruleIds(config({ [key]: "none", backend: "convex" }))).not.toContain(ruleId);
      });
    }
  });

  describe("backend-required features (email, logging, observability)", () => {
    const features = [
      { key: "email", value: "resend", ruleId: "email-no-backend" },
      { key: "logging", value: "pino", ruleId: "logging-no-backend" },
      { key: "observability", value: "sentry", ruleId: "observability-no-backend" },
    ] as const;

    for (const { key, value, ruleId } of features) {
      test(`${key} warns with convex backend`, () => {
        expect(ruleIds(config({ [key]: value, backend: "convex" }))).toContain(ruleId);
      });

      test(`${key} warns with no backend`, () => {
        expect(ruleIds(config({ [key]: value, backend: "none" }))).toContain(ruleId);
      });

      test(`${key} passes with self backend`, () => {
        expect(ruleIds(config({ [key]: value, backend: "self" }))).not.toContain(ruleId);
      });

      test(`${key} passes with hono backend`, () => {
        expect(ruleIds(config({ [key]: value, backend: "hono" }))).not.toContain(ruleId);
      });
    }
  });

  describe("CMS requires Next.js", () => {
    for (const cms of ["payload", "sanity", "strapi", "tinacms"] as const) {
      const ruleId = `cms-${cms}-requires-nextjs`;

      test(`${cms} warns without Next.js frontend`, () => {
        expect(ruleIds(config({ cms, frontend: ["nuxt"] }))).toContain(ruleId);
      });

      test(`${cms} passes with Next.js frontend`, () => {
        expect(ruleIds(config({ cms, frontend: ["next"], backend: "self" }))).not.toContain(ruleId);
      });
    }
  });

  describe("payments", () => {
    test("warns with convex backend", () => {
      expect(ruleIds(config({ payments: "stripe", backend: "convex" }))).toContain(
        "payments-skipped-convex",
      );
    });

    test("passes with hono backend", () => {
      expect(ruleIds(config({ payments: "stripe", backend: "hono" }))).not.toContain(
        "payments-skipped-convex",
      );
    });
  });

  describe("analytics", () => {
    test("warns without supported frontend", () => {
      expect(
        ruleIds(config({ analytics: "plausible", frontend: ["astro"] })),
      ).toContain("analytics-no-frontend");
    });

    test("passes with React frontend", () => {
      expect(
        ruleIds(config({ analytics: "plausible", frontend: ["next"] })),
      ).not.toContain("analytics-no-frontend");
    });

    test("passes with Svelte frontend", () => {
      expect(
        ruleIds(config({ analytics: "umami", frontend: ["svelte"] })),
      ).not.toContain("analytics-no-frontend");
    });
  });

  describe("feature flags", () => {
    test("warns with no React frontend and no standalone backend", () => {
      expect(
        ruleIds(config({ featureFlags: "posthog", frontend: ["nuxt"], backend: "convex" })),
      ).toContain("feature-flags-fully-skipped");
    });

    test("passes with React frontend", () => {
      expect(
        ruleIds(config({ featureFlags: "posthog", frontend: ["next"] })),
      ).not.toContain("feature-flags-fully-skipped");
    });

    test("passes with standalone backend", () => {
      expect(
        ruleIds(config({ featureFlags: "posthog", frontend: ["nuxt"], backend: "hono" })),
      ).not.toContain("feature-flags-fully-skipped");
    });
  });

  describe("API layer", () => {
    test("warns with convex backend", () => {
      expect(ruleIds(config({ api: "trpc", backend: "convex" }))).toContain("api-skipped-convex");
    });

    test("passes with hono backend", () => {
      expect(ruleIds(config({ api: "trpc", backend: "hono" }))).not.toContain("api-skipped-convex");
    });
  });

  describe("database without ORM", () => {
    test("warns when SQL database has no ORM", () => {
      expect(ruleIds(config({ database: "postgres", orm: "none" }))).toContain("database-no-orm");
    });

    test("passes with ORM selected", () => {
      expect(ruleIds(config({ database: "postgres", orm: "drizzle" }))).not.toContain(
        "database-no-orm",
      );
    });

    test("passes for EdgeDB without ORM", () => {
      expect(ruleIds(config({ database: "edgedb", orm: "none" }))).not.toContain("database-no-orm");
    });

    test("passes for Redis without ORM", () => {
      expect(ruleIds(config({ database: "redis", orm: "none" }))).not.toContain("database-no-orm");
    });
  });

  describe("multiple simultaneous warnings", () => {
    test("convex backend triggers multiple warnings", () => {
      const ids = ruleIds(
        config({
          backend: "convex",
          search: "meilisearch",
          fileStorage: "s3",
          jobQueue: "bullmq",
          email: "resend",
          payments: "stripe",
          api: "trpc",
        }),
      );

      expect(ids).toContain("search-no-server");
      expect(ids).toContain("file-storage-no-server");
      expect(ids).toContain("job-queue-no-server");
      expect(ids).toContain("email-no-backend");
      expect(ids).toContain("payments-skipped-convex");
      expect(ids).toContain("api-skipped-convex");
    });
  });

  describe("warning structure", () => {
    test("warning contains all required fields", () => {
      const result = validatePreflightConfig(
        config({ search: "meilisearch", backend: "convex" }),
      );

      const warning = result.warnings.find((w) => w.ruleId === "search-no-server");
      expect(warning).toBeDefined();
      expect(warning!.featureDisplayName).toBe("Search");
      expect(warning!.featureKey).toBe("search");
      expect(warning!.selectedValue).toBe("meilisearch");
      expect(warning!.reason).toContain("standalone server backend");
      expect(warning!.suggestions.length).toBeGreaterThan(0);
    });
  });
});
