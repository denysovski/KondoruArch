/* ------------------------------------------------------------------ *
 * npm test — audits the static export in out/.
 *
 * Everything here is a check that would otherwise only fail in a
 * browser, in a crawler, or on the live host:
 *
 *   catalogue   every image the manifest promises exists on disk
 *   assets      every src, srcset and stylesheet a page asks for exists
 *   links       every internal href resolves to a route that was built
 *   images      every <img> carries alt text and reserves its own box
 *   metadata    title, description, canonical, Open Graph, lang
 *   schema      every JSON-LD block parses and names a type
 *   sitemap     lists exactly the routes that were generated
 *   leftovers   no remote image hosts, no paths from the old layout
 * ------------------------------------------------------------------ */

import fs from 'node:fs/promises'
import path from 'node:path'
import { existsSync } from 'node:fs'

const OUT = 'out'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const failures = []
const notes = []
let checks = 0

const check = (ok, message) => {
  checks++
  if (!ok) failures.push(message)
  return ok
}

if (!existsSync(OUT)) {
  console.error(`No ${OUT}/ directory — run \`npm run build\` first.`)
  process.exit(1)
}

/* ---------------------------------------------------------------- *
 * Walk the export
 * ---------------------------------------------------------------- */

const walk = async (dir, files = []) => {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, files)
    else files.push(full)
  }
  return files
}

const allFiles = await walk(OUT)
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'))

/** out/properties/index.html -> /properties/ */
const routeOf = (file) =>
  `/${path.relative(OUT, file).split(path.sep).join('/')}`
    .replace(/index\.html$/, '')
    .replace(/\.html$/, '/')

const routes = new Set(htmlFiles.map(routeOf))

/** A URL as written in the HTML -> a path on disk, or null if external. */
const toFile = (url) => {
  if (!url || /^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(url)) return null
  const clean = url.split('#')[0].split('?')[0]
  if (!clean.startsWith('/')) return null
  const relative = BASE_PATH && clean.startsWith(BASE_PATH) ? clean.slice(BASE_PATH.length) : clean
  return path.join(OUT, relative)
}

/* ---------------------------------------------------------------- *
 * 1. The photo catalogue matches what is on disk
 * ---------------------------------------------------------------- */

const manifest = JSON.parse(await fs.readFile('lib/image-manifest.json', 'utf8'))

for (const [name, entry] of Object.entries(manifest)) {
  check(Boolean(entry.alt && entry.alt.length > 12), `${name}: alt text missing or too short`)
  check(entry.width > 0 && entry.height > 0, `${name}: no intrinsic size recorded`)
  check(entry.widths.length > 0, `${name}: no renditions recorded`)

  for (const width of entry.widths) {
    check(
      existsSync(path.join(OUT, 'img', `${name}-${width}.webp`)),
      `${name}-${width}.webp promised by the manifest but missing from the export`,
    )
  }
}

notes.push(`${Object.keys(manifest).length} photographs in the catalogue`)

