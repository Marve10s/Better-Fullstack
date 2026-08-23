#!/usr/bin/env bun

import { createHash } from "node:crypto";
import { copyFile, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";

import {
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  CAPABILITY_RECEIPT_SCHEMA_VERSION,
  CapabilityEvidenceReceiptSchema,
  type CapabilityEvidenceReceipt,
} from "../packages/types/src";
import {
  REQUIRED_UPGRADE_FIXTURE_CASE_IDS,
  UPGRADE_FIXTURE_SCHEMA_VERSION,
  UPGRADE_FIXTURE_TYPE,
  validateUpgradeFixtureBundle,
  type UpgradeFixtureBundle,
} from "./release-fixture";
import {
  loadAndVerifyManifest,
  RELEASE_TOOLCHAINS,
  type CommandRunner,
  type ReleaseManifest,
} from "./release-state";
import {
  CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
  CROSS_VERSION_UPGRADE_SCHEMA_VERSION,
  UPGRADE_QUALIFICATION_CONTRACT_PATH,
} from "./upgrade-qualification-contract";

export const VERIFICATION_RECEIPT_SCHEMA_VERSION = 1;
export const VERIFICATION_RECEIPT_TYPE = "better-fullstack/release-verification";
export const VERIFICATION_RECEIPT_FILENAME = "verification-receipt.v1.json";
export const REQUIRED_BUILD_PROOF_CASE_IDS = [
  "typescript",
  "react-native",
  "rust",
  "python",
  "go",
  "java",
  "elixir",
  "dotnet",
] as const;
const REQUIRED_CI_NAME = "Lint, Test & Build";
const EXPECTED_PROJECT_SCHEMA_VERSION = "1";
const EXPECTED_SCAFFOLD_MANIFEST_VERSION = "2";
const DEFAULT_MAX_AGE_MS = 24 * 60 * 60 * 1_000;
const FUTURE_TOLERANCE_MS = 5 * 60 * 1_000;
export const PUBLIC_RECEIPT_VALIDITY_MS = 30 * 24 * 60 * 60 * 1_000;

type ActualReleaseToolchains = Record<keyof typeof RELEASE_TOOLCHAINS, string>;

type ReceiptPackage = Pick<
  ReleaseManifest["packages"][number],
  "filename" | "integrity" | "name" | "sha256" | "shasum" | "version"
>;

type ReceiptMatrixToolchain = {
  command: string[];
  executable: string;
  name: string;
  version: string;
};

type ReceiptMatrixCase = {
  completedAt: string;
  ecosystems: string[];
  id: string;
  requiredStages: string[];
  result: "pass";
  runtimeLimitation: string;
  stackParts: string[];
  startedAt: string;
};

export type VerificationReceipt = {
  capabilityEvidence: CapabilityEvidenceReceipt;
  createdAt: string;
  generatedProjectProof: {
    cases: ReceiptMatrixCase[];
    expectedCaseIds: string[];
    generatedAt: string;
    matrixToolchains: ReceiptMatrixToolchain[];
    sha256: string;
  };
  projectVersions: {
    cli: string;
    generator: string;
    projectSchema: string;
    scaffoldManifest: string;
    templateSet: string;
  };
  receiptType: typeof VERIFICATION_RECEIPT_TYPE;
  release: {
    actualToolchains: ActualReleaseToolchains;
    manifestSha256: string;
    packages: ReceiptPackage[];
    pinnedToolchains: typeof RELEASE_TOOLCHAINS;
    version: string;
  };
  requiredCi: {
    conclusion: "success";
    headSha: string;
    name: typeof REQUIRED_CI_NAME;
    runId: string;
    url: string;
  };
  schemaVersion: typeof VERIFICATION_RECEIPT_SCHEMA_VERSION;
  upgradeFixture: {
    caseIds: string[];
    createdAt: string;
    fixtureType: typeof UPGRADE_FIXTURE_TYPE;
    releaseVersion: string;
    schemaVersion: typeof UPGRADE_FIXTURE_SCHEMA_VERSION;
    sha256: string;
    sourceSha: string;
  };
  upgradeQualification: {
    buildsVerified: boolean;
    caseIds: string[];
    sha256: string;
    sourceVersion: string | null;
    status: "awaiting-prior-fixture" | "passed";
    targetVersion: string;
  };
  validUntil: string;
};

export type ReceiptVerificationInputs = {
  actualToolchains: ActualReleaseToolchains;
  expectedReleaseVersion: string;
  expectedSha: string;
  manifest: ReleaseManifest;
  manifestSha256: string;
  now?: Date;
  fixture: UpgradeFixtureBundle;
  fixtureSha256: string;
  qualification: unknown;
  qualificationSha256: string;
  proof: unknown;
  proofSha256: string;
};

type ProofStep = { skipped?: boolean; step?: string; success?: boolean };
type ProofResult = {
  completedAt?: string;
  ecosystems?: string[];
  id?: string;
  missingRequiredSteps?: string[];
  requiredSteps?: string[];
  runtimeLimitation?: string;
  stackParts?: string[];
  startedAt?: string;
  steps?: ProofStep[];
  success?: boolean;
  definitionVersion?: number;
  maintenanceCost?: {
    dependencyChanges?: number;
    flakyRuns?: number;
    maintainerPresent?: boolean;
    repairMinutes?: number;
  };
};

type ProofToolchain = {
  command?: string[];
  executable?: string;
  stderrTail?: string;
  stdoutTail?: string;
  success?: boolean;
  tool?: string;
};

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function unique(values: string[]): boolean {
  return new Set(values).size === values.length;
}

function digest(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function assertTimestamp(
  label: string,
  value: string,
  now: Date,
  maxAgeMs = DEFAULT_MAX_AGE_MS,
): number {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) throw new Error(`${label} is not a valid timestamp`);
  if (timestamp > now.getTime() + FUTURE_TOLERANCE_MS) {
    throw new Error(`${label} is in the future`);
  }
  if (now.getTime() - timestamp > maxAgeMs) throw new Error(`${label} is stale`);
  return timestamp;
}

function exactJson(left: unknown, right: unknown, label: string): void {
  if (JSON.stringify(left) !== JSON.stringify(right)) throw new Error(`${label} mismatch`);
}

function qualificationReceipt(
  value: unknown,
  inputs: Pick<
    ReceiptVerificationInputs,
    "expectedReleaseVersion" | "expectedSha" | "manifestSha256" | "now" | "qualificationSha256"
  >,
) {
  const qualification = record(value);
  const target = record(qualification.target);
  const now = inputs.now ?? new Date();
  if (
    qualification.schemaVersion !== CROSS_VERSION_UPGRADE_SCHEMA_VERSION ||
    qualification.evidenceType !== CROSS_VERSION_UPGRADE_EVIDENCE_TYPE ||
    target.version !== inputs.expectedReleaseVersion ||
    target.sha !== inputs.expectedSha
  ) {
    throw new Error("Cross-version qualification target identity mismatch");
  }
  if (qualification.status === "awaiting-prior-fixture") {
    if (
      qualification.overallSuccess !== false ||
      qualification.reasonCode !== "prior-release-has-no-executable-fixture" ||
      typeof qualification.createdAt !== "string"
    ) {
      throw new Error("Cross-version qualification wait state is malformed");
    }
    assertTimestamp("cross-version qualification createdAt", qualification.createdAt, now);
    return {
      buildsVerified: false,
      caseIds: [],
      sha256: inputs.qualificationSha256,
      sourceVersion: null,
      status: "awaiting-prior-fixture" as const,
      targetVersion: inputs.expectedReleaseVersion,
    };
  }
  const source = record(qualification.source);
  const cases = Array.isArray(qualification.cases) ? qualification.cases.map(record) : [];
  const requiredCaseIds = stringArray(qualification.requiredCaseIds);
  if (
    qualification.status !== "passed" ||
    qualification.overallSuccess !== true ||
    target.manifestSha256 !== inputs.manifestSha256 ||
    typeof source.version !== "string" ||
    source.version === inputs.expectedReleaseVersion ||
    JSON.stringify(requiredCaseIds) !== JSON.stringify(REQUIRED_UPGRADE_FIXTURE_CASE_IDS) ||
    cases.length !== REQUIRED_UPGRADE_FIXTURE_CASE_IDS.length ||
    cases.some((entry, index) => {
      const build = record(entry.build);
      return (
        entry.id !== REQUIRED_UPGRADE_FIXTURE_CASE_IDS[index] ||
        entry.result !== "pass" ||
        entry.recoveredExactly !== true ||
        build.verified !== true ||
        build.passed !== true
      );
    }) ||
    qualification.recoveredCaseCount !== REQUIRED_UPGRADE_FIXTURE_CASE_IDS.length ||
    typeof qualification.completedAt !== "string"
  ) {
    throw new Error("Cross-version qualification pass evidence is incomplete");
  }
  assertTimestamp("cross-version qualification completedAt", qualification.completedAt, now);
  return {
    buildsVerified: true,
    caseIds: requiredCaseIds,
    sha256: inputs.qualificationSha256,
    sourceVersion: source.version,
    status: "passed" as const,
    targetVersion: inputs.expectedReleaseVersion,
  };
}

function packageReceipts(manifest: ReleaseManifest): ReceiptPackage[] {
  return manifest.packages.map(({ filename, integrity, name, sha256, shasum, version }) => ({
    filename,
    integrity,
    name,
    sha256,
    shasum,
    version,
  }));
}

function proofCases(proof: Record<string, unknown>, now: Date): ReceiptMatrixCase[] {
  const expectedCaseIds = stringArray(proof.expectedCases);
  const results = Array.isArray(proof.results) ? (proof.results as ProofResult[]) : [];
  if (expectedCaseIds.length === 0 || !unique(expectedCaseIds)) {
    throw new Error("Generated-project proof has no complete unique case set");
  }
  if (JSON.stringify(expectedCaseIds) !== JSON.stringify(REQUIRED_BUILD_PROOF_CASE_IDS)) {
    throw new Error("Generated-project proof does not contain the required eight-case matrix");
  }
  const resultIds = results.map((result) => result.id).filter((id): id is string => Boolean(id));
  if (!unique(resultIds) || JSON.stringify(resultIds) !== JSON.stringify(expectedCaseIds)) {
    throw new Error("Generated-project proof case set is partial or reordered");
  }

  return results.map((result) => {
    const id = result.id ?? "";
    const requiredStages = stringArray(result.requiredSteps);
    const missing = stringArray(result.missingRequiredSteps);
    const ecosystems = stringArray(result.ecosystems);
    const stackParts = stringArray(result.stackParts);
    const runtimeLimitation = result.runtimeLimitation?.trim() ?? "";
    const steps = Array.isArray(result.steps) ? result.steps : [];
    const startedAt = result.startedAt ?? "";
    const completedAt = result.completedAt ?? "";
    const started = assertTimestamp(`${id}.startedAt`, startedAt, now);
    const completed = assertTimestamp(`${id}.completedAt`, completedAt, now);
    if (started > completed) throw new Error(`${id} completed before it started`);
    if (
      result.success !== true ||
      missing.length > 0 ||
      requiredStages.length === 0 ||
      ecosystems.length === 0 ||
      stackParts.length === 0 ||
      runtimeLimitation.length === 0 ||
      !unique(requiredStages) ||
      !unique(ecosystems) ||
      !unique(stackParts)
    ) {
      throw new Error(`${id} is missing successful matrix identity or required stages`);
    }
    const byStage = new Map(steps.map((step) => [step.step, step]));
    if (
      requiredStages.some((stage) => {
        const step = byStage.get(stage);
        return !step || step.success !== true || step.skipped === true;
      })
    ) {
      throw new Error(`${id} did not pass every required stage`);
    }
    return {
      completedAt,
      ecosystems,
      id,
      requiredStages,
      result: "pass",
      runtimeLimitation,
      stackParts,
      startedAt,
    };
  });
}

function proofToolchains(proof: Record<string, unknown>): ReceiptMatrixToolchain[] {
  const required = stringArray(proof.requiredToolchains);
  const toolchains = Array.isArray(proof.toolchains) ? (proof.toolchains as ProofToolchain[]) : [];
  const names = toolchains
    .map((toolchain) => toolchain.tool)
    .filter((name): name is string => !!name);
  if (
    required.length === 0 ||
    !unique(required) ||
    !unique(names) ||
    JSON.stringify([...names].sort()) !== JSON.stringify([...required].sort())
  ) {
    throw new Error("Generated-project proof toolchain matrix is partial");
  }
  return toolchains.map((toolchain) => {
    const name = toolchain.tool ?? "";
    const version =
      (toolchain.stdoutTail || toolchain.stderrTail || "").trim().split("\n")[0] ?? "";
    if (
      toolchain.success !== true ||
      !toolchain.executable ||
      !version ||
      !Array.isArray(toolchain.command)
    ) {
      throw new Error(`Generated-project proof toolchain ${name} did not record a version`);
    }
    return { command: toolchain.command, executable: toolchain.executable, name, version };
  });
}

function validateProof(
  proofValue: unknown,
  expectedSha: string,
  expectedCatalogVersion: string,
  now: Date,
) {
  const proof = record(proofValue);
  const generatedAt = typeof proof.generatedAt === "string" ? proof.generatedAt : "";
  const generatedTimestamp = assertTimestamp(
    "generated-project proof generatedAt",
    generatedAt,
    now,
  );
  if (
    proof.schemaVersion !== 2 ||
    proof.evidenceType !== "better-fullstack/generated-project-runtime" ||
    proof.gitHead !== expectedSha ||
    proof.generatorGitHead !== expectedSha ||
    proof.generatorSource !== "workspace-local" ||
    proof.workspaceClean !== true ||
    proof.workspaceCleanAtStart !== true ||
    proof.workspaceCleanAfter !== true ||
    proof.overallSuccess !== true ||
    proof.catalogVersion !== expectedCatalogVersion ||
    typeof proof.producerFingerprint !== "string" ||
    !/^[0-9a-f]{64}$/i.test(proof.producerFingerprint)
  ) {
    throw new Error("Generated-project proof is failed, dirty, or bound to another SHA");
  }
  const cases = proofCases(proof, now);
  if (cases.some((result) => Date.parse(result.completedAt) > generatedTimestamp)) {
    throw new Error("Generated-project case completed after proof creation");
  }
  const results = Array.isArray(proof.results) ? (proof.results as ProofResult[]) : [];
  const matrixToolchains = proofToolchains(proof);
  const capabilityEvidence = CapabilityEvidenceReceiptSchema.parse({
    schemaVersion: CAPABILITY_RECEIPT_SCHEMA_VERSION,
    evidenceSchemaVersion: CAPABILITY_EVIDENCE_SCHEMA_VERSION,
    receiptType: "better-fullstack/capability-runtime",
    sourceSha: expectedSha,
    catalogVersion: expectedCatalogVersion,
    producerFingerprint: proof.producerFingerprint,
    createdAt: generatedAt,
    toolchains: Object.fromEntries(
      matrixToolchains.map((toolchain) => [toolchain.name, toolchain.version]),
    ),
    recipes: results.map((result) => ({
      id: result.id,
      definitionVersion: result.definitionVersion,
      success: result.success,
      startedAt: result.startedAt,
      completedAt: result.completedAt,
      flakyRuns: result.maintenanceCost?.flakyRuns,
      repairMinutes: result.maintenanceCost?.repairMinutes,
      dependencyChanges: result.maintenanceCost?.dependencyChanges,
      maintainerPresent: result.maintenanceCost?.maintainerPresent,
    })),
  });
  if (
    capabilityEvidence.recipes.length !== REQUIRED_BUILD_PROOF_CASE_IDS.length ||
    capabilityEvidence.recipes.some(
      (recipe, index) =>
        recipe.id !== REQUIRED_BUILD_PROOF_CASE_IDS[index] || recipe.success !== true,
    )
  ) {
    throw new Error("Capability runtime receipt is partial or failed");
  }
  return {
    capabilityEvidence,
    cases,
    expectedCaseIds: stringArray(proof.expectedCases),
    generatedAt,
    matrixToolchains,
  };
}

function normalizeToolVersion(tool: keyof typeof RELEASE_TOOLCHAINS, output: string): string {
  const firstLine = output.trim().split("\n")[0] ?? "";
  return tool === "node" ? firstLine.replace(/^v/, "") : firstLine;
}

const defaultRunner: CommandRunner = async (command) => {
  const process = Bun.spawn(command, { stderr: "pipe", stdout: "pipe" });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(process.stdout).text(),
    new Response(process.stderr).text(),
    process.exited,
  ]);
  return { exitCode, stderr, stdout };
};

