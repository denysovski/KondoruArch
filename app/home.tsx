'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Compass,
  Heart,
  KeyRound,
  Layers,
  Leaf,
  Maximize,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Quote,
  Ruler,
  Search,
  Sparkles,
  Sun,
  Users,
  X,
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
import { Button, Counter, Heading, Pill } from '@/components/ui-kit'
import { SearchFilters } from '@/components/search-filters'
import { SocialBubbles } from '@/components/social-bubbles'
import { insights } from '@/lib/pages'
import Link from 'next/link'
import { Photo } from '@/components/photo'
import type { PhotoName } from '@/lib/photos'

/* ------------------------------------------------------------------ *
 * Content used only by the home page
 * ------------------------------------------------------------------ */

/** The three cards laid over the showcase photograph. */
const approachCards = [
  {
    title: 'Find it',
    copy: 'Off-market first, portals last. Six homes worth the trip rather than thirty that are not.',
    action: 'Browse the list',
    href: '/properties',
  },
  {
    title: 'Prove it',
    copy: 'An independent survey and a price benchmarked against real comparable sales, before you commit a euro.',
    action: 'How we price',
    href: '/services#buying',
  },
  {
    title: 'Shape it',
    copy: 'The studio reworks what needs reworking, from a single kitchen to a whole floor plan.',
    action: 'Meet the studio',
    href: '/studio',
  },
]

