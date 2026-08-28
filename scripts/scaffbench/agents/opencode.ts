import type { CommandExecutor } from "@effect/platform/CommandExecutor";
import type { CommandResult, Effort } from "@scaffbench/types";

import * as FileSystem from "@effect/platform/FileSystem";
import { agentRunCommandOptions, runCommand } from "@scaffbench/agents/command";
import { bfSpec, GEN_TIMEOUT_MS } from "@scaffbench/constants";
import * as Effect from "effect/Effect";
import path from "node:path";

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
    const modelId = input.model.replace(/^kilocode\//i, "");
    return yield* runCommand(
      input.binary,
      [
        "run",
        "--format",
        "json",
        "--auto",
        "--pure",
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

export function parseOpencodeResult(stdout: string): any | null {
  let sessionId: string | undefined;
  let outputTokens = 0;
  let cost = 0;
  let sawStep = false;
  let sawTool = false;
  let sawAssistantText = false;
  let lastStepTokens = 0;
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
      lastStepTokens = (part.tokens?.output ?? 0) + (part.tokens?.reasoning ?? 0);
      outputTokens += lastStepTokens;
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
      : stepReason === "unknown" && lastStepTokens === 0 && sawTool && outputTokens > 0
        ? "opencode-unknown-zero-usage-step"
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
