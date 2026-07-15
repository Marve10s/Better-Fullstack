import { z } from "zod";

import {
  DatabaseSchema,
  ORMSchema,
  BackendSchema,
  RuntimeSchema,
  FrontendSchema,
  AddonsSchema,
  ExamplesSchema,
  PackageManagerSchema,
  DatabaseSetupSchema,
  APISchema,
  AuthSchema,
  PaymentsSchema,
  WebDeploySchema,
  ServerDeploySchema,
  DirectoryConflictSchema,
  TemplateSchema,
  CreateInputSchema,
  ProjectConfigSchema,
  BetterFullstackConfigSchema,
  BetterTStackConfigSchema,
  InitResultSchema,
  GoWebFrameworkSchema,
  GoOrmSchema,
  GoApiSchema,
  GoCliSchema,
  GoLoggingSchema,
  GoAuthSchema,
  GoTestingSchema,
  GoRealtimeSchema,
  GoMessageQueueSchema,
  GoCachingSchema,
  GoConfigSchema,
  GoObservabilitySchema,
  GoValidationSchema,
  GoQualitySchema,
  GoMigrationsSchema,
  GoTemplatingSchema,
  GoProtoToolingSchema,
  GoDISchema,
  ElixirApiSchema,
  ElixirAuthSchema,
  ElixirCachingSchema,
  ElixirDeploySchema,
  ElixirEmailSchema,
  ElixirHttpSchema,
  ElixirJobsSchema,
  ElixirJsonSchema,
  ElixirObservabilitySchema,
  ElixirOrmSchema,
  ElixirQualitySchema,
  ElixirI18nSchema,
  ElixirHttpServerSchema,
  ElixirApplicationFrameworkSchema,
  ElixirDocumentationSchema,
  ElixirClusteringSchema,
  ElixirRealtimeSchema,
  ElixirTestingSchema,
  ElixirValidationSchema,
  ElixirWebFrameworkSchema,
  JavaAuthSchema,
  JavaBuildToolSchema,
  JavaLibrariesSchema,
  JavaOrmSchema,
  JavaTestingLibrariesSchema,
  JavaWebFrameworkSchema,
} from "./schemas";

// Generate JSON schemas for each type
export function getDatabaseJsonSchema() {
  return z.toJSONSchema(DatabaseSchema);
}

export function getORMJsonSchema() {
  return z.toJSONSchema(ORMSchema);
}

export function getBackendJsonSchema() {
  return z.toJSONSchema(BackendSchema);
}

export function getRuntimeJsonSchema() {
  return z.toJSONSchema(RuntimeSchema);
}

export function getFrontendJsonSchema() {
  return z.toJSONSchema(FrontendSchema);
}

export function getAddonsJsonSchema() {
  return z.toJSONSchema(AddonsSchema);
}

export function getExamplesJsonSchema() {
  return z.toJSONSchema(ExamplesSchema);
}

export function getPackageManagerJsonSchema() {
  return z.toJSONSchema(PackageManagerSchema);
}

export function getDatabaseSetupJsonSchema() {
  return z.toJSONSchema(DatabaseSetupSchema);
}

export function getAPIJsonSchema() {
  return z.toJSONSchema(APISchema);
}

export function getAuthJsonSchema() {
  return z.toJSONSchema(AuthSchema);
}

export function getPaymentsJsonSchema() {
  return z.toJSONSchema(PaymentsSchema);
}

export function getWebDeployJsonSchema() {
  return z.toJSONSchema(WebDeploySchema);
}

export function getServerDeployJsonSchema() {
  return z.toJSONSchema(ServerDeploySchema);
}

export function getDirectoryConflictJsonSchema() {
  return z.toJSONSchema(DirectoryConflictSchema);
}

export function getTemplateJsonSchema() {
  return z.toJSONSchema(TemplateSchema);
}

export function getCreateInputJsonSchema() {
  return z.toJSONSchema(CreateInputSchema);
}

export function getProjectConfigJsonSchema() {
  return z.toJSONSchema(ProjectConfigSchema);
}

export function getBetterTStackConfigJsonSchema() {
  return z.toJSONSchema(BetterTStackConfigSchema);
}

export function getBetterFullstackConfigJsonSchema() {
  return z.toJSONSchema(BetterFullstackConfigSchema);
}

export function getInitResultJsonSchema() {
  return z.toJSONSchema(InitResultSchema);
}

