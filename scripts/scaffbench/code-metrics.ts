import type { CodeMetrics } from "@scaffbench/types";

import { PROJECT_WALK_SKIP_DIRECTORIES } from "@scaffbench/validation/shared";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const LOCKFILES = new Set([
  "bun.lock",
  "bun.lockb",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "Cargo.lock",
  "go.sum",
  "mix.lock",
  "poetry.lock",
  "uv.lock",
  "Pipfile.lock",
  "packages.lock.json",
  "composer.lock",
  "Gemfile.lock",
  "gradle.lockfile",
]);

const BINARY_EXTENSIONS = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "ico",
  "pdf",
  "woff",
  "woff2",
  "ttf",
  "otf",
  "eot",
  "zip",
  "jar",
  "wasm",
  "keystore",
  "p8",
  "p12",
  "db",
  "sqlite",
]);

const BINARY_SNIFF_BYTES = 8 * 1024;

/** Measure authored project volume before validation installs or builds anything. */
export async function measureProjectCode(dir: string): Promise<CodeMetrics> {
  const metrics: CodeMetrics = { files: 0, lines: 0, bytes: 0 };

  async function visit(currentDir: string): Promise<void> {
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!PROJECT_WALK_SKIP_DIRECTORIES.has(entry.name)) {
          await visit(path.join(currentDir, entry.name));
        }
        continue;
      }
      if (!entry.isFile() || LOCKFILES.has(entry.name)) continue;

      const extension = path.extname(entry.name).slice(1).toLowerCase();
      if (BINARY_EXTENSIONS.has(extension)) continue;

      const contents = await readFile(path.join(currentDir, entry.name));
      if (contents.subarray(0, BINARY_SNIFF_BYTES).includes(0)) continue;

      metrics.files += 1;
      metrics.bytes += contents.byteLength;
      for (const byte of contents) {
        if (byte === 0x0a) metrics.lines += 1;
      }
      if (contents.byteLength > 0 && contents[contents.byteLength - 1] !== 0x0a) {
        metrics.lines += 1;
      }
    }
  }

  await visit(dir);
  return metrics;
}
