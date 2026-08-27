# Kondoru

Kondoru is a property and architecture site built to feel editorial, calm and unmistakably premium. The experience pairs a long-scroll homepage with a full set of real sub pages — listings, residence detail, services, projects, studio, journal and search — all sharing one navigation, one photo pipeline and one motion language, and shipping as a static export that any plain host can serve.

## What It Includes

- A fixed, self-compacting navigation with desktop mega menus and a mobile drawer that stays identical on every page.
- A cinematic hero with a working search bar that carries its filters straight through to the search page.
- Long-scroll storytelling sections for the promise, the approach, the cities, the standards, the process, the people and the journal.
- Two full-bleed photographic bands with text laid over them, one carrying three clickable approach cards and the other the measured numbers behind the work.
- Eighteen real residences with their own detail pages, galleries, specification tables, neighbour pagination and structured data.
- A client-side search that filters by deal, city, district, rooms and price without a server behind it.
- An image pipeline that turns one catalogue file into a WebP ladder, a placeholder tint and the alt text every page reuses.
- A flat, motion-free copy of the homepage at `/preview/index1` for screenshots.
- An SEO layer: per-page titles and descriptions, canonicals, Open Graph and Twitter cards, a generated social card, JSON-LD for the organisation, listings, services, articles and FAQs, plus a sitemap with image entries.
- A test suite that audits the built export rather than the source: alt text, intrinsic sizes, internal links, metadata, structured data and the sitemap.

## Key Sections

- The hero section sets the tone with a full-bleed facade, oversized type and a search bar that is the fastest route into the listings.
- The showcase band sits above the services grid: one photograph at a fixed height, copy laid over it, and three clickable cards for finding, proving and shaping a purchase.
- The properties rail and the cities grid turn the stock into something browsable, with each city tile opening a pre-filtered search.
- The band and insight pages carry the measured claims — embodied carbon, winter daylight, fabric warranty — each with its own page and its own evidence.
- The standards, process and partnership sections explain how the studio works, in the order a client actually meets it.
- The editorial section on the properties page pairs one photograph with the checks every home passes before it reaches the list, fading up as it arrives.
- The team, journal and testimonial sections close the story, and the CTA panel hands over the two ways to get in touch.

## Technologies

- Next.js 16 (App Router, static export)
- React 19
- TypeScript 5.7
- Tailwind CSS 4 alongside a hand-written design system in `app/globals.css`
- Sharp (image ingest and optimisation scripts)
- Lucide icons
- GitHub Actions and GitHub Pages

## Visual Style

The design language is quiet, editorial and built around one deep blue:

- White and a pale blue-grey tint for surfaces, so photography carries the colour.
- Deep navy ink for type and for every full-bleed band, with a mid blue reserved for links, counts and active states.
- Montserrat for display type at tight tracking, Open Sans for body copy at a generous line height.
- Large radii, hairline borders and layered shadows — a contact edge, a mid lift and a wide ambient pool — for depth without weight.
- Motion that reveals rather than decorates: masked words that rise into place, staggered card entrances, slow parallax on the bands, and a scroll-velocity pitch on the card decks. All of it collapses to nothing under `prefers-reduced-motion`, and is switched off entirely on the flat preview.

## Project Structure

- `app/page.tsx` holds the homepage metadata and structured data; `app/home.tsx` is the page itself and controls section order.
- `app/properties/`, `app/services/`, `app/projects/`, `app/studio/`, `app/journal/`, `app/search/` and `app/insights/` are the sub pages, including the two dynamic routes.
- `app/preview/index1/` is the flat, motion-free copy of the homepage.
- `app/globals.css` carries the design tokens and every section's styling.
- `components/` holds the shared chrome: navigation, footer, cards, galleries, search filters, scroll effects and the `Photo` component every image goes through.
- `lib/content.ts`, `lib/listings.ts` and `lib/pages.ts` store site copy, the residences and the sub-page content.
- `lib/photos.ts` and `lib/image-manifest.json` map catalogue keys to renditions, sizes, tints and alt text.
- `lib/seo.ts` holds the metadata helpers and the schema.org blocks.
- `scripts/image-sources.mjs` is the single catalogue of every photograph, its source and its alt text.
- `scripts/ingest-images.mjs` and `scripts/optimize-images.mjs` build `public/img` and the manifest.
- `scripts/check-site.mjs` audits the built export; `scripts/finish-export.mjs` prepares it for a static host.
- `assets/source/` holds the masters the pipeline reads, capped at 2000px.

## Development

- `npm run dev` starts the local development server.
- `npm run build` builds the static export into `out/` and prepares it for a static host.
- `npm run preview` serves `out/` the way GitHub Pages will.
- `npm run typecheck` runs TypeScript across the project.
- `npm run check` audits the built export.
- `npm test` runs the type check, the build and the audit in one pass.
- `npm run images:ingest` fetches any missing masters into `assets/source`.
- `npm run images:optimize` rebuilds `public/img`, the photo manifest and the social card.
- `npm run images` runs both image steps in order.

Set `NEXT_PUBLIC_BASE_PATH=/KondoruArch` when building for GitHub Pages; leave it unset for local work and for a root deploy.

## Live Site

https://denysovski.github.io/KondoruArch/
