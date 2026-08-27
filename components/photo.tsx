import { photoMeta, photoSrc, photoSrcSet, type PhotoName } from '@/lib/photos'

/**
 * Every photograph on the site goes through here.
 *
 * It emits one plain `<img>` — no wrapper element, so the existing CSS keeps
 * matching — carrying the whole WebP ladder in `srcset`, the intrinsic size
 * so the browser reserves the box before any bytes arrive, and the alt text
 * from the catalogue unless the caller has something more specific to say.
 *
 * `priority` is for the single image above the fold on a page: it loads
 * eagerly and at high fetch priority. Everything else waits until it is
 * close to the viewport.
 */
export function Photo({
  name,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  style,
  ...rest
}: {
  name: PhotoName
  /** Overrides the catalogue alt. Pass '' only for a decorative repeat. */
  alt?: string
  sizes?: string
  priority?: boolean
  className?: string
  style?: React.CSSProperties
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'alt' | 'sizes' | 'style' | 'width' | 'height'
>) {
  const entry = photoMeta(name)

  return (
    <img
      className={className}
      src={photoSrc(name)}
      srcSet={photoSrcSet(name)}
      sizes={sizes}
      width={entry.width}
      height={entry.height}
      alt={alt ?? entry.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      style={{ backgroundColor: entry.color, ...style }}
      {...rest}
    />
  )
}
