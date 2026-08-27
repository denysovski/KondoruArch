import type { Metadata } from 'next'
import { Home } from './home'
import { JsonLd } from '@/components/json-ld'
import { faqs, properties, services } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { photoSrc } from '@/lib/photos'
import { absoluteUrl, SITE_URL } from '@/lib/utils'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Property and Architecture',
    description:
      'Kondoru buys property on your terms and designs buildings that last: off-market homes in six cities, independent surveys before you commit, and an architecture studio in the same office.',
    path: '/',
  }),
  // The home page is the site root, so it keeps the bare site title rather
  // than the "… • Kondoru" template every other page uses.
  title: { absolute: 'Kondoru • Property and Architecture' },
}

/** The four services, in the form a search engine can list as offerings. */
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Kondoru services',
  itemListElement: services.map((service) => ({
    '@type': 'Offer',
    name: service.title,
    description: service.copy,
    url: absoluteUrl(`/services#${service.title.toLowerCase()}`),
  })),
}

const featuredSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Homes ready to move into',
  itemListElement: properties.map((property, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: property.title,
    url: absoluteUrl(
      `/properties/${property.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    ),
    image: `${SITE_URL}${photoSrc(property.images[0], 1200)}`,
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function Page() {
  return (
    <>
      <JsonLd data={[servicesSchema, featuredSchema, faqSchema]} />
      <Home />
    </>
  )
}
