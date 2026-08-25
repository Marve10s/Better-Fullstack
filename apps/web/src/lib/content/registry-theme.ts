/**
 * Theme-scope hook for registry-sourced UI primitives (e.g. the animated
 * `Card`). The upstream registry ships a theme class here; we keep it as an
 * opt-in no-op so those components render against this project's existing CSS
 * tokens (`--card`, `--border`, `--foreground`, …) instead of layering a
 * second theme on top. Populate this string if you ever want to scope the
 * registry components to their own token set.
 */
export const registryTheme = "";
