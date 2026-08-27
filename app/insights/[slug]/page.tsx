import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { insights } from '@/lib/pages'
import { Button, Counter, Heading, Pill } from '@/components/ui-kit'
import { Photo } from '@/components/photo'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const insight = insights.find((item) => item.slug === slug)
  if (!insight) return { title: 'Not found' }

  return pageMetadata({
    title: `${insight.value}${insight.suffix} — ${insight.title.toLowerCase()}`,
    description: insight.lead,
    path: `/insights/${insight.slug}`,
    image: photoCard(insight.image),
    type: 'article',
  })
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const insight = insights.find((item) => item.slug === slug)
  if (!insight) notFound()

  const others = insights.filter((item) => item.slug !== slug)

  return (
    <main id="main" className="site subpage">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: insight.title,
            description: insight.lead,
            articleBody: insight.body.join('\n\n'),
            url: absoluteUrl(`/insights/${insight.slug}`),
            author: { '@id': `${absoluteUrl('/')}#organisation` },
            publisher: { '@id': `${absoluteUrl('/')}#organisation` },
            image: photoCard(insight.image).url,
          },
          breadcrumbSchema([
            { name: 'Projects', path: '/projects' },
            { name: insight.title, path: `/insights/${insight.slug}` },
          ]),
        ]}
      />

      <section className="page-hero insight-hero">
        <div className="page-hero-media">
          <Photo name={insight.image} sizes="100vw" priority />
        </div>

        <div className="page-hero-inner">
          <Link className="insight-back" href="/#feature">
            <ArrowLeft size={15} strokeWidth={2.2} />
            Inside the work
          </Link>
          <span className="insight-figure">
            <Counter value={insight.value} suffix={insight.suffix} />
          </span>
          <Heading as="h1" className="page-hero-title" text={insight.title} />
          <p className="page-hero-copy">{insight.lead}</p>
        </div>
      </section>

      <section className="section page-section insight-body">
        <aside className="insight-facts">
          <div className="reveal">
            <Pill>The detail</Pill>
          </div>
          <dl>
            {insight.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="insight-prose reveal">
          {insight.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}

          <div className="insight-actions">
            <Button href="/#contact">Ask us about this</Button>
            <Link className="property-details" href="/projects">
              See it in the projects
            </Link>
          </div>
        </div>
      </section>

      <section className="section page-section">
        <div className="section-head">
          <div className="reveal">
            <Pill>Also measured</Pill>
          </div>
          <Heading className="section-title" text="The other two numbers we publish" />
        </div>

        <div className="group-grid insight-more reveal-group tilt">
          {others.map((other) => (
            <Link key={other.slug} className="group-card" href={`/insights/${other.slug}`}>
              <strong className="insight-more-figure">
                {other.value}
                {other.suffix}
              </strong>
              <h3>{other.title}</h3>
              <p>{other.card}</p>
              <span className="group-count">Read the detail</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
