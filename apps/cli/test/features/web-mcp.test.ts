import { readVirtualFileContent } from "@test/support/virtual-tree-utils";
import { describe, expect, it } from "bun:test";

import { createVirtual } from "@/index";
import { getScopedDefaultPromptValue } from "@/prompts/core/config-prompts";
import { resolveWebMcpPrompt } from "@/prompts/services/web-mcp";

describe("WebMCP", () => {
  it("offers the experimental option only for a web frontend", () => {
    expect(
      resolveWebMcpPrompt({ frontends: ["react-vite"] }).options.map((option) => option.value),
    ).toEqual(["enabled", "none"]);
    expect(resolveWebMcpPrompt({ frontends: ["native-uniwind"] }).autoValue).toBe("none");
    expect(resolveWebMcpPrompt({ webMcp: "enabled", frontends: ["react-vite"] }).shouldPrompt).toBe(
      false,
    );
  });

  it("preserves an explicit selection when the prompt is scoped out", async () => {
    expect(
      await getScopedDefaultPromptValue(
        "webMcp",
        { ecosystem: "typescript", frontend: ["react-vite"] },
        { webMcp: "enabled" },
      ),
    ).toBe("enabled");
  });

  it("generates guarded tool registration and mounts it in React", async () => {
    const result = await createVirtual({
      projectName: "webmcp-react",
      frontend: ["react-vite"],
      backend: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      webMcp: "enabled",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    const registration = readVirtualFileContent(root, "apps/web/src/lib/webmcp.ts");
    const component = readVirtualFileContent(root, "apps/web/src/lib/webmcp-tools.tsx");
    const appShell = readVirtualFileContent(root, "apps/web/src/app-shell.tsx");

    expect(registration).toContain('name: "get_app_info"');
    expect(registration).toContain(".registerTool(");
    expect(registration).toContain("{ signal: controller.signal }");
    const documentGuard = registration.indexOf('typeof document === "undefined"');
    const modelContextGuard = registration.indexOf("if (!modelContext)");
    const registrationCall = registration.indexOf(".registerTool(");
    expect(documentGuard).toBeGreaterThanOrEqual(0);
    expect(modelContextGuard).toBeGreaterThanOrEqual(0);
    expect(registrationCall).toBeGreaterThanOrEqual(0);
    expect(documentGuard).toBeLessThan(registrationCall);
    expect(modelContextGuard).toBeLessThan(registrationCall);
    expect(component).toContain("useEffect(() => registerWebMcpTools(), [])");
    expect(appShell).toContain("<WebMcpTools />");
  });

  it("mounts registration in every generated web frontend", async () => {
    const cases = [
      ["tanstack-router", "apps/web/src/lib/webmcp.ts", "apps/web/src/routes/__root.tsx"],
      ["react-router", "apps/web/src/lib/webmcp.ts", "apps/web/src/root.tsx"],
      ["react-vite", "apps/web/src/lib/webmcp.ts", "apps/web/src/app-shell.tsx"],
      ["tanstack-start", "apps/web/src/lib/webmcp.ts", "apps/web/src/routes/__root.tsx"],
      ["next", "apps/web/src/lib/webmcp.ts", "apps/web/src/app/layout.tsx"],
      ["vinext", "apps/web/src/lib/webmcp.ts", "apps/web/src/app/layout.tsx"],
      ["vue", "apps/web/src/lib/webmcp.ts", "apps/web/src/App.vue"],
      ["nuxt", "apps/web/app/lib/webmcp.ts", "apps/web/app/app.vue"],
      ["svelte", "apps/web/src/lib/webmcp.ts", "apps/web/src/routes/+layout.svelte"],
      ["solid", "apps/web/src/lib/webmcp.ts", "apps/web/src/routes/__root.tsx"],
      ["solid-start", "apps/web/src/lib/webmcp.ts", "apps/web/src/app.tsx"],
      ["astro", "apps/web/src/lib/webmcp.ts", "apps/web/src/layouts/Layout.astro"],
      ["qwik", "apps/web/src/lib/webmcp.ts", "apps/web/src/root.tsx"],
      ["angular", "apps/web/src/lib/webmcp.ts", "apps/web/src/app/app.component.ts"],
      ["vanilla-vite", "apps/web/src/lib/webmcp.ts", "apps/web/src/main.ts"],
      ["redwood", "web/src/lib/webmcp.ts", "web/src/App.tsx"],
      ["fresh", "apps/web/lib/webmcp.ts", "apps/web/routes/_app.tsx"],
    ] as const;

    for (const [frontend, helperPath, mountPath] of cases) {
      const result = await createVirtual({
        projectName: `webmcp-${frontend}`,
        frontend: [frontend],
        backend: "none",
        api: "none",
        database: "none",
        orm: "none",
        auth: "none",
        webMcp: "enabled",
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;
      expect(readVirtualFileContent(root, helperPath)).toContain("registerTool");
      expect(readVirtualFileContent(root, mountPath)).toContain(
        frontend === "angular" || frontend === "vanilla-vite"
          ? "registerWebMcpTools()"
          : "<WebMcpTools",
      );
      if (frontend === "astro") {
        const lifecycle = readVirtualFileContent(root, "apps/web/src/components/WebMcpTools.astro");
        expect(lifecycle).toContain('"astro:before-swap"');
        expect(lifecycle).toContain('"astro:page-load"');
      }
    }
  });

  it("does not emit WebMCP files when disabled", async () => {
    const result = await createVirtual({
      projectName: "without-webmcp",
      frontend: ["react-vite"],
      webMcp: "none",
    });

    expect(result.success).toBe(true);
    expect(() => readVirtualFileContent(result.tree!.root, "apps/web/src/lib/webmcp.ts")).toThrow();
  });
});
