import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cp, lstat, readFile, readdir, readlink, rm } from "node:fs/promises";
import path from "node:path";

import type { BenchmarkSpec, ProjectValidation, ScaffbenchOptions } from "@/types";

import {
  HARNESS_VERSION,
  VALIDATION_CACHE_VERSION,
  VALIDATION_RESOURCE_PROFILE_ID,
} from "@/constants";
import { collectToolchainVersions } from "@/summary";
import {
  hasTransientNetworkSignature,
  isRecurringTransientFailure,
} from "@/validation/classification";
import { effectiveValidationOptions, validateProject } from "@/validation/index";

const HASH_SKIP_DIRECTORIES = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".turbo",
  "coverage",
  "target",
  ".venv",
  "bin",
  "obj",
  "deps",
  "_build",
]);

export function validateProjectCached(
  spec: BenchmarkSpec,
  projectDir: string,
  options: ScaffbenchOptions,
) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const sourceHash = yield* hashProjectSource(projectDir);
    const toolchains = yield* collectToolchainVersions();
    const cacheKey = validationCacheKey(spec, options, sourceHash, toolchains);
    const cacheDir = path.join(options.outDir, "validation-cache");
    const cachePath = path.join(cacheDir, `${cacheKey}.json`);

    if (!options.forceRevalidate) {
      const cached = yield* readCachedValidation(cachePath, sourceHash, cacheKey);
      if (cached) return cached;
    }

    const cloneDir = `${projectDir}.validate-tmp`;
    yield* Effect.tryPromise(() => rm(cloneDir, { recursive: true, force: true }));
    yield* Effect.tryPromise(() => cloneProjectTree(projectDir, cloneDir));
    const validation = yield* validateProject(spec, cloneDir, options).pipe(
      Effect.ensuring(
        Effect.tryPromise(() => rm(cloneDir, { recursive: true, force: true })).pipe(Effect.ignore),
      ),
    );
    const withCacheMeta: ProjectValidation = {
      ...validation,
      sourceHash,
      cacheKey,
      cacheHit: false,
      deferred: false,
    };

    if (cacheableValidation(withCacheMeta)) {
      yield* fs.makeDirectory(cacheDir, { recursive: true });
      yield* fs.writeFileString(
        cachePath,
        `${JSON.stringify(
          {
            version: VALIDATION_CACHE_VERSION,
            createdAt: new Date().toISOString(),
            specId: spec.id,
            validation: withCacheMeta,
          },
          null,
          2,
        )}\n`,
      );
    } else {
      yield* Effect.tryPromise(() => rm(cachePath, { force: true })).pipe(Effect.ignore);
    }
    return withCacheMeta;
  });
}

function readCachedValidation(cachePath: string, sourceHash: string, cacheKey: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    if (!(yield* fs.exists(cachePath))) return null;
    const text = yield* fs.readFileString(cachePath);
    const cached = yield* Effect.try({ try: () => JSON.parse(text), catch: () => null });
    if (!cached?.validation?.projectExists) return null;
    return {
      ...cached.validation,
      qualityGateRequested: cached.validation.qualityGateRequested === true,
      sourceHash,
      cacheKey,
      cacheHit: true,
      deferred: false,
    } as ProjectValidation;
  }).pipe(Effect.catchAll(() => Effect.succeed(null)));
}

export function cacheableValidation(validation: ProjectValidation) {
  return !Object.entries(validation.steps).some(
    ([name, step]) =>
      step?.timedOut ||
      step?.spawnError ||
      (step !== undefined &&
        step.exitCode !== 0 &&
        (isRecurringTransientFailure(name, step) || hasTransientNetworkSignature(step))),
  );
}

export function validationCacheKey(
  spec: BenchmarkSpec,
  options: ScaffbenchOptions,
  sourceHash: string,
  toolchains: Record<string, string | undefined>,
  environment: { platform: string; arch: string } = {
    platform: process.platform,
    arch: process.arch,
  },
) {
  const toolchainHash = createHash("sha256")
    .update(JSON.stringify(Object.entries(toolchains).sort(([a], [b]) => a.localeCompare(b))))
    .digest("hex");
  const effective = effectiveValidationOptions(spec, options);
  const hash = createHash("sha256");
  hash.update(
    JSON.stringify({
      version: VALIDATION_CACHE_VERSION,
      harnessVersion: HARNESS_VERSION,
      resourceProfileId: VALIDATION_RESOURCE_PROFILE_ID,
      specId: spec.id,
      sourceHash,
      qualityGate: effective.qualityGate,
      doctorCheck: effective.doctorCheck,
      routeCheck: effective.routeCheck,
      platform: environment.platform,
      arch: environment.arch,
      toolchainHash,
    }),
  );
  return hash.digest("hex");
}

async function cloneProjectTree(sourceDir: string, destDir: string) {
  if (process.platform === "darwin") {
    const clone = spawnSync("cp", ["-Rc", sourceDir, destDir], { stdio: "ignore" });
    if (clone.status === 0) return;
    await rm(destDir, { recursive: true, force: true });
  }
  await cp(sourceDir, destDir, { recursive: true, force: true, verbatimSymlinks: true });
}

type HashEntry = {
  path: string;
  kind: "file" | "symlink" | "directory";
  mode: number;
  target?: string;
};

export function hashProjectSource(projectDir: string) {
  return Effect.gen(function* () {
    const hash = createHash("sha256");
    const entries = yield* listHashableEntries(projectDir);
    yield* Effect.forEach(
      entries,
      (entry) =>
        Effect.gen(function* () {
          const relative = path.relative(projectDir, entry.path).split(path.sep).join("/");
          hash.update(entry.kind);
          hash.update("\0");
          hash.update(relative);
          hash.update("\0");
          hash.update(entry.mode.toString(8));
          hash.update("\0");
          if (entry.kind === "file")
            hash.update(yield* Effect.tryPromise(() => readFile(entry.path)));
          if (entry.kind === "symlink") hash.update(entry.target ?? "");
          hash.update("\0");
        }),
      { concurrency: 1, discard: true },
    );
    return hash.digest("hex");
  });
}

function listHashableEntries(root: string) {
  return Effect.gen(function* () {
    const entries: HashEntry[] = [];

    const visit = (directory: string): Effect.Effect<void, unknown> =>
      Effect.gen(function* () {
        const children = yield* Effect.tryPromise(() =>
          readdir(directory, { withFileTypes: true }),
        );
        yield* Effect.forEach(
          children,
          (entry) => {
            if (HASH_SKIP_DIRECTORIES.has(entry.name)) return Effect.void;
            const entryPath = path.join(directory, entry.name);
            return Effect.gen(function* () {
              const info = yield* Effect.tryPromise(() => lstat(entryPath));
              const mode = info.mode & 0o7777;
              if (entry.isSymbolicLink()) {
                const target = yield* Effect.tryPromise(() => readlink(entryPath));
                entries.push({ path: entryPath, kind: "symlink", mode, target });
              } else if (entry.isDirectory()) {
                entries.push({ path: entryPath, kind: "directory", mode });
                yield* visit(entryPath);
              } else if (entry.isFile()) {
                entries.push({ path: entryPath, kind: "file", mode });
              }
            });
          },
          { concurrency: 1, discard: true },
        );
      });

    yield* visit(root);
    return entries.sort((a, b) => a.path.localeCompare(b.path));
  });
}
