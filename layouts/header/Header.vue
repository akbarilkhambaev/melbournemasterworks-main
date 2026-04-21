<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import Logo from "@/layouts/logo/logo.vue"
import { Menu2Icon, SearchIcon } from "vue-tabler-icons";
import sidebarItem from '@/_mockApis/header/Menu';
import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import MobileNavCollapse from './NavCollapse/MobileNavCollapse.vue';

const drawer = ref(false);
//For on Scroll Effect on Header
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
</script>

<template>
  <div class="header white-header mt-n95">
    <!----sidebar menu drawer start----->
    <v-navigation-drawer color="white" class="drawer px-3" v-model="drawer" temporary >
      <perfect-scrollbar class="scrollnavbar">
        <!-- <MobileNavigation /> -->
        <v-list class="menu text-capitalizew-100">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarItem">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <MobileNavCollapse class="" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="" />
                    <!---End Single Item-->
                </template>
                <v-btn  class="mt-3 submit_button" block size="large" variant="flat">Request a quote </v-btn>
            </v-list>
      </perfect-scrollbar>
    </v-navigation-drawer>
    <!----sidebar menu drawer end----->
    <v-app-bar flat class="header-card bg-surface py-4"  :class="stickyHeader ? 'sticky' : ''">
      <v-container class="py-0">
        <v-toolbar class=" h-auto d-flex  bg-surface">
          <Logo />
          <v-list class="d-md-flex  d-none flex-wrap py-0  ml-4 menu text-capitalize justify-center w-100">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarItem">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse class="" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="" />
                    <!---End Single Item-->
                </template>
            </v-list>
          <div class="d-md-flex d-none">
            <v-btn class="submit_button ms-3 sticky-border d-md-flex d-none "  variant="flat">Request a quote</v-btn>
          </div>

          <div class="d-md-none d-flex align-center ml-auto">
            <!-- Иконка для звонка -->
            <a href="tel:+61404404996" class="bg-primary rounded-md py-1 px-1 mr-3 d-flex align-center">
              <DeviceMobileIcon
                  size="30"
              />
            </a>
            <span class="bg-primary rounded-md py-1 px-1 d-flex align-center">
              <Menu2Icon
                  size="30"
                  @click.stop="drawer = !drawer"
              />
            </span>
          </div>
        </v-toolbar>
      </v-container>
    </v-app-bar>
  </div>
</template>