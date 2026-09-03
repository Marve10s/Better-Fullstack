import { useCallback, useMemo, useState, type ReactNode } from "react";
import { TbArrowDown as ArrowDown, TbArrowUp as ArrowUp } from "react-icons/tb";

import type { FixproofBoard, FixproofModel } from "@/components/benchmark/fixproof-data";

import { FIXPROOF_THEME_VARS, formatMinutes } from "@/components/benchmark/fixproof-outcome";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

type SortKey = "resolvedIndex" | "progressIndex";

const HEAD_CELL =
  "px-3 py-2.5 font-medium uppercase tracking-[0.14em] text-[10px] text-[#71706a] dark:text-[#8f8d84]";
const BODY_CELL = "px-3 py-3.5 font-mono text-[13px] tabular-nums";

/** A focusable "?" that explains one column without leaving the table. */
export function MetricHelp({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip delay={0}>
      <TooltipTrigger
        type="button"
        aria-label={m.fixproofDefinitionAria({ column: label })}
        className="flex size-3.5 shrink-0 cursor-default items-center justify-center rounded-full border border-[#d9d8d2] text-[9px] font-bold leading-none text-[#71706a] transition-colors hover:border-foreground hover:text-foreground dark:border-[rgba(237,235,228,0.2)] dark:text-[#8f8d84] dark:hover:border-[#dad8d0] dark:hover:text-[#dad8d0]"
      >
        ?
      </TooltipTrigger>
      <TooltipContent className="max-w-[19rem] normal-case tracking-normal">
        <p className="font-semibold">{label}</p>
        <p className="mt-1 font-normal">{children}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function SortHeader({
  label,
  help,
  sortKey,
  active,
  descending,
  onSort,
}: {
  label: string;
  help: string;
  sortKey: SortKey;
  active: boolean;
  descending: boolean;
  onSort: (key: SortKey) => void;
}) {
  const handleClick = useCallback(() => onSort(sortKey), [onSort, sortKey]);
  const Arrow = descending ? ArrowDown : ArrowUp;

  return (
    <th
      scope="col"
      aria-sort={active ? (descending ? "descending" : "ascending") : "none"}
      className={cn(HEAD_CELL, "text-right")}
    >
      <span className="flex items-center justify-end gap-1.5">
        <button
          type="button"
          onClick={handleClick}
          aria-label={m.fixproofSortAria({ column: label })}
          className={cn(
            "flex items-center gap-1 uppercase tracking-[0.14em] transition-colors hover:text-foreground",
            active && "text-foreground",
          )}
        >
          {label}
          <Arrow aria-hidden className={cn("size-3", active ? "opacity-100" : "opacity-35")} />
        </button>
        <MetricHelp label={label}>{help}</MetricHelp>
      </span>
    </th>
  );
}

function PlainHeader({
  label,
  help,
  align = "right",
}: {
  label: string;
  help?: string;
  align?: "left" | "right";
}) {
  return (
    <th scope="col" className={cn(HEAD_CELL, align === "left" ? "text-left" : "text-right")}>
      <span
        className={cn(
          "flex items-center gap-1.5",
          align === "left" ? "justify-start" : "justify-end",
        )}
      >
        {label}
        {help ? <MetricHelp label={label}>{help}</MetricHelp> : null}
      </span>
    </th>
  );
}

function ModelRow({ model }: { model: FixproofModel }) {
  return (
    <tr className="border-t border-[var(--fx-rule)]">
      <th
        scope="row"
        className="whitespace-nowrap px-3 py-3.5 text-left font-mono text-[15px] font-medium"
      >
        {model.label}{" "}
        <span className="font-normal text-[12px] text-[#9c9a93] dark:text-[#6c6a61]">
          [{model.effort}]
        </span>
      </th>
      <td className={cn(BODY_CELL, "whitespace-nowrap text-left text-muted-foreground")}>
        {model.harness}
      </td>
      <td className={cn(BODY_CELL, "text-right text-[16px] font-semibold")}>
        {model.resolvedIndex}
      </td>
      <td className={cn(BODY_CELL, "text-right text-[16px] font-semibold")}>
        {model.progressIndex}
      </td>
      <td className={cn(BODY_CELL, "text-right")}>
        {model.resolved} / {model.graded}
      </td>
      <td className={cn(BODY_CELL, "text-right")}>{model.regressions}</td>
      <td className={cn(BODY_CELL, "text-right")}>{model.testEditsReverted}</td>
      <td className={cn(BODY_CELL, "text-right")}>{model.claimedNotDone}</td>
      <td className={cn(BODY_CELL, "text-right")}>{formatMinutes(model.medianAgentSeconds)}</td>
      <td className={cn(BODY_CELL, "whitespace-nowrap text-right text-muted-foreground")}>
        {model.runDate}
      </td>
      <td className={cn(BODY_CELL, "text-right")}>{model.trials}</td>
    </tr>
  );
}

export function FixproofBoardTable({ board }: { board: FixproofBoard }) {
  const [sortKey, setSortKey] = useState<SortKey>("resolvedIndex");
  const [descending, setDescending] = useState(true);

  const onSort = useCallback(
    (key: SortKey) => {
      if (key === sortKey) {
        setDescending((current) => !current);
        return;
      }
      setSortKey(key);
      setDescending(true);
    },
    [sortKey],
  );

  const rows = useMemo(() => {
    const sorted = [...board.models];
    sorted.sort((a, b) => (descending ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]));
    return sorted;
  }, [board.models, sortKey, descending]);

  return (
    <div
      className={cn(
        FIXPROOF_THEME_VARS,
        "overflow-hidden rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] text-[#1b1a17] dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0]",
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1060px] border-collapse text-left">
          <caption className="sr-only">{m.fixproofBoardCaption()}</caption>
          <thead>
            <tr>
              <PlainHeader align="left" label={m.fixproofColModel()} />
              <PlainHeader
                align="left"
                label={m.fixproofColHarness()}
                help={m.fixproofDefHarness()}
              />
              <SortHeader
                label={m.fixproofColResolvedIndex()}
                help={m.fixproofDefResolvedIndex()}
                sortKey="resolvedIndex"
                active={sortKey === "resolvedIndex"}
                descending={descending}
                onSort={onSort}
              />
              <SortHeader
                label={m.fixproofColProgressIndex()}
                help={m.fixproofDefProgressIndex()}
                sortKey="progressIndex"
                active={sortKey === "progressIndex"}
                descending={descending}
                onSort={onSort}
              />
              <PlainHeader
                label={m.fixproofColSolvedOverGraded()}
                help={m.fixproofDefSolvedOverGraded()}
              />
              <PlainHeader label={m.fixproofColRegressions()} help={m.fixproofDefRegressions()} />
              <PlainHeader label={m.fixproofColTestEdits()} help={m.fixproofDefTestEdits()} />
              <PlainHeader label={m.fixproofColClaimedOnly()} help={m.fixproofDefClaimedOnly()} />
              <PlainHeader
                label={m.fixproofColMedianMinutes()}
                help={m.fixproofDefMedianMinutes()}
              />
              <PlainHeader label={m.fixproofColRunDate()} />
              <PlainHeader label={m.fixproofColTrials()} help={m.fixproofDefTrials()} />
            </tr>
          </thead>
          <tbody>
            {rows.map((model) => (
              <ModelRow key={model.id} model={model} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
