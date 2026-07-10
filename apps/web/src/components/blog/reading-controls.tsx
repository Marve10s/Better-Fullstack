import { useEffect, useRef, useState } from "react";

import type { BlogReadingStats } from "@/lib/blog/source";

import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

const FONT_STORAGE_KEY = "bf-blog-font";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const TRANSITION_MS = 300;

type BlogFont = "default" | "opendyslexic";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Expand/collapse one `data-long-version` section with a height+fade
 * transition (FLIP-style: measure scrollHeight, animate to/from 0).
 */
function transitionSection(
  el: HTMLElement,
  show: boolean,
  timeouts: Map<HTMLElement, number>,
): void {
  const pending = timeouts.get(el);
  if (pending !== undefined) {
    clearTimeout(pending);
    timeouts.delete(el);
  }

  if (prefersReducedMotion()) {
    el.hidden = !show;
    el.style.cssText = "";
    return;
  }

  el.hidden = false;
  el.style.transition = "none";
  el.style.overflow = "hidden";
  const target = el.scrollHeight;
  el.style.height = show ? "0px" : `${target}px`;
  el.style.opacity = show ? "0" : "1";
  el.style.transform = show ? "translateY(8px)" : "none";
  void el.offsetHeight; // flush so the transition has a starting frame

  el.style.transition = `height ${TRANSITION_MS}ms ${EASE}, opacity 240ms ease, transform ${TRANSITION_MS}ms ${EASE}`;
  el.style.height = show ? `${target}px` : "0px";
  el.style.opacity = show ? "1" : "0";
  el.style.transform = show ? "none" : "translateY(8px)";

  timeouts.set(
    el,
    window.setTimeout(() => {
      timeouts.delete(el);
      el.hidden = !show;
      el.style.cssText = "";
    }, TRANSITION_MS + 20),
  );
}

/** Hide/show TOC entries whose headings live inside collapsed sections. */
function syncTocWithSection(section: HTMLElement, show: boolean): void {
  for (const heading of section.querySelectorAll("h2[id], h3[id], h4[id]")) {
    const link = document.querySelector(`nav a[href="#${CSS.escape(heading.id)}"]`);
    const item = link?.closest("li");
    if (item instanceof HTMLElement) item.style.display = show ? "" : "none";
  }
}

const SEGMENT_CLASS =
  "cursor-pointer rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-colors";

function Segment({
  active,
  onClick,
  label,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        SEGMENT_CLASS,
        active
          ? "bg-[#C6E853] font-semibold text-black"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * Floating reading controls for blog posts, ported from the portfolio blog:
 *
 * - Short/Long toggle — posts wrap extra-depth sections in
 *   `<div data-long-version="true">`; Short collapses them (animated) and
 *   hides their TOC entries. Only rendered when the post has such sections.
 * - Typeface toggle — Geist vs OpenDyslexic, persisted in localStorage and
 *   applied via `data-blog-font` on <body> (consumed by .blog-article CSS).
 */
export function ReadingControls({ readingStats }: { readingStats?: BlogReadingStats }) {
  const hasLongSections = !!readingStats && readingStats.longMins > readingStats.shortMins;
  const [isLong, setIsLong] = useState(true);
  const [font, setFont] = useState<BlogFont>("default");
  const timeoutsRef = useRef<Map<HTMLElement, number>>(new Map());

  useEffect(() => {
    const stored = localStorage.getItem(FONT_STORAGE_KEY);
    if (stored === "opendyslexic") setFont("opendyslexic");
  }, []);

  useEffect(() => {
    document.body.dataset.blogFont = font;
    localStorage.setItem(FONT_STORAGE_KEY, font);
  }, [font]);

  const handleVersionChange = (long: boolean) => {
    if (long === isLong) return;
    setIsLong(long);
    for (const section of document.querySelectorAll<HTMLElement>(
      "article [data-long-version]",
    )) {
      transitionSection(section, long, timeoutsRef.current);
      syncTocWithSection(section, long);
    }
  };

  return (
    // right offset clears the floating Patreon button pinned in the corner
    <div className="fixed right-16 bottom-3 z-40 flex items-center gap-2 sm:right-[4.5rem] sm:bottom-4">
      {hasLongSections ? (
        <fieldset
          aria-label={m.blogReadingLengthLabel()}
          className="flex items-center gap-0.5 rounded-full border border-border bg-background/85 p-1 shadow-lg backdrop-blur-md"
        >
          <Segment
            active={isLong}
            onClick={() => handleVersionChange(true)}
            label={m.blogReadingLong()}
          >
            {m.blogReadingLong()} {readingStats.longMins}m
          </Segment>
          <Segment
            active={!isLong}
            onClick={() => handleVersionChange(false)}
            label={m.blogReadingShort()}
          >
            {m.blogReadingShort()} {readingStats.shortMins}m
          </Segment>
        </fieldset>
      ) : null}
      <fieldset
        aria-label={m.blogFontLabel()}
        className="flex items-center gap-0.5 rounded-full border border-border bg-background/85 p-1 shadow-lg backdrop-blur-md"
      >
        <Segment
          active={font === "default"}
          onClick={() => setFont("default")}
          label={m.blogFontDefault()}
        >
          Aa
        </Segment>
        <Segment
          active={font === "opendyslexic"}
          onClick={() => setFont("opendyslexic")}
          label={m.blogFontDyslexic()}
          className="font-opendyslexic normal-case tracking-normal"
        >
          Aa
        </Segment>
      </fieldset>
    </div>
  );
}
