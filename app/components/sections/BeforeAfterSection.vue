<script setup lang="ts">
/**
 * Только настоящие пары: один и тот же дом, тот же ракурс, до и после.
 * Собирать «до» с одной крыши и «после» с другой — это враньё клиенту,
 * поэтому в секции ровно три проекта, а не десять.
 */
const projects = [
  {
    before: 'ba-hip-before',
    after: 'ba-hip-after',
    title: 'Full tile restoration, hip roof',
    caption:
      'Faded terracotta with worn ridge capping, cleaned back, re-pointed and resprayed in charcoal.',
  },
  {
    before: 'ba-terracotta-before',
    after: 'ba-terracotta-after',
    title: 'Moss-stained tiles brought back',
    caption:
      'Decades of moss and lichen pressure-washed off, then sealed and coated. Same roof, same angle.',
  },
  {
    before: 'ba-metal-before',
    after: 'metal-03',
    title: 'Corrugated metal, rust treated',
    caption: 'Surface rust ground back, primed and recoated — the sheets never needed replacing.',
  },
]
</script>

<template>
  <section class="section bg-brand-900 bg-dotgrid text-white">
    <div class="container-page">
      <RevealGroup class="mx-auto max-w-2xl text-center">
        <p class="eyebrow justify-center text-accent-400!">Before &amp; after</p>
        <h2 class="mt-4 text-h2 text-white!">
          <SplitText text="Drag the handle. Same roof, both times." on-scroll />
        </h2>
        <p class="mt-4 text-lead text-brand-200">
          These are real jobs, photographed from the same spot before we started and after we
          finished. Grab the slider and see for yourself.
        </p>
      </RevealGroup>

      <RevealGroup class="mt-14 grid gap-10 lg:grid-cols-3" :stagger="70">
        <div v-for="project in projects" :key="project.title">
          <BeforeAfter
            :before="project.before"
            :after="project.after"
            :title="project.title"
            :caption="project.caption"
            class="[&_h3]:!text-white [&_p]:!text-brand-200"
          />
        </div>
      </RevealGroup>
    </div>
  </section>
</template>
