import { describe, expect, it } from "bun:test";

import type { ProjectConfig } from "../src/types";

import { createCliDefaultProjectConfigBase } from "../src/defaults";
import {
  AI_VALUES,
  ADDONS_VALUES,
  API_VALUES,
  AUTH_VALUES,
  BACKEND_VALUES,
  CACHING_VALUES,
  CMS_VALUES,
  CSS_FRAMEWORK_VALUES,
  DATABASE_VALUES,
  DATABASE_SETUP_VALUES,
  DOTNET_API_VALUES,
  DOTNET_AUTH_VALUES,
  DOTNET_VALIDATION_VALUES,
  DOTNET_CACHING_VALUES,
  DOTNET_DEPLOY_VALUES,
  DOTNET_JOB_QUEUE_VALUES,
  DOTNET_OBSERVABILITY_VALUES,
  DOTNET_ORM_VALUES,
  DOTNET_REALTIME_VALUES,
  DOTNET_TESTING_VALUES,
  DOTNET_WEB_FRAMEWORK_VALUES,
  ELIXIR_API_VALUES,
  ELIXIR_LIBRARIES_VALUES,
  ELIXIR_AUTH_VALUES,
  ELIXIR_CACHING_VALUES,
  ELIXIR_DEPLOY_VALUES,
  ELIXIR_EMAIL_VALUES,
  ELIXIR_HTTP_VALUES,
  ELIXIR_JOBS_VALUES,
  ELIXIR_OBSERVABILITY_VALUES,
  ELIXIR_ORM_VALUES,
  ELIXIR_QUALITY_VALUES,
  ELIXIR_REALTIME_VALUES,
  ELIXIR_TESTING_VALUES,
  ELIXIR_VALIDATION_VALUES,
  ELIXIR_WEB_FRAMEWORK_VALUES,
  EFFECT_VALUES,
  EMAIL_VALUES,
  EXAMPLES_VALUES,
  FEATURE_FLAGS_VALUES,
  FILE_STORAGE_VALUES,
  FILE_UPLOAD_VALUES,
  FORMS_VALUES,
  FRONTEND_VALUES,
  GO_API_VALUES,
  GO_AUTH_VALUES,
  GO_CLI_VALUES,
  GO_CACHING_VALUES,
  GO_CONFIG_VALUES,
  GO_LOGGING_VALUES,
  GO_MESSAGE_QUEUE_VALUES,
  GO_OBSERVABILITY_VALUES,
  GO_ORM_VALUES,
  GO_REALTIME_VALUES,
  GO_TESTING_VALUES,
  GO_WEB_FRAMEWORK_VALUES,
  JAVA_AUTH_VALUES,
  JAVA_API_VALUES,
  JAVA_LOGGING_VALUES,
  JAVA_BUILD_TOOL_VALUES,
  JAVA_LIBRARIES_VALUES,
  JAVA_ORM_VALUES,
  JAVA_TESTING_LIBRARIES_VALUES,
  JAVA_WEB_FRAMEWORK_VALUES,
  JOB_QUEUE_VALUES,
  LOGGING_VALUES,
  MOBILE_DEEP_LINKING_VALUES,
  MOBILE_NAVIGATION_VALUES,
  MOBILE_OTA_VALUES,
  MOBILE_PUSH_VALUES,
  MOBILE_STORAGE_VALUES,
  MOBILE_TESTING_VALUES,
  MOBILE_UI_VALUES,
  OBSERVABILITY_VALUES,
  ORM_VALUES,
  PAYMENTS_VALUES,
  PYTHON_API_VALUES,
  PYTHON_AI_VALUES,
  PYTHON_AUTH_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_GRAPHQL_VALUES,
  PYTHON_QUALITY_VALUES,
  PYTHON_TESTING_VALUES,
  PYTHON_CACHING_VALUES,
  PYTHON_REALTIME_VALUES,
  PYTHON_OBSERVABILITY_VALUES,
  PYTHON_CLI_VALUES,
  PYTHON_TASK_QUEUE_VALUES,
  PYTHON_VALIDATION_VALUES,
  PYTHON_WEB_FRAMEWORK_VALUES,
  REALTIME_VALUES,
  RUNTIME_VALUES,
  RUST_API_VALUES,
  RUST_AUTH_VALUES,
  RUST_CACHING_VALUES,
  RUST_REALTIME_VALUES,
  RUST_MESSAGE_QUEUE_VALUES,
  RUST_OBSERVABILITY_VALUES,
  RUST_TEMPLATING_VALUES,
  RUST_CLI_VALUES,
  RUST_ERROR_HANDLING_VALUES,
  RUST_FRONTEND_VALUES,
  RUST_LIBRARIES_VALUES,
  RUST_LOGGING_VALUES,
  RUST_ORM_VALUES,
  RUST_WEB_FRAMEWORK_VALUES,
  SERVER_DEPLOY_VALUES,
  SEARCH_VALUES,
  I18N_VALUES,
  ANALYTICS_VALUES,
  ANIMATION_VALUES,
  ASTRO_INTEGRATION_VALUES,
  STATE_MANAGEMENT_VALUES,
  TESTING_VALUES,
  UI_LIBRARY_VALUES,
  VALIDATION_VALUES,
  WEB_DEPLOY_VALUES,
} from "../src/schemas";
import {
  ELIXIR_UNSUPPORTED_GRAPH_TOOLS,
  getAddonStackPartBinding,
  getStackPartCompatibilityIssueForPart,
  getStackPartOptions,
  legacyProjectConfigToStackParts,
  parseStackPartSpecs,
  stackGraphToLegacyProjectConfigForEcosystem,
  stackPartsToLegacyProjectConfigPartial,
  validateStackParts,
} from "../src/stack-graph";

function compareLegacyConfigToStackParts(
  config: Partial<ProjectConfig>,
  stackParts: Parameters<typeof stackPartsToLegacyProjectConfigPartial>[0],
) {
  const derived = stackPartsToLegacyProjectConfigPartial(stackParts);
  const diagnostics = [];
  for (const key of Object.keys(derived) as Array<keyof ProjectConfig>) {
    const current = config[key];
    const next = derived[key];
    if (current === undefined || next === undefined) continue;
    if (JSON.stringify(current) !== JSON.stringify(next)) {
      diagnostics.push({
        code: "LEGACY_CONFIG_MISMATCH",
        path: key,
        message: `Legacy field '${key}' differs from stackParts and will be derived from the graph.`,
      });
    }
  }
  return diagnostics;
}

function getTypeScriptApiOptionsForFrontend(frontend: string) {
  return getStackPartOptions({
    role: "api",
    ecosystem: "typescript",
    ownerRole: "backend",
    ownerEcosystem: "typescript",
    ownerToolId: "hono",
    primaryToolIdsByRole: { frontend, backend: "hono" },
  });
}

