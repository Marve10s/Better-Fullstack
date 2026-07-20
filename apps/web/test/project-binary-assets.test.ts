import { describe, expect, it } from "bun:test";
import fs from "node:fs";
import path from "node:path";

// import.meta.glob is expanded by Vite at build time and silently produces an
// empty map when the pattern matches nothing, so a wrong relative path only
// surfaces as a runtime "Missing browser binary template" error. This test
// resolves the pattern from the source file the same way Vite does and fails
// loudly instead.

const SOURCE_FILE = path.join(__dirname, "../src/lib/project-binary-assets.ts");

function extractGlobPattern(): string {
  const source = fs.readFileSync(SOURCE_FILE, "utf8");
  const match = source.match(/import\.meta\.glob\(\s*"([^"]+)"/);
  if (!match) throw new Error("No import.meta.glob pattern found in project-binary-assets.ts");
  return match[1];
}

describe("project-binary-assets glob", () => {
  it("resolves to the generated templates-binary directory", () => {
    const pattern = extractGlobPattern();
    const baseDir = pattern.replace(/\/\*\*\/\*$/, "");
    const resolved = path.resolve(path.dirname(SOURCE_FILE), baseDir);

    expect(fs.existsSync(resolved)).toBe(true);
    expect(
      fs.existsSync(path.join(resolved, "frontend/react/next/src/app/favicon.ico")),
    ).toBe(true);
  });
});
