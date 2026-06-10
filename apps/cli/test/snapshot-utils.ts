import type { VirtualFileTree } from "@better-fullstack/template-generator";

import { listVirtualTreeFiles } from "./virtual-tree-utils";

/**
 * File info for snapshot - deterministic and comparable
 */
export interface SnapshotFile {
  path: string;
  content: string | "[binary]" | "[large file]" | "[exists]";
}

/**
 * Snapshot-friendly representation of generated project
 */
export interface ProjectSnapshot {
  fileCount: number;
  files: SnapshotFile[];
}

function normalizeSnapshotContent(content: string): string {
  const normalizedNewlines = content.replace(/\r\n/g, "\n");
  return normalizedNewlines
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n");
}

/**
 * Files worth snapshotting full content (small, important config files)
 */
const KEY_FILE_PATTERNS = [
  /package\.json$/,
  /tsconfig.*\.json$/,
  /\.env\.example$/,
  /vite\.config\.[tj]s$/,
  /next\.config\.[tj]s$/,
  /astro\.config\.[tj]s$/,
  /nuxt\.config\.[tj]s$/,
  /tailwind\.config\.[tj]s$/,
  /drizzle\.config\.[tj]s$/,
  /schema\.[tj]s$/, // Database schemas
  /router\.[tj]sx?$/, // API routers
  /trpc\.[tj]s$/,
  /orpc\.[tj]s$/,
  /auth\.[tj]s$/,
  /index\.[tj]sx?$/, // Entry points
  /App\.[tj]sx?$/,
  /main\.[tj]sx?$/,
  /Cargo\.toml$/, // Rust config
  /lib\.rs$/, // Rust entry points
  /main\.rs$/,
];

/**
 * Files to exclude from snapshots (generated, binary, large)
 */
const EXCLUDE_PATTERNS = [
  /\.lock$/, // Lock files
  /node_modules/, // Dependencies
  /\.git/, // Git internals
  /\.png$|\.jpg$|\.ico$|\.svg$|\.webp$/, // Images
  /\.woff$|\.woff2$|\.ttf$|\.eot$/, // Fonts
  /\.pdf$/, // Documents
];

/**
 * Check if a file should have its content snapshotted
 */
export function isKeyFile(path: string): boolean {
  return KEY_FILE_PATTERNS.some((pattern) => pattern.test(path));
}

/**
 * Check if a file should be excluded from snapshots
 */
export function shouldExclude(path: string): boolean {
  return EXCLUDE_PATTERNS.some((pattern) => pattern.test(path));
}

/**
 * Convert VirtualFileTree to snapshot-friendly format
 * - Sorted file paths for deterministic comparison
 * - Full content for key files, "[exists]" for others
 * - Excludes binary/generated files
 */
export function treeToSnapshot(tree: VirtualFileTree): ProjectSnapshot {
  const files = listVirtualTreeFiles(tree)
    .filter((file) => !shouldExclude(file.path))
    .map((file) => ({
      path: file.path,
      content: isKeyFile(file.path) ? normalizeSnapshotContent(file.content) : "[exists]",
    }));

  // Sort for deterministic output
  files.sort((a, b) => a.path.localeCompare(b.path));

  return {
    fileCount: tree.fileCount,
    files,
  };
}

/**
 * Get just file paths for a lighter snapshot
 */
export function treeToFileList(tree: VirtualFileTree): string[] {
  return listVirtualTreeFiles(tree)
    .map((file) => file.path)
    .filter((path) => !shouldExclude(path))
    .sort();
}

/**
 * Get only key files with their full content for focused snapshots
 */
export function treeToKeyFiles(tree: VirtualFileTree): SnapshotFile[] {
  return listVirtualTreeFiles(tree)
    .filter((file) => !shouldExclude(file.path) && isKeyFile(file.path))
    .map((file) => ({
      path: file.path,
      content: normalizeSnapshotContent(file.content),
    }))
    .sort((a, b) => a.path.localeCompare(b.path));
}
