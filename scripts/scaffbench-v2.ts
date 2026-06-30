#!/usr/bin/env bun

import { parseArgs, runScaffbench } from "./scaffbench-v2-lib";

if (import.meta.main) {
  runScaffbench(parseArgs(process.argv.slice(2))).catch((error) => {
    console.error(error instanceof Error ? error.stack : String(error));
    process.exitCode = 1;
  });
}
