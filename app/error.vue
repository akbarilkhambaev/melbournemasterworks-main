<script setup lang="ts">
import type { NuxtError } from '#app'
import { site } from '~/data/site'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.statusCode === 404)
</script>

<template>
  <NuxtLayout>
    <section class="bg-aurora bg-surface">
      <div class="container-page flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
        <p class="font-display text-8xl font-extrabold text-brand-100">{{ error.statusCode }}</p>

        <h1 class="mt-4 text-h1">
          {{ is404 ? 'That page has slipped off the roof' : 'Something went wrong' }}
        </h1>

        <p class="mt-5 max-w-lg text-lead text-ink-soft">
          {{
            is404
              ? 'The page you were after does not exist any more. The roof is fine — our sitemap is not.'
              : 'We have hit an unexpected error. Try again, or just give us a call.'
          }}
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <NuxtLink
            to="/"
            class="rounded-xl bg-brand-700 px-7 py-4 font-display font-bold text-white shadow-glow transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Back to home
          </NuxtLink>
          <a
            :href="site.phone.href"
            class="rounded-xl border border-line bg-white px-7 py-4 font-display font-bold text-brand-900 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand-300"
          >
            Call {{ site.phone.display }}
          </a>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
