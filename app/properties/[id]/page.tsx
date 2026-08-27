import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  Check,
  Layers,
  MapPin,
  Maximize,
  Phone,
} from 'lucide-react'
import {
  buildListingDetail,
  getListing,
  getListingNeighbours,
  listings,
  type Listing,
} from '@/lib/listings'
import { ListingCard } from '@/components/listing-card'
import { ListingGallery } from '@/components/listing-gallery'
import { Button, Heading, Pill } from '@/components/ui-kit'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'
import { photoSrc } from '@/lib/photos'
import { absoluteUrl, SITE_URL } from '@/lib/utils'

export function generateStaticParams() {
  return listings.map((listing) => ({ id: listing.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const listing = getListing(id)
  if (!listing) return { title: 'Residence not found' }

  return pageMetadata({
    title: `${listing.title}, ${listing.district}`,
    description: `${listing.priceLabel} — ${listing.beds}, ${listing.baths}, ${listing.area} m² in ${listing.district}, ${listing.city}. ${listing.desc}`,
    path: `/properties/${listing.id}`,
    image: photoCard(listing.images[0]),
  })
}

/** The residence itself, priced and located, for rich results. */
function residenceSchema(listing: Listing) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    url: absoluteUrl(`/properties/${listing.id}`),
    description: listing.desc,
    datePosted: '2026-01-01',
    image: listing.images.map((image) => `${SITE_URL}${photoSrc(image, 1200)}`),
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.city,
      addressRegion: listing.district,
    },
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      businessFunction:
        listing.deal === 'sale'
          ? 'https://schema.org/Sell'
          : 'https://schema.org/LeaseOut',
      seller: { '@id': `${absoluteUrl('/')}#organisation` },
    },
    mainEntity: {
      '@type': 'Accommodation',
      name: listing.title,
      numberOfBathroomsTotal: listing.baths,
      floorSize: { '@type': 'QuantitativeValue', value: listing.area, unitCode: 'MTK' },
      amenityFeature: listing.highlights.map((feature) => ({
        '@type': 'LocationFeatureSpecification',
        name: feature,
        value: true,
      })),
    },
  }
}

