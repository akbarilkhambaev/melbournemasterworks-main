<script setup lang="ts">
import { site } from '~/data/site'

// Строка дублируется: когда первая копия уезжает ровно на половину трека,
// вторая занимает её место — шов не виден, и лента идёт бесконечно
const credentials = [
  'Fully licensed',
  'Public liability insured',
  'Premium Australian materials',
  '10-year workmanship warranty',
  'Fixed-price quotes',
  'Photographed inspections',
  'Site left clean',
  'Residential & commercial',
]
</script>

<template>
  <section class="border-y border-line bg-surface-muted">
    <!-- Бегущая лента регалий -->
    <div class="marquee border-b border-line py-4">
      <div class="marquee-track">
        <ul v-for="copy in 2" :key="copy" class="flex shrink-0 items-center gap-8 pr-8" :aria-hidden="copy === 2">
          <li
            v-for="item in credentials"
            :key="item"
            class="flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap text-ink-soft"
          >
            <Icon name="check" class="size-4 shrink-0 text-brand-600" />
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="container-page py-10 lg:py-14">
      <RevealGroup class="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8" :stagger="60">
        <div
          v-for="stat in site.stats"
          :key="stat.label"
          class="group relative text-center lg:text-left"
        >
          <div
            class="font-display text-4xl font-extrabold text-brand-700 transition-transform duration-500 ease-out-soft group-hover:-translate-y-0.5 lg:text-5xl"
          >
            <CountUp :to="stat.value" :suffix="stat.suffix" />
          </div>
          <p class="mt-1.5 text-sm font-medium text-ink-soft">{{ stat.label }}</p>

          <!-- Подчёркивание вырастает при наведении -->
          <span
            class="absolute -bottom-2 left-1/2 h-0.5 w-10 origin-center -translate-x-1/2 scale-x-0 rounded-full bg-accent-500 transition-transform duration-500 ease-out-soft group-hover:scale-x-100 lg:left-0 lg:translate-x-0 lg:origin-left"
          />
        </div>
      </RevealGroup>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  /* Края растворяются, чтобы лента не обрывалась резко об границу экрана */
  mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 42s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}
</style>
