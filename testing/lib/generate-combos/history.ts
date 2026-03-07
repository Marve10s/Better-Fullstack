import { readdir, readFile } from "node:fs/promises";
import * as path from "node:path";

import { Effect } from "effect";

import { fingerprintToKey, parseRowFingerprint } from "./fingerprint";
import type { HistoricalLedger, LedgerRowDoc } from "./types";

const TESTING_DIR = path.resolve(import.meta.dir, "../..");
const LEGACY_COMBOS_FILE = path.join(TESTING_DIR, "combos.json");
const HISTORY_FILE_PATTERN = /^combos(?:-\d{4}-\d{2}-\d{2}[a-z]?)?\.json$/;

export function loadHistoricalLedger(): Effect.Effect<HistoricalLedger, Error> {
  return Effect.gen(function* () {
    const entries = yield* Effect.tryPromise({
      try: () => readdir(TESTING_DIR),
      catch: (error) => new Error(`Failed to read testing directory: ${String(error)}`),
    });

    const ledgerFiles = entries
      .filter((entry) => HISTORY_FILE_PATTERN.test(entry))
      .map((entry) => path.join(TESTING_DIR, entry))
      .sort();

    const fingerprintKeys = new Set<string>();
    const legacyNames = new Set<string>();

    for (const filePath of ledgerFiles) {
      const raw = yield* Effect.tryPromise({
        try: () => readFile(filePath, "utf8"),
        catch: (error) => new Error(`Failed to read ${path.basename(filePath)}: ${String(error)}`),
      });

      const parsed = JSON.parse(raw) as unknown;

      if (filePath === LEGACY_COMBOS_FILE) {
        if (parsed && typeof parsed === "object") {
          for (const name of Object.keys(parsed as Record<string, unknown>)) {
            legacyNames.add(name);
          }
        }
        continue;
      }

      const document = parsed as LedgerRowDoc;
      for (const row of document.rows ?? []) {
        const fingerprint = parseRowFingerprint(document, row);
        if (fingerprint) {
          fingerprintKeys.add(fingerprintToKey(fingerprint));
        }
      }
    }

    return {
      fingerprintKeys,
      legacyNames,
      historyCount: fingerprintKeys.size,
    };
  });
}
