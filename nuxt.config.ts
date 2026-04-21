import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
  app: {
    head: {
      title: "Melbourne Masterworks – Roofing & Construction Experts",
      meta: [
        { name: 'google-site-verification', content: 'chFfMK6uEgD6kbxoUtW4_xj9Ol9GIwf8n2YAt8cFb4Y' },
      ],

    },
    buildAssetsDir: "/_nuxt/"
  },
  nitro: {
    serveStatic: true,
  },
  sourcemap: { server: true, client: false },
  devServerHandlers: [],
  css: ['@/assets/css/main.css'],
  hooks: {
    "vite:extendConfig": (config: any) => {
      config.root = process.cwd();
      config.base = '/';

      config.plugins.push(
        vuetify({
          styles: { configFile: resolve("assets/scss/variables.scss") },
        })
      );
      config.optimizeDeps = {
        include: ['swiper', 'swiper/vue'],
      };
    },
  },
});