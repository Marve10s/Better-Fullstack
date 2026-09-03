import { useCallback, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { TbArrowDown as ArrowDown, TbArrowUp as ArrowUp } from "react-icons/tb";

import type { FixproofBoard } from "@/components/benchmark/fixproof-data";
import type { FixproofRow } from "@/components/benchmark/fixproof-theme";

import {
  FIXPROOF_CARD,
  FIXPROOF_THEME_VARS,
  buildRows,
  formatMinutes,
} from "@/components/benchmark/fixproof-theme";
import { ProviderLogo } from "@/components/home/provider-marks";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

type SortKey = "resolvedIndex" | "progressIndex";

const HEAD_CELL =
  "px-3 py-2.5 font-medium uppercase tracking-[0.14em] text-[10px] text-[var(--fx-label)]";
const BODY_CELL = "px-3 py-3.5 font-mono text-[13px] tabular-nums";
const TRACK_STYLE: CSSProperties = { backgroundColor: "var(--fx-track)" };

/** A focusable "?" that explains one column without leaving the table. */
export function MetricHelp({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip delay={0}>
      <TooltipTrigger
        type="button"
        aria-label={m.fixproofDefinitionAria({ column: label })}
        className="flex size-3.5 shrink-0 cursor-default items-center justify-center rounded-full border border-[var(--fx-edge)] text-[9px] font-bold leading-none text-[var(--fx-label)] transition-colors hover:border-[var(--fx-ink)] hover:text-[var(--fx-ink)]"
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
  const Arrow = active && !descending ? ArrowUp : ArrowDown;

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
            "flex items-center gap-1 uppercase tracking-[0.14em] transition-colors hover:text-[var(--fx-ink)]",
            active && "text-[var(--fx-ink)]",
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
  helpLabel,
  align = "right",
}: {
  label: string;
  help?: string;
  /** Title of the tooltip when it explains something narrower than the column. */
  helpLabel?: string;
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
        {help ? <MetricHelp label={helpLabel ?? label}>{help}</MetricHelp> : null}
      </span>
    </th>
  );
}

/**
 * An index cell: a bar track in the row's vendor hue, then the number. Progress
 * runs at a lower fill so the two index columns stay apart at a glance.
 */
function IndexCell({ value, color, faded }: { value: number; color: string; faded?: boolean }) {
  const fillStyle = useMemo<CSSProperties>(
    () => ({ width: `${Math.max(value, 1)}%`, backgroundColor: color, opacity: faded ? 0.45 : 1 }),
    [value, color, faded],
  );

  return (
    <td className={cn(BODY_CELL, "whitespace-nowrap text-right")}>
      <span
        aria-hidden
        className="relative mr-2.5 hidden h-1.5 w-16 overflow-hidden rounded-sm align-middle sm:inline-block"
        style={TRACK_STYLE}
      >
        <span className="absolute inset-y-0 left-0 rounded-sm" style={fillStyle} />
      </span>
      <span className="inline-block w-7 text-right align-middle font-mono text-[16px] font-bold tabular-nums">
        {value}
      </span>
    </td>
  );
}

function ModelRow({ row }: { row: FixproofRow }) {
  return (
    <tr className="border-t border-[var(--fx-rule)]">
      <th scope="row" className="whitespace-nowrap px-3 py-3.5 text-left font-normal">
        <span className="flex items-center gap-2">
          <ProviderLogo logo={row.logo} />
          <span className="font-mono text-[15px] font-medium">{row.label}</span>
        </span>
        <span className="mt-0.5 block text-[11px] text-[var(--fx-label)]">{row.harness}</span>
      </th>
      <td className={cn(BODY_CELL, "whitespace-nowrap text-left")}>{row.effort}</td>
      <IndexCell value={row.resolvedIndex} color={row.color} />
      <IndexCell value={row.progressIndex} color={row.color} faded />
      <td className={cn(BODY_CELL, "text-right")}>
        {row.resolved} / {row.graded}
      </td>
      <td className={cn(BODY_CELL, "text-right")}>{row.regressions}</td>
      <td className={cn(BODY_CELL, "text-right")}>{row.testEditsReverted}</td>
      <td className={cn(BODY_CELL, "text-right")}>{row.claimedNotDone}</td>
      <td className={cn(BODY_CELL, "text-right")}>{formatMinutes(row.minutes)}</td>
      <td className={cn(BODY_CELL, "whitespace-nowrap text-right text-[var(--fx-label)]")}>
        {row.runDate}
      </td>
      <td className={cn(BODY_CELL, "text-right")}>{row.trials}</td>
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
    const sorted = buildRows(board);
    sorted.sort((a, b) => (descending ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]));
    return sorted;
  }, [board, sortKey, descending]);

  return (
    <div className={cn(FIXPROOF_THEME_VARS, FIXPROOF_CARD, "overflow-hidden")}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1060px] border-collapse text-left">
          <caption className="sr-only">{m.fixproofBoardCaption()}</caption>
          <thead>
            <tr>
              <PlainHeader
                align="left"
                label={m.fixproofColModel()}
                helpLabel={m.fixproofColHarness()}
                help={m.fixproofDefHarness()}
              />
              <PlainHeader align="left" label={m.fixproofColEffort()} />
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
            {rows.map((row) => (
              <ModelRow key={row.key} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
