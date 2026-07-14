<script setup lang="ts">
/**
 * Страница пригорода: /areas/brunswick, /areas/box-hill …
 *
 * Зачем. Люди ищут «roof restoration Brunswick», а не «roof restoration».
 * Одна общая страница /areas такой запрос не выигрывает никогда — она про всё
 * сразу, а значит ни про что конкретно.
 *
 * Чем это НЕ является. Дорвеем: пятьюдесятью страницами, отличающимися только
 * названием города. Такое Google выкидывает из выдачи, и справедливо. Здесь у
 * каждого региона свой честный контекст (какие там дома, какие крыши, что с
 * ними обычно не так), свои фотографии и своя перелинковка с соседями.
 */
import { getSuburb, suburbs } from '~/data/areas'
import { services } from '~/data/services'
import { site } from '~/data/site'
import { photosByCategory } from '~/composables/usePhotos'

const route = useRoute()
const suburb = getSuburb(route.params.suburb as string)

if (!suburb) {
  throw createError({ statusCode: 404, statusMessage: 'Suburb not found', fatal: true })
}

const config = useRuntimeConfig()
const url = `${config.public.siteUrl}/areas/${suburb.slug}`

/** Фото берём из категории, характерной для района, со сдвигом — чтобы у
    соседних пригородов не было одинаковых картинок */
const photos = computed(() => {
  const pool = photosByCategory(suburb!.group.photoCategory)
  const offset = suburb!.slug.length % Math.max(1, pool.length)
  return [...pool.slice(offset), ...pool.slice(0, offset)].slice(0, 6)
})

const openIndex = ref<number | null>(null)

useSeoMeta({
  title: `Roof Restoration ${suburb.name}`,
  description: `Roof restoration, repairs and guttering in ${suburb.name}. ${suburb.group.problem} Free photographed inspection, fixed price, 10-year warranty. Call ${site.phone.display}.`,
  ogTitle: `Roof Restoration in ${suburb.name} | ${site.name}`,
  ogUrl: url,
})

useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RoofingContractor',
        name: `${site.name} — ${suburb.name}`,
        url,
        telephone: site.phone.international,
        image: `${config.public.siteUrl}/og-image.jpg`,
        priceRange: '$$',
        areaServed: {
          '@type': 'City',
          name: suburb.name,
          containedInPlace: { '@type': 'City', name: 'Melbourne' },
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.suburb,
          addressRegion: site.address.state,
          postalCode: site.address.postcode,
          addressCountry: site.address.country,
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: config.public.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Areas', item: `${config.public.siteUrl}/areas` },
          { '@type': 'ListItem', position: 3, name: suburb.name, item: url },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div v-if="suburb">
    <section class="relative overflow-hidden bg-surface pt-28 pb-16 lg:pt-36 lg:pb-20">
      <AmbientBackdrop />

      <div class="container-page relative z-10">
        <nav aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1.5 text-sm text-ink-faint">
            <li><NuxtLink to="/" class="transition-colors hover:text-brand-700">Home</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li>
              <NuxtLink to="/areas" class="transition-colors hover:text-brand-700">Areas</NuxtLink>
            </li>
            <li aria-hidden="true">/</li>
            <li class="font-medium text-brand-900">{{ suburb.name }}</li>
          </ol>
        </nav>

        <div class="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div class="lg:col-span-6">
            <p class="eyebrow">{{ suburb.group.region }}</p>

            <!-- Две строки, а не три inline-блока: между ними не было пробелов,
                 и заголовок склеивался в «Roof restorationinBrunswick» -->
            <h1 class="mt-4 text-h1">
              <SplitText text="Roof restoration" as="span" class="block" :delay="80" />
              <SplitText
                :text="`in ${suburb.name}.`"
                as="span"
                class="block text-brand-600"
                :delay="220"
              />
            </h1>

            <p
              class="mt-6 max-w-xl text-lead text-ink-soft animate-[fade-up_0.7s_var(--ease-out-soft)_both]"
              style="animation-delay: 440ms"
            >
              {{ suburb.group.housing }}
            </p>

            <div
              class="mt-8 flex flex-wrap gap-3 animate-[fade-up_0.7s_var(--ease-out-soft)_both]"
              style="animation-delay: 560ms"
            >
              <MagneticButton as="a" :href="site.phone.href" class="btn-primary group">
                <Icon name="phone" class="size-4" />
                {{ site.phone.display }}
              </MagneticButton>
              <NuxtLink to="/contact" class="btn-ghost group">
                Book a free inspection
                <Icon
                  name="arrow-right"
                  class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </NuxtLink>
            </div>
          </div>

          <div class="lg:col-span-6">
            <ParallaxMedia
              v-if="photos[0]"
              :src="photos[0].slug"
              sizes="(max-width: 1024px) 100vw, 560px"
              ratio="4 / 3"
              priority
              :speed="0.14"
              class="rounded-4xl shadow-lift"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Что мы видим на крышах именно здесь -->
    <section class="section-tight">
      <div class="container-page">
        <RevealGroup class="grid gap-8 rounded-card border border-line bg-surface-muted p-8 lg:grid-cols-12 lg:p-10">
          <div class="lg:col-span-5">
            <p class="eyebrow">What we see here</p>
            <h2 class="mt-4 text-h3">The usual story on {{ suburb.name }} roofs</h2>
          </div>
          <div class="lg:col-span-7">
            <p class="text-lead text-ink-soft">{{ suburb.group.problem }}</p>
            <p class="mt-4 text-ink-soft">
              None of that means you need a new roof. If the tiles and battens are sound — and in
              {{ suburb.name }} they usually are — a restoration puts another two decades on it for
              a fraction of the cost. We get up there, photograph what is actually happening, and
              show you before we quote a cent.
            </p>
          </div>
        </RevealGroup>
      </div>
    </section>

    <!-- Услуги -->
    <section class="section">
      <div class="container-page">
        <SectionHeading
          eyebrow="Services"
          :title="`What we do in ${suburb.name}`"
          text="Three things, and we do all of them across the whole suburb — single storey, double storey, tile or metal."
        />

        <RevealGroup class="mt-14 grid gap-6 md:grid-cols-3" :stagger="70">
          <NuxtLink
            v-for="service in services"
            :key="service.slug"
            :to="service.to"
            class="group flex flex-col rounded-card border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-lift"
          >
            <h3 class="font-display text-lg font-extrabold text-brand-900">{{ service.title }}</h3>
            <p class="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{{ service.short }}</p>
            <span class="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-brand-700">
              Learn more
              <span
                class="grid size-7 place-items-center rounded-full bg-brand-50 transition-all duration-400 ease-out-soft group-hover:translate-x-1 group-hover:bg-brand-700 group-hover:text-white"
              >
                <Icon name="arrow-right" class="size-3.5" :stroke="3" />
              </span>
            </span>
          </NuxtLink>
        </RevealGroup>
      </div>
    </section>

    <!-- Наши работы этого типа -->
    <section v-if="photos.length" class="section bg-surface-muted">
      <div class="container-page">
        <SectionHeading
          eyebrow="Our work"
          :title="`Roofs like the ones in ${suburb.name}`"
          text="Our own photographs, from our own jobs. Tap any of them to see it full size."
        />

        <RevealGroup
          class="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
          :stagger="55"
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
              sizes="(max-width: 640px) 50vw, 17vw"
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

    <!-- Соседние пригороды: перелинковка, которая помогает и людям, и поиску -->
    <section class="section-tight">
      <div class="container-page">
        <RevealGroup>
          <h2 class="text-h3">We also work nearby</h2>
          <p class="mt-2 text-ink-soft">
            {{ suburb.name }} sits in our {{ suburb.group.region }} run — we are in these streets
            most weeks.
          </p>
          <ul class="mt-6 flex flex-wrap gap-2">
            <li v-for="neighbour in suburb.neighbours" :key="neighbour.slug">
              <NuxtLink
                :to="`/areas/${neighbour.slug}`"
                class="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition-colors duration-300 hover:bg-brand-700 hover:text-white"
              >
                <Icon name="map-pin" class="size-3.5" />
                {{ neighbour.name }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/areas"
                class="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-300 hover:border-brand-300 hover:text-brand-700"
              >
                All {{ suburbs.length }} suburbs
                <Icon name="arrow-right" class="size-3.5" />
              </NuxtLink>
            </li>
          </ul>
        </RevealGroup>
      </div>
    </section>

    <CtaSection :source="`Suburb — ${suburb.name}`" />
  </div>
</template>
