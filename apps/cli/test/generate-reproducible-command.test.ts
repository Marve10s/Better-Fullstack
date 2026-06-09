import { describe, expect, it } from "bun:test";

import type { ProjectConfig } from "../src/types";

import { parseStackPartSpecs } from "../src/types";
import { generateReproducibleCommand } from "../src/utils/generate-reproducible-command";

function makeConfig(overrides: Partial<ProjectConfig> = {}): ProjectConfig {
  return {
    projectName: "my-app",
    projectDir: "/tmp/my-app",
    relativePath: "my-app",
    ecosystem: "typescript",
    database: "sqlite",
    orm: "drizzle",
    backend: "hono",
    runtime: "bun",
    frontend: ["tanstack-router"],
    addons: ["turborepo"],
    examples: [],
    auth: "better-auth",
    payments: "none",
    git: true,
    packageManager: "bun",
    versionChannel: "stable",
    install: true,
    dbSetup: "none",
    api: "trpc",
    webDeploy: "none",
    serverDeploy: "none",
    ai: "none",
    effect: "none",
    stateManagement: "none",
    forms: "react-hook-form",
    testing: "vitest",
    email: "none",
    cssFramework: "tailwind",
    uiLibrary: "shadcn-ui",
    shadcnBase: "radix",
    shadcnStyle: "nova",
    shadcnIconLibrary: "lucide",
    shadcnColorTheme: "neutral",
    shadcnBaseColor: "neutral",
    shadcnFont: "inter",
    shadcnRadius: "default",
    validation: "zod",
    realtime: "none",
    jobQueue: "none",
    animation: "none",
    fileUpload: "none",
    logging: "none",
    observability: "none",
    featureFlags: "none",
    analytics: "none",
    cms: "none",
    caching: "none",
    i18n: "none",
    search: "none",
    fileStorage: "none",
    rustWebFramework: "none",
    rustFrontend: "none",
    rustOrm: "none",
    rustApi: "none",
    rustCli: "none",
    rustLogging: "tracing",
    rustErrorHandling: "anyhow-thiserror",
    rustCaching: "none",
    rustAuth: "none",
    rustLibraries: [],
    pythonWebFramework: "none",
    pythonOrm: "none",
    pythonValidation: "none",
    pythonAi: [],
    pythonAuth: "none",
    pythonApi: "none",
    pythonTaskQueue: "none",
    pythonGraphql: "none",
    pythonQuality: "none",
    goWebFramework: "none",
    goOrm: "none",
    goApi: "none",
    goCli: "none",
    goLogging: "none",
    goAuth: "none",
    javaWebFramework: "spring-boot",
    javaBuildTool: "maven",
    javaOrm: "none",
    javaAuth: "none",
    javaLibraries: [],
    javaTestingLibraries: ["junit5"],
    aiDocs: ["claude-md"],
    ...overrides,
  };
}

