# Design sources in this repo

Use this file when you need to **read every written design / visual-system spec** tracked in Better-Fullstack: canonical BF video style, web UI agent skills, Geist Remotion references, short-form video rules, and optional deeper Remotion or `apps/web` implementation paths.

**Do not** treat this as permission to bulk-read unrelated `docs/guidelines/` files; open other guideline docs only when the task matches their topic (see [AGENTS.md](../../AGENTS.md)).

## Precedence

| Context | Wins |
|--------|------|
| Remotion videos **for this product** (palette, branding, anti-patterns) | [remotion-video-style.md](./remotion-video-style.md) |
| Accessibility / interaction / UX audits on web UI | [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) (fetched fresh; see [.agents/skills/web-design-guidelines/SKILL.md](../../.agents/skills/web-design-guidelines/SKILL.md)) |
| Geist tokens and Remotion scene recipes | [.agents/skills/create-remotion-geist/](../../.agents/skills/create-remotion-geist/) (reconcile colors with BF tokens above when both apply) |

When `remotion-video-style.md` lists a skill stack order for overlapping skills, prefer that ordering after the precedence table above.

---

## Phase 1 — Project-specific canonical style

Read first for BF-aligned Remotion and homepage-adjacent visuals.

- [remotion-video-style.md](./remotion-video-style.md) — duration, palette (`#0c0c0e`, `#f2eeee`, `#8839ef`, etc.), grid background, command box, typography (Geist Sans/Mono), motion, icon sources (`apps/web/src/lib/tech-icons.ts`), anti-patterns.

---

## Phase 2 — Web and product UI (agent skills)

| Path | Notes |
|------|--------|
| [.agents/skills/frontend-design/SKILL.md](../../.agents/skills/frontend-design/SKILL.md) | Bold direction, typography/color/background guidance; avoid generic “AI slop” patterns. |
| [.agents/skills/frontend-design/LICENSE.txt](../../.agents/skills/frontend-design/LICENSE.txt) | License for the frontend-design skill text. |
| [.agents/skills/web-design-guidelines/SKILL.md](../../.agents/skills/web-design-guidelines/SKILL.md) | Routes to the **external** Web Interface Guidelines URL (accessibility, focus, forms, animation, typography, images, performance, …). |

---

## Phase 3 — Geist / Remotion design system

Read the skill entry, then references in this order (type and color before components):

1. [.agents/skills/create-remotion-geist/SKILL.md](../../.agents/skills/create-remotion-geist/SKILL.md)
2. [.agents/skills/create-remotion-geist/references/geist-colors.md](../../.agents/skills/create-remotion-geist/references/geist-colors.md)
3. [.agents/skills/create-remotion-geist/references/geist-typography.md](../../.agents/skills/create-remotion-geist/references/geist-typography.md)
4. [.agents/skills/create-remotion-geist/references/geist-icons.md](../../.agents/skills/create-remotion-geist/references/geist-icons.md)
5. [.agents/skills/create-remotion-geist/references/geist-components.md](../../.agents/skills/create-remotion-geist/references/geist-components.md)
6. [.agents/skills/create-remotion-geist/references/code-blocks.md](../../.agents/skills/create-remotion-geist/references/code-blocks.md)
7. [.agents/skills/create-remotion-geist/references/scene-patterns.md](../../.agents/skills/create-remotion-geist/references/scene-patterns.md)
8. [.agents/skills/create-remotion-geist/references/storyboard-template.md](../../.agents/skills/create-remotion-geist/references/storyboard-template.md)
9. [.agents/skills/create-remotion-geist/references/project-setup.md](../../.agents/skills/create-remotion-geist/references/project-setup.md)

---

## Phase 4 — Modern short video aesthetic and structure

- [.agents/skills/modern-short-video/rules/design-principles.md](../../.agents/skills/modern-short-video/rules/design-principles.md)
- [.agents/skills/modern-short-video/rules/visual-elements.md](../../.agents/skills/modern-short-video/rules/visual-elements.md)
- [.agents/skills/modern-short-video/rules/scene-structure.md](../../.agents/skills/modern-short-video/rules/scene-structure.md)
- [.agents/skills/modern-short-video/rules/animation-patterns.md](../../.agents/skills/modern-short-video/rules/animation-patterns.md)
- [.agents/skills/modern-short-video/SKILL.md](../../.agents/skills/modern-short-video/SKILL.md)

---

## Phase 5 (optional) — Broader Remotion and motion

- [.agents/skills/remotion/SKILL.md](../../.agents/skills/remotion/SKILL.md)
- [.agents/skills/remotion/README.md](../../.agents/skills/remotion/README.md)
- [.agents/skills/remotion-bits/SKILL.md](../../.agents/skills/remotion-bits/SKILL.md)
- [.agents/skills/remotion-bits/references/components.md](../../.agents/skills/remotion-bits/references/components.md)
- [.agents/skills/remotion-bits/references/patterns.md](../../.agents/skills/remotion-bits/references/patterns.md)
- [.agents/skills/remotion-bits/references/utilities.md](../../.agents/skills/remotion-bits/references/utilities.md)
- [.agents/skills/remotion-animation/SKILL.md](../../.agents/skills/remotion-animation/SKILL.md)
- [.agents/skills/remotion-best-practices/SKILL.md](../../.agents/skills/remotion-best-practices/SKILL.md)
- Design-adjacent rules under [.agents/skills/remotion-best-practices/rules/](../../.agents/skills/remotion-best-practices/rules/): `fonts.md`, `animations.md`, `text-animations.md`, `transitions.md`, `tailwind.md`, `compositions.md`
- [.agents/skills/video-production/SKILL.md](../../.agents/skills/video-production/SKILL.md)

---

## Phase 6 (optional) — Implemented web app UI

Narrow reads to global styling and shared primitives (not every route):

- [apps/web/src/styles/global.css](../../apps/web/src/styles/global.css) — Tailwind v4 imports, Geist `@font-face`, CSS variables and utilities
- [apps/web/vite.config.ts](../../apps/web/vite.config.ts) — build/tooling that affects CSS and assets
- Icon and builder-adjacent references called out in `remotion-video-style.md`: [apps/web/src/lib/tech-icons.ts](../../apps/web/src/lib/tech-icons.ts)

Search as needed: `theme`, `ModeToggle`, `apps/web/src/routes`, shared UI under `apps/web/src/components`.

---

## Mechanical check: discover design-tagged markdown

From the repo root (paths match this monorepo layout):

```bash
# Filename hints
find .agents/skills -path '*design*.md' 2>/dev/null
find .agents/skills -path '*geist*.md' 2>/dev/null

# All Geist pack references
find .agents/skills/create-remotion-geist -name '*.md' 2>/dev/null

# Content scan (may include non-design hits)
rg -i 'design principles|color system|Geist|aesthetic' .agents/skills docs/guidelines --glob '*.md'
```

Re-run these when adding skills or guidelines so this guide’s lists stay complete.
