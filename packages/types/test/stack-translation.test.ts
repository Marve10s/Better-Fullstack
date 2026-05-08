import { describe, expect, it } from "bun:test";

import type { StackSelectionInput } from "../src/stack-translation";
import {
  DEFAULT_STACK_SELECTION,
  STACK_SELECTION_KEYS,
  STACK_SELECTION_URL_KEYS,
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  isCliDefaultStackSelection,
  isStackSelectionDefault,
  normalizeStackSelection,
  parseStackSelectionFromUrlRecord,
  stackSelectionToProjectConfig,
} from "../src/stack-translation";

const DEFAULT_SELECTION = DEFAULT_STACK_SELECTION;

function toProjectConfig(selection: StackSelectionInput, install?: boolean) {
  return stackSelectionToProjectConfig(selection, {
    projectDir: "/virtual",
    relativePath: "./virtual",
    install,
  });
}

describe("stack selection translation", () => {
  it("exports the shared default stack contract", () => {
    expect(DEFAULT_STACK_SELECTION.ecosystem).toBe("typescript");
    expect(DEFAULT_STACK_SELECTION.webFrontend).toEqual(["tanstack-router"]);
    expect(DEFAULT_STACK_SELECTION.appPlatforms).toEqual(["turborepo"]);
    expect(DEFAULT_STACK_SELECTION.rustWebFramework).toBe("axum");
    expect(DEFAULT_STACK_SELECTION.pythonWebFramework).toBe("fastapi");
    expect(DEFAULT_STACK_SELECTION.goWebFramework).toBe("gin");
    expect(DEFAULT_STACK_SELECTION.javaTestingLibraries).toEqual(["junit5"]);
  });

  it("checks stack defaults with array-insensitive comparison and Convex adjustments", () => {
    expect(isStackSelectionDefault(DEFAULT_SELECTION, "aiDocs", ["claude-md"])).toBe(true);
    expect(
      isStackSelectionDefault(
        { ...DEFAULT_SELECTION, backend: "convex" },
        "runtime",
        "none",
      ),
    ).toBe(true);
  });

  it("keeps URL keys, parsing, serialization, and normalization in the shared contract", () => {
    expect(Object.keys(DEFAULT_STACK_SELECTION)).toEqual(STACK_SELECTION_KEYS);
    expect(Object.keys(STACK_SELECTION_URL_KEYS)).toEqual(STACK_SELECTION_KEYS);

    const input = normalizeStackSelection({
      ...DEFAULT_SELECTION,
      ecosystem: "python",
      projectName: "parity-app",
      webFrontend: ["astro"],
      astroIntegration: "react",
      backend: "self-next",
      codeQuality: ["none", "biome"],
      documentation: ["fumadocs"],
      appPlatforms: ["pwa", "wxt"],
      examples: ["ai", "chat-sdk"],
      aiDocs: ["agents-md", "claude-md"],
      git: "false",
      install: "true",
      pythonAi: ["none", "langchain"],
      yolo: "true",
    });

    const params = createStackSelectionSearchParams(input, { includeDefaults: true });
    const parsed = parseStackSelectionFromUrlRecord(Object.fromEntries(params.entries()));

    expect(input.codeQuality).toEqual(["biome"]);
    expect(input.pythonAi).toEqual(["langchain"]);
    expect(parsed).toEqual(input);
  });

  it("detects the default TypeScript stack and emits --yes", () => {
    expect(isCliDefaultStackSelection(DEFAULT_SELECTION)).toBe(true);
    expect(generateStackSelectionCommand(DEFAULT_SELECTION)).toBe(
      "bun create better-fullstack@latest my-app --yes",
    );
  });

  it("maps builder aliases into ProjectConfig fields", () => {
    const config = toProjectConfig({
      ...DEFAULT_SELECTION,
      backend: "self-next",
      backendLibraries: "effect-full",
      aiSdk: "langgraph",
    });

    expect(config.backend).toBe("self");
    expect(config.effect).toBe("effect-full");
    expect(config.ai).toBe("langgraph");
  });

  it("merges web and native frontend selections", () => {
    const selection = {
      ...DEFAULT_SELECTION,
      webFrontend: ["next"],
      nativeFrontend: ["native-bare"],
    } satisfies StackSelectionInput;
    const config = toProjectConfig(selection);

    expect(config.frontend).toEqual(["next", "native-bare"]);
    expect(generateStackSelectionCommand(selection)).toContain("--frontend next native-bare");
  });

  it("merges addon groups", () => {
    const selection = {
      ...DEFAULT_SELECTION,
      codeQuality: ["biome"],
      documentation: ["fumadocs"],
      appPlatforms: ["pwa"],
    } satisfies StackSelectionInput;
    const config = toProjectConfig(selection);

    expect(config.addons).toEqual(["biome", "fumadocs", "pwa"]);
    expect(generateStackSelectionCommand(selection)).toContain("--addons biome fumadocs pwa");
  });

  it("converts boolean-like strings and allows preview install overrides", () => {
    const selection = {
      ...DEFAULT_SELECTION,
      git: "false",
      install: "false",
    } satisfies StackSelectionInput;

    expect(toProjectConfig(selection).git).toBe(false);
    expect(toProjectConfig(selection).install).toBe(false);
    expect(toProjectConfig({ ...selection, install: "true" }, false).install).toBe(false);
  });

  it("filters none out of multi-select arrays", () => {
    const config = toProjectConfig({
      ...DEFAULT_SELECTION,
      rustLibraries: ["none", "validator"],
      pythonAi: ["none"],
      javaLibraries: ["none", "spring-actuator"],
      javaTestingLibraries: ["none", "junit5"],
    });

    expect(config.rustLibraries).toEqual(["validator"]);
    expect(config.pythonAi).toEqual([]);
    expect(config.javaLibraries).toEqual(["spring-actuator"]);
    expect(config.javaTestingLibraries).toEqual(["junit5"]);
    expect(generateStackSelectionCommand({ ...DEFAULT_SELECTION, ecosystem: "go", aiDocs: [] }))
      .toContain("--ai-docs none");
  });

  it("applies compatibility adjustments before producing ProjectConfig", () => {
    const config = toProjectConfig({
      ...DEFAULT_SELECTION,
      backend: "convex",
    });

    expect(config.runtime).toBe("none");
    expect(config.database).toBe("none");
    expect(config.orm).toBe("none");
    expect(config.api).toBe("none");
    expect(config.dbSetup).toBe("none");
  });

  it("preserves command special cases", () => {
    const withoutAstro = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      webFrontend: ["next"],
      astroIntegration: "react",
    });
    const withAstro = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      webFrontend: ["astro"],
      astroIntegration: "react",
    });
    const withoutShadcn = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      uiLibrary: "daisyui",
      shadcnStyle: "vega",
    });
    const betaWithYolo = generateStackSelectionCommand({
      ...DEFAULT_SELECTION,
      versionChannel: "beta",
      yolo: "true",
    });

    expect(withoutAstro).not.toContain("--astro-integration");
    expect(withAstro).toContain("--astro-integration react");
    expect(withoutShadcn).not.toContain("--shadcn-style");
    expect(betaWithYolo).toContain("--version-channel beta");
    expect(betaWithYolo).toContain("--yolo");
  });
});
