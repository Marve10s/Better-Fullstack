import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processI18nTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.i18n || config.i18n === "none") return;

  if (config.i18n === "next-intl") {
    // next-intl templates go into apps/web (Next.js only)
    processTemplatesFromPrefix(
      vfs,
      templates,
      "i18n/next-intl/web/base",
      "apps/web",
      config,
    );
    return;
  }

  if (config.i18n === "i18next") {
    // i18next: check which frontend families are present
    const hasReactWeb = config.frontend.some((f) =>
      ["next", "tanstack-router", "react-router", "tanstack-start", "react-vite"].includes(f),
    );

    // Shared i18next config
    processTemplatesFromPrefix(
      vfs,
      templates,
      "i18n/i18next/web/base",
      "apps/web",
      config,
    );

    // React-specific bindings
    if (hasReactWeb) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "i18n/i18next/web/react",
        "apps/web",
        config,
      );
    }
  }
}
