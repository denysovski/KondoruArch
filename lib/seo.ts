import type { Metadata } from 'next'
import { absoluteUrl, SITE_URL, withBase } from './utils'
import { photoMeta, photoSrc, type PhotoName } from './photos'

/* ------------------------------------------------------------------ *
 * One place for the strings search engines and social cards read.
 * ------------------------------------------------------------------ */

export const SITE_NAME = 'Kondoru'
export const SITE_TAGLINE = 'Property and Architecture'
export const SITE_TITLE = `${SITE_NAME} • ${SITE_TAGLINE}`

export const SITE_DESCRIPTION =
  'Kondoru buys property on your terms and designs buildings that last: independent surveys before you commit, an in-house architecture studio, and offices in London, Lisbon, Oslo, Copenhagen and Porto.'

export const OG_IMAGE = {
  url: withBase('/og.jpg'),
  width: 1200,
  height: 630,
  alt: 'Kondoru — property purchase, development and architecture across Europe',
}

export const LOCALE = 'en_GB'

/**
 * Turns a catalogue photograph into a social card. Unfurlers want one
 * absolute URL with dimensions, and they crop to their own ratio, so the
 * 1200px rendition is the right one to hand them.
 */
export function photoCard(name: PhotoName) {
  const entry = photoMeta(name)
  const width = entry.widths.includes(1200) ? 1200 : entry.widths[entry.widths.length - 1]
  return {
    url: `${SITE_URL}${photoSrc(name, width)}`,
    width,
    height: Math.round((entry.height * width) / entry.width),
    alt: entry.alt,
  }
}

/** Everything a page needs beyond its own title and description. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  image?: { url: string; width: number; height: number; alt: string }
  type?: 'website' | 'article'
}): Metadata {
  const url = absoluteUrl(path)
  const card = image ?? OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: LOCALE,
      title: `${title} • ${SITE_NAME}`,
      description,
      images: [card],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} • ${SITE_NAME}`,
      description,
      images: [card.url],
    },
  }
}

/** Renders one JSON-LD block. Kept out of the body copy, read by crawlers. */
export function jsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}

export const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${absoluteUrl('/')}#organisation`,
  name: SITE_NAME,
  alternateName: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: absoluteUrl('/'),
  logo: `${SITE_URL}${withBase('/icon.svg')}`,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  email: 'hello@kondoru.com',
  telephone: '+44 20 7946 0138',
  foundingDate: '2008',
  priceRange: '£££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12 Harbour Walk',
    addressLocality: 'London',
    postalCode: 'E1',
    addressCountry: 'GB',
  },
  areaServed: ['London', 'Lisbon', 'Oslo', 'Copenhagen', 'Porto', 'Casablanca'],
  knowsLanguage: ['en', 'pt', 'no', 'da', 'fr', 'ar'],
  openingHours: 'Mo-Sa 08:00-19:00',
  sameAs: ['https://www.linkedin.com/', 'https://www.instagram.com/'],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${absoluteUrl('/')}#website`,
  name: SITE_TITLE,
  url: absoluteUrl('/'),
  publisher: { '@id': `${absoluteUrl('/')}#organisation` },
  inLanguage: 'en-GB',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${absoluteUrl('/search')}?city={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

/** Breadcrumbs for a sub page, always rooted at the home page. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  }
}
