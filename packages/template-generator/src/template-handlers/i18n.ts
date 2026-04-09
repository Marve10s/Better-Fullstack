import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processI18nTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.i18n || config.i18n === "none") return;

  // i18n is frontend-only, works with any frontend
  const hasWebFrontend = config.frontend.some((f) => f !== "none");
  if (!hasWebFrontend) return;

  // Process web-side i18n templates
  processTemplatesFromPrefix(
    vfs,
    templates,
    `i18n/${config.i18n}/web/base`,
    "apps/web",
    config,
  );

  // Process framework-specific templates if they exist
  const hasNext = config.frontend.includes("next");
  if (hasNext) {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `i18n/${config.i18n}/web/next`,
      "apps/web",
      config,
    );
  }

  const hasReact = config.frontend.some((f) =>
    ["tanstack-router", "react-router", "tanstack-start", "react-vite"].includes(f),
  );
  if (hasReact) {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `i18n/${config.i18n}/web/react`,
      "apps/web",
      config,
    );
  }
}
