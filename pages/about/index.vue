<template>
  <div>
    <Header />
    <BreadCrumb
        :breadcrumbs="[
        { text: 'Home', link: '/' },
        { text: 'About' }
      ]"
    />
    <v-container class="about-page py-12">
      <v-row>
        <v-col cols="12">
          <h1 class="about-title">About Melbourne Masterworks</h1>
          <p class="about-paragraph">
            When it comes to taking care of your home, start at the very top. Your roof is one of the most critical components of your property, providing protection, structural integrity, functionality, and aesthetic appeal. At Melbourne Masterworks, we specialize in keeping your roof in optimal condition.
          </p>
          <p class="about-paragraph">
            Proudly serving Melbourne and surrounding areas, our team of experts is fully licensed and insured, offering high-quality roofing services using premium Australian products. We stand by our work with transparent fixed prices, extensive warranties, and a commitment to customer satisfaction.
          </p>
          <p class="about-paragraph">
            Enhance the appearance and overall performance of your roof by partnering with Melbourne Masterworks. We offer a complete range of services, from roof restorations and repairs to full roof replacements and guttering solutions.
          </p>
          <p class="about-paragraph">
            Whether you’re dealing with cracked tiles, damaged gutters, or persistent leaks, our experienced team is here to breathe new life into your roof and protect your property.
          </p>
          <p class="about-paragraph">
            Discover more about our team and learn how we can help transform your home—contact Melbourne Masterworks today.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <Contact />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/layouts/header/Header.vue';
import Footer from '@/layouts/footer/Footer.vue';
import BreadCrumb from '@/components/custom-components/BreadCrumb.vue';
import Contact from "~/components/custom-components/Contact.vue";
</script>

<style scoped>
.about-page {
  /* Дополнительные стили для страницы, если необходимо */
}
.about-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #033d79;
}
.about-paragraph {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #444;
}
</style>