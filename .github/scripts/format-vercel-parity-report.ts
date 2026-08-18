#!/usr/bin/env bun

const [logPath, exitCodeValue] = process.argv.slice(2);
if (!logPath || exitCodeValue === undefined) {
  throw new Error("Usage: format-vercel-parity-report.ts <log-path> <exit-code>");
}

const exitCode = Number(exitCodeValue);
if (!Number.isInteger(exitCode)) throw new Error(`Invalid exit code: ${exitCodeValue}`);

if (exitCode === 0) {
  console.log("### Vercel-parity build (glibc 2.34): PASS");
  process.exit(0);
}

const ansiPattern = new RegExp(`${String.fromCodePoint(27)}\\[[0-?]*[ -/]*[@-~]`, "g");
const lines = (await Bun.file(logPath).text()).replace(ansiPattern, "").split("\n");
const errorIndex = lines.findIndex((line) => /(?:GLIBC_|error|failed|exited)/i.test(line));
const start = errorIndex >= 0 ? errorIndex : Math.max(0, lines.length - 10);
const excerpt = lines
  .slice(start, start + 10)
  .join("\n")
  .replaceAll("```", "'''")
  .trim();

console.log(`### Vercel-parity build (glibc 2.34): FAIL

\`\`\`text
${excerpt}
\`\`\``);
