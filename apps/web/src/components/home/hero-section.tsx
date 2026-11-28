import { Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import {
  TbArrowNarrowRight as ArrowNarrowRight,
  TbCheck as Check,
  TbCopy as Copy,
  TbAppWindow as AppWindow,
  TbDeviceMobile as DeviceMobile,
  TbServer as Server,
  TbStack2 as Stack,
} from "react-icons/tb";

import {
  SCENE_SIZES,
  type Scene,
  sceneImage,
  sceneSrcSet,
  useHeroScene,
  useThemePair,
} from "@/components/home/hero-scene";
import { LIKED_BY } from "@/components/home/testimonials-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/platform/utils";
import { PACKAGE_MANAGER_COMMANDS } from "@/lib/project/home-display-data";
import { m } from "@/paraglide/messages.js";

const PMS = ["bun", "pnpm", "npm", "yarn"] as const;
type PM = (typeof PMS)[number];

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

const WORD_STAGGER_SECONDS = 0.08;
const BUILDER_SEARCH = { view: "command", file: "" } as const;
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised";

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

function HeroPainting({ scene }: { scene: Scene }) {
  const image =
    "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-in-out";
  const style = { objectPosition: `${scene.focus} 100%` };
  const show = useThemePair();
  const fetchPriority = show.day === show.night ? undefined : "high";

  return (
    <div className="hero-backdrop home-hero-painting absolute inset-x-0 bottom-0 h-[58%] min-h-[22rem]">
      {show.day && (
        <img
          src={sceneImage(scene, "day")}
          srcSet={sceneSrcSet(scene, "day")}
          sizes={SCENE_SIZES}
          alt=""
          decoding="async"
          fetchPriority={fetchPriority}
          style={style}
          className={cn(image, "opacity-100 dark:opacity-0")}
        />
      )}
      {show.night && (
        <img
          src={sceneImage(scene, "night")}
          srcSet={sceneSrcSet(scene, "night")}
          sizes={SCENE_SIZES}
          alt=""
          decoding="async"
          fetchPriority={fetchPriority}
          style={style}
          className={cn(image, "opacity-0 dark:opacity-100")}
        />
      )}
    </div>
  );
}

function HeroBackdrop({ scene }: { scene: Scene | undefined }) {
  return (
    <div
      aria-hidden
      className="home-hero-art pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="home-hero-light absolute inset-0">
        <div className="home-hero-light-haze" />
      </div>
      {scene && <HeroPainting scene={scene} />}
      <div className="home-hero-light home-hero-glow absolute inset-0">
        <div className="home-hero-light-left" />
        <div className="home-hero-light-right" />
        <div className="home-hero-light-core" />
      </div>
      <div className="home-hero-grain absolute inset-0" />
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
  const titleA = m.homeStarterTitleA();

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
    <section className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="home-hero relative isolate mx-auto flex min-h-[min(calc(100svh-4.5rem),1040px)] max-w-[1576px] flex-col overflow-hidden rounded-[28px] bg-surface-raised text-ink sm:rounded-[36px]">
        <HeroBackdrop scene={scene} />

        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pt-14 pb-[clamp(13rem,25vw,25rem)] text-center sm:px-8 sm:pt-16">
          <h1 className="text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-7xl lg:text-[84px]">
            <span className="block">
              <HeroWords text={titleA} />
            </span>
            <span className="block">
              <HeroWords text={m.homeStarterTitleB()} from={titleA.split(" ").length} />
            </span>
          </h1>

          <p
            style={{ animationDelay: "0.42s" }}
            className="hero-rise mt-6 max-w-xl whitespace-pre-line text-pretty text-base leading-relaxed text-soft sm:mt-7 sm:text-lg"
          >
            {m
              .homeStarterSubtitle()
              .split("→")
              .map((part, index) => (
                <Fragment key={part}>
                  {index > 0 && (
                    <ArrowNarrowRight
                      aria-hidden
                      className="mx-1 inline size-5 align-middle stroke-[2.25] text-ink"
                    />
                  )}
                  {part.split(/(MCP)/).map((chunk, chunkIndex) =>
                    chunk === "MCP" ? (
                      <a
                        key={`${chunk}-${chunkIndex}`}
                        href="/docs/ai/mcp"
                        className="font-medium text-ink underline decoration-brand decoration-2 underline-offset-4"
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

          <div
            style={{ animationDelay: "0.54s" }}
            className="hero-rise mt-8 flex w-full justify-center sm:mt-10"
          >
            <Link
              to="/new"
              search={BUILDER_SEARCH}
              className={cn(
                "inline-flex h-13 w-full max-w-sm items-center justify-center rounded-full bg-ink px-8 text-base font-semibold text-surface transition hover:-translate-y-px hover:opacity-90 active:translate-y-0 sm:h-14 sm:w-auto sm:text-[17px]",
                FOCUS_RING,
              )}
            >
              {m.homeOpenBuilder()}
            </Link>
          </div>

          <div
            style={{ animationDelay: "0.64s" }}
            className="hero-rise mt-5 w-full max-w-2xl rounded-[26px] border border-ink/10 bg-surface/60 p-2 text-left shadow-[0_24px_48px_-28px_rgb(27_26_23/0.45)] backdrop-blur-xl dark:border-white/12"
          >
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
              {SHAPES.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setShape(entry.id)}
                  aria-pressed={shape === entry.id}
                  className={cn(
                    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    FOCUS_RING,
                    shape === entry.id
                      ? "bg-brand text-[#0a0a0a]"
                      : "text-soft hover:bg-ink/5 hover:text-ink dark:hover:bg-white/8",
                  )}
                >
                  <entry.icon aria-hidden className="size-4 stroke-[1.75]" />
                  {entry.label()}
                </button>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-3 rounded-[18px] bg-ink/[0.06] py-2 pr-2 pl-4 dark:bg-white/[0.06]">
              <span aria-hidden className="shrink-0 font-mono text-sm text-soft">
                $
              </span>
              <code className="no-scrollbar min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs sm:text-sm">
                {PACKAGE_MANAGER_COMMANDS[pm]}
                {flags && <span className="font-semibold"> {flags}</span>}
              </code>
              <div className="hidden items-center gap-0.5 sm:flex">
                {PMS.map((entry) => (
                  <button
                    key={entry}
                    type="button"
                    onClick={() => setPm(entry)}
                    aria-pressed={pm === entry}
                    className={cn(
                      "cursor-pointer rounded-full px-2 py-1 font-mono text-xs transition-colors",
                      FOCUS_RING,
                      pm === entry ? "bg-surface text-ink shadow-sm" : "text-soft hover:text-ink",
                    )}
                  >
                    {entry}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={copy}
                aria-label={m.homeCopyCommand()}
                className={cn(
                  "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface text-ink shadow-sm transition active:scale-95",
                  FOCUS_RING,
                )}
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </button>
            </div>

            <div className="mt-2 flex items-center justify-center gap-0.5 sm:hidden">
              {PMS.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setPm(entry)}
                  aria-pressed={pm === entry}
                  className={cn(
                    "cursor-pointer rounded-full px-2.5 py-1 font-mono text-xs transition-colors",
                    FOCUS_RING,
                    pm === entry ? "bg-ink/10 text-ink dark:bg-white/12" : "text-soft",
                  )}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{ animationDelay: "0.74s" }}
            className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-3"
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
                          className="block rounded-full outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised"
                        />
                      }
                    >
                      <img
                        src={person.avatar}
                        alt=""
                        referrerPolicy="no-referrer"
                        className={cn(
                          "size-8 rounded-full border-2 border-surface-raised bg-surface object-cover shadow-sm sm:size-9",
                          person.invertDark && "dark:bg-white dark:p-0.5",
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      sideOffset={12}
                      className="min-w-44 rounded-2xl px-3.5 py-3 text-left"
                    >
                      <span className="block text-sm font-semibold tracking-[-0.01em]">
                        {person.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-background/65">
                        @{person.handle}
                      </span>
                      <span className="mt-2 block border-t border-background/20 pt-2 text-xs text-background/75">
                        {person.role}
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-ink">{m.homeLikedOnX()}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
