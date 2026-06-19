<script setup lang="ts">
const { y } = useWindowScroll()
const heroOpacity = computed(() => Math.max(0, 1 - y.value / 600))
const heroTranslate = computed(() => Math.min(80, y.value * 0.15))

// Pad via ref + composable → Vite probeert dit NIET statisch te resolven.
// Eerst proberen we de lokale /images/hero-tegelwerk.jpg,
// bij fout valt de browser terug op een Unsplash-catalogusbeeld.
const LOCAL_HERO = '/images/hero-tegelwerk.jpg'

const { src: fallbackSrc, alt: fallbackAlt } = useUnsplashImage.byId(
  '1552321554-5fefe8c9ef14',
  1920,
  80,
  'Hoogwaardige badkamer betegeld door De Guytenaer Projects in Vlaanderen'
)

const heroSrc = ref(LOCAL_HERO)
const heroAlt = 'Hoogwaardige badkamer betegeld door De Guytenaer Projects in Vlaanderen'
const onHeroError = () => {
  if (heroSrc.value !== fallbackSrc) {
    heroSrc.value = fallbackSrc
  }
}
</script>

<template>
  <section
    class="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-900 pt-32 text-bone-100"
  >
    <!-- Achtergrondafbeelding (vervang met eigen hero-foto: public/images/hero-tegelwerk.jpg) -->
    <div class="absolute inset-0 -z-10">
      <img
        :src="heroSrc"
        :alt="heroAlt"
        class="h-full w-full object-cover animate-slow-zoom"
        loading="eager"
        fetchpriority="high"
        @error="onHeroError"
      />
      <!-- Extra donkere top-tint zodat de navbar altijd leesbaar blijft -->
      <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-900/80 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/40 to-ink-900/90" />
      <div class="absolute inset-0 bg-gradient-to-r from-ink-900/60 via-transparent to-transparent" />
    </div>

    <div
      class="container-x relative grid w-full gap-12 pb-16 md:pb-24 lg:grid-cols-12 lg:items-end"
      :style="{
        opacity: heroOpacity,
        transform: `translateY(${heroTranslate}px)`
      }"
    >
      <div class="lg:col-span-8">
        <p class="eyebrow text-accent-200">
          <span class="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-300 align-middle" />
          Tegelwerken · Vlaanderen
        </p>
        <h1 class="mt-6 font-display text-4xl font-semibold leading-[1.05] text-balance text-bone-50 sm:text-5xl md:text-6xl lg:text-7xl">
          Uw partner in
          <span class="italic text-accent-200">tegelwerken</span>
          <br class="hidden sm:block" />
          zowel binnen als buiten.
        </h1>
        <p class="mt-6 max-w-2xl text-base text-bone-200/90 text-pretty sm:text-lg">
          Van een strakke badkamerrenovatie tot een vernieuwd terras en
          vloerafwerking op maat — De Guytenaer Projects realiseert
          hoogwaardige tegelwerken met oog voor detail en een
          persoonlijke aanpak.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4">
          <NuxtLink to="/contact" class="btn-primary !bg-bone-100 !text-ink-800 hover:!bg-bone-200">
            Vraag een vrijblijvende offerte
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </NuxtLink>
          <NuxtLink to="/projecten" class="btn-ghost !border-bone-100/30 !text-bone-100 hover:!bg-bone-100 hover:!text-ink-800">
            Bekijk onze realisaties
          </NuxtLink>
        </div>
      </div>

      <div class="hidden lg:col-span-4 lg:block">
        <div class="glass rounded-3xl p-6 text-ink-800">
          <p class="eyebrow">Snelle feiten</p>
          <dl class="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt class="text-ink-400">Regio</dt>
              <dd class="mt-1 font-medium">Vlaanderen</dd>
            </div>
            <div>
              <dt class="text-ink-400">Specialisatie</dt>
              <dd class="mt-1 font-medium">Tegelwerken</dd>
            </div>
            <div>
              <dt class="text-ink-400">Aanpak</dt>
              <dd class="mt-1 font-medium">Persoonlijk</dd>
            </div>
            <div>
              <dt class="text-ink-400">Offerte</dt>
              <dd class="mt-1 font-medium">Vrijblijvend</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Scroll-indicator -->
    <div class="absolute inset-x-0 bottom-6 flex justify-center">
      <div class="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-bone-200/70">
        <span>Scroll</span>
        <span class="block h-10 w-px bg-bone-200/40" />
      </div>
    </div>
  </section>
</template>
