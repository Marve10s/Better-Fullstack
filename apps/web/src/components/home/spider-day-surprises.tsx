import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// First-party theatrical artwork from Sony Pictures' official movie page.
const OFFICIAL_BANNER = "/campaigns/spider-man-brand-new-day/official-banner.jpg";

const SPIDER_RED = "text-[#e62429] dark:text-[#ef4b50]";

const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (r: number, deg: number) => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))] as const;
const f1 = (n: number) => Number(n.toFixed(1));
const jitter = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

function webPaths(
  r: number,
  angles: number[],
  ringFracs: number[],
  sag = 0.92,
  close = false,
): { spokes: string[]; rings: string[] } {
  const spokes = angles.map((a) => {
    const [x, y] = pt(r, a);
    return `M0 0L${f1(x)} ${f1(y)}`;
  });
  const rings = ringFracs.map((frac, ri) => {
    const pts = angles.map((a, si) => pt(r * frac * (0.97 + 0.06 * jitter(ri, si)), a));
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 1; i < angles.length; i++) {
      const [cx, cy] = pt(r * frac * sag, (angles[i - 1] + angles[i]) / 2);
      d += `Q${f1(cx)} ${f1(cy)} ${f1(pts[i][0])} ${f1(pts[i][1])}`;
    }
    if (close) {
      const [cx, cy] = pt(r * frac * sag, (angles[angles.length - 1] + angles[0] + 360) / 2);
      d += `Q${f1(cx)} ${f1(cy)} ${f1(pts[0][0])} ${f1(pts[0][1])}`;
    }
    return d;
  });
  return { spokes, rings };
}

const QUARTER_WEB = webPaths(
  100,
  [3, 13, 24, 36, 47, 57, 68, 79, 87],
  [0.1, 0.16, 0.24, 0.34, 0.45, 0.57, 0.7, 0.83, 0.96],
);
const FULL_WEB = webPaths(
  150,
  [0, 26, 52, 77, 103, 128, 154, 180, 206, 231, 257, 282, 308, 334],
  [0.12, 0.2, 0.3, 0.41, 0.53, 0.66, 0.79, 0.93],
  0.93,
  true,
);

function SpiderMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 30" fill="none" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M14.2 9.6C11.8 8 10.2 6 9.2 2.8" />
        <path d="M13.6 11.2C10.2 9.8 7.4 9.2 4.4 9.8" />
        <path d="M13.6 12.8C10.2 13.4 7.2 14.6 4.8 17.2" />
        <path d="M14.2 14.4C12 16.6 10.4 19.8 9.8 23.6" />
        <path d="M17.8 9.6C20.2 8 21.8 6 22.8 2.8" />
        <path d="M18.4 11.2C21.8 9.8 24.6 9.2 27.6 9.8" />
        <path d="M18.4 12.8C21.8 13.4 24.8 14.6 27.2 17.2" />
        <path d="M17.8 14.4C20 16.6 21.6 19.8 22.2 23.6" />
      </g>
      <circle cx="16" cy="10.8" r="2.5" fill="currentColor" />
      <ellipse cx="16" cy="17.6" rx="4" ry="5.2" fill="currentColor" />
      <path d="M16 14.6l1.1 2.2-1.1 4.4-1.1-4.4z" fill="#e62429" />
    </svg>
  );
}

function CornerWeb({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const paths = [...QUARTER_WEB.spokes, ...QUARTER_WEB.rings];
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={i < QUARTER_WEB.spokes.length ? 0.7 : 0.55}
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: delay + i * 0.05, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function PerchedSpider({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [flinch, setFlinch] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.x + r.width / 2);
        const dy = e.clientY - (r.y + r.height / 2);
        setFlinch(dx * dx + dy * dy < 40 * 40);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <motion.span
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
      animate={
        flinch
          ? { opacity: 1, scale: 1, x: 6, y: -4, rotate: 12 }
          : { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }
      }
      transition={
        flinch
          ? { type: "spring", stiffness: 420, damping: 11 }
          : { delay: reduceMotion ? 0 : 1.8, duration: 0.4 }
      }
      className={cn("absolute block size-4", className)}
    >
      <span className="block -rotate-[28deg]">
        <SpiderMark className="size-full text-ink/70 dark:text-white/55" />
      </span>
    </motion.span>
  );
}

export function SpiderCornerWebs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      <div className="absolute -left-1 top-14 size-28 sm:size-40">
        <CornerWeb className="size-full text-ink/30 dark:text-white/25" delay={0.3} />
        <PerchedSpider className="left-[40%] top-[30%]" />
      </div>
      <div className="absolute -bottom-1 -right-1 size-32 rotate-180 sm:size-48">
        <CornerWeb className="size-full text-ink/20 dark:text-white/15" delay={0.9} />
      </div>
    </div>
  );
}

