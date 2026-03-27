#!/usr/bin/env bun
/**
 * Check dependency versions and optionally apply updates.
 *
 * Usage:
 *   bun run scripts/check-deps.ts                  # Check only
 *   bun run scripts/check-deps.ts --ecosystem effect  # Check specific ecosystem
 *   bun run scripts/check-deps.ts --apply-patch   # Apply patch/minor updates
 *   bun run scripts/check-deps.ts --apply-all     # Apply all updates
 *   bun run scripts/check-deps.ts --json          # Output JSON format
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  checkAllVersions,
  generateMarkdownReport,
  generateCliReport,
  listEcosystems,
  scanTemplateVersions,
  findTemplateFilesWithPackage,
  type VersionInfo,
} from "../src/utils/dependency-checker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CLI arguments
const args = process.argv.slice(2);
const options = {
  ecosystem: getArgValue("--ecosystem"),
  applyPatch: args.includes("--apply-patch"),
  applyAll: args.includes("--apply-all"),
  json: args.includes("--json"),
  markdown: args.includes("--markdown"),
  help: args.includes("--help") || args.includes("-h"),
};

function getArgValue(flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return undefined;
}

function printHelp() {
  console.log(`
Dependency Version Checker

Usage:
  bun run scripts/check-deps.ts [options]

Options:
  --ecosystem <name>   Filter by ecosystem (${listEcosystems().join(", ")})
  --apply-patch        Apply patch and minor updates to add-deps.ts
  --apply-all          Apply all updates to add-deps.ts
  --json               Output in JSON format
  --markdown           Output in Markdown format
  --help, -h           Show this help message

Examples:
  bun run scripts/check-deps.ts
  bun run scripts/check-deps.ts --ecosystem effect
  bun run scripts/check-deps.ts --apply-patch
`);
}

async function updateAddDepsFile(updates: VersionInfo[]): Promise<boolean> {
  const filePath = path.join(__dirname, "../src/utils/add-deps.ts");

  if (!fs.existsSync(filePath)) {
    console.error(`Could not find add-deps.ts at ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  let updated = false;

  for (const update of updates) {
    const escapedName = update.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(["']${escapedName}["']:\\s*["'])([^"']+)(["'])`, "g");

    const newContent = content.replace(pattern, `$1${update.latest}$3`);
    if (newContent !== content) {
      content = newContent;
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, content, "utf-8");
    return true;
  }

  return false;
}

async function updateTemplateFiles(
  updates: VersionInfo[],
  templatesDir: string,
): Promise<boolean> {
  const templateUpdates = updates.filter((u) => u.source === "template");
  if (templateUpdates.length === 0) return false;

  let anyUpdated = false;

  for (const update of templateUpdates) {
    const files = findTemplateFilesWithPackage(templatesDir, update.name);
    for (const { filePath } of files) {
      const content = fs.readFileSync(filePath, "utf-8");
      const escapedName = update.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`("${escapedName}"\\s*:\\s*")([~^]?[\\d][^"]+)(")`, "g");

      const newContent = content.replace(pattern, `$1${update.latest}$3`);
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, "utf-8");
        anyUpdated = true;
      }
    }
  }

  return anyUpdated;
}

async function main() {
  if (options.help) {
    printHelp();
    process.exit(0);
  }

  // Validate ecosystem if provided
  if (options.ecosystem) {
    const validEcosystems = listEcosystems();
    if (!validEcosystems.includes(options.ecosystem)) {
      console.error(
        `Invalid ecosystem: ${options.ecosystem}. Valid options: ${validEcosystems.join(", ")}`,
      );
      process.exit(1);
    }
  }

  const structuredOutput = options.json || options.markdown;
  const showProgress = !structuredOutput && process.stderr.isTTY;

  if (!structuredOutput) {
    console.log("Checking dependency versions...\n");
  } else {
    console.error("Checking dependency versions...");
  }

  const templatesDir = path.join(__dirname, "../templates");
  const { templateOnly, versionMismatches } = scanTemplateVersions(templatesDir);
  const templateCount = Object.keys(templateOnly).length;

  if (!structuredOutput) {
    if (templateCount > 0) {
      console.log(`Found ${templateCount} additional packages in template files`);
    }
    if (versionMismatches.length > 0) {
      console.log(`Found ${versionMismatches.length} version mismatches between map and templates`);
    }
    if (templateCount > 0 || versionMismatches.length > 0) {
      console.log("");
    }
  } else {
    if (templateCount > 0) {
      console.error(`Found ${templateCount} additional packages in template files`);
    }
    if (versionMismatches.length > 0) {
      console.error(`Found ${versionMismatches.length} version mismatches between map and templates`);
    }
  }

  const result = await checkAllVersions({
    templateVersions: templateOnly,
    ecosystem: options.ecosystem,
    concurrency: 5,
    delayMs: 100,
    onProgress: showProgress
      ? (current, total) => {
          process.stderr.write(`\rChecking packages (${current}/${total})...`);
        }
      : undefined,
  });

  // Clear the progress line
  if (showProgress) {
    process.stderr.write("\r" + " ".repeat(50) + "\r");
  }

  result.versionMismatches = versionMismatches;

  // Output results
  if (options.json) {
    console.log(JSON.stringify(result, null, 2));
  } else if (options.markdown) {
    console.log(generateMarkdownReport(result));
  } else {
    console.log(generateCliReport(result));
  }

  // Apply updates if requested
  if (options.applyPatch || options.applyAll) {
    let toApply: VersionInfo[];

    if (options.applyPatch) {
      toApply = result.outdated.filter((u) => u.updateType === "patch" || u.updateType === "minor");
    } else {
      toApply = result.outdated;
    }

    if (toApply.length === 0) {
      console.log("\nNo updates to apply.");
    } else {
      const mapUpdates = toApply.filter((u) => u.source !== "template");
      const templateUpdates = toApply.filter((u) => u.source === "template");

      console.log(`\nApplying ${toApply.length} updates (${mapUpdates.length} in version map, ${templateUpdates.length} in templates)...`);

      let anySuccess = false;

      if (mapUpdates.length > 0) {
        const mapSuccess = await updateAddDepsFile(mapUpdates);
        if (mapSuccess) anySuccess = true;
      }

      if (templateUpdates.length > 0) {
        const templateSuccess = await updateTemplateFiles(templateUpdates, templatesDir);
        if (templateSuccess) anySuccess = true;
      }

      if (anySuccess) {
        console.log("Updates applied successfully!\n");
        console.log("Updated packages:");
        for (const update of toApply) {
          const src = update.source === "template" ? " (template)" : "";
          console.log(`  ${update.name}: ${update.current} -> ${update.latest}${src}`);
        }
      } else {
        console.error("Failed to apply updates.");
        process.exit(1);
      }
    }
  }

  // Set GitHub Actions output
  if (process.env.GITHUB_OUTPUT) {
    const outputFile = process.env.GITHUB_OUTPUT;
    const outdatedCount = result.outdated.length;
    const downgradeCount = result.outdated.filter((u) => u.updateType === "downgrade").length;
    const majorUpdates = result.outdated.filter((u) => u.updateType === "major");
    const hasUpdates = outdatedCount > 0 ? "true" : "false";
    const hasMajorUpdates = majorUpdates.length > 0 ? "true" : "false";
    const majorPackageNames = majorUpdates.map((u) => u.name).join(",");

    fs.appendFileSync(
      outputFile,
      `has_updates=${hasUpdates}\n` +
        `outdated_count=${outdatedCount}\n` +
        `downgrade_count=${downgradeCount}\n` +
        `uptodate_count=${result.upToDate.length}\n` +
        `error_count=${result.errors.length}\n` +
        `has_major_updates=${hasMajorUpdates}\n` +
        `major_packages=${majorPackageNames}\n`,
    );
  }

  // Exit with error if there are errors
  if (result.errors.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
