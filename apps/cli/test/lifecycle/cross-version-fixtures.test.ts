import { afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { validateCrossVersionFixtureProvenance } from "@/lifecycle/cross-version-fixtures";
import { planReviewedProjectUpdate } from "@/lifecycle/project-lifecycle";

const provenancePath = path.join(import.meta.dir, "../fixtures/cross-version/provenance.json");
const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
});

describe("cross-version fixture provenance", () => {
  it("validates separate static tag-fixture metadata without claiming verified lineage", async () => {
    const result = await validateCrossVersionFixtureProvenance(provenancePath, "2.5.0");
    expect(result.valid).toBe(true);
    if (!result.valid) return;
    expect(
      result.releases.map(({ tag, recordedTagCommit, tagCommitVerification }) => ({
        tag,
        recordedTagCommit,
        tagCommitVerification,
      })),
    ).toEqual([
      {
        tag: "v2.4.0",
        recordedTagCommit: "08345516bb37d9158888ba1096e8322f907eb0e1",
        tagCommitVerification: "not-performed",
      },
      {
        tag: "v2.3.1",
        recordedTagCommit: "ce99b4d1256cb2361b3af9f2050aad21f54a331c",
        tagCommitVerification: "not-performed",
      },
    ]);
    expect(new Set(result.releases.map((release) => release.fixtureDir)).size).toBe(2);
    expect(
      result.releases.every(
        (release) =>
          release.classification === "published-package-fixture-provenance-only-unupgradeable" &&
          release.packageGeneration === "performed",
      ),
    ).toBe(true);
    expect(result.releases.map((release) => release.files["bts.jsonc"])).toHaveLength(
      new Set(result.releases.map((release) => release.files["bts.jsonc"])).size,
    );
  });

  it("rejects byte-identical release fixtures and version-mismatched configs", async () => {
    const provenance = await fs.readJson(provenancePath);
    const identical = structuredClone(provenance);
    identical.releases[1].files = { ...identical.releases[0].files };
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-provenance-dup-"));
    roots.push(root);
    for (const release of identical.releases) {
      await fs.copy(
        path.join(import.meta.dir, "../fixtures/cross-version", identical.releases[0].fixtureRoot),
        path.join(root, release.fixtureRoot),
      );
    }
    const duplicatePath = path.join(root, "provenance.json");
    await fs.writeJson(duplicatePath, identical);
    const result = await validateCrossVersionFixtureProvenance(duplicatePath, "2.5.0");
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.errors.some((error) => error.includes("byte-identical"))).toBe(true);
      expect(result.errors.some((error) => error.includes("declares version"))).toBe(true);
    }
  });

  it("fails closed on malformed or mismatched provenance", async () => {
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-provenance-"));
    roots.push(root);
    const malformed = path.join(root, "malformed.json");
    await fs.writeFile(malformed, "not json");
    expect(await validateCrossVersionFixtureProvenance(malformed, "2.5.0")).toEqual({
      valid: false,
      errors: ["Fixture provenance is missing or malformed."],
    });

    const provenance = await fs.readJson(provenancePath);
    provenance.releases[0].files["bts.jsonc"] = "0".repeat(64);
    await fs.copy(
      path.join(import.meta.dir, "../fixtures/cross-version/2.4.0"),
      path.join(root, "2.4.0"),
    );
    await fs.copy(
      path.join(import.meta.dir, "../fixtures/cross-version/2.3.1"),
      path.join(root, "2.3.1"),
    );
    const mismatched = path.join(root, "mismatched.json");
    await fs.writeJson(mismatched, provenance);
    const result = await validateCrossVersionFixtureProvenance(mismatched, "2.5.0");
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.errors.some((error) => error.includes("hash mismatch"))).toBe(true);
    }

    provenance.releases[0].files["bts.jsonc"] = (
      await fs.readJson(provenancePath)
    ).releases[0].files["bts.jsonc"];
    await fs.writeFile(path.join(root, "2.4.0", "unlisted.txt"), "not provenance-bound\n");
    const extraPath = path.join(root, "extra.json");
    await fs.writeJson(extraPath, provenance);
    const extra = await validateCrossVersionFixtureProvenance(extraPath, "2.5.0");
    expect(extra.valid).toBe(false);
    if (!extra.valid) {
      expect(extra.errors.some((error) => error.includes("unlisted fixture file"))).toBe(true);
    }
  });

  it("copies and plans every release while preserving its missing-baseline blocker", async () => {
    const result = await validateCrossVersionFixtureProvenance(provenancePath, "2.5.0");
    expect(result.valid).toBe(true);
    if (!result.valid) return;

    for (const release of result.releases) {
      const fixtureCopy = await fs.mkdtemp(path.join(tmpdir(), `bfs-${release.version}-`));
      roots.push(fixtureCopy);
      await fs.copy(release.fixtureDir, fixtureCopy);
      expect(await fs.pathExists(path.join(fixtureCopy, "bts.lock.json"))).toBe(false);

      const plan = await planReviewedProjectUpdate(fixtureCopy);
      expect(plan.success).toBe(true);
      if (!plan.success) continue;
      expect(plan.applyAllowed).toBe(false);
      expect(plan.reviewToken).toBeUndefined();
      expect(plan.blockers).toContain(
        "A versioned bts.lock.json baseline is required before MCP apply.",
      );
      expect(plan.guarantee).toBe("unverified-origin-recoverable");
    }
  });
});
