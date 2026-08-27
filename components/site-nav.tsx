'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, CalendarDays, ChevronDown, Menu, Phone, X } from 'lucide-react'
import { navItems } from '@/lib/content'
import { megaMenu } from '@/lib/pages'
import { Photo } from '@/components/photo'

export function SiteNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openPanel, setOpenPanel] = useState<string | null>(null)
  const [lastPanel, setLastPanel] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [compact, setCompact] = useState(false)
  const [panelHeight, setPanelHeight] = useState<number | undefined>(undefined)
  const closeTimer = useRef<number | undefined>(undefined)
  const megaInner = useRef<HTMLDivElement>(null)

  const closeAll = useCallback(() => {
    setMenuOpen(false)
    setOpenPanel(null)
  }, [])

  // Route changes should always leave the menus closed.
  useEffect(() => {
    closeAll()
  }, [pathname, closeAll])

  // Compact on scroll down, full again on the way up.
  useEffect(() => {
    let last = window.scrollY
    let ticking = false

    const evaluate = () => {
      ticking = false
      const y = window.scrollY
      const delta = y - last
      last = y

      setScrolled(y > 24)

      if (y < 140) {
        setCompact(false)
        return
      }
      if (delta > 6) {
        setCompact(true)
        setOpenPanel(null)
        setMenuOpen(false)
      } else if (delta < -6) {
        setCompact(false)
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(evaluate)
    }

    evaluate()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAll()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeAll])

  // A short close delay keeps the panel open while the pointer crosses the gap
  // between the link and the panel itself.
  const openWith = (label: string) => {
    window.clearTimeout(closeTimer.current)
    setOpenPanel(label)
  }

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenPanel(null), 260)
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  // Remember the panel that was open so it can fade out with its content.
  useEffect(() => {
    if (openPanel) setLastPanel(openPanel)
  }, [openPanel])

  const panelKey = openPanel ?? lastPanel
  const panel = panelKey ? megaMenu[panelKey] : null

  // Swapping between Properties, Services and so on changes the panel's
  // natural height, which snapped the white background. Measuring the new
  // content before paint lets the height animate instead of jumping, and the
  // panel itself never closes while the pointer stays in the header.
  useLayoutEffect(() => {
    if (!megaInner.current) return
    setPanelHeight(megaInner.current.offsetHeight)
  }, [panelKey])

  useEffect(() => {
    const onResize = () => {
      if (megaInner.current) setPanelHeight(megaInner.current.offsetHeight)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} ${compact ? 'is-compact' : ''} ${
        openPanel ? 'has-panel' : ''
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="header-inner">
        <Link className="wordmark" href="/" onClick={closeAll}>
          Kondoru
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`header-nav-item ${openPanel === item.label ? 'is-open' : ''} ${
                pathname.startsWith(item.href) ? 'is-current' : ''
              }`}
              aria-expanded={openPanel === item.label}
              onMouseEnter={() => openWith(item.label)}
              onFocus={() => openWith(item.label)}
              onClick={() => setOpenPanel((current) => (current === item.label ? null : item.label))}
            >
              {item.label}
              <ChevronDown size={13} strokeWidth={2.4} />
            </button>
          ))}
        </nav>

        <div className="header-side">
          <a className="header-phone" href="tel:+442079460138">
            <Phone size={15} strokeWidth={2} />
            +44 20 7946 0138
          </a>
          <a className="header-cta" href="/#contact">
            <CalendarDays size={15} strokeWidth={2} />
            Book a viewing
          </a>
          <a className="mobile-book" href="/#contact" aria-label="Book a viewing">
            <CalendarDays size={18} strokeWidth={2} />
          </a>
          <button
            className="burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      <div
        className={`mega ${openPanel ? 'is-open' : ''}`}
        style={panelHeight ? { height: panelHeight } : undefined}
        onMouseEnter={() => openPanel && openWith(openPanel)}
        onMouseLeave={scheduleClose}
      >
        {panel && (
          <div className="mega-inner" ref={megaInner}>
            <div className="mega-intro">
              <h3>{panel.title}</h3>
              <p>{panel.copy}</p>
              <Link className="mega-cta" href={panel.cta.href} onClick={closeAll}>
                <span>{panel.cta.label}</span>
                <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </div>

            <div className="mega-links">
              {panel.links.map((link) => (
                <Link key={link.label} href={link.href} onClick={closeAll}>
                  <strong>{link.label}</strong>
                  <span>{link.copy}</span>
                  <ArrowUpRight size={15} strokeWidth={2} />
                </Link>
              ))}
            </div>

            <div className="mega-features">
              {panel.features.map((feature) => (
                <Link key={feature.title} href={feature.href} onClick={closeAll}>
                  <Photo name={feature.image} alt="" sizes="260px" />
                  <div>
                    <strong>{feature.title}</strong>
                    <span>{feature.meta}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        {navItems.map((item) => {
          const section = megaMenu[item.label]
          const open = mobileSection === item.label
          return (
            <div key={item.label} className={`mobile-group ${open ? 'is-open' : ''}`}>
              <div className="mobile-group-head">
                <Link href={item.href} onClick={closeAll}>
                  {item.label}
                </Link>
                <button
                  aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`}
                  aria-expanded={open}
                  onClick={() => setMobileSection((current) => (current === item.label ? null : item.label))}
                >
                  <ChevronDown size={17} strokeWidth={2.2} />
                </button>
              </div>
              <div className="mobile-group-body">
                <div>
                  {section.links.map((link) => (
                    <Link key={link.label} href={link.href} onClick={closeAll}>
                      {link.label}
                      <span>{link.copy}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}

        <a className="mobile-cta" href="/#contact" onClick={closeAll}>
          <CalendarDays size={16} strokeWidth={2} />
          Book a viewing
        </a>
      </div>
    </header>
  )
}
