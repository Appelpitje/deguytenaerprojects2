<script setup lang="ts">
useHead({ title: 'Over De Guytenaer Projects' })
</script>

<template>
  <section id="over" class="section">
    <div class="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
      <article class="relative">
        <div class="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full bg-accent-200/50 blur-2xl lg:block" />
        <p class="eyebrow">Over ons</p>
        <h2 class="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Over
          <span class="italic text-accent-500">De Guytenaer Projects</span>
        </h2>
        <div class="mt-6 space-y-4 text-base leading-relaxed text-ink-600 text-pretty">
          <p>
            De Guytenaer Projects is ontstaan uit de passies van Lauren de
            Guytenaer, binnen de tuin- en bouwsector. De nadruk wordt
            vooral gelegd op esthetiek en een gedetailleerde afwerking.
          </p>
          <p>
            Onze sterkte zit hem in het persoonlijk contact met de klant,
            zodat u ten alle tijden sterk betrokken blijft bij het project.
            Van een huis een thuis maken vraagt enorm veel werk en
            inspanning — wij staan u bij van afwerking tot onderhoud.
          </p>
        </div>

        <figure class="mt-8 rounded-3xl border border-ink-100 bg-bone-200/60 p-6 sm:p-8">
          <blockquote class="font-display text-lg italic leading-relaxed text-ink-700 sm:text-xl">
            “Van een huis een thuis maken vraagt enorm veel werk en
            inspanning. Dit gaat van afwerking tot het onderhoud. Voor al
            deze werken wil ik de klant zo goed mogelijk bijstaan zodat
            hij ten volle kan genieten van zijn nieuwe thuis.”
          </blockquote>
          <figcaption class="mt-4 text-sm text-ink-500">
            — Lauren de Guytenaer
          </figcaption>
        </figure>

        <div class="mt-8 flex flex-wrap items-center gap-6 text-sm text-ink-500">
          <span class="flex items-center gap-2">
            <Icon name="lucide:map-pin" class="h-4 w-4 text-accent-500" />
            Vlaanderen
          </span>
          <span class="flex items-center gap-2">
            <Icon name="lucide:phone" class="h-4 w-4 text-accent-500" />
            0475/43.53.94
          </span>
          <span class="flex items-center gap-2">
            <Icon name="lucide:mail" class="h-4 w-4 text-accent-500" />
            info@deguytenaerprojects.be
          </span>
        </div>
      </article>

      <ContactForm />
    </div>
  </section>
</template>
