# Mobile / React Native Expansion

Current native options: `native-bare`, `native-uniwind`, `native-unistyles`. These scaffold React Native/Expo apps as frontends in the monorepo. Status was refreshed on 2026-06-30 after mobile navigation, UI, storage, testing, push, OTA, and deep-linking categories shipped.

---

## Current State

| Option | What it does |
|--------|-------------|
| `native-bare` | Plain React Native with Expo |
| `native-uniwind` | React Native + UniWind (Tailwind for RN) |
| `native-unistyles` | React Native + Unistyles (type-safe styling) |

All use Expo as the base. Mobile-specific navigation, UI, storage, testing, push, OTA, and deep-linking options now exist as first-class schema fields and graph parts.

---

## Navigation

React Native navigation is the #1 pain point for new mobile developers.

- [x] Add `expo-router` ✅ — file-based routing for Expo.
- [x] Add `react-navigation` ✅ — established standard. Stack, tab, drawer navigators.

### Implementation
- Generate navigation structure based on choice
- Auth-gated navigation when `--auth` is selected (login → main app flow)
- Tab bar / drawer scaffolding for common app patterns

---

## UI Libraries (Mobile-Specific)

- [x] Add `tamagui` ✅ — universal UI for React Native + web.
- [x] Add `gluestack-ui` ✅ — cross-platform components with NativeWind/Tailwind ergonomics. (also requested in better-t-stack #962)
- [ ] Add `react-native-paper` — Material Design components. Large component library, good defaults.
- [x] Add `uniwind` / `native-uniwind` path ✅ — Tailwind-style React Native styling.

---

## State & Data

- [ ] Add `tanstack-query` integration for React Native — already an addon, but ensure mobile-specific setup (offline persistence, refetch on app focus, network-aware)
- [ ] Add `legend-state` — already in state management schema, but has excellent React Native support (persistence, sync, fine-grained reactivity)
- [ ] Add `watermelondb` — offline-first database for React Native. SQLite-based, lazy loading, sync engine. Good for apps that need to work offline.
- [x] Add `mmkv` ✅ — fast key-value storage for React Native.

---

## Testing (Mobile-Specific)

- [x] Add `maestro` ✅ — mobile UI testing framework.
- [ ] Add `detox` — E2E testing for React Native. Gray-box testing, synchronization with app. By Wix.
- [x] Add `react-native-testing-library` ✅ — unit/component testing.

---

## Push Notifications

- [x] Add `expo-notifications` ✅ — Expo's push notification service.
- [ ] Add `onesignal` — cross-platform push notifications. Free tier, analytics, segmentation. Supports web + mobile.

---

## Cross-Platform (Web → Mobile)

### Capacitor (better-t-stack #539 — closed but relevant)

- [ ] Add `capacitor` addon — wrap existing web app in native container. Access native APIs (camera, geolocation, push). Ionic team.
  - **When:** User has a web frontend and wants mobile without rewriting
  - **Generate:** `capacitor.config.ts`, native project directories (`ios/`, `android/`)
  - **Pairs with:** Any web frontend (Next, SvelteKit, React Router, etc.)

### Expo Web

- [ ] Ensure Expo projects can target web — Expo supports web output via Metro. Generate web entry point when both native + web are selected.

---

## OTA Updates

- [x] Add `expo-updates` ✅ — over-the-air JS bundle updates without app store review.
- [ ] Add `codepush` (Microsoft) — alternative OTA update service. Works with bare React Native.

---

## Deep Linking & Universal Links

- [x] Generate deep linking configuration with `expo-linking` ✅
  - OAuth redirect URLs for mobile (custom URL schemes, universal links)
  - Expo Router deep link config
  - React Navigation linking config

---

## Implementation Notes

- Mobile options should be additive — don't break existing `native-bare/uniwind/unistyles` choices
- Navigation, UI library, and testing should be separate prompts (like web has frontend, UI library, CSS framework)
- Consider a `--mobile-features` multi-select: navigation, push, OTA, deep-linking
- Mobile env vars need special handling (Expo uses `EXPO_PUBLIC_` prefix, not `VITE_` or `NEXT_PUBLIC_`)

---

## Priority Order

1. **Capacitor** — web-to-mobile bridge for teams that do not want a separate React Native app.
2. **TanStack Query mobile setup** — offline persistence, focus/refetch behavior, and network-aware defaults.
3. **Legend State / offline data** — mobile-friendly persistence and sync story.
4. **React Native Paper or OneSignal** — only if issue demand appears.
5. **Generated-project quality** — ensure mobile options survive install/typecheck and ScaffBench route/build checks.
