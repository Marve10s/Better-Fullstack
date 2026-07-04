import { describe, expect, it } from "bun:test";

import { recommendStackFromBrief } from "../src/mcp";

describe("recommendStackFromBrief (prompt-to-stack)", () => {
  it("recommends a React Native stack for a mobile brief", () => {
    const result = recommendStackFromBrief("a mobile app for iOS and Android");
    expect(result.input.ecosystem).toBe("react-native");
    expect(result.matchedPreset).toBe("uniwind");
    expect(result.rationale.length).toBeGreaterThan(0);
  });

  it("selects Postgres + Drizzle when Postgres is mentioned", () => {
    const result = recommendStackFromBrief("a SaaS with postgres and better auth");
    expect(result.input.ecosystem).toBe("typescript");
    expect(result.input.database).toBe("postgres");
    expect(result.input.orm).toBe("drizzle");
  });

  it("honors an explicit non-TypeScript ecosystem hint", () => {
    const result = recommendStackFromBrief("an API service", "go");
    expect(result.input.ecosystem).toBe("go");
  });

  it("always returns a rationale explaining the recommendation", () => {
    const result = recommendStackFromBrief("a simple web app");
    expect(Array.isArray(result.rationale)).toBe(true);
    expect(result.rationale.length).toBeGreaterThan(0);
  });
});
