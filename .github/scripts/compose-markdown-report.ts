#!/usr/bin/env bun

const encoder = new TextEncoder();
const truncationNotice =
  "\n\n_Report truncated to fit the pull request body limit. See the workflow logs for the full output._";

export function composeMarkdownReport(parts: string[], maxBytes: number) {
  if (!Number.isInteger(maxBytes) || maxBytes <= encoder.encode(truncationNotice).length) {
    throw new Error(`Invalid report size limit: ${maxBytes}`);
  }

  const report = parts.join("\n\n");
  const encodedReport = encoder.encode(report);
  if (encodedReport.length <= maxBytes) return report;

  const prefixLimit = maxBytes - encoder.encode(truncationNotice).length;
  let prefixEnd = prefixLimit;
  let prefix = "";

  while (prefixEnd > 0) {
    try {
      prefix = new TextDecoder("utf-8", { fatal: true }).decode(encodedReport.slice(0, prefixEnd));
      break;
    } catch {
      prefixEnd--;
    }
  }

  return `${prefix.trimEnd()}${truncationNotice}`;
}

if (import.meta.main) {
  const [maxBytesValue, ...paths] = process.argv.slice(2);
  const maxBytes = Number(maxBytesValue);
  if (!maxBytesValue || paths.length === 0) {
    throw new Error(
      "Usage: compose-markdown-report.ts <max-bytes> <markdown-path> [markdown-path...]",
    );
  }

  const parts = await Promise.all(paths.map((path) => Bun.file(path).text()));
  process.stdout.write(composeMarkdownReport(parts, maxBytes));
}
