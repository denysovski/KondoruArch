import type { Metadata, Viewport } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ScrollEffects } from '@/components/scroll-effects'
import { CookieConsent } from '@/components/cookie-consent'
import {
  jsonLd,
  LOCALE,
  OG_IMAGE,
  organisationSchema,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  websiteSchema,
} from '@/lib/seo'
import { absoluteUrl, withBase } from '@/lib/utils'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: {
    // "Properties • Kondoru", and the site name last so a truncated tab
    // still shows what the page is about.
    default: SITE_TITLE,
    template: `%s • ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: absoluteUrl('/') }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'real estate',
  keywords: [
    'property',
    'architecture studio',
    'homes for sale',
    'apartments to rent',
    'buyer representation',
    'London property',
    'Lisbon property',
    'Oslo property',
    'Copenhagen property',
    'Porto property',
    'sustainable architecture',
    'passive house',
  ],
  alternates: { canonical: absoluteUrl('/') },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: LOCALE,
    url: absoluteUrl('/'),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: withBase('/icon.svg'), type: 'image/svg+xml' },
      { url: withBase('/icon-light-32x32.png'), sizes: '32x32', type: 'image/png' },
    ],
    apple: withBase('/apple-icon.png'),
  },
  manifest: withBase('/manifest.webmanifest'),
  formatDetection: { telephone: false, address: false },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning: the inline script below adds a `js` class to
  // <html> before React hydrates, which would otherwise be reported as a
  // server/client attribute mismatch.
  return (
    <html
      lang="en-GB"
      className={`${montserrat.variable} ${openSans.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document as script-enabled before first paint, so scroll
            reveals only hide content when JS can actually reveal it again. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {/* Who the company is and what the site is, in the form crawlers
            parse rather than guess at. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([organisationSchema, websiteSchema])}
        />
      </head>
      <body className="antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
        <CookieConsent />
        <ScrollEffects />
      </body>
    </html>
  )
}
