import { Heart } from "lucide-react";

const PATREON_URL = "https://www.patreon.com/cw/marve10s";

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
        className="flex h-12 items-center overflow-hidden rounded-full border border-border bg-foreground text-background shadow-2xl shadow-black/10 outline-none transition-[background-color,box-shadow] duration-300 group-hover:bg-[#ff424d] group-hover:text-white group-focus-within:bg-[#ff424d] group-focus-within:text-white focus-visible:ring-2 focus-visible:ring-[#ff424d]/40"
      >
        <span className="relative flex size-12 shrink-0 items-center justify-center">
          <Heart
            className="size-5 transition-all duration-300 group-hover:scale-50 group-hover:opacity-0 group-focus-within:scale-50 group-focus-within:opacity-0"
            fill="currentColor"
            aria-hidden="true"
          />
          <PatreonMark className="absolute size-5 scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100" />
        </span>
        <span
          className="max-w-0 whitespace-nowrap pr-0 text-lg leading-none opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:pr-5 group-hover:opacity-100 group-focus-within:max-w-[10rem] group-focus-within:pr-5 group-focus-within:opacity-100"
          style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          Patreon
        </span>
      </a>
    </div>
  );
}
