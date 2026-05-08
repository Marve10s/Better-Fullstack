import { describe, expect, it } from "bun:test";

import {
  evaluateCompatibility,
  getAIFrontendCompatibilityIssue,
  getApiFrontendCompatibilityIssue,
} from "../src/compatibility";
import { DEFAULT_STACK_SELECTION } from "../src/stack-translation";

describe("compatibility issue helpers", () => {
  it("returns structured API/frontend issues for React-only APIs", () => {
    const issue = getApiFrontendCompatibilityIssue("trpc", ["svelte"]);

    expect(issue).toMatchObject({
      code: "API_REQUIRES_REACT_FRONTEND",
      message: "tRPC API requires React-based frontends.",
      category: "api",
      optionId: "trpc",
      provided: { api: "trpc", frontend: "svelte" },
    });
    expect(issue?.suggestions).toContain("Use --api orpc (works with all frontends)");
  });

  it("returns structured API/frontend issues for Astro non-React integrations", () => {
    const issue = getApiFrontendCompatibilityIssue("ts-rest", ["astro"], "svelte");

    expect(issue).toMatchObject({
      code: "ASTRO_API_REQUIRES_REACT_INTEGRATION",
      message: "ts-rest API requires React integration with Astro.",
      category: "api",
      optionId: "ts-rest",
      provided: { api: "ts-rest", "astro-integration": "svelte" },
    });
  });

  it("allows frontend-agnostic API options", () => {
    expect(getApiFrontendCompatibilityIssue("orpc", ["svelte"])).toBeUndefined();
  });

  it("returns structured TanStack AI frontend issues", () => {
    const issue = getAIFrontendCompatibilityIssue("tanstack-ai", ["svelte"]);

    expect(issue).toMatchObject({
      code: "TANSTACK_AI_REQUIRES_REACT_OR_SOLID_FRONTEND",
      category: "ai",
      optionId: "tanstack-ai",
      provided: { ai: "tanstack-ai", frontend: ["svelte"] },
    });
    expect(issue?.message).toContain("TanStack AI requires React or Solid frontend");
  });

  it("includes structured API and AI issues in compatibility evaluation", () => {
    const result = evaluateCompatibility({
      ...DEFAULT_STACK_SELECTION,
      webFrontend: ["svelte"],
      nativeFrontend: [],
      api: "trpc",
      aiSdk: "tanstack-ai",
    });

    expect(result.issues.map((issue) => issue.code)).toContain("API_REQUIRES_REACT_FRONTEND");
    expect(result.issues.map((issue) => issue.code)).toContain(
      "TANSTACK_AI_REQUIRES_REACT_OR_SOLID_FRONTEND",
    );
  });
});
