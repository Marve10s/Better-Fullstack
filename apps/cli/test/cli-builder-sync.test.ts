import {
  getCategoryCliValues,
  getOptionMetadata,
  type OptionCategory,
  OPTION_CATEGORY_METADATA,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import { CreateCommandOptionsSchema } from "../src/create-command-input";
import { PROMPT_RESOLVER_REGISTRY } from "../src/prompts/prompt-resolver-registry";
import { STACK_STATE_OPTION_CATEGORY_BY_KEY } from "../../web/src/lib/stack-contract";
import { TECH_OPTIONS } from "../../web/src/lib/constant";
import { stackStateKeys } from "../../web/src/lib/stack-url-state.shared";

const BUILDER_CATEGORY_TO_CLI_OPTION_KEY: Partial<
  Record<keyof typeof TECH_OPTIONS, keyof typeof CreateCommandOptionsSchema.shape>
> = {
  webFrontend: "frontend",
  nativeFrontend: "frontend",
  backendLibraries: "effect",
  ai: "ai",
  codeQuality: "addons",
  documentation: "addons",
  appPlatforms: "addons",
};

const NON_BUILDER_CREATE_OPTION_KEYS = new Set([
  "ecosystem",
  "template",
  "yes",
  "yolo",
  "verbose",
  "dryRun",
  "directoryConflict",
  "renderTitle",
  "disableAnalytics",
  "manualDb",
]);

const createOptionKeys = Object.keys(CreateCommandOptionsSchema.shape);

function getCreateOptionKey(category: keyof typeof TECH_OPTIONS) {
  return BUILDER_CATEGORY_TO_CLI_OPTION_KEY[category] ?? category;
}

describe("CLI and Builder catalog parity", () => {
  const categoryMetadata = OPTION_CATEGORY_METADATA;
  const categoriesToTest = Object.keys(categoryMetadata) as OptionCategory[];

  it("keeps every canonical category exposed in the builder", () => {
    const missingBuilderCategories = categoriesToTest.filter(
      (category) => !TECH_OPTIONS[category as keyof typeof TECH_OPTIONS],
    );

    expect(missingBuilderCategories).toEqual([]);
  });

  for (const category of categoriesToTest) {
    const builderOptions = TECH_OPTIONS[category as keyof typeof TECH_OPTIONS];
    if (!builderOptions) continue;

    describe(`Category: ${category}`, () => {
      it("only exposes builder options that are valid CLI values", () => {
        const cliValues = new Set(getCategoryCliValues(category));
        const invalidBuilderValues = builderOptions
          .map((option) => getOptionMetadata(category, option.id)?.cliValue ?? option.id)
          .filter((value) => !cliValues.has(value));

        expect(invalidBuilderValues).toEqual([]);
      });

      it("keeps every CLI value represented in the builder", () => {
        const builderCliValues = new Set(
          builderOptions.map(
            (option) => getOptionMetadata(category, option.id)?.cliValue ?? option.id,
          ),
        );
        const missingBuilderValues = getCategoryCliValues(category).filter(
          (value) => !builderCliValues.has(value),
        );

        expect(missingBuilderValues).toEqual([]);
      });

      it("uses canonical labels for aliased builder options", () => {
        for (const entry of builderOptions) {
          const metadata = getOptionMetadata(category, entry.id);
          if (!metadata || metadata.aliases.length === 0) continue;

          expect(entry.name).toBe(metadata.label);
        }
      });
    });
  }

  it("keeps every builder category backed by a CLI create-command option", () => {
    const missingCliKeys = (Object.keys(TECH_OPTIONS) as Array<keyof typeof TECH_OPTIONS>)
      .map((category) => getCreateOptionKey(category))
      .filter((key) => !createOptionKeys.includes(key));

    expect(missingCliKeys).toEqual([]);
  });

  it("does not introduce unexpected CLI create options without an explicit non-builder reason", () => {
    const builderBackedKeys = new Set(
      (Object.keys(TECH_OPTIONS) as Array<keyof typeof TECH_OPTIONS>).map((category) =>
        getCreateOptionKey(category),
      ),
    );

    const unexpectedKeys = createOptionKeys.filter(
      (key) => !builderBackedKeys.has(key) && !NON_BUILDER_CREATE_OPTION_KEYS.has(key),
    );

    expect(unexpectedKeys).toEqual([]);
  });
});

describe("StackState to CLI input parity", () => {
  it("maps every option-backed StackState key to a create-command input field", () => {
    const missingCliKeys = stackStateKeys
      .filter((key) => STACK_STATE_OPTION_CATEGORY_BY_KEY[key] !== undefined)
      .map((key) => {
        const techCategory = key === "aiSdk" ? "ai" : key;
        return getCreateOptionKey(techCategory as keyof typeof TECH_OPTIONS);
      })
      .filter((key) => !createOptionKeys.includes(key));

    expect(missingCliKeys).toEqual([]);
  });
});

describe("CLI prompts vs schemas parity", () => {
  for (const [category, contract] of Object.entries(PROMPT_RESOLVER_REGISTRY)) {
    describe(`Prompt: ${category}`, () => {
      const schemaValues = new Set(contract.schemaValues);
      const coverageValues = new Set<string>();
      const resolutions = contract.coverageContexts.map((context) => contract.resolve(context));

      for (const resolution of resolutions) {
        for (const promptOption of resolution.options) {
          coverageValues.add(promptOption.value);
        }

        const autoValues = resolution.autoValue;
        if (typeof autoValues === "string") {
          coverageValues.add(autoValues);
        } else if (Array.isArray(autoValues)) {
          for (const value of autoValues) {
            coverageValues.add(value);
          }
        }
      }

      it("only exposes schema-valid prompt option values", () => {
        const invalidOptions = resolutions.flatMap((resolution) =>
          resolution.options
            .map((promptOption) => promptOption.value)
            .filter((value) => !schemaValues.has(value)),
        );

        expect(invalidOptions).toEqual([]);
      });

      it("covers every schema value via prompt paths or auto-resolved values", () => {
        const missingValues = contract.schemaValues.filter((value) => !coverageValues.has(value));

        expect(missingValues).toEqual([]);
      });
    });
  }

  it("auto-resolves API when the backend makes API selection irrelevant", () => {
    const resolution = PROMPT_RESOLVER_REGISTRY.api.resolve({ backend: "convex" });

    expect(resolution.shouldPrompt).toBe(false);
    expect(resolution.autoValue).toBe("none");
  });

  it("auto-resolves runtime when the backend does not use a runtime prompt", () => {
    const resolution = PROMPT_RESOLVER_REGISTRY.runtime.resolve({ backend: "self" });

    expect(resolution.shouldPrompt).toBe(false);
    expect(resolution.autoValue).toBe("none");
  });

  it("filters auth options by ecosystem and backend/frontend context", () => {
    const typescriptResolution = PROMPT_RESOLVER_REGISTRY.auth.resolve({
      ecosystem: "typescript",
      backend: "self",
      frontend: ["next"],
    });
    const goResolution = PROMPT_RESOLVER_REGISTRY.auth.resolve({
      ecosystem: "go",
      backend: "none",
      frontend: [],
    });

    expect(typescriptResolution.options.map((option) => option.value)).toContain("nextauth");
    expect(typescriptResolution.options.map((option) => option.value)).not.toContain(
      "go-better-auth",
    );
    expect(goResolution.options.map((option) => option.value)).toContain("go-better-auth");
  });
});
