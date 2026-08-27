const VITE_WEB_FRONTENDS = new Set([
  "react-router",
  "react-vite",
  "tanstack-router",
  "vanilla-vite",
  "vue",
  "svelte",
  "solid",
  "fresh",
]);
const ASTRO_WEB_FRONTENDS = new Set(["astro"]);

export function getLocalWebDevPort(frontend: readonly string[]): 3001 | 4321 | 5173 | 8910 {
  // Redwood's web dev server port is fixed in redwood.toml.
  if (frontend.includes("redwood")) {
    return 8910;
  }

  if (frontend.some((entry) => VITE_WEB_FRONTENDS.has(entry))) {
    return 5173;
  }

  if (frontend.some((entry) => ASTRO_WEB_FRONTENDS.has(entry))) {
    return 4321;
  }

  return 3001;
}
