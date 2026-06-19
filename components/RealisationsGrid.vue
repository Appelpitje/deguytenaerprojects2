<script setup lang="ts">
interface Realisation {
  title: string
  category: string
  /** Vrije zoekterm — wordt opgezocht in de Unsplash-catalogus */
  query: string
  span?: 'wide' | 'tall' | 'normal'
}

const realisations: Realisation[] = [
  {
    title: 'Badkamerrenovatie op maat',
    category: 'Badkamer',
    query: 'badkamer renovatie',
    span: 'tall'
  },
  {
    title: 'Keukenvloer in groot formaat',
    category: 'Vloer',
    query: 'keuken vloer tegels',
    span: 'wide'
  },
  {
    title: 'Terras in natuursteen',
    category: 'Terras',
    query: 'terras natuursteen'
  },
  {
    title: 'Leefruimte met houtlook',
    category: 'Vloer',
    query: 'woonruimte tegelvloer'
  },
  {
    title: 'Inloopdouche in marmerlook',
    category: 'Badkamer',
    query: 'inloopdouche marmer',
    span: 'wide'
  },
  {
    title: 'Buitenkeuken & bar',
    category: 'Buiten',
    query: 'buitenkeuken'
  }
]

// Haal alle afbeeldingen in één keer op (catalogus-modus = SSG-veilig)
const { data: images } = await useAsyncData('realisations', async () => {
  const out: Record<string, { src: string; alt: string }> = {}
  for (const r of realisations) {
    const res = await useUnsplashImage(r.query, { width: 1200, static: true })
    out[r.query] = { src: res.src, alt: res.alt }
  }
  return out
})

const spanClass = (s?: Realisation['span']) => {
  switch (s) {
    case 'wide': return 'md:col-span-2'
    case 'tall': return 'md:row-span-2'
    default: return ''
  }
}
</script>

<template>
  <section id="realisaties" class="section bg-bone-200/40">
    <div class="container-x">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow">Realisaties</p>
          <h2 class="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Een greep uit onze
            <span class="italic text-accent-500">recente werven.</span>
          </h2>
        </div>
        <NuxtLink to="/projecten" class="btn-ghost">
          Alle projecten
          <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
        </NuxtLink>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[220px] md:grid-cols-4 lg:gap-6">
        <article
          v-for="(item, i) in realisations"
          :key="i"
          class="group relative overflow-hidden rounded-2xl bg-ink-100 shadow-soft"
          :class="spanClass(item.span)"
        >
          <img
            :src="images?.[item.query]?.src"
            :alt="images?.[item.query]?.alt || item.title"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

          <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-bone-50">
            <div>
              <p class="text-[10px] uppercase tracking-[0.25em] text-accent-200">
                {{ item.category }}
              </p>
              <h3 class="mt-1 font-display text-lg font-semibold leading-tight sm:text-xl">
                {{ item.title }}
              </h3>
            </div>
            <span
              class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bone-50/10 text-bone-50 backdrop-blur transition group-hover:bg-bone-50 group-hover:text-ink-800"
            >
              <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
