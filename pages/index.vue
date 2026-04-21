<script setup lang="ts">
import Header from '@/layouts/header/Header.vue';
import HeroBanner from '@/components/custom-components/HeroBanner.vue';
import Services from '@/components/custom-components/Services.vue';
import BuildFeature from '@/components/custom-components/BuildFeature.vue';
import Portfolio from '@/components/custom-components/Portfolio.vue';
import Contact  from '@/components/custom-components/Contact.vue';
import UpgradetoPro from '@/components/custom-components/UpgradetoPro.vue';
import Footer from '@/layouts/footer/Footer.vue';
import { useHead } from '#app'

1
useHead({
  title: "Melbourne Masterworks – Premium Roof Repair & Restoration Services in Melbourne",
  meta: [
    {
      name: 'description',
      content: "We Provide Quality Roof Restoration Services in Melbourne. With 10+ years of experience, our fully licensed and insured team offers expert roof repairs, weatherproofing, and full roof restoration services tailored to both residential and commercial clients."
    },
    {
      name: 'keywords',
      content: 'roof restoration, Melbourne roof repair, roofing, construction, premium roofing, expert roof repairs, weatherproofing, Melbourne Masterworks'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://melbournemasterworks.com.au' }
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Melbourne Masterworks",
        "image": "https://melbournemasterworks.com.au/logo.png",
        "telephone": "+61 404 404 4996",
        "email": "info@melbournemasterworks.com.au",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "787 Park Street",
          "addressLocality": "Brunswick",
          "addressRegion": "VIC",
          "postalCode": "3056",
          "addressCountry": "AU"
        },
        "url": "https://melbournemasterworks.com.au",
        "description": "Premium Roof Repair & Restoration Services in Melbourne. Expert roofing solutions for residential and commercial properties, offering quality workmanship and comprehensive warranties."
      })
    }
  ]
})
</script>
<template>
    <!--Header-->
    <Header />
    <HeroBanner />
    <Services />
    <Portfolio/>
    <BuildFeature />
<!--    <Blog/>-->

<!--    <Team/>-->
<!--    <Testimonials />-->
    <UpgradetoPro/>
    <Contact  />


    <Footer />
</template>

