import { describe, expect, it } from "bun:test";

import { PRESET_ALIASES, PRESET_IDS } from "@/catalog/preset-ids";
import { analyzeStackCompatibility } from "@/stack/compatibility";
import {
  applyPresetOptions,
  getPreset,
  getPresetVariants,
  PRESET_CATEGORIES,
  PRESET_DEFINITIONS,
} from "@/stack/presets";
import { DEFAULT_STACK_SELECTION } from "@/stack/stack-translation";

describe("preset registry", () => {
  it("lists every preset id exactly once", () => {
    expect(PRESET_DEFINITIONS.map((preset) => preset.id)).toEqual([...PRESET_IDS]);
  });

  it("places every preset in a known category", () => {
    const categories = new Set(PRESET_CATEGORIES.map((category) => category.id));
    for (const preset of PRESET_DEFINITIONS) expect(categories.has(preset.category)).toBe(true);
  });

  it("resolves every retired id to a current preset", () => {
    for (const [alias, target] of Object.entries(PRESET_ALIASES)) {
      expect(getPreset(alias)?.id).toBe(target);
    }
  });

  it("keeps each Future Stack variant unchanged by the compatibility engine", () => {
    const preset = getPreset("future-stack");
    expect(preset).toBeDefined();
    const variants = getPresetVariants(preset!);
    expect(variants).toHaveLength(4);

    for (const options of variants) {
      const stack = { ...DEFAULT_STACK_SELECTION, ...applyPresetOptions(preset!, options) };
      const { changes } = analyzeStackCompatibility(stack);
      expect({ options, changes }).toEqual({ options, changes: [] });
    }
  });
});
