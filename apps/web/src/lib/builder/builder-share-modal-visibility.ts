export const BUILDER_SHARE_MODAL_STORAGE_KEY =
  "better-fullstack.builder-share-modal.v2";

type BuilderShareReadableStorage = Pick<Storage, "getItem">;
type BuilderShareWritableStorage = Pick<Storage, "setItem">;

export function isBuilderRoute(pathname: string): boolean {
  return pathname === "/new" || pathname === "/stack";
}

export function hasSeenBuilderShareModal(
  storage: BuilderShareReadableStorage,
): boolean {
  return storage.getItem(BUILDER_SHARE_MODAL_STORAGE_KEY) !== null;
}

export function markBuilderShareModalSeen(
  storage: BuilderShareWritableStorage,
): void {
  storage.setItem(BUILDER_SHARE_MODAL_STORAGE_KEY, "seen");
}
