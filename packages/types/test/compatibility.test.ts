import { describe, expect, it } from "bun:test";

import {
  analyzeStackCompatibility,
  evaluateCompatibility,
  getAIFrontendCompatibilityIssue,
  getApiFrontendCompatibilityIssue,
  getDisabledReason,
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

  it("allows plain Elixir projects while blocking Phoenix-specific scaffolds", () => {
    const stack = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "none",
    };

    expect(getDisabledReason(stack, "elixirWebFramework", "none")).toBeNull();
    expect(getDisabledReason(stack, "elixirJobs", "quantum")).toBeNull();
    expect(getDisabledReason(stack, "elixirHttp", "req")).toBeNull();
    expect(getDisabledReason(stack, "elixirAuth", "phx-gen-auth")).toBe(
      "Elixir auth scaffolds require Phoenix",
    );
    expect(getDisabledReason(stack, "elixirApi", "rest")).toBe(
      "Elixir API scaffolds require Phoenix",
    );
    expect(getDisabledReason(stack, "elixirRealtime", "channels")).toBe(
      "Elixir realtime scaffolds require Phoenix",
    );
  });

  it("keeps non-Phoenix Elixir selections when Phoenix is removed", () => {
    const result = analyzeStackCompatibility({
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "elixir",
      elixirWebFramework: "none",
      elixirOrm: "ecto-sql",
      elixirAuth: "phx-gen-auth",
      elixirApi: "rest",
      elixirRealtime: "channels",
      elixirJobs: "quantum",
      elixirHttp: "req",
      elixirObservability: "phoenix-telemetry",
    });

    expect(result.adjustedStack).toMatchObject({
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirJobs: "quantum",
      elixirHttp: "req",
      elixirObservability: "none",
    });
  });
});
