<script setup lang="ts">
import { site, nav } from '~/data/site'
import logo from '~/assets/images/logo.png'

const route = useRoute()
const menuOpen = ref(false)
const servicesOpen = ref(false)

// Шапка сжимается, как только страница тронулась с места.
// Слушатель общий на весь сайт — см. useScrollDriver.
const scrolled = ref(false)
onScrollFrame((y) => (scrolled.value = y > 8))

// Меню закрывается при переходе, иначе оно висит поверх новой страницы
watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)

watch(menuOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})
onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-400 ease-out-soft"
    :class="scrolled ? 'bg-white/85 shadow-soft backdrop-blur-xl' : 'bg-transparent'"
  >
    <div class="container-page">
      <div
        class="flex items-center justify-between transition-[height] duration-400 ease-out-soft"
        :class="scrolled ? 'h-16 lg:h-18' : 'h-20 lg:h-24'"
      >
        <NuxtLink to="/" class="shrink-0" aria-label="Melbourne Masterworks — home">
          <img
            :src="logo"
            alt="Melbourne Masterworks"
            width="988"
            height="430"
            class="w-auto transition-[height] duration-400 ease-out-soft"
            :class="scrolled ? 'h-9 lg:h-10' : 'h-11 lg:h-14'"
          />
        </NuxtLink>

        <!-- Десктопное меню -->
        <nav class="hidden items-center gap-1 lg:flex" aria-label="Main">
          <template v-for="item in nav" :key="item.to">
            <div
              v-if="item.children"
              class="relative"
              @mouseenter="servicesOpen = true"
              @mouseleave="servicesOpen = false"
            >
              <NuxtLink
                :to="item.to"
                class="relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200"
                :class="isActive(item.to) ? 'text-brand-700' : 'text-ink-soft hover:text-brand-700'"
              >
                {{ item.label }}
                <Icon name="chevron-down" class="size-3.5 transition-transform duration-300" />
                <span
                  class="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-700 transition-transform duration-300 ease-out-soft"
                  :class="isActive(item.to) ? 'scale-x-100' : 'scale-x-0'"
                />
              </NuxtLink>

              <Transition
                enter-active-class="transition duration-250 ease-out-soft"
                enter-from-class="opacity-0 -translate-y-1"
                leave-active-class="transition duration-150"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="servicesOpen"
                  class="absolute left-0 top-full w-64 pt-2"
                >
                  <div class="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-lift">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.to"
                      :to="child.to"
                      class="block rounded-xl px-4 py-3 text-sm font-medium text-ink-soft transition-colors duration-150 hover:bg-brand-50 hover:text-brand-700"
                    >
                      {{ child.label }}
                    </NuxtLink>
                  </div>
                </div>
              </Transition>
            </div>

            <NuxtLink
              v-else
              :to="item.to"
              class="relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200"
              :class="isActive(item.to) ? 'text-brand-700' : 'text-ink-soft hover:text-brand-700'"
            >
              {{ item.label }}
              <span
                class="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-700 transition-transform duration-300 ease-out-soft"
                :class="isActive(item.to) ? 'scale-x-100' : 'scale-x-0'"
              />
            </NuxtLink>
          </template>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <a
            :href="site.phone.href"
            class="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-brand-900 transition-colors duration-200 hover:text-brand-600"
          >
            <span class="grid size-9 place-items-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-300 group-hover:scale-110">
              <Icon name="phone" class="size-4" />
            </span>
            {{ site.phone.display }}
          </a>

          <NuxtLink
            to="/contact"
            class="group flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Free quote
            <Icon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </NuxtLink>
        </div>

        <!-- Кнопка мобильного меню -->
        <button
          type="button"
          class="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 lg:hidden"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <span class="relative block h-4 w-5">
            <span
              class="absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out-soft"
              :class="menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'"
            />
            <span
              class="absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200"
              :class="menuOpen && 'opacity-0'"
            />
            <span
              class="absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out-soft"
              :class="menuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'"
            />
          </span>
        </button>
      </div>
    </div>

    <MobileMenu :open="menuOpen" @close="menuOpen = false" />
  </header>
</template>

