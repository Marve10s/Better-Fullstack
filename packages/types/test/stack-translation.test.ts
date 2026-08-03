import { describe, expect, it } from "bun:test";

import type { StackSelectionInput } from "../src/stack-translation";

import {
  DEFAULT_STACK_SELECTION,
  STACK_SELECTION_KEYS,
  STACK_SELECTION_URL_KEYS,
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  isCliDefaultStackSelection,
  isStackSelectionDefault,
  cliInputToProjectConfigPartial,
  normalizeStackSelection,
  parseStackSelectionFromUrlRecord,
  stackSelectionToProjectConfig,
} from "../src/stack-translation";

const DEFAULT_SELECTION = DEFAULT_STACK_SELECTION;

function toProjectConfig(selection: StackSelectionInput, install?: boolean) {
  return stackSelectionToProjectConfig(selection, {
    projectDir: "/virtual",
    relativePath: "./virtual",
    install,
  });
}

describe("stack selection translation", () => {
  it("exports the shared default stack contract", () => {
    expect(DEFAULT_STACK_SELECTION.stackMode).toBe("solo");
    expect(DEFAULT_STACK_SELECTION.stackPartSpecs).toEqual([]);
    expect(DEFAULT_STACK_SELECTION.ecosystem).toBe("typescript");
    expect(DEFAULT_STACK_SELECTION.webFrontend).toEqual(["tanstack-router"]);
    expect(DEFAULT_STACK_SELECTION.appPlatforms).toEqual(["turborepo"]);
    expect(DEFAULT_STACK_SELECTION.rustWebFramework).toBe("axum");
    expect(DEFAULT_STACK_SELECTION.pythonWebFramework).toBe("fastapi");
    expect(DEFAULT_STACK_SELECTION.goWebFramework).toBe("gin");
    expect(DEFAULT_STACK_SELECTION.javaTestingLibraries).toEqual(["junit5"]);
  });

  it("checks stack defaults with array-insensitive comparison and Convex adjustments", () => {
    // Default aiDocs is ["claude-md", "agents-md"]; reversed order must still match (array-insensitive).
    expect(isStackSelectionDefault(DEFAULT_SELECTION, "aiDocs", ["agents-md", "claude-md"])).toBe(
      true,
    );
    expect(
      isStackSelectionDefault({ ...DEFAULT_SELECTION, backend: "convex" }, "runtime", "none"),
    ).toBe(true);
  });

  it("keeps URL keys, parsing, serialization, and normalization in the shared contract", () => {
    expect(Object.keys(DEFAULT_STACK_SELECTION)).toEqual(STACK_SELECTION_KEYS);
    expect(Object.keys(STACK_SELECTION_URL_KEYS)).toEqual(STACK_SELECTION_KEYS);

    const input = normalizeStackSelection({
      ...DEFAULT_SELECTION,
      ecosystem: "python",
      stackMode: "multi",
      stackPartSpecs: ["frontend:typescript:next", "backend:go:gin", "backend.orm:go:gorm"],
      projectName: "parity-app",
      webFrontend: ["astro"],
      astroIntegration: "react",
      backend: "self-next",
      codeQuality: ["none", "biome"],
      documentation: ["fumadocs"],
      appPlatforms: ["pwa", "wxt"],
      examples: ["ai", "chat-sdk"],
      aiDocs: ["agents-md", "claude-md"],
      git: "false",
      install: "true",
      pythonAi: ["none", "langchain"],
      yolo: "true",
    });

    const params = createStackSelectionSearchParams(input, { includeDefaults: true });
    const parsed = parseStackSelectionFromUrlRecord(Object.fromEntries(params.entries()));

    expect(input.codeQuality).toEqual(["biome"]);
    expect(input.pythonAi).toEqual(["langchain"]);
    expect(parsed).toEqual(input);
  });

  it("detects the default TypeScript stack and emits --yes", () => {
    expect(isCliDefaultStackSelection(DEFAULT_SELECTION)).toBe(true);
    expect(generateStackSelectionCommand(DEFAULT_SELECTION)).toBe(
      "bun create better-fullstack@latest my-app --yes",
    );
  });

  it("serializes the shared database for server ecosystem commands", () => {
    for (const ecosystem of ["rust", "python", "go", "java", "dotnet", "elixir"] as const) {
      expect(
        generateStackSelectionCommand({
          ...DEFAULT_SELECTION,
          ecosystem,
          database: "postgres",
        }),
      ).toContain("--database postgres");
    }
  });

  it("emits canonical graph --part flags for multi-ecosystem selections", () => {
    const command = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "graph-app",
      stackPartSpecs: [
        "frontend:typescript:next",
        "backend:go:gin",
        "backend.orm:go:gorm",
        "database:universal:postgres",
        "mobile:react-native:native-bare",
      ],
      install: "false",
    });

    expect(command).toContain("--part frontend:typescript:next");
    expect(command).toContain("--part backend:go:gin");
    expect(command).toContain("--part backend.orm:go:gorm");
    expect(command).toContain("--part database:universal:postgres");
    expect(command).toContain("--part mobile:react-native:native-bare");
    expect(command).toContain("--no-install");
    expect(command).not.toContain("--ecosystem typescript");
    expect(command).not.toContain("--backend");
  });

  it("promotes explicit CLI graph feature flags into scoped stack parts", () => {
    const config = cliInputToProjectConfigPartial(
      {
        part: [
          "frontend:typescript:react-vite",
          "mobile:react-native:native-uniwind",
          "backend:typescript:hono",
          "backend:java:spring-boot",
          "backend:elixir:phoenix",
        ],
        database: "postgres",
        logging: "pino",
        email: "resend",
        ai: "langgraph",
        realtime: "socket-io",
        cssFramework: "scss",
        uiLibrary: "radix-ui",
        forms: "formik",
        stateManagement: "zustand",
        animation: "framer-motion",
        fileUpload: "uploadthing",
        i18n: "i18next",
        analytics: "plausible",
        javaOrm: "spring-data-jpa",
        javaAuth: "spring-security",
        javaBuildTool: "gradle",
        javaLibraries: ["spring-actuator", "lombok"],
        javaTestingLibraries: ["junit5", "mockito"],
        elixirRealtime: "presence",
        elixirJobs: "oban",
        elixirHttp: "finch",
        elixirJson: "none",
        elixirQuality: "credo",
        runtime: "node",
        dbSetup: "neon",
        webDeploy: "vercel",
        serverDeploy: "railway",
        mobileNavigation: "react-navigation",
        mobileUI: "uniwind",
        mobileStorage: "mmkv",
        mobileTesting: "maestro",
        addons: ["biome", "fumadocs", "pwa", "tanstack-table", "storybook", "turborepo"],
        examples: ["ai"],
      },
      "java-graph",
    );

    const specs = config.stackParts?.map((part) => {
      const owner = config.stackParts?.find((candidate) => candidate.id === part.ownerPartId);
      return owner
        ? `${owner.role}.${part.role}:${part.ecosystem}:${part.toolId}`
        : `${part.role}:${part.ecosystem}:${part.toolId}`;
    });

    expect(config.database).toBe("postgres");
    expect(config.logging).toBe("pino");
    expect(config.email).toBe("resend");
    expect(config.ai).toBe("langgraph");
    expect(config.realtime).toBe("socket-io");
    expect(config.cssFramework).toBe("scss");
    expect(config.uiLibrary).toBe("radix-ui");
    expect(config.forms).toBe("formik");
    expect(config.stateManagement).toBe("zustand");
    expect(config.animation).toBe("framer-motion");
    expect(config.fileUpload).toBe("uploadthing");
    expect(config.i18n).toBe("i18next");
    expect(config.analytics).toBe("plausible");
    expect(config.javaOrm).toBe("spring-data-jpa");
    expect(config.javaAuth).toBe("spring-security");
    expect(config.javaBuildTool).toBe("gradle");
    expect(config.javaLibraries).toEqual(["spring-actuator", "lombok"]);
    expect(config.javaTestingLibraries).toEqual(["junit5", "mockito"]);
    expect(config.elixirRealtime).toBe("presence");
    expect(config.elixirJobs).toBe("oban");
    expect(config.elixirHttp).toBe("finch");
    expect(config.elixirJson).toBe("none");
    expect(config.elixirQuality).toBe("credo");
    expect(config.runtime).toBe("node");
    expect(config.dbSetup).toBe("neon");
    expect(config.webDeploy).toBe("vercel");
    expect(config.serverDeploy).toBe("railway");
    expect(config.mobileNavigation).toBe("react-navigation");
    expect(config.mobileUI).toBe("uniwind");
    expect(config.mobileStorage).toBe("mmkv");
    expect(config.mobileTesting).toBe("maestro");
    expect(config.addons).toEqual([
      "biome",
      "fumadocs",
      "turborepo",
      "pwa",
      "tanstack-table",
      "storybook",
    ]);
    expect(config.examples).toEqual(["ai"]);
    expect(specs).toContain("frontend:typescript:react-vite");
    expect(specs).toContain("mobile:react-native:native-uniwind");
    expect(specs).toContain("backend:typescript:hono");
    expect(specs).toContain("backend:java:spring-boot");
    expect(specs).toContain("backend:elixir:phoenix");
    expect(specs).toContain("database:universal:postgres");
    expect(specs).toContain("backend.logging:typescript:pino");
    expect(specs).toContain("backend.email:typescript:resend");
    expect(specs).toContain("backend.ai:typescript:langgraph");
    expect(specs).toContain("backend.realtime:typescript:socket-io");
    expect(specs).toContain("frontend.css:typescript:scss");
    expect(specs).toContain("frontend.ui:typescript:radix-ui");
    expect(specs).toContain("frontend.forms:typescript:formik");
    expect(specs).toContain("frontend.stateManagement:typescript:zustand");
    expect(specs).toContain("frontend.animation:typescript:framer-motion");
    expect(specs).toContain("frontend.fileUpload:typescript:uploadthing");
    expect(specs).toContain("frontend.i18n:typescript:i18next");
    expect(specs).toContain("frontend.analytics:typescript:plausible");
    expect(specs).toContain("backend.orm:java:spring-data-jpa");
    expect(specs).toContain("backend.auth:java:spring-security");
    expect(specs).toContain("backend.buildTool:java:gradle");
    expect(specs).toContain("backend.libraries:java:spring-actuator");
    expect(specs).toContain("backend.libraries:java:lombok");
    expect(specs).toContain("backend.testing:java:junit5");
    expect(specs).toContain("backend.testing:java:mockito");
    expect(specs).toContain("backend.realtime:elixir:presence");
    expect(specs).toContain("backend.jobQueue:elixir:oban");
    expect(specs).toContain("backend.httpClient:elixir:finch");
    expect(specs).not.toContain("backend.json:elixir:none");
    expect(specs).not.toContain("backend.httpClient:elixir:none");
    expect(specs).toContain("backend.codeQuality:elixir:credo");
    expect(specs).toContain("backend.runtime:typescript:node");
    expect(specs).toContain("backend.deploy:typescript:railway");
    expect(specs).toContain("frontend.deploy:typescript:vercel");
    expect(specs).toContain("database.dbSetup:universal:neon");
    expect(specs).toContain("mobile.navigation:react-native:react-navigation");
    expect(specs).toContain("mobile.ui:react-native:uniwind");
    expect(specs).toContain("mobile.storage:react-native:mmkv");
    expect(specs).toContain("mobile.testing:react-native:maestro");
    expect(specs).toContain("codeQuality:universal:biome");
    expect(specs).toContain("documentation:universal:fumadocs");
    expect(specs).toContain("frontend.appPlatform:typescript:pwa");
    expect(specs).toContain("frontend.dataFetching:typescript:tanstack-table");
    expect(specs).toContain("frontend.testing:typescript:storybook");
    expect(specs).toContain("workspaceTooling:universal:turborepo");
    expect(specs).toContain("examples:universal:ai");
  });

  it("emits changed ecosystem-specific graph flags for multi-ecosystem selections", () => {
    const command = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "advanced-graph-app",
      stackPartSpecs: [
        "frontend:typescript:next",
        "backend:elixir:phoenix",
        "backend.orm:elixir:ecto-sql",
      ],
      elixirRealtime: "presence",
      elixirJson: "none",
      elixirDeploy: "docker",
      appPlatforms: ["turborepo"],
      examples: ["ai"],
    });

    expect(command).toContain("--part frontend:typescript:next");
    expect(command).toContain("--part backend:elixir:phoenix");
    expect(command).toContain("--part backend.realtime:elixir:presence");
    expect(command).not.toContain("--elixir-realtime presence");
    expect(command).toContain("--elixir-json none");
    expect(command).not.toContain("--part backend.json:elixir:none");
    expect(command).toContain("--part backend.deploy:elixir:docker");
    expect(command).not.toContain("--elixir-deploy docker");
    expect(command).toContain("--part workspaceTooling:universal:turborepo");
    expect(command).toContain("--part examples:universal:ai");
    expect(command).not.toContain("--addons turborepo");
    expect(command).not.toContain("--examples ai");
  });

  it("emits changed graph addons and examples as graph parts", () => {
    const command = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "addons-graph-app",
      stackPartSpecs: ["frontend:typescript:next", "backend:typescript:hono"],
      runtime: "node",
      api: "none",
      codeQuality: ["biome"],
      documentation: ["fumadocs"],
      appPlatforms: ["turborepo", "pwa", "swr", "storybook", "mcp"],
      examples: ["ai", "chat-sdk"],
    });

    expect(command).toContain("--part codeQuality:universal:biome");
    expect(command).toContain("--part documentation:universal:fumadocs");
    expect(command).toContain("--part workspaceTooling:universal:turborepo");
    expect(command).toContain("--part workspaceTooling:universal:mcp");
    expect(command).toContain("--part frontend.appPlatform:typescript:pwa");
    expect(command).toContain("--part frontend.dataFetching:typescript:swr");
    expect(command).toContain("--part frontend.testing:typescript:storybook");
    expect(command).toContain("--part examples:universal:ai");
    expect(command).toContain("--part examples:universal:chat-sdk");
    expect(command).not.toContain("--addons");
    expect(command).not.toContain("--examples");
  });

  it("emits changed mobile graph fields as scoped graph parts", () => {
    const command = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "mobile-graph-app",
      stackPartSpecs: ["mobile:react-native:native-bare"],
      mobileNavigation: "react-navigation",
      mobileUI: "gluestack-ui",
      mobileStorage: "mmkv",
      mobileTesting: "maestro",
      mobilePush: "expo-notifications",
      mobileOTA: "expo-updates",
      mobileDeepLinking: "expo-linking",
    });

    expect(command).toContain("--part mobile:react-native:native-bare");
    expect(command).toContain("--part mobile.navigation:react-native:react-navigation");
    expect(command).toContain("--part mobile.ui:react-native:gluestack-ui");
    expect(command).toContain("--part mobile.storage:react-native:mmkv");
    expect(command).toContain("--part mobile.testing:react-native:maestro");
    expect(command).toContain("--part mobile.push:react-native:expo-notifications");
    expect(command).toContain("--part mobile.ota:react-native:expo-updates");
    expect(command).toContain("--part mobile.deepLinking:react-native:expo-linking");
    expect(command).not.toContain("--mobile-navigation react-navigation");
    expect(command).not.toContain("--mobile-ui gluestack-ui");
    expect(command).not.toContain("--mobile-storage mmkv");
    expect(command).not.toContain("--mobile-testing maestro");
    expect(command).not.toContain("--mobile-push expo-notifications");
    expect(command).not.toContain("--mobile-ota expo-updates");
    expect(command).not.toContain("--mobile-deep-linking expo-linking");
  });

  it("emits remaining ecosystem graph fields as scoped graph parts", () => {
    const rustCommand = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "rust-graph-app",
      stackPartSpecs: ["backend:rust:axum"],
      rustCli: "clap",
      rustLibraries: ["serde", "uuid"],
      rustLogging: "env-logger",
      rustErrorHandling: "eyre",
      rustCaching: "moka",
    });
    expect(rustCommand).toContain("--part backend.cli:rust:clap");
    expect(rustCommand).toContain("--part backend.libraries:rust:serde");
    expect(rustCommand).toContain("--part backend.libraries:rust:uuid");
    expect(rustCommand).toContain("--part backend.logging:rust:env-logger");
    expect(rustCommand).toContain("--part backend.errorHandling:rust:eyre");
    expect(rustCommand).toContain("--part backend.caching:rust:moka");
    expect(rustCommand).not.toContain("--rust-cli clap");
    expect(rustCommand).not.toContain("--rust-libraries");

    const pythonCommand = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "python-graph-app",
      stackPartSpecs: ["backend:python:django"],
      pythonAi: ["langchain", "openai-sdk"],
      pythonGraphql: "strawberry",
      pythonQuality: "ruff",
      pythonCloudSdk: "boto3",
      pythonHttpClient: "requests",
      pythonData: ["numpy", "pandas"],
      pythonMedia: "pillow",
      pythonServer: "gunicorn",
      pythonPackageManager: "uv",
      pythonMessageQueue: "confluent-kafka",
    });
    expect(pythonCommand).toContain("--part backend.ai:python:langchain");
    expect(pythonCommand).toContain("--part backend.ai:python:openai-sdk");
    expect(pythonCommand).toContain("--part backend.graphql:python:strawberry");
    expect(pythonCommand).toContain("--part backend.codeQuality:python:ruff");
    expect(pythonCommand).toContain("--part backend.cloudSdk:python:boto3");
    expect(pythonCommand).toContain("--part backend.httpClient:python:requests");
    expect(pythonCommand).toContain("--part backend.data:python:numpy");
    expect(pythonCommand).toContain("--part backend.data:python:pandas");
    expect(pythonCommand).toContain("--part backend.media:python:pillow");
    expect(pythonCommand).toContain("--part backend.server:python:gunicorn");
    expect(pythonCommand).toContain("--part backend.packageManager:python:uv");
    expect(pythonCommand).toContain("--part backend.messageQueue:python:confluent-kafka");
    expect(pythonCommand).not.toContain("--python-ai");
    expect(pythonCommand).not.toContain("--python-graphql strawberry");

    const goCommand = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "go-graph-app",
      stackPartSpecs: ["backend:go:gin"],
      search: "bleve",
    });
    expect(goCommand).toContain("--part backend.search:go:bleve");

    const javaCommand = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "java-graph-app",
      stackPartSpecs: ["backend:java:spring-boot"],
      javaLanguage: "kotlin",
      javaBuildTool: "gradle",
      javaLibraries: ["spring-actuator"],
      javaTestingLibraries: ["junit5", "mockito"],
    });
    expect(javaCommand).toContain("--part backend.language:java:kotlin");
    expect(javaCommand).toContain("--part backend.buildTool:java:gradle");
    expect(javaCommand).toContain("--part backend.libraries:java:spring-actuator");
    expect(javaCommand).toContain("--part backend.testing:java:junit5");
    expect(javaCommand).toContain("--part backend.testing:java:mockito");
    expect(javaCommand).not.toContain("--java-language kotlin");
    expect(javaCommand).not.toContain("--java-build-tool gradle");
    expect(javaCommand).not.toContain("--java-libraries");
    expect(javaCommand).not.toContain("--java-testing-libraries");
  });

  it("emits changed TypeScript backend singles as scoped graph parts", () => {
    const command = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "typed-backend-graph-app",
      stackPartSpecs: ["frontend:typescript:next", "backend:typescript:hono"],
      logging: "pino",
      payments: "stripe",
      aiSdk: "langgraph",
      realtime: "socket-io",
      jobQueue: "inngest",
      fileStorage: "s3",
    });

    expect(command).toContain("--part backend.logging:typescript:pino");
    expect(command).toContain("--part backend.payments:typescript:stripe");
    expect(command).toContain("--part backend.ai:typescript:langgraph");
    expect(command).toContain("--part backend.realtime:typescript:socket-io");
    expect(command).toContain("--part backend.jobQueue:typescript:inngest");
    expect(command).toContain("--part backend.fileStorage:typescript:s3");
    expect(command).not.toContain("--logging pino");
    expect(command).not.toContain("--payments stripe");
    expect(command).not.toContain("--ai langgraph");
    expect(command).not.toContain("--realtime socket-io");
    expect(command).not.toContain("--job-queue inngest");
    expect(command).not.toContain("--file-storage s3");
  });

  it("emits changed TypeScript frontend singles as scoped graph parts", () => {
    const command = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "styled-graph-app",
      stackPartSpecs: ["frontend:typescript:next", "backend:go:gin"],
      cssFramework: "scss",
      uiLibrary: "radix-ui",
      forms: "formik",
      stateManagement: "zustand",
      animation: "framer-motion",
      fileUpload: "uploadthing",
      i18n: "i18next",
      analytics: "plausible",
    });

    expect(command).toContain("--part frontend:typescript:next");
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

  it("emits changed graph infrastructure as scoped graph parts", () => {
    const command = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "infra-graph-app",
      stackPartSpecs: [
        "frontend:typescript:next",
        "backend:typescript:hono",
        "database:universal:postgres",
      ],
      runtime: "node",
      webDeploy: "vercel",
      serverDeploy: "railway",
      dbSetup: "neon",
    });

    expect(command).toContain("--part frontend.deploy:typescript:vercel");
    expect(command).toContain("--part backend.runtime:typescript:node");
    expect(command).toContain("--part backend.deploy:typescript:railway");
    expect(command).toContain("--part database.dbSetup:universal:neon");
    expect(command).not.toContain("--runtime node");
    expect(command).not.toContain("--web-deploy vercel");
    expect(command).not.toContain("--server-deploy railway");
    expect(command).not.toContain("--db-setup neon");
  });

  it("preserves TypeScript frontend graph scalar settings", () => {
    const command = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      projectName: "styled-graph-app",
      stackPartSpecs: ["frontend:typescript:astro", "backend:go:gin"],
      astroIntegration: "react",
      shadcnStyle: "luma",
      shadcnFont: "geist",
    });

    expect(command).toContain("--part frontend:typescript:astro");
    expect(command).toContain("--astro-integration react");
    expect(command).toContain("--shadcn-style luma");
    expect(command).toContain("--shadcn-font geist");
  });

  it("keeps partial CLI preselection flags out of stackParts until config is complete", () => {
    expect(cliInputToProjectConfigPartial({ orm: "prisma" })).toEqual({
      orm: "prisma",
    });
    expect(
      cliInputToProjectConfigPartial({
        part: ["frontend:typescript:next", "backend:go:gin", "backend.orm:go:gorm"],
      }).stackParts?.map((part) => `${part.role}:${part.ecosystem}:${part.toolId}`),
    ).toEqual(["frontend:typescript:next", "backend:go:gin", "orm:go:gorm"]);
  });

  it("derives ProjectConfig stackParts from graph URL state", () => {
    const config = toProjectConfig({
      ...DEFAULT_SELECTION,
      stackMode: "multi",
      stackPartSpecs: [
        "frontend:typescript:next",
        "backend:go:gin",
        "backend.orm:go:gorm",
        "database:universal:postgres",
      ],
    });

    expect(
      config.stackParts?.map((part) => `${part.role}:${part.ecosystem}:${part.toolId}`),
    ).toEqual(
      expect.arrayContaining([
        "frontend:typescript:next",
        "backend:go:gin",
        "orm:go:gorm",
        "database:universal:postgres",
      ]),
    );
    expect(config.frontend).toEqual(["next"]);
    expect(config.goWebFramework).toBe("gin");
    expect(config.goOrm).toBe("gorm");
    expect(config.database).toBe("postgres");
  });

  it("lets graph URL parts override stale flat URL fields and ignore disabled none specs", () => {
    const selection = parseStackSelectionFromUrlRecord({
      mode: "multi",
      part: [
        "frontend:typescript:next",
        "frontend.ui:typescript:none",
        "mobile:react-native:native-bare",
        "mobile.push:react-native:expo-notifications",
        "mobile.ota:react-native:expo-updates",
        "mobile.deepLinking:react-native:expo-linking",
        "backend:typescript:hono",
        "backend.database:typescript:sqlite",
        "backend.orm:typescript:drizzle",
      ].join(","),
      "fe-w": "svelte",
      "fe-n": "native-uniwind",
      be: "elysia",
      db: "postgres",
      orm: "prisma",
      ui: "shadcn-ui",
      mpu: "none",
      mota: "none",
      mdl: "none",
      rt: "node",
      name: "url-graph-app",
    });
    const config = toProjectConfig(selection);
    const specs = config.stackParts?.map((part) => {
      const owner = config.stackParts?.find((candidate) => candidate.id === part.ownerPartId);
      return owner
        ? `${owner.role}.${part.role}:${part.ecosystem}:${part.toolId}`
        : `${part.role}:${part.ecosystem}:${part.toolId}`;
    });
    const command = generateStackSelectionCommand(selection);

    expect(config.frontend).toEqual(["next", "native-bare"]);
    expect(config.backend).toBe("hono");
    expect(config.database).toBe("sqlite");
    expect(config.orm).toBe("drizzle");
    expect(config.uiLibrary).toBe("none");
    expect(config.mobilePush).toBe("expo-notifications");
    expect(config.mobileOTA).toBe("expo-updates");
    expect(config.mobileDeepLinking).toBe("expo-linking");
    expect(config.runtime).toBe("node");
    expect(specs).toContain("frontend.ui:typescript:none");
    expect(specs).toContain("mobile.push:react-native:expo-notifications");
    expect(specs).toContain("mobile.ota:react-native:expo-updates");
    expect(specs).toContain("mobile.deepLinking:react-native:expo-linking");
    expect(specs).not.toContain("frontend.ui:typescript:shadcn-ui");
    expect(specs).not.toContain("mobile:react-native:native-uniwind");
    expect(specs).not.toContain("mobile.push:react-native:none");
    expect(command).toContain("--part frontend:typescript:next");
    expect(command).toContain("--part mobile:react-native:native-bare");
    expect(command).toContain("--part mobile.push:react-native:expo-notifications");
    expect(command).toContain("--part mobile.ota:react-native:expo-updates");
    expect(command).toContain("--part mobile.deepLinking:react-native:expo-linking");
    expect(command).toContain("--part backend.database:typescript:sqlite");
    expect(command).toContain("--part backend.orm:typescript:drizzle");
    expect(command).not.toContain("--part frontend.ui:typescript:none");
    expect(command).not.toContain("--part frontend.ui:typescript:shadcn-ui");
    expect(command).not.toContain("--part mobile:react-native:native-uniwind");
    expect(command).not.toContain("--mobile-push");
    expect(command).not.toContain("--backend elysia");
  });

  it("maps builder aliases into ProjectConfig fields", () => {
    const config = toProjectConfig({
      ...DEFAULT_SELECTION,
      backend: "self-next",
      backendLibraries: "effect-full",
      aiSdk: "langgraph",
    });

    expect(config.backend).toBe("self");
    expect(config.effect).toBe("effect-full");
    expect(config.ai).toBe("langgraph");
  });

  it("merges web and native frontend selections", () => {
    const selection = {
      ...DEFAULT_SELECTION,
      webFrontend: ["next"],
      nativeFrontend: ["native-bare"],
    } satisfies StackSelectionInput;
    const config = toProjectConfig(selection);

    expect(config.frontend).toEqual(["next", "native-bare"]);
    expect(generateStackSelectionCommand(selection)).toContain("--frontend next native-bare");
  });

  it("merges addon groups", () => {
    const selection = {
      ...DEFAULT_SELECTION,
      codeQuality: ["biome"],
      documentation: ["fumadocs"],
      appPlatforms: ["pwa"],
    } satisfies StackSelectionInput;
    const config = toProjectConfig(selection);

    expect(config.addons).toEqual(["biome", "fumadocs", "pwa"]);
    expect(generateStackSelectionCommand(selection)).toContain("--addons biome fumadocs pwa");
  });

  it("keeps every selected TypeScript addon in generated commands", () => {
    const selection = {
      ...DEFAULT_SELECTION,
      codeQuality: ["eslint", "prettier"],
      documentation: ["graphql-codegen"],
      appPlatforms: ["axios", "firebase", "openapi-typescript", "apollo-client", "electron", "capacitor"],
    } satisfies StackSelectionInput;

    expect(generateStackSelectionCommand(selection)).toContain(
      "--addons eslint prettier graphql-codegen axios firebase openapi-typescript apollo-client electron capacitor",
    );
  });

  it("converts boolean-like strings and allows preview install overrides", () => {
    const selection = {
      ...DEFAULT_SELECTION,
      git: "false",
      install: "false",
    } satisfies StackSelectionInput;

    expect(toProjectConfig(selection).git).toBe(false);
    expect(toProjectConfig(selection).install).toBe(false);
    expect(toProjectConfig({ ...selection, install: "true" }, false).install).toBe(false);
  });

  it("filters none out of multi-select arrays", () => {
    const config = toProjectConfig({
      ...DEFAULT_SELECTION,
      rustLibraries: ["none", "validator"],
      pythonAi: ["none"],
      javaLibraries: ["none", "spring-actuator"],
      javaTestingLibraries: ["none", "junit5"],
    });

    expect(config.rustLibraries).toEqual(["validator"]);
    expect(config.pythonAi).toEqual([]);
    expect(config.javaLibraries).toEqual(["spring-actuator"]);
    expect(config.javaTestingLibraries).toEqual(["junit5"]);
    expect(
      generateStackSelectionCommand({ ...DEFAULT_SELECTION, ecosystem: "go", aiDocs: [] }),
    ).toContain("--ai-docs none");
  });

  it("applies compatibility adjustments before producing ProjectConfig", () => {
    const config = toProjectConfig({
      ...DEFAULT_SELECTION,
      backend: "convex",
    });

    expect(config.runtime).toBe("none");
    expect(config.database).toBe("none");
    expect(config.orm).toBe("none");
    expect(config.api).toBe("none");
    expect(config.dbSetup).toBe("none");
  });

  it("applies Effect backend defaults in ProjectConfig and generated commands", () => {
    const selection = {
      ...DEFAULT_SELECTION,
      backend: "effect",
      backendLibraries: "none",
      validation: "zod",
    } satisfies StackSelectionInput;
    const config = toProjectConfig(selection);
    const command = generateStackSelectionCommand(selection);

    expect(config.backend).toBe("effect");
    expect(config.effect).toBe("effect-full");
    expect(config.validation).toBe("effect-schema");
    expect(command).toContain("--backend effect");
    expect(command).toContain("--effect effect-full");
    expect(command).toContain("--validation effect-schema");
  });

  it("preserves command special cases", () => {
    const withoutAstro = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      webFrontend: ["next"],
      astroIntegration: "react",
    });
    const withAstro = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      webFrontend: ["astro"],
      astroIntegration: "react",
    });
    const withoutShadcn = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      uiLibrary: "daisyui",
      shadcnStyle: "vega",
    });
    const betaWithYolo = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      versionChannel: "beta",
      yolo: "true",
    });

    expect(withoutAstro).not.toContain("--astro-integration");
    expect(withAstro).toContain("--astro-integration react");
    expect(withoutShadcn).not.toContain("--shadcn-style");
    expect(betaWithYolo).toContain("--version-channel beta");
    expect(betaWithYolo).toContain("--yolo");
  });
});
