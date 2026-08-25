import { type ProjectConfig, isVercelAnalyticsFrontend } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { addPackageDependency } from "@/dependencies/add-deps";
import { getWebPackagePath } from "@/platform/project-paths";

export function processAnalyticsDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { analytics, frontend, backend } = config;
  if (!analytics || analytics === "none") return;

  // Check if we have a web frontend
  const hasWebFrontend = frontend.some(
    (f) =>
      f !== "none" && f !== "native-bare" && f !== "native-uniwind" && f !== "native-unistyles",
  );

  if (analytics === "plausible") {
    // Plausible is client-side only - add to web app
    if (hasWebFrontend) {
      const webPath = getWebPackagePath(frontend, backend);
      if (vfs.exists(webPath)) {
        addPackageDependency({
          vfs,
          packagePath: webPath,
          dependencies: ["plausible-tracker"],
        });
      }
    }
  }

  if (analytics === "posthog") {
    // PostHog is client-side - add posthog-js to the web app
    if (hasWebFrontend) {
      const webPath = getWebPackagePath(frontend, backend);
      if (vfs.exists(webPath)) {
        addPackageDependency({
          vfs,
          packagePath: webPath,
          dependencies: ["posthog-js"],
        });
      }
    }
  }

  if (
    analytics === "vercel-analytics" &&
    frontend.some((candidate) => isVercelAnalyticsFrontend(candidate))
  ) {
    const webPath = getWebPackagePath(frontend, backend);
    if (vfs.exists(webPath)) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["@vercel/analytics"],
      });
    }
  }

  // Umami uses a script tag approach - no npm dependencies needed
  // The umami.tsx template handles loading the script dynamically
}
