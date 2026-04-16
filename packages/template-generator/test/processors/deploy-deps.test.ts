import { describe, expect, it } from "bun:test";

import { processDeployDeps } from "../../src/processors/deploy-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

function expectIncludesAll(actual: readonly string[], expected: readonly string[]): void {
  for (const item of expected) {
    expect(actual).toContain(item);
  }
}

describe("processDeployDeps", () => {
  it("adds Svelte node adapter for Fly and Railway web deployments", () => {
    const flyVfs = createSeededVFS(["apps/web/package.json"]);
    const railwayVfs = createSeededVFS(["apps/web/package.json"]);

    processDeployDeps(
      flyVfs,
      makeConfig({
        frontend: ["svelte"],
        webDeploy: "fly",
      }),
    );
    processDeployDeps(
      railwayVfs,
      makeConfig({
        frontend: ["svelte"],
        webDeploy: "railway",
      }),
    );

    expect(getDeps(flyVfs, "apps/web/package.json").devDeps).toEqual(["@sveltejs/adapter-node"]);
    expect(getDeps(railwayVfs, "apps/web/package.json").devDeps).toEqual([
      "@sveltejs/adapter-node",
    ]);
  });

  it("adds SST root dependencies and framework-specific web adapters", () => {
    const nextVfs = createSeededVFS(["package.json", "apps/web/package.json"]);
    const svelteVfs = createSeededVFS(["package.json", "apps/web/package.json"]);

    processDeployDeps(
      nextVfs,
      makeConfig({
        frontend: ["next"],
        webDeploy: "sst",
      }),
    );
    processDeployDeps(
      svelteVfs,
      makeConfig({
        frontend: ["svelte"],
        serverDeploy: "sst",
        webDeploy: "sst",
      }),
    );

    expectIncludesAll(getDeps(nextVfs, "package.json").devDeps, ["sst", "aws-cdk-lib", "constructs"]);
    expect(getDeps(nextVfs, "apps/web/package.json").devDeps).toEqual(["@opennextjs/aws"]);
    expectIncludesAll(getDeps(svelteVfs, "apps/web/package.json").devDeps, ["@sveltejs/adapter-node"]);
  });

  it("adds Vercel root dependency and the Svelte adapter when needed", () => {
    const vfs = createSeededVFS(["package.json", "apps/web/package.json"]);

    processDeployDeps(
      vfs,
      makeConfig({
        frontend: ["svelte"],
        webDeploy: "vercel",
        serverDeploy: "vercel",
      }),
    );

    expect(getDeps(vfs, "package.json").devDeps).toEqual(["vercel"]);
    expect(getDeps(vfs, "apps/web/package.json").devDeps).toEqual(["@sveltejs/adapter-vercel"]);
  });

  it("adds Cloudflare server dependencies for separate backends", () => {
    const vfs = createSeededVFS(["package.json", "apps/server/package.json"]);

    processDeployDeps(
      vfs,
      makeConfig({
        serverDeploy: "cloudflare",
        backend: "hono",
      }),
    );

    expect(getDeps(vfs, "package.json").devDeps).toEqual(["@cloudflare/workers-types"]);
    expectIncludesAll(getDeps(vfs, "apps/server/package.json").devDeps, [
      "alchemy",
      "wrangler",
      "@types/node",
      "@cloudflare/workers-types",
    ]);
  });

  it("adds Cloudflare web dependencies for supported frameworks", () => {
    const nextVfs = createSeededVFS(["package.json", "apps/web/package.json"]);
    const nuxtVfs = createSeededVFS(["package.json", "apps/web/package.json"]);
    const svelteVfs = createSeededVFS(["package.json", "apps/web/package.json"]);
    const tanstackStartVfs = createSeededVFS(["package.json", "apps/web/package.json"]);
    const reactVfs = createSeededVFS(["package.json", "apps/web/package.json"]);

    processDeployDeps(
      nextVfs,
      makeConfig({
        frontend: ["next"],
        webDeploy: "cloudflare",
      }),
    );
    processDeployDeps(
      nuxtVfs,
      makeConfig({
        frontend: ["nuxt"],
        webDeploy: "cloudflare",
      }),
    );
    processDeployDeps(
      svelteVfs,
      makeConfig({
        frontend: ["svelte"],
        webDeploy: "cloudflare",
      }),
    );
    processDeployDeps(
      tanstackStartVfs,
      makeConfig({
        frontend: ["tanstack-start"],
        webDeploy: "cloudflare",
      }),
    );
    processDeployDeps(
      reactVfs,
      makeConfig({
        frontend: ["react-router"],
        webDeploy: "cloudflare",
      }),
    );

    expectIncludesAll(getDeps(nextVfs, "apps/web/package.json").deps, ["@opennextjs/cloudflare"]);
    expectIncludesAll(getDeps(nextVfs, "apps/web/package.json").devDeps, [
      "alchemy",
      "wrangler",
      "@cloudflare/workers-types",
    ]);
    expectIncludesAll(getDeps(nuxtVfs, "apps/web/package.json").devDeps, [
      "alchemy",
      "nitro-cloudflare-dev",
      "wrangler",
    ]);
    expectIncludesAll(getDeps(svelteVfs, "apps/web/package.json").devDeps, [
      "alchemy",
      "@sveltejs/adapter-cloudflare",
    ]);
    expectIncludesAll(getDeps(tanstackStartVfs, "apps/web/package.json").devDeps, [
      "alchemy",
      "@cloudflare/vite-plugin",
      "wrangler",
    ]);
    expect(getDeps(reactVfs, "apps/web/package.json").devDeps).toEqual(["alchemy"]);
  });

  it("does not add server cloudflare deps for self backends", () => {
    const vfs = createSeededVFS(["package.json", "apps/server/package.json"]);

    processDeployDeps(
      vfs,
      makeConfig({
        serverDeploy: "cloudflare",
        backend: "self",
      }),
    );

    expect(getDeps(vfs, "package.json").devDeps).toEqual(["@cloudflare/workers-types"]);
    expect(getDeps(vfs, "apps/server/package.json")).toEqual({ deps: [], devDeps: [] });
  });
});
