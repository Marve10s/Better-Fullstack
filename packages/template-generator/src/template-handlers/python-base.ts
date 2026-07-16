import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import { isBinaryFile, processTemplateString, transformFilename } from "../core/template-processor";
import { isEmptyTemplateOutput, type TemplateData } from "./utils";

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
  };

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith(prefix)) continue;

    const relativePath = templatePath.slice(prefix.length);
    const outputPath = transformFilename(relativePath);
    const destPath = targetPath ? `${targetPath}/${outputPath}` : outputPath;

    let processedContent: string;
    if (isBinaryFile(templatePath)) {
      processedContent = "[Binary file]";
    } else if (templatePath.endsWith(".hbs")) {
      processedContent = processTemplateString(content, templateContext);
    } else {
      processedContent = content;
    }

    if (isEmptyTemplateOutput(templatePath, processedContent)) continue;

    // Pass original template path for binary files
    const sourcePath = isBinaryFile(templatePath) ? templatePath : undefined;
    vfs.writeFile(destPath, processedContent, sourcePath);
  }
}
