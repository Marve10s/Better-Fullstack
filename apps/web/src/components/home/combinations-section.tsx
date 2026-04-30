import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { combinationsMetrics } from "@/lib/combinations-count";

const { totalScientific, yearsAtOneMillisecondScientific, universeLifetimesScientific } =
  combinationsMetrics;

const funFacts = [
  `${universeLifetimesScientific.mantissa} × 10^${universeLifetimesScientific.exponent} universe lifetimes to test all combinations`,
  `${combinationsMetrics.universeSandRatioScientific.mantissa} × 10^${combinationsMetrics.universeSandRatioScientific.exponent}× more combinations than grains of sand in the observable universe`,
  "Across TypeScript, Rust, Python, Go, and Java",
  "Each combination scaffolds a unique, production-ready app",
  "YOLO mode doubles every single one of them",
];

export default function CombinationsSection() {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFactIndex((i) => (i + 1) % funFacts.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative border-t border-border bg-muted/30">
      <div className="px-4 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-12 items-end gap-x-4 gap-y-6">
          <div className="col-span-12 sm:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-700">
              ✦ combinatorics
            </p>
            <h2
              className="mt-4 max-w-[14ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={{
                fontSize: "clamp(1.85rem, 5vw, 3.4rem)",
                lineHeight: 0.98,
              }}
            >
              Infinite <span className="italic text-muted-foreground">possibilities.</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
              Mix and match frameworks, databases, auth, payments, AI, and more. Every combination
              scaffolds a working, production-ready codebase.
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
                className="font-mono font-bold leading-none text-lime-700"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
              >
                {totalScientific.exponent}
              </span>
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:text-right">
              possible project combinations
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
              ✦ at 1ms per test
            </p>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <p className="text-pretty text-base sm:text-lg">
              <span className="font-mono font-semibold tabular-nums">
                {yearsAtOneMillisecondScientific.mantissa} × 10
                <sup>{yearsAtOneMillisecondScientific.exponent}</sup> years
              </span>{" "}
              <span className="text-muted-foreground">— that&rsquo;s</span>{" "}
              <span className="font-mono font-semibold text-lime-700">
                {universeLifetimesScientific.mantissa} × 10
                <sup>{universeLifetimesScientific.exponent}</sup> universe lifetimes
              </span>
              <span className="text-muted-foreground">.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
