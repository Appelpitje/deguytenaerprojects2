<script setup lang="ts">
useHead({
  title: 'Diensten — De Guytenaer Projects',
  meta: [
    {
      name: 'description',
      content:
        'Diensten van De Guytenaer Projects: tegelwerken, vloerafwerking, badkamerrenovatie, terrasaanleg, tuinonderhoud en kleine karweien in Vlaanderen.'
    },
    {
      name: 'keywords',
      content:
        'diensten tegelwerker, badkamer betegelen, vloer leggen, terrasaanleg, tuinonderhoud Vlaanderen'
    }
  ]
})

const services = [
  {
    title: 'Tegelwerken',
    description:
      'Hoogwaardige tegelwerken voor binnen en buiten — van badkamer en keuken tot woonkamer en hal.',
    icon: 'lucide:grid-3x3',
    query: 'hero badkamer tegelwerken'
  },
  {
    title: 'Vloerafwerking',
    description:
      'Strakke vloeren in alle formaten en materialen. Wij begeleiden u van materiaalkeuze tot afwerking.',
    icon: 'lucide:square-stack',
    query: 'woonruimte tegelvloer'
  },
  {
    title: 'Badkamerrenovatie',
    description:
      'Totaalrenovatie van uw badkamer: betegeling, inloopdouche, maatwerk en een tijdloze afwerking.',
    icon: 'lucide:droplets',
    query: 'badkamer renovatie'
  },
  {
    title: 'Terrasaanleg',
    description:
      'Aanleg van terrassen en opritten met keramiek, natuursteen of beton — klaar om van te genieten.',
    icon: 'lucide:sun',
    query: 'terras natuursteen'
  },
  {
    title: 'Tuinonderhoud & groenaanleg',
    description:
      'Onderhoud en aanleg van uw tuin, van gazon en beplanting tot grond- en afbraakwerken.',
    icon: 'lucide:leaf',
    query: 'tuin en groen'
  },
  {
    title: 'Kleine karweien & metselwerken',
    description:
      'Klein metselwerk, herstellingen en allerhande karweien in en rond uw woning.',
    icon: 'lucide:wrench',
    query: 'renovatie en karwei'
  }
]

// Laad alle afbeeldingen in één keer
const { data: serviceImages } = await useAsyncData('service-images', async () => {
  const out: Record<string, { src: string; alt: string }> = {}
  for (const s of services) {
    const res = await useUnsplashImage(s.query, { width: 1200, static: true })
    out[s.query] = { src: res.src, alt: res.alt }
  }
  return out
})
</script>

<template>
  <div>
    <section class="relative isolate overflow-hidden bg-ink-900 pt-40 pb-24 text-bone-100">
      <img
        :src="useUnsplashImage.byId('1600566753190-17f0baa2a6c3', 1920, 80, '').src"
        alt=""
        class="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/60 to-ink-900" />

      <div class="container-x">
        <p class="eyebrow !text-accent-200">Diensten</p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-bone-50 sm:text-5xl md:text-6xl">
          Wat wij voor u
          <span class="italic text-accent-200">kunnen betekenen.</span>
        </h1>
        <p class="mt-6 max-w-2xl text-base text-bone-200/80 sm:text-lg">
          Bij De Guytenaer Projects kan u terecht voor een breed scala aan
          diensten — van groenaanleg tot terrasaanleg, van vloerafwerking
          tot kleine karweien.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container-x">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(s, i) in services"
            :key="i"
            class="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white/80 shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div class="relative h-56 overflow-hidden">
              <img
                :src="serviceImages?.[s.query]?.src"
                :alt="serviceImages?.[s.query]?.alt || s.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
              <span class="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-bone-100/90 text-ink-800 backdrop-blur">
                <Icon :name="s.icon" class="h-5 w-5" />
              </span>
            </div>
            <div class="flex flex-1 flex-col p-6">
              <h2 class="font-display text-xl font-semibold text-ink-800 sm:text-2xl">
                {{ s.title }}
              </h2>
              <p class="mt-2 text-sm leading-relaxed text-ink-600 sm:text-base">
                {{ s.description }}
              </p>
              <NuxtLink
                to="/contact"
                class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-800 hover:text-accent-500"
              >
                Offerte aanvragen
                <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <AboutSection />
  </div>
</template>
