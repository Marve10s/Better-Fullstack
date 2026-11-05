import { generateBatch } from "@testing/lib/generate-combos/options";
import { createSeededRandom, seedFromString } from "@testing/lib/generate-combos/seed-random";
import { describe, expect, it } from "bun:test";

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

  it("samples plain Elixir tooling and Redis jobs without PostgreSQL", () => {
    const combos = generateBatch(
      {
        count: 400,
        ecosystems: ["elixir"],
        installMode: "no-install",
        rng: createSeededRandom(seedFromString("plain-elixir-tooling")),
      },
      { fingerprintKeys: new Set(), legacyNames: new Set(), historyCount: 0 },
    );
    const plain = combos.filter((combo) => combo.config.elixirWebFramework === "none");
    expect(plain.length).toBeGreaterThan(0);
    for (const key of [
      "elixirLogging",
      "elixirConfig",
      "elixirMessageQueue",
      "elixirTemplating",
      "elixirCli",
      "elixirJson",
      "elixirClustering",
      "elixirDeploy",
    ] as const) {
      expect(plain.some((combo) => combo.config[key] !== "none")).toBe(true);
    }
    for (const orm of ["none", "ecto", "myxql", "ecto_sqlite3"] as const) {
      for (const job of ["exq", "quantum"] as const) {
        expect(
          combos.some((combo) => combo.config.elixirOrm === orm && combo.config.elixirJobs === job),
        ).toBe(true);
      }
    }
    for (const { config } of combos) {
      if (config.elixirJobs === "oban") expect(config.elixirOrm).toBe("ecto-sql");
      if (config.elixirLogging === "logster") expect(config.elixirWebFramework).not.toBe("none");
    }
  });

  it("forces TypeScript categories away from none", () => {
    const combos = generateBatch(
      {
        count: 24,
        ecosystems: ["typescript"],
        installMode: "no-install",
        rng: createSeededRandom(seedFromString("force-typescript-category")),
        forceNonNone: ["analytics"],
      },
      {
        fingerprintKeys: new Set(),
        legacyNames: new Set(),
        historyCount: 0,
      },
    );

    expect(combos).toHaveLength(24);
    for (const combo of combos) {
      expect(combo.config.analytics).not.toBe("none");
    }
  });

  it("keeps forced categories non-none through prerequisite branches", () => {
    const combos = generateBatch(
      {
        count: 12,
        ecosystems: ["typescript"],
        installMode: "no-install",
        rng: createSeededRandom(seedFromString("forced-database-prerequisites")),
        forceNonNone: ["database"],
      },
      {
        fingerprintKeys: new Set(),
        legacyNames: new Set(),
        historyCount: 0,
      },
    );

    expect(combos.length).toBeGreaterThan(0);
    for (const combo of combos) {
      expect(combo.config.database).not.toBe("none");
    }
  });
});
