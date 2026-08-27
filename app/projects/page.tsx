import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { gallery } from '@/lib/content'
import { projectDetail } from '@/lib/pages'
import { Button, Heading, PageHero, Pill } from '@/components/ui-kit'
import { Photo } from '@/components/photo'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'
import { photoSrc } from '@/lib/photos'
import { SITE_URL } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: 'Architecture projects',
  description:
    'Residential, cultural, workplace, hospitality and research buildings from the Kondoru studio — each one measured for a full year after handover.',
  path: '/projects',
  image: photoCard('architecture/green-campus'),
})

const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Kondoru projects',
  hasPart: projectDetail.map((project) => ({
    '@type': 'CreativeWork',
    name: project.name,
    about: project.category,
    locationCreated: project.place,
    dateCreated: project.year,
    description: project.copy,
    image: `${SITE_URL}${photoSrc(project.image, 1200)}`,
  })),
}

const categories = [
  { id: 'residential', name: 'Residential', copy: 'Houses and apartment blocks' },
  { id: 'cultural', name: 'Cultural', copy: 'Pavilions and civic halls' },
  { id: 'workplace', name: 'Workplace', copy: 'Studios and headquarters' },
  { id: 'research', name: 'Research', copy: 'Facade lab and prototypes' },
]

export default function ProjectsPage() {
  return (
    <main id="main" className="site subpage">
      <JsonLd data={[projectsSchema, breadcrumbSchema([{ name: 'Projects', path: '/projects' }])]} />

      <PageHero
        eyebrow="Projects"
        title="Buildings that behave well long after the photographs"
        copy="Every completed project is measured for a full year: energy use, comfort, acoustics and how people actually move through the ground floor. The numbers go into the next design whether they flatter us or not."
        image="architecture/green-campus"
        facts={[
          { value: '42%', label: 'Less embodied carbon' },
          { value: '4 hours', label: 'Minimum winter daylight' },
          { value: '25 years', label: 'Fabric warranty' },
        ]}
      />

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Sectors</Pill>
            </div>
            <Heading className="section-title" text="Where the work sits" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Four sectors, one office. The research work has no client and no fee, and it is where
              most of the details in the other three come from.
            </p>
          </div>
        </div>

        <div className="group-grid reveal-group tilt">
          {categories.map((category) => (
            <article key={category.id} id={category.id} className="group-card">
              <h3>{category.name}</h3>
              <p>{category.copy}</p>
              <span className="group-count">
                {projectDetail.filter((p) => p.category === category.name).length} projects
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section page-section">
        <div className="project-list reveal-group">
          {projectDetail.map((project) => (
            <article key={project.id} id={project.id} className="project-row">
              <div className="project-media">
                <Photo name={project.image} sizes="(max-width: 1080px) 92vw, 46vw" />
                <span className="project-year">{project.year}</span>
              </div>

              <div className="project-body">
                <span className="project-category">{project.category}</span>
                <h3>{project.name}</h3>
                <span className="project-place">
                  <MapPin size={14} strokeWidth={2} />
                  {project.place}
                </span>
                <p>{project.copy}</p>

                <dl className="project-facts">
                  <div>
                    <dt>Scope</dt>
                    <dd>{project.size}</dd>
                  </div>
                  {project.facts.map((fact) => (
                    <div key={fact}>
                      <dt>Detail</dt>
                      <dd>{fact}</dd>
                    </div>
                  ))}
                </dl>

                <Link className="service-link" href="/#contact">
                  <span>Ask about this project</span>
                  <ArrowUpRight size={15} strokeWidth={2} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section page-section partnership">
        <div className="reveal">
          <Pill>From the studio</Pill>
        </div>
        <Heading
          className="partnership-title"
          text="Studies, materials and interiors from work in progress"
        />

        <div className="gallery reveal-group tilt">
          {gallery.map((item) => (
            <figure key={item.caption} className="gallery-item">
              <Photo name={item.image} sizes="(max-width: 1080px) 92vw, 32vw" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-panel">
          <div className="cta-main">
            <div className="reveal">
              <Pill tone="dark">
                <b />
                Commissions open
              </Pill>
            </div>
            <Heading className="cta-title" text="Let's build something that outlasts us" />
            <p className="cta-copy reveal" data-delay="0.1">
              Send us the site, the constraints and the date. We will tell you honestly what it can
              carry, and what it will cost to do properly.
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
