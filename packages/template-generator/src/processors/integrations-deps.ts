import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { addPackageDependency } from "../utils/add-deps";

export function processIntegrationsDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  if (config.integrations !== "nango") return;
  if (config.backend === "none" || config.backend === "convex") return;
  if (config.runtime === "workers") return;
  if (config.backend === "self" && config.webDeploy === "cloudflare") return;

  const packagePath =
    config.backend === "self" ? "apps/web/package.json" : "apps/server/package.json";
  if (!vfs.exists(packagePath)) return;

  addPackageDependency({
    vfs,
    packagePath,
    dependencies: ["@nangohq/node"],
  });
}