describe("generateReproducibleCommand", () => {
  it("generates TypeScript commands with feature flag selections", () => {
    const command = generateReproducibleCommand(
      makeConfig({
        featureFlags: "flagsmith",
      }),
    );

    expect(command).toContain("--feature-flags flagsmith");
  });

  it("preserves Astro integration in TypeScript commands", () => {
    const command = generateReproducibleCommand(
      makeConfig({
        frontend: ["astro"],
        astroIntegration: "react",
      }),
    );

    expect(command).toContain("--frontend astro");
    expect(command).toContain("--astro-integration react");
  });

  it("generates a Python command with explicit none selections", () => {
    const config = makeConfig({
      ecosystem: "python",
      frontend: [],
      addons: [],
      auth: "none",
      packageManager: "bun",
      install: false,
      git: false,
      database: "none",
      orm: "none",
      backend: "none",
      runtime: "none",
      api: "none",
      payments: "none",
      email: "none",
      fileUpload: "none",
      effect: "none",
      stateManagement: "none",
      forms: "none",
      testing: "none",
      validation: "none",
      cssFramework: "none",
      uiLibrary: "none",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      i18n: "none",
      search: "none",
      fileStorage: "none",
      pythonWebFramework: "django",
      pythonOrm: "sqlalchemy",
      pythonValidation: "pydantic",
      pythonAi: [],
      pythonAuth: "none",
      pythonApi: "none",
      pythonTaskQueue: "celery",
      pythonGraphql: "none",
      pythonQuality: "ruff",
      aiDocs: ["claude-md"],
    });

    expect(generateReproducibleCommand(config)).toBe(
      "bun create better-fullstack@latest my-app " +
        "--ecosystem python " +
        "--python-web-framework django " +
        "--python-orm sqlalchemy " +
        "--python-validation pydantic " +
        "--python-ai none " +
        "--python-auth none " +
        "--python-api none " +
        "--python-task-queue celery " +
        "--python-graphql none " +
        "--python-quality ruff " +
        "--email none " +
        "--observability none " +
        "--caching none " +
        "--search none " +
        "--addons none " +
        "--examples none " +
        "--db-setup none " +
        "--web-deploy none " +
        "--server-deploy none " +
        "--ai-docs claude-md " +
        "--no-git " +
        "--package-manager bun " +
        "--no-install",
    );
  });

  it("generates a populated Python command without TypeScript flags", () => {
    const config = makeConfig({
      ecosystem: "python",
      frontend: [],
      addons: ["skills"],
      auth: "none",
      packageManager: "npm",
      install: false,
      git: false,
      database: "none",
      orm: "none",
      backend: "none",
      runtime: "none",
      api: "none",
      payments: "none",
      email: "none",
      fileUpload: "none",
      effect: "none",
      stateManagement: "none",
      forms: "none",
      testing: "none",
      validation: "none",
      cssFramework: "none",
      uiLibrary: "none",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      i18n: "none",
      search: "none",
      fileStorage: "none",
      pythonWebFramework: "fastapi",
      pythonOrm: "sqlmodel",
      pythonValidation: "pydantic",
      pythonAi: ["langchain", "openai-sdk"],
      pythonAuth: "none",
      pythonApi: "none",
      pythonTaskQueue: "celery",
      pythonGraphql: "none",
      pythonQuality: "ruff",
      aiDocs: ["claude-md", "agents-md"],
    });

    const command = generateReproducibleCommand(config);

    expect(command).toBe(
      "npx create-better-fullstack@latest my-app " +
        "--ecosystem python " +
        "--python-web-framework fastapi " +
        "--python-orm sqlmodel " +
        "--python-validation pydantic " +
        "--python-ai langchain openai-sdk " +
        "--python-auth none " +
        "--python-api none " +
        "--python-task-queue celery " +
        "--python-graphql none " +
        "--python-quality ruff " +
        "--email none " +
        "--observability none " +
        "--caching none " +
        "--search none " +
        "--addons skills " +
        "--examples none " +
        "--db-setup none " +
        "--web-deploy none " +
        "--server-deploy none " +
        "--ai-docs claude-md agents-md " +
        "--no-git " +
        "--package-manager npm " +
        "--no-install",
    );
    expect(command).not.toContain("--frontend");
  });

  it("generates a Rust command with its own ecosystem flags", () => {
    const config = makeConfig({
      ecosystem: "rust",
      frontend: [],
      addons: [],
      auth: "none",
      packageManager: "pnpm",
      rustWebFramework: "axum",
      rustFrontend: "leptos",
      rustOrm: "sqlx",
      rustApi: "tonic",
      rustCli: "clap",
      rustLogging: "tracing",
      rustErrorHandling: "anyhow-thiserror",
      rustCaching: "none",
      rustLibraries: ["serde", "validator"],
      aiDocs: [],
    });

    expect(generateReproducibleCommand(config)).toBe(
      "pnpm create better-fullstack@latest my-app " +
        "--ecosystem rust " +
        "--rust-web-framework axum " +
        "--rust-frontend leptos " +
        "--rust-orm sqlx " +
        "--rust-api tonic " +
        "--rust-cli clap " +
        "--rust-libraries serde validator " +
        "--rust-logging tracing " +
        "--rust-error-handling anyhow-thiserror " +
        "--rust-caching none " +
        "--rust-auth none " +
        "--email none " +
        "--observability none " +
        "--caching none " +
        "--search none " +
        "--addons none " +
        "--examples none " +
        "--db-setup none " +
        "--web-deploy none " +
        "--server-deploy none " +
        "--ai-docs none " +
        "--git " +
        "--package-manager pnpm " +
        "--install",
    );
  });

  it("generates a Go command with the Go auth/runtime selections", () => {
    const config = makeConfig({
      ecosystem: "go",
      frontend: [],
      addons: [],
      auth: "go-better-auth",
      packageManager: "bun",
      install: false,
      git: false,
      goWebFramework: "gin",
      goOrm: "gorm",
      goApi: "grpc-go",
      goCli: "cobra",
      goLogging: "zap",
      goAuth: "none",
      aiDocs: ["agents-md"],
    });

    expect(generateReproducibleCommand(config)).toBe(
      "bun create better-fullstack@latest my-app " +
        "--ecosystem go " +
        "--go-web-framework gin " +
        "--go-orm gorm " +
        "--go-api grpc-go " +
        "--go-cli cobra " +
        "--go-logging zap " +
        "--go-auth none " +
        "--auth go-better-auth " +
        "--email none " +
        "--observability none " +
        "--caching none " +
        "--search none " +
        "--addons none " +
        "--examples none " +
        "--db-setup none " +
        "--web-deploy none " +
        "--server-deploy none " +
        "--ai-docs agents-md " +
        "--no-git " +
        "--package-manager bun " +
        "--no-install",
    );
  });

  it("includes the version channel flag when using latest or beta", () => {
    const latestCommand = generateReproducibleCommand(
      makeConfig({
        versionChannel: "latest",
      }),
    );

    const betaCommand = generateReproducibleCommand(
      makeConfig({
        versionChannel: "beta",
      }),
    );

    expect(latestCommand).toContain("--version-channel latest");
    expect(betaCommand).toContain("--version-channel beta");
  });

  it("generates a Java command without shared auth flags", () => {
    const config = makeConfig({
      ecosystem: "java",
      frontend: [],
      addons: [],
      auth: "better-auth",
      packageManager: "bun",
      install: false,
      git: false,
      database: "none",
      orm: "none",
      backend: "none",
      runtime: "none",
      api: "none",
      payments: "none",
      email: "none",
      fileUpload: "none",
      effect: "none",
      stateManagement: "none",
      forms: "none",
      testing: "none",
      validation: "none",
      cssFramework: "none",
      uiLibrary: "none",
      realtime: "none",
      jobQueue: "none",
      animation: "none",
      logging: "none",
      observability: "none",
      cms: "none",
      caching: "none",
      i18n: "none",
      search: "none",
      fileStorage: "none",
      javaWebFramework: "spring-boot",
      javaBuildTool: "gradle",
      javaOrm: "spring-data-jpa",
      javaAuth: "spring-security",
      javaLibraries: ["spring-actuator", "flyway"],
      javaTestingLibraries: ["junit5", "mockito"],
      aiDocs: ["claude-md", "agents-md"],
    });

    const command = generateReproducibleCommand(config);

    expect(command).toBe(
      "bun create better-fullstack@latest my-app " +
        "--ecosystem java " +
        "--java-web-framework spring-boot " +
        "--java-build-tool gradle " +
        "--java-orm spring-data-jpa " +
        "--java-auth spring-security " +
        "--java-libraries spring-actuator flyway " +
        "--java-testing-libraries junit5 mockito " +
        "--email none " +
        "--observability none " +
        "--caching none " +
        "--search none " +
        "--addons none " +
        "--examples none " +
        "--db-setup none " +
        "--web-deploy none " +
        "--server-deploy none " +
        "--ai-docs claude-md agents-md " +
        "--no-git " +
        "--package-manager bun " +
        "--no-install",
    );
    expect(command).not.toContain("--auth ");
  });

  it("generates canonical --part flags when stackParts are present", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:go:gin",
      "backend.orm:go:gorm",
    ]);
    const command = generateReproducibleCommand(
      makeConfig({
        stackParts,
        frontend: ["next"],
        backend: "none",
        goWebFramework: "gin",
        goOrm: "gorm",
      }),
    );

    expect(command).toContain("--part frontend:typescript:next");
    expect(command).toContain("--part backend:go:gin");
    expect(command).toContain("--part backend.orm:go:gorm");
    expect(command).not.toContain("--backend");
  });

  it("reproduces graph-owned TypeScript backend singles as --part flags", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:typescript:hono",
      "backend.logging:typescript:pino",
      "backend.payments:typescript:stripe",
      "backend.ai:typescript:langgraph",
      "backend.realtime:typescript:socket-io",
      "backend.fileStorage:typescript:s3",
    ]);
    const command = generateReproducibleCommand(
      makeConfig({
        stackParts,
        frontend: ["next"],
        logging: "pino",
        payments: "stripe",
        ai: "langgraph",
        realtime: "socket-io",
        fileStorage: "s3",
      }),
    );

    expect(command).toContain("--part backend.logging:typescript:pino");
    expect(command).toContain("--part backend.payments:typescript:stripe");
    expect(command).toContain("--part backend.ai:typescript:langgraph");
    expect(command).toContain("--part backend.realtime:typescript:socket-io");
    expect(command).toContain("--part backend.fileStorage:typescript:s3");
    expect(command).not.toContain("--logging pino");
    expect(command).not.toContain("--payments stripe");
    expect(command).not.toContain("--ai langgraph");
    expect(command).not.toContain("--realtime socket-io");
    expect(command).not.toContain("--file-storage s3");
  });

  it("reproduces graph-owned TypeScript frontend singles as --part flags", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.css:typescript:scss",
      "frontend.ui:typescript:radix-ui",
      "frontend.forms:typescript:formik",
      "frontend.stateManagement:typescript:zustand",
      "frontend.animation:typescript:framer-motion",
      "frontend.fileUpload:typescript:uploadthing",
      "frontend.i18n:typescript:i18next",
      "frontend.analytics:typescript:plausible",
    ]);
    const command = generateReproducibleCommand(
      makeConfig({
        stackParts,
        frontend: ["next"],
        cssFramework: "scss",
        uiLibrary: "radix-ui",
        forms: "formik",
        stateManagement: "zustand",
        animation: "framer-motion",
        fileUpload: "uploadthing",
        i18n: "i18next",
        analytics: "plausible",
      }),
    );

    expect(command).toContain("--part frontend.css:typescript:scss");
    expect(command).toContain("--part frontend.ui:typescript:radix-ui");
    expect(command).toContain("--part frontend.forms:typescript:formik");
    expect(command).toContain("--part frontend.stateManagement:typescript:zustand");
    expect(command).toContain("--part frontend.animation:typescript:framer-motion");
    expect(command).toContain("--part frontend.fileUpload:typescript:uploadthing");
    expect(command).toContain("--part frontend.i18n:typescript:i18next");
    expect(command).toContain("--part frontend.analytics:typescript:plausible");
    expect(command).not.toContain("--css-framework scss");
    expect(command).not.toContain("--ui-library radix-ui");
    expect(command).not.toContain("--forms formik");
    expect(command).not.toContain("--state-management zustand");
    expect(command).not.toContain("--animation framer-motion");
    expect(command).not.toContain("--file-upload uploadthing");
    expect(command).not.toContain("--i18n i18next");
    expect(command).not.toContain("--analytics plausible");
  });

  it("reproduces graph-owned infrastructure selections as --part flags", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.deploy:typescript:vercel",
      "backend:typescript:hono",
      "backend.runtime:typescript:node",
      "backend.deploy:typescript:railway",
      "database:universal:postgres",
      "database.dbSetup:universal:neon",
    ]);
    const command = generateReproducibleCommand(
      makeConfig({
        stackParts,
        frontend: ["next"],
        backend: "hono",
        runtime: "node",
        database: "postgres",
        webDeploy: "vercel",
        serverDeploy: "railway",
        dbSetup: "neon",
      }),
    );

    expect(command).toContain("--part frontend.deploy:typescript:vercel");
    expect(command).toContain("--part backend.runtime:typescript:node");
    expect(command).toContain("--part backend.deploy:typescript:railway");
    expect(command).toContain("--part database.dbSetup:universal:neon");
    expect(command).not.toContain("--runtime node");
    expect(command).not.toContain("--web-deploy vercel");
    expect(command).not.toContain("--server-deploy railway");
    expect(command).not.toContain("--db-setup neon");
  });

  it("reproduces graph-owned addons and examples as --part flags", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.appPlatform:typescript:pwa",
      "frontend.dataFetching:typescript:swr",
      "frontend.testing:typescript:storybook",
      "backend:typescript:hono",
      "backend.runtime:typescript:node",
      "codeQuality:universal:biome",
      "documentation:universal:fumadocs",
      "workspaceTooling:universal:turborepo",
      "workspaceTooling:universal:mcp",
      "examples:universal:ai",
      "examples:universal:chat-sdk",
    ]);
    const command = generateReproducibleCommand(
      makeConfig({
        stackParts,
        frontend: ["next"],
        backend: "hono",
        runtime: "node",
        api: "none",
        addons: ["biome", "fumadocs", "pwa", "swr", "storybook", "turborepo", "mcp"],
        examples: ["ai", "chat-sdk"],
      }),
    );

    expect(command).toContain("--part codeQuality:universal:biome");
    expect(command).toContain("--part documentation:universal:fumadocs");
    expect(command).toContain("--part frontend.appPlatform:typescript:pwa");
    expect(command).toContain("--part frontend.dataFetching:typescript:swr");
    expect(command).toContain("--part frontend.testing:typescript:storybook");
    expect(command).toContain("--part workspaceTooling:universal:turborepo");
    expect(command).toContain("--part workspaceTooling:universal:mcp");
    expect(command).toContain("--part examples:universal:ai");
    expect(command).toContain("--part examples:universal:chat-sdk");
    expect(command).not.toContain("--addons biome");
    expect(command).not.toContain("--examples ai");
  });

  it("reproduces graph-owned mobile and ecosystem fields as --part flags", () => {
    const stackParts = parseStackPartSpecs([
      "mobile:react-native:native-bare",
      "mobile.navigation:react-native:react-navigation",
      "mobile.ui:react-native:gluestack-ui",
      "mobile.storage:react-native:mmkv",
      "mobile.testing:react-native:maestro",
      "backend:rust:axum",
      "backend.cli:rust:clap",
      "backend.libraries:rust:serde",
      "backend.libraries:rust:uuid",
      "backend.logging:rust:env-logger",
      "backend.errorHandling:rust:eyre",
      "backend.caching:rust:moka",
    ]);
    const command = generateReproducibleCommand(
      makeConfig({
        stackParts,
        ecosystem: "rust",
        frontend: ["native-bare"],
        mobileNavigation: "react-navigation",
        mobileUI: "gluestack-ui",
        mobileStorage: "mmkv",
        mobileTesting: "maestro",
        rustWebFramework: "axum",
        rustCli: "clap",
        rustLibraries: ["serde", "uuid"],
        rustLogging: "env-logger",
        rustErrorHandling: "eyre",
        rustCaching: "moka",
      }),
    );

    expect(command).toContain("--part mobile.navigation:react-native:react-navigation");
    expect(command).toContain("--part mobile.ui:react-native:gluestack-ui");
    expect(command).toContain("--part mobile.storage:react-native:mmkv");
    expect(command).toContain("--part mobile.testing:react-native:maestro");
    expect(command).toContain("--part backend.cli:rust:clap");
    expect(command).toContain("--part backend.libraries:rust:serde");
    expect(command).toContain("--part backend.libraries:rust:uuid");
    expect(command).toContain("--part backend.logging:rust:env-logger");
    expect(command).toContain("--part backend.errorHandling:rust:eyre");
    expect(command).toContain("--part backend.caching:rust:moka");
    expect(command).not.toContain("--mobile-navigation react-navigation");
    expect(command).not.toContain("--mobile-ui gluestack-ui");
    expect(command).not.toContain("--mobile-storage mmkv");
    expect(command).not.toContain("--mobile-testing maestro");
    expect(command).not.toContain("--rust-cli clap");
    expect(command).not.toContain("--rust-libraries");
    expect(command).not.toContain("--rust-logging env-logger");
    expect(command).not.toContain("--rust-error-handling eyre");
    expect(command).not.toContain("--rust-caching moka");
  });

  it("preserves Astro integration when stackParts are present", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:astro",
      "backend:rust:axum",
    ]);
    const command = generateReproducibleCommand(
      makeConfig({
        stackParts,
        frontend: ["astro"],
        astroIntegration: "react",
        backend: "none",
        runtime: "none",
        api: "none",
      }),
    );

    expect(command).toContain("--part frontend:typescript:astro");
    expect(command).toContain("--astro-integration react");
  });

  it("preserves graph section library flags when stackParts are present", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "mobile:react-native:native-bare",
    ]);
    const command = generateReproducibleCommand(
      makeConfig({
        stackParts,
        frontend: ["next", "native-bare"],
        cssFramework: "scss",
        mobileNavigation: "react-navigation",
        mobileTesting: "maestro",
      }),
    );

    expect(command).toContain("--part frontend:typescript:next");
    expect(command).toContain("--part mobile:react-native:native-bare");
    expect(command).toContain("--css-framework scss");
    expect(command).toContain("--mobile-navigation react-navigation");
    expect(command).toContain("--mobile-testing maestro");
    expect(command).not.toContain("--backend");
  });

  it("preserves non-graph selections when stackParts are present", () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "backend:typescript:hono",
      "backend.orm:typescript:drizzle",
      "database:universal:postgres",
    ]);
    const command = generateReproducibleCommand(
      makeConfig({
        stackParts,
        frontend: ["next"],
        backend: "hono",
        database: "postgres",
        payments: "stripe",
        email: "resend",
        fileUpload: "uploadthing",
        addons: ["turborepo", "pwa"],
        examples: ["ai"],
        dbSetup: "docker",
        webDeploy: "vercel",
        serverDeploy: "railway",
        shadcnStyle: "luma",
        shadcnFont: "geist",
      }),
    );

    expect(command).toContain("--part frontend:typescript:next");
    expect(command).toContain("--payments stripe");
    expect(command).toContain("--email resend");
    expect(command).toContain("--file-upload uploadthing");
    expect(command).toContain("--addons turborepo pwa");
    expect(command).toContain("--examples ai");
    expect(command).toContain("--db-setup docker");
    expect(command).toContain("--web-deploy vercel");
    expect(command).toContain("--server-deploy railway");
    expect(command).toContain("--shadcn-style luma");
    expect(command).toContain("--shadcn-font geist");
    expect(command).not.toContain("--backend");
  });
});
