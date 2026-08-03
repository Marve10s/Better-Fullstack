import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processPaymentsTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.payments || config.payments === "none") return;

  const hasReactWeb = config.frontend.some((f) =>
    ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next", "vinext"].includes(
      f,
    ),
  );
  const hasNuxtWeb = config.frontend.includes("nuxt");
  const hasSvelteWeb = config.frontend.includes("svelte");
  const hasSolidWeb = config.frontend.includes("solid");
  const hasSolidStartWeb = config.frontend.includes("solid-start");

  const nativeVariant = config.frontend.includes("native-bare")
    ? "bare"
    : config.frontend.includes("native-uniwind")
      ? "uniwind"
      : config.frontend.includes("native-unistyles")
        ? "unistyles"
        : null;

  if (config.payments === "xendit") {
    if (config.backend !== "none" && config.backend !== "convex") {
      const serverDir = config.backend === "self" ? "apps/web" : "apps/server";
      processTemplatesFromPrefix(vfs, templates, "payments/xendit/server/base", serverDir, config);
    }
    return;
  }

  if (config.payments === "paypal") {
    if (config.backend !== "none" && config.backend !== "convex") {
      const serverDir = config.backend === "self" ? "apps/web" : "apps/server";
      processTemplatesFromPrefix(vfs, templates, "payments/paypal/server/base", serverDir, config);
    }
    if (vfs.exists("apps/web/package.json")) {
      processTemplatesFromPrefix(vfs, templates, "payments/paypal/web/base", "apps/web", config);
    }
    return;
  }

  if (config.backend === "convex") {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `payments/${config.payments}/convex/backend`,
      "packages/backend",
      config,
    );

    if (config.payments === "revenuecat" && config.auth !== "better-auth") {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "payments/revenuecat/convex/no-better-auth",
        "packages/backend",
        config,
      );
    }
  } else if (config.backend !== "none") {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `payments/${config.payments}/server/base`,
      "packages/auth",
      config,
    );
  }

  if (nativeVariant) {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `payments/${config.payments}/native/base`,
      "apps/native",
      config,
    );
    processTemplatesFromPrefix(
      vfs,
      templates,
      `payments/${config.payments}/native/${nativeVariant}`,
      "apps/native",
      config,
    );
  }

  if (hasReactWeb) {
    const reactFramework = config.frontend.includes("react-vite")
      ? "react-router"
      : config.frontend.find((f) =>
          ["tanstack-router", "react-router", "tanstack-start", "next", "vinext"].includes(f),
        );
    if (reactFramework) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        `payments/${config.payments}/web/react/${reactFramework}`,
        "apps/web",
        config,
      );
      if (config.backend === "convex") {
        processTemplatesFromPrefix(
          vfs,
          templates,
          `payments/${config.payments}/convex/web/react/${reactFramework}`,
          "apps/web",
          config,
        );
      }
    }
  } else if (hasNuxtWeb) {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `payments/${config.payments}/web/nuxt`,
      "apps/web",
      config,
    );
  } else if (hasSvelteWeb) {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `payments/${config.payments}/web/svelte`,
      "apps/web",
      config,
    );
  } else if (hasSolidWeb || hasSolidStartWeb) {
    const solidFramework = hasSolidStartWeb ? "solid-start" : "solid";
    processTemplatesFromPrefix(
      vfs,
      templates,
      `payments/${config.payments}/web/${solidFramework}`,
      "apps/web",
      config,
    );
  }
}
