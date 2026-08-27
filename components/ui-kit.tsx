'use client'

import { useEffect, useRef } from 'react'
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
  href = '/#contact',
  variant = 'dark',
  arrow = true,
}: {
  children: React.ReactNode
  href?: string
  variant?: 'dark' | 'blue' | 'light' | 'outline'
  arrow?: boolean
}) {
  return (
    <a className={`button button-${variant}`} href={href}>
      <span>{children}</span>
      {arrow && <ArrowBubble />}
    </a>
  )
}

export function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const format = (n: number) => `${n.toLocaleString('en-US')}${suffix}`
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      node.textContent = format(value)
      return
    }

    let timer: number | undefined

    const run = () => {
      const duration = 1600
      const started = Date.now()
      timer = window.setInterval(() => {
        const progress = Math.min((Date.now() - started) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        node.textContent = format(Math.round(value * eased))
        if (progress === 1 && timer) window.clearInterval(timer)
      }, 32)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.disconnect()
          run()
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timer) window.clearInterval(timer)
    }
  }, [value, suffix])

  return <span ref={ref}>{`0${suffix}`}</span>
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
