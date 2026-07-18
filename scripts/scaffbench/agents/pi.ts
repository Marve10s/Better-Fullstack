import type { CommandExecutor } from "@effect/platform/CommandExecutor";
import type * as Effect from "effect/Effect";

import type { CommandResult, Effort } from "@/types";

import { agentRunCommandOptions, runCommand } from "@/agents/command";
import { GEN_TIMEOUT_MS } from "@/constants";

export function piThinkingArgs(effort: Effort): string[] {
  return effort === "default" ? [] : ["--thinking", effort];
}

export function piProviderAndModel(modelId: string): { provider: string; model: string } {
  const unprefixed = modelId.replace(/^pi\//i, "");
  const separator = unprefixed.indexOf("/");
  if (separator <= 0 || separator === unprefixed.length - 1) {
    throw new Error(
      `Invalid Pi model id ${JSON.stringify(modelId)}; expected pi/<provider>/<model>`,
    );
  }
  return {
    provider: unprefixed.slice(0, separator),
    model: unprefixed.slice(separator + 1),
  };
}

export function piCommandArgs(input: { prompt: string; model: string; effort: Effort }): string[] {
  const resolved = piProviderAndModel(input.model);
  return [
    "-p",
    "--mode",
    "json",
    "--provider",
    resolved.provider,
    "--model",
    resolved.model,
    ...piThinkingArgs(input.effort),
    "--no-session",
    "--no-extensions",
    "--no-context-files",
    input.prompt,
  ];
}

export function runPi(input: {
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  timeoutMs?: number;
}): Effect.Effect<CommandResult, never, CommandExecutor> {
  return runCommand(
    "pi",
    piCommandArgs(input),
    input.cwd,
    input.timeoutMs ?? GEN_TIMEOUT_MS,
    agentRunCommandOptions("pi"),
  );
}

/** Parse Pi's JSONL stream, using completed assistant messages as the accounting
 * boundary. turn_end and agent_end repeat those messages and must not be summed. */
export function parsePiResult(stdout: string): any | null {
  let sessionId: string | undefined;
  let outputTokens = 0;
  let totalCost = 0;
  let sawUsage = false;
  let sawCost = false;
  let toolEvents = 0;
  let sawAssistantText = false;
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

    if (event?.type === "session" && typeof event.id === "string") sessionId = event.id;
    if (event?.type === "tool_execution_start") toolEvents += 1;

    if (event?.type === "message_end" && event?.message?.role === "assistant") {
      const usage = event.message.usage;
      if (usage && typeof usage === "object") {
        outputTokens += numeric(usage.output) + numeric(usage.reasoning);
        sawUsage = true;
        if (typeof usage.cost?.total === "number") {
          totalCost += usage.cost.total;
          sawCost = true;
        }
      }
      const content = Array.isArray(event.message.content) ? event.message.content : [];
      if (content.some((block: any) => block?.type === "text" && block.text?.trim())) {
        sawAssistantText = true;
      }
      const stopReason = event.message.stopReason;
      if (typeof stopReason === "string" && !["stop", "toolUse"].includes(stopReason)) {
        terminalReason = stopReason;
      }
    }

    if (event?.type === "error") {
      const error = event.error ?? event.message ?? event.reason ?? "unknown";
      terminalReason = `error:${typeof error === "string" ? error : JSON.stringify(error)}`;
    }
  }

  if (!sessionId && !sawUsage && toolEvents === 0 && !terminalReason) return null;
  if (!terminalReason && outputTokens === 0 && toolEvents === 0 && !sawAssistantText) {
    terminalReason = "pi-zero-usage-no-tools";
  }
  return {
    type: "result",
    usage: sawUsage ? { output_tokens: outputTokens } : undefined,
    total_cost_usd: sawCost ? totalCost : undefined,
    session_id: sessionId,
    duration_ms: undefined,
    terminal_reason: terminalReason,
    tool_events: toolEvents,
    assistant_text: sawAssistantText,
  };
}

function numeric(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
