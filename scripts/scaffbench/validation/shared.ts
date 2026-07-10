import { readdir } from "node:fs/promises";
import path from "node:path";

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
  const skip = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".turbo",
    "coverage",
    "target",
    ".venv",
    "bin",
    "obj",
    // Vendored-dependency trees. Hex packages ship their own package.json
    // (deps/phoenix_live_view has a FAILING npm build), and Go vendor trees ship
    // go.mod files — manifest discovery must never validate someone else's code.
    "deps",
    "_build",
    "vendor",
    "Pods",
  ]);
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
