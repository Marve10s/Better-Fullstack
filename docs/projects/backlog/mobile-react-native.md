# Mobile / React Native Expansion

Current native options are `native-bare`, `native-uniwind`, and `native-unistyles`. Capacitor and
Expo Web scripts/dependencies already ship. Only unfinished mobile depth remains below.

## UI

- [ ] Add React Native Paper when demand justifies a mobile-specific UI capability.

## State and Data

- [ ] Deepen TanStack Query with offline persistence, app-focus refetch, and network awareness.
- [ ] Deepen Legend State with mobile persistence and sync examples.
- [ ] Add WatermelonDB as an offline-first database capability.

## Testing

- [ ] Add Detox with meaningful generated E2E setup.

## Push Notifications

- [ ] Add OneSignal with mobile-safe environment configuration and setup guidance.

## OTA Updates

- [ ] Choose a maintained OTA strategy for bare React Native and Expo-compatible outputs. Do not add
      the retired App Center CodePush client/server as a new integration.

## Constraints

- Mobile capabilities must be additive and must not change existing native variant semantics.
- Navigation, UI, testing, push, and OTA are separate Capability Roles; do not collapse them into an
  opaque multi-select config.
- Expo client-visible environment variables use the `EXPO_PUBLIC_` boundary.
- Completion requires generated install/typecheck evidence and a device-appropriate validation plan;
  web-only tests do not prove native behavior.
