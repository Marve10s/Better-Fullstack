import {
  getCategoryOrderForEcosystem,
  getToolingSelectionOptions,
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

import { buildRandomStack } from "@/components/stack-builder/stack-builder";
import { GRAPH_COMMON_CATEGORY_ORDER } from "@/components/stack-builder/utils";
import { ECOSYSTEM_CATEGORIES } from "@/lib/stack/constant";
import { DEFAULT_STACK } from "@/lib/stack/stack-defaults";
import {
  createDefaultMultiEcosystemShareStack,
  getStackSharePath,
  parseStackShareSlug,
} from "@/lib/stack/stack-share-paths";
import { getCanonicalStackSharePath } from "@/lib/stack/stack-share-slugs";
import { createLiveBuilderSearchParams, getInitialBuilderState } from "@/lib/stack/stack-url-state";
import { generateStackSharingUrl } from "@/lib/stack/stack-utils";

type MappedStackStateKey = keyof typeof STACK_STATE_OPTION_CATEGORY_BY_KEY;

function isMappedStackStateKey(key: string): key is MappedStackStateKey {
  return key in STACK_STATE_OPTION_CATEGORY_BY_KEY;
}

describe("StackState contract", () => {
  it("exposes dedicated tooling sections in multi-stack finalization", () => {
    expect(GRAPH_COMMON_CATEGORY_ORDER).toContain("toolchainProfile");
    expect(GRAPH_COMMON_CATEGORY_ORDER).toContain("workspaceRunner");
    expect(GRAPH_COMMON_CATEGORY_ORDER).toContain("codeQualityProfile");
    expect(GRAPH_COMMON_CATEGORY_ORDER).not.toContain("appPlatforms");
  });

  it("never randomizes a Vite+ toolchain alongside the tooling it owns", () => {
    const vitePlusOwnedToolIds = new Set(
      (["workspaceRunner", "codeQuality", "gitHooks"] as const).flatMap((toolingCategory) =>
        getToolingSelectionOptions(toolingCategory).flatMap((option) => option.toolIds),
      ),
    );

    let vitePlusDraws = 0;
    const conflicts: string[] = [];
    // vite-plus is drawn roughly half the time, so 40 attempts make a miss
    // vanishingly unlikely while keeping this well inside the test timeout.
    for (let attempt = 0; attempt < 40; attempt++) {
      const randomStack = { ...DEFAULT_STACK, ...buildRandomStack(DEFAULT_STACK) };
      if (!randomStack.appPlatforms.includes("vite-plus")) continue;
      vitePlusDraws++;
      conflicts.push(
        ...[...randomStack.appPlatforms, ...randomStack.codeQuality].filter((toolId) =>
          vitePlusOwnedToolIds.has(toolId),
        ),
      );
    }

    expect(vitePlusDraws).toBeGreaterThan(0);
    expect(conflicts).toEqual([]);
  });

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

      if (category === "documentation") {
        expect(Array.isArray(defaultValue)).toBe(true);
      } else if (metadata.selectionMode === "multiple") {
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

  it("preserves campaign attribution while synchronizing builder URL state", () => {
    const initialState = getInitialBuilderState({
      preset: "nextjs-minimal",
      view: "run",
      campaign: "run-before-you-clone",
    });
    const params = createLiveBuilderSearchParams(
      initialState.stack,
      initialState.viewMode,
      initialState.selectedFile,
      initialState.campaign,
    );

    expect(initialState.campaign).toBe("run-before-you-clone");
    expect(params.get("campaign")).toBe("run-before-you-clone");
  });

  it("round-trips schema-backed starter track filters through builder URL state", () => {
    const initialState = getInitialBuilderState({
      tr: "python",
      td: "container",
      tpm: "uv",
      tdb: "postgres",
      ta: "none",
      tws: "single-app",
      te: "listed",
    });
    const params = createLiveBuilderSearchParams(
      initialState.stack,
      initialState.viewMode,
      initialState.selectedFile,
      initialState.campaign,
      initialState.starterTrackFilters,
    );

    expect(initialState.starterTrackFilters).toEqual({
      evidence: "listed",
      runtime: "python",
      deploymentTarget: "container",
      packageManager: "uv",
      database: "postgres",
      auth: "none",
      workspaceShape: "single-app",
    });
    expect(Object.fromEntries(params.entries())).toMatchObject({
      te: "listed",
      tr: "python",
      td: "container",
      tpm: "uv",
      tdb: "postgres",
      ta: "none",
      tws: "single-app",
    });
  });

  it("supports compact share paths for exact ecosystem and default multi stacks", () => {
    const elixirStack = parseStackShareSlug("Elixir");
    const multiStack = createDefaultMultiEcosystemShareStack();

    expect(elixirStack?.ecosystem).toBe("elixir");
    expect(getStackSharePath(elixirStack as typeof DEFAULT_STACK)).toBe("/elixir");
    expect(getStackSharePath(multiStack)).toBe("/multi-ecosystem");
    expect(parseStackShareSlug("multi-ecosystem")).toEqual(multiStack);
  });

  it("canonicalizes compact ecosystem share paths to lowercase", () => {
    const dotnetStack = parseStackShareSlug("DotNet");

    expect(getCanonicalStackSharePath("TypeScript")).toBe("/typescript");
    expect(getCanonicalStackSharePath("React-Native")).toBe("/react-native");
    expect(getCanonicalStackSharePath("Elixir")).toBe("/elixir");
    expect(getCanonicalStackSharePath("DotNet")).toBe("/dotnet");
    expect(dotnetStack?.ecosystem).toBe("dotnet");
    expect(getStackSharePath(dotnetStack as typeof DEFAULT_STACK)).toBe("/dotnet");
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
