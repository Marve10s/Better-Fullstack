# ScaffBench Public Positioning

> **Shipped baseline / retained campaign research — updated 2026-08-07.** A public benchmark and run
> detail surface now exists with multi-agent adapters and reproducible evidence. The pre-launch gates
> below are historical; future ScaffBench work supports proof and acquisition rather than replacing
> the lifecycle roadmap.

## Core Question

Which AI agent can create a real fullstack app correctly?

This is the strongest public framing for ScaffBench because it is simple, competitive, and hard to
fake. It shifts Better-Fullstack from "another scaffolding tool" into the benchmark layer for agentic
fullstack creation.

## Why This Works

- It asks a question developers already care about when choosing agents.
- It gives Better-Fullstack a public role beyond its CLI: the testbed for real app generation.
- It creates repeatable proof instead of broad marketing copy.
- It lets people argue about results, rerun them, and submit counter-evidence.
- It naturally connects the CLI, MCP server, generated checks, and docs into one story.

## Product Shape

ScaffBench should become a public benchmark report and rerunnable harness, not a generic SEO page.
The page should open with the question, show a small number of real results, and link directly to the
run artifacts.

Minimum useful public surface:

- a headline built around the core question
- a leaderboard for agent, path, stack, pass rate, wired libraries, command discipline, and cost
- links to prompts, canonical commands, generated projects, validation logs, and failure tags
- a "rerun this benchmark" command for local verification
- a "submit a run" path for new agents, models, or corrected results

## Bigger Attention Ideas

### 1. The Agent Fullstack Trial

Run a public recurring challenge where several agents must create the same real app from the same
prompt. Better-Fullstack provides the canonical stack, validator, and scoring. The output is a report,
a short video, and a public artifact archive.

The hook: "We asked every coding agent to build the same production-style app. Here is who actually
passed."

### 2. The Broken Scaffold Museum

Publish anonymized failure examples from benchmark runs: missing libraries, fake config, broken build
scripts, unwired auth, wrong database, failed routes. This makes the benchmark tangible and funny
without needing fake drama.

The hook: "Modern agents are great at demos. Fullstack wiring is where they still lie."

### 3. The Better-Fullstack Control Group

Make Better-Fullstack the control path in every report: prompt-only agent, agent using CLI, agent
using MCP, and plain CLI. This shows whether structured stack generation actually improves outcomes.

The hook: "How much better does an agent get when it can use a real stack generator?"

### 4. Community Stack Trials

Let the community propose one difficult but realistic app spec. Maintainers turn accepted specs into
benchmark fixtures with canonical flags, validation checks, and expected artifacts.

The hook: "Give us the stack agents keep messing up. We'll put it in the arena."

### 5. Verified App Recipes

For stacks that pass repeatedly, publish them as verified recipes: prompt, command, generated checks,
known caveats, and deployment notes. This is useful content, but it comes from proof rather than SEO
copy.

The hook: "These are the fullstack recipes agents can actually build today."

## Non-Goals

- Do not create generic comparison pages without current benchmark data.
- Do not publish fake showcase cards or placeholder community pages.
- Do not claim cross-agent results until the harness has real adapters and reproducible artifacts.
- Do not let this become only a docs page; the public value is the evidence trail.

## Next Step

Turn the existing ScaffBench 2 readiness work into one public-facing narrative page only after there
is a real run artifact to cite. The first page should be narrow, evidence-backed, and centered on the
question: "Which AI agent can create a real fullstack app correctly?"
