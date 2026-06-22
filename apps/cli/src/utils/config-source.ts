import type { BetterTStackConfig, CreateInput } from "../types";
import type { ProjectHistoryEntry } from "./project-history";

import { CreateInputSchema } from "../types";
import { readBtsConfigFromFile } from "./bts-config";
import { exitWithError } from "./errors";
import { getHistoryCount, getHistoryEntry } from "./project-history";

/**
 * CreateInput flag keys that can be sourced from a stored config. `projectName`
 * is excluded so a replayed config never reuses the original project name.
 */
const COPYABLE_CREATE_INPUT_KEYS = (
  Object.keys(CreateInputSchema.shape) as (keyof CreateInput)[]
).filter((key) => key !== "projectName");

/**
 * Projects a persisted Better-Fullstack config (bts.jsonc shape) onto the
 * subset of `create` flags it can drive. Only defined values are copied so the
 * result can be safely overlaid by explicitly-passed CLI flags.
 */
export function betterTStackConfigToCreateInput(
  config: BetterTStackConfig,
): Partial<CreateInput> {
  const source = config as unknown as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const key of COPYABLE_CREATE_INPUT_KEYS) {
    const value = source[key];
    if (value !== undefined && value !== null) {
      result[key] = value;
    }
  }

  return result as Partial<CreateInput>;
}

/**
 * Maps a legacy history entry (written before the full config snapshot existed)
 * onto `create` flags using the limited stack summary it stored.
 */
function historyStackToCreateInput(
  stack: ProjectHistoryEntry["stack"],
): Partial<CreateInput> {
  const result: Record<string, unknown> = {
    frontend: stack.frontend,
    backend: stack.backend,
    database: stack.database,
    orm: stack.orm,
    runtime: stack.runtime,
    auth: stack.auth,
    payments: stack.payments,
    api: stack.api,
    addons: stack.addons,
    examples: stack.examples,
    dbSetup: stack.dbSetup,
    packageManager: stack.packageManager,
  };

  return result as Partial<CreateInput>;
}

type ConfigSourceInput = {
  fromHistory?: number;
  config?: string;
  yes?: boolean;
  template?: string;
  part?: string[];
};

/**
 * Resolves the `--from-history` / `--config` flags into a base set of `create`
 * flags. Returns `undefined` when neither flag is used. The two flags are
 * mutually exclusive, and both are incompatible with `--yes`, `--template`, and
 * `--part` (each of those also wants to own the full stack). On any user error
 * this calls `exitWithError`, which exits the CLI (or throws a CLIError in
 * silent/programmatic mode).
 */
export async function resolveCreateConfigBase(
  input: ConfigSourceInput,
): Promise<Partial<CreateInput> | undefined> {
  const hasHistory = input.fromHistory !== undefined;
  const hasConfig = input.config !== undefined && input.config !== "";

  if (!hasHistory && !hasConfig) {
    return undefined;
  }

  if (hasHistory && hasConfig) {
    exitWithError(
      "Cannot combine --from-history with --config. Pass only one config source.",
    );
  }

  const sourceFlag = hasHistory ? "--from-history" : "--config";

  if (input.yes) {
    exitWithError(
      `Cannot combine --yes with ${sourceFlag}: the config already provides a complete stack. Remove --yes.`,
    );
  }

  if (input.template && input.template !== "none") {
    exitWithError(
      `Cannot combine --template with ${sourceFlag}. Choose either a template or a saved config as the base.`,
    );
  }

  if (input.part && input.part.length > 0) {
    exitWithError(
      `Cannot combine --part with ${sourceFlag}. Use stack parts or a saved config as the base, not both.`,
    );
  }

  if (hasConfig) {
    const loaded = await readBtsConfigFromFile(input.config!);
    if (!loaded) {
      exitWithError(
        `Could not load config file: ${input.config}. Ensure the path points to a valid bts.jsonc/JSON config.`,
      );
    }
    return betterTStackConfigToCreateInput(loaded);
  }

  const position = input.fromHistory!;
  if (!Number.isInteger(position) || position < 1) {
    exitWithError(
      `Invalid --from-history value: ${position}. Provide a positive integer (1 = most recent).`,
    );
  }

  const entry = await getHistoryEntry(position);
  if (!entry) {
    const count = await getHistoryCount();
    const detail =
      count === 0
        ? " Project history is empty."
        : ` History has ${count} ${count === 1 ? "entry" : "entries"} (use 1-${count}).`;
    exitWithError(`No project history entry at position ${position}.${detail}`);
  }

  return entry.config
    ? betterTStackConfigToCreateInput(entry.config)
    : historyStackToCreateInput(entry.stack);
}
