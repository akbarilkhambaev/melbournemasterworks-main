<script setup lang="ts">
import { site, nav } from '~/data/site'
import { services } from '~/data/services'
import logo from '~/assets/images/logo.png'

const year = new Date().getFullYear()
const mainLinks = nav.filter((item) => !item.children)
</script>

<template>
  <footer class="border-t border-line bg-surface-muted">
    <div class="container-page py-14 lg:py-20">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-4">
          <img :src="logo" alt="Melbourne Masterworks" width="988" height="430" class="h-12 w-auto" />
          <p class="mt-5 max-w-sm text-ink-soft">
            Licensed, insured roof restoration, repairs and guttering across metropolitan Melbourne.
            Fixed prices, real photos, ten-year workmanship warranty.
          </p>
          <a
            :href="site.phone.href"
            class="mt-6 inline-flex items-center gap-2 font-display text-2xl font-extrabold text-brand-700 transition-colors hover:text-brand-600"
          >
            {{ site.phone.display }}
          </a>
        </div>

        <div class="lg:col-span-2">
          <h2 class="font-display text-sm font-bold tracking-wide text-brand-900 uppercase">Services</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="service in services" :key="service.slug">
              <NuxtLink
                :to="service.to"
                class="text-ink-soft transition-colors hover:text-brand-700"
              >
                {{ service.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h2 class="font-display text-sm font-bold tracking-wide text-brand-900 uppercase">Company</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in mainLinks" :key="item.to">
              <NuxtLink :to="item.to" class="text-ink-soft transition-colors hover:text-brand-700">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <h2 class="font-display text-sm font-bold tracking-wide text-brand-900 uppercase">Get in touch</h2>
          <address class="mt-4 space-y-3 not-italic text-ink-soft">
            <p>{{ site.address.full }}</p>
            <p>
              <a
                :href="`mailto:${site.email}`"
                class="break-all transition-colors hover:text-brand-700"
              >
                {{ site.email }}
              </a>
            </p>
          </address>

          <dl class="mt-5 space-y-1.5 text-sm">
            <div v-for="row in site.hours" :key="row.days" class="flex justify-between gap-4 text-ink-soft">
              <dt>{{ row.days }}</dt>
              <dd class="font-medium text-brand-900">{{ row.time }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ site.name }}. Licensed &amp; fully insured.</p>
        <p>Roof restoration, repairs &amp; guttering — Melbourne, VIC</p>
      </div>
    </div>
  </footer>
</template>
