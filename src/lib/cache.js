// Per-instance in-memory cache with single-flight.
//
// The CDN absorbs most repeat traffic, but every edge miss, every cold region
// and every cache expiry still lands on the origin. Without this, a burst of
// N simultaneous misses becomes N identical database queries. This collapses
// them into one in-flight query per key and serves the rest from memory.
//
// Deliberately unbounded-safe: the key space is fixed (one per list endpoint).

const store = new Map() // key -> { value, expiresAt }
const inflight = new Map() // key -> Promise

export function cached(key, ttlMs, loader) {
  const hit = store.get(key)
  if (hit && hit.expiresAt > Date.now()) return Promise.resolve(hit.value)

  // Single-flight: concurrent misses for the same key share one query.
  const pending = inflight.get(key)
  if (pending) return pending

  const promise = Promise.resolve()
    .then(loader)
    .then((value) => {
      store.set(key, { value, expiresAt: Date.now() + ttlMs })
      return value
    })
    .catch((err) => {
      // On failure, serve stale data if we have any rather than erroring out.
      if (hit) return hit.value
      throw err
    })
    .finally(() => inflight.delete(key))

  inflight.set(key, promise)
  return promise
}
