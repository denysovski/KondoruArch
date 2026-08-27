import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/utils'

// Written once at build time: there is no server behind a static export.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The flat preview exists so the design can be screenshotted; it is a
        // duplicate of the home page and has nothing to add to an index.
        disallow: ['/preview/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
