import { describe, expect, it } from "bun:test";

import { analyzeStackCompatibility } from "@/components/stack-builder/utils";
import { DEFAULT_STACK, PRESET_TEMPLATES, type StackState } from "@/lib/stack/constant";
import { resolvePresetStack } from "@/lib/stack/preset-stack";

// The stack the builder ends up with after applying a preset and its compatibility pass.
function applyPreset(presetStack: Partial<StackState>): StackState {
  const stack = resolvePresetStack({ ...DEFAULT_STACK, ...presetStack } as StackState);
  return { ...stack, ...analyzeStackCompatibility(stack).adjustedStack };
}

const examplePresets = PRESET_TEMPLATES.filter((preset) => preset.category === "examples");

describe("example presets", () => {
  it("covers every example the builder no longer lists", () => {
    const examples = new Set(examplePresets.flatMap((preset) => preset.stack.examples ?? []));
    expect([...examples].sort()).toEqual(["ai", "chat-sdk"]);
  });

  // Compatibility rules drop an example the stack cannot run, so a preset could otherwise
  // apply without the example it is named after.
  for (const preset of examplePresets) {
    it(`${preset.id} keeps its example after normalization`, () => {
      expect(applyPreset(preset.stack).examples).toEqual(preset.stack.examples ?? []);
    });
  }
});
