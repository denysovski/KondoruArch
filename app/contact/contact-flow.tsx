'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { SelectField } from '@/components/select-field'
import { ArrowBubble } from '@/components/ui-kit'

/* ------------------------------------------------------------------ *
 * What people come to us for. Each need adds its own fields.
 * ------------------------------------------------------------------ */

type Extra =
  | { kind: 'select'; name: string; label: string; options: string[] }
  | {
      kind: 'text'
      name: string
      label: string
      placeholder: string
      autoComplete?: string
    }

type Need = {
  id: string
  title: string
  copy: string
  subjects: string[]
  extras: Extra[]
  messageHint: string
}

const cities = ['London', 'Lisbon', 'Oslo', 'Copenhagen', 'Porto', 'Not sure yet']

export const needs: Need[] = [
  {
    id: 'buy',
    title: 'Buy a home',
    copy: 'A shortlist, viewings and someone on your side at the notary.',
    subjects: [
      'Book a viewing',
      'Start a property search',
      'Ask about a listing',
      'Buying from abroad',
    ],
    extras: [
      {
        kind: 'select',
        name: 'budget',
        label: 'Budget',
        options: ['Up to €500,000', '€500,000 – €1 million', '€1 – 2 million', 'Above €2 million'],
      },
      {
        kind: 'select',
        name: 'timeline',
        label: 'When you would like keys',
        options: ['Within 3 months', '3 to 6 months', '6 to 12 months', 'More than a year'],
      },
    ],
    messageHint: 'Bedrooms, neighbourhoods you like, anything you will not compromise on.',
  },
  {
    id: 'sell',
    title: 'Sell or let',
    copy: 'A valuation grounded in what actually sold, not what is listed.',
    subjects: ['Request a valuation', 'Sell a property', 'Let a property', 'Manage a rental'],
    extras: [
      {
        kind: 'text',
        name: 'address',
        label: 'Property address',
        placeholder: 'Street, number and postcode',
        autoComplete: 'street-address',
      },
      {
        kind: 'select',
        name: 'propertyType',
        label: 'Type of property',
        options: ['Apartment', 'House', 'Townhouse', 'Whole building', 'Commercial unit'],
      },
    ],
    messageHint: 'Size, condition, and when you would like it to be sold or let.',
  },
  {
    id: 'build',
    title: 'Design or build',
    copy: 'From a single renovation to a new courtyard block.',
    subjects: ['Renovate a home', 'Design a new building', 'Feasibility study', 'Planning advice'],
    extras: [
      {
        kind: 'text',
        name: 'site',
        label: 'Site location',
        placeholder: 'Address or area',
      },
      {
        kind: 'select',
        name: 'stage',
        label: 'Where the project is',
        options: [
          'Just an idea',
          'Site found',
          'Site owned',
          'Planning submitted',
          'Ready to build',
        ],
      },
    ],
    messageHint: 'What you want to build, roughly how big, and any deadline we should know.',
  },
  {
    id: 'invest',
    title: 'Investment advice',
    copy: 'Net yields, risks and the buildings we would avoid.',
    subjects: ['Buy to let', 'Portfolio review', 'Off-plan purchase', 'Development partnership'],
    extras: [
      {
        kind: 'select',
        name: 'amount',
        label: 'Amount to invest',
        options: ['Up to €1 million', '€1 – 5 million', '€5 – 20 million', 'Above €20 million'],
      },
      {
        kind: 'select',
        name: 'horizon',
        label: 'How long you plan to hold',
        options: ['Under 3 years', '3 to 7 years', '7 to 15 years', 'Longer'],
      },
    ],
    messageHint: 'What you hold today and what you would like the next purchase to do.',
  },
  {
    id: 'press',
    title: 'Press or partnership',
    copy: 'Interviews, data requests, speaking and collaborations.',
    subjects: ['Interview request', 'Data or figures', 'Speaking invitation', 'Partnership'],
    extras: [
      {
        kind: 'text',
        name: 'organisation',
        label: 'Organisation',
        placeholder: 'Publication, company or event',
        autoComplete: 'organization',
      },
      {
        kind: 'select',
        name: 'deadline',
        label: 'Your deadline',
        options: ['Today', 'This week', 'This month', 'No fixed deadline'],
      },
    ],
    messageHint: 'What you are working on and what you need from us.',
  },
  {
    id: 'other',
    title: 'Something else',
    copy: 'Careers, existing clients, or a question that fits nowhere.',
    subjects: ['Careers', 'I am an existing client', 'Feedback', 'General question'],
    extras: [],
    messageHint: 'Tell us as much as you like; it reaches a person, not a queue.',
  },
]

