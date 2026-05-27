import type { ProjectConfig } from "@better-fullstack/types";
import type { VirtualFileSystem } from "../core/virtual-fs";

/**
 * Dependency processor for backend-utils.
 * Scaffolds pure TS utilities and does not require external npm dependencies.
 */
export function processBackendUtilsDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  // Pure TypeScript utilities - no third-party npm dependencies needed!
}
