<script setup lang="ts">
interface Project {
  title: string
  category: string
  description: string
  /** Vrije zoekterm — wordt opgezocht in de Unsplash-catalogus */
  query: string
}

const projects: Project[] = [
  {
    title: 'Kijkwoning Huysman Bouw',
    category: 'Waarschoot',
    description:
      'Opdracht in samenwerking met Huysman Bouw — volledige betegeling van de kijkwoning, inclusief badkamers, keuken en leefruimtes.',
    query: 'moderne woning gevel'
  },
  {
    title: 'Houten constructie & vloer',
    category: 'Woning in Vlaanderen',
    description:
      'Een eigentijdse uitbouw met houten constructie en een naadloos geïntegreerde tegelvloer die binnen en buiten met elkaar verbindt.',
    query: 'binnenhout met tegel'
  },
  {
    title: 'Badkamerrenovatie',
    category: 'Privé-woning',
    description:
      'Totaalrenovatie van een badkamer met marmerlook tegels, inloopdouche en een strakke, tijdloze afwerking.',
    query: 'inloopdouche marmer'
  }
]

const { data: images } = await useAsyncData('recent-projects', async () => {
  const out: Record<string, { src: string; alt: string }> = {}
  for (const p of projects) {
    const res = await useUnsplashImage(p.query, { width: 1600, static: true })
    out[p.query] = { src: res.src, alt: res.alt }
  }
  return out
})

const active = ref(0)
const total = projects.length

const next = () => (active.value = (active.value + 1) % total)
const prev = () => (active.value = (active.value - 1 + total) % total)

let timer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  timer = setInterval(next, 7000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section id="recente-projecten" class="section relative overflow-hidden bg-ink-800 text-bone-100">
    <div class="container-x">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow !text-accent-200">Recente projecten</p>
          <h2 class="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-bone-50 sm:text-4xl md:text-5xl">
            Vakwerk in
            <span class="italic text-accent-200">beeld.</span>
          </h2>
        </div>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="grid h-12 w-12 place-items-center rounded-full border border-bone-100/20 text-bone-100 transition hover:border-bone-100 hover:bg-bone-100 hover:text-ink-800"
            aria-label="Vorig project"
            @click="prev"
          >
            <Icon name="lucide:arrow-left" class="h-5 w-5" />
          </button>
          <button
            type="button"
            class="grid h-12 w-12 place-items-center rounded-full border border-bone-100/20 text-bone-100 transition hover:border-bone-100 hover:bg-bone-100 hover:text-ink-800"
            aria-label="Volgend project"
            @click="next"
          >
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <div class="relative overflow-hidden rounded-3xl border border-bone-100/10 bg-ink-700 shadow-glow">
            <div class="aspect-[4/3] w-full overflow-hidden">
              <transition
                enter-active-class="transition duration-700 ease-out"
                enter-from-class="opacity-0 scale-105"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-500 ease-in absolute inset-0"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
                mode="out-in"
              >
                <img
                  :key="active"
                  :src="images?.[projects[active].query]?.src"
                  :alt="images?.[projects[active].query]?.alt || projects[active].title"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </transition>
            </div>
            <div class="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-ink-900/70 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-bone-100 backdrop-blur">
              <span class="h-1.5 w-1.5 rounded-full bg-accent-300" />
              {{ String(active + 1).padStart(2, '0') }} / {{ String(total).padStart(2, '0') }}
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-3"
            enter-to-class="opacity-100 translate-y-0"
            mode="out-in"
          >
            <div :key="active">
              <p class="eyebrow !text-accent-200">{{ projects[active].category }}</p>
              <h3 class="mt-3 font-display text-2xl font-semibold leading-tight text-bone-50 sm:text-3xl md:text-4xl">
                {{ projects[active].title }}
              </h3>
              <p class="mt-4 text-base text-bone-200/80 text-pretty">
                {{ projects[active].description }}
              </p>
              <div class="mt-8 flex flex-wrap gap-3">
                <NuxtLink to="/projecten" class="btn-primary !bg-bone-100 !text-ink-800 hover:!bg-bone-200">
                  Alle projecten
                  <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
                </NuxtLink>
                <NuxtLink to="/contact" class="btn-ghost !border-bone-100/30 !text-bone-100 hover:!bg-bone-100 hover:!text-ink-800">
                  Offerte aanvragen
                </NuxtLink>
              </div>
            </div>
          </transition>

          <div class="mt-10 flex items-center gap-2">
            <button
              v-for="(p, i) in projects"
              :key="i"
              type="button"
              :aria-label="`Toon project ${i + 1}`"
              class="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-bone-100/15"
              @click="active = i"
            >
              <span
                class="absolute inset-y-0 left-0 rounded-full bg-accent-300 transition-all duration-500"
                :style="{ width: i === active ? '100%' : i < active ? '100%' : '0%' }"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
