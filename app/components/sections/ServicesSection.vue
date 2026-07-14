<script setup lang="ts">
import { services } from '~/data/services'
</script>

<template>
  <section class="section">
    <div class="container-page">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <!-- Заголовок прилипает и стоит, пока справа прокручиваются услуги -->
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-32">
            <RevealGroup :stagger="80">
              <p class="eyebrow">What we do</p>
              <h2 class="mt-4 text-h2">
                <SplitText text="Three things. Done to a standard." on-scroll />
              </h2>
              <p class="mt-4 text-lead text-ink-soft">
                Roof restoration, roof repairs and guttering. That is the entire list — because a
                trade you do every day is a trade you do properly.
              </p>
              <NuxtLink to="/services" class="btn-ghost group mt-8">
                All services
                <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </NuxtLink>
            </RevealGroup>
          </div>
        </div>

        <RevealGroup class="grid gap-6 lg:col-span-8" :stagger="70">
          <NuxtLink
            v-for="(service, index) in services"
            :key="service.slug"
            :to="service.to"
            class="group block"
          >
            <TiltCard
              :max="3"
              class="grid gap-6 overflow-hidden rounded-card border border-line bg-white p-5 shadow-soft transition-shadow duration-500 ease-out-soft group-hover:shadow-lift sm:grid-cols-12 sm:items-center"
            >
              <div class="overflow-hidden rounded-2xl sm:col-span-5">
                <ParallaxMedia
                  :src="service.hero"
                  sizes="(max-width: 640px) 100vw, 320px"
                  ratio="4 / 3"
                  :speed="0.06"
                  class="w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                />
              </div>

              <div class="sm:col-span-7 sm:pr-4">
                <span class="font-display text-xs font-bold tracking-widest text-brand-500">
                  0{{ index + 1 }}
                </span>
                <h3 class="mt-2 text-h3">{{ service.title }}</h3>
                <p class="mt-3 text-ink-soft">{{ service.short }}</p>

                <span
                  class="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold text-brand-700"
                >
                  Learn more
                  <span
                    class="grid size-7 place-items-center rounded-full bg-brand-50 transition-all duration-400 ease-out-soft group-hover:translate-x-1 group-hover:bg-brand-700 group-hover:text-white"
                  >
                    <Icon name="arrow-right" class="size-3.5" />
                  </span>
                </span>
              </div>
            </TiltCard>
          </NuxtLink>
        </RevealGroup>
      </div>
    </div>
  </section>
</template>
