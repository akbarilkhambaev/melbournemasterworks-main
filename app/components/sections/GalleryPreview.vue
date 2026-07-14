<script setup lang="ts">
import { photosByCategory } from '~/composables/usePhotos'

// Смесь категорий, чтобы превью не выглядело как одна и та же крыша восемь раз
const preview = computed(() => [
  ...photosByCategory('restoration').slice(0, 3),
  ...photosByCategory('terracotta').slice(0, 2),
  ...photosByCategory('metal').slice(0, 2),
  ...photosByCategory('gutters').slice(0, 1),
])

const openIndex = ref<number | null>(null)

/** Соседние колонки едут с разной скоростью — сетка перестаёт быть плоской */
const columnSpeed = (index: number) => [0.14, 0.05, 0.18, 0.08][index % 4]!
</script>

<template>
  <section class="section overflow-hidden">
    <div class="container-page">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Our work"
          title="Melbourne roofs we finished this year"
          text="Every photograph below is our own work, shot on the job. No stock imagery, and no other company's roofs."
        />

        <RevealGroup :delay="120" class="shrink-0">
          <NuxtLink to="/gallery" class="btn-ghost group">
            View full gallery
            <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </NuxtLink>
        </RevealGroup>
      </div>

      <RevealGroup
        class="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4"
        :stagger="70"
        from="scale"
      >
        <button
          v-for="(photo, index) in preview"
          :key="photo.slug"
          type="button"
          class="group relative overflow-hidden rounded-2xl shadow-soft transition-shadow duration-500 ease-out-soft hover:shadow-lift"
          :aria-label="`Open photo: ${photo.alt}`"
          @click="openIndex = index"
        >
          <ParallaxMedia
            :src="photo.slug"
            sizes="(max-width: 640px) 50vw, 25vw"
            ratio="3 / 4"
            :speed="columnSpeed(index)"
            class="w-full transition-transform duration-700 ease-out-soft group-hover:scale-105"
          />
          <span
            class="absolute inset-0 bg-linear-to-t from-brand-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            aria-hidden="true"
          />
          <span
            class="absolute inset-x-3 bottom-3 translate-y-3 text-left text-xs font-semibold text-white opacity-0 transition-all duration-400 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100"
          >
            {{ photo.label }}
          </span>
          <span
            class="absolute top-3 right-3 grid size-8 scale-75 place-items-center rounded-full bg-white/95 text-brand-800 opacity-0 transition-all duration-400 ease-out-soft group-hover:scale-100 group-hover:opacity-100"
            aria-hidden="true"
          >
            <Icon name="expand" class="size-4" />
          </span>
        </button>
      </RevealGroup>
    </div>

    <Lightbox
      :photos="preview"
      :index="openIndex"
      @close="openIndex = null"
      @navigate="openIndex = $event"
    />
  </section>
</template>
