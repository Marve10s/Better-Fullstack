import { Tabs } from "@base-ui/react/tabs";
import { PRESET_DEFINITIONS, getPreset } from "@better-fullstack/types";
import { Link } from "@tanstack/react-router";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { TbCheck as Check, TbCopy as Copy } from "react-icons/tb";

import type { TechCategory } from "@/lib/stack/types";

import { TechIcon } from "@/components/ui/tech-icon";
import { getLocalizedPresetTemplate } from "@/lib/i18n/builder-copy";
import { cn } from "@/lib/platform/utils";
import { ECOSYSTEMS, TECH_OPTIONS } from "@/lib/stack/constant";
import { buildPresetStack } from "@/lib/stack/preset-stack";
import { generateStackCommand, getStackKeyForCategory } from "@/lib/stack/stack-utils";
import { ICON_REGISTRY } from "@/lib/stack/tech-icons";
import { m } from "@/paraglide/messages.js";

const STAGE_PRESETS: ReadonlyArray<{ presetId: string; categories: TechCategory[] }> = [
  { presetId: "t3", categories: ["webFrontend", "api", "orm", "database", "auth"] },
  {
    presetId: "python-fastapi",
    categories: ["pythonWebFramework", "pythonOrm", "pythonValidation", "pythonQuality", "database"],
  },
  {
    presetId: "rust-fullstack",
    categories: ["rustWebFramework", "rustFrontend", "rustOrm", "database"],
  },
  { presetId: "go-gin", categories: ["goWebFramework", "goOrm", "database"] },
];

const STAGES = STAGE_PRESETS.flatMap(({ presetId, categories }) => {
  const preset = getPreset(presetId);
  const stack = buildPresetStack(presetId);
  if (!preset || !stack) return [];

  const ecosystem = ECOSYSTEMS.find((entry) => entry.id === stack.ecosystem);
  if (!ecosystem) return [];

  const parts = categories.flatMap((category) => {
    const selected = stack[getStackKeyForCategory(category)];
    const ids = Array.isArray(selected) ? selected : [selected];
    return (TECH_OPTIONS[category] ?? [])
      .filter((option) => ids.includes(option.id) && ICON_REGISTRY[option.id])
      .map((option) => ({ id: option.id, name: option.name }));
  });

  return [
    {
      id: presetId,
      preset,
      ecosystem: { id: ecosystem.id, name: ecosystem.name },
      parts,
      command: generateStackCommand(stack),
    },
  ];
});

type Stage = (typeof STAGES)[number];

const PRESETS_SEARCH = { view: "presets", file: "" } as const;
const CARD = "home-stage-card rounded-3xl bg-surface text-ink shadow-xl shadow-black/20";
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2 focus-visible:ring-offset-brand";

function CommandCard({ stage }: { stage: Stage }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(stage.command).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  };

  return (
    <div className={cn(CARD, "flex flex-col p-3 sm:p-4")}>
      <div className="relative min-h-48 flex-1 overflow-hidden rounded-2xl bg-[#11110f] text-[#f5f1e6] [color-scheme:dark]">
        <code className="absolute inset-0 block overflow-hidden break-words p-4 font-mono text-xs leading-6 sm:p-5 sm:text-[13px]">
          <span aria-hidden className="text-brand">
            ${" "}
          </span>
          {stage.command}
        </code>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#11110f] to-transparent"
        />
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Link
          to="/new"
          search={{ preset: stage.id, view: "command" }}
          className={cn(
            "inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-surface transition hover:opacity-90 sm:flex-1",
            FOCUS_RING,
          )}
        >
          {m.homeStageOpen()}
        </Link>
        <button
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink/[0.07] px-5 text-sm font-semibold text-ink transition hover:bg-ink/[0.12] active:scale-[0.98] dark:bg-white/10 dark:hover:bg-white/15",
            FOCUS_RING,
          )}
        >
          {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
          {m.homeCopyCommand()}
        </button>
      </div>
    </div>
  );
}

