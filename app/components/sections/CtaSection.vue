<script setup lang="ts">
import { site } from '~/data/site'

withDefaults(defineProps<{ source?: string }>(), { source: 'Homepage CTA' })
</script>

<template>
  <section id="quote-section" class="relative overflow-hidden bg-surface-muted section">
    <AmbientBackdrop />

    <div class="container-page relative z-10">
      <div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <RevealGroup class="lg:col-span-5" from="left">
          <p class="eyebrow">Free quote</p>
          <h2 class="mt-4 text-h2">Find out what your roof actually needs</h2>
          <p class="mt-4 text-lead text-ink-soft">
            We will come out, get on the roof, and send you photos with a fixed price. If it turns
            out you do not need us yet, we will tell you that too.
          </p>

          <div class="mt-8 space-y-4">
            <a
              :href="site.phone.href"
              class="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand-300"
            >
              <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-300 group-hover:scale-110">
                <Icon name="phone" class="size-5" />
              </span>
              <span>
                <span class="block text-sm text-ink-faint">Call us direct</span>
                <span class="block font-display text-xl font-extrabold text-brand-900">
                  {{ site.phone.display }}
                </span>
              </span>
            </a>

            <a
              :href="`mailto:${site.email}`"
              class="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand-300"
            >
              <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-300 group-hover:scale-110">
                <Icon name="mail" class="size-5" />
              </span>
              <span class="min-w-0">
                <span class="block text-sm text-ink-faint">Email us</span>
                <span class="block truncate font-display font-extrabold text-brand-900">
                  {{ site.email }}
                </span>
              </span>
            </a>
          </div>
        </RevealGroup>

        <RevealGroup class="lg:col-span-7" from="right">
          <div class="rounded-card border border-line bg-white p-6 shadow-card sm:p-9">
            <h3 class="font-display text-xl font-extrabold text-brand-900">Request a quote</h3>
            <p class="mt-1 text-sm text-ink-soft">
              Fill this in and we will call you back — usually the same day.
            </p>
            <div class="mt-6">
              <LeadForm :source="source" />
            </div>
          </div>
        </RevealGroup>
      </div>
    </div>
  </section>
</template>
