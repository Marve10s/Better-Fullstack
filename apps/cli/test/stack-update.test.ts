import { afterAll, describe, expect, it } from "bun:test";
import { generateVirtualProject, EMBEDDED_TEMPLATES } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import {
  createCliDefaultProjectConfigBase,
  parseStackPartSpecs,
  type ProjectConfig,
} from "@better-fullstack/types";
import * as JSONC from "jsonc-parser";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { CreateCommandOptionsSchema } from "../src/create-command-input";
import {
  applyStackUpdate,
  planStackUpdate,
  SUPPORTED_STACK_UPDATE_KEYS,
} from "../src/helpers/core/stack-update";
import { MCP_STACK_UPDATE_SCHEMA } from "../src/mcp";
import { buildBtsConfigForPersistence, writeBtsConfig } from "../src/utils/bts-config";

const TEMP_ROOTS: string[] = [];

async function makeTempRoot(prefix: string): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), prefix));
  TEMP_ROOTS.push(root);
  return root;
}

function makeConfig(projectDir: string, overrides: Partial<ProjectConfig> = {}): ProjectConfig {
  return {
    ...createCliDefaultProjectConfigBase(),
    projectName: "app",
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
    ...overrides,
  } as ProjectConfig;
}

async function scaffoldGeneratedProject(config: ProjectConfig): Promise<void> {
  const persistedConfig = buildBtsConfigForPersistence(config);
  const normalizedConfig = {
    ...config,
    ...persistedConfig,
    projectName: config.projectName,
    projectDir: config.projectDir,
    relativePath: config.relativePath,
    git: false,
    install: false,
  } as ProjectConfig;
  const result = await generateVirtualProject({ config: normalizedConfig, templates: EMBEDDED_TEMPLATES });
  if (!result.success || !result.tree) {
    throw new Error(result.error ?? "Failed to generate fixture project");
  }
  await writeTreeToFilesystem(result.tree, config.projectDir);
  await writeBtsConfig(normalizedConfig, {
    version: persistedConfig.version,
    createdAt: persistedConfig.createdAt,
  });
}

async function readJsonc(path: string): Promise<Record<string, unknown>> {
  const raw = await readFile(path, "utf-8");
  const errors: JSONC.ParseError[] = [];
  const parsed = JSONC.parse(raw, errors, {
    allowTrailingComma: true,
    disallowComments: false,
  });
  if (errors.length > 0) throw new Error(`Failed to parse ${path}`);
  return parsed as Record<string, unknown>;
}

async function expectFileContains(path: string, expected: string): Promise<void> {
  await expect(readFile(path, "utf-8")).resolves.toContain(expected);
}

async function expectFileNotContains(path: string, expected: string): Promise<void> {
  await expect(readFile(path, "utf-8")).resolves.not.toContain(expected);
}

async function pathExists(target: string): Promise<boolean> {
  return readFile(target, "utf-8").then(
    () => true,
    () => false,
  );
}

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
});

const CREATE_ONLY_KEYS = new Set([
  "template",
  "fromHistory",
  "config",
  "yes",
  "yolo",
  "verbose",
  "dryRun",
  "verify",
  "git",
  "install",
  "directoryConflict",
  "renderTitle",
  "disableAnalytics",
  "manualDb",
  "workspaceShape",
]);

const NON_TS_BASE_CONFIG: Partial<ProjectConfig> = {
  frontend: ["none"],
  backend: "none",
  runtime: "none",
  database: "none",
  orm: "none",
  api: "none",
  auth: "none",
};

const PYTHON_BASE_CONFIG: Partial<ProjectConfig> = {
  ...NON_TS_BASE_CONFIG,
  ecosystem: "python",
  pythonWebFramework: "fastapi",
  pythonOrm: "none",
  pythonApi: "none",
  pythonAuth: "none",
  pythonValidation: "none",
  pythonTaskQueue: "none",
  pythonQuality: "none",
  pythonCaching: "none",
  pythonRealtime: "none",
  pythonObservability: "none",
  pythonAi: [],
  pythonTesting: [],
  pythonCli: [],
};

const GO_BASE_CONFIG: Partial<ProjectConfig> = {
  ...NON_TS_BASE_CONFIG,
  ecosystem: "go",
  goWebFramework: "gin",
  goOrm: "none",
  goApi: "none",
  goAuth: "none",
  goLogging: "none",
  goCaching: "none",
  goRealtime: "none",
  goMessageQueue: "none",
  goConfig: "none",
  goObservability: "none",
  goCli: "none",
  goTesting: [],
};

const RUST_BASE_CONFIG: Partial<ProjectConfig> = {
  ...NON_TS_BASE_CONFIG,
  ecosystem: "rust",
  rustWebFramework: "axum",
  rustOrm: "none",
  rustApi: "none",
  rustAuth: "none",
  rustLogging: "none",
  rustErrorHandling: "none",
  rustCaching: "none",
  rustRealtime: "none",
  rustMessageQueue: "none",
  rustObservability: "none",
  rustTemplating: "none",
  rustCli: "none",
  rustLibraries: [],
};

const JAVA_BASE_CONFIG: Partial<ProjectConfig> = {
  ...NON_TS_BASE_CONFIG,
  ecosystem: "java",
  javaWebFramework: "spring-boot",
  javaBuildTool: "maven",
  javaOrm: "none",
  javaAuth: "none",
  javaApi: "none",
  javaLogging: "none",
  javaLibraries: [],
  javaTestingLibraries: [],
};

const DOTNET_BASE_CONFIG: Partial<ProjectConfig> = {
  ...NON_TS_BASE_CONFIG,
  ecosystem: "dotnet",
  dotnetWebFramework: "aspnet-minimal",
  dotnetOrm: "none",
  dotnetAuth: "none",
  dotnetApi: "none",
  dotnetTesting: [],
  dotnetJobQueue: "none",
  dotnetRealtime: "none",
  dotnetObservability: [],
  dotnetValidation: "none",
  dotnetCaching: "none",
  dotnetDeploy: "none",
};

const ELIXIR_BASE_CONFIG: Partial<ProjectConfig> = {
  ...NON_TS_BASE_CONFIG,
  ecosystem: "elixir",
  elixirWebFramework: "phoenix",
  elixirOrm: "ecto-sql",
  elixirAuth: "none",
  elixirApi: "none",
  elixirRealtime: "none",
  elixirJobs: "none",
  elixirValidation: "none",
  elixirHttp: "none",
  elixirJson: "jason",
  elixirEmail: "none",
  elixirCaching: "none",
  elixirObservability: "none",
  elixirTesting: "none",
  elixirQuality: "none",
  elixirDeploy: "none",
  elixirLibraries: [],
};

const TYPESCRIPT_SERVICE_BASE_CONFIG: Partial<ProjectConfig> = {
  frontend: ["react-vite"],
  backend: "hono",
  runtime: "bun",
  database: "none",
  orm: "none",
  api: "none",
  auth: "none",
  payments: "none",
  email: "none",
  fileUpload: "none",
  ai: "none",
  stateManagement: "none",
  realtime: "none",
  jobQueue: "none",
  animation: "none",
  logging: "none",
  observability: "none",
  featureFlags: "none",
  analytics: "none",
  cms: "none",
  caching: "none",
  rateLimit: "none",
  i18n: "none",
  search: "none",
  vectorDb: "none",
  fileStorage: "none",
};

const TYPESCRIPT_FRONTEND_ONLY_CONFIG: Partial<ProjectConfig> = {
  ...TYPESCRIPT_SERVICE_BASE_CONFIG,
  backend: "none",
  runtime: "none",
};

const TYPESCRIPT_API_ONLY_CONFIG: Partial<ProjectConfig> = {
  ...TYPESCRIPT_SERVICE_BASE_CONFIG,
  frontend: ["none"],
  backend: "hono",
  runtime: "bun",
};

