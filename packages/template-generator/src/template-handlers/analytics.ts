import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

const REACT_FRONTENDS = new Set([
  "tanstack-router",
  "react-router",
  "react-vite",
  "tanstack-start",
  "next",
]);

const SVELTE_FRONTENDS = new Set(["svelte"]);
const VUE_FRONTENDS = new Set(["nuxt"]);
const SOLID_FRONTENDS = new Set(["solid", "solid-start"]);

function getAnalyticsTemplateVariant(frontend: readonly string[]): string | null {
  if (frontend.some((f) => REACT_FRONTENDS.has(f))) return "react";
  if (frontend.some((f) => SVELTE_FRONTENDS.has(f))) return "svelte";
  if (frontend.some((f) => VUE_FRONTENDS.has(f))) return "vue";
  if (frontend.some((f) => SOLID_FRONTENDS.has(f))) return "solid";
  return null;
}

export async function processAnalyticsTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.analytics || config.analytics === "none") return;

  const variant = getAnalyticsTemplateVariant(config.frontend);
  if (!variant) return;

  processTemplatesFromPrefix(
    vfs,
    templates,
    `analytics/${config.analytics}/web/${variant}`,
    "apps/web",
    config,
  );
}
