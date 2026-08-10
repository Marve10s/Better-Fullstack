export type GeneratedProjectProofCase = {
  id: string;
  claim: string;
  preset?: string;
  projectName: string;
  flags?: string[];
  requiredToolchains: string[];
  requiredSteps: string[];
};

export const GENERATED_PROJECT_PROOF_CASES: readonly GeneratedProjectProofCase[] = [
  {
    id: "typescript-go",
    claim: "TypeScript web and Go backend install and build from one generated graph",
    projectName: "proof-typescript-go",
    flags: [
      "--part",
      "frontend:typescript:react-vite",
      "--part",
      "backend:go:gin",
      "--part",
      "backend.orm:go:gorm",
      "--part",
      "database:universal:sqlite",
      "--addons",
      "none",
      "--examples",
      "none",
      "--ai-docs",
      "none",
      "--package-manager",
      "bun",
      "--no-install",
      "--no-git",
    ],
    requiredToolchains: ["node", "bun", "go"],
    requiredSteps: ["scaffold", "typescript-install", "typescript-build", "go-tidy", "go-build"],
  },
  {
    id: "python",
    claim: "Python dependencies install and generated sources compile",
    preset: "python-fastapi-sqlalchemy",
    projectName: "proof-python",
    requiredToolchains: ["node", "uv"],
    requiredSteps: ["scaffold", "install", "compile-check"],
  },
  {
    id: "rust",
    claim: "Rust dependencies resolve and the generated project builds",
    preset: "rust-axum-seaorm",
    projectName: "proof-rust",
    requiredToolchains: ["node", "cargo"],
    requiredSteps: ["scaffold", "fetch", "build"],
  },
  {
    id: "dotnet",
    claim: ".NET dependencies restore, build, and generated tests pass",
    preset: "dotnet-minimal-efcore",
    projectName: "proof-dotnet",
    requiredToolchains: ["node", "dotnet"],
    requiredSteps: ["scaffold", "restore", "build", "test"],
  },
  {
    id: "mobile-backend",
    claim: "React Native plus TypeScript backend installs, type-checks, and bundles",
    projectName: "proof-mobile-backend",
    flags: [
      "--part",
      "mobile:react-native:native-bare",
      "--part",
      "backend:typescript:hono",
      "--part",
      "backend.runtime:typescript:bun",
      "--part",
      "backend.api:typescript:trpc",
      "--addons",
      "none",
      "--examples",
      "none",
      "--ai-docs",
      "none",
      "--package-manager",
      "bun",
      "--no-install",
      "--no-git",
    ],
    requiredToolchains: ["node", "bun", "bunx"],
    requiredSteps: ["scaffold", "install", "typecheck", "build", "backend-build"],
  },
] as const;

export type GeneratedProjectProofStep = {
  step: string;
  success: boolean;
  skipped?: boolean;
};

export function missingRequiredSteps(
  expected: readonly string[],
  actual: readonly GeneratedProjectProofStep[],
): string[] {
  const byName = new Map(actual.map((step) => [step.step, step]));
  return expected.filter((name) => {
    const step = byName.get(name);
    return !step || step.skipped === true || step.success !== true;
  });
}

export function hasEligibleEvidenceIdentity(
  gitHead: string,
  workspaceCleanAtStart: boolean,
  workspaceCleanAfter: boolean,
): boolean {
  return (
    /^[0-9a-f]{40}$/i.test(gitHead) &&
    workspaceCleanAtStart === true &&
    workspaceCleanAfter === true
  );
}
