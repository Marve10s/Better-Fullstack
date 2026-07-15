import {
  getLocalWebDevPort,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";
import { validateConfigForProgrammaticUse } from "../src/utils/config-validation";
import { runWithContext } from "../src/utils/context";
import { getVirtualTreeFileContent, hasVirtualFile } from "./virtual-tree-utils";

const readTextFromTree = getVirtualTreeFileContent;

function validateElixirProgrammatic(config: Partial<ProjectConfig>) {
  return runWithContext({ silent: true }, () =>
    validateConfigForProgrammaticUse({
      projectName: "elixir-validation",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirHttpServer: "bandit",
      ...config,
    }),
  );
}

type PackageJsonShape = {
  packageManager?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  overrides?: Record<string, string>;
  resolutions?: Record<string, string>;
  pnpm?: {
    overrides?: Record<string, string>;
  };
};

function readJsonFromTree(
  tree: NonNullable<Awaited<ReturnType<typeof createVirtual>>["tree"]>,
  targetPath: string,
): PackageJsonShape | undefined {
  const content = getVirtualTreeFileContent(tree, targetPath);
  return content === undefined ? undefined : (JSON.parse(content) as PackageJsonShape);
}

function packageHasDependency(packageJson: PackageJsonShape | undefined, name: string): boolean {
  return Boolean(packageJson?.dependencies?.[name] ?? packageJson?.devDependencies?.[name]);
}

describe("Virtual Generator Regressions", () => {
  const packageManagers = ["npm", "pnpm", "bun", "yarn"] as const;

  it("rejects unsupported Warp APIs through programmatic validation", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          ecosystem: "rust",
          rustWebFramework: "warp",
          rustApi: "tonic",
        }),
      ),
    ).toThrow("Warp and Salvo currently support REST");
  });

  it("uses the canonical TanStack Router dev port in the generated Vite config", async () => {
    const result = await createVirtual({
      projectName: "tanstack-router-dev-port",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
    });

    expect(result.success).toBe(true);
    expect(readTextFromTree(result.tree!, "apps/web/vite.config.ts")).toContain(
      `port: ${getLocalWebDevPort(["tanstack-router"])}`,
    );
  });

  it("uses the canonical Solid dev port in the generated Vite config", async () => {
    const result = await createVirtual({
      projectName: "solid-dev-port",
      frontend: ["solid"],
      backend: "hono",
      runtime: "bun",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
    });

    expect(result.success).toBe(true);
    expect(readTextFromTree(result.tree!, "apps/web/vite.config.ts")).toContain(
      `port: ${getLocalWebDevPort(["solid"])}`,
    );
  });

  it("does not leak Mocha smoke tests into Playwright projects", async () => {
    const result = await createVirtual({
      projectName: "playwright-only",
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      testing: "playwright",
    });

    expect(result.success).toBe(true);
    expect(hasVirtualFile(result.tree!.root, "playwright.config.ts")).toBe(true);
    expect(hasVirtualFile(result.tree!.root, "apps/web/test/smoke.test.ts")).toBe(false);
    expect(hasVirtualFile(result.tree!.root, "apps/server/test/smoke.test.ts")).toBe(false);
  });

  for (const frontend of ["vanilla-vite", "vue"] as const) {
    it(`wires daisyUI, PWA, and framework-agnostic state for ${frontend}`, async () => {
      const result = await createVirtual({
        projectName: `${frontend}-integrations`,
        frontend: [frontend],
        backend: "none",
        runtime: "none",
        api: "none",
        database: "none",
        orm: "none",
        auth: "none",
        forms: "none",
        cssFramework: "tailwind",
        uiLibrary: "daisyui",
        stateManagement: "nanostores",
        addons: ["pwa"],
      });

      expect(result.success).toBe(true);
      const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");
      expect(packageHasDependency(webPackageJson, "nanostores")).toBe(true);
      expect(packageHasDependency(webPackageJson, "vite-plugin-pwa")).toBe(true);
      expect(packageHasDependency(webPackageJson, "@vite-pwa/assets-generator")).toBe(true);
      expect(readTextFromTree(result.tree!, "apps/web/src/style.css")).toContain(
        '@plugin "daisyui";',
      );
      expect(hasVirtualFile(result.tree!.root, "apps/web/pwa-assets.config.ts")).toBe(true);
    });
  }

  for (const packageManager of packageManagers) {
    it(`writes a concrete ${packageManager} packageManager version`, async () => {
      const result = await createVirtual({
        projectName: `pm-${packageManager}`,
        packageManager,
        frontend: ["tanstack-router"],
        backend: "hono",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
      });

      expect(result.success).toBe(true);

      const rootPackageJson = result.tree
        ? readJsonFromTree(result.tree, "package.json")
        : undefined;
      expect(rootPackageJson?.packageManager).toMatch(
        new RegExp(`^${packageManager}@\\d+\\.\\d+\\.\\d+(?:-.+)?$`),
      );
    });

    it(`pins Kysely below 0.29 for Better Auth with ${packageManager}`, async () => {
      const result = await createVirtual({
        projectName: `better-auth-kysely-${packageManager}`,
        packageManager,
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        api: "trpc",
        database: "postgres",
        orm: "drizzle",
        auth: "better-auth",
        addons: ["turborepo"],
      });

      expect(result.success).toBe(true);

      const rootPackageJson = result.tree
        ? readJsonFromTree(result.tree, "package.json")
        : undefined;
      const expectedVersion = "0.28.17";

      if (packageManager === "pnpm") {
        expect(rootPackageJson?.pnpm?.overrides?.kysely).toBe(expectedVersion);
      } else if (packageManager === "yarn") {
        expect(rootPackageJson?.resolutions?.kysely).toBe(expectedVersion);
      } else {
        expect(rootPackageJson?.overrides?.kysely).toBe(expectedVersion);
      }
    });
  }

  const aiExamples = [
    { ai: "mastra", sdkPackage: "mastra" },
    { ai: "voltagent", sdkPackage: "@voltagent/core" },
    { ai: "openai-agents", sdkPackage: "@openai/agents" },
    { ai: "google-adk", sdkPackage: "@google/adk" },
  ] as const;

  for (const { ai, sdkPackage } of aiExamples) {
    it(`adds transport deps for ${ai} self-hosted AI examples`, async () => {
      const result = await createVirtual({
        projectName: `ai-${ai}`,
        frontend: ["tanstack-start"],
        backend: "self",
        runtime: "none",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        examples: ["ai"],
        ai,
      });

      expect(result.success).toBe(true);

      const webPackageJson = result.tree
        ? readJsonFromTree(result.tree, "apps/web/package.json")
        : undefined;

      expect(
        webPackageJson?.dependencies?.[sdkPackage] ?? webPackageJson?.devDependencies?.[sdkPackage],
      ).toBeDefined();
      expect(webPackageJson?.dependencies?.ai).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/google"]).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/devtools"]).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/react"]).toBeDefined();
      expect(webPackageJson?.dependencies?.streamdown).toBeDefined();
    });
  }

  it("adds AI CLI command presets at the generated workspace root", async () => {
    const result = await createVirtual({
      projectName: "ai-cli-root",
      frontend: ["react-vite"],
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      ai: "ai-cli",
    });

    expect(result.success).toBe(true);

    const rootPackageJson = result.tree ? readJsonFromTree(result.tree, "package.json") : undefined;

    expect(rootPackageJson?.devDependencies?.["ai-cli"]).toBeDefined();
    expect(rootPackageJson?.scripts?.["ai:text"]).toBe("ai text");
    expect(rootPackageJson?.scripts?.["ai:image"]).toBe("ai image");
    expect(rootPackageJson?.scripts?.["ai:video"]).toBe("ai video");
    expect(rootPackageJson?.scripts?.["ai:models"]).toBe("ai models");
    expect(rootPackageJson?.scripts?.["ai:completions"]).toBe("ai completions");
  });

  it("declares TanStack Start query devtools even when OpenAPI skips query client deps", async () => {
    const result = await createVirtual({
      projectName: "tanstack-start-openapi-kysely",
      frontend: ["tanstack-start"],
      backend: "hono",
      runtime: "bun",
      api: "openapi",
      database: "sqlite",
      orm: "kysely",
      auth: "none",
      cssFramework: "tailwind",
      packageManager: "bun",
      addons: [],
      examples: [],
    });

    expect(result.success).toBe(true);

    const webPackageJson = result.tree
      ? readJsonFromTree(result.tree, "apps/web/package.json")
      : undefined;

    expect(packageHasDependency(webPackageJson, "@tanstack/react-query")).toBe(true);
    expect(packageHasDependency(webPackageJson, "@tanstack/react-query-devtools")).toBe(true);
  });

  it("wires the benchmark AI search workbench stack with the intended libraries", async () => {
    const result = await createVirtual({
      projectName: "ai-search-workbench",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      api: "orpc",
      database: "postgres",
      orm: "drizzle",
      dbSetup: "none",
      auth: "better-auth",
      payments: "none",
      email: "none",
      fileUpload: "none",
      logging: "pino",
      observability: "opentelemetry",
      featureFlags: "none",
      analytics: "none",
      effect: "none",
      stateManagement: "tanstack-store",
      forms: "tanstack-form",
      validation: "valibot",
      testing: "vitest-playwright",
      ai: "vercel-ai",
      realtime: "none",
      jobQueue: "inngest",
      animation: "none",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      shadcnBase: "radix",
      shadcnStyle: "nova",
      shadcnIconLibrary: "lucide",
      shadcnColorTheme: "neutral",
      shadcnBaseColor: "neutral",
      shadcnFont: "inter",
      shadcnRadius: "default",
      cms: "none",
      caching: "none",
      rateLimit: "none",
      i18n: "paraglide",
      search: "opensearch",
      vectorDb: "qdrant",
      fileStorage: "none",
      webDeploy: "none",
      serverDeploy: "none",
      addons: ["turborepo", "biome", "devcontainer", "github-actions"],
      examples: [],
      aiDocs: [],
      packageManager: "bun",
      install: false,
      git: false,
    });

    expect(result.success).toBe(true);
    expect(result.tree).toBeDefined();
    const tree = result.tree!;

    const rootPackageJson = readJsonFromTree(tree, "package.json");
    const serverPackageJson = readJsonFromTree(tree, "apps/server/package.json");
    const webPackageJson = readJsonFromTree(tree, "apps/web/package.json");
    const dbPackageJson = readJsonFromTree(tree, "packages/db/package.json");
    const authPackageJson = readJsonFromTree(tree, "packages/auth/package.json");

    for (const dep of [
      "hono",
      "@orpc/server",
      "ai",
      "inngest",
      "pino",
      "@opentelemetry/api",
      "@opensearch-project/opensearch",
      "@qdrant/js-client-rest",
      "valibot",
    ]) {
      expect(packageHasDependency(serverPackageJson, dep)).toBe(true);
    }

    for (const dep of [
      "@tanstack/react-router",
      "@orpc/tanstack-query",
      "@tanstack/store",
      "@tanstack/react-form",
      "@inlang/paraglide-js",
      "valibot",
      "lucide-react",
    ]) {
      expect(packageHasDependency(webPackageJson, dep)).toBe(true);
    }

    expect(packageHasDependency(dbPackageJson, "drizzle-orm")).toBe(true);
    expect(packageHasDependency(dbPackageJson, "pg")).toBe(true);
    expect(packageHasDependency(authPackageJson, "better-auth")).toBe(true);
    expect(packageHasDependency(authPackageJson, "@better-auth/drizzle-adapter")).toBe(true);
    expect(packageHasDependency(rootPackageJson, "turbo")).toBe(true);

    for (const filePath of [
      ".devcontainer/devcontainer.json",
      ".github/workflows/ci.yml",
      "apps/server/src/lib/vector.ts",
      "apps/server/src/lib/search.ts",
      "apps/server/src/lib/inngest.ts",
      "apps/server/src/lib/logger.ts",
      "apps/server/src/lib/tracing.ts",
      "apps/web/components.json",
      "apps/web/project.inlang/settings.json",
    ]) {
      expect(hasVirtualFile(tree.root, filePath)).toBe(true);
    }

    expect(readTextFromTree(tree, "apps/server/src/lib/vector.ts")).toContain(
      "@qdrant/js-client-rest",
    );
    expect(readTextFromTree(tree, "apps/server/src/lib/search.ts")).toContain(
      "@opensearch-project/opensearch",
    );
    expect(readTextFromTree(tree, "apps/server/src/lib/inngest.ts")).toContain("inngest");
  });

  it("generates Python GitHub Actions with dev test dependencies and pytest", async () => {
    const result = await createVirtual({
      projectName: "python-ci",
      ecosystem: "python",
      pythonWebFramework: "fastapi",
      pythonOrm: "none",
      pythonValidation: "pydantic",
      pythonAi: [],
      pythonTaskQueue: "none",
      pythonQuality: "none",
      addons: ["github-actions"],
      install: false,
      git: false,
    });

    expect(result.success).toBe(true);
    expect(result.tree).toBeDefined();

    const workflow = readTextFromTree(result.tree!, ".github/workflows/ci.yml");

    expect(workflow).toContain('pip install -e ".[dev]"');
    expect(workflow).toContain("python -m compileall -q .");
    expect(workflow).toContain("run: pytest");
  });

  it("generates TypeScript GitHub Actions with selected unit tests", async () => {
    const result = await createVirtual({
      projectName: "typescript-ci-tests",
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      testing: "vitest",
      addons: ["github-actions"],
      packageManager: "bun",
      install: false,
      git: false,
    });

    expect(result.success).toBe(true);
    expect(result.tree).toBeDefined();

    const workflow = readTextFromTree(result.tree!, ".github/workflows/ci.yml");
    const rootPackageJson = readJsonFromTree(result.tree!, "package.json");
    const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");
    const serverPackageJson = readJsonFromTree(result.tree!, "apps/server/package.json");
    const apiPackageJson = readJsonFromTree(result.tree!, "packages/api/package.json");

    expect(workflow).toContain("run: bun run check-types");
    expect(workflow).toContain("run: bun run build");
    expect(workflow).toContain("run: bun run test");
    expect(rootPackageJson?.scripts?.test).toBe(
      "bun run --filter web test && bun run --filter server test && bun run --filter @typescript-ci-tests/api test",
    );
    expect(webPackageJson?.scripts?.test).toBe("vitest run --passWithNoTests");
    expect(serverPackageJson?.scripts?.test).toBe("vitest run --passWithNoTests");
    expect(apiPackageJson?.scripts?.test).toBe("vitest run --passWithNoTests");
  });

  it("generates React Native GitHub Actions with mobile test scripts when selected", async () => {
    const result = await createVirtual({
      projectName: "native-ci-tests",
      ecosystem: "react-native",
      frontend: ["native-bare"],
      mobileTesting: "react-native-testing-library",
      addons: ["github-actions"],
      packageManager: "bun",
      install: false,
      git: false,
    });

    expect(result.success).toBe(true);
    expect(result.tree).toBeDefined();

    const workflow = readTextFromTree(result.tree!, ".github/workflows/ci.yml");
    const rootPackageJson = readJsonFromTree(result.tree!, "package.json");
    const nativePackageJson = readJsonFromTree(result.tree!, "apps/native/package.json");

    expect(workflow).toContain("run: bun run check-types");
    expect(workflow).toContain("run: bun run build");
    expect(workflow).toContain("run: bun run test");
    expect(rootPackageJson?.scripts?.test).toBe("bun run --filter native test");
    expect(nativePackageJson?.scripts?.test).toBe("jest");
    expect(
      readTextFromTree(result.tree!, "apps/native/__tests__/mobile-ui-provider.test.tsx"),
    ).toContain("renders children inside the mobile provider");
  });

  const graphOnlyBackendCiCases = [
    {
      name: "Rust",
      projectName: "rust-graph-ci",
      specs: ["backend:rust:axum"],
      workflowIncludes: [
        "uses: dtolnay/rust-toolchain@stable",
        "run: cargo fmt --all -- --check",
        "run: cargo clippy --all-targets --all-features -- -D warnings",
        "run: cargo build --verbose",
        "run: cargo test --verbose",
      ],
      scripts: { "test:server": "cd apps/server && cargo test" },
    },
    {
      name: "Go",
      projectName: "go-graph-ci",
      specs: ["backend:go:gin"],
      workflowIncludes: [
        "uses: actions/setup-go@v5",
        "run: go mod download",
        "run: go vet ./...",
        "run: go build ./...",
        "run: go test ./...",
      ],
      scripts: { "test:server": "cd apps/server && go mod tidy && go test ./..." },
    },
    {
      name: "Python",
      projectName: "python-graph-ci",
      specs: ["backend:python:fastapi"],
      workflowIncludes: [
        "uses: actions/setup-python@v5",
        'pip install -e ".[dev]"',
        "run: python -m compileall -q .",
        "run: pytest",
      ],
      scripts: { "test:server": "cd apps/server && uv run --extra dev pytest" },
    },
    {
      name: "Java",
      projectName: "java-graph-ci",
      specs: ["backend:java:spring-boot"],
      workflowIncludes: [
        "uses: actions/setup-java@v4",
        "cache: maven",
        "run: ./mvnw --batch-mode verify",
      ],
      scripts: { "test:server": "cd apps/server && ./mvnw test" },
    },
    {
      name: "Elixir",
      projectName: "elixir-graph-ci",
      specs: ["backend:elixir:phoenix"],
      workflowIncludes: [
        "uses: erlef/setup-beam@v1",
        "run: mix deps.get",
        "run: mix format --check-formatted",
        "run: mix compile --warnings-as-errors",
        "run: mix test",
      ],
      scripts: { "test:server": "cd apps/server && mix test" },
    },
    {
      name: ".NET without tests",
      projectName: "dotnet-graph-ci",
      specs: ["backend:dotnet:aspnet-minimal"],
      workflowIncludes: [
        "uses: actions/setup-dotnet@v4",
        "run: dotnet restore",
        "run: dotnet build --no-restore --configuration Release",
      ],
      workflowExcludes: ["run: dotnet test --no-build --configuration Release"],
      absentScripts: ["test:server"],
    },
    {
      name: ".NET with tests",
      projectName: "dotnet-tests-graph-ci",
      specs: ["backend:dotnet:aspnet-minimal", "backend.testing:dotnet:xunit"],
      workflowIncludes: [
        "uses: actions/setup-dotnet@v4",
        "run: dotnet restore",
        "run: dotnet build --no-restore --configuration Release",
        "run: dotnet test --no-build --configuration Release",
      ],
      scripts: { "test:server": "cd apps/server && dotnet test" },
    },
  ] as const;

  for (const testCase of graphOnlyBackendCiCases) {
    it(`generates GitHub Actions for graph-only ${testCase.name} backends in the backend workspace`, async () => {
      const result = await createVirtual({
        projectName: testCase.projectName,
        stackParts: parseStackPartSpecs([
          ...testCase.specs,
          "workspaceTooling:universal:github-actions",
        ]),
        install: false,
        git: false,
      });

      expect(result.success).toBe(true);
      expect(result.tree).toBeDefined();

      const workflow = readTextFromTree(result.tree!, ".github/workflows/ci.yml");
      const rootPackageJson = readJsonFromTree(result.tree!, "package.json");

      expect(workflow).toContain('working-directory: "apps/server"');
      for (const expected of testCase.workflowIncludes) {
        expect(workflow).toContain(expected);
      }
      for (const unexpected of testCase.workflowExcludes ?? []) {
        expect(workflow).not.toContain(unexpected);
      }
      for (const [scriptName, scriptValue] of Object.entries(testCase.scripts ?? {})) {
        expect(rootPackageJson?.scripts?.[scriptName]).toBe(scriptValue);
      }
      for (const scriptName of testCase.absentScripts ?? []) {
        expect(rootPackageJson?.scripts?.[scriptName]).toBeUndefined();
      }
    });
  }

  it("uses path-safe chunk names for generated Qwik builds", async () => {
    const result = await createVirtual({
      projectName: "qwik-safe-chunks",
      frontend: ["qwik"],
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      cssFramework: "scss",
    });

    expect(result.success).toBe(true);

    const viteConfig = readTextFromTree(result.tree!, "apps/web/vite.config.ts");

    expect(viteConfig).toContain('chunkFileNames: "assets/chunks/[hash].js"');
    expect(viteConfig).toContain('if (id.includes("node_modules"))');
    expect(viteConfig).toContain('replace(/[^a-zA-Z0-9_-]/g, "_")');
    expect(viteConfig).not.toContain('chunkFileNames: "assets/[name]-[hash].js"');
  });

  it("writes build-safe placeholders for required server integration env vars", async () => {
    const result = await createVirtual({
      projectName: "svelte-build-env",
      frontend: ["svelte"],
      backend: "self",
      runtime: "none",
      api: "none",
      database: "sqlite",
      orm: "kysely",
      auth: "better-auth",
      observability: "axiom",
      rateLimit: "upstash-ratelimit",
      addons: [],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const webDotEnv = readTextFromTree(result.tree!, "apps/web/.env");
    const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");
    const viteConfig = readTextFromTree(result.tree!, "apps/web/vite.config.ts");
    const serverEnv = readTextFromTree(result.tree!, "packages/env/src/server.ts");
    const authServer = readTextFromTree(result.tree!, "packages/auth/src/index.ts");

    expect(serverEnv).toContain("AXIOM_TOKEN: z.string().min(1)");
    expect(serverEnv).toContain("UPSTASH_REDIS_REST_URL: z.url()");
    expect(webDotEnv).toContain("AXIOM_TOKEN=xaat_your_axiom_token");
    expect(webDotEnv).toContain("AXIOM_DATASET=local");
    expect(webDotEnv).toContain("UPSTASH_REDIS_REST_URL=https://your-upstash-redis.upstash.io");
    expect(webDotEnv).toContain("UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token");
    expect(webPackageJson?.dependencies?.["better-sqlite3"]).toBeDefined();
    expect(viteConfig).toContain('external: ["better-sqlite3", "sqlite3"]');
    expect(authServer).toContain(`import { db } from "@svelte-build-env/db";`);
    expect(authServer).toContain('database: {\n\t\tdb,\n\t\ttype: "sqlite",\n\t}');
  });

  it("adds the deterministic Ultracite quiet-mode config at the workspace root", async () => {
    const result = await createVirtual({
      projectName: "ultracite-addon",
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      api: "none",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      addons: ["ultracite"],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const rootPackageJson = result.tree ? readJsonFromTree(result.tree, "package.json") : undefined;
    const biomeConfig = readTextFromTree(result.tree!, "biome.jsonc");

    expect(rootPackageJson?.devDependencies?.ultracite).toBeDefined();
    expect(rootPackageJson?.devDependencies?.["@biomejs/biome"]).toBeDefined();
    expect(rootPackageJson?.scripts?.lint).toBe("ultracite check");
    expect(rootPackageJson?.scripts?.format).toBe("ultracite fix");
    expect(rootPackageJson?.scripts?.["lint:doctor"]).toBe("ultracite doctor");
    expect(biomeConfig).toContain('"extends": ["ultracite/biome/core"]');
  });

  it("adds the WXT React extension app for the WXT addon", async () => {
    const result = await createVirtual({
      projectName: "wxt-addon",
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      api: "none",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      addons: ["wxt"],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const extensionPackageJson = result.tree
      ? readJsonFromTree(result.tree, "apps/extension/package.json")
      : undefined;
    const wxtConfig = readTextFromTree(result.tree!, "apps/extension/wxt.config.ts");
    const background = readTextFromTree(result.tree!, "apps/extension/entrypoints/background.ts");
    const popup = readTextFromTree(result.tree!, "apps/extension/entrypoints/popup/App.tsx");

    expect(extensionPackageJson?.scripts?.dev).toBe("wxt --port 5555");
    expect(extensionPackageJson?.scripts?.build).toBe("wxt build");
    expect(extensionPackageJson?.dependencies?.react).toBeDefined();
    expect(extensionPackageJson?.dependencies?.["react-dom"]).toBeDefined();
    expect(extensionPackageJson?.devDependencies?.wxt).toBeDefined();
    expect(extensionPackageJson?.devDependencies?.["@wxt-dev/module-react"]).toBeDefined();
    expect(wxtConfig).toContain("@wxt-dev/module-react");
    expect(background).toContain("defineBackground");
    expect(popup).toContain("WXT + React");
  });

  it("adds the OpenTUI core app for the OpenTUI addon", async () => {
    const result = await createVirtual({
      projectName: "opentui-addon",
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      api: "none",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      addons: ["opentui"],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const tuiPackageJson = result.tree
      ? readJsonFromTree(result.tree, "apps/tui/package.json")
      : undefined;
    const tuiEntry = readTextFromTree(result.tree!, "apps/tui/src/index.ts");
    const tsconfig = readTextFromTree(result.tree!, "apps/tui/tsconfig.json");

    expect(tuiPackageJson?.scripts?.dev).toBe("bun src/index.ts");
    expect(tuiPackageJson?.scripts?.["check-types"]).toBe("tsc --noEmit");
    expect(tuiPackageJson?.dependencies?.["@opentui/core"]).toBeDefined();
    expect(tuiPackageJson?.devDependencies?.["@types/bun"]).toBeDefined();
    expect(tuiEntry).toContain("createCliRenderer");
    expect(tuiEntry).toContain("Better Fullstack + OpenTUI");
    expect(tsconfig).toContain('"types": ["bun"]');
  });

  it("adds the Fumadocs Next MDX docs app for the Fumadocs addon", async () => {
    const result = await createVirtual({
      projectName: "fumadocs-addon",
      packageManager: "bun",
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      api: "none",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      addons: ["fumadocs"],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const rootPackageJson = result.tree ? readJsonFromTree(result.tree, "package.json") : undefined;
    const docsPackageJson = result.tree
      ? readJsonFromTree(result.tree, "apps/docs/package.json")
      : undefined;
    const sourceConfig = readTextFromTree(result.tree!, "apps/docs/source.config.ts");
    const docsPage = readTextFromTree(result.tree!, "apps/docs/app/docs/[[...slug]]/page.tsx");
    const intro = readTextFromTree(result.tree!, "apps/docs/content/docs/index.mdx");

    expect(rootPackageJson?.scripts?.["dev:docs"]).toBe("bun run --filter docs dev");
    expect(rootPackageJson?.scripts?.["build:docs"]).toBe("bun run --filter docs build");
    expect(rootPackageJson?.scripts?.["check:docs"]).toBe("bun run --filter docs check-types");
    expect(docsPackageJson?.scripts?.dev).toBe("next dev --port 4000");
    expect(docsPackageJson?.scripts?.["check-types"]).toBe("fumadocs-mdx && tsc --noEmit");
    expect(docsPackageJson?.dependencies?.["fumadocs-core"]).toBeDefined();
    expect(docsPackageJson?.dependencies?.["fumadocs-mdx"]).toBeDefined();
    expect(docsPackageJson?.dependencies?.["fumadocs-ui"]).toBeDefined();
    expect(docsPackageJson?.devDependencies?.["@types/mdx"]).toBeDefined();
    expect(sourceConfig).toContain("defineDocs");
    expect(docsPage).toContain("source.getPage(params.slug)");
    expect(intro).toContain("# fumadocs-addon");
  });

  it("adds project-local Better Fullstack skill files for the skills addon", async () => {
    const result = await createVirtual({
      projectName: "skills-addon",
      packageManager: "bun",
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
      api: "none",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      addons: ["skills"],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const skill = readTextFromTree(result.tree!, ".agents/skills/better-fullstack/SKILL.md");
    const agent = readTextFromTree(
      result.tree!,
      ".agents/skills/better-fullstack/agents/openai.yaml",
    );
    const readme = readTextFromTree(result.tree!, ".agents/skills/README.md");

    expect(skill).toContain("name: better-fullstack");
    expect(skill).toContain("Use `bun` for package-manager commands.");
    expect(skill).toContain("Do not start a dev server unless the user explicitly asks.");
    expect(agent).toContain('display_name: "Better Fullstack"');
    expect(readme).toContain("project-local agent skills");
  });

  it("wires the Next provider to the GraphQL Yoga query client", async () => {
    const result = await createVirtual({
      projectName: "next-graphql-yoga",
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      api: "graphql-yoga",
      database: "sqlite",
      orm: "sequelize",
      auth: "none",
      addons: [],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const providers = readTextFromTree(result.tree!, "apps/web/src/components/providers.tsx");
    const graphqlClient = readTextFromTree(result.tree!, "apps/web/src/utils/graphql.ts");

    expect(providers).toContain('import { queryClient } from "@/utils/graphql"');
    expect(providers).toContain("<QueryClientProvider client={queryClient}>");
    expect(graphqlClient).toContain("export const queryClient");
  });

  it("wires Nuxt self-backend oRPC auth context from Nitro request headers", async () => {
    const result = await createVirtual({
      projectName: "nuxt-orpc-auth",
      frontend: ["nuxt"],
      backend: "self",
      runtime: "none",
      api: "orpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "better-auth",
      addons: ["turborepo"],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const context = readTextFromTree(result.tree!, "packages/api/src/context.ts");
    const router = readTextFromTree(result.tree!, "packages/api/src/routers/index.ts");

    expect(context).toContain('import type { IncomingMessage } from "node:http"');
    expect(context).toContain("req: IncomingMessage");
    expect(context).toContain("auth.api.getSession");
    expect(context).toContain("headers: req.headers as any");
    expect(router).toContain("privateData: protectedProcedure.handler");
    expect(context).not.toContain(
      "export async function createContext() {\n  return {\n    session: null",
    );
  });

  it("does not import unused Kysely Generated type for Better Auth schemas", async () => {
    const result = await createVirtual({
      projectName: "kysely-auth-schema",
      frontend: ["next"],
      backend: "nitro",
      runtime: "node",
      api: "none",
      database: "mysql",
      orm: "kysely",
      auth: "better-auth",
      addons: [],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const schema = readTextFromTree(result.tree!, "packages/db/src/schema/index.ts");

    expect(schema).toContain('import type { ColumnType } from "kysely";');
    expect(schema).not.toContain("Generated");
    expect(schema).toContain("export interface UserTable");
  });

  it("uses the shared tsconfig base file for generated OpenAPI packages", async () => {
    const result = await createVirtual({
      projectName: "nuxt-express-openapi",
      frontend: ["nuxt"],
      backend: "express",
      runtime: "bun",
      api: "openapi",
      database: "mongodb",
      orm: "prisma",
      auth: "better-auth",
      email: "react-email",
      realtime: "socket-io",
      jobQueue: "trigger-dev",
      addons: [],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const apiTsconfig = readTextFromTree(result.tree!, "packages/api/tsconfig.json");

    expect(apiTsconfig).toContain('"extends": "@nuxt-express-openapi/config/tsconfig.base.json"');
    expect(apiTsconfig).not.toContain("config/tsconfig/base.json");
  });

  it("projects backend-owned Better Auth organizations into generated auth files", async () => {
    const result = await createVirtual({
      projectName: "better-auth-orgs",
      frontend: ["tanstack-router"],
      backend: "hono",
      runtime: "bun",
      api: "trpc",
      database: "postgres",
      orm: "drizzle",
      auth: "better-auth-organizations",
      payments: "none",
      addons: [],
      examples: [],
    });

    expect(result.success).toBe(true);

    const authServer = readTextFromTree(result.tree!, "packages/auth/src/index.ts");
    const authClient = readTextFromTree(result.tree!, "apps/web/src/lib/auth-client.ts");
    const authSchema = readTextFromTree(result.tree!, "packages/db/src/schema/auth.ts");

    expect(authServer).toContain('from "better-auth/plugins"');
    expect(authServer).toContain("organization()");
    expect(authServer).not.toContain("polar(");
    expect(authClient).toContain("organizationClient()");
    expect(authClient).not.toContain("polarClient");
    expect(authSchema).toContain("activeOrganizationId");
    expect(authSchema).toContain('pgTable("organization"');
    expect(authSchema).toContain("export const member = pgTable(");
    expect(authSchema).toContain("export const invitation = pgTable(");
  });

  const enterpriseObservabilityProviders = [
    {
      observability: "datadog",
      filePath: "apps/server/src/lib/datadog.ts",
      dependency: "dd-trace",
      fileSnippet: 'from "dd-trace"',
      envVars: ["DD_SERVICE", "DD_ENV", "DD_VERSION", "DD_TRACE_AGENT_URL"],
    },
    {
      observability: "axiom",
      filePath: "apps/server/src/lib/axiom.ts",
      dependency: "@axiomhq/js",
      fileSnippet: 'from "@axiomhq/js"',
      envVars: ["AXIOM_TOKEN", "AXIOM_DATASET"],
    },
    {
      observability: "betterstack",
      filePath: "apps/server/src/lib/betterstack.ts",
      dependency: "@logtail/node",
      fileSnippet: 'from "@logtail/node"',
      envVars: ["BETTERSTACK_SOURCE_TOKEN", "BETTERSTACK_INGESTING_HOST"],
    },
  ] as const;

  for (const provider of enterpriseObservabilityProviders) {
    it(`generates ${provider.observability} observability files, deps, and env vars`, async () => {
      const result = await createVirtual({
        projectName: `obs-${provider.observability}`,
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        observability: provider.observability,
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expect(result.success).toBe(true);

      const serverPackageJson = readJsonFromTree(result.tree!, "apps/server/package.json");
      const integrationFile = readTextFromTree(result.tree!, provider.filePath);
      const serverEnv = readTextFromTree(result.tree!, "packages/env/src/server.ts");
      const serverDotEnv = readTextFromTree(result.tree!, "apps/server/.env");

      expect(serverPackageJson?.dependencies?.[provider.dependency]).toBeDefined();
      expect(integrationFile).toContain(provider.fileSnippet);
      if (provider.observability === "axiom") {
        expect(integrationFile).toContain('from "@obs-axiom/env/server"');
        expect(integrationFile).not.toContain("process.env.AXIOM_TOKEN");
      }
      for (const envVar of provider.envVars) {
        expect(serverEnv).toContain(envVar);
        expect(serverDotEnv).toContain(`${envVar}=`);
      }
    });
  }

  const rateLimitProviders = [
    {
      rateLimit: "arcjet",
      dependencies: ["@arcjet/node"],
      fileSnippet: 'from "@arcjet/node"',
      envVars: ["ARCJET_KEY"],
    },
    {
      rateLimit: "upstash-ratelimit",
      dependencies: ["@upstash/ratelimit", "@upstash/redis"],
      fileSnippet: 'from "@upstash/ratelimit"',
      envVars: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
    },
  ] as const;

  for (const provider of rateLimitProviders) {
    it(`generates ${provider.rateLimit} rate-limit files, deps, and env vars`, async () => {
      const result = await createVirtual({
        projectName: `rate-${provider.rateLimit}`,
        frontend: ["tanstack-router"],
        backend: "hono",
        runtime: "bun",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        rateLimit: provider.rateLimit,
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expect(result.success).toBe(true);

      const serverPackageJson = readJsonFromTree(result.tree!, "apps/server/package.json");
      const rateLimitFile = readTextFromTree(result.tree!, "apps/server/src/lib/rate-limit.ts");
      const serverEnv = readTextFromTree(result.tree!, "packages/env/src/server.ts");
      const serverDotEnv = readTextFromTree(result.tree!, "apps/server/.env");

      for (const dependency of provider.dependencies) {
        expect(serverPackageJson?.dependencies?.[dependency]).toBeDefined();
      }
      expect(rateLimitFile).toContain(provider.fileSnippet);
      for (const envVar of provider.envVars) {
        expect(serverEnv).toContain(envVar);
        expect(serverDotEnv).toContain(`${envVar}=`);
      }
    });
  }

  it("uses the Arcjet Next package for self-hosted Next.js rate limiting", async () => {
    const result = await createVirtual({
      projectName: "rate-arcjet-next",
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      api: "trpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      rateLimit: "arcjet",
      addons: [],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");
    const rateLimitFile = readTextFromTree(result.tree!, "apps/web/src/lib/rate-limit.ts");
    const webDotEnv = readTextFromTree(result.tree!, "apps/web/.env");

    expect(webPackageJson?.dependencies?.["@arcjet/next"]).toBeDefined();
    expect(webPackageJson?.dependencies?.["@arcjet/node"]).toBeUndefined();
    expect(rateLimitFile).toContain('from "@arcjet/next"');
    expect(webDotEnv).toContain("ARCJET_KEY=");
  });

  const hostedNextAuthProviders = [
    {
      auth: "workos",
      dependency: "@workos-inc/authkit-nextjs",
      routePath: "apps/web/src/app/login/route.ts",
      routeSnippet: "getSignInUrl",
      clientSnippet: "AuthKitProvider",
      webEnvSnippet: "NEXT_PUBLIC_WORKOS_REDIRECT_URI",
      envVars: [
        "WORKOS_API_KEY",
        "WORKOS_CLIENT_ID",
        "WORKOS_COOKIE_PASSWORD",
        "NEXT_PUBLIC_WORKOS_REDIRECT_URI",
      ],
    },
    {
      auth: "kinde",
      dependency: "@kinde-oss/kinde-auth-nextjs",
      routePath: "apps/web/src/app/api/auth/[kindeAuth]/route.ts",
      routeSnippet: "handleAuth()",
      clientSnippet: "KindeProvider",
      webEnvSnippet: undefined,
      envVars: [
        "KINDE_CLIENT_ID",
        "KINDE_CLIENT_SECRET",
        "KINDE_ISSUER_URL",
        "KINDE_SITE_URL",
        "KINDE_POST_LOGIN_REDIRECT_URL",
        "KINDE_POST_LOGOUT_REDIRECT_URL",
      ],
    },
  ] as const;

  for (const provider of hostedNextAuthProviders) {
    it(`generates ${provider.auth} fullstack Next auth files, deps, and env vars`, async () => {
      const result = await createVirtual({
        projectName: `auth-${provider.auth}`,
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: provider.auth,
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      });

      expect(result.success).toBe(true);

      const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");
      const route = readTextFromTree(result.tree!, provider.routePath);
      const authClient = readTextFromTree(result.tree!, "apps/web/src/lib/auth-client.tsx");
      const providers = readTextFromTree(result.tree!, "apps/web/src/components/providers.tsx");
      const serverEnv = readTextFromTree(result.tree!, "packages/env/src/server.ts");
      const webEnv = readTextFromTree(result.tree!, "packages/env/src/web.ts");
      const webDotEnv = readTextFromTree(result.tree!, "apps/web/.env");

      expect(webPackageJson?.dependencies?.[provider.dependency]).toBeDefined();
      expect(route).toContain(provider.routeSnippet);
      expect(authClient).toContain(provider.clientSnippet);
      expect(providers).toContain("<AuthProvider>");
      if (provider.webEnvSnippet) {
        expect(webEnv).toContain(provider.webEnvSnippet);
      }
      for (const envVar of provider.envVars) {
        expect(serverEnv).toContain(envVar);
        expect(webDotEnv).toContain(`${envVar}=`);
      }
    });
  }

  it("generates Auth0 v4 fullstack Next auth files, deps, and env vars", async () => {
    const result = await createVirtual({
      projectName: "auth-auth0",
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      api: "trpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "auth0",
      addons: [],
      examples: [],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
    });

    expect(result.success).toBe(true);

    const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");
    const auth0Client = readTextFromTree(result.tree!, "apps/web/src/lib/auth0.ts");
    const legacyRoute = readTextFromTree(
      result.tree!,
      "apps/web/src/app/api/auth/[auth0]/route.ts",
    );
    const middleware = readTextFromTree(result.tree!, "apps/web/src/middleware.ts");
    const authClient = readTextFromTree(result.tree!, "apps/web/src/lib/auth-client.tsx");
    const providers = readTextFromTree(result.tree!, "apps/web/src/components/providers.tsx");
    const serverEnv = readTextFromTree(result.tree!, "packages/env/src/server.ts");
    const webDotEnv = readTextFromTree(result.tree!, "apps/web/.env");

    expect(webPackageJson?.dependencies?.["@auth0/nextjs-auth0"]).toBeDefined();
    expect(auth0Client).toContain('from "@auth0/nextjs-auth0/server"');
    expect(middleware).toContain("auth0.middleware(request)");
    expect(middleware).toContain('new URL("/auth/login"');
    expect(legacyRoute).toBeUndefined();
    expect(authClient).toContain('from "@auth0/nextjs-auth0"');
    expect(authClient).toContain('window.location.href = "/auth/login"');
    expect(authClient).toContain('window.location.href = "/auth/logout"');
    expect(providers).toContain("<AuthProvider>");

    for (const envVar of [
      "AUTH0_DOMAIN",
      "AUTH0_CLIENT_ID",
      "AUTH0_CLIENT_SECRET",
      "AUTH0_SECRET",
      "APP_BASE_URL",
    ]) {
      expect(serverEnv).toContain(envVar);
      expect(webDotEnv).toContain(`${envVar}=`);
    }
  });

  it("scaffolds a default .NET Minimal API project", async () => {
    const result = await createVirtual({
      projectName: "DotnetApi",
      ecosystem: "dotnet",
      database: "postgres",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "ef-core",
      dotnetAuth: "aspnet-identity",
      dotnetApi: "minimal-api",
      dotnetTesting: ["xunit"],
      dotnetJobQueue: "none",
      dotnetRealtime: "signalr",
      dotnetObservability: ["serilog"],
      dotnetCaching: "none",
      dotnetDeploy: "docker",
    });

    expect(result.success).toBe(true);

    const projectFile = readTextFromTree(result.tree!, "DotnetApi.csproj");
    const program = readTextFromTree(result.tree!, "Program.cs");
    const dockerfile = readTextFromTree(result.tree!, "Dockerfile");
    const testProject = readTextFromTree(result.tree!, "DotnetApi.Tests/DotnetApi.Tests.csproj");

    expect(projectFile).toContain("<TargetFramework>net10.0</TargetFramework>");
    expect(projectFile).toContain('<Compile Remove="**/*.Tests/**/*.cs" />');
    expect(projectFile).toContain(
      'PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL"',
    );
    expect(projectFile).toContain('PackageReference Include="Serilog.AspNetCore"');
    expect(program).toContain("builder.Services.AddDbContext<AppDbContext>");
    expect(program).toContain('app.MapHub<UpdatesHub>("/hubs/updates")');
    expect(dockerfile).toContain("FROM mcr.microsoft.com/dotnet/sdk:10.0");
    expect(testProject).toContain('PackageReference Include="xunit"');
  });

  it("scaffolds a .NET MVC project with controller routes", async () => {
    const result = await createVirtual({
      projectName: "DotnetMvc",
      ecosystem: "dotnet",
      database: "sqlite",
      dotnetWebFramework: "aspnet-mvc",
      dotnetOrm: "ef-core",
      dotnetAuth: "none",
      dotnetApi: "minimal-api",
      dotnetTesting: [],
      dotnetJobQueue: "none",
      dotnetRealtime: "none",
      dotnetObservability: [],
      dotnetCaching: "none",
      dotnetDeploy: "none",
    });

    expect(result.success).toBe(true);

    const program = readTextFromTree(result.tree!, "Program.cs");

    expect(program).toContain("using Microsoft.AspNetCore.Mvc;");
    expect(program).toContain("builder.Services.AddControllers();");
    expect(program).toContain("app.MapControllers();");
    expect(program).toContain("[ApiController]");
    expect(program).toContain("public sealed class TodosController : ControllerBase");
    expect(program).toContain("public async Task<IActionResult> GetTodos()");
    expect(program).not.toContain('app.MapGet("/api/todos"');
  });

  it("scaffolds a .NET Blazor project with Razor components", async () => {
    const result = await createVirtual({
      projectName: "DotnetBlazor",
      ecosystem: "dotnet",
      database: "sqlite",
      dotnetWebFramework: "aspnet-blazor",
      dotnetOrm: "none",
      dotnetAuth: "none",
      dotnetApi: "minimal-api",
      dotnetTesting: [],
      dotnetJobQueue: "none",
      dotnetRealtime: "none",
      dotnetObservability: [],
      dotnetCaching: "none",
      dotnetDeploy: "none",
    });

    expect(result.success).toBe(true);

    const program = readTextFromTree(result.tree!, "Program.cs");
    const app = readTextFromTree(result.tree!, "Components/App.razor");
    const routes = readTextFromTree(result.tree!, "Components/Routes.razor");
    const home = readTextFromTree(result.tree!, "Components/Pages/Home.razor");

    expect(program).toContain("builder.Services.AddRazorComponents()");
    expect(program).toContain("app.MapRazorComponents<App>()");
    expect(program).toContain('app.MapGet("/api/status"');
    expect(program).not.toContain('app.MapGet("/", () =>');
    expect(app).toContain("<Routes />");
    expect(routes).toContain('<Router AppAssembly="@typeof(Program).Assembly">');
    expect(home).toContain('@page "/"');
  });

  it("scaffolds .NET Auth0 ASP.NET Core authentication wiring", async () => {
    const result = await createVirtual({
      projectName: "DotnetAuth0",
      ecosystem: "dotnet",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "none",
      dotnetAuth: "auth0-aspnet",
      dotnetApi: "minimal-api",
      dotnetTesting: [],
      dotnetJobQueue: "none",
      dotnetRealtime: "none",
      dotnetObservability: [],
      dotnetCaching: "none",
      dotnetDeploy: "none",
    });

    expect(result.success).toBe(true);

    const projectFile = readTextFromTree(result.tree!, "DotnetAuth0.csproj");
    const program = readTextFromTree(result.tree!, "Program.cs");

    expect(projectFile).toContain('PackageReference Include="Auth0.AspNetCore.Authentication"');
    expect(program).toContain("using Auth0.AspNetCore.Authentication;");
    expect(program).toContain("builder.Services.AddAuth0WebAppAuthentication");
    expect(program).toContain('builder.Configuration["Auth0:Domain"]');
    expect(program).toContain("app.UseAuthentication();");
    expect(program).toContain("app.UseAuthorization();");
  });

  it("scaffolds .NET Duende IdentityServer wiring", async () => {
    const result = await createVirtual({
      projectName: "DotnetDuende",
      ecosystem: "dotnet",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "none",
      dotnetAuth: "duende-identityserver",
      dotnetApi: "minimal-api",
      dotnetTesting: [],
      dotnetJobQueue: "none",
      dotnetRealtime: "none",
      dotnetObservability: [],
      dotnetCaching: "none",
      dotnetDeploy: "none",
    });

    expect(result.success).toBe(true);

    const projectFile = readTextFromTree(result.tree!, "DotnetDuende.csproj");
    const program = readTextFromTree(result.tree!, "Program.cs");

    expect(projectFile).toContain('PackageReference Include="Duende.IdentityServer"');
    expect(program).toContain("using Duende.IdentityServer.Models;");
    expect(program).toContain(".AddIdentityServer()");
    expect(program).toContain('new ApiScope("api", "DotnetDuende API")');
    expect(program).toContain("AllowedGrantTypes = GrantTypes.ClientCredentials");
    expect(program).toContain("app.UseIdentityServer();");
  });

  it("pins Angular to the TypeScript range required by Angular 22", async () => {
    const result = await createVirtual({
      projectName: "AngularTs",
      frontend: ["angular"],
      backend: "fets",
      runtime: "node",
      api: "none",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
      cssFramework: "postcss-only",
      uiLibrary: "none",
      addons: ["turborepo"],
      examples: [],
    });

    expect(result.success).toBe(true);

    const webPackageJson = readJsonFromTree(result.tree!, "apps/web/package.json");

    expect(webPackageJson?.devDependencies?.typescript).toBe(">=6.0.0 <6.1.0");
  });

  it("keeps .NET Minimal API templates valid when EF Core is disabled", async () => {
    const result = await createVirtual({
      projectName: "DotnetNoEf",
      ecosystem: "dotnet",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "none",
      dotnetAuth: "none",
      dotnetApi: "minimal-api",
      dotnetTesting: [],
      dotnetJobQueue: "none",
      dotnetRealtime: "none",
      dotnetObservability: [],
      dotnetCaching: "none",
      dotnetDeploy: "none",
    });

    expect(result.success).toBe(true);

    const projectFile = readTextFromTree(result.tree!, "DotnetNoEf.csproj");
    const program = readTextFromTree(result.tree!, "Program.cs");

    expect(projectFile).not.toContain("EntityFrameworkCore");
    expect(program).not.toContain("AppDbContext");
    expect(program).not.toContain("EntityFrameworkCore");
    expect(program).toContain('app.MapGet("/api/todos", () =>');
    expect(readTextFromTree(result.tree!, "Dockerfile")).toBeUndefined();
    expect(
      readTextFromTree(result.tree!, "DotnetNoEf.Tests/DotnetNoEf.Tests.csproj"),
    ).toBeUndefined();
  });

  it("scaffolds .NET Minimal API data access with Dapper", async () => {
    const result = await createVirtual({
      projectName: "DotnetDapper",
      ecosystem: "dotnet",
      database: "sqlite",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "dapper",
      dotnetAuth: "none",
      dotnetApi: "minimal-api",
      dotnetTesting: [],
      dotnetJobQueue: "none",
      dotnetRealtime: "none",
      dotnetObservability: [],
      dotnetCaching: "none",
      dotnetDeploy: "none",
    });

    expect(result.success).toBe(true);

    const projectFile = readTextFromTree(result.tree!, "DotnetDapper.csproj");
    const program = readTextFromTree(result.tree!, "Program.cs");

    expect(projectFile).toContain('PackageReference Include="Dapper"');
    expect(projectFile).toContain('PackageReference Include="Microsoft.Data.Sqlite"');
    expect(projectFile).not.toContain("EntityFrameworkCore");
    expect(program).toContain("using Dapper;");
    expect(program).toContain("new SqliteConnection(connectionString)");
    expect(program).toContain("CREATE TABLE IF NOT EXISTS Todos");
    expect(program).toContain("QuerySingleAsync<TodoItem>");
    expect(program).not.toContain("AppDbContext");
  });

  it("scaffolds .NET Minimal API data access with Linq2DB", async () => {
    const result = await createVirtual({
      projectName: "DotnetLinq2Db",
      ecosystem: "dotnet",
      database: "sqlite",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "linq2db",
      dotnetAuth: "none",
      dotnetApi: "minimal-api",
      dotnetTesting: [],
      dotnetJobQueue: "none",
      dotnetRealtime: "none",
      dotnetObservability: [],
      dotnetCaching: "none",
      dotnetDeploy: "none",
    });

    expect(result.success).toBe(true);

    const projectFile = readTextFromTree(result.tree!, "DotnetLinq2Db.csproj");
    const program = readTextFromTree(result.tree!, "Program.cs");

    expect(projectFile).toContain('PackageReference Include="linq2db"');
    expect(projectFile).toContain('PackageReference Include="Microsoft.Data.Sqlite"');
    expect(projectFile).not.toContain("EntityFrameworkCore");
    expect(program).toContain("using LinqToDB;");
    expect(program).toContain('[Table("Todos")]');
    expect(program).toContain("ProviderName.SQLiteMS");
    expect(program).toContain("TodoLinq2Db.CreateConnection");
    expect(program).toContain("InsertWithInt32Identity");
    expect(program).not.toContain("AppDbContext");
  });

  it("omits the Quantum scheduler unless Quantum jobs are selected", async () => {
    const result = await createVirtual({
      projectName: "elixir-no-quantum",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirJobs: "none",
    });

    expect(result.success).toBe(true);
    expect(readTextFromTree(result.tree!, "lib/elixir_no_quantum/scheduler.ex")).toBeUndefined();
  });

  it("scaffolds plain Elixir projects without Phoenix web files", async () => {
    const result = await createVirtual({
      projectName: "plain-elixir",
      ecosystem: "elixir",
      elixirWebFramework: "none",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirJobs: "quantum",
      elixirHttp: "req",
      elixirJson: "jason",
      elixirTesting: "none",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    const application = readTextFromTree(result.tree!, "lib/plain_elixir/application.ex");
    const readme = readTextFromTree(result.tree!, "README.md");

    expect(mixProject).toContain("{:quantum");
    expect(mixProject).toContain("{:req");
    expect(mixProject).not.toContain("{:phoenix");
    expect(mixProject).not.toContain("{:plug_cowboy");
    expect(application).toContain("PlainElixir.Scheduler");
    expect(application).not.toContain("PlainElixirWeb.Endpoint");
    expect(readme).toContain("for the Elixir ecosystem");
    expect(readme).toContain("iex -S mix");
    expect(readme).not.toContain("mix phx.server");
    expect(readTextFromTree(result.tree!, "lib/plain_elixir_web/router.ex")).toBeUndefined();
    expect(readTextFromTree(result.tree!, "test/support/conn_case.ex")).toBeUndefined();
    expect(readTextFromTree(result.tree!, "priv/repo/seeds.exs")).toBeUndefined();
  });

  it("uses Req for Elixir Bypass tests instead of Erlang httpc", async () => {
    const result = await createVirtual({
      projectName: "elixir-bypass",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirJobs: "none",
      elixirHttp: "none",
      elixirJson: "jason",
      elixirTesting: "bypass",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    const bypassTest = readTextFromTree(result.tree!, "test/elixir_bypass/bypass_test.exs");

    expect(mixProject).toContain("{:bypass");
    expect(mixProject).toContain("{:req");
    expect(bypassTest).toContain("Req.get(url)");
    expect(bypassTest).not.toContain(":httpc");
  });

  it("keeps Elixir Dockerfiles usable before mix.lock exists", async () => {
    const result = await createVirtual({
      projectName: "elixir-docker",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirDeploy: "docker",
    });

    expect(result.success).toBe(true);
    const dockerfile = readTextFromTree(result.tree!, "Dockerfile");
    expect(dockerfile).toContain("COPY mix.exs ./");
    expect(dockerfile).not.toContain("mix.lock*");
  });

  it("copies priv into Elixir Docker builds for every SQL repository adapter", async () => {
    for (const orm of ["ecto-sql", "myxql", "ecto_sqlite3"] as const) {
      const result = await createVirtual({
        projectName: `elixir-docker-${orm}`,
        ecosystem: "elixir",
        elixirWebFramework: "none",
        elixirOrm: orm,
        elixirDeploy: "docker",
      });

      expect(result.success).toBe(true);
      expect(readTextFromTree(result.tree!, "Dockerfile")).toContain("COPY priv priv");
    }
  });

  it("rolls initial Oban migrations all the way back down", async () => {
    const result = await createVirtual({
      projectName: "elixir-oban",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirJobs: "oban",
    });

    expect(result.success).toBe(true);
    const migration = readTextFromTree(
      result.tree!,
      "priv/repo/migrations/20260101000002_add_oban_jobs.exs",
    );
    expect(migration).toContain("Oban.Migration.up(version: 12)");
    expect(migration).toContain("Oban.Migration.down(version: 1)");
  });

  it("only emits Phoenix sockets when channels or presence are selected", async () => {
    const pubsubResult = await createVirtual({
      projectName: "elixir-pubsub",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirRealtime: "pubsub",
    });
    const channelsResult = await createVirtual({
      projectName: "elixir-channels",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirRealtime: "channels",
    });

    expect(pubsubResult.success).toBe(true);
    expect(channelsResult.success).toBe(true);
    expect(
      readTextFromTree(pubsubResult.tree!, "lib/elixir_pubsub_web/channels/user_socket.ex"),
    ).toBeUndefined();
    expect(
      readTextFromTree(channelsResult.tree!, "lib/elixir_channels_web/channels/user_socket.ex"),
    ).toContain("RoomChannel");
    expect(
      readTextFromTree(channelsResult.tree!, "lib/elixir_channels_web/channels/room_channel.ex"),
    ).toBeDefined();
  });

  it("starts Phoenix Presence when presence realtime is selected", async () => {
    const result = await createVirtual({
      projectName: "elixir-presence",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirRealtime: "presence",
    });

    expect(result.success).toBe(true);
    const application = readTextFromTree(result.tree!, "lib/elixir_presence/application.ex");
    expect(application).toContain("ElixirPresenceWeb.Presence");
    expect(
      readTextFromTree(result.tree!, "lib/elixir_presence_web/channels/presence.ex"),
    ).toBeDefined();
  });

  it("allows CLI validation for generated plain Elixir worker projects", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          projectName: "plain-elixir",
          ecosystem: "elixir",
          elixirWebFramework: "none",
          elixirOrm: "none",
          elixirAuth: "none",
          elixirApi: "none",
          elixirRealtime: "none",
          elixirJobs: "quantum",
          elixirValidation: "none",
          elixirHttp: "req",
          elixirJson: "jason",
          elixirEmail: "none",
          elixirCaching: "cachex",
          elixirObservability: "none",
          elixirTesting: "ex_unit",
          elixirQuality: "credo",
          elixirDeploy: "mix-release",
        }),
      ),
    ).not.toThrow();
  });

  it("continues to reject Phoenix-only Elixir features without Phoenix", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          projectName: "plain-elixir-auth",
          ecosystem: "elixir",
          elixirWebFramework: "none",
          elixirAuth: "phx-gen-auth",
        }),
      ),
    ).toThrow("Elixir auth scaffolds require Phoenix.");
  });

  it("keeps CLI validation aligned with expanded Elixir adapters", () => {
    expect(() =>
      validateElixirProgrammatic({ elixirOrm: "myxql", elixirAuth: "phx-gen-auth" }),
    ).not.toThrow();
    expect(() =>
      validateElixirProgrammatic({ elixirOrm: "ecto_sqlite3", elixirAuth: "phx-gen-auth" }),
    ).not.toThrow();
    expect(() => validateElixirProgrammatic({ elixirHttpServer: "none" })).toThrow(
      "Phoenix requires an HTTP server adapter.",
    );
    expect(() => validateElixirProgrammatic({ elixirOrm: "ecto", elixirAuth: "pow" })).toThrow(
      "Pow requires Phoenix and an Ecto SQL repository.",
    );
    expect(() =>
      validateElixirProgrammatic({ elixirOrm: "none", elixirTesting: "ex_machina" }),
    ).toThrow("ExMachina requires an Ecto SQL repository.");
  });

  it("keeps Phoenix LiveView demos self-contained without Ecto", async () => {
    const baseline = await createVirtual({
      projectName: "elixir-live-baseline",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix-live-view",
      elixirOrm: "none",
      elixirApi: "none",
      elixirRealtime: "none",
    });

    expect(baseline.success).toBe(true);
    expect(
      readTextFromTree(baseline.tree!, "lib/elixir_live_baseline_web/live/item_live/index.ex"),
    ).toBeUndefined();

    const result = await createVirtual({
      projectName: "elixir-live-no-ecto",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix-live-view",
      elixirOrm: "none",
      elixirApi: "none",
      elixirRealtime: "live-view-streams",
    });

    expect(result.success).toBe(true);

    const liveView = readTextFromTree(
      result.tree!,
      "lib/elixir_live_no_ecto_web/live/item_live/index.ex",
    );
    expect(liveView).toContain("System.unique_integer");
    expect(liveView).not.toContain("Catalog.");
    expect(readTextFromTree(result.tree!, "lib/elixir_live_no_ecto/catalog.ex")).toBeUndefined();
  });

  it("scaffolds phx.gen.auth-style password hashing and session endpoints", async () => {
    const result = await createVirtual({
      projectName: "elixir-auth",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirAuth: "phx-gen-auth",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    const userSchema = readTextFromTree(result.tree!, "lib/elixir_auth/accounts/user.ex");
    const accounts = readTextFromTree(result.tree!, "lib/elixir_auth/accounts.ex");
    const router = readTextFromTree(result.tree!, "lib/elixir_auth_web/router.ex");
    const sessionController = readTextFromTree(
      result.tree!,
      "lib/elixir_auth_web/controllers/user_session_controller.ex",
    );

    expect(mixProject).toContain("{:bcrypt_elixir");
    expect(userSchema).toContain("field :password, :string, virtual: true");
    expect(userSchema).toContain("Bcrypt.hash_pwd_salt(password)");
    expect(userSchema).toContain("Bcrypt.verify_pass(password, hashed_password)");
    expect(userSchema).not.toContain("cast(attrs, [:email, :hashed_password])");
    expect(
      readTextFromTree(result.tree!, "priv/repo/migrations/20260101000001_create_users.exs"),
    ).toBeDefined();
    expect(accounts).toContain("get_user_by_email_and_password");
    expect(router).toContain('post "/users/register", UserSessionController, :register');
    expect(router).toContain('post "/users/login", UserSessionController, :login');
    expect(sessionController).toContain("def login");
  });

  it("skips auth-only user migration when Elixir auth is disabled", async () => {
    const result = await createVirtual({
      projectName: "elixir-no-auth",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirRealtime: "none",
      elixirJobs: "none",
    });

    expect(result.success).toBe(true);
    expect(
      readTextFromTree(result.tree!, "priv/repo/migrations/20260101000001_create_users.exs"),
    ).toBeUndefined();
  });

  it("normalizes Elixir app and module names that start with digits", async () => {
    const result = await createVirtual({
      projectName: "123-app",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    expect(mixProject).toContain("defmodule App123App.MixProject do");
    expect(mixProject).toContain("app: :app_123_app");
    expect(readTextFromTree(result.tree!, "lib/app_123_app/application.ex")).toContain(
      "defmodule App123App.Application do",
    );
  });
});
