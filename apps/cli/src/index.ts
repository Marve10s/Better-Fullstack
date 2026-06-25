// Lean public entry: re-exports the CLI (run.ts) and the programmatic API.
// The bin entry (cli.ts) imports ./run.js directly so plain CLI startup
// never pays the cost of loading the embedded templates bundle below.
export { router, createBtsCli, create, sponsors, docs, builder, add, history, telemetry } from "./run";

import type { ProjectConfig } from "./types";

// Re-export virtual filesystem types for programmatic usage
export {
  VirtualFileSystem,
  type VirtualFileTree,
  type VirtualFile,
  type VirtualDirectory,
  type VirtualNode,
  type GeneratorOptions,
  type GeneratorResult,
  EMBEDDED_TEMPLATES,
  TEMPLATE_COUNT,
  generateVirtualProject,
} from "@better-fullstack/template-generator";

import type { VirtualFileTree } from "@better-fullstack/template-generator";

/**
 * Programmatic API to generate a project in-memory (virtual filesystem).
 * Returns a VirtualFileTree without writing to disk.
 * Useful for web previews and testing.
 *
 * @example
 * ```typescript
 * import { createVirtual, EMBEDDED_TEMPLATES } from "create-better-fullstack";
 *
 * const result = await createVirtual({
 *   frontend: ["tanstack-router"],
 *   backend: "hono",
 *   runtime: "bun",
 *   database: "sqlite",
 *   orm: "drizzle",
 * });
 *
 * if (result.success) {
 *   console.log(`Generated ${result.tree.fileCount} files`);
 * }
 * ```
 */
