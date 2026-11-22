'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Photo } from '@/components/photo'
import type { PhotoName } from '@/lib/photos'

export function Pill({
  children,
  tone = 'light',
}: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
}) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

export function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="word-mask">
          <span className="word" style={{ transitionDelay: `${i * 0.035}s` }}>
            {word}
          </span>
        </span>
      ))}
    </>
  )
}

export function Heading({
  text,
  className = '',
  as: Tag = 'h2',
}: {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <Tag className={`heading ${className}`}>
      <Words text={text} />
    </Tag>
  )
}

/** Right-pointing arrow inside a bubble that inverts the button colours. */
export function ArrowBubble({ size = 15 }: { size?: number }) {
  return (
    <i className="arrow-bubble">
      <ArrowRight size={size} strokeWidth={2.2} />
    </i>
  )
}

export function Button({
  children,
  href = '/contact',
  variant = 'dark',
  arrow = true,
}: {
  children: React.ReactNode
  href?: string
  variant?: 'dark' | 'blue' | 'light' | 'outline'
  arrow?: boolean
}) {
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowBubble />}
    </>
  )
  // Internal routes go through Link so the GitHub Pages base path is added.
  return href.startsWith('/') ? (
    <Link className={`button button-${variant}`} href={href}>
      {inner}
    </Link>
  ) : (
    <a className={`button button-${variant}`} href={href}>
      {inner}
    </a>
  )
}

/**
 * A number that rolls into place like an odometer: each digit is a column
 * of 0–9 that spins through one or two full cycles and lands on its value,
 * the columns settling one after another from the left. The final number is
 * in the server HTML (search engines, screen readers, no JavaScript); the
 * columns only appear once the script runs, and not at all under reduced
 * motion.
 */
export function Counter({ value, suffix }: { value: number; suffix: string }) {
  const text = `${value.toLocaleString('en-US')}${suffix}`
  const ref = useRef<HTMLSpanElement>(null)
  const [phase, setPhase] = useState<'static' | 'ready' | 'run'>('static')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return
    setPhase('ready')
  }, [])

  useEffect(() => {
    if (phase !== 'ready') return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        // Two frames so the columns are painted at zero before they move.
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase('run')))
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [phase])

  if (phase === 'static') {
    return (
      <span ref={ref} className="counter">
        {text}
      </span>
    )
  }

  const chars = [...text]
  const digitCount = chars.filter((ch) => /\d/.test(ch)).length
  let seen = 0

  return (
    <span ref={ref} className={`counter odometer ${phase === 'run' ? 'is-run' : ''}`} aria-label={text} role="img">
      {chars.map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} className="odo-sym" aria-hidden="true">
              {ch}
            </span>
          )
        }
        const order = seen++
        // The right-hand digits travel further, so the number seems to
        // count up while the left settles first.
        const cycles = order >= digitCount - 2 ? 2 : 1
        const stops = cycles * 10 + Number(ch)
        return (
          <span
            key={i}
            className="odo-col"
            aria-hidden="true"
            style={
              {
                '--odo-stop': stops,
                '--odo-delay': `${order * 90}ms`,
              } as React.CSSProperties
            }
          >
            <span className="odo-strip">
              {Array.from({ length: stops + 1 }, (_, n) => (
                <span key={n}>{n % 10}</span>
              ))}
            </span>
            <span className="odo-sizer">{ch}</span>
          </span>
        )
      })}
    </span>
  )
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  facts,
}: {
  eyebrow: string
  title: string
  copy: string
  image: PhotoName
  facts?: { value: string; label: string }[]
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-media">
        <Photo name={image} sizes="100vw" priority />
      </div>

      <div className="page-hero-inner">
        <span className="page-hero-eyebrow">{eyebrow}</span>
        <Heading as="h1" className="page-hero-title" text={title} />
        <p className="page-hero-copy">{copy}</p>

        {facts && (
          <div className="page-hero-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
