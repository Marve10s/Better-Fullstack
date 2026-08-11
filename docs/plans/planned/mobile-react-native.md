# Mobile / React Native Expansion

Current native options: `native-bare`, `native-uniwind`, `native-unistyles`. These scaffold React Native/Expo apps as frontends in the monorepo. Status was refreshed on 2026-08-07; completed rows remain visible to prevent duplicate work.

---

## Current State

| Option             | What it does                                 |
| ------------------ | -------------------------------------------- |
| `native-bare`      | Plain React Native with Expo                 |
| `native-uniwind`   | React Native + UniWind (Tailwind for RN)     |
| `native-unistyles` | React Native + Unistyles (type-safe styling) |

All use Expo as the base.

---

## UI Libraries (Mobile-Specific)

- [ ] Add `react-native-paper` — Material Design components. Large component library, good defaults.

---

## State & Data

- [ ] Deepen `tanstack-query` for React Native with offline persistence, app-focus refetch, and network awareness.
- [ ] Deepen the existing `legend-state` option with mobile persistence and sync examples.
- [ ] Add `watermelondb` — offline-first database for React Native. SQLite-based, lazy loading, sync engine. Good for apps that need to work offline.

---

## Testing (Mobile-Specific)

- [ ] Add `detox` — E2E testing for React Native. Gray-box testing, synchronization with app. By Wix.

---

## Push Notifications

- [ ] Add `onesignal` — cross-platform push notifications. Free tier, analytics, segmentation. Supports web + mobile.

---

## Cross-Platform (Web → Mobile)

### Capacitor (better-t-stack #539 — closed but relevant)

- [x] Add `capacitor` with generated config, dependencies, and web-frontend compatibility.
  - **When:** User has a web frontend and wants mobile without rewriting
  - **Generate:** `capacitor.config.ts`, native project directories (`ios/`, `android/`)
  - **Pairs with:** Any web frontend (Next, SvelteKit, React Router, etc.)

### Expo Web

- [ ] Ensure Expo projects can target web — Expo supports web output via Metro. Generate web entry point when both native + web are selected.

---

## OTA Updates

- [ ] Add `codepush` (Microsoft) — alternative OTA update service. Works with bare React Native.

---

## Implementation Notes

- Mobile options should be additive — don't break existing `native-bare/uniwind/unistyles` choices
- Navigation, UI library, and testing should be separate prompts (like web has frontend, UI library, CSS framework)
- Consider a `--mobile-features` multi-select: navigation, push, OTA, deep-linking
- Mobile env vars need special handling (Expo uses `EXPO_PUBLIC_` prefix, not `VITE_` or `NEXT_PUBLIC_`)

---

## Priority Order

1. **TanStack Query mobile setup** — offline persistence, focus/refetch behavior, and network-aware defaults.
2. **Legend State / offline data** — mobile-friendly persistence and sync story.
3. **React Native Paper or OneSignal** — only if issue demand appears.
4. **Generated-project quality** — ensure mobile options survive install/typecheck and ScaffBench route/build checks.
