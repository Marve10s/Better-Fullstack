#!/usr/bin/env bun

const encoder = new TextEncoder();
const truncationNotice =
  "\n\n_Report truncated to fit the pull request body limit. See the workflow logs for the full output._";

interface Fence {
  character: "`" | "~";
  length: number;
}

function findOpenFence(markdown: string) {
  let openFence: Fence | undefined;

  for (const line of markdown.split("\n")) {
    if (openFence) {
      const closingFence = line.match(/^ {0,3}(`{3,}|~{3,})\s*$/)?.[1];
      if (closingFence?.[0] === openFence.character && closingFence.length >= openFence.length) {
        openFence = undefined;
      }
      continue;
    }

    const openingFence = line.match(/^ {0,3}(`{3,}|~{3,})/)?.[1];
    const character = openingFence?.[0];
    if (openingFence && (character === "`" || character === "~")) {
      openFence = { character, length: openingFence.length };
    }
  }

  return openFence;
}

function longestFenceLength(markdown: string) {
  let longest = 0;
  for (const match of markdown.matchAll(/^ {0,3}(`{3,}|~{3,})/gm)) {
    longest = Math.max(longest, match[1]?.length ?? 0);
  }
  return longest;
}

export function composeMarkdownReport(parts: string[], maxBytes: number) {
  const noticeBytes = encoder.encode(truncationNotice).length;
  if (!Number.isInteger(maxBytes) || maxBytes <= noticeBytes) {
    throw new Error(`Invalid report size limit: ${maxBytes}`);
  }

  const report = parts.join("\n\n");
  const encodedReport = encoder.encode(report);
  if (encodedReport.length <= maxBytes) return report;

  const fenceReserve = longestFenceLength(report) + 2;
  const suffixReserve = noticeBytes + fenceReserve;
  if (maxBytes <= suffixReserve) {
    throw new Error(`Invalid report size limit: ${maxBytes}`);
  }

  const prefixLimit = maxBytes - suffixReserve;
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

  const openFence = findOpenFence(prefix);
  const fenceClosure = openFence ? `\n${openFence.character.repeat(openFence.length)}\n` : "";
  return `${prefix.trimEnd()}${fenceClosure}${truncationNotice}`;
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
