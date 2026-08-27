import fs from "fs-extra";
import path from "node:path";

import { readBtsConfig } from "@/config/bts-config";
import { hashContent } from "@/lifecycle/scaffold-manifest";

type ReleaseFixture = {
  tag: string;
  version: string;
  recordedTagCommit: string;
  tagCommitVerification: "not-performed";
  referencedPackageSpec: string;
  packageGeneration: "performed";
  fixtureRoot: string;
  referenceCaptureCommand: string;
  classification: "published-package-fixture-provenance-only-unupgradeable";
  baseline: "absent";
  files: Record<string, string>;
};

type FixtureProvenance = { schemaVersion: number; releases: ReleaseFixture[] };
export type ValidatedReleaseFixture = ReleaseFixture & { fixtureDir: string };
export type FixtureValidation =
  | { valid: true; releases: ValidatedReleaseFixture[] }
  | { valid: false; errors: string[] };

const SHA256 = /^[a-f0-9]{64}$/;
const COMMIT_SHA = /^[a-f0-9]{40}$/;
const VERSION = /^(\d+)\.(\d+)\.(\d+)$/;

async function listFixtureFiles(root: string): Promise<{ files: string[]; unsafe: string[] }> {
  const files: string[] = [];
  const unsafe: string[] = [];
  async function walk(directory: string): Promise<void> {
    const entries = await fs.readdir(directory, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      const relativePath = path.relative(root, fullPath).split(path.sep).join("/");
      if (entry.isDirectory()) await walk(fullPath);
      else if (entry.isFile()) files.push(relativePath);
      else unsafe.push(relativePath);
    }
  }
  await walk(root);
  return { files: files.sort(), unsafe: unsafe.sort() };
}

export async function validateCrossVersionFixtureProvenance(
  provenancePath: string,
  currentVersion: string,
): Promise<FixtureValidation> {
  const errors: string[] = [];
  let provenance: FixtureProvenance;
  try {
    provenance = (await fs.readJson(provenancePath)) as FixtureProvenance;
  } catch {
    return { valid: false, errors: ["Fixture provenance is missing or malformed."] };
  }

  if (provenance.schemaVersion !== 1) errors.push("Unsupported fixture provenance schema.");
  const releases = Array.isArray(provenance.releases) ? provenance.releases : [];
  if (!Array.isArray(provenance.releases)) errors.push("Fixture releases must be an array.");
  const current = VERSION.exec(currentVersion);
  if (!current) errors.push("Current CLI version is not valid semver.");
  const provenanceDir = path.dirname(path.resolve(provenancePath));
  const minors = new Set<string>();
  const validated: ValidatedReleaseFixture[] = [];

  for (const [index, release] of releases.entries()) {
    const prefix = `release[${index}]`;
    const version = VERSION.exec(release.version);
    if (!version) errors.push(`${prefix} has invalid semver.`);
    if (release.tag !== `v${release.version}`) errors.push(`${prefix} tag/version mismatch.`);
    if (!COMMIT_SHA.test(release.recordedTagCommit)) {
      errors.push(`${prefix} requires a full recorded tag commit SHA.`);
    }
    if (release.tagCommitVerification !== "not-performed") {
      errors.push(`${prefix} must not claim verified tag-to-commit provenance.`);
    }
    if (release.referencedPackageSpec !== `create-better-fullstack@${release.version}`) {
      errors.push(`${prefix} referenced package spec/version mismatch.`);
    }
    if (release.packageGeneration !== "performed") {
      errors.push(`${prefix} must record how its fixture bytes were generated.`);
    }
    if (
      typeof release.referenceCaptureCommand !== "string" ||
      !release.referenceCaptureCommand.startsWith(
        `bunx create-better-fullstack@${release.version} `,
      )
    ) {
      errors.push(`${prefix} reference capture command is not bound to the release version.`);
    }
    if (release.classification !== "published-package-fixture-provenance-only-unupgradeable") {
      errors.push(`${prefix} must not claim cross-version upgrade eligibility.`);
    }
    if (version && current) {
      const prior =
        Number(version[1]) === Number(current[1]) && Number(version[2]) < Number(current[2]);
      if (!prior) errors.push(`${prefix} is not a prior minor release.`);
      minors.add(`${version[1]}.${version[2]}`);
    }

    const fixtureDir = path.resolve(provenanceDir, release.fixtureRoot ?? "");
    if (!fixtureDir.startsWith(`${provenanceDir}${path.sep}`)) {
      errors.push(`${prefix} fixture root escapes the provenance directory.`);
      continue;
    }
    if (release.baseline !== "absent") errors.push(`${prefix} has an unsupported baseline claim.`);
    if (await fs.pathExists(path.join(fixtureDir, "bts.lock.json"))) {
      errors.push(`${prefix} claims no baseline, but bts.lock.json is present.`);
    }
    if (!release.files || Object.keys(release.files).length === 0) {
      errors.push(`${prefix} has no bound fixture files.`);
      continue;
    }
    const listedFiles = Object.keys(release.files).sort();
    const observed = await listFixtureFiles(fixtureDir);
    for (const unsafe of observed.unsafe) {
      errors.push(`${prefix} contains a non-regular fixture entry: ${unsafe}`);
    }
    for (const extra of observed.files.filter((file) => !listedFiles.includes(file))) {
      errors.push(`${prefix} contains an unlisted fixture file: ${extra}`);
    }
    for (const missing of listedFiles.filter((file) => !observed.files.includes(file))) {
      errors.push(`${prefix} lists a file that is not a regular fixture file: ${missing}`);
    }
    for (const [relativePath, expectedHash] of Object.entries(release.files)) {
      if (
        path.isAbsolute(relativePath) ||
        relativePath.split(/[\\/]/).includes("..") ||
        !SHA256.test(expectedHash)
      ) {
        errors.push(`${prefix} has an unsafe path or invalid SHA-256: ${relativePath}`);
        continue;
      }
      const bytes = await fs.readFile(path.join(fixtureDir, relativePath)).catch(() => null);
      if (!bytes) errors.push(`${prefix} fixture file is missing: ${relativePath}`);
      else if (hashContent(bytes) !== expectedHash) {
        errors.push(`${prefix} fixture hash mismatch: ${relativePath}`);
      }
    }
    const fixtureConfig = await readBtsConfig(fixtureDir).catch(() => null);
    if (fixtureConfig?.version !== release.version) {
      errors.push(
        `${prefix} fixture bts.jsonc declares version ${fixtureConfig?.version ?? "unknown"}, expected ${release.version}.`,
      );
    }
    validated.push({ ...release, fixtureDir });
  }

  if (minors.size < 2) errors.push("At least two distinct prior minor releases are required.");
  const fileSignatures = releases.map((release) =>
    JSON.stringify(Object.entries(release.files ?? {}).sort()),
  );
  if (fileSignatures.length > 1 && new Set(fileSignatures).size !== fileSignatures.length) {
    errors.push("Release fixtures are byte-identical; distinct prior-release bytes are required.");
  }
  return errors.length > 0 ? { valid: false, errors } : { valid: true, releases: validated };
}
