import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";

import {
  COMPILED_TEMPLATE_CACHE_LIMIT,
  clearCompiledTemplateCache,
  getCompiledTemplate,
  getCompiledTemplateCacheSize,
} from "@/core/compiled-template-cache";
import {
  isBinaryFile,
  nativeApplicationId,
  processFileContent,
  processTemplateString,
  transformFilename,
} from "@/core/template-processor";

describe("template processor", () => {
  it("reuses compiled functions per content while rendering each context fresh", () => {
    clearCompiledTemplateCache();
    const template = "{{projectName}}:{{#if (eq auth 'none')}}open{{else}}{{auth}}{{/if}}";

    const first = processTemplateString(template, makeConfig({ projectName: "alpha" }));
    const second = processTemplateString(
      template,
      makeConfig({ projectName: "beta", auth: "better-auth" }),
    );
    const changed = processTemplateString(`${template}!`, makeConfig({ projectName: "alpha" }));

    expect(first).toBe("alpha:open");
    expect(second).toBe("beta:better-auth");
    expect(changed).toBe("alpha:open!");
    expect(getCompiledTemplate(template)).toBe(getCompiledTemplate(template));
    expect(getCompiledTemplate(template)).not.toBe(getCompiledTemplate(`${template}!`));
    expect(getCompiledTemplateCacheSize()).toBe(2);
  });

  it("keys the compiled cache by compiler options", () => {
    clearCompiledTemplateCache();
    const config = makeConfig({ projectName: "<b>" });

    expect(processTemplateString("{{projectName}}", config)).toBe("&lt;b&gt;");
    expect(processTemplateString("{{projectName}}", config, { noEscape: true })).toBe("<b>");
    expect(getCompiledTemplateCacheSize()).toBe(2);
  });

  it("cannot alias option metadata with template content", () => {
    clearCompiledTemplateCache();
    const contentWithOptionPrefix = `${JSON.stringify({})}\0{{projectName}}`;

    expect(getCompiledTemplate(contentWithOptionPrefix)).not.toBe(
      getCompiledTemplate("{{projectName}}", {}),
    );
    expect(getCompiledTemplateCacheSize()).toBe(2);
  });

  it("evicts the least recently used compiled template at the cache bound", () => {
    clearCompiledTemplateCache();
    const oldest = getCompiledTemplate("oldest {{projectName}}");
    for (let index = 1; index < COMPILED_TEMPLATE_CACHE_LIMIT; index += 1) {
      getCompiledTemplate(`template-${index} {{projectName}}`);
    }

    const recentlyUsed = getCompiledTemplate("template-1 {{projectName}}");
    getCompiledTemplate("overflow {{projectName}}");

    expect(getCompiledTemplateCacheSize()).toBe(COMPILED_TEMPLATE_CACHE_LIMIT);
    expect(getCompiledTemplate("template-1 {{projectName}}")).toBe(recentlyUsed);
    expect(getCompiledTemplate("oldest {{projectName}}")).not.toBe(oldest);
  });

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

  it("normalizes long native application identifiers in linear time", () => {
    expect(nativeApplicationId(`a${"_".repeat(100_000)}b`)).toBe("com.betterfullstack.a_b");
  }, 1_000);

  it("detects binary files by extension", () => {
    expect(isBinaryFile("public/logo.png")).toBe(true);
    expect(isBinaryFile("src/index.ts")).toBe(false);
  });

  it("renders template syntax only for .hbs file content processing", () => {
    const result = processFileContent(
      "src/config.ts.hbs",
      "export const name = '{{projectName}}';",
      makeConfig({ projectName: "demo-app" }),
    );

    expect(result).toBe("export const name = 'demo-app';");
  });

  it("returns original content for non-template text files", () => {
    const result = processFileContent(
      "src/config.ts",
      "export const name = '{{projectName}}';",
      makeConfig({ projectName: "demo-app" }),
    );

    expect(result).toBe("export const name = '{{projectName}}';");
  });

  it("returns a binary placeholder for binary files", () => {
    const result = processFileContent("public/logo.png", "raw-binary-content", makeConfig());

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
