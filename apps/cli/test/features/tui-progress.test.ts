import { describe, expect, test } from "bun:test";

import { appendProgress, extractNextSteps } from "@/tui/progress";
import { chapterProgress } from "@/tui/steps";

describe("TUI scaffold progress", () => {
  test("spinner frames collapse into one active line that settles when the step ends", () => {
    let lines = appendProgress([], "◒  Running bun install...\r◐  Running bun install..\n");
    lines = appendProgress(lines, "◓  Running bun install...");
    expect(lines).toEqual([{ text: "Running bun install", state: "active" }]);
    lines = appendProgress(lines, "◇  Dependencies installed successfully\n│\n");
    expect(lines).toEqual([{ text: "Dependencies installed successfully", state: "done" }]);
    lines = appendProgress(lines, "▲  Biome reported warnings\n■  Git init failed\n");
    expect(lines.map((line) => line.state)).toEqual(["done", "warn", "error"]);
  });

  test("next steps come from the classic post-install output", () => {
    const output = [
      "│",
      "◆  Project template successfully scaffolded!",
      "Next steps",
      "1. cd acme-shop",
      "2. bun install",
      "3. bun run dev",
      "",
      "Your project will be available at:",
    ].join("\n");
    expect(extractNextSteps(output)).toEqual(["cd acme-shop", "bun install", "bun run dev"]);
  });
});

describe("chapterProgress", () => {
  const coreStack = { ecosystem: "typescript", scope: "core", reviewing: false } as const;

  test("advances one chapter for every answered prompt", () => {
    const positions = [4, 5, 6, 7, 8].map(
      (answered) => chapterProgress({ ...coreStack, answered }).position,
    );

    expect(positions).toEqual([5, 6, 7, 8, 9]);
  });

  test("lands on the last chapter at review, even when prompts were skipped", () => {
    const { position, total } = chapterProgress({ ...coreStack, answered: 12, reviewing: true });

    expect(position).toBe(total);
  });

  test("grows the total instead of overflowing it", () => {
    const { position, total } = chapterProgress({ ...coreStack, answered: 40 });

    expect(position).toBeLessThanOrEqual(total);
  });
});

describe("landing card next steps", () => {
  test("keeps the dev server address that follows the run commands", () => {
    const steps = [
      "1. cd acme-shop",
      "2. bun install",
      "3. bun run db:local",
      "(optional - starts local SQLite database)",
      "4. bun run dev",
      "Your project will be available at:",
      "Frontend: http://localhost:3001",
    ];

    expect(extractNextSteps(`Next steps\n${steps.join("\n")}\n`).at(-1)).toBe(
      "Frontend: http://localhost:3001",
    );
  });
});
