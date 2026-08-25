import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "@/template-handlers/core/utils";

export async function processFrontendTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  const hasReactWeb = config.frontend.some((f) =>
    ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next", "vinext"].includes(
      f,
    ),
  );
  const hasVanillaViteWeb = config.frontend.includes("vanilla-vite");
  const hasVueWeb = config.frontend.includes("vue");
  const hasNuxtWeb = config.frontend.includes("nuxt");
  const hasSvelteWeb = config.frontend.includes("svelte");
  const hasSolidWeb = config.frontend.includes("solid");
  const hasSolidStartWeb = config.frontend.includes("solid-start");
  const hasAstroWeb = config.frontend.includes("astro");
  const hasQwikWeb = config.frontend.includes("qwik");
  const hasAngularWeb = config.frontend.includes("angular");
  const hasRedwoodWeb = config.frontend.includes("redwood");
  const hasFreshWeb = config.frontend.includes("fresh");
  const hasNativeBare = config.frontend.includes("native-bare");
  const hasNativeUniwind = config.frontend.includes("native-uniwind");
  const hasUnistyles = config.frontend.includes("native-unistyles");
  const isConvex = config.backend === "convex";

  if (
    hasReactWeb ||
    hasVanillaViteWeb ||
    hasVueWeb ||
    hasNuxtWeb ||
    hasSvelteWeb ||
    hasSolidWeb ||
    hasSolidStartWeb ||
    hasAstroWeb ||
    hasQwikWeb ||
    hasAngularWeb ||
    hasRedwoodWeb ||
    hasFreshWeb
  ) {
    if (hasReactWeb) {
      processTemplatesFromPrefix(vfs, templates, "frontend/react/web-base", "apps/web", config);

      const reactFramework = config.frontend.find((f) =>
        [
          "tanstack-router",
          "react-router",
          "react-vite",
          "tanstack-start",
          "next",
          "vinext",
        ].includes(f),
      );
      if (reactFramework) {
        processTemplatesFromPrefix(
          vfs,
          templates,
          `frontend/react/${reactFramework}`,
          "apps/web",
          config,
        );
      }
    } else if (hasVanillaViteWeb) {
      processTemplatesFromPrefix(vfs, templates, "frontend/vanilla-vite", "apps/web", config);
    } else if (hasVueWeb) {
      processTemplatesFromPrefix(vfs, templates, "frontend/vue", "apps/web", config);
    } else if (hasNuxtWeb) {
      processTemplatesFromPrefix(vfs, templates, "frontend/nuxt", "apps/web", config);
    } else if (hasSvelteWeb) {
      processTemplatesFromPrefix(vfs, templates, "frontend/svelte", "apps/web", config);
    } else if (hasSolidWeb) {
      processTemplatesFromPrefix(vfs, templates, "frontend/solid", "apps/web", config);
    } else if (hasSolidStartWeb) {
      processTemplatesFromPrefix(vfs, templates, "frontend/solid-start", "apps/web", config);
    } else if (hasAstroWeb) {
      // Process base Astro templates (excluding integrations subfolder)
      processTemplatesFromPrefix(vfs, templates, "frontend/astro", "apps/web", config, [
        "frontend/astro/integrations",
      ]);

      // Process integration-specific templates (React, Vue, Svelte, Solid)
      if (config.astroIntegration && config.astroIntegration !== "none") {
        processTemplatesFromPrefix(
          vfs,
          templates,
          `frontend/astro/integrations/${config.astroIntegration}`,
          "apps/web",
          config,
        );
      }
    } else if (hasQwikWeb) {
      processTemplatesFromPrefix(vfs, templates, "frontend/qwik", "apps/web", config);
    } else if (hasAngularWeb) {
      processTemplatesFromPrefix(vfs, templates, "frontend/angular", "apps/web", config);
    } else if (hasRedwoodWeb) {
      // RedwoodJS has its own monorepo structure at the root level
      processTemplatesFromPrefix(vfs, templates, "frontend/redwood", ".", config);
    } else if (hasFreshWeb) {
      // Fresh (Deno) outputs to apps/web like other frameworks
      processTemplatesFromPrefix(vfs, templates, "frontend/fresh-root", ".", config);
      processTemplatesFromPrefix(vfs, templates, "frontend/fresh", "apps/web", config);
    }
  }

  if (hasNativeBare || hasNativeUniwind || hasUnistyles) {
    processTemplatesFromPrefix(vfs, templates, "frontend/native/base", "apps/native", config);

    if (hasNativeBare) {
      processTemplatesFromPrefix(vfs, templates, "frontend/native/bare", "apps/native", config);
    } else if (hasNativeUniwind) {
      processTemplatesFromPrefix(vfs, templates, "frontend/native/uniwind", "apps/native", config);
    } else if (hasUnistyles) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "frontend/native/unistyles",
        "apps/native",
        config,
      );
    }

    if (!isConvex && (config.api === "trpc" || config.api === "orpc" || config.api === "ts-rest")) {
      processTemplatesFromPrefix(vfs, templates, `api/${config.api}/native`, "apps/native", config);
    }
  }
}