export async function actualReleaseToolchains(
  runner: CommandRunner = defaultRunner,
): Promise<ActualReleaseToolchains> {
  const commands: Record<keyof typeof RELEASE_TOOLCHAINS, string[]> = {
    bun: ["bun", "--version"],
    node: ["node", "--version"],
    npm: ["npm", "--version"],
    pnpm: ["pnpm", "--version"],
  };
  const entries = await Promise.all(
    Object.entries(commands).map(async ([name, command]) => {
      const tool = name as keyof typeof RELEASE_TOOLCHAINS;
      const result = await runner(command);
      if (result.exitCode !== 0) throw new Error(`Could not record ${tool} version`);
      const version = normalizeToolVersion(tool, result.stdout || result.stderr);
      if (version !== RELEASE_TOOLCHAINS[tool]) {
        throw new Error(
          `${tool} version ${version} does not match pinned ${RELEASE_TOOLCHAINS[tool]}`,
        );
      }
      return [tool, version] as const;
    }),
  );
  return Object.fromEntries(entries) as ActualReleaseToolchains;
}

function sourceConstant(source: string, name: string): string {
  const match = source.match(new RegExp(`export const ${name} = "([^"]+)"`));
  if (!match?.[1]) throw new Error(`Could not read ${name}`);
  return match[1];
}

