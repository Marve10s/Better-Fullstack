import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

import {
  finalizeRelease,
  inspectPublication,
  loadAndVerifyManifest,
  publicationState,
  publishRelease,
  releaseBuildPlan,
  RELEASE_TOOLCHAINS,
  type CommandRunner,
  type RegistryPackageState,
  type ReleaseManifest,
  type ReleasePackage,
} from "@scripts/release/release-state";

function packageArtifact(name: string, version: string, marker = name): ReleasePackage {
  const bytes = new TextEncoder().encode(marker);
  return {
    directory: `packages/${name}`,
    filename: `packages/${name.replace(/^@/, "").replaceAll("/", "-")}.tgz`,
    integrity: `sha512-${createHash("sha512").update(bytes).digest("base64")}`,
    name,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    shasum: createHash("sha1").update(bytes).digest("hex"),
    version,
  };
}

function withState(pkg: ReleasePackage, registry: RegistryPackageState) {
  return { ...pkg, registry };
}

async function manifestFixture(packages: ReleasePackage[]) {
  const directory = await mkdtemp(join(tmpdir(), "release-state-test-"));
  await mkdir(join(directory, "packages"));
  await Promise.all(packages.map((pkg) => writeFile(join(directory, pkg.filename), pkg.name)));
  const manifest: ReleaseManifest = {
    packages,
    releaseVersion:
      packages.find((pkg) => pkg.name === "create-better-fullstack")?.version ?? "3.0.0",
    schemaVersion: 1,
    sourceSha: "c".repeat(40),
    toolchains: RELEASE_TOOLCHAINS,
  };
  const manifestPath = join(directory, "release-manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest));
  return { directory, manifest, manifestPath };
}

function registryView(pkg: ReleasePackage, state: RegistryPackageState) {
  if (state.kind === "absent") {
    return { exitCode: 1, stderr: "npm error E404 Not Found", stdout: "" };
  }
  if (state.kind === "conflict") {
    return {
      exitCode: 0,
      stderr: "",
      stdout: JSON.stringify({
        integrity: state.actualIntegrity,
        shasum: state.actualShasum,
      }),
    };
  }
  return {
    exitCode: 0,
    stderr: "",
    stdout: JSON.stringify({ integrity: pkg.integrity, shasum: pkg.shasum }),
  };
}

async function releaseAssets(paths: string[]) {
  return Promise.all(
    paths.map(async (path) => {
      const bytes = await readFile(path);
      return {
        digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
        name: basename(path),
        size: bytes.byteLength,
      };
    }),
  );
}

describe("release publication state", () => {
  test("detects partial publication and resumes at the first absent package", () => {
    const types = packageArtifact("@better-fullstack/types", "2.7.0");
    const generator = packageArtifact("@better-fullstack/template-generator", "2.8.0");
    const state = publicationState([
      withState(types, { kind: "matching" }),
      withState(generator, { kind: "absent" }),
    ]);

    expect(state.phase).toBe("partially-published");
    expect(
      state.packages.filter((pkg) => pkg.registry.kind === "absent").map((pkg) => pkg.name),
    ).toEqual(["@better-fullstack/template-generator"]);
  });

  test("blocks resume when rebuilt bytes differ from an already-published package", () => {
    const rebuilt = packageArtifact("@better-fullstack/types", "2.7.0", "different bytes");
    const state = publicationState([
      withState(rebuilt, {
        actualIntegrity: packageArtifact("@better-fullstack/types", "2.7.0", "original bytes")
          .integrity,
        actualShasum: packageArtifact("@better-fullstack/types", "2.7.0", "original bytes").shasum,
        kind: "conflict",
      }),
      withState(packageArtifact("create-better-fullstack", "2.7.0"), { kind: "absent" }),
    ]);

    expect(state.phase).toBe("blocked");
  });

  test("preflights every independently-versioned publishable identity", async () => {
    const packages = [
      packageArtifact("@better-fullstack/types", "2.7.0"),
      packageArtifact("@better-fullstack/template-generator", "2.8.0"),
      packageArtifact("create-better-fullstack", "3.0.0"),
      packageArtifact("create-bfs", "3.0.0"),
    ];
    const inspected: string[] = [];
    const state = await inspectPublication(
      {
        packages,
        releaseVersion: "3.0.0",
        schemaVersion: 1,
        sourceSha: "a".repeat(40),
        toolchains: RELEASE_TOOLCHAINS,
      },
      "https://registry.example.test",
      async (command) => {
        inspected.push(command[2] ?? "");
        return { exitCode: 1, stderr: "npm error E404 Not Found", stdout: "" };
      },
    );

    expect(state.phase).toBe("prepared");
    expect(inspected).toEqual(packages.map((pkg) => `${pkg.name}@${pkg.version}`));
  });

  test("resumes after an injected publish failure using only the remaining exact tarball", async () => {
    const types = packageArtifact("@better-fullstack/types", "2.7.0");
    const cli = packageArtifact("create-better-fullstack", "3.0.0");
    const fixture = await manifestFixture([types, cli]);
    const states = new Map<string, RegistryPackageState>([
      [`${types.name}@${types.version}`, { kind: "matching" }],
      [`${cli.name}@${cli.version}`, { kind: "absent" }],
    ]);
    const publishAttempts: string[] = [];
    const successfulPublishes: string[] = [];
    let injectFailure = true;
    const runner: CommandRunner = async (command) => {
      if (command[0] === "npm" && command[1] === "view") {
        const identity = command[2] ?? "";
        const pkg = identity === `${types.name}@${types.version}` ? types : cli;
        return registryView(pkg, states.get(identity) ?? { kind: "absent" });
      }
      if (command[0] === "npm" && command[1] === "publish") {
        const archive = command[2] ?? "";
        publishAttempts.push(archive);
        if (injectFailure) {
          injectFailure = false;
          return { exitCode: 1, stderr: "injected npm publish failure", stdout: "" };
        }
        successfulPublishes.push(archive);
        states.set(`${cli.name}@${cli.version}`, { kind: "matching" });
        return { exitCode: 0, stderr: "", stdout: "+ create-better-fullstack@3.0.0" };
      }
      throw new Error(`Unexpected command: ${command.join(" ")}`);
    };

    try {
      await expect(publishRelease({ manifestPath: fixture.manifestPath, runner })).rejects.toThrow(
        "injected npm publish failure",
      );
      await publishRelease({ manifestPath: fixture.manifestPath, runner });

      const exactCliArchive = join(fixture.directory, cli.filename);
      expect(publishAttempts).toEqual([exactCliArchive, exactCliArchive]);
      expect(successfulPublishes).toEqual([exactCliArchive]);
      expect(publishAttempts.some((archive) => archive.endsWith(types.filename))).toBe(false);
    } finally {
      await rm(fixture.directory, { force: true, recursive: true });
    }
  });

  test("never reaches tag or release calls from a non-published package state", async () => {
    const types = packageArtifact("@better-fullstack/types", "3.0.0");
    const cli = packageArtifact("create-better-fullstack", "3.0.0");
    const fixture = await manifestFixture([types, cli]);
    const scenarios: Array<Map<string, RegistryPackageState>> = [
      new Map([
        [`${types.name}@${types.version}`, { kind: "absent" }],
        [`${cli.name}@${cli.version}`, { kind: "absent" }],
      ]),
      new Map([
        [`${types.name}@${types.version}`, { kind: "matching" }],
        [`${cli.name}@${cli.version}`, { kind: "absent" }],
      ]),
      new Map([
        [
          `${types.name}@${types.version}`,
          { actualIntegrity: "sha512-wrong", actualShasum: "wrong", kind: "conflict" },
        ],
        [`${cli.name}@${cli.version}`, { kind: "absent" }],
      ]),
    ];

    try {
      await Promise.all(
        scenarios.map(async (states) => {
          const githubCalls: string[][] = [];
          const runner: CommandRunner = async (command) => {
            if (command[0] === "gh") {
              githubCalls.push(command);
              return { exitCode: 0, stderr: "", stdout: "{}" };
            }
            const identity = command[2] ?? "";
            const pkg = identity === `${types.name}@${types.version}` ? types : cli;
            return registryView(pkg, states.get(identity) ?? { kind: "absent" });
          };

          await expect(
            finalizeRelease({
              manifestPath: fixture.manifestPath,
              repository: "better-fullstack/better-fullstack",
              runner,
              sourceSha: fixture.manifest.sourceSha,
            }),
          ).rejects.toThrow();
          expect(githubCalls).toEqual([]);
        }),
      );
    } finally {
      await rm(fixture.directory, { force: true, recursive: true });
    }
  });

  test("leaves no final tag or release when staged asset upload fails, then resumes", async () => {
    const cli = packageArtifact("create-better-fullstack", "3.0.0");
    const fixture = await manifestFixture([cli]);
    const receiptPath = join(fixture.directory, "verification-receipt.v1.json");
    await writeFile(receiptPath, "{}\n");
    const assets = [fixture.manifestPath, receiptPath];
    const uploadedAssets = await releaseAssets(assets);
    const finalTag = `v${fixture.manifest.releaseVersion}`;
    const stagingTag = `${finalTag}-staging-${fixture.manifest.sourceSha}`;
    const githubCalls: string[][] = [];
    let finalPublished = false;
    let stagingDraft = false;
    let stagingHasAssets = false;
    let stagingVerified = false;
    let uploadFails = true;
    const runner: CommandRunner = async (command) => {
      if (command[0] === "npm") return registryView(cli, { kind: "matching" });
      githubCalls.push(command);
      if (command[1] === "api") {
        if (command.includes("repos/better-fullstack/better-fullstack/releases/generate-notes")) {
          return { exitCode: 0, stderr: "", stdout: JSON.stringify({ body: "release notes" }) };
        }
        if (finalPublished && command.at(-1)?.endsWith(`/tags/${finalTag}`)) {
          return {
            exitCode: 0,
            stderr: "",
            stdout: JSON.stringify({ object: { sha: fixture.manifest.sourceSha, type: "commit" } }),
          };
        }
        return { exitCode: 1, stderr: "HTTP 404: Not Found", stdout: "" };
      }
      if (command[1] === "release" && command[2] === "view") {
        if (command[3] === finalTag && finalPublished) {
          return {
            exitCode: 0,
            stderr: "",
            stdout: JSON.stringify({
              assets: uploadedAssets,
              isDraft: false,
              tagName: finalTag,
              targetCommitish: fixture.manifest.sourceSha,
            }),
          };
        }
        if (command[3] === stagingTag && stagingDraft) {
          if (stagingHasAssets) stagingVerified = true;
          return {
            exitCode: 0,
            stderr: "",
            stdout: JSON.stringify({
              assets: stagingHasAssets ? uploadedAssets : [],
              isDraft: true,
              tagName: stagingTag,
              targetCommitish: fixture.manifest.sourceSha,
            }),
          };
        }
        return { exitCode: 1, stderr: "release not found", stdout: "" };
      }
      if (command[1] === "release" && command[2] === "create") {
        stagingDraft = true;
        return { exitCode: 0, stderr: "", stdout: "draft created" };
      }
      if (command[1] === "release" && command[2] === "upload") {
        if (uploadFails) {
          uploadFails = false;
          return { exitCode: 1, stderr: "injected asset upload failure", stdout: "" };
        }
        stagingHasAssets = true;
        return { exitCode: 0, stderr: "", stdout: "uploaded" };
      }
      if (command[1] === "release" && command[2] === "edit") {
        if (!stagingVerified)
          throw new Error("Final release mutation ran before asset verification");
        stagingDraft = false;
        finalPublished = true;
        return { exitCode: 0, stderr: "", stdout: "published" };
      }
      throw new Error(`Unexpected command: ${command.join(" ")}`);
    };

    try {
      await expect(
        finalizeRelease({
          assets,
          manifestPath: fixture.manifestPath,
          repository: "better-fullstack/better-fullstack",
          runner,
          sourceSha: fixture.manifest.sourceSha,
        }),
      ).rejects.toThrow("injected asset upload failure");
      expect(finalPublished).toBe(false);
      expect(githubCalls.find((command) => command[2] === "create")?.[3]).toBe(stagingTag);
      expect(githubCalls.find((command) => command[2] === "create")).toContain("--draft");
      expect(
        githubCalls.some(
          (command) => ["create", "upload"].includes(command[2] ?? "") && command[3] === finalTag,
        ),
      ).toBe(false);
      expect(githubCalls.some((command) => command[2] === "edit")).toBe(false);

      await finalizeRelease({
        assets,
        manifestPath: fixture.manifestPath,
        repository: "better-fullstack/better-fullstack",
        runner,
        sourceSha: fixture.manifest.sourceSha,
      });

      expect(finalPublished).toBe(true);
      expect(githubCalls.filter((command) => command[2] === "create")).toHaveLength(1);
      const edit = githubCalls.find((command) => command[2] === "edit");
      expect(edit?.[3]).toBe(stagingTag);
      expect(edit).toContain(finalTag);
      expect(edit).toContain("--draft=false");
    } finally {
      await rm(fixture.directory, { force: true, recursive: true });
    }
  });

  test("leaves no final tag or release when staged asset verification fails", async () => {
    const cli = packageArtifact("create-better-fullstack", "3.0.0");
    const fixture = await manifestFixture([cli]);
    const receiptPath = join(fixture.directory, "verification-receipt.v1.json");
    await writeFile(receiptPath, "{}\n");
    const finalTag = `v${fixture.manifest.releaseVersion}`;
    const stagingTag = `${finalTag}-staging-${fixture.manifest.sourceSha}`;
    const githubCalls: string[][] = [];
    let stagingDraft = false;
    const runner: CommandRunner = async (command) => {
      if (command[0] === "npm") return registryView(cli, { kind: "matching" });
      githubCalls.push(command);
      if (command[1] === "api") {
        if (command.includes("repos/better-fullstack/better-fullstack/releases/generate-notes")) {
          return { exitCode: 0, stderr: "", stdout: JSON.stringify({ body: "release notes" }) };
        }
        return { exitCode: 1, stderr: "HTTP 404: Not Found", stdout: "" };
      }
      if (command[1] === "release" && command[2] === "view") {
        if (command[3] !== stagingTag || !stagingDraft) {
          return { exitCode: 1, stderr: "release not found", stdout: "" };
        }
        return {
          exitCode: 0,
          stderr: "",
          stdout: JSON.stringify({
            assets: [],
            isDraft: true,
            tagName: stagingTag,
            targetCommitish: fixture.manifest.sourceSha,
          }),
        };
      }
      if (command[1] === "release" && command[2] === "create") {
        stagingDraft = true;
        return { exitCode: 0, stderr: "", stdout: "ok" };
      }
      if (command[1] === "release" && command[2] === "upload") {
        return { exitCode: 0, stderr: "", stdout: "ok" };
      }
      throw new Error(`Unexpected command: ${command.join(" ")}`);
    };

    try {
      await expect(
        finalizeRelease({
          assets: [fixture.manifestPath, receiptPath],
          manifestPath: fixture.manifestPath,
          repository: "better-fullstack/better-fullstack",
          runner,
          sourceSha: fixture.manifest.sourceSha,
        }),
      ).rejects.toThrow("missing required verification assets");
      expect(githubCalls.find((command) => command[2] === "create")?.[3]).toBe(stagingTag);
      expect(
        githubCalls.some(
          (command) => ["create", "upload"].includes(command[2] ?? "") && command[3] === finalTag,
        ),
      ).toBe(false);
      expect(githubCalls.some((command) => command[2] === "edit")).toBe(false);
    } finally {
      await rm(fixture.directory, { force: true, recursive: true });
    }
  });

  test("rejects altered artifact bytes before consulting a registry", async () => {
    const directory = await mkdtemp(join(tmpdir(), "release-state-test-"));
    try {
      await mkdir(join(directory, "packages"));
      const pkg = packageArtifact("create-better-fullstack", "3.0.0", "expected");
      await writeFile(join(directory, pkg.filename), "altered");
      const manifest: ReleaseManifest = {
        packages: [pkg],
        releaseVersion: "3.0.0",
        schemaVersion: 1,
        sourceSha: "b".repeat(40),
        toolchains: RELEASE_TOOLCHAINS,
      };
      const manifestPath = join(directory, "release-manifest.json");
      await writeFile(manifestPath, JSON.stringify(manifest));

      await expect(loadAndVerifyManifest(manifestPath)).rejects.toThrow(
        "Artifact bytes changed for create-better-fullstack@3.0.0",
      );
    } finally {
      await rm(directory, { force: true, recursive: true });
    }
  });
});

async function workspaceFixture(packages: Record<string, object>) {
  const root = await mkdtemp(join(tmpdir(), "release-plan-test-"));
  await writeFile(
    join(root, "package.json"),
    JSON.stringify({ name: "root", private: true, workspaces: ["apps/*", "packages/*"] }),
  );
  await Promise.all(
    Object.entries(packages).map(async ([directory, json]) => {
      await mkdir(join(root, directory), { recursive: true });
      await writeFile(join(root, directory, "package.json"), JSON.stringify(json));
    }),
  );
  return root;
}

describe("release build plan", () => {
  test("builds private workspace dependencies of publishable packages before them", async () => {
    const root = await workspaceFixture({
      "apps/cli": {
        name: "create-better-fullstack",
        version: "3.0.0",
        scripts: { build: "true" },
        dependencies: { "@better-fullstack/types": "^3.0.0" },
        devDependencies: { "@better-fullstack/project-lifecycle": "workspace:*" },
      },
      "apps/web": { name: "web", private: true, scripts: { build: "true" } },
      "packages/project-lifecycle": {
        name: "@better-fullstack/project-lifecycle",
        version: "3.0.0",
        private: true,
        scripts: { build: "true" },
        devDependencies: { "@better-fullstack/private-base": "workspace:*" },
      },
      "packages/private-base": {
        name: "@better-fullstack/private-base",
        private: true,
        scripts: { build: "true" },
      },
      "packages/private-tooling": { name: "@better-fullstack/tooling", private: true },
      "packages/types": { name: "@better-fullstack/types", version: "3.0.0" },
    });
    try {
      const plan = await releaseBuildPlan(root);
      expect(plan.privateDependencies.map((pkg) => pkg.json.name)).toEqual([
        "@better-fullstack/private-base",
        "@better-fullstack/project-lifecycle",
      ]);
      expect(plan.publishable.map((pkg) => pkg.json.name)).toEqual([
        "@better-fullstack/types",
        "create-better-fullstack",
      ]);
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });
});
