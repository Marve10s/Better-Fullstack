import type { Frontend, ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { getServerPackagePath, getWebPackagePath } from "@/platform/project-paths";

const FULLSTACK_FRONTENDS: Frontend[] = ["fresh", "qwik", "angular", "redwood"];

export function getServerDependencyTarget(
  vfs: VirtualFileSystem,
  { frontend, backend }: Pick<ProjectConfig, "frontend" | "backend">,
): string | null {
  if (backend === "convex") return null;

  const webPath = getWebPackagePath(frontend, backend);
  if (backend === "self" && vfs.exists(webPath)) return webPath;

  const serverPath = getServerPackagePath(frontend, backend);
  if (backend !== "none" && vfs.exists(serverPath)) return serverPath;

  const hasFullstackFrontend = frontend.some((f) => FULLSTACK_FRONTENDS.includes(f));
  if (hasFullstackFrontend && vfs.exists(webPath)) return webPath;

  return null;
}
