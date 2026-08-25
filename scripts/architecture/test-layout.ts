import { mkdir, rename } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

type TestProject = {
  root: string;
  classify: (fileName: string) => string;
};

const repositoryRoot = path.resolve(import.meta.dir, "../..");
const checkOnly = process.argv.includes("--check");

const matches = (value: string, pattern: RegExp) => pattern.test(value);

const testProjects: TestProject[] = [
  {
    root: "apps/cli/test",
    classify(file) {
      if (matches(file, /(?:matrix-test)/)) return "matrix";
      if (matches(file, /(?:^setup|utils|snapshot)/)) return "support";
      if (matches(file, /(?:mcp)/)) return "mcp";
      if (matches(file, /(?:telemetry|analytics|evidence-level)/)) return "telemetry";
      if (matches(file, /(?:prompt|navigation|environment)/)) return "prompts";
      if (
        matches(
          file,
          /(?:adonis|astro|edgedb|elixir|encore|fets|go-language|java|mobile|native|nitro|python|react-vite|rust|solid|typescript-library)/,
        )
      ) {
        return "ecosystems";
      }
      if (
        matches(
          file,
          /(?:history|lifecycle|transaction|adoption|recovery|scaffold-upgrade|stack-update|support-bundle|cross-version)/,
        )
      ) {
        return "lifecycle";
      }
      if (
        matches(
          file,
          /(?:dependency|docs-scaffold|examples|gen-resource|generate|install|recipe|registry|template|virtual-generator|integration)/,
        )
      ) {
        return "generation";
      }
      if (matches(file, /(?:recommend|starter-track|builder)/)) return "recommendations";
      if (matches(file, /(?:benchmark|scaffbench)/)) return "benchmarks";
      if (
        matches(
          file,
          /(?:config|contract|coverage|drift|graph|schema|stack-compatibility|sync|validation|project-shape|generated-check)/,
        )
      ) {
        return "architecture";
      }
      return "features";
    },
  },
  {
    root: "apps/web/test",
    classify(file) {
      if (matches(file, /(?:analytics|campaign|telemetry|visitor)/)) return "telemetry";
      if (matches(file, /(?:dotnet|elixir|go-ecosystem|java|python|rust)/)) return "ecosystems";
      if (matches(file, /(?:builder|existing-project|preview-config|recommend)/)) return "builder";
      if (matches(file, /(?:project|browser-cli)/)) return "project";
      if (matches(file, /(?:stack|starter|tech-icon|verified)/)) return "stack";
      if (matches(file, /(?:changelog|docs|i18n|launch|remark|seo)/)) return "content";
      return "interface";
    },
  },
  {
    root: "packages/types/test",
    classify(file) {
      if (matches(file, /(?:capability|evidence|tooling)/)) return "capabilities";
      if (matches(file, /(?:compatibility|stack|starter|update-support)/)) return "stack";
      if (matches(file, /(?:telemetry)/)) return "telemetry";
      if (matches(file, /(?:local-dev)/)) return "platform";
      return "config";
    },
  },
  {
    root: "packages/template-generator/test",
    classify(file) {
      if (matches(file, /(?:factory)/)) return "_fixtures";
      if (matches(file, /(?:catalogs|flatten-single-app|package-configs)/)) return "post-process";
      if (matches(file, /(?:dependency)/)) return "dependencies";
      if (matches(file, /(?:analytics|bot-protection)/)) return "features";
      if (matches(file, /(?:generator|output|preflight|writer)/)) return "output";
      return "core";
    },
  },
];

const preservedDirectories = new Set([
  "e2e",
  "_fixtures",
  "fixtures",
  "matrix",
  "post-process",
  "processors",
  "template-handlers",
]);
const sourceGlob = new Bun.Glob("**/*.{ts,tsx,mts,cts}");
const moves: Array<{ from: string; to: string }> = [];
const stableReferences = new Map<string, string>();

for (const project of testProjects) {
  const projectRoot = path.join(repositoryRoot, project.root);
  for await (const relativeFile of sourceGlob.scan({ cwd: projectRoot, onlyFiles: true })) {
    const segments = relativeFile.split(path.sep);
    if (segments.some((segment) => preservedDirectories.has(segment))) continue;
    const fileName = path.basename(relativeFile);
    const expected = path.join(project.classify(fileName), fileName);
    const currentRepositoryPath = path.posix.join(
      project.root,
      relativeFile.split(path.sep).join("/"),
    );
    const expectedRepositoryPath = path.posix.join(
      project.root,
      expected.split(path.sep).join("/"),
    );
    stableReferences.set(`${project.root}/${fileName}`, expectedRepositoryPath);
    stableReferences.set(`test/${fileName}`, `test/${expected.split(path.sep).join("/")}`);
    stableReferences.set(
      `@test/${fileName.replace(/\.(?:ts|tsx|mts|cts)$/u, "")}`,
      `@test/${expected
        .replace(/\.(?:ts|tsx|mts|cts)$/u, "")
        .split(path.sep)
        .join("/")}`,
    );
    if (relativeFile === expected) continue;
    moves.push({
      from: currentRepositoryPath,
      to: expectedRepositoryPath,
    });
  }
}

