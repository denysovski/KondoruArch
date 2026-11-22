<div align="center">

# Kondoru

**Buying property, made safe and simple.**

A property and architecture studio site: a long-scroll homepage, eighteen residences with their own pages, services, projects, a studio page, a journal with seventeen articles, market reports and a company history, a two-step contact page and a search that works without a server. Calm, editorial and built around one deep blue.

[**Open the live site**](https://denysovski.github.io/KondoruArch/) &nbsp;·&nbsp; [Properties](https://denysovski.github.io/KondoruArch/properties/) &nbsp;·&nbsp; [Services](https://denysovski.github.io/KondoruArch/services/) &nbsp;·&nbsp; [Studio](https://denysovski.github.io/KondoruArch/studio/) &nbsp;·&nbsp; [Journal](https://denysovski.github.io/KondoruArch/journal/) &nbsp;·&nbsp; [Contact](https://denysovski.github.io/KondoruArch/contact/)

![Next.js](https://img.shields.io/badge/Next.js%2016-06213f?style=flat-square&labelColor=06213f&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React%2019-06213f?style=flat-square&labelColor=06213f&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-06213f?style=flat-square&labelColor=06213f&logo=typescript&logoColor=white)
![Static export](https://img.shields.io/badge/static%20export-GitHub%20Pages-06213f?style=flat-square&labelColor=06213f)

<br>

![Kondoru homepage](docs/screens/01-hero.jpg)

</div>

---

## At a glance

| | |
|---|---|
| **Pages** | Home, Properties with 18 residence pages, Services, Projects, Studio, Journal with 17 article pages, Market reports, Buyer's guides, Our history, Contact, Insights, Search and 404. 54 pages in total, all static. |
| **Navigation** | A floating white bar that fits every screen from a 360 px phone to a wide desktop, compacts on the way down, and opens a mega menu whose highlight and content slide smoothly from item to item. A scrolling drawer on phones and tablets. |
| **Contact** | Two steps. Pick what you came for (buy, sell or let, design or build, invest, press, something else) and the matching form fades in with the fields that need asks for. Every field is required, with inline messages and focus moved to the first problem. The selects are custom-drawn listboxes that work from the keyboard. A newsletter with four letters to choose from sits below. |
| **Journal** | Every article has its own page with a short body, a checklist where it helps, and three to read next. The menu links to the archive, the quarterly market table, the buyer's guides and an eighteen-year timeline. |
| **Homes** | Cards with the photo across the top, a thumbnail strip to switch views, specs, highlights and a booking button. Filters by category, two to three cards per view depending on the screen; every photo in the rail is preloaded and decoded before a filter fades back in, so no card appears without its image. |
| **People** | Drawn portraits for the team, a managing director card in the "Inside the work" band, contact rows that wrap cleanly on a phone. |
| **Motion** | Numbers that roll into place like an odometer, each digit spinning through its column and settling from the left. Masked headings that rise into place, staggered card entrances, parallax on the photo bands, and photographs that open up and settle as you scroll. All of it switches off under reduced motion. |
| **Cookies** | Shown on the first visit, with *Essential only* and *Accept all* side by side at the same size and every optional category off by default. After a choice the button disappears; the footer's *Cookies* link reopens the settings. |
| **Search** | Deal, city, district, rooms and price, filtered in the browser. The hero search carries its filters straight to the results. |
| **SEO** | Titles, descriptions, canonicals, Open Graph, a generated social card, JSON-LD for the organisation, listings, services, articles and FAQs, and a sitemap with images. |
| **Images** | One catalogue becomes a WebP ladder from 400 to 2000 px. Quality steps down as width goes up, chroma is subsampled smartly, and the fallback `src` is the 1200 px file, so phones and crawlers never pull the largest one. 17 MB for 215 files. |
| **Quality** | `npm run check` audits the built site itself: 14,288 checks for alt text, image sizes, internal links, metadata, structured data and the sitemap. |

---

## Screenshots

| | |
|---|---|
| ![Mega menu](docs/screens/02-menu.jpg) **Navigation.** A floating bar with a mega menu that slides smoothly between sections. | ![Homes](docs/screens/06-homes.jpg) **Homes.** Photo on top, details below, filtered by category. |
| ![Inside the work](docs/screens/08-band.jpg) **Inside the work.** A full-bleed band with the managing director's card. | ![Team](docs/screens/12-team.jpg) **The people.** Drawn portraits with languages and direct contacts. |
| ![Residence](docs/screens/24-residence.jpg) **Residence.** Price and booking first, then the gallery and specs. | ![Article](docs/screens/27-article.jpg) **Journal.** Every article on its own page. |
| ![Contact](docs/screens/25-contact.jpg) **Contact.** Start by choosing what you need. | ![Contact form](docs/screens/26-contact-form.jpg) **The form.** Fades in with only the fields that matter. |

---

## Under the hood

- **Next.js 16** (App Router) as a static export, **React 19**, **TypeScript**
- A hand-written design system in `app/globals.css`: one deep blue, Montserrat for display, Open Sans for text, large radii and layered shadows
- **Sharp** image pipeline: one catalogue (`scripts/image-sources.mjs`) becomes a WebP ladder, a placeholder tint and the alt text every page reuses
- Scroll reveals through IntersectionObserver, and scroll-driven CSS animations for the photographs where the browser supports them
- GitHub Actions builds, audits and deploys to GitHub Pages on every push to `main`

```
app/                 pages: home.tsx, properties/, services/, projects/, studio/, journal/, contact/, search/, insights/
components/          navigation, footer, cards, gallery, search filters, cookie settings, drawn portraits, custom select, newsletter
lib/                 copy (content.ts), residences (listings.ts), sub-page content, article bodies (articles.ts), SEO helpers, photo manifest
scripts/             image ingest and optimisation, export audit, static-host finishing
assets/source/       photo masters, capped at 2000 px
```

## Run it

```bash
npm install
npm run dev          # local development
npm test             # type check, build and audit the export
npm run preview      # serve out/ the way GitHub Pages will
npm run images       # fetch missing photo masters and rebuild public/img
```

Set `NEXT_PUBLIC_BASE_PATH=/KondoruArch` when building for GitHub Pages; leave it unset for local work.

## Credits

Photographs from [Unsplash](https://unsplash.com) under the Unsplash License; each source is listed in `scripts/image-sources.mjs`. The managing director's portrait is by Vitaly Gariev. Kondoru, its people, prices and numbers are fictional.
