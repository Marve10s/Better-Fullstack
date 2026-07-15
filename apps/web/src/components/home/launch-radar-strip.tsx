import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Braces,
  Crosshair,
  Layers3,
  Leaf,
  Link2,
  Network,
  Shield,
  Sparkles,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { TechIcon } from "@/components/ui/tech-icon";
import {
  getLaunchRadarOptionLabel,
  hasSeenLaunchRadar,
  LAUNCH_RADAR_GROUPS,
  LAUNCH_RADAR_OPEN_EVENT,
  LAUNCH_RADAR_SEEN_EVENT,
  LAUNCH_RADAR_TOTAL,
  markLaunchRadarSeen,
  registerLaunchRadarVisit,
} from "@/lib/launch-radar";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

type ToolMark =
  | { kind: "icon"; icon: LucideIcon; className: string }
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
};

function LaunchRadarToolMark({ optionId, name }: { optionId: string; name: string }) {
  const override = TOOL_MARK_OVERRIDES[optionId];

  if (!override) {
    return <TechIcon techId={optionId} name={name} className="size-4" />;
  }

  if (override.kind === "monogram") {
    return (
      <>
        <span
          className={cn("font-pixel text-[11px] leading-none", override.className)}
          aria-hidden
        >
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
  const [unread, setUnread] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateUnread = () => setUnread(!hasSeenLaunchRadar(window.localStorage));
    const showModal = () => {
      markLaunchRadarSeen();
      setUnread(false);
      setOpen(true);
    };
    const openFromHash = () => {
      if (window.location.hash === "#whats-new") showModal();
    };

    const seen = hasSeenLaunchRadar(window.localStorage);
    const returningVisitor = registerLaunchRadarVisit(
      window.localStorage,
      window.sessionStorage,
    );
    const openedFromHash = window.location.hash === "#whats-new";
    let autoOpenTimer: number | undefined;

    updateUnread();
    openFromHash();
    if (!seen && returningVisitor && !openedFromHash && !window.navigator.webdriver) {
      autoOpenTimer = window.setTimeout(showModal, 900);
    }
    window.addEventListener(LAUNCH_RADAR_SEEN_EVENT, updateUnread);
    window.addEventListener(LAUNCH_RADAR_OPEN_EVENT, showModal);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      if (autoOpenTimer !== undefined) window.clearTimeout(autoOpenTimer);
      window.removeEventListener(LAUNCH_RADAR_SEEN_EVENT, updateUnread);
      window.removeEventListener(LAUNCH_RADAR_OPEN_EVENT, showModal);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  const showModal = () => {
    markLaunchRadarSeen();
    setUnread(false);
    setOpen(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) markLaunchRadarSeen();
    setOpen(nextOpen);
  };

  return (
    <>
      <section
        id="whats-new"
        aria-labelledby="whats-new-title"
        className="scroll-mt-14 border-edge border-b bg-surface-raised/45 text-ink [color-scheme:light] dark:[color-scheme:dark]"
      >
        <button
          type="button"
          onClick={showModal}
          className="group grid min-h-12 w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 px-4 py-3 text-left transition-colors hover:bg-ink/[0.025] sm:px-8 lg:grid-cols-[7rem_minmax(0,1fr)_auto_auto]"
        >
          <span className="flex items-center gap-2 font-pixel text-[10px] uppercase tracking-[0.16em] text-soft">
            <span
              className={cn(
                "size-1.5 bg-soft/45",
                unread && "bg-[#18D5FF] shadow-[0_0_8px_rgba(24,213,255,0.7)]",
              )}
              aria-hidden
            />
            Drop / {String(LAUNCH_RADAR_TOTAL).padStart(3, "0")}
          </span>

          <span id="whats-new-title" className="truncate font-mono text-xs font-semibold sm:text-sm">
            {m.launchRadarHeadline({ count: LAUNCH_RADAR_TOTAL })}
          </span>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-soft lg:block">
            {LAUNCH_RADAR_GROUPS.map((group) => `${group.name} +${group.count}`).join("  ·  ")}
          </span>

          <span className="flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-soft transition-colors group-hover:text-ink">
            <span className="hidden sm:inline">{m.launchRadarExplore()}</span>
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </button>
      </section>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[min(90svh,48rem)] gap-0 overflow-hidden border-edge bg-surface p-0 shadow-2xl sm:max-w-[56rem]"
        >
          <div className="grid max-h-[min(90svh,48rem)] min-h-0 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <header className="relative isolate overflow-hidden bg-ink px-6 py-7 text-surface sm:px-8 sm:py-9 lg:flex lg:min-h-[38rem] lg:flex-col lg:justify-between">
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
                  <Sparkles className="size-3 text-[#18D5FF]" aria-hidden />
                  {m.launchRadarModalEyebrow()}
                </p>
                <p className="mt-8 font-pixel-grid text-[5.5rem] leading-[0.72] tracking-[-0.1em] text-surface sm:text-[7rem]">
                  {String(LAUNCH_RADAR_TOTAL).padStart(3, "0")}
                </p>
                <div className="mt-6 h-1 w-14 bg-[#18D5FF]" aria-hidden />
              </div>

              <div className="relative mt-10 lg:mt-16">
                <DialogTitle className="max-w-[13ch] text-balance font-mono text-2xl font-semibold leading-tight tracking-[-0.04em] text-surface sm:text-3xl">
                  {m.launchRadarModalTitle()}
                </DialogTitle>
                <DialogDescription className="mt-3 max-w-[30rem] text-pretty font-mono text-[11px] leading-5 text-surface/60 lg:max-w-none">
                  {m.launchRadarModalDescription({ count: LAUNCH_RADAR_TOTAL })}
                </DialogDescription>
              </div>
            </header>

            <div className="min-h-0 overflow-y-auto">
              <div>
                {LAUNCH_RADAR_GROUPS.map((group, index) => (
                  <motion.article
                    key={group.id}
                    initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.06 * index }}
                    className="group relative border-edge border-b px-5 py-5 last:border-b-0 sm:px-7 sm:py-6"
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-0.5 scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                      style={{ backgroundColor: group.accent }}
                      aria-hidden
                    />
                    <div className="grid grid-cols-[2rem_minmax(0,1fr)_auto] gap-x-3 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-x-4">
                      <span className="pt-1 font-pixel text-[9px] tracking-[0.15em] text-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-mono text-base font-semibold tracking-[-0.03em] text-ink sm:text-lg">
                          {group.name}
                        </h3>
                        <p className="mt-1 max-w-[56ch] text-pretty text-xs leading-5 text-soft">
                          {group.description}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          {group.featuredOptionIds.slice(0, 5).map((optionId) => {
                            const label = getLaunchRadarOptionLabel(optionId);
                            return (
                              <span
                                key={optionId}
                                title={label}
                                className="flex size-7 items-center justify-center bg-surface-raised transition-transform duration-200 hover:-translate-y-0.5"
                              >
                                <LaunchRadarToolMark optionId={optionId} name={label} />
                              </span>
                            );
                          })}
                        </div>
                        <Link
                          to="/new"
                          search={{
                            ecosystem: group.id,
                            view: "command",
                            file: "",
                            newOptions: "1",
                          }}
                          className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink underline decoration-transparent underline-offset-4 transition-all hover:gap-2.5 hover:decoration-current"
                        >
                          {m.launchRadarOpenBuilder({ ecosystem: group.name })}
                          <ArrowRight className="size-3" aria-hidden />
                        </Link>
                      </div>
                      <span
                        className="font-pixel-grid text-3xl leading-none tracking-[-0.08em] sm:text-4xl"
                        style={{ color: group.accent }}
                      >
                        +{group.count}
                      </span>
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
