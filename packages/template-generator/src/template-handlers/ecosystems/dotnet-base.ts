import { type ProjectConfig, toDotnetIdentifierSegment } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { transformFilename } from "@/core/template-processor";
import { renderTemplateTree, type TemplateData } from "@/template-handlers/core/utils";

const DOTNET_DOCKER_DEPLOY_TARGETS = new Set<ProjectConfig["dotnetDeploy"]>([
  "docker",
  "azure",
  "aws",
]);

type DotnetTemplateContext = ProjectConfig & {
  dotnetProjectName: string;
  dotnetNamespace: string;
  dotnetCloudName: string;
  dotnetHasMvc: boolean;
  dotnetHasBlazor: boolean;
  dotnetHasMinimalApiTodos: boolean;
  dotnetHasEfCore: boolean;
  dotnetHasDapper: boolean;
  dotnetHasDapperTodos: boolean;
  dotnetHasLinq2Db: boolean;
  dotnetHasLinq2DbTodos: boolean;
  dotnetHasIdentity: boolean;
  dotnetHasDuendeIdentityServer: boolean;
  dotnetHasAuth0AspNet: boolean;
  dotnetHasAuthentication: boolean;
  dotnetHasSignalR: boolean;
  dotnetHasSerilog: boolean;
  dotnetHasOpenTelemetry: boolean;
  dotnetHasNLog: boolean;
  dotnetHasHealthChecks: boolean;
  dotnetHasRedis: boolean;
  dotnetHasMemoryCache: boolean;
  dotnetHasHangfire: boolean;
  dotnetHasQuartz: boolean;
  dotnetHasHostedServices: boolean;
  dotnetHasDocker: boolean;
  dotnetHasAzureDeploy: boolean;
  dotnetHasAwsDeploy: boolean;
  dotnetHasTests: boolean;
  dotnetHasXunit: boolean;
  dotnetHasNunit: boolean;
  dotnetHasMoq: boolean;
  dotnetHasTestcontainers: boolean;
};

function toCloudResourceName(value: string): string {
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  const resourceName = cleaned || "app";
  return resourceName.length === 1 ? `${resourceName}-app` : resourceName;
}

function createDotnetTemplateContext(config: ProjectConfig): DotnetTemplateContext {
  const projectName = toDotnetIdentifierSegment(config.projectName);
  const dotnetTesting = config.dotnetTesting.filter((value) => value !== "none");
  const dotnetTestingSet = new Set(dotnetTesting);
  const dotnetObservability = config.dotnetObservability.filter((value) => value !== "none");
  const dotnetObservabilitySet = new Set(dotnetObservability);
  const dotnetHasAzureDeploy = config.dotnetDeploy === "azure";
  const dotnetHasAwsDeploy = config.dotnetDeploy === "aws";
  const dotnetHasMvc = config.dotnetWebFramework === "aspnet-mvc";
  const dotnetHasBlazor = config.dotnetWebFramework === "aspnet-blazor";
  const dotnetHasMinimalApiTodos = config.dotnetApi === "minimal-api" && !dotnetHasMvc;
  const dotnetHasControllerTodos = dotnetHasMinimalApiTodos || dotnetHasMvc;
  const dotnetHasIdentity = config.dotnetAuth === "aspnet-identity";
  const dotnetHasDuendeIdentityServer = config.dotnetAuth === "duende-identityserver";
  const dotnetHasAuth0AspNet = config.dotnetAuth === "auth0-aspnet";

  return {
    ...config,
    dotnetProjectName: projectName,
    dotnetNamespace: projectName,
    dotnetCloudName: toCloudResourceName(config.projectName),
    dotnetHasMvc,
    dotnetHasBlazor,
    dotnetHasMinimalApiTodos,
    dotnetHasEfCore: config.dotnetOrm === "ef-core",
    dotnetHasDapper: config.dotnetOrm === "dapper",
    dotnetHasDapperTodos: config.dotnetOrm === "dapper" && dotnetHasControllerTodos,
    dotnetHasLinq2Db: config.dotnetOrm === "linq2db",
    dotnetHasLinq2DbTodos: config.dotnetOrm === "linq2db" && dotnetHasControllerTodos,
    dotnetHasIdentity,
    dotnetHasDuendeIdentityServer,
    dotnetHasAuth0AspNet,
    dotnetHasAuthentication: dotnetHasIdentity || dotnetHasAuth0AspNet,
    dotnetHasSignalR: config.dotnetRealtime === "signalr",
    dotnetHasSerilog: dotnetObservabilitySet.has("serilog"),
    dotnetHasOpenTelemetry: dotnetObservabilitySet.has("opentelemetry-dotnet"),
    dotnetHasNLog: dotnetObservabilitySet.has("nlog"),
    dotnetHasHealthChecks: dotnetObservabilitySet.has("health-checks"),
    dotnetHasRedis: config.dotnetCaching === "redis",
    dotnetHasMemoryCache: config.dotnetCaching === "memory-cache",
    dotnetHasHangfire: config.dotnetJobQueue === "hangfire",
    dotnetHasQuartz: config.dotnetJobQueue === "quartz-net",
    dotnetHasHostedServices: config.dotnetJobQueue === "hosted-services",
    dotnetHasDocker: DOTNET_DOCKER_DEPLOY_TARGETS.has(config.dotnetDeploy),
    dotnetHasAzureDeploy,
    dotnetHasAwsDeploy,
    dotnetHasTests: dotnetTesting.length > 0,
    dotnetHasXunit: dotnetTestingSet.has("xunit"),
    dotnetHasNunit: dotnetTestingSet.has("nunit"),
    dotnetHasMoq: dotnetTestingSet.has("moq"),
    dotnetHasTestcontainers: dotnetTestingSet.has("testcontainers-dotnet"),
  };
}

export async function processDotnetBaseTemplate(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath = "",
): Promise<void> {
  if (config.ecosystem !== "dotnet") return;

  const prefix = "dotnet-base/";
  const context = createDotnetTemplateContext(config);

  renderTemplateTree(vfs, templates, {
    prefix,
    targetPath,
    context: context,
    skip: (templatePath) => {
      if (!context.dotnetHasDocker && templatePath.includes("Dockerfile")) return true;
      if (!context.dotnetHasAzureDeploy && templatePath.includes("azure.yaml")) return true;
      if (!context.dotnetHasAwsDeploy && templatePath.includes("copilot/")) return true;
      if (!context.dotnetHasTests && templatePath.includes(".Tests/")) return true;
      return false;
    },
    outputPath: (relativePath) =>
      transformFilename(relativePath).replace(/__dotnetProjectName__/g, context.dotnetProjectName),
  });
}