export default async function ResidencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = getListing(id)
  if (!listing) notFound()

  const detail = buildListingDetail(listing)
  const { index, total, prev, next } = getListingNeighbours(listing.id)

  return (
    <main id="main" className="site subpage residence">
      <JsonLd
        data={[
          residenceSchema(listing),
          breadcrumbSchema([
            { name: 'Properties', path: '/properties' },
            { name: listing.title, path: `/properties/${listing.id}` },
          ]),
        ]}
      />

      {/* Header ----------------------------------------------------- */}
      <section className="residence-head">
        <div className="residence-head-inner">
          <Link className="insight-back" href="/properties">
            <ArrowLeft size={15} strokeWidth={2.2} />
            All properties
          </Link>

          <div className="residence-title-row">
            <div>
              <div className="residence-tags">
                <Pill>{listing.category}</Pill>
                <span className={`property-deal deal-${listing.deal}`}>
                  {listing.deal === 'sale' ? 'For sale' : 'To rent'}
                </span>
              </div>
              <Heading as="h1" className="residence-title" text={listing.title} />
              <span className="residence-place">
                <MapPin size={15} strokeWidth={2} />
                {listing.district}, {listing.city}
              </span>
            </div>

            <aside className="residence-price">
              <strong>{listing.priceLabel}</strong>
              <span>{listing.secondary}</span>
              <Button href="/#contact">Book a viewing</Button>
              <a className="residence-call" href="tel:+442000000000">
                <Phone size={14} strokeWidth={2} />
                +44 20 0000 0000
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Gallery ---------------------------------------------------- */}
      <ListingGallery images={listing.images} title={listing.title} status={listing.status} />

      {/* Key specs -------------------------------------------------- */}
      <section className="section-tight page-section">
        <ul className="residence-specs reveal-group">
          <li>
            <BedDouble size={20} strokeWidth={1.8} />
            <b>{listing.beds}</b>
            <span>Bedrooms</span>
          </li>
          <li>
            <Bath size={20} strokeWidth={1.8} />
            <b>{listing.baths}</b>
            <span>Bathrooms</span>
          </li>
          <li>
            <Maximize size={20} strokeWidth={1.8} />
            <b>{listing.area} m²</b>
            <span>Internal area</span>
          </li>
          <li>
            <Layers size={20} strokeWidth={1.8} />
            <b>{listing.floor}</b>
            <span>Position</span>
          </li>
        </ul>
      </section>

      {/* Overview + specification ----------------------------------- */}
      <section className="section page-section residence-body">
        <div className="residence-copy">
          <div className="reveal">
            <Pill>Overview</Pill>
          </div>
          <p className="residence-lead reveal" data-delay="0.06">
            {detail.lead}
          </p>
          {detail.body.map((paragraph, i) => (
            <p key={i} className="reveal" data-delay={`${0.1 + i * 0.04}`}>
              {paragraph}
            </p>
          ))}

          <div className="residence-highlights reveal" data-delay="0.24">
            {listing.highlights.map((item) => (
              <span key={item}>
                <Check size={13} strokeWidth={3} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="residence-side">
          <div className="residence-panel reveal" data-delay="0.08">
            <h3>Specification</h3>
            <dl>
              {detail.specification.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="residence-panel reveal" data-delay="0.14">
            <h3>{listing.deal === 'sale' ? 'Price and fees' : 'Rent and terms'}</h3>
            <dl>
              {detail.costs.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How it runs ------------------------------------------------ */}
      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>How it runs</Pill>
            </div>
            <Heading className="section-title" text="Four steps from viewing to keys" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Each step ends with something written down, so you always know which one you are in and
              what the next one costs.
            </p>
          </div>
        </div>

        <div className="group-grid reveal-group tilt">
          {detail.timeline.map((step, i) => (
            <article key={step.title} className="group-card">
              <span className="group-step">{`0${i + 1}`}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pagination ------------------------------------------------- */}
      <section className="section-tight page-section">
        <nav className="residence-pager" aria-label="Browse residences">
          {prev && (
            <Link className="residence-pager-link is-prev" href={`/properties/${prev.id}`}>
              <i>
                <ArrowLeft size={16} strokeWidth={2.2} />
              </i>
              <span>
                <small>Previous residence</small>
                <strong>{prev.title}</strong>
                <em>
                  {prev.district}, {prev.city}
                </em>
              </span>
            </Link>
          )}

          <span className="residence-pager-count">
            {index + 1} <i>/</i> {total}
          </span>

          {next && (
            <Link className="residence-pager-link is-next" href={`/properties/${next.id}`}>
              <span>
                <small>Next residence</small>
                <strong>{next.title}</strong>
                <em>
                  {next.district}, {next.city}
                </em>
              </span>
              <i>
                <ArrowRight size={16} strokeWidth={2.2} />
              </i>
            </Link>
          )}
        </nav>
      </section>

      {/* Nearby ----------------------------------------------------- */}
      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Also available</Pill>
            </div>
            <Heading className="section-title" text="Others worth a look" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <Link className="button button-outline" href="/properties">
              <span>See all {total} residences</span>
            </Link>
          </div>
        </div>

        <div className="listing-grid reveal-group">
          {detail.nearby.map((other) => (
            <ListingCard key={other.id} listing={other} />
          ))}
        </div>
      </section>

      {/* CTA -------------------------------------------------------- */}
      <section className="cta">
        <div className="cta-panel">
          <div className="cta-main">
            <div className="reveal">
              <Pill tone="dark">
                <b />
                Viewings this week
              </Pill>
            </div>
            <Heading className="cta-title" text={`Come and see ${listing.title}`} />
            <p className="cta-copy reveal" data-delay="0.1">
              Viewings run seven days a week, in person or on a live walkthrough if you are buying
              from another city. The survey is ready to read before you make an offer.
            </p>
            <div className="reveal cta-actions" data-delay="0.16">
              <Button variant="light" href="mailto:hello@kondoru.com">
                hello@kondoru.com
              </Button>
              <a className="cta-phone" href="tel:+442000000000">
                <Phone size={15} strokeWidth={2} />
                +44 20 0000 0000
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
