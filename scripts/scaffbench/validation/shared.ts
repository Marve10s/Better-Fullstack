import { readdir } from "node:fs/promises";
import path from "node:path";

/** Dependency/build trees shared by validation discovery and source metrics. */
export const PROJECT_WALK_SKIP_DIRECTORIES = new Set([
  "node_modules",
  "target",
  ".git",
  "deps",
  "_build",
  "vendor",
  "Pods",
  ".venv",
  ".dart_tool",
  ".gradle",
  "obj",
  "bin",
  "dist",
  "build",
  ".next",
  ".expo",
  ".svelte-kit",
  ".output",
  ".nuxt",
  ".vercel",
  ".turbo",
  ".wrangler",
  "coverage",
]);

export function parseJsonc(raw: string) {
  const withoutLineComments = raw
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
  const withoutTrailingCommas = withoutLineComments.replace(/,\s*([}\]])/g, "$1");
  try {
    return JSON.parse(withoutTrailingCommas);
  } catch {
    return null;
  }
}

export async function walk(dir: string, visit: (filePath: string) => Promise<void>) {
  // Validation also ignores Turbo's cache. Source metrics intentionally do not:
  // their exclusion contract is the exact shared set above.
  const skip = new Set([...PROJECT_WALK_SKIP_DIRECTORIES, ".turbo"]);
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const next = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(next, visit);
    } else if (entry.isFile()) {
      await visit(next);
    }
  }
}
