import {
  CATEGORY_ORDER,
  OPTION_CATEGORY_METADATA,
  STACK_SELECTION_OPTION_CATEGORY_BY_KEY,
  analyzeStackCompatibility,
  cloneDefaultStackSelection,
  evaluateCompatibility,
  getCapabilityInventory,
  getCategoryDisplayName,
  getDisabledReason,
  type CompatibilityInput,
  type CompatibilityIssue,
  type OptionCategory,
  type OptionCategoryEcosystem,
} from "@better-fullstack/types";

import {
  type CatalogMatch,
  type CatalogOption,
  ecosystemCategories,
  searchCatalogOptions,
  toCatalogMatch,
  toCatalogOption,
} from "@/operations/option-catalog";

export type ExplainRequirement = {
  category: OptionCategory;
  categoryLabel: string;
  reason: string;
};

export type ExplainRule = ExplainRequirement & {
  optionId: string;
  label: string;
};

export type ExplainResult = {
  schemaVersion: 1;
  option: CatalogMatch;
  ecosystem: OptionCategoryEcosystem;
  with: CatalogMatch[];
  evidence: {
    level: string;
    declaredLevel: string;
    maturity: string;
    freshness: string;
    limitation: string;
  } | null;
  requires: ExplainRequirement[];
  excludes: ExplainRule[];
  excludedBy: ExplainRule[];
  evaluation: {
    allowed: boolean;
    failures: { category: string | null; optionId: string | null; reason: string }[];
    alternatives: CatalogOption[];
  };
  limitations: string[];
};

type StackKey = keyof typeof STACK_SELECTION_OPTION_CATEGORY_BY_KEY;

const STACK_KEY_BY_CATEGORY = new Map(
  Object.entries(STACK_SELECTION_OPTION_CATEGORY_BY_KEY).map(
    ([key, category]) => [category, key as StackKey] as const,
  ),
);

const DERIVATION_LIMITATION =
  "Rules are found by changing one selection at a time on the evaluated stack. A rule that only applies when two or more other selections change together is not listed.";
const REJECTED_LIMITATION =
  "The option is rejected on the evaluated stack, so other options that would also reject it are not listed.";
const CREATE_CHECKS_LIMITATION =
  "The create command also rejects some explicit flag combinations with its own messages, such as a database flag next to Convex. Those checks are not part of the shared rules and are not listed.";

function select(
  stack: CompatibilityInput,
  category: OptionCategory,
  optionId: string,
): CompatibilityInput {
  const key = STACK_KEY_BY_CATEGORY.get(category);
  if (!key) return stack;
  const current: unknown = stack[key];
  if (!Array.isArray(current)) return { ...stack, [key]: optionId };
  if (optionId === "none") return { ...stack, [key]: [] };
  const kept =
    OPTION_CATEGORY_METADATA[category].selectionMode === "multiple"
      ? current.filter((entry) => entry !== "none" && entry !== optionId)
      : [];
  return { ...stack, [key]: [...kept, optionId] };
}

function clear(stack: CompatibilityInput, category: OptionCategory): CompatibilityInput {
  const key = STACK_KEY_BY_CATEGORY.get(category);
  const hasNone = OPTION_CATEGORY_METADATA[category].options.some((option) => option.id === "none");
  return key && (hasNone || Array.isArray(stack[key])) ? select(stack, category, "none") : stack;
}

function buildStack(
  ecosystem: OptionCategoryEcosystem,
  selections: readonly CatalogMatch[],
): CompatibilityInput {
  const { stackMode: _mode, stackPartSpecs: _specs, ...defaults } = cloneDefaultStackSelection();
  const applySelections = (stack: CompatibilityInput) =>
    selections.reduce((next, { category, id }) => select(next, category, id), stack);
  const chosen = applySelections({ ...defaults, ecosystem });
  const { adjustedStack } = analyzeStackCompatibility(chosen);
  return applySelections(adjustedStack ? { ...chosen, ...adjustedStack } : chosen);
}

function formatMatches(matches: readonly CatalogMatch[]) {
  const names = matches.slice(0, 8).map((match) => `${match.category}:${match.id}`);
  const more = matches.length > names.length ? `, and ${matches.length - names.length} more` : "";
  return `${names.join(", ")}${more}`;
}

function resolveCatalogOption(value: string, ecosystem?: OptionCategoryEcosystem): CatalogMatch {
  const categories = ecosystem ? ecosystemCategories(ecosystem) : CATEGORY_ORDER;
  const separator = value.indexOf(":");
  const scope = separator === -1 ? null : value.slice(0, separator);
  const optionId = separator === -1 ? value : value.slice(separator + 1);
  if (scope !== null && !categories.some((category) => category === scope)) {
    const where = ecosystem ? ` in the ${ecosystem} ecosystem` : "";
    throw new Error(
      `Unknown option category "${scope}"${where}. Run \`list\` to see category IDs.`,
    );
  }

  const matches = categories
    .filter((category) => scope === null || category === scope)
    .flatMap((category) =>
      OPTION_CATEGORY_METADATA[category].options
        .filter((option) => option.id === optionId || option.aliases.includes(optionId))
        .map((option) => toCatalogMatch(category, option)),
    );
  const [match] = matches;
  if (match && matches.length === 1) return match;
  if (matches.length > 1) {
    throw new Error(
      `"${value}" names an option in ${matches.length} categories. Prefix it with its category: ${formatMatches(matches)}.`,
    );
  }

  const suggestions = searchCatalogOptions({ query: optionId, ecosystem }).matches;
  const hint =
    suggestions.length > 0
      ? `Did you mean ${formatMatches(suggestions)}?`
      : "Run `search <text>` to find option IDs.";
  throw new Error(`Unknown option "${value}". ${hint}`);
}

