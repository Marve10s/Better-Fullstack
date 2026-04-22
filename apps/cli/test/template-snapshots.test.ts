import { describe, expect, it } from "bun:test";

import type { ProjectConfig } from "../src/types";

import { createVirtual } from "../src/index";
import { treeToSnapshot, treeToFileList } from "./snapshot-utils";

/**
 * Minimal configs representing key template combinations
 * We don't need exhaustive coverage - validation tests do that.
 * Snapshots catch CHANGES to a representative set.
 */
const SNAPSHOT_CONFIGS: Array<{
  name: string;
  config: Partial<ProjectConfig>;
}> = [
  // === FRONTEND VARIATIONS ===
  {
    name: "tanstack-router-minimal",
    config: {
      frontend: ["tanstack-router"],
      backend: "hono",
      api: "trpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
    },
  },
  {
    name: "next-self-fullstack",
    config: {
      frontend: ["next"],
      backend: "self",
      api: "trpc",
      database: "postgres",
      orm: "drizzle",
      auth: "better-auth",
    },
  },
  {
    name: "astro-react-integration",
    config: {
      frontend: ["astro"],
      astroIntegration: "react",
      backend: "self",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
    },
  },
  {
    name: "nuxt-standalone",
    config: {
      frontend: ["nuxt"],
      backend: "self",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
    },
  },

  // === BACKEND VARIATIONS ===
  {
    name: "express-node-trpc",
    config: {
      frontend: ["tanstack-router"],
      backend: "express",
      runtime: "node",
      api: "trpc",
      database: "postgres",
      orm: "prisma",
      auth: "none",
    },
  },
  {
    name: "hono-bun-orpc",
    config: {
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
    },
  },

  // === AUTH VARIATIONS ===
  {
    name: "better-auth-full",
    config: {
      frontend: ["tanstack-router"],
      backend: "hono",
      api: "trpc",
      database: "postgres",
      orm: "drizzle",
      auth: "better-auth",
    },
  },
  {
    name: "convex-clerk",
    config: {
      frontend: ["tanstack-router"],
      backend: "convex",
      auth: "clerk",
      api: "none",
      database: "none",
      orm: "none",
    },
  },
  {
    name: "self-next-clerk",
    config: {
      frontend: ["next"],
      backend: "self",
      auth: "clerk",
      api: "trpc",
      database: "sqlite",
      orm: "drizzle",
    },
  },
  {
    name: "self-tanstack-start-clerk",
    config: {
      frontend: ["tanstack-start"],
      backend: "self",
      auth: "clerk",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
    },
  },

  // === DATABASE/ORM VARIATIONS ===
  {
    name: "mongodb-mongoose",
    config: {
      frontend: ["tanstack-router"],
      backend: "hono",
      api: "trpc",
      database: "mongodb",
      orm: "mongoose",
      auth: "none",
    },
  },
  {
    name: "postgres-prisma",
    config: {
      frontend: ["tanstack-router"],
      backend: "hono",
      api: "trpc",
      database: "postgres",
      orm: "prisma",
      auth: "none",
    },
  },

  // === SEARCH VARIATIONS ===
  {
    name: "algolia-search-hono",
    config: {
      frontend: ["tanstack-router"],
      backend: "hono",
      api: "trpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      search: "algolia",
    },
  },

  // === SPECIAL CASES ===
  {
    name: "frontend-only-no-backend",
    config: {
      frontend: ["tanstack-router"],
      backend: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
    },
  },
  {
    name: "native-react-native",
    config: {
      frontend: ["native-bare"],
      backend: "hono",
      api: "trpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
    },
  },
  {
    name: "java-spring-boot-jpa-security",
    config: {
      ecosystem: "java",
      javaWebFramework: "spring-boot",
      javaBuildTool: "gradle",
      javaOrm: "spring-data-jpa",
      javaAuth: "spring-security",
      javaLibraries: ["spring-actuator", "flyway"],
      javaTestingLibraries: ["junit5", "mockito"],
    },
  },
];

