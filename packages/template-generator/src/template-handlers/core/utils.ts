import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { processTemplateString, transformFilename, isBinaryFile } from "@/core/template-processor";

export type TemplateData = Map<string, string>;

/**
 * Templates can legitimately produce no content when a feature is disabled.
 * Those files should not appear in generated trees. This stays at the template
 * boundary so processors can still create intentional empty markers directly.
 */
export function isEmptyTemplateOutput(templatePath: string, processedContent: string): boolean {
  return !isBinaryFile(templatePath) && processedContent.trim() === "";
}

export function hasTemplatesWithPrefix(templates: TemplateData, prefix: string): boolean {
  const normalizedPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
  for (const path of templates.keys()) {
    if (path.startsWith(normalizedPrefix)) return true;
  }
  return false;
}

export function processSingleTemplate(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  templatePath: string,
  destPath: string,
  config: ProjectConfig,
): void {
  const templateKey = templatePath.endsWith(".hbs") ? templatePath : `${templatePath}.hbs`;
  const content = templates.get(templateKey);

  if (!content) return;

  let processedContent: string;
  if (isBinaryFile(templateKey)) {
    processedContent = "[Binary file]";
  } else if (templateKey.endsWith(".hbs")) {
    processedContent = processTemplateString(content, config);
  } else {
    processedContent = content;
  }

  if (isEmptyTemplateOutput(templateKey, processedContent)) return;

  // Pass original template path for binary files
  const sourcePath = isBinaryFile(templateKey) ? templateKey : undefined;
  vfs.writeFile(destPath, processedContent, sourcePath);
}

export function processTemplatesFromPrefix(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  prefix: string,
  destPrefix: string,
  config: ProjectConfig,
  excludePrefixes: string[] = [],
): void {
  const normalizedPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
  const normalizedExcludes = excludePrefixes.map((p) => (p.endsWith("/") ? p : `${p}/`));

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith(normalizedPrefix)) continue;

    // Skip if path matches any exclusion prefix
    if (normalizedExcludes.some((exclude) => templatePath.startsWith(exclude))) continue;

    const relativePath = templatePath.slice(normalizedPrefix.length);
    const outputPath = transformFilename(relativePath);
    const destPath = destPrefix ? `${destPrefix}/${outputPath}` : outputPath;

    let processedContent: string;
    if (isBinaryFile(templatePath)) {
      processedContent = "[Binary file]";
    } else if (templatePath.endsWith(".hbs")) {
      processedContent = processTemplateString(content, config);
    } else {
      processedContent = content;
    }

    // Skip writing conditional templates whose selected branches emitted nothing.
    if (isEmptyTemplateOutput(templatePath, processedContent)) continue;

    // Pass original template path for binary files
    const sourcePath = isBinaryFile(templatePath) ? templatePath : undefined;
    vfs.writeFile(destPath, processedContent, sourcePath);
  }
}
