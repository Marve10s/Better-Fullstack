import { PRESET_TEMPLATES, type StackState } from "@/lib/constant";

type PresetTemplate = (typeof PRESET_TEMPLATES)[number];

export interface PresetRecommendation {
  /** The winning preset's id (matches PRESET_TEMPLATES[].id, applyable via onApplyPreset). */
  presetId: string;
  /** Human-readable preset name for display. */
  presetName: string;
  /** Brief keywords/tech that drove the match, for showing the user why. */
  matchedTerms: string[];
  /** One-line explanation of the recommendation. */
  rationale: string;
}

/**
 * Explicit intent signals: natural-language phrases that imply a stack trait.
 * Each fires when the brief mentions one of `terms` AND the candidate preset's
 * stack satisfies `matches`, nudging that preset up the ranking.
 */
const INTENT_SIGNALS: {
  terms: string[];
  matches: (stack: Partial<StackState>) => boolean;
  reason: string;
}[] = [
  {
    terms: ["mobile", "ios", "android", "react native", "expo", "app store", "native app"],
    matches: (s) => Array.isArray(s.nativeFrontend) && s.nativeFrontend.some((f) => f !== "none"),
    reason: "mobile/native app",
  },
  {
    terms: ["postgres", "postgresql"],
    matches: (s) => s.database === "postgres",
    reason: "PostgreSQL",
  },
  {
    terms: ["mysql", "planetscale"],
    matches: (s) => s.database === "mysql",
    reason: "MySQL",
  },
  {
    terms: ["sqlite", "local-first", "embedded", "turso", "libsql"],
    matches: (s) => s.database === "sqlite",
    reason: "SQLite",
  },
  {
    terms: ["auth", "login", "authentication", "sign in", "accounts", "users"],
    matches: (s) => typeof s.auth === "string" && s.auth !== "none",
    reason: "authentication",
  },
  {
    terms: ["ai", "llm", "chatbot", "chat bot", "openai", "anthropic", "rag", "assistant"],
    matches: (s) => Array.isArray(s.examples) && s.examples.includes("ai"),
    reason: "AI features",
  },
  {
    terms: ["type safe", "typesafe", "end to end", "trpc"],
    matches: (s) => s.api === "trpc",
    reason: "end-to-end type safety (tRPC)",
  },
];

/** Collects every string/array-of-string value in a preset stack, lowercased, for token matching. */
function collectStackTerms(stack: Partial<StackState>): Set<string> {
  const terms = new Set<string>();
  for (const value of Object.values(stack)) {
    if (typeof value === "string") {
      terms.add(value.toLowerCase());
    } else if (Array.isArray(value)) {
      for (const entry of value) {
        if (typeof entry === "string") terms.add(entry.toLowerCase());
      }
    }
  }
  return terms;
}

/**
 * Recommends the closest builder preset for a natural-language brief.
 *
 * Deterministic keyword scorer (no network / model call): each preset is scored by
 * (1) word overlap with its name+description, (2) brief words that name a tech in its
 * stack, and (3) explicit intent signals. Ties resolve to the earlier preset, so the
 * result is stable for a given brief. Always returns a preset — an empty/vague brief
 * falls back to the first preset in the pool with a rationale saying so.
 *
 * `pool` scopes the candidates (e.g. the current ecosystem's presets on the builder);
 * it defaults to every preset. An empty pool falls back to all presets so the function
 * never returns undefined.
 */
export function recommendPresetFromBrief(
  brief: string,
  pool: readonly PresetTemplate[] = PRESET_TEMPLATES,
): PresetRecommendation {
  const presets = pool.length > 0 ? pool : PRESET_TEMPLATES;
  const normalized = ` ${brief.toLowerCase()} `;
  const words = brief
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((word) => word.length >= 3);

  let best = presets[0];
  let bestScore = -1;
  let bestTerms: string[] = [];
  let bestReasons: string[] = [];

  for (const preset of presets) {
    const haystack = `${preset.name} ${preset.description}`.toLowerCase();
    const stackTerms = collectStackTerms(preset.stack);
    const matched = new Set<string>();
    const reasons: string[] = [];
    let score = 0;

    for (const word of words) {
      if (haystack.includes(word)) {
        score += 2;
        matched.add(word);
      }
      if (stackTerms.has(word)) {
        score += 3;
        matched.add(word);
      }
    }

    for (const signal of INTENT_SIGNALS) {
      const mentioned = signal.terms.some((term) => normalized.includes(` ${term} `) || normalized.includes(term));
      if (mentioned && signal.matches(preset.stack)) {
        score += 4;
        reasons.push(signal.reason);
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = preset;
      bestTerms = [...matched];
      bestReasons = reasons;
    }
  }

  const rationale =
    bestScore <= 0
      ? `No strong signal in the brief — starting you on ${best.name}. Refine the selections below.`
      : `Closest match: ${best.name}${bestReasons.length ? ` for ${bestReasons.join(", ")}` : ""}${
          bestTerms.length ? ` (keywords: ${bestTerms.slice(0, 6).join(", ")})` : ""
        }.`;

  return {
    presetId: best.id,
    presetName: best.name,
    matchedTerms: bestTerms,
    rationale,
  };
}
