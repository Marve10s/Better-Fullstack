import isBinaryPath from "is-binary-path";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { glob } from "tinyglobby";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, "../templates");
const OUTPUT_FILE = path.join(__dirname, "../src/templates.generated.ts");
const FAMILY_OUTPUT_DIR = path.join(__dirname, "../src/templates.generated");
const FAMILY_MANIFEST_FILE = path.join(__dirname, "../src/template-families.generated.ts");
const BINARY_OUTPUT_DIR = path.join(__dirname, "../templates-binary");
const GENERATE_TEMPLATES_LOCK_DIR = path.join(__dirname, "../.generate-templates.lock");
const LOCK_STALE_MS = 5 * 60 * 1000;
const LOCK_TIMEOUT_MS = 60 * 1000;
const LOCK_POLL_MS = 100;

async function generateTemplates() {
  console.log(" Generating embedded templates...");

  const files = await glob("**/*", { cwd: TEMPLATES_DIR, dot: true, onlyFiles: true });
  console.log(` Found ${files.length} template files`);

  const familyEntries = new Map<string, string[]>();
  const binaryFiles: string[] = [];

  for (const file of files) {
    const fullPath = path.join(TEMPLATES_DIR, file);
    const normalizedPath = file.replace(/\\/g, "/");

    if (isBinaryPath(file)) {
      binaryFiles.push(normalizedPath);
      const family = normalizedPath.split("/", 1)[0];
      const entries = familyEntries.get(family) ?? [];
      entries.push(`  ["${normalizedPath}", \`[Binary file]\`]`);
      familyEntries.set(family, entries);
    } else {
      const content = fs.readFileSync(fullPath, "utf-8");
      const escapedContent = content
        .replace(/\\/g, "\\\\")
        .replace(/`/g, "\\`")
        .replace(/\$\{/g, "\\${");
      const family = normalizedPath.split("/", 1)[0];
      const entries = familyEntries.get(family) ?? [];
      entries.push(`  ["${normalizedPath}", \`${escapedContent}\`]`);
      familyEntries.set(family, entries);
    }
  }

  fs.rmSync(FAMILY_OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(FAMILY_OUTPUT_DIR, { recursive: true });

  const families = [...familyEntries.keys()].sort();
  for (const family of families) {
    const entries = familyEntries.get(family) ?? [];
    const familyOutput = `// Auto-generated - DO NOT EDIT
// Run 'bun run generate-templates' to regenerate

export const TEMPLATES: ReadonlyMap<string, string> = new Map([
${entries.join(",\n")}
]);
`;
    fs.writeFileSync(path.join(FAMILY_OUTPUT_DIR, `${family}.ts`), familyOutput);
  }

  const eagerImports = families
    .map((family, index) => `import { TEMPLATES as templates${index} } from "@/templates.generated/${family}";`)
    .join("\n");
  const eagerEntries = families.map((_family, index) => `  ...templates${index},`).join("\n");
  const output = `// Auto-generated - DO NOT EDIT
// Run 'bun run generate-templates' to regenerate

${eagerImports}

export const EMBEDDED_TEMPLATES: Map<string, string> = new Map([
${eagerEntries}
]);

export const TEMPLATE_COUNT = ${files.length};
`;

  fs.writeFileSync(OUTPUT_FILE, output);

  const loaders = families
    .map(
      (family) =>
        `  "${family}": () => import("@/templates.generated/${family}").then((module) => module.TEMPLATES),`,
    )
    .join("\n");
  const manifestOutput = `// Auto-generated - DO NOT EDIT
// Run 'bun run generate-templates' to regenerate

export const TEMPLATE_FAMILY_LOADERS = {
${loaders}
} as const;

export type TemplateFamily = keyof typeof TEMPLATE_FAMILY_LOADERS;
export const TEMPLATE_COUNT = ${files.length};
`;
  fs.writeFileSync(FAMILY_MANIFEST_FILE, manifestOutput);

  const stats = fs.statSync(OUTPUT_FILE);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(` Generated ${OUTPUT_FILE}`);
  console.log(` File size: ${sizeMB} MB (${files.length} templates)`);

  await copyBinaryFiles(binaryFiles);
}

async function copyBinaryFiles(binaryFiles: string[]) {
  console.log(`\n Copying ${binaryFiles.length} binary files to templates-binary/...`);

  // `force: true` avoids a TOCTOU race when multiple generate-templates runs overlap.
  fs.rmSync(BINARY_OUTPUT_DIR, { recursive: true, force: true });

  let totalSize = 0;

  for (const file of binaryFiles) {
    const srcPath = path.join(TEMPLATES_DIR, file);
    const destPath = path.join(BINARY_OUTPUT_DIR, file);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    fs.copyFileSync(srcPath, destPath);

    totalSize += fs.statSync(destPath).size;
  }

  const sizeKB = (totalSize / 1024).toFixed(2);
  console.log(` Copied ${binaryFiles.length} binary files (${sizeKB} KB)`);
}

function isErrnoError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

async function withGenerateTemplatesLock<T>(fn: () => Promise<T>): Promise<T> {
  const startedAt = Date.now();

  while (true) {
    try {
      fs.mkdirSync(GENERATE_TEMPLATES_LOCK_DIR);
      break;
    } catch (error) {
      if (!isErrnoError(error) || error.code !== "EEXIST") {
        throw error;
      }

      try {
        const lockStats = fs.statSync(GENERATE_TEMPLATES_LOCK_DIR);
        if (Date.now() - lockStats.mtimeMs > LOCK_STALE_MS) {
          fs.rmSync(GENERATE_TEMPLATES_LOCK_DIR, { recursive: true, force: true });
          continue;
        }
      } catch {
        // Lock disappeared between checks; retry immediately.
        continue;
      }

      if (Date.now() - startedAt > LOCK_TIMEOUT_MS) {
        throw new Error(
          "Timed out waiting for generate-templates lock. Another build may be stuck.",
          { cause: error },
        );
      }

      await sleep(LOCK_POLL_MS);
    }
  }

  try {
    return await fn();
  } finally {
    fs.rmSync(GENERATE_TEMPLATES_LOCK_DIR, { recursive: true, force: true });
  }
}

withGenerateTemplatesLock(generateTemplates).catch((err) => {
  console.error(" Failed to generate templates:", err);
  process.exit(1);
});
