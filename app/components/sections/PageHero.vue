<script setup lang="ts">
/**
 * Шапка внутренних страниц. Раньше между заголовком и контентом зияла пустая
 * полоса: текст и фото центрировались по высоте, а колонка с текстом была
 * короче. Теперь колонки выровнены по верху, а фото уходит вниз внахлёст.
 */
const props = defineProps<{
  eyebrow?: string
  title: string
  text?: string
  crumbs?: { label: string; to?: string }[]
  photo?: string
}>()

const config = useRuntimeConfig()

// Хлебные крошки в разметке: Google рисует их вместо голого URL в выдаче
if (props.crumbs?.length) {
  const base = config.public.siteUrl
  const items = [
    { name: 'Home', url: base },
    ...props.crumbs.map((crumb) => ({
      name: crumb.label,
      url: crumb.to ? `${base}${crumb.to}` : undefined,
    })),
  ]

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            ...(item.url ? { item: item.url } : {}),
          })),
        }),
      },
    ],
  })
}

/** Заголовок режем на строки по словам, чтобы маска раскрывала их по очереди */
const lines = computed(() => {
  const words = props.title.split(' ')
  if (words.length <= 3) return [props.title]
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
})
</script>

<template>
  <section class="relative overflow-hidden bg-surface pt-28 pb-14 lg:pt-36 lg:pb-20">
    <AmbientBackdrop />

    <div class="container-page relative z-10">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div :class="photo ? 'lg:col-span-6' : 'lg:col-span-9'">
          <nav v-if="crumbs?.length" aria-label="Breadcrumb">
            <ol class="flex flex-wrap items-center gap-1.5 text-sm text-ink-faint">
              <li>
                <NuxtLink to="/" class="transition-colors hover:text-brand-700">Home</NuxtLink>
              </li>
              <li v-for="crumb in crumbs" :key="crumb.label" class="flex items-center gap-1.5">
                <span aria-hidden="true">/</span>
                <NuxtLink
                  v-if="crumb.to"
                  :to="crumb.to"
                  class="transition-colors hover:text-brand-700"
                >
                  {{ crumb.label }}
                </NuxtLink>
                <span v-else class="font-medium text-brand-900">{{ crumb.label }}</span>
              </li>
            </ol>
          </nav>

          <p v-if="eyebrow" class="eyebrow mt-6 animate-[fade-up_0.7s_var(--ease-out-soft)_both]">
            {{ eyebrow }}
          </p>

          <h1 class="mt-4 text-h1">
            <SplitText
              v-for="(line, index) in lines"
              :key="line"
              :text="line"
              as="span"
              class="block"
              :delay="100 + index * 140"
            />
          </h1>

          <p
            v-if="text"
            class="mt-5 max-w-2xl text-lead text-ink-soft animate-[fade-up_0.8s_var(--ease-out-soft)_both]"
            style="animation-delay: 520ms"
          >
            {{ text }}
          </p>
        </div>

        <div
          v-if="photo"
          class="lg:col-span-6 animate-[fade-up_0.9s_var(--ease-out-soft)_both]"
          style="animation-delay: 250ms"
        >
          <ParallaxMedia
            :src="photo"
            sizes="(max-width: 1024px) 100vw, 560px"
            ratio="4 / 3"
            priority
            :speed="0.14"
            class="rounded-media shadow-card"
          />
        </div>
      </div>
    </div>
  </section>
</template>
