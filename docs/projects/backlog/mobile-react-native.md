# Mobile / React Native Expansion

Current native options are `native-bare`, `native-uniwind`, and `native-unistyles`. Capacitor and
Expo Web scripts/dependencies already ship. Only unfinished mobile depth remains below.

## Current evidence

The React Native golden recipe type-checks and exports the native app, builds its generated Hono
backend, starts that backend, and calls the root endpoint. This closes the mobile-backend runtime
claim. It does not prove device UI, navigation, storage, push, or OTA behavior.

## UI

- [ ] Add React Native Paper when demand justifies a mobile-specific UI capability.

This request fails at `listed` because the option does not exist. Its closing recipe must render a
generated Paper component on an Android or iOS target and assert the visible result.

## State and Data

- [ ] Deepen TanStack Query with offline persistence, app-focus refetch, and network awareness.
- [ ] Deepen Legend State with mobile persistence and sync examples.
- [ ] Add WatermelonDB as an offline-first database capability.

The TanStack Query and Legend State depth claims fail at `runtime-verified`. Each closing recipe
must run on a device target, change network or app-focus state, and assert restored data. The
WatermelonDB request fails at `listed`; its closing recipe must create, persist, and reload one
record on a device target.

## Testing

- [ ] Add Detox with meaningful generated E2E setup.

This request fails at `listed`. The closing recipe must build a generated app and pass one Detox
interaction on the maintained CI device target.

## Push Notifications

- [ ] Add OneSignal with mobile-safe environment configuration and setup guidance.

This request fails at `listed`. The closing recipe must register a generated app in a controlled
test environment and observe one notification-open callback without exposing provider secrets.

## OTA Updates

- [ ] Choose a maintained OTA strategy for bare React Native and Expo-compatible outputs. Do not add
      the retired App Center CodePush client/server as a new integration.

This request fails at `listed`. The closing recipe must publish a test update, install it over a
previous generated build, and assert the updated version plus rollback behavior.

## Constraints

- Mobile capabilities must be additive and must not change existing native variant semantics.
- Navigation, UI, testing, push, and OTA are separate Capability Roles; do not collapse them into an
  opaque multi-select config.
- Expo client-visible environment variables use the `EXPO_PUBLIC_` boundary.
- Completion requires generated install/typecheck evidence and a device-appropriate validation plan;
  web-only tests do not prove native behavior.
