import { describe, expect, it } from "bun:test";

import {
  isBinaryFile,
  processFileContent,
  processTemplateString,
  transformFilename,
} from "../../src/core/template-processor";
import { makeConfig } from "../_fixtures/config-factory";

describe("template processor", () => {
  it("renders logical and string helpers inside templates", () => {
    const result = processTemplateString(
      [
        "{{#if (eq backend 'self')}}self{{/if}}",
        "{{#if (ne auth 'none')}}auth{{/if}}",
        "{{#if (not git)}}nogit{{/if}}",
        "{{#if (and install (includes frontend 'next'))}}next-install{{/if}}",
        "{{#if (or (includes frontend 'next') (includes frontend 'nuxt'))}}web{{/if}}",
        "{{replace projectName '-' '_'}}",
      ].join("|"),
      makeConfig({
        backend: "self",
        auth: "better-auth",
        git: false,
        install: true,
        frontend: ["next"],
        projectName: "demo-app",
      }),
    );

    expect(result).toBe("self|auth|nogit|next-install|web|demo_app");
  });

  it("renders shadcn helpers used by templates", () => {
    const result = processTemplateString(
      "{{shadcnFontFamily}}|{{shadcnFontIsMono}}|{{shadcnRadiusValue}}|{{shadcnThemeVars 'light'}}",
      makeConfig({
        shadcnFont: "geist-mono",
        shadcnRadius: "large",
        shadcnBaseColor: "neutral",
        shadcnColorTheme: "neutral",
      }),
    );

    expect(result).toContain("&#x27;Geist Mono&#x27;, monospace|true|0.875rem|");
    expect(result).toContain("--background:");
  });

  it("transforms template filenames into output filenames", () => {
    expect(transformFilename("src/index.ts.hbs")).toBe("src/index.ts");
    expect(transformFilename("frontend/react/_gitignore")).toBe("frontend/react/.gitignore");
    expect(transformFilename("frontend/react/_npmrc")).toBe("frontend/react/.npmrc");
  });

  it("detects binary files by extension", () => {
    expect(isBinaryFile("public/logo.png")).toBe(true);
    expect(isBinaryFile("src/index.ts")).toBe(false);
  });

  it("renders template syntax for file content processing", () => {
    const result = processFileContent(
      "src/config.ts",
      "export const name = '{{projectName}}';",
      makeConfig({ projectName: "demo-app" }),
    );

    expect(result).toBe("export const name = 'demo-app';");
  });

  it("returns a binary placeholder for binary files", () => {
    const result = processFileContent(
      "public/logo.png",
      "raw-binary-content",
      makeConfig(),
    );

    expect(result).toBe("[Binary file]");
  });

  it("falls back to the original content when template rendering throws", () => {
    const originalWarn = console.warn;
    console.warn = () => {};

    try {
      const result = processFileContent(
        "src/broken.ts.hbs",
        "{{#if projectName}}missing-end",
        makeConfig(),
      );

      expect(result).toBe("{{#if projectName}}missing-end");
    } finally {
      console.warn = originalWarn;
    }
  });
});
