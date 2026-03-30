#!/usr/bin/env bun
/**
 * Check for hardcoded versions in template files that drift from dependencyVersionMap.
 *
 * This script scans all package.json.hbs template files and compares the versions
 * against the central dependencyVersionMap in add-deps.ts.
 *
 * Usage:
 *   bun run scripts/sync-template-versions.ts              # Check only
 *   bun run scripts/sync-template-versions.ts --fix        # Fix mismatches
 *   bun run scripts/sync-template-versions.ts --verbose    # Show all packages
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "tinyglobby";

import { scanTemplateVersions } from "../src/utils/dependency-checker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, "../templates");

// Parse CLI arguments
const args = process.argv.slice(2);
const options = {
  fix: args.includes("--fix"),
  verbose: args.includes("--verbose"),
  help: args.includes("--help") || args.includes("-h"),
};

type Mismatch = {
  file: string;
  package: string;
  templateVersion: string;
  mapVersion: string;
};

function printHelp() {
  console.log(`
Template Version Sync

Check for hardcoded versions in template files that differ from dependencyVersionMap.

Usage:
  bun run scripts/sync-template-versions.ts [options]

Options:
  --fix        Automatically fix mismatched versions in template files
  --verbose    Show all packages (including matches)
  --help, -h   Show this help message

Examples:
  bun run scripts/sync-template-versions.ts
  bun run scripts/sync-template-versions.ts --fix
`);
}

async function checkTemplateVersions(): Promise<Mismatch[]> {
  const files = await glob("**/package.json.hbs", {
    cwd: TEMPLATES_DIR,
    dot: true,
    onlyFiles: true,
  });
  const { templateOnly, versionMismatches } = scanTemplateVersions(TEMPLATES_DIR);

  console.log(`Scanning ${files.length} package.json.hbs files...\n`);

  if (options.verbose) {
    for (const [pkg, version] of Object.entries(templateOnly)) {
      console.log(`  ? ${pkg}: ${version} (not in version map)`);
    }
  }

  return versionMismatches.map((m) => ({
    file: m.file,
    package: m.name,
    templateVersion: m.templateVersion,
    mapVersion: m.mapVersion,
  }));
}

async function fixMismatches(mismatches: Mismatch[]): Promise<number> {
  const fileUpdates = new Map<string, Mismatch[]>();

  // Group mismatches by file
  for (const mismatch of mismatches) {
    const existing = fileUpdates.get(mismatch.file) || [];
    existing.push(mismatch);
    fileUpdates.set(mismatch.file, existing);
  }

  let fixedCount = 0;

  for (const [file, updates] of fileUpdates) {
    const fullPath = path.join(TEMPLATES_DIR, file);
    let content = fs.readFileSync(fullPath, "utf-8");

    for (const update of updates) {
      // Replace the version in the template
      const escapedPkg = update.package.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(
        `("${escapedPkg}":\\s*)"${update.templateVersion.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
        "g",
      );

      const newContent = content.replace(pattern, `$1"${update.mapVersion}"`);

      if (newContent !== content) {
        content = newContent;
        fixedCount++;
      }
    }

    fs.writeFileSync(fullPath, content, "utf-8");
  }

  return fixedCount;
}

async function main() {
  if (options.help) {
    printHelp();
    process.exit(0);
  }

  console.log("Template Version Sync\n");
  console.log("Checking for version mismatches between templates and dependencyVersionMap...\n");

  const mismatches = await checkTemplateVersions();

  if (mismatches.length === 0) {
    console.log(" All template versions match dependencyVersionMap!");
    process.exit(0);
  }

  console.log(`\nFound ${mismatches.length} version mismatches:\n`);

  // Group by file for display
  const byFile = new Map<string, Mismatch[]>();
  for (const m of mismatches) {
    const existing = byFile.get(m.file) || [];
    existing.push(m);
    byFile.set(m.file, existing);
  }

  for (const [file, items] of byFile) {
    console.log(`\n${file}:`);
    for (const item of items) {
      console.log(`  ${item.package}: ${item.templateVersion} -> ${item.mapVersion}`);
    }
  }

  if (options.fix) {
    console.log("\nApplying fixes...");
    const fixedCount = await fixMismatches(mismatches);
    console.log(`\n Fixed ${fixedCount} version mismatches.`);
    console.log("\nRemember to rebuild templates: bun run generate-templates");
  } else {
    console.log("\nRun with --fix to automatically update these versions.");
  }

  // Exit with error code if there are mismatches and we didn't fix them
  if (!options.fix) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
