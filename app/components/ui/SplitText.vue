<script setup lang="ts">
/**
 * Заголовок проявляется по словам: каждое выезжает из-под маски со сдвигом.
 * Слова остаются словами для скринридера и для поиска — режем только визуально.
 */
const props = withDefaults(
  defineProps<{
    text: string
    as?: string
    /** Задержка между словами, мс */
    stagger?: number
    delay?: number
    /** Появляться при скролле, а не сразу при загрузке */
    onScroll?: boolean
  }>(),
  { as: 'span', stagger: 38, delay: 0, onScroll: false },
)

const words = computed(() => props.text.split(' '))

const root = ref<HTMLElement | null>(null)
const shown = ref(!props.onScroll)

onMounted(() => {
  if (!props.onScroll || !root.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      shown.value = true
      observer.disconnect()
    },
    { rootMargin: '0px 0px -48px 0px', threshold: 0 },
  )
  observer.observe(root.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <component :is="as" ref="root" :data-split="shown ? 'in' : 'out'">
    <!--
      Никакой скрытой копии текста: она дублировала бы заголовок в DOM, и
      поисковик читал бы «We cover We cover metropolitan…».
      Слова остаются обычными текстовыми узлами с настоящими пробелами между
      ними, поэтому скринридер прочитает строку как единое предложение.

      Пробел обязан жить СНАРУЖИ маски: внутри inline-block с overflow:hidden
      он схлопывается, и слова слипаются в «Wecover».
    -->
    <template v-for="(word, index) in words" :key="`${word}-${index}`">
      <span class="split-mask">
        <span class="split-word" :style="{ transitionDelay: `${delay + index * stagger}ms` }">{{
          word
        }}</span>
      </span>
      <template v-if="index < words.length - 1">{{ ' ' }}</template>
    </template>
  </component>
</template>

<style>
.split-mask {
  display: inline-block;
  overflow: hidden;
  /* Иначе маска срезает нижние выносные элементы у «g», «y», «p» */
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
  vertical-align: bottom;
}

.split-word {
  display: inline-block;
  transform: translateY(105%);
  transition:
    transform 0.55s var(--ease-out-soft),
    opacity 0.55s var(--ease-out-soft);
  opacity: 0;
}

[data-split='in'] .split-word {
  transform: none;
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .split-word {
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
