<template>
  <div class="pt-md-16 pt-8 pb-md-12 pb-8 mt-95 breadCrumb">
    <v-container class="inner-content">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb-list">
          <li
              v-for="(item, index) in breadcrumbs"
              :key="item.text + index"
              class="breadcrumb-item"
          >
            <template v-if="item.link">
              <NuxtLink :to="item.link">{{ item.text }}</NuxtLink>
            </template>
            <template v-else>
              <span aria-current="page">{{ item.text }}</span>
            </template>

            <template v-if="index < breadcrumbs.length - 1">
              <span class="breadcrumb-separator"> &gt; </span>
            </template>
          </li>
        </ol>
      </nav>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface BreadcrumbItem {
  text: string;
  link?: string;
}

const props = defineProps<{
  breadcrumbs: BreadcrumbItem[]
}>();

</script>

<style scoped>
.breadCrumb {
  background: url("/images/backgrounds/roof1.jpg") no-repeat center center;
  background-size: cover;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.breadCrumb::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.breadCrumb > .inner-content {
  position: relative;
  z-index: 2;
}

.breadcrumb-list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center; /* Центрируем элементы */
  z-index: 22;
  padding: 0;
  margin: 0;
}

.breadcrumb-item a,
.breadcrumb-item span {
  color: #fff !important; /* Принудительный белый цвет */
  font-size: 1.25rem;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: #fff !important;
}
</style>