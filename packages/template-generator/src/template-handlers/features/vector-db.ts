import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "@/template-handlers/core/utils";

export async function processVectorDbTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.vectorDb || config.vectorDb === "none") return;
  if (config.backend === "convex") return;
  if (config.backend === "none") return;

  const destPrefix = config.backend === "self" ? "apps/web" : "apps/server";

  // Process server-side vector database templates
  processTemplatesFromPrefix(
    vfs,
    templates,
    `vector-db/${config.vectorDb}/server/base`,
    destPrefix,
    config,
  );

  if (config.vectorDb === "lancedb") {
    const gitignore = vfs.readFile(".gitignore") ?? "";
    if (!gitignore.split("\n").includes(".lancedb")) {
      vfs.writeFile(
        ".gitignore",
        `${gitignore}${gitignore.endsWith("\n") || gitignore.length === 0 ? "" : "\n"}.lancedb\n`,
      );
    }
  }
}
