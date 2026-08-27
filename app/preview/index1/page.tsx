import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  ChevronDown,
  Layers,
  Mail,
  MapPin,
  Maximize,
  Minus,
  Phone,
  Quote,
  Search,
  Sparkles,
} from 'lucide-react'
import {
  amenities,
  categories,
  destinations,
  faqs,
  gallery,
  journal,
  marqueeItems,
  processSteps,
  properties,
  services,
  slides,
  stats,
  team,
  testimonials,
  ventures,
} from '@/lib/content'
import { insights } from '@/lib/pages'
import { Photo } from '@/components/photo'
import type { PhotoName } from '@/lib/photos'
import { absoluteUrl } from '@/lib/utils'

/* ------------------------------------------------------------------ *
 * index1 — the home page with the motion taken out.
 *
 * Same content, same layout, same components where they are already
 * static. What is missing is on purpose: no reveal-on-scroll, no
 * parallax, no carousels, no hover responses. Everything that normally
 * arrives over time is rendered in its finished state, so a single
 * screenshot of this page shows the whole design at rest — which is what
 * a README or a portfolio board needs.
 *
 * The neutralising rules live under `.static-page` in globals.css.
 * ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'Flat preview',
  description:
    'The Kondoru home page rendered flat: no reveal-on-scroll, no parallax, no carousels and no hover states, so the whole design can be captured in a single screenshot.',
  alternates: { canonical: absoluteUrl('/preview/index1') },
  robots: { index: false, follow: false },
}

const approachCards = [
  {
    title: 'Find it',
    copy: 'Off-market first, portals last. Six homes worth the trip rather than thirty that are not.',
    action: 'Browse the list',
  },
  {
    title: 'Prove it',
    copy: 'An independent survey and a price benchmarked against real comparable sales, before you commit a euro.',
    action: 'How we price',
  },
  {
    title: 'Shape it',
    copy: 'The studio reworks what needs reworking, from a single kitchen to a whole floor plan.',
    action: 'Meet the studio',
  },
]

const cityTiles: { name: string; copy: string; count: number; image: PhotoName }[] = [
  { name: 'London', copy: 'Canary Wharf, Shoreditch and the river', count: 21, image: 'architecture/white-block' },
  { name: 'Lisbon', copy: 'Campo de Ourique to Príncipe Real', count: 18, image: 'architecture/vertical-forest' },
  { name: 'Oslo', copy: 'Grünerløkka, Bygdøy and the fjord', count: 14, image: 'architecture/timber-corner' },
  { name: 'Copenhagen', copy: 'Nordhavn and the harbour front', count: 12, image: 'architecture/glass-terraces' },
  { name: 'Porto', copy: 'Massarelos, Foz and the warehouses', count: 11, image: 'architecture/round-courtyard' },
  { name: 'Casablanca', copy: 'Anfa, and the shaded terraces above it', count: 8, image: 'architecture/planted-tower' },
]

const searchFields = ['Buy or rent', 'City', 'District', 'Rooms', 'Price']

const promiseChecks = [
  'One partner from first viewing through to handover.',
  'Independent surveys before a single euro is committed.',
  'In-house architects for anything that needs reshaping.',
]

const slide = slides[0]
const voice = testimonials[0]

export default function FlatPreviewPage() {
  return (
    <main id="main" className="site static-page">
      {/* Hero ------------------------------------------------------- */}
      <section className="hero">
        <div className="hero-media">
          <Photo name="architecture/hero-facade" sizes="100vw" priority />
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <h1 className="brand-word">
              <span className="word-mask">
                <span className="word">Kondoru</span>
              </span>
            </h1>
            <p className="hero-tagline">
              Buying property, made safe and simple. We find it, price it, design it and hand you the
              keys.
            </p>
            <div className="hero-actions">
              <span className="button button-light">
                <span>Browse homes</span>
                <i className="arrow-bubble">
                  <ArrowRight size={15} strokeWidth={2.2} />
                </i>
              </span>
              <span className="ghost-link">
                <span>See how we work</span>
                <ArrowDownRight size={16} strokeWidth={2} />
              </span>
            </div>
          </div>

          <div className="search-bar search-bar-hero">
            <div className="search-fields">
              {searchFields.map((field) => (
                <div key={field} className="select">
                  <span className="select-trigger">
                    <span>{field}</span>
                    <ChevronDown size={16} strokeWidth={2} />
                  </span>
                </div>
              ))}
            </div>
            <span className="search-submit">
              <Search size={17} strokeWidth={2.2} />
              Search now
            </span>
          </div>

          <div className="destinations">
            {destinations.map((spot) => (
              <div key={spot.place} className="destination">
                <Photo name={spot.image} sizes="(max-width: 1080px) 92vw, 30vw" />
                <div className="destination-copy">
                  <strong>{spot.place}</strong>
                  <span>{spot.region}</span>
                  <small>{spot.meta}</small>
                </div>
                <i className="destination-arrow">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise ---------------------------------------------------- */}
      <section className="promise section">
        <div className="promise-side">
          <span className="pill pill-light">Why Kondoru</span>
          <p className="promise-note">
            We help you buy property on better terms, then stay long enough to make sure the building
            lives up to the brochure.
          </p>
          <div className="promise-actions">
            <span className="button button-dark">
              <span>Talk to an agent</span>
              <i className="arrow-bubble">
                <ArrowRight size={15} strokeWidth={2.2} />
              </i>
            </span>
            <span className="button button-outline">
              <span>Read the FAQ</span>
              <i className="arrow-bubble">
                <ArrowRight size={15} strokeWidth={2.2} />
              </i>
            </span>
          </div>
        </div>

        <div className="promise-main">
          <h2 className="heading promise-title">
            Our agents are certified specialists who complete a full training programme, and we
            guarantee the best service in every city we work in.
          </h2>
          <div className="promise-checks">
            {promiseChecks.map((line) => (
              <p key={line}>
                <i>
                  <Check size={14} strokeWidth={3} />
                </i>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats ------------------------------------------------------ */}
      <section className="stats section-tight">
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>
                {stat.value.toLocaleString('en-US')}
                {stat.suffix}
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

      {/* Showcase --------------------------------------------------- */}
      <section className="showcase">
        <div className="showcase-media">
          <Photo name="architecture/office-terrace" sizes="100vw" />
        </div>

        <div className="showcase-inner">
          <div className="showcase-copy">
            <span className="pill pill-dark">One team, start to finish</span>
            <h2 className="heading showcase-title">
              The same people who find the building are the ones who fix it
            </h2>
            <p>
              Most firms hand you over three times: to a surveyor, to an architect, to a contractor.
              We do not. One partner stays with you from the first viewing to the twelve-month
              review, and they are the person who answers when something goes wrong.
            </p>
            <div className="showcase-actions">
              <span className="button button-light">
                <span>What we do</span>
                <i className="arrow-bubble">
                  <ArrowRight size={15} strokeWidth={2.2} />
                </i>
              </span>
              <span className="showcase-ghost">
                <span>See how a purchase runs</span>
                <ArrowDownRight size={16} strokeWidth={2} />
              </span>
            </div>
          </div>

          <div className="showcase-cards">
            {approachCards.map((card, i) => (
              <div key={card.title} className="showcase-card">
                <span className="showcase-card-index">{`0${i + 1}`}</span>
                <strong>{card.title}</strong>
                <p>{card.copy}</p>
                <span className="showcase-card-more">
                  {card.action}
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services --------------------------------------------------- */}
      <section className="services section">
        <div className="section-head split-head">
          <div>
            <span className="pill pill-light">What we do</span>
            <h2 className="heading section-title">Four ways we take work off your desk</h2>
          </div>
          <div className="section-head-side">
            <p className="muted">
              Most clients arrive for one of these and end up using three. Each service stands on its
              own, and they are priced separately, so nothing is bundled in without you asking.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <i className="service-icon">
                <service.icon size={22} strokeWidth={1.8} />
              </i>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>
                    <Check size={13} strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
              <span className="service-link">
                <span>Learn more</span>
                <ArrowUpRight size={15} strokeWidth={2} />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Properties ------------------------------------------------- */}
      <section className="properties section">
        <div className="section-head split-head">
          <div>
            <span className="pill pill-light">Available now</span>
            <h2 className="heading section-title">Homes ready to move into</h2>
          </div>
          <div className="rail-tools">
            <div className="chips">
              {categories.map((item, i) => (
                <span key={item} className={`chip ${i === 0 ? 'is-active' : ''}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-property-grid">
          {properties.map((property) => (
            <article key={property.title} className="property-card">
              <div className="property-media">
                <Photo
                  name={property.images[0]}
                  className="is-shown"
                  sizes="(max-width: 720px) 92vw, (max-width: 1280px) 46vw, 30vw"
                />
                <span className="property-status">
                  <CalendarDays size={13} strokeWidth={2} />
                  {property.status}
                </span>
              </div>

              <div className="property-body">
                <div className="property-head">
                  <div>
                    <h3>{property.title}</h3>
                    <span className="property-city">
                      <MapPin size={13} strokeWidth={2} />
                      {property.district}, {property.city}
                    </span>
                  </div>
                  <div className="property-price">
                    <strong>{property.price}</strong>
                    <span>{property.monthly}</span>
                  </div>
                </div>

                <p className="property-desc">{property.desc}</p>

                <ul className="property-specs">
                  <li>
                    <BedDouble size={16} strokeWidth={1.8} />
                    {property.beds}
                  </li>
                  <li>
                    <Bath size={16} strokeWidth={1.8} />
                    {property.baths}
                  </li>
                  <li>
                    <Maximize size={16} strokeWidth={1.8} />
                    {property.area}
                  </li>
                  <li>
                    <Layers size={16} strokeWidth={1.8} />
                    {property.floor}
                  </li>
                </ul>

                <div className="property-highlights">
                  {property.highlights.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="property-actions">
                  <span className="property-book">
                    <span>Book a viewing</span>
                    <i className="arrow-bubble">
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </i>
                  </span>
                  <span className="property-details">Full details</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cities ----------------------------------------------------- */}
      <section className="cities section">
        <div className="section-head split-head">
          <div>
            <span className="pill pill-light">Where we work</span>
            <h2 className="heading section-title">Six cities we know street by street</h2>
          </div>
          <div className="section-head-side">
            <p className="muted">
              We only list where we have an office and someone who has walked the building. Pick a
              city and the search opens already filtered to it.
            </p>
          </div>
        </div>

        <div className="city-grid">
          {cityTiles.map((city) => (
            <div key={city.name} className="city-card">
              <Photo name={city.image} sizes="(max-width: 720px) 92vw, (max-width: 1080px) 46vw, 31vw" />
              <div className="city-card-body">
                <strong>{city.name}</strong>
                <span>{city.copy}</span>
              </div>
              <span className="city-card-count">
                {city.count} homes
                <ArrowUpRight size={15} strokeWidth={2.2} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee ---------------------------------------------------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <div className="marquee-group">
            {marqueeItems.map((item) => (
              <span key={item}>
                {item}
                <i>
                  <Sparkles size={14} strokeWidth={2} />
                </i>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Band ------------------------------------------------------- */}
      <section className="band">
        <div className="band-media">
          <Photo name="architecture/atrium-garden" sizes="100vw" />
        </div>
        <div className="band-inner">
          <div className="band-copy">
            <span className="pill pill-dark">Inside the work</span>
            <h2 className="heading band-title">
              Buildings that behave well long after the photographs
            </h2>
            <p>
              We measure every completed project for a full year: energy use, comfort, acoustics and
              how residents actually move through the ground floor. The numbers go back into the next
              design, and they are published whether they flatter us or not.
            </p>
          </div>
          <div className="band-metrics">
            {insights.map((metric) => (
              <div key={metric.slug} className="band-metric">
                <strong>
                  {metric.value}
                  {metric.suffix}
                </strong>
                <b>{metric.title}</b>
                <span>{metric.card}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures --------------------------------------------------- */}
      <section className="ventures section">
        <div className="ventures-panel">
          <div className="ventures-copy">
            <span className="pill pill-light">Latest projects</span>
            <h2 className="heading ventures-title">
              Explore our most recent ventures into the future of living
            </h2>
            <p className="muted">
              Every project begins with a conversation about constraints, climate and craft, and ends
              with a building that carries its own weight beautifully. Here are four we are proud to
              put our name on.
            </p>
          </div>

          <div className="preview-venture-grid">
            {ventures.map((venture) => (
              <article key={venture.title} className="venture-card">
                <div className="venture-media">
                  <Photo name={venture.image} sizes="(max-width: 1080px) 84vw, 36vw" />
                  <span className="venture-tag">{venture.tag}</span>
                </div>
                <div className="venture-info">
                  <strong>{venture.title}</strong>
                  <span>
                    {venture.location} — {venture.year}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Split ------------------------------------------------------ */}
      <section className="split section">
        <div className="split-left">
          <span className="pill pill-light">Chapter one</span>
          <h2 className="heading split-title">Parametric design, high-tech architecture</h2>
        </div>
        <div className="split-right">
          <p className="muted">
            Free-flowing geometric structures, computationally generated and rigorously built for the
            way climate, light and people actually move through a place.
          </p>
          <span className="round-button">
            <ArrowDownRight size={20} strokeWidth={2} />
          </span>
        </div>
      </section>

      {/* Feature ---------------------------------------------------- */}
      <section className="feature section-tight">
        <div className="feature-stage">
          <div className="feature-slide is-active">
            <Photo name={slide.image} sizes="100vw" />
          </div>

          <div className="feature-overlay">
            <div className="feature-top">
              <span className="feature-label">{slide.kicker}</span>
              <span className="feature-label">{slide.meta}</span>
            </div>

            <div className="feature-bottom">
              <div className="feature-text">
                <h3>{slide.title}</h3>
                <p>{slide.copy}</p>
              </div>

              <div className="feature-controls">
                <div className="feature-dots">
                  {slides.map((item, i) => (
                    <span key={item.index} className={i === 0 ? 'is-active' : ''} />
                  ))}
                </div>
                <span className="feature-cta">
                  <span>View project</span>
                  <i className="arrow-bubble">
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards -------------------------------------------------- */}
      <section className="sticky-section section">
        <div className="sticky-visual">
          <div className="sticky-media">
            <Photo name="architecture/twin-towers" sizes="(max-width: 1080px) 92vw, 46vw" />
            <div className="sticky-overlay">
              <span className="sticky-overlay-tag">Nordic Quarter, Oslo</span>
              <strong>Built to the four standards</strong>
              <p>
                Timber core, four hours of winter light in every flat, a shared courtyard, and a
                warranty that runs to 2050.
              </p>
              <ul>
                <li>Completed 2025</li>
                <li>74 m² average</li>
                <li>42% less carbon</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky-copy">
          <span className="pill pill-light">Standards</span>
          <h2 className="heading sticky-title">What every Kondoru building has to earn</h2>
          <p className="muted">
            These four are not upgrades or options. If a scheme cannot meet them on the site it has,
            we redesign the scheme rather than lower the standard.
          </p>

          <div className="amenity-list">
            {amenities.map((item) => (
              <article key={item.title} className="amenity">
                <i>
                  <item.icon size={20} strokeWidth={1.8} />
                </i>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership ------------------------------------------------ */}
      <section className="partnership section">
        <span className="pill pill-light">Partnership</span>
        <h2 className="heading partnership-title">
          With a passion for innovation and a commitment to excellence, we design structures that
          inspire, empower and endure.
        </h2>

        <div className="gallery">
          {gallery.map((item) => (
            <figure key={item.caption} className="gallery-item">
              <Photo name={item.image} sizes="(max-width: 1080px) 92vw, 32vw" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Process ---------------------------------------------------- */}
      <section className="process section">
        <div className="section-head split-head">
          <div>
            <span className="pill pill-light">How we work</span>
            <h2 className="heading section-title">Four movements from first sketch to handover</h2>
          </div>
          <div className="section-head-side">
            <p className="muted">
              Each stage ends with a decision you sign off, a fixed price for the next one and a
              document you can take to anyone else for a second opinion.
            </p>
          </div>
        </div>

        <div className="process-grid">
          {processSteps.map((item) => (
            <article key={item.title} className="process-card">
              <h4>{item.title}</h4>
              <p>{item.copy}</p>
              <span className="process-corner">
                <ArrowRight size={17} strokeWidth={2.2} />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ -------------------------------------------------------- */}
      <section className="faq section">
        <div className="faq-side">
          <span className="pill pill-light">Questions</span>
          <h2 className="heading faq-title">The things people ask us first</h2>
          <p className="muted">
            Cannot find your question here? Call the number at the top of the page, or send a note and
            one of the partners will answer within a working day.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={faq.question} className={`faq-item ${i === 0 ? 'is-open' : ''}`}>
              <span className="faq-question">
                <span>{faq.question}</span>
                <i>{i === 0 ? <Minus size={17} strokeWidth={2} /> : <ArrowRight size={17} strokeWidth={2} />}</i>
              </span>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team ------------------------------------------------------- */}
      <section className="team section">
        <div className="section-head">
          <span className="pill pill-light">The people</span>
          <h2 className="heading section-title">Small team, long relationships</h2>
        </div>

        <div className="team-grid">
          {team.map((person) => (
            <article key={person.name} className="team-card">
              <div className="team-media">
                <Photo
                  name={person.image}
                  sizes="(max-width: 720px) 88vw, (max-width: 1280px) 44vw, 23vw"
                />
                <span className="team-role">{person.role}</span>
              </div>

              <div className="team-body">
                <h4>{person.name}</h4>
                <p className="team-focus">{person.focus}</p>
                <p className="team-bio">{person.bio}</p>

                <ul className="team-languages">
                  {person.languages.split('·').map((language) => (
                    <li key={language}>{language.trim()}</li>
                  ))}
                </ul>

                <div className="team-contact">
                  <span>
                    <Mail size={14} strokeWidth={2} />
                    {person.email}
                  </span>
                  <span>
                    <Phone size={14} strokeWidth={2} />
                    {person.phone}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Journal ---------------------------------------------------- */}
      <section className="journal section">
        <div className="section-head split-head">
          <div>
            <span className="pill pill-light">Journal</span>
            <h2 className="heading section-title">Notes from the market and the drawing board</h2>
          </div>
        </div>

        <div className="journal-grid">
          {journal.map((post) => (
            <article key={post.title} className="journal-card">
              <div className="journal-media">
                <Photo name={post.image} sizes="(max-width: 1080px) 92vw, 32vw" />
                <span className="journal-tag">{post.tag}</span>
              </div>
              <span className="journal-date">{post.date}</span>
              <h4>{post.title}</h4>
              <span className="service-link">
                <span>Read article</span>
                <ArrowUpRight size={15} strokeWidth={2} />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonial ------------------------------------------------ */}
      <section className="voices section">
        <div className="voices-head">
          <span className="pill pill-light">Testimonial</span>
          <div className="voices-nav">
            <span className="voices-count">
              1 <i>/</i> {testimonials.length}
            </span>
          </div>
        </div>

        <div className="voice-stage">
          <div className="voice-body">
            <Quote size={32} strokeWidth={1.5} className="voice-mark" />
            <blockquote>{voice.quote}</blockquote>
            <div className="voice-person">
              <Photo name={voice.avatar} sizes="62px" />
              <div>
                <strong>{voice.name}</strong>
                <span>{voice.role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA -------------------------------------------------------- */}
      <section className="cta">
        <div className="cta-panel">
          <div className="cta-main">
            <span className="pill pill-dark">
              <b />
              Now booking 2026
            </span>
            <h2 className="heading cta-title">Let&apos;s build something that outlasts us</h2>
            <p className="cta-copy">
              Tell us the city, the budget and the date you would like to be holding keys. We will
              come back with a shortlist, a realistic timeline and the two things nobody else
              mentions.
            </p>
            <div className="cta-actions">
              <span className="button button-light">
                <span>hello@kondoru.com</span>
                <i className="arrow-bubble">
                  <ArrowRight size={15} strokeWidth={2.2} />
                </i>
              </span>
              <span className="cta-phone">
                <Phone size={15} strokeWidth={2} />
                +44 20 0000 0000
              </span>
            </div>
          </div>

          <div className="cta-form">
            <h3>Get new listings first</h3>
            <p>One email a week, with the homes that never make it to the portals.</p>
            <span className="cta-field">
              <Mail size={16} strokeWidth={2} />
              <input type="email" placeholder="you@example.com" readOnly aria-label="Email address" />
            </span>
            <span className="cta-submit">
              Subscribe
              <ArrowUpRight size={16} strokeWidth={2} />
            </span>
          </div>
        </div>
      </section>

      {/* The one live link on the page, so the preview is not a dead end. */}
      <p className="preview-note">
        This is a flat, motion-free copy of the home page, built for screenshots.{' '}
        <Link href="/">Open the live home page</Link>
      </p>
    </main>
  )
}
