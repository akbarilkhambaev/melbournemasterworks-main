<script setup lang="ts">
const props = defineProps<{ items: { q: string; a: string }[] }>()

const openIndex = ref<number | null>(0)
const toggle = (index: number) => (openIndex.value = openIndex.value === index ? null : index)

// Google показывает FAQ прямо в выдаче, если разметить их так
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }),
    },
  ],
})
</script>

<template>
  <div class="divide-y divide-line overflow-hidden rounded-card border border-line bg-white">
    <div v-for="(item, index) in items" :key="item.q">
      <h3>
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-surface-muted sm:px-7"
          :aria-expanded="openIndex === index"
          :aria-controls="`faq-panel-${index}`"
          @click="toggle(index)"
        >
          <span class="font-display text-base font-bold text-brand-900 sm:text-lg">{{ item.q }}</span>
          <span
            class="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-300 ease-out-soft"
            :class="openIndex === index && 'rotate-45'"
          >
            <Icon name="plus" class="size-4" />
          </span>
        </button>
      </h3>

      <!-- grid-template-rows 0fr → 1fr: раскрытие анимируется без замера высоты -->
      <div
        :id="`faq-panel-${index}`"
        class="grid transition-[grid-template-rows] duration-400 ease-out-soft"
        :style="{ gridTemplateRows: openIndex === index ? '1fr' : '0fr' }"
      >
        <div class="overflow-hidden">
          <p class="px-5 pb-6 text-ink-soft sm:px-7">{{ item.a }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
