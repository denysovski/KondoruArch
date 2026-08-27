'use client'

import { useEffect, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Runs before paint on the client, but is inert during SSR. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** Reveal transition duration in ms, kept in step with globals.css. */
const REVEAL_MS = 900
const STAGGER = 0.07

/**
 * Shared scroll behaviour for every page: reveal-on-scroll via
 * IntersectionObserver (never dependent on an animation frame arriving), a
 * scroll-velocity tilt for card grids, and parallax on hero/band media.
 */
export function ScrollEffects() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const targets = document.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-group, .heading, .fade-in',
    )
    const timers: number[] = []

    // Overlays that sit on top of a revealing card (property thumbnails, for
    // one) only make sense once the card has finished moving, so groups get a
    // `data-settled` flag when the last child's transition is done.
    const settle = (el: HTMLElement, children: number) => {
      const wait = REVEAL_MS + Math.max(children - 1, 0) * STAGGER * 1000 + 60
      timers.push(window.setTimeout(() => el.setAttribute('data-settled', 'true'), wait))
    }

    const reveal = (el: HTMLElement) => {
      let children = 0

      if (el.classList.contains('reveal-group')) {
        children = el.children.length
        Array.from(el.children).forEach((child, i) => {
          ;(child as HTMLElement).style.transitionDelay = `${i * STAGGER}s`
        })
      }

      if (el.dataset.delay) {
        el.style.transitionDelay = `${el.dataset.delay}s`
      }

      // A data attribute survives React re-rendering the element's
      // className; a class does not.
      el.setAttribute('data-in', 'true')
      if (el.classList.contains('reveal-group')) settle(el, children)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          reveal(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    targets.forEach((target) => observer.observe(target))

    window.requestAnimationFrame(() => {
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top < window.innerHeight) reveal(target)
      })
    })

    return () => {
      observer.disconnect()
      timers.forEach(window.clearTimeout)
    }
  }, [pathname])

  // Parallax has to be written before the first paint after hydration.
  // Otherwise the browser paints the hero at its CSS resting position, then
  // the first frame of this effect snaps it to the scroll-adjusted one, which
  // reads as a twitch on reload (where the scroll position is restored).
  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const heroMedia = document.querySelector<HTMLElement>('.hero-media')
    const parallax = Array.from(document.querySelectorAll<HTMLElement>('.parallax-media'))
    let frame = 0
    let lastY = window.scrollY
    let tilt = 0

    const update = () => {
      frame = 0

      const velocity = window.scrollY - lastY
      lastY = window.scrollY
      const target = Math.max(-3.2, Math.min(3.2, velocity * 0.09))
      tilt += (target - tilt) * 0.12
      if (Math.abs(tilt) < 0.01) tilt = 0
      document.documentElement.style.setProperty('--scroll-tilt', `${tilt.toFixed(3)}deg`)
      if (tilt !== 0 && !frame) frame = window.requestAnimationFrame(update)

      if (heroMedia) {
        const shift = Math.min(window.scrollY, window.innerHeight) * 0.14
        heroMedia.style.transform = `translate3d(0, ${shift}px, 0) scale(1.06)`
      }

      parallax.forEach((media) => {
        const rect = media.getBoundingClientRect()
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
        media.style.transform = `translate3d(0, ${(-progress * 7).toFixed(2)}%, 0)`
      })
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  return null
}