export function getJavaWebFrameworkJsonSchema() {
  return z.toJSONSchema(JavaWebFrameworkSchema);
}

export function getJavaBuildToolJsonSchema() {
  return z.toJSONSchema(JavaBuildToolSchema);
}

export function getJavaOrmJsonSchema() {
  return z.toJSONSchema(JavaOrmSchema);
}

export function getJavaAuthJsonSchema() {
  return z.toJSONSchema(JavaAuthSchema);
}

export function getGoWebFrameworkJsonSchema() {
  return z.toJSONSchema(GoWebFrameworkSchema);
}

export function getGoOrmJsonSchema() {
  return z.toJSONSchema(GoOrmSchema);
}

export function getGoApiJsonSchema() {
  return z.toJSONSchema(GoApiSchema);
}

export function getGoCliJsonSchema() {
  return z.toJSONSchema(GoCliSchema);
}

export function getGoLoggingJsonSchema() {
  return z.toJSONSchema(GoLoggingSchema);
}

export function getGoAuthJsonSchema() {
  return z.toJSONSchema(GoAuthSchema);
}

export function getGoTestingJsonSchema() {
  return z.toJSONSchema(GoTestingSchema);
}

export function getGoRealtimeJsonSchema() {
  return z.toJSONSchema(GoRealtimeSchema);
}

export function getGoMessageQueueJsonSchema() {
  return z.toJSONSchema(GoMessageQueueSchema);
}

export function getGoCachingJsonSchema() {
  return z.toJSONSchema(GoCachingSchema);
}

export function getGoConfigJsonSchema() {
  return z.toJSONSchema(GoConfigSchema);
}

export function getGoObservabilityJsonSchema() {
  return z.toJSONSchema(GoObservabilitySchema);
}

export function getGoValidationJsonSchema() {
  return z.toJSONSchema(GoValidationSchema);
}

export function getGoQualityJsonSchema() {
  return z.toJSONSchema(GoQualitySchema);
}

export function getGoMigrationsJsonSchema() {
  return z.toJSONSchema(GoMigrationsSchema);
}

export function getGoTemplatingJsonSchema() {
  return z.toJSONSchema(GoTemplatingSchema);
}

export function getGoProtoToolingJsonSchema() {
  return z.toJSONSchema(GoProtoToolingSchema);
}

export function getGoDIJsonSchema() {
  return z.toJSONSchema(GoDISchema);
}

export function getJavaLibrariesJsonSchema() {
  return z.toJSONSchema(JavaLibrariesSchema);
}

export function getJavaTestingLibrariesJsonSchema() {
  return z.toJSONSchema(JavaTestingLibrariesSchema);
}

export function getElixirWebFrameworkJsonSchema() {
  return z.toJSONSchema(ElixirWebFrameworkSchema);
}

export function getElixirOrmJsonSchema() {
  return z.toJSONSchema(ElixirOrmSchema);
}

export function getElixirAuthJsonSchema() {
  return z.toJSONSchema(ElixirAuthSchema);
}

export function getElixirApiJsonSchema() {
  return z.toJSONSchema(ElixirApiSchema);
}

export function getElixirRealtimeJsonSchema() {
  return z.toJSONSchema(ElixirRealtimeSchema);
}

export function getElixirJobsJsonSchema() {
  return z.toJSONSchema(ElixirJobsSchema);
}

export function getElixirValidationJsonSchema() {
  return z.toJSONSchema(ElixirValidationSchema);
}

export function getElixirHttpJsonSchema() {
  return z.toJSONSchema(ElixirHttpSchema);
}

export function getElixirJsonJsonSchema() {
  return z.toJSONSchema(ElixirJsonSchema);
}

export function getElixirEmailJsonSchema() {
  return z.toJSONSchema(ElixirEmailSchema);
}

export function getElixirCachingJsonSchema() {
  return z.toJSONSchema(ElixirCachingSchema);
}

export function getElixirObservabilityJsonSchema() {
  return z.toJSONSchema(ElixirObservabilitySchema);
}

export function getElixirTestingJsonSchema() {
  return z.toJSONSchema(ElixirTestingSchema);
}

export function getElixirQualityJsonSchema() {
  return z.toJSONSchema(ElixirQualitySchema);
}

export function getElixirI18nJsonSchema() {
  return z.toJSONSchema(ElixirI18nSchema);
}

export function getElixirHttpServerJsonSchema() {
  return z.toJSONSchema(ElixirHttpServerSchema);
}

