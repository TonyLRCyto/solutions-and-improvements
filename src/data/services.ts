/**
 * Service taxonomy. Every retained legacy service path is listed here so the old address keeps working.
 * Copy is deliberately short. Do not add credentials, prices, timelines or warranty language
 * unless the owner has confirmed them.
 */
import type { PhotoKey } from './photos';

import { formServices, type FormServiceValue } from './form-options';
export { formServices, type FormServiceValue };

export type ServiceGroupId = 'interior' | 'exterior' | 'structure' | 'mechanical-services' | 'property';

export const serviceGroups: { id: ServiceGroupId; title: string; text: string }[] = [
  { id: 'interior', title: 'Interiors', text: 'Rooms, finishes and the details that make them work.' },
  { id: 'exterior', title: 'Exteriors', text: 'The parts of a building that keep weather out and look after curb appeal.' },
  { id: 'structure', title: 'Structure & site', text: 'Framing, foundations, concrete and clearing the way.' },
  {
    id: 'mechanical-services',
    title: 'Mechanical services',
    text: 'Heating and cooling, plumbing and electrical work as part of a project.',
  },
  { id: 'property', title: 'Property projects', text: 'Rehabs, code corrections and the jobs that don’t fit a list.' },
];

export interface ProcessStep {
  title: string;
  text: string;
}

export interface Service {
  slug: string;
  /** Path without trailing slash. Legacy paths are preserved as-is, including spelling. */
  path: string;
  name: string;
  /** Short name for lists. */
  short?: string;
  featured?: boolean;
  group?: ServiceGroupId;
  /** <title> text (the layout appends the company name). */
  title: string;
  description: string;
  h1: string;
  kicker?: string;
  intro: string;
  /** One sentence for list/card use. */
  summary: string;
  examples: string[];
  photos?: PhotoKey[];
  /** Use an architectural graphic instead of photographs (no verified photos yet). */
  graphic?: 'new-construction' | 'commercial';
  process?: ProcessStep[];
  formService: FormServiceValue;
  related?: string[];
}

const baseProcess = (consult: string, scope: string, build: string): ProcessStep[] => [
  { title: 'Consultation & site visit', text: consult },
  { title: 'Scope & proposal', text: scope },
  { title: 'Planning & construction', text: build },
];

