import { writeFile } from "node:fs/promises";
import path from "node:path";
import type { CommandResult, Effort } from "../types";
import { bfSpec, CLAUDE_TIMEOUT_MS } from "../constants";
import { runCommand } from "./command";

// opencode / Kilo Code adapter — both ship the same CLI, so one function (binary =
// "opencode" | "kilo") drives both. Runs `<bin> run --format json` in the isolated
// workdir; for the MCP path it writes a project opencode.json wiring ONLY the
// Better-Fullstack MCP server. opencode reports USD cost directly on each
// step-finish (0 for free models), so no pricing table is needed. Reasoning effort
// maps to --variant. Output is the JSONL event stream parseOpencodeResult reads.
export async function runOpencode(input: {
  binary: "opencode" | "kilo";
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  useMcp: boolean;
  bunx: string;
}): Promise<CommandResult> {
  if (input.useMcp) {
    const config = {
      mcp: {
        "better-fullstack": {
          type: "local",
          command: [input.bunx, bfSpec("create-better-fullstack"), "mcp"],
          enabled: true,
        },
      },
    };
    await writeFile(path.join(input.cwd, "opencode.json"), `${JSON.stringify(config, null, 2)}\n`);
  }
  const effortArgs = input.effort === "default" ? [] : ["--variant", input.effort];
  return runCommand(
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
      input.model,
      ...effortArgs,
      "--dir",
      input.cwd,
      input.prompt,
    ],
    input.cwd,
    CLAUDE_TIMEOUT_MS,
  );
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
    if (part?.type === "step-finish") {
      sawStep = true;
      outputTokens += (part.tokens?.output ?? 0) + (part.tokens?.reasoning ?? 0);
      if (typeof part.cost === "number") cost += part.cost;
    }
  }
  if (!sawStep && sessionId === undefined) return null;
  return {
    type: "result",
    usage: sawStep ? { output_tokens: outputTokens } : undefined,
    total_cost_usd: sawStep ? cost : undefined,
    session_id: sessionId,
    duration_ms: undefined,
    terminal_reason: undefined,
  };
}

