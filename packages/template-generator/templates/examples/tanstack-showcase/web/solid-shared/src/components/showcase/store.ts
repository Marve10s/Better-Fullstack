import { Store } from "@tanstack/store";

export const showcaseStore = new Store({
  density: "comfortable" as "comfortable" | "compact",
  visits: 0,
});

export function toggleDensity() {
  showcaseStore.setState((state) => ({
    ...state,
    density: state.density === "comfortable" ? "compact" : "comfortable",
  }));
}

export function recordVisit() {
  showcaseStore.setState((state) => ({ ...state, visits: state.visits + 1 }));
}
