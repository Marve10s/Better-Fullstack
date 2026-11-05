import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { transformFilename } from "@/core/template-processor";
import { renderTemplateTree, type TemplateData } from "@/template-handlers/core/utils";

export async function processPythonBaseTemplate(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath = "",
): Promise<void> {
  // Only process Python templates if ecosystem is "python"
  if (config.ecosystem !== "python") return;

  const prefix = "python-base/";
  const templateContext: ProjectConfig = {
    ...config,
    // Graph-derived and legacy configs may omit this recently introduced field.
    // Python projects still use uv by default, matching CLI commands and docs.
    pythonPackageManager: config.pythonPackageManager ?? "uv",
    pythonLogging: config.pythonLogging ?? "none",
  };

  const appEntryDir = "src/app/main/";
  const appEntry = `${prefix}${appEntryDir}${config.pythonWebFramework ?? "none"}.py.hbs`;
  const selectedAppEntry = templates.has(appEntry)
    ? appEntry
    : `${prefix}${appEntryDir}none.py.hbs`;

  renderTemplateTree(vfs, templates, {
    prefix,
    targetPath,
    context: templateContext,
    outputPath: (relativePath) =>
      relativePath.startsWith(appEntryDir) ? "src/app/main.py" : transformFilename(relativePath),
    skip: (templatePath) => templatePath.includes(appEntryDir) && templatePath !== selectedAppEntry,
  });
}