export const featuredServices: Service[] = [
  {
    slug: 'bathrooms',
    path: '/bathroom-remodeler-contractor',
    name: 'Bathrooms',
    featured: true,
    title: 'Bathroom Remodeling in Northwest Indiana & South Chicagoland',
    description:
      'Bathroom remodeling from Solutions and Improvements: showers, tile, vanities and layout changes across Northwest Indiana and South Chicagoland. Free consultation with an on-site visit.',
    h1: 'Bathroom remodeling',
    kicker: 'Featured service',
    intro:
      'From a tired hall bath to a complete layout change, we plan the room around how you use it, then build it carefully.',
    summary: 'Showers, tile, vanities and complete layout changes.',
    examples: [
      'Walk-in showers and tub-to-shower conversions',
      'Tile floors and wet-wall surfaces',
      'Vanities, tops, fixtures and lighting',
      'Layout changes, accessibility updates and small repairs',
    ],
    photos: ['B1'],
    process: baseProcess(
      'We look at the room, the plumbing and what you want to change.',
      'You get a clear scope. Estimate and design terms are discussed for your project.',
      'Selections are confirmed, the work is scheduled and the room is built out.',
    ),
    formService: 'bathrooms',
    related: ['kitchens', 'basement-remodeling', 'plumbing'],
  },
  {
    slug: 'kitchens',
    path: '/kitchen-remodeling',
    name: 'Kitchens',
    featured: true,
    title: 'Kitchen Remodeling in Northwest Indiana & South Chicagoland',
    description:
      'Kitchen remodeling from Solutions and Improvements: cabinets, counters, islands, layout and finishes across Northwest Indiana and South Chicagoland. Free consultation with an on-site visit.',
    h1: 'Kitchen remodeling',
    kicker: 'Featured service',
    intro:
      'Kitchens carry the most traffic in a home. We plan storage, light and workflow first, then finish the room with care.',
    summary: 'Cabinets, counters, islands, lighting and layout.',
    examples: [
      'Cabinets, islands and open shelving',
      'Countertops, backsplashes and range hoods',
      'Lighting, flooring and finish updates',
      'Layout changes and opening walls where the structure allows',
    ],
    photos: ['K1', 'K2'],
    process: baseProcess(
      'We walk the space with you and talk through layout, storage and finishes.',
      'We define the scope. Design renders are available in-house on project-specific terms.',
      'Materials are ordered, trades are scheduled and the kitchen is built.',
    ),
    formService: 'kitchens',
    related: ['bathrooms', 'flooring-installation', 'electric'],
  },
  {
    slug: 'additions',
    path: '/home-additions',
    name: 'Additions',
    featured: true,
    title: 'Home Additions in Northwest Indiana & South Chicagoland',
    description:
      'Home additions from Solutions and Improvements: more room, planned to fit the existing house. Serving Northwest Indiana and South Chicagoland. Free consultation with an on-site visit.',
    h1: 'Home additions',
    kicker: 'Featured service',
    intro:
      'An addition should feel like it was always there. We plan the structure, roofline and connection to the existing house before building.',
    summary: 'More room, planned to fit the house you already have.',
    examples: [
      'Room and second-story additions',
      'Bump-outs for kitchens, baths and living space',
      'Foundations, framing and roof tie-ins',
      'Finishing the new space inside and out',
    ],
    photos: ['Cwide'],
    process: baseProcess(
      'We look at the lot, the house and how the new space would connect.',
      'We define the scope. Design and renders can begin after a rendering deposit or signed contract.',
      'Permits and planning come first, then foundation, framing, enclosure and finishes.',
    ),
    formService: 'additions',
    related: ['new-construction', 'framing', 'foundations'],
  },
  {
    slug: 'new-construction',
    path: '/newconstruction',
    name: 'New Construction',
    featured: true,
    title: 'New Construction in Northwest Indiana & South Chicagoland',
    description:
      'New construction from Solutions and Improvements: residential and commercial buildings planned and built across Northwest Indiana and South Chicagoland. Free consultation with an on-site visit.',
    h1: 'New construction',
    kicker: 'Featured service',
    intro:
      'Ground-up work for homes and commercial buildings, planned from the site up with in-house design support.',
    summary: 'Residential and commercial buildings, from the site up.',
    examples: [
      'Single-family homes',
      'Commercial and multifamily buildings',
      'Accessory and outbuildings',
      'Site, foundation and structural work',
    ],
    graphic: 'new-construction',
    process: baseProcess(
      'We visit the site and talk through what you want to build.',
      'We define scope and next steps. Design and renders can begin after a rendering deposit or signed contract.',
      'Permits, scheduling and construction follow the agreed plan.',
    ),
    formService: 'new-construction',
    related: ['additions', 'commercial', 'foundations'],
  },
];

export const commercialService: Service = {
  slug: 'commercial',
  path: '/commercial-contractor',
  name: 'Commercial & Multifamily',
  short: 'Commercial',
  title: 'Commercial & Multifamily Contractor in Northwest Indiana & South Chicagoland',
  description:
    'Commercial and multifamily construction and remodeling from Solutions and Improvements: build-outs, unit turns, repairs and new buildings in Northwest Indiana and South Chicagoland.',
  h1: 'Commercial & multifamily',
  kicker: 'For owners and managers',
  intro:
    'Build-outs, renovations and repairs for businesses, property owners and managers, with one point of contact from consultation to close-out.',
  summary: 'Build-outs, unit renovations, repairs and new buildings.',
  examples: [
    'Tenant and office build-outs',
    'Multifamily unit renovations and turnovers',
    'Exterior repairs, roofing and siding',
    'Code corrections and building repairs',
  ],
  graphic: 'commercial',
  process: baseProcess(
    'We meet on site to review the building, the schedule you’re working to and access.',
    'You get a defined scope. Estimate terms are discussed for each project.',
    'Work is planned around occupants and operations, then built.',
  ),
  formService: 'commercial-multifamily',
  related: ['new-construction', 'how-to-fix-building-code-violations', 'roofing'],
};

