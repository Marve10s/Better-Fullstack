import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/platform/utils";
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
  "text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl";
const CARD = "rounded-[28px] bg-surface-raised px-6 py-10 sm:rounded-[36px] sm:px-10 sm:py-14";

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
        <span className="font-semibold leading-none tracking-[-0.05em] tabular-nums text-ink [font-size:clamp(3rem,6.5vw,5.5rem)]">
          {tried.toLocaleString("en-US")}
        </span>
        <span className="text-sm text-muted-foreground sm:text-base">{m.homeCombosTried()}</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
        <div className="h-full w-px bg-ink dark:bg-brand" />
      </div>
      <p className="mt-3 font-mono text-xs tabular-nums text-muted-foreground sm:text-sm">
        <span className="break-all">{percentDone(tried)}</span>{" "}
        <span className="whitespace-nowrap">{m.homeCombosDone()}</span>
      </p>

      <p className="mt-5 text-base font-semibold tabular-nums sm:text-lg">
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
    <section className="mx-auto grid max-w-[calc(1576px+1.5rem)] gap-2 px-2 pt-2 sm:gap-3 sm:px-3 sm:pt-3 lg:grid-cols-12">
      <div className={cn(CARD, "lg:col-span-5")}>
        <h2 className={QUESTION}>{m.homeCombosQuestion()}</h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 flex items-baseline gap-2 font-semibold leading-none text-ink"
        >
          <span className="tracking-[-0.05em] [font-size:clamp(3.5rem,8vw,7rem)]">
            {totalScientific.mantissa}
          </span>
          <span className="tracking-[-0.04em] text-muted-foreground [font-size:clamp(1.75rem,4vw,3.5rem)]">
            ×&nbsp;10
          </span>
          <span className="self-start text-ink [font-size:clamp(1.5rem,3.2vw,2.75rem)]">
            {totalScientific.exponent}
          </span>
        </motion.div>
        {/* Number names only follow this scale in English. */}
        {getLocale() === "en" && spokenTotal() && (
          <p className="mt-4 text-lg font-semibold text-ink sm:text-xl">
            <span className="font-normal italic text-muted-foreground">or</span> {spokenTotal()}
          </p>
        )}
        <p className="mt-2 break-all font-mono text-[11px] leading-relaxed text-muted-foreground">
          = {TOTAL_GROUPED}
        </p>
      </div>

      <div className={cn(CARD, "lg:col-span-7")}>
        <h2 className={QUESTION}>{m.homeCombosTimeQuestion()}</h2>
        <div className="mt-6">
          <LiveTrial />
        </div>
      </div>
    </section>
  );
}
