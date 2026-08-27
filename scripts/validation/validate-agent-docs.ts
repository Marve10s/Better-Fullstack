import { CAPABILITY_EVIDENCE_LEVELS } from "@better-fullstack/types";
import { existsSync, readFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";

const root = resolve(import.meta.dir, "../..");

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
      !path.startsWith(".zcode/") &&
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

const roadmapPath = "docs/next-updates-roadmap.md";
const roadmap = readFileSync(resolve(root, roadmapPath), "utf8");
const roadmapTaskIds = [...roadmap.matchAll(/^\|\s+((?:T\d+\.\d+)|(?:B\d+))\s+\|/gmu)].map(
  (match) => match[1],
);
const duplicateTaskIds = roadmapTaskIds.filter(
  (taskId, index) => roadmapTaskIds.indexOf(taskId) !== index,
);

if (roadmapTaskIds.length === 0) {
  errors.push(`${roadmapPath}: contains no machine-readable task rows`);
}
for (const taskId of new Set(duplicateTaskIds)) {
  errors.push(`${roadmapPath}: duplicate task id ${taskId}`);
}

function headingSlug(heading: string) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[`*_~]/gu, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/gu, "-")
    .replace(/-+/gu, "-");
}

const roadmapAnchors = new Set(
  [...roadmap.matchAll(/^#{1,6}\s+(.+)$/gmu)].map((match) => headingSlug(match[1])),
);
const projectIndexPath = "docs/projects/README.md";
const projectIndex = readFileSync(resolve(root, projectIndexPath), "utf8");

for (const match of projectIndex.matchAll(/\]\(\.\.\/next-updates-roadmap\.md#([^)]+)\)/gu)) {
  const anchor = match[1];
  if (!roadmapAnchors.has(anchor)) {
    errors.push(`${projectIndexPath}: missing roadmap heading #${anchor}`);
  }
}

const stalePlanningClaims = [
  {
    path: "docs/projects/active/platform-features.md",
    pattern:
      /- \[ \] (?:Record explicit generator\/template versions|Add manifest-v2 provenance|Add transactional, recoverable)/u,
    description: "lists shipped lifecycle provenance or recovery work as unfinished",
  },
  {
    path: "docs/projects/backlog/docker-and-devcontainers.md",
    pattern: /- \[ \] Add `--monorepo false` or `--single-app` flag/u,
    description: "lists the shipped constrained single-app mode as unimplemented",
  },
  {
    path: "docs/projects/completed/deployment-docs-and-docker-foundation-2026-05-21.md",
    pattern: /^- (?:DevContainer generation|Non-monorepo \/ single-app mode)\.$/mu,
    description: "lists shipped deployment foundation work as still planned",
  },
];

for (const claim of stalePlanningClaims) {
  const contents = readFileSync(resolve(root, claim.path), "utf8");
  if (claim.pattern.test(contents)) {
    errors.push(`${claim.path}: ${claim.description}`);
  }
}

const evidenceGuidePath = "docs/guidelines/capability-evidence-levels.md";
const evidenceGuide = readFileSync(resolve(root, evidenceGuidePath), "utf8");
const normalizedEvidenceGuide = evidenceGuide.replace(/\s+/gu, " ");
for (const level of CAPABILITY_EVIDENCE_LEVELS) {
  for (const requiredText of [level.label, level.proves, level.doesNotProve]) {
    if (!normalizedEvidenceGuide.includes(requiredText.replace(/\s+/gu, " "))) {
      errors.push(`${evidenceGuidePath}: missing canonical ${level.id} text: ${requiredText}`);
    }
  }
}

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
