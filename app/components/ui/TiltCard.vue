<script setup lang="ts">
/**
 * Карточка слегка наклоняется за указателем и подсвечивается бликом в точке,
 * где он находится. Только для мыши: на тач-экране наклон невозможен.
 */
const props = withDefaults(
  defineProps<{
    /** Максимальный наклон, градусы */
    max?: number
    glare?: boolean
    class?: string
  }>(),
  { max: 5, glare: true },
)

const el = ref<HTMLElement | null>(null)
const enabled = ref(false)
const active = ref(false)

const rx = ref(0)
const ry = ref(0)
const gx = ref(50)
const gy = ref(50)

onMounted(() => {
  enabled.value =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const onMove = (event: PointerEvent) => {
  if (!enabled.value || !el.value) return
  const box = el.value.getBoundingClientRect()
  const px = (event.clientX - box.left) / box.width
  const py = (event.clientY - box.top) / box.height

  rx.value = (0.5 - py) * props.max * 2
  ry.value = (px - 0.5) * props.max * 2
  gx.value = px * 100
  gy.value = py * 100
  active.value = true
}

const onLeave = () => {
  active.value = false
  rx.value = 0
  ry.value = 0
}
</script>

<template>
  <div
    ref="el"
    :class="['tilt', props.class]"
    :style="{
      '--rx': `${rx}deg`,
      '--ry': `${ry}deg`,
      '--gx': `${gx}%`,
      '--gy': `${gy}%`,
    }"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <slot />
    <span
      v-if="glare"
      class="tilt-glare"
      :class="active && 'tilt-glare--on'"
      aria-hidden="true"
    />
  </div>
</template>

<style>
.tilt {
  position: relative;
  transform: perspective(900px) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
  transform-style: preserve-3d;
  transition: transform 0.5s var(--ease-out-soft);
}

.tilt-glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s var(--ease-out-soft);
  background: radial-gradient(
    22rem circle at var(--gx) var(--gy),
    rgb(255 255 255 / 0.5),
    transparent 45%
  );
}

.tilt-glare--on {
  opacity: 1;
}
</style>
