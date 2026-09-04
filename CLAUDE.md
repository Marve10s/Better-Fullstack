# CLAUDE.md

Canonical agent instructions live in [`AGENTS.md`](./AGENTS.md). This file exists so Claude Code loads those instructions automatically.

Read `AGENTS.md` for all project conventions, guidelines, and workflow rules.

## Code Style

- Always strive for concise, simple solutions.
- If a problem can be solved in a simpler way, propose it.

## General preferences

- If asked to do too much work at once, stop and state that clearly.
- If computer use is helpful for completing or verifying work, shell out to gpt-5.6 with Codex for it.

## Picking the right models for workflows and subagents

Rankings, higher = better. Cost reflects what I actually pay (OpenAI is near-free for me due to a deal, and Claude models are close behind), not list price. Speed is throughput and time-to-answer. Intelligence is how hard a problem you can hand the model unsupervised. Taste covers UI/UX, code quality, API design, and copy.

| model         | cost | speed | intelligence | taste |
|---------------|------|-------|--------------|-------|
| gpt-5.6-sol   | 9    | 4     | 9            | 6     |
| gpt-5.6-terra | 9    | 6     | 8            | 5     |
| gpt-5.6-luna  | 9    | 9     | 6            | 5     |
| sonnet-5      | 5    | 7     | 7            | 7     |
| opus-5        | 8    | 5     | 8            | 8     |
| fable-5.1     | 2    | 2     | 9            | 9     |