/** Render graph-native frontends and mobile apps that do not use the TypeScript base. */
export async function processGraphNativeAppTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  const selectedParts = (config.stackParts ?? []).filter(
    (part) => !part.ownerPartId && part.source !== "provided",
  );
  const dotnetFrontends = selectedParts.filter(
    (part) => part.role === "frontend" && part.ecosystem === "dotnet",
  );
  const kotlinMobiles = selectedParts.filter(
    (part) => part.role === "mobile" && part.ecosystem === "kotlin",
  );
  const swiftMobiles = selectedParts.filter(
    (part) => part.role === "mobile" && part.ecosystem === "swift",
  );
  const dartMobiles = selectedParts.filter(
    (part) => part.role === "mobile" && part.ecosystem === "dart",
  );

  for (const frontend of dotnetFrontends) {
    if (frontend.toolId !== "blazor-webassembly" && frontend.toolId !== "blazor-web-app") continue;
    processTemplatesFromPrefix(
      vfs,
      templates,
      `frontend/dotnet/${frontend.toolId}`,
      frontend.targetPath ?? "apps/web",
      config,
    );
  }

  for (const mobile of kotlinMobiles) {
    if (mobile.toolId !== "jetpack-compose" && mobile.toolId !== "compose-multiplatform") continue;
    const targetPath = mobile.targetPath ?? "apps/mobile";
    const mobileConfig: ProjectConfig = {
      ...config,
      kotlinMobile: mobile.toolId as ProjectConfig["kotlinMobile"],
      kotlinMobileLibraries: (config.stackParts ?? [])
        .filter(
          (part) =>
            part.ownerPartId === mobile.id &&
            part.role === "libraries" &&
            part.ecosystem === "kotlin" &&
            part.toolId !== "none",
        )
        .map((part) => part.toolId) as NonNullable<ProjectConfig["kotlinMobileLibraries"]>,
    };
    processTemplatesFromPrefix(
      vfs,
      templates,
      `frontend/kotlin/${mobile.toolId}`,
      targetPath,
      mobileConfig,
    );
    // Reuse the repository's maintained Gradle wrapper rather than carrying a
    // second binary copy for Kotlin projects.
    for (const relativePath of [
      "gradlew",
      "gradlew.bat",
      "gradle/wrapper/gradle-wrapper.jar",
      "gradle/wrapper/gradle-wrapper.properties",
    ]) {
      const sourcePath = `java-base/${relativePath}`;
      const content = templates.get(sourcePath);
      if (content === undefined) continue;
      const binarySource = relativePath.endsWith(".jar") ? sourcePath : undefined;
      vfs.writeFile(
        `${targetPath}/${relativePath}`,
        binarySource ? "[Binary file]" : content,
        binarySource,
      );
    }
  }

  for (const mobile of swiftMobiles) {
    if (mobile.toolId !== "swiftui") continue;
    processTemplatesFromPrefix(
      vfs,
      templates,
      "frontend/swift/swiftui",
      mobile.targetPath ?? "apps/mobile",
      config,
    );
  }

  for (const mobile of dartMobiles) {
    if (mobile.toolId !== "flutter") continue;
    processTemplatesFromPrefix(
      vfs,
      templates,
      "frontend/dart/flutter",
      mobile.targetPath ?? "apps/mobile",
      config,
    );
  }
}
