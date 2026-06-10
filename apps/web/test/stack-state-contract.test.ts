import {
  getCategoryOrderForEcosystem,
  OPTION_CATEGORY_METADATA,
  REACT_NATIVE_CATEGORY_ORDER,
  TYPESCRIPT_CATEGORY_ORDER,
} from "@better-fullstack/types";
import {
  createStackSelectionSearchParams as createStackSearchParams,
  NON_OPTION_STACK_SELECTION_KEYS as NON_OPTION_STACK_KEYS,
  normalizeStackSelection as normalizeStackStateSelections,
  parseStackSelectionFromUrlRecord as parseStackFromUrlRecord,
  STACK_SELECTION_KEYS as stackStateKeys,
  STACK_SELECTION_OPTION_CATEGORY_BY_KEY as STACK_STATE_OPTION_CATEGORY_BY_KEY,
  STACK_SELECTION_URL_KEYS,
} from "@better-fullstack/types/stack-translation";
import { describe, expect, it } from "bun:test";

import { ECOSYSTEM_CATEGORIES } from "../src/lib/constant";
import { DEFAULT_STACK } from "../src/lib/stack-defaults";
import {
  createDefaultMultiEcosystemShareStack,
  getStackSharePath,
  parseStackShareSlug,
} from "../src/lib/stack-share-paths";
import { getInitialBuilderState } from "../src/lib/stack-url-state";
import { generateStackSharingUrl } from "../src/lib/stack-utils";

type MappedStackStateKey = keyof typeof STACK_STATE_OPTION_CATEGORY_BY_KEY;

function isMappedStackStateKey(key: string): key is MappedStackStateKey {
  return key in STACK_STATE_OPTION_CATEGORY_BY_KEY;
}

describe("StackState contract", () => {
  it("keeps DEFAULT_STACK, stackStateKeys, and URL keys in exact sync", () => {
    expect(Object.keys(DEFAULT_STACK)).toEqual(stackStateKeys);
    expect(Object.keys(STACK_SELECTION_URL_KEYS)).toEqual(stackStateKeys);
  });

  it("maps every StackState key to either a non-option key or option metadata", () => {
    for (const key of stackStateKeys) {
      if (NON_OPTION_STACK_KEYS.includes(key as (typeof NON_OPTION_STACK_KEYS)[number])) {
        expect(
          STACK_STATE_OPTION_CATEGORY_BY_KEY[
            key as keyof typeof STACK_STATE_OPTION_CATEGORY_BY_KEY
          ],
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
    for (const [stackKey, category] of Object.entries(STACK_STATE_OPTION_CATEGORY_BY_KEY) as Array<
      [keyof typeof STACK_STATE_OPTION_CATEGORY_BY_KEY, keyof typeof OPTION_CATEGORY_METADATA]
    >) {
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

  it("derives multi-ecosystem mode from URL state before the builder first renders", () => {
    const params = createStackSearchParams({
      ...DEFAULT_STACK,
      stackMode: "multi",
      stackPartSpecs: ["frontend:typescript:tanstack-router", "backend:python:fastapi"],
    });
    params.set("view", "preview");
    params.set("file", "bts.jsonc");

    const initialState = getInitialBuilderState(Object.fromEntries(params.entries()));

    expect(initialState.initialized).toBe(true);
    expect(initialState.stack.stackMode).toBe("multi");
    expect(initialState.stack.stackPartSpecs).toEqual([
      "frontend:typescript:tanstack-router",
      "backend:python:fastapi",
    ]);
    expect(initialState.viewMode).toBe("preview");
    expect(initialState.selectedFile).toBe("bts.jsonc");
  });

  it("supports compact share paths for exact ecosystem and default multi stacks", () => {
    const elixirStack = parseStackShareSlug("Elixir");
    const multiStack = createDefaultMultiEcosystemShareStack();

    expect(elixirStack?.ecosystem).toBe("elixir");
    expect(getStackSharePath(elixirStack as typeof DEFAULT_STACK)).toBe("/Elixir");
    expect(getStackSharePath(multiStack)).toBe("/multi-ecosystem");
    expect(parseStackShareSlug("multi-ecosystem")).toEqual(multiStack);
  });

  it("keeps compact share paths out of default generated share URLs", () => {
    const elixirStack = parseStackShareSlug("Elixir");
    const multiStack = createDefaultMultiEcosystemShareStack();

    expect(
      generateStackSharingUrl(elixirStack as typeof DEFAULT_STACK, "https://example.com"),
    ).toBe("https://example.com/stack?eco=elixir&au=none");
    expect(generateStackSharingUrl(multiStack, "https://example.com")).toContain(
      "https://example.com/stack?mode=multi",
    );
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

  it("uses React Native categories when the React Native ecosystem is selected", () => {
    expect(getCategoryOrderForEcosystem("react-native")).toBe(REACT_NATIVE_CATEGORY_ORDER);
    expect(getCategoryOrderForEcosystem("react-native")).not.toBe(TYPESCRIPT_CATEGORY_ORDER);
    expect(getCategoryOrderForEcosystem("react-native")).toContain("nativeFrontend");
    expect(getCategoryOrderForEcosystem("react-native")).toContain("mobileNavigation");
    expect(getCategoryOrderForEcosystem("react-native")).not.toContain("webFrontend");
    expect(getCategoryOrderForEcosystem("react-native")).toEqual(
      expect.arrayContaining(ECOSYSTEM_CATEGORIES["react-native"]),
    );
  });
});
