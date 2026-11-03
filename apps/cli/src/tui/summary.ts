import path from "node:path";

import type { ConfigScope } from "@/prompts/core/config-scope";
import type { TuiController, TuiDecision } from "@/tui/controller";
import type { Ecosystem, ProjectConfig } from "@/types";

import { resolveCompatibilityAdjustments } from "@/config/stack-compatibility";
import { getDefaultConfig } from "@/constants";
import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";
import { PROMPT_RESOLVER_REGISTRY } from "@/prompts/core/prompt-resolver-registry";
import { buildRail, findStepId, type RailStep } from "@/tui/steps";

export type Tone = "ok" | "warn" | "error" | "info";

export type TuiSummary = {
  projectName: string;
  ecosystem?: string;
  rail: RailStep[];
  stepIndex: number;
  compatibility: { tone: Tone; text: string }[];
  command: string;
};

const DEFAULT_CONFIG: Record<string, unknown> = getDefaultConfig();
const RULE_DRIVEN_ECOSYSTEMS = new Set(["typescript", "react-native"]);

function latest(decisions: TuiDecision[], stepKey: string): TuiDecision | undefined {
  return [...decisions].reverse().find((decision) => decision.stepKey === stepKey);
}

export function decidedConfig(
  results: Readonly<Record<string, unknown>>,
  decisions: TuiDecision[],
  initialProjectName?: string,
): Partial<ProjectConfig> {
  const config: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(results)) {
    if (key === "appPlatforms" && Array.isArray(value)) config.addons = value;
    else if (key === "shadcnOptions" && typeof value === "object" && value !== null) {
      Object.assign(config, value);
    } else if (key in DEFAULT_CONFIG) config[key] = value;
  }
  const name = latest(decisions, "projectName")?.value ?? initialProjectName;
  if (typeof name === "string" && name) {
    config.relativePath = name;
    config.projectName = path.basename(path.resolve(name));
  }
  return config as Partial<ProjectConfig>;
}

function candidateFor(controller: TuiController, stepKey: string): unknown {
  const prompt = controller.prompt;
  if (!prompt || prompt.kind === "text" || prompt.kind === "confirm") return undefined;
  const raw =
    prompt.kind === "multiselect" ? prompt.selected : prompt.options[prompt.cursor]?.value;
  const values = Array.isArray(raw) ? raw : [raw];
  const allowed = PROMPT_RESOLVER_REGISTRY[stepKey]?.schemaValues;
  if (!allowed || !values.every((value) => typeof value === "string" && allowed.includes(value))) {
    return undefined;
  }
  return Array.isArray(DEFAULT_CONFIG[stepKey]) ? values : raw;
}

function compatibilityLines(
  controller: TuiController,
  decided: Partial<ProjectConfig>,
  ecosystem: string | undefined,
): TuiSummary["compatibility"] {
  const lines: TuiSummary["compatibility"] = [];
  const prompt = controller.prompt;
  const highlighted = controller.highlighted;
  if (highlighted?.disabled && highlighted.hint) {
    lines.push({
      tone: "error",
      text: `${highlighted.label} is unavailable${highlighted.hint ? `: ${highlighted.hint}` : ""}`,
    });
  }
  if (prompt?.error) lines.push({ tone: "error", text: prompt.error });

  const stepKey = prompt?.navigation.stepKey;
  const candidate: Record<string, unknown> = { ...decided };
  const value = stepKey ? candidateFor(controller, stepKey) : undefined;
  if (stepKey && value !== undefined) candidate[stepKey] = value;
  try {
    const { adjustments } = resolveCompatibilityAdjustments(candidate as Partial<ProjectConfig>, {
      onlyDefinedKeys: true,
    });
    for (const adjustment of adjustments) lines.push({ tone: "warn", text: adjustment });
  } catch (error) {
    lines.push({
      tone: "warn",
      text: `Compatibility check failed: ${error instanceof Error ? error.message : String(error)}`,
    });
  }

  if (lines.length === 0) {
    lines.push(
      RULE_DRIVEN_ECOSYSTEMS.has(ecosystem ?? "typescript")
        ? { tone: "ok", text: "No conflicts with the choices so far." }
        : { tone: "ok", text: "Options are already filtered by this ecosystem's rules." },
    );
  }
  for (const notice of controller.notices.slice(-3)) lines.push({ tone: "info", text: notice });
  return lines;
}

function liveCommand(decided: Partial<ProjectConfig>): string {
  try {
    return generateReproducibleCommand({ ...getDefaultConfig(), ...decided } as ProjectConfig);
  } catch {
    return "";
  }
}

export function summarize(controller: TuiController): TuiSummary {
  const { decisions, results, phase } = controller;
  const decided = decidedConfig(results, decisions, controller.initialProjectName);
  const ecosystem = typeof results.ecosystem === "string" ? results.ecosystem : undefined;
  const context = {
    ecosystem: ecosystem as Ecosystem | undefined,
    scope: results.configScope as ConfigScope | undefined,
    selectedSectionIds: Array.isArray(results.configSections)
      ? results.configSections.map(String)
      : undefined,
    stepKey: controller.prompt?.navigation.stepKey,
    reviewing: phase.kind === "review",
  };
  const rail = buildRail({
    ...context,
    lastStepId: findStepId({ ...context, stepKey: decisions.at(-1)?.stepKey, reviewing: false }),
  });
  return {
    projectName: typeof decided.projectName === "string" ? decided.projectName : "new project",
    ecosystem: latest(decisions, "ecosystem")?.answer,
    rail,
    stepIndex: rail.findIndex((step) => step.status === "current"),
    compatibility:
      phase.kind === "review"
        ? [{ tone: "ok", text: "Compatibility checks passed. Press enter to create the project." }]
        : compatibilityLines(controller, decided, ecosystem),
    command: phase.kind === "review" ? phase.review.command : liveCommand(decided),
  };
}
