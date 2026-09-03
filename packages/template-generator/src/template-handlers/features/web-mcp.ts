import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "@/template-handlers/core/utils";

const REACT_FRONTENDS = new Set([
  "tanstack-router",
  "react-router",
  "react-vite",
  "tanstack-start",
  "next",
  "vinext",
]);

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

function mountReact(vfs: VirtualFileSystem, frontend: string) {
  const path =
    frontend === "next" || frontend === "vinext"
      ? "apps/web/src/app/layout.tsx"
      : frontend === "react-router"
        ? "apps/web/src/root.tsx"
        : frontend === "react-vite"
          ? "apps/web/src/app-shell.tsx"
          : "apps/web/src/routes/__root.tsx";
  const source = vfs.readFile(path);
  if (!source || source.includes("<WebMcpTools />")) return;

  let next = `import { WebMcpTools } from "@/lib/webmcp-tools";\n${source}`;
  if (frontend === "react-vite") {
    next = next.replace("<Toaster richColors />", "<WebMcpTools />\n      <Toaster richColors />");
  } else if (["next", "vinext", "react-router", "tanstack-start"].includes(frontend)) {
    next = insertBeforeLast(next, "</body>", "        <WebMcpTools />\n      ");
  } else {
    next = insertBeforeLast(next, "</>", "      <WebMcpTools />\n    ");
  }
  vfs.writeFile(path, next);
}

function mountVue(vfs: VirtualFileSystem, frontend: string) {
  const path = frontend === "nuxt" ? "apps/web/app/app.vue" : "apps/web/src/App.vue";
  const source = vfs.readFile(path);
  if (!source || source.includes("<WebMcpTools />")) return;

  const importStatement = 'import WebMcpTools from "./lib/webmcp-tools.vue";';
  const withImport = source.includes('<script setup lang="ts">')
    ? source.replace('<script setup lang="ts">', `<script setup lang="ts">\n${importStatement}`)
    : `<script setup lang="ts">\n${importStatement}\n</script>\n\n${source}`;
  vfs.writeFile(path, withImport.replace("<template>", "<template>\n  <WebMcpTools />"));
}

function mountSvelte(vfs: VirtualFileSystem) {
  const path = "apps/web/src/routes/+layout.svelte";
  const source = vfs.readFile(path);
  if (!source || source.includes("<WebMcpTools />")) return;
  const withImport = source.replace(
    '<script lang="ts">',
    '<script lang="ts">\n\timport WebMcpTools from "$lib/WebMcpTools.svelte";',
  );
  vfs.writeFile(path, withImport.replace("</script>", "</script>\n\n<WebMcpTools />"));
}

function mountSolid(vfs: VirtualFileSystem, frontend: string) {
  const path =
    frontend === "solid-start" ? "apps/web/src/app.tsx" : "apps/web/src/routes/__root.tsx";
  if (!prependImport(vfs, path, 'import { WebMcpTools } from "@/lib/webmcp-tools";')) return;
  const source = vfs.readFile(path) ?? "";
  const next =
    frontend === "solid-start"
      ? source.replace("<FileRoutes />", "<WebMcpTools />\n      <FileRoutes />")
      : insertBeforeLast(source, "</>", "      <WebMcpTools />\n    ");
  vfs.writeFile(path, next);
}

function mountAstro(vfs: VirtualFileSystem) {
  const path = "apps/web/src/layouts/Layout.astro";
  const source = vfs.readFile(path);
  if (!source || source.includes("<WebMcpTools />")) return;
  const withImport = source.replace(
    "import Header from '@/components/Header.astro';",
    "import Header from '@/components/Header.astro';\nimport WebMcpTools from '@/components/WebMcpTools.astro';",
  );
  vfs.writeFile(path, insertBeforeLast(withImport, "</body>", "\t\t<WebMcpTools />\n\t"));
}

function mountQwik(vfs: VirtualFileSystem) {
  const path = "apps/web/src/root.tsx";
  if (!prependImport(vfs, path, 'import { WebMcpTools } from "./components/webmcp-tools";')) return;
  const source = vfs.readFile(path) ?? "";
  vfs.writeFile(
    path,
    source.replace("<RouterOutlet />", "<WebMcpTools />\n        <RouterOutlet />"),
  );
}

