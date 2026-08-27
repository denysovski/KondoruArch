/* ------------------------------------------------------------------ *
 * npm run preview — serves out/ the way a static host would.
 *
 * `next start` cannot run an exported site, and the point of a preview is
 * to see exactly what GitHub Pages will serve: directories resolved to
 * their index.html, a real 404 page, and nothing else in the way.
 * ------------------------------------------------------------------ */

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.env.PREVIEW_DIR ?? 'out'
const PORT = Number(process.env.PORT ?? 4173)
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
}

if (!fs.existsSync(ROOT)) {
  console.error(`No ${ROOT}/ directory — run \`npm run build\` first.`)
  process.exit(1)
}

http
  .createServer((request, response) => {
    let url = decodeURIComponent(request.url.split('?')[0])
    if (BASE_PATH && url.startsWith(BASE_PATH)) url = url.slice(BASE_PATH.length) || '/'

    const candidates = [
      path.join(ROOT, url),
      path.join(ROOT, url, 'index.html'),
      path.join(ROOT, `${url}.html`),
    ]

    for (const file of candidates) {
      if (fs.existsSync(file) && fs.statSync(file).isFile()) {
        response.writeHead(200, {
          'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream',
          'cache-control': 'no-cache',
        })
        fs.createReadStream(file).pipe(response)
        return
      }
    }

    const notFound = path.join(ROOT, '404.html')
    response.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
    response.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not found')
  })
  .listen(PORT, () => {
    console.log(`Serving ${ROOT}${BASE_PATH ? ` under ${BASE_PATH}` : ''} on http://localhost:${PORT}`)
  })