const svc = (
  s: Omit<Service, 'formService' | 'title' | 'description' | 'h1'> & {
    formService?: FormServiceValue;
    title?: string;
    description?: string;
    h1?: string;
  },
): Service => ({
  formService: 'other',
  h1: s.name,
  title: `${s.name} in Northwest Indiana & South Chicagoland`,
  description: `${s.name} from Solutions and Improvements, a construction and remodeling company serving Northwest Indiana and South Chicagoland. ${s.summary} Free consultation with an on-site visit.`,
  ...s,
});

/** Secondary services on retained legacy paths. */
export const secondaryServices: Service[] = [
  // Interiors
  svc({
    slug: 'basement-remodeling',
    path: '/basement-remodeling',
    name: 'Basement remodeling',
    group: 'interior',
    title: 'Basement Remodeling in Northwest Indiana & South Chicagoland',
    intro: 'Turn unused basement space into rooms you actually use, finished properly from framing to trim.',
    summary: 'Finished basements, from framing to trim.',
    examples: ['Family rooms and bedrooms', 'Basement bathrooms', 'Framing, drywall and flooring', 'Lighting and finish work'],
    related: ['bathrooms', 'drywall', 'flooring-installation'],
  }),
  svc({
    slug: 'flooring-installation',
    path: '/flooring-installation',
    name: 'Flooring installation',
    group: 'interior',
    intro: 'New floors installed on a sound, level base, room by room or through the whole house.',
    summary: 'Tile, vinyl plank, laminate and wood floors.',
    examples: ['Tile floors', 'Luxury vinyl plank and laminate', 'Wood flooring', 'Subfloor repair and leveling'],
    related: ['kitchens', 'bathrooms', 'basement-remodeling'],
  }),
  svc({
    slug: 'drywall',
    path: '/drywall-contrator',
    name: 'Drywall',
    group: 'interior',
    h1: 'Drywall installation & repair',
    title: 'Drywall Installation & Repair in Northwest Indiana & South Chicagoland',
    intro: 'Hanging, finishing and repairing drywall so walls and ceilings are ready for paint.',
    summary: 'Hanging, finishing and patching walls and ceilings.',
    examples: ['New walls and ceilings', 'Patches and water-damage repair', 'Taping and finishing', 'Texture matching where practical'],
    formService: 'small-repairs',
    related: ['painting', 'basement-remodeling', 'carpentry'],
  }),
  svc({
    slug: 'painting',
    path: '/painting-company',
    name: 'Painting',
    group: 'interior',
    intro: 'Interior and exterior painting with the prep work that makes it last.',
    summary: 'Interior and exterior painting, with proper prep.',
    examples: ['Interior walls, ceilings and trim', 'Exterior siding and trim', 'Surface prep and minor repairs', 'Cabinet and door painting'],
    formService: 'small-repairs',
    related: ['drywall', 'siding', 'carpentry'],
  }),
  svc({
    slug: 'carpentry',
    path: '/new-page-35',
    name: 'Carpentry',
    group: 'interior',
    h1: 'Carpentry & trim',
    title: 'Carpentry & Trim in Northwest Indiana & South Chicagoland',
    intro: 'Finish carpentry and custom woodwork that ties a room together.',
    summary: 'Trim, doors, built-ins and finish woodwork.',
    examples: ['Trim and moldings', 'Interior doors and hardware', 'Built-ins and shelving', 'Stairs and railings repair'],
    formService: 'small-repairs',
    related: ['framing', 'painting', 'kitchens'],
  }),
  // Exteriors
  svc({
    slug: 'roofing',
    path: '/roofing-replacement-contractor',
    name: 'Roofing',
    group: 'exterior',
    h1: 'Roofing replacement & repair',
    title: 'Roofing Replacement & Repair in Northwest Indiana & South Chicagoland',
    intro: 'Roof replacement and repair for homes and commercial buildings, with the flashing and ventilation details done right.',
    summary: 'Roof replacement and repair.',
    examples: ['Full roof replacement', 'Leak and storm repairs', 'Flashing, vents and roof penetrations', 'Gutter coordination'],
    photos: ['A'],
    related: ['siding', 'gutters', 'commercial'],
  }),
  svc({
    slug: 'siding',
    path: '/siding-replacement',
    name: 'Siding',
    group: 'exterior',
    h1: 'Siding replacement',
    title: 'Siding Replacement in Northwest Indiana & South Chicagoland',
    intro: 'New siding and trim that protects the house and changes how it looks from the street.',
    summary: 'Siding and exterior trim replacement.',
    examples: ['Full siding replacement', 'Section repair and matching', 'Soffit, fascia and trim', 'House wrap and flashing details'],
    related: ['roofing', 'windows-doors', 'gutters'],
  }),
  svc({
    slug: 'windows-doors',
    path: '/window-installation-door-installtion',
    name: 'Windows & doors',
    group: 'exterior',
    h1: 'Window & door installation',
    title: 'Window & Door Installation in Northwest Indiana & South Chicagoland',
    intro: 'Replacement and new-opening windows and doors, installed square, sealed and trimmed.',
    summary: 'Replacement windows, entry and patio doors.',
    examples: ['Replacement windows', 'Entry and storm doors', 'Patio and sliding doors', 'New openings and trim'],
    related: ['siding', 'carpentry', 'additions'],
  }),
  svc({
    slug: 'gutters',
    path: '/gutters',
    name: 'Gutters',
    group: 'exterior',
    intro: 'Gutters and downspouts that move water away from the house.',
    summary: 'Gutter and downspout installation and repair.',
    examples: ['New gutters and downspouts', 'Repairs and re-pitching', 'Fascia repair', 'Coordination with roofing work'],
    formService: 'small-repairs',
    related: ['roofing', 'siding'],
  }),
  svc({
    slug: 'decks',
    path: '/deck-contractor',
    name: 'Decks',
    group: 'exterior',
    h1: 'Deck building & repair',
    title: 'Deck Building & Repair in Northwest Indiana & South Chicagoland',
    intro: 'Decks built on a solid structure, sized for how you use the yard.',
    summary: 'New decks, rebuilds and repairs.',
    examples: ['New decks', 'Deck rebuilds and resurfacing', 'Stairs and railings', 'Structural repairs'],
    related: ['concrete', 'landscaping', 'carpentry'],
  }),
  svc({
    slug: 'masonry',
    path: '/masonry-brick-tuckpoint',
    name: 'Masonry',
    group: 'exterior',
    h1: 'Masonry, brick & tuckpointing',
    title: 'Masonry, Brick & Tuckpointing in Northwest Indiana & South Chicagoland',
    intro: 'Brick, block and stone work, including tuckpointing to keep older masonry sound.',
    summary: 'Brick, block, stone and tuckpointing.',
    examples: ['Tuckpointing', 'Brick and block repair', 'Stone veneer', 'Steps, walls and chimneys'],
    related: ['concrete', 'foundations', 'siding'],
  }),
  svc({
    slug: 'landscaping',
    path: '/landscaping-contractor-lake-county-indiana',
    name: 'Landscaping',
    group: 'exterior',
    h1: 'Landscaping & hardscape',
    title: 'Landscaping & Hardscape in Lake County, Indiana',
    description:
      'Landscaping and hardscape work from Solutions and Improvements in Lake County, Indiana and the surrounding area. Grading, patios and finishing the yard after construction.',
    intro: 'Finishing the outside of a project: grading, hardscape and planting areas that suit the property.',
    summary: 'Grading, hardscape and yard finishing.',
    examples: ['Grading and drainage', 'Patios and walkways', 'Retaining edges and beds', 'Yard restoration after construction'],
    related: ['concrete', 'decks', 'masonry'],
  }),
  svc({
    slug: 'exterior-remodeling',
    path: '/looking-for-something-else-1',
    name: 'Exterior remodeling',
    group: 'exterior',
    title: 'Exterior Remodeling in Northwest Indiana & South Chicagoland',
    intro: 'Exterior projects that combine trades, such as a new porch, entry, siding and roof done together.',
    summary: 'Combined exterior updates, planned as one project.',
    examples: ['Porches and entries', 'Combined roof, siding and window work', 'Exterior repairs', 'Facade updates'],
    related: ['roofing', 'siding', 'windows-doors'],
  }),
  // Structure & site
  svc({
    slug: 'framing',
    path: '/framing-carpentry',
    name: 'Framing',
    group: 'structure',
    h1: 'Framing',
    title: 'Framing Contractor in Northwest Indiana & South Chicagoland',
    intro: 'Wall, floor and roof framing for additions, new buildings and structural changes.',
    summary: 'Wall, floor and roof framing.',
    examples: ['Additions and new buildings', 'Wall removal and headers', 'Roof framing', 'Structural repairs'],
    photos: ['C'],
    related: ['additions', 'new-construction', 'foundations'],
  }),
  svc({
    slug: 'foundations',
    path: '/foundation',
    name: 'Foundations',
    group: 'structure',
    h1: 'Foundations',
    title: 'Foundation Work in Northwest Indiana & South Chicagoland',
    intro: 'Foundations for additions and new buildings, and repair of existing ones.',
    summary: 'New foundations and foundation repair.',
    examples: ['Footings and foundation walls', 'Foundations for additions', 'Crack and settlement repair', 'Waterproofing coordination'],
    related: ['concrete', 'additions', 'new-construction'],
  }),
  svc({
    slug: 'concrete',
    path: '/concrete',
    name: 'Concrete',
    group: 'structure',
    h1: 'Concrete work',
    title: 'Concrete Work in Northwest Indiana & South Chicagoland',
    intro: 'Flatwork and structural concrete, formed and finished for the job.',
    summary: 'Driveways, slabs, walks and steps.',
    examples: ['Driveways and aprons', 'Slabs and garage floors', 'Sidewalks and steps', 'Patios'],
    related: ['foundations', 'masonry', 'landscaping'],
  }),
  svc({
    slug: 'demolition',
    path: '/demolition-debris-removal',
    name: 'Demolition & debris removal',
    group: 'structure',
    title: 'Demolition & Debris Removal in Northwest Indiana & South Chicagoland',
    intro: 'Selective and interior demolition, with debris hauled away so the next phase can start.',
    summary: 'Selective demolition and haul-away.',
    examples: ['Interior and selective demolition', 'Kitchen and bath tear-outs', 'Debris removal', 'Site clean-up'],
    related: ['rehab-remodel', 'kitchens', 'bathrooms'],
  }),
  // Mechanical
  svc({
    slug: 'hvac',
    path: '/hvac-services',
    name: 'HVAC',
    group: 'mechanical-services',
    h1: 'Heating & cooling (HVAC)',
    title: 'HVAC Services in Northwest Indiana & South Chicagoland',
    intro: 'Heating, cooling and ventilation work coordinated as part of remodeling, additions and new buildings.',
    summary: 'Heating, cooling and ventilation as part of a project.',
    examples: ['Ductwork for additions and remodels', 'Equipment replacement', 'Bath and kitchen ventilation', 'Coordination with other trades'],
    related: ['plumbing', 'electric', 'additions'],
  }),
  svc({
    slug: 'plumbing',
    path: '/plumbing',
    name: 'Plumbing',
    group: 'mechanical-services',
    intro: 'Plumbing work for remodels, additions and repairs, coordinated with the rest of the job.',
    summary: 'Plumbing for remodels, additions and repairs.',
    examples: ['Kitchen and bath rough-in and fixtures', 'Water heaters', 'Drain and supply repairs', 'Re-routing for layout changes'],
    related: ['bathrooms', 'kitchens', 'hvac'],
  }),
  svc({
    slug: 'electric',
    path: '/electric',
    name: 'Electrical',
    group: 'mechanical-services',
    h1: 'Electrical work',
    title: 'Electrical Work in Northwest Indiana & South Chicagoland',
    intro: 'Electrical work for remodels, additions and new construction, coordinated with the rest of the project.',
    summary: 'Wiring, lighting and panels as part of a project.',
    examples: ['Lighting and fixtures', 'New circuits and outlets', 'Panel upgrades', 'Wiring for additions and remodels'],
    related: ['kitchens', 'hvac', 'plumbing'],
  }),
  // Property projects
  svc({
    slug: 'rehab-remodel',
    path: '/rehab-remodel',
    name: 'Rehab & remodel',
    group: 'property',
    h1: 'Property rehab & remodel',
    title: 'Property Rehab & Remodel in Northwest Indiana & South Chicagoland',
    intro: 'Whole-property rehab for owners and investors: assess what the building needs, then bring it back to condition.',
    summary: 'Whole-property rehab for owners and investors.',
    examples: ['Rental and resale rehabs', 'Multi-trade interior updates', 'Exterior and roof repairs', 'Punch lists before listing or leasing'],
    related: ['commercial', 'demolition', 'how-to-fix-building-code-violations'],
  }),
  svc({
    slug: 'how-to-fix-building-code-violations',
    path: '/how-to-fix-building-code-violations',
    name: 'Building code corrections',
    group: 'property',
    title: 'Building Code Violation Repairs in Northwest Indiana & South Chicagoland',
    intro: 'If an inspection has flagged problems, we review the list with you and plan the repairs needed to address it.',
    summary: 'Repairs to address inspection and code notices.',
    examples: ['Reviewing an inspection or violation notice', 'Structural, stair and railing corrections', 'Egress, smoke and safety items', 'Coordinating re-inspection'],
    related: ['rehab-remodel', 'commercial', 'electric'],
  }),
  svc({
    slug: 'something-else',
    path: '/looking-for-something-else',
    name: 'Something else',
    group: 'property',
    h1: 'Small jobs & something else',
    title: 'Small Jobs & Other Construction Work in Northwest Indiana & South Chicagoland',
    description:
      'No minimum project size. Solutions and Improvements handles small repairs and unusual construction projects across Northwest Indiana and South Chicagoland. Free consultation with an on-site visit.',
    intro: 'There’s no minimum project size. If your job isn’t listed, tell us about it and we’ll say plainly whether we’re the right fit.',
    summary: 'Small repairs and projects that aren’t on the list.',
    examples: ['Small repairs', 'Odd jobs that need several trades', 'Projects that don’t fit a category', 'Repairs after other work'],
    formService: 'small-repairs',
    related: ['carpentry', 'drywall', 'rehab-remodel'],
  }),
];

export const allServices: Service[] = [...featuredServices, commercialService, ...secondaryServices];

export const serviceBySlug = (slug: string): Service | undefined => allServices.find((s) => s.slug === slug);

export const servicesInGroup = (group: ServiceGroupId) => secondaryServices.filter((s) => s.group === group);
