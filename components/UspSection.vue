<script setup lang="ts">
useHead({ title: 'Waarom De Guytenaer Projects kiezen' })

const usps = [
  {
    title: 'Kwalitatieve afwerking',
    description:
      'Wij leggen de nadruk op esthetiek en een gedetailleerde afwerking — van de eerste voorbereiding tot de laatste voeg.',
    icon: 'lucide:sparkles'
  },
  {
    title: 'Persoonlijke aanpak',
    description:
      'Onze sterkte is persoonlijk contact. U blijft nauw betrokken bij elke stap van uw project, van idee tot oplevering.',
    icon: 'lucide:handshake'
  },
  {
    title: 'Tevreden klanten',
    description:
      'Een huis een thuis maken is teamwork. Onze klanten waarderen onze service, communicatie en het eindresultaat.',
    icon: 'lucide:heart'
  }
]
</script>

<template>
  <section id="usp" class="section relative overflow-hidden">
    <!-- decoratieve achtergrond -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-accent-200/40 blur-3xl" />
      <div class="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-stonewarm-200/40 blur-3xl" />
    </div>

    <div class="container-x">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow">Waarom ons kiezen</p>
        <h2 class="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Vakmanschap waarop u
          <span class="italic text-accent-500">kunt bouwen.</span>
        </h2>
        <p class="mt-5 text-base text-ink-600 text-pretty sm:text-lg">
          Drie redenen waarom klanten in Vlaanderen voor De Guytenaer
          Projects kiezen.
        </p>
      </div>

      <ul class="mt-14 grid gap-6 md:grid-cols-3">
        <li
          v-for="(u, i) in usps"
          :key="i"
          class="group relative flex flex-col rounded-3xl border border-white/60 bg-white/70 p-8 shadow-soft backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
        >
          <span
            class="grid h-14 w-14 place-items-center rounded-2xl bg-ink-800 text-accent-200 transition group-hover:bg-accent-500 group-hover:text-ink-900"
          >
            <Icon :name="u.icon" class="h-6 w-6" />
          </span>
          <h3 class="mt-6 font-display text-xl font-semibold text-ink-800 sm:text-2xl">
            {{ u.title }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
            {{ u.description }}
          </p>
          <span class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-800">
            <span class="h-px w-6 bg-ink-800 transition-all group-hover:w-10 group-hover:bg-accent-500" />
            Onze belofte
          </span>
        </li>
      </ul>

      <!-- vertrouwensstrook -->
      <div class="mt-16 grid grid-cols-2 gap-6 rounded-3xl border border-ink-100 bg-bone-200/60 p-8 sm:grid-cols-4">
        <div>
          <p class="font-display text-3xl font-semibold text-ink-800 sm:text-4xl">10+</p>
          <p class="mt-1 text-xs uppercase tracking-[0.2em] text-ink-500">Jaar ervaring</p>
        </div>
        <div>
          <p class="font-display text-3xl font-semibold text-ink-800 sm:text-4xl">100%</p>
          <p class="mt-1 text-xs uppercase tracking-[0.2em] text-ink-500">Vrijblijvende offerte</p>
        </div>
        <div>
          <p class="font-display text-3xl font-semibold text-ink-800 sm:text-4xl">VL</p>
          <p class="mt-1 text-xs uppercase tracking-[0.2em] text-ink-500">Regio & vakmanschap</p>
        </div>
        <div>
          <p class="font-display text-3xl font-semibold text-ink-800 sm:text-4xl">★ ★ ★ ★ ★</p>
          <p class="mt-1 text-xs uppercase tracking-[0.2em] text-ink-500">Tevreden klanten</p>
        </div>
      </div>
    </div>
  </section>
</template>
