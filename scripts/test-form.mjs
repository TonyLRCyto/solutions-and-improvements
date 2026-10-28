#!/usr/bin/env node
/**
 * Checks the consultation endpoint's states against a running server. Sends no email:
 * with no provider configured, a valid request must come back "unavailable" (not sent).
 *   BASE_URL=http://localhost:4321 node scripts/test-form.mjs
 * To check the build-time public-key/no-secret configuration, build/start a local server with a
 * PUBLIC_TURNSTILE_SITE_KEY but no TURNSTILE_SECRET_KEY or mail credentials, then run this script
 * with EXPECT_TURNSTILE_MISCONFIGURED=1. This still sends no email or Turnstile verification request.
 */
const BASE = process.env.BASE_URL || 'http://localhost:4321';
const url = `${BASE}/api/consultation`;
const json = { 'content-type': 'application/json', accept: 'application/json', origin: BASE };
const valid = {
  name: 'Test Person',
  email: 'test@example.com',
  location: 'Munster',
  service: 'kitchens',
  description: 'Replace counters and cabinets in our kitchen.',
  startedAt: String(Date.now() - 10_000),
};
let failed = 0;
// Each check uses its own client IP so the rate limiter doesn't interfere. (Cloudflare overwrites
// cf-connecting-ip in production, so this only works locally.)
let n = 0;
const check = async (label, init, expectStatus, expectBody) => {
  n++;
  const res = await fetch(url, { ...init, headers: { ...(init.headers || {}), 'cf-connecting-ip': `203.0.113.${n}` } });
  const type = res.headers.get('content-type') || '';
  const body = type.includes('json') ? await res.json() : await res.text();
  const ok = res.status === expectStatus && (!expectBody || expectBody(body));
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}  -> ${res.status} ${typeof body === 'string' ? body.slice(0, 60) : body.status}`);
};

await check('valid request, no provider configured -> unavailable / not sent', { method: 'POST', headers: json, body: JSON.stringify(valid) }, 503, (b) => b.status === 'unavailable' && /not sent|nothing was sent/.test(b.message));
for (const [shape, body] of [['null', 'null'], ['string', '"example"'], ['number', '42'], ['array', '[]']]) {
  await check(`JSON ${shape} is not a form object -> 400`, { method: 'POST', headers: json, body }, 400, (b) => b.status === 'invalid');
}
await check('malformed JSON -> 400', { method: 'POST', headers: json, body: '{' }, 400, (b) => b.status === 'invalid');
if (process.env.EXPECT_TURNSTILE_MISCONFIGURED === '1') {
  await check('public Turnstile key without secret fails closed before mail delivery', { method: 'POST', headers: json, body: JSON.stringify(valid) }, 503, (b) => b.status === 'unavailable' && /form isn’t fully configured/.test(b.message));
}
await check('missing required fields -> 422 with field errors', { method: 'POST', headers: json, body: JSON.stringify({ name: '' }) }, 422, (b) => b.errors?.name && b.errors?.contact && b.errors?.location && b.errors?.service && b.errors?.description);
await check('phone only is enough', { method: 'POST', headers: json, body: JSON.stringify({ ...valid, email: '', phone: '(219) 555-0123' }) }, 503);
await check('preferred contact email without email -> 422', { method: 'POST', headers: json, body: JSON.stringify({ ...valid, email: '', phone: '219-555-0123', contactPref: 'email' }) }, 422, (b) => !!b.errors?.email);
await check('unknown service value -> 422', { method: 'POST', headers: json, body: JSON.stringify({ ...valid, service: 'pool' }) }, 422, (b) => !!b.errors?.service);
await check('honeypot filled -> rejected', { method: 'POST', headers: json, body: JSON.stringify({ ...valid, website: 'http://x' }) }, 400, (b) => b.status === 'rejected');
await check('submitted too fast -> rejected', { method: 'POST', headers: json, body: JSON.stringify({ ...valid, startedAt: String(Date.now()) }) }, 400, (b) => b.status === 'rejected');
await check('cross-origin -> 403', { method: 'POST', headers: { ...json, origin: 'https://example.org' }, body: '{}' }, 403);
await check('invalid Origin URL -> 403', { method: 'POST', headers: { ...json, origin: 'not-a-url' }, body: '{}' }, 403);
await check('opaque Origin -> 403', { method: 'POST', headers: { ...json, origin: 'null' }, body: '{}' }, 403);
await check('oversized body -> 413', { method: 'POST', headers: json, body: JSON.stringify({ ...valid, description: 'x'.repeat(20_000) }) }, 413);
await check('no-JS form post -> HTML page', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', origin: BASE }, body: new URLSearchParams(valid).toString() }, 503, (b) => typeof b === 'string' && b.includes('<h1>Your request was not sent</h1>'));
await check('GET -> 405', { method: 'GET' }, 405);
let limited = false;
for (let i = 0; i < 10; i++) {
  const r = await fetch(url, { method: 'POST', headers: { ...json, 'cf-connecting-ip': '198.51.100.7' }, body: '{}' });
  if (r.status === 429) limited = true;
}
console.log(`${limited ? 'PASS' : 'FAIL'}  rate limit reached after repeated requests`);
if (!limited) failed++;
process.exitCode = failed ? 1 : 0;
