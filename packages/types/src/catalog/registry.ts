import { z } from "zod";

/**
 * Capability-pack registry schemas.
 *
 * A capability pack is a self-contained bundle a community author (or a private
 * team) can drop into an existing Better Fullstack project: a `registry.json`
 * manifest that declares the files to write, the dependencies to merge, the env
 * vars to append, and some advisory metadata. The MVP installer resolves packs
 * from a local path or a `file://` URL only; the `https` source kind is
 * reserved but not yet wired.
 */

/** Where a pack was resolved from. MVP wires `local`/`file` only. */
export const CapabilityPackSourceKindSchema = z
  .enum(["local", "file", "https"])
  .describe("Pack source kind: local path, file:// URL, or (reserved) https URL");
export type CapabilityPackSourceKind = z.infer<typeof CapabilityPackSourceKindSchema>;

/**
 * A single file contributed by a pack. `content` is written verbatim unless
 * `template` is true, in which case it is rendered through the Better Fullstack
 * Handlebars pipeline against the target project's config first.
 */
export const CapabilityPackFileSchema = z
  .object({
    path: z
      .string()
      .min(1)
      .describe("Project-relative destination path, e.g. apps/server/src/lib/rate-limit.ts"),
    content: z.string().describe("File contents (rendered as a template when template=true)"),
    template: z
      .boolean()
      .optional()
      .default(false)
      .describe("Render `content` through the template pipeline before writing"),
    overwrite: z
      .boolean()
      .optional()
      .default(false)
      .describe("Overwrite an existing file at `path` instead of skipping it"),
  })
  .describe("A file a capability pack writes into the project");
export type CapabilityPackFile = z.infer<typeof CapabilityPackFileSchema>;

/** An environment variable a pack appends to the project's .env.example. */
export const CapabilityPackEnvSchema = z
  .object({
    key: z
      .string()
      .min(1)
      .regex(/^[A-Za-z_][A-Za-z0-9_]*$/, "Env keys must be valid shell identifiers")
      .describe("Environment variable name, e.g. RATE_LIMIT_REDIS_URL"),
    value: z
      .string()
      .optional()
      .describe("Default value written to .env.example (defaults to empty)"),
    description: z
      .string()
      .optional()
      .describe("Human-readable comment written above the variable"),
  })
  .describe("An environment variable declared by a capability pack");
export type CapabilityPackEnv = z.infer<typeof CapabilityPackEnvSchema>;

/**
 * Dependencies keyed by workspace-relative package.json directory ("." for the
 * repo root, "apps/server", "packages/api", ...) each mapping a dependency name
 * to a literal version string.
 */
export const CapabilityPackDependencyMapSchema = z
  .record(z.string(), z.record(z.string(), z.string()))
  .describe('Workspace dir -> { "dep-name": "version" }');
export type CapabilityPackDependencyMap = z.infer<typeof CapabilityPackDependencyMapSchema>;

/** Advisory compatibility metadata (not enforced by the MVP installer). */
export const CapabilityPackCompatibilitySchema = z
  .object({
    ecosystems: z
      .array(z.string())
      .optional()
      .describe("Ecosystems this pack is intended for (advisory)"),
    requires: z
      .array(z.string())
      .optional()
      .describe("Capability ids the pack expects to already be present (advisory)"),
    conflicts: z
      .array(z.string())
      .optional()
      .describe("Capability ids the pack is known to conflict with (advisory)"),
  })
  .describe("Advisory compatibility metadata for a capability pack");
export type CapabilityPackCompatibility = z.infer<typeof CapabilityPackCompatibilitySchema>;

/** The full `registry.json` manifest for a capability pack. */
export const CapabilityPackManifestSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .regex(/^@?[a-z0-9][a-z0-9._@/-]*$/i, "Pack names must be url/npm-safe")
      .describe("Unique pack identifier, e.g. @acme/rate-limit"),
    version: z.string().min(1).describe("Pack version (semver recommended)"),
    description: z.string().optional().describe("Short human-readable summary"),
    source: CapabilityPackSourceKindSchema.optional().describe("Origin kind (informational)"),
    files: z
      .array(CapabilityPackFileSchema)
      .default([])
      .describe("Files the pack writes into the project"),
    dependencies: CapabilityPackDependencyMapSchema.optional(),
    devDependencies: CapabilityPackDependencyMapSchema.optional(),
    env: z
      .array(CapabilityPackEnvSchema)
      .default([])
      .describe("Env vars appended to the project's .env.example"),
    addons: z
      .array(z.string())
      .optional()
      .describe("Addon ids recorded as metadata (not wired into the addons enum)"),
    compatibility: CapabilityPackCompatibilitySchema.optional(),
  })
  .describe("A community/private capability pack manifest (registry.json)");
export type CapabilityPackManifest = z.infer<typeof CapabilityPackManifestSchema>;

/** A record of one installed pack, persisted in the per-project lockfile. */
export const InstalledPackSchema = z
  .object({
    name: z.string().describe("Pack identifier"),
    version: z.string().describe("Installed pack version"),
    source: z.string().describe("Resolved source string (local path or file:// URL)"),
    files: z.array(z.string()).default([]).describe("Project-relative paths written by the pack"),
    installedAt: z.string().describe("ISO timestamp of the install"),
  })
  .describe("A capability pack recorded as installed in the project lockfile");
export type InstalledPack = z.infer<typeof InstalledPackSchema>;

/** Current schema version of the per-project registry lockfile. */
export const REGISTRY_LOCK_VERSION = 1;

/** The per-project lockfile persisted at `.better-fullstack/registry.json`. */
export const RegistryLockSchema = z
  .object({
    version: z.number().int().default(REGISTRY_LOCK_VERSION).describe("Lockfile schema version"),
    packs: z.array(InstalledPackSchema).default([]).describe("Installed capability packs"),
  })
  .describe("Per-project registry lockfile (.better-fullstack/registry.json)");
export type RegistryLock = z.infer<typeof RegistryLockSchema>;
