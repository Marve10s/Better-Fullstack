import { describe, expect, it } from "bun:test";
import { resolve } from "node:path";

import { packageSpecFor } from "@scripts/release/published-package-smoke";

describe("packageSpecFor", () => {
  it("normalizes relative file specifiers against the repo cwd", () => {
    expect(packageSpecFor("create-better-fullstack", "file:./dist/create.tgz")).toBe(
      `file:${resolve("./dist/create.tgz")}`,
    );
  });

  it("preserves absolute and registry specifiers", () => {
    expect(packageSpecFor("create-better-fullstack", "/tmp/create.tgz")).toBe("/tmp/create.tgz");
    expect(packageSpecFor("create-better-fullstack", "beta")).toBe("create-better-fullstack@beta");
  });
});