function StagePanel({ stage, active }: { stage: Stage; active: boolean }) {
  return (
    <div
      role="tabpanel"
      aria-label={stage.preset.name}
      data-active={active}
      inert={!active}
      className="home-stage-panel col-start-1 row-start-1 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-4"
    >
      <div className={cn(CARD, "flex flex-col p-3 sm:p-4")}>
        <div className="px-2 pt-2 pb-4 lg:sr-only">
          <h3 className="text-2xl font-semibold tracking-[-0.03em]">{stage.preset.name}</h3>
          <p className="mt-1.5 text-sm text-soft">
            {getLocalizedPresetTemplate(stage.preset).description}
          </p>
        </div>
        <ul className="flex flex-1 flex-wrap gap-2">
          {stage.parts.map((part) => (
            <li
              key={part.id}
              className={cn(
                "flex min-h-32 flex-1 flex-col items-start justify-between gap-6 rounded-2xl bg-surface-raised p-4 sm:min-h-36 sm:p-5",
                stage.parts.length === 4 ? "basis-[45%]" : "basis-[45%] sm:basis-[30%]",
              )}
            >
              <TechIcon techId={part.id} name={part.name} className="size-10 sm:size-12" />
              <span className="text-[15px] font-semibold tracking-[-0.01em] sm:text-lg">
                {part.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <CommandCard stage={stage} />
    </div>
  );
}

export default function StackStage() {
  const [active, setActive] = useState(STAGES[0]?.id ?? "");
  const [autoAdvancing, setAutoAdvancing] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const showNext = () => {
    const index = STAGES.findIndex((stage) => stage.id === active);
    setActive(STAGES[(index + 1) % STAGES.length]?.id ?? active);
  };

  return (
    <section className="px-2 pt-20 sm:px-3 sm:pt-28">
      <div className="mx-auto max-w-3xl px-3 text-center">
        <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
          {m.homeStageTitle()}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-soft sm:text-lg">
          {m.homeStageBody()}
        </p>
      </div>

      <Tabs.Root
        ref={ref}
        value={active}
        onValueChange={(value) => setActive(String(value))}
        onPointerDownCapture={() => setAutoAdvancing(false)}
        onKeyDownCapture={() => setAutoAdvancing(false)}
        className="home-expand group/stage relative isolate mx-auto mt-10 max-w-[1576px] overflow-hidden rounded-[28px] bg-brand p-3 text-[#0a0a0a] sm:mt-14 sm:rounded-[36px] sm:p-4"
      >
        <div aria-hidden className="home-stage-dots pointer-events-none absolute inset-0 -z-10" />

        <Tabs.List className="grid grid-cols-2 items-start gap-2 lg:grid-cols-4 lg:gap-3">
          {STAGES.map((stage) => (
            <Tabs.Tab
              key={stage.id}
              value={stage.id}
              className={cn(
                "group/tab block w-full min-w-0 cursor-pointer rounded-2xl bg-surface/55 px-3 py-2.5 text-left text-ink/75 transition-[background-color,color,box-shadow] duration-500 hover:bg-surface/80 data-active:bg-surface data-active:text-ink data-active:shadow-xl data-active:shadow-black/20 sm:px-4 sm:py-3",
                FOCUS_RING,
              )}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <TechIcon
                  techId={stage.ecosystem.id}
                  name={stage.ecosystem.name}
                  className="size-5 shrink-0"
                />
                <span className="truncate">{stage.ecosystem.name}</span>
              </span>
              <span
                aria-hidden
                className="hidden grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-data-active/tab:grid-rows-[1fr] motion-reduce:transition-none lg:grid"
              >
                <span className="block min-h-0 overflow-hidden opacity-0 transition-opacity duration-300 group-data-active/tab:opacity-100 group-data-active/tab:delay-200 group-data-active/tab:duration-500 motion-reduce:transition-none">
                  <span className="relative mt-3 block h-px bg-ink/15">
                    {active === stage.id && autoAdvancing && inView && (
                      <span
                        className="home-stage-progress absolute inset-x-0 -top-px block h-0.5 origin-left bg-ink group-hover/stage:[animation-play-state:paused] group-focus-within/stage:[animation-play-state:paused]"
                        onAnimationEnd={showNext}
                      />
                    )}
                  </span>
                  <span className="mt-3 block text-lg font-semibold leading-tight tracking-[-0.02em] xl:text-xl">
                    {stage.preset.name}
                  </span>
                  <span className="mt-1.5 block pb-1 text-sm leading-snug text-soft">
                    {getLocalizedPresetTemplate(stage.preset).description}
                  </span>
                </span>
              </span>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <div className="grid pt-3 sm:pt-4">
          {STAGES.map((stage) => (
            <StagePanel key={stage.id} stage={stage} active={active === stage.id} />
          ))}
        </div>
      </Tabs.Root>

      <p className="mt-6 text-center text-sm text-soft">
        <Link
          to="/new"
          search={PRESETS_SEARCH}
          className="font-medium text-ink underline decoration-brand decoration-2 underline-offset-4"
        >
          {m.homeStageAllPresets({ count: PRESET_DEFINITIONS.length })}
        </Link>
      </p>
    </section>
  );
}
