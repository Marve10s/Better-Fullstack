import {
  getCategoryDisplayName,
  getCategoryOrderForEcosystem,
  OPTION_CATEGORY_METADATA,
  type OptionCategoryEcosystem,
} from "@better-fullstack/types";

type OptionReferenceRow = {
  ecosystem: OptionCategoryEcosystem;
  title: string;
  href: string;
  scope: string;
};

const OPTION_REFERENCE_ROWS: OptionReferenceRow[] = [
  {
    ecosystem: "typescript",
    title: "TypeScript Options",
    href: "/docs/reference/options/typescript/",
    scope:
      "TypeScript web categories, UI, integrations, deploy, examples, and workflow flags.",
  },
  {
    ecosystem: "react-native",
    title: "React Native Options",
    href: "/docs/reference/options/react-native/",
    scope: "Expo native frontend, mobile integrations, auth, AI docs, and workflow flags.",
  },
  {
    ecosystem: "rust",
    title: "Rust Options",
    href: "/docs/reference/options/rust/",
    scope: "Rust backend, WASM frontend, API, CLI, libraries, services, and workflow flags.",
  },
  {
    ecosystem: "python",
    title: "Python Options",
    href: "/docs/reference/options/python/",
    scope: "Python web, ORM, validation, AI, API, queues, services, and workflow flags.",
  },
  {
    ecosystem: "go",
    title: "Go Options",
    href: "/docs/reference/options/go/",
    scope: "Go backend, ORM, API, CLI, logging, auth, services, and workflow flags.",
  },
  {
    ecosystem: "java",
    title: "Java Options",
    href: "/docs/reference/options/java/",
    scope: "Java framework, build, persistence, auth, libraries, services, and workflow flags.",
  },
  {
    ecosystem: "elixir",
    title: "Elixir Options",
    href: "/docs/reference/options/elixir/",
    scope: "Elixir Phoenix, Ecto, auth, API, realtime, jobs, services, and workflow flags.",
  },
];

function getEcosystemStats(ecosystem: OptionCategoryEcosystem) {
  const categories = getCategoryOrderForEcosystem(ecosystem);
  const optionCount = categories.reduce(
    (sum, category) => sum + OPTION_CATEGORY_METADATA[category].options.length,
    0,
  );

  return { categories, optionCount };
}

export function OptionReferenceSummary() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface-elevated)]/70 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <thead className="border-[var(--docs-border-subtle)] border-b bg-[var(--docs-surface)] text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-4 py-2 font-medium">Section</th>
              <th className="px-4 py-2 font-medium">Scope</th>
              <th className="px-4 py-2 font-medium">Categories</th>
              <th className="px-4 py-2 font-medium">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--docs-border-subtle)]">
            {OPTION_REFERENCE_ROWS.map((row) => {
              const stats = getEcosystemStats(row.ecosystem);
              return (
                <tr key={row.ecosystem}>
                  <td className="min-w-44 px-4 py-3 align-top">
                    <a
                      href={row.href}
                      className="font-medium text-[var(--docs-link)] underline decoration-[var(--docs-border-strong)] underline-offset-4 hover:decoration-current"
                    >
                      {row.title}
                    </a>
                  </td>
                  <td className="min-w-80 px-4 py-3 align-top text-muted-foreground">
                    {row.scope}
                  </td>
                  <td className="px-4 py-3 align-top font-mono text-foreground">
                    {stats.categories.length}
                  </td>
                  <td className="px-4 py-3 align-top font-mono text-foreground">
                    {stats.optionCount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function OptionCategoryTable({
  ecosystem,
}: {
  ecosystem: OptionCategoryEcosystem;
}) {
  const categories = getCategoryOrderForEcosystem(ecosystem);

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface-elevated)]/70 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <thead className="border-[var(--docs-border-subtle)] border-b bg-[var(--docs-surface)] text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">Mode</th>
              <th className="px-4 py-2 font-medium">Accepted values</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--docs-border-subtle)]">
            {categories.map((category) => {
              const metadata = OPTION_CATEGORY_METADATA[category];
              return (
                <tr key={category}>
                  <td className="min-w-48 px-4 py-3 align-top">
                    <div className="font-medium text-foreground">
                      {getCategoryDisplayName(category)}
                    </div>
                    <code className="mt-1 inline-flex rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)] px-1.5 py-0.5 font-mono text-[0.72rem] text-muted-foreground">
                      {category}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-top font-mono text-muted-foreground text-xs">
                    {metadata.selectionMode}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                      {metadata.options.map((option) => (
                        <li
                          key={option.id}
                          className="list-none rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)] px-2 py-1"
                        >
                          <code className="font-mono text-[0.75rem] text-foreground">
                            {option.cliValue}
                          </code>
                          {option.aliases.length ? (
                            <span className="ml-1 text-[0.72rem] text-muted-foreground">
                              aliases: {option.aliases.join(", ")}
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
