<script setup lang="ts">
import { faqs } from '~/data/faqs'

useSeoMeta({
  title: 'Roof Restoration Melbourne',
  description:
    'Premium roof restoration, repairs and guttering across Melbourne. Free photographed inspection, fixed price, 10-year workmanship warranty. Call 0404 404 996.',
  ogTitle: 'Melbourne Masterworks — Roof Restoration & Repairs',
  ogDescription:
    'Fixed-price roof restoration, repairs and guttering across metropolitan Melbourne. Licensed, insured, 10-year workmanship warranty.',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: `${useRuntimeConfig().public.siteUrl}/` }],
})
</script>

<template>
  <div>
    <HeroSection />
    <TrustStrip />
    <ServicesSection />
    <WhyUsSection />
    <BeforeAfterSection />
    <PromiseSection />
    <GalleryPreview />
    <ProcessSection />
    <TestimonialsSection />

    <section class="section">
      <div class="container-page">
        <SectionHeading
          eyebrow="Questions"
          title="The things people ask us most"
          text="If your question is not here, call us — we would rather talk it through than have you guess."
        />
        <RevealGroup class="mx-auto mt-12 max-w-3xl">
          <FaqList :items="faqs" />
        </RevealGroup>
      </div>
    </section>

    <CtaSection source="Homepage" />
  </div>
</template>
