<template>
  <v-container class="roofing-section py-12">
    <v-row>
      <v-col cols="12" md="6">
        <div class="residencial__roofing-img">

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
              <SplideSlide v-for="(img, index) in imagesSrc" :key="index">
                <v-img :src="img" height="400px" alt="post" cover />
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
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <h2 class="section-title">
          {{ sectionTitle }}
        </h2>
        <div class="section-description" v-html="formattedDescription"></div>
        <v-list dense class="areas-list">
          <li v-for="(item, index) in listItems" :key="index">
            <div class="section_2_li">
              <CheckIcon class="mr-1" />
              {{ item }}
            </div>
          </li>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { CheckIcon } from 'vue-tabler-icons';
import {Splide, SplideSlide} from "@splidejs/vue-splide";

interface Props {
  sectionTitle: string;
  description: string;
  listItems: string[];
  imagesSrc: any;
  imageAlt?: string;

}

const props = defineProps<Props>();

const formattedDescription = computed(() => {
  const paragraphs = props.description.split('. ').map(p => p.trim()).filter(p => p);
  return paragraphs.map(p => `<p>${p}${p.endsWith('.') ? '' : '.'}</p>`).join('');
});
</script>

<style scoped>
.roofing-section {
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #033d79;
}

.section-description p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #444;
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