import type { Metadata } from 'next'
import { journalArticles } from '@/lib/pages'
import { Button, Heading, PageHero, Pill } from '@/components/ui-kit'
import { ArticleCard } from '@/components/article-card'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: "Buyer's guides — buying abroad, off-plan and renovating",
  description:
    'The practical guides we send clients: buying from abroad, buying off-plan safely, the survey findings that end a purchase, and what to check before renovating a period flat.',
  path: '/journal/guides',
  image: photoCard('architecture/white-block'),
})

const before = [
  {
    title: 'Before you view',
    items: [
      'Write down the three things the home must have, and the one you would trade',
      'Get a mortgage agreement in principle, or proof of funds',
      'Decide how far from work, school or family is still fine',
    ],
  },
  {
    title: 'Before you offer',
    items: [
      'Commission the survey first, so the price already includes the repairs',
      'Read three years of service charge accounts and building minutes',
      'Check permissions for any work the seller has done',
    ],
  },
  {
    title: 'Before you sign',
    items: [
      'Fix the exchange rate if you are buying in another currency',
      'Make sure deposits sit in escrow or behind a guarantee',
      'Book the handover walk-through for the day you collect keys',
    ],
  },
]

export default function GuidesPage() {
  const guides = journalArticles.filter((article) => article.tag === 'Guide')

  return (
    <main id="main" className="site subpage">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Journal', path: '/journal' },
            { name: "Buyer's guides", path: '/journal/guides' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Buyer's guides"
        title="The guides we would otherwise email you one at a time"
        copy="Short, practical and written from the buyer's side of the table. Read them before you view, before you offer and before you sign."
        image="architecture/white-block"
        facts={[
          { value: String(guides.length), label: 'Guides so far' },
          { value: '4–9 min', label: 'Each one to read' },
          { value: '3', label: 'Stages they cover' },
        ]}
      />

      <section className="section page-section">
        <div className="section-head">
          <div className="reveal">
            <Pill>Start here</Pill>
          </div>
          <Heading className="section-title" text="Three short lists for three moments" />
        </div>

        <div className="guide-lists reveal-group">
          {before.map((list) => (
            <article key={list.title} className="guide-list">
              <h3>{list.title}</h3>
              <ul>
                {list.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>The guides</Pill>
            </div>
            <Heading className="section-title" text="Every guide, newest first" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <Button href="/contact" variant="outline">
              Ask a question we have not answered
            </Button>
          </div>
        </div>

        <div className="journal-grid reveal-group">
          {guides.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </main>
  )
}
