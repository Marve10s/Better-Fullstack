import { describe, expect, it } from "bun:test";

import { PRESET_TEMPLATES } from "@/lib/constant";
import { recommendPresetFromBrief } from "@/lib/recommend-preset";

function stackOf(presetId: string) {
  return PRESET_TEMPLATES.find((preset) => preset.id === presetId)?.stack;
}

describe("recommendPresetFromBrief (web prompt-to-stack)", () => {
  it("returns a valid, applyable preset id and a rationale", () => {
    const result = recommendPresetFromBrief("a simple web app");
    expect(PRESET_TEMPLATES.some((preset) => preset.id === result.presetId)).toBe(true);
    expect(result.presetName.length).toBeGreaterThan(0);
    expect(result.rationale.length).toBeGreaterThan(0);
  });

  it("recommends a native/mobile preset for a mobile brief", () => {
    const result = recommendPresetFromBrief("a mobile app for iOS and Android");
    const stack = stackOf(result.presetId);
    expect(stack).toBeDefined();
    expect(
      Array.isArray(stack?.nativeFrontend) && stack.nativeFrontend.some((frontend) => frontend !== "none"),
    ).toBe(true);
  });

  it("recommends a Postgres preset when Postgres is mentioned", () => {
    const result = recommendPresetFromBrief("a SaaS backend with postgres and user authentication");
    expect(stackOf(result.presetId)?.database).toBe("postgres");
  });

  it("surfaces the matched keywords that drove the recommendation", () => {
    const result = recommendPresetFromBrief("mobile app");
    expect(result.matchedTerms.length).toBeGreaterThan(0);
  });

  it("is deterministic for the same brief", () => {
    const first = recommendPresetFromBrief("a rust web service with a database");
    const second = recommendPresetFromBrief("a rust web service with a database");
    expect(first.presetId).toBe(second.presetId);
  });

  it("falls back to a preset for an empty brief without throwing", () => {
    const result = recommendPresetFromBrief("");
    expect(PRESET_TEMPLATES.some((preset) => preset.id === result.presetId)).toBe(true);
  });
});
