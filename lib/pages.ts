/* ------------------------------------------------------------------ *
 * Mega menu panels and sub page content.
 * ------------------------------------------------------------------ */

import type { PhotoName } from './photos'

export type MegaLink = { label: string; copy: string; href: string }
export type MegaFeature = { title: string; meta: string; image: PhotoName; href: string }
export type MegaPanel = {
  title: string
  copy: string
  cta: { label: string; href: string }
  links: MegaLink[]
  features: MegaFeature[]
}

export const megaMenu: Record<string, MegaPanel> = {
  Properties: {
    title: 'Homes on the books',
    copy: 'Eighty-four listings across five cities, with the survey done before you ever see them.',
    cta: { label: 'Browse all listings', href: '/properties' },
    links: [
      { label: 'New builds', copy: 'Completing 2026 and 2027', href: '/properties#new-builds' },
      { label: 'Waterfront', copy: 'Harbour and lakeside homes', href: '/properties#waterfront' },
      { label: 'Family homes', copy: 'Two bedrooms and up', href: '/properties#family' },
      { label: 'Investment', copy: 'Let-ready, yield modelled', href: '/properties#investment' },
    ],
    features: [
      {
        title: 'Skyline Residence',
        meta: 'London · from £780,000',
        image: 'architecture/white-block',
        href: '/properties/skyline-residence',
      },
      {
        title: 'Harbour View',
        meta: 'Copenhagen · from €640,000',
        image: 'architecture/curved-balconies',
        href: '/properties/harbour-view',
      },
    ],
  },
  Services: {
    title: 'Four ways we work',
    copy: 'Buying, developing, designing and advising. Priced separately, never bundled.',
    cta: { label: 'Compare all services', href: '/services' },
    links: [
      { label: 'Buying', copy: 'Search, negotiate, complete', href: '/services#buying' },
      { label: 'Developing', copy: 'Feasibility to handover', href: '/services#developing' },
      { label: 'Designing', copy: 'Architecture and interiors', href: '/services#designing' },
      { label: 'Advising', copy: 'Portfolio and exit strategy', href: '/services#advising' },
    ],
    features: [
      {
        title: 'Buyer representation',
        meta: '1.2% on completion only',
        image: 'architecture/glass-terraces',
        href: '/services#buying',
      },
      {
        title: 'Studio commissions',
        meta: 'Quoted per stage',
        image: 'architecture/green-campus',
        href: '/services#designing',
      },
    ],
  },
  Projects: {
    title: 'Built and building',
    copy: 'Residential, cultural, workplace and hospitality work from the last four years.',
    cta: { label: 'See every project', href: '/projects' },
    links: [
      { label: 'Residential', copy: 'Houses and apartment blocks', href: '/projects#residential' },
      { label: 'Cultural', copy: 'Pavilions and civic halls', href: '/projects#cultural' },
      { label: 'Workplace', copy: 'Studios and headquarters', href: '/projects#workplace' },
      { label: 'Research', copy: 'Facade lab and prototypes', href: '/projects#research' },
    ],
    features: [
      {
        title: 'Meridian House',
        meta: 'Casablanca · 2026',
        image: 'architecture/curved-balconies',
        href: '/projects',
      },
      {
        title: 'Azure Pavilion',
        meta: 'Rotterdam · 2025',
        image: 'architecture/round-courtyard',
        href: '/projects',
      },
    ],
  },
  Studio: {
    title: 'Who you actually work with',
    copy: 'Eighteen years, four partners, one office that became five.',
    cta: { label: 'Meet the studio', href: '/studio' },
    links: [
      { label: 'Our people', copy: 'The four you will meet', href: '/studio#people' },
      { label: 'Standards', copy: 'What every building earns', href: '/studio#standards' },
      { label: 'How we work', copy: 'Listen, model, detail, deliver', href: '/studio#process' },
      { label: 'Awards', copy: 'Twelve, and one we lost', href: '/studio#awards' },
    ],
    features: [
      {
        title: 'Inside the studio',
        meta: 'London E1',
        image: 'architecture/layered-block',
        href: '/studio#people',
      },
      {
        title: 'Our standards',
        meta: 'Four non-negotiables',
        image: 'architecture/twin-towers',
        href: '/studio#standards',
      },
    ],
  },
  Journal: {
    title: 'Notes worth reading',
    copy: 'Market movements, drawing board detail and the guides we send clients anyway.',
    cta: { label: 'Read every article', href: '/journal/all' },
    links: [
      { label: 'Market', copy: 'Prices, rates and rules', href: '/journal/all#market' },
      { label: 'Design', copy: 'Details we keep reusing', href: '/journal/all#design' },
      { label: 'Guides', copy: 'Buying, abroad and at home', href: '/journal/all#guide' },
      { label: 'Studio news', copy: 'Completions and arrivals', href: '/journal/all#studio-news' },
    ],
    features: [
      {
        title: 'Energy rating rules',
        meta: '14 August 2026',
        image: 'architecture/green-wall-tower',
        href: '/journal',
      },
      {
        title: 'Buying from abroad',
        meta: '21 July 2026',
        image: 'architecture/white-block',
        href: '/journal',
      },
    ],
  },
}

