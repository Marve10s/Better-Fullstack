import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { isBinaryFile, processTemplateString, transformFilename } from "../core/template-processor";
import { isEmptyTemplateOutput, type TemplateData } from "./utils";

export async function processGoBaseTemplate(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath = "",
): Promise<void> {
  // Only process Go templates if ecosystem is "go"
  if (config.ecosystem !== "go") return;

  const prefix = "go-base/";
  const hasGrpc = config.goApi === "grpc-go";
  const hasGrpcGateway = config.goApi === "grpc-gateway";
  const hasProto = hasGrpc || hasGrpcGateway || config.goProtoTooling === "buf";
  const hasCobra = config.goCli === "cobra";
  const hasUrfaveCli = config.goCli === "urfave-cli";
  const hasBubbletea = config.goCli === "bubbletea";

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith(prefix)) continue;

    // Skip proto directory if gRPC is not selected
    if (!hasProto && templatePath.includes("proto/")) continue;
    if (
      !hasGrpc &&
      !hasGrpcGateway &&
      templatePath.includes("proto/greeter") &&
      templatePath.endsWith(".go.hbs")
    )
      continue;

    if (!hasGrpcGateway && templatePath.includes("cmd/gateway/")) continue;
    if (config.goApi !== "connect-go" && templatePath.includes("cmd/connect/")) continue;
    if (config.goApi !== "oapi-codegen" && templatePath.includes("cmd/openapi/")) continue;
    if (
      !["go-zero", "kratos", "httprouter"].includes(config.goWebFramework) &&
      templatePath.includes("internal/server/")
    ) {
      continue;
    }

    // Skip cmd/cli directory if no CLI framework using that entrypoint is selected
    if (!hasCobra && !hasUrfaveCli && templatePath.includes("cmd/cli/")) continue;

    // Skip cmd/tui directory if Bubble Tea is not selected
    if (!hasBubbletea && templatePath.includes("cmd/tui/")) continue;

    const relativePath = templatePath.slice(prefix.length);
    const outputPath = transformFilename(relativePath);
    const destPath = targetPath ? `${targetPath}/${outputPath}` : outputPath;

    let processedContent: string;
    if (isBinaryFile(templatePath)) {
      processedContent = "[Binary file]";
    } else if (templatePath.endsWith(".hbs")) {
      processedContent = processTemplateString(content, config);
    } else {
      processedContent = content;
    }

    if (isEmptyTemplateOutput(templatePath, processedContent)) continue;

    // Pass original template path for binary files
    const sourcePath = isBinaryFile(templatePath) ? templatePath : undefined;
    vfs.writeFile(destPath, processedContent, sourcePath);
  }
}
