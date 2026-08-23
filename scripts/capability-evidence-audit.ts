#!/usr/bin/env bun

import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

import { getCapabilityInventory, type CapabilityInventoryRecord } from "../packages/types/src";

export const CAPABILITY_EVIDENCE_AUDIT_SCHEMA_VERSION = 1 as const;

export type CapabilityEvidenceSignalKind =
  | "todo-branch"
  | "placeholder"
  | "manual-setup"
  | "dependency-only-candidate";

export type CapabilityEvidenceSignal = {
  kind: CapabilityEvidenceSignalKind;
  path: string;
  line: number | null;
  excerpt: string;
  optionIds: string[];
  maintenanceOwner: string;
  failedEvidenceStage: "generated" | "build-verified" | "runtime-verified";
};

const SOURCE_EXTENSIONS = new Set([
  ".cs",
  ".ex",
  ".exs",
  ".go",
  ".hbs",
  ".java",
  ".js",
  ".json",
  ".kt",
  ".md",
  ".py",
  ".rs",
  ".toml",
  ".ts",
  ".tsx",
  ".xml",
  ".yaml",
  ".yml",
]);

const SIGNAL_PATTERNS: readonly {
  kind: Exclude<CapabilityEvidenceSignalKind, "dependency-only-candidate">;
  pattern: RegExp;
  failedEvidenceStage: CapabilityEvidenceSignal["failedEvidenceStage"];
}[] = [
  {
    kind: "todo-branch",
    pattern: /\b(?:TODO|FIXME|NOT IMPLEMENTED)\b/i,
    failedEvidenceStage: "generated",
  },
  {
    kind: "placeholder",
    pattern:
      /\b(?:placeholder|replace-before-production|your[-_ ](?:api|client|project|secret|token)|example\.com)\b/i,
    failedEvidenceStage: "runtime-verified",
  },
  {
    kind: "manual-setup",
    pattern:
      /\b(?:manual setup|required dashboard setup|create (?:an? )?(?:account|application|project)|set [A-Z][A-Z0-9_]+ in|configure (?:the )?provider)\b/i,
    failedEvidenceStage: "runtime-verified",
  },
] as const;

const DEPENDENCY_PATH =
  /(?:deps|package\.json|pyproject\.toml|Cargo\.toml|go\.mod|mix\.exs|\.csproj|pom\.xml|build\.gradle)/i;

async function sourceFiles(root: string): Promise<string[]> {
  const files: string[] = [];
  async function walk(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        if (["dist", "node_modules", ".git"].includes(entry.name)) continue;
        // oxlint-disable-next-line no-await-in-loop -- directory order keeps output deterministic
        await walk(path);
      } else if (SOURCE_EXTENSIONS.has(extname(entry.name)) || entry.name === "Dockerfile") {
        files.push(path);
      }
    }
  }
  await walk(root);
  return files.sort();
}

function optionIndex(inventory: readonly CapabilityInventoryRecord[]) {
  const byOptionId = new Map<string, CapabilityInventoryRecord[]>();
  for (const record of inventory) {
    byOptionId.set(record.optionId, [...(byOptionId.get(record.optionId) ?? []), record]);
  }
  return byOptionId;
}

function mentionedOptionIds(line: string, optionIds: readonly string[]): string[] {
  const lower = line.toLowerCase();
  return optionIds.filter((optionId) => {
    if (optionId.length < 3) return false;
    return lower.includes(optionId.toLowerCase());
  });
}

export async function auditCapabilityEvidence(root = process.cwd()) {
  const inventory = getCapabilityInventory({ includeHidden: true });
  const byOptionId = optionIndex(inventory);
  const optionIds = [...byOptionId.keys()].sort((left, right) => right.length - left.length);
  const scanRoots = [
    resolve(root, "packages/template-generator/templates"),
    resolve(root, "packages/template-generator/src/processors"),
    resolve(root, "packages/template-generator/src/template-handlers"),
  ];
  const files = (await Promise.all(scanRoots.map(sourceFiles))).flat().sort();
  const contents = new Map<string, string>();
  const signals: CapabilityEvidenceSignal[] = [];

  for (const path of files) {
    // oxlint-disable-next-line no-await-in-loop -- ordered reads make the report stable
    const text = await readFile(path, "utf8");
    contents.set(path, text);
    const lines = text.split("\n");
    for (const [index, line] of lines.entries()) {
      for (const rule of SIGNAL_PATTERNS) {
        if (!rule.pattern.test(line)) continue;
        const ids = mentionedOptionIds(`${path}\n${line}`, optionIds);
        signals.push({
          kind: rule.kind,
          path: relative(root, path),
          line: index + 1,
          excerpt: line.trim().slice(0, 240),
          optionIds: ids,
          maintenanceOwner:
            ids.flatMap((id) => byOptionId.get(id) ?? [])[0]?.maintenanceOwner ?? "@Marve10s",
          failedEvidenceStage: rule.failedEvidenceStage,
        });
      }
    }
  }

  for (const optionId of optionIds) {
    const dependencyMatches = [...contents].filter(
      ([path, text]) => DEPENDENCY_PATH.test(path) && text.includes(`"${optionId}"`),
    );
    if (dependencyMatches.length === 0) continue;
    const behavioralMatches = [...contents].filter(
      ([path, text]) => !DEPENDENCY_PATH.test(path) && text.includes(optionId),
    );
    if (behavioralMatches.length > 0) continue;
    const record = byOptionId.get(optionId)?.[0];
    signals.push({
      kind: "dependency-only-candidate",
      path: relative(root, dependencyMatches[0]![0]),
      line: null,
      excerpt: `${optionId} appears in dependency wiring but not in a generated behavior template.`,
      optionIds: [optionId],
      maintenanceOwner: record?.maintenanceOwner ?? "@Marve10s",
      failedEvidenceStage: "generated",
    });
  }

  const byKind = Object.fromEntries(
    ["todo-branch", "placeholder", "manual-setup", "dependency-only-candidate"].map((kind) => [
      kind,
      signals.filter((signal) => signal.kind === kind).length,
    ]),
  );
  return {
    schemaVersion: CAPABILITY_EVIDENCE_AUDIT_SCHEMA_VERSION,
    scannedFiles: files.length,
    publicOptionRecords: inventory.filter((record) => record.public).length,
    findings: signals.sort(
      (left, right) =>
        left.path.localeCompare(right.path) ||
        (left.line ?? 0) - (right.line ?? 0) ||
        left.kind.localeCompare(right.kind),
    ),
    summary: byKind,
  };
}

function markdown(report: Awaited<ReturnType<typeof auditCapabilityEvidence>>): string {
  return [
    "# Capability evidence audit",
    "",
    `Scanned files: ${report.scannedFiles}`,
    `Public option records: ${report.publicOptionRecords}`,
    "",
    "| Signal | Count |",
    "| --- | ---: |",
    ...Object.entries(report.summary).map(([kind, count]) => `| ${kind} | ${count} |`),
    "",
    "Candidates require review. A source match does not by itself prove that an option is broken.",
    "",
  ].join("\n");
}

if (import.meta.main) {
  const report = await auditCapabilityEvidence();
  process.stdout.write(
    process.argv.includes("--markdown") ? markdown(report) : `${JSON.stringify(report, null, 2)}\n`,
  );
}
