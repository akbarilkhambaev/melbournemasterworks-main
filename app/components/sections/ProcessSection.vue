<script setup lang="ts">
/**
 * Таймлайн, привязанный к скроллу: линия прочерчивается по мере прокрутки,
 * шаги загораются, когда линия до них дошла.
 */
const steps = [
  {
    title: 'Call or send the form',
    text: 'Tell us roughly what is going on. We will book a time that suits you — usually within a few days.',
  },
  {
    title: 'We get on the roof',
    text: 'A proper inspection, not a look from the driveway. We photograph everything we find, good and bad.',
  },
  {
    title: 'You get a fixed price',
    text: 'Written quote with the photos attached, so you can see exactly what you are paying for. No obligation.',
  },
  {
    title: 'We do the work',
    text: 'Site sheeted up, job done, everything cleaned down. You get the after photos and a 10-year warranty.',
  },
]

const track = ref<HTMLElement | null>(null)
const progress = ref(0)

// Геометрия трека кэшируется, в кадре — только арифметика от scrollY
let top = 0
let height = 0

onLayoutChange(() => {
  const node = track.value
  if (!node) return

  let offset = 0
  let current: HTMLElement | null = node
  while (current) {
    offset += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }
  top = offset
  height = node.offsetHeight
})

onScrollFrame((scrollY, viewportH) => {
  if (prefersReducedMotion()) {
    progress.value = 1
    return
  }
  if (!height) return

  // 0 — когда верх трека дошёл до 75% экрана, 1 — когда низ поднялся до 40%
  const start = viewportH * 0.75
  const end = viewportH * 0.4
  const raw = (scrollY + start - top) / (height + start - end)
  progress.value = Math.min(1, Math.max(0, raw))
})

/** Шаг активен, когда линия дошла до его позиции */
const isLit = (index: number) => progress.value >= (index + 0.35) / steps.length
</script>

<template>
  <section class="section bg-surface-muted">
    <div class="container-page">
      <SectionHeading
        eyebrow="How it works"
        title="From the first call to the final photo"
        text="No mystery, no waiting by the phone. Here is exactly what happens, and when."
      />

      <div ref="track" class="relative mt-16">
        <!-- Рельс таймлайна. Вертикальный и горизонтальный — два отдельных
             элемента: одна трансформация не может быть scaleY на мобиле и
             scaleX на десктопе, а inline-стиль перебил бы адаптивный класс. -->
        <div class="absolute top-0 bottom-0 left-7 w-0.5 rounded-full bg-brand-100 md:hidden" aria-hidden="true">
          <div
            class="size-full origin-top rounded-full bg-brand-700 transition-transform duration-150 ease-linear"
            :style="{ transform: `scaleY(${progress})` }"
          />
        </div>

        <div class="absolute top-7 right-0 left-0 hidden h-0.5 rounded-full bg-brand-100 md:block" aria-hidden="true">
          <div
            class="size-full origin-left rounded-full bg-brand-700 transition-transform duration-150 ease-linear"
            :style="{ transform: `scaleX(${progress})` }"
          />
        </div>

        <ol class="grid gap-10 md:grid-cols-4 md:gap-6">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            class="relative flex gap-5 pl-0 md:block"
          >
            <span
              class="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl font-display text-xl font-extrabold transition-all duration-500 ease-out-soft"
              :class="
                isLit(index)
                  ? 'bg-brand-700 text-white shadow-glow scale-100'
                  : 'bg-white text-brand-300 border border-line scale-95'
              "
            >
              {{ index + 1 }}
            </span>

            <!-- Текст НЕ затемняем. Раньше неактивные шаги стояли на opacity-45,
                 и контраст падал до 2.01:1 — вдвое ниже нормы WCAG. Индикатором
                 прогресса остаются номер шага и линия: они меняются достаточно
                 ярко, чтобы прочитать таймлайн, и при этом ничего не ломают. -->
            <div
              class="transition-transform duration-500 ease-out-soft md:mt-5"
              :class="isLit(index) ? 'translate-y-0' : 'translate-y-1'"
            >
              <h3 class="font-display text-lg font-extrabold text-brand-900">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
