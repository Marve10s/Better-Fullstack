import { describe, expect, it } from "bun:test";

import { resolveBotProtectionPrompt } from "../src/prompts/bot-protection";

describe("bot protection prompt", () => {
  it("does not offer bot protection when React Native is also selected", () => {
    const values = resolveBotProtectionPrompt({ frontends: ["next", "native-bare"] }).options.map(
      (option) => option.value,
    );

    expect(values).toEqual(["none"]);
  });

  it("skips bot protection for native-only projects", () => {
    const resolution = resolveBotProtectionPrompt({ frontends: ["native-bare"] });

    expect(resolution.shouldPrompt).toBe(false);
    expect(resolution.autoValue).toBe("none");
    expect(resolution.options).toEqual([]);
  });

  it("does not offer Turnstile for an unsupported web frontend", () => {
    const values = resolveBotProtectionPrompt({ frontends: ["svelte"] }).options.map(
      (option) => option.value,
    );

    expect(values).toEqual(["none"]);
  });
});
