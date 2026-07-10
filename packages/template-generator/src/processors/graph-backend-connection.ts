import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import { getGraphBackendConnection, hasWebFrontend } from "../utils/graph-backend";

/**
 * Pins the non-TypeScript backend's CORS to the web frontend's dev origin by
 * writing CORS_ORIGIN into the backend .env/.env.example. The backend templates
 * fall back to permissive CORS when the variable is unset, so solo-mode
 * (backend-only) scaffolds are unaffected.
 */
export function processGraphBackendEnv(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const connection = getGraphBackendConnection(config);
  if (!connection?.webOrigin || !vfs.directoryExists(connection.targetPath)) return;

  const line = `CORS_ORIGIN=${connection.webOrigin}`;
  for (const file of [".env", ".env.example"]) {
    const path = `${connection.targetPath}/${file}`;
    const current = vfs.exists(path) ? (vfs.readFile(path) ?? "") : "";
    let next: string;
    if (/^CORS_ORIGIN=.*$/m.test(current)) {
      next = current.replace(/^CORS_ORIGIN=.*$/m, line);
    } else {
      const separator = current.length > 0 && !current.endsWith("\n") ? "\n" : "";
      const comment = "# Web frontend dev origin (unset or empty = allow any origin)\n";
      next = `${current}${separator}${current.length > 0 ? "\n" : ""}${comment}${line}\n`;
    }
    vfs.writeFile(path, next);
  }
}

export function processGraphBackendConnection(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const connection = getGraphBackendConnection(config);
  if (!connection || !hasWebFrontend(config)) return;

  const frontend = config.frontend.find((entry) => entry !== "none" && !entry.startsWith("native-"));
  if (!frontend) return;

  const graphDocPath =
    frontend === "redwood" && vfs.directoryExists("web")
      ? "GRAPH_BACKEND.md"
      : "apps/web/GRAPH_BACKEND.md";
  if (!vfs.directoryExists("apps/web") && !(frontend === "redwood" && vfs.directoryExists("web"))) {
    return;
  }

  vfs.writeFile(
    graphDocPath,
    `# Graph Backend Connection

This frontend was generated with a ${connection.label} backend.

- Backend directory: \`${connection.targetPath}\`
- Base URL: \`${connection.serverUrl}\`
- Health URL: \`${connection.healthUrl}\`
- Start command: \`${connection.devCommand}\`

The frontend environment file contains the matching public server URL. Keep that value aligned if you change the backend port.
`,
  );

  if (
    [
      "next",
      "vinext",
      "tanstack-router",
      "tanstack-start",
      "react-router",
      "react-vite",
    ].includes(frontend)
  ) {
    writeReactStatus(vfs, frontend, connection.serverUrl, connection.healthPath);
  } else if (frontend === "astro") {
    writeAstroStatus(vfs, connection.serverUrl, connection.healthPath);
  } else if (frontend === "svelte") {
    writeSvelteStatus(vfs, connection.serverUrl, connection.healthPath);
  } else if (frontend === "nuxt") {
    writeNuxtStatus(vfs, connection.serverUrl, connection.healthPath);
  } else if (frontend === "solid" || frontend === "solid-start") {
    writeSolidStatus(vfs, connection.serverUrl, connection.healthPath);
  } else if (frontend === "fresh") {
    writeFreshStatus(vfs, connection.serverUrl, connection.healthPath);
  } else if (frontend === "angular") {
    writeAngularStatus(vfs, connection.serverUrl, connection.healthPath);
  } else if (frontend === "qwik") {
    writeQwikStatus(vfs, connection.serverUrl, connection.healthPath);
  } else if (frontend === "redwood") {
    writeRedwoodStatus(vfs, connection.serverUrl, connection.healthPath);
  }
}

function viteServerUrlExpression(serverUrl: string): string {
  return `(import.meta.env.VITE_SERVER_URL ?? "${serverUrl}")`;
}

function graphHealthUrlExpression(serverUrlExpression: string, healthPath: string): string {
  return `\`${"${"}${serverUrlExpression}${"}"}${healthPath}\``;
}

