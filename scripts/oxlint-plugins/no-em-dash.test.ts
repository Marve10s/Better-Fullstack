import { expect, test } from "bun:test";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CONFIG = join(import.meta.dir, "../../.oxlintrc.json");
const EM_DASH = "\u2014";

async function lint(source: string, ...flags: string[]) {
  const dir = await mkdtemp(join(tmpdir(), "no-em-dash-"));
  const file = join(dir, "probe.ts");
  await writeFile(file, source);

  const oxlint = Bun.spawn(["bunx", "oxlint", "--config", CONFIG, ...flags, file], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const output = await new Response(oxlint.stdout).text();
  const fixed = await readFile(file, "utf-8");
  await rm(dir, { recursive: true, force: true });

  return { output, fixed };
}

test("reports every em dash in strings and comments", async () => {
  const { output } = await lint(
    `export const label = "trpc ${EM_DASH} orpc"; // 中文 ${EM_DASH} note\n`,
  );
  const reports = output.match(/bfs\(no-em-dash\)/g) ?? [];

  expect(reports).toHaveLength(2);
});

test("leaves hyphens alone", async () => {
  const { output } = await lint('export const label = "trpc -> orpc - reason";\n');

  expect(output).not.toInclude("no-em-dash");
});

test("--fix rewrites each em dash as a hyphen", async () => {
  const { fixed } = await lint(`export const label = \`中文 ${EM_DASH} note\`;\n`, "--fix");

  expect(fixed).toBe("export const label = `中文 - note`;\n");
});
