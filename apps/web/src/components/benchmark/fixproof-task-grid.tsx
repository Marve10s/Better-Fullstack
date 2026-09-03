import { useMemo, type CSSProperties } from "react";

import type {
  FixproofBoard,
  FixproofModel,
  FixproofRun,
  FixproofTask,
} from "@/components/benchmark/fixproof-data";
import type { FixproofCellState } from "@/components/benchmark/fixproof-outcome";

import {
  CELL_STYLE,
  CellMark,
  FIXPROOF_THEME_VARS,
  cellState,
  formatMinutes,
  formatPercent,
  stateLabel,
  stateNote,
} from "@/components/benchmark/fixproof-outcome";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

const CELL_BASE =
  "relative flex h-11 w-full items-center justify-center overflow-hidden rounded-md border transition-transform duration-150 hover:scale-[1.06]";

const STICKY_LABEL =
  "sticky left-0 z-10 bg-[#faf9f5] pr-3 text-left align-middle dark:bg-[#161614]";

const MICRO_LABEL =
  "font-medium uppercase tracking-[0.14em] text-[10px] text-[#71706a] dark:text-[#8f8d84]";

interface TaskGroup {
  id: string;
  label: string;
  tasks: readonly FixproofTask[];
}

function groupTasks(board: FixproofBoard): readonly TaskGroup[] {
  return board.categories
    .map((category) => ({
      id: category.id,
      label: category.label,
      tasks: board.tasks.filter((task) => task.category === category.id),
    }))
    .filter((group) => group.tasks.length > 0);
}

function sourceLabel(task: FixproofTask): string {
  return task.source === "public" ? m.fixproofSourcePublic() : m.fixproofSourcePrivate();
}

function GridCell({
  model,
  task,
  run,
  categoryLabel,
}: {
  model: FixproofModel;
  task: FixproofTask;
  run: FixproofRun;
  categoryLabel: string;
}) {
  const state: FixproofCellState = cellState(run);
  const progressStyle = useMemo<CSSProperties | undefined>(
    () =>
      state === "partial" && run.progress !== null
        ? { width: `${Math.round(run.progress * 100)}%`, backgroundColor: "var(--fx-partial)" }
        : undefined,
    [state, run.progress],
  );

  const summary = `${model.label}, ${task.id}: ${stateLabel(state)}`;

  return (
    <Tooltip delay={0}>
      <TooltipTrigger
        type="button"
        className="mx-auto block w-full max-w-[3.5rem] cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className={CELL_BASE} style={CELL_STYLE[state]}>
          <CellMark state={state} progress={run.progress} />
          {progressStyle ? (
            <span
              className="pointer-events-none absolute bottom-0 left-0 h-[3px]"
              style={progressStyle}
            />
          ) : null}
        </span>
        <span className="sr-only">{summary}</span>
      </TooltipTrigger>
      <TooltipContent className="max-w-[17rem] normal-case tracking-normal">
        <p className="font-semibold">
          {task.id} · {stateLabel(state)}
        </p>
        <p className="mt-1 font-normal">{stateNote(state)}</p>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-normal">
          <dt>{m.fixproofCategoryLabel()}</dt>
          <dd>{categoryLabel}</dd>
          <dt>{m.fixproofDifficultyLabel()}</dt>
          <dd>{task.difficulty}</dd>
          <dt>{m.fixproofRequirementsLabel()}</dt>
          <dd>{task.requirements}</dd>
          <dt>{m.fixproofSourceLabel()}</dt>
          <dd>{sourceLabel(task)}</dd>
          {run.progress === null ? null : (
            <>
              <dt>{m.fixproofProgressLabel()}</dt>
              <dd>{formatPercent(run.progress)}</dd>
            </>
          )}
          {run.checks === null ? null : (
            <>
              <dt>{m.fixproofChecksLabel()}</dt>
              <dd>{run.checks}</dd>
            </>
          )}
          {run.agentSeconds === null ? null : (
            <>
              <dt>{m.fixproofDurationLabel()}</dt>
              <dd>{formatMinutes(run.agentSeconds)} min</dd>
            </>
          )}
        </dl>
      </TooltipContent>
    </Tooltip>
  );
}

function LegendItem({ state }: { state: FixproofCellState }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border"
        style={CELL_STYLE[state]}
      >
        <CellMark state={state} progress={null} />
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-[13px] text-foreground">{stateLabel(state)}</span>
        <span className="block text-[12px] leading-snug text-muted-foreground">
          {stateNote(state)}
        </span>
      </span>
    </li>
  );
}

const LEGEND_STATES: readonly FixproofCellState[] = [
  "solved",
  "partial",
  "failed",
  "timeout",
  "excluded",
  "pending",
];

export function FixproofTaskGrid({ board }: { board: FixproofBoard }) {
  const groups = useMemo(() => groupTasks(board), [board]);
  const orderedTasks = useMemo(() => groups.flatMap((group) => group.tasks), [groups]);
  const categoryOf = useMemo(
    () => new Map(groups.flatMap((group) => group.tasks.map((task) => [task.id, group.label]))),
    [groups],
  );

  return (
    <div
      className={cn(
        FIXPROOF_THEME_VARS,
        "rounded-2xl border border-[#e1e0d8] bg-[#faf9f5] p-4 text-[#1b1a17] sm:p-6 dark:border-[rgba(237,235,228,0.10)] dark:bg-[#161614] dark:text-[#dad8d0]",
      )}
    >
      <section aria-label={m.fixproofGridRegionLabel()} className="overflow-x-auto" tabIndex={0}>
        <table className="w-full border-separate border-spacing-1.5">
          <caption className="sr-only">{m.fixproofGridCaption()}</caption>
          <thead>
            <tr>
              <td aria-hidden className={cn(STICKY_LABEL, "w-[13rem]")} />
              {groups.map((group) => (
                <th
                  key={group.id}
                  scope="colgroup"
                  colSpan={group.tasks.length}
                  className={cn(MICRO_LABEL, "whitespace-nowrap px-1 pb-1 text-left")}
                >
                  {group.label}
                </th>
              ))}
            </tr>
            <tr>
              <td aria-hidden className={STICKY_LABEL} />
              {orderedTasks.map((task) => (
                <th
                  key={task.id}
                  scope="col"
                  className="w-[3.25rem] pb-1 text-center align-bottom font-mono text-[12px] font-medium"
                >
                  {task.id}
                  <span className="block font-normal text-[10px] text-[#9c9a93] dark:text-[#6c6a61]">
                    d{task.difficulty}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {board.models.map((model) => (
              <tr key={model.id}>
                <th
                  scope="row"
                  className={cn(
                    STICKY_LABEL,
                    "whitespace-nowrap font-mono text-[13px] font-medium",
                  )}
                >
                  {model.label}{" "}
                  <span className="font-normal text-[11px] text-[#9c9a93] dark:text-[#6c6a61]">
                    [{model.effort}]
                  </span>
                </th>
                {orderedTasks.map((task) => {
                  const run = model.runs.find((entry) => entry.task === task.id);
                  if (!run) {
                    return <td key={task.id} aria-hidden className="align-middle" />;
                  }
                  return (
                    <td key={task.id} className="align-middle">
                      <GridCell
                        model={model}
                        task={task}
                        run={run}
                        categoryLabel={categoryOf.get(task.id) ?? ""}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-6 border-t border-[var(--fx-rule)] pt-5">
        <p className={MICRO_LABEL}>{m.fixproofLegendHeading()}</p>
        <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {LEGEND_STATES.map((state) => (
            <LegendItem key={state} state={state} />
          ))}
        </ul>
      </div>
    </div>
  );
}
