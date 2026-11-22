'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Props = {
  label: string
  placeholder?: string
  options: string[]
  value: string
  onChange: (value: string) => void
  error?: string
  name: string
}

/**
 * A custom-designed single select that behaves like a native one:
 * a button opens a listbox; arrows, Home/End, type-ahead, Enter/Space and
 * Escape all work, and the active option is announced with aria-activedescendant.
 */
export function SelectField({
  label,
  placeholder = 'Choose one',
  options,
  value,
  onChange,
  error,
  name,
}: Props) {
  const id = useId()
  const buttonId = `${id}-button`
  const listId = `${id}-list`
  const errorId = `${id}-error`
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(value)))
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const typed = useRef({ text: '', at: 0 })

  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    listRef.current?.focus()
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)))
    setOpen(true)
  }

  const choose = (index: number) => {
    onChange(options[index])
    setOpen(false)
    buttonRef.current?.focus()
  }

  const typeAhead = (key: string) => {
    const now = Date.now()
    typed.current.text = now - typed.current.at > 600 ? key : typed.current.text + key
    typed.current.at = now
    const match = options.findIndex((option) =>
      option.toLowerCase().startsWith(typed.current.text.toLowerCase()),
    )
    if (match >= 0) setActive(match)
  }

  const onListKey = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActive((i) => Math.min(options.length - 1, i + 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActive((i) => Math.max(0, i - 1))
        break
      case 'Home':
        event.preventDefault()
        setActive(0)
        break
      case 'End':
        event.preventDefault()
        setActive(options.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        choose(active)
        break
      case 'Escape':
        event.preventDefault()
        setOpen(false)
        buttonRef.current?.focus()
        break
      case 'Tab':
        setOpen(false)
        break
      default:
        if (event.key.length === 1) typeAhead(event.key)
    }
  }

  return (
    <div
      ref={rootRef}
      className={`form-field select-field${open ? ' is-open' : ''}${error ? ' has-error' : ''}`}
    >
      <span className="form-label" id={`${id}-label`}>
        {label}
      </span>
      <div className="select-anchor">
        <button
          ref={buttonRef}
          id={buttonId}
          type="button"
          name={name}
          className={`select-trigger${value ? '' : ' is-empty'}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${id}-label ${buttonId}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          data-field={name}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={(event) => {
            if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
              event.preventDefault()
              openList()
            }
          }}
        >
          <span>{value || placeholder}</span>
          <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
        </button>

        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
          className="select-list"
          hidden={!open}
          onKeyDown={onListKey}
        >
          {options.map((option, index) => (
            <li
              key={option}
              id={`${id}-opt-${index}`}
              data-index={index}
              role="option"
              aria-selected={option === value}
              className={`select-option${index === active ? ' is-active' : ''}`}
              onPointerEnter={() => setActive(index)}
              onClick={() => choose(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <span className="form-error" id={errorId}>
          {error}
        </span>
      )}
    </div>
  )
}
