<script setup lang="ts">
import { areaGroups, allSuburbs, slugify } from '~/data/areas'
import { site } from '~/data/site'

useSeoMeta({
  title: 'Suburbs We Service in Melbourne',
  description: `Roof restoration, repairs and guttering across metropolitan Melbourne — ${allSuburbs.length} suburbs and counting. Call ${site.phone.display} to check yours.`,
})

/**
 * Живой поиск: человек приходит на эту страницу с одним вопросом — «а вы ко
 * мне поедете?». Пусть вводит свой пригород и получает ответ сразу, а не
 * вычитывает глазами пять списков.
 */
const query = ref('')

const normalised = computed(() => query.value.trim().toLowerCase())

const filtered = computed(() => {
  if (!normalised.value) return areaGroups

  return areaGroups
    .map((group) => ({
      ...group,
      suburbs: group.suburbs.filter((s) => s.toLowerCase().includes(normalised.value)),
    }))
    .filter((group) => group.suburbs.length > 0)
})

const matchCount = computed(() => filtered.value.reduce((n, g) => n + g.suburbs.length, 0))
const noMatch = computed(() => normalised.value.length > 0 && matchCount.value === 0)

const siteUrl = useRuntimeConfig().public.siteUrl

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/areas` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Areas', item: `${siteUrl}/areas` },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- Шапка: три фото уступом вместо одного прямоугольника и пустоты рядом -->
    <section class="relative overflow-hidden bg-surface pt-28 pb-16 lg:pt-36 lg:pb-20">
      <AmbientBackdrop />

      <div class="container-page relative z-10">
        <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div class="lg:col-span-6">
            <nav aria-label="Breadcrumb">
              <ol class="flex items-center gap-1.5 text-sm text-ink-faint">
                <li><NuxtLink to="/" class="transition-colors hover:text-brand-700">Home</NuxtLink></li>
                <li aria-hidden="true">/</li>
                <li class="font-medium text-brand-900">Areas</li>
              </ol>
            </nav>

            <p class="eyebrow mt-6">Service areas</p>
            <!-- H1 несёт запрос «roof restoration Melbourne suburbs» -->
            <h1 class="mt-4 text-h1">
              <SplitText text="Roof restoration" as="span" class="block" :delay="80" />
              <SplitText text="across Melbourne" as="span" class="block" :delay="220" />
              <SplitText text="suburbs." as="span" class="block text-brand-600" :delay="360" />
            </h1>

            <p
              class="mt-6 max-w-lg text-lead text-ink-soft animate-[fade-up_0.8s_var(--ease-out-soft)_both]"
              style="animation-delay: 520ms"
            >
              From the inner north to the bayside and out to the growth corridors. Type your suburb
              below — and if it is not listed, that is not a no. We travel.
            </p>

            <div
              class="mt-8 flex items-center gap-8 animate-[fade-up_0.8s_var(--ease-out-soft)_both]"
              style="animation-delay: 640ms"
            >
              <div>
                <p class="font-display text-4xl font-extrabold text-brand-700">
                  <CountUp :to="allSuburbs.length" suffix="+" />
                </p>
                <p class="mt-1 text-sm font-medium text-ink-soft">Suburbs covered</p>
              </div>
              <div class="h-10 w-px bg-line" aria-hidden="true" />
              <div>
                <p class="font-display text-4xl font-extrabold text-brand-700">
                  <CountUp :to="areaGroups.length" />
                </p>
                <p class="mt-1 text-sm font-medium text-ink-soft">Regions</p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6">
            <div class="grid grid-cols-2 gap-4">
              <ParallaxMedia
                src="terracotta-02"
                sizes="(max-width: 1024px) 50vw, 300px"
                ratio="3 / 4"
                priority
                :speed="0.16"
                class="row-span-2 rounded-3xl shadow-card"
              />
              <ParallaxMedia
                src="restoration-04"
                sizes="(max-width: 1024px) 50vw, 300px"
                ratio="4 / 3"
                :speed="0.06"
                class="rounded-3xl shadow-card"
              />
              <ParallaxMedia
                src="metal-05"
                sizes="(max-width: 1024px) 50vw, 300px"
                ratio="4 / 3"
                :speed="0.22"
                class="rounded-3xl shadow-card"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="container-page">
        <RevealGroup class="mx-auto max-w-xl">
          <label for="suburb-search" class="sr-only">Search for your suburb</label>
          <div class="relative">
            <Icon name="search" class="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-faint" />
            <input
              id="suburb-search"
              v-model="query"
              type="search"
              placeholder="Type your suburb — Brunswick, Box Hill…"
              class="w-full rounded-2xl border border-line bg-white py-4 pr-5 pl-14 text-ink shadow-soft outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink-faint focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12"
            />
          </div>

          <p
            v-if="normalised"
            class="mt-3 text-center text-sm font-medium"
            :class="noMatch ? 'text-ink-soft' : 'text-success'"
            aria-live="polite"
          >
            <template v-if="noMatch">
              We do not list that one — but we travel. Call
              <a :href="site.phone.href" class="font-bold text-brand-700 underline underline-offset-4">
                {{ site.phone.display }}</a
              >
              and ask.
            </template>
            <template v-else>
              {{ matchCount }} match<template v-if="matchCount > 1">es</template> — yes, we cover you.
            </template>
          </p>
        </RevealGroup>

        <TransitionGroup
          tag="div"
          class="mt-12 grid gap-6 lg:grid-cols-2"
          enter-active-class="transition duration-500 ease-out-soft"
          enter-from-class="opacity-0 translate-y-4"
          leave-active-class="absolute transition duration-200"
          leave-to-class="opacity-0 scale-95"
          move-class="transition duration-500 ease-out-soft"
        >
          <TiltCard
            v-for="group in filtered"
            :key="group.region"
            :max="3"
            class="group rounded-card border border-line bg-white p-7 shadow-soft transition-shadow duration-500 ease-out-soft hover:shadow-card lg:p-8"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="font-display text-xl font-extrabold text-brand-900">{{ group.region }}</h2>
                <p class="mt-2 text-ink-soft">{{ group.blurb }}</p>
              </div>
              <span
                class="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 font-display font-extrabold text-brand-700 transition-colors duration-500 ease-out-soft group-hover:bg-brand-700 group-hover:text-white"
              >
                {{ group.suburbs.length }}
              </span>
            </div>

            <ul class="mt-6 flex flex-wrap gap-2">
              <li
                v-for="(suburb, index) in group.suburbs"
                :key="suburb"
                class="animate-[fade-up_0.5s_var(--ease-out-soft)_both]"
                :style="{ animationDelay: `${index * 30}ms` }"
              >
                <NuxtLink
                  :to="`/areas/${slugify(suburb)}`"
                  class="inline-flex rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700 transition-colors duration-300 hover:bg-brand-700 hover:text-white"
                >
                  {{ suburb }}
                </NuxtLink>
              </li>
            </ul>
          </TiltCard>
        </TransitionGroup>

        <RevealGroup class="mt-12" :delay="120">
          <div class="relative overflow-hidden rounded-card bg-brand-900 bg-dotgrid p-8 text-center sm:p-14">
            <h2 class="text-h3 text-white!">Not on the list?</h2>
            <p class="mx-auto mt-3 max-w-xl text-brand-200">
              The list is not exhaustive — we travel. Give us a call and we will tell you honestly
              whether we can get to you.
            </p>
            <MagneticButton as="a" :href="site.phone.href" class="btn-white mt-8">
              Call {{ site.phone.display }}
            </MagneticButton>
          </div>
        </RevealGroup>
      </div>
    </section>

    <CtaSection source="Service areas" />
  </div>
</template>
