import { suburbs } from '~/data/areas'
import { services } from '~/data/services'

/**
 * Sitemap собирается из тех же данных, что и сами страницы.
 *
 * Раньше это был статический файл на 10 адресов. С появлением пятидесяти
 * страниц пригородов поддерживать его руками стало невозможно: любой новый
 * пригород в areas.ts молча выпадал бы из индекса.
 */
export default defineEventHandler((event) => {
  const base = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

  const routes: { path: string; priority: number }[] = [
    { path: '/', priority: 1.0 },
    { path: '/services', priority: 0.9 },
    ...services.map((service) => ({ path: service.to, priority: 0.9 })),
    { path: '/gallery', priority: 0.8 },
    { path: '/areas', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/reviews', priority: 0.7 },
    { path: '/about', priority: 0.6 },
    // Страницы пригородов — ради них всё и затевалось
    ...suburbs.map((suburb) => ({ path: `/areas/${suburb.slug}`, priority: 0.7 })),
  ]

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(
      (route) =>
        `  <url><loc>${base}${route.path}</loc><priority>${route.priority.toFixed(1)}</priority></url>`,
    ),
    '</urlset>',
  ].join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