/* ------------------------------------------------------------------ *
 * Services page
 * ------------------------------------------------------------------ */

export const serviceDetail = [
  {
    id: 'buying',
    name: 'Buying',
    price: '1.2% of the purchase price, payable on completion',
    lead: 'Full buyer representation, from the first shortlist to the day the keys change hands.',
    copy: 'We take the brief, map it against what is actually available, and go and knock on doors for the rest. You see six homes worth seeing instead of thirty that waste a Saturday. Every one is priced against comparable sales, surveyed before exchange, and negotiated with the numbers in front of us.',
    includes: [
      'Off-market sourcing through owners we already know',
      'Independent valuation and price benchmarking',
      'Structural survey read and explained line by line',
      'Negotiation, contract review and completion management',
    ],
    timeline: 'Nine days average to offer, six to eleven weeks to completion',
  },
  {
    id: 'developing',
    name: 'Developing',
    price: 'Quoted per stage, typically 4 — 6% of build cost',
    lead: 'Land assembly, feasibility and delivery for schemes between eight and four hundred units.',
    copy: 'We test what a site can carry before you commit to it: massing, daylight, unit mix, planning risk and a build cost a contractor will stand behind. If the numbers do not work you hear it in week two, not month six.',
    includes: [
      'Site appraisal, massing studies and unit mix modelling',
      'Planning strategy and pre-application meetings',
      'Cost planning with two independent contractors',
      'Delivery management through to practical completion',
    ],
    timeline: 'Feasibility in four weeks, planning six to nine months',
  },
  {
    id: 'designing',
    name: 'Designing',
    price: 'Quoted per stage, from £14,000 for a full apartment',
    lead: 'The studio side: architecture, interiors and every detail down to the door handle.',
    copy: 'Parametric massing where it earns its keep and hand drawings where it does not. We model daylight, acoustics and airflow before the plan is fixed, then detail the joints with the makers who will build them, so nothing gets value-engineered into mediocrity on site.',
    includes: [
      'Concept design and parametric option testing',
      'Technical drawings and full specification',
      'Contractor tendering and comparison',
      'Site supervision through to snagging',
    ],
    timeline: 'Concept in three weeks, technical package in ten',
  },
  {
    id: 'advising',
    name: 'Advising',
    price: 'Day rate or annual retainer',
    lead: 'Portfolio strategy for owners who think in decades rather than quarters.',
    copy: 'What to hold, what to refurbish, what to sell and when. We model yield after realistic maintenance rather than brochure figures, and we will tell you when the honest answer is to do nothing this year.',
    includes: [
      'Yield and total-return modelling per asset',
      'Refurbishment appraisals with real build costs',
      'Energy compliance and retrofit planning',
      'Exit timing and disposal strategy',
    ],
    timeline: 'First portfolio review inside three weeks',
  },
]

