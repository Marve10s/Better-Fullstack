#!/usr/bin/env bun

const [logPath, exitCodeValue] = process.argv.slice(2);
if (!logPath || exitCodeValue === undefined) {
  throw new Error("Usage: format-test-report.ts <log-path> <exit-code>");
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
  report += "- Full repository test suite passed.";
} else {
  report += "- No passing suite could be identified before the test command failed.";
}

report += "\n\n### ⚠️ Needs attention\n\n";
if (exitCode === 0) {
  report += "- None. `bun run test` completed successfully.";
} else if (failures.length > 0) {
  report += failures
    .map(({ label, excerpt }) => `#### \`${label}\`\n\n\`\`\`text\n${excerpt}\n\`\`\``)
    .join("\n\n");
} else {
  const errorIndex = lines.findIndex((line) => /(?:error|failed|exited|GLIBC_)/i.test(line));
  const start = errorIndex >= 0 ? errorIndex : Math.max(0, lines.length - 10);
  const excerpt = lines
    .slice(start, start + 10)
    .join("\n")
    .replaceAll("```", "'''")
    .trim();
  report += `#### \`bun run test\` exited with code ${exitCode}\n\n\`\`\`text\n${excerpt}\n\`\`\``;
}

console.log(report);
