<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: 'Tegelwerken',
  message: ''
})

const services = [
  'Tegelwerken',
  'Vloerafwerking',
  'Badkamerrenovatie',
  'Terrasaanleg',
  'Tuinonderhoud',
  'Klein karwei'
]

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const submit = async () => {
  status.value = 'sending'
  try {
    const endpoint = useRuntimeConfig().public.formspreeId
      ? `https://formspree.io/f/${useRuntimeConfig().public.formspreeId}`
      : null

    if (endpoint) {
      await $fetch(endpoint, { method: 'POST', body: { ...form } })
    } else {
      // TODO: vervang door eigen Nuxt server-route of gewenste service
      // await $fetch('/api/offerte', { method: 'POST', body: { ...form } })
      await new Promise((r) => setTimeout(r, 900))
    }

    status.value = 'sent'
    Object.assign(form, { name: '', email: '', phone: '', message: '' })
  } catch (e) {
    status.value = 'error'
  }
}
</script>

<template>
  <aside id="offerte" class="relative">
    <div class="absolute -right-6 -top-6 hidden h-24 w-24 rounded-full bg-accent-200/40 blur-2xl lg:block" />

    <div class="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8">
      <p class="eyebrow">Offerte</p>
      <h2 class="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl">
        Aanvraag
        <span class="italic text-accent-500">prijsofferte</span>
      </h2>
      <p class="mt-3 text-sm text-ink-500">
        Wenst u een offerte te ontvangen voor een van onze activiteiten?
        Wij maken graag een vrijblijvende offerte op maat.
      </p>

      <form class="mt-6 grid gap-4" @submit.prevent="submit">
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="name" class="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
              Naam
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              autocomplete="name"
              class="input-field"
              placeholder="Uw volledige naam"
            />
          </div>
          <div>
            <label for="phone" class="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
              Telefoon
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              class="input-field"
              placeholder="0475/12.34.56"
            />
          </div>
        </div>

        <div>
          <label for="email" class="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
            E-mail
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            class="input-field"
            placeholder="u@voorbeeld.be"
          />
        </div>

        <div>
          <label for="service" class="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
            Dienst
          </label>
          <select id="service" v-model="form.service" class="input-field">
            <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <div>
          <label for="message" class="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
            Projectbeschrijving
          </label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            required
            class="input-field resize-none"
            placeholder="Vertel ons kort over uw project (type ruimte, oppervlakte, gewenste tegels...)"
          />
        </div>

        <button
          type="submit"
          class="btn-primary mt-2 w-full justify-center"
          :disabled="status === 'sending'"
        >
          <span v-if="status === 'sending'">Versturen…</span>
          <span v-else-if="status === 'sent'" class="flex items-center gap-2">
            <Icon name="lucide:check" class="h-4 w-4" />
            Bedankt — we nemen snel contact op
          </span>
          <span v-else class="flex items-center gap-2">
            Verstuur aanvraag
            <Icon name="lucide:send" class="h-4 w-4" />
          </span>
        </button>

        <p class="text-center text-xs text-ink-400">
          Door te versturen gaat u akkoord met onze privacyverklaring.
        </p>
      </form>
    </div>
  </aside>
</template>