export function getElixirApplicationFrameworkJsonSchema() {
  return z.toJSONSchema(ElixirApplicationFrameworkSchema);
}

export function getElixirDocumentationJsonSchema() {
  return z.toJSONSchema(ElixirDocumentationSchema);
}

export function getElixirClusteringJsonSchema() {
  return z.toJSONSchema(ElixirClusteringSchema);
}

export function getElixirDeployJsonSchema() {
  return z.toJSONSchema(ElixirDeploySchema);
}

// Get all JSON schemas as a single object
export function getAllJsonSchemas() {
  return {
    database: getDatabaseJsonSchema(),
    orm: getORMJsonSchema(),
    backend: getBackendJsonSchema(),
    runtime: getRuntimeJsonSchema(),
    frontend: getFrontendJsonSchema(),
    addons: getAddonsJsonSchema(),
    examples: getExamplesJsonSchema(),
    packageManager: getPackageManagerJsonSchema(),
    databaseSetup: getDatabaseSetupJsonSchema(),
    api: getAPIJsonSchema(),
    auth: getAuthJsonSchema(),
    payments: getPaymentsJsonSchema(),
    webDeploy: getWebDeployJsonSchema(),
    serverDeploy: getServerDeployJsonSchema(),
    directoryConflict: getDirectoryConflictJsonSchema(),
    template: getTemplateJsonSchema(),
    goWebFramework: getGoWebFrameworkJsonSchema(),
    goOrm: getGoOrmJsonSchema(),
    goApi: getGoApiJsonSchema(),
    goCli: getGoCliJsonSchema(),
    goLogging: getGoLoggingJsonSchema(),
    goAuth: getGoAuthJsonSchema(),
    goTesting: getGoTestingJsonSchema(),
    goRealtime: getGoRealtimeJsonSchema(),
    goMessageQueue: getGoMessageQueueJsonSchema(),
    goCaching: getGoCachingJsonSchema(),
    goConfig: getGoConfigJsonSchema(),
    goObservability: getGoObservabilityJsonSchema(),
    goValidation: getGoValidationJsonSchema(),
    goQuality: getGoQualityJsonSchema(),
    goMigrations: getGoMigrationsJsonSchema(),
    goTemplating: getGoTemplatingJsonSchema(),
    goProtoTooling: getGoProtoToolingJsonSchema(),
    goDI: getGoDIJsonSchema(),
    javaWebFramework: getJavaWebFrameworkJsonSchema(),
    javaBuildTool: getJavaBuildToolJsonSchema(),
    javaOrm: getJavaOrmJsonSchema(),
    javaAuth: getJavaAuthJsonSchema(),
    javaLibraries: getJavaLibrariesJsonSchema(),
    javaTestingLibraries: getJavaTestingLibrariesJsonSchema(),
    elixirWebFramework: getElixirWebFrameworkJsonSchema(),
    elixirOrm: getElixirOrmJsonSchema(),
    elixirAuth: getElixirAuthJsonSchema(),
    elixirApi: getElixirApiJsonSchema(),
    elixirRealtime: getElixirRealtimeJsonSchema(),
    elixirJobs: getElixirJobsJsonSchema(),
    elixirValidation: getElixirValidationJsonSchema(),
    elixirHttp: getElixirHttpJsonSchema(),
    elixirJson: getElixirJsonJsonSchema(),
    elixirEmail: getElixirEmailJsonSchema(),
    elixirCaching: getElixirCachingJsonSchema(),
    elixirObservability: getElixirObservabilityJsonSchema(),
    elixirTesting: getElixirTestingJsonSchema(),
    elixirQuality: getElixirQualityJsonSchema(),
    elixirI18n: getElixirI18nJsonSchema(),
    elixirHttpServer: getElixirHttpServerJsonSchema(),
    elixirApplicationFramework: getElixirApplicationFrameworkJsonSchema(),
    elixirDocumentation: getElixirDocumentationJsonSchema(),
    elixirClustering: getElixirClusteringJsonSchema(),
    elixirDeploy: getElixirDeployJsonSchema(),
    createInput: getCreateInputJsonSchema(),
    projectConfig: getProjectConfigJsonSchema(),
    betterFullstackConfig: getBetterFullstackConfigJsonSchema(),
    betterTStackConfig: getBetterTStackConfigJsonSchema(),
    initResult: getInitResultJsonSchema(),
  };
}
