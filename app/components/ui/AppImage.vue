<script setup lang="ts">
/**
 * Картинка из манифеста: AVIF + WebP, srcset под ширину экрана, размытая
 * заглушка под спиннер, зарезервированное место — контент не «прыгает».
 */
import { getPhoto } from '~/composables/usePhotos'

const props = withDefaults(
  defineProps<{
    src: string
    /** Значение атрибута sizes — от него зависит, какой файл выберет браузер */
    sizes?: string
    alt?: string
    /** Первый экран грузим сразу и в приоритете, остальное — лениво */
    priority?: boolean
    /** Обрезать под фиксированное соотношение вместо родного */
    ratio?: string
    class?: string
    imgClass?: string
  }>(),
  {
    sizes: '100vw',
    priority: false,
  },
)

const photo = computed(() => getPhoto(props.src))
const loaded = ref(false)

const srcset = (format: 'avif' | 'webp') =>
  photo.value?.widths.map((w) => `/img/${props.src}-${w}.${format} ${w}w`).join(', ')

/** Фолбэк для <img> — самый широкий webp */
const fallback = computed(() => {
  const widths = photo.value?.widths ?? []
  return `/img/${props.src}-${widths[widths.length - 1]}.webp`
})

/**
 * Приоритетную картинку (это почти всегда LCP-элемент) просим браузер начать
 * качать сразу, не дожидаясь, пока он разберёт <picture> в разметке.
 * На медленном канале это единственное, что реально двигает LCP.
 */
if (props.priority) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        type: 'image/avif',
        imagesrcset: srcset('avif'),
        imagesizes: props.sizes,
        fetchpriority: 'high',
      },
    ],
  })
}

const style = computed(() => ({
  aspectRatio: props.ratio ?? `${photo.value?.width} / ${photo.value?.height}`,
  backgroundImage: loaded.value ? undefined : `url("${photo.value?.lqip}")`,
}))
</script>

<template>
  <div
    v-if="photo"
    :class="['relative overflow-hidden bg-brand-100 bg-cover bg-center', props.class]"
    :style="style"
  >
    <picture>
      <source :srcset="srcset('avif')" :sizes="sizes" type="image/avif" />
      <source :srcset="srcset('webp')" :sizes="sizes" type="image/webp" />
      <img
        :src="fallback"
        :alt="alt ?? photo.alt"
        :width="photo.width"
        :height="photo.height"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        :decoding="priority ? 'sync' : 'async'"
        :class="[
          'size-full object-cover transition-opacity duration-700 ease-out-soft',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClass,
        ]"
        @load="loaded = true"
      />
    </picture>
  </div>
</template>
