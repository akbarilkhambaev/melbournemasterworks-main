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
      title: "Melbournemasterworks",
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
      // Устанавливаем корневую директорию для Vite как текущую рабочую директорию,
      // что может помочь корректно вычислять относительные пути.
      config.root = process.cwd();

      config.plugins.push(
        vuetify({
          // Используем относительный путь для файла настроек SCSS
          styles: { configFile: resolve("assets/scss/variables.scss") },
        })
      );
      config.optimizeDeps = {
        include: ['swiper', 'swiper/vue'],
      };
    },
  },
});