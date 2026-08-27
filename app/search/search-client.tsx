'use client'

import { useSearchParams } from 'next/navigation'
import type { SearchQuery } from '@/lib/listings'
import { SearchView } from './search-view'

/**
 * Reads the filters out of the query string. The site is a static export, so
 * there is no server to do this — the URL is only readable once the page is
 * running in the browser, which is why this sits behind a Suspense boundary.
 */
export function SearchClient() {
  const params = useSearchParams()

  const query: SearchQuery = {
    city: params.get('city') ?? undefined,
    district: params.get('district') ?? undefined,
    rooms: params.get('rooms') ?? undefined,
    price: params.get('price') ?? undefined,
    deal: params.get('deal') ?? undefined,
  }

  return <SearchView query={query} />
}
