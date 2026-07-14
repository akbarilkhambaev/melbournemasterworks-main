<script setup lang="ts">
import { site } from '~/data/site'

// Раньше сайт не отдавал ни одной картинки для репостов — ссылка в WhatsApp
// или Facebook выглядела голым текстом
useSeoMeta({
  ogImage: `${site.url}/og-image.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogSiteName: site.name,
  ogLocale: 'en_AU',
  twitterCard: 'summary_large_image',
})

// Карточка организации для Google — теперь она попадает в статический HTML,
// а не рисуется в браузере, как на старом SPA-сайте
useHead({
  titleTemplate: (title) => (title ? `${title} | ${site.name}` : site.name),
  // Секции появляются на скролле, то есть стартуют прозрачными. Если скрипт не
  // отработал, без этого весь текст остался бы невидимым — и для человека, и
  // для краулера, который не исполняет JS.
  noscript: [
    {
      innerHTML: '<style>[data-reveal] > *{opacity:1 !important;transform:none !important}</style>',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RoofingContractor',
        name: site.name,
        url: site.url,
        telephone: site.phone.international,
        email: site.email,
        image: `${site.url}/og-image.jpg`,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.suburb,
          addressRegion: site.address.state,
          postalCode: site.address.postcode,
          addressCountry: site.address.country,
        },
        areaServed: { '@type': 'City', name: 'Melbourne' },
        description:
          'Licensed roof restoration, roof repairs and gutter replacement across metropolitan Melbourne. Fixed prices and a 10-year workmanship warranty.',
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
