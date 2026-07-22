import path from "node:path";

import type { RunOutcome, ScaffbenchOptions } from "@/types";

import { CALIBRATION_WEAK_MODEL } from "@/constants";
import { rollupOutcome } from "@/scoring";

export type CalibrationVerdict = "keep" | "cut" | "inconclusive";

export function calibrationOptions(options: ScaffbenchOptions) {
  const common = {
    ...options,
    command: "run" as const,
    repeats: 1,
    paths: ["prompt" as const],
    repair: false,
    listSpecs: false,
    writeMatrixOnly: false,
    generateOnly: false,
    validateExisting: false,
  };
  return {
    weak: {
      ...common,
      model: CALIBRATION_WEAK_MODEL,
      efforts: ["default" as const],
      outDir: path.join(options.outDir, "calibration", "weak"),
    },
    strong: {
      ...common,
      model: options.model,
      efforts: [options.efforts[0] ?? "default"],
      outDir: path.join(options.outDir, "calibration", "strong"),
    },
  };
}

/** Keep only discriminating specs: weak model fails and configured strong passes. */
export function calibrationVerdict(
  weak: RunOutcome | undefined,
  strong: RunOutcome | undefined,
): CalibrationVerdict {
  if (!weak || !strong) return "inconclusive";
  if (
    rollupOutcome(weak) === "infra-inconclusive" ||
    rollupOutcome(strong) === "infra-inconclusive"
  ) {
    return "inconclusive";
  }
  return rollupOutcome(weak) === "model-failure" && strong === "success" ? "keep" : "cut";
}

export function formatCalibrationVerdict(
  specId: string,
  verdict: CalibrationVerdict,
  weak: RunOutcome | undefined,
  strong: RunOutcome | undefined,
) {
  return `CALIBRATE ${specId}: ${verdict.toUpperCase()} weak=${weak ?? "missing"} strong=${strong ?? "missing"}`;
}
