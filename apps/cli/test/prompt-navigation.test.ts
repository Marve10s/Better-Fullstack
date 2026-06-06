import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const PROMPTS_DIR = join(import.meta.dir, "..", "src", "prompts");

describe("prompt back-navigation guards", () => {
  it("propagates go-back from every nested shadcn prompt", () => {
    const source = readFileSync(join(PROMPTS_DIR, "shadcn-options.ts"), "utf8");

    const promptFunctionNames = [...source.matchAll(/async function (promptShadcn\w+)/g)].map(
      ([, name]) => name,
    );

    expect(promptFunctionNames).toEqual([
      "promptShadcnBase",
      "promptShadcnStyle",
      "promptShadcnIconLibrary",
      "promptShadcnColorTheme",
      "promptShadcnBaseColor",
      "promptShadcnFont",
      "promptShadcnRadius",
    ]);

    for (const name of promptFunctionNames) {
      const start = source.indexOf(`async function ${name}`);
      const nextFunction = source.indexOf("\nasync function ", start + 1);
      const body = source.slice(start, nextFunction === -1 ? undefined : nextFunction);
      const goBackIndex = body.indexOf("if (isGoBack(selected)) return selected;");
      const cancelIndex = body.indexOf("if (isCancel(selected)) return exitCancelled");

      expect(goBackIndex).toBeGreaterThan(-1);
      expect(cancelIndex).toBeGreaterThan(-1);
      expect(goBackIndex).toBeLessThan(cancelIndex);
    }
  });

  it("keeps shadcn as the only nested option prompt collector", () => {
    const matches = new Set<string>();
    const output = Bun.spawnSync({
      cmd: ["rg", "-n", "export async function get[A-Za-z0-9]+Options\\(", PROMPTS_DIR],
      stdout: "pipe",
      stderr: "pipe",
    });

    expect(output.exitCode).toBe(0);

    for (const line of output.stdout.toString().trim().split("\n")) {
      const match = line.match(/get[A-Za-z0-9]+Options/);
      if (match) matches.add(match[0]);
    }

    expect([...matches].sort()).toEqual(["getShadcnOptions"]);
  });
});
