<script setup lang="ts">
/**
 * Липкий призыв к действию.
 *
 * На мобиле — полоса внизу экрана: звонок для кровельщика главный канал заявок,
 * и он должен быть в одном касании из любого места страницы.
 *
 * На десктопе раньше не было ничего: человек уходил вниз по длинной странице и
 * терял телефон из виду вместе с шапкой. Теперь снизу справа всплывает
 * компактная плашка.
 */
import { site } from '~/data/site'

const visible = ref(false)
onScrollFrame((y) => (visible.value = y > 700))
</script>

<template>
  <!-- Мобильная полоса -->
  <Transition
    enter-active-class="transition duration-400 ease-out-soft"
    enter-from-class="translate-y-full"
    leave-active-class="transition duration-250"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 lg:hidden"
      style="padding-bottom: env(safe-area-inset-bottom)"
    >
      <div class="grid grid-cols-2 gap-2 p-3">
        <a
          :href="site.phone.href"
          class="flex items-center justify-center gap-2 rounded-xl border-2 border-brand-700 py-3.5 font-display font-bold text-brand-700 active:scale-[0.98]"
        >
          <Icon name="phone" class="size-4" />
          Call now
        </a>
        <NuxtLink
          to="/contact"
          class="flex items-center justify-center rounded-xl bg-brand-700 py-3.5 font-display font-bold text-white active:scale-[0.98]"
        >
          Free quote
        </NuxtLink>
      </div>
    </div>
  </Transition>

  <!-- Десктопная плашка -->
  <Transition
    enter-active-class="transition duration-500 ease-out-soft"
    enter-from-class="translate-y-6 opacity-0"
    leave-active-class="transition duration-250"
    leave-to-class="translate-y-6 opacity-0"
  >
    <div
      v-if="visible"
      class="fixed right-6 bottom-6 z-40 hidden items-center gap-3 rounded-2xl border border-line bg-white/95 p-2.5 pl-5 shadow-lift backdrop-blur-xl lg:flex"
    >
      <div class="pr-1">
        <p class="text-xs font-medium text-ink-faint">Free inspection, fixed price</p>
        <a
          :href="site.phone.href"
          class="font-display text-lg font-extrabold text-brand-900 transition-colors hover:text-brand-600"
        >
          {{ site.phone.display }}
        </a>
      </div>

      <MagneticButton as="a" href="/contact" class="btn-primary group !px-5 !py-3 text-sm">
        Get my quote
        <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </MagneticButton>
    </div>
  </Transition>
</template>
