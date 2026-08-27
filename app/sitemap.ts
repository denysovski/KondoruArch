import type { MetadataRoute } from 'next'
import { listings } from '@/lib/listings'
import { insights, journalArticles } from '@/lib/pages'
import { photoSrc } from '@/lib/photos'
import { absoluteUrl, SITE_URL } from '@/lib/utils'

// Written once at build time: there is no server behind a static export.
export const dynamic = 'force-static'

/** Absolute URL for a rendition, which is what an image sitemap wants. */
const image = (name: Parameters<typeof photoSrc>[0]) => `${SITE_URL}${photoSrc(name)}`

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
      { url: absoluteUrl('/properties'), changeFrequency: 'daily', priority: 0.9 },
      { url: absoluteUrl('/search'), changeFrequency: 'daily', priority: 0.6 },
      { url: absoluteUrl('/services'), changeFrequency: 'monthly', priority: 0.8 },
      { url: absoluteUrl('/projects'), changeFrequency: 'monthly', priority: 0.8 },
      { url: absoluteUrl('/studio'), changeFrequency: 'monthly', priority: 0.7 },
      { url: absoluteUrl('/journal'), changeFrequency: 'weekly', priority: 0.7 },
      { url: absoluteUrl('/journal/all'), changeFrequency: 'weekly', priority: 0.6 },
    ] satisfies MetadataRoute.Sitemap
  ).map((page) => ({ ...page, lastModified: now }))

  const residences: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: absoluteUrl(`/properties/${listing.id}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
    images: listing.images.map(image),
  }))

  const measured: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: absoluteUrl(`/insights/${insight.slug}`),
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.5,
    images: [image(insight.image)],
  }))

  // The journal archive is one page; the articles are anchors on it, so they
  // are not separate URLs. The lead article dates the page.
  const journalUpdated = new Date(journalArticles[0].date)

  return [
    ...pages.map((page) =>
      page.url === absoluteUrl('/journal') ? { ...page, lastModified: journalUpdated } : page,
    ),
    ...residences,
    ...measured,
  ]
}
