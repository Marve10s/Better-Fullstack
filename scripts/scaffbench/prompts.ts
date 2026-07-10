import { bfSpec } from "./constants";
import { quoteArg } from "./agents/command";
import type { BenchmarkSpec, CreationPath, PromptStyle } from "./types";

export function canonicalCommand(spec: BenchmarkSpec, projectName: string) {
  return ["bun", "create", bfSpec("better-fullstack"), projectName, ...spec.canonicalFlags]
    .map((part) => quoteArg(part))
    .join(" ");
}

export function promptFor(
  spec: BenchmarkSpec,
  pathMode: CreationPath,
  runDir: string,
  projectName: string,
  promptStyle: PromptStyle,
) {
  const body =
    promptStyle === "natural"
      ? spec.naturalPrompt
      : `Benchmark target: ${spec.title}
Requirements:
${spec.requirements.map((requirement) => `- ${requirement}`).join("\n")}`;

  // Discovery lane: when the spec has curated acceptance sets, the natural prompt
  // does NOT name the required libraries — the agent must infer them from the
  // described capabilities, and scoring credits any accepted alternative.
  const discoveryLane = promptStyle === "natural" && spec.acceptanceSets !== undefined;
  const libraryGuidance = discoveryLane
    ? ""
    : `

Important scoring rule: choosing the right library matters.
${spec.rightLibraryNotes.map((note) => `- ${note}`).join("\n")}`;

  const base = `You are running in an empty benchmark workspace:
${runDir}

Create exactly one project directory named \`${projectName}\`.
Do not ask questions. Do not start a dev server. Do not write outside the current working directory.
At the end, report the commands you ran and any errors you hit.

${body}${libraryGuidance}`;

  if (pathMode === "prompt") {
    return `${base}

Creation mode: prompt-only.
Do not use the Better-Fullstack MCP server, Better-Fullstack CLI, Better-Fullstack website, or files from the Better-Fullstack repository.
Create the project from scratch by writing the files and manifests needed for a runnable starter.`;
  }

  if (pathMode === "cli") {
    return `${base}

Creation mode: Better-Fullstack CLI mention.
Do not use MCP tools. Use the Better-Fullstack CLI via \`bun create ${bfSpec("better-fullstack")}\`.
Map the requirements to explicit non-interactive CLI flags yourself; inspect \`--help\` if you are unsure of a flag name or value. Run the command with \`--dry-run\` first, then run the same scaffold command for real without \`--dry-run\`.
Use \`--no-install --no-git --disable-analytics\`.`;
  }

  return `${base}

Creation mode: Better-Fullstack MCP.
Use the Better-Fullstack MCP tools. Start with bfs_get_guidance, then use schema/compatibility/plan as needed, and call bfs_create_project to create the project.
Do not use the Better-Fullstack CLI for creation.`;
}