/* ---------------------------------------------------------------- *
 * 2. Every page
 * ---------------------------------------------------------------- */

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`, 'i'))
  return match ? match[1] : null
}

let imgCount = 0
let linkCount = 0

for (const file of htmlFiles) {
  const route = routeOf(file)
  const html = await fs.readFile(file, 'utf8')
  const where = (what) => `${route} — ${what}`

  // 404 is a real page but carries none of the marketing metadata.
  const isErrorPage = route === '/404/' || route === '/_not-found/'

  /* --- metadata ------------------------------------------------- */
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  check(Boolean(title && title.trim()), where('no <title>'))
  if (title && !isErrorPage) {
    check(title.length <= 70, where(`title is ${title.length} characters, over the 70 that show`))
    check(title.includes('Kondoru'), where('title does not carry the site name'))
  }

  if (!isErrorPage) {
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
    check(Boolean(description), where('no meta description'))
    if (description) {
      check(
        description.length >= 70 && description.length <= 320,
        where(`description is ${description.length} characters, outside 70–320`),
      )
    }

    check(
      /<link rel="canonical" href="[^"]+"/.test(html),
      where('no canonical link'),
    )
    check(/<meta property="og:title"/.test(html), where('no og:title'))
    check(/<meta property="og:image"/.test(html), where('no og:image'))
    check(/<meta name="twitter:card"/.test(html), where('no twitter card'))
  }

  check(/<html[^>]+lang="en-GB"/.test(html), where('no lang on <html>'))
  check(html.includes('id="main"'), where('no #main landmark for the skip link'))

  const h1s = html.match(/<h1[\s>]/g) ?? []
  if (!isErrorPage) check(h1s.length === 1, where(`${h1s.length} <h1> elements, expected exactly 1`))

  /* --- images --------------------------------------------------- */
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    imgCount++
    const src = attr(tag, 'src')
    const alt = attr(tag, 'alt')

    check(alt !== null, where(`<img src="${src}"> has no alt attribute`))
    check(attr(tag, 'width') !== null, where(`<img src="${src}"> has no width`))
    check(attr(tag, 'height') !== null, where(`<img src="${src}"> has no height`))
    check(attr(tag, 'srcset') !== null, where(`<img src="${src}"> has no srcset`))

    const file = toFile(src)
    if (file) check(existsSync(file), where(`missing image ${src}`))

    for (const candidate of (attr(tag, 'srcset') ?? '').split(',')) {
      const url = candidate.trim().split(/\s+/)[0]
      const target = toFile(url)
      if (target) check(existsSync(target), where(`missing srcset entry ${url}`))
    }
  }

  /* --- stylesheets and scripts ---------------------------------- */
  for (const tag of html.match(/<(link|script)\b[^>]*>/g) ?? []) {
    const url = attr(tag, 'href') ?? attr(tag, 'src')
    const target = toFile(url)
    if (target && !target.includes('sitemap') && !target.includes('manifest')) {
      check(existsSync(target), where(`missing asset ${url}`))
    }
  }

  /* --- internal links ------------------------------------------- */
  for (const tag of html.match(/<a\b[^>]*>/g) ?? []) {
    const href = attr(tag, 'href')
    if (!href || !href.startsWith('/')) continue
    linkCount++

    const clean = href.split('#')[0].split('?')[0]
    const relative = BASE_PATH && clean.startsWith(BASE_PATH) ? clean.slice(BASE_PATH.length) : clean
    const normalised = relative.endsWith('/') ? relative : `${relative}/`

    // A link either points at a built route or at a file in the export.
    const ok = routes.has(normalised) || existsSync(path.join(OUT, relative))
    check(ok, where(`link to ${href} does not resolve`))
  }

  /* --- structured data ------------------------------------------ */
  for (const block of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? []) {
    const body = block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '')
    try {
      const data = JSON.parse(body)
      const entries = Array.isArray(data) ? data : [data]
      for (const entry of entries) {
        check(Boolean(entry['@type']), where('a JSON-LD block has no @type'))
      }
    } catch (error) {
      check(false, where(`JSON-LD does not parse: ${error.message}`))
    }
  }

  /* --- leftovers from the old image handling -------------------- */
  check(!html.includes('images.unsplash.com'), where('still points at a remote image host'))
  check(!html.includes('/img/opt/'), where('still points at the old /img/opt path'))
}

notes.push(`${htmlFiles.length} pages, ${imgCount} images, ${linkCount} internal links`)

/* ---------------------------------------------------------------- *
 * 3. Sitemap and robots
 * ---------------------------------------------------------------- */

const sitemap = await fs.readFile(path.join(OUT, 'sitemap.xml'), 'utf8')

/** A sitemap <loc> reduced to the route it should map to in out/. */
const sitemapRoute = (url) => {
  const pathname = new URL(url).pathname
  const relative =
    BASE_PATH && pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length) || '/' : pathname
  return relative.endsWith('/') ? relative : `${relative}/`
}

const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const listedRoutes = new Set(listed.map(sitemapRoute))

check(listed.length > 0, 'sitemap.xml lists nothing')

for (const url of listed) {
  check(routes.has(sitemapRoute(url)), `sitemap lists ${url} but no page was generated for it`)
}

// Every indexable page should be in the sitemap. The flat preview and the
// error pages are deliberately left out.
const skip = new Set(['/404/', '/_not-found/', '/preview/index1/'])
for (const route of routes) {
  if (skip.has(route)) continue
  check(listedRoutes.has(route), `${route} was generated but is missing from the sitemap`)
}

const robots = await fs.readFile(path.join(OUT, 'robots.txt'), 'utf8')
check(robots.includes('Sitemap:'), 'robots.txt does not point at the sitemap')
check(robots.includes('Disallow: /preview/'), 'robots.txt does not keep the flat preview out')

check(existsSync(path.join(OUT, 'og.jpg')), 'the social card is missing from the export')
check(existsSync(path.join(OUT, 'manifest.webmanifest')), 'the web manifest is missing')

/* ---------------------------------------------------------------- *
 * 4. The flat preview really is flat
 * ---------------------------------------------------------------- */

const previewFile = path.join(OUT, 'preview', 'index1', 'index.html')
if (existsSync(previewFile)) {
  const preview = await fs.readFile(previewFile, 'utf8')
  check(preview.includes('static-page'), '/preview/index1 is not marked as a flat page')
  check(!preview.includes('class="reveal'), '/preview/index1 still uses reveal-on-scroll classes')
  check(
    preview.includes('name="robots" content="noindex'),
    '/preview/index1 is not marked noindex',
  )
} else {
  check(false, '/preview/index1 was not generated')
}

/* ---------------------------------------------------------------- *
 * Report
 * ---------------------------------------------------------------- */

for (const note of notes) console.log(`  ${note}`)
console.log()

if (failures.length) {
  console.error(`✗ ${failures.length} of ${checks} checks failed:\n`)
  for (const failure of failures.slice(0, 60)) console.error(`  ${failure}`)
  if (failures.length > 60) console.error(`  … and ${failures.length - 60} more`)
  process.exit(1)
}

console.log(`✓ all ${checks} checks passed`)
