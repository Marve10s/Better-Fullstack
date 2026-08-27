import type { CommandExecutor } from "@effect/platform/CommandExecutor";
import type { CommandResult, Effort } from "@scaffbench/types";
import type * as Effect from "effect/Effect";

import { agentRunCommandOptions, runCommand } from "@scaffbench/agents/command";
import { bfSpec, GEN_TIMEOUT_MS } from "@scaffbench/constants";

export function runCodex(input: {
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  useMcp: boolean;
  bunx: string;
  timeoutMs?: number;
}): Effect.Effect<CommandResult, never, CommandExecutor> {
  const effortArgs =
    input.effort === "default" ? [] : ["-c", `model_reasoning_effort=${input.effort}`];
  const mcpArgs = input.useMcp
    ? [
        "-c",
        `mcp_servers.bfs.command=${JSON.stringify(input.bunx)}`,
        "-c",
        `mcp_servers.bfs.args=${JSON.stringify([bfSpec("create-better-fullstack"), "mcp"])}`,
      ]
    : [];
  return runCommand(
    "codex",
    [
      "exec",
      "--json",
      "-m",
      input.model,
      ...effortArgs,
      "--dangerously-bypass-approvals-and-sandbox",
      "--skip-git-repo-check",
      "--ignore-user-config",
      "-C",
      input.cwd,
      ...mcpArgs,
      input.prompt,
    ],
    input.cwd,
    input.timeoutMs ?? GEN_TIMEOUT_MS,
    agentRunCommandOptions("codex"),
  );
}
type CodexUsage = {
  input_tokens?: number;
  cached_input_tokens?: number;
  output_tokens?: number;
  reasoning_output_tokens?: number;
};

const CODEX_PRICING: Record<string, { input: number; cachedInput: number; output: number }> = {
  "gpt-5.5": { input: 5, cachedInput: 0.5, output: 30 },
  "gpt-5.6-sol": { input: 5, cachedInput: 0.5, output: 30 },
  "gpt-5.6-terra": { input: 2.5, cachedInput: 0.25, output: 15 },
  "gpt-5.6-luna": { input: 1, cachedInput: 0.1, output: 6 },
};

function codexPricingFor(model: string) {
  const key = model.toLowerCase();
  return (
    CODEX_PRICING[key] ??
    CODEX_PRICING[Object.keys(CODEX_PRICING).find((k) => key.startsWith(k)) ?? ""]
  );
}

export function codexCostUsd(model: string, usage: CodexUsage): number | undefined {
  const price = codexPricingFor(model);
  if (!price) return undefined;
  const input = usage.input_tokens ?? 0;
  const cached = usage.cached_input_tokens ?? 0;
  const output = usage.output_tokens ?? 0;
  return (
    (Math.max(0, input - cached) * price.input +
      cached * price.cachedInput +
      output * price.output) /
    1_000_000
  );
}

export function parseCodexResult(stdout: string, model?: string): any | null {
  const usageEvents: CodexUsage[] = [];
  let threadId: string | undefined;
  let sawUsage = false;
  let terminalReason: string | undefined;
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    let event: any;
    try {
      event = JSON.parse(trimmed);
    } catch {
      continue;
    }
    if (event?.type === "thread.started" && typeof event.thread_id === "string") {
      threadId = event.thread_id;
    }
    if (
      event?.usage &&
      (event?.type === "turn.completed" || /(?:^|\.)usage(?:\.|$)/.test(event?.type ?? ""))
    ) {
      usageEvents.push(event.usage);
      sawUsage = true;
    }
    if (event?.type === "turn.failed" || event?.type === "error") {
      terminalReason = event?.error?.message ?? event?.message ?? event?.reason ?? event?.type;
    }
  }
  if (!sawUsage && !threadId && !terminalReason) return null;
  const cumulative = usageEvents.every(
    (usage, index) => index === 0 || isUsageSuperset(usageEvents[index - 1]!, usage),
  );
  const usage = cumulative
    ? usageEvents.at(-1)
    : usageEvents.reduce<CodexUsage | undefined>(addCodexUsage, undefined);
  const outputTokens = usage !== undefined ? (usage.output_tokens ?? 0) : undefined;
  return {
    type: "result",
    usage: outputTokens !== undefined ? { output_tokens: outputTokens } : undefined,
    total_cost_usd:
      usage !== undefined && model !== undefined ? codexCostUsd(model, usage) : undefined,
    session_id: threadId,
    duration_ms: undefined,
    terminal_reason: terminalReason,
  };
}

function isUsageSuperset(previous: CodexUsage, next: CodexUsage) {
  const fields = [
    "input_tokens",
    "cached_input_tokens",
    "output_tokens",
    "reasoning_output_tokens",
  ] as const;
  return fields.every((field) => (next[field] ?? 0) >= (previous[field] ?? 0));
}

function addCodexUsage(current: CodexUsage | undefined, next: CodexUsage): CodexUsage {
  return {
    input_tokens: (current?.input_tokens ?? 0) + (next.input_tokens ?? 0),
    cached_input_tokens: (current?.cached_input_tokens ?? 0) + (next.cached_input_tokens ?? 0),
    output_tokens: (current?.output_tokens ?? 0) + (next.output_tokens ?? 0),
    reasoning_output_tokens:
      (current?.reasoning_output_tokens ?? 0) + (next.reasoning_output_tokens ?? 0),
  };
}
