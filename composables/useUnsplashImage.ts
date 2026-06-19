/**
 * useUnsplashImage
 *
 * Haalt de beste afbeelding op voor een gegeven zoekterm.
 * Werkt in drie modi:
 *
 *   1. SSG/SSR build-time: gebruikt de gecureerde catalogus (geen netwerk-call).
 *   2. Client-side: probeert /api/unsplash (Unsplash API met key) → valt terug
 *      op de catalogus bij een fout of zonder key.
 *   3. Gewoon doorgeven van een vaste ID: gebruikt buildUnsplashUrl direct.
 *
 * Gebruik:
 *
 *   // A) via zoekterm
 *   const { src, alt } = await useUnsplashImage('badkamer tegelwerken', { width: 1200 })
 *
 *   // B) via vaste ID
 *   const { src } = useUnsplashImage.byId('1552321554-5fefe8c9ef14')
 *
 *   // C) één URL-string (geen fetch)
 *   const { src } = useUnsplashImage.raw('https://...')
 */

import { buildUnsplashUrl, findCatalog, type CatalogImage } from '~/utils/unsplashCatalog'

export interface UnsplashImageResult {
  src: string
  alt: string
  credit?: string
  source: 'catalog' | 'api' | 'fallback' | 'raw'
}

export interface UseUnsplashImageOptions {
  width?: number
  quality?: number
  /** Voorkomt netwerk-call (handig in pure SSG) */
  static?: boolean
}

const cache = new Map<string, UnsplashImageResult>()

const makeKey = (query: string, width: number) => `${width}::${query}`

/**
 * Hoofdfunctie — query-gebaseerd
 */
export const useUnsplashImage = async (
  query: string,
  options: UseUnsplashImageOptions = {}
): Promise<UnsplashImageResult> => {
  const width = options.width ?? 1600
  const quality = options.quality ?? 80
  const cacheKey = makeKey(query, width)

  // Cache hit
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!
  }

  // SSG / no-fetch mode
  if (options.static || import.meta.server) {
    const result = pickFromCatalog(query, width, quality)
    cache.set(cacheKey, result)
    return result
  }

  // Client-side: probeer API
  try {
    const res = await $fetch<{ results: Array<{ url: string; alt: string; credit?: string }> }>(
      '/api/unsplash',
      { query: { query, per_page: '1' } }
    )
    if (res?.results?.[0]) {
      const result: UnsplashImageResult = {
        src: res.results[0].url,
        alt: res.results[0].alt || query,
        credit: res.results[0].credit,
        source: res.source === 'api' ? 'api' : 'catalog'
      }
      cache.set(cacheKey, result)
      return result
    }
  } catch {
    // valt door op catalogus
  }

  // Fallback: catalogus
  const result = pickFromCatalog(query, width, quality)
  cache.set(cacheKey, result)
  return result
}

const pickFromCatalog = (query: string, width: number, quality: number): UnsplashImageResult => {
  const match = findCatalog(query)
  const img: CatalogImage = match?.images[0] ?? { id: '1552321554-5fefe8c9ef14', alt: 'Tegelwerk door De Guytenaer Projects' }
  return {
    src: buildUnsplashUrl(img.id, width, quality),
    alt: img.alt,
    credit: img.credit,
    source: 'catalog'
  }
}

// Statische helpers — geen async, geen fetch
useUnsplashImage.byId = (id: string, width = 1600, quality = 80, alt = 'Projectfoto De Guytenaer Projects'): UnsplashImageResult => ({
  src: buildUnsplashUrl(id, width, quality),
  alt,
  source: 'catalog'
})

useUnsplashImage.raw = (url: string, alt = 'Projectfoto De Guytenaer Projects'): UnsplashImageResult => ({
  src: url,
  alt,
  source: 'raw'
})

/**
 * Haalt meerdere afbeeldingen in één keer op — handig voor grids.
 */
export const useUnsplashImages = async (
  query: string,
  count = 6,
  options: UseUnsplashImageOptions = {}
): Promise<UnsplashImageResult[]> => {
  const width = options.width ?? 1200
  const quality = options.quality ?? 80

  if (options.static || import.meta.server) {
    const match = findCatalog(query)
    const pool = match?.images ?? [{ id: '1552321554-5fefe8c9ef14', alt: 'Projectfoto' }]
    // Herhaal de pool als we meer afbeeldingen willen dan we hebben
    const images: UnsplashImageResult[] = []
    for (let i = 0; i < count; i++) {
      const img = pool[i % pool.length]
      images.push({
        src: buildUnsplashUrl(img.id, width, quality),
        alt: img.alt,
        source: 'catalog'
      })
    }
    return images
  }

  try {
    const res = await $fetch<{ results: Array<{ url: string; alt: string; credit?: string }> }>(
      '/api/unsplash',
      { query: { query, per_page: String(Math.min(count, 10)) } }
    )
    if (res?.results?.length) {
      const results = res.results.map(r => ({
        src: r.url,
        alt: r.alt,
        credit: r.credit,
        source: res.source === 'api' ? 'api' as const : 'catalog' as const
      }))
      // Opvullen als we minder resultaten hebben dan count
      if (results.length < count) {
        const match = findCatalog(query)
        const pool = match?.images ?? []
        let i = 0
        while (results.length < count && pool.length > 0) {
          const img = pool[i % pool.length]
          results.push({
            src: buildUnsplashUrl(img.id, width, quality),
            alt: img.alt,
            source: 'catalog'
          })
          i++
        }
      }
      return results.slice(0, count)
    }
  } catch {
    // valt door op catalogus
  }

  // Fallback
  return useUnsplashImages(query, count, { ...options, static: true })
}
