<script setup lang="ts">
import { galleryCategories, galleryPhotos, photosByCategory } from '~/composables/usePhotos'

const filter = ref<string>('all')

const photos = computed(() =>
  filter.value === 'all' ? galleryPhotos() : photosByCategory(filter.value),
)

const openIndex = ref<number | null>(null)

// Смена фильтра не должна оставлять открытым лайтбокс с индексом из другого набора
watch(filter, () => (openIndex.value = null))

const counts = computed(() =>
  Object.fromEntries(galleryCategories.map((c) => [c.key, photosByCategory(c.key).length])),
)

useSeoMeta({
  title: 'Roof Restoration Gallery — Melbourne',
  description:
    'Photographs from our own Melbourne jobs: tile restorations, terracotta, Colorbond metal roofing, guttering and fascia. No stock images.',
})

useHead({
  link: [{ rel: 'canonical', href: `${useRuntimeConfig().public.siteUrl}/gallery` }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Gallery"
      title="Every photo here is a roof we finished"
      text="No stock imagery and no other company's work. Filter by the type of job, then tap any photo to see it full size."
      :crumbs="[{ label: 'Gallery' }]"
    />

    <section class="pt-12 pb-16 lg:pt-16 lg:pb-24">
      <div class="container-page">
        <!-- Фильтры -->
        <div class="flex flex-wrap gap-2.5" role="group" aria-label="Filter photos by job type">
          <button
            type="button"
            class="rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ease-out-soft"
            :class="
              filter === 'all'
                ? 'bg-brand-700 text-white shadow-glow'
                : 'border border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700'
            "
            :aria-pressed="filter === 'all'"
            @click="filter = 'all'"
          >
            All work
            <span class="ml-1 text-white/70">{{ galleryPhotos().length }}</span>
          </button>

          <button
            v-for="category in galleryCategories"
            :key="category.key"
            type="button"
            class="rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ease-out-soft"
            :class="
              filter === category.key
                ? 'bg-brand-700 text-white shadow-glow'
                : 'border border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700'
            "
            :aria-pressed="filter === category.key"
            @click="filter = category.key"
          >
            {{ category.label }}
            <span :class="['ml-1', filter === category.key ? 'text-white/70' : 'text-ink-faint']">{{ counts[category.key] }}</span>
          </button>
        </div>

        <!-- Masonry: фото у клиента вертикальные, колоночная раскладка не режет кадры -->
        <TransitionGroup
          tag="div"
          class="mt-10 gap-3 [column-count:2] sm:[column-count:3] lg:gap-4 lg:[column-count:4]"
          enter-active-class="transition duration-500 ease-out-soft"
          enter-from-class="opacity-0 scale-95"
          leave-active-class="absolute transition duration-200"
          leave-to-class="opacity-0 scale-95"
          move-class="transition duration-500 ease-out-soft"
        >
          <button
            v-for="(photo, index) in photos"
            :key="photo.slug"
            type="button"
            class="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-soft transition-shadow duration-500 hover:shadow-lift lg:mb-4"
            :aria-label="`Open photo: ${photo.alt}`"
            @click="openIndex = index"
          >
            <div class="relative overflow-hidden">
              <AppImage
                :src="photo.slug"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                class="w-full"
                img-class="transition-transform duration-700 ease-out-soft group-hover:scale-105"
              />
              <span
                class="absolute inset-0 bg-linear-to-t from-brand-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
              />
              <span
                class="absolute inset-x-3 bottom-3 translate-y-2 text-left text-xs font-semibold text-white opacity-0 transition-all duration-400 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100"
              >
                {{ photo.label }}
              </span>
            </div>
          </button>
        </TransitionGroup>
      </div>

      <Lightbox
        :photos="photos"
        :index="openIndex"
        @close="openIndex = null"
        @navigate="openIndex = $event"
      />
    </section>

    <CtaSection source="Gallery" />
  </div>
</template>
