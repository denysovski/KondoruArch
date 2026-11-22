'use client'

import { useId, useState } from 'react'
import { ArrowBubble } from '@/components/ui-kit'

const topics = [
  {
    id: 'market',
    title: 'Market reports',
    copy: 'Quarterly figures for five cities',
  },
  {
    id: 'listings',
    title: 'New listings',
    copy: 'Every Thursday, before the portals',
  },
  {
    id: 'guides',
    title: "Buyer's guides",
    copy: 'When a new one is published',
  },
  { id: 'studio', title: 'Studio news', copy: 'Completions, openings, people' },
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Newsletter sign-up: name, email, at least one topic and consent are all required. */
export function NewsletterSignup() {
  const uid = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [chosen, setChosen] = useState<string[]>([])
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const toggle = (id: string) => {
    setChosen((current) =>
      current.includes(id) ? current.filter((t) => t !== id) : [...current, id],
    )
    if (errors.topics) setErrors((c) => ({ ...c, topics: '' }))
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found: Record<string, string> = {}
    if (!name.trim()) found.name = 'Please add your first name.'
    if (!emailPattern.test(email.trim())) found.email = 'Please add a complete email address.'
    if (!chosen.length) found.topics = 'Pick at least one letter to receive.'
    if (!consent) found.consent = 'Please confirm you would like these emails.'
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      event.currentTarget.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus()
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="newsletter-done" role="status">
        <h3>You are on the list, {name.trim()}.</h3>
        <p>
          A confirmation is on its way to {email.trim()}. Open it to start receiving{' '}
          {chosen.length === 1 ? 'the letter' : `all ${chosen.length} letters`}; you can unsubscribe
          from any email in one click.
        </p>
      </div>
    )
  }

  return (
    <form className="newsletter-form" noValidate onSubmit={submit}>
      <fieldset className={`topic-picker${errors.topics ? ' has-error' : ''}`}>
        <legend className="form-label">What would you like to receive?</legend>
        <div className="topic-grid">
          {topics.map((topic, index) => (
            <label
              key={topic.id}
              className={`topic-option${chosen.includes(topic.id) ? ' is-selected' : ''}`}
            >
              <input
                type="checkbox"
                data-field={index === 0 ? 'topics' : undefined}
                checked={chosen.includes(topic.id)}
                onChange={() => toggle(topic.id)}
                aria-describedby={errors.topics ? `${uid}-topics-error` : undefined}
              />
              <strong>{topic.title}</strong>
              <span>{topic.copy}</span>
            </label>
          ))}
        </div>
        {errors.topics && (
          <span className="form-error" id={`${uid}-topics-error`}>
            {errors.topics}
          </span>
        )}
      </fieldset>

      <div className="newsletter-fields">
        <div className={`form-field${errors.name ? ' has-error' : ''}`}>
          <label className="form-label" htmlFor={`${uid}-name`}>
            First name
          </label>
          <input
            id={`${uid}-name`}
            data-field="name"
            autoComplete="given-name"
            required
            value={name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors((c) => ({ ...c, name: '' }))
            }}
          />
          {errors.name && (
            <span className="form-error" id={`${uid}-name-error`}>
              {errors.name}
            </span>
          )}
        </div>
        <div className={`form-field${errors.email ? ' has-error' : ''}`}>
          <label className="form-label" htmlFor={`${uid}-email`}>
            Email
          </label>
          <input
            id={`${uid}-email`}
            data-field="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((c) => ({ ...c, email: '' }))
            }}
          />
          {errors.email && (
            <span className="form-error" id={`${uid}-email-error`}>
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className={`form-field form-check${errors.consent ? ' has-error' : ''}`}>
        <label>
          <input
            type="checkbox"
            data-field="consent"
            required
            checked={consent}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            onChange={(e) => {
              setConsent(e.target.checked)
              if (errors.consent) setErrors((c) => ({ ...c, consent: '' }))
            }}
          />
          <span>Send me the letters I picked. I can unsubscribe at any time.</span>
        </label>
        {errors.consent && (
          <span className="form-error" id={`${uid}-consent-error`}>
            {errors.consent}
          </span>
        )}
      </div>

      <div className="contact-submit">
        <button type="submit" className="button button-light">
          <span>Subscribe</span>
          <ArrowBubble />
        </button>
      </div>
    </form>
  )
}
