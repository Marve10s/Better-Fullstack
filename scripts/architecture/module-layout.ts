import { mkdir, rename, stat } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

type Move = { from: string; to: string };
type AliasRoot = { directory: string; prefix: string };
type Project = { root: string; aliases: AliasRoot[] };

const repositoryRoot = path.resolve(import.meta.dir, "../..");
const dryRun = process.argv.includes("--check");

const projects: Project[] = [
  {
    root: "apps/analytics",
    aliases: [
      { directory: "convex", prefix: "@/" },
      { directory: "test", prefix: "@test/" },
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
    root: "apps/cli",
    aliases: [
      { directory: "src", prefix: "@/" },
      { directory: "test", prefix: "@test/" },
      { directory: "scripts", prefix: "@scripts/" },
    ],
  },
  {
    root: "apps/web",
    aliases: [
      { directory: "src", prefix: "@/" },
      { directory: "test", prefix: "@test/" },
      { directory: "scripts", prefix: "@scripts/" },
      { directory: "vite-plugins", prefix: "@vite-plugins/" },
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
    root: "packages/types",
    aliases: [
      { directory: "src", prefix: "@/" },
      { directory: "test", prefix: "@test/" },
    ],
  },
  { root: "scripts", aliases: [{ directory: ".", prefix: "@scripts/" }] },
  { root: "testing", aliases: [{ directory: ".", prefix: "@testing/" }] },
  {
    root: "videos",
    aliases: [
      { directory: "src", prefix: "@/" },
      { directory: "scripts", prefix: "@scripts/" },
    ],
  },
  { root: ".github/actions/update-check", aliases: [{ directory: ".", prefix: "@/" }] },
];

const groupedFiles: Record<string, Record<string, string[]>> = {
  "apps/cli/src/utils": {
    config: [
      "bts-config.ts",
      "compatibility-rules.ts",
      "config-drift-repair.ts",
      "config-processing.ts",
      "config-source.ts",
      "config-validation.ts",
      "display-config.ts",
      "graph-summary.ts",
      "registry-bts.ts",
      "stack-compatibility.ts",
      "templates.ts",
    ],
    lifecycle: [
      "cross-version-fixtures.ts",
      "dependency-version-channel.ts",
      "generate-reproducible-command.ts",
      "lifecycle-command.ts",
      "project-adoption.ts",
      "project-lifecycle.ts",
      "scaffold-manifest.ts",
      "update-support.ts",
    ],
    mcp: ["mcp-lifecycle-output-schemas.ts", "mcp-project-lifecycle.ts"],
    platform: [
      "add-package-deps.ts",
      "command-exists.ts",
      "docker-utils.ts",
      "env-utils.ts",
      "external-commands.ts",
      "file-formatter.ts",
      "get-latest-cli-version.ts",
      "get-package-manager.ts",
      "open-url.ts",
      "package-runner.ts",
      "peer-dependency-conflicts.ts",
      "peer-dependency-validator.ts",
    ],
    presentation: [
      "context.ts",
      "error-formatter.ts",
      "errors.ts",
      "navigation.ts",
      "preflight-display.ts",
      "prompt-environment.ts",
      "render-title.ts",
      "sponsors.ts",
    ],
    project: [
      "capability-evidence.ts",
      "generated-checks.ts",
      "project-context.ts",
      "project-directory.ts",
      "project-history.ts",
      "project-report.ts",
      "project-status.ts",
      "support-bundle.ts",
    ],
    telemetry: ["analytics.ts", "telemetry-delivery.ts", "telemetry-settings.ts"],
  },
  "apps/cli/src/commands": {
    generation: ["gen.ts", "recipes.ts", "registry.ts"],
    lifecycle: ["adopt.ts", "doctor.ts", "recovery.ts", "status.ts", "update.ts"],
    stack: ["compatibility.ts", "remove.ts", "replace.ts", "starter-tracks.ts", "update-deps.ts"],
    system: ["context.ts", "history.ts", "telemetry.ts"],
  },
  "apps/cli/src/prompts": {
    architecture: ["api.ts", "backend.ts", "frontend.ts", "mobile.ts", "runtime.ts"],
    core: [
      "config-prompts.ts",
      "config-scope.ts",
      "navigable-group.ts",
      "navigable.ts",
      "prompt-contract.ts",
      "prompt-resolver-registry.ts",
    ],
    data: [
      "caching.ts",
      "database-setup.ts",
      "database.ts",
      "file-storage.ts",
      "file-upload.ts",
      "orm.ts",
      "search.ts",
      "vector-db.ts",
    ],
    developer: [
      "addons.ts",
      "ai-docs.ts",
      "astro-integration.ts",
      "css-framework.ts",
      "effect.ts",
      "examples.ts",
      "forms.ts",
      "shadcn-options.ts",
      "testing.ts",
      "ui-library.ts",
      "validation.ts",
    ],
    ecosystems: [
      "dotnet-ecosystem.ts",
      "ecosystem.ts",
      "elixir-ecosystem.ts",
      "go-ecosystem.ts",
      "java-ecosystem.ts",
      "multi-ecosystem-composer.ts",
      "python-ecosystem.ts",
      "rust-ecosystem.ts",
    ],
    project: [
      "git.ts",
      "install.ts",
      "package-manager.ts",
      "project-name.ts",
      "project-shape.ts",
      "version-channel.ts",
      "workspace-shape.ts",
    ],
    services: [
      "ai.ts",
      "analytics.ts",
      "animation.ts",
      "auth.ts",
      "bot-protection.ts",
      "cms.ts",
      "ecommerce.ts",
      "email.ts",
      "i18n.ts",
      "integrations.ts",
      "job-queue.ts",
      "logging.ts",
      "observability.ts",
      "payments.ts",
      "rate-limit.ts",
      "realtime.ts",
      "server-deploy.ts",
      "state-management.ts",
      "web-deploy.ts",
    ],
  },
  "apps/web/src/lib": {
    analytics: [
      "analytics-aggregate.ts",
      "builder-failure-analytics.ts",
      "campaign-analytics.ts",
      "product-analytics.ts",
      "visitor.ts",
    ],
    builder: [
      "builder-mode-bridge.ts",
      "builder-search-preferences.ts",
      "builder-share-modal-visibility.ts",
      "combinations-count.ts",
      "compare-tools.ts",
      "existing-project-import.ts",
      "preview-config.ts",
      "recommend-preset.ts",
      "saved-stacks.ts",
      "starter-tracks.ts",
    ],
    campaign: ["campaign-share.ts", "campaign.ts"],
    content: [
      "changelog-visibility.ts",
      "changelog.ts",
      "content-date.ts",
      "launch-radar.ts",
      "llms.ts",
      "mdx-suspense-cache.ts",
      "registry-theme.ts",
      "theme.tsx",
    ],
    platform: ["convex.ts", "utils.ts"],
    project: [
      "project-binary-assets.ts",
      "project-download.ts",
      "project-runner.ts",
      "project-stats.ts",
      "run-support.ts",
      "template-generator-browser.ssr.ts",
      "webcontainer-runtime.ts",
    ],
    seo: ["robots.ts", "seo.ts", "sitemap-core.ts", "sitemap.ts"],
    stack: [
      "constant.ts",
      "stack-defaults.ts",
      "stack-search-schema.ts",
      "stack-share-paths.ts",
      "stack-share-slugs.ts",
      "stack-url-state.ts",
      "stack-utils.ts",
      "tech-icons.ts",
      "tech-resource-links.ts",
      "types.ts",
    ],
    telemetry: ["telemetry-auth.server.ts", "telemetry-dashboard.ts", "telemetry-data.server.ts"],
  },
  "packages/types/src": {
    capabilities: [
      "capabilities.ts",
      "capability-inventory.ts",
      "evidence.ts",
      "tooling-capabilities.ts",
    ],
    catalog: ["cli-flags.ts", "option-metadata.ts", "registry.ts"],
    config: ["defaults.ts", "json-schema.ts", "schemas.ts", "types.ts"],
    platform: ["local-dev.ts"],
    stack: [
      "compatibility.ts",
      "stack-comparison.ts",
      "stack-compatibility-rules.ts",
      "stack-graph.ts",
      "stack-translation.ts",
      "starter-tracks.ts",
      "update-support.ts",
    ],
    telemetry: ["telemetry.ts"],
  },
  "packages/template-generator/src/processors": {
    config: [
      "ai-docs-generator.ts",
      "env-vars.ts",
      "graph-backend-connection.ts",
      "readme-generator.ts",
    ],
    dependencies: [
      "addons-deps.ts",
      "ai-deps.ts",
      "analytics-deps.ts",
      "animation-deps.ts",
      "api-deps.ts",
      "auth-deps.ts",
      "backend-deps.ts",
      "bot-protection-deps.ts",
      "caching-deps.ts",
      "cms-deps.ts",
      "css-ui-deps.ts",
      "db-deps.ts",
      "deploy-deps.ts",
      "ecommerce-deps.ts",
      "effect-deps.ts",
      "email-deps.ts",
      "env-deps.ts",
      "examples-deps.ts",
      "feature-flags-deps.ts",
      "file-storage-deps.ts",
      "file-upload-deps.ts",
      "forms-deps.ts",
      "i18n-deps.ts",
      "infra-deps.ts",
      "integrations-deps.ts",
      "job-queue-deps.ts",
      "logging-deps.ts",
      "observability-deps.ts",
      "payments-deps.ts",
      "rate-limit-deps.ts",
      "realtime-deps.ts",
      "runtime-deps.ts",
      "search-deps.ts",
      "state-management-deps.ts",
      "testing-deps.ts",
      "validation-deps.ts",
      "vector-db-deps.ts",
      "workspace-deps.ts",
    ],
    plugins: ["alchemy-plugins.ts", "auth-plugins.ts", "paraglide-plugins.ts", "pwa-plugins.ts"],
    workspace: ["nx-generator.ts", "turbo-generator.ts"],
  },
  "packages/template-generator/src/template-handlers": {
    core: ["backend.ts", "base.ts", "extras.ts", "frontend.ts", "packages.ts", "utils.ts"],
    ecosystems: [
      "dotnet-base.ts",
      "elixir-base.ts",
      "go-base.ts",
      "java-base.ts",
      "python-base.ts",
      "rust-base.ts",
    ],
    features: [
      "addons.ts",
      "ai.ts",
      "analytics.ts",
      "api.ts",
      "auth.ts",
      "bot-protection.ts",
      "cms.ts",
      "database.ts",
      "deploy.ts",
      "ecommerce.ts",
      "email.ts",
      "examples.ts",
      "feature-flags.ts",
      "file-storage.ts",
      "i18n.ts",
      "integrations.ts",
      "job-queue.ts",
      "logging.ts",
      "observability.ts",
      "payments.ts",
      "rate-limit.ts",
      "realtime.ts",
      "search.ts",
      "testing.ts",
      "vector-db.ts",
    ],
  },
  "packages/template-generator/src/utils": {
    dependencies: ["add-deps.ts", "dependency-checker.ts", "dependency-update-policy.ts"],
    graph: ["graph-backend.ts"],
    platform: ["project-paths.ts"],
  },
  scripts: {
    benchmarks: [
      "build-benchmark-data.test.ts",
      "build-benchmark-data.ts",
      "build-scaffbench-3-data.ts",
      "cli-matrix-harness.ts",
      "record-scaffbench-canonical.test.ts",
      "record-scaffbench-canonical.ts",
      "scaffbench-executor.test.ts",
      "scaffbench-hardening-round-2.test.ts",
      "scaffbench-hardening.test.ts",
      "scaffbench-v2-lib.test.ts",
      "scaffbench-v2.ts",
    ],
    evidence: [
      "capability-evidence-audit.test.ts",
      "capability-evidence-audit.ts",
      "capability-maintenance-report.test.ts",
      "capability-maintenance-report.ts",
      "recommendation-evaluation.test.ts",
      "recommendation-evaluation.ts",
      "validate-public-evidence-claims.test.ts",
      "validate-public-evidence-claims.ts",
    ],
    maintenance: [
      "check-dep-versions.ts",
      "cleanup-previews.ts",
      "install-hooks.ts",
      "upstream-gap-report.ts",
    ],
    release: [
      "bump-version.ts",
      "canary-release.ts",
      "capture-release-fixture.ts",
      "cross-version-upgrade.test.ts",
      "cross-version-upgrade.ts",
      "exact-release-cli.ts",
      "published-package-smoke.test.ts",
      "published-package-smoke.ts",
      "qualify-previous-release.test.ts",
      "qualify-previous-release.ts",
      "record-release-guard.ts",
      "release-fixture.test.ts",
      "release-fixture.ts",
      "release-receipt.test.ts",
      "release-receipt.ts",
      "release-state.test.ts",
      "release-state.ts",
      "release.ts",
      "update-check-action.test.ts",
      "upgrade-qualification-contract.ts",
      "validate-release-workflow.test.ts",
      "validate-release-workflow.ts",
      "validate-update-action.ts",
      "validate-update-qualification.test.ts",
      "validate-update-qualification.ts",
    ],
    validation: [
      "build-verified-combinations.test.ts",
      "build-verified-combinations.ts",
      "mutation-contract-audit.test.ts",
      "mutation-contract-audit.ts",
      "planning-registry.test.ts",
      "validate-agent-docs.ts",
      "validate-external-upgrades.ts",
      "validate-plugin-bundle.ts",
      "validate-preview-workflows.test.ts",
      "validate-preview-workflows.ts",
      "verified-combinations-evidence.test.ts",
    ],
  },
};

function withoutExtension(filePath: string): string {
  return filePath.replace(/\.(?:cts|mts|tsx|ts)$/u, "");
}

function isWithin(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function projectFor(filePath: string): Project | undefined {
  return projects.find((project) => isWithin(path.join(repositoryRoot, project.root), filePath));
}

function moduleSpecifier(project: Project, repositoryPath: string): string | undefined {
  const absolutePath = path.join(repositoryRoot, repositoryPath);
  const projectRoot = path.join(repositoryRoot, project.root);
  const alias = project.aliases
    .map((entry) => ({ ...entry, absoluteDirectory: path.resolve(projectRoot, entry.directory) }))
    .filter((entry) => isWithin(entry.absoluteDirectory, absolutePath))
    .sort((left, right) => right.absoluteDirectory.length - left.absoluteDirectory.length)[0];
  if (!alias) return undefined;
  const relative = withoutExtension(path.relative(alias.absoluteDirectory, absolutePath))
    .split(path.sep)
    .join("/");
  return `${alias.prefix}${relative}`;
}

const moves: Move[] = Object.entries(groupedFiles).flatMap(([sourceDirectory, groups]) =>
  Object.entries(groups).flatMap(([group, files]) =>
    files.map((file) => ({
      from: `${sourceDirectory}/${file}`,
      to: `${sourceDirectory.replace(/\/(?:utils|commands|prompts|lib|processors|template-handlers)$/u, "")}/${
        sourceDirectory === "scripts"
          ? group
          : sourceDirectory.includes("/src/")
            ? sourceDirectory.split("/src/")[1]?.split("/")[0] === "utils"
              ? group
              : `${sourceDirectory.split("/").at(-1)}/${group}`
            : group
      }/${file}`.replace("scripts/scripts/", "scripts/"),
    })),
  ),
);

function normalizedMove(move: Move): Move {
  if (move.from.startsWith("apps/cli/src/utils/")) {
    return { ...move, to: move.to.replace("apps/cli/src/utils/", "apps/cli/src/") };
  }
  return move;
}

const finalMoves = moves.map(normalizedMove);
const retainedEntryPoints = new Set([
  "packages/types/src/defaults.ts",
  "packages/types/src/json-schema.ts",
  "packages/types/src/schemas.ts",
  "packages/types/src/stack-graph.ts",
  "packages/types/src/stack-translation.ts",
  "packages/types/src/telemetry.ts",
  "packages/types/src/types.ts",
]);
const moveSpecifiers = new Map<string, string>();
const movedTargetToSource = new Map<string, string>();
const movedSourceToTarget = new Map<string, string>();

for (const move of finalMoves) {
  const source = path.join(repositoryRoot, move.from);
  const target = path.join(repositoryRoot, move.to);
  const project = projectFor(source);
  if (!project || projectFor(target)?.root !== project.root) {
    throw new Error(`Move crosses a project boundary: ${move.from} -> ${move.to}`);
  }
  const oldSpecifier = moduleSpecifier(project, move.from);
  const newSpecifier = moduleSpecifier(project, move.to);
  if (!oldSpecifier || !newSpecifier) {
    throw new Error(`Move is outside configured aliases: ${move.from} -> ${move.to}`);
  }
  moveSpecifiers.set(`${project.root}\0${oldSpecifier}`, newSpecifier);
  movedTargetToSource.set(target, source);
  movedSourceToTarget.set(withoutExtension(source), withoutExtension(target));

  const sourceExists = await stat(source).then(
    () => true,
    () => false,
  );
  const targetExists = await stat(target).then(
    () => true,
    () => false,
  );
  if (sourceExists && targetExists && !retainedEntryPoints.has(move.from)) {
    throw new Error(`Both move paths exist: ${move.from}`);
  }
  if (dryRun && (!targetExists || (sourceExists && !retainedEntryPoints.has(move.from)))) {
    throw new Error(`Module move has not been applied: ${move.from} -> ${move.to}`);
  }
  if (sourceExists && !targetExists && !dryRun) {
    const content = await Bun.file(source).text();
    const sourceFile = ts.createSourceFile(source, content, ts.ScriptTarget.Latest, true);
    const insertions: number[] = [];

    function preserveRuntimeRoot(node: ts.Node): void {
      if (
        ts.isCallExpression(node) &&
        ["import.meta.dir", "__dirname"].includes(node.arguments[0]?.getText(sourceFile) ?? "") &&
        ((ts.isIdentifier(node.expression) && ["join", "resolve"].includes(node.expression.text)) ||
          (ts.isPropertyAccessExpression(node.expression) &&
            ["join", "resolve"].includes(node.expression.name.text)))
      ) {
        insertions.push(node.arguments[0].getEnd());
      }
      ts.forEachChild(node, preserveRuntimeRoot);
    }

    preserveRuntimeRoot(sourceFile);
    const stableContent = insertions
      .sort((left, right) => right - left)
      .reduce(
        (current, position) => `${current.slice(0, position)}, ".."${current.slice(position)}`,
        content,
      );
    if (stableContent !== content) await Bun.write(source, stableContent);
    await mkdir(path.dirname(target), { recursive: true });
    await rename(source, target);
  }
}

if (dryRun) {
  console.log(`Validated ${finalMoves.length} module moves.`);
  process.exit(0);
}

const sourceGlob = new Bun.Glob("**/*.{ts,tsx,mts,cts}");
let rewrittenImports = 0;

for (const project of projects) {
  const projectRoot = path.join(repositoryRoot, project.root);
  for await (const relativeFile of sourceGlob.scan({ cwd: projectRoot, onlyFiles: true })) {
    if (
      relativeFile.includes("node_modules/") ||
      relativeFile.includes("/templates/") ||
      relativeFile.includes("/paraglide/") ||
      relativeFile.endsWith("routeTree.gen.ts") ||
      relativeFile.endsWith("templates.generated.ts")
    ) {
      continue;
    }
    const filePath = path.join(projectRoot, relativeFile);
    const content = await Bun.file(filePath).text();
    const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
    const replacements: Array<{ start: number; end: number; value: string }> = [];

    function add(node: ts.Expression | undefined): void {
      if (!node || !ts.isStringLiteralLike(node)) return;
      const replacement = moveSpecifiers.get(`${project.root}\0${node.text}`);
      if (!replacement) {
        if (!node.text.startsWith(".")) return;
        const originalSource = movedTargetToSource.get(filePath);
        const originalTarget = path.resolve(path.dirname(originalSource ?? filePath), node.text);
        const target = movedSourceToTarget.get(withoutExtension(originalTarget)) ?? originalTarget;
        if (!originalSource && target === originalTarget) return;
        let nextRelative = path.relative(path.dirname(filePath), target).split(path.sep).join("/");
        if (!nextRelative.startsWith(".")) nextRelative = `./${nextRelative}`;
        replacements.push({
          start: node.getStart(sourceFile) + 1,
          end: node.getEnd() - 1,
          value: nextRelative,
        });
        return;
      }
      replacements.push({
        start: node.getStart(sourceFile) + 1,
        end: node.getEnd() - 1,
        value: replacement,
      });
    }

    function visit(node: ts.Node): void {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) add(node.moduleSpecifier);
      else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        add(node.arguments[0]);
      } else if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.expression.getText(sourceFile) === "import.meta" &&
        node.expression.name.text === "glob"
      ) {
        for (const argument of node.arguments) add(argument);
      } else if (
        ts.isNewExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "URL" &&
        node.arguments?.[1]?.getText(sourceFile) === "import.meta.url"
      ) {
        add(node.arguments[0]);
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);

    if (replacements.length === 0) continue;
    const updated = replacements
      .sort((left, right) => right.start - left.start)
      .reduce(
        (current, replacement) =>
          `${current.slice(0, replacement.start)}${replacement.value}${current.slice(replacement.end)}`,
        content,
      );
    await Bun.write(filePath, updated);
    rewrittenImports += replacements.length;
  }
}

const referenceGlob = new Bun.Glob("**/*.{cjs,js,json,jsonc,md,mdx,mjs,sh,toml,ts,tsx,yaml,yml}");
let rewrittenReferences = 0;
for (const referenceRoot of [repositoryRoot, path.join(repositoryRoot, ".github")]) {
  for await (const relativeFile of referenceGlob.scan({
    cwd: referenceRoot,
    onlyFiles: true,
    followSymlinks: false,
  })) {
    if (
      relativeFile.startsWith("scripts/architecture/") ||
      relativeFile.includes("/node_modules/") ||
      relativeFile.includes("/dist/") ||
      relativeFile.includes("/templates/") ||
      relativeFile.endsWith("templates.generated.ts")
    ) {
      continue;
    }
    const filePath = path.join(referenceRoot, relativeFile);
    const content = await Bun.file(filePath).text();
    let updated = content;
    for (const move of finalMoves) {
      updated = updated.replaceAll(move.from, move.to);
    }
    if (updated === content) continue;
    await Bun.write(filePath, updated);
    rewrittenReferences += 1;
  }
}

console.log(
  `Applied ${finalMoves.length} module moves, rewrote ${rewrittenImports} imports, and updated ${rewrittenReferences} path references.`,
);