describe("stack graph", () => {
  it("parses repeated part bindings and lowers them to legacy compatibility fields", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "mobile:react-native:native-bare",
      "backend:go:gin",
      "backend.orm:go:gorm",
      "database:universal:postgres",
    ]);

    expect(stackParts.map((part) => part.role)).toEqual([
      "frontend",
      "mobile",
      "backend",
      "database",
      "orm",
    ]);

    const lowered = stackPartsToLegacyProjectConfigPartial(stackParts);
    expect(lowered.ecosystem).toBe("typescript");
    expect(lowered.frontend).toEqual(["next", "native-bare"]);
    expect(lowered.backend).toBe("none");
    expect(lowered.goWebFramework).toBe("gin");
    expect(lowered.goOrm).toBe("gorm");
    expect(lowered.database).toBe("postgres");
  });

  it("lowers scoped graph capability parts through their legacy categories", () => {
    const stackParts = parseStackPartSpecs([
      "backend:elixir:phoenix",
      "backend.email:elixir:swoosh",
      "backend.caching:elixir:cachex",
      "backend.observability:elixir:telemetry",
    ]);
    const result = validateStackParts(stackParts);
    const lowered = stackPartsToLegacyProjectConfigPartial(stackParts);

    expect(result.issues).toEqual([]);
    expect(lowered.elixirWebFramework).toBe("phoenix");
    expect(lowered.elixirEmail).toBe("swoosh");
    expect(lowered.elixirCaching).toBe("cachex");
    expect(lowered.elixirObservability).toBe("telemetry");
  });

  it("accepts native dotnet caching and observability tools as scoped capability parts", () => {
    const stackParts = parseStackPartSpecs([
      "backend:dotnet:aspnet-minimal",
      "backend.caching:dotnet:redis",
      "backend.observability:dotnet:serilog",
      "backend.realtime:dotnet:signalr",
      "backend.testing:dotnet:xunit",
    ]);
    const result = validateStackParts(stackParts);
    const lowered = stackPartsToLegacyProjectConfigPartial(stackParts);

    expect(result.issues).toEqual([]);
    expect(lowered.dotnetWebFramework).toBe("aspnet-minimal");
    expect(lowered.dotnetCaching).toBe("redis");
    expect(lowered.dotnetObservability).toEqual(["serilog"]);
    expect(lowered.dotnetRealtime).toBe("signalr");
    expect(lowered.dotnetTesting).toEqual(["xunit"]);
  });

  it("lowers owner-scoped infrastructure graph parts through their legacy categories", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.deploy:typescript:vercel",
      "backend:typescript:hono",
      "backend.runtime:typescript:node",
      "backend.deploy:typescript:railway",
      "database:universal:postgres",
      "database.dbSetup:universal:neon",
    ]);
    const result = validateStackParts(stackParts);
    const lowered = stackPartsToLegacyProjectConfigPartial(stackParts);

    expect(result.issues).toEqual([]);
    expect(lowered.webDeploy).toBe("vercel");
    expect(lowered.runtime).toBe("node");
    expect(lowered.serverDeploy).toBe("railway");
    expect(lowered.dbSetup).toBe("neon");
  });

  it("lowers multi-select addon and example graph parts through legacy arrays", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.appPlatform:typescript:pwa",
      "frontend.dataFetching:typescript:swr",
      "frontend.dataFetching:typescript:tanstack-table",
      "frontend.testing:typescript:storybook",
      "codeQuality:universal:biome",
      "documentation:universal:fumadocs",
      "workspaceTooling:universal:turborepo",
      "workspaceTooling:universal:mcp",
      "examples:universal:ai",
      "examples:universal:chat-sdk",
      "backend:typescript:hono",
      "backend.runtime:typescript:node",
    ]);
    const result = validateStackParts(stackParts);
    const lowered = stackPartsToLegacyProjectConfigPartial(stackParts);

    expect(result.issues).toEqual([]);
    expect(lowered.addons).toEqual([
      "biome",
      "fumadocs",
      "turborepo",
      "mcp",
      "pwa",
      "swr",
      "tanstack-table",
      "storybook",
    ]);
    expect(lowered.examples).toEqual(["ai", "chat-sdk"]);
  });

  it("projects graph-selected ecosystem capabilities through legacy categories", () => {
    const stackParts = parseStackPartSpecs([
      "backend:elixir:phoenix",
      "backend.orm:elixir:ecto-sql",
      "backend.api:elixir:absinthe",
      "backend.email:elixir:swoosh",
      "backend.caching:elixir:cachex",
    ]);

    const projected = stackGraphToLegacyProjectConfigForEcosystem(
      {
        ...createCliDefaultProjectConfigBase(),
        projectDir: "/virtual",
        stackParts,
      },
      "elixir",
    );

    expect(projected.backend).toBe("none");
    expect(projected.orm).toBe("none");
    expect(projected.elixirWebFramework).toBe("phoenix");
    expect(projected.elixirOrm).toBe("ecto-sql");
    expect(projected.elixirApi).toBe("absinthe");
    expect(projected.elixirEmail).toBe("swoosh");
    expect(projected.elixirCaching).toBe("cachex");
  });

  it("filters options by role and ecosystem so backend tools do not leak into frontend discovery", () => {
    expect(getStackPartOptions({ role: "frontend", ecosystem: "typescript" })).toContain("next");
    expect(getStackPartOptions({ role: "frontend", ecosystem: "typescript" })).not.toContain(
      "hono",
    );
    expect(getStackPartOptions({ role: "backend", ecosystem: "typescript" })).toContain("hono");
  });

  it("filters capability options by owning framework context", () => {
    const fastApiOptions = getStackPartOptions({
      role: "api",
      ecosystem: "python",
      ownerRole: "backend",
      ownerEcosystem: "python",
      ownerToolId: "fastapi",
    });
    const djangoOptions = getStackPartOptions({
      role: "api",
      ecosystem: "python",
      ownerRole: "backend",
      ownerEcosystem: "python",
      ownerToolId: "django",
    });

    expect(fastApiOptions).not.toContain("django-rest-framework");
    expect(fastApiOptions).not.toContain("django-ninja");
    expect(djangoOptions).toContain("django-rest-framework");
    expect(djangoOptions).toContain("django-ninja");
  });

  it("filters Apollo Server API options by frontend graph context", () => {
    expect(getTypeScriptApiOptionsForFrontend("tanstack-router")).toContain("apollo-server");
    expect(getTypeScriptApiOptionsForFrontend("svelte")).not.toContain("apollo-server");
    expect(getTypeScriptApiOptionsForFrontend("solid")).not.toContain("apollo-server");
    expect(getTypeScriptApiOptionsForFrontend("astro")).not.toContain("apollo-server");
  });

  it("filters Elixir capability options by owner and generated support", () => {
    const phoenixRealtimeOptions = getStackPartOptions({
      role: "realtime",
      ecosystem: "elixir",
      ownerRole: "backend",
      ownerEcosystem: "elixir",
      ownerToolId: "phoenix",
      siblingToolIdsByRole: { orm: "ecto-sql" },
    });
    const liveViewRealtimeOptions = getStackPartOptions({
      role: "realtime",
      ecosystem: "elixir",
      ownerRole: "backend",
      ownerEcosystem: "elixir",
      ownerToolId: "phoenix-live-view",
      siblingToolIdsByRole: { orm: "ecto-sql" },
    });

    expect(phoenixRealtimeOptions).toContain("channels");
    expect(phoenixRealtimeOptions).not.toContain("live-view-streams");
    expect(liveViewRealtimeOptions).toContain("live-view-streams");
    expect(getStackPartOptions({ role: "orm", ecosystem: "elixir" })).toContain("ecto");
  });

  it("rejects invalid role bindings", () => {
    const stackParts = parseStackPartSpecs(["frontend:typescript:hono"]);
    const result = validateStackParts(stackParts);

    expect(result.issues.map((issue) => issue.code)).toContain("UNSUPPORTED_ROLE_BINDING");
  });

  it("rejects capability parts without a primary owner", () => {
    const stackParts = parseStackPartSpecs(["backend.orm:go:gorm"]);
    const result = validateStackParts(stackParts);

    expect(result.issues.map((issue) => issue.code)).toContain("MISSING_OWNER_PART");
  });

  it("rejects duplicate selections in the same role scope", () => {
    const stackParts = parseStackPartSpecs([
      "backend:go:gin",
      "backend.orm:go:gorm",
      "backend.orm:go:sqlc",
    ]);
    const result = validateStackParts(stackParts);

    expect(result.issues.map((issue) => issue.code)).toContain("DUPLICATE_ROLE_SCOPE");
  });

  it("allows registry-marked multi-select roles and ownerless workspace tools", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.dataFetching:typescript:swr",
      "frontend.dataFetching:typescript:tanstack-table",
      "codeQuality:universal:biome",
      "codeQuality:universal:oxlint",
      "workspaceTooling:universal:turborepo",
      "workspaceTooling:universal:skills",
    ]);
    const result = validateStackParts(stackParts);

    expect(result.issues).toEqual([]);
  });

  it("rejects scoped capabilities from a different ecosystem than their owner", () => {
    const stackParts = parseStackPartSpecs(["backend:go:gin", "backend.orm:typescript:drizzle"]);
    const result = validateStackParts(stackParts);

    expect(result.issues.map((issue) => issue.code)).toContain("INCOMPATIBLE_OWNER_ECOSYSTEM");
  });

  it("rejects framework-specific capability selections for the wrong owner tool", () => {
    const pythonParts = parseStackPartSpecs([
      "backend:python:fastapi",
      "backend.api:python:django-rest-framework",
    ]);
    const javaParts = parseStackPartSpecs([
      "backend:java:quarkus",
      "backend.auth:java:spring-security",
    ]);

    expect(validateStackParts(pythonParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
    expect(validateStackParts(javaParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
  });

  it("rejects incompatible Java graph selections", () => {
    const javaOrmWithoutBuildToolParts = parseStackPartSpecs([
      "backend:java:spring-boot",
      "backend.orm:java:spring-data-jpa",
    ]);
    const javaMigrationWithoutJpaParts = parseStackPartSpecs([
      "backend:java:spring-boot",
      "backend.buildTool:java:maven",
      "backend.libraries:java:flyway",
    ]);
    const javaMigrationConflictParts = parseStackPartSpecs([
      "backend:java:spring-boot",
      "backend.buildTool:java:maven",
      "backend.orm:java:spring-data-jpa",
      "backend.libraries:java:flyway",
      "backend.libraries:java:liquibase",
    ]);
    const javaTestingWithoutBuildToolParts = parseStackPartSpecs([
      "backend:java:spring-boot",
      "backend.testing:java:junit5",
    ]);

    expect(validateStackParts(javaOrmWithoutBuildToolParts).issues).toContainEqual(
      expect.objectContaining({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        role: "orm",
        toolId: "spring-data-jpa",
      }),
    );
    expect(validateStackParts(javaMigrationWithoutJpaParts).issues).toContainEqual(
      expect.objectContaining({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        role: "libraries",
        toolId: "flyway",
      }),
    );
    expect(validateStackParts(javaMigrationConflictParts).issues).toContainEqual(
      expect.objectContaining({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        role: "libraries",
        toolId: "liquibase",
      }),
    );
    expect(validateStackParts(javaTestingWithoutBuildToolParts).issues).toContainEqual(
      expect.objectContaining({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        role: "testing",
        toolId: "junit5",
      }),
    );
  });

  it("rejects cross-part graph selections that are not compatible", () => {
    const trpcParts = parseStackPartSpecs([
      "frontend:typescript:svelte",
      "backend:typescript:hono",
      "backend.api:typescript:trpc",
    ]);
    const apolloSvelteParts = parseStackPartSpecs([
      "frontend:typescript:svelte",
      "backend:typescript:hono",
      "backend.api:typescript:apollo-server",
    ]);
    const apolloAstroParts = parseStackPartSpecs([
      "frontend:typescript:astro",
      "backend:typescript:hono",
      "backend.api:typescript:apollo-server",
    ]);
    const betterAuthParts = parseStackPartSpecs([
      "backend:typescript:hono",
      "backend.orm:typescript:typeorm",
      "backend.auth:typescript:better-auth",
      "database:universal:postgres",
    ]);

    expect(validateStackParts(trpcParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
    expect(validateStackParts(apolloSvelteParts).issues).toContainEqual(
      expect.objectContaining({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        role: "api",
        toolId: "apollo-server",
      }),
    );
    expect(validateStackParts(apolloAstroParts).issues).toContainEqual(
      expect.objectContaining({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        role: "api",
        toolId: "apollo-server",
      }),
    );
    expect(validateStackParts(betterAuthParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
  });

  it("validates Keystatic CMS graph frontend support", () => {
    const tanstackRouterParts = parseStackPartSpecs([
      "frontend:typescript:tanstack-router",
      "backend:typescript:hono",
      "backend.cms:typescript:keystatic",
    ]);
    const nuxtParts = parseStackPartSpecs([
      "frontend:typescript:nuxt",
      "backend:typescript:hono",
      "backend.cms:typescript:keystatic",
    ]);
    const nextParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:typescript:hono",
      "backend.cms:typescript:keystatic",
    ]);
    const astroNodeParts = parseStackPartSpecs([
      "frontend:typescript:astro",
      "backend:typescript:hono",
      "backend.runtime:typescript:node",
      "backend.cms:typescript:keystatic",
    ]);

    for (const parts of [tanstackRouterParts, nuxtParts, astroNodeParts]) {
      expect(validateStackParts(parts).issues).toContainEqual(
        expect.objectContaining({
          code: "INCOMPATIBLE_GRAPH_SELECTION",
          role: "cms",
          toolId: "keystatic",
          message:
            "Keystatic is currently scaffolded for Next.js only because @keystatic/astro is not Astro 7-compatible yet.",
        }),
      );
    }
    expect(
      validateStackParts(nextParts).issues.filter(
        (issue) => issue.role === "cms" && issue.toolId === "keystatic",
      ),
    ).toEqual([]);
  });

  it("rejects incompatible backend-owned TypeScript AI graph selections", () => {
    const chatSdkParts = parseStackPartSpecs([
      "frontend:typescript:nuxt",
      "backend:typescript:hono",
      "backend.runtime:typescript:node",
      "examples:universal:chat-sdk",
      "examples:universal:ai",
      "backend.ai:typescript:langchain",
    ]);
    const tanstackAiParts = parseStackPartSpecs([
      "frontend:typescript:svelte",
      "backend:typescript:hono",
      "backend.ai:typescript:tanstack-ai",
    ]);

    expect(validateStackParts(chatSdkParts).issues).toContainEqual(
      expect.objectContaining({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        role: "ai",
        toolId: "langchain",
      }),
    );
    expect(validateStackParts(tanstackAiParts).issues).toContainEqual(
      expect.objectContaining({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        role: "ai",
        toolId: "tanstack-ai",
      }),
    );
  });

  it("rejects incompatible frontend-owned TypeScript graph selections", () => {
    const shadcnScssParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.css:typescript:scss",
      "frontend.ui:typescript:shadcn-ui",
    ]);
    const nextIntlParts = parseStackPartSpecs([
      "frontend:typescript:react-vite",
      "frontend.i18n:typescript:next-intl",
    ]);
    const paraglideQwikParts = parseStackPartSpecs([
      "frontend:typescript:qwik",
      "frontend.i18n:typescript:paraglide",
    ]);
    const freshParts = parseStackPartSpecs([
      "frontend:typescript:fresh",
      "frontend.animation:typescript:lottie",
    ]);
    const backendOwnedUiParts = parseStackPartSpecs([
      "backend:typescript:hono",
      "backend.ui:typescript:shadcn-ui",
    ]);

    expect(validateStackParts(shadcnScssParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
    expect(validateStackParts(nextIntlParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
    expect(validateStackParts(paraglideQwikParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
    expect(validateStackParts(freshParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
    expect(validateStackParts(backendOwnedUiParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_ROLE",
    );
  });

  it("rejects incompatible infrastructure graph selections", () => {
    const backendNetlifyWithoutNodeParts = parseStackPartSpecs([
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
      "backend.deploy:typescript:netlify",
    ]);
    const expressNetlifyParts = parseStackPartSpecs([
      "backend:typescript:express",
      "backend.runtime:typescript:node",
      "backend.deploy:typescript:netlify",
    ]);
    const cloudflareWithoutWorkersParts = parseStackPartSpecs([
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
      "backend.deploy:typescript:cloudflare",
    ]);
    const d1WithoutWorkersParts = parseStackPartSpecs([
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
      "database:universal:sqlite",
      "database.dbSetup:universal:d1",
    ]);
    const unsupportedWebDeployParts = parseStackPartSpecs([
      "frontend:typescript:fresh",
      "frontend.deploy:typescript:render",
    ]);

    expect(
      validateStackParts(backendNetlifyWithoutNodeParts).issues.map((issue) => issue.code),
    ).toContain("INCOMPATIBLE_GRAPH_SELECTION");
    expect(validateStackParts(expressNetlifyParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
    expect(
      validateStackParts(cloudflareWithoutWorkersParts).issues.map((issue) => issue.code),
    ).toContain("INCOMPATIBLE_GRAPH_SELECTION");
    expect(validateStackParts(d1WithoutWorkersParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
    expect(
      validateStackParts(unsupportedWebDeployParts).issues.map((issue) => issue.code),
    ).toContain("INCOMPATIBLE_OWNER_TOOL");
  });

  it("rejects incompatible addon and example graph selections", () => {
    const dockerWorkersParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:typescript:hono",
      "backend.runtime:typescript:workers",
      "workspaceTooling:universal:docker-compose",
    ]);
    const queryWithApiParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:typescript:hono",
      "backend.api:typescript:trpc",
      "frontend.dataFetching:typescript:tanstack-query",
    ]);
    const chatSdkBunParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:typescript:hono",
      "backend.runtime:typescript:bun",
      "examples:universal:chat-sdk",
    ]);
    const backendUtilsGoParts = parseStackPartSpecs([
      "backend:go:gin",
      "workspaceTooling:universal:backend-utils",
    ]);

    expect(validateStackParts(dockerWorkersParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
    expect(validateStackParts(queryWithApiParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
    expect(validateStackParts(chatSdkBunParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
    expect(validateStackParts(backendUtilsGoParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_GRAPH_SELECTION",
    );
  });

  it("rejects shared non-TypeScript backend service candidates through graph checks", () => {
    const javaParts = parseStackPartSpecs([
      "backend:java:spring-boot",
      "backend.buildTool:java:none",
    ]);
    const javaBackend = javaParts.find((part) => part.role === "backend");
    expect(javaBackend).toBeDefined();

    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:backend.email:java:nodemailer",
          role: "email",
          toolId: "nodemailer",
          ecosystem: "java",
          ownerPartId: javaBackend?.id,
        },
        javaParts,
      )?.message,
    ).toBe("Only Resend email is available for non-TypeScript ecosystems");

    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:backend.email:java:resend",
          role: "email",
          toolId: "resend",
          ecosystem: "java",
          ownerPartId: javaBackend?.id,
        },
        javaParts,
      )?.message,
    ).toBe("Resend email for Java requires Maven or Gradle to manage the SDK dependency");

    const goParts = parseStackPartSpecs(["backend:go:gin"]);
    const goBackend = goParts.find((part) => part.role === "backend");
    expect(goBackend).toBeDefined();

    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:backend.search:go:algolia",
          role: "search",
          toolId: "algolia",
          ecosystem: "go",
          ownerPartId: goBackend?.id,
        },
        goParts,
      )?.message,
    ).toBe("Only Meilisearch search is available for non-TypeScript ecosystems");
  });

  it("rejects Elixir graph selections that the current scaffold cannot generate", () => {
    const liveViewParts = parseStackPartSpecs([
      "backend:elixir:phoenix",
      "backend.realtime:elixir:live-view-streams",
    ]);
    const obanParts = parseStackPartSpecs([
      "backend:elixir:phoenix",
      "backend.orm:elixir:ecto",
      "backend.jobQueue:elixir:oban",
    ]);
    const phoenixParts = parseStackPartSpecs([
      "backend:elixir:phoenix",
      "backend.orm:elixir:ecto-sql",
    ]);
    const phoenixBackend = phoenixParts.find((part) => part.role === "backend");
    expect(phoenixBackend).toBeDefined();

    expect(validateStackParts(liveViewParts).issues.map((issue) => issue.code)).toContain(
      "INCOMPATIBLE_OWNER_TOOL",
    );
    expect(validateStackParts(obanParts).issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["INCOMPATIBLE_GRAPH_SELECTION"]),
    );
    expect(validateStackParts(obanParts).issues.map((issue) => issue.code)).not.toContain(
      "UNSUPPORTED_GRAPH_TOOL",
    );
    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:backend.auth:elixir:guardian",
          role: "auth",
          toolId: "guardian",
          ecosystem: "elixir",
          ownerPartId: phoenixBackend?.id,
        },
        phoenixParts,
      ),
    ).toBeUndefined();
    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:backend.deploy:elixir:fly",
          role: "deploy",
          toolId: "fly",
          ecosystem: "elixir",
          ownerPartId: phoenixBackend?.id,
        },
        phoenixParts,
      ),
    ).toBeUndefined();
  });

  it("rejects ownerless Elixir Phoenix-context candidates through graph checks", () => {
    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:native:backend.auth:elixir:phx-gen-auth",
          role: "auth",
          toolId: "phx-gen-auth",
          ecosystem: "elixir",
        },
        [],
      )?.message,
    ).toBe("Elixir auth scaffolds require Phoenix");

    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:native:backend.api:elixir:rest",
          role: "api",
          toolId: "rest",
          ecosystem: "elixir",
        },
        [],
      )?.message,
    ).toBe("Elixir API scaffolds require Phoenix");

    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:native:backend.realtime:elixir:channels",
          role: "realtime",
          toolId: "channels",
          ecosystem: "elixir",
        },
        [],
      )?.message,
    ).toBe("Elixir realtime scaffolds require Phoenix");

    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:native:backend.observability:elixir:phoenix-telemetry",
          role: "observability",
          toolId: "phoenix-telemetry",
          ecosystem: "elixir",
        },
        [],
      )?.message,
    ).toBe("Phoenix telemetry requires Phoenix");

    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:native:backend.jobQueue:elixir:oban",
          role: "jobQueue",
          toolId: "oban",
          ecosystem: "elixir",
        },
        [],
      )?.message,
    ).toBe("Oban requires Ecto SQL with PostgreSQL in the current Phoenix scaffold");

    expect(
      getStackPartCompatibilityIssueForPart(
        {
          id: "candidate:native:backend.auth:elixir:ueberauth",
          role: "auth",
          toolId: "ueberauth",
          ecosystem: "elixir",
        },
        [],
      )?.message,
    ).toBe("Elixir auth scaffolds require Phoenix");
  });

  it("materializes provided capabilities and rejects conflicts unless overrideable", () => {
    const stackParts = parseStackPartSpecs([
      "backend:typescript:convex",
      "backend.database:universal:postgres",
    ]);
    const result = validateStackParts(stackParts);

    expect(stackParts.some((part) => part.source === "provided" && part.role === "database")).toBe(
      true,
    );
    expect(result.issues.map((issue) => issue.code)).toContain("PROVIDED_CAPABILITY_CONFLICT");
  });

  it("rejects multiple legacy primary web frontends during graph translation", () => {
    expect(() =>
      legacyProjectConfigToStackParts({
        frontend: ["next", "react-vite"],
      }),
    ).toThrow("Multiple primary web frontends");
  });

  it("reports graph-wins mismatches against legacy fields", () => {
    const stackParts = parseStackPartSpecs(["frontend:typescript:next"]);
    const diagnostics = compareLegacyConfigToStackParts(
      { ecosystem: "typescript", frontend: ["react-vite"] },
      stackParts,
    );

    expect(diagnostics).toEqual([
      expect.objectContaining({ code: "LEGACY_CONFIG_MISMATCH", path: "frontend" }),
    ]);
  });

  it("reports promoted TypeScript backend single drift when graph omits the scoped part", () => {
    const stackParts = parseStackPartSpecs(["backend:typescript:hono"]);
    const lowered = stackPartsToLegacyProjectConfigPartial(stackParts);
    const diagnostics = compareLegacyConfigToStackParts(
      { ecosystem: "typescript", backend: "hono", logging: "pino" },
      stackParts,
    );

    expect(lowered.logging).toBe("none");
    expect(diagnostics).toEqual([
      expect.objectContaining({ code: "LEGACY_CONFIG_MISMATCH", path: "logging" }),
    ]);
  });
});

