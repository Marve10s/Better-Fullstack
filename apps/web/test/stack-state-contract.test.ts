import { OPTION_CATEGORY_METADATA } from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import { DEFAULT_STACK } from "../src/lib/stack-defaults";
import { NON_OPTION_STACK_KEYS, STACK_STATE_OPTION_CATEGORY_BY_KEY } from "../src/lib/stack-contract";
import { normalizeStackStateSelections } from "../src/lib/stack-option-normalization";
import { stackUrlKeys } from "../src/lib/stack-url-keys";
import {
  createStackSearchParams,
  parseStackFromUrlRecord,
  stackStateKeys,
} from "../src/lib/stack-url-state.shared";

type MappedStackStateKey = keyof typeof STACK_STATE_OPTION_CATEGORY_BY_KEY;

function isMappedStackStateKey(key: string): key is MappedStackStateKey {
  return key in STACK_STATE_OPTION_CATEGORY_BY_KEY;
}

describe("StackState contract", () => {
  it("keeps DEFAULT_STACK, stackStateKeys, and stackUrlKeys in exact sync", () => {
    expect(Object.keys(DEFAULT_STACK)).toEqual(stackStateKeys);
    expect(Object.keys(stackUrlKeys)).toEqual(stackStateKeys);
  });

  it("maps every StackState key to either a non-option key or option metadata", () => {
    for (const key of stackStateKeys) {
      if (NON_OPTION_STACK_KEYS.includes(key as (typeof NON_OPTION_STACK_KEYS)[number])) {
        expect(
          STACK_STATE_OPTION_CATEGORY_BY_KEY[key as keyof typeof STACK_STATE_OPTION_CATEGORY_BY_KEY],
        ).toBeUndefined();
        continue;
      }

      expect(isMappedStackStateKey(key)).toBe(true);
      if (!isMappedStackStateKey(key)) continue;

      const category = STACK_STATE_OPTION_CATEGORY_BY_KEY[key];
      expect(category).toBeDefined();
      expect(OPTION_CATEGORY_METADATA[category]).toBeDefined();
    }
  });

  it("keeps default value shapes aligned with category selection mode", () => {
    for (const [stackKey, category] of Object.entries(
      STACK_STATE_OPTION_CATEGORY_BY_KEY,
    ) as Array<[keyof typeof STACK_STATE_OPTION_CATEGORY_BY_KEY, keyof typeof OPTION_CATEGORY_METADATA]>) {
      const metadata = OPTION_CATEGORY_METADATA[category];
      const defaultValue = DEFAULT_STACK[stackKey];

      if (metadata.selectionMode === "multiple") {
        expect(Array.isArray(defaultValue)).toBe(true);
      } else {
        expect(Array.isArray(defaultValue)).toBe(false);
        expect(typeof defaultValue).toBe("string");
      }
    }
  });

  it("round-trips scalar, array, aliased, and boolean-like values through URL helpers", () => {
    const input = normalizeStackStateSelections({
      ...DEFAULT_STACK,
      ecosystem: "python",
      projectName: "parity-app",
      webFrontend: ["astro"],
      astroIntegration: "react",
      backend: "self-next",
      codeQuality: ["biome", "oxlint"],
      documentation: ["fumadocs"],
      appPlatforms: ["pwa", "wxt"],
      examples: ["ai", "chat-sdk"],
      aiDocs: ["agents-md", "claude-md"],
      git: "false",
      install: "true",
      pythonAi: ["langchain", "openai-sdk"],
      yolo: "true",
    });

    const params = createStackSearchParams(input, { includeDefaults: true });
    const parsed = parseStackFromUrlRecord(Object.fromEntries(params.entries()));

    expect(parsed).toEqual(input);
  });

  it("normalizes invalid none-plus-real combinations for array categories", () => {
    const normalized = normalizeStackStateSelections({
      ...DEFAULT_STACK,
      codeQuality: ["none", "biome"],
      documentation: ["none", "fumadocs"],
      appPlatforms: ["none", "pwa"],
      examples: ["none", "ai"],
      aiDocs: ["none", "agents-md"],
      rustLibraries: ["none", "validator"],
      pythonAi: ["none", "langchain"],
    });

    expect(normalized.codeQuality).toEqual(["biome"]);
    expect(normalized.documentation).toEqual(["fumadocs"]);
    expect(normalized.appPlatforms).toEqual(["pwa"]);
    expect(normalized.examples).toEqual(["ai"]);
    expect(normalized.aiDocs).toEqual(["agents-md"]);
    expect(normalized.rustLibraries).toEqual(["validator"]);
    expect(normalized.pythonAi).toEqual(["langchain"]);
  });

  it("treats virtual none selections as empty arrays", () => {
    const normalized = normalizeStackStateSelections({
      ...DEFAULT_STACK,
      rustLibraries: ["none"],
      pythonAi: ["none"],
      aiDocs: ["none"],
    });

    expect(normalized.rustLibraries).toEqual([]);
    expect(normalized.pythonAi).toEqual([]);
    expect(normalized.aiDocs).toEqual([]);
  });
});
