import {
  analyzeStackCompatibility,
  getCategoryDisplayName,
  getCategoryOrderForEcosystem,
  getDisabledReason,
  isMultiSelectCategory,
  isOptionCompatible,
  OPTION_CATEGORY_METADATA,
  type CompatibilityCategory,
  type OptionCategory,
} from "@better-fullstack/types";
import { useMemo, useState } from "react";

import { ECOSYSTEMS } from "@/lib/constant";
import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";
import { getStackKeyForCategory } from "@/lib/stack-utils";

type Ecosystem = StackState["ecosystem"];

type SelectCategory = OptionCategory;

type BaselineControl = {
  category: SelectCategory;
  label: string;
};

const DOCS_CATEGORY_EXCLUSIONS = new Set<SelectCategory>([
  "astroIntegration",
  "shadcnBase",
  "shadcnStyle",
  "shadcnIconLibrary",
  "shadcnColorTheme",
  "shadcnBaseColor",
  "shadcnFont",
  "shadcnRadius",
  "packageManager",
  "aiDocs",
  "versionChannel",
  "git",
  "install",
]);

const DOCS_EXTRA_CATEGORIES_BY_ECOSYSTEM: Partial<Record<Ecosystem, readonly SelectCategory[]>> = {
  "react-native": ["packageManager"],
  rust: ["packageManager", "versionChannel"],
  python: ["packageManager", "versionChannel"],
  go: ["packageManager", "versionChannel"],
  java: ["packageManager", "versionChannel"],
  elixir: ["packageManager", "versionChannel"],
};

function getDocsCategories(ecosystem: Ecosystem): SelectCategory[] {
  return [
    ...getCategoryOrderForEcosystem(ecosystem).filter(
      (category) =>
        Boolean(OPTION_CATEGORY_METADATA[category]) && !DOCS_CATEGORY_EXCLUSIONS.has(category),
    ),
    ...(DOCS_EXTRA_CATEGORIES_BY_ECOSYSTEM[ecosystem] ?? []),
  ];
}

const ECOSYSTEM_CATEGORIES = Object.fromEntries(
  ECOSYSTEMS.map((ecosystem) => [ecosystem.id, getDocsCategories(ecosystem.id)]),
) as Record<Ecosystem, SelectCategory[]>;

const BASELINE_CONTROLS: Record<Ecosystem, BaselineControl[]> = {
  typescript: [
    { category: "webFrontend", label: "Frontend" },
    { category: "backend", label: "Backend" },
    { category: "runtime", label: "Runtime" },
    { category: "database", label: "Database" },
    { category: "orm", label: "ORM" },
    { category: "api", label: "API" },
    { category: "auth", label: "Auth" },
    { category: "cssFramework", label: "CSS" },
    { category: "uiLibrary", label: "UI library" },
  ],
  "react-native": [
    { category: "nativeFrontend", label: "Expo app" },
    { category: "mobileNavigation", label: "Navigation" },
    { category: "mobileUI", label: "Mobile UI" },
    { category: "mobileStorage", label: "Storage" },
    { category: "mobileTesting", label: "Testing" },
  ],
  rust: [
    { category: "rustWebFramework", label: "Framework" },
    { category: "rustOrm", label: "ORM" },
    { category: "rustApi", label: "API" },
    { category: "rustLogging", label: "Logging" },
    { category: "rustErrorHandling", label: "Errors" },
  ],
  python: [
    { category: "pythonWebFramework", label: "Framework" },
    { category: "pythonOrm", label: "ORM" },
    { category: "pythonValidation", label: "Validation" },
    { category: "pythonAuth", label: "Auth" },
    { category: "pythonApi", label: "API" },
    { category: "pythonGraphql", label: "GraphQL" },
  ],
  go: [
    { category: "goWebFramework", label: "Framework" },
    { category: "goOrm", label: "ORM" },
    { category: "goApi", label: "API" },
    { category: "goLogging", label: "Logging" },
    { category: "goAuth", label: "Go auth" },
    { category: "auth", label: "Global auth" },
  ],
  java: [
    { category: "javaWebFramework", label: "Framework" },
    { category: "javaBuildTool", label: "Build tool" },
    { category: "javaOrm", label: "ORM" },
    { category: "javaAuth", label: "Auth" },
  ],
  elixir: [
    { category: "elixirWebFramework", label: "Framework" },
    { category: "elixirOrm", label: "Persistence" },
    { category: "elixirAuth", label: "Auth" },
    { category: "elixirApi", label: "API" },
    { category: "elixirRealtime", label: "Realtime" },
  ],
};

const applyCategoryValue = (
  stack: StackState,
  category: SelectCategory,
  optionId: string,
): StackState => {
  const key = getStackKeyForCategory(category);
  const next = { ...stack };

  if (isMultiSelectCategory(category)) {
    (next as unknown as Record<string, string[]>)[key] = optionId === "none" ? [] : [optionId];
  } else {
    (next as unknown as Record<string, string>)[key] = optionId;
  }

  return next;
};

const getCategoryOptions = (category: SelectCategory) => {
  return OPTION_CATEGORY_METADATA[category]?.options ?? [];
};

const getCurrentValue = (stack: StackState, category: SelectCategory): string => {
  const value = stack[getStackKeyForCategory(category)];
  if (Array.isArray(value)) return value[0] ?? "none";
  return value ?? "none";
};

