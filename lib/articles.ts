/* ------------------------------------------------------------------ *
 * Journal article bodies, keyed by the article id in lib/pages.ts.
 * Each one: a lead, three short sections, and sometimes a checklist.
 * ------------------------------------------------------------------ */

export type ArticleBody = {
  lead: string
  sections: { heading: string; paragraphs: string[] }[]
  checklist?: { title: string; items: string[] }
}

export const articleBodies: Record<string, ArticleBody> = {
  'energy-rating-rules': {
    lead: 'From January the minimum energy rating for a home that is let or sold moves up one band. Blocks built before 1970 carry most of the exposure, and the cost of fixing them is easier to plan than most owners assume.',
    sections: [
      {
        heading: 'What actually changes',
        paragraphs: [
          'A flat rated F or G can still be sold, but it can no longer be let on a new tenancy until it reaches E, and lenders have started pricing the gap into their valuations. In two of our cities the same step applies to commercial units on the ground floor of residential blocks.',
          'The rating is assessed per flat, but most of what moves it sits in the shared fabric: the roof, the windows on the stair, the boiler in the basement. That is why the conversation has to happen at building level.',
        ],
      },
      {
        heading: 'What it costs to fix',
        paragraphs: [
          'Across forty pre-1970 flats we surveyed this year, the median cost to move up one band was €9,800, with secondary glazing, loft insulation and heating controls doing most of the work. Two bands cost on average three times as much, because it usually means the walls.',
        ],
      },
      {
        heading: 'What it costs to ignore',
        paragraphs: [
          'Where buyers can see the rating, F and G flats are already selling at a six to nine per cent discount to comparable E-rated stock. The discount is larger than the fix in most of the cases we looked at.',
        ],
      },
    ],
    checklist: {
      title: 'Before you buy an older flat',
      items: [
        'Ask for the current certificate and the date it was issued',
        'Ask the managing agent what the building has planned for the roof and heating',
        'Price one band of improvement into your offer, not two',
      ],
    },
  },
  'facade-details': {
    lead: 'Most facade failures are not design failures; they are details that looked fine in a drawing and could not be built in the rain. These five survive a real construction programme.',
    sections: [
      {
        heading: 'A deep reveal and a drip that drips',
        paragraphs: [
          'A window set back at least 120 mm keeps rain off the frame and casts the shadow that makes a plain wall look considered. Under every sill we draw a drip with a 10 mm throat, so water leaves the building instead of running down it.',
        ],
      },
      {
        heading: 'Panels you can replace one at a time',
        paragraphs: [
          'Every rainscreen panel on our recent schemes can be lifted off without disturbing its neighbours. It costs a little more in brackets and saves a scaffold when one is damaged.',
          'Ventilated cavities behind timber and terracotta mean the material dries out between storms, which is most of what decides how long it lasts.',
        ],
      },
      {
        heading: 'Movement joints where they will be seen',
        paragraphs: [
          'We stopped hiding movement joints and started placing them on the grid of the windows. They are honest, they line up, and the sealant can be replaced without guessing where it is.',
        ],
      },
    ],
  },
  'buying-from-abroad': {
    lead: 'Around forty per cent of our clients buy from another country. When a notary appointment falls over, it is almost always for a boring reason that a folder of eight documents would have prevented.',
    sections: [
      {
        heading: 'Why appointments fall over',
        paragraphs: [
          'Notaries need to identify you, know where the money came from, and register you for local tax. Each of those can take weeks if it starts the day you land. None of them needs you to be in the country if you start early.',
        ],
      },
      {
        heading: 'Power of attorney, or flying in',
        paragraphs: [
          'Most clients sign a limited power of attorney so a lawyer can complete for them. It has to be notarised and apostilled where you live, which takes about ten days, and it should name the property and the price range so nobody can use it for anything else.',
        ],
      },
      {
        heading: 'Moving the money',
        paragraphs: [
          'A forward contract fixes your exchange rate for the completion date. On a €700,000 purchase a two per cent swing is €14,000, which is more than most of the fees in the transaction put together.',
        ],
      },
    ],
    checklist: {
      title: 'The eight documents',
      items: [
        'Passport, valid for at least six months',
        'Local tax number for the country you are buying in',
        'Proof of address, less than three months old',
        'Proof of funds and where they came from',
        'Mortgage offer, if you are borrowing',
        'Power of attorney, notarised and apostilled',
        'Marriage certificate or prenuptial agreement, if relevant',
        'A local bank account for the completion transfer',
      ],
    },
  },
  'courtyard-blocks': {
    lead: 'Shade, cross ventilation and somewhere to meet a neighbour. The oldest plan in the book still beats the tower on most of the measures that matter in a hot city.',
    sections: [
      {
        heading: 'Cooler without machines',
        paragraphs: [
          'A courtyard four storeys deep stays in shade for most of a summer day. On our Lisbon scheme the air in the courtyard runs three to four degrees below the street in the afternoon, and every flat can open windows on two sides.',
        ],
      },
      {
        heading: 'Density without height',
        paragraphs: [
          'A six-storey perimeter block reaches the same number of homes per hectare as a tower twice its height, with shorter lifts, fewer fire stairs and a lower cost per square metre.',
        ],
      },
      {
        heading: 'The one shared room',
        paragraphs: [
          'Residents in our courtyard buildings report knowing three times as many neighbours by name as those in our slab blocks. The courtyard is the reason: everyone crosses it.',
        ],
      },
    ],
  },
  'survey-walkaway': {
    lead: 'Most problems a survey finds are a price negotiation. These four are not, and no commission is worth putting a client into them.',
    sections: [
      {
        heading: 'Movement that is still moving',
        paragraphs: [
          'Old cracks are history. Cracks that have widened since the last decoration, doors that have started to stick and floors that slope towards one corner mean the ground is still settling. We walk away until an engineer has monitored it for a year.',
        ],
      },
      {
        heading: 'Water nobody can explain',
        paragraphs: [
          'Damp with an obvious source can be fixed. Damp that the seller, the agent and the surveyor all describe differently usually means a building-wide problem, and the bill arrives through the service charge.',
        ],
      },
      {
        heading: 'Work without permission, and a lease that is running out',
        paragraphs: [
          'Removed walls and extensions without sign-off can force a reinstatement order. A lease under eighty years makes the flat hard to mortgage and expensive to extend. Either one ends the conversation unless the seller fixes it before exchange.',
        ],
      },
    ],
  },
  'studio-news': {
    lead: 'Blue Hall opened to the public on the day we promised it would, and the Oslo office has two new faces running the Nordic sourcing desk.',
    sections: [
      {
        heading: 'Blue Hall is open',
        paragraphs: [
          'The civic hall seats 640 under a long-span timber roof, with a foyer that stays open as a covered square when there is no event. It was handed over on budget and four days early, and 2,400 people came through on the first weekend.',
        ],
      },
      {
        heading: 'Two arrivals in Oslo',
        paragraphs: [
          'Ingrid and Mats join from a Bergen developer and a Copenhagen lettings agency. Between them they speak four languages and have walked most of the buildings on our Nordic shortlist already.',
        ],
      },
      {
        heading: 'What it means for clients',
        paragraphs: [
          'Buyers looking in Norway and Denmark now have a team on the ground in both cities, and off-market introductions in the region come to us a week or two earlier than before.',
        ],
      },
    ],
  },
  'how-buying-works': {
    lead: 'The whole purchase in eleven steps, from the first viewing to the day you hold keys, with the four points where it usually stalls and what it costs to unstick each one.',
    sections: [
      {
        heading: 'Weeks one to three: deciding',
        paragraphs: [
          'Brief, shortlist, viewings and a survey on the one you like. Most clients see six to nine homes. The survey comes before the offer, not after, so the price you offer already includes what needs fixing.',
        ],
      },
      {
        heading: 'Weeks three to eight: agreeing',
        paragraphs: [
          'Offer, negotiation, reservation and the legal checks. This is where purchases stall: a missing permission, a slow lender, a seller who changes their mind, or a chain above them. We price each of those before you commit.',
        ],
      },
      {
        heading: 'Weeks eight to eleven: completing',
        paragraphs: [
          'Exchange, the final transfer, completion and keys. On the day you collect them we walk the flat with you against the inventory, so anything missing is the seller’s problem, not yours.',
        ],
      },
    ],
    checklist: {
      title: 'The four usual stalls',
      items: [
        'Planning or building sign-off missing for past work',
        'The lender’s valuation coming in below the price',
        'A chain above the seller that has not found a home',
        'Service charge accounts that nobody can produce',
      ],
    },
  },
  'green-facades-maintenance': {
    lead: 'Planted facades photograph beautifully and save carbon, but they are a living system with a running cost. We priced twelve years of upkeep on four of our own buildings.',
    sections: [
      {
        heading: 'What it costs a year',
        paragraphs: [
          'Across the four buildings, irrigation, inspection and replanting averaged €38 per square metre of planted facade per year. A rope-access visit twice a year is the largest single line.',
        ],
      },
      {
        heading: 'The two failures nobody budgets for',
        paragraphs: [
          'A blocked irrigation line can kill a whole bay in a hot week. Plants chosen for the nursery rather than the orientation fail slowly on north faces. Both are avoidable with sensors and a planting plan per elevation.',
        ],
      },
      {
        heading: 'Is it worth it',
        paragraphs: [
          'On three of the four, yes: lower summer surface temperatures, better acoustic damping and a measurable premium on resale. The fourth faces a busy road, and we would not plant it again.',
        ],
      },
    ],
  },
  'service-charge-red-flags': {
    lead: 'A low service charge today can mean a large bill tomorrow. These are the six things we read in the accounts before we let a client make an offer.',
    sections: [
      {
        heading: 'The reserve fund',
        paragraphs: [
          'A healthy building puts money aside every year for the roof, the lifts and the facade. A reserve fund that is empty or has not grown in three years means the next major repair arrives as a one-off demand.',
        ],
      },
      {
        heading: 'Charges that jump, and works that keep slipping',
        paragraphs: [
          'A charge that rose more than fifteen per cent in a year, or a roof repair that appears in three years of minutes without being done, both point at the same thing: the building is behind.',
        ],
      },
      {
        heading: 'Disputes and missing paperwork',
        paragraphs: [
          'Arrears among owners, a running dispute with the managing agent, or accounts that cannot be produced within a week. Any of these and we ask for a retention on the price.',
        ],
      },
    ],
  },
  'timber-cores': {
    lead: 'Cross-laminated timber saves carbon and weeks on site, but fire strategy, acoustics and insurance all have opinions. This is what six schemes taught us.',
    sections: [
      {
        heading: 'Where it works',
        paragraphs: [
          'Up to around eight storeys, on a regular grid, with a client who will commit to the design early. On those schemes timber cut the frame programme by a third and embodied carbon by roughly forty per cent.',
        ],
      },
      {
        heading: 'Where it still does not',
        paragraphs: [
          'Tall buildings where the fire engineer wants a concrete core, sites where floors carry heavy plant, and projects where the insurer has not seen timber before and prices it accordingly.',
        ],
      },
      {
        heading: 'What we do now',
        paragraphs: [
          'A hybrid: concrete cores and stairs, timber floors and walls everywhere else. It answers the fire and insurance questions and keeps most of the carbon saving.',
        ],
      },
    ],
  },
  'off-plan-risk': {
    lead: 'Buying a home that is not built yet can be the best price you will see, or the most expensive mistake you make. The difference is in four clauses and where the money sits.',
    sections: [
      {
        heading: 'Where your deposit lives',
        paragraphs: [
          'Deposits should sit in escrow or behind a bank guarantee until completion, never in the developer’s operating account. If the contract does not say which, we do not sign.',
        ],
      },
      {
        heading: 'A completion date that means something',
        paragraphs: [
          'A long-stop date, after which you can walk away with your deposit, turns the developer’s estimate into a promise. Without one, a delay is your problem.',
        ],
      },
      {
        heading: 'Specification and snagging',
        paragraphs: [
          'The specification attached to the contract is the one you get. A clause allowing "equivalent" substitutions should name what counts as equivalent, and snagging should be fixed within a set number of days.',
        ],
      },
    ],
  },
  'daylight-modelling': {
    lead: 'We predicted the light in 240 apartments, then measured it with sensors for twelve months. We were within eleven per cent, and every miss went the same way.',
    sections: [
      {
        heading: 'What we measured',
        paragraphs: [
          'Sensors at desk height in the main living room of each flat logged light levels every ten minutes. We compared the winter months against the model we used to design the windows.',
        ],
      },
      {
        heading: 'Why the misses went one way',
        paragraphs: [
          'Real rooms are darker than modelled rooms. Curtains, furniture, and glass that is never as clean as the specification all take light away. The model was optimistic in every flat that missed.',
        ],
      },
      {
        heading: 'What we changed',
        paragraphs: [
          'We now design to a target fifteen per cent above the standard, so the room that is actually lived in still meets it. It added one window size up on about a third of our layouts.',
        ],
      },
    ],
  },
  'rates-and-rents': {
    lead: 'Rental yields look healthy on paper in four of our five cities. Here is where the headline number comes from, and why we discount it in two of them.',
    sections: [
      {
        heading: 'Gross is not net',
        paragraphs: [
          'Headline yields are gross: rent divided by price. Service charges, management, voids and repairs take one and a half to two and a half points off, depending on the building.',
        ],
      },
      {
        heading: 'Where we discount',
        paragraphs: [
          'In Lisbon and Porto, short-let restrictions mean the rents quoted in older listings are no longer achievable on new tenancies. We model long lets only, which brings the yield down by about a point.',
        ],
      },
      {
        heading: 'The gap with mortgage rates',
        paragraphs: [
          'With borrowing still above net yields in three cities, buying to let only works with a large deposit or a long view on capital growth. We say so before anyone signs.',
        ],
      },
    ],
  },
  'oslo-studio-open': {
    lead: 'The Oslo team has a new studio on the waterfront, and the facade lab moved in with it: nine people, a full-height mock-up rig and an open invitation to come and break our details.',
    sections: [
      {
        heading: 'Why a bigger studio',
        paragraphs: [
          'A third of our timber work is now in Norway and Denmark, and the office we opened in 2019 had run out of room. Testing a detail in the climate it will live in has already saved us two redesigns.',
        ],
      },
      {
        heading: 'The facade lab',
        paragraphs: [
          'A rig two storeys high takes full-size panels, windows and junctions, then sprays, freezes and loads them. Contractors are welcome on Thursdays; most of our best details came out of those afternoons.',
        ],
      },
      {
        heading: 'Visiting',
        paragraphs: [
          'Clients buying in the Nordic cities can meet the team at the studio or on site. Book through the contact page and we will arrange a time that suits the flight.',
        ],
      },
    ],
  },
  'renovation-survey': {
    lead: 'A survey tells you what condition a period flat is in. It does not tell you whether the renovation you have in mind is allowed. These are the questions that decide that.',
    sections: [
      {
        heading: 'Permissions and protection',
        paragraphs: [
          'Listed buildings and conservation areas control windows, doors, roofs and sometimes interiors. Ask the local authority before you price a scheme, not after.',
        ],
      },
      {
        heading: 'Party walls and the freeholder',
        paragraphs: [
          'Work on or near a shared wall usually needs a formal agreement with the neighbour, and most leases need the freeholder’s consent for structural changes. Both take time and can carry fees.',
        ],
      },
      {
        heading: 'Building control',
        paragraphs: [
          'Moving a kitchen, a bathroom or a wall can bring the flat under current fire, ventilation and sound rules. We draw a one-page compliance plan before any client commits to a layout.',
        ],
      },
    ],
  },
  'courtyard-heat': {
    lead: 'Summer running costs have quietly become a line in the valuation in three of the markets we buy in. Orientation and shading now move prices.',
    sections: [
      {
        heading: 'What valuers now ask',
        paragraphs: [
          'In Lisbon, Porto and parts of London, valuers have started asking which way the main rooms face, whether there is external shading, and what it costs to keep the flat cool in August.',
        ],
      },
      {
        heading: 'The size of the difference',
        paragraphs: [
          'Comparable west-facing top-floor flats without shading sold at three to five per cent below their north and east neighbours in our records last year. Two years ago there was no measurable gap.',
        ],
      },
      {
        heading: 'What buyers can do',
        paragraphs: [
          'External blinds, a light roof finish and cross ventilation close most of the gap for a fraction of the discount. We include them in the cost plan whenever we see the risk.',
        ],
      },
    ],
  },
  'handover-checklist': {
    lead: 'We published the forty-page document we walk every completion with, including the snags we now catch before a client ever sees them.',
    sections: [
      {
        heading: 'Why publish it',
        paragraphs: [
          'Clients asked what we check, and the honest answer was too long for an email. Publishing it also means any buyer can hold any developer to the same standard, including us.',
        ],
      },
      {
        heading: 'What is in it',
        paragraphs: [
          'Every room, every service and every certificate, with photographs of what good looks like. The sections on windows, drainage and ventilation are the ones that catch the most.',
        ],
      },
      {
        heading: 'The snags that matter most',
        paragraphs: [
          'Ventilation that was installed but never balanced, sealant that was skipped behind the bath, and windows that close but do not lock. All three are cheap on the day and expensive a year later.',
        ],
      },
    ],
  },
}

