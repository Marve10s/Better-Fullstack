import { describe, expect, it } from "bun:test";

import {
  CONFIG_PROMPT_ENTRY_KEYS,
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
});