/* ------------------------------------------------------------------ *
 * Projects page
 * ------------------------------------------------------------------ */

export type Project = {
  id: string
  name: string
  category: string
  place: string
  year: string
  size: string
  copy: string
  facts: string[]
  image: PhotoName
}

export const projectDetail: Project[] = [
  {
    id: 'meridian-house',
    name: 'Meridian House',
    category: 'Residential',
    place: 'Casablanca, Morocco',
    year: '2026',
    size: '42 apartments · 5,600 m²',
    copy: 'A shaded courtyard block where every apartment gets cross ventilation and a deep loggia that keeps the afternoon sun off the glass.',
    facts: ['42 apartments', 'Net positive energy', 'Completing spring 2026'],
    image: 'architecture/curved-balconies',
  },
  {
    id: 'azure-pavilion',
    name: 'Azure Pavilion',
    category: 'Cultural',
    place: 'Rotterdam, Netherlands',
    year: '2025',
    size: 'Public pavilion · 900 m²',
    copy: 'A long-span timber roof over a room that can be a market on Tuesday and a concert hall on Friday, tuned for both.',
    facts: ['2,400 daily visitors', 'Cross-laminated timber', 'RIBA shortlisted'],
    image: 'architecture/round-courtyard',
  },
  {
    id: 'kobalt-studios',
    name: 'Kobalt Studios',
    category: 'Workplace',
    place: 'Oslo, Norway',
    year: '2025',
    size: 'Headquarters · 3,100 m²',
    copy: 'A workplace built around a single stair wide enough to sit on, because that is where the company actually talks to itself.',
    facts: ['210 desks', '38% lower cooling load', 'BREEAM Excellent'],
    image: 'architecture/layered-block',
  },
  {
    id: 'indigo-terrace',
    name: 'Indigo Terrace',
    category: 'Hospitality',
    place: 'Lisbon, Portugal',
    year: '2024',
    size: '28 keys · 2,400 m²',
    copy: 'A hotel stitched into three existing buildings, keeping the terrazzo and the awkward level changes that make it feel like Lisbon.',
    facts: ['28 keys', 'Three buildings joined', 'Original terrazzo kept'],
    image: 'architecture/office-terrace',
  },
  {
    id: 'facade-lab',
    name: 'Facade Lab',
    category: 'Research',
    place: 'In-house programme',
    year: 'Ongoing',
    size: 'Prototype rig · 40 m²',
    copy: 'A full-height test rig where adaptive shading is measured across a real year before it goes anywhere near a client building.',
    facts: ['Four prototypes built', 'Data published yearly', 'Open to students'],
    image: 'architecture/planted-tower',
  },
  {
    id: 'blue-hall',
    name: 'Blue Hall',
    category: 'Cultural',
    place: 'Aarhus, Denmark',
    year: '2024',
    size: 'Civic hall · 1,800 m²',
    copy: 'Steel and timber shaped around movement and acoustics, with a foyer that stays useful when nothing is on.',
    facts: ['600 seats', 'Reverberation 1.4s', 'Community managed'],
    image: 'architecture/green-campus',
  },
]

/* ------------------------------------------------------------------ *
 * Studio page
 * ------------------------------------------------------------------ */

export const studioValues = [
  {
    title: 'We say the number early',
    copy: 'A realistic cost in week two is worth more than an optimistic one in month six. If a scheme does not work, you hear it while it is still cheap to change.',
  },
  {
    title: 'We stay past handover',
    copy: 'Every completed building is measured for a full year: energy, comfort, acoustics. The results go into the next design whether they flatter us or not.',
  },
  {
    title: 'We keep the drawing board',
    copy: 'The studio never became a pure agency. Someone in the room can always draw the thing being argued about, which shortens most arguments considerably.',
  },
]

