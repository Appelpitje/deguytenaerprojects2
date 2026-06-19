// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],

  icon: {
    serverBundle: {
      collections: ['lucide']
    }
  },

  runtimeConfig: {
    // Server-side only — Unsplash API key (nooit publiek)
    unsplashAccessKey: process.env.NUXT_UNSPLASH_ACCESS_KEY || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://deguytenaerprojects.be',
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || 'info@deguytenaerprojects.be',
      contactPhone: process.env.NUXT_PUBLIC_CONTACT_PHONE || '+32475435394',
      formspreeId: process.env.NUXT_PUBLIC_FORMSPREE_ID || ''
    }
  },

  css: ['~/assets/css/tailwind.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'nl-BE' },
      title: 'De Guytenaer Projects — Tegelwerken in Vlaanderen',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'De Guytenaer Projects is uw partner in tegelwerken zowel binnen als buiten in Vlaanderen. Badkamer betegelen, vloeren leggen en terrasaanleg in Torhout, Adegem en omstreken.'
        },
        {
          name: 'keywords',
          content:
            'tegelwerker Vlaanderen, vloeren leggen Torhout, badkamer betegelen, terrasaanleg tegelwerken, tegelwerken Adegem, vloerafwerking, tuinonderhoud'
        },
        { name: 'author', content: 'De Guytenaer Projects' },
        { name: 'theme-color', content: '#1c1917' },
        { name: 'geo.region', content: 'BE-VLG' },
        { name: 'geo.placename', content: 'Adegem, Vlaanderen' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'nl_BE' },
        { property: 'og:site_name', content: 'De Guytenaer Projects' },
        {
          property: 'og:title',
          content: 'De Guytenaer Projects — Tegelwerken in Vlaanderen'
        },
        {
          property: 'og:description',
          content:
            'Hoogwaardige tegelwerken voor binnen en buiten. Badkamers, keukens, vloeren en terrassen. Vraag uw vrijblijvende offerte aan.'
        },
        {
          property: 'og:image',
          content: '/images/og-dgp.jpg'
        },
        { property: 'og:url', content: 'https://deguytenaerprojects.be' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'De Guytenaer Projects — Tegelwerken in Vlaanderen'
        },
        {
          name: 'twitter:description',
          content:
            'Hoogwaardige tegelwerken voor binnen en buiten in Vlaanderen.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap'
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'De Guytenaer Projects',
            image: 'https://deguytenaerprojects.be/images/og-dgp.jpg',
            telephone: '+32 475 43 53 94',
            email: 'info@deguytenaerprojects.be',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Croonestraat 15',
              addressLocality: 'Adegem',
              postalCode: '9991',
              addressCountry: 'BE'
            },
            areaServed: 'Vlaanderen',
            description:
              'Tegelwerken, vloerafwerking en terrasaanleg in Vlaanderen.',
            url: 'https://deguytenaerprojects.be',
            priceRange: '€€'
          })
        }
      ]
    }
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.js'
  }
})
