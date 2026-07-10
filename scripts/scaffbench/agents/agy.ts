import type { CommandResult, Effort } from "../types";
import { CLAUDE_TIMEOUT_MS } from "../constants";
import { runCommand } from "./command";

// Antigravity (Gemini) adapter. Google sunset the standalone gemini CLI for
// individual tiers ("migrate to Antigravity"), so Gemini is driven through the
// `agy` CLI. `agy -p` runs one prompt headlessly and exits cleanly; effort is
// baked into the model display name ("Gemini 3.5 Flash (High)"), not a flag;
// --add-dir puts the isolated workspace in agy's scope (it otherwise writes to
// its own scratch dir, ignoring cwd); --dangerously-skip-permissions auto-approves
// tools (no human to approve). agy prints a plain-text response with no usage/cost
// stream, so tokens/cost/steps surface as "—".
const AGY_MODEL_LABELS: Record<string, string> = {
  "gemini-3.5-flash": "Gemini 3.5 Flash",
  "gemini-3.1-pro": "Gemini 3.1 Pro",
};
function agyModelString(model: string, effort: Effort): string {
  const base = AGY_MODEL_LABELS[model] ?? model;
  // agy exposes effort as a tier suffix. Anything above "medium" maps to High.
  const tier = effort === "low" ? "Low" : effort === "medium" ? "Medium" : "High";
  return `${base} (${tier})`;
}
export async function runAgy(input: {
  cwd: string;
  prompt: string;
  model: string;
  effort: Effort;
}): Promise<CommandResult> {
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
      "90m",
    ],
    input.cwd,
    CLAUDE_TIMEOUT_MS,
  );
}
// agy emits a plain-text response (no JSON usage stream), so there is nothing to
// parse for tokens/cost/session/terminal-reason — return undefined and let those
// fields degrade to "—", exactly like Codex's unreported cost.
function parseAgyResult(_stdout: string): undefined {
  return undefined;
}