export const awards = [
  { year: '2026', name: 'RIBA regional shortlist', project: 'Azure Pavilion' },
  { year: '2025', name: 'Nordic Timber Prize', project: 'Kobalt Studios' },
  { year: '2025', name: 'BREEAM Excellent', project: 'Kobalt Studios' },
  { year: '2024', name: 'Lisbon Heritage Award', project: 'Indigo Terrace' },
  { year: '2024', name: 'Civic Trust commendation', project: 'Blue Hall' },
  { year: '2023', name: 'Low Carbon Fabric Prize', project: 'Facade Lab' },
]

export const officeList = [
  { city: 'London', address: '12 Harbour Walk, E1', phone: '+44 20 0000 0000', since: '2008' },
  { city: 'Lisbon', address: 'Rua do Século 44', phone: '+351 000 000 000', since: '2016' },
  { city: 'Oslo', address: 'Thorvald Meyers gate 8', phone: '+47 00 00 00 00', since: '2019' },
  { city: 'Copenhagen', address: 'Sundkaj 21, Nordhavn', phone: '+45 00 00 00 00', since: '2022' },
  { city: 'Porto', address: 'Rua de Miguel Bombarda 12', phone: '+351 000 000 001', since: '2024' },
]

/* ------------------------------------------------------------------ *
 * Journal page
 * ------------------------------------------------------------------ */

export type Article = {
  id: string
  tag: string
  date: string
  read: string
  title: string
  excerpt: string
  image: PhotoName
}

