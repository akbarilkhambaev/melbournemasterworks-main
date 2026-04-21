<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/layouts/header/Header.vue';
import Footer from '@/layouts/footer/Footer.vue';
import Contact from '@/components/custom-components/Contact.vue';
import BreadCrumb from "@/components/custom-components/BreadCrumb.vue";
import { useHead } from '#app';
import DynamicBlog from "@/components/custom-components/DynamicBlog.vue";

useHead({
  title: "Melbourne Masterworks – Premium Roof Repairs in Melbourne",
  meta: [
    {
      name: 'description',
      content: "Melbourne Masterworks provides high-quality roof repair services. With extensive experience, our team offers reliable, timely, and expert roof repairs to safeguard your home."
    },
    {
      name: 'keywords',
      content: 'roof repairs, roof maintenance, roof restoration, Melbourne Masterworks, roofing services'
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
        "description": "Premium Roof Repairs in Melbourne by Melbourne Masterworks."
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
        { text: 'Roof Repairs' }
      ]"
  />
  <DynamicBlog
      sectionTitle="Roof Repairs"
      description="When your roof is damaged or worn, trust Melbourne Masterworks for fast, effective repairs that restore its strength, functionality, and appearance. Our experienced team quickly identifies issues, fixes leaks, replaces damaged materials, and ensures your roof withstands the elements. From minor fixes to major restorations, we deliver lasting solutions that extend your roof’s life and protect your home. With our attention to detail and commitment to quality, your property is in expert hands."
      :listItems="[
        'Rapid Response & Repairs',
        'Quality Materials & Workmanship',
        'Detailed Inspection & Assessment',
        'Comprehensive Repair Solutions'
      ]"
      :imagesSrc="[
        '/images/works/repair1-1.jpg',
        '/images/works/repair1-3.jpg',
        '/images/works/25.jpg',
        '/images/works/8.jpg',
        '/images/works/9.jpg',
        '/images/works/20.jpg',
        '/images/works/repair1-2.jpg',
      ]"
      imageAlt="Roof Repairs Service"

  />
  <Contact />
  <Footer />
</template>

<style scoped>
/* Дополнительные стили можно добавлять по необходимости */
</style>