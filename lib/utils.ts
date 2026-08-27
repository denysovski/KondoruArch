/**
 * GitHub Pages serves the site from /KondoruArch rather than the domain root.
 * Next rewrites `next/link` hrefs and its own asset URLs for us, but a raw
 * `src` string in JSX is passed through untouched — so anything that builds
 * one by hand goes through here.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function withBase(path: string) {
  return `${BASE_PATH}${path}`
}

/** Canonical origin, used for metadata, sitemap and structured data. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://denysovski.github.io').replace(
  /\/$/,
  '',
)

/**
 * Absolute URL for a route, for canonicals, sitemaps and JSON-LD.
 *
 * The build uses `trailingSlash: true`, so every route is really a directory.
 * Canonicals have to agree with that or every page advertises a URL the host
 * immediately redirects away from. Files keep their extension untouched.
 */
export function absoluteUrl(path = '/') {
  const isFile = /\.[a-z0-9]+$/i.test(path)
  const normalised = isFile || path.endsWith('/') ? path : `${path}/`
  return `${SITE_URL}${withBase(normalised)}`
}
