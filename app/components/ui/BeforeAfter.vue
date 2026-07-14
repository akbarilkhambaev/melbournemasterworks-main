<script setup lang="ts">
/**
 * Слайдер сравнения «до/после». Мышь, палец и клавиатура (стрелки, Home/End).
 * Позиция ручки — одна CSS-переменная, поэтому перетаскивание не дёргает layout.
 */
const props = withDefaults(
  defineProps<{
    before: string
    after: string
    title?: string
    caption?: string
    /** Стартовое положение ручки, % */
    start?: number
    /**
     * Общая пропорция для обоих кадров. Исходники сняты по-разному, и без
     * жёсткого соотношения соседние слайдеры получаются разной высоты,
     * а подписи под ними разъезжаются.
     */
    ratio?: string
  }>(),
  { start: 55, ratio: '3 / 2' },
)

const root = ref<HTMLElement | null>(null)
const position = ref(props.start)
const dragging = ref(false)
const touched = ref(false)

/**
 * Когда слайдер появляется в экране, ручка один раз сама проезжает туда-сюда.
 * Без этого люди просто не догадываются, что её можно тянуть, и видят
 * половину результата.
 */
const demo = () => {
  const from = position.value
  const keyframes = [from, 88, 18, props.start]
  const duration = 900

  let stage = 0
  const run = () => {
    const start = performance.now()
    const a = keyframes[stage]!
    const b = keyframes[stage + 1]!

    const tick = (now: number) => {
      if (touched.value) return // пользователь взялся за ручку — не мешаем
      const t = Math.min((now - start) / duration, 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      position.value = a + (b - a) * eased

      if (t < 1) requestAnimationFrame(tick)
      else if (++stage < keyframes.length - 1) run()
    }
    requestAnimationFrame(tick)
  }
  run()
}

onMounted(() => {
  if (!root.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      observer.disconnect()
      setTimeout(demo, 350)
    },
    { threshold: 0.55 },
  )
  observer.observe(root.value)
  onBeforeUnmount(() => observer.disconnect())
})

const moveTo = (clientX: number) => {
  const box = root.value?.getBoundingClientRect()
  if (!box) return
  position.value = Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100))
}

const onPointerDown = (event: PointerEvent) => {
  dragging.value = true
  if (!touched.value) analytics.beforeAfterUsed(props.title ?? 'untitled')
  touched.value = true
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  moveTo(event.clientX)
}

const onPointerMove = (event: PointerEvent) => {
  if (!dragging.value) return
  moveTo(event.clientX)
}

const onPointerUp = () => {
  dragging.value = false
}

const onKeydown = (event: KeyboardEvent) => {
  touched.value = true
  const step = event.shiftKey ? 10 : 2
  const actions: Record<string, () => void> = {
    ArrowLeft: () => (position.value = Math.max(0, position.value - step)),
    ArrowRight: () => (position.value = Math.min(100, position.value + step)),
    Home: () => (position.value = 0),
    End: () => (position.value = 100),
  }
  const action = actions[event.key]
  if (!action) return
  event.preventDefault()
  action()
}
</script>

<template>
  <figure class="group">
    <div
      ref="root"
      class="relative touch-pan-y overflow-hidden rounded-media shadow-card select-none"
      :style="{ '--pos': `${position}%` }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <!-- «После» лежит в основе и задаёт высоту блока -->
      <AppImage :src="after" :ratio="ratio" sizes="(max-width: 1024px) 100vw, 560px" class="w-full" />

      <!-- «До» подрезается по позиции ручки -->
      <div
        class="absolute inset-0"
        :style="{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }"
      >
        <AppImage
          :src="before"
          :ratio="ratio"
          sizes="(max-width: 1024px) 100vw, 560px"
          class="size-full"
          img-class="size-full"
        />
      </div>

      <span
        class="pointer-events-none absolute left-4 top-4 rounded-full bg-brand-900/80 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm"
      >
        Before
      </span>
      <span
        class="pointer-events-none absolute right-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold tracking-wide text-brand-950 uppercase"
      >
        After
      </span>

      <!-- Ручка -->
      <div
        class="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        :style="{ left: 'var(--pos)' }"
      >
        <button
          type="button"
          role="slider"
          :aria-valuenow="Math.round(position)"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="`Reveal the before and after of ${title ?? 'this roof'}`"
          class="pointer-events-auto absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-brand-700 shadow-lift transition-transform duration-300 ease-out-soft group-hover:scale-110 active:scale-95"
          @keydown="onKeydown"
        >
          <Icon name="move-horizontal" class="size-5" />
        </button>
      </div>
    </div>

    <figcaption v-if="title || caption" class="mt-5">
      <h3 v-if="title" class="text-lg font-bold text-brand-900">{{ title }}</h3>
      <p v-if="caption" class="mt-1 text-ink-soft">{{ caption }}</p>
    </figcaption>
  </figure>
</template>
