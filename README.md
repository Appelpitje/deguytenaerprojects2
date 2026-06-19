# De Guytenaer Projects — Website (Nuxt 3 + Tailwind CSS)

Een moderne, mobielvriendelijke en conversiegerichte single-page website
(modulaire layout) voor **De Guytenaer Projects** — specialist in
tegelwerken, vloerafwerking en terrasaanleg in Vlaanderen.

## Stack

- **Nuxt 3** (Composition API + `<script setup>`)
- **Tailwind CSS** (custom warm/luxe kleurenpalet)
- **Lucide Vue Next** iconen
- Volledig responsive, mobile-first
- Lokale SEO voor Vlaanderen (`useHead`, JSON-LD `LocalBusiness`)

## Installatie

```bash
# 1. Installeer dependencies
npm install

# 2. Start dev-server
npm run dev
# → http://localhost:3000

# 3. Productiebuild
npm run build
npm run preview

# 4. Statische export (geschikt voor shared hosting)
npm run generate
```

> **Node 18+** vereist.

## Projectstructuur

```
dgp-website/
├── app.vue
├── error.vue
├── nuxt.config.ts          # SEO meta, JSON-LD, fonts
├── tailwind.config.js      # Custom palette (bone / stonewarm / accent)
├── assets/css/tailwind.css
├── components/
│   ├── SiteNavbar.vue      # Glassmorphism navbar + mobiel menu
│   ├── HeroSection.vue     # Full-screen hero + parallax
│   ├── WelcomeSection.vue
│   ├── RealisationsGrid.vue
│   ├── RecentProjectsCarousel.vue
│   ├── AboutSection.vue    # Twee-koloms: Over + Offerte
│   ├── ContactForm.vue
│   ├── UspSection.vue      # 3 USP's + vertrouwensstrook
│   └── SiteFooter.vue
├── composables/
│   └── useWindowScroll.ts
├── layouts/
│   └── default.vue
└── pages/
    ├── index.vue           # Home
    ├── over-ons.vue
    ├── diensten.vue
    ├── projecten.vue
    └── contact.vue
```

## Foto's & Unsplash

De site gebruikt een **centraal afbeeldingssysteem** dat in twee modi
werkt:

### 1. Zonder API-key (default)

Een handmatig gecureerde catalogus in
[`utils/unsplashCatalog.ts`](./utils/unsplashCatalog.ts) met
**~25 geteste Unsplash-foto's**, georganiseerd per zoekterm
(badkamer, terras, vloer, …). De site werkt meteen, geen setup nodig.

### 2. Met Unsplash API-key (verse, dynamische resultaten)

Vraag een gratis key aan op
[unsplash.com/developers](https://unsplash.com/developers) en zet 'm in
`.env`:

```env
NUXT_UNSPLASH_ACCESS_KEY=jouw_key_hier
```

De server route [`server/api/unsplash.get.ts`](./server/api/unsplash.get.ts)
zoekt dan verse, context-relevante foto's via
`/api/unsplash?query=badkamer+tegels&per_page=3`. Bij een API-fout
valt het systeem automatisch terug op de catalogus.

### Foto's vervangen door eigen werk

Voor de hero:

1. Plaats een eigen foto in `public/images/hero-tegelwerk.jpg`
2. De Hero probeert dit lokale pad eerst; bij 404 valt hij terug op
   de catalogus (`useUnsplashImage.byId('1552321554-5fefe8c9ef14', …)`)

Voor realisaties / projecten / diensten: pas de `query`-velden aan
in de componenten of voeg nieuwe entries toe aan `unsplashCatalog.ts`.
Het composable [`composables/useUnsplashImage.ts`](./composables/useUnsplashImage.ts)
kiest automatisch de juiste bron.

### Aanbevolen formaten

| Locatie                    | Formaat  | Min. afmeting |
|----------------------------|----------|----------------|
| Hero (full-screen)         | JPG/WebP | 1920×1080      |
| Realisaties grid           | JPG/WebP | 1200×900       |
| Recente projecten slider   | JPG/WebP | 1600×1200      |
| Projecten pagina (groot)   | JPG/WebP | 1600×1067      |
| Projecten galerij          | JPG/WebP | 1200×1200      |

## SEO

- `<html lang="nl-BE">`
- Per pagina unieke `title`, `description` en `keywords`
- Open Graph + Twitter cards
- `JSON-LD LocalBusiness` met adres, telefoon, e-mail, regio
- Geo-tags: `geo.region = BE-VLG` (Vlaanderen)
- Semantische HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)

## Navbar — color inversion

De header past zich automatisch aan de ondergrond aan:

- **Bovenaan** (over de donkere hero): lichte tekst, subtiele donkere
  glassmorphism-tint en witte CTA-knop.
- **Beneden** (over lichte content): donkere tekst, witte glassmorphism
  en donkere CTA-knop.

De transitie gebeurt met `transition-colors duration-500` zodat het
vloeiend verloopt bij het scrollen.

## Contactformulier koppelen

`components/ContactForm.vue` simuleert momenteel een submit. Vervang
de `submit()`-functie door een echte API-call, bv.:

- **Formspree** / **Web3Forms** (snel, geen backend)
- Eigen Nuxt server route: `server/api/offerte.post.ts`
- **Resend** / **Nodemailer** voor eigen mailserver

Voorbeeld met Formspree:

```ts
await $fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  body: form
})
```

## Aanpassingen

- **Kleuren**: `tailwind.config.js` → `theme.extend.colors`
- **Logo**: vervang de `DGP`-tekst in `SiteNavbar.vue` en `SiteFooter.vue`
  door een `<NuxtImg src="/images/logo.svg" />`
- **USP's** / **diensten** / **realisaties**: arrays bovenaan de
  respectievelijke componenten
- **Social media links**: `components/SiteFooter.vue`

## Licentie

Code: vrij te gebruiken voor De Guytenaer Projects.
Foto's: vervang door eigen materiaal of koop rechten.
