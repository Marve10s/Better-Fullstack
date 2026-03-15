
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { combinationsMetrics } from "@/lib/combinations-count";

import { CollapsibleSection } from "./collapsible-section";

const { totalScientific, yearsAtOneMillisecondScientific, universeLifetimesScientific } =
  combinationsMetrics;

const funFacts = [
  `That's ${universeLifetimesScientific.mantissa} × 10^${universeLifetimesScientific.exponent} universe lifetimes to test all combinations`,
  `That's ${combinationsMetrics.universeSandRatioScientific.mantissa} × 10^${combinationsMetrics.universeSandRatioScientific.exponent}x more combinations than estimated grains of sand in the observable universe`,
  "Across TypeScript, Rust, Python, and Go ecosystems",
  "Each combination creates a unique, production-ready app",
  "YOLO mode doubles every single one of them",
];

function GlowingNumber() {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((i) => (i + 1) % funFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-5xl font-bold font-mono text-foreground sm:text-7xl">
          {totalScientific.mantissa}
        </span>
        <span className="text-3xl font-bold font-mono text-foreground sm:text-5xl">× 10</span>
        <span className="text-2xl font-bold font-mono text-muted-foreground sm:text-3xl">
          {totalScientific.exponent}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">possible project combinations</p>

      <div className="mt-4 h-6 overflow-hidden">
        <p
          key={factIndex}
          className="text-xs text-muted-foreground/80 italic animate-in fade-in slide-in-from-bottom-2 duration-500 sm:text-sm"
        >
          {funFacts[factIndex]}
        </p>
      </div>
    </div>
  );
}

export default function CombinationsSection() {
  return (
    <CollapsibleSection
      title="Infinite Possibilities"
      subtitle="Mix and match frameworks, databases, auth, payments, AI, and more to create your perfect stack."
    >
      <div data-animate className="py-8 sm:mt-4">
        <GlowingNumber />
      </div>

      <div data-animate className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
        <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
        <div className="text-sm">
          <p className="font-medium">How long to test every combination?</p>
          <p className="mt-1 text-muted-foreground">
            At 1ms per test:{" "}
            <span className="font-mono text-foreground">
              {yearsAtOneMillisecondScientific.mantissa} × 10^
              {yearsAtOneMillisecondScientific.exponent} years
            </span>{" "}
            — that's{" "}
            <span className="font-medium text-foreground">
              {universeLifetimesScientific.mantissa} × 10^{universeLifetimesScientific.exponent}{" "}
              universe lifetimes
            </span>
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
