import { TbHeart as Heart } from "react-icons/tb";

import { cn } from "@/lib/utils";

const PATREON_URL = "https://www.patreon.com/cw/marve10s";

// Spider-Man: Brand New Day campaign skin — set to false to restore the heart.
const SPIDER_DAY: boolean = true;

function SpiderLenses({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <g fill="#08090a" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M5.8 6.2C8.4 12.3 14.6 18.1 21.1 24.6L23 23.8C23.3 31.9 18.6 40.4 12.2 39.2C5.3 37.9 1.8 20.1 5.8 6.2Z" />
        <path d="M42.2 6.2C39.6 12.3 33.4 18.1 26.9 24.6L25 23.8C24.7 31.9 29.4 40.4 35.8 39.2C42.7 37.9 46.2 20.1 42.2 6.2Z" />
      </g>
      <g fill="#fff">
        <path d="M8.4 15.4C11.2 19.2 15.3 22.4 19.4 26.6C19.4 31.6 16.8 35.8 13.2 35.1C9.2 34.3 6.8 24.4 8.4 15.4Z" />
        <path d="M39.6 15.4C36.8 19.2 32.7 22.4 28.6 26.6C28.6 31.6 31.2 35.8 34.8 35.1C38.8 34.3 41.2 24.4 39.6 15.4Z" />
      </g>
    </svg>
  );
}

// Official Patreon logomark (the column + circle), drawn as a single path so it
// inherits currentColor and stays crisp at any size.
function PatreonMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2z" />
    </svg>
  );
}

/**
 * Floating support button pinned to the bottom-right corner. Collapsed it is a
 * heart; on hover/focus it expands into the Patreon wordmark, the heart
 * crossfades into the Patreon logomark, and a thank-you tooltip rises above it.
 *
 * The tooltip lives outside the anchor because the anchor clips its own
 * overflow to animate the wordmark; the shared `group` wrapper drives both.
 */
export function PatreonButton() {
  return (
    <div className="group fixed right-3 bottom-3 z-40 sm:right-4 sm:bottom-4">
      <div
        role="tooltip"
        className="pointer-events-none absolute right-0 bottom-full mb-3 w-max max-w-[15rem] origin-bottom-right translate-y-1 scale-95 rounded-2xl border border-edge bg-surface-raised px-4 py-2.5 text-left font-medium text-ink text-xs leading-relaxed opacity-0 shadow-lg transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        <span aria-hidden="true" className="mr-1">
          👋
        </span>
        {"Enjoying the project? Your support would mean a lot to me "}
        <span aria-hidden="true" className="text-[#ff424d]">
          ♥
        </span>
        <span
          aria-hidden="true"
          className="-bottom-[5px] absolute right-5 size-2.5 rotate-45 rounded-[2px] border-edge border-r border-b bg-surface-raised"
        />
      </div>
      <a
        href={PATREON_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Support us on Patreon"
        className={cn(
          "flex h-12 items-center overflow-hidden rounded-full border shadow-2xl shadow-black/10 outline-none transition-[background-color,box-shadow] duration-300 group-hover:bg-[#ff424d] group-hover:text-white group-focus-within:bg-[#ff424d] group-focus-within:text-white focus-visible:ring-2 focus-visible:ring-[#ff424d]/40",
          SPIDER_DAY
            ? "border-black/25 bg-[#e62429] text-white"
            : "border-border bg-foreground text-background",
        )}
      >
        <span className="relative flex size-12 shrink-0 items-center justify-center">
          {SPIDER_DAY ? (
            <SpiderLenses className="absolute inset-0 size-full transition-all duration-300 group-hover:scale-50 group-hover:opacity-0 group-focus-within:scale-50 group-focus-within:opacity-0" />
          ) : (
            <Heart
              className="size-5 transition-all duration-300 group-hover:scale-50 group-hover:opacity-0 group-focus-within:scale-50 group-focus-within:opacity-0"
              fill="currentColor"
              aria-hidden="true"
            />
          )}
          <PatreonMark className="absolute size-5 scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100" />
        </span>
        <span
          className="max-w-0 whitespace-nowrap pr-0 text-lg leading-none opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:pr-5 group-hover:opacity-100 group-focus-within:max-w-[10rem] group-focus-within:pr-5 group-focus-within:opacity-100"
          style={{
            fontFamily: '"Figtree", system-ui, sans-serif',
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          Patreon
        </span>
      </a>
    </div>
  );
}
