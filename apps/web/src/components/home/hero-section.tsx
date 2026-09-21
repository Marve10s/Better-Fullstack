import { Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import {
  TbArrowNarrowRight as ArrowNarrowRight,
  TbArrowRight as ArrowRight,
  TbCheck as Check,
  TbCopy as Copy,
  TbAppWindow as AppWindow,
  TbDeviceMobile as DeviceMobile,
  TbServer as Server,
  TbStack2 as Stack,
} from "react-icons/tb";

import { type Scene, sceneImage, useHeroScene, useThemePair } from "@/components/home/hero-scene";
import { LIKED_BY } from "@/components/home/testimonials-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/platform/utils";
import { PACKAGE_MANAGER_COMMANDS } from "@/lib/project/home-display-data";
import { m } from "@/paraglide/messages.js";

const PMS = ["bun", "pnpm", "npm", "yarn"] as const;
type PM = (typeof PMS)[number];

const ACCENT_TEXT = "text-ink dark:text-brand";

/**
 * A shape names what you are building. The CLI then asks which language or
 * platform and only the questions that shape needs, so no stack choice is
 * hidden behind the short command.
 */
const SHAPES = [
  { id: "fullstack", label: m.homeStarterShapeFullstack, icon: Stack, flags: "" },
  { id: "frontend", label: m.homeStarterShapeFrontend, icon: AppWindow, flags: "--shape frontend" },
  { id: "backend", label: m.homeStarterShapeBackend, icon: Server, flags: "--shape backend" },
  { id: "mobile", label: m.homeStarterShapeMobile, icon: DeviceMobile, flags: "--shape mobile" },
] as const;

type ShapeId = (typeof SHAPES)[number]["id"];

const WORD_STAGGER_SECONDS = 0.09;

function HeroWords({ text, from = 0 }: { text: string; from?: number }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      {index > 0 && " "}
      <span
        className="hero-word"
        style={{ animationDelay: `${(from + index) * WORD_STAGGER_SECONDS}s` }}
      >
        {word}
      </span>
    </Fragment>
  ));
}

function HeroBackdrop({ scene }: { scene: Scene }) {
  const image =
    "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-in-out";
  const style = { objectPosition: `${scene.focus} 100%` };
  const show = useThemePair();

  return (
    <div
      aria-hidden
      className="hero-backdrop pointer-events-none absolute inset-x-0 bottom-0 -z-10 aspect-[2/1] min-h-[26rem]"
    >
      {show.day && (
        <img
          src={sceneImage(scene, "day")}
          alt=""
          decoding="async"
          style={style}
          className={cn(image, "opacity-100 dark:opacity-0")}
        />
      )}
      {show.night && (
        <img
          src={sceneImage(scene, "night")}
          alt=""
          decoding="async"
          style={style}
          className={cn(image, "opacity-0 dark:opacity-100")}
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--surface)_0%,color-mix(in_oklab,var(--surface)_70%,transparent)_7%,color-mix(in_oklab,var(--surface)_30%,transparent)_16%,transparent_30%,transparent_88%,var(--surface)_100%)]" />
    </div>
  );
}

