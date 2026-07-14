<script setup lang="ts">
import { site } from '~/data/site'
import type { IconName } from '~/components/ui/Icon.vue'

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: 'About — Licensed Melbourne Roofing Specialists',
  description:
    'Licensed, insured Melbourne roofing specialists. Premium Australian materials, photographed inspections, fixed prices and a 10-year workmanship warranty.',
})

useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/about` }] })

const values: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'We only do roofs',
    text: 'Restoration, repairs, guttering. We are not a general trades outfit that climbs ladders on weekends — this is the whole business.',
    icon: 'hammer',
  },
  {
    title: 'Australian materials',
    text: 'Colorbond, flexible pointing, UV-rated membranes. Cheap imports do not survive one Melbourne summer, let alone ten.',
    icon: 'sparkles',
  },
  {
    title: 'The price does not move',
    text: 'You approve a fixed quote before we start. Find something extra? We show you the photo and you decide — we never just add it to the bill.',
    icon: 'lock',
  },
  {
    title: 'Everything is photographed',
    text: 'Before and after. You get the pictures whether you hire us or not, so you always know what is actually up there.',
    icon: 'camera',
  },
]

/** Коллаж: одна крупная и две поменьше, все едут параллаксом с разной скоростью */
const collage = ['restoration-06', 'repairs-03', 'metal-04']
</script>

<template>
  <div>
    <!-- Герой-заявление: крупная типографика вместо трёх колонок сплошного текста -->
    <section class="relative overflow-hidden bg-surface pt-28 pb-16 lg:pt-36 lg:pb-24">
      <AmbientBackdrop />

      <div class="container-page relative z-10">
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-1.5 text-sm text-ink-faint">
            <li><NuxtLink to="/" class="transition-colors hover:text-brand-700">Home</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li class="font-medium text-brand-900">About</li>
          </ol>
        </nav>

        <div class="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div class="lg:col-span-7">
            <p class="eyebrow">About us</p>
            <h1 class="mt-4 text-display">
              <SplitText text="Start at the" as="span" class="block" :delay="80" />
              <SplitText text="very top." as="span" class="block text-brand-600" :delay="200" />
            </h1>

            <p
              class="mt-7 max-w-xl text-lead text-ink-soft animate-[fade-up_0.7s_var(--ease-out-soft)_both]"
              style="animation-delay: 420ms"
            >
              Your roof is the one part of the house that protects everything else — and the one
              part almost nobody looks at until there is a stain on the ceiling.
            </p>

            <div
              class="mt-10 flex flex-wrap gap-3 animate-[fade-up_0.7s_var(--ease-out-soft)_both]"
              style="animation-delay: 540ms"
            >
              <MagneticButton as="a" :href="site.phone.href" class="btn-primary group">
                <Icon name="phone" class="size-4" />
                {{ site.phone.display }}
              </MagneticButton>
              <NuxtLink to="/gallery" class="btn-ghost group">
                See our work
                <Icon
                  name="arrow-right"
                  class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </NuxtLink>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="grid grid-cols-5 gap-4">
              <ParallaxMedia
                :src="collage[0]!"
                sizes="(max-width: 1024px) 60vw, 300px"
                ratio="3 / 4"
                priority
                :speed="0.18"
                class="col-span-3 rounded-3xl shadow-card"
              />
              <div class="col-span-2 flex flex-col gap-4 pt-10">
                <ParallaxMedia
                  :src="collage[1]!"
                  sizes="(max-width: 1024px) 40vw, 200px"
                  ratio="1 / 1"
                  :speed="0.06"
                  class="rounded-3xl shadow-card"
                />
                <ParallaxMedia
                  :src="collage[2]!"
                  sizes="(max-width: 1024px) 40vw, 200px"
                  ratio="1 / 1"
                  :speed="0.26"
                  class="rounded-3xl shadow-card"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TrustStrip />

    <section class="section">
      <div class="container-page">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-5">
            <div class="lg:sticky lg:top-32">
              <RevealGroup :stagger="60">
                <p class="eyebrow">Our story</p>
                <h2 class="mt-4 text-h2">
                  <SplitText text="Roofs rarely fail overnight" on-scroll />
                </h2>
                <p class="mt-5 text-ink-soft">
                  They fail slowly and quietly, and by the time you notice, it is expensive. That is
                  the whole reason we quote the way we do.
                </p>
              </RevealGroup>
            </div>
          </div>

          <RevealGroup class="lg:col-span-7" :stagger="60">
            <p class="text-lead text-ink-soft">
              Melbourne Masterworks is a licensed, fully insured roofing team working right across
              metropolitan Melbourne. We restore tired tile roofs, repair the ones that have started
              to leak, and replace guttering that has rusted through — using premium Australian
              products, and backing every job with a ten-year workmanship warranty.
            </p>
            <p class="mt-6 text-ink-soft">
              Most of the roofs we see are not failing because of one dramatic event. The pointing
              cracks. A tile slips. Moss holds moisture against the surface through a wet winter.
              Three seasons later there is a brown ring on the ceiling and a bill nobody budgeted
              for. Caught early, almost all of it is fixable without replacing anything at all.
            </p>
            <p class="mt-6 text-ink-soft">
              That is why we get on the roof, photograph exactly what is there, and show you before
              we quote. Sometimes the answer is a full restoration. Sometimes it is two hours of
              re-pointing and you should call us again in five years. We would rather tell you the
              truth and keep you as a client than sell you a roof you did not need.
            </p>

            <blockquote
              class="mt-10 rounded-card border-l-4 border-accent-500 bg-surface-muted p-7 lg:p-8"
            >
              <p class="font-display text-xl font-extrabold text-brand-900 lg:text-2xl">
                “If your roof does not need us yet, we will tell you that too — and you still keep
                the photos.”
              </p>
            </blockquote>

            <p class="mt-8 text-ink-soft">
              Wondering whether your roof is due? Call
              <a
                :href="site.phone.href"
                class="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-600"
                >{{ site.phone.display }}</a
              >. The inspection and the quote are free either way.
            </p>
          </RevealGroup>
        </div>
      </div>
    </section>

    <section class="section bg-surface-muted">
      <div class="container-page">
        <SectionHeading
          eyebrow="How we work"
          title="Four things we will not compromise on"
          text="Roofing has a reputation, and it was earned. These are the lines we do not cross."
        />

        <RevealGroup class="mt-14 grid gap-5 md:grid-cols-2" :stagger="60">
          <TiltCard
            v-for="value in values"
            :key="value.title"
            :max="4"
            class="group flex gap-5 rounded-card border border-line bg-white p-7 shadow-soft transition-shadow duration-500 ease-out-soft hover:shadow-card"
          >
            <span
              class="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-500 ease-out-soft group-hover:bg-brand-700 group-hover:text-white"
            >
              <Icon :name="value.icon" class="size-5" />
            </span>
            <div>
              <h3 class="font-display text-lg font-extrabold text-brand-900">{{ value.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ value.text }}</p>
            </div>
          </TiltCard>
        </RevealGroup>
      </div>
    </section>

    <ProcessSection />
    <CtaSection source="About" />
  </div>
</template>
