<script setup lang="ts">
interface NavLink {
  label: string
  to: string
}

defineProps<{ links: NavLink[] }>()

const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

// `atTop` = bovenaan de pagina (over de donkere hero).
// Hier gebruiken we lichte tekst + donkere glassmorphism-tint.
// `scrolled` = voorbij de hero (over lichte content):
// donkere tekst + witte glassmorphism.
const atTop = computed(() => !scrolled.value && !open.value)

const handleScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => route.fullPath, () => {
  open.value = false
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="scrolled || open ? 'py-3' : 'py-5'"
  >
    <div class="container-x">
      <div
        class="flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6"
        :class="[
          scrolled || open
            ? 'border-white/40 bg-white/70 shadow-soft backdrop-blur-xl'
            : 'border-white/15 bg-ink-900/25 backdrop-blur-md',
          'supports-[backdrop-filter]:bg-ink-900/15'
        ]"
      >
        <!-- Logo: kleuren flippen -->
        <NuxtLink to="/" class="group flex items-center gap-3">
          <span
            class="grid h-10 w-10 place-items-center rounded-full font-display text-base font-semibold transition group-hover:bg-accent-500"
            :class="atTop
              ? 'bg-bone-100 text-ink-800'
              : 'bg-ink-800 text-bone-100'"
          >
            DGP
          </span>
          <span class="hidden flex-col leading-tight sm:flex">
            <span
              class="font-display text-sm font-semibold tracking-tight transition-colors duration-500"
              :class="atTop ? 'text-bone-50' : 'text-ink-800'"
            >
              De Guytenaer
            </span>
            <span
              class="text-[10px] uppercase tracking-[0.22em] transition-colors duration-500"
              :class="atTop ? 'text-bone-200/70' : 'text-ink-400'"
            >
              Projects
            </span>
          </span>
        </NuxtLink>

        <!-- Nav links: kleuren flippen -->
        <nav class="hidden items-center gap-1 lg:flex">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-500"
            :class="atTop
              ? 'text-bone-100/90 hover:text-bone-50'
              : 'text-ink-700 hover:text-ink-900'"
            active-class=""
          >
            <span :class="{ 'text-bone-50': atTop && route.path === link.to, 'text-ink-900': !atTop && route.path === link.to }">
              {{ link.label }}
            </span>
            <span
              class="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-accent-500 transition-transform duration-300"
              :class="{ 'scale-x-100': route.path === link.to }"
            />
          </NuxtLink>
        </nav>

        <!-- CTA: knopstijl flippen -->
        <div class="hidden lg:block">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium shadow-soft transition-all duration-500"
            :class="atTop
              ? 'bg-bone-100 text-ink-800 hover:bg-bone-200'
              : 'bg-ink-800 text-bone-100 hover:bg-ink-700'"
          >
            Offerte aanvragen
            <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
          </NuxtLink>
        </div>

        <!-- Mobiele menu-knop -->
        <button
          type="button"
          class="grid h-10 w-10 place-items-center rounded-full border transition-colors duration-500 lg:hidden"
          :class="atTop
            ? 'border-white/30 bg-ink-900/30 text-bone-50 hover:border-bone-50'
            : 'border-ink-200 bg-white/70 text-ink-800 hover:border-ink-800'"
          :aria-expanded="open"
          aria-label="Menu openen"
          @click="open = !open"
        >
          <Icon :name="open ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5" />
        </button>
      </div>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav
          v-if="open"
          class="mt-3 grid gap-1 rounded-3xl border border-white/40 bg-white/85 p-3 shadow-soft backdrop-blur-xl lg:hidden"
        >
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-2xl px-4 py-3 text-sm font-medium text-ink-700 transition hover:bg-bone-200 hover:text-ink-900"
            active-class="bg-ink-800 text-bone-100 hover:bg-ink-800 hover:text-bone-100"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-primary mt-2 w-full">
            Offerte aanvragen
            <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
          </NuxtLink>
        </nav>
      </transition>
    </div>
  </header>
</template>
