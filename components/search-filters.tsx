'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import {
  cityOptions,
  dealOptions,
  districtsByCity,
  districtOptions,
  priceOptions,
  roomOptions,
  type SearchQuery,
} from '@/lib/listings'

type Field = { id: keyof SearchQuery; label: string; options: { id: string; label: string }[] }

export function buildFields(city?: string): Field[] {
  return [
    { id: 'deal', label: 'Buy or rent', options: dealOptions },
    {
      id: 'city',
      label: 'City',
      options: cityOptions.map((c) => ({ id: c, label: c })),
    },
    {
      id: 'district',
      label: 'District',
      options: (city ? districtsByCity[city] ?? districtOptions : districtOptions).map((d) => ({
        id: d,
        label: d,
      })),
    },
    { id: 'rooms', label: 'Rooms', options: roomOptions.map((r) => ({ id: r.id, label: r.label })) },
    { id: 'price', label: 'Price', options: priceOptions.map((p) => ({ id: p.id, label: p.label })) },
  ]
}

function Field({
  field,
  value,
  open,
  onToggle,
  onSelect,
  menuUp,
}: {
  field: Field
  value?: string
  open: boolean
  onToggle: () => void
  onSelect: (value: string | undefined) => void
  menuUp?: boolean
}) {
  const current = field.options.find((option) => option.id === value)

  return (
    <div className={`select ${open ? 'is-open' : ''} ${value ? 'has-value' : ''}`}>
      <button type="button" className="select-trigger" onClick={onToggle} aria-expanded={open}>
        <span>{current?.label ?? field.label}</span>
        <ChevronDown size={16} strokeWidth={2} />
      </button>
      <div className={`select-menu ${menuUp ? 'is-up' : ''}`} role="listbox" aria-label={field.label}>
        <button type="button" role="option" aria-selected={!value} onClick={() => onSelect(undefined)}>
          Any {field.label.toLowerCase()}
        </button>
        {field.options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="option"
            aria-selected={option.id === value}
            className={option.id === value ? 'is-selected' : ''}
            onClick={() => onSelect(option.id)}
          >
            {option.label}
            {option.id === value && <Check size={15} strokeWidth={2.4} />}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * The hero search bar and the search page share this control. Nothing is
 * required: whatever is left blank simply does not narrow the results.
 */
export function SearchFilters({
  initial = {},
  variant = 'hero',
}: {
  initial?: SearchQuery
  variant?: 'hero' | 'page'
}) {
  const router = useRouter()
  const [query, setQuery] = useState<SearchQuery>(initial)
  const [open, setOpen] = useState<string | null>(null)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial.city, initial.district, initial.rooms, initial.price, initial.deal])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(null)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const fields = buildFields(query.city)

  const update = (id: keyof SearchQuery, value: string | undefined) => {
    setQuery((current) => {
      const next: SearchQuery = { ...current, [id]: value }
      if (id === 'city') delete next.district
      if (!value) delete next[id]
      return next
    })
    setOpen(null)
  }

  const submit = () => {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    const search = params.toString()
    router.push(search ? `/search?${search}` : '/search')
  }

  const active = Object.values(query).filter(Boolean).length

  return (
    <div ref={box} className={`search-bar search-bar-${variant}`}>
      <div className="search-fields">
        {fields.map((field) => (
          <Field
            key={field.id}
            field={field}
            value={query[field.id]}
            open={open === field.id}
            menuUp={variant === 'hero'}
            onToggle={() => setOpen((current) => (current === field.id ? null : field.id))}
            onSelect={(value) => update(field.id, value)}
          />
        ))}
      </div>

      {/* Always rendered so the bar never changes width, but inert until
          there is something to clear. Clearing only empties the bar — it
          never navigates. On the search page itself the results are driven by
          the URL, so the query string is emptied in place (same route, no
          history entry) to keep the bar and the results in step. */}
      <button
        type="button"
        className="search-clear"
        disabled={active === 0}
        tabIndex={active === 0 ? -1 : undefined}
        aria-hidden={active === 0}
        onClick={() => {
          setQuery({})
          if (variant === 'page') router.replace('/search', { scroll: false })
        }}
        aria-label="Clear all filters"
      >
        <X size={16} strokeWidth={2.2} />
      </button>

      <button className="search-submit" type="button" onClick={submit}>
        <Search size={17} strokeWidth={2.2} />
        Search now
      </button>
    </div>
  )
}
