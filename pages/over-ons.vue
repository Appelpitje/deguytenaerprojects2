<script setup lang="ts">
useHead({
  title: 'Over Ons — De Guytenaer Projects',
  meta: [
    {
      name: 'description',
      content:
        'De Guytenaer Projects is ontstaan uit de passie van Lauren de Guytenaer. Tegelwerken, tuinonderhoud en kleine karweien met persoonlijke aanpak in Vlaanderen.'
    },
    {
      name: 'keywords',
      content:
        'over De Guytenaer Projects, tegelwerker Vlaanderen, Lauren de Guytenaer, vakmanschap tegelwerken'
    }
  ]
})
</script>

<template>
  <div>
    <section class="relative isolate overflow-hidden bg-ink-900 pt-40 pb-24 text-bone-100">
      <img
        :src="useUnsplashImage.byId('1600585154340-be6161a56a0c', 1920, 80, '').src"
        alt=""
        class="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/60 to-ink-900" />

      <div class="container-x">
        <p class="eyebrow !text-accent-200">Over ons</p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-bone-50 sm:text-5xl md:text-6xl">
          Vakmanschap met
          <span class="italic text-accent-200">een persoonlijke aanpak.</span>
        </h1>
        <p class="mt-6 max-w-2xl text-base text-bone-200/80 sm:text-lg">
          Thuis in huis en tuin — dat is waar De Guytenaer Projects voor
          staat. Ontdek ons verhaal en onze werkwijze.
        </p>
      </div>
    </section>

    <AboutSection />
    <UspSection />
  </div>
</template>
