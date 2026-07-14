<script setup lang="ts">
/**
 * Герой. Заголовок выезжает по словам из-под маски, фото едет параллаксом
 * и медленно наезжает, фон дышит, поверх фото — плавающая карточка с цифрой.
 */
import { site } from '~/data/site'

const badges = [
  'Fully licensed & insured',
  '10-year warranty',
  'Fixed-price quotes',
  'Premium Australian materials',
]
</script>

<template>
  <section class="relative overflow-hidden bg-surface pt-28 pb-16 lg:pt-36 lg:pb-24">
    <AmbientBackdrop />

    <div class="container-page relative z-10">
      <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <!-- Текст -->
        <div class="lg:col-span-6">
          <p class="eyebrow animate-[fade-up_0.7s_var(--ease-out-soft)_both]">
            <span class="sm:hidden">Roof restoration · Melbourne</span>
            <span class="hidden sm:inline">Roof restoration &amp; repairs · Melbourne</span>
          </p>

          <!-- H1 несёт главный запрос — «roof restoration Melbourne».
               Раньше он звучал как «Melbourne roofs, restored to their best»:
               красиво, но по такому никто не ищет. -->
          <h1 class="mt-5 text-h1">
            <SplitText text="Premium roof" as="span" class="block" :delay="120" />
            <SplitText text="restoration across" as="span" class="block" :delay="280" />
            <SplitText text="Melbourne." as="span" class="block text-brand-600" :delay="440" />
          </h1>

          <p
            class="mt-6 max-w-lg text-lead text-ink-soft animate-[fade-up_0.8s_var(--ease-out-soft)_both]"
            style="animation-delay: 700ms"
          >
            Tile and metal roofs taken back to bare surface, rebuilt at the ridge and sealed with a
            three-coat membrane. Your price is fixed before we start, and the workmanship is
            guaranteed for ten years.
          </p>

          <div
            class="mt-8 flex flex-col gap-3 sm:flex-row animate-[fade-up_0.8s_var(--ease-out-soft)_both]"
            style="animation-delay: 800ms"
          >
            <MagneticButton as="a" href="#quote" class="group btn-primary">
              Book my free roof inspection
              <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton as="a" :href="site.phone.href" class="btn-ghost">
              <Icon name="phone" class="size-4" />
              {{ site.phone.display }}
            </MagneticButton>
          </div>

          <ul
            class="mt-9 grid grid-cols-2 gap-x-5 gap-y-2.5 sm:flex sm:flex-wrap animate-[fade-up_0.8s_var(--ease-out-soft)_both]"
            style="animation-delay: 900ms"
          >
            <li
              v-for="badge in badges"
              :key="badge"
              class="flex items-center gap-1.5 text-sm font-medium text-ink-soft"
            >
              <Icon name="check" class="size-4 text-success" />
              {{ badge }}
            </li>
          </ul>
        </div>

        <!-- Фото + форма -->
        <div
          class="lg:col-span-6 animate-[fade-up_0.9s_var(--ease-out-soft)_both]"
          style="animation-delay: 350ms"
        >
          <div class="relative">
            <ParallaxMedia
              src="restoration-01"
              sizes="(max-width: 1024px) 100vw, 620px"
              ratio="16 / 10"
              priority
              :speed="0.1"
              class="rounded-4xl shadow-lift"
            >
              <div
                class="absolute inset-0 bg-linear-to-t from-brand-950/55 via-brand-950/10 to-transparent"
                aria-hidden="true"
              />
              <p class="absolute bottom-5 left-6 max-w-[70%] text-sm font-semibold text-white/95">
                Concrete tile roof, cleaned, re-pointed and resprayed — Melbourne
              </p>
            </ParallaxMedia>

            <!-- Плавающая карточка с цифрой: даёт композиции глубину -->
            <div
              class="absolute -left-3 top-6 hidden rounded-2xl border border-line bg-white/90 px-5 py-4 shadow-lift backdrop-blur-xl lg:block"
            >
              <p class="font-display text-3xl font-extrabold text-brand-700">
                <CountUp :to="500" suffix="+" />
              </p>
              <p class="mt-0.5 text-xs font-semibold text-ink-soft">Roofs restored</p>
            </div>

            <div
              id="quote"
              class="relative -mt-14 mx-3 rounded-card border border-line bg-white/95 p-6 shadow-lift backdrop-blur-xl sm:mx-6 sm:p-8"
            >
              <div class="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 class="font-display text-xl font-extrabold text-brand-900">
                    Free inspection, fixed quote
                  </h2>
                  <p class="mt-1 text-sm text-ink-soft">
                    We get on the roof, photograph it, and call you back the same day.
                  </p>
                </div>
                <span
                  class="shrink-0 rounded-full bg-accent-500/15 px-3 py-1.5 text-xs font-bold text-accent-600"
                >
                  10 yr warranty
                </span>
              </div>

              <LeadForm source="Homepage hero" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Подсказка «крути вниз» -->
    <div
      class="scroll-cue pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      aria-hidden="true"
    >
      <Icon name="chevron-down" class="size-6 text-brand-400" />
    </div>
  </section>
</template>

<style scoped>
.scroll-cue {
  animation: scroll-cue 2.2s var(--ease-in-out-soft) infinite;
}
</style>
