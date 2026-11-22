import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { journalArticles } from '@/lib/pages'
import { articleBodies } from '@/lib/articles'
import { Button, Heading, Pill } from '@/components/ui-kit'
import { Photo } from '@/components/photo'
import { ArticleCard } from '@/components/article-card'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = journalArticles.find((item) => item.id === slug)
  if (!article) return { title: 'Not found' }

  return pageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.excerpt,
    path: `/journal/${article.id}`,
    image: photoCard(article.image),
    type: 'article',
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = journalArticles.find((item) => item.id === slug)
  const body = articleBodies[slug]
  if (!article || !body) notFound()

  const sameTag = journalArticles.filter((item) => item.tag === article.tag && item.id !== slug)
  const related = [...sameTag, ...journalArticles.filter((item) => item.tag !== article.tag)]
    .filter((item) => item.id !== slug)
    .slice(0, 3)

  return (
    <main id="main" className="site subpage">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.excerpt,
            datePublished: new Date(article.date).toISOString().slice(0, 10),
            articleSection: article.tag,
            articleBody: [body.lead, ...body.sections.flatMap((s) => s.paragraphs)].join('\n\n'),
            url: absoluteUrl(`/journal/${article.id}`),
            image: photoCard(article.image).url,
            author: { '@id': `${absoluteUrl('/')}#organisation` },
            publisher: { '@id': `${absoluteUrl('/')}#organisation` },
          },
          breadcrumbSchema([
            { name: 'Journal', path: '/journal' },
            { name: 'Articles', path: '/journal/all' },
            { name: article.title, path: `/journal/${article.id}` },
          ]),
        ]}
      />

      <section className="page-hero insight-hero article-hero">
        <div className="page-hero-media">
          <Photo name={article.image} sizes="100vw" priority />
        </div>

        <div className="page-hero-inner">
          <Link className="insight-back" href="/journal/all">
            <ArrowLeft size={15} strokeWidth={2.2} />
            All articles
          </Link>
          <span className="article-meta">
            {article.tag} · {article.date} · {article.read}
          </span>
          <Heading as="h1" className="page-hero-title" text={article.title} />
          <p className="page-hero-copy">{body.lead}</p>
        </div>
      </section>

      <section className="section page-section insight-body">
        <aside className="insight-facts">
          <div className="reveal">
            <Pill>About this piece</Pill>
          </div>
          <dl>
            <div>
              <dt>Section</dt>
              <dd>{article.tag}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{article.date}</dd>
            </div>
            <div>
              <dt>Reading time</dt>
              <dd>{article.read}</dd>
            </div>
            <div>
              <dt>Written by</dt>
              <dd>The Kondoru studio</dd>
            </div>
          </dl>
        </aside>

        <article className="insight-prose article-prose reveal">
          {body.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </section>
          ))}

          {body.checklist && (
            <div className="article-checklist">
              <h3>{body.checklist.title}</h3>
              <ul>
                {body.checklist.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="insight-actions">
            <Button href="/contact">Ask us about this</Button>
            <Link className="property-details" href="/journal/all">
              More from the journal
            </Link>
          </div>
        </article>
      </section>

      <section className="section page-section">
        <div className="section-head">
          <div className="reveal">
            <Pill>Read next</Pill>
          </div>
          <Heading className="section-title" text="More from the journal" />
        </div>

        <div className="journal-grid reveal-group">
          {related.map((post) => (
            <ArticleCard key={post.id} article={post} />
          ))}
        </div>
      </section>
    </main>
  )
}
