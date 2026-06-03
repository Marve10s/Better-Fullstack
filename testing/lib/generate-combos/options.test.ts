import { describe, expect, it } from "bun:test";

import { generateBatch } from "./options";
import { createSeededRandom, seedFromString } from "./seed-random";

describe("smoke combo generation", () => {
  it("keeps native frontends in the React Native ecosystem", () => {
    const combos = generateBatch(
      {
        count: 24,
        ecosystems: ["typescript", "react-native"],
        installMode: "no-install",
        rng: createSeededRandom(seedFromString("react-native-ecosystem-split")),
      },
      {
        fingerprintKeys: new Set(),
        legacyNames: new Set(),
        historyCount: 0,
      },
    );

    const nativeFrontend = (frontend: string) => frontend.startsWith("native-");

    for (const combo of combos) {
      if (combo.ecosystem === "typescript") {
        expect(combo.config.frontend.some(nativeFrontend)).toBe(false);
      }

      if (combo.config.frontend.some(nativeFrontend)) {
        expect(combo.ecosystem).toBe("react-native");
      }
    }
  });
});
