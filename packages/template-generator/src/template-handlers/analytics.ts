import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { getWebPackagePath } from "../utils/project-paths";
import { type TemplateData, processTemplatesFromPrefix } from "./utils";

const REACT_FRONTENDS = new Set([
  "tanstack-router",
  "react-router",
  "react-vite",
  "tanstack-start",
  "next",
  "vinext",
]);

const SVELTE_FRONTENDS = new Set(["svelte"]);
const VUE_FRONTENDS = new Set(["vue"]);
const NUXT_FRONTENDS = new Set(["nuxt"]);
const SOLID_FRONTENDS = new Set(["solid", "solid-start"]);
const ASTRO_FRONTENDS = new Set(["astro"]);

function getAnalyticsTemplateVariant(frontend: readonly string[]): string | null {
  if (frontend.some((f) => REACT_FRONTENDS.has(f))) return "react";
  if (frontend.some((f) => SVELTE_FRONTENDS.has(f))) return "svelte";
  if (frontend.some((f) => VUE_FRONTENDS.has(f))) return "vue";
  if (frontend.some((f) => NUXT_FRONTENDS.has(f))) return "nuxt";
  if (frontend.some((f) => SOLID_FRONTENDS.has(f))) return "solid";
  if (frontend.some((f) => ASTRO_FRONTENDS.has(f))) return "astro";
  return null;
}

function prependImport(vfs: VirtualFileSystem, path: string, statement: string) {
  const source = vfs.readFile(path);
  if (!source || source.includes(statement)) return false;
  vfs.writeFile(path, `${statement}\n${source}`);
  return true;
}

function insertBeforeLast(source: string, marker: string, content: string) {
  const index = source.lastIndexOf(marker);
  if (index === -1) return source;
  return `${source.slice(0, index)}${content}${source.slice(index)}`;
}

function mountReactAnalytics(vfs: VirtualFileSystem, frontend: string) {
  const path =
    frontend === "next" || frontend === "vinext"
      ? "apps/web/src/app/layout.tsx"
      : frontend === "react-router"
        ? "apps/web/src/root.tsx"
        : frontend === "react-vite"
          ? "apps/web/src/app-shell.tsx"
          : "apps/web/src/routes/__root.tsx";
  const source = vfs.readFile(path);
  if (!source || source.includes("<Analytics />")) return;

  let next = `import { Analytics } from "@/lib/vercel-analytics";\n${source}`;
  if (
    frontend === "next" ||
    frontend === "vinext" ||
    frontend === "react-router" ||
    frontend === "tanstack-start"
  ) {
    next = insertBeforeLast(next, "</body>", "        <Analytics />\n      ");
  } else if (frontend === "react-vite") {
    next = next.replace(
      "      <Toaster richColors />",
      "      <Toaster richColors />\n      <Analytics />",
    );
  } else {
    next = insertBeforeLast(next, "</>", "      <Analytics />\n    ");
  }
  vfs.writeFile(path, next);
}

function mountVueAnalytics(vfs: VirtualFileSystem, frontend: string) {
  const path = frontend === "nuxt" ? "apps/web/app/app.vue" : "apps/web/src/App.vue";
  const source = vfs.readFile(path);
  if (!source || source.includes("<Analytics />")) return;
  const importStatement = 'import { Analytics } from "./lib/vercel-analytics";';
  const withImport = source.includes('<script setup lang="ts">')
    ? source.replace('<script setup lang="ts">', `<script setup lang="ts">\n${importStatement}`)
    : `<script setup lang="ts">\n${importStatement}\n</script>\n\n${source}`;
  vfs.writeFile(path, withImport.replace("<template>", "<template>\n  <Analytics />"));
}

function mountVercelAnalytics(vfs: VirtualFileSystem, frontend: string) {
  if (REACT_FRONTENDS.has(frontend)) {
    mountReactAnalytics(vfs, frontend);
    return;
  }
  if (VUE_FRONTENDS.has(frontend) || NUXT_FRONTENDS.has(frontend)) {
    mountVueAnalytics(vfs, frontend);
    return;
  }
  if (SVELTE_FRONTENDS.has(frontend)) {
    const path = "apps/web/src/routes/+layout.svelte";
    const source = vfs.readFile(path);
    if (source && !source.includes("$lib/vercel-analytics")) {
      vfs.writeFile(
        path,
        source.replace(
          '<script lang="ts">',
          '<script lang="ts">\n\timport "$lib/vercel-analytics";',
        ),
      );
    }
    return;
  }
  if (SOLID_FRONTENDS.has(frontend)) {
    const path =
      frontend === "solid-start" ? "apps/web/src/app.tsx" : "apps/web/src/routes/__root.tsx";
    if (
      prependImport(vfs, path, 'import { startVercelAnalytics } from "@/lib/vercel-analytics";')
    ) {
      const source = vfs.readFile(path) ?? "";
      const marker =
        frontend === "solid-start"
          ? "export default function App() {"
          : "function RootComponent() {";
      vfs.writeFile(path, source.replace(marker, `${marker}\n  startVercelAnalytics();`));
    }
    return;
  }
  if (ASTRO_FRONTENDS.has(frontend)) {
    const path = "apps/web/src/layouts/Layout.astro";
    const source = vfs.readFile(path);
    if (!source || source.includes("<VercelAnalytics />")) return;
    const withImport = source.replace(
      "import Header from '@/components/Header.astro';",
      "import Header from '@/components/Header.astro';\nimport VercelAnalytics from '@/components/vercel-analytics.astro';",
    );
    vfs.writeFile(path, insertBeforeLast(withImport, "</body>", "\t\t<VercelAnalytics />\n\t"));
  }
}

export async function processAnalyticsTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.analytics || config.analytics === "none") return;

  if (config.analytics === "ga4") {
    const webPackagePath = getWebPackagePath(config.frontend, config.backend);
    if (vfs.exists(webPackagePath)) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "analytics/ga4/web/base",
        webPackagePath.replace(/\/package\.json$/, ""),
        config,
      );
    }
    return;
  }

  const variant = getAnalyticsTemplateVariant(config.frontend);
  if (!variant) return;

  const targetPath =
    config.analytics === "vercel-analytics" && config.frontend.includes("nuxt")
      ? "apps/web/app"
      : "apps/web";
  processTemplatesFromPrefix(
    vfs,
    templates,
    `analytics/${config.analytics}/web/${variant}`,
    targetPath,
    config,
  );

  if (config.analytics === "vercel-analytics") {
    const frontend = config.frontend.find(
      (entry) => entry !== "none" && !entry.startsWith("native-"),
    );
    if (frontend) mountVercelAnalytics(vfs, frontend);
  }
}
