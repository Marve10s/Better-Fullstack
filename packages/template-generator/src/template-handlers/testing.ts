import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processTestingTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (config.testing === "playwright" || config.testing === "vitest-playwright") {
    processTemplatesFromPrefix(vfs, templates, "testing", "", config, ["testing/mocha"]);
  }

  if (config.testing === "mocha") {
    const packageMappings = [
      { templatePath: "apps/web", outputPath: "apps/web" },
      { templatePath: "apps/web", outputPath: "web" },
      { templatePath: "apps/server", outputPath: "apps/server" },
      { templatePath: "packages/api", outputPath: "packages/api" },
      { templatePath: "packages/api", outputPath: "api" },
    ];

    for (const { templatePath, outputPath } of packageMappings) {
      if (vfs.exists(`${outputPath}/package.json`)) {
        processTemplatesFromPrefix(
          vfs,
          templates,
          `testing/mocha/${templatePath}`,
          outputPath,
          config,
        );
      }
    }
  }
}
