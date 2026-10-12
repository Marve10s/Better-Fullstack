import type { OptionCategoryEcosystem } from "@better-fullstack/types";

import { log } from "@clack/prompts";
import pc from "picocolors";

import { listCatalogOptions, searchCatalogOptions } from "@/operations/option-catalog";
import { explainOption } from "@/operations/option-explain";

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
      ["id", "label", "flag", "legacy ids"],
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
      ["id", "label", "flag", "category", "ecosystems", "legacy ids"],
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

export function explainCommand(input: {
  option: string;
  with?: string[];
  ecosystem?: OptionCategoryEcosystem;
  json: boolean;
}) {
  const result = explainOption(input);
  if (input.json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  const { option, evidence, evaluation } = result;
  log.info(
    `${option.label} (${option.id}), ${option.categoryLabel} (${option.category}), ${option.flag ?? "no dedicated flag"}`,
  );
  log.message(
    [
      `Ecosystems: ${option.ecosystems.join(", ") || "-"}`,
      `Legacy ids: ${option.aliases.join(", ") || "-"}`,
      evidence
        ? `Evidence: ${evidence.level} (declared ${evidence.declaredLevel}, ${evidence.maturity}). ${evidence.limitation}`
        : "Evidence: not in the capability inventory",
    ].join("\n"),
  );

  const sections = [
    {
      title: "Requires",
      header: ["category", "reason"],
      rows: result.requires.map((entry) => [entry.category, entry.reason]),
    },
    {
      title: "Excludes",
      header: ["option", "reason"],
      rows: result.excludes.map((entry) => [`${entry.category}:${entry.optionId}`, entry.reason]),
    },
    {
      title: "Excluded by",
      header: ["option", "reason"],
      rows: result.excludedBy.map((entry) => [`${entry.category}:${entry.optionId}`, entry.reason]),
    },
  ];
  for (const { title, header, rows } of sections) {
    log.message(
      rows.length > 0
        ? `${pc.bold(title)}\n${columns(header, rows)}`
        : `${pc.bold(title)}: none found`,
    );
  }

  const picks = result.with.map((entry) => `${entry.category}:${entry.id}`);
  const stack = `the default ${result.ecosystem} stack${picks.length > 0 ? ` with ${picks.join(", ")}` : ""}`;
  if (evaluation.allowed) {
    log.success(`${option.id} fits ${stack}.`);
  } else {
    log.warn(
      [
        `${option.id} does not fit ${stack}:`,
        ...evaluation.failures.map((failure) => `  ${failure.reason}`),
      ].join("\n"),
    );
  }
  log.message(
    `Compatible ${option.category} alternatives: ${evaluation.alternatives.map((alternative) => alternative.id).join(", ") || "none"}`,
  );
  log.message(pc.dim(result.limitations.join("\n")));
}
