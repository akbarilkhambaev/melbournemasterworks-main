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
        <v-btn class="btn bg-white btn-custom-md" @click="handleClick" flat size="large">
          Get a Free Estimate
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';
import VueScrollTo from "vue-scrollto";
import { useRoute } from "vue-router";


const drawer = ref(false);
const targetId = 'quote-section'
const route = useRoute()

const link = ref(route.path === '/' ? `/#${targetId}` : `/#${targetId}`)

const projects = ref([
  {
    id: 2,
    title: "Roof Cleaning",
    description: "Thorough removal of dirt, moss, and debris to restore the roof’s original appearance and extend its lifespan.",
    before: "/images/works/section2.jpg",
    after: "/images/works/section2-2.jpg",
  },
  {
    id: 3,
    title: "Fascia Board Protection",
    description: "Covering your fascia boards with durable materials to prevent rotting and reduce maintenance.",
    before: "/images/works/29-2.jpg",
    after: "/images/works/29-3.jpg",
  },
]);

onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll)
})
const stickyHeader = ref(false)
function handleScroll() {
  if (window.pageYOffset) {
    stickyHeader.value = true
  } else {
    stickyHeader.value = false
  }
}
const handleClick = () =>  {
  drawer.value = false;
  VueScrollTo.scrollTo(`#${targetId}`, 500, { easing: 'ease-in-out' });
}
</script>

<style scoped>
.compare-slider-wrapper {
  margin: 0 auto;
  max-width: 100%;
  max-height: 450px;
  overflow: hidden;
}
</style>