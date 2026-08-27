import type { Metadata } from 'next'
import { journalArticles } from '@/lib/pages'
import { AllArticles } from './all-articles'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, pageMetadata, photoCard } from '@/lib/seo'
import { photoSrc } from '@/lib/photos'
import { absoluteUrl, SITE_URL } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: 'Every article in the journal',
  description: `All ${journalArticles.length} pieces we have published: market notes, facade details, buying guides and studio news, filterable by section.`,
  path: '/journal/all',
  image: photoCard('architecture/green-wall-tower'),
})

const archiveSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'The Kondoru journal — full archive',
  url: absoluteUrl('/journal/all'),
  blogPost: journalArticles.map((article) => ({
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: new Date(article.date).toISOString().slice(0, 10),
    url: `${absoluteUrl('/journal/all')}#${article.id}`,
    image: `${SITE_URL}${photoSrc(article.image, 1200)}`,
    articleSection: article.tag,
    author: { '@type': 'Organization', name: 'Kondoru' },
  })),
}

export default function AllArticlesPage() {
  return (
    <>
      <JsonLd
        data={[
          archiveSchema,
          breadcrumbSchema([
            { name: 'Journal', path: '/journal' },
            { name: 'All articles', path: '/journal/all' },
          ]),
        ]}
      />
      <AllArticles articles={journalArticles} />
    </>
  )
}