GPT-5.6 tier notes (GPT-5.5 is retired - don't use it):

- **Sol** - the GPT-5.6 flagship. Frontier-level agentic coding; writes tight, restrained code. Use for hard unsupervised problems where taste doesn't matter. Supports `max` and `ultra` reasoning efforts (`ultra` spawns subagents - always pair with `rollout_token_budget`). User-facing work stays on Claude models.
- **Terra** - the everyday workhorse. Use for routine well-specified implementation and mid-weight investigation where Sol is overkill. Since my OpenAI cost is flat, its niche is mostly rate-limit headroom.
- **Luna** - smallest and fastest tier; weakest on open-ended reasoning. Default for bulk mechanical work: migrations, sweeps across many files, data grinding, first-pass verification - anywhere throughput and latency matter more than depth.

How to apply:

- GPT-6 Astra (`gpt-6-astra`) is the smartest model in this roster. Use it with `high` reasoning when maximum intelligence matters; increase reasoning for unusually difficult work.
- Gemini 3.8 Flash High (`gemini-3.8-flash-high`) runs through AGY for quick research, source summaries, and multimodal input. Verify its claims before relying on them for final judgment.
- These are defaults, not limits. You have standing permission to override them: if a chosen model's output doesn't meet the bar, rerun or redo the work with a smarter model without asking. Judge the output, not the price tag. Escalating costs less than shipping mediocre work.
- Cost is a tie-breaker only: when axes conflict for anything that ships, intelligence > taste > speed > cost.
- `high` is the floor reasoning effort for every model in this table - Claude subagents and workflows (`effort: 'high'`) and Codex runs alike. Never dispatch below it, including for bulk or mechanical work. Go above it (`xhigh`, or `max` when correctness outweighs everything) for hard agentic or coding work.
- Don't let cost prevent you from using the right model for the job. Instead, take advantage of cheaper options to get more information and try things before moving the work to a more expensive option.
- Bulk/mechanical work (clear-spec implementation, data analysis, migrations): gpt-5.6-luna - effectively free and fastest. Escalate to terra when the spec has ambiguity, sol when it's genuinely hard.
- Anything user-facing (UI, copy, API design) needs taste ≥ 7.
- Reviews of plans/implementations: fable-5.1 or opus-5, optionally gpt-5.6-sol as an extra independent perspective.
- Never use Haiku.
- Mechanics: GPT models are only reachable through the Codex CLI - `codex exec` / `codex review` (my ~/.codex/config.toml defaults to gpt-5.6-sol at effort high). Choose an explicit model per call with `codex exec -m <model>`, including `gpt-6-astra`, `gpt-5.6-sol`, `gpt-5.6-terra`, or `gpt-5.6-luna`. Use the codex-implementation, codex-review, and codex-computer-use skills; for work they don't cover (investigation, data analysis), run `codex exec -s read-only` directly with a self-contained prompt. Get the flags right the first time - see the invocation contract below.
- Claude models run via the Agent/Workflow `model` parameter, which takes tier names, not full IDs: `sonnet` → sonnet-5, `opus` → opus-5, `fable` → fable-5.1. (`haiku` also resolves, but see "Never use Haiku" above.)

Codex CLI invocation contract - **`codex exec`, `codex exec resume`, and `codex review` are three different parsers.** A flag that exists on one is rejected by the others. Do not carry flags across them, and do not invent flags from memory of older Codex versions; `codex exec --help` is the authority. These are the mistakes that actually keep happening:

- **`--ask-for-approval` does not exist** on any subcommand. It is the single most common first-try failure (`error: unexpected argument '--ask-for-approval' found`). My config already sets `approval_policy = "never"`, so there is nothing to approve. To widen permissions use `-s danger-full-access`, or `--dangerously-bypass-approvals-and-sandbox` if the sandbox itself is the problem.
- **There is no `--effort` / `--reasoning-effort` flag.** Reasoning effort is config-only: `-c model_reasoning_effort="high"` (or `max` / `ultra`; `ultra` spawns subagents - pair it with `-c rollout_token_budget=N`).
- **`-s` / `--sandbox` takes exactly one of** `read-only`, `workspace-write`, `danger-full-access`. Anything else is `error: invalid value`.
- **`codex exec resume` has no `-s` / `--sandbox`.** It accepts `-c`, `-m`, `-i`, `--last`, `--all`, and the `--dangerously-bypass-*` pair. Set the sandbox there with `-c sandbox_mode="workspace-write"`.
- **`codex review` has no `-m` and no `-s`** - only `-c`, `--uncommitted`, `--base <BRANCH>`, `--commit <SHA>`, `--title`. Select the model with `-c model="gpt-5.6-sol"`.
- **`codex review --uncommitted` is mutually exclusive with a prompt.** Passing both gives `error: the argument '--uncommitted' cannot be used with '[PROMPT]'`. Pick one: `--uncommitted` for a bare diff review, or a prompt string for custom instructions. To get both, put the instructions in the prompt and scope the diff with `--base`/`--commit` instead.
- **Always end an invocation with `< /dev/null`.** Without it Codex prints `Reading additional input from stdin...` and blocks until the Bash timeout - the highest-frequency failure in my history, and it wastes the full 10 minutes each time.

Useful `codex exec` flags that do exist: `-m <MODEL>`, `-c <key=value>`, `-s <SANDBOX>`, `-C`/`--cd <DIR>`, `--add-dir <DIR>`, `-o`/`--output-last-message <FILE>`, `--output-schema <FILE>`, `--json`, `--skip-git-repo-check`, `-i`/`--image <FILE>`.

Using GPT-5.6 inside workflows and subagents (the model parameter only takes Claude models, so use a wrapper):

- Spawn a thin Claude wrapper agent with `model: 'sonnet', effort: 'high'` whose prompt instructs it to write a self-contained codex prompt, run `codex exec` via Bash, and return the report (use `schema` on the wrapper to get structured output back).
- Always label these agents with the real worker tier as prefix, e.g. `{label: 'gpt-5.6-sol:review-auth'}` or `{label: 'gpt-5.6-luna:migrate-batch-3'}` - the workflow UI shows the wrapper's Claude model, so the label is the only indication of the actual GPT model.
- Codex runs can exceed Bash's 10-minute timeout: pass an explicit timeout, or run in the background and poll for the report file.
- Parallel GPT implementation agents must use `isolation: 'worktree'` so codex edits don't collide in the shared checkout.
- Workflow token budgets only count Claude tokens; codex work is free and invisible to `budget.spent()`.