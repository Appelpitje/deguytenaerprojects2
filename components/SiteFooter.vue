<script setup lang="ts">
const year = new Date().getFullYear()

const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/deguytenaerprojects', icon: 'lucide:facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/deguytenaerprojects', icon: 'lucide:instagram' }
]
</script>

<template>
  <footer class="relative bg-ink-900 text-bone-100">
    <div class="container-x py-16">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <NuxtLink to="/" class="flex items-center gap-3">
            <span class="grid h-10 w-10 place-items-center rounded-full bg-bone-100 font-display text-base font-semibold text-ink-800">
              DGP
            </span>
            <span class="flex flex-col leading-tight">
              <span class="font-display text-base font-semibold text-bone-50">De Guytenaer</span>
              <span class="text-[10px] uppercase tracking-[0.22em] text-bone-200/60">Projects</span>
            </span>
          </NuxtLink>
          <p class="mt-5 max-w-md text-sm leading-relaxed text-bone-200/70">
            Uw partner in tegelwerken — zowel binnen als buiten. Hoogwaardige
            afwerking met oog voor detail, in heel Vlaanderen.
          </p>
        </div>

        <div class="lg:col-span-3">
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-bone-200/60">Contact</h3>
          <ul class="mt-5 space-y-3 text-sm text-bone-100/90">
            <li class="flex items-start gap-3">
              <Icon name="lucide:map-pin" class="mt-0.5 h-4 w-4 text-accent-300" />
              Croonestraat 15, 9991 Adegem
            </li>
            <li>
              <a href="tel:+32475435394" class="flex items-center gap-3 hover:text-accent-200">
                <Icon name="lucide:phone" class="h-4 w-4 text-accent-300" />
                0475/43.53.94
              </a>
            </li>
            <li>
              <a href="mailto:info@deguytenaerprojects.be" class="flex items-center gap-3 hover:text-accent-200">
                <Icon name="lucide:mail" class="h-4 w-4 text-accent-300" />
                info@deguytenaerprojects.be
              </a>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-bone-200/60">Snelle links</h3>
          <ul class="mt-5 grid grid-cols-2 gap-y-2 text-sm text-bone-100/90">
            <li><NuxtLink to="/" class="hover:text-accent-200">Home</NuxtLink></li>
            <li><NuxtLink to="/over-ons" class="hover:text-accent-200">Over Ons</NuxtLink></li>
            <li><NuxtLink to="/diensten" class="hover:text-accent-200">Diensten</NuxtLink></li>
            <li><NuxtLink to="/projecten" class="hover:text-accent-200">Projecten</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-accent-200">Contact</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="mt-14 flex flex-col items-start justify-between gap-6 border-t border-bone-100/10 pt-8 sm:flex-row sm:items-center">
        <p class="text-xs text-bone-200/60">
          © {{ year }} De Guytenaer Projects — Alle rechten voorbehouden.
        </p>
        <div class="flex items-center gap-3">
          <a
            v-for="s in socials"
            :key="s.name"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="s.name"
            class="grid h-10 w-10 place-items-center rounded-full border border-bone-100/15 text-bone-100 transition hover:border-bone-100 hover:bg-bone-100 hover:text-ink-800"
          >
            <Icon :name="s.icon" class="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
