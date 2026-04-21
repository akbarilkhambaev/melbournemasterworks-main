<script setup lang="ts">
import logo from '~/assets/images/logo.png'
</script>

<template>
  <div class="logo">
    <img :src="logo" alt="D.C Roofing" />
  </div>
</template>

<style scoped>
.logo:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* Optional: style the image if needed */
.logo img {
  display: block;
  width: 100%;
  height: 60px;
}

.logo:hover {
  transform: scale(1.05); /* Light zoom effect */
  box-shadow: 0 4px 10px rgba(255, 126, 95, 0.5);
}

/* Mobile styles */
@media (max-width: 600px) {
  .logo img {
    width: 100%;
    height: 50px;
  }
}
</style>