function evidenceFor(ecosystem: OptionCategoryEcosystem, option: CatalogMatch) {
  const record = getCapabilityInventory().find(
    (entry) =>
      entry.ecosystem === ecosystem &&
      entry.category === option.category &&
      entry.optionId === option.id,
  );
  return record
    ? {
        level: record.evidenceLevel,
        declaredLevel: record.declaredEvidenceLevel,
        maturity: record.maturity,
        freshness: record.freshness,
        limitation: record.limitation,
      }
    : null;
}

function rule(category: OptionCategory, optionId: string, reason: string): ExplainRule {
  const label =
    OPTION_CATEGORY_METADATA[category].options.find((option) => option.id === optionId)?.label ??
    optionId;
  return { category, categoryLabel: getCategoryDisplayName(category), optionId, label, reason };
}

function addRule(
  found: { requires: ExplainRequirement[]; rules: ExplainRule[] },
  category: OptionCategory,
  optionId: string,
  reason: string,
) {
  if (optionId !== "none") {
    found.rules.push(rule(category, optionId, reason));
    return;
  }
  if (!found.requires.some((known) => known.category === category && known.reason === reason)) {
    found.requires.push({ category, categoryLabel: getCategoryDisplayName(category), reason });
  }
}

const issueKey = (issue: CompatibilityIssue) =>
  `${issue.category}:${issue.optionId}:${issue.message}`;

function resolveSelections(values: readonly string[], ecosystem: OptionCategoryEcosystem) {
  const selections = values.map((value) => resolveCatalogOption(value, ecosystem));
  for (const [index, { category, id }] of selections.entries()) {
    if (!STACK_KEY_BY_CATEGORY.has(category)) {
      throw new Error(
        `${category}:${id} is selected through a Stack Part binding and cannot be applied with --with.`,
      );
    }
    const other = selections
      .slice(0, index)
      .find((earlier) => earlier.category === category && earlier.id !== id);
    if (other && OPTION_CATEGORY_METADATA[category].selectionMode === "single") {
      throw new Error(
        `The stack selects both ${other.id} and ${id} for ${category}, which takes one option.`,
      );
    }
  }
  return selections;
}

export function explainOption(input: {
  option: string;
  with?: readonly string[];
  ecosystem?: OptionCategoryEcosystem;
}): ExplainResult {
  const option = resolveCatalogOption(input.option, input.ecosystem);
  if (!STACK_KEY_BY_CATEGORY.has(option.category)) {
    throw new Error(
      `${option.category}:${option.id} is selected through a Stack Part binding, which explain cannot evaluate. Use \`create --dry-run\` with \`--part\` to check it.`,
    );
  }
  const ecosystem = input.ecosystem ?? option.ecosystems[0];
  if (!ecosystem) {
    throw new Error(`Option category "${option.category}" is not part of any ecosystem.`);
  }
  const selections = resolveSelections(input.with ?? [], ecosystem);
  const stack = buildStack(ecosystem, selections);
  const withOption = select(stack, option.category, option.id);
  const withoutOption = clear(stack, option.category);
  const rejectedOnStack = getDisabledReason(stack, option.category, option.id) !== null;

  const requires: ExplainRequirement[] = [];
  const excludes: ExplainRule[] = [];
  const excludedBy: ExplainRule[] = [];
  const varied = ecosystemCategories(ecosystem).filter(
    (category) => category !== option.category && STACK_KEY_BY_CATEGORY.has(category),
  );
  for (const category of varied) {
    for (const { id } of OPTION_CATEGORY_METADATA[category].options) {
      const blocks = getDisabledReason(withOption, category, id);
      if (blocks && !getDisabledReason(withoutOption, category, id)) {
        addRule({ requires, rules: excludes }, category, id, blocks);
      }
      if (rejectedOnStack) continue;
      const blockedBy = getDisabledReason(select(stack, category, id), option.category, option.id);
      if (blockedBy) addRule({ requires, rules: excludedBy }, category, id, blockedBy);
    }
  }

  const known = new Set(evaluateCompatibility(withoutOption).issues.map(issueKey));
  const failuresFor = (optionId: string) => {
    const candidate = select(stack, option.category, optionId);
    const failures = evaluateCompatibility(candidate)
      .issues.filter((issue) => !known.has(issueKey(issue)))
      .map((issue) => ({
        category: issue.category ?? null,
        optionId: issue.optionId ?? null,
        reason: issue.message,
      }));
    const disabled = getDisabledReason(candidate, option.category, optionId);
    if (disabled && !failures.some((failure) => failure.reason === disabled)) {
      failures.push({ category: option.category, optionId, reason: disabled });
    }
    return failures;
  };
  const failures = failuresFor(option.id);
  const alternatives = OPTION_CATEGORY_METADATA[option.category].options
    .filter(({ id }) => id !== option.id && id !== "none" && failuresFor(id).length === 0)
    .map((alternative) => toCatalogOption(option.category, alternative));
  const unvaried = ecosystemCategories(ecosystem).filter(
    (category) => !STACK_KEY_BY_CATEGORY.has(category),
  );

  return {
    schemaVersion: 1,
    option,
    ecosystem,
    with: selections,
    evidence: evidenceFor(ecosystem, option),
    requires,
    excludes,
    excludedBy,
    evaluation: { allowed: failures.length === 0, failures, alternatives },
    limitations: [
      DERIVATION_LIMITATION,
      ...(rejectedOnStack ? [REJECTED_LIMITATION] : []),
      ...(unvaried.length > 0
        ? [
            `Categories selected only through Stack Part bindings are not varied, explained, or accepted by --with: ${unvaried.join(", ")}.`,
          ]
        : []),
      CREATE_CHECKS_LIMITATION,
    ],
  };
}
