import { CLI_FLAG_GROUPS_BY_ID } from "@/lib/docs/cli-flags-data";

/**
 * Renders a CLI flag reference table for a single flag group. Data is generated
 * from the shared schemas in `@better-fullstack/types` (see
 * `scripts/generate-cli-flags-data.ts`), so accepted values and defaults stay
 * in sync with the real generator surface instead of being hand-maintained.
 */
export function CliFlagTable({ group }: { group: string }) {
  const data = CLI_FLAG_GROUPS_BY_ID[group];

  if (!data) {
    return null;
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface-elevated)]/70 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <thead className="border-[var(--docs-border-subtle)] border-b bg-[var(--docs-surface)] text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-4 py-2 font-medium">Flag</th>
              <th className="px-4 py-2 font-medium">Accepted values</th>
              <th className="px-4 py-2 font-medium">Default</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--docs-border-subtle)]">
            {data.flags.map((flag) => (
              <tr key={flag.flag}>
                <td className="min-w-52 px-4 py-3 align-top">
                  <code className="inline-flex rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)] px-1.5 py-0.5 font-mono text-[0.75rem] text-foreground">
                    {flag.flag}
                  </code>
                  {flag.multiple ? (
                    <span className="ml-2 text-[0.68rem] text-muted-foreground uppercase">
                      multiple
                    </span>
                  ) : null}
                  <div className="mt-1 text-muted-foreground text-xs">{flag.summary}</div>
                </td>
                <td className="px-4 py-3 align-top">
                  {flag.values.length > 0 ? (
                    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                      {flag.values.map((value) => (
                        <li
                          key={value}
                          className="list-none rounded-md border border-[var(--docs-border-subtle)] bg-[var(--docs-surface)] px-2 py-1"
                        >
                          <code className="font-mono text-[0.75rem] text-foreground">{value}</code>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted-foreground text-xs">{flag.valueHint}</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  {flag.defaultValue ? (
                    <code className="font-mono text-[0.75rem] text-muted-foreground">
                      {flag.defaultValue}
                    </code>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
