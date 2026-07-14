<script setup lang="ts">
/**
 * Снятие рисков.
 *
 * Главный вопрос, с которым человек уходит с сайта кровельщика, — «сколько это
 * будет стоить и во что я ввязываюсь». Цифры на сайте выставлять нельзя: цена
 * зависит от крыши. Но можно честно объяснить, из чего она складывается,
 * и убрать всё, чем человек рискует, соглашаясь на осмотр.
 */
import { site } from '~/data/site'

const promises = [
  {
    title: 'The inspection costs you nothing',
    text: 'We get on the roof, photograph every problem we find, and hand you the report. If you decide not to go ahead, you keep the photos and owe us nothing.',
    icon: 'eye' as const,
  },
  {
    title: 'The price is fixed before we start',
    text: 'You approve a written number, and that is the number on the invoice. If we find something extra, we show you the photo and you decide — we never just add it.',
    icon: 'lock' as const,
  },
  {
    title: 'Ten years of workmanship warranty',
    text: 'If something we did fails within ten years, we come back and put it right at our cost. Manufacturer warranties on the materials sit on top of that.',
    icon: 'shield' as const,
  },
]

const drivers = [
  { label: 'Roof size and pitch', text: 'A steep two-storey takes longer and needs more safety rigging than a single-storey hip.' },
  { label: 'Condition of the tiles', text: 'A handful of cracked tiles is nothing. Fifty of them is a different job.' },
  { label: 'State of the ridge capping', text: 'Re-bedding every cap is the slowest part of a restoration — and the part cowboys skip.' },
  { label: 'Access', text: 'Tight side gates and overhanging trees add time. We tell you before, not after.' },
]

</script>

<template>
  <section class="section">
    <div class="container-page">
      <SectionHeading
        eyebrow="Our promise"
        title="You risk nothing by asking"
        text="Roofing has a reputation, and it was earned. Here is exactly what we commit to — before you let anyone near your roof."
      />

      <RevealGroup class="mt-14 grid gap-5 md:grid-cols-3" :stagger="70">
        <TiltCard
          v-for="promise in promises"
          :key="promise.title"
          :max="4"
          class="group flex flex-col rounded-card border border-line bg-white p-7 shadow-soft transition-shadow duration-500 ease-out-soft hover:shadow-card"
        >
          <span
            class="grid size-12 place-items-center rounded-xl bg-accent-500/12 text-accent-600 transition-colors duration-500 ease-out-soft group-hover:bg-accent-500 group-hover:text-brand-950"
          >
            <Icon :name="promise.icon" class="size-6" />
          </span>
          <h3 class="mt-5 font-display text-lg font-extrabold text-brand-900">{{ promise.title }}</h3>
          <p class="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{{ promise.text }}</p>
        </TiltCard>
      </RevealGroup>

      <!-- Честный разговор о цене вместо «звоните, узнаете» -->
      <RevealGroup class="mt-6" :delay="100">
        <div class="grid gap-8 rounded-card border border-line bg-surface-muted p-8 lg:grid-cols-12 lg:p-10">
          <div class="lg:col-span-5">
            <h3 class="text-h3">What actually drives your price</h3>
            <p class="mt-3 text-ink-soft">
              No two roofs cost the same, and anyone quoting you over the phone without seeing yours
              is guessing. These are the four things we look at on the day.
            </p>
            <MagneticButton as="a" :href="site.phone.href" class="btn-primary group mt-7">
              Ask us on the phone
              <Icon name="phone" class="size-4" />
            </MagneticButton>
          </div>

          <dl class="grid gap-px overflow-hidden rounded-2xl bg-line lg:col-span-7">
            <div
              v-for="(driver, index) in drivers"
              :key="driver.label"
              class="bg-white p-5 transition-colors duration-300 hover:bg-brand-50"
            >
              <dt class="flex items-baseline gap-3 font-display font-extrabold text-brand-900">
                <span class="font-mono text-xs text-brand-500">0{{ index + 1 }}</span>
                {{ driver.label }}
              </dt>
              <dd class="mt-1 pl-8 text-sm text-ink-soft">{{ driver.text }}</dd>
            </div>
          </dl>
        </div>
      </RevealGroup>
    </div>
  </section>
</template>
