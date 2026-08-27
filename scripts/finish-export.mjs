/* ------------------------------------------------------------------ *
 * Runs after `next build` to make out/ safe to drop on a static host.
 *
 * 1. .nojekyll — GitHub Pages otherwise runs Jekyll over the upload, and
 *    Jekyll skips every directory whose name starts with an underscore,
 *    which is where all of Next's assets live.
 *
 * 2. Flattened router payloads — the exporter writes each route's RSC
 *    payload into a nested `__next.<segment>/…/__PAGE__.txt` directory,
 *    but the client asks for it as one dotted filename in the route's own
 *    folder. Left alone, every prefetch 404s and each in-site link falls
 *    back to a full page load. Renaming them to the name the client asks
 *    for is enough; if a future build writes them flat already, there is
 *    nothing here to move and this does nothing.
 * ------------------------------------------------------------------ */

import fs from 'node:fs/promises'
import path from 'node:path'
import { existsSync } from 'node:fs'

const OUT = 'out'

if (!existsSync(OUT)) {
  console.error(`No ${OUT}/ directory — run \`next build\` first.`)
  process.exit(1)
}

await fs.writeFile(path.join(OUT, '.nojekyll'), '')

/** Every file under `dir`, as paths relative to it. */
const filesUnder = async (dir, prefix = '', found = []) => {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) await filesUnder(path.join(dir, entry.name), relative, found)
    else found.push(relative)
  }
  return found
}

let moved = 0

const flatten = async (dir) => {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const full = path.join(dir, entry.name)

    if (entry.name.startsWith('__next.')) {
      for (const relative of await filesUnder(full)) {
        const flat = path.join(dir, `${entry.name}.${relative.split('/').join('.')}`)
        if (!existsSync(flat)) {
          await fs.rename(path.join(full, ...relative.split('/')), flat)
          moved++
        }
      }
      await fs.rm(full, { recursive: true, force: true })
      continue
    }

    await flatten(full)
  }
}

await flatten(OUT)

console.log(`out/.nojekyll written, ${moved} router payloads flattened`)
