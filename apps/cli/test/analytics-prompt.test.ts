import { describe, expect, it } from "bun:test";

import { resolveAnalyticsPrompt } from "../src/prompts/analytics";

describe("analytics prompt", () => {
  it("offers Vercel Analytics for web frontends", () => {
    const resolution = resolveAnalyticsPrompt({ frontend: ["next"] });

    expect(resolution.shouldPrompt).toBe(true);
    expect(resolution.options.map((option) => option.value)).toContain("vercel-analytics");
  });

  it("respects flags and skips non-web projects", () => {
    expect(
      resolveAnalyticsPrompt({ analytics: "vercel-analytics", frontend: ["next"] }).autoValue,
    ).toBe("vercel-analytics");
    expect(resolveAnalyticsPrompt({ frontend: ["native-bare"] }).autoValue).toBe("none");
  });
});
