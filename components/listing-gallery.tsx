'use client'

import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { Photo } from '@/components/photo'
import type { PhotoName } from '@/lib/photos'

/** Large lead image with selectable thumbnails, used on a residence page. */
export function ListingGallery({
  images,
  title,
  status,
}: {
  images: PhotoName[]
  title: string
  status: string
}) {
  const [view, setView] = useState(0)

  return (
    <section className="residence-gallery">
      <div className="residence-stage">
        {images.map((image, i) => (
          <Photo
            key={image}
            name={image}
            className={i === view ? 'is-shown' : ''}
            sizes="(max-width: 1080px) 96vw, 70vw"
            priority={i === 0}
          />
        ))}
        <span className="property-status">
          <CalendarDays size={13} strokeWidth={2} />
          {status}
        </span>
      </div>

      {images.length > 1 && (
        <div className="residence-thumbs">
          {images.map((image, i) => (
            <button
              key={image}
              className={i === view ? 'is-active' : ''}
              aria-label={`Show view ${i + 1} of ${title}`}
              aria-pressed={i === view}
              onClick={() => setView(i)}
            >
              <Photo name={image} alt="" sizes="110px" />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
