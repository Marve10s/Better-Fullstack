import path from "node:path";

import type { ConfigScope } from "@/prompts/core/config-scope";
import type { TuiController, TuiDecision } from "@/tui/controller";
import type { Ecosystem, ProjectConfig } from "@/types";

import { resolveCompatibilityAdjustments } from "@/config/stack-compatibility";
import { getDefaultConfig } from "@/constants";
import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";
import { PROMPT_RESOLVER_REGISTRY } from "@/prompts/core/prompt-resolver-registry";
import { chapterProgress, type ChapterProgress } from "@/tui/steps";

export type Tone = "ok" | "warn" | "error" | "info";

export type ConstellationNode = {
  key: string;
  value: unknown;
  label: string;
};

export type TuiSummary = {
  projectName: string;
  ecosystem?: string;
  ecosystemId?: string;
  progress: ChapterProgress;
  compatibility: { tone: Tone; text: string }[];
  conflictKeys: string[];
  command: string;
  nodes: ConstellationNode[];
};

const HIDDEN_NODE_KEYS = new Set([
  "projectName",
  "versionChannel",
  "ecosystem",
  "compositionMode",
  "configScope",
  "configSections",
]);

const TITLE_OVERRIDES: Record<string, string> = {
  projectName: "PROJECT",
  versionChannel: "CHANNEL",
  compositionMode: "SHAPE",
  configScope: "SCOPE",
  configSections: "SECTIONS",
  packageManager: "PACKAGES",
  pythonPackageManager: "PACKAGES",
  dbSetup: "DB SETUP",
  aiDocs: "AI DOCS",
  webDeploy: "WEB DEPLOY",
  serverDeploy: "SERVER DEPLOY",
  api: "API",
  orm: "ORM",
  ai: "AI",
};

const ECOSYSTEM_PREFIX =
  /^(rust|python|go|java|dotnet|ruby|php|elixir|crystal|mobile|kotlin)(?=[A-Z])/;
const MESSAGE_FILLER =
  /^(select|choose|pick|enter|which|what|how|do|would|you|your|a|an|the|to|for|of|want|like|project's)$/i;

function titleWords(stepKey: string | undefined, message: string): string[] {
  if (stepKey && TITLE_OVERRIDES[stepKey]) return TITLE_OVERRIDES[stepKey].split(" ");
  if (stepKey) {
    return stepKey
      .replace(ECOSYSTEM_PREFIX, "")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .toUpperCase()
      .split(" ");
  }
  const words = message
    .replace(/[^A-Za-z0-9 -]/g, " ")
    .split(/\s+/)
    .filter((word) => word && !MESSAGE_FILLER.test(word));
  return (words.length > 0 ? words.slice(0, 2) : ["NEXT"]).map((word) => word.toUpperCase());
}

export function chapterTitle(
  stepKey: string | undefined,
  message: string,
  maxChars: number,
): string {
  const words = titleWords(stepKey, message);
  const full = words.join(" ");
  if (full.length <= maxChars) return full;
  const last = words.at(-1) ?? full;
  return last.length <= maxChars ? last : last.slice(0, Math.max(1, maxChars));
}

function nodeLabel(value: unknown): string | undefined {
  if (typeof value === "string") return value === "none" ? undefined : value;
  if (!Array.isArray(value)) return undefined;
  const picked = value.filter(
    (item): item is string => typeof item === "string" && item !== "none",
  );
  if (picked.length === 0) return undefined;
  return picked.length === 1 ? picked[0] : `${picked[0]} +${picked.length - 1}`;
}

export function constellationNodes(decisions: TuiDecision[]): ConstellationNode[] {
  const latestByKey = new Map<string, TuiDecision>();
  for (const decision of decisions) {
    if (!decision.stepKey || HIDDEN_NODE_KEYS.has(decision.stepKey)) continue;
    latestByKey.delete(decision.stepKey);
    latestByKey.set(decision.stepKey, decision);
  }
  const seenLabels = new Set<string>();
  return [...latestByKey.values()].flatMap((decision) => {
    const label = nodeLabel(decision.value);
    if (!label || !decision.stepKey || seenLabels.has(label)) return [];
    seenLabels.add(label);
    const value = Array.isArray(decision.value)
      ? decision.value.find((item) => item !== "none")
      : decision.value;
    return [{ key: decision.stepKey, value, label }];
  });
}

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
): Pick<TuiSummary, "compatibility" | "conflictKeys"> {
  const lines: TuiSummary["compatibility"] = [];
  const conflictKeys: string[] = [];
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
    const { adjustments, changes } = resolveCompatibilityAdjustments(
      candidate as Partial<ProjectConfig>,
      { onlyDefinedKeys: true },
    );
    for (const adjustment of adjustments) lines.push({ tone: "warn", text: adjustment });
    if (adjustments.length > 0) conflictKeys.push(...Object.keys(changes));
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
  return { compatibility: lines, conflictKeys };
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
  const progress = chapterProgress({
    ecosystem: ecosystem as Ecosystem | undefined,
    scope: results.configScope as ConfigScope | undefined,
    selectedSectionIds: Array.isArray(results.configSections)
      ? results.configSections.map(String)
      : undefined,
    answered: decisions.length,
    reviewing: phase.kind === "review",
  });
  const settled = phase.kind !== "prompt";
  return {
    projectName: typeof decided.projectName === "string" ? decided.projectName : "my-app",
    ecosystem: latest(decisions, "ecosystem")?.answer,
    ecosystemId: ecosystem,
    progress,
    ...(settled
      ? {
          compatibility: [{ tone: "ok" as const, text: "Compatibility checks passed." }],
          conflictKeys: [],
        }
      : compatibilityLines(controller, decided, ecosystem)),
    command: phase.kind === "review" ? phase.review.command : liveCommand(decided),
    nodes: constellationNodes(decisions),
  };
}
