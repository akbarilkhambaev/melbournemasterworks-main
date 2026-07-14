import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // Плоские имена компонентов: <AppImage />, а не <UiAppImage />
  components: [{ path: '~/components', pathPrefix: false }],

  vite: {
    plugins: [tailwindcss()],
  },

  // Статический экспорт с полноценным HTML: поисковики видят контент,
  // и это работает на любом хостинге, включая обычный cPanel.
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/404.html', '/sitemap.xml'],
    },
  },

  experimental: {
    viewTransition: true,
  },


  runtimeConfig: {
    // Заполняется из .env — см. .env.example
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '',
    smtpSecure: process.env.SMTP_SECURE || '',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    leadRecipient: process.env.SMTP_USER || 'info@melbournemasterworks.com.au',
    public: {
      // Статический хостинг не умеет серверные роуты, поэтому заявки уходят
      // через внешний сервис. Переключается на 'server' одной строкой,
      // если сайт переедет на Node-хостинг.
      formMode: (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
        ? 'server'
        : 'web3forms') as 'web3forms' | 'server',
      web3formsKey: '',
      // Живой домен редиректит без-www на www — canonical обязан указывать на
      // конечный адрес, иначе Google получает противоречивый сигнал
      siteUrl: 'https://www.melbournemasterworks.com.au',
      // Пусто — скрипт аналитики не грузится вовсе (см. plugins/analytics.client.ts)
      gaId: '',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-AU' },
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon-180.png' },
        // Первый экран набран этими двумя — просим браузер начать качать их
        // сразу, а не после разбора CSS
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/manrope-var.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/inter-var.woff2',
          crossorigin: 'anonymous',
        },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#033D79' },
        {
          name: 'google-site-verification',
          content: 'chFfMK6uEgD6kbxoUtW4_xj9Ol9GIwf8n2YAt8cFb4Y',
        },
      ],
    },
  },
})
