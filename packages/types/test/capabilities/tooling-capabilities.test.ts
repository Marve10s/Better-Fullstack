import { describe, expect, it } from "bun:test";

import { AddonsSchema } from "@/config/schemas";
import {
  isToolingOverlayOnly,
  isToolingOverlayPart,
  TOOLING_CAPABILITIES,
  TOOLING_CATEGORIES,
  TOOLING_SELECTION_OPTIONS,
} from "@/capabilities/tooling-capabilities";

describe("tooling capability registry", () => {
  it("classifies every legacy capability exactly once", () => {
    const legacyToolIds = AddonsSchema.options.filter((toolId) => toolId !== "none").sort();
    const registeredToolIds = TOOLING_CAPABILITIES.map(({ toolId }) => toolId).sort();

    expect(registeredToolIds).toEqual(legacyToolIds);
    expect(new Set(registeredToolIds).size).toBe(registeredToolIds.length);
  });

  it("keeps every selection bound to one valid category and registered tools", () => {
    const categories = new Set(TOOLING_CATEGORIES.map(({ id }) => id));
    const registeredToolIds = new Set(TOOLING_CAPABILITIES.map(({ toolId }) => toolId));
    const selectionKeys = TOOLING_SELECTION_OPTIONS.map(({ category, id }) => `${category}:${id}`);

    expect(new Set(selectionKeys).size).toBe(selectionKeys.length);
    for (const selection of TOOLING_SELECTION_OPTIONS) {
      expect(categories.has(selection.category)).toBe(true);
      for (const toolId of selection.toolIds) {
        expect(registeredToolIds.has(toolId)).toBe(true);
      }
    }
  });

  it("exposes every registered capability through a selection profile", () => {
    const selectedToolIds = new Set(TOOLING_SELECTION_OPTIONS.flatMap(({ toolIds }) => toolIds));

    for (const { toolId } of TOOLING_CAPABILITIES) {
      expect(selectedToolIds.has(toolId)).toBe(true);
    }
  });

  it("treats a mismatched ecosystem as a non-overlay part", () => {
    expect(isToolingOverlayPart({ toolId: "biome", role: "codeQuality", ecosystem: "universal" })).toBe(
      true,
    );
    expect(isToolingOverlayPart({ toolId: "biome", role: "codeQuality", ecosystem: "go" })).toBe(
      false,
    );
    expect(
      isToolingOverlayOnly([
        { toolId: "turborepo", role: "workspaceRunner", ecosystem: "typescript" },
      ]),
    ).toBe(false);
  });
});
