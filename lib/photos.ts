import manifest from './image-manifest.json'
import { withBase } from './utils'

/* ------------------------------------------------------------------ *
 * The photo manifest, written by `npm run images:optimize`.
 *
 * Every photograph on the site is addressed by its catalogue key —
 * 'interiors/brick-loft-dining' — never by a file path, so the widths and
 * formats behind that key can change without touching a single page.
 * ------------------------------------------------------------------ */

export type PhotoName = keyof typeof manifest

export type PhotoEntry = {
  /** Intrinsic size of the master, so an <img> can reserve its box. */
  width: number
  height: number
  /** Rendition widths that exist on disk, smallest first. */
  widths: number[]
  /** Placeholder tint painted behind the image while it loads. */
  color: string
  /** Default alt text, written once in scripts/image-sources.mjs. */
  alt: string
}

export const photos = manifest as Record<string, PhotoEntry>

export function photoMeta(name: PhotoName): PhotoEntry {
  return photos[name]
}

/** The alt text on its own, for places that need a string not a tag. */
export function photoAlt(name: PhotoName) {
  return photos[name].alt
}

/** Site-relative URL for one rendition. Widest available unless asked. */
export function photoSrc(name: PhotoName, width?: number) {
  const entry = photos[name]
  // Without an explicit width, the fallback src is the 1200 rendition (or the
  // widest below it): browsers pick from srcset anyway, and crawlers, feeds
  // and the sitemap do not need a 2000px file.
  const fallback = [...entry.widths].reverse().find((w) => w <= 1200) ?? entry.widths[0]
  const pick = width && entry.widths.includes(width) ? width : fallback
  return withBase(`/img/${name}-${pick}.webp`)
}

export function photoSrcSet(name: PhotoName) {
  return photos[name].widths
    .map((width) => `${withBase(`/img/${name}-${width}.webp`)} ${width}w`)
    .join(', ')
}
