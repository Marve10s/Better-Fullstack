import { promises as fs } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const WEB_DIR = path.resolve(SCRIPT_DIR, "..");
const ASSETS_DIR = path.resolve(WEB_DIR, ".vercel/output/static/assets");
const BASELINE_PATH = path.resolve(WEB_DIR, "perf-baseline.json");
const REPORT_DIR = path.resolve(WEB_DIR, "reports/performance");
const CURRENT_REPORT_PATH = path.resolve(REPORT_DIR, "current.json");
const SUMMARY_PATH = path.resolve(REPORT_DIR, "summary.md");

const TRACKED_KEYS = [
  "mainJsGzip",
  "mainCssGzip",
  "stackBuilderJsGzip",
  "largestJsGzip",
  "totalJsGzip",
];

const MAIN_JS_PATTERNS = [/^main-.*\.js$/, /^index-.*\.js$/];
const MAIN_CSS_PATTERNS = [/^main-.*\.css$/, /^index-.*\.css$/];
const LOCALIZED_CONTENT_JS_PATTERN =
  /^(?:localized-content-|(?:es|zh-Hant|zh|ja|ko|de|fr|uk)[.-]).*\.js$/;
const LAZY_SYNTAX_JS_PATTERN = /^lazy-syntax-(?:language|theme)-.*\.js$/;

const DEFAULT_BUDGETS = {
  mainJsGzip: 8 * 1024,
  mainCssGzip: 3 * 1024,
  stackBuilderJsGzip: 20 * 1024,
  largestJsGzip: 20 * 1024,
  totalJsGzip: 30 * 1024,
};

const shouldUpdateBaseline = process.argv.includes("--update-baseline");

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDelta(delta) {
  if (delta === 0) return "0 B";
  const sign = delta > 0 ? "+" : "-";
  return `${sign}${formatBytes(Math.abs(delta))}`;
}

async function getFileSize(filePath) {
  const buffer = await fs.readFile(filePath);
  return {
    raw: buffer.byteLength,
    gzip: gzipSync(buffer).byteLength,
  };
}

function findAsset(entries, patterns) {
  return [...entries]
    .sort((a, b) => a.gzip - b.gzip || a.file.localeCompare(b.file))
    .find((entry) => patterns.some((pattern) => pattern.test(entry.file)));
}

function isLocalizedContentAsset(file) {
  return LOCALIZED_CONTENT_JS_PATTERN.test(file);
}

function isLazySyntaxAsset(file) {
  return LAZY_SYNTAX_JS_PATTERN.test(file);
}

