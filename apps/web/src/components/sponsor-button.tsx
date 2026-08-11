import { TbBrandGithub as Github, TbHeart as Heart } from "react-icons/tb";

const GITHUB_SPONSORS_URL = "https://github.com/sponsors/Marve10s";

/**
 * Floating support button pinned to the bottom-right corner. It opens GitHub
 * Sponsors, the project's primary sponsorship channel, and expands on hover or
 * focus without obscuring the page at rest.
 */
export function SponsorButton() {
  return (
    <div className="group fixed right-3 bottom-3 z-40 sm:right-4 sm:bottom-4">
      <div
        role="tooltip"
        className="pointer-events-none absolute right-0 bottom-full mb-3 w-max max-w-[15rem] origin-bottom-right translate-y-1 scale-95 rounded-2xl border border-edge bg-surface-raised px-4 py-2.5 text-left font-medium text-ink text-xs leading-relaxed opacity-0 shadow-lg transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        <span aria-hidden="true" className="mr-1">
          👋
        </span>
        {"Enjoying the project? Sponsor Better Fullstack on GitHub "}
        <span aria-hidden="true" className="text-[#ea4aaa]">
          ♥
        </span>
        <span
          aria-hidden="true"
          className="-bottom-[5px] absolute right-5 size-2.5 rotate-45 rounded-[2px] border-edge border-r border-b bg-surface-raised"
        />
      </div>
      <a
        href={GITHUB_SPONSORS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sponsor Better Fullstack on GitHub"
        className="flex h-12 items-center overflow-hidden rounded-full border border-border bg-foreground text-background shadow-2xl shadow-black/10 outline-none transition-[background-color,box-shadow] duration-300 group-hover:border-[#ea4aaa] group-hover:bg-[#ea4aaa] group-hover:text-white group-focus-within:border-[#ea4aaa] group-focus-within:bg-[#ea4aaa] group-focus-within:text-white focus-visible:ring-2 focus-visible:ring-[#ea4aaa]/40"
      >
        <span className="relative flex size-12 shrink-0 items-center justify-center">
          <Heart
            className="size-5 transition-all duration-300 group-hover:scale-50 group-hover:opacity-0 group-focus-within:scale-50 group-focus-within:opacity-0"
            fill="currentColor"
            aria-hidden="true"
          />
          <Github
            className="absolute size-5 scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
            aria-hidden="true"
          />
        </span>
        <span className="max-w-0 whitespace-nowrap pr-0 font-bold text-base leading-none tracking-[-0.01em] opacity-0 transition-all duration-300 group-hover:max-w-[12rem] group-hover:pr-5 group-hover:opacity-100 group-focus-within:max-w-[12rem] group-focus-within:pr-5 group-focus-within:opacity-100">
          GitHub Sponsors
        </span>
      </a>
    </div>
  );
}
