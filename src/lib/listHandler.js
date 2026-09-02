import { toClient } from './serialize.js'
import { cached } from './cache.js'

// Catalogue data changes rarely and is identical for every visitor, so serve it
// from the CDN instead of hitting Postgres per request. s-maxage caps how stale
// an edge copy can be; stale-while-revalidate lets the edge keep serving the old
// copy while it refreshes in the background, so a cache miss never queues
// requests behind a database round-trip.
const CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=3600'

// Shorter than s-maxage: this only has to absorb the burst of simultaneous
// misses that reach a single instance, not act as the primary cache.
const MEMORY_TTL_MS = 30_000

// Hard ceiling so a table that grows unexpectedly can never return an unbounded
// payload. Pass ?limit= to request fewer.
const DEFAULT_LIMIT = 100
const MAX_LIMIT = 500

export function listHandler(delegate, cacheKey) {
  return async function handler(req, res) {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      return res.status(405).json({ message: 'Method not allowed' })
    }

    const requested = Number.parseInt(req.query.limit, 10)
    const take = Number.isFinite(requested)
      ? Math.min(Math.max(requested, 1), MAX_LIMIT)
      : DEFAULT_LIMIT

    try {
      const payload = await cached(`${cacheKey}:${take}`, MEMORY_TTL_MS, async () => {
        const rows = await delegate.findMany({ orderBy: { createdAt: 'desc' }, take })
        return toClient(rows)
      })
      res.setHeader('Cache-Control', CACHE_CONTROL)
      res.json(payload)
    } catch (err) {
      console.error(err)
      // Never leak driver/schema internals to the client.
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
