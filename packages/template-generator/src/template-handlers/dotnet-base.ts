import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import type { TemplateData } from "./utils";

import { isBinaryFile, processTemplateString, transformFilename } from "../core/template-processor";

type DotnetTemplateContext = ProjectConfig & {
  dotnetProjectName: string;
  dotnetNamespace: string;
  dotnetHasEfCore: boolean;
  dotnetHasIdentity: boolean;
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
  dotnetHasTests: boolean;
  dotnetHasXunit: boolean;
  dotnetHasNunit: boolean;
  dotnetHasMoq: boolean;
  dotnetHasTestcontainers: boolean;
};

function toDotnetIdentifierSegment(value: string): string {
  const cleaned = value
    .replace(/[^A-Za-z0-9_]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
  const segment = cleaned || "App";
  return /^[A-Za-z_]/.test(segment) ? segment : `App${segment}`;
}

function createDotnetTemplateContext(config: ProjectConfig): DotnetTemplateContext {
  const projectName = toDotnetIdentifierSegment(config.projectName);
  const dotnetTesting = config.dotnetTesting.filter((value) => value !== "none");
  const dotnetObservability = config.dotnetObservability.filter((value) => value !== "none");

  return {
    ...config,
    dotnetProjectName: projectName,
    dotnetNamespace: projectName,
    dotnetHasEfCore: config.dotnetOrm === "ef-core",
    dotnetHasIdentity: config.dotnetAuth === "aspnet-identity",
    dotnetHasSignalR: config.dotnetRealtime === "signalr",
    dotnetHasSerilog: dotnetObservability.includes("serilog"),
    dotnetHasOpenTelemetry: dotnetObservability.includes("opentelemetry-dotnet"),
    dotnetHasNLog: dotnetObservability.includes("nlog"),
    dotnetHasHealthChecks: dotnetObservability.includes("health-checks"),
    dotnetHasRedis: config.dotnetCaching === "redis",
    dotnetHasMemoryCache: config.dotnetCaching === "memory-cache",
    dotnetHasHangfire: config.dotnetJobQueue === "hangfire",
    dotnetHasQuartz: config.dotnetJobQueue === "quartz-net",
    dotnetHasHostedServices: config.dotnetJobQueue === "hosted-services",
    dotnetHasDocker: config.dotnetDeploy === "docker",
    dotnetHasTests: dotnetTesting.length > 0,
    dotnetHasXunit: dotnetTesting.includes("xunit"),
    dotnetHasNunit: dotnetTesting.includes("nunit"),
    dotnetHasMoq: dotnetTesting.includes("moq"),
    dotnetHasTestcontainers: dotnetTesting.includes("testcontainers-dotnet"),
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

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith(prefix)) continue;
    if (!context.dotnetHasDocker && templatePath.includes("Dockerfile")) continue;
    if (!context.dotnetHasTests && templatePath.includes(".Tests/")) continue;

    const relativePath = templatePath.slice(prefix.length);
    const outputPath = transformFilename(relativePath).replace(
      /__dotnetProjectName__/g,
      context.dotnetProjectName,
    );
    const destPath = targetPath ? `${targetPath}/${outputPath}` : outputPath;

    let processedContent: string;
    if (isBinaryFile(templatePath)) {
      processedContent = "[Binary file]";
    } else if (templatePath.endsWith(".hbs")) {
      processedContent = processTemplateString(content, context);
    } else {
      processedContent = content;
    }

    if (processedContent.trim() === "") continue;

    const sourcePath = isBinaryFile(templatePath) ? templatePath : undefined;
    vfs.writeFile(destPath, processedContent, sourcePath);
  }
}
