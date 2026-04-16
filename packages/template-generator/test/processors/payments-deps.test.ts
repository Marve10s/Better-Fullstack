import { describe, expect, it } from "bun:test";

import { processPaymentsDeps } from "../../src/processors/payments-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

function expectIncludesAll(actual: readonly string[], expected: readonly string[]): void {
  for (const item of expected) {
    expect(actual).toContain(item);
  }
}

describe("processPaymentsDeps", () => {
  it("adds Polar dependencies for convex projects", () => {
    const vfs = createSeededVFS(["packages/backend/package.json", "apps/web/package.json"]);

    processPaymentsDeps(
      vfs,
      makeConfig({
        payments: "polar",
        backend: "convex",
        frontend: ["next"],
      }),
    );

    expectIncludesAll(getDeps(vfs, "packages/backend/package.json").deps, [
      "@convex-dev/polar",
      "@polar-sh/sdk",
    ]);
    expectIncludesAll(getDeps(vfs, "apps/web/package.json").deps, [
      "@convex-dev/polar",
      "@polar-sh/checkout",
    ]);
  });

  it("adds Polar dependencies for standard auth and client-capable web frontends", () => {
    const vfs = createSeededVFS(["packages/auth/package.json", "apps/web/package.json"]);

    processPaymentsDeps(
      vfs,
      makeConfig({
        payments: "polar",
        frontend: ["svelte"],
      }),
    );

    expectIncludesAll(getDeps(vfs, "packages/auth/package.json").deps, [
      "@polar-sh/better-auth",
      "@polar-sh/sdk",
    ]);
    expect(getDeps(vfs, "apps/web/package.json").deps).toEqual(["@polar-sh/better-auth"]);
  });

  it("adds Stripe server, auth, and client libraries by frontend type", () => {
    const reactVfs = createSeededVFS([
      "apps/server/package.json",
      "packages/auth/package.json",
      "apps/web/package.json",
    ]);
    const svelteVfs = createSeededVFS([
      "apps/server/package.json",
      "packages/auth/package.json",
      "apps/web/package.json",
    ]);

    processPaymentsDeps(
      reactVfs,
      makeConfig({
        payments: "stripe",
        frontend: ["react-router"],
      }),
    );
    processPaymentsDeps(
      svelteVfs,
      makeConfig({
        payments: "stripe",
        frontend: ["svelte"],
      }),
    );

    expect(getDeps(reactVfs, "apps/server/package.json").deps).toEqual(["stripe"]);
    expect(getDeps(reactVfs, "packages/auth/package.json").deps).toEqual(["stripe"]);
    expectIncludesAll(getDeps(reactVfs, "apps/web/package.json").deps, [
      "@stripe/stripe-js",
      "@stripe/react-stripe-js",
    ]);
    expect(getDeps(svelteVfs, "apps/web/package.json").deps).toEqual(["@stripe/stripe-js"]);
  });

  it("adds Lemon Squeezy to server and auth packages only", () => {
    const vfs = createSeededVFS(["apps/server/package.json", "packages/auth/package.json", "apps/web/package.json"]);

    processPaymentsDeps(
      vfs,
      makeConfig({
        payments: "lemon-squeezy",
        frontend: ["next"],
      }),
    );

    expect(getDeps(vfs, "apps/server/package.json").deps).toEqual(["@lemonsqueezy/lemonsqueezy.js"]);
    expect(getDeps(vfs, "packages/auth/package.json").deps).toEqual([
      "@lemonsqueezy/lemonsqueezy.js",
    ]);
    expect(getDeps(vfs, "apps/web/package.json")).toEqual({ deps: [], devDeps: [] });
  });

  it("adds Paddle and Dodo server/auth packages plus client checkout deps", () => {
    const paddleVfs = createSeededVFS([
      "apps/server/package.json",
      "packages/auth/package.json",
      "apps/web/package.json",
    ]);
    const dodoVfs = createSeededVFS([
      "apps/server/package.json",
      "packages/auth/package.json",
      "apps/web/package.json",
    ]);

    processPaymentsDeps(
      paddleVfs,
      makeConfig({
        payments: "paddle",
        frontend: ["nuxt"],
      }),
    );
    processPaymentsDeps(
      dodoVfs,
      makeConfig({
        payments: "dodo",
        frontend: ["solid"],
      }),
    );

    expect(getDeps(paddleVfs, "apps/server/package.json").deps).toEqual(["@paddle/paddle-node-sdk"]);
    expect(getDeps(paddleVfs, "packages/auth/package.json").deps).toEqual([
      "@paddle/paddle-node-sdk",
    ]);
    expect(getDeps(paddleVfs, "apps/web/package.json").deps).toEqual(["@paddle/paddle-js"]);

    expect(getDeps(dodoVfs, "apps/server/package.json").deps).toEqual(["dodopayments"]);
    expect(getDeps(dodoVfs, "packages/auth/package.json").deps).toEqual(["dodopayments"]);
    expect(getDeps(dodoVfs, "apps/web/package.json").deps).toEqual(["dodopayments-checkout"]);
  });

  it("does nothing when payments is none", () => {
    const vfs = createSeededVFS(["apps/server/package.json", "packages/auth/package.json", "apps/web/package.json"]);

    processPaymentsDeps(vfs, makeConfig({ payments: "none" }));

    expect(getDeps(vfs, "apps/server/package.json")).toEqual({ deps: [], devDeps: [] });
    expect(getDeps(vfs, "packages/auth/package.json")).toEqual({ deps: [], devDeps: [] });
    expect(getDeps(vfs, "apps/web/package.json")).toEqual({ deps: [], devDeps: [] });
  });
});