export async function createVirtual(
  options: Partial<Omit<ProjectConfig, "projectDir" | "relativePath">>,
): Promise<{ success: boolean; tree?: VirtualFileTree; error?: string }> {
  try {
    const ecosystem = options.ecosystem || "typescript";
    const isReactNative = ecosystem === "react-native";
    const frontend = options.frontend || (isReactNative ? ["native-bare"] : ["tanstack-router"]);
    const hasNativeFrontend = frontend.some(
      (item) => item === "native-bare" || item === "native-uniwind" || item === "native-unistyles",
    );
    const config: ProjectConfig = {
      ecosystem,
      projectName: options.projectName || "my-project",
      projectDir: "/virtual",
      relativePath: "./virtual",
      database: options.database || "none",
      orm: options.orm || "none",
      backend: options.backend || (isReactNative ? "none" : "hono"),
      runtime: options.runtime || (isReactNative ? "none" : "bun"),
      frontend,
      addons: options.addons || [],
      examples: options.examples || [],
      auth: options.auth || "none",
      payments: options.payments || "none",
      email: options.email || "none",
      fileUpload: options.fileUpload || "none",
      effect: options.effect || "none",
      git: options.git ?? false,
      packageManager: options.packageManager || "bun",
      versionChannel: options.versionChannel || "stable",
      install: false,
      dbSetup: options.dbSetup || "none",
      api: options.api || (isReactNative ? "none" : "trpc"),
      webDeploy: options.webDeploy || "none",
      serverDeploy: options.serverDeploy || "none",
      astroIntegration: options.astroIntegration || "none",
      cssFramework: options.cssFramework || (isReactNative ? "none" : "tailwind"),
      uiLibrary: options.uiLibrary || (isReactNative ? "none" : "shadcn-ui"),
      shadcnBase: options.shadcnBase ?? "radix",
      shadcnStyle: options.shadcnStyle ?? "nova",
      shadcnIconLibrary: options.shadcnIconLibrary ?? "lucide",
      shadcnColorTheme: options.shadcnColorTheme ?? "neutral",
      shadcnBaseColor: options.shadcnBaseColor ?? "neutral",
      shadcnFont: options.shadcnFont ?? "inter",
      shadcnRadius: options.shadcnRadius ?? "default",
      ai: options.ai || "none",
      stateManagement: options.stateManagement || "none",
      forms: options.forms || (isReactNative ? "none" : "react-hook-form"),
      testing: options.testing || (isReactNative ? "none" : "vitest"),
      validation: options.validation || "zod",
      realtime: options.realtime || "none",
      jobQueue: options.jobQueue || "none",
      animation: options.animation || "none",
      logging: options.logging || "none",
      observability: options.observability || "none",
      featureFlags: options.featureFlags || "none",
      analytics: options.analytics || "none",
      mobileNavigation: options.mobileNavigation || (hasNativeFrontend ? "expo-router" : "none"),
      mobileUI: options.mobileUI || "none",
      mobileStorage: options.mobileStorage || "none",
      mobileTesting: options.mobileTesting || "none",
      mobilePush: options.mobilePush || "none",
      mobileOTA: options.mobileOTA || "none",
      mobileDeepLinking: options.mobileDeepLinking || (hasNativeFrontend ? "expo-linking" : "none"),
      cms: options.cms || "none",
      caching: options.caching || "none",
      rateLimit: options.rateLimit || "none",
      i18n: options.i18n || "none",
      search: options.search || "none",
      vectorDb: options.vectorDb || "none",
      fileStorage: options.fileStorage || "none",
      // Rust ecosystem options
      rustWebFramework: options.rustWebFramework || "none",
      rustFrontend: options.rustFrontend || "none",
      rustOrm: options.rustOrm || "none",
      rustApi: options.rustApi || "none",
      rustCli: options.rustCli || "none",
      rustLibraries: options.rustLibraries || [],
      rustLogging: options.rustLogging || (options.ecosystem === "rust" ? "tracing" : "none"),
      rustErrorHandling:
        options.rustErrorHandling || (options.ecosystem === "rust" ? "anyhow-thiserror" : "none"),
      rustCaching: options.rustCaching || "none",
      rustAuth: options.rustAuth || "none",
      rustRealtime: options.rustRealtime || "none",
      rustMessageQueue: options.rustMessageQueue || "none",
      rustObservability: options.rustObservability || "none",
      rustTemplating: options.rustTemplating || "none",
      // Python ecosystem options
      pythonWebFramework: options.pythonWebFramework || "none",
      pythonOrm: options.pythonOrm || "none",
      pythonValidation: options.pythonValidation || "none",
      pythonAi: options.pythonAi || [],
      pythonAuth: options.pythonAuth || "none",
      pythonApi: options.pythonApi || "none",
      pythonTaskQueue: options.pythonTaskQueue || "none",
      pythonGraphql: options.pythonGraphql || "none",
      pythonQuality: options.pythonQuality || "none",
      pythonTesting: options.pythonTesting || [],
      pythonCaching: options.pythonCaching || "none",
      pythonRealtime: options.pythonRealtime || "none",
      pythonObservability: options.pythonObservability || "none",
      pythonCli: options.pythonCli || [],
      // Go ecosystem options
      goWebFramework: options.goWebFramework || "none",
      goOrm: options.goOrm || "none",
      goApi: options.goApi || "none",
      goCli: options.goCli || "none",
      goLogging: options.goLogging || "none",
      goAuth: options.goAuth || "none",
      goTesting: options.goTesting || [],
      goRealtime: options.goRealtime || "none",
      goMessageQueue: options.goMessageQueue || "none",
      goCaching: options.goCaching || "none",
      goConfig: options.goConfig || "none",
      goObservability: options.goObservability || "none",
      javaWebFramework:
        options.javaWebFramework || (options.ecosystem === "java" ? "spring-boot" : "none"),
      javaBuildTool: options.javaBuildTool || (options.ecosystem === "java" ? "maven" : "none"),
      javaOrm: options.javaOrm || "none",
      javaAuth: options.javaAuth || "none",
      javaApi: options.javaApi || "none",
      javaLogging: options.javaLogging || "none",
      javaLibraries: options.javaLibraries || [],
      javaTestingLibraries:
        options.javaTestingLibraries || (options.ecosystem === "java" ? ["junit5"] : []),
      dotnetWebFramework:
        options.dotnetWebFramework ||
        (options.ecosystem === "dotnet" ? "aspnet-minimal" : "none"),
      dotnetOrm: options.dotnetOrm || (options.ecosystem === "dotnet" ? "ef-core" : "none"),
      dotnetAuth:
        options.dotnetAuth || (options.ecosystem === "dotnet" ? "aspnet-identity" : "none"),
      dotnetApi: options.dotnetApi || (options.ecosystem === "dotnet" ? "minimal-api" : "none"),
      dotnetTesting: options.dotnetTesting || (options.ecosystem === "dotnet" ? ["xunit"] : []),
      dotnetJobQueue: options.dotnetJobQueue || "none",
      dotnetRealtime:
        options.dotnetRealtime || (options.ecosystem === "dotnet" ? "signalr" : "none"),
      dotnetObservability:
        options.dotnetObservability || (options.ecosystem === "dotnet" ? ["serilog"] : []),
      dotnetValidation: options.dotnetValidation || "none",
      dotnetCaching: options.dotnetCaching || "none",
      dotnetDeploy: options.dotnetDeploy || (options.ecosystem === "dotnet" ? "docker" : "none"),
      elixirWebFramework:
        options.elixirWebFramework || (options.ecosystem === "elixir" ? "phoenix" : "none"),
      elixirOrm: options.elixirOrm || (options.ecosystem === "elixir" ? "ecto-sql" : "none"),
      elixirAuth: options.elixirAuth || "none",
      elixirApi: options.elixirApi || (options.ecosystem === "elixir" ? "rest" : "none"),
      elixirRealtime:
        options.elixirRealtime || (options.ecosystem === "elixir" ? "channels" : "none"),
      elixirJobs: options.elixirJobs || "none",
      elixirValidation:
        options.elixirValidation || (options.ecosystem === "elixir" ? "ecto-changesets" : "none"),
      elixirHttp: options.elixirHttp || (options.ecosystem === "elixir" ? "req" : "none"),
      elixirJson: options.elixirJson || (options.ecosystem === "elixir" ? "jason" : "none"),
      elixirEmail: options.elixirEmail || "none",
      elixirCaching: options.elixirCaching || "none",
      elixirObservability:
        options.elixirObservability || (options.ecosystem === "elixir" ? "telemetry" : "none"),
      elixirTesting: options.elixirTesting || (options.ecosystem === "elixir" ? "ex_unit" : "none"),
      elixirQuality: options.elixirQuality || (options.ecosystem === "elixir" ? "credo" : "none"),
      elixirDeploy: options.elixirDeploy || "none",
      elixirLibraries: options.elixirLibraries || [],
      // AI documentation files (canonical default ships both CLAUDE.md + AGENTS.md)
      aiDocs: options.aiDocs || ["claude-md", "agents-md"],
    };
    if (options.stackParts) {
      config.stackParts = options.stackParts;
    }

    const { generateVirtualProject: generate, EMBEDDED_TEMPLATES } = await import(
      "@better-fullstack/template-generator"
    );

    const result = await generate({
      config,
      templates: EMBEDDED_TEMPLATES,
    });

    if (result.success && result.tree) {
      return { success: true, tree: result.tree };
    }

    return { success: false, error: result.error || "Unknown error" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
export type {
  CreateInput,
  AddInput,
  InitResult,
  BetterTStackConfig,
  Ecosystem,
  Database,
  ORM,
  Backend,
  Runtime,
  Frontend,
  Addons,
  Examples,
  PackageManager,
  DatabaseSetup,
  API,
  Auth,
  Payments,
  Effect,
  WebDeploy,
  ServerDeploy,
  Template,
  DirectoryConflict,
  CSSFramework,
  UILibrary,
  Realtime,
  Animation,
  Logging,
  RustWebFramework,
  RustFrontend,
  RustOrm,
  RustApi,
  RustCli,
  RustLibraries,
  RustLogging,
  CMS,
  Caching,
  Analytics,
  PythonWebFramework,
  PythonOrm,
  PythonValidation,
  PythonAi,
  PythonTaskQueue,
  PythonQuality,
  GoWebFramework,
  GoOrm,
  GoApi,
  GoCli,
  GoLogging,
  GoAuth,
  JavaWebFramework,
  JavaBuildTool,
  JavaLibraries,
  JavaOrm,
  JavaAuth,
  JavaTestingLibraries,
  ElixirWebFramework,
  ElixirOrm,
  ElixirAuth,
  ElixirApi,
  ElixirRealtime,
  ElixirJobs,
  ElixirValidation,
  ElixirHttp,
  ElixirJson,
  ElixirEmail,
  ElixirCaching,
  ElixirObservability,
  ElixirTesting,
  ElixirQuality,
  ElixirDeploy,
  AiDocs,
} from "./types";
export type { AddResult } from "./helpers/core/add-handler";
