/**
 * Service areas. Regional pages are published; city pages are first drafts.
 *
 * City readiness:
 *  - draft: true      -> content still being reviewed.
 *  - indexReady: false -> never listed in the production sitemap or navigation, and not built in production.
 * Flip indexReady only after the page has genuinely useful local content (for example approved local
 * project photos or owner-confirmed local notes). Do not add city x service combinations.
 */

export interface Region {
  slug: 'indiana' | 'illinois';
  path: string;
  name: string;
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  coverage: string[];
  notes: { title: string; text: string }[];
}

export const regions: Region[] = [
  {
    slug: 'indiana',
    path: '/northwest-indiana-construcion-company',
    name: 'Northwest Indiana',
    short: 'Indiana',
    title: 'Construction & Remodeling Company in Northwest Indiana',
    description:
      'Solutions and Improvements is a Munster-based construction and remodeling company serving Lake and Porter counties, Portage, La Porte and east through South Bend, Indiana.',
    h1: 'Construction & remodeling in Northwest Indiana',
    intro:
      'Founded in 1990 and based in Munster, we work across Lake and Porter counties and east through La Porte and South Bend.',
    coverage: ['Lake County', 'Porter County', 'Portage', 'La Porte', 'East through South Bend'],
    notes: [
      {
        title: 'Consultation & site visit',
        text: 'Our free consultation includes an on-site visit to understand the project and discuss the next steps.',
      },
      {
        title: 'Local permits',
        text: 'Each town and county sets its own permit process. We confirm what applies to your project during planning.',
      },
      {
        title: 'Homes and businesses',
        text: 'Residential remodeling is most of what we do here, alongside commercial and multifamily work.',
      },
    ],
  },
  {
    slug: 'illinois',
    path: '/illinois-construction',
    name: 'South Chicagoland, Illinois',
    short: 'Illinois',
    title: 'Construction & Remodeling in South Chicagoland, Illinois',
    description:
      'Solutions and Improvements serves south Chicago-area communities from Lansing to Mokena, Illinois, with remodeling, additions, new construction and commercial work.',
    h1: 'Construction & remodeling in South Chicagoland',
    intro:
      'Just across the state line from Munster, we work in the southern Chicago suburbs from Lansing west to Mokena, and the communities in between.',
    coverage: ['Lansing', 'Mokena', 'Communities between Lansing and Mokena'],
    notes: [
      {
        title: 'Across the line',
        text: 'Lansing is minutes from our Munster base, so Illinois projects get the same team and the same follow-up.',
      },
      {
        title: 'Local permits',
        text: 'Illinois villages and cities have their own building departments. We confirm requirements for each project.',
      },
      {
        title: 'Remodeling to new builds',
        text: 'Kitchens, baths and additions, plus commercial, multifamily and new construction.',
      },
    ],
  },
];

export interface City {
  slug: string;
  path: string;
  name: string;
  state: 'IN' | 'IL';
  region: Region['slug'];
  county: string;
  /** Short, verifiable orientation. No invented local projects, offices or customer descriptions. */
  intro: string;
  localNotes: string[];
  draft: boolean;
  indexReady: boolean;
  /** Internal review notes. Never rendered in production. */
  reviewNotes: string;
}

const cityReview =
  'Draft template. Needs owner-approved local content (e.g. approved local project photos, real local notes) before indexing.';

export const cities: City[] = [
  {
    slug: 'munster-in',
    path: '/service-areas/munster-in',
    name: 'Munster',
    state: 'IN',
    region: 'indiana',
    county: 'Lake County',
    intro: 'Founded in 1990, Solutions and Improvements is based in Munster.',
    localNotes: [
      'Close to our base, so site visits and follow-up are simple to arrange.',
      'Remodeling, additions and exterior work for homes, plus commercial and multifamily projects.',
      'We confirm local permit requirements for each project during planning.',
    ],
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'st-john-in',
    path: '/service-areas/st-john-in',
    name: 'St. John',
    state: 'IN',
    region: 'indiana',
    county: 'Lake County',
    intro: 'St. John is a short drive south of Munster in Lake County.',
    localNotes: [
      'Kitchens, bathrooms, basements and additions.',
      'Exterior work such as roofing, siding, windows and decks.',
      'We confirm local permit requirements for each project during planning.',
    ],
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'dyer-in',
    path: '/service-areas/dyer-in',
    name: 'Dyer',
    state: 'IN',
    region: 'indiana',
    county: 'Lake County',
    intro: 'Dyer sits next to Munster on the Indiana–Illinois line.',
    localNotes: [
      'Interior remodeling, additions and exterior updates.',
      'Small repairs as well as larger projects.',
      'We confirm local permit requirements for each project during planning.',
    ],
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'crown-point-in',
    path: '/service-areas/crown-point-in',
    name: 'Crown Point',
    state: 'IN',
    region: 'indiana',
    county: 'Lake County',
    intro: 'Crown Point is the Lake County seat, south of Munster.',
    localNotes: [
      'Remodeling, additions and new construction.',
      'Commercial and multifamily work as well as homes.',
      'We confirm local permit requirements for each project during planning.',
    ],
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'mokena-il',
    path: '/service-areas/mokena-il',
    name: 'Mokena',
    state: 'IL',
    region: 'illinois',
    county: 'Will County',
    intro: 'Mokena marks the western edge of our regular Illinois coverage.',
    localNotes: [
      'Kitchens, bathrooms, additions and new construction.',
      'Exterior work and repairs.',
      'We confirm village permit requirements for each project during planning.',
    ],
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'frankfort-il',
    path: '/service-areas/frankfort-il',
    name: 'Frankfort',
    state: 'IL',
    region: 'illinois',
    county: 'Will County',
    intro: 'Frankfort is in Will County, within our South Chicagoland coverage.',
    localNotes: [
      'Interior remodeling, additions and new construction.',
      'Commercial and multifamily projects.',
      'We confirm village permit requirements for each project during planning.',
    ],
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
];

export const regionBySlug = (slug: Region['slug']) => regions.find((r) => r.slug === slug)!;
