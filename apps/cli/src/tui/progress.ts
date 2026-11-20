export type ProgressState = "active" | "done" | "warn" | "error";

export type ProgressLine = { text: string; state: ProgressState };

const SPINNER_FRAMES = new Set(["◒", "◐", "◓", "◑"]);
const DONE_MARKS = new Set(["◇", "◆", "●", "✔", "✓", "√"]);
const WARN_MARKS = new Set(["▲", "⚠"]);
const ERROR_MARKS = new Set(["■", "✗", "✖"]);
const FRAME_CHARS = /^[│┌└├─╭╮╰╯┃|\s]+/;

function settleActive(lines: ProgressLine[], state: ProgressState, text: string): ProgressLine[] {
  const last = lines.at(-1);
  if (last?.state === "active") return [...lines.slice(0, -1), { text, state }];
  return [...lines, { text, state }];
}

function pushUnique(lines: ProgressLine[], line: ProgressLine): ProgressLine[] {
  const last = lines.at(-1);
  if (last && last.text === line.text && last.state === line.state) return lines;
  return [...lines, line];
}

export function appendProgress(lines: ProgressLine[], output: string): ProgressLine[] {
  let next = lines;
  for (const raw of output.split(/\r\n|\r|\n/)) {
    const line = raw.replace(FRAME_CHARS, "").trim();
    if (!line) continue;
    const mark = [...line][0] ?? "";
    const body = line.slice(mark.length).trim();
    if (SPINNER_FRAMES.has(mark)) {
      const text = body.replace(/\.+$/, "");
      if (!text) continue;
      const last = next.at(-1);
      next =
        last?.state === "active"
          ? [...next.slice(0, -1), { text, state: "active" }]
          : [...next, { text, state: "active" }];
    } else if (DONE_MARKS.has(mark) && body) {
      next = settleActive(next, "done", body);
    } else if (WARN_MARKS.has(mark) && body) {
      next = settleActive(next, "warn", body);
    } else if (ERROR_MARKS.has(mark) && body) {
      next = settleActive(next, "error", body);
    } else {
      next = pushUnique(next, { text: line, state: "done" });
    }
  }
  return next.slice(-40);
}

const MAX_NEXT_STEPS = 10;

export function extractNextSteps(output: string): string[] {
  const lines = output.split(/\r\n|\r|\n/).map((line) =>
    line
      .replace(FRAME_CHARS, "")
      .replace(/[│╮╯]+\s*$/, "")
      .trim(),
  );
  const start = lines.findIndex((line) => /^next steps$/i.test(line));
  if (start === -1) return [];
  const steps: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (!line) {
      if (steps.length > 0) break;
      continue;
    }
    steps.push(line.replace(/^\d+\.\s*/, ""));
    if (steps.length === MAX_NEXT_STEPS) break;
  }
  return steps;
}
