import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { officeList } from '@/lib/pages'
import { Heading, PageHero, Pill } from '@/components/ui-kit'
import { JsonLd } from '@/components/json-ld'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'
import { ContactFlow } from './contact-flow'

export const metadata: Metadata = pageMetadata({
  title: 'Contact — book a viewing, a valuation or a first call',
  description:
    'Tell us what you need and we will send the right person: buying, selling or letting, design and build, investment advice or press. Offices in London, Lisbon, Oslo, Copenhagen and Porto.',
  path: '/contact',
  image: photoCard('features/glass-towers-sky'),
})

export default function ContactPage() {
  return (
    <main id="main" className="site subpage">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Kondoru',
            url: absoluteUrl('/contact'),
            about: { '@id': `${absoluteUrl('/')}#organisation` },
          },
          breadcrumbSchema([{ name: 'Contact', path: '/contact' }]),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Tell us what you need, and we will send the right person"
        copy="Two short steps. Pick what you came for, then fill in the details that matter for it. A person in the nearest office reads every message and replies within one working day."
        image="features/glass-towers-sky"
        facts={[
          { value: '1 day', label: 'Reply time' },
          { value: '5', label: 'Offices' },
          { value: '9 languages', label: 'Spoken in the team' },
        ]}
      />

      <section className="section page-section contact-section" id="form">
        <div className="section-head">
          <div className="reveal">
            <Pill>Get in touch</Pill>
          </div>
          <Heading className="section-title" text="Start with what brings you here" />
        </div>

        <ContactFlow />
      </section>

      <section className="section page-section" id="offices">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Offices</Pill>
            </div>
            <Heading className="section-title" text="Or call the office nearest you" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Monday to Saturday, 8:00 to 19:00 local time. Outside those hours, the form above is
              the quickest way to reach us.
            </p>
          </div>
        </div>

        <div className="contact-offices reveal-group">
          {officeList.map((office) => (
            <article key={office.city} className="contact-office">
              <h3>{office.city}</h3>
              <span>Since {office.since}</span>
              <p>
                <MapPin size={15} strokeWidth={2} aria-hidden="true" />
                {office.address}
              </p>
              <a href={`tel:${office.phone.replace(/\s/g, '')}`}>
                <Phone size={15} strokeWidth={2} aria-hidden="true" />
                {office.phone}
              </a>
            </article>
          ))}
        </div>

        <p className="contact-mail reveal">
          <Mail size={15} strokeWidth={2} aria-hidden="true" />
          General enquiries: <a href="mailto:hello@kondoru.com">hello@kondoru.com</a>
        </p>
      </section>

      <section className="section page-section" id="newsletter">
        <div className="newsletter-panel">
          <div className="newsletter-intro">
            <div className="reveal">
              <Pill tone="dark">Newsletter</Pill>
            </div>
            <Heading className="section-title" text="Hear about homes before the portals do" />
            <p>
              Four short letters; pick the ones you want. No filler, no sharing your address with
              anyone, and one click to leave.
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </section>

      <section className="section page-section contact-privacy" id="privacy">
        <h2>How we use what you send</h2>
        <p>
          We use your details only to answer this message and, if you ask, to arrange viewings or
          meetings. They are kept for 24 months after our last contact and are never sold or shared
          for marketing. You can ask us to see, correct or delete them at any time by writing to
          privacy@kondoru.com.
        </p>
      </section>
    </main>
  )
}
