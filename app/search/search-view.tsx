'use client'

import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { describeQuery, filterListings, listings, type SearchQuery } from '@/lib/listings'
import { SearchFilters } from '@/components/search-filters'
import { ListingCard } from '@/components/listing-card'
import { Button, Heading, Pill } from '@/components/ui-kit'

/**
 * The whole search page for one query.
 *
 * It is split out from the route so the static build can render the
 * unfiltered list — every residence, real content for a crawler — while the
 * client swaps in the filtered set as soon as it has read the query string.
 */
export function SearchView({ query }: { query: SearchQuery }) {
  const results = filterListings(query)
  const chips = describeQuery(query)
  const forSale = results.filter((listing) => listing.deal === 'sale').length
  const forRent = results.filter((listing) => listing.deal === 'rent').length

  return (
    <main id="main" className="site subpage search-page">
      <section className="search-head">
        <div className="search-head-inner">
          <div className="reveal">
            <Pill>Search</Pill>
          </div>
          <Heading
            as="h1"
            className="search-title"
            text={
              chips.length
                ? `${results.length} ${results.length === 1 ? 'home' : 'homes'} match your search`
                : `All ${listings.length} residences, for sale and to rent`
            }
          />
          <p className="search-summary">
            {chips.length ? (
              <>
                Filtered by{' '}
                {chips.map((chip) => (
                  <span key={chip} className="search-chip">
                    {chip}
                  </span>
                ))}
                . Leave a field on <em>Any</em> and it stops narrowing the results.
              </>
            ) : (
              <>
                Nothing is filtered yet, so everything on the books is here. Set as few or as many
                fields as you like — anything left blank simply matches everything.
              </>
            )}
          </p>

          <SearchFilters initial={query} variant="page" />

          <div className="search-counts">
            <span>
              <strong>{forSale}</strong> for sale
            </span>
            <span>
              <strong>{forRent}</strong> to rent
            </span>
            <span>
              <strong>{listings.length}</strong> total on the books
            </span>
          </div>
        </div>
      </section>

      <section className="section page-section">
        {results.length > 0 ? (
          <div className="listing-grid reveal-group">
            {results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="search-empty reveal">
            <i>
              <SearchX size={26} strokeWidth={1.8} />
            </i>
            <h2>Nothing matches all of those filters</h2>
            <p>
              There are {listings.length} residences on the books, but none of them meet every
              condition at once. Widen the price band or clear the district and try again.
            </p>
            <div className="search-empty-actions">
              <Button href="/search">Clear the search</Button>
              <Link className="property-details" href="/#contact">
                Tell us what you are looking for
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