export const journalArticles: Article[] = [
  {
    id: 'energy-rating-rules',
    tag: 'Market',
    date: '14 August 2026',
    read: '6 min read',
    title: 'What the new energy rating rules mean for older apartments',
    excerpt:
      'From January the minimum rating moves again, and pre-1970 blocks carry most of the risk. Here is what it costs to fix, and what it costs to ignore.',
    image: 'architecture/green-wall-tower',
  },
  {
    id: 'facade-details',
    tag: 'Design',
    date: '2 August 2026',
    read: '8 min read',
    title: 'Five facade details we keep coming back to, and why they work',
    excerpt:
      'A deep reveal, a drip that actually drips, and three more details that survive contact with a real construction programme.',
    image: 'architecture/louvre-facade',
  },
  {
    id: 'buying-from-abroad',
    tag: 'Guide',
    date: '21 July 2026',
    read: '5 min read',
    title: 'Buying from abroad: the eight documents to have ready',
    excerpt:
      'Notary appointments fall over for boring reasons. Get these eight things into a folder before you fly and the rest is straightforward.',
    image: 'architecture/white-block',
  },
  {
    id: 'courtyard-blocks',
    tag: 'Design',
    date: '28 June 2026',
    read: '7 min read',
    title: 'Why we keep drawing courtyard blocks in hot cities',
    excerpt:
      'Shade, cross ventilation and somewhere to meet a neighbour. The oldest plan in the book still outperforms the tower on most measures that matter.',
    image: 'architecture/atrium-garden',
  },
  {
    id: 'survey-walkaway',
    tag: 'Guide',
    date: '9 June 2026',
    read: '4 min read',
    title: 'The four survey findings that make us walk away',
    excerpt:
      'Most problems are a price negotiation. These four are not, and no commission is worth putting a client into them.',
    image: 'architecture/vertical-forest',
  },
  {
    id: 'studio-news',
    tag: 'Studio news',
    date: '30 May 2026',
    read: '3 min read',
    title: 'Blue Hall opens, and two arrivals in the Oslo office',
    excerpt:
      'A civic hall handed over on time, plus the two people now running our Nordic sourcing desk.',
    image: 'architecture/round-courtyard',
  },
  {
    id: 'how-buying-works',
    tag: 'Guide',
    date: '22 May 2026',
    read: '9 min read',
    title: 'How buying works, from first viewing to the day you hold keys',
    excerpt:
      'The whole process in eleven steps, with the four points where it usually stalls and what it costs to unstick each one.',
    image: 'architecture/white-block',
  },
  {
    id: 'green-facades-maintenance',
    tag: 'Design',
    date: '11 May 2026',
    read: '7 min read',
    title: 'Green facades are not free: what planting actually costs to keep',
    excerpt:
      'Irrigation, replanting cycles and the two failure modes nobody budgets for. We priced twelve years of upkeep on four of our own buildings.',
    image: 'architecture/vertical-forest',
  },
  {
    id: 'service-charge-red-flags',
    tag: 'Market',
    date: '28 April 2026',
    read: '6 min read',
    title: 'Six service charge red flags we check before making an offer',
    excerpt:
      'A low charge today can mean a deferred bill tomorrow. Here is what we read in the accounts, and the questions that get honest answers.',
    image: 'architecture/layered-block',
  },
  {
    id: 'timber-cores',
    tag: 'Design',
    date: '14 April 2026',
    read: '8 min read',
    title: 'Where timber cores work, and the three places they still do not',
    excerpt:
      'Cross-laminated timber saves carbon and programme, but fire strategy, acoustics and insurance all have opinions. What we have learned on six schemes.',
    image: 'architecture/timber-corner',
  },
  {
    id: 'off-plan-risk',
    tag: 'Guide',
    date: '2 April 2026',
    read: '6 min read',
    title: 'Buying off-plan without carrying the developer’s risk',
    excerpt:
      'Staged payments, escrow, completion dates that mean something, and the two clauses we will not sign a reservation without.',
    image: 'architecture/glass-terraces',
  },
  {
    id: 'daylight-modelling',
    tag: 'Design',
    date: '19 March 2026',
    read: '7 min read',
    title: 'What a year of daylight sensors told us about our own models',
    excerpt:
      'We predicted the light in 240 apartments, then measured it for twelve months. We were within eleven per cent, and the misses were all in one direction.',
    image: 'architecture/atrium-garden',
  },
  {
    id: 'rates-and-rents',
    tag: 'Market',
    date: '5 March 2026',
    read: '5 min read',
    title: 'Rates, rents and the gap that keeps refusing to close',
    excerpt:
      'Yields look healthy on paper in four of our five cities. Here is where that number comes from, and why we discount it in two of them.',
    image: 'architecture/twin-towers',
  },
  {
    id: 'oslo-studio-open',
    tag: 'Studio news',
    date: '20 February 2026',
    read: '3 min read',
    title: 'The Oslo studio is open, and the facade lab moved with it',
    excerpt:
      'Nine people, a full-height mock-up rig and a standing invitation to come and break our details before a client does.',
    image: 'architecture/office-terrace',
  },
  {
    id: 'renovation-survey',
    tag: 'Guide',
    date: '6 February 2026',
    read: '6 min read',
    title: 'Renovating a period flat: what the survey will not tell you',
    excerpt:
      'Surveys cover condition, not consent. The permissions, party walls and building control questions that decide whether the plan is even legal.',
    image: 'architecture/planted-tower',
  },
  {
    id: 'courtyard-heat',
    tag: 'Market',
    date: '22 January 2026',
    read: '7 min read',
    title: 'The cities where cooling cost is starting to move prices',
    excerpt:
      'Summer running costs are now a line in the valuation in three of the markets we buy in. Shading and orientation have quietly become a price factor.',
    image: 'architecture/terrace-columns',
  },
  {
    id: 'handover-checklist',
    tag: 'Studio news',
    date: '9 January 2026',
    read: '4 min read',
    title: 'We published our handover checklist, all forty pages of it',
    excerpt:
      'The document we walk every completion with, including the snags we now catch before the client ever sees them.',
    image: 'architecture/green-campus',
  },
]

/* ------------------------------------------------------------------ *
 * Inside the work — the three measured claims, each with its own page
 * ------------------------------------------------------------------ */

export type Insight = {
  slug: string
  value: number
  suffix: string
  title: string
  card: string
  lead: string
  image: PhotoName
  facts: { label: string; value: string }[]
  body: string[]
}

