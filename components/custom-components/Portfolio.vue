<script setup lang="ts">
import { ref } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Portfolio } from '@/_mockApis/custom-components/index';

const splideRef = ref(null);

const goNext = () => {
  if (splideRef.value) {
    splideRef.value.go('>');
  }
};

const goPrev = () => {
  if (splideRef.value) {
    splideRef.value.go('<');
  }
};
</script>

<template>
  <div class="py-md-15 py-8 bg-lightmuted">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="8">
          <div class="text-center">
            <h2 class="text-h2 text-dark mb-3"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="1000">
              Your Roof, Our Masterpiece
            </h2>
            <p class="text-muted mb-4">
              Discover our completed projects, where precision meets craftsmanship...
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" md="6" sm="6" v-for="card in Portfolio" :key="card.title" class="mb-2">
          <div class="hover-card overflow-hidden lh-10 rounded-md position-relative">
            <Splide
                ref="splideRef"
                :options="{
                  type: 'loop',
                  autoplay: true,
                  interval: 4000,
                  arrows: true,
                  pagination: true,
                  lazyLoad: 'sequential',
                  rewind: true,
                  drag: true,
                  snap: true
                }"
                class="w-100 relative"
            >
              <SplideSlide v-for="(img, index) in card.imgs" :key="index">
                <v-img :src="img" height="380px" alt="post" cover />
              </SplideSlide>

              <template #arrows>
                <div class="splide__arrows absolute top-1/2 left-0 right-0 flex justify-between px-4 z-10">
                  <button class="splide__arrow splide__arrow--prev bg-white/80 rounded-full w-10 h-10">
                    <i class="fa-solid fa-chevron-left"></i>
                  </button>
                  <button class="splide__arrow splide__arrow--next bg-white/80 rounded-full w-10 h-10">
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </template>
            </Splide>

          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>