import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  Layers,
  MapPin,
  Maximize,
} from 'lucide-react'
import { stats } from '@/lib/content'
import { listings } from '@/lib/listings'
import { ListingCard } from '@/components/listing-card'
import { Button, Counter, Heading, PageHero, Pill } from '@/components/ui-kit'
import { Photo } from '@/components/photo'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'
import { photoSrc } from '@/lib/photos'
import { SITE_URL } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: 'Homes for sale and to rent',
  description:
    'Eighty-four homes across London, Lisbon, Oslo, Copenhagen, Porto and Casablanca — every one walked, measured and surveyed before it reaches this list.',
  path: '/properties',
  image: photoCard('architecture/curved-balconies'),
})

/** The whole list, as a crawlable index of the individual residences. */
const listingSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Kondoru residences',
  numberOfItems: listings.length,
  itemListElement: listings.map((listing, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: absoluteUrl(`/properties/${listing.id}`),
    name: listing.title,
    image: `${SITE_URL}${photoSrc(listing.images[0], 1200)}`,
  })),
}

const groups = [
  {
    id: 'new-builds',
    name: 'New builds',
    meta: 'From €290,000',
    copy: 'Completing in 2026 and 2027, reserved off plan. You are buying a drawing and a contract, so the contract is the part we read hardest.',
    points: [
      'Staged payments held in escrow, never paid direct',
      'A completion date with a penalty behind it',
      'Specification locked at reservation, in writing',
      'Two site visits during construction, with us',
    ],
  },
  {
    id: 'waterfront',
    name: 'Waterfront',
    meta: 'From €355,000',
    copy: 'Harbour, lake and river frontage. Wonderful to live on and unforgiving to build on, which is where most of the checking goes.',
    points: [
      'Flood mapping and insurance quoted before you offer',
      'Facade and balcony corrosion inspected, not assumed',
      'Mooring, jetty and slipway rights confirmed',
      'Winter light modelled, not just the summer brochure',
    ],
  },
  {
    id: 'family',
    name: 'Family',
    meta: 'From €410,000',
    copy: 'Two bedrooms and up, near schools and green space. Bought for the ten years after the move rather than the week of it.',
    points: [
      'School catchments checked against the actual address',
      'Noise measured on a weekday morning and a Friday night',
      'Lift, pram and bike storage that genuinely fit',
      'Room to add a wall later without touching structure',
    ],
  },
  {
    id: 'investment',
    name: 'Investment',
    meta: '4.1 to 5.4% net',
    copy: 'Let-ready stock with modelled yields. Our number is after costs, which is why it is lower than the one you were shown elsewhere.',
    points: [
      'Yield modelled after service charge, tax and voids',
      'Twelve months of local letting data, not asking rents',
      'Service charge accounts read three years back',
      'Management quoted at a fixed fee, or left to you',
    ],
  },
]

const editorialPoints = [
  'Structural survey read line by line with you, before exchange',
  'Price benchmarked against completed sales, not asking prices',
  'Service charge accounts checked three years back',
  'Daylight, noise and running costs measured on the second visit',
]

const buyingSteps = [
  { title: 'Tell us the brief', copy: 'City, budget, the date you want keys in your hand.' },
  { title: 'See a real shortlist', copy: 'Six homes worth the trip, not thirty that are not.' },
  { title: 'Survey before offer', copy: 'We read the report line by line with you.' },
  { title: 'Negotiate and complete', copy: 'Contracts, notary, handover, snagging.' },
]