function writeReactStatus(
  vfs: VirtualFileSystem,
  frontend: string,
  serverUrl: string,
  healthPath: string,
): void {
  const serverUrlExpression =
    frontend === "next"
      ? `(process.env.NEXT_PUBLIC_SERVER_URL ?? "${serverUrl}")`
      : viteServerUrlExpression(serverUrl);
  const healthUrlExpression = graphHealthUrlExpression(serverUrlExpression, healthPath);

  vfs.writeFile(
    "apps/web/src/components/graph-backend-status.tsx",
    `"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "connected" | "disconnected";

export function GraphBackendStatus() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let active = true;
    fetch(${healthUrlExpression})
      .then((response) => {
        if (active) setStatus(response.ok ? "connected" : "disconnected");
      })
      .catch(() => {
        if (active) setStatus("disconnected");
      });
    return () => {
      active = false;
    };
  }, []);

  const isConnected = status === "connected";
  const isChecking = status === "checking";

  return (
    <div className="flex items-center gap-2">
      <div
        className={\`h-2 w-2 rounded-full $\{
          isChecking ? "bg-orange-400" : isConnected ? "bg-green-500" : "bg-red-500"
        }\`}
      />
      <span className="text-sm text-muted-foreground">
        {isChecking ? "Checking..." : isConnected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
}
`,
  );

  const pagePaths = [
    "apps/web/src/app/page.tsx",
    "apps/web/src/routes/index.tsx",
    "apps/web/src/routes/_index.tsx",
    "apps/web/src/routes/home.tsx",
  ];

  for (const path of pagePaths) {
    const content = vfs.readFile(path);
    if (!content || content.includes("GraphBackendStatus")) continue;

    const withImport = content.startsWith('"use client"')
      ? content.replace('"use client"\n', '"use client"\nimport { GraphBackendStatus } from "@/components/graph-backend-status";\n')
      : `import { GraphBackendStatus } from "@/components/graph-backend-status";\n${content}`;

    const updated = withImport.includes('<h2 className="mb-2 font-medium">API Status</h2>')
      ? withImport.replace(
          '<h2 className="mb-2 font-medium">API Status</h2>',
          '<h2 className="mb-2 font-medium">API Status</h2>\n          <GraphBackendStatus />',
        )
      : withImport;
    vfs.writeFile(path, updated);
  }
}

function writeAstroStatus(vfs: VirtualFileSystem, serverUrl: string, healthPath: string): void {
  const healthUrlExpression = graphHealthUrlExpression(
    `(import.meta.env.PUBLIC_SERVER_URL ?? "${serverUrl}")`,
    healthPath,
  );

  vfs.writeFile(
    "apps/web/src/components/GraphBackendStatus.astro",
    `<section class="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
  <h2 class="mb-4 text-xl font-semibold">Backend Status</h2>
  <div id="graph-backend-status" class="flex items-center gap-2 text-sm text-muted-foreground">
    <span class="h-2 w-2 rounded-full bg-orange-400"></span>
    <span>Checking...</span>
  </div>
</section>

<script>
  const status = document.getElementById("graph-backend-status");
  fetch(${healthUrlExpression})
    .then((response) => {
      if (!status) return;
      status.innerHTML = response.ok
        ? '<span class="h-2 w-2 rounded-full bg-green-500"></span><span>Connected</span>'
        : '<span class="h-2 w-2 rounded-full bg-red-500"></span><span>Disconnected</span>';
    })
    .catch(() => {
      if (!status) return;
      status.innerHTML = '<span class="h-2 w-2 rounded-full bg-red-500"></span><span>Disconnected</span>';
    });
</script>
`,
  );

  const path = "apps/web/src/pages/index.astro";
  const content = vfs.readFile(path);
  if (!content || content.includes("GraphBackendStatus")) return;
  const withImport = content.replace(
    "import Layout from '@/layouts/Layout.astro';",
    "import Layout from '@/layouts/Layout.astro';\nimport GraphBackendStatus from '@/components/GraphBackendStatus.astro';",
  );
  const updated = withImport.replace(
    '\n\t\t<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">',
    '\n\t\t<GraphBackendStatus />\n\n\t\t<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">',
  );
  vfs.writeFile(path, updated);
}

