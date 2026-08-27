import {
  Award,
  Building2,
  Compass,
  KeyRound,
  Layers,
  Leaf,
  Ruler,
  Search,
  Sun,
  Users,
} from 'lucide-react'
import type { PhotoName } from './photos'

/* ------------------------------------------------------------------ *
 * Site content — shared by the home page and every sub page.
 * ------------------------------------------------------------------ */

export const navItems = [
  { label: 'Properties', href: '/properties' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Studio', href: '/studio' },
  { label: 'Journal', href: '/journal' },
]

export const filters = [
  { id: 'city', label: 'City', options: ['London', 'Lisbon', 'Oslo', 'Copenhagen', 'Porto'] },
  { id: 'district', label: 'District', options: ['Central', 'Waterfront', 'Old town', 'Northside'] },
  { id: 'rooms', label: 'Rooms', options: ['Studio', '1 bedroom', '2 bedrooms', '3 bedrooms', '4+'] },
  { id: 'price', label: 'Price', options: ['Up to 500k', '500k — 1M', '1M — 2M', '2M and above'] },
]

export type Destination = { place: string; region: string; meta: string; image: PhotoName }

export const destinations: Destination[] = [
  {
    place: 'Beverly Hills',
    region: 'Los Angeles, California',
    meta: '128 homes · from $4.2M',
    image: 'places/white-villa-pool',
  },
  {
    place: 'Møns Klint',
    region: 'Danish highlands, Denmark',
    meta: '46 homes · from €1.1M',
    image: 'places/timber-house-pines',
  },
  {
    place: 'Lake Como',
    region: 'Lombardy, Italy',
    meta: '73 homes · from €2.4M',
    image: 'places/villa-pool-palms',
  },
]

export const marqueeItems = [
  'Residential',
  'Waterfront',
  'Parametric design',
  'Adaptive facades',
  'Interior architecture',
  'Investment advisory',
  'Sustainable structures',
  'Property law',
]

export const stats = [
  {
    value: 1200,
    suffix: '+',
    label: 'Homes matched with new owners',
    copy: 'From harbour studios to family houses, across five European cities since 2008.',
    note: '184 of them in the last twelve months',
  },
  {
    value: 230,
    suffix: '+',
    label: 'Families moved forward with us',
    copy: 'Repeat buyers, second homes and the occasional whole building bought together.',
    note: 'Average relationship: seven years',
  },
  {
    value: 18,
    suffix: '',
    label: 'Years shaping the skyline',
    copy: 'One office in London became five, and the drawing board never left the business.',
    note: 'Founded 2008, still independent',
  },
  {
    value: 96,
    suffix: '%',
    label: 'Clients who come back to us',
    copy: 'They return for the second purchase, the renovation, or to sell when the time is right.',
    note: 'Measured across 2024 and 2025',
  },
]

export const services = [
  {
    icon: KeyRound,
    title: 'Buying',
    copy: 'We shortlist, negotiate and handle the paperwork, so you only see homes worth your weekend.',
    points: ['Off-market access', 'Price benchmarking', 'Contract review'],
  },
  {
    icon: Building2,
    title: 'Developing',
    copy: 'Land assembly, feasibility and planning strategy for schemes between eight and four hundred units.',
    points: ['Feasibility studies', 'Planning strategy', 'Delivery management'],
  },
  {
    icon: Ruler,
    title: 'Designing',
    copy: 'Our architecture studio takes a site from parametric massing to the final door handle.',
    points: ['Concept design', 'Technical drawings', 'Site supervision'],
  },
  {
    icon: Compass,
    title: 'Advising',
    copy: 'Portfolio strategy for owners who think in decades rather than quarters.',
    points: ['Yield modelling', 'Refurbishment plans', 'Exit timing'],
  },
]

export const categories = ['All', 'New builds', 'Waterfront', 'Family', 'Investment']

export type Property = {
  title: string
  city: string
  district: string
  price: string
  monthly: string
  status: string
  category: string
  desc: string
  beds: string
  baths: string
  area: string
  floor: string
  highlights: string[]
  images: PhotoName[]
}

export const properties: Property[] = [
  {
    title: 'Skyline Residence',
    city: 'London',
    district: 'Canary Wharf',
    price: 'from £780,000',
    monthly: '£3,140 / month est.',
    status: 'Ready spring 2026',
    category: 'New builds',
    desc:
      'A twenty-two storey tower with double-height winter gardens, a residents workshop and the river four minutes away on foot.',
    beds: '2 — 4 bedrooms',
    baths: '2 bathrooms',
    area: '96 m² average',
    floor: 'Floors 4 — 22',
    highlights: ['Concierge', 'Winter garden', 'Parking'],
    images: [
      'interiors/clerestory-window-lounge',
      'interiors/neutral-sectional-salon',
      'interiors/teal-accent-lounge',
      'interiors/pendant-lit-dining-room',
    ],
  },
  {
    title: 'Nordic Quarter',
    city: 'Oslo',
    district: 'Grünerløkka',
    price: 'from €520,000',
    monthly: '€2,180 / month est.',
    status: 'Two units left',
    category: 'Family',
    desc:
      'Timber-framed apartments around a planted courtyard, built to passive-house standard with heat recovery in every flat.',
    beds: '1 — 3 bedrooms',
    baths: '1 — 2 bathrooms',
    area: '74 m² average',
    floor: 'Floors 1 — 6',
    highlights: ['Passive house', 'Courtyard', 'Bike store'],
    images: [
      'interiors/herringbone-living-room',
      'interiors/plant-filled-living-room',
      'interiors/grey-family-living-room',
      'interiors/red-armchair-apartment',
    ],
  },
  {
    title: 'Blossom Park',
    city: 'Lisbon',
    district: 'Campo de Ourique',
    price: 'from €410,000',
    monthly: '€1,690 / month est.',
    status: 'Ready to move in',
    category: 'Family',
    desc:
      'A restored 1940s block with original terrazzo, new services throughout and a shared roof terrace over the rooftops.',
    beds: '2 bedrooms',
    baths: '1 bathroom',
    area: '88 m² average',
    floor: 'Floors 1 — 4',
    highlights: ['Roof terrace', 'Restored', 'Lift'],
    images: [
      'interiors/corner-window-lounge',
      'interiors/white-kitchen-dark-splashback',
      'interiors/minimal-navy-sofa-room',
      'interiors/timber-stair-atrium',
    ],
  },
  {
    title: 'Harbour View',
    city: 'Copenhagen',
    district: 'Nordhavn',
    price: 'from €640,000',
    monthly: '€2,610 / month est.',
    status: 'Ready to move in',
    category: 'Waterfront',
    desc:
      'Corner apartments facing the water on two sides, with a swimming platform and the metro at the end of the street.',
    beds: '3 bedrooms',
    baths: '2 bathrooms',
    area: '112 m² average',
    floor: 'Floors 2 — 9',
    highlights: ['Waterfront', 'Metro 3 min', 'Sauna'],
    images: [
      'interiors/yellow-armchair-corner',
      'interiors/concrete-stair-dining',
      'interiors/sage-wall-sofa',
      'interiors/white-tiled-bathroom',
    ],
  },
  {
    title: 'Riverside Lofts',
    city: 'Porto',
    district: 'Massarelos',
    price: 'from €355,000',
    monthly: '€1,450 / month est.',
    status: 'Six units left',
    category: 'Investment',
    desc:
      'Compact lofts in a converted warehouse, let quickly and priced for owners who want the yield without the renovation.',
    beds: 'Studio — 2 bed',
    baths: '1 bathroom',
    area: '68 m² average',
    floor: 'Floors 1 — 3',
    highlights: ['5.4% yield', 'Furnished', 'Managed'],
    images: [
      'interiors/gallery-wall-loft',
      'interiors/brick-loft-dining',
      'interiors/rattan-pendant-lounge',
    ],
  },
  {
    title: 'Atlas Terraces',
    city: 'Casablanca',
    district: 'Anfa',
    price: 'from €290,000',
    monthly: '€1,180 / month est.',
    status: 'Ready autumn 2026',
    category: 'New builds',
    desc:
      'Deep shaded terraces and a parametric screen that keeps the afternoon sun out of every living room in the block.',
    beds: '2 — 3 bedrooms',
    baths: '2 bathrooms',
    area: '104 m² average',
    floor: 'Floors 1 — 8',
    highlights: ['Shaded terrace', 'Pool', 'Parking'],
    images: [
      'interiors/skylight-open-plan-kitchen',
      'interiors/timber-ceiling-terrace',
      'interiors/coffered-ceiling-salon',
    ],
  },
]

export type Venture = {
  tag: string
  title: string
  location: string
  year: string
  image: PhotoName
}

export const ventures: Venture[] = [
  {
    tag: 'Residential',
    title: 'Meridian House',
    location: 'Casablanca',
    year: '2026',
    image: 'architecture/curved-balconies',
  },
  {
    tag: 'Cultural',
    title: 'Azure Pavilion',
    location: 'Rotterdam',
    year: '2025',
    image: 'architecture/round-courtyard',
  },
  {
    tag: 'Workplace',
    title: 'Kobalt Studios',
    location: 'Oslo',
    year: '2025',
    image: 'architecture/layered-block',
  },
  {
    tag: 'Hospitality',
    title: 'Indigo Terrace',
    location: 'Lisbon',
    year: '2024',
    image: 'architecture/office-terrace',
  },
]

export type Slide = {
  index: string
  kicker: string
  title: string
  copy: string
  meta: string
  image: PhotoName
}

export const slides: Slide[] = [
  {
    index: '01',
    kicker: 'Flagship / Cabin 04',
    title: 'Energy independence',
    copy: 'Solar arrays and energy-harvesting systems that return more to the grid than the structure draws across a full year.',
    meta: 'Certified net positive',
    image: 'features/curved-striped-tower',
  },
  {
    index: '02',
    kicker: 'Research / Facade Lab',
    title: 'Adaptive skin',
    copy: 'A parametric envelope that reads sunlight, wind and occupancy, then reshapes itself hour by hour.',
    meta: '38% lower cooling load',
    image: 'features/glass-towers-sky',
  },
  {
    index: '03',
    kicker: 'Civic / Blue Hall',
    title: 'Structures that gather',
    copy: 'Long-span timber and steel shaped around movement, acoustics and the way people actually meet.',
    meta: '2,400 daily visitors',
    image: 'features/architect-drawing-plans',
  },
]

export const amenities = [
  {
    icon: Sun,
    title: 'Daylight first',
    copy: 'Every apartment is modelled for at least four hours of direct winter light before a wall is drawn.',
  },
  {
    icon: Leaf,
    title: 'Low carbon fabric',
    copy: 'Cross-laminated timber cores and recycled aggregate cut embodied carbon by up to 42 per cent.',
  },
  {
    icon: Users,
    title: 'Shared ground',
    copy: 'Courtyards, workshops and roof gardens designed so neighbours actually meet each other.',
  },
  {
    icon: Award,
    title: 'Built to be kept',
    copy: 'Twenty-five year fabric warranty, with a maintenance plan handed over on completion day.',
  },
]

export type GalleryItem = { image: PhotoName; caption: string }

export const gallery: GalleryItem[] = [
  {
    image: 'architecture/louvre-facade',
    caption: 'Structural studies',
  },
  {
    image: 'architecture/terrace-columns',
    caption: 'Light and material',
  },
  {
    image: 'architecture/glass-terraces',
    caption: 'Interior systems',
  },
]

export const processSteps = [
  {
    icon: Search,
    title: 'Listen',
    href: '/services#buying',
    copy: 'We start with the site, the budget and the people who will live with the result every day.',
  },
  {
    icon: Layers,
    title: 'Model',
    href: '/services#developing',
    copy: 'Parametric models let us test hundreds of options before a single line is committed.',
  },
  {
    icon: Ruler,
    title: 'Detail',
    href: '/services#designing',
    copy: 'Materials, joints and tolerances resolved together with the makers who will build them.',
  },
  {
    icon: KeyRound,
    title: 'Deliver',
    href: '/services#advising',
    copy: 'On site until the last handover, then measured across a full year of performance.',
  },
]

export const faqs = [
  {
    question: 'How much does it cost to work with Kondoru?',
    answer:
      'Buyer representation is a flat 1.2 per cent of the purchase price, payable only on completion. Design and development work is quoted per stage, so you always know the number before we start drawing.',
  },
  {
    question: 'Do you work with international buyers?',
    answer:
      'Yes. Around forty per cent of our clients buy from abroad. We handle remote viewings, notary appointments, tax registration and currency timing with partners in each city we operate in.',
  },
  {
    question: 'Can you renovate a property after I buy it?',
    answer:
      'That is what the studio is for. We survey the property before exchange, price the works honestly and can deliver the refurbishment under a single contract with one point of contact.',
  },
  {
    question: 'What happens if a survey finds a problem?',
    answer:
      'We renegotiate or we walk away, and we tell you plainly which one we would do. No commission is worth putting you into a building that will cost you for the next ten years.',
  },
  {
    question: 'How long does a typical purchase take?',
    answer:
      'Nine days on average from first viewing to signed contract, and six to eleven weeks to completion depending on the city and whether finance is involved.',
  },
]

export type TeamMember = {
  name: string
  role: string
  focus: string
  bio: string
  socials: { network: string; href: string }[]
  email: string
  phone: string
  languages: string
  image: PhotoName
}

export const team: TeamMember[] = [
  {
    name: 'Amina Belhaj',
    role: 'Founding partner',
    focus: 'Acquisitions and negotiation',
    bio: 'Started the firm in 2008 after a decade valuing commercial stock. Sits in on every offer above a million and still writes the difficult emails herself.',
    socials: [
      { network: 'LinkedIn', href: 'https://www.linkedin.com/' },
      { network: 'Website', href: 'https://kondoru.com' },
      { network: 'Instagram', href: 'https://www.instagram.com/' },
      { network: 'Email', href: 'mailto:amina@kondoru.com' },
    ],
    email: 'amina@kondoru.com',
    phone: '+44 20 7946 0141',
    languages: 'English · French · Arabic',
    image: 'people/portrait-amina-belhaj',
  },
  {
    name: 'Jonas Vik',
    role: 'Head of acquisitions',
    focus: 'Off-market sourcing, Nordics',
    bio: 'Knows which Oslo and Copenhagen buildings will come up before the agents do, because he has been calling the same owners for eleven years.',
    socials: [
      { network: 'LinkedIn', href: 'https://www.linkedin.com/' },
      { network: 'GitHub', href: 'https://github.com/' },
      { network: 'Email', href: 'mailto:jonas@kondoru.com' },
    ],
    email: 'jonas@kondoru.com',
    phone: '+47 21 08 47 62',
    languages: 'Norwegian · English · Danish',
    image: 'people/portrait-jonas-vik',
  },
  {
    name: 'Clara Mendes',
    role: 'Design director',
    focus: 'Architecture and refurbishment',
    bio: 'Runs the studio side, from parametric massing to the last door handle. Will happily redraw a kitchen four times to save you a wasted metre.',
    socials: [
      { network: 'Instagram', href: 'https://www.instagram.com/' },
      { network: 'Dribbble', href: 'https://dribbble.com/' },
      { network: 'Website', href: 'https://kondoru.com' },
      { network: 'LinkedIn', href: 'https://www.linkedin.com/' },
    ],
    email: 'clara@kondoru.com',
    phone: '+351 213 047 216',
    languages: 'Portuguese · English · Spanish',
    image: 'people/portrait-clara-mendes',
  },
  {
    name: 'Tomas Reiner',
    role: 'Delivery lead',
    focus: 'Site supervision and handover',
    bio: 'On site more than in the office. Keeps the snag list short by catching things while they are still cheap to fix, and calls you the same day.',
    socials: [
      { network: 'GitHub', href: 'https://github.com/' },
      { network: 'Website', href: 'https://kondoru.com' },
    ],
    email: 'tomas@kondoru.com',
    phone: '+45 32 84 17 09',
    languages: 'German · English · Danish',
    image: 'people/portrait-tomas-reiner',
  },
]

export type JournalTeaser = { tag: string; date: string; title: string; image: PhotoName }

export const journal: JournalTeaser[] = [
  {
    tag: 'Market',
    date: '14 August 2026',
    title: 'What the new energy rating rules mean for older apartments',
    image: 'architecture/green-wall-tower',
  },
  {
    tag: 'Design',
    date: '2 August 2026',
    title: 'Five facade details we keep coming back to, and why they work',
    image: 'architecture/louvre-facade',
  },
  {
    tag: 'Guide',
    date: '21 July 2026',
    title: 'Buying from abroad: the eight documents to have ready',
    image: 'architecture/white-block',
  },
]

export type Testimonial = { quote: string; name: string; role: string; avatar: PhotoName }

export const testimonials: Testimonial[] = [
  {
    quote:
      'Their visionary approach turned a difficult site into the most quietly confident building we own. Every detail was argued for, then earned.',
    name: 'Amina Belhaj',
    role: 'Director, Atlas Cultural Trust',
    avatar: 'people/portrait-amina-belhaj',
  },
  {
    quote:
      'We asked for a home that would still feel right in fifteen years. What they found already feels inevitable, calm, generous and remarkably efficient.',
    name: 'Jonas Vik',
    role: 'Owner, Nordic Quarter 12',
    avatar: 'people/portrait-jonas-vik',
  },
  {
    quote:
      'The parametric facade cut our cooling costs by more than a third. Rare design that pays for itself and still stops people in the street.',
    name: 'Clara Mendes',
    role: 'Head of Estates, Indigo Hospitality',
    avatar: 'people/portrait-clara-mendes',
  },
]

