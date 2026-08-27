/* ------------------------------------------------------------------ *
 * images:optimize — turn every master in assets/source into the WebP
 * ladder the site actually serves, and write the manifest the <Photo>
 * component reads.
 *
 * Each image ends up as public/img/<key>-<width>.webp. The manifest
 * carries the intrinsic size (so every <img> can reserve its box and
 * never shift the layout), the dominant colour (painted behind the
 * image while it loads) and the alt text from the catalogue.
 * ------------------------------------------------------------------ */

import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { images, sourceFile } from './image-sources.mjs'

const SOURCE_DIR = 'assets/source'
const OUT_DIR = 'public/img'
const MANIFEST = 'lib/image-manifest.json'
const WIDTHS = [400, 800, 1200, 1600, 2000]
const QUALITY = 74

const manifest = {}
let written = 0
let bytes = 0

// public/img is generated in full, so a renamed or dropped catalogue entry
// leaves nothing behind.
await fs.rm(OUT_DIR, { recursive: true, force: true })

for (const image of images) {
  const master = path.join(SOURCE_DIR, sourceFile(image))
  const pipeline = sharp(master).rotate()
  const meta = await pipeline.metadata()

  const dir = path.join(OUT_DIR, path.dirname(image.key))
  await fs.mkdir(dir, { recursive: true })

  // Never upscale, and never go wider than the widest slot the image is
  // actually shown in: a portrait in a 300px card gains nothing from 2000px.
  const cap = Math.min(image.max ?? 1600, meta.width)
  const widths = WIDTHS.filter((width) => width <= cap)
  if (widths.length === 0) widths.push(cap)

  for (const width of widths) {
    const file = path.join(OUT_DIR, `${image.key}-${width}.webp`)
    const info = await sharp(master)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(file)
    written++
    bytes += info.size
  }

  // The placeholder tint sits behind the image while it loads. The raw
  // dominant colour is often a saturated sky, which flashes on arrival, so it
  // is mixed well back towards the page background: a hint, not a block.
  const { dominant } = await sharp(master).stats()
  const mix = (channel, towards) => Math.round(channel * 0.45 + towards * 0.55)
  const hex = `#${[mix(dominant.r, 0xee), mix(dominant.g, 0xf2), mix(dominant.b, 0xf6)]
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`

  manifest[image.key] = {
    width: meta.width,
    height: meta.height,
    widths,
    color: hex,
    alt: image.alt,
  }

  console.log(`${image.key.padEnd(44)} ${meta.width}×${meta.height}  ${widths.join(' ')}`)
}

await fs.writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)

/* ------------------------------------------------------------------ *
 * The social card. One 1200×630 JPEG, because that is what every link
 * unfurler wants and none of them accept a srcset.
 * ------------------------------------------------------------------ */

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const overlay = Buffer.from(`<svg width="${OG_WIDTH}" height="${OG_HEIGHT}">
  <defs>
    <linearGradient id="shade" x1="0" y1="1" x2="0.35" y2="0">
      <stop offset="0%" stop-color="#06213f" stop-opacity="0.94"/>
      <stop offset="55%" stop-color="#06213f" stop-opacity="0.62"/>
      <stop offset="100%" stop-color="#06213f" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#shade)"/>
  <text x="72" y="404" font-family="Montserrat, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="106" font-weight="800" letter-spacing="-3" fill="#ffffff">Kondoru</text>
  <text x="76" y="466" font-family="Open Sans, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="600" letter-spacing="1" fill="#bcd4ea">Property and Architecture</text>
  <rect x="76" y="508" width="112" height="4" rx="2" fill="#7ba7d4"/>
  <text x="76" y="560" font-family="Open Sans, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="25" fill="#dde9f4">London · Lisbon · Oslo · Copenhagen · Porto</text>
</svg>`)

await sharp(path.join(SOURCE_DIR, 'hero-facade.jpg'))
  .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'attention' })
  .composite([{ input: overlay }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og.jpg')

console.log('social card written to public/og.jpg')

console.log(
  `\n${images.length} images → ${written} files, ${(bytes / 1024 / 1024).toFixed(1)} MB total`,
)
console.log(`manifest written to ${MANIFEST}`)
