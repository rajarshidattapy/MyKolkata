// Tests for the shared list endpoint wrapper: method guard, limit clamping,
// cache headers, and error hygiene.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { listHandler } from '../src/lib/listHandler.js'

function mockRes() {
  return {
    statusCode: 200, headers: {}, body: undefined,
    setHeader(k, v) { this.headers[k.toLowerCase()] = v },
    status(c) { this.statusCode = c; return this },
    json(b) { this.body = b; return this },
  }
}
// Unique key per call so tests don't share cache entries.
let n = 0
const delegateReturning = (rows) => ({ findMany: async (args) => { delegateReturning.lastArgs = args; return rows } })

test('rejects non-GET with 405 and an Allow header', async () => {
  const res = mockRes()
  await listHandler(delegateReturning([]), `k${n++}`)({ method: 'POST', query: {} }, res)
  assert.equal(res.statusCode, 405)
  assert.equal(res.headers.allow, 'GET')
})

test('sets a CDN cache-control header on success', async () => {
  const res = mockRes()
  await listHandler(delegateReturning([{ id: 'a' }]), `k${n++}`)({ method: 'GET', query: {} }, res)
  assert.equal(res.statusCode, 200)
  assert.match(res.headers['cache-control'], /s-maxage=\d+/)
  assert.match(res.headers['cache-control'], /stale-while-revalidate=\d+/)
})

test('applies a default limit when none is given', async () => {
  const d = delegateReturning([])
  await listHandler(d, `k${n++}`)({ method: 'GET', query: {} }, mockRes())
  assert.equal(delegateReturning.lastArgs.take, 100)
})

test('clamps an oversized limit to the maximum', async () => {
  await listHandler(delegateReturning([]), `k${n++}`)({ method: 'GET', query: { limit: '99999' } }, mockRes())
  assert.equal(delegateReturning.lastArgs.take, 500)
})

test('rejects a nonsense limit by falling back to the default', async () => {
  await listHandler(delegateReturning([]), `k${n++}`)({ method: 'GET', query: { limit: 'abc' } }, mockRes())
  assert.equal(delegateReturning.lastArgs.take, 100)
})

test('orders newest first', async () => {
  await listHandler(delegateReturning([]), `k${n++}`)({ method: 'GET', query: {} }, mockRes())
  assert.deepEqual(delegateReturning.lastArgs.orderBy, { createdAt: 'desc' })
})

test('adds the _id alias the client expects', async () => {
  const res = mockRes()
  await listHandler(delegateReturning([{ id: 'abc', name: 'x' }]), `k${n++}`)({ method: 'GET', query: {} }, res)
  assert.equal(res.body[0]._id, 'abc')
  assert.equal(res.body[0].id, 'abc')
})

test('does not leak internal error details to the client', async () => {
  const res = mockRes()
  const failing = { findMany: async () => { throw new Error('connect ECONNREFUSED 10.0.0.1:5432') } }
  await listHandler(failing, `k${n++}`)({ method: 'GET', query: {} }, res)
  assert.equal(res.statusCode, 500)
  assert.equal(res.body.message, 'Internal server error')
  assert.doesNotMatch(JSON.stringify(res.body), /ECONNREFUSED|5432/)
})