const getInitialCategory = (ecosystem: Ecosystem): SelectCategory => {
  return ECOSYSTEM_CATEGORIES[ecosystem][0];
};

export function CompatibilityMatrix() {
  const [stack, setStack] = useState<StackState>(DEFAULT_STACK);
  const [category, setCategory] = useState<SelectCategory>(
    getInitialCategory(DEFAULT_STACK.ecosystem),
  );

  const ecosystem = stack.ecosystem;
  const categories = ECOSYSTEM_CATEGORIES[ecosystem];
  const controls = BASELINE_CONTROLS[ecosystem];
  const options = getCategoryOptions(category);
  const analysis = analyzeStackCompatibility(stack);

  const rows = useMemo(
    () =>
      options.map((option) => {
        const compatible = isOptionCompatible(stack, category as CompatibilityCategory, option.id);
        const reason = getDisabledReason(stack, category as CompatibilityCategory, option.id);
        const candidate = applyCategoryValue(stack, category, option.id);
        const candidateAnalysis = analyzeStackCompatibility(candidate);
        const changes = candidateAnalysis.changes.map((change) => change.message);

        return {
          id: option.id,
          label: option.label,
          cliValue: option.cliValue,
          compatible,
          reason,
          changes,
        };
      }),
    [category, options, stack],
  );

  const handleEcosystemChange = (nextEcosystem: Ecosystem) => {
    setStack({ ...DEFAULT_STACK, ecosystem: nextEcosystem });
    setCategory(getInitialCategory(nextEcosystem));
  };

  const handleBaselineChange = (controlCategory: SelectCategory, optionId: string) => {
    setStack((current) => applyCategoryValue(current, controlCategory, optionId));
  };

  const handleCategoryChange = (nextCategory: SelectCategory) => {
    setCategory(nextCategory);
  };

  return (
    <div className="not-prose my-8 rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface-elevated)]/70 p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 border-[var(--docs-border-subtle)] border-b pb-4">
        <div>
          <h2 className="font-semibold text-foreground text-xl">Check a Stack Combination</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Start from a default baseline, adjust the key fields, then inspect one option category.
          </p>
        </div>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground">Ecosystem</span>
          <select
            className="h-10 rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)] px-3 text-foreground"
            value={ecosystem}
            onChange={(event) => handleEcosystemChange(event.target.value as Ecosystem)}
          >
            {ECOSYSTEMS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-5 py-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <section className="rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)]/70 p-4">
          <h3 className="font-medium text-foreground">Baseline Stack</h3>
          <p className="mt-1 text-muted-foreground text-xs">
            These fields affect compatibility for the selected category.
          </p>
          <div className="mt-4 grid gap-3">
            {controls.map((control) => {
              const controlOptions = getCategoryOptions(control.category);
              return (
                <label key={control.category} className="grid gap-1.5 text-sm">
                  <span className="font-medium text-muted-foreground">{control.label}</span>
                  <select
                    className="h-9 rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface-elevated)] px-2 text-foreground"
                    value={getCurrentValue(stack, control.category)}
                    onChange={(event) => handleBaselineChange(control.category, event.target.value)}
                  >
                    {controlOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)]/70 p-4">
          <label className="grid gap-2 text-sm">
            <span className="font-medium text-foreground">Category to inspect</span>
            <select
              className="h-10 rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface-elevated)] px-3 text-foreground"
              value={category}
              onChange={(event) => handleCategoryChange(event.target.value as SelectCategory)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {getCategoryDisplayName(item)}
                </option>
              ))}
            </select>
          </label>

          {analysis.changes.length > 0 ? (
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-amber-900 text-xs dark:text-amber-200">
              <div className="font-medium">Current baseline adjustments</div>
              <ul className="mt-2 space-y-1">
                {analysis.changes.map((change) => (
                  <li key={change.category + change.message}>{change.message}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-4 overflow-hidden rounded-lg border border-[var(--docs-border-subtle)]">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[var(--docs-surface)] text-muted-foreground text-xs uppercase">
                <tr>
                  <th className="px-3 py-2 font-medium">Option</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--docs-border-subtle)]">
                {rows.map((row) => (
                  <tr key={row.id} className="bg-[var(--docs-surface-elevated)]/50">
                    <td className="px-3 py-3 align-top">
                      <div className="font-medium text-foreground">{row.label}</div>
                      <div className="font-mono text-muted-foreground text-xs">{row.cliValue}</div>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <span
                        className={
                          row.compatible
                            ? "rounded-full bg-emerald-500/10 px-2 py-1 font-medium text-emerald-700 text-xs dark:text-emerald-300"
                            : "rounded-full bg-red-500/10 px-2 py-1 font-medium text-red-700 text-xs dark:text-red-300"
                        }
                      >
                        {row.compatible ? "Compatible" : "Blocked"}
                      </span>
                    </td>
                    <td className="hidden px-3 py-3 align-top text-muted-foreground text-xs sm:table-cell">
                      {row.reason ? <div>{row.reason}</div> : null}
                      {!row.reason && row.changes.length === 0 ? (
                        <div>No compatibility issues found.</div>
                      ) : null}
                      {row.changes.length > 0 ? (
                        <ul className="space-y-1">
                          {row.changes.map((change) => (
                            <li key={change}>{change}</li>
                          ))}
                        </ul>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
