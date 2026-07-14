<script setup lang="ts">
/**
 * Отзывов пока нет — и выдумывать их нельзя. Но страница всё равно обязана
 * продавать доверием, поэтому строится не на пустой сетке карточек, а на том,
 * что у нас реально есть: настоящие фото «до/после», гарантия в письменном
 * виде, готовность дать телефон прошлого клиента и честные ответы.
 *
 * Как только в testimonials.ts появятся живые отзывы, их секция встанет
 * наверх сама.
 */
import { faqs } from '~/data/faqs'
import { reviewsUrl } from '~/data/testimonials'
import { site } from '~/data/site'

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: 'Reviews & Roofing FAQ — Melbourne',
  description:
    'Answers on roof restoration cost, warranties, timelines and what actually happens on the day, plus reviews from Melbourne homeowners.',
})

useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/reviews` }] })

const proof = [
  {
    icon: 'camera' as const,
    title: 'Photos, not promises',
    text: 'Every job is photographed before and after, from the same spot. Everything on this site is our own work — no stock, no borrowed roofs.',
    to: '/gallery',
    cta: 'See the gallery',
  },
  {
    icon: 'phone' as const,
    title: 'Talk to a past client',
    text: 'Ask us on the day and we will put you in touch with someone in your suburb whose roof we finished recently.',
    to: '/contact',
    cta: 'Ask for a reference',
  },
  {
    icon: 'shield' as const,
    title: 'Ten years, in writing',
    text: 'The workmanship warranty is a document, not a handshake. You get your copy when the job is signed off.',
    to: '/services/restorations',
    cta: 'What it covers',
  },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-surface pt-28 pb-16 lg:pt-36 lg:pb-20">
      <AmbientBackdrop />

      <div class="container-page relative z-10">
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-1.5 text-sm text-ink-faint">
            <li><NuxtLink to="/" class="transition-colors hover:text-brand-700">Home</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li class="font-medium text-brand-900">Reviews</li>
          </ol>
        </nav>

        <div class="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div class="lg:col-span-6">
          <p class="eyebrow">Reviews &amp; FAQ</p>
          <h1 class="mt-4 text-h1">
            <SplitText text="Trust is earned" as="span" class="block" :delay="80" />
            <SplitText text="on the roof." as="span" class="block text-brand-600" :delay="220" />
          </h1>
          <p
            class="mt-6 max-w-xl text-lead text-ink-soft animate-[fade-up_0.7s_var(--ease-out-soft)_both]"
            style="animation-delay: 440ms"
          >
            Anyone can print five stars on a website. Here is the evidence we can actually put in
            your hands — and honest answers to what people ask us most.
          </p>
          </div>

          <!-- Правая колонка пустовала. Ставим доказательство работой:
               фото с параллаксом и гарантия поверх него. -->
          <div class="lg:col-span-6">
            <div class="relative">
              <ParallaxMedia
                src="ba-hip-after"
                sizes="(max-width: 1024px) 100vw, 560px"
                ratio="4 / 3"
                priority
                :speed="0.14"
                class="rounded-4xl shadow-lift"
              />
              <div
                class="absolute -bottom-6 -left-4 rounded-2xl border border-line bg-white/95 px-6 py-5 shadow-lift backdrop-blur-xl"
              >
                <div class="flex items-center gap-3">
                  <span class="grid size-11 place-items-center rounded-xl bg-accent-500 text-brand-950">
                    <Icon name="shield" class="size-5" />
                  </span>
                  <div>
                    <p class="font-display text-xl font-extrabold text-brand-900">
                      <CountUp :to="10" suffix=" years" />
                    </p>
                    <p class="text-xs font-medium text-ink-soft">Workmanship warranty, in writing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Если отзывы залиты, они встают первыми -->
    <TestimonialsSection />

    <section class="section">
      <div class="container-page">
        <SectionHeading
          eyebrow="The evidence"
          title="What we can actually show you"
          text="We are not going to invent testimonials. These three things are real, and you can check every one of them before committing to anything."
        />

        <RevealGroup class="mt-14 grid gap-5 md:grid-cols-3" :stagger="70">
          <TiltCard
            v-for="item in proof"
            :key="item.title"
            :max="4"
            class="group flex flex-col rounded-card border border-line bg-white p-7 shadow-soft transition-shadow duration-500 ease-out-soft hover:shadow-card"
          >
            <span
              class="grid size-12 place-items-center rounded-xl bg-accent-500/12 text-accent-600 transition-colors duration-500 ease-out-soft group-hover:bg-accent-500 group-hover:text-brand-950"
            >
              <Icon :name="item.icon" class="size-6" />
            </span>
            <h3 class="mt-5 font-display text-lg font-extrabold text-brand-900">{{ item.title }}</h3>
            <p class="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{{ item.text }}</p>
            <NuxtLink
              :to="item.to"
              class="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-brand-700"
            >
              {{ item.cta }}
              <span
                class="grid size-7 place-items-center rounded-full bg-brand-50 transition-all duration-400 ease-out-soft group-hover:translate-x-1 group-hover:bg-brand-700 group-hover:text-white"
              >
                <Icon name="arrow-right" class="size-3.5" :stroke="3" />
              </span>
            </NuxtLink>
          </TiltCard>
        </RevealGroup>

        <!-- Кнопка появится, как только заказчик пришлёт ссылку на Google-профиль -->
        <RevealGroup v-if="reviewsUrl" class="mt-10 text-center" :delay="100">
          <a :href="reviewsUrl" target="_blank" rel="noopener" class="btn-ghost inline-flex">
            <Icon name="star" class="size-4 text-accent-500" />
            Read our Google reviews
          </a>
        </RevealGroup>
      </div>
    </section>

    <!-- Лучшее доказательство — сама работа -->
    <BeforeAfterSection />

    <section class="section">
      <div class="container-page">
        <SectionHeading
          eyebrow="FAQ"
          title="The questions people actually ask"
          text="If yours is not here, call us. We would rather talk it through than have you guess."
        />
        <RevealGroup class="mx-auto mt-12 max-w-3xl">
          <FaqList :items="faqs" />
        </RevealGroup>

        <RevealGroup class="mx-auto mt-10 max-w-3xl" :delay="100">
          <div
            class="flex flex-col items-center gap-5 rounded-card border border-line bg-surface-muted p-8 text-center sm:flex-row sm:text-left"
          >
            <span class="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-700 text-white">
              <Icon name="phone-call" class="size-6" />
            </span>
            <div class="flex-1">
              <h3 class="font-display text-lg font-extrabold text-brand-900">
                Still not sure? Just ask.
              </h3>
              <p class="mt-1 text-sm text-ink-soft">
                No script and no sales pitch — a straight answer about your roof.
              </p>
            </div>
            <MagneticButton as="a" :href="site.phone.href" class="btn-primary shrink-0">
              {{ site.phone.display }}
            </MagneticButton>
          </div>
        </RevealGroup>
      </div>
    </section>

    <CtaSection source="Reviews & FAQ" />
  </div>
</template>