describe("stack update planner", () => {
  it("keeps MCP update fields aligned with create-time stack fields", () => {
    const expectedStackKeys = Object.keys(CreateCommandOptionsSchema.shape)
      .filter((key) => !CREATE_ONLY_KEYS.has(key))
      .sort();
    const mcpUpdateKeys = Object.keys(MCP_STACK_UPDATE_SCHEMA)
      .filter(
        (key) =>
          key !== "projectDir" && key !== "projectName" && key !== "acknowledgeArchitectureChange",
      )
      .sort();

    expect(mcpUpdateKeys).toEqual(expectedStackKeys);
    expect(SUPPORTED_STACK_UPDATE_KEYS).toEqual(expectedStackKeys);
  });

  it("plans and applies scaffold-time category additions", async () => {
    const root = await makeTempRoot("bfs-stack-update-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir));

    const plan = await planStackUpdate(projectDir, { email: "resend" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.email).toBe("resend");
    expect(plan.filesToAdd).toContain("apps/server/src/lib/email.ts");
    expect(Object.values(plan.dependencyChanges).some((deps) => "resend" in deps)).toBe(true);
    expect(Object.values(plan.envChanges).flat()).toEqual(
      expect.arrayContaining(["RESEND_API_KEY", "RESEND_FROM_EMAIL"]),
    );
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { email: "resend" });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.email).toBe("resend");

    const serverPkg = (await readJsonc(join(projectDir, "apps/server/package.json"))) as {
      dependencies?: Record<string, string>;
    };
    expect(serverPkg.dependencies?.resend).toBeDefined();
  });

  it("plans and applies the Ultracite addon through generic stack updates", async () => {
    const root = await makeTempRoot("bfs-stack-update-ultracite-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        frontend: ["react-vite"],
        backend: "hono",
        runtime: "bun",
        api: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      }),
    );

    const plan = await planStackUpdate(projectDir, { addons: ["ultracite"] });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.addons).toContain("ultracite");
    expect(plan.filesToAdd).toContain("biome.jsonc");
    expect(plan.filesToPatch).toContain("package.json");
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { addons: ["ultracite"] });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.addons).toEqual(["ultracite"]);

    const rootPkg = (await readJsonc(join(projectDir, "package.json"))) as {
      scripts?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    expect(rootPkg.devDependencies?.ultracite).toBeDefined();
    expect(rootPkg.devDependencies?.["@biomejs/biome"]).toBeDefined();
    expect(rootPkg.scripts?.lint).toBe("ultracite check");
    await expectFileContains(join(projectDir, "biome.jsonc"), "ultracite/biome/core");
  });

  it("plans and applies the WXT addon through generic stack updates", async () => {
    const root = await makeTempRoot("bfs-stack-update-wxt-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        frontend: ["react-vite"],
        backend: "hono",
        runtime: "bun",
        api: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      }),
    );

    const plan = await planStackUpdate(projectDir, { addons: ["wxt"] });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.addons).toContain("wxt");
    expect(plan.filesToAdd).toContain("apps/extension/package.json");
    expect(plan.filesToAdd).toContain("apps/extension/wxt.config.ts");
    expect(plan.filesToAdd).toContain("apps/extension/entrypoints/popup/App.tsx");
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { addons: ["wxt"] });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.addons).toEqual(["wxt"]);

    const extensionPkg = (await readJsonc(join(projectDir, "apps/extension/package.json"))) as {
      scripts?: Record<string, string>;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    expect(extensionPkg.scripts?.dev).toBe("wxt --port 5555");
    expect(extensionPkg.dependencies?.react).toBeDefined();
    expect(extensionPkg.devDependencies?.wxt).toBeDefined();
    await expectFileContains(join(projectDir, "apps/extension/wxt.config.ts"), "@wxt-dev/module-react");
  });

  it("plans and applies the OpenTUI addon through generic stack updates", async () => {
    const root = await makeTempRoot("bfs-stack-update-opentui-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        frontend: ["react-vite"],
        backend: "hono",
        runtime: "bun",
        api: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      }),
    );

    const plan = await planStackUpdate(projectDir, { addons: ["opentui"] });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.addons).toContain("opentui");
    expect(plan.filesToAdd).toContain("apps/tui/package.json");
    expect(plan.filesToAdd).toContain("apps/tui/src/index.ts");
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { addons: ["opentui"] });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.addons).toEqual(["opentui"]);

    const tuiPkg = (await readJsonc(join(projectDir, "apps/tui/package.json"))) as {
      scripts?: Record<string, string>;
      dependencies?: Record<string, string>;
    };
    expect(tuiPkg.scripts?.dev).toBe("bun src/index.ts");
    expect(tuiPkg.dependencies?.["@opentui/core"]).toBeDefined();
    await expectFileContains(join(projectDir, "apps/tui/src/index.ts"), "createCliRenderer");
  });

  it("plans and applies the Fumadocs addon through generic stack updates", async () => {
    const root = await makeTempRoot("bfs-stack-update-fumadocs-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        packageManager: "bun",
        frontend: ["react-vite"],
        backend: "hono",
        runtime: "bun",
        api: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      }),
    );

    const plan = await planStackUpdate(projectDir, { addons: ["fumadocs"] });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.addons).toContain("fumadocs");
    expect(plan.filesToAdd).toContain("apps/docs/package.json");
    expect(plan.filesToAdd).toContain("apps/docs/source.config.ts");
    expect(plan.filesToAdd).toContain("apps/docs/app/docs/[[...slug]]/page.tsx");
    expect(plan.filesToPatch).toContain("package.json");
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { addons: ["fumadocs"] });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.addons).toEqual(["fumadocs"]);

    const rootPkg = (await readJsonc(join(projectDir, "package.json"))) as {
      scripts?: Record<string, string>;
    };
    expect(rootPkg.scripts?.["dev:docs"]).toBe("bun run --filter docs dev");

    const docsPkg = (await readJsonc(join(projectDir, "apps/docs/package.json"))) as {
      scripts?: Record<string, string>;
      dependencies?: Record<string, string>;
    };
    expect(docsPkg.scripts?.dev).toBe("next dev --port 4000");
    expect(docsPkg.dependencies?.["fumadocs-core"]).toBeDefined();
    expect(docsPkg.dependencies?.["fumadocs-mdx"]).toBeDefined();
    expect(docsPkg.dependencies?.["fumadocs-ui"]).toBeDefined();
    await expectFileContains(join(projectDir, "apps/docs/source.config.ts"), "defineDocs");
  });

  it("plans and applies the skills addon through generic stack updates", async () => {
    const root = await makeTempRoot("bfs-stack-update-skills-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        packageManager: "bun",
        frontend: ["react-vite"],
        backend: "hono",
        runtime: "bun",
        api: "none",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
        addons: [],
        examples: [],
        dbSetup: "none",
        webDeploy: "none",
        serverDeploy: "none",
      }),
    );

    const plan = await planStackUpdate(projectDir, { addons: ["skills"] });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.addons).toContain("skills");
    expect(plan.filesToAdd).toContain(".agents/skills/README.md");
    expect(plan.filesToAdd).toContain(".agents/skills/better-fullstack/SKILL.md");
    expect(plan.filesToAdd).toContain(".agents/skills/better-fullstack/agents/openai.yaml");
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { addons: ["skills"] });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.addons).toEqual(["skills"]);

    await expectFileContains(join(projectDir, ".agents/skills/better-fullstack/SKILL.md"), "name: better-fullstack");
    await expectFileContains(join(projectDir, ".agents/skills/better-fullstack/SKILL.md"), "Use `bun`");
    await expectFileContains(
      join(projectDir, ".agents/skills/better-fullstack/agents/openai.yaml"),
      "Better Fullstack",
    );
  });

  it("persists theme and vector database stack updates in bts config", async () => {
    const root = await makeTempRoot("bfs-stack-update-persist-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir));

    const result = await applyStackUpdate(projectDir, {
      shadcnStyle: "maia",
      shadcnColorTheme: "blue",
      vectorDb: "qdrant",
    });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.shadcnStyle).toBe("maia");
    expect(btsConfig.shadcnColorTheme).toBe("blue");
    expect(btsConfig.vectorDb).toBe("qdrant");
  });

  it("persists Astro integration stack updates in bts config", async () => {
    const root = await makeTempRoot("bfs-stack-update-astro-integration-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        frontend: ["astro"],
        backend: "none",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        auth: "none",
        astroIntegration: "none",
        uiLibrary: "none",
      }),
    );

    const result = await applyStackUpdate(projectDir, { astroIntegration: "vue" });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.astroIntegration).toBe("vue");
  });

  it("plans and applies stack updates from graph-authoritative bts config instead of stale cache fields", async () => {
    const root = await makeTempRoot("bfs-stack-update-graph-authority-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        stackParts: parseStackPartSpecs([
          "frontend:typescript:next",
          "frontend.css:typescript:scss",
          "frontend.ui:typescript:none",
          "mobile:react-native:native-bare",
          "mobile.push:react-native:expo-notifications",
          "mobile.ota:react-native:expo-updates",
          "mobile.deepLinking:react-native:expo-linking",
          "backend:typescript:hono",
          "backend.runtime:typescript:bun",
        ]),
        frontend: ["svelte"],
        cssFramework: "tailwind",
        uiLibrary: "shadcn-svelte",
        backend: "elysia",
        runtime: "node",
      }),
    );

    const configPath = join(projectDir, "bts.jsonc");
    let staleContent = await readFile(configPath, "utf-8");
    for (const [key, value] of Object.entries({
      frontend: ["svelte"],
      cssFramework: "tailwind",
      uiLibrary: "shadcn-svelte",
      mobilePush: "none",
      mobileOTA: "none",
      mobileDeepLinking: "none",
      backend: "elysia",
      runtime: "node",
      graphSummary: "stale graph summary",
      effectiveStack: { frontend: "typescript:svelte", backend: "typescript:elysia" },
    })) {
      staleContent = JSONC.applyEdits(
        staleContent,
        JSONC.modify(staleContent, [key], value, {
          formattingOptions: {
            tabSize: 2,
            insertSpaces: true,
            eol: "\n",
          },
        }),
      );
    }
    await writeFile(configPath, staleContent, "utf-8");

    const plan = await planStackUpdate(projectDir, { webDeploy: "vercel" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.frontend).toEqual(["next", "native-bare"]);
    expect(plan.proposedConfig.cssFramework).toBe("scss");
    expect(plan.proposedConfig.uiLibrary).toBe("none");
    expect(plan.proposedConfig.mobilePush).toBe("expo-notifications");
    expect(plan.proposedConfig.mobileOTA).toBe("expo-updates");
    expect(plan.proposedConfig.mobileDeepLinking).toBe("expo-linking");
    expect(plan.proposedConfig.backend).toBe("hono");
    expect(plan.proposedConfig.runtime).toBe("bun");
    expect(plan.proposedConfig.webDeploy).toBe("vercel");
    expect(plan.effectiveStack).toMatchObject({
      frontend: "typescript:next",
      "frontend.css": "typescript:scss",
      mobile: "react-native:native-bare",
      "mobile.push": "react-native:expo-notifications",
      "mobile.ota": "react-native:expo-updates",
      "mobile.deepLinking": "react-native:expo-linking",
      backend: "typescript:hono",
      "backend.runtime": "typescript:bun",
      "frontend.deploy": "typescript:vercel",
    });
    expect(plan.effectiveStack).not.toHaveProperty("frontend.ui");

    const result = await applyStackUpdate(projectDir, { webDeploy: "vercel" });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(configPath);
    expect(btsConfig.frontend).toEqual(["next", "native-bare"]);
    expect(btsConfig.cssFramework).toBe("scss");
    expect(btsConfig.uiLibrary).toBe("none");
    expect(btsConfig.mobilePush).toBe("expo-notifications");
    expect(btsConfig.mobileOTA).toBe("expo-updates");
    expect(btsConfig.mobileDeepLinking).toBe("expo-linking");
    expect(btsConfig.backend).toBe("hono");
    expect(btsConfig.runtime).toBe("bun");
    expect(btsConfig.webDeploy).toBe("vercel");
    expect(btsConfig.effectiveStack).toMatchObject({
      frontend: "typescript:next",
      "frontend.css": "typescript:scss",
      mobile: "react-native:native-bare",
      "mobile.push": "react-native:expo-notifications",
      "mobile.ota": "react-native:expo-updates",
      "mobile.deepLinking": "react-native:expo-linking",
      backend: "typescript:hono",
      "backend.runtime": "typescript:bun",
      "frontend.deploy": "typescript:vercel",
    });
    expect(btsConfig.effectiveStack).not.toHaveProperty("frontend.ui");
  });

  it("preserves existing scoped graph parts when applying unrelated flat-field updates", async () => {
    const root = await makeTempRoot("bfs-stack-update-scoped-graph-preserve-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        stackParts: parseStackPartSpecs([
          "backend:typescript:hono",
          "backend.database:typescript:sqlite",
          "backend.orm:typescript:drizzle",
          "backend.runtime:typescript:bun",
        ]),
        backend: "hono",
        database: "sqlite",
        orm: "drizzle",
        runtime: "bun",
      }),
    );

    const plan = await planStackUpdate(projectDir, { email: "resend" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.email).toBe("resend");
    expect(plan.stackPartSpecs).toContain("backend.database:typescript:sqlite");
    expect(plan.stackPartSpecs).not.toContain("database:universal:sqlite");
    expect(plan.stackPartSpecs).toContain("backend.email:typescript:resend");

    const result = await applyStackUpdate(projectDir, { email: "resend" });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    const persistedStackSpecs = (btsConfig.stackParts as Array<{
      role: string;
      ecosystem: string;
      toolId: string;
      ownerPartId?: string;
    }>).map((part) => ({
      role: part.role,
      ecosystem: part.ecosystem,
      toolId: part.toolId,
      ownerPartId: part.ownerPartId,
    }));
    expect(persistedStackSpecs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: "database",
          ecosystem: "typescript",
          toolId: "sqlite",
          ownerPartId: "backend:typescript:hono",
        }),
        expect.objectContaining({
          role: "email",
          ecosystem: "typescript",
          toolId: "resend",
          ownerPartId: "backend:typescript:hono",
        }),
      ]),
    );
    expect(persistedStackSpecs).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: "database",
          ecosystem: "universal",
          toolId: "sqlite",
        }),
      ]),
    );
  });

  it("keeps scoped graph ownership when updating an existing scoped flat value", async () => {
    const root = await makeTempRoot("bfs-stack-update-scoped-graph-change-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        stackParts: parseStackPartSpecs([
          "backend:typescript:hono",
          "backend.database:typescript:sqlite",
          "backend.orm:typescript:drizzle",
          "backend.runtime:typescript:bun",
        ]),
        backend: "hono",
        database: "sqlite",
        orm: "drizzle",
        runtime: "bun",
      }),
    );

    const plan = await planStackUpdate(projectDir, { database: "postgres" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.database).toBe("postgres");
    expect(plan.stackPartSpecs).toContain("backend.database:typescript:postgres");
    expect(plan.stackPartSpecs).not.toContain("database:universal:postgres");

    const result = await applyStackUpdate(projectDir, {
      database: "postgres",
      acknowledgeArchitectureChange: true,
    });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.database).toBe("postgres");
    expect(btsConfig.stackParts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: "database",
          ecosystem: "typescript",
          toolId: "postgres",
          ownerPartId: "backend:typescript:hono",
        }),
      ]),
    );
    expect(btsConfig.stackParts).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: "database",
          ecosystem: "universal",
          toolId: "postgres",
        }),
      ]),
    );
  });

  it("does not block updates on untouched generated binary assets", async () => {
    const cases: Array<{
      name: string;
      config: Partial<ProjectConfig>;
      update: Partial<ProjectConfig>;
      field: keyof ProjectConfig;
      expected: unknown;
    }> = [
      {
        name: "next-favicon",
        config: {
          frontend: ["next"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          api: "none",
          auth: "none",
          i18n: "none",
        },
        update: { i18n: "next-intl" },
        field: "i18n",
        expected: "next-intl",
      },
      {
        name: "svelte-favicon",
        config: {
          frontend: ["svelte"],
          backend: "none",
          runtime: "none",
          database: "none",
          orm: "none",
          api: "none",
          auth: "none",
          uiLibrary: "none",
        },
        update: { uiLibrary: "shadcn-svelte" },
        field: "uiLibrary",
        expected: "shadcn-svelte",
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-update-binary-${testCase.name}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, testCase.config));

      const plan = await planStackUpdate(projectDir, testCase.update);
      expect(plan.success).toBe(true);
      if (!plan.success) continue;
      expect(plan.manualReviewBlockers).toEqual([]);

      const result = await applyStackUpdate(projectDir, testCase.update);
      expect(result.success).toBe(true);

      const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
      expect(btsConfig[testCase.field]).toEqual(testCase.expected);
    }
  });

  it("uses the generated project name when the project folder has been renamed", async () => {
    const root = await makeTempRoot("bfs-stack-update-renamed-");
    const projectDir = join(root, "renamed-folder");
    await scaffoldGeneratedProject(makeConfig(projectDir, { projectName: "app" }));

    const plan = await planStackUpdate(projectDir, { email: "resend" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { email: "resend" });
    expect(result.success).toBe(true);
    await expectFileContains(join(projectDir, "apps/server/package.json"), "resend");
  });

  it("drops none placeholders when adding array-based stack options", async () => {
    const root = await makeTempRoot("bfs-stack-update-arrays-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        frontend: ["none"],
        backend: "hono",
        runtime: "bun",
        database: "none",
        orm: "none",
        api: "none",
        auth: "none",
        addons: ["none"],
        examples: ["none"],
        aiDocs: ["none"],
      }),
    );

    const result = await applyStackUpdate(projectDir, {
      frontend: ["react-vite"],
      addons: ["biome"],
      examples: ["ai"],
      aiDocs: ["agents-md"],
    });
    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.proposedConfig.frontend).toEqual(["react-vite"]);
    expect(result.proposedConfig.addons).toEqual(["biome"]);
    expect(result.proposedConfig.examples).toEqual(["ai"]);
    expect(result.proposedConfig.aiDocs).toEqual(["agents-md"]);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.frontend).toEqual(["react-vite"]);
    expect(btsConfig.addons).toEqual(["biome"]);
    expect(btsConfig.examples).toEqual(["ai"]);
    expect(btsConfig.aiDocs).toEqual(["agents-md"]);
  });

  it(
    "applies broad TypeScript scaffold-time service categories",
    async () => {
      const cases: Array<{
        field: keyof ProjectConfig;
        value: string;
      }> = [
        { field: "analytics", value: "plausible" },
        { field: "search", value: "meilisearch" },
        { field: "caching", value: "upstash-redis" },
        { field: "rateLimit", value: "arcjet" },
        { field: "fileStorage", value: "s3" },
        { field: "featureFlags", value: "launchdarkly" },
        { field: "cms", value: "sanity" },
        { field: "jobQueue", value: "bullmq" },
        { field: "realtime", value: "socket-io" },
        { field: "ai", value: "vercel-ai" },
        { field: "fileUpload", value: "uploadthing" },
        { field: "animation", value: "framer-motion" },
        { field: "logging", value: "pino" },
        { field: "stateManagement", value: "zustand" },
        { field: "i18n", value: "paraglide" },
        { field: "payments", value: "stripe" },
      ];

      for (const testCase of cases) {
        const root = await makeTempRoot(`bfs-stack-update-${String(testCase.field)}-`);
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_SERVICE_BASE_CONFIG));

        const plan = await planStackUpdate(projectDir, { [testCase.field]: testCase.value });
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        expect(plan.proposedConfig[testCase.field]).toBe(testCase.value);
        expect(plan.manualReviewBlockers).toEqual([]);
        expect(plan.filesToAdd.length + plan.filesToPatch.length).toBeGreaterThan(0);

        const result = await applyStackUpdate(projectDir, { [testCase.field]: testCase.value });
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        expect(btsConfig[testCase.field]).toBe(testCase.value);
      }
    },
    { timeout: 20_000 },
  );

  it(
    "persists remaining flat stack update fields without direct file assertions",
    async () => {
      const cases: Array<{
        name: string;
        config: Partial<ProjectConfig>;
        update: Partial<ProjectConfig>;
        expected: Partial<ProjectConfig>;
      }> = [
        {
          name: "effect",
          config: TYPESCRIPT_SERVICE_BASE_CONFIG,
          update: { effect: "effect" },
          expected: { effect: "effect" },
        },
        {
          name: "forms",
          config: TYPESCRIPT_SERVICE_BASE_CONFIG,
          update: { forms: "react-hook-form" },
          expected: { forms: "react-hook-form" },
        },
        {
          name: "package-manager",
          config: TYPESCRIPT_SERVICE_BASE_CONFIG,
          update: { packageManager: "pnpm" },
          expected: { packageManager: "pnpm" },
        },
        {
          name: "version-channel",
          config: TYPESCRIPT_SERVICE_BASE_CONFIG,
          update: { versionChannel: "latest" },
          expected: { versionChannel: "latest" },
        },
        {
          name: "web-deploy",
          config: TYPESCRIPT_SERVICE_BASE_CONFIG,
          update: { webDeploy: "vercel" },
          expected: { webDeploy: "vercel" },
        },
        {
          name: "shadcn-details",
          config: {
            ...TYPESCRIPT_SERVICE_BASE_CONFIG,
            cssFramework: "tailwind",
            uiLibrary: "shadcn-ui",
          },
          update: {
            shadcnBase: "base",
            shadcnBaseColor: "zinc",
            shadcnFont: "geist",
            shadcnIconLibrary: "tabler",
            shadcnRadius: "large",
          },
          expected: {
            shadcnBase: "base",
            shadcnBaseColor: "zinc",
            shadcnFont: "geist",
            shadcnIconLibrary: "tabler",
            shadcnRadius: "large",
          },
        },
        {
          name: "rust-frontend",
          config: RUST_BASE_CONFIG,
          update: { rustFrontend: "leptos" },
          expected: { rustFrontend: "leptos" },
        },
      ];

      for (const testCase of cases) {
        const root = await makeTempRoot(`bfs-stack-update-flat-${testCase.name}-`);
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(makeConfig(projectDir, testCase.config));

        const plan = await planStackUpdate(projectDir, testCase.update);
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        for (const [key, value] of Object.entries(testCase.expected)) {
          expect(plan.proposedConfig[key as keyof ProjectConfig]).toEqual(value);
        }
        expect(plan.manualReviewBlockers).toEqual([]);

        const result = await applyStackUpdate(projectDir, testCase.update);
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        for (const [key, value] of Object.entries(testCase.expected)) {
          expect(btsConfig[key]).toEqual(value);
        }
      }
    },
    { timeout: 20_000 },
  );

  it("applies stack graph part updates through the MCP update path", async () => {
    const root = await makeTempRoot("bfs-stack-update-part-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_SERVICE_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, {
      part: ["backend.api:typescript:trpc"],
    });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.api).toBe("trpc");
    expect(plan.stackPartSpecs).toContain("backend.api:typescript:trpc");
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, {
      part: ["backend.api:typescript:trpc"],
    });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.api).toBe("trpc");
    expect(btsConfig.stackParts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: "api",
          ecosystem: "typescript",
          toolId: "trpc",
        }),
      ]),
    );
  });

  it("expands required dependencies for supported stack updates", async () => {
    const root = await makeTempRoot("bfs-stack-update-dependent-polar-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_SERVICE_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, { payments: "polar" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.payments).toBe("polar");
    expect(plan.proposedConfig.auth).toBe("better-auth");
    expect(plan.proposedConfig.database).toBe("sqlite");
    expect(plan.proposedConfig.orm).toBe("drizzle");
    expect(plan.compatibilityAdjustments).toEqual(
      expect.arrayContaining([
        "payments: Auth set to 'better-auth' (Polar requires Better Auth)",
        "payments: Database set to 'sqlite' (Better Auth requires a SQL database)",
        "payments: ORM set to 'drizzle' (Better Auth requires an adapter)",
      ]),
    );
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { payments: "polar" });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.payments).toBe("polar");
    expect(btsConfig.auth).toBe("better-auth");
    expect(btsConfig.database).toBe("sqlite");
    expect(btsConfig.orm).toBe("drizzle");
  });

  it("expands UI library updates to their required CSS framework", async () => {
    const root = await makeTempRoot("bfs-stack-update-ui-css-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        ...TYPESCRIPT_SERVICE_BASE_CONFIG,
        frontend: ["react-vite"],
        cssFramework: "none",
        uiLibrary: "none",
      }),
    );

    const plan = await planStackUpdate(projectDir, { uiLibrary: "shadcn-ui" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.uiLibrary).toBe("shadcn-ui");
    expect(plan.proposedConfig.cssFramework).toBe("tailwind");
    expect(plan.compatibilityAdjustments).toContain(
      "uiLibrary: CSS framework set to 'tailwind' (shadcn-ui requires Tailwind CSS)",
    );
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { uiLibrary: "shadcn-ui" });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.uiLibrary).toBe("shadcn-ui");
    expect(btsConfig.cssFramework).toBe("tailwind");
  });

  it("expands direct Better Auth updates to the required SQL database and ORM", async () => {
    const root = await makeTempRoot("bfs-stack-update-dependent-better-auth-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_SERVICE_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, { auth: "better-auth" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.auth).toBe("better-auth");
    expect(plan.proposedConfig.database).toBe("sqlite");
    expect(plan.proposedConfig.orm).toBe("drizzle");
    expect(plan.compatibilityAdjustments).toEqual(
      expect.arrayContaining([
        "auth: Database set to 'sqlite' (Better Auth requires a SQL database)",
        "auth: ORM set to 'drizzle' (Better Auth requires an adapter)",
      ]),
    );
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { auth: "better-auth" });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.auth).toBe("better-auth");
    expect(btsConfig.database).toBe("sqlite");
    expect(btsConfig.orm).toBe("drizzle");
  });

  it("expands direct Better Auth updates on frontend-only projects to a server stack", async () => {
    const root = await makeTempRoot("bfs-stack-update-dependent-better-auth-frontend-only-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_FRONTEND_ONLY_CONFIG));

    const plan = await planStackUpdate(projectDir, { auth: "better-auth" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.auth).toBe("better-auth");
    expect(plan.proposedConfig.backend).toBe("hono");
    expect(plan.proposedConfig.runtime).toBe("bun");
    expect(plan.proposedConfig.database).toBe("sqlite");
    expect(plan.proposedConfig.orm).toBe("drizzle");
    expect(plan.filesToAdd).toContain("apps/server/package.json");
    expect(plan.compatibilityAdjustments).toEqual(
      expect.arrayContaining([
        "backend: Backend set to 'hono' (requested feature requires a server)",
        "backend: Runtime set to 'bun' (Hono server default)",
        "auth: Database set to 'sqlite' (Better Auth requires a SQL database)",
        "auth: ORM set to 'drizzle' (Better Auth requires an adapter)",
      ]),
    );
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { auth: "better-auth" });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.auth).toBe("better-auth");
    expect(btsConfig.backend).toBe("hono");
    expect(btsConfig.runtime).toBe("bun");
    expect(btsConfig.database).toBe("sqlite");
    expect(btsConfig.orm).toBe("drizzle");
    await expectFileContains(join(projectDir, "apps/server/package.json"), "hono");
  });

  it(
    "expands backend-owned service updates on frontend-only projects to a server stack",
    async () => {
      const cases: Array<{
        name: string;
        update: Partial<ProjectConfig>;
        field: keyof ProjectConfig;
        expected: string;
        expectedPath: string;
      }> = [
        {
          name: "email-resend",
          update: { email: "resend" },
          field: "email",
          expected: "resend",
          expectedPath: "apps/server/src/lib/email.ts",
        },
        {
          name: "rate-limit-arcjet",
          update: { rateLimit: "arcjet" },
          field: "rateLimit",
          expected: "arcjet",
          expectedPath: "apps/server/src/lib/rate-limit.ts",
        },
        {
          name: "file-storage-s3",
          update: { fileStorage: "s3" },
          field: "fileStorage",
          expected: "s3",
          expectedPath: "apps/server/src/lib/storage.ts",
        },
      ];

      for (const testCase of cases) {
        const root = await makeTempRoot(`bfs-stack-update-frontend-only-${testCase.name}-`);
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_FRONTEND_ONLY_CONFIG));

        const plan = await planStackUpdate(projectDir, testCase.update);
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        expect(plan.proposedConfig[testCase.field]).toBe(testCase.expected);
        expect(plan.proposedConfig.backend).toBe("hono");
        expect(plan.proposedConfig.runtime).toBe("bun");
        expect(plan.filesToAdd).toContain("apps/server/package.json");
        expect(plan.filesToAdd).toContain(testCase.expectedPath);
        expect(plan.compatibilityAdjustments).toEqual(
          expect.arrayContaining([
            "backend: Backend set to 'hono' (requested feature requires a server)",
            "backend: Runtime set to 'bun' (Hono server default)",
          ]),
        );
        expect(plan.manualReviewBlockers).toEqual([]);

        const result = await applyStackUpdate(projectDir, testCase.update);
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        expect(btsConfig[testCase.field]).toBe(testCase.expected);
        expect(btsConfig.backend).toBe("hono");
        expect(btsConfig.runtime).toBe("bun");
        await expectFileContains(join(projectDir, testCase.expectedPath), testCase.expected);
      }
    },
    { timeout: 20_000 },
  );

  it(
    "expands backend infrastructure updates on frontend-only projects to a server stack",
    async () => {
      const cases: Array<{
        name: string;
        update: Partial<ProjectConfig>;
        field: keyof ProjectConfig;
        expected: string;
        extraExpectedConfig?: Partial<ProjectConfig>;
      }> = [
        {
          name: "database-postgres",
          update: { database: "postgres" },
          field: "database",
          expected: "postgres",
        },
        {
          name: "orm-drizzle",
          update: { orm: "drizzle" },
          field: "orm",
          expected: "drizzle",
          extraExpectedConfig: { database: "sqlite" },
        },
        {
          name: "api-openapi",
          update: { api: "openapi" },
          field: "api",
          expected: "openapi",
        },
        {
          name: "db-setup-neon",
          update: { dbSetup: "neon" },
          field: "dbSetup",
          expected: "neon",
          extraExpectedConfig: { database: "postgres", orm: "drizzle" },
        },
        {
          name: "server-deploy-render",
          update: { serverDeploy: "render" },
          field: "serverDeploy",
          expected: "render",
        },
      ];

      for (const testCase of cases) {
        const root = await makeTempRoot(
          `bfs-stack-update-frontend-only-infra-${testCase.name}-`,
        );
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_FRONTEND_ONLY_CONFIG));

        const plan = await planStackUpdate(projectDir, testCase.update);
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        expect(plan.proposedConfig[testCase.field]).toBe(testCase.expected);
        expect(plan.proposedConfig.backend).toBe("hono");
        expect(plan.proposedConfig.runtime).toBe("bun");
        for (const [key, value] of Object.entries(testCase.extraExpectedConfig ?? {})) {
          expect(plan.proposedConfig[key as keyof ProjectConfig]).toBe(value);
        }
        expect(plan.filesToAdd).toContain("apps/server/package.json");
        expect(plan.compatibilityAdjustments).toEqual(
          expect.arrayContaining([
            "backend: Backend set to 'hono' (requested feature requires a server)",
            "backend: Runtime set to 'bun' (Hono server default)",
          ]),
        );
        expect(plan.manualReviewBlockers).toEqual([]);

        const result = await applyStackUpdate(projectDir, testCase.update);
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        expect(btsConfig[testCase.field]).toBe(testCase.expected);
        expect(btsConfig.backend).toBe("hono");
        expect(btsConfig.runtime).toBe("bun");
        for (const [key, value] of Object.entries(testCase.extraExpectedConfig ?? {})) {
          expect(btsConfig[key]).toBe(value);
        }
        await expectFileContains(join(projectDir, "apps/server/package.json"), "hono");
      }
    },
    { timeout: 20_000 },
  );

  it(
    "expands web-owned feature updates on API-only projects to a web app",
    async () => {
      const cases: Array<{
        name: string;
        update: Partial<ProjectConfig>;
        field: keyof ProjectConfig;
        expected: string | string[];
        expectedFrontend: string[];
        expectedPath: string;
        expectedNeedle: string;
        expectedAdjustment: string;
      }> = [
        {
          name: "analytics-plausible",
          update: { analytics: "plausible" },
          field: "analytics",
          expected: "plausible",
          expectedFrontend: ["react-vite"],
          expectedPath: "apps/web/src/lib/plausible.tsx",
          expectedNeedle: "Plausible",
          expectedAdjustment:
            "frontend: Web frontend set to 'react-vite' (requested feature requires a web app)",
        },
        {
          name: "i18n-next-intl",
          update: { i18n: "next-intl" },
          field: "i18n",
          expected: "next-intl",
          expectedFrontend: ["next"],
          expectedPath: "apps/web/messages/en.json",
          expectedNeedle: "Welcome",
          expectedAdjustment:
            "frontend: Web frontend set to 'next' (requested feature requires a web app)",
        },
        {
          name: "ui-shadcn-svelte",
          update: { uiLibrary: "shadcn-svelte" },
          field: "uiLibrary",
          expected: "shadcn-svelte",
          expectedFrontend: ["svelte"],
          expectedPath: "apps/web/package.json",
          expectedNeedle: "shadcn-svelte",
          expectedAdjustment:
            "frontend: Web frontend set to 'svelte' (requested feature requires a web app)",
        },
        {
          name: "cms-payload",
          update: { cms: "payload" },
          field: "cms",
          expected: "payload",
          expectedFrontend: ["next"],
          expectedPath: "apps/web/src/payload.config.ts",
          expectedNeedle: "buildConfig",
          expectedAdjustment:
            "frontend: Web frontend set to 'next' (requested feature requires a web app)",
        },
        {
          name: "cms-keystatic",
          update: { cms: "keystatic" },
          field: "cms",
          expected: "keystatic",
          expectedFrontend: ["next"],
          expectedPath: "apps/web/keystatic.config.ts",
          expectedNeedle: "@keystatic/core",
          expectedAdjustment:
            "frontend: Web frontend set to 'next' (requested feature requires a web app)",
        },
        {
          name: "addon-pwa",
          update: { addons: ["pwa"] },
          field: "addons",
          expected: ["pwa"],
          expectedFrontend: ["react-vite"],
          expectedPath: "apps/web/pwa-assets.config.ts",
          expectedNeedle: "@vite-pwa/assets-generator",
          expectedAdjustment:
            "frontend: Web frontend set to 'react-vite' (requested feature requires a web app)",
        },
        {
          name: "addon-tauri",
          update: { addons: ["tauri"] },
          field: "addons",
          expected: ["tauri"],
          expectedFrontend: ["react-vite"],
          expectedPath: "apps/web/src-tauri/tauri.conf.json",
          expectedNeedle: "tauri",
          expectedAdjustment:
            "frontend: Web frontend set to 'react-vite' (requested feature requires a web app)",
        },
      ];

      for (const testCase of cases) {
        const root = await makeTempRoot(`bfs-stack-update-api-only-${testCase.name}-`);
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_API_ONLY_CONFIG));

        const plan = await planStackUpdate(projectDir, testCase.update);
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        if (Array.isArray(testCase.expected)) {
          expect(plan.proposedConfig[testCase.field]).toEqual(
            expect.arrayContaining(testCase.expected),
          );
        } else {
          expect(plan.proposedConfig[testCase.field]).toBe(testCase.expected);
        }
        expect(plan.proposedConfig.frontend).toEqual(testCase.expectedFrontend);
        expect(plan.filesToAdd).toContain("apps/web/package.json");
        expect(plan.filesToAdd).toContain(testCase.expectedPath);
        expect(plan.compatibilityAdjustments).toContain(testCase.expectedAdjustment);
        if (testCase.field === "uiLibrary") {
          expect(plan.proposedConfig.cssFramework).toBe("tailwind");
        }
        expect(plan.manualReviewBlockers).toEqual([]);

        const result = await applyStackUpdate(projectDir, testCase.update);
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        if (Array.isArray(testCase.expected)) {
          expect(btsConfig[testCase.field]).toEqual(expect.arrayContaining(testCase.expected));
        } else {
          expect(btsConfig[testCase.field]).toBe(testCase.expected);
        }
        expect(btsConfig.frontend).toEqual(testCase.expectedFrontend);
        await expectFileContains(join(projectDir, testCase.expectedPath), testCase.expectedNeedle);
      }
    },
    { timeout: 20_000 },
  );

  it(
    "expands payment updates on API-only projects to a web app",
    async () => {
      const cases: Array<{
        name: string;
        payments: ProjectConfig["payments"];
        serverPath: string;
        serverNeedle: string;
        webNeedle: string;
        extraExpectedConfig?: Partial<ProjectConfig>;
      }> = [
        {
          name: "stripe",
          payments: "stripe",
          serverPath: "packages/auth/src/lib/stripe.ts",
          serverNeedle: "stripe",
          webNeedle: "session_id",
        },
        {
          name: "lemon-squeezy",
          payments: "lemon-squeezy",
          serverPath: "packages/auth/src/lib/lemonsqueezy.ts",
          serverNeedle: "lemonSqueezySetup",
          webNeedle: "checkout_id",
        },
        {
          name: "paddle",
          payments: "paddle",
          serverPath: "packages/auth/src/lib/paddle.ts",
          serverNeedle: "Paddle",
          webNeedle: "transaction_id",
        },
        {
          name: "polar",
          payments: "polar",
          serverPath: "packages/auth/src/lib/payments.ts",
          serverNeedle: "Polar",
          webNeedle: "checkout_id",
          extraExpectedConfig: {
            auth: "better-auth",
            database: "sqlite",
            orm: "drizzle",
          },
        },
        {
          name: "dodo",
          payments: "dodo",
          serverPath: "packages/auth/src/lib/dodo.ts",
          serverNeedle: "DodoPayments",
          webNeedle: "payment_id",
        },
      ];

      for (const testCase of cases) {
        const root = await makeTempRoot(`bfs-stack-update-api-only-payments-${testCase.name}-`);
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_API_ONLY_CONFIG));

        const plan = await planStackUpdate(projectDir, { payments: testCase.payments });
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        expect(plan.proposedConfig.payments).toBe(testCase.payments);
        expect(plan.proposedConfig.frontend).toEqual(["next"]);
        for (const [key, value] of Object.entries(testCase.extraExpectedConfig ?? {})) {
          expect(plan.proposedConfig[key as keyof ProjectConfig]).toBe(value);
        }
        expect(plan.filesToAdd).toContain("apps/web/package.json");
        expect(plan.filesToAdd).toContain("apps/web/src/app/success/page.tsx");
        expect(plan.filesToAdd).toContain(testCase.serverPath);
        expect(plan.compatibilityAdjustments).toContain(
          "frontend: Web frontend set to 'next' (requested feature requires a web app)",
        );
        expect(plan.manualReviewBlockers).toEqual([]);

        const result = await applyStackUpdate(projectDir, { payments: testCase.payments });
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        expect(btsConfig.payments).toBe(testCase.payments);
        expect(btsConfig.frontend).toEqual(["next"]);
        for (const [key, value] of Object.entries(testCase.extraExpectedConfig ?? {})) {
          expect(btsConfig[key]).toBe(value);
        }
        await expectFileContains(join(projectDir, "apps/web/src/app/success/page.tsx"), testCase.webNeedle);
        await expectFileContains(join(projectDir, testCase.serverPath), testCase.serverNeedle);
      }
    },
    { timeout: 20_000 },
  );

  it("expands Hono server deploy updates to their required runtime", async () => {
    const cases: Array<{
      serverDeploy: ProjectConfig["serverDeploy"];
      expectedRuntime: ProjectConfig["runtime"];
      expectedAdjustment: string;
    }> = [
      {
        serverDeploy: "cloudflare",
        expectedRuntime: "workers",
        expectedAdjustment:
          "serverDeploy: Runtime set to 'workers' (Cloudflare requires Workers)",
      },
      {
        serverDeploy: "netlify",
        expectedRuntime: "node",
        expectedAdjustment:
          "serverDeploy: Runtime set to 'node' (Netlify Functions requires Node)",
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-update-server-deploy-${testCase.serverDeploy}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_SERVICE_BASE_CONFIG));

      const plan = await planStackUpdate(projectDir, { serverDeploy: testCase.serverDeploy });
      expect(plan.success).toBe(true);
      if (!plan.success) continue;

      expect(plan.proposedConfig.serverDeploy).toBe(testCase.serverDeploy);
      expect(plan.proposedConfig.backend).toBe("hono");
      expect(plan.proposedConfig.runtime).toBe(testCase.expectedRuntime);
      expect(plan.compatibilityAdjustments).toContain(testCase.expectedAdjustment);
      expect(plan.manualReviewBlockers).toEqual([]);

      const result = await applyStackUpdate(projectDir, {
        serverDeploy: testCase.serverDeploy,
        acknowledgeArchitectureChange: true,
      });
      expect(result.success).toBe(true);

      const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
      expect(btsConfig.serverDeploy).toBe(testCase.serverDeploy);
      expect(btsConfig.runtime).toBe(testCase.expectedRuntime);
    }
  });

  it(
    "expands mobile UI updates to their required native frontend variant",
    async () => {
      const cases: Array<{
        mobileUI: ProjectConfig["mobileUI"];
        expectedFrontend: string;
        expectedAdjustment: string;
      }> = [
        {
          mobileUI: "uniwind",
          expectedFrontend: "native-uniwind",
          expectedAdjustment:
            "mobileUI: Native frontend set to 'native-uniwind' (Uniwind mobile UI requires Expo + Uniwind)",
        },
        {
          mobileUI: "unistyles",
          expectedFrontend: "native-unistyles",
          expectedAdjustment:
            "mobileUI: Native frontend set to 'native-unistyles' (Unistyles mobile UI requires Expo + Unistyles)",
        },
      ];

      for (const testCase of cases) {
        const root = await makeTempRoot(`bfs-stack-update-mobile-ui-${testCase.mobileUI}-`);
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(
          makeConfig(projectDir, {
            ecosystem: "react-native",
            frontend: ["native-bare"],
            backend: "none",
            runtime: "none",
            database: "none",
            orm: "none",
            api: "none",
            auth: "none",
            mobileNavigation: "expo-router",
            mobileUI: "none",
            mobileStorage: "none",
            mobileTesting: "none",
            mobilePush: "none",
            mobileOTA: "none",
            mobileDeepLinking: "none",
          }),
        );

        const plan = await planStackUpdate(projectDir, { mobileUI: testCase.mobileUI });
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        expect(plan.proposedConfig.mobileUI).toBe(testCase.mobileUI);
        expect(plan.proposedConfig.frontend).toEqual([testCase.expectedFrontend]);
        expect(plan.compatibilityAdjustments).toContain(testCase.expectedAdjustment);
        expect(plan.manualReviewBlockers).toEqual([]);

        const result = await applyStackUpdate(projectDir, { mobileUI: testCase.mobileUI });
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        expect(btsConfig.mobileUI).toBe(testCase.mobileUI);
        expect(btsConfig.frontend).toEqual([testCase.expectedFrontend]);
      }
    },
    { timeout: 20_000 },
  );

  it(
    "expands mobile feature updates on API-only projects to a native app",
    async () => {
      const cases: Array<{
        name: string;
        update: Partial<ProjectConfig>;
        field: keyof ProjectConfig;
        expected: string;
        expectedPath: string;
        expectedNeedle: string;
      }> = [
        {
          name: "storage-mmkv",
          update: { mobileStorage: "mmkv" },
          field: "mobileStorage",
          expected: "mmkv",
          expectedPath: "apps/native/package.json",
          expectedNeedle: "react-native-mmkv",
        },
        {
          name: "testing-react-native-testing-library",
          update: { mobileTesting: "react-native-testing-library" },
          field: "mobileTesting",
          expected: "react-native-testing-library",
          expectedPath: "apps/native/package.json",
          expectedNeedle: "jest-expo",
        },
        {
          name: "push-expo-notifications",
          update: { mobilePush: "expo-notifications" },
          field: "mobilePush",
          expected: "expo-notifications",
          expectedPath: "apps/native/package.json",
          expectedNeedle: "expo-notifications",
        },
        {
          name: "ota-expo-updates",
          update: { mobileOTA: "expo-updates" },
          field: "mobileOTA",
          expected: "expo-updates",
          expectedPath: "apps/native/package.json",
          expectedNeedle: "expo-updates",
        },
        {
          name: "deep-linking-expo-linking",
          update: { mobileDeepLinking: "expo-linking" },
          field: "mobileDeepLinking",
          expected: "expo-linking",
          expectedPath: "apps/native/package.json",
          expectedNeedle: "expo-linking",
        },
        {
          name: "ui-tamagui",
          update: { mobileUI: "tamagui" },
          field: "mobileUI",
          expected: "tamagui",
          expectedPath: "apps/native/package.json",
          expectedNeedle: "tamagui",
        },
      ];

      for (const testCase of cases) {
        const root = await makeTempRoot(`bfs-stack-update-api-only-mobile-${testCase.name}-`);
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_API_ONLY_CONFIG));

        const plan = await planStackUpdate(projectDir, testCase.update);
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        expect(plan.proposedConfig[testCase.field]).toBe(testCase.expected);
        expect(plan.proposedConfig.frontend).toEqual(["native-bare"]);
        expect(plan.filesToAdd).toContain("apps/native/package.json");
        expect(plan.filesToAdd).toContain(testCase.expectedPath);
        expect(plan.compatibilityAdjustments).toContain(
          "mobile: Native frontend set to 'native-bare' (requested feature requires a native app)",
        );
        expect(plan.manualReviewBlockers).toEqual([]);

        const result = await applyStackUpdate(projectDir, testCase.update);
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        expect(btsConfig[testCase.field]).toBe(testCase.expected);
        expect(btsConfig.frontend).toEqual(["native-bare"]);
        await expectFileContains(join(projectDir, testCase.expectedPath), testCase.expectedNeedle);
      }
    },
    { timeout: 20_000 },
  );

  it("preserves supported self-backend example updates through compatibility analysis", async () => {
    const root = await makeTempRoot("bfs-stack-update-chat-sdk-self-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "none",
        ai: "none",
        examples: [],
      }),
    );

    const plan = await planStackUpdate(projectDir, { examples: ["chat-sdk"] });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.examples).toEqual(["chat-sdk"]);
    expect(plan.proposedConfig.backend).toBe("self");
    expect(plan.proposedConfig.runtime).toBe("none");
    expect(plan.compatibilityAdjustments).not.toContain("examples: Chat SDK removed (unsupported stack)");
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { examples: ["chat-sdk"] });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.examples).toEqual(["chat-sdk"]);
    expect(btsConfig.backend).toBe("self");
    expect(btsConfig.runtime).toBe("none");
  });

  it("expands Chat SDK Hono updates to the supported Node and Vercel AI profile", async () => {
    const root = await makeTempRoot("bfs-stack-update-chat-sdk-hono-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        frontend: ["next"],
        backend: "hono",
        runtime: "bun",
        database: "sqlite",
        orm: "drizzle",
        api: "trpc",
        auth: "none",
        ai: "none",
        examples: [],
      }),
    );

    const plan = await planStackUpdate(projectDir, { examples: ["chat-sdk"] });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.examples).toEqual(["chat-sdk"]);
    expect(plan.proposedConfig.backend).toBe("hono");
    expect(plan.proposedConfig.runtime).toBe("node");
    expect(plan.proposedConfig.ai).toBe("vercel-ai");
    expect(plan.compatibilityAdjustments).toEqual(
      expect.arrayContaining([
        "examples: Runtime set to 'node' (Chat SDK Hono profile requires Node)",
        "examples: AI SDK set to 'vercel-ai' (Chat SDK profile requires Vercel AI)",
      ]),
    );
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, {
      examples: ["chat-sdk"],
      acknowledgeArchitectureChange: true,
    });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.examples).toEqual(["chat-sdk"]);
    expect(btsConfig.runtime).toBe("node");
    expect(btsConfig.ai).toBe("vercel-ai");
  });

  it("expands Chat SDK Nuxt self-backend updates to Vercel AI", async () => {
    const root = await makeTempRoot("bfs-stack-update-chat-sdk-nuxt-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        frontend: ["nuxt"],
        backend: "self",
        runtime: "none",
        database: "sqlite",
        orm: "drizzle",
        api: "none",
        auth: "none",
        ai: "none",
        examples: [],
      }),
    );

    const plan = await planStackUpdate(projectDir, { examples: ["chat-sdk"] });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.examples).toEqual(["chat-sdk"]);
    expect(plan.proposedConfig.backend).toBe("self");
    expect(plan.proposedConfig.runtime).toBe("none");
    expect(plan.proposedConfig.ai).toBe("vercel-ai");
    expect(plan.compatibilityAdjustments).toContain(
      "examples: AI SDK set to 'vercel-ai' (Chat SDK profile requires Vercel AI)",
    );
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, { examples: ["chat-sdk"] });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.examples).toEqual(["chat-sdk"]);
    expect(btsConfig.backend).toBe("self");
    expect(btsConfig.ai).toBe("vercel-ai");
  });

  it("expands Cloudflare D1 stack updates before compatibility clears db setup", async () => {
    const root = await makeTempRoot("bfs-stack-update-dependent-d1-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_SERVICE_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, { dbSetup: "d1" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.dbSetup).toBe("d1");
    expect(plan.proposedConfig.database).toBe("sqlite");
    expect(plan.proposedConfig.orm).toBe("drizzle");
    expect(plan.proposedConfig.runtime).toBe("workers");
    expect(plan.proposedConfig.backend).toBe("hono");
    expect(plan.proposedConfig.serverDeploy).toBe("cloudflare");
    expect(plan.compatibilityAdjustments).toEqual(
      expect.arrayContaining([
        "dbSetup: Database set to 'sqlite' (d1 requires sqlite)",
        "dbSetup: ORM set to 'drizzle' (d1 requires a database adapter)",
        "dbSetup: Runtime set to 'workers' (D1 requires Workers)",
        "runtime: Server deploy set to 'Cloudflare' (required for Workers)",
      ]),
    );
    expect(plan.manualReviewBlockers).toEqual([]);

    const result = await applyStackUpdate(projectDir, {
      dbSetup: "d1",
      acknowledgeArchitectureChange: true,
    });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.dbSetup).toBe("d1");
    expect(btsConfig.database).toBe("sqlite");
    expect(btsConfig.orm).toBe("drizzle");
    expect(btsConfig.runtime).toBe("workers");
    expect(btsConfig.backend).toBe("hono");
    expect(btsConfig.serverDeploy).toBe("cloudflare");
  });

  it("expands database setup provider updates before generic compatibility clears them", async () => {
    const cases: Array<{
      dbSetup: ProjectConfig["dbSetup"];
      database: ProjectConfig["database"];
      orm: ProjectConfig["orm"];
      expectedAdjustment: string;
    }> = [
      {
        dbSetup: "turso",
        database: "sqlite",
        orm: "drizzle",
        expectedAdjustment: "dbSetup: Database set to 'sqlite' (turso requires sqlite)",
      },
      {
        dbSetup: "neon",
        database: "postgres",
        orm: "drizzle",
        expectedAdjustment: "dbSetup: Database set to 'postgres' (neon requires postgres)",
      },
      {
        dbSetup: "mongodb-atlas",
        database: "mongodb",
        orm: "prisma",
        expectedAdjustment:
          "dbSetup: Database set to 'mongodb' (mongodb-atlas requires mongodb)",
      },
      {
        dbSetup: "upstash",
        database: "redis",
        orm: "none",
        expectedAdjustment: "dbSetup: Database set to 'redis' (upstash requires redis)",
      },
      {
        dbSetup: "docker",
        database: "postgres",
        orm: "drizzle",
        expectedAdjustment: "dbSetup: Database set to 'postgres' (docker requires postgres)",
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-update-dbsetup-${testCase.dbSetup}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_SERVICE_BASE_CONFIG));

      const plan = await planStackUpdate(projectDir, { dbSetup: testCase.dbSetup });
      expect(plan.success).toBe(true);
      if (!plan.success) continue;

      expect(plan.proposedConfig.dbSetup).toBe(testCase.dbSetup);
      expect(plan.proposedConfig.database).toBe(testCase.database);
      expect(plan.proposedConfig.orm).toBe(testCase.orm);
      expect(plan.compatibilityAdjustments).toContain(testCase.expectedAdjustment);
      expect(plan.manualReviewBlockers).toEqual([]);

      const result = await applyStackUpdate(projectDir, { dbSetup: testCase.dbSetup });
      expect(result.success).toBe(true);

      const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
      expect(btsConfig.dbSetup).toBe(testCase.dbSetup);
      expect(btsConfig.database).toBe(testCase.database);
      expect(btsConfig.orm).toBe(testCase.orm);
    }
  });

  it("applies Resend updates for non-TypeScript first-candidate ecosystems", async () => {
    const cases: Array<{
      name: string;
      config: Partial<ProjectConfig>;
      manifestPath: string;
      manifestNeedle: string;
      servicePath: string;
      serviceNeedle: string;
    }> = [
      {
        name: "python",
        config: { ...NON_TS_BASE_CONFIG, ecosystem: "python", pythonWebFramework: "fastapi" },
        manifestPath: "apps/server/pyproject.toml",
        manifestNeedle: '"resend>=2.29.0"',
        servicePath: "apps/server/src/app/email.py",
        serviceNeedle: "resend.Emails.send",
      },
      {
        name: "go",
        config: { ...NON_TS_BASE_CONFIG, ecosystem: "go", goWebFramework: "gin" },
        manifestPath: "apps/server/go.mod",
        manifestNeedle: "github.com/resend/resend-go/v3 v3.4.1",
        servicePath: "apps/server/internal/email/resend.go",
        serviceNeedle: "resend.NewClient",
      },
      {
        name: "rust",
        config: { ...NON_TS_BASE_CONFIG, ecosystem: "rust", rustWebFramework: "axum" },
        manifestPath: "apps/server/Cargo.toml",
        manifestNeedle: "resend-rs",
        servicePath: "apps/server/crates/server/src/email.rs",
        serviceNeedle: "Resend::default",
      },
      {
        name: "java",
        config: {
          ...NON_TS_BASE_CONFIG,
          ecosystem: "java",
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
        },
        manifestPath: "apps/server/pom.xml",
        manifestNeedle: "<artifactId>resend-java</artifactId>",
        servicePath: "apps/server/src/main/java/com/example/app/service/EmailService.java",
        serviceNeedle: "new Resend",
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-update-resend-${testCase.name}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, testCase.config));

      const plan = await planStackUpdate(projectDir, { email: "resend" });
      expect(plan.success).toBe(true);
      if (!plan.success) continue;

      expect(plan.proposedConfig.email).toBe("resend");
      expect(Object.values(plan.envChanges).flat()).toContain("RESEND_API_KEY");
      expect(plan.manualReviewBlockers).toEqual([]);

      const result = await applyStackUpdate(projectDir, { email: "resend" });
      expect(result.success).toBe(true);
      await expectFileContains(join(projectDir, testCase.manifestPath), testCase.manifestNeedle);
      await expectFileContains(join(projectDir, testCase.servicePath), testCase.serviceNeedle);
      await expectFileContains(join(projectDir, "apps/server/.env.example"), "RESEND_API_KEY=");
    }
  });

  it("applies Sentry updates for non-TypeScript first-candidate ecosystems", async () => {
    const cases: Array<{
      name: string;
      config: Partial<ProjectConfig>;
      manifestPath: string;
      manifestNeedle: string;
      servicePath: string;
      serviceNeedle: string;
    }> = [
      {
        name: "python",
        config: { ...NON_TS_BASE_CONFIG, ecosystem: "python", pythonWebFramework: "fastapi" },
        manifestPath: "apps/server/pyproject.toml",
        manifestNeedle: '"sentry-sdk>=2.59.0"',
        servicePath: "apps/server/src/app/observability.py",
        serviceNeedle: "sentry_sdk.init",
      },
      {
        name: "go",
        config: { ...NON_TS_BASE_CONFIG, ecosystem: "go", goWebFramework: "gin" },
        manifestPath: "apps/server/go.mod",
        manifestNeedle: "github.com/getsentry/sentry-go v0.46.2",
        servicePath: "apps/server/internal/observability/sentry.go",
        serviceNeedle: "sentry.Init",
      },
      {
        name: "rust",
        config: { ...NON_TS_BASE_CONFIG, ecosystem: "rust", rustWebFramework: "axum" },
        manifestPath: "apps/server/Cargo.toml",
        manifestNeedle: 'sentry = "0.48.1"',
        servicePath: "apps/server/crates/server/src/observability.rs",
        serviceNeedle: "sentry::init",
      },
      {
        name: "java",
        config: {
          ...NON_TS_BASE_CONFIG,
          ecosystem: "java",
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
        },
        manifestPath: "apps/server/pom.xml",
        manifestNeedle: "<artifactId>sentry</artifactId>",
        servicePath: "apps/server/src/main/java/com/example/app/Application.java",
        serviceNeedle: "Sentry.init",
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-update-sentry-${testCase.name}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, testCase.config));

      const plan = await planStackUpdate(projectDir, { observability: "sentry" });
      expect(plan.success).toBe(true);
      if (!plan.success) continue;

      expect(plan.proposedConfig.observability).toBe("sentry");
      expect(Object.values(plan.envChanges).flat()).toContain("SENTRY_DSN");
      expect(plan.manualReviewBlockers).toEqual([]);

      const result = await applyStackUpdate(projectDir, { observability: "sentry" });
      expect(result.success).toBe(true);
      await expectFileContains(join(projectDir, testCase.manifestPath), testCase.manifestNeedle);
      await expectFileContains(join(projectDir, testCase.servicePath), testCase.serviceNeedle);
      await expectFileContains(join(projectDir, "apps/server/.env.example"), "SENTRY_DSN=");
    }
  });

  it(
    "applies broad generated non-TypeScript ecosystem categories",
    async () => {
      const cases: Array<{
        name: string;
        config: Partial<ProjectConfig>;
        update: Partial<ProjectConfig>;
        field: keyof ProjectConfig;
        expected: unknown;
      }> = [
        {
          name: "python-ai-langchain",
          config: PYTHON_BASE_CONFIG,
          update: { pythonAi: ["langchain"] },
          field: "pythonAi",
          expected: ["langchain"],
        },
        {
          name: "python-auth-jwt",
          config: PYTHON_BASE_CONFIG,
          update: { pythonAuth: "jwt" },
          field: "pythonAuth",
          expected: "jwt",
        },
        {
          name: "python-task-celery",
          config: PYTHON_BASE_CONFIG,
          update: { pythonTaskQueue: "celery" },
          field: "pythonTaskQueue",
          expected: "celery",
        },
        {
          name: "python-graphql-strawberry",
          config: PYTHON_BASE_CONFIG,
          update: { pythonGraphql: "strawberry" },
          field: "pythonGraphql",
          expected: "strawberry",
        },
        {
          name: "python-quality-mypy",
          config: PYTHON_BASE_CONFIG,
          update: { pythonQuality: "mypy" },
          field: "pythonQuality",
          expected: "mypy",
        },
        {
          name: "python-testing-pytest",
          config: PYTHON_BASE_CONFIG,
          update: { pythonTesting: ["pytest"] },
          field: "pythonTesting",
          expected: ["pytest"],
        },
        {
          name: "python-caching-redis",
          config: PYTHON_BASE_CONFIG,
          update: { pythonCaching: "redis" },
          field: "pythonCaching",
          expected: "redis",
        },
        {
          name: "python-realtime-websockets",
          config: PYTHON_BASE_CONFIG,
          update: { pythonRealtime: "websockets" },
          field: "pythonRealtime",
          expected: "websockets",
        },
        {
          name: "python-observability-opentelemetry",
          config: PYTHON_BASE_CONFIG,
          update: { pythonObservability: "opentelemetry" },
          field: "pythonObservability",
          expected: "opentelemetry",
        },
        {
          name: "python-cli-typer",
          config: PYTHON_BASE_CONFIG,
          update: { pythonCli: ["typer"] },
          field: "pythonCli",
          expected: ["typer"],
        },
        {
          name: "python-django-rest-framework",
          config: { ...PYTHON_BASE_CONFIG, pythonWebFramework: "django" },
          update: { pythonApi: "django-rest-framework" },
          field: "pythonApi",
          expected: "django-rest-framework",
        },
        {
          name: "go-cli-cobra",
          config: GO_BASE_CONFIG,
          update: { goCli: "cobra" },
          field: "goCli",
          expected: "cobra",
        },
        {
          name: "go-logging-zerolog",
          config: GO_BASE_CONFIG,
          update: { goLogging: "zerolog" },
          field: "goLogging",
          expected: "zerolog",
        },
        {
          name: "go-auth-jwt",
          config: GO_BASE_CONFIG,
          update: { goAuth: "jwt" },
          field: "goAuth",
          expected: "jwt",
        },
        {
          name: "go-testing-testify",
          config: GO_BASE_CONFIG,
          update: { goTesting: ["testify"] },
          field: "goTesting",
          expected: ["testify"],
        },
        {
          name: "go-realtime-websocket",
          config: GO_BASE_CONFIG,
          update: { goRealtime: "gorilla-websocket" },
          field: "goRealtime",
          expected: "gorilla-websocket",
        },
        {
          name: "go-message-queue-nats",
          config: GO_BASE_CONFIG,
          update: { goMessageQueue: "nats" },
          field: "goMessageQueue",
          expected: "nats",
        },
        {
          name: "go-caching-redis",
          config: GO_BASE_CONFIG,
          update: { goCaching: "redis" },
          field: "goCaching",
          expected: "redis",
        },
        {
          name: "go-config-viper",
          config: GO_BASE_CONFIG,
          update: { goConfig: "viper" },
          field: "goConfig",
          expected: "viper",
        },
        {
          name: "go-observability-opentelemetry",
          config: GO_BASE_CONFIG,
          update: { goObservability: "opentelemetry" },
          field: "goObservability",
          expected: "opentelemetry",
        },
        {
          name: "rust-cli-clap",
          config: RUST_BASE_CONFIG,
          update: { rustCli: "clap" },
          field: "rustCli",
          expected: "clap",
        },
        {
          name: "rust-library-serde",
          config: RUST_BASE_CONFIG,
          update: { rustLibraries: ["serde"] },
          field: "rustLibraries",
          expected: ["serde"],
        },
        {
          name: "rust-logging-tracing",
          config: RUST_BASE_CONFIG,
          update: { rustLogging: "tracing" },
          field: "rustLogging",
          expected: "tracing",
        },
        {
          name: "rust-error-eyre",
          config: RUST_BASE_CONFIG,
          update: { rustErrorHandling: "eyre" },
          field: "rustErrorHandling",
          expected: "eyre",
        },
        {
          name: "rust-caching-redis",
          config: RUST_BASE_CONFIG,
          update: { rustCaching: "redis" },
          field: "rustCaching",
          expected: "redis",
        },
        {
          name: "rust-auth-oauth2",
          config: RUST_BASE_CONFIG,
          update: { rustAuth: "oauth2" },
          field: "rustAuth",
          expected: "oauth2",
        },
        {
          name: "rust-realtime-tungstenite",
          config: RUST_BASE_CONFIG,
          update: { rustRealtime: "tokio-tungstenite" },
          field: "rustRealtime",
          expected: "tokio-tungstenite",
        },
        {
          name: "rust-message-queue-lapin",
          config: RUST_BASE_CONFIG,
          update: { rustMessageQueue: "lapin" },
          field: "rustMessageQueue",
          expected: "lapin",
        },
        {
          name: "rust-observability-opentelemetry",
          config: RUST_BASE_CONFIG,
          update: { rustObservability: "opentelemetry" },
          field: "rustObservability",
          expected: "opentelemetry",
        },
        {
          name: "rust-templating-askama",
          config: RUST_BASE_CONFIG,
          update: { rustTemplating: "askama" },
          field: "rustTemplating",
          expected: "askama",
        },
        {
          name: "java-orm-jpa",
          config: JAVA_BASE_CONFIG,
          update: { javaOrm: "spring-data-jpa" },
          field: "javaOrm",
          expected: "spring-data-jpa",
        },
        {
          name: "java-auth-security",
          config: JAVA_BASE_CONFIG,
          update: { javaAuth: "spring-security" },
          field: "javaAuth",
          expected: "spring-security",
        },
        {
          name: "java-api-graphql",
          config: JAVA_BASE_CONFIG,
          update: { javaApi: "spring-graphql" },
          field: "javaApi",
          expected: "spring-graphql",
        },
        {
          name: "java-logging-logback",
          config: JAVA_BASE_CONFIG,
          update: { javaLogging: "logback" },
          field: "javaLogging",
          expected: "logback",
        },
        {
          name: "java-library-lombok",
          config: JAVA_BASE_CONFIG,
          update: { javaLibraries: ["lombok"] },
          field: "javaLibraries",
          expected: ["lombok"],
        },
        {
          name: "java-testing-testcontainers",
          config: JAVA_BASE_CONFIG,
          update: { javaTestingLibraries: ["testcontainers"] },
          field: "javaTestingLibraries",
          expected: ["testcontainers"],
        },
        {
          name: "dotnet-orm-ef-core",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetOrm: "ef-core" },
          field: "dotnetOrm",
          expected: "ef-core",
        },
        {
          name: "dotnet-orm-dapper",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetOrm: "dapper" },
          field: "dotnetOrm",
          expected: "dapper",
        },
        {
          name: "dotnet-orm-linq2db",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetOrm: "linq2db" },
          field: "dotnetOrm",
          expected: "linq2db",
        },
        {
          name: "dotnet-webframework-mvc",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetWebFramework: "aspnet-mvc" },
          field: "dotnetWebFramework",
          expected: "aspnet-mvc",
        },
        {
          name: "dotnet-webframework-blazor",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetWebFramework: "aspnet-blazor" },
          field: "dotnetWebFramework",
          expected: "aspnet-blazor",
        },
        {
          name: "dotnet-auth-identity",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetAuth: "aspnet-identity" },
          field: "dotnetAuth",
          expected: "aspnet-identity",
        },
        {
          name: "dotnet-auth-duende",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetAuth: "duende-identityserver" },
          field: "dotnetAuth",
          expected: "duende-identityserver",
        },
        {
          name: "dotnet-auth-auth0",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetAuth: "auth0-aspnet" },
          field: "dotnetAuth",
          expected: "auth0-aspnet",
        },
        {
          name: "dotnet-api-graphql",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetApi: "graphql-hotchocolate" },
          field: "dotnetApi",
          expected: "graphql-hotchocolate",
        },
        {
          name: "dotnet-testing-xunit",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetTesting: ["xunit"] },
          field: "dotnetTesting",
          expected: ["xunit"],
        },
        {
          name: "dotnet-job-hangfire",
          config: { ...DOTNET_BASE_CONFIG, dotnetOrm: "ef-core" },
          update: { dotnetJobQueue: "hangfire" },
          field: "dotnetJobQueue",
          expected: "hangfire",
        },
        {
          name: "dotnet-realtime-signalr",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetRealtime: "signalr" },
          field: "dotnetRealtime",
          expected: "signalr",
        },
        {
          name: "dotnet-observability-serilog",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetObservability: ["serilog"] },
          field: "dotnetObservability",
          expected: ["serilog"],
        },
        {
          name: "dotnet-validation-fluentvalidation",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetValidation: "fluentvalidation" },
          field: "dotnetValidation",
          expected: "fluentvalidation",
        },
        {
          name: "dotnet-caching-redis",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetCaching: "redis" },
          field: "dotnetCaching",
          expected: "redis",
        },
        {
          name: "dotnet-deploy-docker",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetDeploy: "docker" },
          field: "dotnetDeploy",
          expected: "docker",
        },
        {
          name: "dotnet-deploy-azure",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetDeploy: "azure" },
          field: "dotnetDeploy",
          expected: "azure",
        },
        {
          name: "dotnet-deploy-aws",
          config: DOTNET_BASE_CONFIG,
          update: { dotnetDeploy: "aws" },
          field: "dotnetDeploy",
          expected: "aws",
        },
        {
          name: "elixir-auth-phx-gen-auth",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirAuth: "phx-gen-auth" },
          field: "elixirAuth",
          expected: "phx-gen-auth",
        },
        {
          name: "elixir-api-rest",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirApi: "rest" },
          field: "elixirApi",
          expected: "rest",
        },
        {
          name: "elixir-realtime-presence",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirRealtime: "presence" },
          field: "elixirRealtime",
          expected: "presence",
        },
        {
          name: "elixir-jobs-oban",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirJobs: "oban" },
          field: "elixirJobs",
          expected: "oban",
        },
        {
          name: "elixir-validation-ecto",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirValidation: "ecto-changesets" },
          field: "elixirValidation",
          expected: "ecto-changesets",
        },
        {
          name: "elixir-http-req",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirHttp: "req" },
          field: "elixirHttp",
          expected: "req",
        },
        {
          name: "elixir-email-swoosh",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirEmail: "swoosh" },
          field: "elixirEmail",
          expected: "swoosh",
        },
        {
          name: "elixir-caching-cachex",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirCaching: "cachex" },
          field: "elixirCaching",
          expected: "cachex",
        },
        {
          name: "elixir-observability-telemetry",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirObservability: "telemetry" },
          field: "elixirObservability",
          expected: "telemetry",
        },
        {
          name: "elixir-testing-exunit",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirTesting: "ex_unit" },
          field: "elixirTesting",
          expected: "ex_unit",
        },
        {
          name: "elixir-quality-credo",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirQuality: "credo" },
          field: "elixirQuality",
          expected: "credo",
        },
        {
          name: "elixir-deploy-docker",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirDeploy: "docker" },
          field: "elixirDeploy",
          expected: "docker",
        },
        {
          name: "elixir-library-broadway",
          config: ELIXIR_BASE_CONFIG,
          update: { elixirLibraries: ["broadway"] },
          field: "elixirLibraries",
          expected: ["broadway"],
        },
        {
          name: "elixir-json-jason-without-web-framework",
          config: { ...ELIXIR_BASE_CONFIG, elixirWebFramework: "none", elixirOrm: "none", elixirJson: "none" },
          update: { elixirJson: "jason" },
          field: "elixirJson",
          expected: "jason",
        },
      ];

      for (const testCase of cases) {
        const root = await makeTempRoot(`bfs-stack-update-${testCase.name}-`);
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(makeConfig(projectDir, testCase.config));

        const plan = await planStackUpdate(projectDir, testCase.update);
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        expect(plan.proposedConfig[testCase.field]).toEqual(testCase.expected);
        expect(plan.manualReviewBlockers).toEqual([]);

        const result = await applyStackUpdate(projectDir, testCase.update);
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        expect(btsConfig[testCase.field]).toEqual(testCase.expected);
      }
    },
    { timeout: 30_000 },
  );

  it("applies Go Better Auth through the generic auth update field", async () => {
    const root = await makeTempRoot("bfs-stack-update-go-better-auth-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, GO_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, { auth: "go-better-auth" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.proposedConfig.auth).toBe("go-better-auth");
    expect(plan.manualReviewBlockers).toEqual([]);
    expect(plan.filesToAdd).toContain("apps/server/internal/auth/auth.go");
    expect(plan.filesToPatch).toEqual(
      expect.arrayContaining([
        "apps/server/go.mod",
        "apps/server/cmd/server/main.go",
      ]),
    );

    const result = await applyStackUpdate(projectDir, { auth: "go-better-auth" });
    expect(result.success).toBe(true);

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.auth).toBe("go-better-auth");
    await expectFileContains(
      join(projectDir, "apps/server/go.mod"),
      "github.com/GoBetterAuth/go-better-auth/v2",
    );
    await expectFileContains(
      join(projectDir, "apps/server/internal/auth/auth.go"),
      "go-better-auth/v2",
    );
  });

  it("applies Elixir auth integrations through the generic auth update field", async () => {
    const cases: Array<{
      name: string;
      update: ProjectConfig["elixirAuth"];
      filesToAdd: string[];
      filesToPatch: string[];
      assertions: Array<{ path: string; content: string }>;
    }> = [
      {
        name: "guardian",
        update: "guardian",
        filesToAdd: [
          "apps/server/lib/app/auth/guardian.ex",
          "apps/server/lib/app_web/controllers/token_controller.ex",
        ],
        filesToPatch: [
          "apps/server/config/config.exs",
          "apps/server/lib/app_web/router.ex",
          "apps/server/mix.exs",
        ],
        assertions: [
          { path: "apps/server/mix.exs", content: ":guardian" },
          { path: "apps/server/config/config.exs", content: "config :app, App.Auth.Guardian" },
          { path: "apps/server/lib/app/auth/guardian.ex", content: "use Guardian, otp_app: :app" },
          {
            path: "apps/server/lib/app_web/controllers/token_controller.ex",
            content: "Guardian.encode_and_sign",
          },
          { path: "apps/server/lib/app_web/router.ex", content: "post \"/auth/token\"" },
        ],
      },
      {
        name: "ueberauth",
        update: "ueberauth",
        filesToAdd: ["apps/server/lib/app_web/controllers/oauth_controller.ex"],
        filesToPatch: [
          "apps/server/config/config.exs",
          "apps/server/lib/app_web/router.ex",
          "apps/server/mix.exs",
        ],
        assertions: [
          { path: "apps/server/mix.exs", content: ":ueberauth" },
          { path: "apps/server/config/config.exs", content: "config :ueberauth, Ueberauth" },
          { path: "apps/server/lib/app_web/controllers/oauth_controller.ex", content: "plug Ueberauth" },
          { path: "apps/server/lib/app_web/router.ex", content: "get \"/:provider/callback\"" },
        ],
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-elixir-auth-${testCase.name}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, ELIXIR_BASE_CONFIG));

      const plan = await planStackUpdate(projectDir, { elixirAuth: testCase.update });

      expect(plan.success, `${testCase.name}: ${plan.success ? "" : plan.error}`).toBe(true);
      if (!plan.success) continue;
      expect(plan.proposedConfig.elixirAuth).toBe(testCase.update);
      for (const file of testCase.filesToAdd) {
        expect(plan.filesToAdd).toContain(file);
      }
      for (const file of testCase.filesToPatch) {
        expect(plan.filesToPatch).toContain(file);
      }

      await applyStackUpdate(projectDir, { elixirAuth: testCase.update });

      const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
      expect(persisted.elixirAuth).toBe(testCase.update);
      for (const assertion of testCase.assertions) {
        await expectFileContains(join(projectDir, assertion.path), assertion.content);
      }
    }
  });

  it("applies plain Elixir Ecto through the generic ORM update field", async () => {
    const root = await makeTempRoot("bfs-stack-elixir-ecto-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        ...ELIXIR_BASE_CONFIG,
        elixirOrm: "none",
        elixirAuth: "none",
        elixirJobs: "none",
      }),
    );

    const plan = await planStackUpdate(projectDir, { elixirOrm: "ecto" });

    expect(plan.success, plan.success ? "" : plan.error).toBe(true);
    if (!plan.success) return;
    expect(plan.proposedConfig.elixirOrm).toBe("ecto");
    expect(plan.filesToAdd).toContain("apps/server/lib/app/catalog.ex");
    expect(plan.filesToAdd).toContain("apps/server/lib/app/catalog/item.ex");
    expect(plan.filesToAdd).toContain("apps/server/lib/app_web/controllers/item_controller.ex");
    expect(plan.filesToPatch).toContain("apps/server/mix.exs");

    await applyStackUpdate(projectDir, { elixirOrm: "ecto" });

    const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(persisted.elixirOrm).toBe("ecto");
    await expectFileContains(join(projectDir, "apps/server/mix.exs"), ":ecto");
    await expectFileContains(
      join(projectDir, "apps/server/lib/app/catalog.ex"),
      "Ecto.Changeset.apply_action(:insert)",
    );
    await expectFileContains(
      join(projectDir, "apps/server/lib/app/catalog/item.ex"),
      "use Ecto.Schema",
    );

    const mix = await readFile(join(projectDir, "apps/server/mix.exs"), "utf-8");
    expect(mix).not.toContain(":ecto_sql");
    expect(mix).not.toContain(":postgrex");
    const application = await readFile(
      join(projectDir, "apps/server/lib/app/application.ex"),
      "utf-8",
    );
    expect(application).not.toContain("App.Repo");
  });

  it("applies Elixir LiveView Streams through the generic realtime update field", async () => {
    const root = await makeTempRoot("bfs-stack-elixir-live-streams-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        ...ELIXIR_BASE_CONFIG,
        elixirWebFramework: "phoenix-live-view",
        elixirOrm: "none",
        elixirApi: "none",
        elixirRealtime: "none",
      }),
    );

    const plan = await planStackUpdate(projectDir, {
      elixirRealtime: "live-view-streams",
    });

    expect(plan.success, plan.success ? "" : plan.error).toBe(true);
    if (!plan.success) return;
    expect(plan.proposedConfig.elixirRealtime).toBe("live-view-streams");
    expect(plan.filesToAdd).toContain(
      "apps/server/lib/app_web/live/item_live/index.ex",
    );
    expect(plan.filesToPatch).toContain("apps/server/lib/app_web/router.ex");

    await applyStackUpdate(projectDir, { elixirRealtime: "live-view-streams" });

    const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(persisted.elixirRealtime).toBe("live-view-streams");
    await expectFileContains(
      join(projectDir, "apps/server/lib/app_web/live/item_live/index.ex"),
      "stream(:items",
    );
    await expectFileContains(
      join(projectDir, "apps/server/lib/app_web/router.ex"),
      "live \"/items\", ItemLive.Index, :index",
    );
  });

  it("applies Elixir NimbleOptions validation through the generic validation update field", async () => {
    const root = await makeTempRoot("bfs-stack-elixir-nimble-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, ELIXIR_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, { elixirValidation: "nimble-options" });

    expect(plan.proposedConfig.elixirValidation).toBe("nimble-options");
    expect(plan.filesToAdd).toContain("apps/server/lib/app/catalog/item_options.ex");
    expect(plan.filesToPatch).toContain("apps/server/lib/app/catalog.ex");
    expect(plan.filesToPatch).toContain("apps/server/mix.exs");

    await applyStackUpdate(projectDir, { elixirValidation: "nimble-options" });

    const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(persisted.elixirValidation).toBe("nimble-options");
    await expectFileContains(join(projectDir, "apps/server/mix.exs"), ":nimble_options");
    await expectFileContains(
      join(projectDir, "apps/server/lib/app/catalog/item_options.ex"),
      "NimbleOptions.validate(@schema)",
    );
    await expectFileContains(
      join(projectDir, "apps/server/lib/app/catalog.ex"),
      "ItemOptions.validate(attrs)",
    );
  });

  it("applies .NET cloud deploy targets through the generic deploy update field", async () => {
    const cases: Array<{
      name: string;
      update: ProjectConfig["dotnetDeploy"];
      addedFiles: string[];
      expectedFile: string;
      expectedContent: string;
    }> = [
      {
        name: "azure",
        update: "azure",
        addedFiles: ["apps/server/Dockerfile", "apps/server/azure.yaml"],
        expectedFile: "apps/server/azure.yaml",
        expectedContent: "host: containerapp",
      },
      {
        name: "aws",
        update: "aws",
        addedFiles: ["apps/server/Dockerfile", "apps/server/copilot/api/manifest.yml"],
        expectedFile: "apps/server/copilot/api/manifest.yml",
        expectedContent: "type: Load Balanced Web Service",
      },
    ];

    await Promise.all(cases.map(async (testCase) => {
      const root = await makeTempRoot(`bfs-stack-dotnet-${testCase.name}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, DOTNET_BASE_CONFIG));

      const plan = await planStackUpdate(projectDir, { dotnetDeploy: testCase.update });

      expect(plan.proposedConfig.dotnetDeploy).toBe(testCase.update);
      for (const addedFile of testCase.addedFiles) {
        expect(plan.filesToAdd).toContain(addedFile);
      }

      await applyStackUpdate(projectDir, { dotnetDeploy: testCase.update });

      const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
      expect(persisted.dotnetDeploy).toBe(testCase.update);
      await expectFileContains(join(projectDir, testCase.expectedFile), testCase.expectedContent);
      await expectFileContains(join(projectDir, "apps/server/Dockerfile"), "ASPNETCORE_URLS=http://+:8080");
    }));
  });

  it("applies .NET Dapper through the generic ORM update field", async () => {
    const root = await makeTempRoot("bfs-stack-dotnet-dapper-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, { ...DOTNET_BASE_CONFIG, dotnetApi: "minimal-api" }),
    );

    const plan = await planStackUpdate(projectDir, { dotnetOrm: "dapper" });

    expect(plan.proposedConfig.dotnetOrm).toBe("dapper");
    expect(plan.filesToPatch).toContain("apps/server/app.csproj");
    expect(plan.filesToPatch).toContain("apps/server/Program.cs");

    await applyStackUpdate(projectDir, { dotnetOrm: "dapper" });

    const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(persisted.dotnetOrm).toBe("dapper");
    await expectFileContains(join(projectDir, "apps/server/app.csproj"), 'PackageReference Include="Dapper"');
    await expectFileContains(
      join(projectDir, "apps/server/app.csproj"),
      'PackageReference Include="Microsoft.Data.Sqlite"',
    );
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "using Dapper;");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "TodoDapper.CreateConnection");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "QuerySingleAsync<TodoItem>");
  });

  it("applies .NET Linq2DB through the generic ORM update field", async () => {
    const root = await makeTempRoot("bfs-stack-dotnet-linq2db-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, { ...DOTNET_BASE_CONFIG, dotnetApi: "minimal-api" }),
    );

    const plan = await planStackUpdate(projectDir, { dotnetOrm: "linq2db" });

    expect(plan.proposedConfig.dotnetOrm).toBe("linq2db");
    expect(plan.filesToPatch).toContain("apps/server/app.csproj");
    expect(plan.filesToPatch).toContain("apps/server/Program.cs");

    await applyStackUpdate(projectDir, { dotnetOrm: "linq2db" });

    const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(persisted.dotnetOrm).toBe("linq2db");
    await expectFileContains(join(projectDir, "apps/server/app.csproj"), 'PackageReference Include="linq2db"');
    await expectFileContains(
      join(projectDir, "apps/server/app.csproj"),
      'PackageReference Include="Microsoft.Data.Sqlite"',
    );
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "using LinqToDB;");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "TodoLinq2Db.CreateConnection");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "InsertWithInt32Identity");
  });

  it("applies .NET MVC through the generic web framework update field", async () => {
    const root = await makeTempRoot("bfs-stack-dotnet-mvc-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, { ...DOTNET_BASE_CONFIG, dotnetOrm: "ef-core", dotnetApi: "minimal-api" }),
    );

    const plan = await planStackUpdate(projectDir, { dotnetWebFramework: "aspnet-mvc" });

    expect(plan.proposedConfig.dotnetWebFramework).toBe("aspnet-mvc");
    expect(plan.filesToPatch).toContain("apps/server/Program.cs");

    await applyStackUpdate(projectDir, { dotnetWebFramework: "aspnet-mvc" });

    const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(persisted.dotnetWebFramework).toBe("aspnet-mvc");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "builder.Services.AddControllers();");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "app.MapControllers();");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "[ApiController]");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "public sealed class TodosController");
    await expectFileNotContains(join(projectDir, "apps/server/Program.cs"), 'app.MapGet("/api/todos"');
  });

  it("applies .NET Blazor through the generic web framework update field", async () => {
    const root = await makeTempRoot("bfs-stack-dotnet-blazor-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, { ...DOTNET_BASE_CONFIG, dotnetOrm: "none", dotnetApi: "minimal-api" }),
    );

    const plan = await planStackUpdate(projectDir, { dotnetWebFramework: "aspnet-blazor" });

    expect(plan.proposedConfig.dotnetWebFramework).toBe("aspnet-blazor");
    expect(plan.filesToPatch).toContain("apps/server/Program.cs");
    expect(plan.filesToAdd).toContain("apps/server/Components/App.razor");
    expect(plan.filesToAdd).toContain("apps/server/Components/Routes.razor");
    expect(plan.filesToAdd).toContain("apps/server/Components/Pages/Home.razor");

    await applyStackUpdate(projectDir, { dotnetWebFramework: "aspnet-blazor" });

    const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(persisted.dotnetWebFramework).toBe("aspnet-blazor");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "builder.Services.AddRazorComponents()");
    await expectFileContains(join(projectDir, "apps/server/Program.cs"), "app.MapRazorComponents<App>()");
    await expectFileContains(join(projectDir, "apps/server/Components/Pages/Home.razor"), '@page "/"');
  });

  it("applies .NET auth providers through the generic auth update field", async () => {
    const cases: Array<{
      name: string;
      update: ProjectConfig["dotnetAuth"];
      packageReference: string;
      expectedContent: string;
    }> = [
      {
        name: "duende",
        update: "duende-identityserver",
        packageReference: 'PackageReference Include="Duende.IdentityServer"',
        expectedContent: ".AddIdentityServer()",
      },
      {
        name: "auth0",
        update: "auth0-aspnet",
        packageReference: 'PackageReference Include="Auth0.AspNetCore.Authentication"',
        expectedContent: "AddAuth0WebAppAuthentication",
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-dotnet-auth-${testCase.name}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, DOTNET_BASE_CONFIG));

      const plan = await planStackUpdate(projectDir, { dotnetAuth: testCase.update });

      expect(plan.proposedConfig.dotnetAuth).toBe(testCase.update);
      expect(plan.filesToPatch).toContain("apps/server/app.csproj");
      expect(plan.filesToPatch).toContain("apps/server/Program.cs");

      await applyStackUpdate(projectDir, { dotnetAuth: testCase.update });

      const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
      expect(persisted.dotnetAuth).toBe(testCase.update);
      await expectFileContains(join(projectDir, "apps/server/app.csproj"), testCase.packageReference);
      await expectFileContains(join(projectDir, "apps/server/Program.cs"), testCase.expectedContent);
    }
  });

  it("applies Elixir deploy targets through the generic deploy update field", async () => {
    const cases: Array<{
      name: string;
      update: ProjectConfig["elixirDeploy"];
      addedFile: string;
      expectedContent: string;
    }> = [
      {
        name: "fly",
        update: "fly",
        addedFile: "apps/server/fly.toml",
        expectedContent: 'app = "app"',
      },
      {
        name: "gigalixir",
        update: "gigalixir",
        addedFile: "apps/server/Procfile",
        expectedContent: "_build/prod/rel/app/bin/app start",
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-elixir-${testCase.name}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, ELIXIR_BASE_CONFIG));

      const plan = await planStackUpdate(projectDir, { elixirDeploy: testCase.update });

      expect(plan.proposedConfig.elixirDeploy).toBe(testCase.update);
      expect(plan.filesToAdd).toContain(testCase.addedFile);

      await applyStackUpdate(projectDir, { elixirDeploy: testCase.update });

      const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
      expect(persisted.elixirDeploy).toBe(testCase.update);
      await expectFileContains(join(projectDir, testCase.addedFile), testCase.expectedContent);
    }
  });

  it("applies Elixir Nebulex caching through the generic caching update field", async () => {
    const root = await makeTempRoot("bfs-stack-elixir-nebulex-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, ELIXIR_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, { elixirCaching: "nebulex" });

    expect(plan.proposedConfig.elixirCaching).toBe("nebulex");
    expect(plan.filesToAdd).toContain("apps/server/lib/app/cache.ex");
    expect(plan.filesToPatch).toContain("apps/server/config/config.exs");
    expect(plan.filesToPatch).toContain("apps/server/lib/app/application.ex");
    expect(plan.filesToPatch).toContain("apps/server/mix.exs");

    await applyStackUpdate(projectDir, { elixirCaching: "nebulex" });

    const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(persisted.elixirCaching).toBe("nebulex");
    await expectFileContains(join(projectDir, "apps/server/mix.exs"), ":nebulex");
    await expectFileContains(
      join(projectDir, "apps/server/lib/app/cache.ex"),
      "use Nebulex.Cache",
    );
    await expectFileContains(
      join(projectDir, "apps/server/lib/app/application.ex"),
      "App.Cache",
    );
    await expectFileContains(
      join(projectDir, "apps/server/config/config.exs"),
      "config :app, App.Cache",
    );
  });

  it("applies Elixir observability integrations through the generic observability update field", async () => {
    const cases: Array<{
      name: string;
      update: ProjectConfig["elixirObservability"];
      filesToAdd: string[];
      filesToPatch: string[];
      assertions: Array<{ path: string; content: string }>;
    }> = [
      {
        name: "opentelemetry",
        update: "opentelemetry",
        filesToAdd: [],
        filesToPatch: ["apps/server/lib/app/application.ex", "apps/server/mix.exs"],
        assertions: [
          { path: "apps/server/mix.exs", content: ":opentelemetry_phoenix" },
          { path: "apps/server/lib/app/application.ex", content: "OpentelemetryPhoenix.setup()" },
        ],
      },
      {
        name: "prom-ex",
        update: "prom_ex",
        filesToAdd: ["apps/server/lib/app/prom_ex.ex"],
        filesToPatch: [
          "apps/server/config/config.exs",
          "apps/server/lib/app/application.ex",
          "apps/server/lib/app_web/endpoint.ex",
          "apps/server/mix.exs",
        ],
        assertions: [
          { path: "apps/server/mix.exs", content: ":prom_ex" },
          { path: "apps/server/config/config.exs", content: "config :app, App.PromEx" },
          { path: "apps/server/lib/app/application.ex", content: "App.PromEx" },
          { path: "apps/server/lib/app_web/endpoint.ex", content: "PromEx.Plug" },
          { path: "apps/server/lib/app/prom_ex.ex", content: "use PromEx, otp_app: :app" },
        ],
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-elixir-${testCase.name}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, ELIXIR_BASE_CONFIG));

      const plan = await planStackUpdate(projectDir, {
        elixirObservability: testCase.update,
      });

      expect(plan.proposedConfig.elixirObservability).toBe(testCase.update);
      for (const file of testCase.filesToAdd) {
        expect(plan.filesToAdd).toContain(file);
      }
      for (const file of testCase.filesToPatch) {
        expect(plan.filesToPatch).toContain(file);
      }

      await applyStackUpdate(projectDir, { elixirObservability: testCase.update });

      const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
      expect(persisted.elixirObservability).toBe(testCase.update);
      for (const assertion of testCase.assertions) {
        await expectFileContains(join(projectDir, assertion.path), assertion.content);
      }
    }
  });

  it("applies Elixir testing integrations through the generic testing update field", async () => {
    const cases: Array<{
      name: string;
      update: ProjectConfig["elixirTesting"];
      filesToAdd: string[];
      filesToPatch: string[];
      assertions: Array<{ path: string; content: string }>;
    }> = [
      {
        name: "mox",
        update: "mox",
        filesToAdd: [
          "apps/server/lib/app/external_service.ex",
          "apps/server/test/app/external_service_mox_test.exs",
          "apps/server/test/support/mocks.ex",
        ],
        filesToPatch: ["apps/server/mix.exs"],
        assertions: [
          { path: "apps/server/mix.exs", content: ":mox" },
          {
            path: "apps/server/lib/app/external_service.ex",
            content: "@callback fetch_status()",
          },
          { path: "apps/server/test/support/mocks.ex", content: "Mox.defmock" },
          {
            path: "apps/server/test/app/external_service_mox_test.exs",
            content: "setup :verify_on_exit!",
          },
        ],
      },
      {
        name: "bypass",
        update: "bypass",
        filesToAdd: ["apps/server/test/app/bypass_test.exs"],
        filesToPatch: ["apps/server/mix.exs"],
        assertions: [
          { path: "apps/server/mix.exs", content: ":bypass" },
          { path: "apps/server/test/app/bypass_test.exs", content: "Bypass.open()" },
          {
            path: "apps/server/test/app/bypass_test.exs",
            content: "Bypass.expect_once",
          },
        ],
      },
      {
        name: "wallaby",
        update: "wallaby",
        filesToAdd: ["apps/server/test/app_web/features/home_feature_test.exs"],
        filesToPatch: [
          "apps/server/config/test.exs",
          "apps/server/mix.exs",
          "apps/server/test/test_helper.exs",
        ],
        assertions: [
          { path: "apps/server/mix.exs", content: ":wallaby" },
          { path: "apps/server/config/test.exs", content: "server: true" },
          { path: "apps/server/test/test_helper.exs", content: "Application.ensure_all_started(:wallaby)" },
          {
            path: "apps/server/test/app_web/features/home_feature_test.exs",
            content: "use Wallaby.Feature",
          },
        ],
      },
    ];

    for (const testCase of cases) {
      const root = await makeTempRoot(`bfs-stack-elixir-${testCase.name}-`);
      const projectDir = join(root, "app");
      await scaffoldGeneratedProject(makeConfig(projectDir, ELIXIR_BASE_CONFIG));

      const plan = await planStackUpdate(projectDir, {
        elixirTesting: testCase.update,
      });

      expect(plan.success, `${testCase.name}: ${plan.success ? "" : plan.error}`).toBe(true);
      if (!plan.success) continue;
      expect(plan.proposedConfig.elixirTesting).toBe(testCase.update);
      for (const file of testCase.filesToAdd) {
        expect(plan.filesToAdd).toContain(file);
      }
      for (const file of testCase.filesToPatch) {
        expect(plan.filesToPatch).toContain(file);
      }

      await applyStackUpdate(projectDir, { elixirTesting: testCase.update });

      const persisted = await readJsonc(join(projectDir, "bts.jsonc"));
      expect(persisted.elixirTesting).toBe(testCase.update);
      for (const assertion of testCase.assertions) {
        await expectFileContains(join(projectDir, assertion.path), assertion.content);
      }
    }
  });

  it("applies shared backend services across non-TypeScript ecosystems", async () => {
    const baseConfigs: Array<{
      name: string;
      config: Partial<ProjectConfig>;
      expectGeneratedFiles: boolean;
    }> = [
      { name: "python", config: PYTHON_BASE_CONFIG, expectGeneratedFiles: true },
      { name: "go", config: GO_BASE_CONFIG, expectGeneratedFiles: true },
      { name: "rust", config: RUST_BASE_CONFIG, expectGeneratedFiles: true },
      { name: "java", config: JAVA_BASE_CONFIG, expectGeneratedFiles: true },
      { name: "dotnet", config: DOTNET_BASE_CONFIG, expectGeneratedFiles: false },
      { name: "elixir", config: ELIXIR_BASE_CONFIG, expectGeneratedFiles: false },
    ];
    const serviceUpdates: Array<{ field: keyof ProjectConfig; value: string }> = [
      { field: "caching", value: "upstash-redis" },
      { field: "search", value: "meilisearch" },
    ];

    for (const baseConfig of baseConfigs) {
      for (const serviceUpdate of serviceUpdates) {
        const root = await makeTempRoot(
          `bfs-stack-update-shared-${baseConfig.name}-${String(serviceUpdate.field)}-`,
        );
        const projectDir = join(root, "app");
        await scaffoldGeneratedProject(makeConfig(projectDir, baseConfig.config));

        const update = {
          [serviceUpdate.field]: serviceUpdate.value,
        } as Partial<ProjectConfig>;
        const plan = await planStackUpdate(projectDir, update);
        expect(plan.success).toBe(true);
        if (!plan.success) continue;

        expect(plan.proposedConfig[serviceUpdate.field]).toBe(serviceUpdate.value);
        expect(plan.manualReviewBlockers).toEqual([]);
        if (baseConfig.expectGeneratedFiles) {
          expect(plan.filesToAdd.length + plan.filesToPatch.length).toBeGreaterThan(0);
          expect(plan.stackPartSpecs).toContain(
            `backend.${String(serviceUpdate.field)}:${baseConfig.name}:${serviceUpdate.value}`,
          );
        } else {
          expect(plan.filesToAdd.length + plan.filesToPatch.length).toBe(0);
        }

        const result = await applyStackUpdate(projectDir, update);
        expect(result.success).toBe(true);

        const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
        expect(btsConfig[serviceUpdate.field]).toBe(serviceUpdate.value);
      }
    }
  });

  it("returns structured failures for invalid proposed stack updates", async () => {
    const root = await makeTempRoot("bfs-stack-update-invalid-java-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(
      makeConfig(projectDir, {
        ...NON_TS_BASE_CONFIG,
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "none",
        javaTestingLibraries: [],
      }),
    );

    const plan = await planStackUpdate(projectDir, { email: "resend" });

    expect(plan.success).toBe(false);
    if (plan.success) return;
    expect(plan.error).toContain("Invalid stack update");
    expect(plan.error).toContain(
      "Resend email for Java requires Maven or Gradle to manage the SDK dependency",
    );
  });

  it("rejects unsupported stack update fields", async () => {
    const root = await makeTempRoot("bfs-stack-update-unknown-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir));

    const plan = await planStackUpdate(projectDir, { targetDir: "/tmp/nope" });

    expect(plan.success).toBe(false);
    if (plan.success) return;
    expect(plan.error).toContain("Unsupported stack update field");
    expect(plan.error).toContain("targetDir");
  });

  it("blocks updates that would overwrite user-edited generated files", async () => {
    const root = await makeTempRoot("bfs-stack-update-conflict-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, { email: "resend" }));

    const emailPath = join(projectDir, "apps/server/src/lib/email.ts");
    await writeFile(emailPath, "// user edited email implementation\n", "utf-8");

    const plan = await planStackUpdate(projectDir, { email: "sendgrid" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.manualReviewBlockers).toContain(
      "apps/server/src/lib/email.ts: existing file differs from the generated baseline",
    );

    const result = await applyStackUpdate(projectDir, { email: "sendgrid" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toContain("Manual review required");
  });

  const ARCH_BASE_CONFIG: Partial<ProjectConfig> = {
    frontend: ["react-vite"],
    backend: "hono",
    runtime: "bun",
    database: "sqlite",
    orm: "drizzle",
    api: "none",
    auth: "better-auth",
  };

  it("flags database, orm, and auth swaps as architecture changes carrying migration steps", async () => {
    const root = await makeTempRoot("bfs-stack-update-arch-flags-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, ARCH_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, {
      database: "postgres",
      orm: "prisma",
      auth: "none",
    });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.requiresArchitectureAck).toBe(true);
    expect(plan.architectureChanges).toContainEqual({
      key: "database",
      from: "sqlite",
      to: "postgres",
    });
    expect(plan.architectureChanges).toContainEqual({
      key: "orm",
      from: "drizzle",
      to: "prisma",
    });
    expect(plan.architectureChanges).toContainEqual({
      key: "auth",
      from: "better-auth",
      to: "none",
    });
    expect(plan.migrationSteps.length).toBeGreaterThan(0);
    expect(
      plan.migrationSteps.some((step) => step.startsWith("database (sqlite -> postgres)")),
    ).toBe(true);
    expect(plan.migrationSteps.some((step) => step.startsWith("orm (drizzle -> prisma)"))).toBe(
      true,
    );
    expect(plan.migrationSteps.some((step) => step.startsWith("auth (better-auth -> none)"))).toBe(
      true,
    );
  });

  it("refuses to apply an architecture change without acknowledgment and leaves the project untouched", async () => {
    const root = await makeTempRoot("bfs-stack-update-arch-refuse-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, ARCH_BASE_CONFIG));

    const before = await readJsonc(join(projectDir, "bts.jsonc"));

    const result = await applyStackUpdate(projectDir, { database: "postgres" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error).toContain("architecture change requires acknowledgment");
    expect(result.error).toContain("database: sqlite -> postgres");
    expect(result.error).toContain("acknowledgeArchitectureChange: true");

    const after = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(after.database).toBe("sqlite");
    expect(after).toEqual(before);
    expect(await pathExists(join(projectDir, "MIGRATION.md"))).toBe(false);
  });

  it("applies an architecture change with acknowledgment and appends a MIGRATION.md checklist", async () => {
    const root = await makeTempRoot("bfs-stack-update-arch-apply-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, ARCH_BASE_CONFIG));

    const result = await applyStackUpdate(projectDir, {
      database: "postgres",
      acknowledgeArchitectureChange: true,
    });
    expect(result.success).toBe(true);
    if (!result.success) return;

    const btsConfig = await readJsonc(join(projectDir, "bts.jsonc"));
    expect(btsConfig.database).toBe("postgres");

    const migrationPath = join(projectDir, "MIGRATION.md");
    const migration = await readFile(migrationPath, "utf-8");
    expect(migration).toContain("# Migration checklist");
    expect(migration).toContain("database (sqlite -> postgres)");
    expect(migration).toContain("Data and schema are NOT migrated automatically");

    // A second architecture change appends (does not overwrite) a new checklist section.
    const second = await applyStackUpdate(projectDir, {
      orm: "prisma",
      acknowledgeArchitectureChange: true,
    });
    expect(second.success).toBe(true);
    const migrationAfter = await readFile(migrationPath, "utf-8");
    expect(migrationAfter).toContain("database (sqlite -> postgres)");
    expect(migrationAfter).toContain("orm (drizzle -> prisma)");
    expect(migrationAfter.match(/## Architecture change/g)?.length).toBe(2);
  });

  it("does not gate additive addon updates", async () => {
    const root = await makeTempRoot("bfs-stack-update-arch-addon-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, ARCH_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, { addons: ["ultracite"] });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.requiresArchitectureAck).toBe(false);
    expect(plan.architectureChanges).toEqual([]);
    expect(plan.migrationSteps).toEqual([]);

    const result = await applyStackUpdate(projectDir, { addons: ["ultracite"] });
    expect(result.success).toBe(true);
    expect(await pathExists(join(projectDir, "MIGRATION.md"))).toBe(false);
  });

  it("does not gate additive (none -> X) stack additions", async () => {
    const root = await makeTempRoot("bfs-stack-update-arch-add-none-");
    const projectDir = join(root, "app");
    await scaffoldGeneratedProject(makeConfig(projectDir, TYPESCRIPT_SERVICE_BASE_CONFIG));

    const plan = await planStackUpdate(projectDir, { auth: "better-auth" });
    expect(plan.success).toBe(true);
    if (!plan.success) return;

    expect(plan.requiresArchitectureAck).toBe(false);
    expect(plan.architectureChanges).toEqual([]);

    const result = await applyStackUpdate(projectDir, { auth: "better-auth" });
    expect(result.success).toBe(true);
    expect(await pathExists(join(projectDir, "MIGRATION.md"))).toBe(false);
  });
});
