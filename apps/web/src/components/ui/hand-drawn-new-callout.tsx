"use client";

import { useEffect, useId, useRef, useState } from "react";

import { PencilSketchDefs, PENCIL_INK_PINK } from "@/components/ui/pencil-sketch-defs";
import { cn } from "@/lib/utils";

type HandDrawnNewCalloutProps = {
  className?: string;
};

const SHAFT_DURATION_MS = 700;
const HEAD_DELAY_MS = 650;
const HEAD_DURATION_MS = 220;
const ARROW_DONE_MS = HEAD_DELAY_MS + HEAD_DURATION_MS;
const LETTER_DRAW_MS = 110;
const LETTER_STAGGER_MS = 95;

const LETTERS = [
  { char: "N", x: 38, clipW: 10 },
  { char: "e", x: 47, clipW: 8 },
  { char: "w", x: 55, clipW: 10 },
  { char: "!", x: 65, clipW: 6 },
] as const;

const SHAFT_PATH = "M 54 18 C 44 20, 32 22, 16 24";
const HEAD_PATH = "M 16 24 L 20 21 L 20 27 Z";

function prepStroke(el: SVGPathElement) {
  const length = el.getTotalLength();
  el.style.strokeDasharray = `${length}`;
  el.style.strokeDashoffset = `${length}`;
}

type DrawnLetterProps = {
  char: string;
  x: number;
  clipW: number;
  clipId: string;
  filterId: string;
  active: boolean;
};

function DrawnLetter({ char, x, clipW, clipId, filterId, active }: DrawnLetterProps) {
  const rectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const rect = rectRef.current;
    if (!rect || !active) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      rect.setAttribute("width", String(clipW));
      return;
    }

    rect.style.transition = `width ${LETTER_DRAW_MS}ms ease-out`;
    requestAnimationFrame(() => {
      rect.setAttribute("width", String(clipW));
    });
  }, [active, clipW]);

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect ref={rectRef} x={x - 1} y="0" height="18" width="0" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`} filter={`url(#${filterId})`} opacity={active ? 1 : 0}>
        <text
          x={x}
          y="13"
          fill={PENCIL_INK_PINK}
          stroke={PENCIL_INK_PINK}
          strokeWidth="0.5"
          paintOrder="stroke fill"
          fontFamily="'Caveat', 'Segoe Print', 'Bradley Hand', cursive"
          fontSize="17"
          fontWeight="700"
          opacity="0.92"
          transform={`rotate(-4 ${x} 13)`}
        >
          {char}
        </text>
      </g>
    </>
  );
}

export function HandDrawnNewCallout({ className }: HandDrawnNewCalloutProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `pencil-sketch-${uid}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawnLetters, setDrawnLetters] = useState(0);

  useEffect(() => {
    const shaftPaths = svgRef.current?.querySelectorAll<SVGPathElement>(
      "[data-arrow-part='shaft']",
    );
    const headEl = svgRef.current?.querySelector<SVGPathElement>("[data-arrow-part='head']");
    if (!shaftPaths?.length || !headEl) return;

    shaftPaths.forEach(prepStroke);

    const animateShaft = (durationMs: number) => {
      shaftPaths.forEach((path) => {
        path.style.transition = `stroke-dashoffset ${durationMs}ms ease-out`;
        path.style.strokeDashoffset = "0";
      });
    };

    const revealHead = (durationMs: number) => {
      headEl.style.transition = `opacity ${durationMs}ms ease-out`;
      headEl.style.opacity = "1";
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];

    const startLabelDraw = () => {
      if (reduceMotion) {
        setDrawnLetters(LETTERS.length);
        return;
      }

      LETTERS.forEach((_, index) => {
        timers.push(
          window.setTimeout(() => {
            setDrawnLetters(index + 1);
          }, index * LETTER_STAGGER_MS),
        );
      });
    };

    if (reduceMotion) {
      animateShaft(0);
      revealHead(0);
      startLabelDraw();
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    headEl.style.opacity = "0";

    const frame = window.requestAnimationFrame(() => {
      animateShaft(SHAFT_DURATION_MS);

      timers.push(
        window.setTimeout(() => {
          revealHead(HEAD_DURATION_MS);
        }, HEAD_DELAY_MS),
      );

      timers.push(window.setTimeout(startLabelDraw, ARROW_DONE_MS));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className={cn("pointer-events-none select-none", className)} aria-hidden>
      <svg
        ref={svgRef}
        viewBox="0 0 96 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-[5.75rem] overflow-visible sm:h-11 sm:w-24"
      >
        <PencilSketchDefs filterId={filterId} />

        {LETTERS.map((letter, index) => (
          <DrawnLetter
            key={letter.char}
            char={letter.char}
            x={letter.x}
            clipW={letter.clipW}
            clipId={`${uid}-letter-clip-${index}`}
            filterId={filterId}
            active={drawnLetters > index}
          />
        ))}

        <g
          filter={`url(#${filterId})`}
          fill="none"
          stroke={PENCIL_INK_PINK}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path data-arrow-part="shaft" d={SHAFT_PATH} />
        </g>

        <g filter={`url(#${filterId})`}>
          <path
            data-arrow-part="head"
            d={HEAD_PATH}
            fill={PENCIL_INK_PINK}
            stroke={PENCIL_INK_PINK}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
