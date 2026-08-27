/* ------------------------------------------------------------------ *
 * images:ingest — make sure every catalogue entry has a master in
 * assets/source, downloading the ones that declare a `remote` URL.
 *
 * Masters are capped at 2000px on the long edge: past that the extra
 * pixels never reach a browser, they only slow the repo down.
 * ------------------------------------------------------------------ */

import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { images, sourceFile } from './image-sources.mjs'

const SOURCE_DIR = 'assets/source'
const CAP = 2000

const exists = async (file) => {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}

await fs.mkdir(SOURCE_DIR, { recursive: true })

const force = process.argv.includes('--force')
let fetched = 0
let kept = 0
const missing = []

for (const image of images) {
  const target = path.join(SOURCE_DIR, sourceFile(image))

  if (!force && (await exists(target))) {
    kept++
    continue
  }

  if (!image.remote) {
    missing.push(image.key)
    continue
  }

  const response = await fetch(image.remote)
  if (!response.ok) {
    missing.push(`${image.key} (${response.status})`)
    continue
  }

  await sharp(Buffer.from(await response.arrayBuffer()))
    .rotate()
    .resize({ width: CAP, height: CAP, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(target)

  fetched++
  console.log(`fetched  ${image.key}`)
}

console.log(`\n${kept} already present, ${fetched} downloaded`)

if (missing.length) {
  console.error(`\nNo master available for:\n  ${missing.join('\n  ')}`)
  process.exit(1)
}
