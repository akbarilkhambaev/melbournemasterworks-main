<template>
  <v-container class="roofing-section py-12">
    <v-row class="align-center">
      <!-- Left Column: Text Content -->
      <v-col cols="12" md="6">
        <h2 class="section-title">
          Welcome to Melbourne Masterworks
        </h2>
        <p class="mb-6">
          Expert tile and metal roof restoration and repairs in Melbourne.
        </p>
        <p class="mb-6">
          Our expert team specialises in a variety of roofing services including roof restorations, roof repairs, and gutter replacements, providing services for homes and businesses across Melbourne.
        </p>
        <v-list dense class="areas-list">
          <li v-for="(item, index) in listItems" :key="index">
            <div class="section_2_li">
              <CheckIcon class="mr-1" />
              {{ item }}
            </div>
          </li>
        </v-list>
      </v-col>

      <v-col cols="12" md="6">
        <div class="residencial__roofing-img">
          <v-img
              src="/images/works/section6.jpg"
              alt="e-t-roofimg"
              width="607"
              height="370"
              cover
              class="mb-6 rounded-md"
          ></v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { CheckIcon } from 'vue-tabler-icons';

const listItems = ref([
  "10+ Years of Experience",
  "Safe Work Experts",
  "10 Years of Warranty",
  "Fully Licensed and Insured",
  "All Work Guaranteed",
  "Skilled Workmanship",
]);
</script>

<style>
.roofing-section {
  /* Дополнительные стили при необходимости */
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #033d79;
}

.areas-list {
  margin-top: 30px;
  width: 100%;
  column-count: 2;
}

.section_2_li {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #033d79;
  margin-bottom: 15px;
  padding: 5px 0 5px 5px;
  width: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, #cfd6e6 0, #dbe3f0 50%, rgba(231, 239, 249, 0.15) 100%);
  line-height: 100%;
}

@media (max-width: 600px) {
  .areas-list {
    column-count: 1;
    max-width: 100%;
  }
}

.residencial__roofing-img div img {
  display: flex;
  border-radius: 8px;
}
</style>