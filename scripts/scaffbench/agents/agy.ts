import type { CommandExecutor } from "@effect/platform/CommandExecutor";
import type * as Effect from "effect/Effect";

import type { CommandResult, Effort } from "@/types";

import { agentRunCommandOptions, runCommand } from "@/agents/command";
import { GEN_TIMEOUT_MS } from "@/constants";

const AGY_MODEL_VARIANTS: Record<string, { label: string; tiers: Partial<Record<Effort, string>> }> =
  {
    "gemini-3.7-flash": {
      label: "Gemini 3.7 Flash",
      tiers: { low: "Low", medium: "Medium", high: "High" },
    },
    "gemini-3.6-flash": {
      label: "Gemini 3.6 Flash",
      tiers: { low: "Low", medium: "Medium", high: "High" },
    },
    "gemini-3.5-flash": {
      label: "Gemini 3.5 Flash",
      tiers: { low: "Low", medium: "Medium", high: "High" },
    },
    "gemini-3.1-pro": {
      label: "Gemini 3.1 Pro",
      tiers: { low: "Low", high: "High" },
    },
  };

export function agyModelString(model: string, effort: Effort): string {
  const variant = AGY_MODEL_VARIANTS[model];
  if (!variant) {
    throw new Error(
      `agy model ${JSON.stringify(model)} is not in the verified Antigravity catalog ` +
        `(${Object.keys(AGY_MODEL_VARIANTS).join(", ")}); run \`agy models\` and update AGY_MODEL_VARIANTS`,
    );
  }
  const tier = variant.tiers[effort];
  if (!tier) {
    throw new Error(
      `agy model ${model} has no distinct ${effort} variant; ` +
        `supported efforts: ${Object.keys(variant.tiers).join(", ")}`,
    );
  }
  return `${variant.label} (${tier})`;
}

export function runAgy(input: {
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  timeoutMs?: number;
}): Effect.Effect<CommandResult, never, CommandExecutor> {
  return runCommand(
    "agy",
    [
      "-p",
      input.prompt,
      "--model",
      agyModelString(input.model, input.effort),
      "--dangerously-skip-permissions",
      "--add-dir",
      input.cwd,
      "--print-timeout",
      `${Math.ceil((input.timeoutMs ?? GEN_TIMEOUT_MS) / 60_000)}m`,
    ],
    input.cwd,
    input.timeoutMs ?? GEN_TIMEOUT_MS,
    agentRunCommandOptions("agy"),
  );
}

export function parseAgyResult(_stdout: string): undefined {
  return undefined;
}
