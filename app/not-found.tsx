import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, SearchX } from 'lucide-react'
import { Button } from '@/components/ui-kit'
import { Photo } from '@/components/photo'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page is not here. The listings, the studio and the journal all still are.',
  robots: { index: false, follow: true },
}

const elsewhere = [
  { label: 'Every home on the books', href: '/properties' },
  { label: 'What we actually do', href: '/services' },
  { label: 'Projects from the studio', href: '/projects' },
  { label: 'The journal', href: '/journal/all' },
]

export default function NotFound() {
  return (
    <main id="main" className="site subpage">
      <section className="page-hero">
        <div className="page-hero-media">
          <Photo name="architecture/round-courtyard" sizes="100vw" priority />
        </div>

        <div className="page-hero-inner">
          <span className="page-hero-eyebrow">404</span>
          <h1 className="heading page-hero-title">This page is not one of ours</h1>
          <p className="page-hero-copy">
            The link may be old, or a listing may have completed and come off the list. Everything
            still on the books is one click away.
          </p>
        </div>
      </section>

      <section className="section page-section">
        <div className="search-empty">
          <i>
            <SearchX size={26} strokeWidth={1.8} />
          </i>
          <h2>Try one of these instead</h2>
          <ul className="notfound-links">
            {elsewhere.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {item.label}
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="search-empty-actions">
            <Button href="/">Back to the home page</Button>
            <Link className="property-details" href="/search">
              Search every residence
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
