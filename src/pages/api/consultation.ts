/**
 * POST /api/consultation — the only on-demand route.
 *
 * Honest delivery: "accepted" is returned only when the configured mail provider accepted the message.
 * Without credentials the endpoint answers "unavailable" and the page shows phone/email instead.
 * Personal data is never logged.
 */
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { FIELD_NAMES, LIMITS, validate, formatEmail } from '../../lib/consultation';
import { company, turnstileSiteKey } from '../../data/site';
import { sendMail, mailConfigured, type MailEnv } from '../../lib/mail';
import { verifyTurnstile } from '../../lib/turnstile';

export const prerender = false;

interface Env extends MailEnv {
  SITE_MODE?: string;
  PUBLIC_SITE_URL?: string;
  TURNSTILE_SECRET_KEY?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;
  CONSULT_RATE_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> };
  DEV_MOCK_DELIVERY?: string;
}

const alt = { phone: company.phoneDisplay, phoneHref: company.phoneHref, email: company.email };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Plain HTML answer for browsers submitting without JavaScript. */
const htmlPage = (status: number, body: Record<string, unknown>) => {
  const ok = body.status === 'accepted';
  const errs = body.errors ? Object.values(body.errors as Record<string, string>) : [];
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${ok ? 'Request received' : 'Request not sent'} | ${esc(company.name)}</title>` +
      `<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1.25rem;line-height:1.6;color:#111d2c}a{color:#204697}</style></head><body>` +
      `<h1>${ok ? 'Request received' : 'Your request was not sent'}</h1><p>${esc(String(body.message ?? ''))}</p>` +
      (errs.length ? `<ul>${errs.map((m) => `<li>${esc(m)}</li>`).join('')}</ul><p>Use your browser’s Back button to correct the form; your entries should still be there.</p>` : '') +
      (ok ? '' : `<p>You can also call <a href="${company.phoneHref}">${company.phoneDisplay}</a> or email <a href="mailto:${company.email}">${company.email}</a>.</p>`) +
      `<p><a href="/">Back to the home page</a></p></body></html>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } },
  );
};

const jsonRes = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify({ ...body, alt }), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' },
  });

// Best-effort fallback when the rate-limit binding is not configured (per isolate only).
const recent = new Map<string, number[]>();
function memoryLimited(key: string, limit = 6, windowMs = 60_000) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > limit;
}

// Short-lived duplicate guard for retries/double clicks (per isolate). Provider idempotency covers the rest.
const seenKeys = new Map<string, { at: number; body: Record<string, unknown> }>();

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const e = env as unknown as Env;
  const wantsHtml = !(request.headers.get('accept') || '').includes('application/json');
  const json = (status: number, body: Record<string, unknown>) => (wantsHtml ? htmlPage(status, body) : jsonRes(status, body));
  const siteUrl = (e.PUBLIC_SITE_URL || 'https://www.solutionsandimprovements.com').replace(/\/$/, '');

  // Same-origin check: browsers send Origin on POST.
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return json(403, { status: 'error', message: 'This form can only be sent from the website.' });
      }
    } catch {
      return json(403, { status: 'error', message: 'This form can only be sent from the website.' });
    }
  }

  const len = Number(request.headers.get('content-length') || '0');
  if (len > LIMITS.body) return json(413, { status: 'invalid', message: 'That request is too large.' });

  let raw: Record<string, unknown> = {};
  try {
    const type = request.headers.get('content-type') || '';
    const text = await request.text();
    if (text.length > LIMITS.body) return json(413, { status: 'invalid', message: 'That request is too large.' });
    if (type.includes('application/json')) {
      const parsed: unknown = JSON.parse(text);
      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed) || Object.getPrototypeOf(parsed) !== Object.prototype) {
        return json(400, { status: 'invalid', message: 'The form could not be read. Please try again.' });
      }
      raw = parsed as Record<string, unknown>;
    } else raw = Object.fromEntries(new URLSearchParams(text));
  } catch {
    return json(400, { status: 'invalid', message: 'The form could not be read. Please try again.' });
  }
  // Accept only expected fields.
  const input: Record<string, unknown> = {};
  for (const k of FIELD_NAMES) if (k in raw) input[k] = raw[k];

  const ip = request.headers.get('cf-connecting-ip') || clientAddress || 'unknown';
  const limited = e.CONSULT_RATE_LIMITER
    ? !(await e.CONSULT_RATE_LIMITER.limit({ key: ip }).catch(() => ({ success: true }))).success
    : memoryLimited(ip);
  if (limited) {
    return json(429, { status: 'rate_limited', message: 'Too many requests in a short time. Please wait a minute, or call or email us.' });
  }

  // Spam checks: honeypot and implausibly fast submissions.
  const started = Number(input.startedAt);
  if (String(input.website ?? '').trim() !== '' || (Number.isFinite(started) && started > 0 && Date.now() - started < 2500)) {
    return json(400, { status: 'rejected', message: 'We couldn’t accept this request automatically. Please call or email us instead.' });
  }

  const { data, errors } = validate(input);
  if (Object.keys(errors).length) {
    return json(422, { status: 'invalid', errors, message: 'Please check the highlighted fields.' });
  }

  const idemKey = String(input.idempotencyKey ?? '').replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64);
  const cached = idemKey ? seenKeys.get(idemKey) : undefined;
  if (cached && Date.now() - cached.at < 10 * 60_000) return json(200, cached.body);

  // Turnstile: if a secret is configured, a valid token is required. If only a site key is set, fail closed.
  if (e.TURNSTILE_SECRET_KEY) {
    const ok = await verifyTurnstile(e.TURNSTILE_SECRET_KEY, String(input['cf-turnstile-response'] ?? ''), ip, idemKey);
    if (!ok) return json(400, { status: 'challenge_failed', message: 'The spam check expired or failed. Please try again.' });
  } else if (e.PUBLIC_TURNSTILE_SITE_KEY || turnstileSiteKey) {
    return json(503, { status: 'unavailable', message: 'The form isn’t fully configured yet, so nothing was sent.' });
  }

  if (!mailConfigured(e)) {
    if (import.meta.env.DEV && e.DEV_MOCK_DELIVERY === '1') {
      return json(200, { status: 'mock', message: 'Development mock: the form validated, but nothing was sent.' });
    }
    return json(503, {
      status: 'unavailable',
      preview: e.SITE_MODE !== 'production',
      message: 'Online requests aren’t connected yet, so this request was not sent.',
    });
  }

  const mail = formatEmail(data, { submittedAt: new Date().toISOString(), site: siteUrl });
  const result = await sendMail(e, { ...mail, replyTo: data.email || undefined, idempotencyKey: idemKey || undefined });
  if (!result.ok) {
    console.error('consultation: provider rejected', { provider: e.MAIL_PROVIDER, code: result.code }); // no personal data
    return json(502, { status: 'error', message: 'We couldn’t send your request just now. Your details are still in the form, so you can try again.' });
  }

  const body = { status: 'accepted', message: 'Thank you. Your request was received by our system. We’ll follow up by phone or message to arrange the consultation.' };
  if (idemKey) seenKeys.set(idemKey, { at: Date.now(), body });
  return json(200, body);
};

export const ALL: APIRoute = () =>
  new Response('Method not allowed', { status: 405, headers: { allow: 'POST', 'x-robots-tag': 'noindex' } });
