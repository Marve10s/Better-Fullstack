# Mobile / React Native Expansion

Current native options: `native-bare`, `native-uniwind`, `native-unistyles`. These scaffold React Native apps as frontends in the monorepo. This plan covers expanding mobile support with more tooling, frameworks, and cross-platform options.

---

## Current State

| Option | What it does |
|--------|-------------|
| `native-bare` | Plain React Native with Expo |
| `native-uniwind` | React Native + UniWind (Tailwind for RN) |
| `native-unistyles` | React Native + Unistyles (type-safe styling) |

All use Expo as the base. No navigation, state management, or testing scaffolding specific to mobile.

---

## Navigation

React Native navigation is the #1 pain point for new mobile developers.

- [ ] Add `expo-router` — file-based routing for Expo. Most popular choice for new Expo projects. Familiar to Next.js developers.
- [ ] Add `react-navigation` — established standard. Stack, tab, drawer navigators. More control than Expo Router.

### Implementation
- Generate navigation structure based on choice
- Auth-gated navigation when `--auth` is selected (login → main app flow)
- Tab bar / drawer scaffolding for common app patterns

---

## UI Libraries (Mobile-Specific)

- [ ] Add `tamagui` — universal UI for React Native + web. Compiler-optimized, theme system, full component library. Strong for apps targeting both platforms.
- [ ] Add `gluestack-ui` — cross-platform components with NativeWind/Tailwind ergonomics. (also requested in better-t-stack #962)
- [ ] Add `react-native-paper` — Material Design components. Large component library, good defaults.
- [ ] Add `nativewind` — Tailwind CSS for React Native. Use Tailwind classes directly in RN components. Already partially supported via `native-uniwind`.

---

## State & Data

- [ ] Add `tanstack-query` integration for React Native — already an addon, but ensure mobile-specific setup (offline persistence, refetch on app focus, network-aware)
- [ ] Add `legend-state` — already in state management schema, but has excellent React Native support (persistence, sync, fine-grained reactivity)
- [ ] Add `watermelondb` — offline-first database for React Native. SQLite-based, lazy loading, sync engine. Good for apps that need to work offline.
- [ ] Add `mmkv` — fast key-value storage for React Native. Replaces AsyncStorage. 30x faster.

---

## Testing (Mobile-Specific)

- [ ] Add `maestro` — mobile UI testing framework. YAML-based, no code. Records and replays flows on real devices/simulators.
- [ ] Add `detox` — E2E testing for React Native. Gray-box testing, synchronization with app. By Wix.
- [ ] Add `react-native-testing-library` — unit/component testing. Renders RN components in Node.js.

---

## Push Notifications

- [ ] Add `expo-notifications` — Expo's push notification service. Free tier, works with FCM/APNs. Simplest option.
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

- [ ] Add `expo-updates` — over-the-air JS bundle updates without app store review. Critical for production apps.
- [ ] Add `codepush` (Microsoft) — alternative OTA update service. Works with bare React Native.

---

## Deep Linking & Universal Links

- [ ] Generate deep linking configuration when auth is selected
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

1. **Navigation** (expo-router, react-navigation) — biggest gap, highest friction
2. **UI libraries** (tamagui, nativewind) — visual polish out of the box
3. **MMKV + TanStack Query mobile setup** — data layer essentials
4. **Testing** (maestro, RNTL) — mobile-specific testing
5. **Push notifications** (expo-notifications) — common requirement
6. **Capacitor** — web-to-mobile bridge
7. **OTA updates** — production necessity
8. **Deep linking** — auth flow integration
