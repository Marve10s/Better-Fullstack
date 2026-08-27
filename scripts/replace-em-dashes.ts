#!/usr/bin/env bun
import { $ } from "bun";
import { readFile, stat, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

const EM_DASH = /\u2014/g;
const REPLACEMENT = "-";
// Benchmark archives keep the exact text their published results were scored against, and
// the paraglide directory is compiler output regenerated from apps/web/messages.
const EXCLUDED_PREFIXES = ["benchmarks/", "apps/web/src/paraglide/"];
const SKIPPED_EXTENSIONS = new Set([
  "avif",
  "gif",
  "ico",
  "jpeg",
  "jpg",
  "lock",
  "lockb",
  "mp4",
  "pdf",
  "png",
  "svg",
  "webm",
  "webp",
  "woff",
  "woff2",
  "zip",
]);

type Options = {
  paths: string[];
  check: boolean;
  dryRun: boolean;
};

function parseArgs(argv: string[]): Options {
  const paths: string[] = [];
  let check = false;
  let dryRun = false;

  for (const arg of argv) {
    if (arg === "--check") check = true;
    else if (arg === "--dry-run") dryRun = true;
    else if (arg.startsWith("--")) throw new Error(`Unknown flag: ${arg}`);
    else paths.push(arg);
  }

  return { paths, check, dryRun };
}

async function trackedFiles(paths: string[]): Promise<string[]> {
  const listed = await $`git ls-files -z --cached --others --exclude-standard -- ${paths}`.text();

  return listed
    .split("\0")
    .filter(Boolean)
    .filter((file) => !EXCLUDED_PREFIXES.some((prefix) => file.startsWith(prefix)));
}

function isSkippedByExtension(path: string): boolean {
  const extension = path.split(".").pop()?.toLowerCase();
  return extension !== undefined && SKIPPED_EXTENSIONS.has(extension);
}

async function isProbablyBinary(path: string): Promise<boolean> {
  const head = await Bun.file(path).slice(0, 8000).arrayBuffer();
  return new Uint8Array(head).includes(0);
}

async function main(): Promise<void> {
  const { paths, check, dryRun } = parseArgs(process.argv.slice(2));
  const files = await trackedFiles(paths);
  const changed: { path: string; count: number }[] = [];

  for (const file of files) {
    if (isSkippedByExtension(file)) continue;

    const absolute = resolve(file);
    if (!(await stat(absolute).catch(() => null))?.isFile()) continue;
    if (await isProbablyBinary(absolute)) continue;

    const contents = await readFile(absolute, "utf-8");
    const matches = contents.match(EM_DASH);
    if (!matches) continue;

    changed.push({ path: relative(process.cwd(), absolute), count: matches.length });
    if (!check && !dryRun) await writeFile(absolute, contents.replace(EM_DASH, REPLACEMENT));
  }

  if (changed.length === 0) {
    console.log("No em dashes found.");
    return;
  }

  const total = changed.reduce((sum, entry) => sum + entry.count, 0);
  for (const { path, count } of changed) console.log(`${path}: ${count}`);
  const verb = check || dryRun ? "found in" : "replaced across";
  console.log(`\n${total} em dash${total === 1 ? "" : "es"} ${verb} ${changed.length} file(s).`);

  if (check) process.exitCode = 1;
}

await main();
