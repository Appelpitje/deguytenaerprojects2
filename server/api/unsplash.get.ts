/**
 * Server route die optioneel de Unsplash API aanspreekt.
 *
 * Gebruik:
 *   GET /api/unsplash?query=badkamer+tegels&per_page=3
 *
 * Vereist NUXT_UNSPLASH_ACCESS_KEY in de environment.
 * Zonder key valt de server terug op de gecureerde catalogus
 * (utils/unsplashCatalog.ts) zodat de site altijd werkt.
 */

import { buildUnsplashUrl, findCatalog, UNSPLASH_CATALOG } from '~/utils/unsplashCatalog'

export default defineEventHandler(async (event) => {
  const { query = '', per_page = '3', orientation = 'landscape' } = getQuery(event) as Record<string, string>
  const limit = Math.min(10, Math.max(1, parseInt(per_page, 10) || 3))

  const config = useRuntimeConfig()
  const apiKey = config.unsplashAccessKey

  // 1. Probeer de Unsplash API als er een key is
  if (apiKey) {
    try {
      const data = await $fetch<{ results: Array<{ id: string; alt_description: string; user: { name: string } }> }>(
        'https://api.unsplash.com/search/photos',
        {
          query: {
            query,
            per_page: limit,
            orientation
          },
          headers: {
            Authorization: `Client-ID ${apiKey}`
          }
        }
      )

      return {
        source: 'api',
        query,
        results: (data.results || []).map(r => ({
          id: r.id,
          url: buildUnsplashUrl(r.id, 1600, 80),
          alt: r.alt_description || query,
          credit: r.user?.name
        }))
      }
    } catch (err) {
      // Vallen door naar catalogus bij een API-fout
      console.warn('[unsplash] API-call mislukt, valt terug op catalogus:', (err as Error).message)
    }
  }

  // 2. Fallback: gecureerde catalogus
  const match = findCatalog(query)
  if (match) {
    return {
      source: 'catalog',
      query,
      results: match.images.slice(0, limit).map(img => ({
        id: img.id,
        url: buildUnsplashUrl(img.id, 1600, 80),
        alt: img.alt,
        credit: img.credit
      }))
    }
  }

  // 3. Laatste fallback: eerste catalogus-entry
  const fallback = UNSPLASH_CATALOG[0]
  return {
    source: 'fallback',
    query,
    results: fallback.images.slice(0, limit).map(img => ({
      id: img.id,
      url: buildUnsplashUrl(img.id, 1600, 80),
      alt: img.alt,
      credit: img.credit
    }))
  }
})