function DanglingSpider({
  className,
  spiderClass,
  drop = 88,
  delay = 0.4,
  persistKey,
}: {
  className?: string;
  spiderClass?: string;
  drop?: number;
  delay?: number;
  persistKey?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      if (persistKey && sessionStorage.getItem(persistKey)) setGone(true);
    } catch {
      // Private mode: the spider simply dangles again next visit.
    }
  }, [persistKey]);

  const thwip = () => {
    try {
      if (persistKey) sessionStorage.setItem(persistKey, "1");
    } catch {
      // Best-effort only.
    }
    setGone(true);
  };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          exit={{ y: -(drop + 60), opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className={cn("pointer-events-none absolute z-20", className)}
          aria-hidden
        >
          <motion.div
            animate={reduceMotion ? undefined : { rotate: [-2.4, 2.4] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              duration: 3.4,
              ease: "easeInOut",
            }}
            className="flex origin-top flex-col items-center"
          >
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: drop }}
              viewport={{ once: true }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 1.1, delay, ease: [0.34, 1.4, 0.64, 1] }
              }
              className="w-px bg-ink/30 dark:bg-white/25"
            />
            <motion.span
              onClick={thwip}
              whileHover={reduceMotion ? undefined : { scale: 1.15 }}
              className="pointer-events-auto block cursor-pointer"
            >
              <SpiderMark className={cn("size-5 text-ink/75 dark:text-white/60", spiderClass)} />
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SpiderDaySurprises() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-full overflow-hidden opacity-25 [mask-image:linear-gradient(to_left,black_38%,transparent_92%)] dark:opacity-40 md:w-[72%] md:[mask-image:linear-gradient(to_left,black_52%,transparent_100%)]"
      aria-hidden
    >
      <img
        src={OFFICIAL_BANNER}
        alt=""
        width={1300}
        height={556}
        fetchPriority="high"
        className="size-full object-cover object-[43%_center] saturate-[0.85] contrast-110"
      />
      <div className="absolute inset-0 bg-surface/10 mix-blend-color" />
    </div>
  );
}

const BURST_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function ThwipBurst({ show }: { show: boolean }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ scale: 0.4, opacity: 1 }}
          animate={{ scale: 1.3, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className={cn(
            "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
            SPIDER_RED,
          )}
          aria-hidden
        >
          <svg viewBox="0 0 48 48" fill="none" className="aspect-square h-full overflow-visible">
            <circle
              cx="24"
              cy="24"
              r="15"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeDasharray="2.5 6"
            />
            {BURST_ANGLES.map((a) => {
              const [x1, y1] = pt(17, a);
              const [x2, y2] = pt(23, a);
              return (
                <line
                  key={a}
                  x1={f1(24 + x1)}
                  y1={f1(24 + y1)}
                  x2={f1(24 + x2)}
                  y2={f1(24 + y2)}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function NotFoundWeb() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        viewBox="-160 -160 320 320"
        fill="none"
        className="absolute left-1/2 top-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 text-foreground opacity-[0.08] sm:size-[26rem]"
      >
        {[...FULL_WEB.spokes, ...FULL_WEB.rings].map((d) => (
          <path key={d} d={d} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <DanglingSpider
        className="left-[62%] top-0"
        drop={110}
        delay={0.4}
        spiderClass="text-foreground/60"
      />
    </div>
  );
}
