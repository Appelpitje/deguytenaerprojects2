<script setup lang="ts">
useHead({
  title: 'Contact — De Guytenaer Projects',
  meta: [
    {
      name: 'description',
      content:
        'Neem contact op met De Guytenaer Projects uit Adegem, Vlaanderen. Vraag een vrijblijvende offerte voor tegelwerken, badkamer- of vloerrenovatie.'
    },
    {
      name: 'keywords',
      content:
        'contact De Guytenaer Projects, offerte tegelwerken Vlaanderen, Adegem, telefoon, e-mail'
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
        <p class="eyebrow !text-accent-200">Contact</p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-bone-50 sm:text-5xl md:text-6xl">
          Laten we uw project
          <span class="italic text-accent-200">bespreken.</span>
        </h1>
        <p class="mt-6 max-w-2xl text-base text-bone-200/80 sm:text-lg">
          Wij horen graag wat uw doelen zijn, wat uw specifieke noden
          zijn en wat u van ons zou verwachten.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container-x grid gap-12 lg:grid-cols-12">
        <aside class="space-y-6 lg:col-span-4">
          <div class="rounded-3xl border border-ink-100 bg-bone-200/60 p-6 sm:p-8">
            <h2 class="font-display text-xl font-semibold text-ink-800 sm:text-2xl">
              Contactgegevens
            </h2>
            <ul class="mt-6 space-y-4 text-sm text-ink-700">
              <li class="flex items-start gap-3">
                <span class="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-accent-200">
                  <Icon name="lucide:map-pin" class="h-4 w-4" />
                </span>
                <div>
                  <p class="text-xs uppercase tracking-[0.2em] text-ink-400">Adres</p>
                  <p class="mt-0.5 font-medium text-ink-800">
                    Croonestraat 15, 9991 Adegem, België
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-accent-200">
                  <Icon name="lucide:phone" class="h-4 w-4" />
                </span>
                <div>
                  <p class="text-xs uppercase tracking-[0.2em] text-ink-400">Telefoon</p>
                  <a href="tel:+32475435394" class="mt-0.5 block font-medium text-ink-800 hover:text-accent-500">
                    +(32) 475/43.53.94
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-accent-200">
                  <Icon name="lucide:mail" class="h-4 w-4" />
                </span>
                <div>
                  <p class="text-xs uppercase tracking-[0.2em] text-ink-400">E-mail</p>
                  <a href="mailto:info@deguytenaerprojects.be" class="mt-0.5 block font-medium text-ink-800 hover:text-accent-500">
                    info@deguytenaerprojects.be
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div class="rounded-3xl border border-ink-100 bg-ink-800 p-6 text-bone-100 sm:p-8">
            <p class="eyebrow !text-accent-200">Werkregio</p>
            <h3 class="mt-3 font-display text-xl font-semibold sm:text-2xl">
              Heel Vlaanderen
            </h3>
            <p class="mt-3 text-sm text-bone-200/80">
              Wij werken in Torhout, Adegem, Brugge, Roeselare, Kortrijk,
              Gent, Aalst, Sint-Niklaas en de volledige regio Vlaanderen.
            </p>
            <div class="mt-5 flex flex-wrap gap-2 text-xs">
              <span v-for="city in ['Torhout','Adegem','Brugge','Roeselare','Kortrijk','Oostende','Gent','Aalst','Sint-Niklaas']" :key="city" class="rounded-full border border-bone-100/20 px-3 py-1">
                {{ city }}
              </span>
            </div>
          </div>
        </aside>

        <div class="lg:col-span-8">
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>
