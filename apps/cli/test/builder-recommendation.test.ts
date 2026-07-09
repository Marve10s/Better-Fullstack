import { describe, expect, it } from "bun:test";

import { shouldShowBuilderRecommendationPrompt } from "../src/helpers/core/command-handlers";

function shouldShow({
  input = {},
  hasConfigBase = false,
  environment = {},
}: Parameters<typeof shouldShowBuilderRecommendationPrompt>[0]) {
  return shouldShowBuilderRecommendationPrompt({
    input,
    hasConfigBase,
    environment: {
      npmConfigUserAgent: "bun/1.2.0 npm/? node/v22",
      stdinIsTTY: true,
      stdoutIsTTY: true,
      ...environment,
    },
  });
}

describe("builder recommendation prompt gate", () => {
  it("shows for a package-manager create invocation in an interactive bare run", () => {
    expect(shouldShow({ input: {} })).toBe(true);
  });

  it("requires a package-manager user agent unless forced", () => {
    expect(
      shouldShow({
        input: {},
        environment: { npmConfigUserAgent: undefined },
      }),
    ).toBe(false);
    expect(
      shouldShow({
        input: {},
        environment: {
          npmConfigUserAgent: undefined,
          forceBuilderPrompt: "1",
        },
      }),
    ).toBe(true);
  });

  it("does not bypass interactivity for the force override", () => {
    expect(
      shouldShow({
        input: {},
        environment: {
          npmConfigUserAgent: undefined,
          forceBuilderPrompt: "1",
          stdinIsTTY: false,
        },
      }),
    ).toBe(false);
  });

  it("can be skipped with BFS_SKIP_BUILDER_PROMPT", () => {
    expect(
      shouldShow({
        input: {},
        environment: { skipBuilderPrompt: "1" },
      }),
    ).toBe(false);
  });

  it("does not show outside interactive terminals or inside CI", () => {
    expect(shouldShow({ input: {}, environment: { stdinIsTTY: false } })).toBe(false);
    expect(shouldShow({ input: {}, environment: { stdoutIsTTY: false } })).toBe(false);
    expect(shouldShow({ input: {}, environment: { ci: "1" } })).toBe(false);
  });

  it("does not show when stack/config shortcuts are present", () => {
    expect(shouldShow({ input: { frontend: ["next"] } })).toBe(false);
    expect(shouldShow({ input: { yes: true } })).toBe(false);
    expect(shouldShow({ input: { dryRun: true } })).toBe(false);
    expect(shouldShow({ input: { part: ["frontend:typescript:next"] } })).toBe(false);
    expect(shouldShow({ input: { config: "bts.jsonc" } })).toBe(false);
    expect(shouldShow({ input: {}, hasConfigBase: true })).toBe(false);
  });
});
