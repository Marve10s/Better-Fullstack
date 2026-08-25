import { afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { inspectProject, type ProjectStatusFailure } from "@/project/project-status";
import { buildSupportBundle } from "@/project/support-bundle";

const historicalFixture = path.join(import.meta.dir, "../fixtures/cross-version/2.4.0");
const roots: string[] = [];

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
});

describe("privacy-safe support bundle", () => {
  it("drops paths and raw failure text when project inspection fails", async () => {
    const privatePath = "/Users/customer/private-project";
    const result: ProjectStatusFailure = {
      success: false,
      projectDir: privatePath,
      ok: false,
      error: "API_KEY=customer-secret at https://private.example.com",
    };

    const serialized = JSON.stringify(await buildSupportBundle(privatePath, result));
    expect(serialized).not.toContain(privatePath);
    expect(serialized).not.toContain("customer-secret");
    expect(serialized).not.toContain("private.example.com");
    expect(serialized).not.toContain("API_KEY");
    expect(JSON.parse(serialized)).toMatchObject({
      schemaVersion: "1",
      project: { detected: false, diagnosticCode: "project_config_unavailable" },
    });
  });

  it("reports bounded product and lifecycle facts without project content", async () => {
    const projectDir = await fs.mkdtemp(path.join(tmpdir(), "customer-secret-project-"));
    roots.push(projectDir);
    await fs.copy(historicalFixture, projectDir);
    await fs.outputFile(
      path.join(projectDir, ".env.example"),
      "PRIVATE_CUSTOMER_TOKEN=customer-secret-value\n",
    );

    const inspection = await inspectProject(projectDir, { runChecks: false });
    expect(inspection.success).toBe(true);
    if (!inspection.success) return;
    const bundle = await buildSupportBundle(projectDir, inspection);
    const serialized = JSON.stringify(bundle);

    expect(serialized).not.toContain(projectDir);
    expect(serialized).not.toContain("customer-secret-project");
    expect(serialized).not.toContain("PRIVATE_CUSTOMER_TOKEN");
    expect(serialized).not.toContain("customer-secret-value");
    expect(serialized).not.toContain("bts.jsonc");
    expect(serialized).not.toContain(".env.example");
    expect(bundle.project).toMatchObject({
      detected: true,
      ecosystem: "typescript",
      verification: { requested: false },
      lifecycle: {
        manifestState: "missing",
        generatorProvenance: "unverified",
        recovery: "unavailable",
      },
    });
    if (!bundle.project.detected) return;
    expect(bundle.project.selectedParts.length).toBeGreaterThan(0);
    expect(
      bundle.project.selectedParts.every(
        (part) => part.split(":").length === 3 && /^[a-z0-9:.-]+$/u.test(part),
      ),
    ).toBe(true);
    expect(bundle.project.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "environment_contract", status: "warn" }),
      ]),
    );
  });
});