function expectNoDrift(config: Partial<ProjectConfig>) {
  const parts = legacyProjectConfigToStackParts(config);
  const diagnostics = compareLegacyConfigToStackParts(config, parts);
  expect(diagnostics).toEqual([]);
  return stackPartsToLegacyProjectConfigPartial(parts);
}

function structuralTuple(part: { role: string; ecosystem: string; toolId: string }) {
  return `${part.role}:${part.ecosystem}:${part.toolId}`;
}

// Phase 0 of docs/plans/planned/single-source-of-truth-stack-graph.md: prove
// flat -> graph -> flat is lossless for every structural option value, by
// asserting the runtime drift guard never fires across the enumerated space.
describe("stack graph structural round-trip (phase 0)", () => {
  const NATIVE_FRONTENDS = ["native-bare", "native-uniwind", "native-unistyles"] as const;
  const WEB_FRONTENDS = FRONTEND_VALUES.filter(
    (value) => value !== "none" && !NATIVE_FRONTENDS.includes(value as never),
  );

  const TS_BASE: Partial<ProjectConfig> = {
    ecosystem: "typescript",
    frontend: ["tanstack-router"],
    backend: "hono",
    database: "sqlite",
    orm: "drizzle",
    api: "trpc",
    auth: "better-auth",
  };

  function getCompatibleBackendSingleConfig(field: string, value: string): Partial<ProjectConfig> {
    const config = { ...TS_BASE, [field]: value };
    if (field === "cms" && (value === "payload" || value === "keystatic")) {
      config.frontend = ["next"];
    }
    return config;
  }

  it("round-trips every TypeScript web frontend without drift", () => {
    for (const frontend of WEB_FRONTENDS) {
      const derived = expectNoDrift({ ...TS_BASE, frontend: [frontend] });
      expect(derived.frontend).toEqual([frontend]);
    }
  });

  it("round-trips every TypeScript backend, database, orm, api, and auth value", () => {
    for (const backend of BACKEND_VALUES) {
      expectNoDrift({ ...TS_BASE, backend });
    }
    for (const database of DATABASE_VALUES) {
      expectNoDrift({ ...TS_BASE, database });
    }
    for (const orm of ORM_VALUES) {
      expectNoDrift({ ...TS_BASE, orm });
    }
    for (const api of API_VALUES) {
      expectNoDrift({ ...TS_BASE, api });
    }
    for (const auth of AUTH_VALUES) {
      expectNoDrift({ ...TS_BASE, auth });
    }
  });

  it("round-trips every backend-owned TypeScript single value as a scoped graph part", () => {
    const cases = {
      logging: LOGGING_VALUES,
      email: EMAIL_VALUES,
      search: SEARCH_VALUES,
      caching: CACHING_VALUES,
      observability: OBSERVABILITY_VALUES,
      jobQueue: JOB_QUEUE_VALUES,
      fileStorage: FILE_STORAGE_VALUES,
      featureFlags: FEATURE_FLAGS_VALUES,
      payments: PAYMENTS_VALUES,
      realtime: REALTIME_VALUES,
      ai: AI_VALUES,
      cms: CMS_VALUES,
      validation: VALIDATION_VALUES,
      effect: EFFECT_VALUES,
      testing: TESTING_VALUES,
    } as const;

    for (const [field, values] of Object.entries(cases)) {
      for (const value of values) {
        const config = getCompatibleBackendSingleConfig(field, value);
        const parts = legacyProjectConfigToStackParts(config);
        const backend = parts.find(
          (part) => part.role === "backend" && part.ecosystem === "typescript",
        );
        const scopedPart = parts.find(
          (part) => part.role === field && part.ecosystem === "typescript",
        );
        const derived = expectNoDrift(config);

        expect(derived[field as keyof ProjectConfig] ?? "none").toBe(value);
        if (value === "none") {
          expect(scopedPart).toBeUndefined();
        } else {
          expect(scopedPart?.ownerPartId).toBe(backend?.id);
        }
        expect(validateStackParts(parts).issues).toEqual([]);
      }
    }
  });

  it("keeps validation, effect, and testing flat-only without a TypeScript backend", () => {
    const config: Partial<ProjectConfig> = {
      ecosystem: "typescript",
      frontend: ["tanstack-router"],
      backend: "none",
      database: "none",
      orm: "none",
      api: "none",
      auth: "none",
      validation: "valibot",
      effect: "effect",
      testing: "playwright",
    };
    const parts = legacyProjectConfigToStackParts(config);
    expect(
      parts.some(
        (part) => part.role === "validation" || part.role === "effect" || part.role === "testing",
      ),
    ).toBe(false);
    expectNoDrift(config);
  });

  it("owns the TypeScript test runner on the backend without colliding with testing addons", () => {
    // The framework testing part (backend-owned) and the msw/storybook testing addons
    // (frontend-owned) share the `testing` role but live in different owner scopes, so
    // both round-trip cleanly and validateStackParts raises no DUPLICATE_ROLE_SCOPE issue.
    const config: Partial<ProjectConfig> = {
      ...TS_BASE,
      testing: "vitest",
      addons: ["msw", "storybook"],
    };
    const parts = legacyProjectConfigToStackParts(config);
    const backend = parts.find(
      (part) => part.role === "backend" && part.ecosystem === "typescript",
    );
    const frontend = parts.find(
      (part) => part.role === "frontend" && part.ecosystem === "typescript",
    );
    const frameworkPart = parts.find(
      (part) => part.role === "testing" && part.toolId === "vitest",
    );
    const addonTestingParts = parts.filter(
      (part) => part.role === "testing" && part.toolId !== "vitest",
    );

    expect(frameworkPart?.ownerPartId).toBe(backend?.id);
    expect(addonTestingParts.map((part) => part.toolId).sort()).toEqual(["msw", "storybook"]);
    expect(addonTestingParts.every((part) => part.ownerPartId === frontend?.id)).toBe(true);
    expect(validateStackParts(parts).issues).toEqual([]);

    const derived = expectNoDrift(config);
    expect(derived.testing).toBe("vitest");
    expect([...(derived.addons ?? [])].sort()).toEqual(["msw", "storybook"]);
  });

  it("round-trips every frontend-owned TypeScript single value as a scoped graph part", () => {
    const cases = {
      cssFramework: { role: "css", values: CSS_FRAMEWORK_VALUES },
      uiLibrary: { role: "ui", values: UI_LIBRARY_VALUES },
      forms: { role: "forms", values: FORMS_VALUES },
      stateManagement: { role: "stateManagement", values: STATE_MANAGEMENT_VALUES },
      animation: { role: "animation", values: ANIMATION_VALUES },
      fileUpload: { role: "fileUpload", values: FILE_UPLOAD_VALUES },
      i18n: { role: "i18n", values: I18N_VALUES },
      analytics: { role: "analytics", values: ANALYTICS_VALUES },
    } as const;

    for (const [field, { role, values }] of Object.entries(cases)) {
      for (const value of values) {
        const frontend =
          field === "uiLibrary" && value === "shadcn-svelte"
            ? "svelte"
            : field === "i18n" && value === "next-intl"
              ? "next"
              : "tanstack-router";
        const config = {
          ...TS_BASE,
          frontend: [frontend],
          api: frontend === "svelte" ? "none" : TS_BASE.api,
          [field]: value,
        };
        const parts = legacyProjectConfigToStackParts(config);
        const frontendPart = parts.find(
          (part) => part.role === "frontend" && part.ecosystem === "typescript",
        );
        const scopedPart = parts.find(
          (part) => part.role === role && part.ecosystem === "typescript",
        );
        const derived = expectNoDrift(config);

        expect(derived[field as keyof ProjectConfig] ?? "none").toBe(value);
        if (value === "none") {
          expect(scopedPart).toBeUndefined();
        } else {
          expect(scopedPart?.ownerPartId).toBe(frontendPart?.id);
        }
        expect(validateStackParts(parts).issues).toEqual([]);
      }
    }
  });

  it("carries the Astro integration as a frontend-part setting and round-trips it", () => {
    for (const astroIntegration of ASTRO_INTEGRATION_VALUES.filter((value) => value !== "none")) {
      const config: Partial<ProjectConfig> = {
        ecosystem: "typescript",
        frontend: ["astro"],
        backend: "none",
        database: "none",
        orm: "none",
        api: "none",
        auth: "none",
        astroIntegration,
      };
      const parts = legacyProjectConfigToStackParts(config);
      const frontendPart = parts.find(
        (part) => part.role === "frontend" && part.ecosystem === "typescript",
      );

      // legacy -> parts: the choice rides on the Astro frontend part's settings,
      // not a flat side channel or a scoped capability part.
      expect(frontendPart?.toolId).toBe("astro");
      expect(frontendPart?.settings?.astroIntegration).toBe(astroIntegration);

      // parts -> legacy: the graph restores the same integration with no drift.
      const diagnostics = compareLegacyConfigToStackParts(config, parts);
      expect(diagnostics).toEqual([]);

      const derived = stackPartsToLegacyProjectConfigPartial(parts);
      expect(derived.astroIntegration).toBe(astroIntegration);
      expect(validateStackParts(parts).issues).toEqual([]);
    }

    // Without a carried setting the projection leaves astroIntegration unset so a
    // flat field (e.g. a stack-update whose spec-derived parts drop the setting)
    // is preserved instead of being clobbered to "none".
    const noIntegrationParts = legacyProjectConfigToStackParts({
      ecosystem: "typescript",
      frontend: ["astro"],
      backend: "none",
      database: "none",
      orm: "none",
      api: "none",
      auth: "none",
    });
    expect(
      noIntegrationParts.find(
        (part) => part.role === "frontend" && part.ecosystem === "typescript",
      )?.settings,
    ).toBeUndefined();
    expect(
      stackPartsToLegacyProjectConfigPartial(noIntegrationParts).astroIntegration,
    ).toBeUndefined();
  });

  it("round-trips every deploy, runtime, and db setup value as a scoped graph part", () => {
    for (const runtime of RUNTIME_VALUES) {
      const config = {
        ...TS_BASE,
        backend: runtime === "none" ? "self" : "hono",
        runtime,
      };
      const parts = legacyProjectConfigToStackParts(config);
      const backend = parts.find(
        (part) => part.role === "backend" && part.ecosystem === "typescript",
      );
      const scopedPart = parts.find(
        (part) => part.role === "runtime" && part.ecosystem === "typescript",
      );
      const derived = expectNoDrift(config);

      expect(derived.runtime ?? "none").toBe(runtime);
      if (runtime === "none") {
        expect(scopedPart).toBeUndefined();
      } else {
        expect(scopedPart?.ownerPartId).toBe(backend?.id);
      }
      expect(validateStackParts(parts).issues).toEqual([]);
    }

    for (const webDeploy of WEB_DEPLOY_VALUES) {
      const config = { ...TS_BASE, frontend: ["next"], webDeploy };
      const parts = legacyProjectConfigToStackParts(config);
      const frontend = parts.find(
        (part) => part.role === "frontend" && part.ecosystem === "typescript",
      );
      const scopedPart = parts.find(
        (part) =>
          part.role === "deploy" &&
          part.ecosystem === "typescript" &&
          part.ownerPartId === frontend?.id,
      );
      const derived = expectNoDrift(config);

      expect(derived.webDeploy ?? "none").toBe(webDeploy);
      if (webDeploy === "none") {
        expect(scopedPart).toBeUndefined();
      } else {
        expect(scopedPart?.ownerPartId).toBe(frontend?.id);
      }
      expect(validateStackParts(parts).issues).toEqual([]);
    }

    for (const serverDeploy of SERVER_DEPLOY_VALUES) {
      const config = {
        ...TS_BASE,
        backend: "hono",
        runtime:
          serverDeploy === "cloudflare" ? "workers" : serverDeploy === "netlify" ? "node" : "bun",
        serverDeploy,
      };
      const parts = legacyProjectConfigToStackParts(config);
      const backend = parts.find(
        (part) => part.role === "backend" && part.ecosystem === "typescript",
      );
      const scopedPart = parts.find(
        (part) =>
          part.role === "deploy" &&
          part.ecosystem === "typescript" &&
          part.ownerPartId === backend?.id,
      );
      const derived = expectNoDrift(config);

      expect(derived.serverDeploy ?? "none").toBe(serverDeploy);
      if (serverDeploy === "none") {
        expect(scopedPart).toBeUndefined();
      } else {
        expect(scopedPart?.ownerPartId).toBe(backend?.id);
      }
      expect(validateStackParts(parts).issues).toEqual([]);
    }

    const dbSetupConfigByValue = {
      turso: { database: "sqlite", runtime: "bun" },
      neon: { database: "postgres", runtime: "bun" },
      "prisma-postgres": { database: "postgres", runtime: "bun" },
      planetscale: { database: "mysql", runtime: "bun" },
      "mongodb-atlas": { database: "mongodb", runtime: "bun" },
      supabase: { database: "postgres", runtime: "bun" },
      upstash: { database: "redis", runtime: "bun", auth: "none" },
      d1: { database: "sqlite", runtime: "workers" },
      docker: { database: "postgres", runtime: "bun" },
      none: { database: "postgres", runtime: "bun" },
    } as const;

    for (const dbSetup of DATABASE_SETUP_VALUES) {
      const base = dbSetupConfigByValue[dbSetup];
      const config = { ...TS_BASE, ...base, dbSetup };
      const parts = legacyProjectConfigToStackParts(config);
      const database = parts.find((part) => part.role === "database");
      const scopedPart = parts.find((part) => part.role === "dbSetup");
      const derived = expectNoDrift(config);

      expect(derived.dbSetup ?? "none").toBe(dbSetup);
      if (dbSetup === "none") {
        expect(scopedPart).toBeUndefined();
      } else {
        expect(scopedPart?.ownerPartId).toBe(database?.id);
      }
      expect(validateStackParts(parts).issues).toEqual([]);
    }
  });

  it("round-trips every addon and example value as multi-select graph parts", () => {
    for (const addon of ADDONS_VALUES) {
      const config = {
        ...TS_BASE,
        frontend: ["next"],
        runtime: "bun",
        api: addon === "tanstack-query" ? "none" : TS_BASE.api,
        addons: [addon],
      };
      const parts = legacyProjectConfigToStackParts(config);
      const binding = getAddonStackPartBinding(addon);
      const frontend = parts.find(
        (part) => part.role === "frontend" && part.ecosystem === "typescript",
      );
      const graphPart = binding
        ? parts.find(
            (part) =>
              part.role === binding.role &&
              part.ecosystem === binding.ecosystem &&
              part.toolId === addon,
          )
        : undefined;
      const derived = expectNoDrift(config);

      if (addon === "none") {
        expect(graphPart).toBeUndefined();
      } else {
        expect(derived.addons).toContain(addon);
        expect(graphPart).toBeDefined();
        expect(graphPart?.ownerPartId).toBe(
          binding?.ownerRole === "frontend" ? frontend?.id : undefined,
        );
      }
      expect(validateStackParts(parts).issues).toEqual([]);
    }

    for (const example of EXAMPLES_VALUES) {
      const config = {
        ...TS_BASE,
        frontend: ["next"],
        runtime: example === "chat-sdk" ? "node" : "bun",
        examples: [example],
      };
      const parts = legacyProjectConfigToStackParts(config);
      const graphPart = parts.find((part) => part.role === "examples" && part.toolId === example);
      const derived = expectNoDrift(config);

      if (example === "none") {
        expect(graphPart).toBeUndefined();
      } else {
        expect(derived.examples).toContain(example);
        expect(graphPart?.ownerPartId).toBeUndefined();
      }
      expect(validateStackParts(parts).issues).toEqual([]);
    }
  });

  it("round-trips every native mobile frontend without drift", () => {
    for (const frontend of NATIVE_FRONTENDS) {
      const derived = expectNoDrift({
        ecosystem: "react-native",
        frontend: [frontend],
        backend: "none",
        database: "none",
        orm: "none",
        api: "none",
        auth: "better-auth",
      });
      expect(derived.frontend).toEqual([frontend]);
      expect(derived.ecosystem).toBe("react-native");
    }
  });

  it("round-trips promoted mobile-owned categories without drift", () => {
    const mobileConfigByValue = {
      mobileNavigation: {
        values: MOBILE_NAVIGATION_VALUES,
        frontendForValue: () => "native-bare",
      },
      mobileUI: {
        values: MOBILE_UI_VALUES,
        frontendForValue: (value: string) =>
          value === "uniwind"
            ? "native-uniwind"
            : value === "unistyles"
              ? "native-unistyles"
              : "native-bare",
      },
      mobileStorage: {
        values: MOBILE_STORAGE_VALUES,
        frontendForValue: () => "native-bare",
      },
      mobileTesting: {
        values: MOBILE_TESTING_VALUES,
        frontendForValue: () => "native-bare",
      },
      mobilePush: {
        values: MOBILE_PUSH_VALUES,
        frontendForValue: () => "native-bare",
      },
      mobileOTA: {
        values: MOBILE_OTA_VALUES,
        frontendForValue: () => "native-bare",
      },
      mobileDeepLinking: {
        values: MOBILE_DEEP_LINKING_VALUES,
        frontendForValue: () => "native-bare",
      },
    } as const;

    for (const [field, { values, frontendForValue }] of Object.entries(mobileConfigByValue)) {
      for (const value of values) {
        const derived = expectNoDrift({
          ecosystem: "react-native",
          frontend: [frontendForValue(value)],
          backend: "none",
          database: "none",
          orm: "none",
          api: "none",
          auth: "none",
          [field]: value,
        });
        expect(derived[field as keyof ProjectConfig] ?? "none").toBe(value);
      }
    }
  });

  it("round-trips every legacy-ecosystem backend and capability value", () => {
    const cases = [
      {
        ecosystem: "rust",
        backendField: "rustWebFramework",
        backends: RUST_WEB_FRAMEWORK_VALUES,
        capabilities: {
          rustOrm: RUST_ORM_VALUES,
          rustApi: RUST_API_VALUES,
          rustAuth: RUST_AUTH_VALUES,
          rustCaching: RUST_CACHING_VALUES,
          rustRealtime: RUST_REALTIME_VALUES,
          rustMessageQueue: RUST_MESSAGE_QUEUE_VALUES,
          rustObservability: RUST_OBSERVABILITY_VALUES,
          rustTemplating: RUST_TEMPLATING_VALUES,
          rustCli: RUST_CLI_VALUES,
          rustLogging: RUST_LOGGING_VALUES,
          rustErrorHandling: RUST_ERROR_HANDLING_VALUES,
        },
        arrays: {
          rustLibraries: RUST_LIBRARIES_VALUES,
        },
      },
      {
        ecosystem: "python",
        backendField: "pythonWebFramework",
        backends: PYTHON_WEB_FRAMEWORK_VALUES,
        capabilities: {
          pythonOrm: PYTHON_ORM_VALUES,
          pythonApi: PYTHON_API_VALUES,
          pythonAuth: PYTHON_AUTH_VALUES,
          pythonValidation: PYTHON_VALIDATION_VALUES,
          pythonTaskQueue: PYTHON_TASK_QUEUE_VALUES,
          pythonGraphql: PYTHON_GRAPHQL_VALUES,
          pythonQuality: PYTHON_QUALITY_VALUES,
          pythonCaching: PYTHON_CACHING_VALUES,
          pythonRealtime: PYTHON_REALTIME_VALUES,
          pythonObservability: PYTHON_OBSERVABILITY_VALUES,
        },
        arrays: {
          pythonAi: PYTHON_AI_VALUES,
          pythonTesting: PYTHON_TESTING_VALUES,
          pythonCli: PYTHON_CLI_VALUES,
        },
      },
      {
        ecosystem: "go",
        backendField: "goWebFramework",
        backends: GO_WEB_FRAMEWORK_VALUES,
        capabilities: {
          goOrm: GO_ORM_VALUES,
          goApi: GO_API_VALUES,
          goAuth: GO_AUTH_VALUES,
          goCli: GO_CLI_VALUES,
          goLogging: GO_LOGGING_VALUES,
          goRealtime: GO_REALTIME_VALUES,
          goMessageQueue: GO_MESSAGE_QUEUE_VALUES,
          goCaching: GO_CACHING_VALUES,
          goConfig: GO_CONFIG_VALUES,
          goObservability: GO_OBSERVABILITY_VALUES,
        },
        arrays: {
          goTesting: GO_TESTING_VALUES,
        },
      },
      {
        ecosystem: "java",
        backendField: "javaWebFramework",
        backends: JAVA_WEB_FRAMEWORK_VALUES,
        capabilities: {
          javaBuildTool: JAVA_BUILD_TOOL_VALUES,
          javaOrm: JAVA_ORM_VALUES,
          javaAuth: JAVA_AUTH_VALUES,
          javaApi: JAVA_API_VALUES,
          javaLogging: JAVA_LOGGING_VALUES,
        },
        arrays: {
          javaLibraries: JAVA_LIBRARIES_VALUES,
          javaTestingLibraries: JAVA_TESTING_LIBRARIES_VALUES,
        },
      },
      {
        ecosystem: "elixir",
        backendField: "elixirWebFramework",
        backends: ELIXIR_WEB_FRAMEWORK_VALUES,
        capabilities: {
          elixirOrm: ELIXIR_ORM_VALUES,
          elixirApi: ELIXIR_API_VALUES,
          elixirAuth: ELIXIR_AUTH_VALUES,
          elixirRealtime: ELIXIR_REALTIME_VALUES,
          elixirJobs: ELIXIR_JOBS_VALUES,
          elixirValidation: ELIXIR_VALIDATION_VALUES,
          elixirHttp: ELIXIR_HTTP_VALUES,
          elixirEmail: ELIXIR_EMAIL_VALUES,
          elixirCaching: ELIXIR_CACHING_VALUES,
          elixirObservability: ELIXIR_OBSERVABILITY_VALUES,
          elixirTesting: ELIXIR_TESTING_VALUES,
          elixirQuality: ELIXIR_QUALITY_VALUES,
          elixirDeploy: ELIXIR_DEPLOY_VALUES,
        },
        arrays: {
          elixirLibraries: ELIXIR_LIBRARIES_VALUES,
        },
      },
      {
        ecosystem: "dotnet",
        backendField: "dotnetWebFramework",
        backends: DOTNET_WEB_FRAMEWORK_VALUES,
        capabilities: {
          dotnetOrm: DOTNET_ORM_VALUES,
          dotnetApi: DOTNET_API_VALUES,
          dotnetAuth: DOTNET_AUTH_VALUES,
          dotnetJobQueue: DOTNET_JOB_QUEUE_VALUES,
          dotnetRealtime: DOTNET_REALTIME_VALUES,
          dotnetValidation: DOTNET_VALIDATION_VALUES,
          dotnetCaching: DOTNET_CACHING_VALUES,
          dotnetDeploy: DOTNET_DEPLOY_VALUES,
        },
        arrays: {
          dotnetTesting: DOTNET_TESTING_VALUES,
          dotnetObservability: DOTNET_OBSERVABILITY_VALUES,
        },
      },
    ] as const;

    // Extras categories round-trip like capabilities, except
    // elixir tools the scaffold cannot generate stay flat-only by design.
    const EXTRA_CAPABILITY_FIELDS = new Set([
      "rustCaching",
      "rustCli",
      "rustLogging",
      "rustErrorHandling",
      "pythonValidation",
      "pythonTaskQueue",
      "pythonGraphql",
      "pythonQuality",
      "goCli",
      "goLogging",
      "javaBuildTool",
      "elixirJobs",
      "elixirRealtime",
      "elixirValidation",
      "elixirHttp",
      "elixirEmail",
      "elixirCaching",
      "elixirObservability",
      "elixirTesting",
      "elixirQuality",
      "elixirDeploy",
    ]);

    for (const { ecosystem, backendField, backends, capabilities, arrays } of cases) {
      const anchor = backends.find((value) => value !== "none");
      for (const backend of backends.filter((value) => value !== "none")) {
        const derived = expectNoDrift({ ecosystem, [backendField]: backend });
        expect(derived[backendField]).toBe(backend);
        expect(derived.ecosystem).toBe(ecosystem);
      }
      for (const [field, values] of Object.entries(capabilities)) {
        for (const value of values) {
          const derived = expectNoDrift({
            ecosystem,
            [backendField]: anchor,
            [field]: value,
          });
          const skipped =
            EXTRA_CAPABILITY_FIELDS.has(field) &&
            ecosystem === "elixir" &&
            ELIXIR_UNSUPPORTED_GRAPH_TOOLS.has(value);
          expect(derived[field as keyof ProjectConfig] ?? "none").toBe(skipped ? "none" : value);
        }
      }
      for (const [field, values] of Object.entries(arrays)) {
        for (const value of values) {
          const derived = expectNoDrift({
            ecosystem,
            [backendField]: anchor,
            [field]: [value],
          });
          const lowered = (derived[field as keyof ProjectConfig] ?? []) as string[];
          if (value === "none") {
            expect(lowered).toEqual([]);
          } else {
            expect(lowered).toContain(value);
          }
        }
      }
    }
  });

  it("imports legacy ecosystem extras as backend-owned parts that validate cleanly", () => {
    const elixirBase: Partial<ProjectConfig> = {
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
    };
    const parts = legacyProjectConfigToStackParts({
      ...elixirBase,
      elixirRealtime: "presence",
      elixirJobs: "oban",
      elixirEmail: "swoosh",
      elixirHttp: "finch",
      elixirCaching: "cachex",
      elixirObservability: "telemetry",
      elixirTesting: "ex_unit",
      elixirQuality: "credo",
      elixirDeploy: "docker",
      elixirValidation: "ecto-changesets",
    });

    const backend = parts.find((part) => part.role === "backend");
    const extras = parts.filter((part) =>
      [
        "realtime",
        "jobQueue",
        "email",
        "httpClient",
        "caching",
        "observability",
        "testing",
        "codeQuality",
        "deploy",
        "validation",
      ].includes(part.role),
    );
    expect(extras).toHaveLength(10);
    for (const part of extras) {
      expect(part.ownerPartId).toBe(backend?.id);
    }
    expect(validateStackParts(parts).issues).toEqual([]);

    const lowered = stackPartsToLegacyProjectConfigPartial(parts);
    expect(lowered.elixirRealtime).toBe("presence");
    expect(lowered.elixirJobs).toBe("oban");
    expect(lowered.elixirEmail).toBe("swoosh");
    expect(lowered.elixirHttp).toBe("finch");
    expect(lowered.elixirQuality).toBe("credo");
    expect(lowered.elixirDeploy).toBe("docker");
  });

  it("round-trips the Rust WASM frontend selections", () => {
    for (const rustFrontend of RUST_FRONTEND_VALUES.filter((value) => value !== "none")) {
      const derived = expectNoDrift({
        ecosystem: "rust",
        rustWebFramework: "axum",
        rustFrontend,
      });
      expect(derived.rustFrontend).toBe(rustFrontend);
    }
  });

  it("keeps single-ecosystem structural graphs stable through flat lowering and re-import", () => {
    const parts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:typescript:hono",
      "database:universal:postgres",
      "backend.orm:typescript:drizzle",
      "backend.api:typescript:trpc",
      "backend.auth:typescript:better-auth",
    ]);
    const lowered = stackPartsToLegacyProjectConfigPartial(parts);
    const reimported = legacyProjectConfigToStackParts(lowered);

    expect(reimported.map(structuralTuple).sort()).toEqual(parts.map(structuralTuple).sort());
  });

  it("defaults and validates Effect backend graph-owned services", () => {
    const parts = parseStackPartSpecs(["backend:typescript:effect"]);
    const lowered = stackPartsToLegacyProjectConfigPartial(parts);
    const invalidParts = parseStackPartSpecs([
      "backend:typescript:effect",
      "backend.effect:typescript:effect",
      "backend.validation:typescript:zod",
    ]);

    expect(lowered.backend).toBe("effect");
    expect(lowered.effect).toBe("effect-full");
    expect(lowered.validation).toBe("effect-schema");
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(validateStackParts(invalidParts).issues.map((issue) => issue.message)).toEqual([
      "Effect backend requires Effect Platform + SQL services.",
      "Effect backend requires Effect Schema validation.",
    ]);
  });

  it("imports Python GraphQL selections into the graphql role", () => {
    const pythonParts = legacyProjectConfigToStackParts({
      ecosystem: "python",
      pythonWebFramework: "django",
      pythonGraphql: "strawberry",
    });
    const graphqlParts = pythonParts.filter((part) => part.role === "graphql");
    expect(graphqlParts).toHaveLength(1);
    expect(graphqlParts[0]?.toolId).toBe("strawberry");
  });

  it("round-trips Python API and GraphQL as separate backend-owned graph roles", () => {
    const pythonParts = legacyProjectConfigToStackParts({
      ecosystem: "python",
      pythonWebFramework: "django",
      pythonApi: "django-ninja",
      pythonGraphql: "strawberry",
    });
    const backend = pythonParts.find((part) => part.role === "backend");
    const apiParts = pythonParts.filter((part) => part.role === "api");
    const graphqlParts = pythonParts.filter((part) => part.role === "graphql");

    expect(apiParts).toHaveLength(1);
    expect(apiParts[0]?.toolId).toBe("django-ninja");
    expect(apiParts[0]?.ownerPartId).toBe(backend?.id);
    expect(graphqlParts).toHaveLength(1);
    expect(graphqlParts[0]?.toolId).toBe("strawberry");
    expect(graphqlParts[0]?.ownerPartId).toBe(backend?.id);
    expect(validateStackParts(pythonParts).issues).toEqual([]);

    const lowered = stackPartsToLegacyProjectConfigPartial(pythonParts);
    expect(lowered.pythonApi).toBe("django-ninja");
    expect(lowered.pythonGraphql).toBe("strawberry");

    const reimported = legacyProjectConfigToStackParts(lowered);
    expect(reimported.map(structuralTuple).sort()).toEqual(
      pythonParts.map(structuralTuple).sort(),
    );
  });

  it("imports Elixir realtime selections under the realtime role", () => {
    const elixirParts = legacyProjectConfigToStackParts({
      ecosystem: "elixir",
      elixirWebFramework: "phoenix-live-view",
      elixirRealtime: "channels",
    });
    const realtimeParts = elixirParts.filter((part) => part.role === "realtime");
    expect(realtimeParts).toHaveLength(1);
    expect(realtimeParts[0]?.toolId).toBe("channels");
  });

  // Documented limitation: a multi-ecosystem graph lowered to the flat config
  // cannot be re-imported losslessly because the importer keys off the single
  // `ecosystem` field. This is the authority flip motivation in the design doc.
  it("documents that multi-ecosystem graphs do not survive flat re-import", () => {
    const parts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:go:gin",
      "backend.orm:go:gorm",
    ]);
    const lowered = stackPartsToLegacyProjectConfigPartial(parts);
    expect(lowered.goWebFramework).toBe("gin");

    const reimported = legacyProjectConfigToStackParts(lowered);
    expect(reimported.some((part) => part.role === "backend")).toBe(false);
  });
});
