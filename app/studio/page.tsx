import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { amenities, processSteps, team } from '@/lib/content'
import { awards, officeList, studioValues } from '@/lib/pages'
import { Button, Heading, PageHero, Pill } from '@/components/ui-kit'
import { SocialBubbles } from '@/components/social-bubbles'
import { Photo } from '@/components/photo'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'The studio, and the people in it',
  description:
    'Eighteen years, four partners and five offices. How Kondoru works, who you actually deal with, and the four standards every building has to earn.',
  path: '/studio',
  image: photoCard('architecture/twin-towers'),
})

const studioSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'The Kondoru studio',
  mainEntity: {
    '@type': 'Organization',
    name: 'Kondoru',
    foundingDate: '2008',
    employee: team.map((person) => ({
      '@type': 'Person',
      name: person.name,
      jobTitle: person.role,
      email: person.email,
      telephone: person.phone,
      knowsLanguage: person.languages.split('·').map((language) => language.trim()),
    })),
    location: officeList.map((office) => ({
      '@type': 'Place',
      name: `Kondoru ${office.city}`,
      address: { '@type': 'PostalAddress', streetAddress: office.address, addressLocality: office.city },
      telephone: office.phone,
    })),
    award: awards.map((award) => `${award.name} — ${award.project} (${award.year})`),
  },
}

export default function StudioPage() {
  return (
    <main id="main" className="site subpage">
      <JsonLd data={[studioSchema, breadcrumbSchema([{ name: 'Studio', path: '/studio' }])]} />

      <PageHero
        eyebrow="Studio"
        title="Independent since 2008, and still answering our own phones"
        copy="One office in London became five, and the drawing board never left the business. Four partners, twenty-two people, and a rule that whoever sells you the work is in the room when it is delivered."
        image="architecture/twin-towers"
        facts={[
          { value: '18', label: 'Years in practice' },
          { value: '5', label: 'Offices' },
          { value: '22', label: 'People' },
        ]}
      />

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>What we believe</Pill>
            </div>
            <Heading className="section-title" text="Three rules we have not broken yet" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Every studio has values on a wall. These three are the ones clients can actually hold us
              to, because each has something measurable behind it.
            </p>
          </div>
        </div>

        <div className="value-grid reveal-group tilt">
          {studioValues.map((value) => (
            <article key={value.title} className="value-card">
              <h3>{value.title}</h3>
              <p>{value.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="people" className="section page-section">
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

      <section id="standards" className="section page-section sticky-section">
        <div className="sticky-visual">
          <div className="sticky-media">
            <Photo name="architecture/terrace-columns" sizes="(max-width: 1080px) 92vw, 46vw" />
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

      <section id="process" className="section page-section process">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>How we work</Pill>
            </div>
            <Heading className="section-title" text="Four movements from first sketch to handover" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Each stage ends with a decision you sign off, a fixed price for the next one, and a
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

      <section id="awards" className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Recognition</Pill>
            </div>
            <Heading className="section-title" text="Twelve awards, and one we lost fairly" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Useful mainly because the juries visit the buildings in use rather than looking at
              renders. Our 2023 civic entry lost to a better scheme, which we still think about.
            </p>
          </div>
        </div>

        <div className="award-table reveal-group">
          {awards.map((award) => (
            <div key={`${award.year}-${award.name}`} className="award-row">
              <span className="award-year">{award.year}</span>
              <strong>{award.name}</strong>
              <span className="award-project">{award.project}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section page-section">
        <div className="section-head">
          <div className="reveal">
            <Pill>Offices</Pill>
          </div>
          <Heading className="section-title" text="Five cities, one way of working" />
        </div>

        <div className="office-grid reveal-group tilt">
          {officeList.map((office) => (
            <article key={office.city} className="office-card">
              <h3>{office.city}</h3>
              <span className="office-since">Open since {office.since}</span>
              <p>
                <MapPin size={14} strokeWidth={2} />
                {office.address}
              </p>
              <a href={`tel:${office.phone.replace(/\s/g, '')}`}>
                <Phone size={14} strokeWidth={2} />
                {office.phone}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-panel">
          <div className="cta-main">
            <div className="reveal">
              <Pill tone="dark">
                <b />
                Come and see us
              </Pill>
            </div>
            <Heading className="cta-title" text="The kettle is on in all five offices" />
            <p className="cta-copy reveal" data-delay="0.1">
              Drop in, or start with a call. Either way you will speak to one of the four partners
              before anything is signed.
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