function mountAngular(vfs: VirtualFileSystem) {
  const path = "apps/web/src/app/app.component.ts";
  const source = vfs.readFile(path);
  if (!source || source.includes("registerWebMcpTools")) return;
  const withImports = source
    .replace(
      "import { Component } from '@angular/core';",
      "import { Component, type OnDestroy, type OnInit } from '@angular/core';\nimport { registerWebMcpTools } from '../lib/webmcp';",
    )
    .replace(
      "export class AppComponent {",
      "export class AppComponent implements OnInit, OnDestroy {\n  private unregisterWebMcp = () => {};\n\n  ngOnInit() {\n    this.unregisterWebMcp = registerWebMcpTools();\n  }\n\n  ngOnDestroy() {\n    this.unregisterWebMcp();\n  }\n",
    );
  vfs.writeFile(path, withImports);
}

function mountVanilla(vfs: VirtualFileSystem) {
  const path = "apps/web/src/main.ts";
  const source = vfs.readFile(path);
  if (!source || source.includes("registerWebMcpTools")) return;
  vfs.writeFile(
    path,
    `import { registerWebMcpTools } from "./lib/webmcp";\n${source}\nregisterWebMcpTools();\n`,
  );
}

function mountRedwood(vfs: VirtualFileSystem) {
  const path = "web/src/App.tsx";
  const source = vfs.readFile(path);
  if (!source || source.includes("<WebMcpTools />")) return;
  const withImport = `import { WebMcpTools } from "src/lib/webmcp-tools";\n${source}`;
  vfs.writeFile(
    path,
    withImport.replace(
      '<RedwoodProvider titleTemplate="%PageTitle | %AppTitle">',
      '<RedwoodProvider titleTemplate="%PageTitle | %AppTitle">\n      <WebMcpTools />',
    ),
  );
}

function mountFresh(vfs: VirtualFileSystem) {
  const path = "apps/web/routes/_app.tsx";
  const source = vfs.readFile(path);
  if (!source || source.includes("<WebMcpTools />")) return;
  const withImport = `import WebMcpTools from "../islands/WebMcpTools.tsx";\n${source}`;
  vfs.writeFile(path, withImport.replace("<Header", "<WebMcpTools />\n        <Header"));
}

export async function processWebMcpTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (config.webMcp !== "enabled") return;

  const frontend = config.frontend.find(
    (entry) => entry !== "none" && !entry.startsWith("native-"),
  );
  if (!frontend) return;

  const target =
    frontend === "redwood"
      ? "web/src"
      : frontend === "fresh"
        ? "apps/web"
        : frontend === "nuxt"
          ? "apps/web/app"
          : "apps/web/src";
  processTemplatesFromPrefix(vfs, templates, "web-mcp/enabled/web/base", target, config);

  if (REACT_FRONTENDS.has(frontend)) {
    processTemplatesFromPrefix(vfs, templates, "web-mcp/enabled/web/react", target, config);
    mountReact(vfs, frontend);
  } else if (frontend === "vue" || frontend === "nuxt") {
    processTemplatesFromPrefix(vfs, templates, "web-mcp/enabled/web/vue", target, config);
    mountVue(vfs, frontend);
  } else if (frontend === "svelte") {
    processTemplatesFromPrefix(vfs, templates, "web-mcp/enabled/web/svelte", target, config);
    mountSvelte(vfs);
  } else if (frontend === "solid" || frontend === "solid-start") {
    processTemplatesFromPrefix(vfs, templates, "web-mcp/enabled/web/solid", target, config);
    mountSolid(vfs, frontend);
  } else if (frontend === "astro") {
    processTemplatesFromPrefix(vfs, templates, "web-mcp/enabled/web/astro", target, config);
    mountAstro(vfs);
  } else if (frontend === "qwik") {
    processTemplatesFromPrefix(vfs, templates, "web-mcp/enabled/web/qwik", target, config);
    mountQwik(vfs);
  } else if (frontend === "angular") {
    mountAngular(vfs);
  } else if (frontend === "vanilla-vite") {
    mountVanilla(vfs);
  } else if (frontend === "redwood") {
    processTemplatesFromPrefix(vfs, templates, "web-mcp/enabled/web/react", target, config);
    mountRedwood(vfs);
  } else if (frontend === "fresh") {
    processTemplatesFromPrefix(vfs, templates, "web-mcp/enabled/web/fresh", target, config);
    mountFresh(vfs);
  }
}
