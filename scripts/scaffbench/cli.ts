import path from "node:path";

import type { ScaffbenchOptions } from "@/types";

import { CORE_SPEC_IDS, DEFAULT_EFFORTS, DEFAULT_PATHS } from "@/constants";
import { SCAFFBENCH_2_SPECS } from "@/specs";

export function parseList<T extends string>(
  value: string | undefined,
  allowed: readonly T[],
  fallback: readonly T[],
) {
  if (!value) return [...fallback];
  if (value === "all") return [...allowed];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is T => allowed.includes(item as T));
}

export function parseArgs(argv: string[]): ScaffbenchOptions {
  const command = argv[0] === "calibrate" ? "calibrate" : "run";
  const args = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token || !token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args.set(key, next);
      i += 1;
    } else {
      args.set(key, "true");
    }
  }

  const requestedOutDir = args.get("out-dir");
  const specIds = SCAFFBENCH_2_SPECS.map((spec) => spec.id);
  const specsArg = args.get("specs") ?? args.get("spec");
  const specs =
    specsArg === "core" || !specsArg
      ? [...CORE_SPEC_IDS]
      : parseList(specsArg, specIds, CORE_SPEC_IDS);
  const promptStyle = args.get("prompt-style") === "natural" ? "natural" : "explicit";
  const repeats = Math.max(1, Number.parseInt(args.get("repeats") ?? "1", 10) || 1);

  return {
    command,
    model: args.get("model") ?? "opus",
    efforts: parseList(
      args.get("efforts"),
      ["default", "low", "medium", "high", "xhigh", "max"],
      DEFAULT_EFFORTS,
    ),
    paths: parseList(args.get("paths"), ["prompt", "mcp", "cli"], DEFAULT_PATHS),
    specs,
    repeats,
    outDir: requestedOutDir
      ? path.resolve(process.cwd(), requestedOutDir)
      : path.resolve(
          process.cwd(),
          "testing/llm-benchmarks/v2",
          new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "Z"),
        ),
    maxBudgetUsd: args.get("max-budget-usd") ?? "12",
    skipValidation: args.has("skip-validation"),
    generateOnly: args.has("generate-only"),
    validateExisting: args.has("validate-existing"),
    forceRevalidate: args.has("force-revalidate"),
    // Quality gates default ON (2026-07-17): the board publishes a single
    // Full-tier pass metric, so every sweep must measure it. Opt out with
    // --no-quality-gate (e.g. quick exploratory generation checks).
    qualityGate: args.has("no-quality-gate") ? false : true,
    doctorCheck: args.has("doctor-check"),
    routeCheck: args.has("route-check"),
    promptStyle,
    listSpecs: args.has("list-specs"),
    writeMatrixOnly: args.has("write-matrix-only"),
    repair: args.has("repair"),
  };
}

export function selectedSpecs(specIds: readonly string[]) {
  const requested = new Set(specIds);
  return SCAFFBENCH_2_SPECS.filter((spec) => requested.has(spec.id));
}
