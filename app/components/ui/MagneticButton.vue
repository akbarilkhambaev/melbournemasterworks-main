<script setup lang="ts">
/**
 * Кнопка притягивается к курсору. На тач-устройствах эффект выключен —
 * там нет курсора, а лишние обработчики только жрут батарею.
 */
const props = withDefaults(
  defineProps<{
    as?: string
    /** Насколько сильно кнопка тянется за курсором, 0–1 */
    strength?: number
  }>(),
  { as: 'button', strength: 0.35 },
)

const el = ref<HTMLElement | null>(null)
const x = ref(0)
const y = ref(0)
const enabled = ref(false)

onMounted(() => {
  enabled.value =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const onMove = (event: PointerEvent) => {
  if (!enabled.value || !el.value) return
  const box = el.value.getBoundingClientRect()
  x.value = (event.clientX - (box.left + box.width / 2)) * props.strength
  y.value = (event.clientY - (box.top + box.height / 2)) * props.strength
}

const onLeave = () => {
  x.value = 0
  y.value = 0
}
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="magnetic"
    :style="{ '--mx': `${x}px`, '--my': `${y}px` }"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <span class="magnetic-inner">
      <slot />
    </span>
  </component>
</template>

<style>
.magnetic {
  transform: translate3d(var(--mx, 0), var(--my, 0), 0);
  transition: transform 0.45s var(--ease-out-soft);
}

/* Содержимое отстаёт от кнопки — за счёт этого движение читается «упругим» */
.magnetic-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: inherit;
  transform: translate3d(calc(var(--mx, 0px) * 0.25), calc(var(--my, 0px) * 0.25), 0);
  transition: transform 0.6s var(--ease-out-soft);
}
</style>
