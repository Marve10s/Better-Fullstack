// Hand-curated annotations for ScaffBench 2.1 leaderboard rows whose numbers
// look wrong without context. Keyed by the row's `${model}|${effort}` key, then
// by creation path ("all" is the fallback for every path, and the pooled view).
// This file is NOT auto-generated — the splice script never touches it — so the
// notes survive data regeneration. Keep each note to a couple of sentences and
// only annotate genuinely surprising rows: a note on everything means nothing.

type NoteByPath = Partial<Record<"prompt" | "mcp" | "cli" | "all", string>>;

// Rows scored before the 2026-07-10 validator overhaul (multi-root manifest
// discovery, no vacuous install-only passes) on the earlier, smaller suite.
// Their run artifacts are gone, so they can't be re-scored.
const OLD_VALIDATOR_NOTE =
  "Scored under the pre-2026-07-10 validator on the earlier, smaller spec suite; the run artifacts are gone, so this row can't be re-scored. Comparisons against newer 13-spec rows are approximate.";

const NOTES: Record<string, NoteByPath> = {
  "gpt-5.6-terra|high": {
    mcp: "Best MCP-lane score. Its three misses are lane-wide environment quirks (workspace-catalog resolution, an unrunnable React Native build) that hit every model on this lane equally.",
    all: "MCP-lane-only row: Terra was swept at high effort on the MCP path only, so it has no prompt-path cells and no rank on the prompt-sorted board.",
  },
  "gpt-5.6-sol|high": {
    mcp: "The flagship trails Terra and Luna here because its post-scaffold edits broke two working projects: it pinned a nonexistent keycloak-admin-client version (26.3.5) and its own added code failed strict typecheck. Single-trial 11-spec lanes — a two-spec gap is within noise.",
    prompt:
      "Failures are dominated by the GPT-5.6 family's signature miss on unassisted runs: hallucinated dependency versions (several nonexistent Keycloak 26.x releases across runs). At max effort Sol reaches 5/13.",
  },
  "gpt-5.6-terra|max": {
    prompt:
      "Max effort lifts Terra least of its family (2→3 passes, vs 2→5 for both Sol and Luna). It repeated the family's hallucinated Keycloak coordinate (26.1.4); every failure was verified as a real compile or type error, not an infra flake.",
  },
  "gpt-5.6-luna|max": {
    prompt:
      "The smallest GPT-5.6 tier ties for the top index. GPT-5.6 is the first family measured where higher reasoning effort strictly adds passing builds, and Luna at max was the only GPT prompt-path run to pin real Keycloak coordinates.",
  },
  "claude-fable-5|high": {
    prompt:
      "Scores below Fable 5 at low effort (4/13 vs 5/13). On Claude models, extra reasoning effort reshuffles which specs pass rather than adding passes — an effort-ablation finding, not a data error.",
  },
  "gpt-5.5|high": {
    prompt:
      "Retired model kept for reference. It out-ranks newer GPT-5.6 rows at default efforts because the 5.6 family's unassisted scores regress on hallucinated dependency versions until run at max effort.",
  },
  "opencode/hy3-free|default": {
    all: "Scored on the 9 specs that genuinely ran: two free-endpoint infra deaths and the two frontier specs were excluded rather than counted as model failures.",
  },
  "opencode/deepseek-v4-flash-free|default": {
    all: "The prompt/MCP gap is the finding: with the scaffolder driving via MCP, even a free model wires nearly everything — the assisted lane measures restraint and config choice, not raw capability. Prompt row predates the 2026-07-10 validator overhaul.",
  },
  "claude-opus-4-8|low": { all: OLD_VALIDATOR_NOTE },
  "claude-opus-4-8|max": { all: OLD_VALIDATOR_NOTE },
  "claude-sonnet-5|max": { all: OLD_VALIDATOR_NOTE },
  "claude-sonnet-4-6|high": { all: OLD_VALIDATOR_NOTE },
  "gemini-3.5-flash|high": { all: OLD_VALIDATOR_NOTE },
  "gpt-5.3-codex-spark|high": { all: OLD_VALIDATOR_NOTE },
  "opencode/mimo-v2.5-free|default": { all: OLD_VALIDATOR_NOTE },
  "kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free|default": {
    all: "Partial sweep on a free endpoint (the run died after a handful of specs); treat as indicative only.",
  },
  "kilo/nvidia/nemotron-3-ultra-550b-a55b:free|default": {
    all: "Partial sweep on a free endpoint (the run died after a handful of specs); treat as indicative only.",
  },
};

/** Rows scored under the pre-2026-07-10 validator / smaller suite whose
 *  artifacts are gone. The board marks them with a † badge; cross-comparisons
 *  against newer rows are approximate. */
export const SCAFFBENCH21_HISTORICAL_KEYS: ReadonlySet<string> = new Set(
  Object.entries(NOTES)
    .filter(([, entry]) => entry.all === OLD_VALIDATOR_NOTE)
    .map(([key]) => key),
);

/** The note for a row on the given leaderboard path, if any. Path-specific
 *  notes win; "all" doubles as the pooled view's note and the fallback. */
export function scaffbenchNoteFor(
  modelKey: string,
  path: "prompt" | "mcp" | "cli" | "all",
): string | undefined {
  const entry = NOTES[modelKey];
  if (!entry) return undefined;
  return entry[path] ?? entry.all;
}
