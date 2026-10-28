import { SITE_URL, company } from '../data/site';
import { regions } from '../data/areas';

export const absolute = (path: string) => (path.startsWith("http") ? path : path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

/** Organization data that matches what the site shows. Postal address omitted until fully confirmed. */
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE_URL}/#business`,
    name: company.name,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: company.phoneE164,
    email: company.email,
    foundingDate: String(company.founded),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Lake County, Indiana' },
      { '@type': 'AdministrativeArea', name: 'Porter County, Indiana' },
      { '@type': 'City', name: 'Portage, Indiana' },
      { '@type': 'City', name: 'La Porte, Indiana' },
      { '@type': 'City', name: 'South Bend, Indiana' },
      { '@type': 'City', name: 'Lansing, Illinois' },
      { '@type': 'City', name: 'Mokena, Illinois' },
    ],
    knowsAbout: ['Bathroom remodeling', 'Kitchen remodeling', 'Home additions', 'New construction', 'Commercial construction'],
  };
}

export function breadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absolute(item.href) } : {}),
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absolute(path),
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: regions.map((r) => ({ '@type': 'Place', name: r.name })),
  };
}
