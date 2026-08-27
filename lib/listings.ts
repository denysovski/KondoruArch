/* ------------------------------------------------------------------ *
 * Every residence on the books, for sale and to rent, plus the filter
 * definitions and the matching logic the search page runs on.
 * ------------------------------------------------------------------ */

import type { PhotoName } from './photos'

export type Deal = 'sale' | 'rent'

export type Listing = {
  id: string
  title: string
  city: string
  district: string
  category: string
  deal: Deal
  /** Sale: full price. Rent: monthly rent. Both in euro-equivalent. */
  price: number
  priceLabel: string
  secondary: string
  /** 0 = studio */
  rooms: number
  beds: string
  baths: string
  area: number
  floor: string
  status: string
  desc: string
  highlights: string[]
  images: PhotoName[]
}

export const listings: Listing[] = [
  {
    id: 'skyline-residence',
    title: 'Skyline Residence',
    city: 'London',
    district: 'Canary Wharf',
    category: 'New builds',
    deal: 'sale',
    price: 890000,
    priceLabel: 'from £780,000',
    secondary: '£3,140 / month est.',
    rooms: 2,
    beds: '2 — 4 bedrooms',
    baths: '2 bathrooms',
    area: 96,
    floor: 'Floors 4 — 22',
    status: 'Ready spring 2026',
    desc: 'A twenty-two storey tower with double-height winter gardens, a residents workshop and the river four minutes away on foot.',
    highlights: ['Concierge', 'Winter garden', 'Parking'],
    images: [
      'interiors/clerestory-window-lounge',
      'interiors/neutral-sectional-salon',
      'interiors/teal-accent-lounge',
      'interiors/pendant-lit-dining-room',
    ],
  },
  {
    id: 'nordic-quarter',
    title: 'Nordic Quarter',
    city: 'Oslo',
    district: 'Grünerløkka',
    category: 'Family',
    deal: 'sale',
    price: 520000,
    priceLabel: 'from €520,000',
    secondary: '€2,180 / month est.',
    rooms: 3,
    beds: '1 — 3 bedrooms',
    baths: '1 — 2 bathrooms',
    area: 74,
    floor: 'Floors 1 — 6',
    status: 'Two units left',
    desc: 'Timber-framed apartments around a planted courtyard, built to passive-house standard with heat recovery in every flat.',
    highlights: ['Passive house', 'Courtyard', 'Bike store'],
    images: [
      'interiors/herringbone-living-room',
      'interiors/plant-filled-living-room',
      'interiors/grey-family-living-room',
      'interiors/red-armchair-apartment',
    ],
  },
  {
    id: 'blossom-park',
    title: 'Blossom Park',
    city: 'Lisbon',
    district: 'Campo de Ourique',
    category: 'Family',
    deal: 'sale',
    price: 410000,
    priceLabel: 'from €410,000',
    secondary: '€1,690 / month est.',
    rooms: 2,
    beds: '2 bedrooms',
    baths: '1 bathroom',
    area: 88,
    floor: 'Floors 1 — 4',
    status: 'Ready to move in',
    desc: 'A restored 1940s block with original terrazzo, new services throughout and a shared roof terrace over the rooftops.',
    highlights: ['Roof terrace', 'Restored', 'Lift'],
    images: [
      'interiors/corner-window-lounge',
      'interiors/white-kitchen-dark-splashback',
      'interiors/minimal-navy-sofa-room',
      'interiors/timber-stair-atrium',
    ],
  },
  {
    id: 'harbour-view',
    title: 'Harbour View',
    city: 'Copenhagen',
    district: 'Nordhavn',
    category: 'Waterfront',
    deal: 'sale',
    price: 640000,
    priceLabel: 'from €640,000',
    secondary: '€2,610 / month est.',
    rooms: 3,
    beds: '3 bedrooms',
    baths: '2 bathrooms',
    area: 112,
    floor: 'Floors 2 — 9',
    status: 'Ready to move in',
    desc: 'Corner apartments facing the water on two sides, with a swimming platform and the metro at the end of the street.',
    highlights: ['Waterfront', 'Metro 3 min', 'Sauna'],
    images: [
      'interiors/yellow-armchair-corner',
      'interiors/concrete-stair-dining',
      'interiors/sage-wall-sofa',
      'interiors/white-tiled-bathroom',
    ],
  },
  {
    id: 'riverside-lofts',
    title: 'Riverside Lofts',
    city: 'Porto',
    district: 'Massarelos',
    category: 'Investment',
    deal: 'sale',
    price: 355000,
    priceLabel: 'from €355,000',
    secondary: '5.4% modelled yield',
    rooms: 0,
    beds: 'Studio — 2 bed',
    baths: '1 bathroom',
    area: 68,
    floor: 'Floors 1 — 3',
    status: 'Six units left',
    desc: 'Compact lofts in a converted warehouse, let quickly and priced for owners who want the yield without the renovation.',
    highlights: ['5.4% yield', 'Furnished', 'Managed'],
    images: [
      'interiors/gallery-wall-loft',
      'interiors/brick-loft-dining',
      'interiors/rattan-pendant-lounge',
    ],
  },
  {
    id: 'atlas-terraces',
    title: 'Atlas Terraces',
    city: 'Casablanca',
    district: 'Anfa',
    category: 'New builds',
    deal: 'sale',
    price: 290000,
    priceLabel: 'from €290,000',
    secondary: '€1,180 / month est.',
    rooms: 3,
    beds: '2 — 3 bedrooms',
    baths: '2 bathrooms',
    area: 104,
    floor: 'Floors 1 — 8',
    status: 'Ready autumn 2026',
    desc: 'Deep shaded terraces and a parametric screen that keeps the afternoon sun out of every living room in the block.',
    highlights: ['Shaded terrace', 'Pool', 'Parking'],
    images: [
      'interiors/skylight-open-plan-kitchen',
      'interiors/timber-ceiling-terrace',
      'interiors/coffered-ceiling-salon',
    ],
  },
  {
    id: 'meridian-penthouse',
    title: 'Meridian Penthouse',
    city: 'London',
    district: 'Shoreditch',
    category: 'New builds',
    deal: 'sale',
    price: 2350000,
    priceLabel: '£2,350,000',
    secondary: 'Share of freehold',
    rooms: 4,
    beds: '4 bedrooms',
    baths: '3 bathrooms',
    area: 218,
    floor: 'Top two floors',
    status: 'Available now',
    desc: 'A duplex over the top two floors with a planted roof terrace, a proper utility room and lift access straight into the hall.',
    highlights: ['Roof terrace', 'Lift access', 'Two parking bays'],
    images: [
      'interiors/timber-ceiling-terrace',
      'interiors/pendant-lit-dining-room',
      'interiors/dark-stone-bathroom',
    ],
  },
  {
    id: 'olive-court',
    title: 'Olive Court',
    city: 'Lisbon',
    district: 'Príncipe Real',
    category: 'Family',
    deal: 'sale',
    price: 1250000,
    priceLabel: '€1,250,000',
    secondary: '€4,900 / month est.',
    rooms: 4,
    beds: '4 bedrooms',
    baths: '3 bathrooms',
    area: 186,
    floor: 'Whole first floor',
    status: 'Available now',
    desc: 'A whole floor of a nineteenth century building, with the original plasterwork kept and the services entirely renewed.',
    highlights: ['Period detail', 'Garden access', 'Storage'],
    images: [
      'interiors/timber-stair-atrium',
      'interiors/white-kitchen-dark-splashback',
      'interiors/minimal-navy-sofa-room',
    ],
  },
  {
    id: 'fjord-house',
    title: 'Fjord House',
    city: 'Oslo',
    district: 'Bygdøy',
    category: 'Waterfront',
    deal: 'sale',
    price: 1780000,
    priceLabel: '€1,780,000',
    secondary: 'Freehold house',
    rooms: 5,
    beds: '5 bedrooms',
    baths: '3 bathrooms',
    area: 240,
    floor: 'Detached, two storeys',
    status: 'Available now',
    desc: 'A timber house on a south-facing slope with its own jetty, a boat house and a wood-fired sauna at the water line.',
    highlights: ['Private jetty', 'Sauna', 'Boat house'],
    images: [
      'exteriors/dark-clad-entrance',
      'interiors/plant-filled-living-room',
      'exteriors/timber-clad-house-lawn',
    ],
  },
  {
    id: 'dock-studios',
    title: 'Dock Studios',
    city: 'Copenhagen',
    district: 'Islands Brygge',
    category: 'Investment',
    deal: 'sale',
    price: 268000,
    priceLabel: 'from €268,000',
    secondary: '6.1% modelled yield',
    rooms: 0,
    beds: 'Studio',
    baths: '1 bathroom',
    area: 41,
    floor: 'Floors 2 — 5',
    status: 'Nine units left',
    desc: 'Small, efficient studios beside the harbour baths, let to the same university on a rolling three year agreement.',
    highlights: ['6.1% yield', 'Tenanted', 'Managed'],
    images: [
      'interiors/red-armchair-apartment',
      'interiors/plant-filled-living-room',
      'interiors/white-tiled-bathroom',
    ],
  },
  {
    id: 'garden-mews',
    title: 'Garden Mews',
    city: 'Porto',
    district: 'Cedofeita',
    category: 'Family',
    deal: 'sale',
    price: 495000,
    priceLabel: '€495,000',
    secondary: '€1,940 / month est.',
    rooms: 3,
    beds: '3 bedrooms',
    baths: '2 bathrooms',
    area: 132,
    floor: 'House, two storeys',
    status: 'Available now',
    desc: 'A mews house behind a quiet courtyard, rebuilt inside with a double-height kitchen and a walled garden at the back.',
    highlights: ['Walled garden', 'Rebuilt 2024', 'Quiet street'],
    images: [
      'exteriors/timber-and-black-house',
      'interiors/open-stair-family-room',
      'interiors/neutral-sectional-salon',
    ],
  },
  {
    id: 'medina-riad',
    title: 'Medina Riad',
    city: 'Casablanca',
    district: 'Habous',
    category: 'Waterfront',
    deal: 'sale',
    price: 720000,
    priceLabel: '€720,000',
    secondary: 'Freehold riad',
    rooms: 5,
    beds: '5 bedrooms',
    baths: '4 bathrooms',
    area: 310,
    floor: 'Courtyard house',
    status: 'Available now',
    desc: 'A restored riad around a planted courtyard, with a plunge pool, roof terrace and every original zellige tile kept.',
    highlights: ['Courtyard pool', 'Roof terrace', 'Restored'],
    images: [
      'exteriors/courtyard-house-under-tree',
      'interiors/skylight-open-plan-kitchen',
      'interiors/coffered-ceiling-salon',
    ],
  },

  /* ---------------- To rent ---------------- */

  {
    id: 'wharf-apartment',
    title: 'Wharf Apartment',
    city: 'London',
    district: 'Wapping',
    category: 'Waterfront',
    deal: 'rent',
    price: 3400,
    priceLabel: '£3,400 / month',
    secondary: 'Deposit £3,400 · furnished',
    rooms: 2,
    beds: '2 bedrooms',
    baths: '2 bathrooms',
    area: 92,
    floor: 'Fourth floor',
    status: 'Available 1 October',
    desc: 'A converted warehouse flat with the original beams, river views from both bedrooms and a lift from the secure entrance.',
    highlights: ['River view', 'Furnished', 'Lift'],
    images: [
      'interiors/teal-accent-lounge',
      'interiors/clerestory-window-lounge',
      'interiors/pendant-lit-dining-room',
    ],
  },
  {
    id: 'alfama-flat',
    title: 'Alfama Flat',
    city: 'Lisbon',
    district: 'Alfama',
    category: 'Family',
    deal: 'rent',
    price: 1450,
    priceLabel: '€1,450 / month',
    secondary: 'Deposit €2,900 · part furnished',
    rooms: 2,
    beds: '2 bedrooms',
    baths: '1 bathroom',
    area: 71,
    floor: 'Second floor',
    status: 'Available now',
    desc: 'Two bedrooms up a narrow stair, with a tiled kitchen, a small balcony and the tram stop at the end of the lane.',
    highlights: ['Balcony', 'Part furnished', 'Tram 2 min'],
    images: [
      'interiors/minimal-navy-sofa-room',
      'interiors/timber-stair-atrium',
      'interiors/white-kitchen-dark-splashback',
    ],
  },
  {
    id: 'sofienberg-studio',
    title: 'Sofienberg Studio',
    city: 'Oslo',
    district: 'Sofienberg',
    category: 'Investment',
    deal: 'rent',
    price: 1180,
    priceLabel: '€1,180 / month',
    secondary: 'Deposit €3,540 · furnished',
    rooms: 0,
    beds: 'Studio',
    baths: '1 bathroom',
    area: 38,
    floor: 'Ground floor',
    status: 'Available 15 September',
    desc: 'A compact studio with a proper kitchen rather than a kitchenette, opening onto a shared garden at the back.',
    highlights: ['Garden access', 'Furnished', 'Bills included'],
    images: [
      'interiors/red-armchair-apartment',
      'interiors/brick-loft-dining',
      'interiors/herringbone-living-room',
    ],
  },
  {
    id: 'harbour-loft',
    title: 'Harbour Loft',
    city: 'Copenhagen',
    district: 'Nordhavn',
    category: 'Waterfront',
    deal: 'rent',
    price: 2650,
    priceLabel: '€2,650 / month',
    secondary: 'Deposit €7,950 · unfurnished',
    rooms: 3,
    beds: '3 bedrooms',
    baths: '2 bathrooms',
    area: 118,
    floor: 'Seventh floor',
    status: 'Available 1 November',
    desc: 'A corner flat high enough to see across the water, with underfloor heating throughout and a locked bike room downstairs.',
    highlights: ['Water view', 'Underfloor heat', 'Bike room'],
    images: [
      'interiors/yellow-armchair-corner',
      'interiors/concrete-stair-dining',
      'interiors/gallery-wall-loft',
    ],
  },
  {
    id: 'foz-house',
    title: 'Foz House',
    city: 'Porto',
    district: 'Foz do Douro',
    category: 'Family',
    deal: 'rent',
    price: 2100,
    priceLabel: '€2,100 / month',
    secondary: 'Deposit €4,200 · unfurnished',
    rooms: 4,
    beds: '4 bedrooms',
    baths: '3 bathrooms',
    area: 165,
    floor: 'House, two storeys',
    status: 'Available now',
    desc: 'A family house two streets from the beach, with a garage, a garden that gets the evening sun and schools within walking distance.',
    highlights: ['Garage', 'Garden', 'Near schools'],
    images: [
      'exteriors/poolside-glass-terrace',
      'interiors/open-stair-family-room',
      'interiors/neutral-sectional-salon',
    ],
  },
  {
    id: 'anfa-apartment',
    title: 'Anfa Apartment',
    city: 'Casablanca',
    district: 'Anfa',
    category: 'New builds',
    deal: 'rent',
    price: 980,
    priceLabel: '€980 / month',
    secondary: 'Deposit €1,960 · furnished',
    rooms: 2,
    beds: '2 bedrooms',
    baths: '1 bathroom',
    area: 84,
    floor: 'Fifth floor',
    status: 'Available now',
    desc: 'A new-build flat with a shaded balcony on the cool side of the building, in a block with a pool and a caretaker.',
    highlights: ['Shaded balcony', 'Pool', 'Caretaker'],
    images: [
      'interiors/skylight-open-plan-kitchen',
      'interiors/coffered-ceiling-salon',
      'interiors/timber-ceiling-terrace',
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Filters
 * ------------------------------------------------------------------ */

const MAX = Number.MAX_SAFE_INTEGER

export const dealOptions = [
  { id: 'sale', label: 'For sale' },
  { id: 'rent', label: 'To rent' },
]

export const roomOptions = [
  { id: 'studio', label: 'Studio', min: 0, max: 0 },
  { id: '1', label: '1 bedroom', min: 1, max: 1 },
  { id: '2', label: '2 bedrooms', min: 2, max: 2 },
  { id: '3', label: '3 bedrooms', min: 3, max: 3 },
  { id: '4', label: '4+ bedrooms', min: 4, max: MAX },
]

export const priceOptions = [
  { id: 'sale-500', label: 'Buy · up to 500k', deal: 'sale' as Deal, min: 0, max: 500000 },
  { id: 'sale-1m', label: 'Buy · 500k — 1M', deal: 'sale' as Deal, min: 500000, max: 1000000 },
  { id: 'sale-2m', label: 'Buy · 1M — 2M', deal: 'sale' as Deal, min: 1000000, max: 2000000 },
  { id: 'sale-max', label: 'Buy · 2M and above', deal: 'sale' as Deal, min: 2000000, max: MAX },
  { id: 'rent-1500', label: 'Rent · up to 1,500 pm', deal: 'rent' as Deal, min: 0, max: 1500 },
  { id: 'rent-3000', label: 'Rent · 1,500 — 3,000 pm', deal: 'rent' as Deal, min: 1500, max: 3000 },
  { id: 'rent-max', label: 'Rent · 3,000 and above', deal: 'rent' as Deal, min: 3000, max: MAX },
]

export const cityOptions = Array.from(new Set(listings.map((l) => l.city))).sort()

export const districtOptions = Array.from(new Set(listings.map((l) => l.district))).sort()

export const districtsByCity = cityOptions.reduce<Record<string, string[]>>((acc, city) => {
  acc[city] = Array.from(
    new Set(listings.filter((l) => l.city === city).map((l) => l.district)),
  ).sort()
  return acc
}, {})

export type SearchQuery = {
  city?: string
  district?: string
  rooms?: string
  price?: string
  deal?: string
}

/**
 * Every filter is optional: anything missing, empty or unrecognised simply
 * does not narrow the result set, so an empty search returns everything.
 */
export function filterListings(query: SearchQuery): Listing[] {
  const room = roomOptions.find((option) => option.id === query.rooms)
  const band = priceOptions.find((option) => option.id === query.price)
  const deal = query.deal === 'sale' || query.deal === 'rent' ? query.deal : undefined

  return listings.filter((listing) => {
    if (query.city && listing.city !== query.city) return false
    if (query.district && listing.district !== query.district) return false
    if (room && (listing.rooms < room.min || listing.rooms > room.max)) return false
    if (deal && listing.deal !== deal) return false
    if (band) {
      if (listing.deal !== band.deal) return false
      if (listing.price < band.min || listing.price > band.max) return false
    }
    return true
  })
}

export function describeQuery(query: SearchQuery): string[] {
  const parts: string[] = []
  if (query.deal) parts.push(dealOptions.find((d) => d.id === query.deal)?.label ?? query.deal)
  if (query.city) parts.push(query.city)
  if (query.district) parts.push(query.district)
  if (query.rooms) parts.push(roomOptions.find((r) => r.id === query.rooms)?.label ?? query.rooms)
  if (query.price) parts.push(priceOptions.find((p) => p.id === query.price)?.label ?? query.price)
  return parts
}

/* ------------------------------------------------------------------ *
 * Residence detail pages
 *
 * Every residence gets the same page shape, filled from its own row, so a
 * new listing needs no new template. The prose below is composed from the
 * listing's own values rather than stored per row, which keeps the copy and
 * the specification from drifting apart.
 * ------------------------------------------------------------------ */

export function getListing(id: string): Listing | undefined {
  return listings.find((listing) => listing.id === id)
}

/** Previous / next in list order, wrapping at both ends. */
export function getListingNeighbours(id: string) {
  const index = listings.findIndex((listing) => listing.id === id)
  if (index === -1) return { index: -1, total: listings.length, prev: undefined, next: undefined }
  return {
    index,
    total: listings.length,
    prev: listings[(index - 1 + listings.length) % listings.length],
    next: listings[(index + 1) % listings.length],
  }
}

/**
 * `price` is held euro-equivalent for sorting and filtering, but `priceLabel`
 * is written in the listing's local currency. Anything shown next to the
 * label has to be derived from the label, or a £ headline ends up sitting
 * beside a € per-square-metre figure.
 */
function localPrice(listing: Listing): { symbol: string; amount: number } {
  const match = listing.priceLabel.match(/([£€$])\s?([\d,.]+)/)
  if (!match) return { symbol: '€', amount: listing.price }
  const amount = Number(match[2].replace(/,/g, ''))
  return Number.isFinite(amount) && amount > 0
    ? { symbol: match[1], amount }
    : { symbol: match[1], amount: listing.price }
}

const money = (symbol: string, n: number) =>
  `${symbol}${Math.round(n).toLocaleString('en-US')}`

export type FactRow = { label: string; value: string }

export type ListingDetail = {
  lead: string
  body: string[]
  specification: FactRow[]
  costs: FactRow[]
  timeline: { title: string; copy: string }[]
  nearby: Listing[]
}

export function buildListingDetail(listing: Listing): ListingDetail {
  const isSale = listing.deal === 'sale'
  const local = localPrice(listing)
  const perSqm = local.amount / listing.area

  const lead = isSale
    ? `${listing.title} sits in ${listing.district}, ${listing.city}, and comes to the list at ${listing.priceLabel.replace(/^from /, '')} — surveyed, measured and priced against comparable sales on the same street.`
    : `${listing.title} is available to rent in ${listing.district}, ${listing.city} at ${listing.priceLabel}, on a standard twelve-month agreement with the deposit held in a protected scheme.`

  const body = [
    listing.desc,
    isSale
      ? `At ${listing.area} m² the asking price works out at roughly ${money(local.symbol, perSqm)} per square metre, which is in line with what ${listing.district} has been achieving for ${listing.category.toLowerCase()} stock this year. We benchmark every listing this way before it reaches the site, and we will show you the comparables the moment you ask for them.`
      : `The rent covers the apartment itself; building service charges are included, and utilities are metered per flat. At ${listing.area} m² across ${listing.floor.toLowerCase()}, the layout suits ${listing.rooms === 0 ? 'a single occupant' : listing.rooms >= 3 ? 'a family or a share' : 'a couple or a small household'} without wasting space on circulation.`,
    `The specification carries ${listing.highlights.join(', ').toLowerCase()}, and the survey is already done — you can read it before you make an offer rather than after. Anything the report flagged is listed in it plainly, including the things that would cost money to put right.`,
    isSale
      ? `Status today is "${listing.status}". If that date matters to you, say so early: on new-build stock we hold a unit for seven days while the survey and the mortgage offer catch up, and we will tell you honestly if a completion date is at risk.`
      : `Status today is "${listing.status}". Viewings run seven days a week, references take about two working days, and we do not charge tenants a fee of any kind.`,
  ]

  const specification: FactRow[] = [
    { label: 'Type', value: listing.category },
    { label: 'Bedrooms', value: listing.beds },
    { label: 'Bathrooms', value: listing.baths },
    { label: 'Internal area', value: `${listing.area} m²` },
    { label: 'Floor', value: listing.floor },
    { label: 'City', value: `${listing.district}, ${listing.city}` },
    { label: 'Availability', value: listing.status },
    { label: 'Tenure', value: isSale ? 'Freehold, share of building' : 'Assured shorthold, 12 months' },
  ]

  const costs: FactRow[] = isSale
    ? [
        { label: 'Asking price', value: listing.priceLabel },
        { label: 'Per square metre', value: `${money(local.symbol, perSqm)} / m²` },
        { label: 'Running cost estimate', value: listing.secondary },
        { label: 'Our fee', value: '1.2% of the purchase price, on completion' },
        { label: 'Reservation', value: `${money(local.symbol, Math.min(local.amount * 0.01, 15000))}, refundable for 7 days` },
      ]
    : [
        { label: 'Monthly rent', value: listing.priceLabel },
        { label: 'Deposit and furnishing', value: listing.secondary },
        { label: 'Minimum term', value: '12 months, break at 6' },
        { label: 'Tenant fees', value: 'None' },
        { label: 'Referencing', value: 'Two working days, no charge' },
      ]

  const timeline = isSale
    ? [
        { title: 'Book a viewing', copy: 'Seven days a week, in person or on a live video walkthrough.' },
        { title: 'Read the survey', copy: 'Already commissioned. We go through it with you line by line.' },
        { title: 'Offer and reserve', copy: 'We negotiate with the comparables in front of us, then reserve.' },
        { title: 'Complete and hand over', copy: 'Contracts, notary and a snagging visit at twelve months.' },
      ]
    : [
        { title: 'Book a viewing', copy: 'Seven days a week, in person or on a live video walkthrough.' },
        { title: 'Reference check', copy: 'Two working days, and we never charge a tenant for it.' },
        { title: 'Sign and pay', copy: 'Deposit into a protected scheme, first month on the start date.' },
        { title: 'Move in', copy: 'Inventory walked with you, keys and meter readings on the day.' },
      ]

  const nearby = listings
    .filter((other) => other.id !== listing.id && other.city === listing.city)
    .concat(listings.filter((other) => other.id !== listing.id && other.city !== listing.city))
    .slice(0, 3)

  return { lead, body, specification, costs, timeline, nearby }
}
