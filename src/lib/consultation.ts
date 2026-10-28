/**
 * Consultation request: shared field definitions and server-side validation.
 * Used by the API endpoint (authoritative) and mirrored by the client script for instant feedback.
 */
import { formServices } from '../data/form-options';

export const propertyTypes = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'multifamily', label: 'Multifamily' },
  { value: 'other', label: 'Other / Not sure' },
] as const;

export const contactPrefs = [
  { value: 'phone', label: 'Phone' },
  { value: 'text', label: 'Text message' },
  { value: 'email', label: 'Email' },
] as const;

export const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  location: 80,
  description: { min: 10, max: 2000 },
  /** Whole request body, bytes. */
  body: 16_000,
} as const;

/** The only fields the endpoint accepts. Anything else is ignored. */
export const FIELD_NAMES = [
  'name',
  'email',
  'phone',
  'location',
  'service',
  'property',
  'description',
  'contactPref',
  'topic',
  'website', // honeypot
  'startedAt',
  'idempotencyKey',
  'cf-turnstile-response',
] as const;

export interface Consultation {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  serviceLabel: string;
  property: string;
  propertyLabel: string;
  description: string;
  contactPref: string;
  topic: string;
}

export type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'location' | 'service' | 'description' | 'contact', string>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE_ALLOWED = /^[+()0-9.\-\s]{7,30}$/;

/** Collapse whitespace and strip control characters (prevents header injection and log forging). */
export const clean = (v: unknown, max: number): string =>
  String(v ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n?/g, '\n')
    .trim()
    .slice(0, max);

const oneLine = (v: unknown, max: number) => clean(v, max).replace(/\s+/g, ' ');

export function validate(input: Record<string, unknown>): { data: Consultation; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = oneLine(input.name, LIMITS.name + 1);
  const email = oneLine(input.email, LIMITS.email + 1).toLowerCase();
  const phone = oneLine(input.phone, LIMITS.phone + 1);
  const location = oneLine(input.location, LIMITS.location + 1);
  const service = oneLine(input.service, 40);
  const property = oneLine(input.property, 40);
  const description = clean(input.description, LIMITS.description.max + 1);
  const contactPref = oneLine(input.contactPref, 20);
  const topic = oneLine(input.topic, 60).replace(/[^a-z0-9-]/g, '');

  if (!name) errors.name = 'Enter your name.';
  else if (name.length > LIMITS.name) errors.name = `Use ${LIMITS.name} characters or fewer.`;

  if (email && (email.length > LIMITS.email || !EMAIL_RE.test(email))) errors.email = 'Enter a valid email address, like name@example.com.';
  const phoneDigits = phone.replace(/\D/g, '');
  if (phone && (!PHONE_ALLOWED.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15))
    errors.phone = 'Enter a phone number with area code, like 219-555-0123.';
  if (!email && !phone) errors.contact = 'Enter an email address or a phone number so we can reach you.';
  if (!errors.contact && contactPref === 'email' && !email) errors.email = 'Add an email address, or choose another way to reach you.';
  if (!errors.contact && (contactPref === 'phone' || contactPref === 'text') && !phone)
    errors.phone = 'Add a phone number, or choose another way to reach you.';

  if (!location) errors.location = 'Enter the project city or ZIP code.';
  else if (location.length > LIMITS.location) errors.location = `Use ${LIMITS.location} characters or fewer.`;

  const svc = formServices.find((s) => s.value === service);
  if (!svc) errors.service = 'Choose the type of project.';

  if (!description) errors.description = 'Tell us briefly about the project.';
  else if (description.length < LIMITS.description.min) errors.description = 'Add a little more detail (at least a few words).';
  else if (description.length > LIMITS.description.max)
    errors.description = `Keep it under ${LIMITS.description.max} characters. You can share more when we follow up.`;

  const prop = propertyTypes.find((p) => p.value === property);
  const pref = contactPrefs.find((p) => p.value === contactPref);

  return {
    data: {
      name,
      email,
      phone,
      location,
      service: svc?.value ?? '',
      serviceLabel: svc?.label ?? '',
      property: prop?.value ?? '',
      propertyLabel: prop?.label ?? 'Not specified',
      description,
      contactPref: pref?.value ?? '',
      topic,
    },
    errors,
  };
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Office notification email. All visitor values are escaped; nothing visitor-supplied goes in headers except a validated Reply-To. */
export function formatEmail(d: Consultation, meta: { submittedAt: string; site: string }) {
  const rows: [string, string][] = [
    ['Name', d.name],
    ['Email', d.email || '—'],
    ['Phone', d.phone || '—'],
    ['Preferred contact', contactPrefs.find((p) => p.value === d.contactPref)?.label ?? 'No preference'],
    ['Project city / ZIP', d.location],
    ['Service', d.serviceLabel],
    ['Property type', d.propertyLabel],
    ['Page topic', d.topic || '—'],
  ];
  const subject = `Consultation request: ${d.serviceLabel} in ${d.location}`.replace(/[\r\n]+/g, ' ').slice(0, 150);
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
    `\n\nProject description:\n${d.description}\n\nSubmitted ${meta.submittedAt} via ${meta.site}/contact`;
  const html =
    `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
    rows.map(([k, v]) => `<tr><th align="left" style="color:#555">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join('') +
    `</table><p style="font-family:Arial,sans-serif;font-size:14px"><strong>Project description</strong><br>${escapeHtml(d.description).replace(/\n/g, '<br>')}</p>` +
    `<p style="font-family:Arial,sans-serif;font-size:12px;color:#777">Submitted ${escapeHtml(meta.submittedAt)} via ${escapeHtml(meta.site)}/contact</p>`;
  return { subject, text, html };
}
