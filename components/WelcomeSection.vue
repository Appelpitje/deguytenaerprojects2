<script setup lang="ts">
useHead({
  title: 'Welkom — De Guytenaer Projects',
})
</script>

<template>
  <section id="welkom" class="section relative">
    <div class="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-5">
        <p class="eyebrow">Welkom</p>
        <h2 class="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Thuis in
          <span class="italic text-accent-500">huis en tuin.</span>
        </h2>
      </div>
      <div class="lg:col-span-7">
        <p class="text-base leading-relaxed text-ink-600 text-pretty sm:text-lg">
          De Guytenaer Projects is gespecialiseerd in tuinonderhoud, tuinaanleg
          en tegelwerken. Verder kan u bij ons ook terecht voor kleine
          karweien. Wij leggen de nadruk op esthetiek en een gedetailleerde
          afwerking — van de eerste schets tot de laatste voeg.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/over-ons" class="btn-ghost">
            Meer over ons
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </NuxtLink>
          <NuxtLink to="/diensten" class="text-sm font-medium text-ink-700 underline-offset-4 hover:underline">
            Ontdek onze diensten →
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
