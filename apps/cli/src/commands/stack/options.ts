import type { OptionCategoryEcosystem } from "@better-fullstack/types";

import { log } from "@clack/prompts";
import pc from "picocolors";

import { listCatalogOptions, searchCatalogOptions } from "@/operations/option-catalog";

function columns(header: string[], rows: string[][]): string {
  const table = [header, ...rows];
  const widths = header.map((_, index) => Math.max(...table.map((row) => row[index].length)));
  const lines = table.map((row) =>
    row
      .map((cell, index) => cell.padEnd(widths[index]))
      .join("  ")
      .trimEnd(),
  );
  return [pc.dim(lines[0]), ...lines.slice(1)].join("\n");
}

export function listCommand(input: {
  category?: string;
  ecosystem?: OptionCategoryEcosystem;
  json: boolean;
}) {
  const result = listCatalogOptions(input);
  if (input.json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  const scope = result.ecosystem ? ` for ${result.ecosystem}` : "";
  if ("categories" in result) {
    log.info(`${result.categories.length} option categories${scope}`);
    log.message(
      columns(
        ["category", "label", "flag", "options"],
        result.categories.map((category) => [
          category.id,
          category.label,
          category.flag ?? "-",
          String(category.optionCount),
        ]),
      ),
    );
    return;
  }

  const { category, options } = result;
  log.info(
    `${category.label} (${category.id}), ${category.selectionMode} select, ${category.flag ?? "no dedicated flag"}`,
  );
  log.message(
    columns(
      ["id", "label", "flag", "aliases"],
      options.map((option) => [
        option.id,
        option.label,
        option.flag ?? "-",
        option.aliases.join(", "),
      ]),
    ),
  );
}

export function searchCommand(input: {
  query: string;
  ecosystem?: OptionCategoryEcosystem;
  json: boolean;
}) {
  const result = searchCatalogOptions(input);
  if (input.json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  if (result.matches.length === 0) {
    log.warn(`No options match "${result.query}".`);
    return;
  }
  log.message(
    columns(
      ["id", "label", "flag", "category", "ecosystems", "aliases"],
      result.matches.map((match) => [
        match.id,
        match.label,
        match.flag ?? "-",
        match.category,
        match.ecosystems.join(", ") || "-",
        match.aliases.join(", "),
      ]),
    ),
  );
}
