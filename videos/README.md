# Better Fullstack campaign videos

The Remotion compositions reuse the product's dark palette, Geist fonts, grid, browser chrome, and builder interaction patterns.

```bash
bun install
bun run typecheck
bun run compositions
bun run render:campaign
bun run render:clips
bun run render:og
bun run render:search-media
```

Rendered videos go to `videos/out/`, generated social cards go to `apps/web/public/og/`, and the paired search-cluster stills and silent clips go to `apps/web/public/search-media/`. The shared public directory is configured in `remotion.config.ts`, so fonts and product icons stay sourced from the web app.
