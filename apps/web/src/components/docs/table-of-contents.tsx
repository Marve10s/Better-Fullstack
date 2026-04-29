import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { TocEntry } from "@/lib/docs/remark-extract-toc";
import { cn } from "@/lib/utils";

/**
 * Right-rail "On this page" navigation.
 *
 * `IntersectionObserver` watches every heading in the article body. The
 * topmost visible heading wins. When no heading is visible (e.g. between
 * sections during fast scroll) we keep the last known active id. The
 * indicator is animated via `motion.div` with `layoutId` so it slides
 * between entries on scroll.
 */
export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;
    if (typeof IntersectionObserver === "undefined") return;

    const ids = toc.map((entry) => entry.id);
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibility.set(id, entry.intersectionRatio);
          } else {
            visibility.delete(id);
          }
        }

        if (visibility.size === 0) return;

        // Pick the heading with the highest intersection ratio; tiebreak by
        // document order so the topmost heading wins when ratios match.
        let best: { id: string; ratio: number; order: number } | null = null;
        for (const [id, ratio] of visibility.entries()) {
          const order = ids.indexOf(id);
          if (
            !best ||
            ratio > best.ratio ||
            (ratio === best.ratio && order < best.order)
          ) {
            best = { id, ratio, order };
          }
        }

        if (best) setActiveId(best.id);
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav
      ref={containerRef}
      aria-label="On this page"
      className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto py-8 lg:block"
    >
      <h2 className="mb-3 px-3 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
        On this page
      </h2>
      <ul className="flex flex-col">
        {toc.map((entry) => {
          const isActive = activeId === entry.id;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={cn(
                  "relative flex py-1.5 pl-[var(--toc-pad)] pr-3 text-[0.78rem] leading-snug transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                style={
                  {
                    "--toc-pad": `${0.75 + (entry.depth - 2) * 0.75}rem`,
                  } as React.CSSProperties
                }
              >
                {isActive ? (
                  <motion.span
                    layoutId="docs-toc-active-rail"
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-px bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-px bg-border"
                  />
                )}
                <span className="truncate">{entry.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
