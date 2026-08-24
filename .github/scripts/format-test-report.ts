#!/usr/bin/env bun

const [logPath, exitCodeValue, commandLabel = "`bun run test`"] = process.argv.slice(2);
if (!logPath || exitCodeValue === undefined) {
  throw new Error("Usage: format-test-report.ts <log-path> <exit-code> [command-label]");
}

const exitCode = Number(exitCodeValue);
if (!Number.isInteger(exitCode)) throw new Error(`Invalid exit code: ${exitCodeValue}`);

const ansiPattern = new RegExp(`${String.fromCodePoint(27)}\\[[0-?]*[ -/]*[@-~]`, "g");
const stripAnsi = (value: string) => value.replace(ansiPattern, "");
const lines = stripAnsi(await Bun.file(logPath).text()).split("\n");
const suites = new Set<string>();
const failingSuites = new Set<string>();

for (const line of lines) {
  const suite = line.match(/^([^:\s]+):test:/)?.[1];
  if (suite) suites.add(suite);

  const failedSuite =
    line.match(/^([^#\s]+)#test:.*(?:exited|failed)/i)?.[1] ??
    line.match(/^Failed:\s+([^#\s]+)#test/)?.[1];
  if (failedSuite) failingSuites.add(failedSuite);
}

interface Failure {
  label: string;
  excerpt: string;
}

const failures: Failure[] = [];
const seenFailures = new Set<string>();
for (let index = 0; index < lines.length; index++) {
  const line = lines[index];
  if (line === undefined) continue;
  const failureMatch = line.match(/(?:^|:\s*)\(fail\)\s+(.+)$/);
  if (!failureMatch) continue;

  const suite = line.match(/^([^:\s]+):test:/)?.[1];
  if (suite) failingSuites.add(suite);
  const label = `${suite ? `${suite}: ` : ""}${failureMatch[1]}`;
  if (seenFailures.has(label)) continue;
  seenFailures.add(label);

  const excerpt = lines
    .slice(Math.max(0, index - 2), Math.min(lines.length, index + 8))
    .join("\n")
    .replaceAll("```", "'''")
    .trim();
  failures.push({ label, excerpt });
}

const passedSuites = [...suites].filter((suite) => !failingSuites.has(suite)).sort();
let report = "### ✅ Safe\n\n";
if (passedSuites.length > 0) {
  report += passedSuites.map((suite) => `- \`${suite}\` test suite passed.`).join("\n");
} else if (exitCode === 0) {
  report += `- ${commandLabel} completed successfully.`;
} else {
  report += "- No passing suite could be identified before repository verification failed.";
}

report += "\n\n### ⚠️ Needs attention\n\n";
if (exitCode === 0) {
  report += `- None. ${commandLabel} completed successfully.`;
} else if (failures.length > 0) {
  // A cascading regression can fail hundreds of tests; an unbounded report
  // overflows the PR body and breaks the step that opens the PR.
  const MAX_FAILURES = 15;
  const MAX_REPORT_CHARS = 30_000;
  const shown: string[] = [];
  let budget = MAX_REPORT_CHARS;

  for (const { label, excerpt } of failures.slice(0, MAX_FAILURES)) {
    const block = `#### \`${label}\`\n\n\`\`\`text\n${excerpt}\n\`\`\``;
    if (block.length > budget) break;
    budget -= block.length;
    shown.push(block);
  }

  report += shown.join("\n\n");
  if (shown.length < failures.length) {
    report += `\n\n_Showing ${shown.length} of ${failures.length} failures. See the [workflow log](${process.env.RUN_URL ?? "the workflow run"}) for the rest._`;
  }
} else {
  const errorIndex = lines.findIndex((line) => /(?:error|failed|exited|GLIBC_)/i.test(line));
  const start = errorIndex >= 0 ? errorIndex : Math.max(0, lines.length - 10);
  const excerpt = lines
    .slice(start, start + 10)
    .join("\n")
    .replaceAll("```", "'''")
    .trim();
  report += `#### ${commandLabel} exited with code ${exitCode}\n\n\`\`\`text\n${excerpt}\n\`\`\``;
}

console.log(report);
