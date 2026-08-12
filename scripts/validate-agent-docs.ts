import { existsSync, readFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");

const tracked = Bun.spawnSync(
  ["git", "ls-files", "--cached", "--others", "--exclude-standard", "*.md"],
  {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
  },
);

if (tracked.exitCode !== 0) {
  throw new Error(new TextDecoder().decode(tracked.stderr).trim());
}

const markdownFiles = new TextDecoder()
  .decode(tracked.stdout)
  .trim()
  .split("\n")
  .filter(Boolean)
  .filter((path) => existsSync(resolve(root, path)))
  .filter(
    (path) =>
      !path.startsWith("plugin/skills/") &&
      !path.startsWith("packages/template-generator/templates/"),
  );

const errors: string[] = [];
const externalProtocol = /^[a-z][a-z\d+.-]*:/i;

function localTarget(rawTarget: string) {
  let target = rawTarget.trim();

  if (target.startsWith("<")) {
    const closing = target.indexOf(">");
    target = closing === -1 ? target.slice(1) : target.slice(1, closing);
  } else {
    target = target.split(/\s+["']/u, 1)[0] ?? "";
  }

  if (
    !target ||
    target.startsWith("#") ||
    target.startsWith("/") ||
    externalProtocol.test(target)
  ) {
    return undefined;
  }

  const path = target.split(/[?#]/u, 1)[0];
  if (!path) return undefined;

  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

function checkTarget(source: string, rawTarget: string) {
  const target = localTarget(rawTarget);
  if (!target) return;

  const absolute = resolve(root, dirname(source), target);
  if (!absolute.startsWith(`${root}/`) || !existsSync(absolute)) {
    errors.push(`${source}: missing local link ${rawTarget}`);
  }
}

for (const path of markdownFiles) {
  const text = readFileSync(resolve(root, path), "utf8");

  for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)\n]+)\)/gu)) {
    checkTarget(path, match[1]);
  }

  for (const match of text.matchAll(/^\s*\[[^\]]+\]:\s*(\S+)/gmu)) {
    checkTarget(path, match[1]);
  }
}

function requireIndexed(directory: string, indexPath: string, additionalIndexes: string[] = []) {
  const indexes = [indexPath, ...additionalIndexes]
    .map((path) => readFileSync(resolve(root, path), "utf8"))
    .join("\n");

  for (const path of markdownFiles.filter(
    (path) => dirname(path) === directory && !path.endsWith("/README.md"),
  )) {
    const name = relative(directory, path);
    if (!indexes.includes(name)) errors.push(`${path}: missing from ${indexPath}`);
  }
}

requireIndexed("docs/guidelines", "docs/guidelines/README.md", ["AGENTS.md"]);
requireIndexed("docs/projects/active", "docs/projects/README.md");
requireIndexed("docs/projects/backlog", "docs/projects/README.md");
requireIndexed("docs/projects/completed", "docs/projects/README.md");
requireIndexed("docs/reference", "docs/reference/README.md");
requireIndexed("docs", "docs/README.md");

for (const path of markdownFiles) {
  const text = readFileSync(resolve(root, path), "utf8");
  if (text.includes("docs/plans/")) errors.push(`${path}: references removed docs/plans/ path`);
  if (path.startsWith("docs/projects/backlog/") && /^\s*-\s*\[[xX]\]/mu.test(text)) {
    errors.push(`${path}: contains completed checklist items; move shipped history to completed/`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${markdownFiles.length} agent Markdown files and their indexes.`);
