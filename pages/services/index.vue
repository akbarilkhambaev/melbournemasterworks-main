<template>
  <div>
    <Header />
    <BreadCrumb
        :breadcrumbs="[
        { text: 'Home', link: '/' },
        { text: 'Services' }
      ]"
    />
    <v-container class="services-page py-12">
      <v-row>
        <v-col v-for="service in services" :key="service.id" cols="12" md="4" >
          <v-card class="service-card ">
            <v-img
                :src="service.image"
                :alt="service.title"
                height="200px"
                cover
                class="service-image rounded-t-md"
            ></v-img>
            <v-card-title class="service-title">{{ service.title }}</v-card-title>
            <v-card-text class="service-desc">{{ service.description }}</v-card-text>
            <v-card-actions>
              <NuxtLink :to="service.link" class="text-decoration-none d-flex align-center text-primary hover-primary">
                Learn More
                <ChevronRightIcon size="17" class="ml-2" stroke-width="2.5" />
              </NuxtLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Contact />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/layouts/header/Header.vue';
import Footer from '@/layouts/footer/Footer.vue';
import Contact from '@/components/custom-components/Contact.vue';
import BreadCrumb from '@/components/custom-components/BreadCrumb.vue';
import { NuxtLink } from '#components';
import { ChevronRightIcon } from 'vue-tabler-icons';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const services = ref<Service[]>([
  {
    id: 1,
    title: 'Roof Restorations',
    description: 'Renew your roof with our comprehensive restoration services including cleaning, painting, and resealing to extend its life and enhance its appearance.',
    image: '/images/works/11.jpg',
    link: '/services/restorations'
  },
  {
    id: 2,
    title: 'Roof Repairs',
    description: 'From leaks to broken tiles and damaged metal roofing, our expert team swiftly addresses all your roof repair needs.',
    image: '/images/works/20.jpg',
    link: '/services/repairs'
  },
  {
    id: 3,
    title: 'Gutter Replacements',
    description: 'Ensure effective water management with our professional gutter replacements designed to protect your property from weather-related damages.',
    image: '/images/works/28-2.jpg',
    link: '/services/gutters'
  }
]);
</script>

<style scoped>
.services-page {
}
.service-card {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.service-image {
  object-fit: cover;
}

.service-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #033d79;
  padding: 0.5rem 1rem;
}

.service-desc {
  font-size: 1rem;
  color: #555;
  padding: 0 1rem;
  flex-grow: 1;
}
</style>