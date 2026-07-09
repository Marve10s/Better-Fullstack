import { describe, expect, it } from "bun:test";

import {
  CONFIG_PROMPT_ENTRY_KEYS,
  getScopedDefaultPromptValue,
  hasStackPromptFlags,
} from "../src/prompts/config-prompts";
import {
  CONFIG_SCOPE_ALWAYS_KEYS,
  CONFIG_SCOPE_REGISTRY,
  SCOPED_CONFIG_PROMPT_KEYS,
  shouldAskConfigPromptKey,
} from "../src/prompts/config-scope";

const META_KEYS = new Set(["ecosystem", "configScope", "configSections"]);

describe("configuration scope registry", () => {
  it("classifies every gatherConfig prompt key and only gatherConfig prompt keys", () => {
    const scopedPromptEntries = CONFIG_PROMPT_ENTRY_KEYS.filter((key) => !META_KEYS.has(key));

    expect([...SCOPED_CONFIG_PROMPT_KEYS].sort()).toEqual([...scopedPromptEntries].sort());
  });

  it("does not duplicate prompt keys within an ecosystem registry", () => {
    for (const [ecosystem, registry] of Object.entries(CONFIG_SCOPE_REGISTRY)) {
      const keys = [
        ...registry.core,
        ...registry.sections.flatMap((section) => section.promptKeys),
        ...CONFIG_SCOPE_ALWAYS_KEYS,
      ];
      const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);

      expect(duplicates, `${ecosystem} has duplicate scoped prompt keys`).toEqual([]);
    }
  });

  it("keeps TypeScript sections aligned with the CLI onboarding spec", () => {
    expect(CONFIG_SCOPE_REGISTRY.typescript.core).toEqual([
      "frontend",
      "astroIntegration",
      "backend",
      "runtime",
      "database",
      "orm",
      "api",
      "auth",
      "dbSetup",
    ]);
    expect(CONFIG_SCOPE_REGISTRY.typescript.sections.map((section) => section.id)).toEqual([
      "ui-styling",
      "state-forms",
      "type-safety",
      "payments-email",
      "ai",
      "data-storage",
      "backend-extras",
      "quality",
      "content",
      "deploy",
      "addons-examples",
    ]);
  });
});

describe("shouldAskConfigPromptKey", () => {
  it("delegates keys from other ecosystems to the prompt's own guard", () => {
    expect(shouldAskConfigPromptKey("rust", "frontend", "core", [])).toBe(true);
    expect(shouldAskConfigPromptKey("rust", "uiLibrary", "core", [])).toBe(true);
    expect(shouldAskConfigPromptKey("typescript", "rustWebFramework", "core", [])).toBe(true);
  });

  it("skips unselected extras for the active ecosystem", () => {
    expect(shouldAskConfigPromptKey("rust", "rustCaching", "core", [])).toBe(false);
    expect(shouldAskConfigPromptKey("typescript", "payments", "core", [])).toBe(false);
    expect(shouldAskConfigPromptKey("typescript", "payments", "custom", ["payments-email"])).toBe(
      true,
    );
    expect(shouldAskConfigPromptKey("typescript", "payments", "full", [])).toBe(true);
  });

  it("scopes shared service prompts for non-TypeScript ecosystems", () => {
    expect(shouldAskConfigPromptKey("go", "email", "core", [])).toBe(false);
    expect(shouldAskConfigPromptKey("python", "search", "core", [])).toBe(false);
    expect(shouldAskConfigPromptKey("rust", "observability", "custom", [])).toBe(false);
    expect(shouldAskConfigPromptKey("dotnet", "caching", "custom", ["shared-services"])).toBe(
      true,
    );
    expect(shouldAskConfigPromptKey("java", "email", "full", [])).toBe(true);
  });
});

describe("scoped prompt defaults", () => {
  it("preserves contextual server deployment defaults when deployment prompts are skipped", async () => {
    await expect(
      getScopedDefaultPromptValue(
        "serverDeploy",
        {
          ecosystem: "typescript",
          backend: "hono",
          runtime: "workers",
          webDeploy: "none",
        },
        {},
      ),
    ).resolves.toBe("cloudflare");
  });

  it("keeps skipped server deployment non-interactive when Hono can run without deployment", async () => {
    await expect(
      getScopedDefaultPromptValue(
        "serverDeploy",
        {
          ecosystem: "typescript",
          backend: "hono",
          runtime: "bun",
          webDeploy: "none",
        },
        {},
      ),
    ).resolves.toBe("none");
  });

  it("uses contextual UI defaults when UI styling is skipped", async () => {
    await expect(
      getScopedDefaultPromptValue(
        "uiLibrary",
        {
          ecosystem: "typescript",
          frontend: ["svelte"],
        },
        {},
      ),
    ).resolves.toBe("daisyui");
  });

  it("uses Effect backend defaults when type-safety prompts are skipped", async () => {
    await expect(
      getScopedDefaultPromptValue(
        "effect",
        {
          ecosystem: "typescript",
          backend: "effect",
        },
        {},
      ),
    ).resolves.toBe("effect-full");

    await expect(
      getScopedDefaultPromptValue(
        "validation",
        {
          ecosystem: "typescript",
          backend: "effect",
        },
        {},
      ),
    ).resolves.toBe("effect-schema");
  });

  it("treats individual shadcn option flags as stack prompt intent", () => {
    expect(hasStackPromptFlags({ shadcnStyle: "vega" })).toBe(true);
  });
});
