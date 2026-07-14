<script setup lang="ts">
/**
 * Одна страница на все три услуги. Старые адреса сохранены:
 * /services/restorations, /services/repairs, /services/gutters.
 */
import { getService } from '~/data/services'
import { site } from '~/data/site'
import { photosByCategory } from '~/composables/usePhotos'

const route = useRoute()
const service = getService(route.params.slug as string)

if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
}

const photos = computed(() => photosByCategory(service!.photoCategory))
const openIndex = ref<number | null>(null)

const config = useRuntimeConfig()
const url = `${config.public.siteUrl}${service.to}`

useSeoMeta({
  title: service.seoTitle,
  description: service.seoDescription,
  ogTitle: `${service.seoTitle} | ${site.name}`,
  ogDescription: service.seoDescription,
  ogUrl: url,
})

useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.seoTitle,
        serviceType: service.title,
        description: service.seoDescription,
        url,
        provider: {
          '@type': 'RoofingContractor',
          name: site.name,
          telephone: site.phone.international,
          url: config.public.siteUrl,
        },
        areaServed: { '@type': 'City', name: 'Melbourne' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.title} — what's included`,
          itemListElement: service.benefits.map((benefit) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: benefit },
          })),
        },
      }),
    },
  ],
})
</script>

<template>
  <div v-if="service">
    <PageHero
      eyebrow="Services"
      :title="service.heading"
      :text="service.intro"
      :crumbs="[{ label: 'Services', to: '/services' }, { label: service.title }]"
      :photo="service.hero"
    />

    <!-- Что входит + как мы это делаем -->
    <section class="section">
      <div class="container-page">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <RevealGroup class="lg:col-span-5" from="left">
            <p class="eyebrow">What's included</p>
            <h2 class="mt-4 text-h2">Everything in the price</h2>
            <ul class="mt-8 space-y-3.5">
              <li
                v-for="benefit in service.benefits"
                :key="benefit"
                class="flex items-start gap-3 rounded-xl bg-surface-muted px-4 py-3"
              >
                <Icon name="check" class="mt-0.5 size-5 shrink-0 text-success" />
                <span class="font-medium text-brand-900">{{ benefit }}</span>
              </li>
            </ul>
          </RevealGroup>

          <RevealGroup class="lg:col-span-7" :stagger="60">
            <p class="eyebrow">The process</p>
            <h2 class="mt-4 text-h2">How the job runs</h2>

            <div
              v-for="(step, index) in service.steps"
              :key="step.title"
              class="mt-8 flex gap-5 first:mt-8"
            >
              <span
                class="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-700 font-display font-extrabold text-white shadow-glow"
              >
                {{ index + 1 }}
              </span>
              <div>
                <h3 class="font-display text-lg font-extrabold text-brand-900">{{ step.title }}</h3>
                <p class="mt-1.5 text-ink-soft">{{ step.text }}</p>
              </div>
            </div>
          </RevealGroup>
        </div>
      </div>
    </section>

    <!-- Галерея именно этой услуги -->
    <section v-if="photos.length" class="section bg-surface-muted">
      <div class="container-page">
        <SectionHeading
          eyebrow="Our work"
          :title="`${service.title} we've completed`"
          text="Our own photos from our own jobs. Tap any of them to see it full size."
        />

        <RevealGroup
          class="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4"
          :stagger="60"
          from="scale"
        >
          <button
            v-for="(photo, index) in photos"
            :key="photo.slug"
            type="button"
            class="group overflow-hidden rounded-2xl shadow-soft transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-lift"
            :aria-label="`Open photo: ${photo.alt}`"
            @click="openIndex = index"
          >
            <AppImage
              :src="photo.slug"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              ratio="3 / 4"
              class="w-full"
              img-class="transition-transform duration-700 ease-out-soft group-hover:scale-110"
            />
          </button>
        </RevealGroup>
      </div>

      <Lightbox
        :photos="photos"
        :index="openIndex"
        @close="openIndex = null"
        @navigate="openIndex = $event"
      />
    </section>

    <!-- FAQ по услуге -->
    <section class="section">
      <div class="container-page">
        <SectionHeading eyebrow="Questions" :title="`${service.title} — the usual questions`" />
        <RevealGroup class="mx-auto mt-12 max-w-3xl">
          <FaqList :items="service.faqs" />
        </RevealGroup>
      </div>
    </section>

    <CtaSection :source="service.title" />
  </div>
</template>
