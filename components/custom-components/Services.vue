<template>
  <v-container class="roofing-section py-12">
    <v-row class="align-center">
      <!-- Left Column: Text Content -->
      <v-col cols="12" md="6">
        <h2 class="section-title">
          Welcome to Melbourne Masterworks – Roofing & Construction Experts
        </h2>
        <p class="mb-6">
          At Melbourne Masterworks, we take pride in delivering high-quality roofing and construction solutions across Melbourne. With years of expertise, our fully licensed and insured team is committed to providing durable, reliable, and expertly crafted roofing services tailored to your needs.
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
              src="/images/backgrounds/image1.jpg"
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

<style >
.roofing-section {
  /* You can add a background image or color if desired.
     For example, to mimic the corporate banner's style, uncomment the next lines:

     background: url('/images/backgrounds/headerRoof.webp') no-repeat center center;
     background-size: cover;
  */
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


.residancy-heading {
  font-size: 1.5rem;
  font-weight: bold;
}

.residencial-roofing {
  /* Additional styling if needed */
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
  background: #cfd6e6;
  background: linear-gradient(90deg, #cfd6e6 0, #dbe3f0 50%, rgba(231, 239, 249, .15449929971988796) 100%);
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