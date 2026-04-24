#!/usr/bin/env bun

import { Console, Effect } from "effect";

import { loadHistoricalLedger } from "./lib/generate-combos/history";
import { generateBatch } from "./lib/generate-combos/options";
import { DEFAULT_ARGS, type GeneratorArgs } from "./lib/generate-combos/types";

function parseArgs(argv: string[]): GeneratorArgs {
  const args = { ...DEFAULT_ARGS };

  for (let index = 0; index < argv.length; index++) {
    const token = argv[index];
    const next = argv[index + 1];

    if (token === "--count" && next) {
      const parsed = Number(next);
      if (Number.isFinite(parsed) && parsed > 0) {
        args.count = Math.floor(parsed);
      }
      index++;
      continue;
    }

    if (token === "--ecosystems" && next) {
      const selected = next
        .split(",")
        .map((value) => value.trim())
        .filter(
          (value): value is GeneratorArgs["ecosystems"][number] =>
            value === "typescript" ||
            value === "rust" ||
            value === "python" ||
            value === "go" ||
            value === "java",
        );

      if (selected.length > 0) {
        args.ecosystems = Array.from(new Set(selected));
      }

      index++;
      continue;
    }

    if (token === "--install-mode" && next) {
      if (next === "install" || next === "no-install") {
        args.installMode = next;
      }
      index++;
      continue;
    }

    if (token === "--install") {
      args.installMode = "install";
      continue;
    }

    if (token === "--no-install") {
      args.installMode = "no-install";
    }

    if (token === "--no-dedup") {
      args.noDedup = true;
    }

    if (token === "--force-option" && next) {
      const eqIndex = next.indexOf("=");
      if (eqIndex > 0) {
        args.forceOptions ??= {};
        args.forceOptions[next.slice(0, eqIndex)] = next.slice(eqIndex + 1);
      }
      index++;
      continue;
    }

    if (token === "--force-non-none" && next) {
      args.forceNonNone = next.split(",").map((s) => s.trim());
      index++;
      continue;
    }

    if (token === "--partition" && next) {
      const parts = next.split("/");
      if (parts.length === 2) {
        args.partitionIndex = Number(parts[0]);
        args.partitionTotal = Number(parts[1]);
      }
      index++;
      continue;
    }
  }

  return args;
}

const program = Effect.gen(function* () {
  const args = parseArgs(process.argv.slice(2));

  const history = args.noDedup
    ? { fingerprintKeys: new Set<string>(), legacyNames: new Set<string>(), historyCount: 0 }
    : yield* loadHistoricalLedger();

  const combos = generateBatch(args, history);

  yield* Console.log(
    `Generated ${combos.length}/${args.count} unique combos from schema-driven pools ` +
      `(${args.noDedup ? "dedup disabled" : `history signatures: ${history.historyCount}, legacy names: ${history.legacyNames.size}`})\n`,
  );

  for (const combo of combos) {
    yield* Console.log(`# ${combo.name}`);
    yield* Console.log(combo.command);
    yield* Console.log("");
  }

  if (combos.length < args.count) {
    yield* Console.log(
      "Stopped early because the remaining candidate space was exhausted or already covered.",
    );
  }
});

Effect.runPromise(program).catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
