<script setup lang="ts">
/**
 * Бенто-сетка: ячейки разного размера, одна крупная — с фотографией.
 * Четыре одинаковых бокса в ряд читались как шаблон.
 */
const reasons = [
  {
    title: 'You see what we see',
    text: 'Every quote comes with photos from the roof itself. If we say a valley has rusted through, you get the picture of it.',
    icon: 'camera' as const,
  },
  {
    title: 'Fixed price, not an estimate',
    text: 'The number we quote is the number you pay. No variations halfway through unless you ask for extra work.',
    icon: 'tag' as const,
  },
  {
    title: 'Licensed and insured',
    text: 'Full public liability cover, with certificates sent before we start.',
    icon: 'shield' as const,
  },
  {
    title: 'Built for Melbourne weather',
    text: 'Flexible pointing that moves with the roof, membranes rated for UV and driving rain.',
    icon: 'cloud' as const,
  },
]

</script>

<template>
  <section class="section bg-surface-muted">
    <div class="container-page">
      <SectionHeading
        align="left"
        eyebrow="Why us"
        title="No surprises, on the roof or on the invoice"
        text="Most complaints about roofers come down to two things: work you cannot see, and a price that moved. We fixed both."
      />

      <RevealGroup class="mt-14 grid gap-5 md:grid-cols-4 md:grid-rows-2" :stagger="60">
        <!-- Крупная ячейка с фото: якорь всей сетки -->
        <div
          class="relative overflow-hidden rounded-card shadow-card md:col-span-2 md:row-span-2 md:min-h-[26rem]"
        >
          <ParallaxMedia
            src="repairs-06"
            sizes="(max-width: 768px) 100vw, 46vw"
            ratio="4 / 3"
            :speed="0.08"
            class="size-full md:absolute md:inset-0"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/45 to-transparent"
            aria-hidden="true"
          />
          <div class="absolute inset-x-0 bottom-0 p-7 lg:p-8">
            <span
              class="inline-flex rounded-full bg-accent-500 px-3 py-1 text-xs font-bold tracking-wide text-brand-950 uppercase"
            >
              What we look for
            </span>
            <h3 class="mt-4 font-display text-2xl font-extrabold !text-white">
              Cracked pointing is where most leaks start
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-brand-200">
              The ridge caps take the weather first. When the mortar lets go, water runs straight
              under the tiles — and the stain shows up on your ceiling a season later.
            </p>
          </div>
        </div>

        <!-- Малые ячейки -->
        <TiltCard
          v-for="reason in reasons"
          :key="reason.title"
          :max="6"
          class="group rounded-card border border-line bg-white p-6 shadow-soft transition-shadow duration-500 ease-out-soft hover:shadow-card"
        >
          <span
            class="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-500 ease-out-soft group-hover:bg-brand-700 group-hover:text-white"
          >
            <Icon :name="reason.icon" class="size-6" />
          </span>
          <h3 class="mt-4 font-display font-extrabold text-brand-900">{{ reason.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ reason.text }}</p>
        </TiltCard>
      </RevealGroup>
    </div>
  </section>
</template>
