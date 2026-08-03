import { describe, expect, it } from "bun:test";

import { processIntegrationsDeps } from "../../src/processors/integrations-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

describe("processIntegrationsDeps", () => {
  it("adds the Nango SDK to supported self backends", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processIntegrationsDeps(
      vfs,
      makeConfig({
        integrations: "nango",
        backend: "self",
        frontend: ["next"],
      }),
    );

    expect(getDeps(vfs, "apps/web/package.json").deps).toEqual(["@nangohq/node"]);
  });

  it("does not add the Nango SDK to Cloudflare self backends", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processIntegrationsDeps(
      vfs,
      makeConfig({
        integrations: "nango",
        backend: "self",
        frontend: ["next"],
        webDeploy: "cloudflare",
      }),
    );

    expect(getDeps(vfs, "apps/web/package.json")).toEqual({ deps: [], devDeps: [] });
  });
});
