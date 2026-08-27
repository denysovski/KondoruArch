'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  Heart,
  Layers,
  MapPin,
  Maximize,
} from 'lucide-react'
import type { Listing } from '@/lib/listings'
import { Photo } from '@/components/photo'

export function ListingCard({ listing, gallery = true }: { listing: Listing; gallery?: boolean }) {
  const [view, setView] = useState(0)
  const [liked, setLiked] = useState(false)

  return (
    <article id={listing.id} className="property-card listing-card">
      <div className="property-media">
        {listing.images.map((image, i) => (
          <Photo
            key={image}
            name={image}
            className={i === view ? 'is-shown' : ''}
            sizes="(max-width: 720px) 92vw, (max-width: 1280px) 46vw, 30vw"
          />
        ))}

        {gallery && listing.images.length > 1 && (
          <div className="property-thumbs">
            {listing.images.map((image, i) => (
              <button
                key={image}
                className={i === view ? 'is-active' : ''}
                aria-label={`Show view ${i + 1} of ${listing.title}`}
                onClick={() => setView(i)}
              >
                <Photo name={image} alt="" sizes="76px" />
              </button>
            ))}
          </div>
        )}

        <button
          className={`like ${liked ? 'is-liked' : ''}`}
          aria-label={`Save ${listing.title}`}
          aria-pressed={liked}
          onClick={() => setLiked((v) => !v)}
        >
          <Heart size={16} strokeWidth={2} />
        </button>

        <span className="property-status">
          <CalendarDays size={13} strokeWidth={2} />
          {listing.status}
        </span>

        <span className={`property-deal deal-${listing.deal}`}>
          {listing.deal === 'sale' ? 'For sale' : 'To rent'}
        </span>
      </div>

      <div className="property-body">
        <div className="property-head">
          <div>
            <h3>
              <Link className="card-link" href={`/properties/${listing.id}`}>
                {listing.title}
              </Link>
            </h3>
            <span className="property-city">
              <MapPin size={13} strokeWidth={2} />
              {listing.district}, {listing.city}
            </span>
          </div>
          <div className="property-price">
            <strong>{listing.priceLabel}</strong>
            <span>{listing.secondary}</span>
          </div>
        </div>

        <p className="property-desc">{listing.desc}</p>

        <ul className="property-specs">
          <li>
            <BedDouble size={16} strokeWidth={1.8} />
            {listing.beds}
          </li>
          <li>
            <Bath size={16} strokeWidth={1.8} />
            {listing.baths}
          </li>
          <li>
            <Maximize size={16} strokeWidth={1.8} />
            {listing.area} m²
          </li>
          <li>
            <Layers size={16} strokeWidth={1.8} />
            {listing.floor}
          </li>
        </ul>

        <div className="property-highlights">
          {listing.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="property-actions">
          <a className="property-book" href="/#contact">
            <span>Book a viewing</span>
            <i className="arrow-bubble">
              <ArrowRight size={15} strokeWidth={2.2} />
            </i>
          </a>
          <Link className="property-details" href={`/properties/${listing.id}`}>
            Full details
          </Link>
        </div>
      </div>
    </article>
  )
}
