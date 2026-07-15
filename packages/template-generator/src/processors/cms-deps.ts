import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "../utils/add-deps";
import { getWebPackagePath } from "../utils/project-paths";

const REACT_CMS_FRONTENDS = new Set([
  "tanstack-router",
  "react-router",
  "react-vite",
  "tanstack-start",
  "next",
  "vinext",
]);

export function processCMSDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { cms, frontend, backend, database } = config;
  if (!cms || cms === "none") return;

  const hasNext = frontend.includes("next");
  const webPath = getWebPackagePath(frontend, backend);

  if (cms === "contentful") {
    if (vfs.exists(webPath)) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["contentful"],
      });
    }
    return;
  }

  const hasWebFrontend =
    frontend.includes("next") ||
    frontend.includes("astro") ||
    frontend.includes("nuxt") ||
    frontend.includes("svelte") ||
    frontend.some((f) => REACT_CMS_FRONTENDS.has(f));

  if (cms === "payload") {
    if (!hasNext) return;

    const webPath = "apps/web/package.json";
    if (vfs.exists(webPath)) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: getPayloadDeps(database),
      });
    }
    return;
  }

  if (cms === "keystatic") {
    if (!hasNext) return;

    const webPath = "apps/web/package.json";
    if (!vfs.exists(webPath)) return;

    addPackageDependency({
      vfs,
      packagePath: webPath,
      dependencies: ["@keystatic/core", "@keystatic/next", "@markdoc/markdoc"],
    });
    return;
  }

  if (!hasWebFrontend) return;

  if (!vfs.exists(webPath)) return;

  if (cms === "sanity") {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      dependencies: hasNext
        ? ["sanity", "next-sanity", "@sanity/image-url", "@sanity/vision"]
        : ["sanity", "@sanity/client", "@sanity/image-url"],
    });
  }

  if (cms === "strapi") {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      dependencies: ["@strapi/client", "qs"],
      devDependencies: ["@types/qs"],
    });
  }

  if (cms === "directus") {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      dependencies: ["@directus/sdk"],
    });
  }

  if (cms === "tinacms") {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      dependencies: ["tinacms"],
      devDependencies: ["@tinacms/cli"],
    });

    const pkgJson = vfs.readJson<{
      scripts?: Record<string, string>;
      [key: string]: unknown;
    }>(webPath);
    if (pkgJson?.scripts) {
      const existingDev = pkgJson.scripts.dev;
      if (existingDev) {
        pkgJson.scripts.dev = `tinacms dev -c "${existingDev}"`;
      }

      const existingBuild = pkgJson.scripts.build;
      if (existingBuild) {
        pkgJson.scripts.build = `tinacms build --local --skip-cloud-checks && ${existingBuild}`;
      }

      const existingCheckTypes = pkgJson.scripts["check-types"];
      if (existingCheckTypes) {
        pkgJson.scripts["check-types"] =
          `tinacms build --local --skip-cloud-checks && ${existingCheckTypes}`;
      }

      vfs.writeJson(webPath, pkgJson);
    }

    const gitignorePath = "apps/web/.gitignore";
    if (vfs.exists(gitignorePath)) {
      let gitignoreContent = vfs.readFile(gitignorePath);
      if (gitignoreContent && !gitignoreContent.includes("tina/__generated__")) {
        gitignoreContent += "\ntina/__generated__\npublic/admin\n";
        vfs.writeFile(gitignorePath, gitignoreContent);
      }
    }
  }
}

function getPayloadDeps(database: ProjectConfig["database"]): AvailableDependencies[] {
  const deps: AvailableDependencies[] = [
    "payload",
    "@payloadcms/next",
    "@payloadcms/richtext-lexical",
  ];

  switch (database) {
    case "postgres":
      deps.push("@payloadcms/db-postgres");
      break;
    case "mongodb":
      deps.push("@payloadcms/db-mongodb");
      break;
    default:
      deps.push("@payloadcms/db-sqlite");
      break;
  }

  return deps;
}
