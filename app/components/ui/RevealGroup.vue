<script setup lang="ts">
/**
 * Появление при скролле со стаггером.
 *
 * Тайминги здесь — не вкусовщина. Раньше было 0.7с + стаггер до 990мс, и при
 * обычной скорости прокрутки контент оказывался в центре экрана всё ещё
 * прозрачным: человек видел пустые прямоугольники. Премиальное движение —
 * короткое и уверенное, а не медленное и ленивое.
 *
 * Поэтому: старт чуть раньше, чем элемент доедет до экрана; 0.5с; стаггер
 * 55мс и жёсткий потолок, чтобы длинная группа не растягивалась на секунды.
 */
const props = withDefaults(
  defineProps<{
    stagger?: number
    delay?: number
    from?: 'bottom' | 'left' | 'right' | 'scale'
    as?: string
  }>(),
  { stagger: 55, delay: 0, from: 'bottom', as: 'div' },
)

const root = ref<HTMLElement | null>(null)
const shown = ref(false)

const offsets: Record<string, string> = {
  bottom: 'translate3d(0, 18px, 0)',
  left: 'translate3d(-22px, 0, 0)',
  right: 'translate3d(22px, 0, 0)',
  scale: 'scale(0.96)',
}

onMounted(() => {
  if (!root.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      shown.value = true
      observer.disconnect()
    },
    // Положительный отступ снизу: запускаем ДО того, как элемент въедет в
    // экран, чтобы к моменту, когда человек на него смотрит, всё уже стояло
    // на месте.
    { rootMargin: '0px 0px 12% 0px', threshold: 0 },
  )

  observer.observe(root.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <component
    :is="as"
    ref="root"
    :data-reveal="shown ? 'in' : 'out'"
    :style="{
      '--reveal-stagger': `${props.stagger}ms`,
      '--reveal-delay': `${props.delay}ms`,
      '--reveal-offset': offsets[props.from],
    }"
  >
    <slot />
  </component>
</template>

<style>
[data-reveal] > * {
  opacity: 0;
  transform: var(--reveal-offset);
  transition:
    opacity 0.5s var(--ease-out-soft),
    transform 0.5s var(--ease-out-soft);
  transition-delay: calc(var(--reveal-delay) + var(--reveal-stagger) * var(--i, 0));
}

[data-reveal='in'] > * {
  opacity: 1;
  transform: none;
}

/* Порядковый номер для стаггера. Потолок — шестой элемент: дальше задержка
   не растёт, иначе хвост длинной сетки доезжает через полторы секунды. */
[data-reveal] > *:nth-child(1) {
  --i: 0;
}
[data-reveal] > *:nth-child(2) {
  --i: 1;
}
[data-reveal] > *:nth-child(3) {
  --i: 2;
}
[data-reveal] > *:nth-child(4) {
  --i: 3;
}
[data-reveal] > *:nth-child(5) {
  --i: 4;
}
[data-reveal] > *:nth-child(6) {
  --i: 5;
}
[data-reveal] > *:nth-child(n + 7) {
  --i: 6;
}
</style>
