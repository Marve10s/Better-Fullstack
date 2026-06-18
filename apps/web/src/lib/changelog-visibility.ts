const CHANGELOG_INTERACTION_STORAGE_PREFIX = "better-fullstack.changelog.interaction";

export type ChangelogInteractionState = "opened" | "closed";

type ChangelogReadableStorage = Pick<Storage, "getItem">;
type ChangelogWritableStorage = Pick<Storage, "setItem">;

export function getChangelogInteractionStorageKey(version: string): string {
  return `${CHANGELOG_INTERACTION_STORAGE_PREFIX}:${version}`;
}

export function shouldShowChangelogRelease(
  storage: ChangelogReadableStorage,
  version: string | undefined,
): boolean {
  if (!version) return false;
  return storage.getItem(getChangelogInteractionStorageKey(version)) === null;
}

export function markChangelogReleaseInteracted(
  storage: ChangelogWritableStorage,
  version: string | undefined,
  state: ChangelogInteractionState,
): void {
  if (!version) return;
  storage.setItem(getChangelogInteractionStorageKey(version), state);
}
