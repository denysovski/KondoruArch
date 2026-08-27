'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Cookie, Shield, X } from 'lucide-react'

const STORAGE_KEY = 'kondoru-cookie-choice'

type Choice = 'all' | 'essential'

const categories = [
  {
    id: 'essential',
    name: 'Strictly necessary',
    copy: 'Keeps the site working: page routing, saved homes and form submissions. Always on.',
    locked: true,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    copy: 'Anonymous page and click counts so we know which listings people actually open.',
    locked: false,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    copy: 'Lets us show relevant listings on other sites. Off unless you turn it on.',
    locked: false,
  },
]

export function CookieConsent() {
  const [ready, setReady] = useState(false)
  const [choice, setChoice] = useState<Choice | null>(null)
  const [open, setOpen] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      stored = null
    }

    if (stored === 'all' || stored === 'essential') {
      setChoice(stored)
    } else {
      // No decision yet: open the dialog shortly after the page settles.
      const timer = window.setTimeout(() => setOpen(true), 1200)
      setReady(true)
      return () => window.clearTimeout(timer)
    }

    setReady(true)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && choice) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [choice])

  const save = (value: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* storage can be blocked; the choice still applies for this visit */
    }
    setChoice(value)
    setOpen(false)
  }

  if (!ready) return null

  return (
    <>
      <button
        className={`cookie-fab ${open ? 'is-hidden' : ''}`}
        aria-label="Cookie settings"
        onClick={() => setOpen(true)}
      >
        <Cookie size={19} strokeWidth={2} />
        <span>Cookies</span>
      </button>

      <div
        className={`cookie-backdrop ${open ? 'is-open' : ''}`}
        aria-hidden="true"
        onClick={() => choice && setOpen(false)}
      />

      <div
        ref={panelRef}
        className={`cookie-panel ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="Cookie preferences"
        aria-hidden={!open}
      >
        <div className="cookie-head">
          <span className="cookie-badge">
            <Shield size={16} strokeWidth={2} />
          </span>
          <div>
            <h2>We use cookies</h2>
            <p>
              Some are needed for the site to work properly. The rest only run if you say yes, and
              you can change your mind any time from this button.
            </p>
          </div>
          {choice && (
            <button className="cookie-close" aria-label="Close" onClick={() => setOpen(false)}>
              <X size={17} strokeWidth={2} />
            </button>
          )}
        </div>

        <div className="cookie-list">
          {categories.map((category) => {
            const checked =
              category.id === 'essential' ? true : category.id === 'analytics' ? analytics : marketing
            const toggle = () => {
              if (category.id === 'analytics') setAnalytics((v) => !v)
              if (category.id === 'marketing') setMarketing((v) => !v)
            }

            return (
              <label
                key={category.id}
                className={`cookie-row ${category.locked ? 'is-locked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={category.locked}
                  onChange={toggle}
                />
                <span className="cookie-switch" aria-hidden="true">
                  <i />
                </span>
                <span className="cookie-copy">
                  <strong>
                    {category.name}
                    {category.locked && <em>Always on</em>}
                  </strong>
                  <span>{category.copy}</span>
                </span>
              </label>
            )
          })}
        </div>

        <div className="cookie-actions">
          <button className="cookie-accept" onClick={() => save('all')}>
            Accept all
            <Check size={16} strokeWidth={2.4} />
          </button>
          <button className="cookie-selected" onClick={() => save(analytics || marketing ? 'all' : 'essential')}>
            Save my choice
          </button>
          <button className="cookie-reject" onClick={() => save('essential')}>
            Essential only
          </button>
        </div>

        {choice && (
          <p className="cookie-state">
            Saved: {choice === 'all' ? 'all cookies accepted' : 'essential cookies only'}.
          </p>
        )}
      </div>
    </>
  )
}