// Default values to fill in missing config options
const DEFAULT_CONFIG: Partial<ProjectConfig> = {
  ecosystem: "typescript",
  runtime: "bun",
  payments: "none",
  addons: ["none"],
  examples: ["none"],
  dbSetup: "none",
  webDeploy: "none",
  serverDeploy: "none",
  cssFramework: "tailwind",
  uiLibrary: "none",
  effect: "none",
  email: "none",
  fileUpload: "none",
  stateManagement: "none",
  forms: "none",
  testing: "none",
  validation: "zod",
  realtime: "none",
  animation: "none",
  logging: "none",
  observability: "none",
  caching: "none",
  cms: "none",
  ai: "none",
  jobQueue: "none",
};

describe("Template Snapshots", () => {
  describe("File Structure Snapshots", () => {
    for (const { name, config } of SNAPSHOT_CONFIGS) {
      it(`file structure: ${name}`, async () => {
        const result = await createVirtual({
          projectName: `snapshot-${name}`,
          ...DEFAULT_CONFIG,
          ...config,
        });

        expect(result.success).toBe(true);
        expect(result.tree).toBeDefined();

        const fileList = treeToFileList(result.tree!);
        expect(fileList).toMatchSnapshot();
      });
    }
  });

  describe("Key File Content Snapshots", () => {
    for (const { name, config } of SNAPSHOT_CONFIGS) {
      it(`key files: ${name}`, async () => {
        const result = await createVirtual({
          projectName: `snapshot-${name}`,
          ...DEFAULT_CONFIG,
          ...config,
        });

        expect(result.success).toBe(true);
        expect(result.tree).toBeDefined();

        const snapshot = treeToSnapshot(result.tree!);
        expect(snapshot).toMatchSnapshot();
      });
    }
  });
});

describe("Template Snapshots - Rust Ecosystem", () => {
  const RUST_CONFIGS = [
    {
      name: "axum-leptos-seaorm",
      config: {
        ecosystem: "rust" as const,
        rustWebFramework: "axum" as const,
        rustFrontend: "leptos" as const,
        rustOrm: "sea-orm" as const,
        rustApi: "none" as const,
        rustCli: "none" as const,
        rustLibraries: ["serde"] as const,
      },
    },
    {
      name: "actix-dioxus-sqlx",
      config: {
        ecosystem: "rust" as const,
        rustWebFramework: "actix-web" as const,
        rustFrontend: "dioxus" as const,
        rustOrm: "sqlx" as const,
        rustApi: "none" as const,
        rustCli: "none" as const,
        rustLibraries: ["serde", "validator"] as const,
      },
    },
    {
      name: "cli-clap",
      config: {
        ecosystem: "rust" as const,
        rustWebFramework: "none" as const,
        rustFrontend: "none" as const,
        rustOrm: "none" as const,
        rustApi: "none" as const,
        rustCli: "clap" as const,
        rustLibraries: [] as const,
      },
    },
    {
      name: "axum-envlogger",
      config: {
        ecosystem: "rust" as const,
        rustWebFramework: "axum" as const,
        rustFrontend: "none" as const,
        rustOrm: "sqlx" as const,
        rustApi: "none" as const,
        rustCli: "none" as const,
        rustLogging: "env-logger" as const,
        rustLibraries: ["serde"] as const,
      },
    },
    {
      name: "axum-eyre",
      config: {
        ecosystem: "rust" as const,
        rustWebFramework: "axum" as const,
        rustFrontend: "none" as const,
        rustOrm: "none" as const,
        rustApi: "none" as const,
        rustCli: "none" as const,
        rustErrorHandling: "eyre" as const,
        rustLibraries: ["serde"] as const,
      },
    },
    {
      name: "rocket-seaorm",
      config: {
        ecosystem: "rust" as const,
        rustWebFramework: "rocket" as const,
        rustFrontend: "none" as const,
        rustOrm: "sea-orm" as const,
        rustApi: "none" as const,
        rustCli: "none" as const,
        rustLibraries: ["serde"] as const,
      },
    },
  ];

  describe("Rust File Structure Snapshots", () => {
    for (const { name, config } of RUST_CONFIGS) {
      it(`file structure: ${name}`, async () => {
        const result = await createVirtual({
          projectName: `snapshot-rust-${name}`,
          ...config,
        });

        expect(result.success).toBe(true);
        expect(result.tree).toBeDefined();

        const fileList = treeToFileList(result.tree!);
        expect(fileList).toMatchSnapshot();
      });
    }
  });

  describe("Rust Key File Content Snapshots", () => {
    for (const { name, config } of RUST_CONFIGS) {
      it(`key files: ${name}`, async () => {
        const result = await createVirtual({
          projectName: `snapshot-rust-${name}`,
          ...config,
        });

        expect(result.success).toBe(true);
        expect(result.tree).toBeDefined();

        const snapshot = treeToSnapshot(result.tree!);
        expect(snapshot).toMatchSnapshot();
      });
    }
  });
});