async function projectVersions(root: string, manifest: ReleaseManifest) {
  const source = await readFile(join(root, "apps/cli/src/utils/scaffold-manifest.ts"), "utf8");
  const cli = manifest.packages.find((pkg) => pkg.name === "create-better-fullstack")?.version;
  const generator = manifest.packages.find(
    (pkg) => pkg.name === "@better-fullstack/template-generator",
  )?.version;
  if (!cli || !generator) throw new Error("Release manifest lacks CLI or generator identity");
  return {
    cli,
    generator,
    projectSchema: sourceConstant(source, "PROJECT_SCHEMA_VERSION"),
    scaffoldManifest: sourceConstant(source, "SCAFFOLD_MANIFEST_VERSION"),
    templateSet: cli,
  };
}

export function validateVerificationReceipt(
  receipt: VerificationReceipt,
  inputs: ReceiptVerificationInputs,
): void {
  const now = inputs.now ?? new Date();
  const createdAt = assertTimestamp("receipt createdAt", receipt.createdAt, now);
  const validUntil = Date.parse(receipt.validUntil);
  if (
    !Number.isFinite(validUntil) ||
    validUntil !== createdAt + PUBLIC_RECEIPT_VALIDITY_MS ||
    now.getTime() > validUntil
  ) {
    throw new Error("Receipt validity window is malformed or stale");
  }
  if (
    receipt.schemaVersion !== VERIFICATION_RECEIPT_SCHEMA_VERSION ||
    receipt.receiptType !== VERIFICATION_RECEIPT_TYPE
  ) {
    throw new Error("Unsupported verification receipt schema or type");
  }
  if (
    receipt.requiredCi.name !== REQUIRED_CI_NAME ||
    receipt.requiredCi.conclusion !== "success" ||
    !/^[0-9]+$/.test(receipt.requiredCi.runId) ||
    !receipt.requiredCi.url.startsWith("https://") ||
    !receipt.requiredCi.url.endsWith(`/actions/runs/${receipt.requiredCi.runId}`) ||
    receipt.requiredCi.headSha !== inputs.expectedSha ||
    inputs.manifest.sourceSha !== inputs.expectedSha
  ) {
    throw new Error("Required-CI receipt identity mismatch");
  }
  if (
    receipt.release.version !== inputs.expectedReleaseVersion ||
    receipt.release.version !== inputs.manifest.releaseVersion ||
    receipt.release.manifestSha256 !== inputs.manifestSha256
  ) {
    throw new Error("Release version or manifest digest mismatch");
  }
  exactJson(receipt.release.packages, packageReceipts(inputs.manifest), "Package identities");
  exactJson(receipt.release.pinnedToolchains, RELEASE_TOOLCHAINS, "Pinned release toolchains");
  exactJson(receipt.release.actualToolchains, inputs.actualToolchains, "Actual release toolchains");
  exactJson(inputs.actualToolchains, RELEASE_TOOLCHAINS, "Active release toolchains");

  const fixture = validateUpgradeFixtureBundle(inputs.fixture, inputs.manifest);
  const fixtureCreatedAt = assertTimestamp("upgrade fixture createdAt", fixture.createdAt, now);
  if (fixtureCreatedAt > createdAt) {
    throw new Error("Upgrade fixture was created after its verification receipt");
  }
  exactJson(
    receipt.upgradeFixture,
    {
      caseIds: [...REQUIRED_UPGRADE_FIXTURE_CASE_IDS],
      createdAt: fixture.createdAt,
      fixtureType: UPGRADE_FIXTURE_TYPE,
      releaseVersion: fixture.release.version,
      schemaVersion: UPGRADE_FIXTURE_SCHEMA_VERSION,
      sha256: inputs.fixtureSha256,
      sourceSha: fixture.release.sourceSha,
    },
    "Upgrade fixture receipt",
  );
  exactJson(
    receipt.upgradeQualification,
    qualificationReceipt(inputs.qualification, inputs),
    "Cross-version qualification receipt",
  );

  const proof = validateProof(inputs.proof, inputs.expectedSha, inputs.expectedReleaseVersion, now);
  if (Date.parse(proof.generatedAt) > Date.parse(receipt.createdAt)) {
    throw new Error("Generated-project proof was created after its receipt");
  }
  if (receipt.generatedProjectProof.sha256 !== inputs.proofSha256) {
    throw new Error("Generated-project proof digest mismatch");
  }
  exactJson(receipt.generatedProjectProof.cases, proof.cases, "Generated-project cases");
  exactJson(
    receipt.generatedProjectProof.expectedCaseIds,
    proof.expectedCaseIds,
    "Generated-project expected cases",
  );
  exactJson(
    receipt.generatedProjectProof.matrixToolchains,
    proof.matrixToolchains,
    "Generated-project matrix toolchains",
  );
  if (receipt.generatedProjectProof.generatedAt !== proof.generatedAt) {
    throw new Error("Generated-project proof timestamp mismatch");
  }
  exactJson(receipt.capabilityEvidence, proof.capabilityEvidence, "Capability runtime evidence");
  if (
    receipt.projectVersions.cli !== inputs.expectedReleaseVersion ||
    receipt.projectVersions.templateSet !== inputs.expectedReleaseVersion ||
    receipt.projectVersions.generator !==
      inputs.manifest.packages.find((pkg) => pkg.name === "@better-fullstack/template-generator")
        ?.version ||
    receipt.projectVersions.projectSchema !== EXPECTED_PROJECT_SCHEMA_VERSION ||
    receipt.projectVersions.scaffoldManifest !== EXPECTED_SCAFFOLD_MANIFEST_VERSION
  ) {
    throw new Error("Project lifecycle version mismatch");
  }
}

