<div align="center">

# Kondoru

**Buying property, made safe and simple.**

A property and architecture studio site: a long-scroll homepage, eighteen residences with their own pages, services, projects, a studio page, a journal and a search that works without a server. Calm, editorial and built around one deep blue.

[**Open the live site**](https://denysovski.github.io/KondoruArch/) &nbsp;·&nbsp; [Properties](https://denysovski.github.io/KondoruArch/properties/) &nbsp;·&nbsp; [Services](https://denysovski.github.io/KondoruArch/services/) &nbsp;·&nbsp; [Studio](https://denysovski.github.io/KondoruArch/studio/) &nbsp;·&nbsp; [Search](https://denysovski.github.io/KondoruArch/search/)

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
| **Pages** | Home, Properties with 18 residence pages, Services, Projects, Studio, Journal with articles, Insights, Search and 404. 33 pages in total, all static. |
| **Navigation** | A floating white bar that fits every screen from a 360 px phone to a wide desktop, compacts on the way down, and opens a mega menu whose highlight and content slide smoothly from item to item. A scrolling drawer on phones and tablets. |
| **Homes** | Cards with the photo across the top, a thumbnail strip to switch views, specs, highlights and a booking button. Filters by category, two to three cards per view depending on the screen. |
| **People** | Drawn portraits for the team, a managing director card in the "Inside the work" band, contact rows that wrap cleanly on a phone. |
| **Motion** | Masked headings that rise into place, staggered card entrances, parallax on the photo bands, and photographs that open up and settle as you scroll. All of it switches off under reduced motion. |
| **Cookies** | Shown on the first visit, with *Essential only* and *Accept all* side by side at the same size and every optional category off by default. After a choice the button disappears; the footer's *Cookies* link reopens the settings. |
| **Search** | Deal, city, district, rooms and price, filtered in the browser. The hero search carries its filters straight to the results. |
| **SEO** | Titles, descriptions, canonicals, Open Graph, a generated social card, JSON-LD for the organisation, listings, services, articles and FAQs, and a sitemap with images. |
| **Quality** | `npm run check` audits the built site itself: 11,584 checks for alt text, image sizes, internal links, metadata, structured data and the sitemap. |

---

## Home

The homepage follows a buyer's questions in order: who you are, what you do, what is for sale, how you work, and who will answer the phone.

| | |
|---|---|
| ![Mega menu](docs/screens/02-menu.jpg) **Mega menu.** Hover from Properties to Services and the highlight slides across while the panel's content glides in from that side. | ![Why Kondoru](docs/screens/03-promise.jpg) **Why Kondoru.** The promise in one sentence, three checks and two ways to start. |
| ![Numbers](docs/screens/04-stats.jpg) **In numbers.** Four cards with the figure in the middle, one line of context and a link onwards. | ![Services](docs/screens/05-services.jpg) **What we do.** Buying, developing, designing and advising. Plain cards, no icons, the title leads. |
| ![Homes](docs/screens/06-homes.jpg) **Homes ready to move into.** The photo sits on top of each card, the details below, and nothing zooms on hover. | ![Cities](docs/screens/07-cities.jpg) **Six cities.** Each city opens a search that is already filtered. |
| ![Inside the work](docs/screens/08-band.jpg) **Inside the work.** The full-bleed band with the managing director who signs off every twelve-month review. | ![Standards](docs/screens/09-standards.jpg) **What every building has to earn.** Four standards as a calm list beside the Oslo project. |
| ![Feature](docs/screens/10-feature.jpg) **Projects slider.** Three projects that change on their own or on a click. | ![Process](docs/screens/11-process.jpg) **Four movements.** Listen, model, detail, deliver. |
| ![Team](docs/screens/12-team.jpg) **The people.** Drawn portraits, languages, email and phone for each of the four people. | ![Voices](docs/screens/13-voices.jpg) **Voices.** What clients said, one at a time. |

![Contact](docs/screens/14-contact.jpg)
**Let's build something.** The closing panel with email, phone and the weekly listings letter.

---

## Pages

| | |
|---|---|
| ![Properties](docs/screens/20-properties.jpg) **Properties.** Eighty-four homes, each surveyed before it reaches the list. | ![Residence](docs/screens/24-residence.jpg) **Residence.** Price and booking at the top, then the gallery, specs and the steps of a purchase. |
| ![Services](docs/screens/21-services.jpg) **Services.** Four services, priced separately and explained one by one. | ![Studio](docs/screens/22-studio.jpg) **Studio.** The firm's story and the journey from first call to keys. |
| ![Search](docs/screens/23-search.jpg) **Search.** Every listing on the books, filtered as you type. | ![Footer](docs/screens/15-footer.jpg) **Footer.** The main pages, the Thursday letter and the legal links, including cookie settings. |

---

## Mobile

| | | |
|:---:|:---:|:---:|
| <img src="docs/screens/m-hero.jpg" width="230" alt="Mobile hero"><br><sub>Hero</sub> | <img src="docs/screens/m-menu.jpg" width="230" alt="Mobile menu"><br><sub>Menu (the cookie button steps aside)</sub> | <img src="docs/screens/m-cookies.jpg" width="230" alt="Cookie settings"><br><sub>Cookies on the first visit</sub> |
| <img src="docs/screens/m-stats.jpg" width="230" alt="Mobile numbers"><br><sub>Numbers</sub> | <img src="docs/screens/m-homes.jpg" width="230" alt="Mobile home cards"><br><sub>Home cards</sub> | <img src="docs/screens/m-band.jpg" width="230" alt="Managing director card"><br><sub>Managing director</sub> |

<p align="center"><img src="docs/screens/m-team.jpg" width="230" alt="Mobile team card"><br><sub>Team card</sub></p>

---

## Under the hood

- **Next.js 16** (App Router) as a static export, **React 19**, **TypeScript**
- A hand-written design system in `app/globals.css`: one deep blue, Montserrat for display, Open Sans for text, large radii and layered shadows
- **Sharp** image pipeline: one catalogue (`scripts/image-sources.mjs`) becomes a WebP ladder, a placeholder tint and the alt text every page reuses
- Scroll reveals through IntersectionObserver, and scroll-driven CSS animations for the photographs where the browser supports them
- GitHub Actions builds, audits and deploys to GitHub Pages on every push to `main`

```
app/                 pages: home.tsx, properties/, services/, projects/, studio/, journal/, search/, insights/
components/          navigation, footer, cards, gallery, search filters, cookie settings, drawn portraits
lib/                 copy (content.ts), residences (listings.ts), sub-page content, SEO helpers, photo manifest
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