describe("Template Snapshots - Go Ecosystem", () => {
  const GO_CONFIGS = [
    {
      name: "gin-gorm-zap",
      config: {
        ecosystem: "go" as const,
        goWebFramework: "gin" as const,
        goOrm: "gorm" as const,
        goApi: "none" as const,
        goCli: "none" as const,
        goLogging: "zap" as const,
        goAuth: "none" as const,
      },
    },
    {
      name: "echo-sqlc-grpc",
      config: {
        ecosystem: "go" as const,
        goWebFramework: "echo" as const,
        goOrm: "sqlc" as const,
        goApi: "grpc-go" as const,
        goCli: "none" as const,
        goLogging: "none" as const,
        goAuth: "none" as const,
      },
    },
    {
      name: "fiber-gorm-zap",
      config: {
        ecosystem: "go" as const,
        goWebFramework: "fiber" as const,
        goOrm: "gorm" as const,
        goApi: "none" as const,
        goCli: "none" as const,
        goLogging: "zap" as const,
        goAuth: "none" as const,
      },
    },
    {
      name: "chi-gorm",
      config: {
        ecosystem: "go" as const,
        goWebFramework: "chi" as const,
        goOrm: "gorm" as const,
        goApi: "none" as const,
        goCli: "none" as const,
        goLogging: "none" as const,
        goAuth: "none" as const,
      },
    },
    {
      name: "cli-cobra",
      config: {
        ecosystem: "go" as const,
        goWebFramework: "none" as const,
        goOrm: "none" as const,
        goApi: "none" as const,
        goCli: "cobra" as const,
        goLogging: "none" as const,
        goAuth: "none" as const,
      },
    },
    {
      name: "gin-gorm-zerolog",
      config: {
        ecosystem: "go" as const,
        goWebFramework: "gin" as const,
        goOrm: "gorm" as const,
        goApi: "none" as const,
        goCli: "none" as const,
        goLogging: "zerolog" as const,
        goAuth: "none" as const,
      },
    },
    {
      name: "echo-sqlc-slog",
      config: {
        ecosystem: "go" as const,
        goWebFramework: "echo" as const,
        goOrm: "sqlc" as const,
        goApi: "none" as const,
        goCli: "none" as const,
        goLogging: "slog" as const,
        goAuth: "none" as const,
      },
    },
    {
      name: "gin-casbin",
      config: {
        ecosystem: "go" as const,
        goWebFramework: "gin" as const,
        goOrm: "none" as const,
        goApi: "none" as const,
        goCli: "none" as const,
        goLogging: "zap" as const,
        goAuth: "casbin" as const,
      },
    },
    {
      name: "echo-jwt-auth",
      config: {
        ecosystem: "go" as const,
        goWebFramework: "echo" as const,
        goOrm: "none" as const,
        goApi: "none" as const,
        goCli: "none" as const,
        goLogging: "none" as const,
        goAuth: "jwt" as const,
      },
    },
  ];

  describe("Go File Structure Snapshots", () => {
    for (const { name, config } of GO_CONFIGS) {
      it(`file structure: ${name}`, async () => {
        const result = await createVirtual({
          projectName: `snapshot-go-${name}`,
          ...config,
        });

        expect(result.success).toBe(true);
        expect(result.tree).toBeDefined();

        const fileList = treeToFileList(result.tree!);
        expect(fileList).toMatchSnapshot();
      });
    }
  });

  describe("Go Key File Content Snapshots", () => {
    for (const { name, config } of GO_CONFIGS) {
      it(`key files: ${name}`, async () => {
        const result = await createVirtual({
          projectName: `snapshot-go-${name}`,
          ...config,
        });

        expect(result.success).toBe(true);
        expect(result.tree).toBeDefined();

        const snapshot = treeToSnapshot(result.tree!);
        expect(snapshot).toMatchSnapshot();
      });
    }
  });
});