/** Every city with an office, in the order we opened them. */
const cityTiles = [
  {
    name: 'London',
    copy: 'Canary Wharf, Shoreditch and the river',
    count: 21,
    image: 'architecture/white-block',
  },
  {
    name: 'Lisbon',
    copy: 'Campo de Ourique to Príncipe Real',
    count: 18,
    image: 'architecture/vertical-forest',
  },
  {
    name: 'Oslo',
    copy: 'Grünerløkka, Bygdøy and the fjord',
    count: 14,
    image: 'architecture/timber-corner',
  },
  {
    name: 'Copenhagen',
    copy: 'Nordhavn and the harbour front',
    count: 12,
    image: 'architecture/glass-terraces',
  },
  {
    name: 'Porto',
    copy: 'Massarelos, Foz and the warehouses',
    count: 11,
    image: 'architecture/round-courtyard',
  },
  {
    name: 'Casablanca',
    copy: 'Anfa, and the shaded terraces above it',
    count: 8,
    image: 'architecture/planted-tower',
  },
] satisfies { name: string; copy: string; count: number; image: PhotoName }[]

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export function Home() {
  const [category, setCategory] = useState('All')
  const [railFading, setRailFading] = useState(false)
  const [propertyView, setPropertyView] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState<string[]>([])
  const [railEdges, setRailEdges] = useState({ start: true, end: false })
  const [ventureIndex, setVentureIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [voiceIndex, setVoiceIndex] = useState(0)
  const [leavingVoice, setLeavingVoice] = useState<number | null>(null)
  const [voiceDir, setVoiceDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const rail = useRef<HTMLDivElement>(null)
  const railBar = useRef<HTMLSpanElement>(null)
  const railFrame = useRef(0)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setSlideIndex((i) => (i + 1) % slides.length), 6500)
    return () => window.clearInterval(id)
  }, [paused])

  // The bar is written straight to the DOM on an animation frame rather than
  // through React state: a state update per scroll event lands a frame or two
  // late, which is what made the bar trail the rail. Only the arrow-button
  // disabled flags, which change twice per rail, go through state.
  const onRailScroll = () => {
    if (railFrame.current) return
    railFrame.current = window.requestAnimationFrame(() => {
      railFrame.current = 0
      const node = rail.current
      if (!node) return

      const max = node.scrollWidth - node.clientWidth
      const progress = max > 0 ? node.scrollLeft / max : 1
      if (railBar.current) {
        railBar.current.style.transform = `scaleX(${(0.14 + 0.86 * progress).toFixed(4)})`
      }

      setRailEdges((current) => {
        const start = node.scrollLeft <= 4
        const end = node.scrollLeft >= max - 4
        return current.start === start && current.end === end ? current : { start, end }
      })
    })
  }

  useEffect(() => {
    onRailScroll()
    return () => {
      // Clearing the id as well as the frame matters: it doubles as the
      // "already scheduled" guard above, so leaving a stale id here would
      // make every later scroll bail out and freeze the bar.
      if (railFrame.current) window.cancelAnimationFrame(railFrame.current)
      railFrame.current = 0
    }
  }, [category])

  // Step exactly one card (plus the grid gap) so the rail always lands on a
  // card edge rather than mid-card.
  const scrollRail = (direction: number) => {
    const node = rail.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('.property-card')
    const gap = parseFloat(window.getComputedStyle(node).columnGap || '0') || 0
    const step = card ? card.offsetWidth + gap : node.clientWidth * 0.6
    node.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  // Fade the rail out, swap the filtered set, then fade it back in.
  const selectCategory = (next: string) => {
    if (next === category) return
    setRailFading(true)
    window.setTimeout(() => {
      setCategory(next)
      rail.current?.scrollTo({ left: 0, behavior: 'auto' })
      window.requestAnimationFrame(() => setRailFading(false))
    }, 260)
  }

  const toggleLike = (title: string) =>
    setLiked((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    )

  const visibleProperties =
    category === 'All' ? properties : properties.filter((item) => item.category === category)

  const maxVenture = Math.max(ventures.length - 2, 0)
  const shiftVenture = (direction: number) =>
    setVentureIndex((current) => Math.min(Math.max(current + direction, 0), maxVenture))
  // The outgoing quote slides away and fades while the next one arrives from
  // the opposite side.
  const shiftVoice = (direction: number) => {
    setVoiceDir(direction)
    setLeavingVoice(voiceIndex)
    setVoiceIndex((current) => (current + direction + testimonials.length) % testimonials.length)
    window.setTimeout(() => setLeavingVoice(null), 620)
  }

  const voice = testimonials[voiceIndex]
  const slide = slides[slideIndex]

  const residenceHref = (title: string) =>
    `/properties/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

  return (
    <main id="main" className="site">
      {/* Hero ------------------------------------------------------- */}
      <section id="home" className="hero">
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
              <Button href="#properties" variant="light">
                Browse homes
              </Button>
              <a className="ghost-link" href="#services">
                <span>See how we work</span>
                <ArrowDownRight size={16} strokeWidth={2} />
              </a>
            </div>
          </div>

          <SearchFilters />

          <div className="destinations">
            {destinations.map((spot) => (
              <a key={spot.place} className="destination" href="#properties">
                <Photo name={spot.image} sizes="(max-width: 1080px) 92vw, 30vw" />
                <div className="destination-copy">
                  <strong>{spot.place}</strong>
                  <span>{spot.region}</span>
                  <small>{spot.meta}</small>
                </div>
                <i className="destination-arrow">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </i>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Promise ---------------------------------------------------- */}
      <section id="about" className="promise section">
        <div className="promise-side">
          <div className="reveal">
            <Pill>Why Kondoru</Pill>
          </div>
          <p className="promise-note reveal" data-delay="0.08">
            We help you buy property on better terms, then stay long enough to make sure the building
            lives up to the brochure.
          </p>
          <div className="promise-actions reveal" data-delay="0.14">
            <Button href="#contact">Talk to an agent</Button>
            <Button href="#faq" variant="outline">
              Read the FAQ
            </Button>
          </div>
        </div>

        <div className="promise-main">
          <Heading
            className="promise-title"
            text="Our agents are certified specialists who complete a full training programme, and we guarantee the best service in every city we work in."
          />
          <div className="promise-checks reveal-group">
            {[
              'One partner from first viewing through to handover.',
              'Independent surveys before a single euro is committed.',
              'In-house architects for anything that needs reshaping.',
            ].map((line) => (
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
        <div className="stats-grid reveal-group tilt">
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

      {/* Showcase band ---------------------------------------------- */}
      <section id="approach" className="showcase">
        <div className="showcase-media parallax-media">
          <Photo name="architecture/office-terrace" sizes="100vw" />
        </div>

        <div className="showcase-inner">
          <div className="showcase-copy">
            <Pill tone="dark">One team, start to finish</Pill>
            <Heading
              className="showcase-title"
              text="The same people who find the building are the ones who fix it"
            />
            <p>
              Most firms hand you over three times: to a surveyor, to an architect, to a contractor.
              We do not. One partner stays with you from the first viewing to the twelve-month
              review, and they are the person who answers when something goes wrong.
            </p>
            <div className="showcase-actions">
              <Button href="#services" variant="light">
                What we do
              </Button>
              <a className="showcase-ghost" href="#process">
                <span>See how a purchase runs</span>
                <ArrowDownRight size={16} strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="showcase-cards reveal-group">
            {approachCards.map((card, i) => (
              <Link key={card.title} className="showcase-card" href={card.href}>
                <span className="showcase-card-index">{`0${i + 1}`}</span>
                <strong>{card.title}</strong>
                <p>{card.copy}</p>
                <span className="showcase-card-more">
                  {card.action}
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services --------------------------------------------------- */}
      <section id="services" className="services section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>What we do</Pill>
            </div>
            <Heading className="section-title" text="Four ways we take work off your desk" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Most clients arrive for one of these and end up using three. Each service stands on its
              own, and they are priced separately, so nothing is bundled in without you asking.
            </p>
          </div>
        </div>

        <div className="services-grid reveal-group tilt">
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
              <a className="service-link" href="#contact">
                <span>Learn more</span>
                <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            </article>
          ))}
        </div>

        <div className="section-cta reveal">
          <Button href="/services" variant="outline">
            Compare services
          </Button>
        </div>
      </section>

      {/* Properties ------------------------------------------------- */}
      <section id="properties" className="properties section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Available now</Pill>
            </div>
            <Heading className="section-title" text="Homes ready to move into" />
          </div>
          <div className="rail-tools reveal" data-delay="0.1">
            <div className="chips">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`chip ${category === item ? 'is-active' : ''}`}
                  onClick={() => selectCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="carousel-controls">
              <button
                aria-label="Previous homes"
                onClick={() => scrollRail(-1)}
                disabled={railEdges.start}
              >
                <ArrowLeft size={17} strokeWidth={2} />
              </button>
              <button
                aria-label="Next homes"
                onClick={() => scrollRail(1)}
                disabled={railEdges.end}
              >
                <ArrowRight size={17} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={rail}
          className={`rail reveal-group ${railFading ? 'is-fading' : ''}`}
          onScroll={onRailScroll}
        >
          {visibleProperties.map((property) => (
            <article key={property.title} className="property-card">
              <div className="property-media">
                {property.images.map((image, i) => (
                  <Photo
                    key={image}
                    name={image}
                    className={i === (propertyView[property.title] ?? 0) ? 'is-shown' : ''}
                    sizes="(max-width: 720px) 88vw, 420px"
                  />
                ))}

                <div className="property-thumbs">
                  {property.images.map((image, i) => (
                    <button
                      key={image}
                      className={i === (propertyView[property.title] ?? 0) ? 'is-active' : ''}
                      aria-label={`Show view ${i + 1} of ${property.title}`}
                      onClick={() => setPropertyView((current) => ({ ...current, [property.title]: i }))}
                    >
                      <Photo name={image} alt="" sizes="76px" />
                    </button>
                  ))}
                </div>

                <button
                  className={`like ${liked.includes(property.title) ? 'is-liked' : ''}`}
                  aria-label={`Save ${property.title}`}
                  aria-pressed={liked.includes(property.title)}
                  onClick={() => toggleLike(property.title)}
                >
                  <Heart size={16} strokeWidth={2} />
                </button>
                <span className="property-status">
                  <CalendarDays size={13} strokeWidth={2} />
                  {property.status}
                </span>
              </div>

              <div className="property-body">
                <div className="property-head">
                  <div>
                    <h3>
                      <Link className="card-link" href={residenceHref(property.title)}>
                        {property.title}
                      </Link>
                    </h3>
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
                  <a className="property-book" href="#contact">
                    <span>Book a viewing</span>
                    <i className="arrow-bubble">
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </i>
                  </a>
                  <Link className="property-details" href={residenceHref(property.title)}>
                    Full details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rail-progress" aria-hidden="true">
          <span ref={railBar} style={{ transform: 'scaleX(0.14)' }} />
        </div>

        <div className="section-cta reveal">
          <Button href="#contact">See all 84 listings</Button>
          <Button href="#journal" variant="outline">
            Read the buying guide
          </Button>
        </div>
      </section>

      {/* Cities ----------------------------------------------------- */}
      <section id="cities" className="cities section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Where we work</Pill>
            </div>
            <Heading className="section-title" text="Six cities we know street by street" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              We only list where we have an office and someone who has walked the building. Pick a
              city and the search opens already filtered to it.
            </p>
          </div>
        </div>

        <div className="city-grid reveal-group">
          {cityTiles.map((city) => (
            <Link key={city.name} className="city-card" href={`/search?city=${city.name}`}>
              <Photo name={city.image} sizes="(max-width: 720px) 92vw, (max-width: 1080px) 46vw, 31vw" />
              <div className="city-card-body">
                <strong>{city.name}</strong>
                <span>{city.copy}</span>
              </div>
              <span className="city-card-count">
                {city.count} homes
                <ArrowUpRight size={15} strokeWidth={2.2} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Infinite loop marquee -------------------------------------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((pass) => (
            <div key={pass} className="marquee-group">
              {marqueeItems.map((item) => (
                <span key={`${pass}-${item}`}>
                  {item}
                  <i>
                    <Sparkles size={14} strokeWidth={2} />
                  </i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Full-bleed image band -------------------------------------- */}
      <section className="band">
        <div className="band-media parallax-media">
          <Photo name="architecture/atrium-garden" sizes="100vw" />
        </div>
        <div className="band-inner">
          <div className="band-copy">
            <Pill tone="dark">Inside the work</Pill>
            <Heading className="band-title" text="Buildings that behave well long after the photographs" />
            <p>
              We measure every completed project for a full year: energy use, comfort, acoustics and
              how residents actually move through the ground floor. The numbers go back into the next
              design, and they are published whether they flatter us or not.
            </p>
            <div className="band-actions">
              <Button href="#projects" variant="light">
                View the projects
              </Button>
              <a className="ghost-link ghost-link-light" href="#studio">
                <span>Meet the studio</span>
                <ArrowUpRight size={16} strokeWidth={2} />
              </a>
            </div>
          </div>
          <div className="band-metrics reveal-group">
            {insights.map((metric) => (
              <Link key={metric.slug} className="band-metric" href={`/insights/${metric.slug}`}>
                <strong>
                  <Counter value={metric.value} suffix={metric.suffix} />
                </strong>
                <b>{metric.title}</b>
                <span>{metric.card}</span>
                <i className="band-metric-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures --------------------------------------------------- */}
      <section id="projects" className="ventures section">
        <div className="ventures-panel">
          <div className="ventures-copy">
            <div className="reveal">
              <Pill>Latest projects</Pill>
            </div>
            <Heading
              className="ventures-title"
              text="Explore our most recent ventures into the future of living"
            />
            <div className="reveal" data-delay="0.12">
              <p className="muted">
                Every project begins with a conversation about constraints, climate and craft, and
                ends with a building that carries its own weight beautifully. Here are four we are
                proud to put our name on.
              </p>
            </div>
            <div className="reveal ventures-actions" data-delay="0.18">
              <Button href="#process">Get started</Button>
              <Button href="#contact" variant="outline">
                Download portfolio
              </Button>
            </div>
          </div>

          <div className="ventures-carousel">
            <div className="ventures-viewport">
              <div
                className="ventures-track"
                style={{ transform: `translate3d(${-ventureIndex * 50}%, 0, 0)` }}
              >
                {ventures.map((venture) => (
                  <article key={venture.title} className="venture-card">
                    <div className="venture-media">
                      <Photo name={venture.image} sizes="(max-width: 1080px) 84vw, 36vw" />
                      <span className="venture-tag">{venture.tag}</span>
                      <span className="venture-open">
                        <ArrowUpRight size={16} strokeWidth={2} />
                      </span>
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

            <div className="carousel-controls">
              <button
                aria-label="Previous projects"
                onClick={() => shiftVenture(-1)}
                disabled={ventureIndex === 0}
              >
                <ArrowLeft size={17} strokeWidth={2} />
              </button>
              <button
                aria-label="Next projects"
                onClick={() => shiftVenture(1)}
                disabled={ventureIndex === maxVenture}
              >
                <ArrowRight size={17} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Split heading ---------------------------------------------- */}
      <section id="studio" className="split section">
        <div className="split-left">
          <div className="reveal">
            <Pill>Chapter one</Pill>
          </div>
          <Heading className="split-title" text="Parametric design, high-tech architecture" />
        </div>
        <div className="split-right reveal" data-delay="0.12">
          <p className="muted">
            Free-flowing geometric structures, computationally generated and rigorously built for the
            way climate, light and people actually move through a place.
          </p>
          <a className="round-button" href="#feature" aria-label="See the studio approach">
            <ArrowDownRight size={20} strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* Feature slider --------------------------------------------- */}
      <section
        id="feature"
        className="feature section-tight"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="feature-stage">
          {slides.map((item, i) => (
            <div
              key={item.index}
              className={`feature-slide ${i === slideIndex ? 'is-active' : ''}`}
              aria-hidden={i !== slideIndex}
            >
              <Photo name={item.image} sizes="100vw" priority={i === 0} />
            </div>
          ))}

          <div className="feature-overlay">
            <div className="feature-top">
              <span className="feature-label">{slide.kicker}</span>
              <span className="feature-label">{slide.meta}</span>
            </div>

            <div className="feature-bottom">
              <div key={slideIndex} className="feature-text">
                <h3>{slide.title}</h3>
                <p>{slide.copy}</p>
              </div>

              <div className="feature-controls">
                <div className="feature-dots">
                  {slides.map((item, i) => (
                    <button
                      key={item.index}
                      className={i === slideIndex ? 'is-active' : ''}
                      aria-label={`Show slide ${i + 1}`}
                      onClick={() => setSlideIndex(i)}
                    />
                  ))}
                </div>
                <a className="feature-cta" href="#contact">
                  <span>View project</span>
                  <i className="arrow-bubble">
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky amenities ------------------------------------------- */}
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
          <div className="reveal">
            <Pill>Standards</Pill>
          </div>
          <Heading className="sticky-title" text="What every Kondoru building has to earn" />
          <p className="muted reveal" data-delay="0.1">
            These four are not upgrades or options. If a scheme cannot meet them on the site it has,
            we redesign the scheme rather than lower the standard.
          </p>

          <div className="amenity-list reveal-group tilt">
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

      {/* Partnership + gallery -------------------------------------- */}
      <section className="partnership section">
        <div className="reveal">
          <Pill>Partnership</Pill>
        </div>
        <Heading
          className="partnership-title"
          text="With a passion for innovation and a commitment to excellence, we design structures that inspire, empower and endure."
        />

        <div className="gallery reveal-group tilt">
          {gallery.map((item) => (
            <figure key={item.caption} className="gallery-item">
              <Photo name={item.image} sizes="(max-width: 1080px) 92vw, 32vw" />
              <figcaption>
                {item.caption}
                <Plus size={14} strokeWidth={2} />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="gallery-footer reveal">
          <p className="muted">
            Would you like to collaborate? We would love to hear about your next build, whether it is
            a single apartment or a forty-unit scheme.
          </p>
          <Button>Let&apos;s talk</Button>
        </div>
      </section>

      {/* Process ---------------------------------------------------- */}
      <section id="process" className="process section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>How we work</Pill>
            </div>
            <Heading className="section-title" text="Four movements from first sketch to handover" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Each stage ends with a decision you sign off, a fixed price for the next one and a
              document you can take to anyone else for a second opinion.
            </p>
          </div>
        </div>

        <div className="process-grid reveal-group tilt">
          {processSteps.map((item) => (
            <article key={item.title} className="process-card">
              <h4>{item.title}</h4>
              <p>{item.copy}</p>
              <Link
                className="process-corner"
                href={item.href}
                aria-label={`More about ` + item.title}
              >
                <ArrowRight size={17} strokeWidth={2.2} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ -------------------------------------------------------- */}
      <section id="faq" className="faq section">
        <div className="faq-side">
          <div className="reveal">
            <Pill>Questions</Pill>
          </div>
          <Heading className="faq-title" text="The things people ask us first" />
          <p className="muted reveal" data-delay="0.1">
            Cannot find your question here? Call the number at the top of the page, or send a note and
            one of the partners will answer within a working day.
          </p>
          <div className="reveal" data-delay="0.16">
            <Button href="#contact" variant="outline">
              Ask us anything
            </Button>
          </div>
        </div>

        <div className="faq-list reveal-group tilt">
          {faqs.map((faq, i) => (
            <div key={faq.question} className={`faq-item ${openFaq === i ? 'is-open' : ''}`}>
              <button
                className="faq-question"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq((current) => (current === i ? null : i))}
              >
                <span>{faq.question}</span>
                <i>{openFaq === i ? <Minus size={17} strokeWidth={2} /> : <Plus size={17} strokeWidth={2} />}</i>
              </button>
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
          <div className="reveal">
            <Pill>The people</Pill>
          </div>
          <Heading className="section-title" text="Small team, long relationships" />
        </div>

        <div className="team-grid reveal-group tilt">
          {team.map((person) => (
            <article key={person.name} className="team-card">
              <div className="team-media">
                <Photo name={person.image} sizes="(max-width: 720px) 88vw, (max-width: 1280px) 44vw, 23vw" />
                <span className="team-role">{person.role}</span>
              </div>

              <div className="team-body">
                <h4>{person.name}</h4>
                <p className="team-focus">{person.focus}</p>
                <p className="team-bio">{person.bio}</p>

                <SocialBubbles socials={person.socials} name={person.name} />

                <ul className="team-languages" aria-label={`Languages ${person.name} speaks`}>
                  {person.languages.split('·').map((language) => (
                    <li key={language}>{language.trim()}</li>
                  ))}
                </ul>

                <div className="team-contact">
                  <a href={`mailto:${person.email}`}>
                    <Mail size={14} strokeWidth={2} />
                    {person.email}
                  </a>
                  <a href={`tel:${person.phone.replace(/\s/g, '')}`}>
                    <Phone size={14} strokeWidth={2} />
                    {person.phone}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Journal ---------------------------------------------------- */}
      <section id="journal" className="journal section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Journal</Pill>
            </div>
            <Heading className="section-title" text="Notes from the market and the drawing board" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <Button href="/journal/all" variant="outline">
              All articles
            </Button>
          </div>
        </div>

        <div className="journal-grid reveal-group tilt">
          {journal.map((post) => (
            <article key={post.title} className="journal-card">
              <div className="journal-media">
                <Photo name={post.image} sizes="(max-width: 1080px) 92vw, 32vw" />
                <span className="journal-tag">{post.tag}</span>
              </div>
              <span className="journal-date">{post.date}</span>
              <h4>{post.title}</h4>
              <Link className="service-link card-link" href="/journal/all">
                <span>Read article</span>
                <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials ----------------------------------------------- */}
      <section id="voices" className="voices section">
        <div className="voices-head">
          <Pill>Testimonial</Pill>
          <div className="voices-nav">
            <span className="voices-count">
              {voiceIndex + 1} <i>/</i> {testimonials.length}
            </span>
            <button aria-label="Previous testimonial" onClick={() => shiftVoice(-1)}>
              <ArrowLeft size={17} strokeWidth={2} />
            </button>
            <button aria-label="Next testimonial" onClick={() => shiftVoice(1)}>
              <ArrowRight size={17} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="voice-stage">
          {leavingVoice !== null && (
            <div
              key={`leaving-${leavingVoice}`}
              className={`voice-body is-leaving ${voiceDir > 0 ? 'to-left' : 'to-right'}`}
              aria-hidden="true"
            >
              <Quote size={32} strokeWidth={1.5} className="voice-mark" />
              <blockquote>{testimonials[leavingVoice].quote}</blockquote>
              <div className="voice-person">
                <Photo name={testimonials[leavingVoice].avatar} alt="" sizes="62px" />
                <div>
                  <strong>{testimonials[leavingVoice].name}</strong>
                  <span>{testimonials[leavingVoice].role}</span>
                </div>
              </div>
            </div>
          )}

          <div
            key={`current-${voiceIndex}`}
            className={`voice-body is-entering ${voiceDir > 0 ? 'from-right' : 'from-left'}`}
          >
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
      <section id="contact" className="cta">
        <div className="cta-panel">
          <div className="cta-main">
            <div className="reveal">
              <Pill tone="dark">
                <b />
                Now booking 2026
              </Pill>
            </div>
            <Heading className="cta-title" text="Let's build something that outlasts us" />
            <p className="cta-copy reveal" data-delay="0.1">
              Tell us the city, the budget and the date you would like to be holding keys. We will come
              back with a shortlist, a realistic timeline and the two things nobody else mentions.
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

          <form
            className="cta-form reveal"
            data-delay="0.12"
            onSubmit={(event) => {
              event.preventDefault()
              if (email.trim()) setSubscribed(true)
            }}
          >
            <h3>Get new listings first</h3>
            <p>One email a week, with the homes that never make it to the portals.</p>
            <label className="cta-field">
              <Mail size={16} strokeWidth={2} />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email address"
              />
            </label>
            <button type="submit" className="cta-submit">
              {subscribed ? 'Subscribed' : 'Subscribe'}
              {subscribed ? <Check size={16} strokeWidth={2.4} /> : <ArrowUpRight size={16} strokeWidth={2} />}
            </button>
            <span className={`cta-note ${subscribed ? 'is-visible' : ''}`}>
              Thank you — the next edition lands on Thursday.
            </span>
          </form>
        </div>
      </section>

      {/* Footer ----------------------------------------------------- */}
    </main>
  )
}
