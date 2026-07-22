import type {} from "@/types";

export type AgentProvider = "claude" | "codex" | "opencode" | "kilo" | "agy" | "pi";

/** Infer the agent that drives a model id by its prefix. opencode/* and kilo/*
 *  models are driven by the opencode/Kilo Code CLIs; GPT/o-series by Codex; Gemini
 *  by Google's Antigravity `agy` CLI (the standalone gemini CLI is sunset for
 *  individual tiers). */
export function providerForModel(model: string): AgentProvider {
  if (/^pi\//i.test(model)) return "pi";
  // `kilocode/<id>` drives the Kilo binary with an arbitrary provider id —
  // needed because bare `openai/*` ids are served by BOTH opencode and kilo
  // (kilo picks them up via the user's OpenAI oauth): `kilocode/openai/x`
  // disambiguates from opencode's `openai/x` and from kilo's own credit-gated
  // `kilo/openai/x` catalog ids. The adapter strips the prefix before -m.
  if (/^kilocode\//i.test(model)) return "kilo";
  if (/^kilo\//i.test(model)) return "kilo";
  // The opencode CLI serves several tiers: free (`opencode/*`), the paid "Go"
  // subscription (`opencode-go/*`), and the Cloudflare AI Gateway passthrough —
  // all route to the opencode adapter with the full id passed through unchanged.
  if (/^(opencode(-go)?|cloudflare-ai-gateway|openai)\//i.test(model)) return "opencode";
  if (/gemini/i.test(model)) return "agy";
  if (/^(gpt|o\d|codex)/i.test(model)) return "codex";
  return "claude";
}

// Human label for the agent that drove a model — for summary.md headers. Derived
// from the model so non-Claude runs aren't mislabeled "Claude Code".
export function agentLabelForModel(model: string): string {
  switch (providerForModel(model)) {
    case "codex":
      return "Codex";
    case "opencode":
      return "opencode";
    case "kilo":
      return "Kilo Code";
    case "agy":
      return "Antigravity";
    case "pi":
      return "Pi";
    default:
      return "Claude Code";
  }
}
