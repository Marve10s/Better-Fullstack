import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "../utils/add-deps";

export function processI18nDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { i18n, frontend } = config;

  if (!i18n || i18n === "none") return;

  const webPath = "apps/web/package.json";
  if (!vfs.exists(webPath)) return;

  const deps = getI18nDeps(i18n, frontend);
  if (deps.length > 0) {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      dependencies: deps,
    });
  }
}

function getI18nDeps(
  i18n: ProjectConfig["i18n"],
  frontend: ProjectConfig["frontend"],
): AvailableDependencies[] {
  const deps: AvailableDependencies[] = [];

  switch (i18n) {
    case "i18next": {
      deps.push("i18next", "i18next-browser-languagedetector", "i18next-http-backend");
      const hasReact = frontend.some((f) =>
        ["next", "tanstack-router", "react-router", "tanstack-start", "react-vite"].includes(f),
      );
      if (hasReact) {
        deps.push("react-i18next");
      }
      break;
    }
    case "next-intl":
      deps.push("next-intl");
      break;
  }

  return deps;
}
