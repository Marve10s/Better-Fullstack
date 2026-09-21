import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { HOME_COMBINATIONS_METRICS } from "@/lib/project/home-display-data";
import { m } from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

const {
  totalDigits,
  totalScientific,
  yearsAtOneMillisecondScientific,
  universeLifetimesScientific,
} = HOME_COMBINATIONS_METRICS;

const TOTAL = BigInt(totalDigits);
/** Short-scale names for each group of three digits after the first thousand. */
const ILLIONS = [
  "thousand",
  "million",
  "billion",
  "trillion",
  "quadrillion",
  "quintillion",
  "sextillion",
  "septillion",
  "octillion",
  "nonillion",
  "decillion",
  "undecillion",
  "duodecillion",
  "tredecillion",
  "quattuordecillion",
  "quindecillion",
  "sexdecillion",
  "septendecillion",
  "octodecillion",
  "novemdecillion",
  "vigintillion",
];

/** "993 quattuordecillion": the leading group plus the name of its magnitude. */
function spokenTotal() {
  const groups = Math.floor((totalDigits.length - 1) / 3);
  const name = ILLIONS[groups - 1];
  return name ? `${totalDigits.slice(0, totalDigits.length - groups * 3)} ${name}` : undefined;
}

const TOTAL_GROUPED = totalDigits.replace(/\B(?=(\d{3})+$)/g, ",");
/** Enough decimal places to reach the first non-zero digit of the share, plus two more. */
const PERCENT_PLACES = totalDigits.length + 4;

const QUESTION =
  "font-mono font-bold uppercase leading-none tracking-[-0.03em] text-ink [font-size:clamp(1.75rem,3.4vw,2.75rem)]";

/** Share of all combinations covered by `tried`, as a plain decimal percentage. */
function percentDone(tried: number) {
  const scaled = (BigInt(tried) * 100n * 10n ** BigInt(PERCENT_PLACES)) / TOTAL;
  const decimals = scaled.toString().padStart(PERCENT_PLACES, "0");
  const firstDigit = decimals.search(/[1-9]/);
  return `0.${firstDigit < 0 ? "0" : decimals.slice(0, firstDigit + 2)}%`;
}

/** Tries one combination per millisecond while on screen, to show how little that covers. */
function LiveTrial() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [tried, setTried] = useState(0);
  const start = useRef<number>(undefined);

  useEffect(() => {
    if (!inView) return;
    const startedAt = (start.current ??= performance.now());
    const timer = window.setInterval(
      () => setTried(Math.floor(performance.now() - startedAt)),
      reducedMotion ? 1000 : 60,
    );
    return () => window.clearInterval(timer);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref}>
      <p className="text-sm text-muted-foreground sm:text-base">{m.homeCombosRate()}</p>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono font-black leading-none tracking-[-0.05em] tabular-nums text-ink [font-size:clamp(3rem,6.5vw,5.5rem)]">
          {tried.toLocaleString("en-US")}
        </span>
        <span className="text-sm text-muted-foreground sm:text-base">{m.homeCombosTried()}</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-px bg-ink dark:bg-brand" />
      </div>
      <p className="mt-3 font-mono text-xs tabular-nums text-muted-foreground sm:text-sm">
        <span className="break-all">{percentDone(tried)}</span>{" "}
        <span className="whitespace-nowrap">{m.homeCombosDone()}</span>
      </p>

      <p className="mt-5 font-mono text-base font-semibold sm:text-lg">
        {yearsAtOneMillisecondScientific.mantissa} × 10
        <sup>{yearsAtOneMillisecondScientific.exponent}</sup> {m.homeCombosYearsToGo()}
        <span className="font-normal text-muted-foreground">
          {" "}
          · {universeLifetimesScientific.mantissa} × 10
          <sup>{universeLifetimesScientific.exponent}</sup> {m.homeUniverseLifetimes()}
        </span>
      </p>
    </div>
  );
}

export default function CombinationsSection() {
  return (
    <section className="grid border-t border-border lg:grid-cols-12">
      <div className="border-b border-border px-4 py-10 sm:px-8 lg:col-span-5 lg:border-r lg:border-b-0">
        <h2 className={QUESTION}>{m.homeCombosQuestion()}</h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-5 flex items-baseline gap-2 font-mono font-black leading-none text-ink"
        >
          <span className="tracking-[-0.05em] [font-size:clamp(3.5rem,8vw,7rem)]">
            {totalScientific.mantissa}
          </span>
          <span className="tracking-[-0.04em] text-muted-foreground [font-size:clamp(1.75rem,4vw,3.5rem)]">
            ×&nbsp;10
          </span>
          <span className="self-start text-ink dark:text-brand [font-size:clamp(1.5rem,3.2vw,2.75rem)]">
            {totalScientific.exponent}
          </span>
        </motion.div>
        {/* Number names only follow this scale in English. */}
        {getLocale() === "en" && spokenTotal() && (
          <p className="mt-4 font-mono text-lg font-semibold text-ink sm:text-xl">
            <span className="font-normal italic text-muted-foreground">or</span> {spokenTotal()}
          </p>
        )}
        <p className="mt-2 break-all font-mono text-[11px] leading-relaxed text-muted-foreground">
          = {TOTAL_GROUPED}
        </p>
      </div>

      <div className="px-4 py-10 sm:px-8 lg:col-span-7">
        <h2 className={QUESTION}>{m.homeCombosTimeQuestion()}</h2>
        <div className="mt-4">
          <LiveTrial />
        </div>
      </div>
    </section>
  );
}
