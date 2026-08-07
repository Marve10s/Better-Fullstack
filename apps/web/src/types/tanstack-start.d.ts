// Load TanStack Start's route-option augmentations for standalone TypeScript
// checks. Vite injects these at build time, but `tsc --noEmit` does not load
// the Start entrypoint unless it is imported explicitly.
import "@tanstack/react-start";
