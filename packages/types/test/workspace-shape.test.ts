import { describe, expect, it } from "bun:test";

import {
  analyzeStackCompatibility,
  stackQualifiesForSingleApp,
  type CompatibilityInput,
} from "../src/compatibility";
import { DEFAULT_STACK_SELECTION } from "../src/stack-translation";

function makeStack(overrides: Partial<CompatibilityInput>): CompatibilityInput {
  return {
    ...DEFAULT_STACK_SELECTION,
    ...overrides,
  } as unknown as CompatibilityInput;
}

const THIN_SELF_NEXT: Partial<CompatibilityInput> = {
  workspaceShape: "single-app",
  backend: "self-next",
  webFrontend: ["next"],
  nativeFrontend: ["none"],
  api: "none",
  database: "none",
  orm: "none",
  auth: "none",
  payments: "none",
  email: "none",
  runtime: "none",
  serverDeploy: "none",
  webDeploy: "none",
  testing: "none",
  examples: [],
  appPlatforms: [],
};

describe("stackQualifiesForSingleApp", () => {
  it("qualifies a thin self-next stack", () => {
    expect(stackQualifiesForSingleApp(makeStack(THIN_SELF_NEXT))).toBe(true);
  });

  it("qualifies a thin self-tanstack-start stack", () => {
    expect(
      stackQualifiesForSingleApp(
        makeStack({
          ...THIN_SELF_NEXT,
          backend: "self-tanstack-start",
          webFrontend: ["tanstack-start"],
        }),
      ),
    ).toBe(true);
  });

  it("does not qualify a self-nuxt stack (deferred)", () => {
    expect(
      stackQualifiesForSingleApp(
        makeStack({ ...THIN_SELF_NEXT, backend: "self-nuxt", webFrontend: ["nuxt"] }),
      ),
    ).toBe(false);
  });

  it("does not qualify when a sibling-package capability is present", () => {
    expect(stackQualifiesForSingleApp(makeStack({ ...THIN_SELF_NEXT, auth: "better-auth" }))).toBe(
      false,
    );
    expect(
      stackQualifiesForSingleApp(
        makeStack({ ...THIN_SELF_NEXT, database: "postgres", orm: "drizzle" }),
      ),
    ).toBe(false);
    expect(stackQualifiesForSingleApp(makeStack({ ...THIN_SELF_NEXT, api: "trpc" }))).toBe(false);
  });

  it("does not qualify when a native frontend is present", () => {
    expect(
      stackQualifiesForSingleApp(
        makeStack({ ...THIN_SELF_NEXT, nativeFrontend: ["native-bare"] }),
      ),
    ).toBe(false);
  });
});

describe("analyzeStackCompatibility workspace shape normalization", () => {
  it("downgrades single-app -> monorepo for a non-qualifying stack", () => {
    const result = analyzeStackCompatibility(
      makeStack({
        workspaceShape: "single-app",
        backend: "hono",
        webFrontend: ["tanstack-router"],
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        api: "trpc",
      }),
    );

    expect(result.adjustedStack?.workspaceShape).toBe("monorepo");
    expect(result.changes.some((change) => change.category === "workspaceShape")).toBe(true);
  });

  it("preserves single-app for a qualifying thin self app", () => {
    const result = analyzeStackCompatibility(makeStack(THIN_SELF_NEXT));

    // The stack may be adjusted for unrelated reasons, but if it is, workspaceShape stays single-app.
    const shape = result.adjustedStack?.workspaceShape ?? "single-app";
    expect(shape).toBe("single-app");
    expect(result.changes.some((change) => change.category === "workspaceShape")).toBe(false);
  });

  it("leaves monorepo untouched (the default shape)", () => {
    const result = analyzeStackCompatibility(makeStack({ workspaceShape: "monorepo" }));
    expect(result.changes.some((change) => change.category === "workspaceShape")).toBe(false);
  });
});