/* ------------------------------------------------------------------ *
 * Market reports
 * ------------------------------------------------------------------ */

export type CityMarket = {
  city: string
  pricePerSqm: string
  change: string
  daysToOffer: number
  netYield: string
  note: string
}

export const marketQuarter = 'Q3 2026'

export const cityMarkets: CityMarket[] = [
  {
    city: 'London',
    pricePerSqm: '£11,400',
    change: '+1.8%',
    daysToOffer: 9,
    netYield: '2.9%',
    note: 'Prime two-bedroom flats near transport are moving fastest; large family houses are slower.',
  },
  {
    city: 'Lisbon',
    pricePerSqm: '€5,900',
    change: '+4.6%',
    daysToOffer: 12,
    netYield: '3.4%',
    note: 'Renovated period flats still lead. Short-let rules keep investor demand below its 2023 peak.',
  },
  {
    city: 'Oslo',
    pricePerSqm: 'NOK 98,000',
    change: '+2.1%',
    daysToOffer: 14,
    netYield: '3.1%',
    note: 'New-build timber schemes sell before completion. Older blocks wait for energy upgrades.',
  },
  {
    city: 'Copenhagen',
    pricePerSqm: 'DKK 52,500',
    change: '+3.0%',
    daysToOffer: 11,
    netYield: '3.3%',
    note: 'Harbour districts remain the most requested. Supply is tight below DKK 5 million.',
  },
  {
    city: 'Porto',
    pricePerSqm: '€3,700',
    change: '+5.2%',
    daysToOffer: 10,
    netYield: '4.1%',
    note: 'The fastest riser in our cities this quarter, led by buyers moving from Lisbon.',
  },
]

