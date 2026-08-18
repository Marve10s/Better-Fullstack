import { PACKAGE_MANAGER_COMMANDS } from "@better-fullstack/types";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Fragment, useState } from "react";
import {
  TbArrowNarrowRight as ArrowNarrowRight,
  TbArrowRight as ArrowRight,
  TbCheck as Check,
  TbCopy as Copy,
} from "react-icons/tb";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

import { LIKED_BY } from "./testimonials-data";

const PMS = ["bun", "pnpm", "npm", "yarn"] as const;
type PM = (typeof PMS)[number];

const ACCENT_TEXT = "text-ink dark:text-brand";

/**
 * A shape names what you are building. The CLI then asks which language or
 * platform and only the questions that shape needs, so no stack choice is
 * hidden behind the short command.
 */
const SHAPES = [
  { id: "fullstack", label: m.homeStarterShapeFullstack, flags: "" },
  { id: "frontend", label: m.homeStarterShapeFrontend, flags: "--shape frontend" },
  { id: "backend", label: m.homeStarterShapeBackend, flags: "--shape backend" },
  { id: "mobile", label: m.homeStarterShapeMobile, flags: "--shape mobile" },
] as const;

type ShapeId = (typeof SHAPES)[number]["id"];

export default function HeroSection() {
  const [shape, setShape] = useState<ShapeId>("fullstack");
  const [pm, setPm] = useState<PM>("bun");
  const [copied, setCopied] = useState(false);

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
    <section className="relative bg-surface text-ink">
      <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-3xl flex-col items-center justify-center px-4 py-16 sm:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-balance text-center font-mono font-bold tracking-[-0.045em] text-ink"
          style={{ fontSize: "clamp(2.25rem, 6.5vw, 4.5rem)", lineHeight: 1 }}
        >
          {m.homeStarterTitleA()}{" "}
          <span className={cn("italic", ACCENT_TEXT)}>{m.homeStarterTitleB()}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-5 max-w-2xl whitespace-pre-line text-center text-sm leading-relaxed text-soft sm:mt-6 sm:text-base"
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
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-8 w-full sm:mt-10"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {SHAPES.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setShape(entry.id)}
                aria-pressed={shape === entry.id}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  shape === entry.id
                    ? "border-brand bg-brand text-[#0a0a0a]"
                    : "border-edge bg-surface-raised text-ink hover:border-soft",
                )}
              >
                {entry.label()}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-edge bg-surface-raised px-4 py-3.5 sm:mt-8 sm:rounded-full sm:px-6">
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
                    pm === entry ? cn("bg-surface-raised", ACCENT_TEXT) : "text-soft hover:text-ink",
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
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
                        aria-label={`${person.name} — @${person.handle}`}
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
              ✦ {m.homeLikedOnX()}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