async function cleanWorkspace(root: string, runner: CommandRunner): Promise<void> {
  const result = await runner(["git", "status", "--porcelain"], root);
  if (result.exitCode !== 0 || result.stdout.trim()) {
    throw new Error("Verification receipt requires a clean workspace");
  }
}

export async function createVerificationReceipt(options: {
  conclusion: string;
  fixturePath: string;
  manifestPath: string;
  outputPath: string;
  proofPath: string;
  qualificationPath: string;
  requiredCiName: string;
  root?: string;
  runId: string;
  runUrl: string;
  runner?: CommandRunner;
  sourceSha: string;
}): Promise<VerificationReceipt> {
  const root = resolve(options.root ?? process.cwd());
  const runner = options.runner ?? defaultRunner;
  await cleanWorkspace(root, runner);
  const manifestPath = resolve(options.manifestPath);
  const proofPath = resolve(options.proofPath);
  const fixturePath = resolve(options.fixturePath);
  const qualificationPath = resolve(options.qualificationPath);
  const [manifest, manifestBytes, proofBytes, fixtureBytes, qualificationBytes, actualToolchains] =
    await Promise.all([
      loadAndVerifyManifest(manifestPath),
      readFile(manifestPath),
      readFile(proofPath),
      readFile(fixturePath),
      readFile(qualificationPath),
      actualReleaseToolchains(runner),
    ]);
  const proof = JSON.parse(proofBytes.toString()) as unknown;
  const fixture = validateUpgradeFixtureBundle(
    JSON.parse(fixtureBytes.toString()) as unknown,
    manifest,
  );
  const qualification = JSON.parse(qualificationBytes.toString()) as unknown;
  const now = new Date();
  const validatedProof = validateProof(proof, options.sourceSha, manifest.releaseVersion, now);
  const receipt: VerificationReceipt = {
    capabilityEvidence: validatedProof.capabilityEvidence,
    createdAt: now.toISOString(),
    generatedProjectProof: {
      ...validatedProof,
      sha256: digest(proofBytes),
    },
    projectVersions: await projectVersions(root, manifest),
    receiptType: VERIFICATION_RECEIPT_TYPE,
    release: {
      actualToolchains,
      manifestSha256: digest(manifestBytes),
      packages: packageReceipts(manifest),
      pinnedToolchains: RELEASE_TOOLCHAINS,
      version: manifest.releaseVersion,
    },
    requiredCi: {
      conclusion: options.conclusion as "success",
      headSha: options.sourceSha,
      name: options.requiredCiName as typeof REQUIRED_CI_NAME,
      runId: options.runId,
      url: options.runUrl,
    },
    schemaVersion: VERIFICATION_RECEIPT_SCHEMA_VERSION,
    upgradeFixture: {
      caseIds: [...REQUIRED_UPGRADE_FIXTURE_CASE_IDS],
      createdAt: fixture.createdAt,
      fixtureType: UPGRADE_FIXTURE_TYPE,
      releaseVersion: fixture.release.version,
      schemaVersion: UPGRADE_FIXTURE_SCHEMA_VERSION,
      sha256: digest(fixtureBytes),
      sourceSha: fixture.release.sourceSha,
    },
    upgradeQualification: qualificationReceipt(qualification, {
      expectedReleaseVersion: manifest.releaseVersion,
      expectedSha: options.sourceSha,
      manifestSha256: digest(manifestBytes),
      now,
      qualificationSha256: digest(qualificationBytes),
    }),
    validUntil: new Date(now.getTime() + PUBLIC_RECEIPT_VALIDITY_MS).toISOString(),
  };
  validateVerificationReceipt(receipt, {
    actualToolchains,
    expectedReleaseVersion: manifest.releaseVersion,
    expectedSha: options.sourceSha,
    manifest,
    manifestSha256: digest(manifestBytes),
    now,
    fixture,
    fixtureSha256: digest(fixtureBytes),
    qualification,
    qualificationSha256: digest(qualificationBytes),
    proof,
    proofSha256: digest(proofBytes),
  });
  const outputPath = resolve(options.outputPath);
  await writeFile(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);
  await copyFile(proofPath, join(dirname(outputPath), "generated-project-proof.json"));
  await copyFile(import.meta.path, join(dirname(outputPath), basename(import.meta.path)));
  await copyFile(
    UPGRADE_QUALIFICATION_CONTRACT_PATH,
    join(dirname(outputPath), basename(UPGRADE_QUALIFICATION_CONTRACT_PATH)),
  );
  return receipt;
}