type Values = Record<string, string>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^[+()\d\s-]{7,}$/

function validate(need: Need, values: Values, consent: boolean) {
  const errors: Record<string, string> = {}
  if (!values.name?.trim()) errors.name = 'Please tell us your name.'
  if (!values.email?.trim()) errors.email = 'We need an email address to reply.'
  else if (!emailPattern.test(values.email.trim()))
    errors.email = 'That email address does not look complete.'
  if (!values.phone?.trim()) errors.phone = 'Please add a phone number.'
  else if (!phonePattern.test(values.phone.trim()))
    errors.phone = 'Use digits, spaces and an optional +.'
  if (!values.city) errors.city = 'Choose the city, or “Not sure yet”.'
  if (!values.subject) errors.subject = 'Choose the subject that fits best.'
  for (const extra of need.extras) {
    if (!values[extra.name]?.trim())
      errors[extra.name] = `Please fill in ${extra.label.toLowerCase()}.`
  }
  if (!values.message?.trim()) errors.message = 'A sentence or two helps us send the right person.'
  else if (values.message.trim().length < 20)
    errors.message = 'A little more detail, please (20 characters or more).'
  if (!consent) errors.consent = 'We can only reply if you agree to this.'
  return errors
}

export function ContactFlow() {
  const [needId, setNeedId] = useState<string | null>(null)
  const [values, setValues] = useState<Values>({})
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const uid = useId()

  const need = needs.find((item) => item.id === needId) ?? null

  const choose = (id: string) => {
    if (id === needId) return
    setNeedId(id)
    setErrors({})
    // keep name, email, phone and city; reset everything need-specific
    setValues((current) => ({
      name: current.name ?? '',
      email: current.email ?? '',
      phone: current.phone ?? '',
      city: current.city ?? '',
      message: current.message ?? '',
    }))
  }

  useEffect(() => {
    if (!needId || !panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    if (rect.top > window.innerHeight * 0.7) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      panelRef.current.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      })
    }
  }, [needId])

  const set = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!need) return
    const found = validate(need, values, consent)
    const failed = Object.keys(found).filter((key) => found[key])
    setErrors(found)
    if (failed.length) {
      const first = formRef.current?.querySelector<HTMLElement>(`[data-field="${failed[0]}"]`)
      first?.focus()
      return
    }
    setSent(true)
  }

  const err = (name: string) => errors[name] || undefined

  if (sent && need) {
    return (
      <div className="contact-done" role="status">
        <span className="contact-step">Sent</span>
        <h2>Thank you, {values.name.trim().split(' ')[0]}.</h2>
        <p>
          Your message about <strong>{values.subject.toLowerCase()}</strong> in {values.city} is
          with the team. Someone from the right office will reply to {values.email.trim()} within
          one working day, usually sooner.
        </p>
        <button
          type="button"
          className="button button-outline"
          onClick={() => {
            setSent(false)
            setNeedId(null)
            setValues({})
            setConsent(false)
          }}
        >
          <span>Send another message</span>
        </button>
      </div>
    )
  }

  return (
    <div className="contact-flow">
      <fieldset className="need-picker">
        <legend>
          <span className="contact-step">Step 1 of 2</span>
          <span className="need-picker-title">What can we help you with?</span>
        </legend>
        <div className="need-grid" role="radiogroup" aria-label="What can we help you with?">
          {needs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={item.id === needId}
              className={`need-card${item.id === needId ? ' is-selected' : ''}`}
              onClick={() => choose(item.id)}
              onKeyDown={(event) => {
                const index = needs.findIndex((n) => n.id === item.id)
                const next =
                  event.key === 'ArrowRight' || event.key === 'ArrowDown'
                    ? (index + 1) % needs.length
                    : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                      ? (index - 1 + needs.length) % needs.length
                      : -1
                if (next >= 0) {
                  event.preventDefault()
                  choose(needs[next].id)
                  const buttons =
                    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                      '.need-card',
                    )
                  buttons?.[next]?.focus()
                }
              }}
              tabIndex={needId ? (item.id === needId ? 0 : -1) : item.id === needs[0].id ? 0 : -1}
            >
              <strong>{item.title}</strong>
              <span>{item.copy}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div ref={panelRef} className={`contact-panel${need ? ' is-open' : ''}`} aria-live="polite">
        {need && (
          <form key={need.id} ref={formRef} className="contact-form" noValidate onSubmit={submit}>
            <div className="contact-form-head">
              <span className="contact-step">Step 2 of 2</span>
              <h2>{need.title}: a few details</h2>
              <p>Every field is needed so the right person can answer properly the first time.</p>
            </div>

            <div className="form-grid">
              <TextField
                id={`${uid}-name`}
                name="name"
                label="Full name"
                autoComplete="name"
                value={values.name}
                error={err('name')}
                onChange={set}
              />
              <TextField
                id={`${uid}-email`}
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                value={values.email}
                error={err('email')}
                onChange={set}
              />
              <TextField
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                label="Phone"
                autoComplete="tel"
                placeholder="+44 20 7946 0138"
                value={values.phone}
                error={err('phone')}
                onChange={set}
              />
              <SelectField
                name="city"
                label="City"
                options={cities}
                value={values.city ?? ''}
                error={err('city')}
                onChange={(v) => set('city', v)}
              />
              <SelectField
                name="subject"
                label="Subject"
                options={need.subjects}
                value={values.subject ?? ''}
                error={err('subject')}
                onChange={(v) => set('subject', v)}
              />

              {need.extras.map((extra) =>
                extra.kind === 'select' ? (
                  <SelectField
                    key={extra.name}
                    name={extra.name}
                    label={extra.label}
                    options={extra.options}
                    value={values[extra.name] ?? ''}
                    error={err(extra.name)}
                    onChange={(v) => set(extra.name, v)}
                  />
                ) : (
                  <TextField
                    key={extra.name}
                    id={`${uid}-${extra.name}`}
                    name={extra.name}
                    label={extra.label}
                    placeholder={extra.placeholder}
                    autoComplete={extra.autoComplete}
                    value={values[extra.name]}
                    error={err(extra.name)}
                    onChange={set}
                  />
                ),
              )}

              <div className={`form-field is-wide${err('message') ? ' has-error' : ''}`}>
                <label className="form-label" htmlFor={`${uid}-message`}>
                  Message
                </label>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  data-field="message"
                  rows={5}
                  required
                  placeholder={need.messageHint}
                  value={values.message ?? ''}
                  aria-invalid={err('message') ? true : undefined}
                  aria-describedby={err('message') ? `${uid}-message-error` : undefined}
                  onChange={(event) => set('message', event.target.value)}
                />
                {err('message') && (
                  <span className="form-error" id={`${uid}-message-error`}>
                    {err('message')}
                  </span>
                )}
              </div>

              <div className={`form-field is-wide form-check${err('consent') ? ' has-error' : ''}`}>
                <label>
                  <input
                    type="checkbox"
                    data-field="consent"
                    required
                    checked={consent}
                    aria-invalid={err('consent') ? true : undefined}
                    aria-describedby={err('consent') ? `${uid}-consent-error` : undefined}
                    onChange={(event) => {
                      setConsent(event.target.checked)
                      if (errors.consent) setErrors((c) => ({ ...c, consent: '' }))
                    }}
                  />
                  <span>
                    I agree that Kondoru may use these details to reply to this message, as
                    described in the <a href="#privacy">privacy note</a> below.
                  </span>
                </label>
                {err('consent') && (
                  <span className="form-error" id={`${uid}-consent-error`}>
                    {err('consent')}
                  </span>
                )}
              </div>
            </div>

            <div className="contact-submit">
              <button type="submit" className="button button-dark">
                <span>Send message</span>
                <ArrowBubble />
              </button>
              <span>We reply within one working day.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function TextField({
  id,
  name,
  label,
  value,
  error,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
}: {
  id: string
  name: string
  label: string
  value?: string
  error?: string
  onChange: (name: string, value: string) => void
  type?: string
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <div className={`form-field${error ? ' has-error' : ''}`}>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        data-field={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value ?? ''}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {error && (
        <span className="form-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  )
}
