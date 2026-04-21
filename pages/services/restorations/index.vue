<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/layouts/header/Header.vue';
import Footer from '@/layouts/footer/Footer.vue';
import Contact from '@/components/custom-components/Contact.vue';
import BreadCrumb from "@/components/custom-components/BreadCrumb.vue";
import { useHead } from '#app';
import DynamicBlog from "@/components/custom-components/DynamicBlog.vue";

useHead({
  title: "Melbourne Masterworks – Roof Restoration & Repair Experts in Melbourne",
  meta: [
    {
      name: 'description',
      content: "Melbourne Masterworks offers professional roof restoration, roof cleaning, roof painting, and roof repairs across Melbourne. With 10+ years of experience, our licensed and insured team ensures high-quality results for both residential and commercial roofing projects."
    },
    {
      name: 'keywords',
      content: 'roof restoration Melbourne, roof repairs Melbourne, roof cleaning, roof painting, roofing contractor, residential roofing, commercial roofing, Melbourne Masterworks'
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
        "description": "Melbourne Masterworks provides premium roof restoration, roof cleaning, painting, and repair services throughout Melbourne. Trusted by homeowners and businesses alike.",
        "areaServed": {
          "@type": "Place",
          "name": "Melbourne"
        },
        "openingHours": "Mo-Sa 08:00-18:00",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -37.7726,
          "longitude": 144.9620
        }
      })
    }
  ]
});

const form = ref({
  name: '',
  email: '',
  message: ''
});

function submitForm() {
  console.log("Отправленные данные:", form.value);
}
</script>

<template>
  <Header />
  <BreadCrumb
      :breadcrumbs="[
        { text: 'Home', link: '/' },
        { text: 'Services', link: '/services' },
        { text: 'Roof Restoration' }
      ]"
  />
  <DynamicBlog
      sectionTitle="Roof Restoration"
      description="Bring your roof back to life with our expert roof restoration services at Melbourne Masterworks. From roof cleaning and painting to detailed repairs and guttering, we enhance both the look and performance of your roof — without the need for a full replacement. Our comprehensive process strengthens the structure, improves functionality, and boosts curb appeal. Serving Melbourne’s eastern suburbs, we ensure long-lasting results with quality you can trust. Here's why locals choose Melbourne Masterworks for roof restoration:"
      :listItems="[
  'Safe and Professional Work',
  'Expert Roof Cleaning & Painting',
  '10-Year Workmanship Warranty',
  'Fully Licensed & Insured Team',
  '100% Satisfaction Guaranteed',
]"
      :imagesSrc="[
    '/images/works/section2-2.jpg',
    '/images/works/section4-1.jpg',
    '/images/works/section4-2.jpg',
    '/images/works/section4-6.jpg',
    '/images/works/section4-7.jpg',
    '/images/works/section4-3.jpg',
    '/images/works/9.jpg',
    '/images/works/10.jpg',
    '/images/works/11.jpg',
    '/images/works/14.jpg',
  ]"
      imageAlt="e-t-roofimg"

  />
  />
  <Contact />
  <Footer />
</template>

<style scoped>

</style>