function writeSvelteStatus(vfs: VirtualFileSystem, serverUrl: string, healthPath: string): void {
  const healthUrlExpression = graphHealthUrlExpression(
    `(PUBLIC_SERVER_URL || "${serverUrl}")`,
    healthPath,
  );

  vfs.writeFile(
    "apps/web/src/components/GraphBackendStatus.svelte",
    `<script lang="ts">
  import { PUBLIC_SERVER_URL } from "$env/static/public";
  import { onMount } from "svelte";

  let status: "checking" | "connected" | "disconnected" = "checking";

  onMount(() => {
    fetch(${healthUrlExpression})
      .then((response) => {
        status = response.ok ? "connected" : "disconnected";
      })
      .catch(() => {
        status = "disconnected";
      });
  });
</script>

<section class="rounded-lg border p-4">
  <h2 class="mb-2 font-medium">Backend Status</h2>
  <div class="flex items-center gap-2">
    <div class="h-2 w-2 rounded-full {status === 'checking' ? 'bg-orange-400' : status === 'connected' ? 'bg-green-500' : 'bg-red-500'}"></div>
    <span class="text-muted-foreground text-sm">
      {status === "checking" ? "Checking..." : status === "connected" ? "Connected" : "Disconnected"}
    </span>
  </div>
</section>
`,
  );

  const path = "apps/web/src/routes/+page.svelte";
  const content = vfs.readFile(path);
  if (!content || content.includes("GraphBackendStatus")) return;
  const withImport = content.replace(
    '<script lang="ts">',
    '<script lang="ts">\nimport GraphBackendStatus from "../components/GraphBackendStatus.svelte";',
  );
  const updated = withImport.replace(
    '\t</div>\n</div>',
    '\t\t<GraphBackendStatus />\n\t</div>\n</div>',
  );
  vfs.writeFile(path, updated);
}

function writeNuxtStatus(vfs: VirtualFileSystem, serverUrl: string, healthPath: string): void {
  const healthUrlExpression = graphHealthUrlExpression("(serverUrl || \"" + serverUrl + "\")", healthPath);

  vfs.writeFile(
    "apps/web/app/components/GraphBackendStatus.vue",
    `<script setup lang="ts">
import { onMounted, ref } from "vue";

const status = ref<"checking" | "connected" | "disconnected">("checking");
const config = useRuntimeConfig();
const serverUrl = config.public.serverUrl;

onMounted(() => {
  fetch(${healthUrlExpression})
    .then((response) => {
      status.value = response.ok ? "connected" : "disconnected";
    })
    .catch(() => {
      status.value = "disconnected";
    });
});
</script>

<template>
  <UCard>
    <template #header>
      <div class="font-medium">Backend Status</div>
    </template>
    <div class="flex items-center gap-2">
      <span
        class="h-2 w-2 rounded-full"
        :class="status === 'checking' ? 'bg-orange-400' : status === 'connected' ? 'bg-green-500' : 'bg-red-500'"
      />
      <span class="text-sm">
        {{ status === "checking" ? "Checking..." : status === "connected" ? "Connected" : "Disconnected" }}
      </span>
    </div>
  </UCard>
</template>
`,
  );

  const path = "apps/web/app/pages/index.vue";
  const content = vfs.readFile(path);
  if (!content || content.includes("GraphBackendStatus")) return;
  const updated = content.replace("      </UCard>", "      </UCard>\n      <GraphBackendStatus />");
  vfs.writeFile(path, updated);
}

