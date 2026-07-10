import type { CommandResult, Effort } from "../types";
import { CLAUDE_TIMEOUT_MS } from "../constants";
import { runCommand } from "./command";

export async function runClaude(input: {
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
  maxBudgetUsd: string;
  mcpConfig: string;
}): Promise<CommandResult> {
  const effortArgs = input.effort === "default" ? [] : ["--effort", input.effort];

  return runCommand(
    "claude",
    [
      "-p",
      "--model",
      input.model,
      ...effortArgs,
      // stream-json (requires --verbose) emits the full tool_use trajectory, so
      // command discipline can be scored on actual tool calls rather than greps
      // of the final result envelope. The final {"type":"result"} line carries
      // the same cost/usage/session fields as --output-format json.
      "--output-format",
      "stream-json",
      "--verbose",
      "--permission-mode",
      "bypassPermissions",
      "--no-session-persistence",
      "--strict-mcp-config",
      "--mcp-config",
      input.mcpConfig,
      "--max-budget-usd",
      input.maxBudgetUsd,
      input.prompt,
    ],
    input.cwd,
    CLAUDE_TIMEOUT_MS,
  );
}
// Published token pricing (USD per 1M tokens) for Claude models. The Claude Code
// CLI reports total_cost_usd = 0 on subscription / Max-plan usage (no per-token
// API billing), which makes Claude look like the cheapest, most "reliable" row
// on the leaderboard purely because it shows as free. So we price Claude from
// token usage ourselves — exactly as the Codex path does — to get an
// API-equivalent cost comparable across vendors. Source: Anthropic API pricing,
// 2026. Cache reads ≈ 0.1× input; cache writes (5-min TTL) ≈ 1.25× input.
const CLAUDE_PRICING: Record<string, { input: number; output: number }> = {
  "claude-fable-5": { input: 10, output: 50 },
  "claude-opus-4-8": { input: 5, output: 25 },
  "claude-opus-4-7": { input: 5, output: 25 },
  "claude-opus-4-6": { input: 5, output: 25 },
  "claude-opus-4-5": { input: 5, output: 25 },
  "claude-sonnet-5": { input: 3, output: 15 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-haiku-4-5": { input: 1, output: 5 },
  // Bare aliases the harness/CLI may pass through as the model string.
  fable: { input: 10, output: 50 },
  opus: { input: 5, output: 25 },
  sonnet: { input: 3, output: 15 },
  haiku: { input: 1, output: 5 },
};

function claudePricingFor(model: string) {
  const key = model.toLowerCase();
  if (CLAUDE_PRICING[key]) return CLAUDE_PRICING[key];
  // Fall back to the longest matching family key (e.g. "claude-opus-4-8[1m]" or
  // a dated suffix still prices as opus); prefer the most specific match.
  const match = Object.keys(CLAUDE_PRICING)
    .filter((k) => key.includes(k))
    .sort((a, b) => b.length - a.length)[0];
  return match ? CLAUDE_PRICING[match] : undefined;
}

type ClaudeUsage = {
  input_tokens?: number;
  output_tokens?: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
};

/** Estimated API-equivalent USD cost from Claude token usage × published
 * pricing. Returns undefined when the model isn't a priced Claude model, so
 * non-Claude providers (Codex/opencode) keep their own reported cost. Cache
 * reads are priced at 0.1× input, cache writes at 1.25× input. */
export function claudeCostUsd(model: string, usage: ClaudeUsage | undefined): number | undefined {
  if (!usage) return undefined;
  const price = claudePricingFor(model);
  if (!price) return undefined;
  const input = usage.input_tokens ?? 0;
  const output = usage.output_tokens ?? 0;
  const cacheRead = usage.cache_read_input_tokens ?? 0;
  const cacheWrite = usage.cache_creation_input_tokens ?? 0;
  return (
    (input * price.input +
      output * price.output +
      cacheRead * price.input * 0.1 +
      cacheWrite * price.input * 1.25) /
    1_000_000
  );
}
export function parseClaudeResult(stdout: string): any | null {
  // stream-json: the final {"type":"result",...} line carries cost/usage/session.
  const lines = stdout.trim().split("\n");
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const candidate = lines[i]?.trim() ?? "";
    if (candidate.startsWith("{") && candidate.includes('"type":"result"')) {
      try {
        return JSON.parse(candidate);
      } catch {}
    }
  }
  // Fallback for --output-format json (single object) or noisy output.
  try {
    return JSON.parse(stdout);
  } catch {
    // Tolerate leading/trailing non-JSON (banner lines, warnings) by extracting
    // the outermost {...} span before giving up.
    const start = stdout.indexOf("{");
    const end = stdout.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(stdout.slice(start, end + 1));
      } catch {}
    }
    const line = stdout
      .trim()
      .split("\n")
      .reverse()
      .find((candidate) => candidate.trim().startsWith("{") && candidate.trim().endsWith("}"));
    if (!line) return null;
    try {
      return JSON.parse(line.trim());
    } catch {
      return null;
    }
  }
}