async function collectMetrics() {
  const files = await fs.readdir(ASSETS_DIR);
  const jsFiles = files.filter((file) => file.endsWith(".js"));
  const cssFiles = files.filter((file) => file.endsWith(".css"));

  const jsSizes = [];
  for (const file of jsFiles) {
    const size = await getFileSize(path.resolve(ASSETS_DIR, file));
    jsSizes.push({ file, ...size });
  }

  const cssSizes = [];
  for (const file of cssFiles) {
    const size = await getFileSize(path.resolve(ASSETS_DIR, file));
    cssSizes.push({ file, ...size });
  }

  const mainJs = findAsset(jsSizes, MAIN_JS_PATTERNS);
  const mainCss = findAsset(cssSizes, MAIN_CSS_PATTERNS);
  const stackBuilderJs = [...jsSizes]
    .filter((entry) => /^stack-builder-.*\.js$/.test(entry.file))
    .sort((a, b) => b.gzip - a.gzip || a.file.localeCompare(b.file))[0];
  const localizedContentJsSizes = jsSizes.filter((entry) => isLocalizedContentAsset(entry.file));
  const lazySyntaxJsSizes = jsSizes.filter((entry) => isLazySyntaxAsset(entry.file));
  const budgetedJsSizes = jsSizes.filter(
    (entry) => !isLocalizedContentAsset(entry.file) && !isLazySyntaxAsset(entry.file),
  );

  if (!mainJs || !mainCss || !stackBuilderJs) {
    throw new Error(
      `Required build assets are missing (main/index JS, main/index CSS, or stack-builder JS). Found JS assets: ${jsFiles.join(", ") || "(none)"}; CSS assets: ${cssFiles.join(", ") || "(none)"}`,
    );
  }

  const largestJs = budgetedJsSizes.reduce((max, current) =>
    current.gzip > max.gzip ? current : max,
  );
  const totalJsRaw = budgetedJsSizes.reduce((sum, item) => sum + item.raw, 0);
  const totalJsGzip = budgetedJsSizes.reduce((sum, item) => sum + item.gzip, 0);
  const localizedContentJsRaw = localizedContentJsSizes.reduce((sum, item) => sum + item.raw, 0);
  const localizedContentJsGzip = localizedContentJsSizes.reduce(
    (sum, item) => sum + item.gzip,
    0,
  );
  const lazySyntaxJsRaw = lazySyntaxJsSizes.reduce((sum, item) => sum + item.raw, 0);
  const lazySyntaxJsGzip = lazySyntaxJsSizes.reduce((sum, item) => sum + item.gzip, 0);

  return {
    generatedAt: new Date().toISOString(),
    assetCount: {
      js: jsSizes.length,
      budgetedJs: budgetedJsSizes.length,
      localizedContentJs: localizedContentJsSizes.length,
      lazySyntaxJs: lazySyntaxJsSizes.length,
      css: cssSizes.length,
    },
    metrics: {
      mainJsRaw: mainJs.raw,
      mainJsGzip: mainJs.gzip,
      mainCssRaw: mainCss.raw,
      mainCssGzip: mainCss.gzip,
      stackBuilderJsRaw: stackBuilderJs.raw,
      stackBuilderJsGzip: stackBuilderJs.gzip,
      largestJsRaw: largestJs.raw,
      largestJsGzip: largestJs.gzip,
      totalJsRaw,
      totalJsGzip,
      localizedContentJsRaw,
      localizedContentJsGzip,
      lazySyntaxJsRaw,
      lazySyntaxJsGzip,
    },
    largestJsChunk: largestJs.file,
    trackedAssets: {
      mainJs: mainJs.file,
      mainCss: mainCss.file,
      stackBuilderJs: stackBuilderJs.file,
    },
    topJsChunksByGzip: [...jsSizes]
      .sort((a, b) => b.gzip - a.gzip)
      .slice(0, 10)
      .map((entry) => ({
        file: entry.file,
        raw: entry.raw,
        gzip: entry.gzip,
      })),
    topLocalizedContentJsChunksByGzip: [...localizedContentJsSizes]
      .sort((a, b) => b.gzip - a.gzip)
      .slice(0, 10)
      .map((entry) => ({
        file: entry.file,
        raw: entry.raw,
        gzip: entry.gzip,
      })),
  };
}

async function ensureReportDir() {
  await fs.mkdir(REPORT_DIR, { recursive: true });
}

function buildSummaryTable(current, baseline) {
  const rows = [
    "| Metric | Baseline | Current | Delta | Allowed Regression | Status |",
    "| --- | ---: | ---: | ---: | ---: | --- |",
  ];

  const failures = [];
  const improvements = [];

  for (const key of TRACKED_KEYS) {
    const currentValue = current.metrics[key];
    const baselineValue = baseline.metrics[key];
    const allowedRegression = baseline.budgets[key];
    const delta = currentValue - baselineValue;

    let status = "OK";
    if (delta > allowedRegression) {
      status = "FAIL";
      failures.push({ key, delta, allowedRegression });
    } else if (delta < 0) {
      status = "IMPROVED";
      improvements.push({ key, delta });
    }

    rows.push(
      `| \`${key}\` | ${formatBytes(baselineValue)} | ${formatBytes(currentValue)} | ${formatDelta(delta)} | ${formatBytes(allowedRegression)} | ${status} |`,
    );
  }

  return { rows, failures, improvements };
}

