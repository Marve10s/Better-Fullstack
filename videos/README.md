# Better Fullstack campaign videos

The Remotion compositions reuse the product's dark palette, Geist fonts, grid, browser chrome, and builder interaction patterns.

```bash
bun install
bun run typecheck
bun run compositions
bun run render:campaign
bun run render:clips
bun run render:og
```

Rendered videos go to `videos/out/` and generated social cards go to `apps/web/public/og/`. The shared public directory is configured in `remotion.config.ts`, so fonts and product icons stay sourced from the web app.
