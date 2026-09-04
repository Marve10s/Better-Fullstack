import {
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  CAPABILITY_RECEIPT_SCHEMA_VERSION,
  GOLDEN_RUNTIME_RECIPES,
} from "@better-fullstack/types";
import {
  CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
  CROSS_VERSION_UPGRADE_SCHEMA_VERSION,
} from "@scripts/release/cross-version-upgrade";
import {
  REQUIRED_UPGRADE_FIXTURE_CASE_IDS,
  UPGRADE_FIXTURE_SCHEMA_VERSION,
  UPGRADE_FIXTURE_TYPE,
  type UpgradeFixtureBundle,
  type UpgradeFixtureFile,
} from "@scripts/release/release-fixture";
import {
  actualReleaseToolchains,
  createVerificationReceipt,
  PUBLIC_RECEIPT_VALIDITY_MS,
  REQUIRED_BUILD_PROOF_CASE_IDS,
  REQUIRED_BUILD_PROOF_TOOLCHAINS,
  validateVerificationReceipt,
  VERIFICATION_RECEIPT_SCHEMA_VERSION,
  VERIFICATION_RECEIPT_TYPE,
  type ReceiptVerificationInputs,
  type VerificationReceipt,
} from "@scripts/release/release-receipt";
import {
  RELEASE_TOOLCHAINS,
  type CommandRunner,
  type ReleaseManifest,
} from "@scripts/release/release-state";
import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const NOW = new Date("2026-08-23T12:00:00.000Z");
const SHA = "a".repeat(40);
const DIRTY_RUNNER: CommandRunner = async (command) => {
  if (command[0] === "git") return { exitCode: 0, stderr: "", stdout: " M package.json\n" };
  throw new Error(`Unexpected command: ${command.join(" ")}`);
};
const CLEAN_TOOLCHAIN_RUNNER: CommandRunner = async (command) => {
  if (command[0] === "git") return { exitCode: 0, stderr: "", stdout: "" };
  const versions: Record<string, string> = {
    bun: RELEASE_TOOLCHAINS.bun,
    node: `v${RELEASE_TOOLCHAINS.node}`,
    npm: RELEASE_TOOLCHAINS.npm,
    pnpm: RELEASE_TOOLCHAINS.pnpm,
  };
  const version = versions[command[0] ?? ""];
  if (version) return { exitCode: 0, stderr: "", stdout: `${version}\n` };
  throw new Error(`Unexpected command: ${command.join(" ")}`);
};

test("the bundled receipt verifier runs outside the repository", async () => {
  const outputDirectory = await mkdtemp(join(tmpdir(), "release-receipt-bundle-"));
  try {
    const build = await Bun.build({
      entrypoints: [join(import.meta.dir, "release-receipt.ts")],
      outdir: outputDirectory,
      naming: "release-receipt.mjs",
      target: "bun",
    });
    expect(build.success, build.logs.map(String).join("\n")).toBe(true);

    const run = Bun.spawnSync({
      cmd: [process.execPath, join(outputDirectory, "release-receipt.mjs")],
      cwd: outputDirectory,
      stderr: "pipe",
      stdout: "pipe",
    });
    expect(run.exitCode).toBe(1);
    expect(run.stderr.toString()).toContain("Usage: release-receipt.ts <create|verify>");
    expect(run.stderr.toString()).not.toMatch(/Cannot find (package|module)/);
  } finally {
    await rm(outputDirectory, { force: true, recursive: true });
  }
});

test("toolchain detection ignores the repository package-manager policy", async () => {
  const runner: CommandRunner = async (command, cwd) => {
    const tool = command[0] as keyof typeof RELEASE_TOOLCHAINS;
    if (tool === "pnpm" && cwd !== tmpdir()) {
      return { exitCode: 1, stderr: "This project is configured to use bun", stdout: "" };
    }
    const version = tool === "node" ? `v${RELEASE_TOOLCHAINS.node}` : RELEASE_TOOLCHAINS[tool];
    return { exitCode: 0, stderr: "", stdout: `${version}\n` };
  };

  await expect(actualReleaseToolchains(runner)).resolves.toEqual(RELEASE_TOOLCHAINS);
});

function packageHashes(bytes: Uint8Array) {
  return {
    integrity: `sha512-${createHash("sha512").update(bytes).digest("base64")}`,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    shasum: createHash("sha1").update(bytes).digest("hex"),
  };
}

