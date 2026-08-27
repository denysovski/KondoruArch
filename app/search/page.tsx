import type { Metadata } from 'next'
import { Suspense } from 'react'
import { listings } from '@/lib/listings'
import { SearchClient } from './search-client'
import { SearchView } from './search-view'
import { pageMetadata, photoCard } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Search homes for sale and to rent',
  description: `Search all ${listings.length} Kondoru residences across London, Lisbon, Oslo, Copenhagen, Porto and Casablanca — filter by city, district, rooms and price.`,
  path: '/search',
  image: photoCard('architecture/white-block'),
})

export default function SearchPage() {
  return (
    // The fallback is the complete, unfiltered list: real content in the
    // static HTML, replaced by the filtered set the moment the client reads
    // the query string.
    <Suspense fallback={<SearchView query={{}} />}>
      <SearchClient />
    </Suspense>
  )
}
