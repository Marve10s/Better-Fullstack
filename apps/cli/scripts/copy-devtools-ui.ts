// Copies the built devtools panel next to the bundled CLI so the published
// package serves it. tsdown's copy option keeps the source's relative path,
// which would land the panel under dist/packages/devtools-ui/dist.
import { cp, rm, stat } from "node:fs/promises";
import path from "node:path";

const cliRoot = path.resolve(import.meta.dir, "..");
const source = path.resolve(cliRoot, "../../packages/devtools-ui/dist");
const target = path.join(cliRoot, "dist/devtools-ui");

const built = await stat(path.join(source, "index.html")).catch(() => null);
if (!built) {
  throw new Error(
    `Devtools panel is not built at ${source}. Run \`bun run --cwd packages/devtools-ui build\` first.`,
  );
}
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });
console.log(`Copied devtools panel to ${path.relative(cliRoot, target)}`);