async function writeSummary(summaryLines) {
  await fs.writeFile(SUMMARY_PATH, `${summaryLines.join("\n")}\n`, "utf8");
}

async function updateBaseline(current) {
  let budgets = { ...DEFAULT_BUDGETS };
  try {
    const existing = JSON.parse(await fs.readFile(BASELINE_PATH, "utf8"));
    if (existing?.budgets) budgets = { ...budgets, ...existing.budgets };
  } catch {
    // Baseline does not exist yet.
  }

  const baseline = {
    updatedAt: new Date().toISOString(),
    metrics: Object.fromEntries(TRACKED_KEYS.map((key) => [key, current.metrics[key]])),
    budgets,
  };

  await fs.writeFile(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`, "utf8");

  const lines = [
    "## Performance Baseline Updated",
    "",
    `Updated baseline file: \`${path.relative(WEB_DIR, BASELINE_PATH)}\``,
    "",
    "| Metric | New Baseline |",
    "| --- | ---: |",
    ...TRACKED_KEYS.map((key) => `| \`${key}\` | ${formatBytes(current.metrics[key])} |`),
  ];
  await writeSummary(lines);
  console.log(lines.join("\n"));
}

async function checkAgainstBaseline(current) {
  const baselineRaw = await fs.readFile(BASELINE_PATH, "utf8");
  const baseline = JSON.parse(baselineRaw);

  for (const key of TRACKED_KEYS) {
    if (typeof baseline?.metrics?.[key] !== "number") {
      throw new Error(`Baseline is missing metric "${key}"`);
    }
    if (typeof baseline?.budgets?.[key] !== "number") {
      throw new Error(`Baseline is missing budget for "${key}"`);
    }
  }

  const { rows, failures, improvements } = buildSummaryTable(current, baseline);

  const lines = [
    "## Performance Budget Report",
    "",
    ...rows,
    "",
    `Largest JS chunk: \`${current.largestJsChunk}\` (${formatBytes(current.metrics.largestJsGzip)} gzip)`,
    `Tracked assets: main JS \`${current.trackedAssets?.mainJs ?? "unknown"}\`, main CSS \`${current.trackedAssets?.mainCss ?? "unknown"}\`, stack builder JS \`${current.trackedAssets?.stackBuilderJs ?? "unknown"}\``,
    `Localized lazy content JS excluded from total budget: ${current.assetCount.localizedContentJs ?? 0} chunks (${formatBytes(current.metrics.localizedContentJsGzip ?? 0)} gzip)`,
    `On-demand syntax JS excluded from total budget: ${current.assetCount.lazySyntaxJs ?? 0} chunks (${formatBytes(current.metrics.lazySyntaxJsGzip ?? 0)} gzip)`,
    "",
  ];

  if (improvements.length > 0) {
    lines.push("### Improvements");
    for (const improvement of improvements) {
      lines.push(`- \`${improvement.key}\`: ${formatDelta(improvement.delta)}`);
    }
    lines.push("");
  }

  if (failures.length > 0) {
    lines.push("### Regressions");
    for (const failure of failures) {
      lines.push(
        `- \`${failure.key}\`: ${formatDelta(failure.delta)} (allowed ${formatBytes(failure.allowedRegression)})`,
      );
    }
  } else {
    lines.push("No budget regressions detected.");
  }

  await writeSummary(lines);
  console.log(lines.join("\n"));

  if (failures.length > 0) {
    process.exit(1);
  }
}

async function main() {
  await ensureReportDir();
  const current = await collectMetrics();
  await fs.writeFile(CURRENT_REPORT_PATH, `${JSON.stringify(current, null, 2)}\n`, "utf8");

  if (shouldUpdateBaseline) {
    await updateBaseline(current);
    return;
  }

  try {
    await fs.access(BASELINE_PATH);
  } catch {
    throw new Error(
      `Missing baseline file at ${path.relative(WEB_DIR, BASELINE_PATH)}. Run "bun run --cwd apps/web perf:baseline" and commit it.`,
    );
  }

  await checkAgainstBaseline(current);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
