<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    text?: string
    align?: 'left' | 'center'
  }>(),
  { align: 'center' },
)
</script>

<template>
  <RevealGroup
    :class="['max-w-2xl', align === 'center' ? 'mx-auto text-center' : '']"
    :stagger="80"
  >
    <p v-if="eyebrow" :class="['eyebrow', align === 'center' && 'justify-center']">{{ eyebrow }}</p>
    <h2 class="mt-4 text-h2">{{ title }}</h2>
    <p v-if="text" class="mt-4 text-lead text-ink-soft">{{ text }}</p>
  </RevealGroup>
</template>