export async function verifyReceiptFiles(options: {
  expectedReleaseVersion: string;
  expectedSha: string;
  fixturePath: string;
  manifestPath: string;
  now?: Date;
  proofPath: string;
  qualificationPath: string;
  receiptPath: string;
  runner?: CommandRunner;
}): Promise<VerificationReceipt> {
  const [
    manifest,
    manifestBytes,
    proofBytes,
    fixtureBytes,
    qualificationBytes,
    receipt,
    actualToolchains,
  ] = await Promise.all([
    loadAndVerifyManifest(resolve(options.manifestPath)),
    readFile(resolve(options.manifestPath)),
    readFile(resolve(options.proofPath)),
    readFile(resolve(options.fixturePath)),
    readFile(resolve(options.qualificationPath)),
    readFile(resolve(options.receiptPath), "utf8").then(
      (text) => JSON.parse(text) as VerificationReceipt,
    ),
    actualReleaseToolchains(options.runner),
  ]);
  const proof = JSON.parse(proofBytes.toString()) as unknown;
  const fixture = validateUpgradeFixtureBundle(
    JSON.parse(fixtureBytes.toString()) as unknown,
    manifest,
  );
  const qualification = JSON.parse(qualificationBytes.toString()) as unknown;
  validateVerificationReceipt(receipt, {
    actualToolchains,
    expectedReleaseVersion: options.expectedReleaseVersion,
    expectedSha: options.expectedSha,
    manifest,
    manifestSha256: digest(manifestBytes),
    now: options.now,
    fixture,
    fixtureSha256: digest(fixtureBytes),
    qualification,
    qualificationSha256: digest(qualificationBytes),
    proof,
    proofSha256: digest(proofBytes),
  });
  return receipt;
}

function argument(name: string): string {
  const index = process.argv.indexOf(name);
  const value = index >= 0 ? process.argv[index + 1] : undefined;
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function main(): Promise<void> {
  const command = process.argv[2];
  if (command === "create") {
    await createVerificationReceipt({
      conclusion: argument("--conclusion"),
      fixturePath: argument("--fixture"),
      manifestPath: argument("--manifest"),
      outputPath: argument("--output"),
      proofPath: argument("--proof"),
      qualificationPath: argument("--qualification"),
      requiredCiName: argument("--ci-name"),
      runId: argument("--ci-run-id"),
      runUrl: argument("--ci-run-url"),
      sourceSha: argument("--sha"),
    });
    return;
  }
  if (command === "verify") {
    await verifyReceiptFiles({
      expectedReleaseVersion: argument("--release-version"),
      expectedSha: argument("--sha"),
      fixturePath: argument("--fixture"),
      manifestPath: argument("--manifest"),
      proofPath: argument("--proof"),
      qualificationPath: argument("--qualification"),
      receiptPath: argument("--receipt"),
    });
    console.log("Verification receipt is valid.");
    return;
  }
  throw new Error("Usage: release-receipt.ts <create|verify>");
}

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