export default function PropertiesPage() {
  return (
    <main id="main" className="site subpage">
      <JsonLd data={[listingSchema, breadcrumbSchema([{ name: 'Properties', path: '/properties' }])]} />

      <PageHero
        eyebrow="Properties"
        title="Eighty-four homes, each one surveyed before it reaches this list"
        copy="We list far less than the portals do, on purpose. Every home here has been walked, measured and priced against comparable sales, and anything that failed its survey never made it this far."
        image="architecture/curved-balconies"
        facts={[
          { value: '84', label: 'Homes available now' },
          { value: '5', label: 'Cities covered' },
          { value: '9 days', label: 'Average to offer' },
        ]}
      />

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Collections</Pill>
            </div>
            <Heading className="section-title" text="Four ways into the list" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Filters are useful, but most people arrive knowing roughly which of these four they
              are. Start there and we will narrow it with you on a call.
            </p>
          </div>
        </div>

        <div className="group-grid cards-plain reveal-group">
          {groups.map((group) => (
            <article key={group.id} id={group.id} className="group-card">
              <div className="group-card-head">
                <h3>{group.name}</h3>
                <span className="group-meta">{group.meta}</span>
              </div>
              <p>{group.copy}</p>
              <ul className="group-points">
                {group.points.map((point) => (
                  <li key={point}>
                    <Check size={12} strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
              <span className="group-count">
                {listings.filter((l) => l.category === group.name).length} listed
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section page-section">
        <div className="section-head">
          <div className="reveal">
            <Pill>Available now</Pill>
          </div>
          <Heading className="section-title" text="Every home currently on the books" />
        </div>

        <div className="listing-grid reveal-group">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="section page-section editorial">
        <div className="editorial-media fade-in">
          <Photo
            name="interiors/timber-ceiling-terrace"
            sizes="(max-width: 1080px) 92vw, 46vw"
          />
          <div className="editorial-figure">
            <strong>9 days</strong>
            <span>Average from first viewing to accepted offer</span>
          </div>
        </div>

        <div className="editorial-copy fade-in" data-delay="0.18">
          <Pill>Before it reaches the list</Pill>
          <h2 className="heading editorial-title">Every home here has been walked twice</h2>
          <p>
            Once by the agent who found it, and once with a surveyor before we will let you make an
            offer. Anything that fails the second visit never appears on this page, which is why the
            list is short and why nothing on it wastes your Saturday.
          </p>
          <ul className="editorial-points">
            {editorialPoints.map((point) => (
              <li key={point}>
                <i>
                  <Check size={12} strokeWidth={3} />
                </i>
                {point}
              </li>
            ))}
          </ul>
          <Button href="/#contact">Tell us what you are after</Button>
        </div>
      </section>

      <section className="band">
        <div className="band-media parallax-media">
          <Photo name="architecture/atrium-garden" sizes="100vw" />
        </div>
        <div className="band-inner">
          <div className="band-copy">
            <Pill tone="dark">How it runs</Pill>
            <Heading className="band-title" text="Four steps between the first call and the keys" />
            <p>
              Nothing here is unusual, but each step ends with something written down: a shortlist, a
              survey, a price, a completion date. You always know which one you are in.
            </p>
            <div className="band-actions">
              <Button href="/#contact" variant="light">
                Talk to an agent
              </Button>
            </div>
          </div>
          <div className="band-metrics">
            {buyingSteps.map((step) => (
              <div key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.copy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section page-section">
        <div className="stats-grid cards-plain reveal-group">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>
                <Counter value={stat.value} suffix={stat.suffix} />
              </strong>
              <h3>{stat.label}</h3>
              <p>{stat.copy}</p>
              <span className="stat-note">
                <Check size={13} strokeWidth={3} />
                {stat.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-panel">
          <div className="cta-main">
            <div className="reveal">
              <Pill tone="dark">
                <b />
                Viewings this week
              </Pill>
            </div>
            <Heading className="cta-title" text="Tell us the brief and we will bring the shortlist" />
            <p className="cta-copy reveal" data-delay="0.1">
              City, budget, and the date you would like to be holding keys. We come back with homes
              worth your Saturday, and the two things nobody else mentions.
            </p>
            <div className="reveal cta-actions" data-delay="0.16">
              <Button variant="light" href="mailto:hello@kondoru.com">
                hello@kondoru.com
              </Button>
              <a className="cta-phone" href="tel:+442079460138">
                +44 20 7946 0138
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
