import type { CommandExecutor } from "@effect/platform/CommandExecutor";
import type * as Effect from "effect/Effect";

import type { CommandResult, Effort } from "@/types";

import { runCommand } from "@/agents/command";
import { bfSpec, CLAUDE_TIMEOUT_MS } from "@/constants";

export function runCodex(input: {
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  useMcp: boolean;
  bunx: string;
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
    CLAUDE_TIMEOUT_MS,
  );
}
type CodexUsage = {
  input_tokens?: number;
  cached_input_tokens?: number;
  output_tokens?: number;
  reasoning_output_tokens?: number;
};

// Published token pricing (USD per 1M tokens) for the models driven via Codex.
// Codex's JSONL reports token usage but no cost, so we price it ourselves.
// Update when provider pricing changes. Source: OpenAI API pricing, 2026.
const CODEX_PRICING: Record<string, { input: number; cachedInput: number; output: number }> = {
  "gpt-5.5": { input: 5, cachedInput: 0.5, output: 30 },
  // GPT-5.6 preview pricing (2026): output = 6x input across tiers; cache reads
  // get a 90% discount (cachedInput = 0.1x input).
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

/** Estimated USD cost from codex token usage; undefined if the model isn't priced. */
export function codexCostUsd(model: string, usage: CodexUsage): number | undefined {
  const price = codexPricingFor(model);
  if (!price) return undefined;
  const input = usage.input_tokens ?? 0;
  const cached = usage.cached_input_tokens ?? 0;
  const output = (usage.output_tokens ?? 0) + (usage.reasoning_output_tokens ?? 0);
  return (
    (Math.max(0, input - cached) * price.input +
      cached * price.cachedInput +
      output * price.output) /
    1_000_000
  );
}
// Codex analogue of parseClaudeResult. The JSONL stream carries token usage on
// the final `turn.completed` event and the session on `thread.started`. Codex
// reports no USD cost, so we estimate it from token usage × CODEX_PRICING (pass
// the model). Output tokens = answer + reasoning, so the cost of "thinking
// harder" is visible in the token column.
export function parseCodexResult(stdout: string, model?: string): any | null {
  let usage: CodexUsage | undefined;
  let threadId: string | undefined;
  let sawTurn = false;
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
    if (event?.type === "turn.completed" && event.usage) {
      usage = event.usage;
      sawTurn = true;
    }
  }
  if (!sawTurn && !threadId) return null;
  const outputTokens =
    usage !== undefined
      ? (usage.output_tokens ?? 0) + (usage.reasoning_output_tokens ?? 0)
      : undefined;
  return {
    type: "result",
    usage: outputTokens !== undefined ? { output_tokens: outputTokens } : undefined,
    total_cost_usd:
      usage !== undefined && model !== undefined ? codexCostUsd(model, usage) : undefined,
    session_id: threadId,
    duration_ms: undefined,
    terminal_reason: undefined,
  };
}
