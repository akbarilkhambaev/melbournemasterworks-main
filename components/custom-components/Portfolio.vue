<script setup lang="ts">
import { Portfolio } from '@/_mockApis/custom-components/index';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/splide.min.css';
</script>

<template>
  <div class="py-md-15 py-8 bg-lightmuted">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="8">
          <div class="text-center">
<!--            <div class="d-flex align-center mb-5 justify-center"-->
<!--                 data-aos="fade-right"-->
<!--                 data-aos-delay="200"-->
<!--                 data-aos-duration="1000">-->
<!--              <span class="bg-success pa-2 rounded-circle mr-2"></span>-->
<!--              <h6 class="text-subtitle-1 text-dark font-weight-bold">Portfolio</h6>-->
<!--            </div>-->
            <h2 class="text-h2 text-dark mb-3"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="1000">
              Your Roof, Our Masterpiece
            </h2>
            <p class="text-muted mb-4">
              Discover our completed projects, where precision meets craftsmanship. From expert roof restorations to complete structural transformations, each project showcases our commitment to quality, durability, and excellence. See the difference our expertise can make!
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" md="6" sm="6" v-for="card in Portfolio" :key="card.title" class="mb-2">
          <div class="hover-card overflow-hidden lh-10 rounded-md position-relative">
            <NuxtLink to="/" class="text-decoration-none">
              <Splide
                  :options="{
                  type: 'loop',
                  autoplay: true,
                  interval: 4000,
                  arrows: false,
                  pagination: true,
                }"
                  class="zoom-in w-100"
              >
                <SplideSlide v-for="(img, index) in card.imgs" :key="index">
                  <v-img :src="img" height="380px" alt="post" cover />
                </SplideSlide>
              </Splide>
            </NuxtLink>
          </div>
<!--          <div class="mt-4">-->
<!--            <h5 class="text-h5 font-weight-bold text-13">-->
<!--              <NuxtLink class="text-decoration-none text-dark hover-primary" to="/">{{ card.title }}</NuxtLink>-->
<!--            </h5>-->
<!--            <p class="text-muted text-h6 font-weight-regular">{{ card.desc }}</p>-->
<!--          </div>-->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>