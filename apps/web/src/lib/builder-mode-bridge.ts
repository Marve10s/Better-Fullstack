import { useSyncExternalStore } from "react";

/**
 * Bridge between the StackBuilder (which owns the live stack state) and the
 * global Navbar (rendered in __root, outside the builder tree).
 *
 * The builder publishes its current creation mode + the handlers to switch it;
 * the Navbar reads the mode to render the Solo / Multi-Ecosystem toggle and
 * calls the handlers when the user flips it. When the builder unmounts (i.e. on
 * any non-builder page) the bridge is cleared and the Navbar hides the toggle.
 */

export type BuilderMode = "solo" | "multi";

type BridgeState = {
  active: boolean;
  mode: BuilderMode;
  setMode: (mode: BuilderMode) => void;
};

const INACTIVE: BridgeState = {
  active: false,
  mode: "solo",
  setMode: () => {},
};

let state: BridgeState = INACTIVE;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function publishBuilderMode(mode: BuilderMode, setMode: (mode: BuilderMode) => void) {
  state = { active: true, mode, setMode };
  emit();
}

export function clearBuilderMode() {
  if (!state.active) return;
  state = INACTIVE;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function useBuilderMode(): BridgeState {
  return useSyncExternalStore(subscribe, getSnapshot, () => INACTIVE);
}
