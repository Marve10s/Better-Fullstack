import { describe, expect, it } from "bun:test";

import { VirtualFileSystem } from "../../src/core/virtual-fs";
import { processIntegrationsTemplates } from "../../src/template-handlers/integrations";
import { makeConfig } from "../_fixtures/config-factory";
import { makeTemplates } from "../_fixtures/template-factory";

describe("processIntegrationsTemplates", () => {
  const templates = makeTemplates({
    "integrations/nango/server/base/src/lib/nango.ts.hbs": "nango server client",
  });

  it("emits Nango server files for supported self backends", async () => {
    const vfs = new VirtualFileSystem();

    await processIntegrationsTemplates(
      vfs,
      templates,
      makeConfig({
        integrations: "nango",
        backend: "self",
        frontend: ["next"],
      }),
    );

    expect(vfs.readFile("apps/web/src/lib/nango.ts")).toBe("nango server client");
  });

  it("does not emit Nango server files for Cloudflare self backends", async () => {
    const vfs = new VirtualFileSystem();

    await processIntegrationsTemplates(
      vfs,
      templates,
      makeConfig({
        integrations: "nango",
        backend: "self",
        frontend: ["next"],
        webDeploy: "cloudflare",
      }),
    );

    expect(vfs.getAllFiles()).toHaveLength(0);
  });
});
