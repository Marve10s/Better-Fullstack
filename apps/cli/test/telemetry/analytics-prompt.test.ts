import { describe, expect, it } from "bun:test";

import { resolveAnalyticsPrompt } from "@/prompts/services/analytics";

describe("analytics prompt", () => {
  it("offers Vercel Analytics for web frontends", () => {
    const resolution = resolveAnalyticsPrompt({ frontend: ["next"] });

    expect(resolution.shouldPrompt).toBe(true);
    expect(resolution.options.map((option) => option.value)).toContain("vercel-analytics");
  });

  it("hides Vercel Analytics for unsupported web frontends", () => {
    const resolution = resolveAnalyticsPrompt({ frontend: ["angular"] });

    expect(resolution.shouldPrompt).toBe(true);
    expect(resolution.options.map((option) => option.value)).not.toContain("vercel-analytics");
  });

  it("only offers providers with templates for every selected web frontend", () => {
    expect(
      resolveAnalyticsPrompt({ frontend: ["astro"] }).options.map((option) => option.value),
    ).toEqual(["vercel-analytics", "ga4", "none"]);
    expect(
      resolveAnalyticsPrompt({ frontend: ["vue"] }).options.map((option) => option.value),
    ).toEqual(["vercel-analytics", "umami", "posthog", "ga4", "none"]);
  });

  it("respects flags and skips non-web projects", () => {
    expect(
      resolveAnalyticsPrompt({ analytics: "vercel-analytics", frontend: ["next"] }).autoValue,
    ).toBe("vercel-analytics");
    expect(resolveAnalyticsPrompt({ frontend: ["native-bare"] }).autoValue).toBe("none");
  });
});
