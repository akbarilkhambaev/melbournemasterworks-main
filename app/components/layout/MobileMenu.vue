<script setup lang="ts">
/**
 * Мобильное меню.
 *
 * Было: белая простыня одинаковых ссылок, услуги — плоским отступом, внизу две
 * кнопки. Непонятно, где что, и совсем не продаёт.
 *
 * Стало: затемнение фона, панель с пружинным выездом, крупный телефон и часы
 * работы наверху (для кровельщика звонок — главный канал), услуги отдельными
 * карточками с настоящими фото крыш, остальные разделы — компактной сеткой,
 * призыв к действию липнет ко дну.
 */
import { site } from '~/data/site'
import { services } from '~/data/services'
import type { IconName } from '~/components/ui/Icon.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const route = useRoute()

const links: { label: string; to: string; icon: IconName }[] = [
  { label: 'Gallery', to: '/gallery', icon: 'camera' },
  { label: 'Areas', to: '/areas', icon: 'map-pin' },
  { label: 'Reviews', to: '/reviews', icon: 'star' },
  { label: 'About', to: '/about', icon: 'shield' },
]

const isActive = (to: string) => route.path.startsWith(to)
</script>

<template>
  <Teleport to="body">
    <!-- Затемнение: панель должна читаться как слой поверх страницы,
         а не как ещё один белый экран -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out-soft"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[55] bg-brand-950/60 backdrop-blur-sm lg:hidden"
        @click="emit('close')"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-450 ease-out-soft"
      enter-from-class="translate-x-full"
      leave-active-class="transition-transform duration-300 ease-out-soft"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="open"
        class="fixed inset-y-0 right-0 z-[60] flex w-[min(23rem,92vw)] flex-col bg-surface shadow-lift lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <!-- Шапка панели: телефон крупно, он тут главный -->
        <div class="bg-brand-900 bg-dotgrid px-6 pt-5 pb-6" style="padding-top: max(1.25rem, env(safe-area-inset-top))">
          <div class="flex items-center justify-between">
            <span class="font-display text-sm font-bold tracking-widest text-brand-300 uppercase">
              Menu
            </span>
            <button
              type="button"
              class="grid size-10 place-items-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close menu"
              @click="emit('close')"
            >
              <Icon name="x" class="size-5" />
            </button>
          </div>

          <a :href="site.phone.href" class="mt-6 flex items-center gap-3.5 group">
            <span
              class="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-500 text-brand-950 transition-transform duration-300 group-active:scale-95"
            >
              <Icon name="phone-call" class="size-5" />
            </span>
            <span>
              <span class="block text-xs font-medium text-brand-500">Call us — free inspection</span>
              <span class="block font-display text-xl font-extrabold text-white">
                {{ site.phone.display }}
              </span>
            </span>
          </a>

          <p class="mt-4 flex items-center gap-2 text-xs text-brand-500">
            <Icon name="clock" class="size-3.5" />
            {{ site.hours[0]!.days }} · {{ site.hours[0]!.time }}
          </p>
        </div>

        <!-- Прокручиваемая часть -->
        <div class="flex-1 overflow-y-auto overscroll-contain px-5 pt-6 pb-4">
          <p class="px-1 font-display text-xs font-bold tracking-widest text-ink-faint uppercase">
            Services
          </p>

          <!-- Услуги карточками с фото: человек выбирает глазами, а не читает список -->
          <ul class="mt-3 space-y-2.5">
            <li
              v-for="(service, index) in services"
              :key="service.slug"
              class="animate-[menu-in_0.45s_var(--ease-out-soft)_both]"
              :style="{ animationDelay: `${60 + index * 55}ms` }"
            >
              <NuxtLink
                :to="service.to"
                class="flex items-center gap-3.5 rounded-2xl border p-2.5 transition-colors duration-200 active:scale-[0.99]"
                :class="
                  isActive(service.to)
                    ? 'border-brand-300 bg-brand-50'
                    : 'border-line bg-white'
                "
                @click="emit('close')"
              >
                <AppImage
                  :src="service.hero"
                  sizes="72px"
                  ratio="1 / 1"
                  class="size-16 shrink-0 rounded-xl"
                />
                <span class="min-w-0 flex-1">
                  <span class="block font-display font-extrabold text-brand-900">
                    {{ service.title }}
                  </span>
                  <span class="mt-0.5 block truncate text-xs text-ink-soft">
                    {{ service.seoTitle }}
                  </span>
                </span>
                <Icon name="chevron-right" class="size-4 shrink-0 text-brand-500" />
              </NuxtLink>
            </li>
          </ul>

          <p class="mt-7 px-1 font-display text-xs font-bold tracking-widest text-ink-faint uppercase">
            Explore
          </p>

          <ul class="mt-3 grid grid-cols-2 gap-2.5">
            <li
              v-for="(link, index) in links"
              :key="link.to"
              class="animate-[menu-in_0.45s_var(--ease-out-soft)_both]"
              :style="{ animationDelay: `${240 + index * 45}ms` }"
            >
              <NuxtLink
                :to="link.to"
                class="flex flex-col gap-2 rounded-2xl border p-4 transition-colors duration-200 active:scale-[0.98]"
                :class="isActive(link.to) ? 'border-brand-300 bg-brand-50' : 'border-line bg-white'"
                @click="emit('close')"
              >
                <Icon :name="link.icon" class="size-5 text-brand-600" />
                <span class="font-display text-sm font-bold text-brand-900">{{ link.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Липкий призыв ко дну -->
        <div
          class="border-t border-line bg-white p-4"
          style="padding-bottom: max(1rem, env(safe-area-inset-bottom))"
        >
          <NuxtLink to="/contact" class="btn-primary group w-full" @click="emit('close')">
            Book my free inspection
            <Icon
              name="arrow-right"
              class="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </NuxtLink>
          <p class="mt-2.5 text-center text-xs text-ink-faint">
            Fixed price · 10-year warranty · No obligation
          </p>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style>
@keyframes menu-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}
</style>
