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
    coverage: ['Mokena & Frankfort', 'Orland Park & Tinley Park', 'Homewood & Flossmoor', 'Lansing and the communities in between'],
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
  /** Useful local planning context, linked to the municipality's own guidance. */
  planning: { text: string; preparation: string; resourceLabel: string; resourceUrl: string };
  draft: boolean;
  indexReady: boolean;
  /** Internal review notes. Never rendered in production. */
  reviewNotes: string;
}

const cityReview =
  'Community page draft: local content and project details are being reviewed before launch.';

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
    planning: {
      text: 'Munster has a dedicated application for one- and two-family remodels, alterations and accessory structures. A clear scope helps identify the right review path before work starts.',
      preparation: 'Bring any existing plans and a short list of layout, structural or exterior changes you have in mind.',
      resourceLabel: 'Munster remodel & alteration application (PDF)',
      resourceUrl: 'https://www.munster.org/egov/apps/document/center.egov?id=3822&view=item',
    },
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
    planning: {
      text: 'St. John publishes guidance for additions, remodels, roofs, decks and new construction. Its deck guidance also distinguishes town requirements from subdivision or HOA rules.',
      preparation: 'For an addition or outdoor project, have your survey and any subdivision or HOA guidelines available at the consultation.',
      resourceLabel: 'St. John building & planning guidance',
      resourceUrl: 'https://stjohnin.gov/building-and-planning/',
    },
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
    planning: {
      text: 'Dyer’s building and zoning application asks for the project location, subdivision, work description and contractor information. We start with the actual scope and property rather than a one-size-fits-all plan.',
      preparation: 'Share the property address, any available survey and the rooms or outside areas you want to change.',
      resourceLabel: 'Dyer building & zoning application (PDF)',
      resourceUrl: 'https://www.townofdyer.com/Portals/0/Content/Forms/Building_Permit_Application.pdf',
    },
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
    planning: {
      text: 'Crown Point’s inspection guidance separates building, electrical, plumbing and mechanical inspections. Work that involves several trades needs those stages included in the schedule.',
      preparation: 'Tell us about wall moves, plumbing changes and electrical updates so the proposal can account for each trade.',
      resourceLabel: 'Crown Point inspection guidance (PDF)',
      resourceUrl: 'https://www.crownpoint.in.gov/DocumentCenter/View/2000/Crown-Point-Inspections_Updated-2024',
    },
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'schererville-in',
    path: '/service-areas/schererville-in',
    name: 'Schererville',
    state: 'IN',
    region: 'indiana',
    county: 'Lake County',
    intro: 'Our Munster-based team serves Schererville with remodeling, additions and construction for homes and businesses.',
    localNotes: ['Kitchen and bathroom updates, from finishes to layout changes.', 'Additions, exterior improvements and new construction.', 'Smaller repairs, commercial spaces and multifamily projects are welcome.'],
    planning: {
      text: 'Schererville’s inspection checklist identifies rough and final stages for building and trade work. Plans and access to the work area are part of preparing for those inspections.',
      preparation: 'Let us know whether you will occupy the property during construction so we can discuss access and daily use of the space.',
      resourceLabel: 'Schererville inspection checklist (PDF)',
      resourceUrl: 'https://www.schererville.org/egov/apps/document/center.egov?id=123&view=item',
    },
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'winfield-in',
    path: '/service-areas/winfield-in',
    name: 'Winfield',
    state: 'IN',
    region: 'indiana',
    county: 'Lake County',
    intro: 'Planning a home improvement, addition or new build in Winfield? We start with a free consultation and an on-site visit.',
    localNotes: ['Kitchens and bathrooms designed around the way you use your home.', 'Room additions and new residential construction.', 'Exterior work, repairs, and commercial or multifamily projects.'],
    planning: {
      text: 'Winfield’s concrete application asks for a survey showing the work area, setbacks and lot information. Outdoor improvements need the site considered alongside the finish you want.',
      preparation: 'For patios, walks or other site work, have your survey available and point out drainage concerns during the visit.',
      resourceLabel: 'Winfield concrete permit application (PDF)',
      resourceUrl: 'https://www.winfield.in.gov/media/2956',
    },
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
    planning: {
      text: 'Mokena’s Community Development team oversees permit review and construction inspections, with separate guidance for different permit types and work exempt from permitting.',
      preparation: 'Bring inspiration photos and your priorities. We can discuss which changes are cosmetic and which may affect structure or building systems.',
      resourceLabel: 'Mokena construction & permit information',
      resourceUrl: 'https://www.mokena.gov/pview.aspx?catid=0&id=20806',
    },
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
    county: 'Will & Cook counties',
    intro: 'Frankfort is in Will County, within our South Chicagoland coverage.',
    localNotes: [
      'Interior remodeling, additions and new construction.',
      'Commercial and multifamily projects.',
      'We confirm village permit requirements for each project during planning.',
    ],
    planning: {
      text: 'Frankfort’s residential construction guide calls for coordinated plans and site information, with developer or HOA approval where applicable. Those documents are worth discussing early for a new build.',
      preparation: 'For new construction, share the lot survey, any existing plans and subdivision requirements before design decisions are finalized.',
      resourceLabel: 'Frankfort residential construction guide (PDF)',
      resourceUrl: 'https://www.frankfortil.org/Residential%20construction%20guidelines%20updated%203.03.2022.pdf',
    },
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'orland-park-il',
    path: '/service-areas/orland-park-il',
    name: 'Orland Park',
    state: 'IL',
    region: 'illinois',
    county: 'Cook & Will counties',
    intro: 'We serve Orland Park with kitchen and bathroom remodeling, additions and construction, alongside commercial and multifamily work.',
    localNotes: ['Kitchen layouts, cabinets, surfaces and lighting.', 'Bathroom remodels and room additions.', 'New construction, exterior updates and smaller improvements.'],
    planning: {
      text: 'Orland Park reviews a range of projects through its online permit portal. Exterior changes to a commercial building can also involve an appearance or development review.',
      preparation: 'For a business project, share both the interior scope and any storefront or exterior changes so they can be considered together.',
      resourceLabel: 'Orland Park building permit information',
      resourceUrl: 'https://www.orlandpark.org/departments/development-services/building-permit-information',
    },
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'tinley-park-il',
    path: '/service-areas/tinley-park-il',
    name: 'Tinley Park',
    state: 'IL',
    region: 'illinois',
    county: 'Cook & Will counties',
    intro: 'From a room renovation to a larger build, we bring planning, project coordination and construction to Tinley Park properties.',
    localNotes: ['Bathrooms and kitchens, including layout changes.', 'Additions and new residential construction.', 'Commercial build-outs, multifamily improvements and repairs.'],
    planning: {
      text: 'Tinley Park provides separate kitchen and bathroom remodel guides as well as information for additions and commercial build-outs. The project type helps determine the documents needed.',
      preparation: 'List the walls, plumbing fixtures and appliances you want to relocate; those details help define the scope of a remodel.',
      resourceLabel: 'Tinley Park permits & remodeling guides',
      resourceUrl: 'https://www.tinleypark.org/government/departments/community_development/building/building_permits.php',
    },
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'homewood-il',
    path: '/service-areas/homewood-il',
    name: 'Homewood',
    state: 'IL',
    region: 'illinois',
    county: 'Cook County',
    intro: 'Our team serves Homewood with interior remodeling, additions and building improvements for residential and commercial properties.',
    localNotes: ['Kitchens and bathrooms that work better for everyday life.', 'Additions, exterior repairs and larger renovations.', 'Commercial and multifamily projects, with no minimum project size.'],
    planning: {
      text: 'Homewood publishes guidance for interior remodels, additions and exterior work. Its building information also covers temporary dumpsters and tree preservation when a project affects the lot.',
      preparation: 'For an addition or exterior project, discuss material storage, dumpster placement and nearby trees during the site visit.',
      resourceLabel: 'Homewood building & project information',
      resourceUrl: 'https://www.village.homewood.il.us/how-do-i/apply-for/building-permits?navid=157',
    },
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
  {
    slug: 'flossmoor-il',
    path: '/service-areas/flossmoor-il',
    name: 'Flossmoor',
    state: 'IL',
    region: 'illinois',
    county: 'Cook County',
    intro: 'We help Flossmoor property owners plan and build kitchen and bathroom updates, additions and broader improvements.',
    localNotes: ['Interior remodeling with design and project coordination.', 'Additions, new builds and exterior improvements.', 'Small projects as well as commercial and multifamily work.'],
    planning: {
      text: 'Flossmoor provides project-specific fact sheets for remodels, additions, decks and exterior changes. Its permit guidance calls for applicable HOA approval to accompany an application.',
      preparation: 'If your property has an HOA, bring its requirements alongside the survey and any existing plans.',
      resourceLabel: 'Flossmoor permit fact sheets & applications',
      resourceUrl: 'https://www.flossmoor.org/156/Permit-Fact-Sheets-Applications',
    },
    draft: true,
    indexReady: false,
    reviewNotes: cityReview,
  },
];

export const regionBySlug = (slug: Region['slug']) => regions.find((r) => r.slug === slug)!;
