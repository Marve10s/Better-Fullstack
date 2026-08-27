import { existsSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

type AliasRoot = {
  directory: string;
  prefix: string;
};

type Project = {
  root: string;
  aliases: AliasRoot[];
};

type ModuleSpecifier = {
  start: number;
  end: number;
  value: string;
  glob: boolean;
};

const repositoryRoot = path.resolve(import.meta.dir, "../..");
const mode = process.argv.includes("--write") ? "write" : "check";

const projects: Project[] = [
  {
    root: "apps/analytics",
    aliases: [
      { directory: "convex", prefix: "@/" },
      { directory: "test", prefix: "@test/" },
    ],
  },
  {
    root: "apps/cli",
    aliases: [
      { directory: "src", prefix: "@/" },
      { directory: "test", prefix: "@test/" },
      { directory: "scripts", prefix: "@scripts/" },
      { directory: "../../scripts/scaffbench", prefix: "@scaffbench/" },
      { directory: "../../testing", prefix: "@testing/" },
      { directory: "../web/src", prefix: "@web/" },
    ],
  },
  {
    root: "apps/web",
    aliases: [
      { directory: "src", prefix: "@/" },
      { directory: "src", prefix: "@web/" },
      { directory: "src", prefix: "#web/" },
      { directory: "test", prefix: "@test/" },
      { directory: "scripts", prefix: "@scripts/" },
      {
        directory: "../../packages/template-generator/templates-binary",
        prefix: "@template-assets/",
      },
      { directory: "vite-plugins", prefix: "@vite-plugins/" },
      { directory: "vite-plugins", prefix: "#vite-plugins/" },
      { directory: ".", prefix: "@web-root/" },
      { directory: ".", prefix: "#web-root/" },
      { directory: "../cli", prefix: "@cli/" },
    ],
  },
  {
    root: "packages/backend",
    aliases: [
      { directory: "convex", prefix: "@/" },
      { directory: "test", prefix: "@test/" },
    ],
  },
  {
    root: "packages/template-generator",
    aliases: [
      { directory: "src", prefix: "@/" },
      { directory: "test", prefix: "@test/" },
      { directory: "scripts", prefix: "@scripts/" },
    ],
  },
  {
    root: "packages/project-lifecycle",
    aliases: [{ directory: "src", prefix: "@/" }],
  },
  {
    root: "packages/types",
    aliases: [
      { directory: "src", prefix: "@/" },
      { directory: "test", prefix: "@test/" },
    ],
  },
  {
    root: "scripts",
    aliases: [
      { directory: "scaffbench", prefix: "@scaffbench/" },
      { directory: ".", prefix: "@scripts/" },
      { directory: "../.github/actions", prefix: "@actions/" },
      { directory: "..", prefix: "@root/" },
      { directory: "../testing", prefix: "@testing/" },
      { directory: "../apps/web/src", prefix: "@web/" },
    ],
  },
  {
    root: "testing",
    aliases: [
      { directory: ".", prefix: "@testing/" },
      { directory: "../scripts", prefix: "@scripts/" },
    ],
  },
  {
    root: "videos",
    aliases: [
      { directory: "src", prefix: "@/" },
      { directory: "scripts", prefix: "@scripts/" },
    ],
  },
  {
    root: ".github/actions/update-check",
    aliases: [{ directory: ".", prefix: "@/" }],
  },
  {
    root: ".github/scripts",
    aliases: [{ directory: ".", prefix: "@github-scripts/" }],
  },
];

const sourceGlob = new Bun.Glob("**/*.{ts,tsx,mts,cts}");
const excludedPathFragments = [
  "/.smoke/",
  "/.tanstack/",
  "/convex/_generated/",
  "/dist/",
  "/node_modules/",
  "/paraglide/",
  "/test/fixtures/",
  "/templates/",
];

function isGeneratedOrFixture(filePath: string): boolean {
  const normalized = `/${filePath.split(path.sep).join("/")}`;
  return (
    excludedPathFragments.some((fragment) => normalized.includes(fragment)) ||
    normalized.endsWith("/routeTree.gen.ts") ||
    normalized.endsWith("/templates.generated.ts")
  );
}

function moduleSpecifiers(sourceFile: ts.SourceFile): ModuleSpecifier[] {
  const results: ModuleSpecifier[] = [];

  function add(node: ts.Expression | undefined, glob = false): void {
    if (!node) return;
    if (ts.isArrayLiteralExpression(node)) {
      for (const element of node.elements) add(element, glob);
      return;
    }
    if (!ts.isStringLiteralLike(node)) return;
    results.push({
      start: node.getStart(sourceFile) + 1,
      end: node.getEnd() - 1,
      value: node.text,
      glob,
    });
  }

  function visit(node: ts.Node): void {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      add(node.moduleSpecifier);
    } else if (ts.isImportEqualsDeclaration(node)) {
      const reference = node.moduleReference;
      if (ts.isExternalModuleReference(reference)) add(reference.expression);
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      add(node.arguments[0]);
    } else if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.expression.getText(sourceFile) === "import.meta" &&
      node.expression.name.text === "glob"
    ) {
      add(node.arguments[0], true);
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      add(node.argument.literal);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return results;
}

function isWithin(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function aliasFor(projectRoot: string, aliases: AliasRoot[], sourceFile: string, value: string) {
  const target = path.resolve(path.dirname(sourceFile), value);
  const candidates = aliases
    .map((alias) => ({ ...alias, absoluteDirectory: path.resolve(projectRoot, alias.directory) }))
    .filter((alias) => isWithin(alias.absoluteDirectory, target))
    .sort((left, right) => right.absoluteDirectory.length - left.absoluteDirectory.length);
  const alias = candidates[0];
  if (!alias) return undefined;

  const relativeTarget = path.relative(alias.absoluteDirectory, target).split(path.sep).join("/");
  return `${alias.prefix}${relativeTarget}`;
}

async function moduleTargetExists(target: string): Promise<boolean> {
  const sourceTarget = target.replace(/\.(?:c|m)?js$/u, "");
  const candidates = [
    target,
    `${sourceTarget}.ts`,
    `${sourceTarget}.tsx`,
    `${sourceTarget}.mts`,
    `${sourceTarget}.cts`,
    `${sourceTarget}.d.ts`,
    `${sourceTarget}.js`,
    path.join(sourceTarget, "index.ts"),
    path.join(sourceTarget, "index.tsx"),
  ];
  for (const candidate of candidates) {
    if (await Bun.file(candidate).exists()) return true;
  }
  return false;
}

function globTargetExists(target: string): boolean {
  const wildcard = target.search(/[*!?[\]{}]/u);
  const fixedPrefix = wildcard === -1 ? target : target.slice(0, wildcard);
  return existsSync(fixedPrefix.endsWith(path.sep) ? fixedPrefix.slice(0, -1) : fixedPrefix);
}

async function canonicalExistingAlias(
  project: Project,
  projectRoot: string,
  sourceFile: string,
  value: string,
): Promise<string | undefined> {
  if (!value.startsWith("@/")) return undefined;

  if (project.root === "testing") {
    return `@testing/${value.slice(2)}`;
  }

  if (project.root === "scripts") {
    const suffix = value.slice(2);
    const scaffbenchRoot = path.join(projectRoot, "scaffbench");
    const scriptTarget = path.join(projectRoot, suffix);
    const scaffbenchTarget = path.join(scaffbenchRoot, suffix);
    const scriptTargetExists = await moduleTargetExists(scriptTarget);
    const scaffbenchTargetExists = await moduleTargetExists(scaffbenchTarget);

    if (isWithin(scaffbenchRoot, sourceFile)) {
      return scriptTargetExists && !scaffbenchTargetExists
        ? `@scripts/${suffix}`
        : `@scaffbench/${suffix}`;
    }
    if (!scriptTargetExists && scaffbenchTargetExists) {
      return `@scaffbench/${suffix}`;
    }
    return `@scripts/${suffix}`;
  }

  if (
    project.root === "apps/web" &&
    /scaffbench-(?:2(?:-[12])?|3-board)-data\.tsx?$/.test(sourceFile)
  ) {
    return `@web/${value.slice(2)}`;
  }

  return undefined;
}

function applyReplacements(
  content: string,
  replacements: Array<ModuleSpecifier & { replacement: string }>,
): string {
  return replacements
    .sort((left, right) => right.start - left.start)
    .reduce(
      (current, replacement) =>
        `${current.slice(0, replacement.start)}${replacement.replacement}${current.slice(replacement.end)}`,
      content,
    );
}

const unresolved: string[] = [];
let changedFiles = 0;
let changedImports = 0;

for (const project of projects) {
  const projectRoot = path.join(repositoryRoot, project.root);
  for await (const relativeFile of sourceGlob.scan({
    cwd: projectRoot,
    onlyFiles: true,
    followSymlinks: false,
  })) {
    const repositoryPath = path.posix.join(project.root, relativeFile.split(path.sep).join("/"));
    if (isGeneratedOrFixture(repositoryPath)) continue;

    const filePath = path.join(projectRoot, relativeFile);
    const content = await Bun.file(filePath).text();
    const sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest,
      true,
      relativeFile.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const specifiers = moduleSpecifiers(sourceFile);

    const replacements: Array<ModuleSpecifier & { replacement: string }> = [];
    for (const specifier of specifiers) {
      const negative = specifier.glob && specifier.value.startsWith("!");
      const value = negative ? specifier.value.slice(1) : specifier.value;
      const canonicalReplacement = value.startsWith(".")
        ? aliasFor(projectRoot, project.aliases, filePath, value)
        : await canonicalExistingAlias(project, projectRoot, filePath, value);
      const replacement = canonicalReplacement
        ? `${negative ? "!" : ""}${canonicalReplacement}`
        : undefined;
      if (!replacement) {
        if (!value.startsWith(".")) {
          const alias = project.aliases.find(({ prefix }) => value.startsWith(prefix));
          if (alias) {
            const aliasTarget = path.join(
              projectRoot,
              alias.directory,
              value.slice(alias.prefix.length),
            );
            const targetExists = specifier.glob
              ? globTargetExists(aliasTarget)
              : await moduleTargetExists(aliasTarget);
            if (!targetExists) {
              unresolved.push(`${repositoryPath}: ${specifier.value} has no module target`);
            }
          }
          continue;
        }
        unresolved.push(`${repositoryPath}: ${specifier.value}`);
        continue;
      }
      replacements.push({ ...specifier, replacement });
    }

    if (mode === "write" && replacements.length > 0) {
      await Bun.write(filePath, applyReplacements(content, replacements));
      changedFiles += 1;
      changedImports += replacements.length;
    } else if (mode === "check") {
      unresolved.push(
        ...replacements.map(
          ({ value, replacement }) => `${repositoryPath}: ${value} -> ${replacement}`,
        ),
      );
    }
  }
}

if (mode === "write") {
  console.log(`Rewrote ${changedImports} imports in ${changedFiles} files.`);
}

if (unresolved.length > 0) {
  console.error(
    mode === "check"
      ? "Relative module specifiers remain:\n"
      : "Relative module specifiers outside configured alias roots remain:\n",
  );
  console.error(unresolved.sort().join("\n"));
  process.exit(1);
}

if (mode === "check") {
  console.log("All maintained TypeScript module specifiers use path or package aliases.");
}
