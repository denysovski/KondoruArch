import type { Metadata } from 'next'
import { milestones } from '@/lib/articles'
import { Button, Heading, PageHero, Pill } from '@/components/ui-kit'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Our history — from one desk to five offices',
  description:
    'How Kondoru grew from a single buying desk in London in 2008 into a studio of twenty-two people in five cities, and the rules that came with it.',
  path: '/journal/history',
  image: photoCard('architecture/layered-block'),
})

export default function HistoryPage() {
  return (
    <main id="main" className="site subpage">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Journal', path: '/journal' },
            { name: 'Our history', path: '/journal/history' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Our history"
        title="From one desk on Harbour Walk to five offices"
        copy="Eighteen years, told through the decisions that still shape how we work: survey before the offer, draw what we buy, and measure every building for a year after we hand it over."
        image="architecture/layered-block"
        facts={[
          { value: '2008', label: 'First client' },
          { value: '5', label: 'Offices' },
          { value: '22', label: 'People' },
        ]}
      />

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Timeline</Pill>
            </div>
            <Heading className="section-title" text="Eight years that changed how we work" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Not every year had a milestone. These are the ones that added a rule, a city or a
              discipline, in the order they happened.
            </p>
          </div>
        </div>

        <ol className="history-list reveal-group">
          {milestones.map((milestone) => (
            <li key={milestone.year} className="history-item">
              <span className="history-year">{milestone.year}</span>
              <div>
                <h3>{milestone.title}</h3>
                <p>{milestone.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="section-cta reveal">
          <Button href="/studio">Meet the studio today</Button>
        </div>
      </section>
    </main>
  )
}
