import type { ProjectConfig } from "../../types";

/**
 * Tauri setup is now handled entirely by template generation.
 * The src-tauri/ directory (tauri.conf.json, Cargo.toml, main.rs, lib.rs, etc.)
 * is emitted by the addons template handler from templates/addons/tauri/.
 * Dependencies (@tauri-apps/cli, @tauri-apps/api) and scripts (tauri, desktop:dev,
 * desktop:build) are added by addons-deps.ts.
 *
 * This function is kept as a no-op for backward compatibility with addons-setup.ts.
 */
export async function setupTauri(_config: ProjectConfig) {
  // Templates handle everything — no runtime CLI execution needed.
}
