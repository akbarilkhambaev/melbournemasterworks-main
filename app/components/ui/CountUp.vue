<script setup lang="ts">
/** Счётчик, который отсчитывает значение, когда попадает в экран. */
const props = withDefaults(
  defineProps<{
    to: number
    suffix?: string
    duration?: number
  }>(),
  { suffix: '', duration: 1100 },
)

const el = ref<HTMLElement | null>(null)
const current = ref(0)

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

onMounted(() => {
  if (!el.value) return

  // Кому анимации противопоказаны — сразу конечное значение
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    current.value = props.to
    return
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      observer.disconnect()

      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / props.duration, 1)
        current.value = Math.round(easeOut(progress) * props.to)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    },
    { threshold: 0.4 },
  )

  observer.observe(el.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <span ref="el" class="tabular-nums">{{ current }}{{ suffix }}</span>
</template>
