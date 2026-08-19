import { describe, expect, it } from "bun:test";
import fs from "node:fs";
import path from "node:path";

/**
 * Convex rejects a push outright when any module path component contains a
 * character outside `[A-Za-z0-9_.]` — a hyphenated helper silently broke every
 * production deploy for twelve days before anyone noticed, because nothing in
 * CI deploys this package.
 */
const CONVEX_PATH_COMPONENT = /^[A-Za-z0-9_.]+$/;
const convexDir = path.join(import.meta.dir, "..", "convex");

function moduleFiles(dir: string, prefix = ""): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === "_generated") return [];
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return moduleFiles(path.join(dir, entry.name), relative);
    return entry.name.endsWith(".ts") ? [relative] : [];
  });
}

describe("convex module paths", () => {
  it("uses only characters Convex accepts in a module path", () => {
    const invalid = moduleFiles(convexDir).filter((file) =>
      file.split("/").some((component) => !CONVEX_PATH_COMPONENT.test(component)),
    );

    expect(invalid).toEqual([]);
  });
});
