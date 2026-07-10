import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import { createHash } from "node:crypto";
import { readdir } from "node:fs/promises";
import path from "node:path";

import type { BenchmarkSpec, ProjectValidation, ScaffbenchOptions } from "@/types";

import { HARNESS_VERSION, VALIDATION_CACHE_VERSION } from "@/constants";
import { validateProject } from "@/validation/index";

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
]);

export function validateProjectCached(
  spec: BenchmarkSpec,
  projectDir: string,
  options: ScaffbenchOptions,
) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const sourceHash = yield* hashProjectSource(projectDir);
    const cacheKey = validationCacheKey(spec, options, sourceHash);
    const cacheDir = path.join(options.outDir, "validation-cache");
    const cachePath = path.join(cacheDir, `${cacheKey}.json`);

    const cached = yield* readCachedValidation(cachePath, sourceHash, cacheKey);
    if (cached) return cached;

    const validation = yield* validateProject(spec, projectDir, options);
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
      sourceHash,
      cacheKey,
      cacheHit: true,
      deferred: false,
    } as ProjectValidation;
  }).pipe(Effect.catchAll(() => Effect.succeed(null)));
}

function cacheableValidation(validation: ProjectValidation) {
  return !Object.values(validation.steps).some((step) => step?.timedOut || step?.spawnError);
}

function validationCacheKey(spec: BenchmarkSpec, options: ScaffbenchOptions, sourceHash: string) {
  const hash = createHash("sha256");
  hash.update(
    JSON.stringify({
      version: VALIDATION_CACHE_VERSION,
      harnessVersion: HARNESS_VERSION,
      specId: spec.id,
      sourceHash,
      qualityGate: options.qualityGate,
      doctorCheck: options.doctorCheck,
      routeCheck: options.routeCheck,
    }),
  );
  return hash.digest("hex");
}

function hashProjectSource(projectDir: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const hash = createHash("sha256");
    const files = yield* listHashableFiles(projectDir);
    yield* Effect.forEach(
      files,
      (filePath) =>
        Effect.gen(function* () {
          const relative = path.relative(projectDir, filePath).split(path.sep).join("/");
          hash.update(relative);
          hash.update("\0");
          hash.update(yield* fs.readFile(filePath));
          hash.update("\0");
        }),
      { concurrency: 1, discard: true },
    );
    return hash.digest("hex");
  });
}

function listHashableFiles(root: string) {
  return Effect.gen(function* () {
    const files: string[] = [];

    const visit = (directory: string): Effect.Effect<void, unknown> =>
      Effect.gen(function* () {
        // Dirent preserves the old cache contract: symbolic links are ignored
        // rather than followed into the source hash.
        const entries = yield* Effect.tryPromise(() => readdir(directory, { withFileTypes: true }));
        yield* Effect.forEach(
          entries,
          (entry) => {
            if (HASH_SKIP_DIRECTORIES.has(entry.name)) return Effect.void;
            const entryPath = path.join(directory, entry.name);
            if (entry.isDirectory()) return visit(entryPath);
            if (entry.isFile()) files.push(entryPath);
            return Effect.void;
          },
          { concurrency: 1, discard: true },
        );
      });

    yield* visit(root);
    return files.sort();
  });
}