if (checkOnly) {
  const orphanedSnapshots: string[] = [];
  const snapshotGlob = new Bun.Glob("**/__snapshots__/*.snap");
  for (const project of testProjects) {
    const projectRoot = path.join(repositoryRoot, project.root);
    for await (const snapshot of snapshotGlob.scan({ cwd: projectRoot, onlyFiles: true })) {
      const testFile = path.join(
        projectRoot,
        path.dirname(path.dirname(snapshot)),
        path.basename(snapshot, ".snap"),
      );
      if (!(await Bun.file(testFile).exists())) {
        orphanedSnapshots.push(path.posix.join(project.root, snapshot.split(path.sep).join("/")));
      }
    }
  }
  if (moves.length > 0) {
    console.error(moves.map(({ from, to }) => `${from} -> ${to}`).join("\n"));
    process.exit(1);
  }
  if (orphanedSnapshots.length > 0) {
    console.error(`Snapshots are not colocated with their tests:\n${orphanedSnapshots.join("\n")}`);
    process.exit(1);
  }
  console.log("All maintained tests use domain subfolders.");
  process.exit(0);
}

for (const move of moves) {
  const source = path.join(repositoryRoot, move.from);
  const target = path.join(repositoryRoot, move.to);
  const content = await Bun.file(source).text();
  const sourceFile = ts.createSourceFile(source, content, ts.ScriptTarget.Latest, true);
  const insertions: number[] = [];
  const urlReplacements: Array<{ end: number; start: number; value: string }> = [];
  function visit(node: ts.Node): void {
    if (
      ts.isCallExpression(node) &&
      ["import.meta.dir", "__dirname"].includes(node.arguments[0]?.getText(sourceFile) ?? "") &&
      ((ts.isIdentifier(node.expression) && ["join", "resolve"].includes(node.expression.text)) ||
        (ts.isPropertyAccessExpression(node.expression) &&
          ["join", "resolve"].includes(node.expression.name.text)))
    ) {
      insertions.push(node.arguments[0].getEnd());
    }
    if (
      ts.isNewExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "URL" &&
      node.arguments?.[1]?.getText(sourceFile) === "import.meta.url" &&
      ts.isStringLiteralLike(node.arguments[0]) &&
      node.arguments[0].text.startsWith(".")
    ) {
      urlReplacements.push({
        start: node.arguments[0].getStart(sourceFile) + 1,
        end: node.arguments[0].getEnd() - 1,
        value: `../${node.arguments[0].text}`,
      });
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  const edits = [
    ...insertions.map((position) => ({ start: position, end: position, value: ', ".."' })),
    ...urlReplacements,
  ];
  const pathStableContent = edits
    .sort((left, right) => right.start - left.start)
    .reduce(
      (current, edit) => `${current.slice(0, edit.start)}${edit.value}${current.slice(edit.end)}`,
      content,
    );
  if (pathStableContent !== content) await Bun.write(source, pathStableContent);
  await mkdir(path.dirname(target), { recursive: true });
  await rename(source, target);

  const sourceSnapshot = path.join(
    path.dirname(source),
    "__snapshots__",
    `${path.basename(source)}.snap`,
  );
  if (await Bun.file(sourceSnapshot).exists()) {
    const targetSnapshot = path.join(
      path.dirname(target),
      "__snapshots__",
      `${path.basename(target)}.snap`,
    );
    await mkdir(path.dirname(targetSnapshot), { recursive: true });
    await rename(sourceSnapshot, targetSnapshot);
  }
}

const replacements = new Map<string, string>();
for (const [from, to] of stableReferences) {
  if (from !== to) replacements.set(from, to);
}
for (const move of moves) {
  replacements.set(move.from, move.to);
  const project = testProjects.find(({ root }) => move.from.startsWith(`${root}/`));
  if (!project) continue;
  const oldTestPath = move.from
    .slice(project.root.length + 1)
    .replace(/\.(?:ts|tsx|mts|cts)$/u, "");
  const newTestPath = move.to.slice(project.root.length + 1).replace(/\.(?:ts|tsx|mts|cts)$/u, "");
  replacements.set(`@test/${oldTestPath}`, `@test/${newTestPath}`);
}

const referenceGlob = new Bun.Glob("**/*.{cjs,js,json,jsonc,md,mdx,mjs,sh,toml,ts,tsx,yaml,yml}");
let changedFiles = 0;
for (const referenceRoot of [repositoryRoot, path.join(repositoryRoot, ".github")]) {
  for await (const relativeFile of referenceGlob.scan({ cwd: referenceRoot, onlyFiles: true })) {
    if (
      relativeFile.startsWith("scripts/architecture/") ||
      relativeFile.includes("/node_modules/") ||
      relativeFile.includes("/dist/") ||
      relativeFile.includes("/templates/") ||
      relativeFile.includes("/fixtures/")
    ) {
      continue;
    }
    const filePath = path.join(referenceRoot, relativeFile);
    const content = await Bun.file(filePath).text();
    let updated = content;
    for (const [from, to] of replacements) updated = updated.replaceAll(from, to);
    if (updated === content) continue;

    if (/\.(?:cts|mts|tsx|ts)$/u.test(relativeFile)) {
      ts.createSourceFile(filePath, updated, ts.ScriptTarget.Latest, true);
    }
    await Bun.write(filePath, updated);
    changedFiles += 1;
  }
}

console.log(`Moved ${moves.length} tests and updated ${changedFiles} references.`);
