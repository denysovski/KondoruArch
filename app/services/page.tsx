import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Check, Clock } from 'lucide-react'
import { services, faqs } from '@/lib/content'
import { serviceDetail } from '@/lib/pages'
import { Button, Heading, PageHero, Pill } from '@/components/ui-kit'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: 'Buying, developing, designing and advising',
  description:
    'Four property services, priced separately and never quietly bundled: buyer representation at 1.2% on completion, development, architecture and portfolio advice.',
  path: '/services',
  image: photoCard('architecture/layered-block'),
})

/** Each service as its own offer, with the fee crawlers can actually read. */
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Kondoru services',
  itemListElement: serviceDetail.map((service) => ({
    '@type': 'Offer',
    name: service.name,
    description: service.lead,
    url: absoluteUrl(`/services#${service.id}`),
    priceSpecification: { '@type': 'PriceSpecification', description: service.price },
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

export default function ServicesPage() {
  return (
    <main id="main" className="site subpage">
      <JsonLd
        data={[servicesSchema, faqSchema, breadcrumbSchema([{ name: 'Services', path: '/services' }])]}
      />

      <PageHero
        eyebrow="Services"
        title="Four services, priced separately, never quietly bundled"
        copy="Most clients arrive for one of these and end up using three. Each one stands on its own, has its own fee, and ends with something you can take to somebody else for a second opinion."
        image="architecture/layered-block"
        facts={[
          { value: '1.2%', label: 'Buying fee, on completion' },
          { value: '4 wks', label: 'Feasibility turnaround' },
          { value: '12 mo', label: 'Post-handover monitoring' },
        ]}
      />

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>At a glance</Pill>
            </div>
            <Heading className="section-title" text="What we take off your desk" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              The short version first. Each card below links down to the full description, the fee
              and what is actually included.
            </p>
          </div>
        </div>

        <div className="services-grid reveal-group tilt">
          {services.map((service, i) => (
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
              <a className="service-link" href={`#${serviceDetail[i].id}`}>
                <span>Read the detail</span>
                <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            </article>
          ))}
        </div>
      </section>

      {serviceDetail.map((service, i) => (
        <section key={service.id} id={service.id} className="section page-section service-detail">
          <div className="service-detail-head">
            <div className="reveal">
              <Pill>{`0${i + 1}`.replace(/^0(\d\d)/, '$1')}</Pill>
            </div>
            <Heading className="service-detail-title" text={service.name} />
            <p className="service-lead">{service.lead}</p>
          </div>

          <div className="service-detail-body">
            <p className="muted">{service.copy}</p>

            <div className="service-detail-grid">
              <div>
                <h4>What is included</h4>
                <ul>
                  {service.includes.map((item) => (
                    <li key={item}>
                      <Check size={14} strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="service-price">
                <span>Fee</span>
                <strong>{service.price}</strong>
                <p>
                  <Clock size={14} strokeWidth={2} />
                  {service.timeline}
                </p>
                <Button href="/#contact">Start here</Button>
              </aside>
            </div>
          </div>
        </section>
      ))}

      <section className="section page-section faq faq-page">
        <div className="faq-side">
          <div className="reveal">
            <Pill>Questions</Pill>
          </div>
          <Heading className="faq-title" text="Before you commit to anything" />
          <p className="muted reveal" data-delay="0.1">
            The answers we give most often. Anything else, call the number at the top of the page and
            a partner will answer within a working day.
          </p>
          <div className="reveal" data-delay="0.16">
            <Link className="button button-outline" href="/#contact">
              <span>Ask us anything</span>
            </Link>
          </div>
        </div>

        <div className="faq-list reveal-group">
          {faqs.map((faq) => (
            <div key={faq.question} className="faq-item is-static">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
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
                Taking work for 2026
              </Pill>
            </div>
            <Heading className="cta-title" text="Start with a conversation, not a contract" />
            <p className="cta-copy reveal" data-delay="0.1">
              Half an hour on a call is usually enough to tell you which of the four you actually
              need, and whether we are the right people for it.
            </p>
            <div className="reveal cta-actions" data-delay="0.16">
              <Button variant="light" href="mailto:hello@kondoru.com">
                hello@kondoru.com
              </Button>
              <a className="cta-phone" href="tel:+442000000000">
                +44 20 0000 0000
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
