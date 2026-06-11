import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "../utils/add-deps";
import { getServerPackagePath, getWebPackagePath } from "../utils/project-paths";

function getRateLimitDeps(config: ProjectConfig): AvailableDependencies[] {
  switch (config.rateLimit) {
    case "arcjet":
      if (
        config.backend === "self" &&
        (config.frontend.includes("next") || config.frontend.includes("vinext"))
      ) {
        return ["@arcjet/next"];
      }
      return ["@arcjet/node"];
    case "upstash-ratelimit":
      return ["@upstash/ratelimit", "@upstash/redis"];
    case "none":
    case undefined:
      return [];
  }
}

export function processRateLimitDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  if (!config.rateLimit || config.rateLimit === "none") return;
  if (config.backend === "none" || config.backend === "convex") return;

  const packagePath =
    config.backend === "self"
      ? getWebPackagePath(config.frontend, config.backend)
      : getServerPackagePath(config.frontend, config.backend);
  if (!vfs.exists(packagePath)) return;

  const dependencies = getRateLimitDeps(config);
  if (dependencies.length === 0) return;

  addPackageDependency({
    vfs,
    packagePath,
    dependencies,
  });
}
