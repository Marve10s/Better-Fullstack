import type { CommandExecutor } from "@effect/platform/CommandExecutor";

import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import path from "node:path";

import type { CommandResult, Effort } from "@/types";

import { agentRunCommandOptions, runCommand } from "@/agents/command";
import { bfSpec, GEN_TIMEOUT_MS } from "@/constants";

// opencode / Kilo Code adapter — both ship the same CLI, so one function (binary =
// "opencode" | "kilo") drives both. Runs `<bin> run --format json` in the isolated
// workdir; for the MCP path it writes a project opencode.json wiring ONLY the
// Better-Fullstack MCP server. opencode reports USD cost directly on each
// step-finish (0 for free models), so no pricing table is needed. Reasoning effort
// maps to --variant. Output is the JSONL event stream parseOpencodeResult reads.
export function runOpencode(input: {
  binary: "opencode" | "kilo";
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  useMcp: boolean;
  bunx: string;
  timeoutMs?: number;
}): Effect.Effect<CommandResult, unknown, CommandExecutor | FileSystem.FileSystem> {
  return Effect.gen(function* () {
    if (input.useMcp) {
      const fs = yield* FileSystem.FileSystem;
      const config = {
        mcp: {
          "better-fullstack": {
            type: "local",
            command: [input.bunx, bfSpec("create-better-fullstack"), "mcp"],
            enabled: true,
          },
        },
      };
      yield* fs.writeFileString(
        path.join(input.cwd, "opencode.json"),
        `${JSON.stringify(config, null, 2)}\n`,
      );
    }
    const effortArgs = input.effort === "default" ? [] : ["--variant", input.effort];
    // Harness-side disambiguation prefix: `kilocode/<id>` means "drive the Kilo
    // binary with <id>" (e.g. kilocode/openai/gpt-5.6-luna → Kilo's OpenAI
    // oauth), distinct from Kilo's own credit-gated `kilo/*` catalog ids which
    // pass through unchanged.
    const modelId = input.model.replace(/^kilocode\//i, "");
    return yield* runCommand(
      input.binary,
      [
        "run",
        "--format",
        "json",
        // Non-interactive: there is no human to approve tool calls, so without this
        // opencode/Kilo auto-REJECT every bash/edit ("user rejected permission"),
        // and the agent can't scaffold anything. Matches claude's
        // --dangerously-skip-permissions and codex's --full-auto.
        "--dangerously-skip-permissions",
        "-m",
        modelId,
        ...effortArgs,
        "--dir",
        input.cwd,
        input.prompt,
      ],
      input.cwd,
      input.timeoutMs ?? GEN_TIMEOUT_MS,
      agentRunCommandOptions(input.binary),
    );
  });
}
// opencode / Kilo Code analogue. Every JSONL event carries a sessionID; each
// `step-finish` part carries per-step token usage and USD cost (0 for free
// models), summed across steps. opencode reports cost directly, so unlike codex
// no pricing table is involved.
export function parseOpencodeResult(stdout: string): any | null {
  let sessionId: string | undefined;
  let outputTokens = 0;
  let cost = 0;
  let sawStep = false;
  let sawTool = false;
  let sawAssistantText = false;
  let stepReason: string | undefined;
  let errorReason: string | undefined;
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    let event: any;
    try {
      event = JSON.parse(trimmed);
    } catch {
      continue;
    }
    if (typeof event?.sessionID === "string") sessionId = event.sessionID;
    const part = event?.part;
    if (part?.type === "tool") sawTool = true;
    const assistantText =
      part?.type === "text"
        ? (part.text ?? part.content)
        : event?.role === "assistant" || event?.message?.role === "assistant"
          ? (event.text ?? event.content ?? event.message?.content)
          : undefined;
    if (
      (typeof assistantText === "string" && assistantText.trim().length > 0) ||
      ["refusal", "moderation"].includes(part?.type)
    ) {
      sawAssistantText = true;
    }
    if (part?.type === "step-finish" || part?.type === "step_finish") {
      sawStep = true;
      outputTokens += (part.tokens?.output ?? 0) + (part.tokens?.reasoning ?? 0);
      if (typeof part.cost === "number") cost += part.cost;
      if (typeof part.reason === "string") stepReason = part.reason;
    }
    if (event?.type === "error" || part?.type === "error") {
      const error = event?.error ?? part?.error ?? event?.message ?? part?.message;
      errorReason = typeof error === "string" ? error : JSON.stringify(error ?? "unknown");
    }
  }
  if (!sawStep && sessionId === undefined && !errorReason) return null;
  const terminalReason = errorReason
    ? `error:${errorReason}`
    : stepReason === "unknown" && outputTokens === 0 && !sawTool && !sawAssistantText
      ? "opencode-unknown-zero-usage-no-tools"
      : stepReason;
  return {
    type: "result",
    usage: sawStep ? { output_tokens: outputTokens } : undefined,
    total_cost_usd: sawStep ? cost : undefined,
    session_id: sessionId,
    duration_ms: undefined,
    terminal_reason: terminalReason,
    tool_events: sawTool,
    assistant_text: sawAssistantText,
  };
}
