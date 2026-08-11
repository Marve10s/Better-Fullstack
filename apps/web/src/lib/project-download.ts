import type { VirtualDirectory, VirtualFile } from "@better-fullstack/template-generator/browser";
import type { ProjectConfig } from "@better-fullstack/types/types";

import { BetterTStackConfigFileSchema } from "@better-fullstack/types/schemas";
import { strToU8, zip, type Zippable } from "fflate";

import type { StackState } from "@/lib/constant";

import { stackStateToProjectConfig } from "@/lib/preview-config";

const DEFAULT_PROJECT_NAME = "better-fullstack-project";
const UNIX_OS = 3;
const FILE_MODE = 0o644 << 16;
const EXECUTABLE_MODE = 0o755 << 16;

export type BinaryTemplateLoader = (sourcePath: string) => Promise<Uint8Array>;

export interface ProjectArchive {
  bytes: Uint8Array;
  fileName: string;
}

export interface BrowserLifecycleMetadata {
  config: ProjectConfig;
  cliVersion: string;
  createdAt?: string;
}

type CapturedFile = {
  bytes: Uint8Array;
  text?: string;
};

const LIFECYCLE_EXCLUDED_FILES = new Set([
  "bts.jsonc",
  "bts.lock.json",
  "bun.lock",
  "bun.lockb",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "Cargo.lock",
  "uv.lock",
  "poetry.lock",
  "go.sum",
  "mix.lock",
]);

function safeProjectName(value: string): string {
  const normalized = value
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "");

  return normalized || DEFAULT_PROJECT_NAME;
}

function safeArchivePath(value: string): string {
  const normalized = value.replace(/\\/g, "/").replace(/^\/+/, "");
  const segments = normalized.split("/");

  if (
    normalized.length === 0 ||
    segments.some((segment) => segment.length === 0 || segment === "." || segment === "..")
  ) {
    throw new Error(`Unsafe generated project path: ${value}`);
  }

  return normalized;
}

function isExecutableFile(file: VirtualFile): boolean {
  return file.content.startsWith("#!/");
}

async function addDirectoryFiles(
  directory: VirtualDirectory,
  projectName: string,
  files: Zippable,
  loadBinaryTemplate: BinaryTemplateLoader,
  capturedFiles?: Map<string, CapturedFile>,
): Promise<void> {
  await Promise.all(
    directory.children.map(async (node) => {
      if (node.type === "directory") {
        await addDirectoryFiles(node, projectName, files, loadBinaryTemplate, capturedFiles);
        return;
      }

      const relativePath = safeArchivePath(node.path);
      const archivePath = `${projectName}/${relativePath}`;
      const content = node.sourcePath
        ? await loadBinaryTemplate(node.sourcePath)
        : strToU8(node.content);

      capturedFiles?.set(relativePath, {
        bytes: content,
        ...(node.sourcePath ? {} : { text: node.content }),
      });

      files[archivePath] = [
        content,
        {
          os: UNIX_OS,
          attrs: isExecutableFile(node) ? EXECUTABLE_MODE : FILE_MODE,
        },
      ];
    }),
  );
}

function basename(relativePath: string): string {
  return relativePath.split("/").at(-1) ?? relativePath;
}

function isStructuredBaselinePath(relativePath: string): boolean {
  const name = basename(relativePath);
  return name === "package.json" || name.endsWith(".env.example");
}

async function sha256(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", Uint8Array.from(bytes).buffer);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function sortedRecord(entries: ReadonlyArray<readonly [string, string]>): Record<string, string> {
  return Object.fromEntries([...entries].sort(([left], [right]) => left.localeCompare(right)));
}

async function addLifecycleFiles(
  projectName: string,
  files: Zippable,
  capturedFiles: Map<string, CapturedFile>,
  metadata: BrowserLifecycleMetadata,
): Promise<void> {
  const createdAt = metadata.createdAt ?? new Date().toISOString();
  const persistedConfig = BetterTStackConfigFileSchema.parse({
    ...metadata.config,
    $schema: "https://better-fullstack-web.vercel.app/schema.json",
    version: metadata.cliVersion,
    createdAt,
  });
  const graphNote = persistedConfig.stackParts?.length
    ? "// stackParts is the source of truth; top-level option fields are a derived compatibility cache.\n"
    : "";
  const configContent = `// Better Fullstack configuration file\n// safe to delete\n${graphNote}\n${JSON.stringify(persistedConfig, null, 2)}\n`;

  const hashEntries = await Promise.all(
    [...capturedFiles.entries()]
      .filter(([relativePath]) => !LIFECYCLE_EXCLUDED_FILES.has(basename(relativePath)))
      .map(async ([relativePath, file]) => [relativePath, await sha256(file.bytes)] as const),
  );
  const baselineEntries = [...capturedFiles.entries()].flatMap(([relativePath, file]) =>
    isStructuredBaselinePath(relativePath) && file.text !== undefined
      ? ([[relativePath, file.text]] as const)
      : [],
  );

  const manifestContent = `${JSON.stringify(
    {
      version: "1",
      createdAt,
      hashes: sortedRecord(hashEntries),
      ...(baselineEntries.length > 0 ? { baselines: sortedRecord(baselineEntries) } : {}),
    },
    null,
    2,
  )}\n`;

  files[`${projectName}/bts.jsonc`] = [strToU8(configContent), { os: UNIX_OS, attrs: FILE_MODE }];
  files[`${projectName}/bts.lock.json`] = [
    strToU8(manifestContent),
    { os: UNIX_OS, attrs: FILE_MODE },
  ];
}

function createZip(files: Zippable): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    zip(files, { level: 6 }, (error, bytes) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(bytes);
    });
  });
}

export async function createProjectArchive(
  root: VirtualDirectory,
  loadBinaryTemplate: BinaryTemplateLoader,
  lifecycle?: BrowserLifecycleMetadata,
): Promise<ProjectArchive> {
  const projectName = safeProjectName(root.name);
  const files: Zippable = {};
  const capturedFiles = lifecycle ? new Map<string, CapturedFile>() : undefined;

  await addDirectoryFiles(root, projectName, files, loadBinaryTemplate, capturedFiles);

  if (lifecycle && capturedFiles) {
    await addLifecycleFiles(projectName, files, capturedFiles, lifecycle);
  }

  if (Object.keys(files).length === 0) {
    throw new Error("The generated project does not contain any files.");
  }

  return {
    bytes: await createZip(files),
    fileName: `${projectName}.zip`,
  };
}

export async function createStackProjectArchive(stack: StackState): Promise<ProjectArchive> {
  const [{ generateVirtualProject, EMBEDDED_TEMPLATES }, { loadBinaryTemplate }] =
    await Promise.all([
      import("@better-fullstack/template-generator/browser"),
      import("@/lib/project-binary-assets"),
    ]);
  const result = await generateVirtualProject({
    config: stackStateToProjectConfig(stack),
    templates: EMBEDDED_TEMPLATES,
  });

  if (!result.success || !result.tree) {
    throw new Error(result.error || "The project could not be generated.");
  }

  return createProjectArchive(result.tree.root, loadBinaryTemplate, {
    config: stackStateToProjectConfig(stack),
    cliVersion: __BFS_CLI_VERSION__,
  });
}

export function downloadProjectArchive(archive: ProjectArchive): void {
  const bytes = Uint8Array.from(archive.bytes);
  const url = URL.createObjectURL(new Blob([bytes.buffer], { type: "application/zip" }));
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = archive.fileName;
  anchor.hidden = true;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