function writeSolidStatus(vfs: VirtualFileSystem, serverUrl: string, healthPath: string): void {
  const healthUrlExpression = graphHealthUrlExpression(viteServerUrlExpression(serverUrl), healthPath);

  vfs.writeFile(
    "apps/web/src/components/graph-backend-status.tsx",
    `import { createSignal, onMount } from "solid-js";

export function GraphBackendStatus() {
  const [status, setStatus] = createSignal<"checking" | "connected" | "disconnected">("checking");

  onMount(() => {
    fetch(${healthUrlExpression})
      .then((response) => setStatus(response.ok ? "connected" : "disconnected"))
      .catch(() => setStatus("disconnected"));
  });

  return (
    <div class="flex items-center gap-2">
      <div class={\`h-2 w-2 rounded-full $\{
        status() === "checking" ? "bg-orange-400" : status() === "connected" ? "bg-green-500" : "bg-red-500"
      }\`} />
      <span class="text-sm text-muted-foreground">
        {status() === "checking" ? "Checking..." : status() === "connected" ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
}
`,
  );

  const path = "apps/web/src/routes/index.tsx";
  const content = vfs.readFile(path);
  if (!content || content.includes("GraphBackendStatus")) return;
  const withImport = `import { GraphBackendStatus } from "../components/graph-backend-status";\n${content}`;
  const updated = withImport.replace(
    "<h2",
    '<section class="rounded-lg border p-4"><h2 class="mb-2 font-medium">Backend Status</h2><GraphBackendStatus /></section>\n        <h2',
  );
  vfs.writeFile(path, updated);
}

function writeFreshStatus(vfs: VirtualFileSystem, serverUrl: string, healthPath: string): void {
  const healthUrlExpression = graphHealthUrlExpression(`"${serverUrl}"`, healthPath);

  vfs.writeFile(
    "apps/web/islands/GraphBackendStatus.tsx",
    `/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";

export default function GraphBackendStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "disconnected">("checking");

  useEffect(() => {
    fetch(${healthUrlExpression})
      .then((response) => setStatus(response.ok ? "connected" : "disconnected"))
      .catch(() => setStatus("disconnected"));
  }, []);

  return (
    <div class="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
      <strong class="text-white">Backend Status:</strong>{" "}
      {status === "checking" ? "Checking..." : status === "connected" ? "Connected" : "Disconnected"}
    </div>
  );
}
`,
  );

  const path = "apps/web/routes/index.tsx";
  const content = vfs.readFile(path);
  if (!content || content.includes("GraphBackendStatus")) return;
  const withImport = content.replace(
    'import Counter from "../islands/Counter.tsx";',
    'import Counter from "../islands/Counter.tsx";\nimport GraphBackendStatus from "../islands/GraphBackendStatus.tsx";',
  );
  const updated = withImport.replace("<Counter start={3} />", "<Counter start={3} />\n            <GraphBackendStatus />");
  vfs.writeFile(path, updated);
}

function writeAngularStatus(vfs: VirtualFileSystem, serverUrl: string, healthPath: string): void {
  const healthUrlExpression = graphHealthUrlExpression(viteServerUrlExpression(serverUrl), healthPath);

  vfs.writeFile(
    "apps/web/src/app/components/graph-backend-status.component.ts",
    `import { Component, OnInit } from "@angular/core";

type Status = "checking" | "connected" | "disconnected";

@Component({
  selector: "app-graph-backend-status",
  standalone: true,
  template: \`
    <section class="rounded-lg border border-gray-200 p-4">
      <h2 class="mb-2 font-medium">Backend Status</h2>
      <div class="flex items-center gap-2">
        <span class="h-2 w-2 rounded-full" [class.bg-orange-400]="status === 'checking'" [class.bg-green-500]="status === 'connected'" [class.bg-red-500]="status === 'disconnected'"></span>
        <span class="text-sm text-gray-600">{{ status === "checking" ? "Checking..." : status === "connected" ? "Connected" : "Disconnected" }}</span>
      </div>
    </section>
  \`,
})
export class GraphBackendStatusComponent implements OnInit {
  status: Status = "checking";

  ngOnInit() {
    fetch(${healthUrlExpression})
      .then((response) => {
        this.status = response.ok ? "connected" : "disconnected";
      })
      .catch(() => {
        this.status = "disconnected";
      });
  }
}
`,
  );

  const path = "apps/web/src/app/app.component.ts";
  const content = vfs.readFile(path);
  if (!content || content.includes("GraphBackendStatusComponent")) return;
  const withImport = content.replace(
    "import { HeaderComponent } from './components/header.component';",
    "import { HeaderComponent } from './components/header.component';\nimport { GraphBackendStatusComponent } from './components/graph-backend-status.component';",
  );
  const withComponentImport = withImport.replace(
    "imports: [RouterOutlet, HeaderComponent]",
    "imports: [RouterOutlet, HeaderComponent, GraphBackendStatusComponent]",
  );
  const updated = withComponentImport.replace(
    "<router-outlet />",
    '<div class="container mx-auto max-w-3xl px-4 py-6"><app-graph-backend-status /></div>\n        <router-outlet />',
  );
  vfs.writeFile(path, updated);
}

