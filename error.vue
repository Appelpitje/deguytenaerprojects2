<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string } }>()

useHead({ title: `Fout ${props.error.statusCode} — De Guytenaer Projects` })

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-bone-100 px-6 py-24 text-center">
    <div class="max-w-lg">
      <p class="eyebrow">Fout {{ error.statusCode }}</p>
      <h1 class="mt-4 font-display text-5xl font-semibold text-ink-800 sm:text-6xl">
        Iets liep niet zoals gepland.
      </h1>
      <p class="mt-4 text-base text-ink-600">
        {{ error.message || 'De pagina die u zoekt, is niet beschikbaar.' }}
      </p>
      <button class="btn-primary mt-8" @click="handleError">
        Terug naar de startpagina
        <Icon name="lucide:arrow-right" class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
