import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { HOME_COMBINATIONS_METRICS } from "@/lib/project/home-display-data";
import { PROJECT_ECOSYSTEM_COPY } from "@/lib/project/project-stats";
import { m } from "@/paraglide/messages.js";

const { totalScientific, yearsAtOneMillisecondScientific, universeLifetimesScientific } =
  HOME_COMBINATIONS_METRICS;

export default function CombinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
  const reducedMotion = useReducedMotion();
  const funFacts = useMemo(
    () => [
      m.homeFactUniverseLifetimes({
        mantissa: universeLifetimesScientific.mantissa,
        exponent: universeLifetimesScientific.exponent,
      }),
      m.homeFactSand({
        mantissa: HOME_COMBINATIONS_METRICS.universeSandRatioScientific.mantissa,
        exponent: HOME_COMBINATIONS_METRICS.universeSandRatioScientific.exponent,
      }),
      m.homeFactEcosystems(PROJECT_ECOSYSTEM_COPY),
      m.homeFactUnique(),
      m.homeFactYolo(),
    ],
    [],
  );
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let interval: number | undefined;
    const update = () => {
      window.clearInterval(interval);
      if (!document.hidden) {
        interval = window.setInterval(() => {
          setFactIndex((i) => (i + 1) % funFacts.length);
        }, 4000);
      }
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, [funFacts.length, inView, reducedMotion]);

  return (
    <section ref={sectionRef} className="relative border-t border-border bg-muted/30">
      <div className="px-4 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-12 items-end gap-x-4 gap-y-6">
          <div className="col-span-12 sm:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink dark:text-brand">
              ✦ {m.homeCombinatorics()}
            </p>
            <h2
              className="mt-4 max-w-[14ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={{
                fontSize: "clamp(1.85rem, 5vw, 3.4rem)",
                lineHeight: 0.98,
              }}
            >
              {m.homeInfinite()}{" "}
              <span className="italic text-muted-foreground">{m.homePossibilities()}</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
              {m.homeCombinationsDescription()}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-span-12 sm:col-span-6 sm:text-right"
          >
            <div className="flex items-baseline justify-start gap-2 sm:justify-end">
              <span
                className="font-mono font-bold leading-none tracking-[-0.05em]"
                style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
              >
                {totalScientific.mantissa}
              </span>
              <span
                className="font-mono font-bold leading-none tracking-[-0.04em] text-muted-foreground"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                ×&nbsp;10
              </span>
              <span
                className="font-mono font-bold leading-none text-ink dark:text-brand"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
              >
                {totalScientific.exponent}
              </span>
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:text-right">
              {m.homePossibleCombinations()}
            </p>
            <div className="mt-4 h-6 overflow-hidden">
              <p
                key={factIndex}
                className="text-pretty text-xs italic text-muted-foreground/80 animate-in fade-in slide-in-from-bottom-2 duration-500 sm:text-sm"
              >
                {funFacts[factIndex]}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-4 gap-y-3 border-t border-border pt-10 sm:gap-y-0">
          <div className="col-span-12 sm:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ✦ {m.homeAtOneMs()}
            </p>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <p className="text-pretty text-base sm:text-lg">
              <span className="font-mono font-semibold tabular-nums">
                {yearsAtOneMillisecondScientific.mantissa} × 10
                <sup>{yearsAtOneMillisecondScientific.exponent}</sup> {m.homeYears()}
              </span>{" "}
              <span className="text-muted-foreground">- {m.homeThatIs()}</span>{" "}
              <span className="font-mono font-semibold text-ink dark:text-brand">
                {universeLifetimesScientific.mantissa} × 10
                <sup>{universeLifetimesScientific.exponent}</sup> {m.homeUniverseLifetimes()}
              </span>
              <span className="text-muted-foreground">.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