/* ------------------------------------------------------------------ *
 * Our history
 * ------------------------------------------------------------------ */

export type Milestone = { year: string; title: string; copy: string }

export const milestones: Milestone[] = [
  {
    year: '2008',
    title: 'One desk on Harbour Walk',
    copy: 'Amina Belhaj leaves commercial valuation and starts buying homes for private clients from a single desk in London E1, with one rule: survey before the offer.',
  },
  {
    year: '2011',
    title: 'The first drawing board',
    copy: 'Clients keep asking who could redesign what they bought. Clara Mendes joins and the studio starts drawing.',
  },
  {
    year: '2016',
    title: 'Lisbon',
    copy: 'A second office opens on Rua do Século for clients buying in Portugal from abroad.',
  },
  {
    year: '2017',
    title: 'Twelve-month reviews',
    copy: 'Every completed building is measured for a full year after handover, and the results are published whether they flatter us or not.',
  },
  {
    year: '2019',
    title: 'Oslo, and a site of our own',
    copy: 'A third office opens in Oslo, and the first scheme we develop ourselves, a courtyard block of 42 homes, completes in London E1.',
  },
  {
    year: '2022',
    title: 'Copenhagen and the Nordic desk',
    copy: 'An office on the Nordhavn waterfront and the off-market sourcing desk for Denmark and Norway.',
  },
  {
    year: '2024',
    title: 'Porto',
    copy: 'The fifth office opens. Daniel Whitmore becomes managing director and deputy CEO.',
  },
  {
    year: '2026',
    title: 'A bigger Oslo studio and the facade lab',
    copy: 'The Oslo team moves to the waterfront with a full-height test rig for facades, and Blue Hall opens to the public.',
  },
]
