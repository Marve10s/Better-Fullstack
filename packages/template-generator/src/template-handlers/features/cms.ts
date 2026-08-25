import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";
import { getWebPackagePath } from "@/platform/project-paths";

import { type TemplateData, processTemplatesFromPrefix } from "@/template-handlers/core/utils";

const REACT_FRONTENDS = new Set([
  "tanstack-router",
  "react-router",
  "react-vite",
  "tanstack-start",
  "next",
  "vinext",
]);

function getCMSVariant(frontend: readonly string[]): string | null {
  if (frontend.includes("next")) return "next";
  if (frontend.includes("astro")) return "astro";
  if (frontend.includes("nuxt")) return "nuxt";
  if (frontend.includes("svelte")) return "svelte";
  if (frontend.some((f) => REACT_FRONTENDS.has(f))) return "react";
  return null;
}

export async function processCMSTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.cms || config.cms === "none") return;

  if (config.cms === "payload") {
    if (config.frontend.includes("next")) {
      const nextFramework = "next";
      processTemplatesFromPrefix(vfs, templates, `cms/payload/web/${nextFramework}`, "apps/web", config);
    }
    return;
  }

  if (config.cms === "keystatic") {
    if (config.frontend.includes("next")) {
      processTemplatesFromPrefix(vfs, templates, "cms/keystatic/web/next", "apps/web", config);
    }
    return;
  }

  if (config.cms === "contentful") {
    const webPackagePath = getWebPackagePath(config.frontend, config.backend);
    if (vfs.exists(webPackagePath)) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "cms/contentful/web/base",
        webPackagePath.replace(/\/package\.json$/, ""),
        config,
      );
    }
    return;
  }

  const variant = getCMSVariant(config.frontend);
  if (!variant) return;

  processTemplatesFromPrefix(vfs, templates, `cms/${config.cms}/web/${variant}`, "apps/web", config);
}
