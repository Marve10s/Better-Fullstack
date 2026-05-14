import type { ReactNode } from "react";

type DecisionRow = {
  option?: ReactNode;
  choice?: ReactNode;
  bestFor?: ReactNode;
  tradeoff?: ReactNode;
  tradeoffs?: ReactNode;
  notes?: ReactNode;
};

const EMPTY_ROWS: DecisionRow[] = [];

export function GuideDecisionTable({
  title,
  rows = EMPTY_ROWS,
}: {
  title?: ReactNode;
  rows?: DecisionRow[];
}) {
  return (
    <section className="not-prose my-5 overflow-hidden rounded-md border border-border bg-background">
      {title ? (
        <div className="border-border border-b px-4 py-3 font-mono text-[0.68rem] text-muted-foreground uppercase tracking-[0.06em]">
          {title}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-border border-b bg-muted/30">
              <th className="px-4 py-2 font-mono font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.06em]">
                Choice
              </th>
              <th className="px-4 py-2 font-mono font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.06em]">
                Best for
              </th>
              <th className="px-4 py-2 font-mono font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.06em]">
                Tradeoff
              </th>
              <th className="px-4 py-2 font-mono font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.06em]">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row.option ?? row.choice)} className="border-border border-b last:border-b-0">
                <td className="min-w-36 px-4 py-3 font-medium text-foreground">{row.option ?? row.choice}</td>
                <td className="min-w-44 px-4 py-3 text-muted-foreground">{row.bestFor}</td>
                <td className="min-w-52 px-4 py-3 text-muted-foreground">{row.tradeoff ?? row.tradeoffs}</td>
                <td className="min-w-44 px-4 py-3 text-muted-foreground">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