export const insights: Insight[] = [
  {
    slug: 'embodied-carbon',
    value: 42,
    suffix: '%',
    title: 'Less embodied carbon',
    card: 'Measured against the code baseline for the same brief, on the last six completed schemes.',
    lead: 'Cutting embodied carbon by 42 per cent without pushing the build cost past what a normal client will pay.',
    image: 'architecture/green-campus',
    facts: [
      { label: 'Baseline', value: 'Building regs, same brief' },
      { label: 'Measured on', value: 'Six completed schemes' },
      { label: 'Published', value: 'Annually, in full' },
    ],
    body: [
      'The figure comes from a whole-life carbon assessment run twice: once on a compliant version of the same brief, and once on what we actually built. Both use the same assumptions, the same transport distances and the same end-of-life scenarios, because a saving that only exists because you changed the spreadsheet is not a saving.',
      'Most of the reduction is structural. Cross-laminated timber cores where the fire strategy allows it, recycled aggregate in everything below ground, and a frame designed around fewer, larger spans so there is simply less material in the building. None of it is exotic, and all of it is available from suppliers who will quote you a real price this quarter.',
      'The rest comes from what we did not do. Not over-glazing the south face and then air conditioning the consequences. Not specifying an imported stone when a local one performs the same. Not demolishing a slab that had another forty years in it.',
      'We publish the assessments whether they flatter us or not. One scheme came in at nine per cent because the ground conditions forced a piled raft, and that number is in the same report as the ones we are proud of.',
    ],
  },
  {
    slug: 'winter-daylight',
    value: 4,
    suffix: ' hours',
    title: 'Minimum winter daylight',
    card: 'Every apartment is modelled for direct light on the shortest days before a single wall is fixed.',
    lead: 'Four hours of direct winter light in every apartment, modelled before the plan is frozen rather than checked after.',
    image: 'architecture/twin-towers',
    facts: [
      { label: 'Tested at', value: 'Winter solstice' },
      { label: 'Applies to', value: 'Every apartment, not the average' },
      { label: 'Tool', value: 'Climate-based daylight modelling' },
    ],
    body: [
      'Daylight rules are usually applied as an average across a scheme, which lets a developer sell twenty dark flats as long as the penthouses are bright. We model each apartment individually at the winter solstice, and if one fails, the plan changes.',
      'In practice this decides the massing early. It is why our courtyard blocks are wider than they need to be, why the single-aspect flats sit on the ends rather than the middle, and why we lose a unit or two on most schemes. That is the cost, and we put it in the feasibility so nobody is surprised in month six.',
      'The modelling is climate-based, using real weather files for the city rather than an idealised sky, so a Copenhagen scheme is judged against Copenhagen light and a Casablanca one is judged on how much light we need to keep out.',
      'After handover we go back with sensors for a year. Measured against the model, we have been within eleven per cent on every scheme so far, which is close enough to keep trusting the method.',
    ],
  },
  {
    slug: 'fabric-warranty',
    value: 25,
    suffix: ' years',
    title: 'Fabric warranty',
    card: 'Handed over on completion day, with a maintenance plan that tells you what to do and when.',
    lead: 'A twenty-five year warranty on the building fabric, and the maintenance plan that makes it honest.',
    image: 'architecture/timber-corner',
    facts: [
      { label: 'Covers', value: 'Structure, envelope, roof' },
      { label: 'Starts', value: 'Practical completion' },
      { label: 'Includes', value: 'Year-one performance review' },
    ],
    body: [
      'A long warranty is easy to offer and hard to honour, so it is worth saying exactly what it covers: structure, envelope, roof and the junctions between them. Not appliances, not finishes, not anything a tenant can reasonably wear out.',
      'It only works because the detailing is resolved with the people who build it. The joints that fail in year eight are almost always the ones drawn generically and improvised on site, so we draw them specifically and we are there when they go in.',
      'Every handover comes with a maintenance plan written for the person who will actually do it: what to check, how often, and which two things will cost you money if you ignore them. It is four pages, not forty, because nobody reads forty.',
      'At twelve months we come back, measure performance, and fix what the first winter exposed. That visit is in the contract, not a favour.',
    ],
  },
]
