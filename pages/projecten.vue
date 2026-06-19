<script setup lang="ts">
useHead({
  title: 'Projecten — De Guytenaer Projects',
  meta: [
    {
      name: 'description',
      content:
        'Ontdek de recente projecten van De Guytenaer Projects: tegelwerken, badkamerrenovaties, terrassen en vloerafwerking in Vlaanderen.'
    },
    {
      name: 'keywords',
      content:
        'projecten tegelwerken, realisaties Vlaanderen, badkamerrenovatie, terrasaanleg, vloeren leggen'
    }
  ]
})

const featured = [
  {
    title: 'Kijkwoning Huysman Bouw',
    location: 'Waarschoot',
    description:
      'Opdracht in samenwerking met Huysman Bouw — volledige betegeling van de kijkwoning: badkamers, keuken en leefruimtes.',
    queries: ['moderne woning gevel', 'woonruimte tegelvloer', 'keuken vloer tegels', 'badkamer renovatie']
  },
  {
    title: 'Houten constructie & vloer',
    location: 'Vlaanderen',
    description:
      'Eigentijdse uitbouw met houten constructie en een naadloos geïntegreerde tegelvloer die binnen en buiten met elkaar verbindt.',
    queries: ['binnenhout met tegel', 'moderne woning gevel', 'buitenkeuken', 'woonruimte tegelvloer']
  }
]

const galleryQueries = [
  'keuken vloer tegels',
  'terras natuursteen',
  'badkamer renovatie',
  'buitenkeuken',
  'woonruimte tegelvloer',
  'leefruimte met houtlook',
  'moderne woning gevel',
  'hero badkamer tegelwerken',
  'inloopdouche marmer'
]

// Bouw één afbeelding-map op voor de hele pagina
const { data: pageImages } = await useAsyncData('projecten-images', async () => {
  const out: Record<string, { src: string; alt: string }> = {}

  // Featured project-afbeeldingen
  for (const p of featured) {
    for (const q of p.queries) {
      if (!out[q]) {
        const res = await useUnsplashImage(q, { width: 1200, static: true })
        out[q] = { src: res.src, alt: res.alt }
      }
    }
  }

  // Galerij-afbeeldingen
  for (const q of galleryQueries) {
    if (!out[q]) {
      const res = await useUnsplashImage(q, { width: 1200, static: true })
      out[q] = { src: res.src, alt: res.alt }
    }
  }

  return out
})
</script>

<template>
  <div>
    <section class="relative isolate overflow-hidden bg-ink-900 pt-40 pb-24 text-bone-100">
      <img
        :src="useUnsplashImage.byId('1600573472592-401b489a3cdc', 1920, 80, '').src"
        alt=""
        class="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/60 to-ink-900" />

      <div class="container-x">
        <p class="eyebrow !text-accent-200">Projecten</p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-bone-50 sm:text-5xl md:text-6xl">
          Onze recente
          <span class="italic text-accent-200">werven.</span>
        </h1>
        <p class="mt-6 max-w-2xl text-base text-bone-200/80 sm:text-lg">
          Een selectie van tegelwerken, vloerafwerkingen en
          buitenprojecten die we onlangs mochten realiseren.
        </p>
      </div>
    </section>

    <!-- Uitgelichte projecten -->
    <section class="section">
      <div class="container-x space-y-24">
        <article
          v-for="(p, i) in featured"
          :key="i"
          class="grid gap-10 lg:grid-cols-12 lg:items-center"
          :class="i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''"
        >
          <div class="lg:col-span-7">
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(q, j) in p.queries"
                :key="j"
                class="overflow-hidden rounded-2xl bg-ink-100 shadow-soft"
                :class="j === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'"
              >
                <img
                  :src="pageImages?.[q]?.src"
                  :alt="pageImages?.[q]?.alt || `${p.title} — foto ${j + 1}`"
                  loading="lazy"
                  class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
          <div class="lg:col-span-5">
            <p class="eyebrow">{{ p.location }}</p>
            <h2 class="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {{ p.title }}
            </h2>
            <p class="mt-4 text-base text-ink-600 text-pretty sm:text-lg">
              {{ p.description }}
            </p>
            <NuxtLink to="/contact" class="btn-primary mt-8">
              Offerte voor een gelijkaardig project
              <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- Galerij -->
    <section class="section bg-bone-200/40">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="eyebrow">Galerij</p>
            <h2 class="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Meer
              <span class="italic text-accent-500">realisaties.</span>
            </h2>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          <figure
            v-for="(q, i) in galleryQueries"
            :key="i"
            class="group relative overflow-hidden rounded-2xl bg-ink-100 shadow-soft"
            :class="i % 5 === 0 ? 'aspect-[3/4]' : 'aspect-square'"
          >
            <img
              :src="pageImages?.[q]?.src"
              :alt="pageImages?.[q]?.alt || `Realisatie ${i + 1} van De Guytenaer Projects`"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </figure>
        </div>
      </div>
    </section>

    <ContactForm />
  </div>
</template>
