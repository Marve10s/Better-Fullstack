import { cliInputToProjectConfigPartial, type ProjectConfig } from "@better-fullstack/types";
import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";

import { loadTemplates } from "@/core/template-reader";
import { dependencyVersionMap } from "@/dependencies/add-deps";
import { generateVirtualProject } from "@/generator";
import type { VirtualNode } from "@/types";
import { isFormatTitleRequest, isPageResponse, isReadPageRequest, MAX_TITLE_LENGTH, MAX_MESSAGE_LENGTH } from "../../templates/addons/plasmo/apps/extension/src/messages";

const recipe = makeConfig({ addons: ["plasmo"], api: "none", database: "none", orm: "none", forms: "none", testing: "none" });
type Manifest = { displayName: string; dependencies: Record<string, string>; devDependencies: Record<string, string>; scripts: Record<string, string>; manifest: { permissions: string[]; host_permissions: string[] } };

function files(node: VirtualNode): Array<[string, string]> {
  return node.type === "file" ? [[node.path, node.content]] : node.children.flatMap(files);
}

async function generate(config: ProjectConfig) {
  const result = await generateVirtualProject({ config, templates: await loadTemplates() });
  expect(result.success, result.error).toBe(true);
  if (!result.tree) throw new Error(result.error);
  return new Map(files(result.tree.root));
}

describe("Plasmo Manifest V3 recipe", () => {
  it.each(["bun", "pnpm"] as const)("keeps extension-local literal dependencies outside %s catalogs", async (packageManager) => {
    const output = await generate({ ...recipe, packageManager });
    const pkg = JSON.parse(output.get("apps/extension/package.json") ?? "{}") as Manifest;
    expect(pkg.displayName).toBe(`${recipe.projectName} page title`);
    expect(pkg.dependencies.react).toBe(dependencyVersionMap.react);
    expect(pkg.dependencies["react-dom"]).toBe(dependencyVersionMap["react-dom"]);
    expect(pkg.devDependencies.plasmo).toBe("0.90.5");
    expect(pkg.devDependencies.typescript).toBe(dependencyVersionMap.typescript);
    expect(pkg.devDependencies["@types/chrome"]).toBeDefined();
    expect(pkg.scripts.build).toBe("plasmo build --target chrome-mv3");
    expect(pkg.scripts["check-types"]).toBe("tsc --noEmit");
    expect(pkg.manifest.permissions).toEqual([]);
    expect(pkg.manifest.host_permissions).toEqual([]);
    expect(output.get("apps/extension/assets/icon.png")).toBe("[Binary file]");
    const tsconfig = JSON.parse(output.get("apps/extension/tsconfig.json") ?? "{}") as { files: string[]; compilerOptions: { moduleResolution: string; types: string[] } };
    expect(tsconfig.compilerOptions.moduleResolution).toBe("bundler");
    expect(tsconfig.compilerOptions.types).toEqual(["chrome", "react", "react-dom"]);
    expect(tsconfig.files).toEqual([]);
    const content = output.get("apps/extension/src/content.ts") ?? "";
    expect(content).toMatch(/export const config: PlasmoCSConfig = \{/);
    expect(content).toContain('matches: ["https://example.com/*"]');
    expect(content).not.toContain("satisfies");
    expect(content).not.toContain("<all_urls>");
    expect(output.get("apps/extension/src/popup.tsx")).toContain("useReducer");
    expect(output.get("apps/extension/src/popup.tsx")).toContain("No content script answered.");
  });

  it("generates the same extension for flat, overlay, and mixed graphs despite stale caches", async () => {
    const flat = await generate(recipe);
    for (const part of [
      ["appPlatform:typescript:plasmo"],
      ["frontend:typescript:tanstack-router:site", "backend:go:gin:api", "appPlatform:typescript:plasmo"],
    ]) {
      const selected = cliInputToProjectConfigPartial({ part });
      for (const addons of [[], ["wxt"]] satisfies ProjectConfig["addons"][]) {
        const config = makeConfig({ ...recipe, ...selected, addons });
        const original = structuredClone(config);
        const output = await generate(config);
        expect([...output].filter(([path]) => path.startsWith("apps/extension/"))).toEqual([...flat].filter(([path]) => path.startsWith("apps/extension/")));
        expect(config).toEqual(original);
      }
    }
  });

  it("omits a stale flat extension when the graph selects none", async () => {
    const selected = cliInputToProjectConfigPartial({ part: ["frontend:typescript:react-vite"] });
    const output = await generate(makeConfig({ ...recipe, ...selected, addons: ["plasmo"] }));
    expect([...output.keys()].some((path) => path.startsWith("apps/extension/"))).toBe(false);
  });

  it("rejects collisions and single-app layouts before rendering", async () => {
    for (const override of [
      { addons: ["wxt", "plasmo"] },
      { workspaceShape: "single-app" },
      { ecosystem: "go" },
      { ...cliInputToProjectConfigPartial({ part: ["backend:go:gin", "appPlatform:typescript:plasmo"] }), addons: [] },
      { ...cliInputToProjectConfigPartial({ part: ["frontend:typescript:react-vite:site", "site.appPlatform:typescript:wxt", "appPlatform:typescript:plasmo"] }), addons: [] },
    ] satisfies Partial<ProjectConfig>[]) {
      const result = await generateVirtualProject({ config: makeConfig({ ...recipe, ...override }), templates: await loadTemplates() });
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/extension|WXT|Plasmo/i);
      expect(result.tree).toBeUndefined();
    }
  });

  it("rejects malformed and oversized payloads at message boundaries", () => {
    expect(isReadPageRequest({ type: "bfs:read-page" })).toBe(true);
    expect(isFormatTitleRequest({ type: "bfs:format-title", title: "Example Domain" })).toBe(true);
    expect(isPageResponse({ type: "bfs:page-title", ok: true, title: "Example Domain", summary: "Received" })).toBe(true);
    for (const value of [null, [], "bfs:read-page", { type: "wrong" }]) expect(isReadPageRequest(value)).toBe(false);
    for (const title of [null, 1, "", "x".repeat(MAX_TITLE_LENGTH + 1)]) expect(isFormatTitleRequest({ type: "bfs:format-title", title })).toBe(false);
    for (const value of [null, { ok: true }, { type: "bfs:page-title", ok: true, title: "Title", summary: "x".repeat(MAX_MESSAGE_LENGTH + 1) }, { type: "bfs:page-title", ok: false, error: "x".repeat(MAX_MESSAGE_LENGTH + 1) }]) expect(isPageResponse(value)).toBe(false);
  });
});
