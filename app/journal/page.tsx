import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { journalArticles } from '@/lib/pages'
import { Button, Heading, PageHero, Pill } from '@/components/ui-kit'
import { Photo } from '@/components/photo'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'
import { photoSrc } from '@/lib/photos'
import { absoluteUrl, SITE_URL } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: 'Journal — market notes and design detail',
  description:
    'Market movements, facade details and practical buying guides, written by the people doing the work and published whether or not the numbers flatter us.',
  path: '/journal',
  image: photoCard('architecture/green-wall-tower'),
})

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'The Kondoru journal',
  url: absoluteUrl('/journal'),
  blogPost: journalArticles.slice(0, 8).map((article) => ({
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: new Date(article.date).toISOString().slice(0, 10),
    url: absoluteUrl(`/journal/${article.id}`),
    image: `${SITE_URL}${photoSrc(article.image, 1200)}`,
    author: { '@type': 'Organization', name: 'Kondoru' },
  })),
}

const sections = [
  {
    id: 'market',
    name: 'Market',
    tag: 'Market',
    href: '/journal/market',
    copy: 'Prices, rates and the rules that move them',
  },
  {
    id: 'design',
    name: 'Design',
    tag: 'Design',
    href: '/journal/all#design',
    copy: 'Details we keep reusing, and why',
  },
  {
    id: 'guide',
    name: 'Guides',
    tag: 'Guide',
    href: '/journal/guides',
    copy: 'The practical ones we send clients anyway',
  },
  {
    id: 'studio-news',
    name: 'Studio news',
    tag: 'Studio news',
    href: '/journal/all#studio-news',
    copy: 'Completions, arrivals and open days',
  },
]

export default function JournalPage() {
  const [lead, ...rest] = journalArticles

  return (
    <main id="main" className="site subpage">
      <JsonLd data={[blogSchema, breadcrumbSchema([{ name: 'Journal', path: '/journal' }])]} />

      <PageHero
        eyebrow="Journal"
        title="Notes from the market and the drawing board"
        copy="Written by the people doing the work, published whether or not the numbers flatter us. One long piece a fortnight, plus the short guides we would otherwise email you one at a time."
        image="architecture/green-wall-tower"
        facts={[
          { value: '120+', label: 'Pieces published' },
          { value: 'Thu', label: 'Letter goes out' },
          { value: '0', label: 'Sponsored posts' },
        ]}
      />

      <section className="section page-section">
        <article className="journal-lead reveal">
          <div className="journal-lead-media">
            <Photo name={lead.image} sizes="(max-width: 1080px) 92vw, 52vw" />
            <span className="journal-tag">{lead.tag}</span>
          </div>
          <div className="journal-lead-body">
            <span className="journal-date">
              {lead.date}
              <i>·</i>
              <Clock size={13} strokeWidth={2} />
              {lead.read}
            </span>
            <Heading className="journal-lead-title" text={lead.title} />
            <p>{lead.excerpt}</p>
            <Link className="service-link" href={`/journal/${lead.id}`}>
              <span>Read the article</span>
              <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          </div>
        </article>
      </section>

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Sections</Pill>
            </div>
            <Heading className="section-title" text="Four things we write about" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <p className="muted">
              No sponsored posts, no listicles about paint colours. If a piece exists it is because
              a client asked the question twice.
            </p>
          </div>
        </div>

        <div className="group-grid reveal-group tilt">
          {sections.map((section) => (
            <Link key={section.id} id={section.id} className="group-card" href={section.href}>
              <h3>{section.name}</h3>
              <p>{section.copy}</p>
              <span className="group-count">
                {journalArticles.filter((a) => a.tag === section.tag).length} pieces
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Archive</Pill>
            </div>
            <Heading className="section-title" text="Everything else worth reading" />
          </div>
          <div className="section-head-side reveal" data-delay="0.1">
            <Button href="/journal/all" variant="outline">
              All articles
            </Button>
          </div>
        </div>

        <div className="journal-grid reveal-group tilt">
          {rest.slice(0, 6).map((post) => (
            <ArticleCard key={post.id} article={post} />
          ))}
        </div>

        <div className="section-cta reveal">
          <Button href="/journal/all">Browse all {journalArticles.length} articles</Button>
        </div>
      </section>
    </main>
  )
}
