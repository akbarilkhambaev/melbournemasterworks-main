<script setup lang="ts">
import type { Photo } from '~/composables/usePhotos'

const props = defineProps<{
  photos: Photo[]
  /** Индекс открытого фото, null — лайтбокс закрыт */
  index: number | null
}>()

const emit = defineEmits<{ close: []; navigate: [index: number] }>()

const open = computed(() => props.index !== null)
const photo = computed(() => (props.index === null ? undefined : props.photos[props.index]))

const go = (step: number) => {
  if (props.index === null) return
  const next = (props.index + step + props.photos.length) % props.photos.length
  emit('navigate', next)
}

const onKeydown = (event: KeyboardEvent) => {
  if (!open.value) return
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowRight') go(1)
  if (event.key === 'ArrowLeft') go(-1)
}

// Фон не должен прокручиваться под открытым лайтбоксом
watch(open, (isOpen) => {
  if (import.meta.client) document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out-soft"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open && photo"
        class="fixed inset-0 z-100 flex flex-col bg-brand-950/95 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        :aria-label="photo.alt"
        @click.self="emit('close')"
      >
        <div class="flex items-center justify-between px-5 py-4 text-white/70">
          <span class="text-sm font-medium">
            {{ (index ?? 0) + 1 }} / {{ photos.length }} · {{ photo.label }}
          </span>
          <button
            type="button"
            class="grid size-10 place-items-center rounded-full transition hover:bg-white/10 hover:text-white"
            aria-label="Close gallery"
            @click="emit('close')"
          >
            <Icon name="x" class="size-6" />
          </button>
        </div>

        <div class="flex min-h-0 flex-1 items-center gap-2 px-2 pb-2 sm:gap-4 sm:px-5 sm:pb-6">
          <button
            type="button"
            class="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
            aria-label="Previous photo"
            @click="go(-1)"
          >
            <Icon name="chevron-left" class="size-5" />
          </button>

          <Transition
            mode="out-in"
            enter-active-class="transition duration-300 ease-out-soft"
            enter-from-class="opacity-0 scale-[0.97]"
            leave-active-class="transition duration-150"
            leave-to-class="opacity-0"
          >
            <AppImage
              :key="photo.slug"
              :src="photo.slug"
              sizes="(max-width: 640px) 100vw, 80vw"
              priority
              class="mx-auto max-h-full min-h-0 w-auto max-w-full rounded-2xl"
              img-class="max-h-[76vh] w-auto object-contain"
            />
          </Transition>

          <button
            type="button"
            class="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
            aria-label="Next photo"
            @click="go(1)"
          >
            <Icon name="chevron-right" class="size-5" />
          </button>
        </div>

        <p class="px-6 pb-6 text-center text-sm text-white/60">{{ photo.alt }}</p>
      </div>
    </Transition>
  </Teleport>
</template>