export default function HeroSection() {
  const [shape, setShape] = useState<ShapeId>("fullstack");
  const [pm, setPm] = useState<PM>("bun");
  const [copied, setCopied] = useState(false);
  const scene = useHeroScene();

  const flags = SHAPES.find((entry) => entry.id === shape)?.flags ?? "";
  const command = [PACKAGE_MANAGER_COMMANDS[pm], flags].filter(Boolean).join(" ");

  const copy = () => {
    navigator.clipboard.writeText(command).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  };

  return (
    <section className="relative isolate overflow-hidden bg-surface text-ink">
      {scene && <HeroBackdrop scene={scene} />}
      <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-3xl flex-col items-center justify-center px-4 pt-16 pb-[clamp(15rem,27vw,26rem)] sm:pt-20">
        <h1
          className="text-balance text-center font-mono font-bold tracking-[-0.045em] text-ink"
          style={{ fontSize: "clamp(2.25rem, 6.5vw, 4.5rem)", lineHeight: 1 }}
        >
          <HeroWords text={m.homeStarterTitleA()} />{" "}
          <span className={cn("italic", ACCENT_TEXT)}>
            <HeroWords
              text={m.homeStarterTitleB()}
              from={m.homeStarterTitleA().split(" ").length}
            />
          </span>
        </h1>

        <p
          style={{ animationDelay: "0.45s" }}
          className="hero-rise mt-5 max-w-2xl whitespace-pre-line text-center text-sm leading-relaxed text-soft sm:mt-6 sm:text-base"
        >
          {m
            .homeStarterSubtitle()
            .split("→")
            .map((part, index) => (
              <Fragment key={part}>
                {index > 0 && (
                  <ArrowNarrowRight
                    aria-hidden
                    className={cn("mx-1 inline size-5 align-middle stroke-[2.25]", ACCENT_TEXT)}
                  />
                )}
                {part.split(/(MCP)/).map((chunk, chunkIndex) =>
                  chunk === "MCP" ? (
                    <a
                      key={`${chunk}-${chunkIndex}`}
                      href="/docs/ai/mcp"
                      className={cn(
                        "font-medium underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-ink dark:hover:text-brand",
                        ACCENT_TEXT,
                      )}
                    >
                      {chunk}
                    </a>
                  ) : (
                    <Fragment key={`${chunk}-${chunkIndex}`}>{chunk}</Fragment>
                  ),
                )}
              </Fragment>
            ))}
        </p>

        <div style={{ animationDelay: "0.6s" }} className="hero-rise mt-8 w-full sm:mt-10">
          <div className="flex flex-wrap justify-center gap-2">
            {SHAPES.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setShape(entry.id)}
                aria-pressed={shape === entry.id}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  shape === entry.id
                    ? "border-brand bg-brand/85 text-[#0a0a0a]"
                    : "border-ink/10 bg-surface/45 text-ink hover:bg-surface/70 dark:border-white/15",
                )}
              >
                <entry.icon aria-hidden className="size-4 stroke-[1.75]" />
                {entry.label()}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-ink/10 bg-surface/45 px-4 py-3.5 backdrop-blur-md sm:mt-8 dark:border-white/15 sm:rounded-full sm:px-6">
            <span className={cn("shrink-0 font-mono text-sm", ACCENT_TEXT)}>$</span>
            <code className="no-scrollbar min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs sm:text-sm">
              {PACKAGE_MANAGER_COMMANDS[pm]}
              {flags && <span className={ACCENT_TEXT}> {flags}</span>}
            </code>
            <button
              type="button"
              onClick={copy}
              aria-label={m.homeCopyCommand()}
              className={cn(
                "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors active:translate-y-[1px]",
                copied ? ACCENT_TEXT : "text-soft hover:text-ink",
              )}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            <div className="flex items-center gap-1 text-xs">
              {PMS.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setPm(entry)}
                  aria-pressed={pm === entry}
                  className={cn(
                    "cursor-pointer rounded-full px-2 py-1 font-mono transition-colors",
                    pm === entry
                      ? cn("bg-surface-raised", ACCENT_TEXT)
                      : "text-soft hover:text-ink",
                  )}
                >
                  {entry}
                </button>
              ))}
            </div>

            <span aria-hidden className="text-edge">
              ·
            </span>

            <Link
              to="/new"
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border border-brand/40 px-4 py-1.5",
                "font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                "hover:border-brand hover:bg-brand hover:text-[#0a0a0a]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                ACCENT_TEXT,
              )}
            >
              {m.homeOpenBuilder()}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div
          style={{ animationDelay: "0.75s" }}
          className="hero-rise mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
        >
          <ul className="isolate flex -space-x-2.5" aria-label={m.homeLikedOnX()}>
            {LIKED_BY.map((person) => (
              <li
                key={person.handle}
                className="relative transition-transform hover:z-10 hover:-translate-y-1"
              >
                <Tooltip delay={80}>
                  <TooltipTrigger
                    render={
                      <a
                        href={`https://x.com/${person.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${person.name} - @${person.handle}`}
                        className="block rounded-full outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      />
                    }
                  >
                    <img
                      src={person.avatar}
                      alt=""
                      referrerPolicy="no-referrer"
                      className={cn(
                        "size-8 rounded-full border-2 border-surface bg-surface-raised object-cover shadow-sm sm:size-10",
                        person.invertDark && "dark:bg-white dark:p-0.5",
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={12}
                    className="min-w-44 border border-background/15 px-3.5 py-3 shadow-[4px_4px_0_rgba(198,232,83,0.35)]"
                  >
                    <span className="block font-mono text-xs font-semibold tracking-[-0.02em]">
                      {person.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-background/65">
                      @{person.handle}
                    </span>
                    <span className="mt-2 block border-t border-background/20 pt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-background/75">
                      {person.role}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>

          <div className="border-l border-edge pl-4">
            <p className={cn("font-mono text-[10px] uppercase tracking-[0.2em]", ACCENT_TEXT)}>
              {m.homeLikedOnX()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
