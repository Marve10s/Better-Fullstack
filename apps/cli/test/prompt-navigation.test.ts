import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PROMPTS_DIR = join(import.meta.dir, "..", "src", "prompts");

function listTypeScriptFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      files.push(...listTypeScriptFiles(path));
    } else if (path.endsWith(".ts")) {
      files.push(path);
    }
  }

  return files;
}

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

    for (const file of listTypeScriptFiles(PROMPTS_DIR)) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/export async function (get[A-Za-z0-9]+Options)\(/g)) {
        matches.add(match[1]);
      }
    }

    expect([...matches].sort()).toEqual(["getShadcnOptions"]);
  });
});
