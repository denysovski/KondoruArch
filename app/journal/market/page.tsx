import type { Metadata } from 'next'
import { cityMarkets, marketQuarter } from '@/lib/articles'
import { journalArticles } from '@/lib/pages'
import { Button, Heading, PageHero, Pill } from '@/components/ui-kit'
import { ArticleCard } from '@/components/article-card'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: `Market report ${marketQuarter} — prices and pace in five cities`,
  description:
    'Price per square metre, change over the year, days to an accepted offer and net rental yield in London, Lisbon, Oslo, Copenhagen and Porto, from the homes we bought and sold this quarter.',
  path: '/journal/market',
  image: photoCard('architecture/twin-towers'),
})

export default function MarketPage() {
  const marketPieces = journalArticles.filter((article) => article.tag === 'Market').slice(0, 3)

  return (
    <main id="main" className="site subpage">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Journal', path: '/journal' },
            { name: 'Market reports', path: '/journal/market' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Market reports"
        title={`Five cities, one quarter, the numbers as they came in`}
        copy="Every quarter we publish what the homes we bought and sold actually did: price per square metre, the change over a year, how long it took to agree an offer and what is left of the rent after costs."
        image="architecture/twin-towers"
        facts={[
          { value: marketQuarter, label: 'Latest report' },
          { value: '5', label: 'Cities measured' },
          { value: '11', label: 'Days to offer, on average' },
        ]}
      />

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>{marketQuarter}</Pill>
            </div>
            <Heading className="section-title" text="The quarter in one table" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              Figures come from completed purchases and accepted offers on our own books, not asking
              prices. Yields are net of service charges, management and a month of voids a year.
            </p>
          </div>
        </div>

        <div className="market-table-wrap reveal">
          <table className="market-table">
            <caption className="sr-only">Market figures for {marketQuarter} by city</caption>
            <thead>
              <tr>
                <th scope="col">City</th>
                <th scope="col">Price per m²</th>
                <th scope="col">Change over a year</th>
                <th scope="col">Days to offer</th>
                <th scope="col">Net yield</th>
              </tr>
            </thead>
            <tbody>
              {cityMarkets.map((row) => (
                <tr key={row.city}>
                  <th scope="row">{row.city}</th>
                  <td data-label="Price per m²">{row.pricePerSqm}</td>
                  <td data-label="Change over a year">{row.change}</td>
                  <td data-label="Days to offer">{row.daysToOffer}</td>
                  <td data-label="Net yield">{row.netYield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section page-section">
        <div className="section-head">
          <div className="reveal">
            <Pill>What moved</Pill>
          </div>
          <Heading className="section-title" text="One line on each city" />
        </div>

        <div className="group-grid market-notes reveal-group">
          {cityMarkets.map((row) => (
            <article key={row.city} className="group-card">
              <h3>{row.city}</h3>
              <p>{row.note}</p>
              <span className="group-count">{row.change} over a year</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Further reading</Pill>
            </div>
            <Heading className="section-title" text="The market pieces behind the numbers" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <Button href="/contact#newsletter" variant="outline">
              Get the next report by email
            </Button>
          </div>
        </div>

        <div className="journal-grid reveal-group">
          {marketPieces.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </main>
  )
}
