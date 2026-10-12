import {
  CATEGORY_ORDER,
  CLI_FLAG_GROUP_DEFINITIONS,
  EcosystemSchema,
  OPTION_CATEGORY_METADATA,
  type OptionCategory,
  type OptionCategoryEcosystem,
  type OptionMetadata,
  type OptionSelectionMode,
  getCategoryDisplayName,
  getCategoryOrderForEcosystem,
  isMultiEcosystemMobileCategory,
} from "@better-fullstack/types";

import { getMcpSchemaCategory } from "@/operations/stack-helpers";

export type CatalogCategory = {
  id: OptionCategory;
  label: string;
  schemaCategory: string | null;
  selectionMode: OptionSelectionMode;
  flag: string | null;
  ecosystems: OptionCategoryEcosystem[];
  optionCount: number;
};

export type CatalogOption = {
  id: string;
  label: string;
  aliases: string[];
  flag: string | null;
};

export type CatalogMatch = CatalogOption & {
  category: OptionCategory;
  categoryLabel: string;
  ecosystems: OptionCategoryEcosystem[];
};

export type CatalogListResult =
  | { ecosystem: OptionCategoryEcosystem | null; categories: CatalogCategory[] }
  | {
      ecosystem: OptionCategoryEcosystem | null;
      category: CatalogCategory;
      options: CatalogOption[];
    };

export type CatalogSearchResult = {
  query: string;
  ecosystem: OptionCategoryEcosystem | null;
  matches: CatalogMatch[];
};

type CategoryFlag = { name: string; boolean: boolean };

const CATEGORY_FLAGS = new Map<string, CategoryFlag>(
  CLI_FLAG_GROUP_DEFINITIONS.flatMap((group) =>
    group.flags.flatMap(({ flag, source, configKey }) => {
      const categories: readonly string[] =
        source.kind === "category"
          ? [source.category]
          : source.kind === "categories"
            ? source.categories
            : source.kind === "boolean" && configKey
              ? [configKey]
              : [];
      return categories.map(
        (category) => [category, { name: flag, boolean: source.kind === "boolean" }] as const,
      );
    }),
  ),
);

// Kotlin, Swift, and Flutter apps exist only as multi-ecosystem Stack Parts.
export function ecosystemCategories(ecosystem: OptionCategoryEcosystem): readonly OptionCategory[] {
  const order = getCategoryOrderForEcosystem(ecosystem);
  return ecosystem === "react-native"
    ? order.filter((category) => !isMultiEcosystemMobileCategory(category))
    : order;
}

const CATEGORY_ECOSYSTEMS = new Map(
  CATEGORY_ORDER.map((category) => [
    category,
    EcosystemSchema.options.filter((ecosystem) =>
      ecosystemCategories(ecosystem).includes(category),
    ),
  ]),
);

function toCategory(category: OptionCategory): CatalogCategory {
  const metadata = OPTION_CATEGORY_METADATA[category];
  const flag = CATEGORY_FLAGS.get(category);
  return {
    id: category,
    label: getCategoryDisplayName(category),
    schemaCategory: getMcpSchemaCategory(category),
    selectionMode: metadata.selectionMode,
    flag: flag ? `--${flag.name}` : null,
    ecosystems: CATEGORY_ECOSYSTEMS.get(category) ?? [],
    optionCount: metadata.options.length,
  };
}

function optionFlag(category: OptionCategory, option: OptionMetadata): string | null {
  const flag = CATEGORY_FLAGS.get(category);
  if (!flag) return null;
  if (flag.boolean) return option.cliValue === "false" ? `--no-${flag.name}` : `--${flag.name}`;
  return `--${flag.name} ${option.cliValue}`;
}

export function toCatalogOption(category: OptionCategory, option: OptionMetadata): CatalogOption {
  return {
    id: option.id,
    label: option.label,
    aliases: [...option.aliases],
    flag: optionFlag(category, option),
  };
}

const compact = (value: string) => value.toLowerCase().replaceAll("-", "");

function unknownCategoryMessage(category: string, ecosystem: OptionCategoryEcosystem | undefined) {
  const valid = ecosystem ? ecosystemCategories(ecosystem) : CATEGORY_ORDER;
  const suggestion = valid.find(
    (candidate) =>
      compact(candidate) === compact(category) ||
      compact(CATEGORY_FLAGS.get(candidate)?.name ?? "") === compact(category),
  );
  const scope = ecosystem ? ` for ${ecosystem}` : "";
  if (suggestion)
    return `Unknown option category "${category}"${scope}. Did you mean "${suggestion}"?`;
  if (ecosystem && CATEGORY_ORDER.some((candidate) => candidate === category)) {
    return `Category "${category}" is not part of the ${ecosystem} ecosystem. Valid categories${scope}: ${valid.join(", ")}`;
  }
  return `Unknown option category "${category}". Valid categories${scope}: ${valid.join(", ")}`;
}

export function listCatalogOptions(input: {
  category?: string;
  ecosystem?: OptionCategoryEcosystem;
}): CatalogListResult {
  const ecosystem = input.ecosystem ?? null;
  const categories = input.ecosystem ? ecosystemCategories(input.ecosystem) : CATEGORY_ORDER;
  if (input.category === undefined) {
    return { ecosystem, categories: categories.map(toCategory) };
  }

  const category = categories.find((candidate) => candidate === input.category);
  if (!category) throw new Error(unknownCategoryMessage(input.category, input.ecosystem));
  return {
    ecosystem,
    category: toCategory(category),
    options: OPTION_CATEGORY_METADATA[category].options.map((option) =>
      toCatalogOption(category, option),
    ),
  };
}

export function toCatalogMatch(category: OptionCategory, option: OptionMetadata): CatalogMatch {
  return {
    ...toCatalogOption(category, option),
    category,
    categoryLabel: getCategoryDisplayName(category),
    ecosystems: CATEGORY_ECOSYSTEMS.get(category) ?? [],
  };
}

// 0: exact id, alias, or label; 1: prefix; 2: substring; null: no match.
function matchRank(option: OptionMetadata, query: string): number | null {
  const fields = [option.id, option.label, ...option.aliases].map((field) => field.toLowerCase());
  if (fields.includes(query)) return 0;
  if (fields.some((field) => field.startsWith(query))) return 1;
  if (fields.some((field) => field.includes(query))) return 2;
  return null;
}

export function searchCatalogOptions(input: {
  query: string;
  ecosystem?: OptionCategoryEcosystem;
}): CatalogSearchResult {
  const query = input.query.trim().toLowerCase();
  const categories = input.ecosystem ? ecosystemCategories(input.ecosystem) : CATEGORY_ORDER;
  const ranked = categories.flatMap((category) =>
    OPTION_CATEGORY_METADATA[category].options.flatMap((option) => {
      const rank = matchRank(option, query);
      if (rank === null) return [];
      return [{ rank, match: toCatalogMatch(category, option) }];
    }),
  );
  return {
    query: input.query.trim(),
    ecosystem: input.ecosystem ?? null,
    matches: ranked.sort((a, b) => a.rank - b.rank).map(({ match }) => match),
  };
}
