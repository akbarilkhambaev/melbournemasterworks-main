<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/layouts/header/Header.vue';
import Footer from '@/layouts/footer/Footer.vue';
import Contact from '@/components/custom-components/Contact.vue';
import BreadCrumb from "@/components/custom-components/BreadCrumb.vue";
import { useHead } from '#app';
import DynamicBlog from "@/components/custom-components/DynamicBlog.vue";

useHead({
  title: "Melbourne Masterworks – Premium Roof Repair & Restoration Services in Melbourne",
  meta: [
    {
      name: 'description',
      content: "We Provide Quality Roof Repair & Guttering Services in Melbourne. With years of experience, our fully licensed and insured team offers expert repairs and maintenance for gutters, downpipes, and roof plumbing."
    },
    {
      name: 'keywords',
      content: 'roof repair, guttering, downpipes, roof plumbing, Melbourne Masterworks, roofing services'
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
        "description": "Premium Roof Repair & Guttering Services in Melbourne."
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
  <div>
    <Header />
    <BreadCrumb
        :breadcrumbs="[
        { text: 'Home', link: '/' },
        { text: 'Services', link: '/services' },
        { text: 'Roof Guttering' }
      ]"
    />
    <DynamicBlog
        sectionTitle="Roof Guttering"
        description="Ensure your roof’s guttering system performs at its best with Melbourne Masterworks. Our expert team brings years of industry experience to deliver comprehensive gutter maintenance, cleaning, and repair services tailored to protect your property. A well-maintained gutter system not only prevents water damage and leaks but also enhances your home’s curb appeal. From gutter repairs and replacements to downpipe maintenance, we offer complete solutions that safeguard your investment and ensure optimal performance of your roof plumbing. Trust Melbourne Masterworks to deliver exceptional quality and reliability in every service."
        :listItems="[
        'Expert Gutter Cleaning & Maintenance',
        'Timely Repairs & Replacements',
        'Enhances Curb Appeal',
        'Comprehensive Downpipe Services'
      ]"
        :imagesSrc="[
        '/images/works/repair1-4.jpg',
        '/images/works/29-3.jpg',
        '/images/works/30-1.jpg',
        '/images/works/30-3.jpg',
        '/images/works/repair1-2.jpg',
      ]"
        imageAlt="Roof Guttering Service"

    />
    <Contact />
    <Footer />

  </div>
</template>

<style scoped>
/* Дополнительные стили можно добавлять по необходимости */
</style>