import { isBackendUtilsCompatibleBackend, type ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import { type TemplateData, processSingleTemplate, processTemplatesFromPrefix } from "./utils";

function processDockerComposeTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): void {
  if (config.ecosystem !== "typescript") {
    processSingleTemplate(
      vfs,
      templates,
      "addons/docker-compose/.dockerignore",
      ".dockerignore",
      config,
    );
    processSingleTemplate(
      vfs,
      templates,
      "addons/docker-compose/docker-compose.yml",
      "docker-compose.yml",
      config,
    );
    processSingleTemplate(
      vfs,
      templates,
      `addons/docker-compose/${config.ecosystem}/Dockerfile`,
      "Dockerfile",
      config,
    );
    return;
  }

  // Place docker-compose.yml at project root
  processTemplatesFromPrefix(vfs, templates, "addons/docker-compose", "", config, [
    "addons/docker-compose/apps/server",
    "addons/docker-compose/apps/web",
    "addons/docker-compose/go",
    "addons/docker-compose/java",
    "addons/docker-compose/python",
    "addons/docker-compose/rust",
  ]);

  // Place server Dockerfile if backend exists
  if (config.backend !== "self" && config.backend !== "none") {
    processTemplatesFromPrefix(
      vfs,
      templates,
      "addons/docker-compose/apps/server",
      "apps/server",
      config,
    );
  }

  // Place web Dockerfile based on frontend
  if (config.frontend.includes("next") || config.frontend.includes("vinext")) {
    processSingleTemplate(
      vfs,
      templates,
      "addons/docker-compose/apps/web/.dockerignore",
      "apps/web/.dockerignore",
      config,
    );
    processSingleTemplate(
      vfs,
      templates,
      "addons/docker-compose/apps/web/Dockerfile.next",
      "apps/web/Dockerfile.next",
      config,
    );
  } else if (
    config.frontend.some((f) =>
      ["tanstack-router", "react-router", "react-vite", "solid", "astro"].includes(f),
    )
  ) {
    processSingleTemplate(
      vfs,
      templates,
      "addons/docker-compose/apps/web/.dockerignore",
      "apps/web/.dockerignore",
      config,
    );
    processSingleTemplate(
      vfs,
      templates,
      "addons/docker-compose/apps/web/Dockerfile.vite",
      "apps/web/Dockerfile.vite",
      config,
    );
    processSingleTemplate(
      vfs,
      templates,
      "addons/docker-compose/apps/web/nginx.conf",
      "apps/web/nginx.conf",
      config,
    );
  }
}

function processDevcontainerTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): void {
  processDockerComposeTemplates(vfs, templates, config);
  processTemplatesFromPrefix(vfs, templates, "addons/devcontainer", "", config);
}

export async function processAddonTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.addons || config.addons.length === 0) return;

  for (const addon of config.addons) {
    if (addon === "none") continue;

    // turborepo is handled programmatically by turbo-generator.ts
    if (addon === "turborepo") continue;

    if (addon === "pwa") {
      if (config.frontend.includes("next") || config.frontend.includes("vinext")) {
        processTemplatesFromPrefix(vfs, templates, "addons/pwa/apps/web/next", "apps/web", config);
      } else if (
        config.frontend.some((f) =>
          ["tanstack-router", "react-router", "react-vite", "solid"].includes(f),
        )
      ) {
        processTemplatesFromPrefix(vfs, templates, "addons/pwa/apps/web/vite", "apps/web", config);
      }
      continue;
    }

    // Tauri templates - add src-tauri to web app
    if (addon === "tauri") {
      if (vfs.exists("apps/web/package.json")) {
        processTemplatesFromPrefix(vfs, templates, "addons/tauri/apps/web", "apps/web", config);
      }
      continue;
    }

    // Backend Utils templates - framework-aligned server helpers
    if (addon === "backend-utils") {
      if (
        vfs.exists("apps/server/package.json") &&
        isBackendUtilsCompatibleBackend(config.backend)
      ) {
        processTemplatesFromPrefix(
          vfs,
          templates,
          "addons/backend-utils/apps/server",
          "apps/server",
          config,
        );
      }
      continue;
    }

    // MSW templates - only add to existing packages
    if (addon === "msw") {
      if (vfs.exists("apps/web/package.json")) {
        processTemplatesFromPrefix(vfs, templates, "addons/msw/apps/web", "apps/web", config);
      }
      if (vfs.exists("apps/server/package.json")) {
        processTemplatesFromPrefix(vfs, templates, "addons/msw/apps/server", "apps/server", config);
      }
      continue;
    }

    // Storybook templates - only add to existing web packages
    if (addon === "storybook") {
      if (vfs.exists("apps/web/package.json")) {
        processTemplatesFromPrefix(vfs, templates, "addons/storybook/apps/web", "apps/web", config);
      }
      continue;
    }

    if (addon === "docker-compose") {
      processDockerComposeTemplates(vfs, templates, config);
      continue;
    }

    if (addon === "devcontainer") {
      processDevcontainerTemplates(vfs, templates, config);
      continue;
    }

    processTemplatesFromPrefix(vfs, templates, `addons/${addon}`, "", config);
  }
}
