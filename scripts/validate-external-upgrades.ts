import { createHash } from "node:crypto";
import { lstat, mkdtemp, readlink, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  applyScaffoldUpgrade,
  recordUpgradeBaseline,
} from "../apps/cli/src/helpers/core/scaffold-upgrade";
import { planReviewedProjectUpdate } from "../apps/cli/src/utils/project-lifecycle";
import { recoverProjectTransaction } from "../apps/cli/src/utils/project-transaction";

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
    if (!(await recordUpgradeBaseline(projectDir))) {
      throw new Error("Could not adopt a manifest-v2 baseline");
    }
    const before = await snapshot(projectDir);
    const plan = await planReviewedProjectUpdate(projectDir);
    if (!plan.success) throw new Error(plan.error);
    if (!plan.reviewToken) throw new Error(plan.blockers.join(" ") || "No review token issued");
    if (plan.plan.actionable.length === 0) {
      throw new Error("Upgrade plan has no actionable generated-file changes");
    }
    const applied = await applyScaffoldUpgrade(projectDir, {
      expectedPlanDigest: plan.reviewToken,
      acknowledgeUnprovenManifestV1: true,
    });
    if (!applied.success) throw new Error(applied.error);
    if (!applied.recoveryId)
      throw new Error("Actionable apply did not emit a recovery transaction");
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
