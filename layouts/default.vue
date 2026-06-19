<script setup lang="ts">
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Over Ons', to: '/over-ons' },
  { label: 'Diensten', to: '/diensten' },
  { label: 'Projecten', to: '/projecten' },
  { label: 'Contact', to: '/contact' }
]
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <SiteNavbar :links="navLinks" />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
