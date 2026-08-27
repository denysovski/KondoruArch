import { jsonLd } from '@/lib/seo'

/** One structured-data block. Invisible on the page, read by crawlers. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />
}
