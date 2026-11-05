import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { renderTemplateTree, type TemplateData } from "@/template-handlers/core/utils";

export async function processPhpBaseTemplate(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath = "",
): Promise<void> {
  if (config.ecosystem !== "php" || config.phpWebFramework === "none") return;
  const phpPackageName =
    config.projectName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "app";
  const phpSourceDirectory = config.phpWebFramework === "laravel" ? "app" : "src";
  const context = {
    ...config,
    phpOrm: config.phpOrm ?? "none",
    phpAuth: config.phpAuth ?? "none",
    phpTesting: config.phpTesting ?? "phpunit",
    phpValidation: config.phpValidation ?? "none",
    phpCache: config.phpCache ?? "none",
    phpJobQueue: config.phpJobQueue ?? "none",
    phpEmail: config.phpEmail ?? "none",
    phpLogging: config.phpLogging ?? "none",
    phpHttpClient: config.phpHttpClient ?? "none",
    phpPackageName,
    phpSourceDirectory,
  };
  const sourcePath = targetPath ? `${targetPath}/${phpSourceDirectory}` : phpSourceDirectory;
  const skip =
    context.phpTesting === "none"
      ? (templatePath: string) => templatePath.includes("/tests/")
      : undefined;
  renderTemplateTree(vfs, templates, { prefix: "php-base/common/", targetPath, context, skip });
  renderTemplateTree(vfs, templates, {
    prefix: `php-base/${config.phpWebFramework}/`,
    targetPath,
    context,
    skip,
  });
  renderTemplateTree(vfs, templates, { prefix: "php-base/app/", targetPath: sourcePath, context });
}
