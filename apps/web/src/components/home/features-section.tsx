import NumberFlow from "@number-flow/react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { TechIcon } from "@/components/ui/tech-icon";
import { HOME_FEATURE_OPTIONS } from "@/lib/project/home-display-data";
import { OPTION_ENTRY_COUNT } from "@/lib/project/project-stats";
import { ICON_REGISTRY } from "@/lib/stack/tech-icons";
import { m } from "@/paraglide/messages.js";

type Layer = { key: keyof typeof HOME_FEATURE_OPTIONS; word: () => string };

const LAYERS: ReadonlyArray<Layer> = [
  { key: "ecosystems", word: m.homeLayerLanguageEcosystems },
  {
    key: "frontend",
    word: m.homeLayerFrontendFrameworks,
  },
  {
    key: "backend",
    word: m.homeLayerBackendFrameworks,
  },
  {
    key: "orm",
    word: m.homeLayerDatabaseOrms,
  },
  {
    key: "auth",
    word: m.homeLayerAuthProviders,
  },
  {
    key: "ai",
    word: m.homeLayerAiIntegrations,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative border-t border-border bg-background">
      <ul className="relative">
        {LAYERS.map((layer, i) => (
          <LayerRow key={layer.key} layer={layer} index={i} />
        ))}
      </ul>

      <TotalBlock />
    </section>
  );
}

/** Options that have an icon, one per distinct icon (several Go options share the Go mark). */
function iconOptions(options: ReadonlyArray<{ id: string; name: string }>) {
  const seen = new Set<string>();
  return options.filter((opt) => {
    const config = ICON_REGISTRY[opt.id];
    if (!config) return false;
    const icon = config.type === "si" ? config.slug : config.src;
    if (seen.has(icon)) return false;
    seen.add(icon);
    return true;
  });
}

function LayerRow({ layer, index }: { layer: Layer; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const flip = index % 2 === 1;

  const options = HOME_FEATURE_OPTIONS[layer.key];

  return (
    <li
      ref={ref}
      className="group relative z-10 overflow-hidden border-b border-border transition-colors hover:bg-muted/40"
    >
      <div
        className={`grid grid-cols-12 items-center gap-x-4 gap-y-6 px-4 py-12 sm:gap-x-6 sm:px-8 sm:py-16 ${
          flip ? "sm:[direction:rtl]" : ""
        }`}
      >
        <div className="col-span-12 sm:col-span-4 lg:col-span-3 sm:[direction:ltr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-mono font-black leading-[0.82] tracking-[-0.05em] text-ink"
            style={{ fontSize: "clamp(5rem, 14vw, 11rem)" }}
          >
            <NumberFlow
              value={inView ? options.length : 0}
              format={{ minimumIntegerDigits: 2 }}
              transformTiming={{ duration: 700, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
            />
          </motion.div>
        </div>

        <div className="col-span-12 sm:col-span-8 lg:col-span-9 sm:[direction:ltr]">
          <motion.h3
            initial={{ opacity: 0, x: flip ? 16 : -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono font-bold uppercase leading-none tracking-[-0.03em] text-ink"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)" }}
          >
            {layer.word()}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 flex flex-wrap items-center gap-6"
          >
            {iconOptions(options).map((opt, j) => (
              <motion.div
                key={opt.id}
                title={opt.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.2 + Math.min(j * 0.03, 0.4),
                }}
                className="flex flex-col items-center gap-2"
              >
                {layer.key === "ecosystems" ? (
                  <>
                    <TechIcon techId={opt.id} name={opt.name} className="size-12 sm:size-14" />
                    <span className="font-mono text-xs font-medium text-foreground">
                      {opt.name}
                    </span>
                  </>
                ) : (
                  <TechIcon techId={opt.id} name={opt.name} className="size-9 sm:size-10" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </li>
  );
}

/** 5x7 pixel glyphs, one string per row. */
const DIGIT_GLYPHS: Record<string, ReadonlyArray<string>> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
};

const GLYPH_ROWS = 7;
const TOTAL_DIGITS = String(OPTION_ENTRY_COUNT).split("");
/** Row-major cells ("1" is lit) of the whole number, with a blank column between digits. */
const TOTAL_CELLS = Array.from({ length: GLYPH_ROWS }, (_, row) =>
  TOTAL_DIGITS.map((digit) => DIGIT_GLYPHS[digit]?.[row] ?? "00000").join("0"),
)
  .join("")
  .split("");
const TOTAL_COLUMNS = TOTAL_CELLS.length / GLYPH_ROWS;
const TILE_COUNT = TOTAL_CELLS.filter((cell) => cell === "1").length;
/** Tile number of each lit cell, -1 for the gaps. */
const CELL_TILES = TOTAL_CELLS.map((cell, index) =>
  cell === "1" ? TOTAL_CELLS.slice(0, index).filter((before) => before === "1").length : -1,
);
const TILE_POOL = iconOptions(LAYERS.flatMap((layer) => HOME_FEATURE_OPTIONS[layer.key]));
const TILE_SWAP_MS = 900;

/**
 * The total is drawn out of the options it counts: every lit pixel of the
 * number is one library. Tiles keep trading places with the rest of the pool,
 * so the whole catalogue passes through over time.
 */
function TotalBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reducedMotion = useReducedMotion();
  const [tiles, setTiles] = useState(() => Array.from({ length: TILE_COUNT }, (_, i) => i));

  useEffect(() => {
    if (!inView || reducedMotion || TILE_POOL.length <= TILE_COUNT) return;
    let next = TILE_COUNT;
    const timer = window.setInterval(() => {
      const slot = Math.floor(Math.random() * TILE_COUNT);
      const incoming = next % TILE_POOL.length;
      next += 1;
      setTiles((current) =>
        current.includes(incoming)
          ? current
          : current.map((tile, index) => (index === slot ? incoming : tile)),
      );
    }, TILE_SWAP_MS);
    return () => window.clearInterval(timer);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref} className="bg-foreground text-background">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-8 px-4 py-12 sm:px-8 sm:py-16">
        <h3
          className="col-span-12 font-mono font-bold uppercase leading-none tracking-[-0.03em] lg:col-span-3"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)" }}
        >
          {m.homeTotal()}
        </h3>
        <span className="sr-only">{OPTION_ENTRY_COUNT}</span>
        <div
          aria-hidden
          className="col-span-12 grid gap-1 sm:gap-1.5 lg:col-span-9"
          style={{ gridTemplateColumns: `repeat(${TOTAL_COLUMNS}, minmax(0, 1fr))` }}
        >
          {CELL_TILES.map((tile, cell) => {
            if (tile < 0) return <span key={cell} />;
            const option = TILE_POOL[(tiles[tile] ?? tile) % TILE_POOL.length];
            const column = cell % TOTAL_COLUMNS;
            return (
              <motion.span
                key={cell}
                title={option?.name}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                whileHover={{ scale: 1.35, zIndex: 1 }}
                transition={{ duration: 0.35, delay: inView ? column * 0.025 : 0 }}
                className="relative flex aspect-square items-center justify-center rounded-[22%] bg-background"
              >
                {option && (
                  <motion.span
                    key={option.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex size-[58%]"
                  >
                    <TechIcon techId={option.id} name={option.name} className="size-full" />
                  </motion.span>
                )}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
