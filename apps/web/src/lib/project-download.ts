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

const SHA256_INITIAL_STATE = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
] as const;
const SHA256_ROUND_CONSTANTS = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
] as const;

function rotateRight(value: number, amount: number): number {
  return (value >>> amount) | (value << (32 - amount));
}

function sha256Fallback(bytes: Uint8Array): string {
  const paddedLength = Math.ceil((bytes.length + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLength);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const bitLength = bytes.length * 8;
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLength - 8, Math.floor(bitLength / 0x1_0000_0000));
  view.setUint32(paddedLength - 4, bitLength >>> 0);

  const state: number[] = [...SHA256_INITIAL_STATE];
  const words = new Uint32Array(64);
  for (let offset = 0; offset < paddedLength; offset += 64) {
    for (let index = 0; index < 16; index += 1) {
      words[index] = view.getUint32(offset + index * 4);
    }
    for (let index = 16; index < 64; index += 1) {
      const previous15 = words[index - 15] ?? 0;
      const previous2 = words[index - 2] ?? 0;
      const sigma0 = rotateRight(previous15, 7) ^ rotateRight(previous15, 18) ^ (previous15 >>> 3);
      const sigma1 = rotateRight(previous2, 17) ^ rotateRight(previous2, 19) ^ (previous2 >>> 10);
      words[index] = ((words[index - 16] ?? 0) + sigma0 + (words[index - 7] ?? 0) + sigma1) >>> 0;
    }

    let a = state[0] ?? 0;
    let b = state[1] ?? 0;
    let c = state[2] ?? 0;
    let d = state[3] ?? 0;
    let e = state[4] ?? 0;
    let f = state[5] ?? 0;
    let g = state[6] ?? 0;
    let h = state[7] ?? 0;
    for (let index = 0; index < 64; index += 1) {
      const sum1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
      const choice = (e & f) ^ (~e & g);
      const first =
        (h + sum1 + choice + (SHA256_ROUND_CONSTANTS[index] ?? 0) + (words[index] ?? 0)) >>> 0;
      const sum0 = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22);
      const majority = (a & b) ^ (a & c) ^ (b & c);
      const second = (sum0 + majority) >>> 0;
      h = g;
      g = f;
      f = e;
      e = (d + first) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (first + second) >>> 0;
    }

    state[0] = ((state[0] ?? 0) + a) >>> 0;
    state[1] = ((state[1] ?? 0) + b) >>> 0;
    state[2] = ((state[2] ?? 0) + c) >>> 0;
    state[3] = ((state[3] ?? 0) + d) >>> 0;
    state[4] = ((state[4] ?? 0) + e) >>> 0;
    state[5] = ((state[5] ?? 0) + f) >>> 0;
    state[6] = ((state[6] ?? 0) + g) >>> 0;
    state[7] = ((state[7] ?? 0) + h) >>> 0;
  }

  return state.map((value) => value.toString(16).padStart(8, "0")).join("");
}

export async function sha256ProjectBytes(
  bytes: Uint8Array,
  subtle: SubtleCrypto | undefined = globalThis.crypto?.subtle,
): Promise<string> {
  if (subtle) {
    try {
      const digest = await subtle.digest("SHA-256", Uint8Array.from(bytes).buffer);
      return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join(
        "",
      );
    } catch {
      // In insecure browser contexts SubtleCrypto can be present but unusable.
    }
  }
  return sha256Fallback(bytes);
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
      .map(
        async ([relativePath, file]) =>
          [relativePath, await sha256ProjectBytes(file.bytes)] as const,
      ),
  );
  const baselineEntries = [...capturedFiles.entries()].flatMap(([relativePath, file]) =>
    isStructuredBaselinePath(relativePath) && file.text !== undefined
      ? ([[relativePath, file.text]] as const)
      : [],
  );
  const versions = {
    cli: metadata.cliVersion,
    generator: metadata.cliVersion,
    templateSet: metadata.cliVersion,
    schema: "1",
  };
  const operationId = (
    await sha256ProjectBytes(strToU8(`create:${createdAt}:${projectName}`))
  ).slice(0, 24);

  const manifestContent = `${JSON.stringify(
    {
      version: "2",
      createdAt,
      updatedAt: createdAt,
      provenance: {
        state: "verified",
        createdWith: versions,
        current: versions,
      },
      history: [
        {
          id: operationId,
          operation: "create",
          completedAt: createdAt,
          source: null,
          target: versions,
          changes: {
            added: hashEntries.length,
            patched: 0,
            merged: 0,
            removed: 0,
            manual: 0,
          },
        },
      ],
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
