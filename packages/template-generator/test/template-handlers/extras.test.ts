import { describe, expect, it } from "bun:test";

import { VirtualFileSystem } from "../../src/core/virtual-fs";
import { processExtrasTemplates } from "../../src/template-handlers/extras";
import { makeConfig } from "../_fixtures/config-factory";
import { makeTemplates } from "../_fixtures/template-factory";

describe("processExtrasTemplates", () => {
  it("emits pnpm .npmrc for native workspaces", async () => {
    const templates = makeTemplates({
      "extras/pnpm-workspace.yaml": "packages:\n  - apps/*\n  - packages/*\n",
      "extras/_npmrc.hbs": "node-linker=isolated\n",
    });
    const vfs = new VirtualFileSystem();

    await processExtrasTemplates(
      vfs,
      templates,
      makeConfig({
        packageManager: "pnpm",
        ecosystem: "react-native",
        frontend: ["native-uniwind"],
        backend: "none",
        api: "none",
        runtime: "none",
        database: "none",
        orm: "none",
      }),
    );

    expect(vfs.readFile("pnpm-workspace.yaml")).toContain("packages:");
    expect(vfs.readFile(".npmrc")).toBe("node-linker=isolated\n");
  });
});
