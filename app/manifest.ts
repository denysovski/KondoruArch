import type { MetadataRoute } from 'next'

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '@/lib/seo'
import { withBase } from '@/lib/utils'

// Written once at build time: there is no server behind a static export.
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: withBase('/'),
    scope: withBase('/'),
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#14508c',
    lang: 'en-GB',
    categories: ['business', 'lifestyle'],
    icons: [
      { src: withBase('/icon.svg'), sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: withBase('/icon-light-32x32.png'), sizes: '32x32', type: 'image/png' },
      { src: withBase('/apple-icon.png'), sizes: '180x180', type: 'image/png' },
    ],
  }
}
