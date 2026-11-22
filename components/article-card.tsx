import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Article } from '@/lib/pages'
import { Photo } from '@/components/photo'

/** One journal article as a card that opens the article page. */
export function ArticleCard({
  article,
  sizes = '(max-width: 1080px) 92vw, 32vw',
}: {
  article: Article
  sizes?: string
}) {
  return (
    <article className="journal-card">
      <div className="journal-media">
        <Photo name={article.image} sizes={sizes} />
        <span className="journal-tag">{article.tag}</span>
      </div>
      <span className="journal-date">
        {article.date} · {article.read}
      </span>
      <h3>{article.title}</h3>
      <p className="journal-excerpt">{article.excerpt}</p>
      <Link className="service-link card-link" href={`/journal/${article.id}`}>
        <span>Read the article</span>
        <span className="sr-only">: {article.title}</span>
        <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
      </Link>
    </article>
  )
}
