'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, Clock, Mail, MapPin, Phone } from 'lucide-react'

const bigLinks = [
  { label: 'Properties', href: '/properties' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Studio', href: '/studio' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/#contact' },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <span className="footer-mark">Kondoru</span>
        <p>
          Property purchase, development and architecture across London, Lisbon, Oslo, Copenhagen and
          Porto. Independent since 2008, and still answering our own phones.
        </p>
      </div>

      <div className="footer-news">
        <div>
          <h3>The Thursday letter</h3>
          <p>New listings, quiet price drops and one drawing worth looking at. No filler.</p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (email.trim()) setSubscribed(true)
          }}
        >
          <label>
            <Mail size={16} strokeWidth={2} />
            <input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <button type="submit">
            {subscribed ? 'Subscribed' : 'Subscribe'}
            <i className="arrow-bubble">
              {subscribed ? (
                <Check size={15} strokeWidth={2.4} />
              ) : (
                <ArrowRight size={15} strokeWidth={2.2} />
              )}
            </i>
          </button>
        </form>
      </div>

      <nav className="footer-big" aria-label="Footer sections">
        {bigLinks.map((item) => (
          <Link key={item.label} href={item.href}>
            <span>{item.label}</span>
            <ArrowUpRight size={22} strokeWidth={1.8} />
          </Link>
        ))}
      </nav>

      <div className="footer-cols">
        <div className="footer-col">
          <h5>Company</h5>
          <Link href="/studio">About us</Link>
          <Link href="/studio#people">Our people</Link>
          <Link href="/studio#awards">Awards</Link>
          <Link href="/journal">Journal</Link>
        </div>

        <div className="footer-col">
          <h5>Services</h5>
          <Link href="/services#buying">Buying</Link>
          <Link href="/services#developing">Developing</Link>
          <Link href="/services#designing">Designing</Link>
          <Link href="/services#advising">Advising</Link>
        </div>

        <div className="footer-col">
          <h5>Cities</h5>
          <Link href="/properties">London</Link>
          <Link href="/properties">Lisbon</Link>
          <Link href="/properties">Oslo</Link>
          <Link href="/properties">Copenhagen</Link>
          <Link href="/properties">Porto</Link>
        </div>

        <div className="footer-col footer-contact">
          <h5>Talk to us</h5>
          <a href="mailto:hello@kondoru.com">
            <Mail size={15} strokeWidth={2} />
            hello@kondoru.com
          </a>
          <a href="tel:+442000000000">
            <Phone size={15} strokeWidth={2} />
            +44 20 0000 0000
          </a>
          <span>
            <MapPin size={15} strokeWidth={2} />
            12 Harbour Walk, London E1
          </span>
          <span>
            <Clock size={15} strokeWidth={2} />
            Mon — Sat, 08:00 — 19:00
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Kondoru — Buying property, made safe.</span>
        <div className="footer-legal">
          <Link href="/studio">Privacy</Link>
          <Link href="/studio">Terms</Link>
          <Link href="/studio">Cookies</Link>
          <Link href="/studio">Complaints</Link>
        </div>
      </div>
    </footer>
  )
}