describe("Template Snapshots - Python Ecosystem", () => {
  const PYTHON_CONFIGS = [
    {
      name: "fastapi-sqlalchemy-celery",
      config: {
        ecosystem: "python" as const,
        pythonWebFramework: "fastapi" as const,
        pythonOrm: "sqlalchemy" as const,
        pythonValidation: "pydantic" as const,
        pythonAi: [] as const,
        pythonTaskQueue: "celery" as const,
        pythonGraphql: "none" as const,
        pythonQuality: "ruff" as const,
      },
    },
    {
      name: "django-sqlmodel-langchain",
      config: {
        ecosystem: "python" as const,
        pythonWebFramework: "django" as const,
        pythonOrm: "sqlmodel" as const,
        pythonValidation: "pydantic" as const,
        pythonAi: ["langchain"] as const,
        pythonTaskQueue: "none" as const,
        pythonGraphql: "none" as const,
        pythonQuality: "ruff" as const,
      },
    },
    {
      name: "fastapi-ai-multi",
      config: {
        ecosystem: "python" as const,
        pythonWebFramework: "fastapi" as const,
        pythonOrm: "none" as const,
        pythonValidation: "pydantic" as const,
        pythonAi: ["openai-sdk", "anthropic-sdk"] as const,
        pythonTaskQueue: "none" as const,
        pythonGraphql: "none" as const,
        pythonQuality: "none" as const,
      },
    },
    {
      name: "flask-pydantic-ruff",
      config: {
        ecosystem: "python" as const,
        pythonWebFramework: "flask" as const,
        pythonOrm: "none" as const,
        pythonValidation: "pydantic" as const,
        pythonAi: [] as const,
        pythonTaskQueue: "none" as const,
        pythonGraphql: "none" as const,
        pythonQuality: "ruff" as const,
      },
    },
    {
      name: "litestar-pydantic-ruff",
      config: {
        ecosystem: "python" as const,
        pythonWebFramework: "litestar" as const,
        pythonOrm: "none" as const,
        pythonValidation: "pydantic" as const,
        pythonAi: [] as const,
        pythonTaskQueue: "none" as const,
        pythonGraphql: "none" as const,
        pythonQuality: "ruff" as const,
      },
    },
    {
      name: "fastapi-tortoise-orm",
      config: {
        ecosystem: "python" as const,
        pythonWebFramework: "fastapi" as const,
        pythonOrm: "tortoise-orm" as const,
        pythonValidation: "none" as const,
        pythonAi: [] as const,
        pythonTaskQueue: "none" as const,
        pythonGraphql: "none" as const,
        pythonQuality: "none" as const,
      },
    },
  ];

  describe("Python File Structure Snapshots", () => {
    for (const { name, config } of PYTHON_CONFIGS) {
      it(`file structure: ${name}`, async () => {
        const result = await createVirtual({
          projectName: `snapshot-python-${name}`,
          ...config,
        });

        expect(result.success).toBe(true);
        expect(result.tree).toBeDefined();

        const fileList = treeToFileList(result.tree!);
        expect(fileList).toMatchSnapshot();
      });
    }
  });

  describe("Python Key File Content Snapshots", () => {
    for (const { name, config } of PYTHON_CONFIGS) {
      it(`key files: ${name}`, async () => {
        const result = await createVirtual({
          projectName: `snapshot-python-${name}`,
          ...config,
        });

        expect(result.success).toBe(true);
        expect(result.tree).toBeDefined();

        const snapshot = treeToSnapshot(result.tree!);
        expect(snapshot).toMatchSnapshot();
      });
    }
  });
});
