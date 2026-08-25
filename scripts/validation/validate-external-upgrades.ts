import { createHash } from "node:crypto";
import { appendFile, lstat, mkdtemp, readlink, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  applyScaffoldUpgrade,
  confirmProjectAdoption,
  planReviewedProjectUpdate,
  planProjectAdoption,
} from "create-better-fullstack/testing";
import { recoverProjectTransaction } from "@better-fullstack/project-lifecycle/transaction";

const REPOSITORIES = [
  "mdhruvil/gitflare",
  "hehehai/tiny-svg",
  "uptimekit/uptimekit",
  "rogasper/labas-bahasa",
  "jeremyosih/gitinspect",
  "jingerpie/ocean-dataview",
  "stakpak/paks",
  "IvyYang1999/opentrends",
  "AbdullahMukadam/formscn",
  "sunshineLixun/ShipFullStack",
  "shujanshaikh/glide",
  "OpeOginni/gitterm",
  "FranP-code/Open-Telegram-to-Notion-Bot",
  "damien-schneider/reflet",
  "BeroLab/blaboard",
  "yeasin2002/express-ts-starter",
  "Just-Moh-it/openedit",
  "slarity/gamekit-ui",
  "f-amine/vibe-stack",
  "ilrein/openwrite",
  "kuluruvineeth/openbeam",
  "p-society/iiitbuzz",
  "mantrakp04/just-use-convex",
  "FullStack-Flow/cashory",
  "near-everything/every-plugin",
  "memorysaver/agentic-engineering-patterns",
  "mantrakp04/g-spot",
  "maxktz/opensec",
  "andersonkxiass/app-mono-skaffold",
  "DiogoDuart3/future-stack",
] as const;

type ValidationResult = {
  repository: string;
  success: boolean;
  actionable?: number;
  recovered?: boolean;
  error?: string;
};

const USER_EDIT_MARKERS = new Map([
  [".css", "\n/* Better Fullstack external validation user edit */\n"],
  [".md", "\n<!-- Better Fullstack external validation user edit -->\n"],
  [".mdx", "\n<!-- Better Fullstack external validation user edit -->\n"],
  [".py", "\n# Better Fullstack external validation user edit\n"],
  [".ex", "\n# Better Fullstack external validation user edit\n"],
  [".exs", "\n# Better Fullstack external validation user edit\n"],
  [".ts", "\n// Better Fullstack external validation user edit\n"],
  [".tsx", "\n// Better Fullstack external validation user edit\n"],
  [".js", "\n// Better Fullstack external validation user edit\n"],
  [".jsx", "\n// Better Fullstack external validation user edit\n"],
  [".mjs", "\n// Better Fullstack external validation user edit\n"],
  [".cjs", "\n// Better Fullstack external validation user edit\n"],
  [".go", "\n// Better Fullstack external validation user edit\n"],
  [".rs", "\n// Better Fullstack external validation user edit\n"],
  [".java", "\n// Better Fullstack external validation user edit\n"],
  [".kt", "\n// Better Fullstack external validation user edit\n"],
  [".cs", "\n// Better Fullstack external validation user edit\n"],
]);

async function injectUserEdit(projectDir: string): Promise<{ path: string; content: Buffer }> {
  const initialPlan = await planReviewedProjectUpdate(projectDir);
  if (!initialPlan.success) throw new Error(initialPlan.error);
  const relativePath = initialPlan.plan.actionable.find((candidate) =>
    USER_EDIT_MARKERS.has(path.extname(candidate)),
  );
  if (!relativePath) {
    throw new Error("Upgrade plan has no safe generated source file for user-edit validation");
  }
  const marker = USER_EDIT_MARKERS.get(path.extname(relativePath));
  if (!marker) throw new Error(`Unsupported user-edit validation path: ${relativePath}`);
  await appendFile(path.join(projectDir, relativePath), marker);
  return { path: relativePath, content: await readFile(path.join(projectDir, relativePath)) };
}

