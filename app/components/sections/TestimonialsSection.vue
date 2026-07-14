<script setup lang="ts">
/**
 * Пока в testimonials.ts пусто, секция не рендерится вовсе — вместо дырки
 * в вёрстке или выдуманных отзывов. Заполните массив, и она появится сама.
 */
import { testimonials, reviewsUrl } from '~/data/testimonials'

const hasReviews = computed(() => testimonials.length > 0)
</script>

<template>
  <section v-if="hasReviews" class="section">
    <div class="container-page">
      <SectionHeading
        eyebrow="Reviews"
        title="What Melbourne homeowners say"
        text="Real reviews from real jobs."
      />

      <RevealGroup class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" :stagger="60">
        <figure
          v-for="review in testimonials"
          :key="review.name + review.date"
          class="flex flex-col rounded-card border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-card"
        >
          <div class="flex gap-0.5" :aria-label="`${review.rating} out of 5 stars`">
            <Icon name="star" class="size-5 text-accent-500" />
          </div>

          <blockquote class="mt-5 flex-1 text-ink-soft">"{{ review.text }}"</blockquote>

          <figcaption class="mt-6 border-t border-line pt-5">
            <p class="font-display font-bold text-brand-900">{{ review.name }}</p>
            <p class="text-sm text-ink-faint">
              {{ review.suburb }}<template v-if="review.service"> · {{ review.service }}</template>
            </p>
          </figcaption>
        </figure>
      </RevealGroup>

      <div v-if="reviewsUrl" class="mt-10 text-center">
        <a
          :href="reviewsUrl"
          target="_blank"
          rel="noopener"
          class="font-display font-bold text-brand-700 underline underline-offset-4 hover:text-brand-600"
        >
          Read all our Google reviews
        </a>
      </div>
    </div>
  </section>
</template>
