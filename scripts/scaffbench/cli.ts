import type { ScaffbenchOptions } from "@scaffbench/types";

import {
  CORE_SPEC_IDS,
  CREATION_PATH_VALUES,
  DEFAULT_EFFORTS,
  DEFAULT_PATHS,
  EFFORT_VALUES,
} from "@scaffbench/constants";
import { SCAFFBENCH_2_SPECS } from "@scaffbench/specs";
import path from "node:path";

export function parseList<T extends string>(
  flag: string,
  value: string | undefined,
  allowed: readonly T[],
  fallback: readonly T[],
) {
  if (!value) return [...fallback];
  if (value === "all") return [...allowed];
  const items = value.split(",").map((item) => item.trim());
  const unknown = items.filter((item) => !allowed.includes(item as T));
  if (unknown.length > 0) {
    throw new Error(
      `--${flag}: unknown value${unknown.length === 1 ? "" : "s"} ${unknown.join(", ")}; allowed: ${allowed.join(", ")}`,
    );
  }
  return items as T[];
}

function parseBudget(value: string) {
  const parsed = Number.parseFloat(value);
  if (!/^\d+(?:\.\d+)?$/.test(value.trim()) || !Number.isFinite(parsed) || parsed < 0) {
    throw new Error(
      `--max-budget-usd: expected a non-negative number, got ${JSON.stringify(value)}`,
    );
  }
  return value;
}

function parseRepeats(value: string | undefined) {
  if (value === undefined) return 1;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`--repeats: expected a positive integer, got ${JSON.stringify(value)}`);
  }
  return parsed;
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
      : parseList("specs", specsArg, specIds, CORE_SPEC_IDS);
  const promptStyle = args.get("prompt-style") === "natural" ? "natural" : "explicit";
  const repeats = parseRepeats(args.get("repeats"));

  return {
    command,
    model: args.get("model") ?? "opus",
    efforts: parseList("efforts", args.get("efforts"), EFFORT_VALUES, DEFAULT_EFFORTS),
    paths: parseList("paths", args.get("paths"), CREATION_PATH_VALUES, DEFAULT_PATHS),
    specs,
    repeats,
    outDir: requestedOutDir
      ? path.resolve(process.cwd(), requestedOutDir)
      : path.resolve(
          process.cwd(),
          "testing/llm-benchmarks/v2",
          new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "Z"),
        ),
    maxBudgetUsd: parseBudget(args.get("max-budget-usd") ?? "12"),
    skipValidation: args.has("skip-validation"),
    generateOnly: args.has("generate-only"),
    validateExisting: args.has("validate-existing"),
    forceRevalidate: args.has("force-revalidate"),
    qualityGate: !args.has("no-quality-gate"),
    noQualityGate: args.has("no-quality-gate"),
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