async function snapshot(root: string): Promise<Record<string, string>> {
  const entries: Record<string, string> = {};
  async function visit(directory: string): Promise<void> {
    for (const name of await readdir(directory)) {
      const absolute = path.join(directory, name);
      const relative = path.relative(root, absolute).split(path.sep).join("/");
      if (relative === ".git" || relative.startsWith(".git/")) continue;
      if (relative === ".bts/recovery" || relative.startsWith(".bts/recovery/")) {
        continue;
      }
      const metadata = await lstat(absolute);
      if (metadata.isDirectory()) await visit(absolute);
      else if (metadata.isSymbolicLink()) {
        entries[relative] = createHash("sha256")
          .update(await readlink(absolute))
          .digest("hex");
      } else if (metadata.isFile()) {
        entries[relative] = createHash("sha256")
          .update(await readFile(absolute))
          .digest("hex");
      }
    }
  }
  await visit(root);
  return entries;
}

async function clone(repository: string, target: string): Promise<void> {
  const process = Bun.spawn(
    ["git", "clone", "--depth", "1", `https://github.com/${repository}.git`, target],
    { stdout: "ignore", stderr: "pipe" },
  );
  const exitCode = await process.exited;
  if (exitCode !== 0) throw new Error((await new Response(process.stderr).text()).trim());
}

async function validate(repository: string, root: string): Promise<ValidationResult> {
  const projectDir = path.join(root, repository.replace("/", "--"));
  try {
    await clone(repository, projectDir);
    const adoptionPlan = await planProjectAdoption(projectDir);
    if (!adoptionPlan.success) throw new Error(adoptionPlan.error);
    const adoption = await confirmProjectAdoption(projectDir, adoptionPlan.confirmationToken);
    if (!adoption.success) throw new Error(adoption.error);
    const userEdit = await injectUserEdit(projectDir);
    const before = await snapshot(projectDir);
    const plan = await planReviewedProjectUpdate(projectDir);
    if (!plan.success) throw new Error(plan.error);
    if (!plan.reviewToken) throw new Error(plan.blockers.join(" ") || "No review token issued");
    if (plan.plan.actionable.length === 0) {
      throw new Error("Upgrade plan has no actionable generated-file changes");
    }
    const protectedPaths = new Set([
      ...plan.plan.userEdited,
      ...plan.plan.conflicts,
      ...plan.plan.manual.map((entry) => entry.path),
    ]);
    if (plan.plan.actionable.includes(userEdit.path) || !protectedPaths.has(userEdit.path)) {
      throw new Error(`Injected user edit was not protected from apply: ${userEdit.path}`);
    }
    const applied = await applyScaffoldUpgrade(projectDir, {
      expectedPlanDigest: plan.reviewToken,
      acknowledgeUnprovenManifestV1: true,
    });
    if (!applied.success) throw new Error(applied.error);
    if (!applied.recoveryId)
      throw new Error("Actionable apply did not emit a recovery transaction");
    if (!(await readFile(path.join(projectDir, userEdit.path))).equals(userEdit.content)) {
      throw new Error(`Applied upgrade overwrote the injected user edit: ${userEdit.path}`);
    }
    await recoverProjectTransaction(projectDir, applied.recoveryId);
    const after = await snapshot(projectDir);
    if (JSON.stringify(after) !== JSON.stringify(before)) {
      throw new Error("Recovery did not restore the complete pre-apply project byte-for-byte");
    }
    return {
      repository,
      success: true,
      actionable: plan.plan.actionable.length,
      recovered: true,
    };
  } catch (error) {
    return {
      repository,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const root = await mkdtemp(path.join(tmpdir(), "bfs-external-upgrades-"));
const results: ValidationResult[] = [];
try {
  for (const repository of REPOSITORIES) {
    const result = await validate(repository, root);
    results.push(result);
    console.log(
      `${result.success ? "PASS" : "FAIL"} ${repository}${result.error ? `: ${result.error}` : ""}`,
    );
    if (results.filter((candidate) => candidate.success).length >= 20) break;
  }
} finally {
  await rm(root, { recursive: true, force: true });
}

const passing = results.filter((result) => result.success);
console.log(
  JSON.stringify({ attempted: results.length, passing: passing.length, results }, null, 2),
);
if (passing.length < 20 || new Set(passing.map((result) => result.repository)).size < 5) {
  process.exitCode = 1;
}
