'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Clock, Search, X } from 'lucide-react'
import { Heading, PageHero, Pill } from '@/components/ui-kit'
import { Photo } from '@/components/photo'
import type { Article } from '@/lib/pages'

/** Anchor ids the rest of the site links to, mapped to the tag they filter. */
const TAG_ANCHOR: Record<string, string> = {
  Market: 'market',
  Design: 'design',
  Guide: 'guide',
  'Studio news': 'studio-news',
}

export function AllArticles({ articles }: { articles: Article[] }) {
  const [tag, setTag] = useState('All')
  const [query, setQuery] = useState('')

  const tags = useMemo(() => ['All', ...Array.from(new Set(articles.map((a) => a.tag)))], [articles])

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: articles.length }
    articles.forEach((a) => {
      map[a.tag] = (map[a.tag] ?? 0) + 1
    })
    return map
  }, [articles])

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return articles.filter((a) => {
      if (tag !== 'All' && a.tag !== tag) return false
      if (!term) return true
      return `${a.title} ${a.excerpt} ${a.tag}`.toLowerCase().includes(term)
    })
  }, [articles, tag, query])

  return (
    <main id="main" className="site subpage">
      <PageHero
        eyebrow="Journal"
        title="Every article we have published"
        copy="Market notes, drawing-board details, buying guides and studio news. Written by the people doing the work, published whether or not the numbers flatter us."
        image="architecture/green-wall-tower"
        facts={[
          { value: String(articles.length), label: 'Articles online' },
          { value: 'Thu', label: 'Letter goes out' },
          { value: '0', label: 'Sponsored posts' },
        ]}
      />

      <section className="section page-section">
        <div className="section-head split-head">
          <div>
            <div className="reveal">
              <Pill>Archive</Pill>
            </div>
            <Heading className="section-title" text="Filter by what you came for" />
          </div>
          <div className="section-head-side reveal" data-delay="0.08">
            <p className="muted">
              No sponsored posts and no listicles about paint colours. A piece exists here because a
              client asked the question twice.
            </p>
          </div>
        </div>

        <div className="archive-tools reveal" data-delay="0.12">
          <div className="chips">
            {tags.map((item) => (
              <button
                key={item}
                id={TAG_ANCHOR[item]}
                className={`chip ${tag === item ? 'is-active' : ''}`}
                onClick={() => setTag(item)}
              >
                {item}
                <b>{counts[item] ?? 0}</b>
              </button>
            ))}
          </div>

          <label className="archive-search">
            <Search size={16} strokeWidth={2} />
            <input
              type="search"
              value={query}
              placeholder="Search articles"
              aria-label="Search articles"
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
                <X size={15} strokeWidth={2.2} />
              </button>
            )}
          </label>
        </div>

        {visible.length > 0 ? (
          <div key={`${tag}-${query}`} className="journal-grid archive-grid">
            {visible.map((post, i) => (
              <article
                key={post.id}
                id={post.id}
                className="journal-card archive-card"
                style={{ animationDelay: `${Math.min(i, 9) * 0.045}s` }}
              >
                <div className="journal-media">
                  <Photo name={post.image} sizes="(max-width: 1080px) 92vw, 32vw" />
                  <span className="journal-tag">{post.tag}</span>
                </div>
                <span className="journal-date">
                  {post.date}
                  <i>·</i>
                  <Clock size={13} strokeWidth={2} />
                  {post.read}
                </span>
                <h4>{post.title}</h4>
                <p className="journal-excerpt">{post.excerpt}</p>
                <Link className="service-link card-link" href={`/journal#${post.id}`}>
                  <span>Read article</span>
                  <ArrowUpRight size={15} strokeWidth={2} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="archive-empty">
            <h3>Nothing matches that yet</h3>
            <p>
              Try a broader term, or clear the filter to see all {articles.length} articles.
            </p>
            <button
              className="button button-outline"
              onClick={() => {
                setTag('All')
                setQuery('')
              }}
            >
              <span>Clear filters</span>
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