function writeQwikStatus(vfs: VirtualFileSystem, serverUrl: string, healthPath: string): void {
  const healthUrlExpression = graphHealthUrlExpression(viteServerUrlExpression(serverUrl), healthPath);

  vfs.writeFile(
    "apps/web/src/components/graph-backend-status.tsx",
    `import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const GraphBackendStatus = component$(() => {
  const status = useSignal<"checking" | "connected" | "disconnected">("checking");

  useVisibleTask$(() => {
    fetch(${healthUrlExpression})
      .then((response) => {
        status.value = response.ok ? "connected" : "disconnected";
      })
      .catch(() => {
        status.value = "disconnected";
      });
  });

  return (
    <section class="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <h2 class="mb-2 font-medium">Backend Status</h2>
      <div class="flex items-center gap-2">
        <span
          class={\`h-2 w-2 rounded-full $\{
            status.value === "checking"
              ? "bg-orange-400"
              : status.value === "connected"
                ? "bg-green-500"
                : "bg-red-500"
          }\`}
        />
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {status.value === "checking"
            ? "Checking..."
            : status.value === "connected"
              ? "Connected"
              : "Disconnected"}
        </span>
      </div>
    </section>
  );
});
`,
  );

  const path = "apps/web/src/routes/index.tsx";
  const content = vfs.readFile(path);
  if (!content || content.includes("GraphBackendStatus")) return;
  const withImport = content.replace(
    'import { component$ } from "@builder.io/qwik";',
    'import { component$ } from "@builder.io/qwik";\nimport { GraphBackendStatus } from "../components/graph-backend-status";',
  );
  const updated = withImport.replace(
    '<section class="rounded-lg border border-gray-200 dark:border-gray-800 p-4">',
    '<GraphBackendStatus />\n        <section class="rounded-lg border border-gray-200 dark:border-gray-800 p-4">',
  );
  vfs.writeFile(path, updated);
}

function writeRedwoodStatus(vfs: VirtualFileSystem, serverUrl: string, healthPath: string): void {
  const healthUrlExpression = graphHealthUrlExpression(
    `(process.env.REDWOOD_ENV_SERVER_URL ?? "${serverUrl}")`,
    healthPath,
  );

  vfs.writeFile(
    "web/src/components/GraphBackendStatus/GraphBackendStatus.tsx",
    `import { useEffect, useState } from "react";

type Status = "checking" | "connected" | "disconnected";

const GraphBackendStatus = () => {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let active = true;
    fetch(${healthUrlExpression})
      .then((response) => {
        if (active) setStatus(response.ok ? "connected" : "disconnected");
      })
      .catch(() => {
        if (active) setStatus("disconnected");
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="mt-8 rounded-lg border border-slate-700 bg-slate-800 p-6">
      <h2 className="mb-2 font-medium text-cyan-400">Backend Status</h2>
      <div className="flex items-center justify-center gap-2">
        <span
          className={\`h-2 w-2 rounded-full $\{
            status === "checking" ? "bg-orange-400" : status === "connected" ? "bg-green-500" : "bg-red-500"
          }\`}
        />
        <span className="text-sm text-slate-300">
          {status === "checking" ? "Checking..." : status === "connected" ? "Connected" : "Disconnected"}
        </span>
      </div>
    </section>
  );
};

export default GraphBackendStatus;
`,
  );

  const path = "web/src/pages/HomePage/HomePage.tsx";
  const content = vfs.readFile(path);
  if (!content || content.includes("GraphBackendStatus")) return;
  const withImport = `import GraphBackendStatus from 'src/components/GraphBackendStatus/GraphBackendStatus'\n${content}`;
  const updated = withImport.includes(
    '<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">',
  )
    ? withImport.replace(
        '\n          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">',
        '\n          <GraphBackendStatus />\n\n          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">',
      )
    : withImport.replace("\n          <div>", "\n          <GraphBackendStatus />\n\n          <div>");
  vfs.writeFile(path, updated);
}
