/**
 * Centrale, handmatig gecureerde Unsplash-catalogus.
 *
 * Per zoekterm ("badkamer tegels", "terras natuursteen", ...) houden we
 * meerdere geteste foto-ID's bij. Deze IDs zijn geverifieerd en geven
 * altijd een 200 + afbeelding terug. Ze vormen de fallback wanneer er
 * geen Unsplash API-key is ingesteld.
 *
 * De Unsplash foto-URL is opgebouwd als:
 *   https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w={W}&q=80
 *
 * Vrij te gebruiken onder de Unsplash License.
 */

export interface CatalogImage {
  /** Unsplash photo ID (het stukje na "photo-") */
  id: string
  /** Alt-tekst in het Nederlands */
  alt: string
  /** Optionele credit (photographer) */
  credit?: string
}

export interface CatalogQuery {
  /** Zoekterm / categorie */
  query: string
  /** Lijst van bijpassende, geteste foto's */
  images: CatalogImage[]
}

export const UNSPLASH_CATALOG: CatalogQuery[] = [
  {
    query: 'hero badkamer tegelwerken',
    images: [
      { id: '1552321554-5fefe8c9ef14', alt: 'Strak betegelde badkamer met klassieke witte tegels' },
      { id: '1620626011761-996317b8d101', alt: 'Moderne badkamer met vrijstaand bad en tegelwand' },
      { id: '1600566752355-35792bedcfea', alt: 'Donkere moderne badkamer met grote tegels' }
    ]
  },
  {
    query: 'badkamer renovatie',
    images: [
      { id: '1620626011761-996317b8d101', alt: 'Badkamerrenovatie met vrijstaand bad' },
      { id: '1564540583246-934409427776', alt: 'Marmeren badkamermeubel met spiegels' },
      { id: '1600566752355-35792bedcfea', alt: 'Strakke donkere badkamer met inloopdouche' }
    ]
  },
  {
    query: 'inloopdouche marmer',
    images: [
      { id: '1564540583246-934409427776', alt: 'Marmeren wanden in een luxe badkamer' },
      { id: '1600566752355-35792bedcfea', alt: 'Inloopdouche in donkere badkamer' }
    ]
  },
  {
    query: 'keuken vloer tegels',
    images: [
      { id: '1600585152220-90363fe7e115', alt: 'Moderne keuken met keukeneiland' },
      { id: '1600607687939-ce8a6c25118c', alt: 'Open keuken en leefruimte' }
    ]
  },
  {
    query: 'woonruimte tegelvloer',
    images: [
      { id: '1600210491892-03d54c0aaf87', alt: 'Sfeervolle woonkamer met houten balken' },
      { id: '1600210492486-724fe5c67fb0', alt: 'Moderne leefruimte met neutrale tinten' },
      { id: '1554995207-c18c203602cb', alt: 'Leefruimte met lederen zetel' },
      { id: '1600607687939-ce8a6c25118c', alt: 'Leefruimte met open keuken' }
    ]
  },
  {
    query: 'binnenhout met tegel',
    images: [
      { id: '1600566753104-685f4f24cb4d', alt: 'Leefruimte met houten wandbetegeling' },
      { id: '1600585154084-4e5fe7c39198', alt: 'Open leefruimte met houtlook vloer' }
    ]
  },
  {
    query: 'terras natuursteen',
    images: [
      { id: '1600573472592-401b489a3cdc', alt: 'Luxe terras aan zwembad' },
      { id: '1600566753190-17f0baa2a6c3', alt: 'Moderne woning met terras in natuursteen' },
      { id: '1600563438938-a9a27216b4f5', alt: 'Oprit en terras met betegeling' }
    ]
  },
  {
    query: 'buitenkeuken',
    images: [
      { id: '1600585154526-990dced4db0d', alt: 'Buitenruimte met gevelbekleding' },
      { id: '1604014237800-1c9102c219da', alt: 'Overdekt terras met buitenleefruimte' }
    ]
  },
  {
    query: 'moderne woning gevel',
    images: [
      { id: '1600585154340-be6161a56a0c', alt: 'Moderne woning met tuin en glaspartijen' },
      { id: '1600585154363-67eb9e2e2099', alt: 'Architecturale woning met hout en staal' },
      { id: '1605276374104-dee2a0ed3cd6', alt: 'Vastgoed in Vlaanderen' }
    ]
  },
  {
    query: 'tuin en groen',
    images: [
      { id: '1416879595882-3373a0480b5b', alt: 'Tuingereedschap en groen' }
    ]
  },
  {
    query: 'renovatie en karwei',
    images: [
      { id: '1503387762-592deb58ef4e', alt: 'Architect aan het tekenen' },
      { id: '1567016376408-0226e4d0c1ea', alt: 'Minimalistische architectuur' }
    ]
  }
]

/**
 * Bouwt een volledige Unsplash CDN-URL.
 */
export const buildUnsplashUrl = (id: string, width = 1600, quality = 80): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`

/**
 * Vindt de beste catalogus-match voor een vrije zoekterm.
 * Probeert eerst een exacte match, daarna gedeeltelijke overeenkomsten.
 */
export const findCatalog = (query: string): CatalogQuery | undefined => {
  const q = query.trim().toLowerCase()
  if (!q) return undefined

  // 1. Exacte match
  const exact = UNSPLASH_CATALOG.find(c => c.query.toLowerCase() === q)
  if (exact) return exact

  // 2. Gedeeltelijke match (één van de woorden overlapt)
  const words = q.split(/\s+/)
  const scored = UNSPLASH_CATALOG
    .map(c => {
      const cWords = c.query.toLowerCase().split(/\s+/)
      const score = words.reduce((acc, w) => acc + (cWords.some(cw => cw.includes(w) || w.includes(cw)) ? 1 : 0), 0)
      return { c, score }
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored[0]?.c
}
