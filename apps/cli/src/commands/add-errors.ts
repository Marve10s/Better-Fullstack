/**
 * Tagged error types for the `add` command.
 *
 * Each variant carries structured data so callers can inspect or format
 * errors without parsing strings.
 */

import { log } from "@clack/prompts";
import pc from "picocolors";

import type { Addons } from "../types";

import { isSilent } from "../utils/context";
import { CLIError } from "../utils/errors";

// ---------------------------------------------------------------------------
// Error variants
// ---------------------------------------------------------------------------

export type ConfigNotFound = {
  readonly tag: "ConfigNotFound";
  readonly dir: string;
};

export type ConfigParseError = {
  readonly tag: "ConfigParseError";
  readonly dir: string;
  readonly cause: string;
};

export type UnsupportedEcosystem = {
  readonly tag: "UnsupportedEcosystem";
  readonly ecosystem: string;
};

export type NoAddonsAvailable = {
  readonly tag: "NoAddonsAvailable";
  readonly reason: string;
};

export type NoAddonsSelected = {
  readonly tag: "NoAddonsSelected";
};

export type IncompatibleAddon = {
  readonly tag: "IncompatibleAddon";
  readonly addon: Addons;
  readonly reason: string;
};

export type InstallFailed = {
  readonly tag: "InstallFailed";
  readonly addon: Addons;
  readonly cause: string;
};

export type ConfigWriteError = {
  readonly tag: "ConfigWriteError";
  readonly cause: string;
};

export type UserCancelled = {
  readonly tag: "UserCancelled";
};

export type AddError =
  | ConfigNotFound
  | ConfigParseError
  | UnsupportedEcosystem
  | NoAddonsAvailable
  | NoAddonsSelected
  | IncompatibleAddon
  | InstallFailed
  | ConfigWriteError
  | UserCancelled;

// ---------------------------------------------------------------------------
// Constructors
// ---------------------------------------------------------------------------

export const AddErrors = {
  configNotFound: (dir: string): ConfigNotFound => ({ tag: "ConfigNotFound", dir }),

  configParseError: (dir: string, cause: string): ConfigParseError => ({
    tag: "ConfigParseError",
    dir,
    cause,
  }),

  unsupportedEcosystem: (ecosystem: string): UnsupportedEcosystem => ({
    tag: "UnsupportedEcosystem",
    ecosystem,
  }),

  noAddonsAvailable: (reason: string): NoAddonsAvailable => ({
    tag: "NoAddonsAvailable",
    reason,
  }),

  noAddonsSelected: (): NoAddonsSelected => ({ tag: "NoAddonsSelected" }),

  incompatibleAddon: (addon: Addons, reason: string): IncompatibleAddon => ({
    tag: "IncompatibleAddon",
    addon,
    reason,
  }),

  installFailed: (addon: Addons, cause: string): InstallFailed => ({
    tag: "InstallFailed",
    addon,
    cause,
  }),

  configWriteError: (cause: string): ConfigWriteError => ({
    tag: "ConfigWriteError",
    cause,
  }),

  userCancelled: (): UserCancelled => ({ tag: "UserCancelled" }),
} as const;

// ---------------------------------------------------------------------------
// Human-readable message
// ---------------------------------------------------------------------------

export function addErrorMessage(error: AddError): string {
  switch (error.tag) {
    case "ConfigNotFound":
      return `No bts.jsonc found in ${error.dir}. Run this command from a Better Fullstack project root.`;
    case "ConfigParseError":
      return `Failed to parse bts.jsonc: ${error.cause}`;
    case "UnsupportedEcosystem":
      return `The "${error.ecosystem}" ecosystem does not support the add command yet. Only TypeScript projects are supported in this MVP.`;
    case "NoAddonsAvailable":
      return `No addons available to add: ${error.reason}`;
    case "NoAddonsSelected":
      return "No addons selected.";
    case "IncompatibleAddon":
      return `Addon "${error.addon}" is incompatible: ${error.reason}`;
    case "InstallFailed":
      return `Failed to install addon "${error.addon}": ${error.cause}`;
    case "ConfigWriteError":
      return `Failed to update bts.jsonc: ${error.cause}`;
    case "UserCancelled":
      return "Operation cancelled.";
  }
}

// ---------------------------------------------------------------------------
// Centralized CLI display
// ---------------------------------------------------------------------------

export function displayAddError(error: AddError): void {
  if (isSilent()) {
    throw new CLIError(addErrorMessage(error));
  }

  const msg = addErrorMessage(error);

  switch (error.tag) {
    case "UserCancelled":
    case "NoAddonsSelected":
      log.info(pc.yellow(msg));
      break;
    case "ConfigNotFound":
    case "UnsupportedEcosystem":
    case "NoAddonsAvailable":
      log.warn(pc.yellow(msg));
      break;
    default:
      log.error(pc.red(msg));
      break;
  }
}
