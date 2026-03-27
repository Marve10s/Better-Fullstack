import { describe, expect, it } from "bun:test";

import {
  parseMajorUpdatesFromDiff,
  buildMajorDepCombos,
  buildMajorDepCombosFromDiff,
} from "./major-dep-combos";

describe("parseMajorUpdatesFromDiff", () => {
  it("detects a simple major version bump", () => {
    const diff = `
-  vitest: "^3.1.1",
+  vitest: "^4.0.0",
`;
    const result = parseMajorUpdatesFromDiff(diff);
    expect(result).toEqual([{ name: "vitest", oldMajor: 3, newMajor: 4 }]);
  });

  it("detects multiple major bumps", () => {
    const diff = `
-  mongoose: "^8.14.0",
+  mongoose: "^9.3.1",
-  "stripe": "^17.5.0",
+  "stripe": "^20.4.1",
`;
    const result = parseMajorUpdatesFromDiff(diff);
    expect(result).toHaveLength(2);
    expect(result.find((r) => r.name === "mongoose")).toEqual({
      name: "mongoose",
      oldMajor: 8,
      newMajor: 9,
    });
    expect(result.find((r) => r.name === "stripe")).toEqual({
      name: "stripe",
      oldMajor: 17,
      newMajor: 20,
    });
  });

  it("ignores patch/minor bumps", () => {
    const diff = `
-  hono: "^4.8.2",
+  hono: "^4.12.8",
-  express: "^5.1.0",
+  express: "^5.2.1",
`;
    const result = parseMajorUpdatesFromDiff(diff);
    expect(result).toHaveLength(0);
  });

  it("ignores downgrades", () => {
    const diff = `
-  "next-auth": "^5.0.0-beta.28",
+  "next-auth": "^4.24.13",
`;
    const result = parseMajorUpdatesFromDiff(diff);
    expect(result).toHaveLength(0);
  });

  it("handles scoped packages", () => {
    const diff = `
-  "@angular/core": "^19.2.0",
+  "@angular/core": "^21.2.5",
-  "@storybook/react": "^8.6.0",
+  "@storybook/react": "^10.3.1",
`;
    const result = parseMajorUpdatesFromDiff(diff);
    expect(result).toHaveLength(2);
    expect(result[0]!.name).toBe("@angular/core");
    expect(result[1]!.name).toBe("@storybook/react");
  });

  it("handles tilde ranges", () => {
    const diff = `
-  "some-pkg": "~2.5.0",
+  "some-pkg": "~3.0.0",
`;
    const result = parseMajorUpdatesFromDiff(diff);
    expect(result).toEqual([{ name: "some-pkg", oldMajor: 2, newMajor: 3 }]);
  });

  it("returns empty for no diff", () => {
    expect(parseMajorUpdatesFromDiff("")).toHaveLength(0);
    expect(parseMajorUpdatesFromDiff("no version changes here")).toHaveLength(0);
  });
});

describe("buildMajorDepCombos", () => {
  it("returns combos for matched packages", () => {
    const combos = buildMajorDepCombos(["vitest", "mongoose"]);
    expect(combos.length).toBeGreaterThanOrEqual(2);

    const labels = combos.map((c) => c.name);
    expect(labels).toContain("major-vitest-react");
    expect(labels).toContain("major-mongoose-next");
  });

  it("matches scoped packages via glob patterns", () => {
    const combos = buildMajorDepCombos(["@angular/core", "@angular/common"]);
    const labels = combos.map((c) => c.name);
    expect(labels).toContain("major-angular");
  });

  it("matches @storybook/* glob", () => {
    const combos = buildMajorDepCombos(["@storybook/react"]);
    const labels = combos.map((c) => c.name);
    expect(labels).toContain("major-storybook-react");
  });

  it("returns empty for unmatched packages", () => {
    const combos = buildMajorDepCombos(["some-unknown-pkg"]);
    expect(combos).toHaveLength(0);
  });

  it("caps at 15 combos", () => {
    // Pass every possible package to hit all rules
    const allPkgs = [
      "astro", "@angular/core", "vitest", "storybook", "stripe", "mongoose",
      "@clerk/nextjs", "sanity", "streamdown", "langchain", "resend",
      "nodemailer", "pino", "@sentry/node", "inngest", "@mikro-orm/core",
      "nanostores", "cypress", "@paddle/paddle-node-sdk", "mailgun.js", "posthog-node",
    ];
    const combos = buildMajorDepCombos(allPkgs);
    expect(combos.length).toBeLessThanOrEqual(15);
  });

  it("produces valid combo candidates with all required fields", () => {
    const combos = buildMajorDepCombos(["vitest"]);
    expect(combos.length).toBeGreaterThan(0);

    const combo = combos[0]!;
    expect(combo.ecosystem).toBe("typescript");
    expect(combo.name).toMatch(/^major-/);
    expect(combo.config).toBeDefined();
    expect(combo.config.projectName).toBe(combo.name);
    expect(combo.fingerprint).toBeDefined();
    expect(combo.fingerprintKey).toBeTruthy();
    expect(combo.command).toContain("bun create better-fullstack@latest");
  });

  it("sorts by priority descending", () => {
    // astro (9) should come before inngest (5)
    const combos = buildMajorDepCombos(["astro", "inngest"]);
    const astroIdx = combos.findIndex((c) => c.name === "major-astro-react");
    const inngestIdx = combos.findIndex((c) => c.name === "major-inngest-jobs");
    expect(astroIdx).toBeLessThan(inngestIdx);
  });
});

describe("buildMajorDepCombosFromDiff", () => {
  it("end-to-end: diff → combos", () => {
    const diff = `
-  vitest: "^3.1.1",
+  vitest: "^4.0.0",
-  "@vitest/ui": "^3.1.1",
+  "@vitest/ui": "^4.0.0",
-  mongoose: "^8.14.0",
+  mongoose: "^9.3.1",
`;
    const { packages, combos } = buildMajorDepCombosFromDiff(diff);
    expect(packages).toHaveLength(3);
    expect(combos.length).toBeGreaterThanOrEqual(2);

    const labels = combos.map((c) => c.name);
    expect(labels).toContain("major-vitest-react");
    expect(labels).toContain("major-mongoose-next");
  });

  it("returns empty for patch-only diff", () => {
    const diff = `
-  hono: "^4.8.2",
+  hono: "^4.12.8",
`;
    const { packages, combos } = buildMajorDepCombosFromDiff(diff);
    expect(packages).toHaveLength(0);
    expect(combos).toHaveLength(0);
  });
});
