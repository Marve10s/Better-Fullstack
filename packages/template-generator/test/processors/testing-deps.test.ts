import { describe, expect, it } from "bun:test";

import { processTestingDeps } from "../../src/processors/testing-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

function expectIncludesAll(actual: readonly string[], expected: readonly string[]): void {
  for (const item of expected) {
    expect(actual).toContain(item);
  }
}

describe("processTestingDeps", () => {
  it("adds Vitest and React Testing Library dependencies to web, server, and api packages", () => {
    const vfs = createSeededVFS([
      "apps/web/package.json",
      "apps/server/package.json",
      "packages/api/package.json",
    ]);

    processTestingDeps(
      vfs,
      makeConfig({
        testing: "vitest",
        frontend: ["react-router"],
      }),
    );

    const web = getDeps(vfs, "apps/web/package.json");
    const server = getDeps(vfs, "apps/server/package.json");
    const api = getDeps(vfs, "packages/api/package.json");

    expectIncludesAll(web.devDeps, [
      "vitest",
      "@vitest/ui",
      "@vitest/coverage-v8",
      "jsdom",
      "@testing-library/dom",
      "@testing-library/user-event",
      "@testing-library/jest-dom",
      "@testing-library/react",
    ]);
    expect(server.devDeps).toEqual(["@vitest/coverage-v8", "@vitest/ui", "jsdom", "vitest"]);
    expect(api.devDeps).toEqual(["@vitest/coverage-v8", "@vitest/ui", "jsdom", "vitest"]);
  });

  it("adds Jest and Vue Testing Library for Nuxt", () => {
    const vfs = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);

    processTestingDeps(
      vfs,
      makeConfig({
        testing: "jest",
        frontend: ["nuxt"],
      }),
    );

    expectIncludesAll(getDeps(vfs, "apps/web/package.json").devDeps, [
      "jest",
      "@types/jest",
      "ts-jest",
      "@jest/globals",
      "jest-environment-jsdom",
      "@testing-library/dom",
      "@testing-library/user-event",
      "@testing-library/jest-dom",
      "@testing-library/vue",
    ]);
  });

  it("adds Playwright without Testing Library for pure e2e mode", () => {
    const vfs = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);

    processTestingDeps(
      vfs,
      makeConfig({
        testing: "playwright",
        frontend: ["svelte"],
      }),
    );

    expect(getDeps(vfs, "apps/web/package.json").devDeps).toEqual([
      "@playwright/test",
      "playwright",
    ]);
  });

  it("adds Vitest, Playwright, and Svelte Testing Library in combined mode", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processTestingDeps(
      vfs,
      makeConfig({
        testing: "vitest-playwright",
        frontend: ["astro"],
        astroIntegration: "svelte",
      }),
    );

    expectIncludesAll(getDeps(vfs, "apps/web/package.json").devDeps, [
      "vitest",
      "@vitest/ui",
      "@vitest/coverage-v8",
      "jsdom",
      "@playwright/test",
      "playwright",
      "@testing-library/dom",
      "@testing-library/user-event",
      "@testing-library/jest-dom",
      "@testing-library/svelte",
    ]);
  });

  it("adds Cypress without Testing Library and respects redwood package paths", () => {
    const vfs = createSeededVFS(["web/package.json", "api/package.json"]);

    processTestingDeps(
      vfs,
      makeConfig({
        testing: "cypress",
        frontend: ["redwood"],
        backend: "none",
      }),
    );

    expect(getDeps(vfs, "web/package.json").devDeps).toEqual(["cypress"]);
    expect(getDeps(vfs, "api/package.json").devDeps).toEqual(["cypress"]);
  });

  it("does nothing when testing is none", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processTestingDeps(vfs, makeConfig({ testing: "none" }));

    expect(getDeps(vfs, "apps/web/package.json")).toEqual({ deps: [], devDeps: [] });
  });
});
