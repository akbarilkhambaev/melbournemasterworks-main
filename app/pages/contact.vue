<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'Contact — Free Roof Inspection in Melbourne',
  description: `Call ${site.phone.display} or send us a message. Free, no-obligation roof quotes across metropolitan Melbourne.`,
})

const mapQuery = encodeURIComponent(`${site.address.full}, Australia`)

useHead({
  link: [{ rel: 'canonical', href: `${useRuntimeConfig().public.siteUrl}/contact` }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Contact"
      title="Let's take a look at your roof"
      text="Call us, or send the form and we will get back to you — usually the same day."
      :crumbs="[{ label: 'Contact' }]"
    />

    <section class="pt-12 pb-16 lg:pt-16 lg:pb-24">
      <div class="container-page">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <RevealGroup class="lg:col-span-5" from="left" :stagger="90">
            <a
              :href="site.phone.href"
              class="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand-300"
            >
              <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-300 group-hover:scale-110">
                <Icon name="phone" class="size-5" />
              </span>
              <span>
                <span class="block text-sm text-ink-faint">Phone</span>
                <span class="block font-display text-xl font-extrabold text-brand-900">
                  {{ site.phone.display }}
                </span>
              </span>
            </a>

            <a
              :href="`mailto:${site.email}`"
              class="group mt-4 flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand-300"
            >
              <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-300 group-hover:scale-110">
                <Icon name="mail" class="size-5" />
              </span>
              <span class="min-w-0">
                <span class="block text-sm text-ink-faint">Email</span>
                <span class="block truncate font-display font-extrabold text-brand-900">
                  {{ site.email }}
                </span>
              </span>
            </a>

            <div class="mt-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
              <span class="block text-sm text-ink-faint">Address</span>
              <address class="mt-1 not-italic font-display font-extrabold text-brand-900">
                {{ site.address.full }}
              </address>

              <dl class="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                <div
                  v-for="row in site.hours"
                  :key="row.days"
                  class="flex justify-between gap-4 text-ink-soft"
                >
                  <dt>{{ row.days }}</dt>
                  <dd class="font-semibold text-brand-900">{{ row.time }}</dd>
                </div>
              </dl>
            </div>

            <div class="mt-4 overflow-hidden rounded-2xl border border-line shadow-soft">
              <iframe
                :src="`https://www.google.com/maps?q=${mapQuery}&output=embed`"
                title="Melbourne Masterworks location"
                class="h-64 w-full border-0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </RevealGroup>

          <RevealGroup class="lg:col-span-7" from="right">
            <div class="rounded-card border border-line bg-white p-6 shadow-card sm:p-9">
              <h2 class="text-h3">Send us a message</h2>
              <p class="mt-2 text-ink-soft">
                Tell us what is happening with the roof. Photos help, but they are not essential —
                we will come and look.
              </p>
              <div class="mt-7">
                <LeadForm source="Contact page" />
              </div>
            </div>
          </RevealGroup>
        </div>
      </div>
    </section>
  </div>
</template>
