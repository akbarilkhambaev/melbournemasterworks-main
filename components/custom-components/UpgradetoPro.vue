<template>
  <div class="bg-primary py-sm-16 text-center">
    <v-container>
      <!-- Заголовок галереи -->
      <v-row class="d-flex align-center justify-center">
        <v-col cols="12" sm="8">
          <h2 class="text-h2 text-white mb-3">
            Our Before & After Gallery
          </h2>
          <h4 class="text-white font-weight-light">
            See the transformation of our roofing projects. From old and damaged to strong and beautiful!
          </h4>
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col
            cols="12"
            sm="6"
            md="6"
            v-for="project in projects"
            :key="project.id"
            class="mb-6"
        >
          <div class="compare-slider-wrapper rounded-md">
              <ImgComparisonSlider
                  :before="project.before"
                  :after="project.after"
              >
                <img slot="first" class="rounded-md " :src="project.before" style="width: 100%; height: auto; object-fit: contain"   />
                <img slot="second" class="rounded-md " :src="project.after" style="width: 100%; height: auto; object-fit: contain"  />
              </ImgComparisonSlider>
          </div>
          <h3 class="text-white mt-3">{{ project.title }}</h3>
          <p class="text-white font-weight-light">{{ project.description }}</p>
        </v-col>
      </v-row>

      <div class="mt-8">
        <v-btn class="btn bg-white btn-custom-md" to="/contact" flat size="large">
          Get a Free Estimate
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';

const projects = ref([
  // {
  //   id: 1,
  //   title: "Residential Roof Restoration",
  //   description: "Complete repair and waterproofing for a family home.",
  //   before: "/images/works/30-2.jpg",
  //   after: "/images/works/30-3.jpg",
  // },
  {
    id: 2,
    title: "Commercial Roof Upgrade",
    description: "Reinforcement and new roofing materials for durability.",
    before: "/images/works/28-1.jpg",
    after: "/images/works/28-2.jpg",
  },
  {
    id: 3,
    title: "Old Roof Renovation",
    description: "Replacing damaged tiles and improving insulation.",
    before: "/images/works/29-2.jpg",
    after: "/images/works/29-3.jpg",
  },
]);
</script>

<style scoped>
.compare-slider-wrapper {
  margin: 0 auto;
  max-width: 100%;
  max-height: 650px;
  overflow: hidden;
}
</style>