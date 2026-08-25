import type { IconType } from "react-icons";

import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  TbActivity as Activity,
  TbArrowRight as ArrowRight,
  TbBraces as Braces,
  TbBus as Bus,
  TbCamera as Camera,
  TbCrosshair as Crosshair,
  TbStack3 as Layers3,
  TbLeaf as Leaf,
  TbLibraryPlus as LibraryPlus,
  TbLink as Link2,
  TbNetwork as Network,
  TbRefresh as RefreshCw,
  TbShield as Shield,
  TbRipple as Waves,
  TbWand as Wand2,
  TbX as X,
  TbBolt as Zap,
} from "react-icons/tb";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { TechIcon } from "@/components/ui/tech-icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  getLaunchRadarOptionLabel,
  LAUNCH_RADAR_GROUPS,
  LAUNCH_RADAR_OPEN_EVENT,
  LAUNCH_RADAR_TOTAL,
  markLaunchRadarSeen,
} from "@/lib/content/launch-radar";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

type ToolMark =
  | { kind: "icon"; icon: IconType; className: string }
  | { kind: "monogram"; monogram: string; className: string };

const TOOL_MARK_OVERRIDES: Readonly<Record<string, ToolMark>> = {
  yew: { kind: "icon", icon: Leaf, className: "text-emerald-500" },
  warp: { kind: "icon", icon: Waves, className: "text-sky-500" },
  salvo: { kind: "icon", icon: Crosshair, className: "text-orange-500" },
  jsonrpsee: { kind: "icon", icon: Braces, className: "text-violet-500" },
  "go-zero": { kind: "monogram", monogram: "0", className: "text-cyan-500" },
  kratos: { kind: "monogram", monogram: "K", className: "text-indigo-500" },
  "connect-go": { kind: "icon", icon: Link2, className: "text-blue-500" },
  ash: { kind: "icon", icon: Layers3, className: "text-fuchsia-500" },
  bandit: { kind: "icon", icon: Shield, className: "text-orange-500" },
  libcluster: { kind: "icon", icon: Network, className: "text-violet-500" },
  "expo-camera": { kind: "icon", icon: Camera, className: "text-emerald-500" },
  fastendpoints: { kind: "icon", icon: Zap, className: "text-amber-500" },
  polly: { kind: "icon", icon: RefreshCw, className: "text-teal-500" },
  masstransit: { kind: "icon", icon: Bus, className: "text-blue-500" },
  "magic-onion": { kind: "icon", icon: Wand2, className: "text-purple-500" },
  "application-insights": { kind: "icon", icon: Activity, className: "text-sky-500" },
};

// Featured ids whose icon lives in the registry under a different tech id
// (e.g. the .NET MongoDB driver reuses the MongoDB mark).
const TECH_ID_ALIASES: Readonly<Record<string, string>> = {
  "mongodb-driver": "mongodb",
};

function LaunchRadarToolMark({ optionId, name }: { optionId: string; name: string }) {
  const override = TOOL_MARK_OVERRIDES[optionId];

  if (!override) {
    return (
      <TechIcon techId={TECH_ID_ALIASES[optionId] ?? optionId} name={name} className="size-4" />
    );
  }

  if (override.kind === "monogram") {
    return (
      <>
        <span className={cn("font-pixel text-[11px] leading-none", override.className)} aria-hidden>
          {override.monogram}
        </span>
        <span className="sr-only">{name} icon</span>
      </>
    );
  }

  const Icon = override.icon;
  return (
    <>
      <Icon className={cn("size-4", override.className)} aria-hidden />
      <span className="sr-only">{name} icon</span>
    </>
  );
}

