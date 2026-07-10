#!/usr/bin/env bun

import * as BunContext from "@effect/platform-bun/BunContext";
import * as BunRuntime from "@effect/platform-bun/BunRuntime";
import * as Effect from "effect/Effect";

import { parseArgs, runScaffbench } from "@/index";

if (import.meta.main) {
  BunRuntime.runMain(
    runScaffbench(parseArgs(process.argv.slice(2))).pipe(Effect.provide(BunContext.layer)),
  );
}
