/**
 * Business facts and site-wide configuration.
 * Change company details here only; templates read from this file.
 * Items with status "pending" are tracked for launch and are never shown as if confirmed.
 */

// SITE_MODE comes from wrangler.jsonc vars (CLOUDFLARE_ENV=production selects the production block).
// PUBLIC_* values are injected at build time by astro.config.mjs (vite.define).
const buildEnv: Record<string, string | undefined> = {
  SITE_MODE: import.meta.env.SITE_MODE,
  PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
  PUBLIC_ACORN_URL: import.meta.env.PUBLIC_ACORN_URL,
  PUBLIC_TURNSTILE_SITE_KEY: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
};
const env = (key: string): string | undefined => buildEnv[key] || undefined;

/** "preview" (default) adds noindex everywhere and hides the sitemap. "production" is for launch builds. */
export const SITE_MODE: 'preview' | 'production' =
  env('SITE_MODE') === 'production' ? 'production' : 'preview';
export const IS_PREVIEW = SITE_MODE !== 'production';

export const PRODUCTION_ORIGIN = 'https://www.solutionsandimprovements.com';
export const SITE_URL = (env('PUBLIC_SITE_URL') || PRODUCTION_ORIGIN).replace(/\/$/, '');

export const company = {
  name: 'Solutions and Improvements',
  founded: 1990,
  sinceLine: 'Since 1990',
  tagline: 'Construction + Remodeling',
  phoneDisplay: '(219) 433-4846',
  phoneHref: 'tel:+12194334846',
  /** Calls and texts go to the same number (Tony, 2026-11-13). */
  smsHref: 'sms:+12194334846',
  phoneE164: '+12194334846',
  email: 'office@solutionsandimprovements.com',
  /** Administrative office only. City/ZIP formatting is pending confirmation, so it is not shown. */
  adminAddress: '917 Ridge Road, Unit 3561',
  adminAddressNote: 'Administrative office only',
  base: 'Munster, Indiana',
  regionLine: 'Northwest Indiana · South Chicagoland',
  audienceLine: 'Residential · Commercial · Multifamily',
  /** Confirmed by Tony on 2026-11-13. No license number is shown until the owner approves one. */
  familyOwned: true,
  licensedInsured: true,
  team: [
    { name: 'Gabriel Lopez', role: 'Owner' },
    { name: 'Andy Lopez', role: 'Project Manager' },
  ],
  /** Reply times Tony gave on 2026-11-13. */
  replyTimes: {
    phone: 'Calls and texts are answered as fast as we can.',
    email: 'Email usually gets a reply within an hour or two.',
  },
  approach: [
    { title: 'Communication', text: 'You know who to call and what happens next.' },
    { title: 'Craftsmanship', text: 'Careful work, finished properly.' },
    { title: 'Value', text: 'Scope and choices that fit the project and the budget.' },
    { title: 'Problem-solving', text: 'Practical answers when a building surprises us.' },
  ],
} as const;

export const financing = {
  provider: 'Acorn Finance',
  /** Solutions-specific Acorn URL is pending. Leave empty to show text only (no Apply link). */
  url: env('PUBLIC_ACORN_URL') || '',
};

export const cta = {
  label: 'Free consultation',
  longLabel: 'Request a free consultation',
  href: '/contact',
  note: 'Includes an on-site visit.',
};

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Turnstile is optional. When the public key is empty, no widget or third-party script is loaded. */
export const turnstileSiteKey = env('PUBLIC_TURNSTILE_SITE_KEY') || '';

/** Facts deliberately left out of customer copy until confirmed. Mirrored in docs/PENDING-ITEMS.md. */
export const pending = {
  postalCityZip: 'pending',
  businessHours: 'pending',
  acornUrl: financing.url ? 'supplied' : 'pending',
  licenseNumber: 'owner to approve before showing',
  googleReviewsUrl: 'pending (business profile link)',
  newConstructionPhotos: 'pending',
  commercialCaseStudies: 'pending',
  faqAnswers: 'pending',
  teamPortraits: 'pending',
} as const;

/** Website credit (agency link requested by Tony, 2026-11-13). */
export const credit = {
  label: 'Website by SAI Marketing Innovations',
  url: 'https://saimarketinginnovations.com/',
} as const;
