import { useStore } from "@tanstack/solid-store";

import { showcaseStore, toggleDensity } from "./store";

export default function StorePanel() {
  const density = useStore(showcaseStore, (state) => state.density);
  const visits = useStore(showcaseStore, (state) => state.visits);

  return (
    <div class="flex flex-wrap items-center gap-4">
      <button
        type="button"
        class="rounded border border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-800"
        onClick={toggleDensity}
      >
        Density: {density()}
      </button>
      <span class="text-sm text-neutral-400">
        Showcase opened {visits()} time{visits() === 1 ? "" : "s"} this session
      </span>
    </div>
  );
}
