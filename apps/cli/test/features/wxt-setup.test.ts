import { describe, expect, it, mock } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const executedCommands: string[] = [];

mock.module("execa", () => ({
  $: () => (strings: TemplateStringsArray, ...values: unknown[]) => {
    executedCommands.push(String.raw(strings, ...values.map(String)));
    return Promise.resolve();
  },
}));

const { setupWxt } = await import("@/helpers/addons/wxt-setup");

describe("setupWxt", () => {
  it("keeps the generated extension app instead of running wxt init on it", async () => {
    const projectDir = mkdtempSync(join(tmpdir(), "bfs-wxt-setup-"));
    const extensionDir = join(projectDir, "apps", "extension");
    mkdirSync(extensionDir, { recursive: true });
    const manifest = JSON.stringify({ name: "extension", scripts: { dev: "wxt --port 5555" } });
    writeFileSync(join(extensionDir, "package.json"), manifest);

    await setupWxt({ projectDir, packageManager: "bun" });

    expect(executedCommands).toEqual([]);
    expect(readFileSync(join(extensionDir, "package.json"), "utf8")).toBe(manifest);
  });
});
