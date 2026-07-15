import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processSingleTemplate } from "./utils";

export async function processExtrasTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  const hasNative = config.frontend.some((f) =>
    ["native-bare", "native-uniwind", "native-unistyles"].includes(f),
  );
  const hasNuxt = config.frontend.includes("nuxt");

  if (config.packageManager === "pnpm") {
    const workspaceYaml = templates.get("extras/pnpm-workspace.yaml");
    if (workspaceYaml) vfs.writeFile("pnpm-workspace.yaml", workspaceYaml);
  }

  if (config.packageManager === "bun") {
    processSingleTemplate(vfs, templates, "extras/bunfig.toml", "bunfig.toml", config);
  }

  if (config.packageManager === "yarn") {
    vfs.writeFile(".yarnrc.yml", "nodeLinker: node-modules\n");
  }

  if (config.packageManager === "pnpm" && (hasNative || hasNuxt)) {
    processSingleTemplate(vfs, templates, "extras/_npmrc", ".npmrc", config);
  }

  if (
    config.serverDeploy === "cloudflare" ||
    (config.webDeploy === "cloudflare" && config.backend === "self")
  ) {
    processSingleTemplate(vfs, templates, "extras/env.d.ts", "packages/env/env.d.ts", config);
  }
}
