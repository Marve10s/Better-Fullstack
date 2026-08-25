import { makeConfig } from "@test/_fixtures/config-factory";
import { makeTemplates } from "@test/_fixtures/template-factory";
import { describe, expect, it } from "bun:test";

import type { VirtualDirectory, VirtualFile } from "@/types";

import { VirtualFileSystem } from "@/core/virtual-fs";
import {
  hasTemplatesWithPrefix,
  isEmptyTemplateOutput,
  processSingleTemplate,
  processTemplatesFromPrefix,
} from "@/template-handlers/core/utils";

function findFile(node: VirtualDirectory, path: string): VirtualFile | undefined {
  for (const child of node.children) {
    if (child.type === "file" && child.path === path) {
      return child;
    }
    if (child.type === "directory") {
      const nested = findFile(child, path);
      if (nested) return nested;
    }
  }
  return undefined;
}

describe("template handler utils", () => {
  it("detects whether a template prefix exists", () => {
    const templates = makeTemplates({
      "frontend/react/web-base/src/index.ts.hbs": "export {};",
    });

    expect(hasTemplatesWithPrefix(templates, "frontend/react/web-base")).toBe(true);
    expect(hasTemplatesWithPrefix(templates, "frontend/svelte")).toBe(false);
  });

  it("identifies empty text output without treating binary markers as empty", () => {
    expect(isEmptyTemplateOutput("src/optional.ts.hbs", "\n  \t")).toBe(true);
    expect(isEmptyTemplateOutput("src/.gitkeep", "")).toBe(true);
    expect(isEmptyTemplateOutput("public/logo.png", "")).toBe(false);
    expect(isEmptyTemplateOutput("src/index.ts.hbs", "export {};\n")).toBe(false);
  });

  it("processes a single template or binary asset into the target path", () => {
    const templates = makeTemplates({
      "frontend/react/web-base/src/index.ts.hbs": "export const name = '{{projectName}}';",
    });
    const vfs = new VirtualFileSystem();

    processSingleTemplate(
      vfs,
      templates,
      "frontend/react/web-base/src/index.ts",
      "apps/web/src/index.ts",
      makeConfig({ projectName: "demo-app" }),
    );
    expect(vfs.readFile("apps/web/src/index.ts")).toBe("export const name = 'demo-app';");
    expect(findFile(vfs.toTree(), "apps/web/src/index.ts")?.sourcePath).toBeUndefined();
  });

  it("skips a single template when its selected branches emit no content", () => {
    const templates = makeTemplates({
      "extras/optional.ts.hbs": "{{#if false}}export {};{{/if}}",
    });
    const vfs = new VirtualFileSystem();

    processSingleTemplate(vfs, templates, "extras/optional.ts", "optional.ts", makeConfig());

    expect(vfs.fileExists("optional.ts")).toBe(false);
  });

  it("routes template prefixes, applies filename transforms, and skips excluded or empty output", () => {
    const templates = makeTemplates({
      "frontend/react/web-base/_gitignore": "dist",
      "frontend/react/web-base/src/config.ts.hbs": "export const name = '{{projectName}}';",
      "frontend/react/web-base/src/empty.ts.hbs": "{{#if false}}hidden{{/if}}",
      "frontend/react/web-base/src/.gitkeep": "",
      "frontend/react/web-base/public/logo.png": "binary-data",
      "frontend/react/web-base/ignore/me.ts": "skip me",
    });
    const vfs = new VirtualFileSystem();

    processTemplatesFromPrefix(
      vfs,
      templates,
      "frontend/react/web-base",
      "apps/web",
      makeConfig({ projectName: "demo-app" }),
      ["frontend/react/web-base/ignore"],
    );

    expect(vfs.readFile("apps/web/.gitignore")).toBe("dist");
    expect(vfs.readFile("apps/web/src/config.ts")).toBe("export const name = 'demo-app';");
    expect(vfs.fileExists("apps/web/src/empty.ts")).toBe(false);
    expect(vfs.fileExists("apps/web/src/.gitkeep")).toBe(false);
    expect(vfs.fileExists("apps/web/ignore/me.ts")).toBe(false);
    expect(vfs.readFile("apps/web/public/logo.png")).toBe("[Binary file]");
  });
});