const MATRIX_CASES = [
  ["typescript", "typescript", "frontend:typescript:tanstack-router"],
  ["react-native", "react-native", "mobile:react-native:native-bare"],
  ["rust", "rust", "backend:rust:axum"],
  ["python", "python", "backend:python:fastapi"],
  ["go", "go", "backend:go:gin"],
  ["java", "java", "backend:java:spring-boot"],
  ["elixir", "elixir", "backend:elixir:phoenix"],
  ["dotnet", "dotnet", "backend:dotnet:aspnet-minimal"],
] as const;

function upgradeFixtureFile(path: string, content: string): UpgradeFixtureFile {
  const bytes = Buffer.from(content);
  return {
    contentBase64: bytes.toString("base64"),
    mode: 0o644,
    path,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}

function upgradeFixture(
  manifest: ReleaseManifest,
  createdAt = "2026-08-23T11:58:00.000Z",
): UpgradeFixtureBundle {
  const generator = manifest.packages.find(
    (pkg) => pkg.name === "@better-fullstack/template-generator",
  )?.version;
  if (!generator) throw new Error("Test manifest has no generator");
  const lifecycle = {
    cli: manifest.releaseVersion,
    generator,
    schema: "1",
    templateSet: manifest.releaseVersion,
  };
  return {
    cases: MATRIX_CASES.map(([id, ecosystem, stackPart]) => {
      const config = upgradeFixtureFile(
        "bts.jsonc",
        `${JSON.stringify({ version: manifest.releaseVersion, ecosystem })}\n`,
      );
      const scaffoldManifest = upgradeFixtureFile(
        "bts.lock.json",
        `${JSON.stringify({
          version: "2",
          provenance: { state: "verified", createdWith: lifecycle, current: lifecycle },
          history: [],
          hashes: {},
        })}\n`,
      );
      return {
        command: [`create-better-fullstack@${manifest.releaseVersion}`, `fixture-${id}`],
        configSha256: config.sha256,
        ecosystem,
        files: [config, scaffoldManifest],
        id,
        lifecycle,
        manifestSha256: scaffoldManifest.sha256,
        projectName: `fixture-${id}`,
        stackParts: [stackPart],
      };
    }),
    createdAt,
    fixtureType: UPGRADE_FIXTURE_TYPE,
    release: {
      packages: manifest.packages.map(({ integrity, name, sha256, version }) => ({
        integrity,
        name,
        sha256,
        version,
      })),
      sourceSha: manifest.sourceSha,
      version: manifest.releaseVersion,
    },
    schemaVersion: UPGRADE_FIXTURE_SCHEMA_VERSION,
  };
}

function fixture() {
  const packages: ReleaseManifest["packages"] = [
    {
      directory: "packages/types",
      filename: "packages/types.tgz",
      integrity: "sha512-types",
      name: "@better-fullstack/types",
      sha256: "1".repeat(64),
      shasum: "1".repeat(40),
      version: "2.9.0",
    },
    {
      directory: "packages/template-generator",
      filename: "packages/generator.tgz",
      integrity: "sha512-generator",
      name: "@better-fullstack/template-generator",
      sha256: "2".repeat(64),
      shasum: "2".repeat(40),
      version: "2.8.0",
    },
    {
      directory: "apps/cli",
      filename: "packages/cli.tgz",
      integrity: "sha512-cli",
      name: "create-better-fullstack",
      sha256: "3".repeat(64),
      shasum: "3".repeat(40),
      version: "2.9.0",
    },
  ];
  const manifest: ReleaseManifest = {
    packages,
    releaseVersion: "2.9.0",
    schemaVersion: 1,
    sourceSha: SHA,
    toolchains: RELEASE_TOOLCHAINS,
  };
  const executableFixture = upgradeFixture(manifest);
  const qualification = {
    createdAt: "2026-08-23T11:57:00.000Z",
    evidenceType: CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
    overallSuccess: false,
    previousReleaseTag: "v2.8.0",
    reasonCode: "prior-release-has-no-executable-fixture",
    schemaVersion: CROSS_VERSION_UPGRADE_SCHEMA_VERSION,
    status: "awaiting-prior-fixture",
    target: { sha: SHA, version: "2.9.0" },
  };
  const proof = {
    schemaVersion: 2,
    evidenceType: "better-fullstack/generated-project-runtime",
    generatedAt: "2026-08-23T11:59:00.000Z",
    gitHead: SHA,
    workspaceClean: true,
    workspaceCleanAtStart: true,
    workspaceCleanAfter: true,
    generatorSource: "workspace-local",
    generatorGitHead: SHA,
    catalogVersion: manifest.releaseVersion,
    producerFingerprint: "f".repeat(64),
    producerInputs: ["packages/types/src/capabilities/capability-inventory.ts"],
    expectedCases: [...REQUIRED_BUILD_PROOF_CASE_IDS],
    requiredToolchains: [...REQUIRED_BUILD_PROOF_TOOLCHAINS],
    toolchains: [
      {
        tool: "bun",
        executable: "/bin/bun",
        command: ["bun", "--version"],
        success: true,
        stdoutTail: `${RELEASE_TOOLCHAINS.bun}\n`,
      },
      {
        tool: "node",
        executable: "/bin/node",
        command: ["node", "--version"],
        success: true,
        stdoutTail: "v24.11.1\n",
      },
      {
        tool: "bunx",
        executable: "/bin/bunx",
        command: ["bunx", "--version"],
        success: true,
        stdoutTail: `${RELEASE_TOOLCHAINS.bun}\n`,
      },
      {
        tool: "cargo",
        executable: "/bin/cargo",
        command: ["cargo", "--version"],
        success: true,
        stdoutTail: "cargo 1.89.0\n",
      },
      {
        tool: "dotnet",
        executable: "/bin/dotnet",
        command: ["dotnet", "--version"],
        success: true,
        stdoutTail: "10.0.100\n",
      },
      {
        tool: "go",
        executable: "/bin/go",
        command: ["go", "version"],
        success: true,
        stdoutTail: "go version go1.25.1 linux/amd64\n",
      },
      {
        tool: "uv",
        executable: "/bin/uv",
        command: ["uv", "--version"],
        success: true,
        stdoutTail: "uv 0.8.14\n",
      },
      {
        tool: "java",
        executable: "/bin/java",
        command: ["java", "--version"],
        success: true,
        stdoutTail: "openjdk 21.0.8\n",
      },
      {
        tool: "mix",
        executable: "/bin/mix",
        command: ["mix", "--version"],
        success: true,
        stdoutTail: "Mix 1.19.0\n",
      },
      {
        tool: "python",
        executable: "/bin/python",
        command: ["python", "--version"],
        success: true,
        stdoutTail: "Python 3.12.12\n",
      },
    ],
    overallSuccess: true,
    results: MATRIX_CASES.map(([id, ecosystem, stackPart], index) => ({
      id,
      ecosystems: [ecosystem],
      stackParts: [stackPart],
      requiredSteps: ["scaffold", "build", "runtime"],
      missingRequiredSteps: [] as string[],
      startedAt: new Date(NOW.getTime() - (20 - index * 2) * 60_000).toISOString(),
      completedAt: new Date(NOW.getTime() - (19 - index * 2) * 60_000).toISOString(),
      success: true,
      steps: [
        { step: "scaffold", success: true },
        { step: "build", success: true },
        { step: "runtime", success: true },
      ],
      definitionVersion: GOLDEN_RUNTIME_RECIPES[index]!.definitionVersion,
      maintainer: GOLDEN_RUNTIME_RECIPES[index]!.maintainer,
      runtimeLimitation: GOLDEN_RUNTIME_RECIPES[index]!.runtime.limitation,
      maintenanceCost: {
        flakyRuns: 0,
        repairMinutes: 0,
        dependencyChanges: 0,
        maintainerPresent: true,
      },
    })),
  };
  const capabilityEvidence = {
    schemaVersion: CAPABILITY_RECEIPT_SCHEMA_VERSION,
    evidenceSchemaVersion: CAPABILITY_EVIDENCE_SCHEMA_VERSION,
    receiptType: "better-fullstack/capability-runtime" as const,
    sourceSha: SHA,
    catalogVersion: manifest.releaseVersion,
    producerFingerprint: proof.producerFingerprint,
    createdAt: proof.generatedAt,
    toolchains: Object.fromEntries(
      proof.toolchains.map((toolchain) => [toolchain.tool, toolchain.stdoutTail.trim()]),
    ),
    recipes: proof.results.map((result) => ({
      id: result.id,
      definitionVersion: result.definitionVersion,
      success: result.success,
      startedAt: result.startedAt,
      completedAt: result.completedAt,
      ...result.maintenanceCost,
    })),
  };
  const receipt: VerificationReceipt = {
    capabilityEvidence,
    createdAt: NOW.toISOString(),
    generatedProjectProof: {
      cases: proof.results.map((result) => ({
        completedAt: result.completedAt,
        ecosystems: result.ecosystems,
        id: result.id,
        requiredStages: result.requiredSteps,
        result: "pass" as const,
        runtimeLimitation: result.runtimeLimitation,
        stackParts: result.stackParts,
        startedAt: result.startedAt,
      })),
      expectedCaseIds: proof.expectedCases,
      generatedAt: proof.generatedAt,
      matrixToolchains: proof.toolchains.map((toolchain) => ({
        command: toolchain.command,
        executable: toolchain.executable,
        name: toolchain.tool,
        version: toolchain.stdoutTail.trim(),
      })),
      sha256: "proof-digest",
    },
    projectVersions: {
      cli: "2.9.0",
      generator: "2.8.0",
      projectSchema: "1",
      scaffoldManifest: "2",
      templateSet: "2.9.0",
    },
    receiptType: VERIFICATION_RECEIPT_TYPE,
    release: {
      actualToolchains: { ...RELEASE_TOOLCHAINS },
      manifestSha256: "manifest-digest",
      packages: packages.map(({ filename, integrity, name, sha256, shasum, version }) => ({
        filename,
        integrity,
        name,
        sha256,
        shasum,
        version,
      })),
      pinnedToolchains: RELEASE_TOOLCHAINS,
      version: "2.9.0",
    },
    requiredCi: {
      conclusion: "success",
      headSha: SHA,
      name: "Lint, Test & Build",
      runId: "12345",
      url: "https://github.com/better-fullstack/better-fullstack/actions/runs/12345",
    },
    schemaVersion: VERIFICATION_RECEIPT_SCHEMA_VERSION,
    upgradeFixture: {
      caseIds: [...REQUIRED_UPGRADE_FIXTURE_CASE_IDS],
      createdAt: executableFixture.createdAt,
      fixtureType: UPGRADE_FIXTURE_TYPE,
      releaseVersion: executableFixture.release.version,
      schemaVersion: UPGRADE_FIXTURE_SCHEMA_VERSION,
      sha256: "fixture-digest",
      sourceSha: executableFixture.release.sourceSha,
    },
    upgradeQualification: {
      buildsVerified: false,
      caseIds: [],
      sha256: "qualification-digest",
      sourceVersion: null,
      status: "awaiting-prior-fixture",
      targetVersion: "2.9.0",
    },
    validUntil: new Date(NOW.getTime() + PUBLIC_RECEIPT_VALIDITY_MS).toISOString(),
  };
  const inputs: ReceiptVerificationInputs = {
    actualToolchains: { ...RELEASE_TOOLCHAINS },
    expectedReleaseVersion: "2.9.0",
    expectedSha: SHA,
    manifest,
    manifestSha256: "manifest-digest",
    now: NOW,
    fixture: executableFixture,
    fixtureSha256: "fixture-digest",
    qualification,
    qualificationSha256: "qualification-digest",
    proof,
    proofSha256: "proof-digest",
  };
  return { inputs, proof, receipt };
}

describe("release verification receipt", () => {
  test("accepts a complete clean SHA-bound receipt", () => {
    const { inputs, receipt } = fixture();
    expect(() => validateVerificationReceipt(receipt, inputs)).not.toThrow();
  });

  test("accepts a retained receipt while keeping evidence fresh at issuance", () => {
    const { inputs, receipt } = fixture();
    inputs.now = new Date(NOW.getTime() + 14 * 24 * 60 * 60 * 1_000);
    expect(() => validateVerificationReceipt(receipt, inputs)).not.toThrow();

    const qualification = inputs.qualification as { createdAt: string };
    qualification.createdAt = new Date(NOW.getTime() + 1).toISOString();
    expect(() => validateVerificationReceipt(receipt, inputs)).toThrow(
      "Cross-version qualification was created after its verification receipt",
    );
  });

  test("accepts no-op upgrade cases while requiring recovery for actionable cases", () => {
    const { inputs, receipt } = fixture();
    const cases = REQUIRED_UPGRADE_FIXTURE_CASE_IDS.map((id, index) => ({
      actionable: index === 0 ? 1 : 0,
      build: { passed: true, verified: true },
      id,
      recoveredExactly: index === 0,
      result: "pass",
    }));
    const qualification = {
      cases,
      completedAt: "2026-08-23T11:59:00.000Z",
      evidenceType: CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
      overallSuccess: true,
      recoveredCaseCount: 1,
      requiredCaseIds: [...REQUIRED_UPGRADE_FIXTURE_CASE_IDS],
      schemaVersion: CROSS_VERSION_UPGRADE_SCHEMA_VERSION,
      source: { version: "2.8.0" },
      status: "passed",
      target: {
        manifestSha256: inputs.manifestSha256,
        sha: SHA,
        version: inputs.expectedReleaseVersion,
      },
    };
    inputs.qualification = qualification;
    receipt.upgradeQualification = {
      buildsVerified: true,
      caseIds: [...REQUIRED_UPGRADE_FIXTURE_CASE_IDS],
      sha256: inputs.qualificationSha256,
      sourceVersion: "2.8.0",
      status: "passed",
      targetVersion: inputs.expectedReleaseVersion,
    };

    expect(() => validateVerificationReceipt(receipt, inputs)).not.toThrow();

    cases[0]!.recoveredExactly = false;
    qualification.recoveredCaseCount = 0;
    expect(() => validateVerificationReceipt(receipt, inputs)).toThrow(
      "Cross-version qualification pass evidence is incomplete",
    );
  });

  test("fails closed for missing, dirty, partial, and failed proof data", () => {
    for (const mutate of [
      (value: ReturnType<typeof fixture>) => value.receipt.release.packages.pop(),
      (value: ReturnType<typeof fixture>) => {
        value.proof.workspaceClean = false;
      },
      (value: ReturnType<typeof fixture>) => value.proof.results.pop(),
      (value: ReturnType<typeof fixture>) => {
        value.proof.expectedCases.pop();
        value.proof.results.pop();
        value.receipt.generatedProjectProof.expectedCaseIds.pop();
        value.receipt.generatedProjectProof.cases.pop();
      },
      (value: ReturnType<typeof fixture>) => {
        value.proof.results[0]!.success = false;
      },
      (value: ReturnType<typeof fixture>) => value.proof.results[0]!.steps.pop(),
    ]) {
      const value = fixture();
      mutate(value);
      expect(() => validateVerificationReceipt(value.receipt, value.inputs)).toThrow();
    }
  });

  test("rejects stale or future receipt and matrix timestamps", () => {
    for (const mutate of [
      (value: ReturnType<typeof fixture>) => {
        value.receipt.createdAt = "2026-08-21T12:00:00.000Z";
      },
      (value: ReturnType<typeof fixture>) => {
        value.receipt.createdAt = "2026-08-24T12:00:00.000Z";
      },
      (value: ReturnType<typeof fixture>) => {
        value.proof.results[0]!.startedAt = "2026-08-21T12:00:00.000Z";
      },
    ]) {
      const value = fixture();
      mutate(value);
      expect(() => validateVerificationReceipt(value.receipt, value.inputs)).toThrow();
    }
  });

  test("rejects SHA, version, digest, package, lifecycle, and toolchain mismatches", () => {
    for (const mutate of [
      (value: ReturnType<typeof fixture>) => {
        Object.assign(value.receipt.requiredCi, { conclusion: "failure" });
      },
      (value: ReturnType<typeof fixture>) => {
        value.receipt.requiredCi.headSha = "b".repeat(40);
      },
      (value: ReturnType<typeof fixture>) => {
        value.receipt.release.version = "2.9.1";
      },
      (value: ReturnType<typeof fixture>) => {
        value.receipt.release.manifestSha256 = "wrong";
      },
      (value: ReturnType<typeof fixture>) => {
        value.receipt.generatedProjectProof.sha256 = "wrong";
      },
      (value: ReturnType<typeof fixture>) => {
        value.receipt.release.packages[0]!.sha256 = "wrong";
      },
      (value: ReturnType<typeof fixture>) => {
        value.receipt.projectVersions.generator = "2.9.0";
      },
      (value: ReturnType<typeof fixture>) => {
        value.receipt.release.actualToolchains.bun = "latest";
      },
      (value: ReturnType<typeof fixture>) => {
        value.inputs.actualToolchains.node = "24.12.0";
      },
    ]) {
      const value = fixture();
      mutate(value);
      expect(() => validateVerificationReceipt(value.receipt, value.inputs)).toThrow();
    }
  });

  test("creation rejects a dirty workspace before reading evidence", async () => {
    const root = await mkdtemp(join(tmpdir(), "release-receipt-dirty-"));
    try {
      await expect(
        createVerificationReceipt({
          conclusion: "success",
          fixturePath: join(root, "missing-fixture.json"),
          manifestPath: join(root, "missing-manifest.json"),
          outputPath: join(root, VERIFICATION_RECEIPT_TYPE),
          proofPath: join(root, "missing-proof.json"),
          qualificationPath: join(root, "missing-qualification.json"),
          requiredCiName: "Lint, Test & Build",
          root,
          runId: "123",
          runUrl: "https://github.com/example/actions/runs/123",
          runner: DIRTY_RUNNER,
          sourceSha: SHA,
        }),
      ).rejects.toThrow("clean workspace");
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });

  test("creates and copies a versioned receipt from clean exact inputs", async () => {
    const root = await mkdtemp(join(tmpdir(), "release-receipt-create-"));
    const artifactDirectory = join(root, "artifacts");
    const packageDirectory = join(artifactDirectory, "packages");
    const sourceDirectory = join(root, "apps/cli/src/lifecycle");
    const value = fixture();
    try {
      const now = Date.now();
      value.proof.generatedAt = new Date(now - 60_000).toISOString();
      value.proof.results.forEach((result, index) => {
        result.startedAt = new Date(now - (20 - index * 2) * 60_000).toISOString();
        result.completedAt = new Date(now - (19 - index * 2) * 60_000).toISOString();
      });
      await Promise.all([
        mkdir(packageDirectory, { recursive: true }),
        mkdir(sourceDirectory, { recursive: true }),
      ]);
      await Promise.all(
        value.inputs.manifest.packages.map(async (pkg) => {
          const bytes = new TextEncoder().encode(pkg.name);
          Object.assign(pkg, packageHashes(bytes));
          await writeFile(join(artifactDirectory, pkg.filename), bytes);
        }),
      );
      const manifestPath = join(artifactDirectory, "release-manifest.json");
      const fixturePath = join(artifactDirectory, "upgrade-fixture.v1.json");
      const qualificationPath = join(artifactDirectory, "cross-version-qualification.v1.json");
      const proofPath = join(root, "proof.json");
      const receiptPath = join(artifactDirectory, "verification-receipt.v1.json");
      value.inputs.fixture = upgradeFixture(
        value.inputs.manifest,
        new Date(now - 120_000).toISOString(),
      );
      const currentQualification = value.inputs.qualification as Record<string, unknown>;
      value.inputs.qualification = {
        ...currentQualification,
        createdAt: new Date(now - 180_000).toISOString(),
      };
      await Promise.all([
        writeFile(manifestPath, JSON.stringify(value.inputs.manifest)),
        writeFile(fixturePath, JSON.stringify(value.inputs.fixture)),
        writeFile(qualificationPath, JSON.stringify(value.inputs.qualification)),
        writeFile(proofPath, JSON.stringify(value.proof)),
        writeFile(
          join(sourceDirectory, "scaffold-manifest.ts"),
          'export const SCAFFOLD_MANIFEST_VERSION = "2";\nexport const PROJECT_SCHEMA_VERSION = "1";\n',
        ),
      ]);

      const receipt = await createVerificationReceipt({
        conclusion: "success",
        fixturePath,
        manifestPath,
        outputPath: receiptPath,
        proofPath,
        qualificationPath,
        requiredCiName: "Lint, Test & Build",
        root,
        runId: "12345",
        runUrl: "https://github.com/example/repository/actions/runs/12345",
        runner: CLEAN_TOOLCHAIN_RUNNER,
        sourceSha: SHA,
      });

      expect(receipt.schemaVersion).toBe(1);
      expect(JSON.parse(await readFile(receiptPath, "utf8"))).toEqual(receipt);
      expect(
        JSON.parse(await readFile(join(artifactDirectory, "generated-project-proof.json"), "utf8")),
      ).toEqual(value.proof);
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });
});
