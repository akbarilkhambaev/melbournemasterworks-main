<script setup lang="ts">
/**
 * Фото, которое едет медленнее страницы. Картинка внутри намеренно выше
 * рамки — иначе при сдвиге снизу вылезала бы пустота.
 *
 * Позиционирование живёт на обёртке, а не на самом AppImage: у того в корне
 * свой `relative`, и он перебивал бы `absolute` (в Tailwind порядок классов
 * в атрибуте ничего не решает — выигрывает та утилита, что позже в CSS).
 */
const props = withDefaults(
  defineProps<{
    src: string
    sizes?: string
    ratio?: string
    speed?: number
    priority?: boolean
    class?: string
  }>(),
  { sizes: '100vw', speed: 0.12, priority: false },
)

const frame = ref<HTMLElement | null>(null)
useParallax(frame, props.speed)
</script>

<template>
  <div
    ref="frame"
    :class="['relative overflow-hidden', props.class]"
    :style="{ aspectRatio: ratio }"
  >
    <div class="parallax-layer absolute inset-x-0 -top-[12%] h-[124%]">
      <AppImage
        :src="src"
        :sizes="sizes"
        :priority="priority"
        class="size-full"
        img-class="size-full"
      />
    </div>
    <slot />
  </div>
</template>

<style>
.parallax-layer {
  transform: translate3d(0, var(--parallax-y, 0), 0);
  will-change: transform;
}
</style>
