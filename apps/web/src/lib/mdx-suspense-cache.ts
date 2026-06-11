/**
 * Minimal suspense-compatible async cache: the first read kicks off the load
 * and suspends (throws the promise); subsequent reads return the cached
 * value. Used to load compiled MDX modules on demand so docs/guides content
 * stays out of the app entry chunk.
 */
type CacheEntry<T> =
  | { status: "pending"; promise: Promise<void> }
  | { status: "resolved"; value: T }
  | { status: "rejected"; error: unknown };

export function createSuspenseCache<T>() {
  const cache = new Map<string, CacheEntry<T>>();

  function start(key: string, load: () => Promise<T>): CacheEntry<T> {
    const entry: CacheEntry<T> = {
      status: "pending",
      promise: (async () => {
        try {
          const value = await load();
          cache.set(key, { status: "resolved", value });
        } catch (error) {
          cache.set(key, { status: "rejected", error });
        }
      })(),
    };
    cache.set(key, entry);
    return entry;
  }

  function read(key: string, load: () => Promise<T>): T {
    const entry = cache.get(key) ?? start(key, load);
    if (entry.status === "resolved") return entry.value;
    if (entry.status === "rejected") throw entry.error;
    throw entry.promise;
  }

  /** Kick off the load without suspending — call from route loaders. */
  function preload(key: string, load: () => Promise<T>): void {
    if (!cache.has(key)) start(key, load);
  }

  return { read, preload };
}
