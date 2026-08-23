import { describe, expect, it } from "bun:test";

import { recommendStackFromBrief } from "../src/mcp";

describe("recommendStackFromBrief (prompt-to-stack)", () => {
  it("recommends a React Native stack for a mobile brief", () => {
    const result = recommendStackFromBrief("a mobile app for iOS and Android");
    expect(result.track.ecosystem).toBe("react-native");
    expect(result.track.presetId).toBe("uniwind");
    expect(result.rationale.length).toBeGreaterThan(0);
  });

  it("selects the canonical SaaS graph when SaaS is mentioned", () => {
    const result = recommendStackFromBrief("a SaaS with postgres and better auth");
    expect(result.track.id).toBe("saas-app");
    expect(result.track.stackPartSpecs).toContain("database:universal:postgres");
    expect(result.track.stackPartSpecs).toContain("backend.orm:typescript:drizzle");
  });

  it("honors an explicit supported ecosystem hint", () => {
    const result = recommendStackFromBrief("an API service", "java");
    expect(result.track.ecosystem).toBe("java");
    expect(result.track.id).toBe("java-api");
  });

  it("always returns a rationale explaining the recommendation", () => {
    const result = recommendStackFromBrief("a simple web app");
    expect(result.rationale.length).toBeGreaterThan(0);
    expect(result.recommendationMode).toBe("deterministic");
    expect(result.modelUsed).toBe(false);
  });
});
