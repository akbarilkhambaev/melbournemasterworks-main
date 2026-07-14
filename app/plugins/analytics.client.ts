/**
 * Подключение Google Analytics 4.
 *
 * Скрипт грузится только если задан NUXT_PUBLIC_GA_ID — иначе на локальной
 * машине мы бы засоряли вашу же статистику своими заходами.
 *
 * Клики по телефону ловим одним делегированным слушателем на весь документ:
 * телефонных ссылок на сайте больше десятка (шапка, подвал, липкая плашка,
 * меню, секции), и вешать обработчик на каждую — верный способ забыть про одну.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const gaId = useRuntimeConfig().public.gaId

  if (!gaId) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', gaId, {
    // Отправляем просмотр вручную: Nuxt меняет страницы без перезагрузки,
    // и автоматический счётчик увидел бы только первую
    send_page_view: false,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)

  const router = useRouter()
  router.afterEach((to) => {
    window.gtag?.('event', 'page_view', {
      page_path: to.fullPath,
      page_title: document.title,
    })
  })

  // Первый заход роутер не отдаёт через afterEach
  nuxtApp.hook('app:mounted', () => {
    window.gtag?.('event', 'page_view', {
      page_path: router.currentRoute.value.fullPath,
      page_title: document.title,
    })
  })

  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement)?.closest?.('a[href^="tel:"]')
    if (!link) return

    // Откуда именно позвонили: шапка, подвал, липкая плашка…
    const source =
      link.closest('header')
        ? 'header'
        : link.closest('footer')
          ? 'footer'
          : link.closest('[role="dialog"]')
            ? 'mobile menu'
            : link.closest('.fixed')
              ? 'sticky bar'
              : 'page body'

    analytics.phoneClick(source)
  })
})
