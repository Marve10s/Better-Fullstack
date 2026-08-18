import type { Frontend } from "@better-fullstack/types";

import { describe, expect, it } from "bun:test";

import type { VirtualFile, VirtualNode } from "../src/types";

import { generateVirtualProject } from "../src/generator";
import { EMBEDDED_TEMPLATES } from "../src/templates.generated";
import { makeConfig } from "./_fixtures/config-factory";

function files(node: VirtualNode): VirtualFile[] {
  return node.type === "file" ? [node] : node.children.flatMap(files);
}

async function generate(frontend: Frontend, overrides: Parameters<typeof makeConfig>[0] = {}) {
  const selfFrontend = [
    "next",
    "vinext",
    "tanstack-start",
    "svelte",
    "nuxt",
    "solid-start",
  ].includes(frontend);
  const result = await generateVirtualProject({
    config: makeConfig({
      frontend: [frontend],
      backend: selfFrontend ? "self" : "hono",
      runtime: selfFrontend ? "none" : "bun",
      database: "none",
      orm: "none",
      api: "none",
      auth: "none",
      analytics: "vercel-analytics",
      ...overrides,
    }),
    templates: EMBEDDED_TEMPLATES,
  });
  expect(result.success).toBe(true);
  return new Map(files(result.tree!.root).map((file) => [file.path, file.content]));
}

describe("Vercel Analytics generation", () => {
  it("mounts the Next.js component and adds the current package without env vars", async () => {
    const output = await generate("next");

    expect(output.get("apps/web/package.json")).toContain('"@vercel/analytics": "^2.0.1"');
    expect(output.get("apps/web/src/lib/vercel-analytics.tsx")).toContain(
      'from "@vercel/analytics/next"',
    );
    expect(output.get("apps/web/src/app/layout.tsx")).toContain("<Analytics />");
    expect(output.get("apps/web/.env") ?? "").not.toContain("VERCEL_ANALYTICS");
  });

  it.each([
    ["vinext", "apps/web/src/app/layout.tsx", "<Analytics />"],
    ["react-router", "apps/web/src/root.tsx", "<Analytics />"],
    ["react-vite", "apps/web/src/app-shell.tsx", "<Analytics />"],
    ["tanstack-router", "apps/web/src/routes/__root.tsx", "<Analytics />"],
    ["tanstack-start", "apps/web/src/routes/__root.tsx", "<Analytics />"],
    ["svelte", "apps/web/src/routes/+layout.svelte", "$lib/vercel-analytics"],
    ["vue", "apps/web/src/App.vue", "<Analytics />"],
    ["nuxt", "apps/web/app/app.vue", "<Analytics />"],
    ["solid", "apps/web/src/routes/__root.tsx", "startVercelAnalytics()"],
    ["solid-start", "apps/web/src/app.tsx", "startVercelAnalytics()"],
    ["astro", "apps/web/src/layouts/Layout.astro", "<VercelAnalytics />"],
  ] as const)(
    "mounts the framework-specific integration for %s",
    async (frontend, path, marker) => {
      const output = await generate(frontend);
      expect(output.get(path)).toContain(marker);
      if (frontend === "svelte") {
        expect(output.get("apps/web/src/lib/vercel-analytics.ts")).not.toContain(
          "\ninjectAnalytics();",
        );
        expect(output.get(path)).toContain("startVercelAnalytics();");
      }
    },
  );

  it("rejects unsupported frontends before installing an unused package", async () => {
    const result = await generateVirtualProject({
      config: makeConfig({
        frontend: ["angular"],
        backend: "self",
        runtime: "none",
        analytics: "vercel-analytics",
      }),
      templates: EMBEDDED_TEMPLATES,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("not yet mounted");
  });

  for (const analytics of ["posthog", "umami"] as const) {
    it(`keeps the ${analytics} Vue helper for Nuxt`, async () => {
      const result = await generateVirtualProject({
        config: makeConfig({
          frontend: ["nuxt"],
          backend: "self",
          runtime: "none",
          analytics,
        }),
        templates: EMBEDDED_TEMPLATES,
      });

      expect(result.success).toBe(true);
      const output = new Map(files(result.tree!.root).map((file) => [file.path, file.content]));
      expect(output.has(`apps/web/src/lib/${analytics === "posthog" ? "posthog" : "umami"}.ts`)).toBe(
        true,
      );
    });
  }

  it("retains the mounted component and dependency in single-app output", async () => {
    const output = await generate("next", { workspaceShape: "single-app" });

    expect(output.get("package.json")).toContain('"@vercel/analytics": "^2.0.1"');
    expect(output.get("src/app/layout.tsx")).toContain("<Analytics />");
    expect(output.get("src/lib/vercel-analytics.tsx")).toContain("@vercel/analytics/next");
  });

  it("does not broaden single-app support to analytics integrations with workspace assumptions", async () => {
    const output = await generate("next", {
      analytics: "plausible",
      workspaceShape: "single-app",
    });

    expect(output.has("apps/web/package.json")).toBe(true);
    expect(output.has("src/app/layout.tsx")).toBe(false);
  });
});
