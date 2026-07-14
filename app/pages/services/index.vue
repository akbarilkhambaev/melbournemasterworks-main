<script setup lang="ts">
import { services } from '~/data/services'

useSeoMeta({
  title: 'Roofing Services Melbourne',
  description:
    'Roof restoration, roof repairs and Colorbond gutter replacement across metropolitan Melbourne. Fixed prices, photographed inspections, 10-year workmanship warranty.',
})

useHead({
  link: [{ rel: 'canonical', href: `${useRuntimeConfig().public.siteUrl}/services` }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Services"
      title="Roof restoration, repairs and guttering"
      text="Three things, done properly. Every job starts with a real inspection and ends with a fixed price you agreed to before we started."
      :crumbs="[{ label: 'Services' }]"
      photo="restoration-08"
    />

    <section class="section">
      <div class="container-page">
        <RevealGroup class="grid gap-8" :stagger="70">
          <NuxtLink
            v-for="(service, index) in services"
            :key="service.slug"
            :to="service.to"
            class="group grid gap-8 overflow-hidden rounded-card border border-line bg-white p-6 shadow-soft transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-lift lg:grid-cols-12 lg:items-center lg:p-8"
          >
            <div
              class="overflow-hidden rounded-2xl lg:col-span-5"
              :class="index % 2 === 1 && 'lg:order-last'"
            >
              <AppImage
                :src="service.hero"
                sizes="(max-width: 1024px) 100vw, 420px"
                ratio="16 / 10"
                class="w-full"
                img-class="transition-transform duration-700 ease-out-soft group-hover:scale-105"
              />
            </div>

            <div class="lg:col-span-7">
              <h2 class="text-h3">{{ service.title }}</h2>
              <p class="mt-3 text-ink-soft">{{ service.short }}</p>

              <ul class="mt-6 grid gap-2 sm:grid-cols-2">
                <li
                  v-for="benefit in service.benefits.slice(0, 4)"
                  :key="benefit"
                  class="flex items-start gap-2 text-sm text-ink-soft"
                >
                  <Icon name="check" class="mt-0.5 size-4 shrink-0 text-success" />
                  {{ benefit }}
                </li>
              </ul>

              <span class="mt-7 inline-flex items-center gap-2 font-display font-bold text-brand-700">
                See how it works
                <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </NuxtLink>
        </RevealGroup>
      </div>
    </section>

    <CtaSection source="Services" />
  </div>
</template>