export default function LaunchRadarStrip() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const showModal = () => {
      markLaunchRadarSeen();
      setOpen(true);
    };
    const openFromHash = () => {
      if (window.location.hash === "#whats-new") showModal();
    };

    openFromHash();
    window.addEventListener(LAUNCH_RADAR_OPEN_EVENT, showModal);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.removeEventListener(LAUNCH_RADAR_OPEN_EVENT, showModal);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) markLaunchRadarSeen();
    setOpen(nextOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[min(94svh,52rem)] gap-0 overflow-hidden border-edge bg-surface p-0 shadow-2xl sm:max-w-[68rem]"
        >
          <div className="grid max-h-[min(94svh,52rem)] min-h-0 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <header className="relative isolate overflow-hidden bg-ink px-6 py-6 text-surface sm:px-7 lg:flex lg:flex-col lg:justify-between">
              <DialogClose className="absolute top-4 right-4 z-10 flex size-8 cursor-pointer items-center justify-center text-surface/55 transition-colors hover:bg-surface/10 hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18D5FF]">
                <X className="size-4" aria-hidden />
                <span className="sr-only">{m.uiClose()}</span>
              </DialogClose>
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
                aria-hidden
              />
              <div className="relative">
                <p className="flex items-center gap-2 font-pixel text-[10px] uppercase tracking-[0.18em] text-surface/60">
                  <LibraryPlus className="size-3 text-[#18D5FF]" aria-hidden />
                  {m.launchRadarModalEyebrow()}
                </p>
                <p className="mt-6 font-pixel-grid text-[4.5rem] leading-[0.72] tracking-[-0.1em] text-surface sm:text-[5.5rem]">
                  {String(LAUNCH_RADAR_TOTAL).padStart(3, "0")}
                </p>
                <div className="mt-6 h-1 w-14 bg-[#18D5FF]" aria-hidden />
              </div>

              <div className="relative mt-8">
                <DialogTitle className="max-w-[13ch] text-balance font-mono text-xl font-semibold leading-tight tracking-[-0.04em] text-surface sm:text-2xl">
                  {m.launchRadarModalTitle()}
                </DialogTitle>
                <DialogDescription className="mt-3 max-w-[30rem] text-pretty font-mono text-[11px] leading-5 text-surface/60 lg:max-w-none">
                  {m.launchRadarModalDescription({ count: LAUNCH_RADAR_TOTAL })}
                </DialogDescription>
              </div>
            </header>

            <div className="min-h-0 overflow-y-auto lg:overflow-visible">
              <div className="grid h-full sm:auto-rows-fr sm:grid-cols-2">
                {LAUNCH_RADAR_GROUPS.map((group, index) => (
                  <motion.article
                    key={group.id}
                    initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.05 * index }}
                    className="group relative flex flex-col justify-center border-edge border-b px-4 py-3.5 sm:px-5 sm:odd:border-r sm:last:odd:col-span-2 sm:last:odd:border-r-0"
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-0.5 scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                      style={{ backgroundColor: group.accent }}
                      aria-hidden
                    />
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="flex items-center gap-2 font-mono text-sm font-semibold tracking-[-0.03em] text-ink">
                        <span className="font-pixel text-[9px] tracking-[0.15em] text-soft">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <TechIcon techId={group.id} name={group.name} className="size-4" />
                        {group.name}
                      </h3>
                      <span
                        className="font-pixel-grid text-2xl leading-none tracking-[-0.08em]"
                        style={{ color: group.accent }}
                      >
                        +{group.count}
                      </span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {group.featuredOptionIds.slice(0, 6).map((optionId) => {
                        const label = getLaunchRadarOptionLabel(optionId);
                        return (
                          <Tooltip key={optionId} delay={0}>
                            <TooltipTrigger className="flex size-6 cursor-default items-center justify-center bg-surface-raised transition-transform duration-200 hover:-translate-y-0.5">
                              <LaunchRadarToolMark optionId={optionId} name={label} />
                            </TooltipTrigger>
                            <TooltipContent className="font-mono text-[11px]">
                              {label}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                      <Link
                        to="/new"
                        search={{
                          ecosystem: group.id,
                          view: "command",
                          file: "",
                        }}
                        className="ml-auto inline-flex items-center gap-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink underline decoration-transparent underline-offset-4 transition-all hover:gap-2 hover:decoration-current"
                        aria-label={m.launchRadarOpenBuilder({ ecosystem: group.name })}
                      >
                        {m.launchRadarExplore()}
                        <ArrowRight className="size-3" aria-hidden />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
